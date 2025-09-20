package store

import (
	"database/sql"
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

// CREATE
func SaveList(list List) error {
	_, err := DB.Exec("INSERT INTO lists (title, userId, userEmail) VALUES (?, ?, ?)", list.Title, list.UserID, list.UserEmail)
	if err != nil {
		log.Printf("Error saving list '%s': %v", list.Title, err)
	}
	return err
}

// UPDATE
func UpdateList(list List) error {
	_, err := DB.Exec("UPDATE lists SET title = ?, userId = ?, userEmail = ? WHERE id = ?",
		list.Title, list.UserID, list.UserEmail, list.ID)
	if err != nil {
		log.Printf("Error updating list ID %d: %v", list.ID, err)
	}
	return err
}

// DELETE
func DeleteList(id int) error {
	_, err := DB.Exec("DELETE FROM lists WHERE id = ?", id)
	if err != nil {
		log.Printf("Error deleting list ID %d: %v", id, err)
	}
	return err
}

// GET_by_ID
func GetListByID(id int) (List, error) {
	var list List
	err := DB.QueryRow("SELECT id, title, userId, userEmail FROM lists WHERE id = ?", id).
		Scan(&list.ID, &list.Title, &list.UserID, &list.UserEmail)
	if err != nil && err != sql.ErrNoRows {
		log.Printf("Error fetching list ID %d: %v", id, err)
	}
	return list, err
}