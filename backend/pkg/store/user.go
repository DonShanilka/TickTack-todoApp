package store

import (
	"log"
	"database/sql"
)

var DB *sql.DB

type User struct {
	ID int
	serName string
	password string
}

func saveUser(user User) error {
	_, err := DB.Exec("INSERT INTO users (id, username, password) VALUES (?, ?, ?)", user.ID, user.serName, user.password)
	if err != nil {
		log.Printf("Error saving user: %v", err)
		return err
	}
	log.Printf("User %s saved successfully", user.serName)
	return nil
}