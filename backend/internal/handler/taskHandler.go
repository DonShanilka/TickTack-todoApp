package handler

import (
	"backend/pkg/store"
	"encoding/json"
	"net/http"
)

type Task struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	TaskType    string `json:"taskType"`
	Completed   bool   `json:"completed"`
	ListID      int    `json:"listId"`
}

func SaveTaskHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req Task
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	if req.Title == "" || req.ListID == 0 {
		http.Error(w, "Title and ListID are required", http.StatusBadRequest)
		return
	}

	task := store.Task{
		Title:       req.Title,
		Description: req.Description,
		TaskType:    req.TaskType,
		Completed:   req.Completed,
		ListID:      req.ListID,
	}

	if err := store.SaveTask(task); err != nil {
		http.Error(w, "Error saving task", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "Task created successfully"})
}

