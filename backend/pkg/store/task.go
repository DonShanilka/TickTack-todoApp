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

// CREATE
func SaveTask(task Task) error {
	_, err := DB.Exec("INSERT INTO tasks (title, description, taskType, completed, listId) VALUES (?, ?, ?, ?, ?)", task.Title, task.Description, task.TaskType, task.Completed, task.ListID)
	if err != nil {
		log.Printf("Error saving task '%s': %v", task.Title, err)
	}
	return err
}

// UPDATE
func UpdateTask(task Task) error {
	_, err := DB.Exec(
		"UPDATE tasks SET title = ?, description = ?, taskType = ?, completed = ?, listId = ? WHERE id = ?",
		task.Title, task.Description, task.TaskType, task.Completed, task.ListID, task.ID,
	)
	if err != nil {
		log.Printf("Error updating task ID %d: %v", task.ID, err)
	}
	return err
}


// DELETE
func DeleteTask(id int) error {
	_, err := DB.Exec("DELETE FROM tasks WHERE id = ?", id)
	if err != nil {
		log.Printf("Error deleting task ID %d: %v", id, err)
	}
	return err
}
