package store

import (
	"log"
	"database/sql"
)

var DB *sql.DB

type User struct {
	ID int
	Username string
	PasswordHash string
}

func saveUser(user User) error {
	_, err := DB.Exec("INSERT INTO users (id, username, password) VALUES (?, ?, ?)", user.ID, user.Username, user.PasswordHash)
	if err != nil {
		log.Printf("Error saving user: %v", err)
	}
	log.Printf("User %s saved successfully", user.Username)
	return err
}

