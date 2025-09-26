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

// GET ALL
func GetAllTasks() ([]Task, error) {
	rows, err := DB.Query("SELECT id, title, description, taskType, completed, listId FROM tasks")
	if err != nil {
		log.Printf("Error fetching tasks: %v", err)
		return nil, err
	}
	defer rows.Close()

	var tasks []Task
	for rows.Next() {
		var task Task
		if err := rows.Scan(&task.ID, &task.Title, &task.Description, &task.TaskType, &task.Completed, &task.ListID); err != nil {
			log.Printf("Error scanning task row: %v", err)
			return nil, err
		}
		tasks = append(tasks, task)
	}

	if err = rows.Err(); err != nil {
		log.Printf("Error iterating over task rows: %v", err)
		return nil, err
	}

	return tasks, nil
}


