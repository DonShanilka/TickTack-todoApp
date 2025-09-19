package handler

import (
	"backend/pkg/store"
	"encoding/json"
	"net/http"
)

type ListRequest struct {
	Title     string `json:"title"`
	UserID    int    `json:"userId"`
	UserEmail string `json:"userEmail"`
}

func CreateListHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req ListRequest
	
	if req.Title == "" || req.UserID == 0 || req.UserEmail == "" {
		http.Error(w, "Titel, UserID and UserEmail are required", http.StatusBadRequest)
		return
	}

	list := store.List{Title: req.Title, UserID: req.UserID, UserEmail: req.UserEmail}
	if err := store.SaveList(list); err != nil {
		http.Error(w, "Error saving list", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "List created successfully"})
}