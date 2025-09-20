package store

import (
	// "database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

type Task struct {
	ID 		int
	Title		string
	Description	string
	TaskType	string
	Completed	bool
	ListID		int
}

func SaveTask(task Task) error {
	_, err := DB.Exec("INSERT INTO tasks (title, description, taskType, completed, listId) VALUES (?, ?, ?, ?, ?)", task.Title, task.Description, task.TaskType, task.Completed, task.ListID)
	if err != nil {
		log.Printf("Error saving task '%s': %v", task.Title, err)
	}
	return err
}