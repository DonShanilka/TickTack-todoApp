package store

import (
	"log"
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

type User struct {
	ID          int
	UserName    string
	UserEmail   string
	PasswordHash string
}

func SaveUser(user User) error {
	_, err := DB.Exec("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", user.UserName, user.UserEmail, user.PasswordHash)
	if err != nil {
		log.Printf("Error saving user '%s': %v", user.UserName, err)
		return err
	}
	log.Printf("User %s saved successfully", user.UserName)
	return nil
}

func GetUserByUserName(userName string) (*User, error) {
	row := DB.QueryRow("SELECT id, username, email, password FROM users WHERE username = ?", userName)
	var user User
	err := row.Scan(&user.ID, &user.UserName, &user.UserEmail, &user.PasswordHash)
	if err == sql.ErrNoRows {
		return nil, nil
	} else if err != nil {
		log.Printf("Error retrieving user: %v", err)
	}
	return &user, err
}

func GetUserByID(id int) (*User, error) {
	row := DB.QueryRow("SELECT id, username, email, password FROM users WHERE id = ?", id)
	var user User
	err := row.Scan(&user.ID, &user.UserName, &user.UserEmail, &user.PasswordHash)
	if err == sql.ErrNoRows {
		return nil, nil
	} else if err != nil {
		log.Printf("Error retrieving user by ID: %v", err)
	}
	return &user, err
}