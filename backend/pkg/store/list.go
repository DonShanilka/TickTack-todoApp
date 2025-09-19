package store

import (
	// "database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

// var DB *sql.DB

type List struct {
	ID        int
	Title     string
	UserID    int
	UserEmail string
}

func SaveList(list List) error {
	_, err := DB.Exec("INSERT INTO lists (title, userId, userEmail) VALUES (?, ?, ?)", list.Title, list.UserID, list.UserEmail)
	if err != nil {
		log.Printf("Error saving list '%s': %v", list.Title, err)
	}
	return err
}
