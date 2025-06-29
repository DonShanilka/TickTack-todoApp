package store

import (
	"log"
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

type User struct {
	ID 			 int
	Username 	 string
	PasswordHash string
}

func SaveUser(user User) error {
	_, err := DB.Exec("INSERT INTO users (username, password) VALUES (?, ?)", user.Username, user.PasswordHash)
	if err != nil {
		log.Printf("Error saving user: %v", err)
	}
	log.Printf("User %s saved successfully", user.Username)
	return err
}


func GetUserByUsarname(username string) (*User, error) {
	row := DB.QueryRow("SELECT id, username, password FROM users WHERE username = ?", username)
	var user User
	err := row.Scan(&user.ID, &user.Username, &user.PasswordHash)
	if err == sql.ErrNoRows {
		return nil, nil
	} else if err != nil {
		log.Printf("Error retrieving user: %v", err)
	}
	return &user, err
}

func GetUserByID(id int) (*User, error) {
	row := DB.QueryRow("SELECT id, username, password FROM users WHERE id = ?", id)
	var user User
	err := row.Scan(&user.ID, &user.Username, &user.PasswordHash)
	if err == sql.ErrNoRows {
		return nil, nil
	} else if err != nil {
		log.Printf("Error retrieving user by ID: %v", err)
	}
	return &user, err
}