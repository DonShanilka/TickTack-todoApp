package handler

import (
	"backend/pkg/store"
	"encoding/json"
	"log"
	"net/http"
)

type ListRequest struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	UserID    int    `json:"userID"`
	UserEmail string `json:"userEmail"`
}

// SAVE
func SaveListHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req ListRequest

	if req.Title == "" || req.UserID == 0 || req.UserEmail == "" {
		http.Error(w, "Title, UserID and UserEmail are required", http.StatusBadRequest)
		return
	}

	list := store.List{
		Title:     req.Title,
		UserID:    req.UserID,
		UserEmail: req.UserEmail,
	}

	if err := store.SaveList(list); err != nil {
		http.Error(w, "Error saving list", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "List created successfully"})
}

// UPDATE
func UpdateListHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req ListRequest

	// Decode JSON body 
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		log.Printf("Error decoding request body: %v", err)
		return
	}

	if req.ID == 0 || req.Title == "" || req.UserID == 0 || req.UserEmail == "" {
		http.Error(w, "ID, Title, UserID and UserEmail are required", http.StatusBadRequest)
		log.Printf("Invalid request: %+v", req)
		return
	}

	list := store.List{
		ID:        req.ID,
		Title:     req.Title,
		UserID:    req.UserID,
		UserEmail: req.UserEmail,
	}

	if err := store.UpdateList(list); err != nil {
		http.Error(w, "Error updating list", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "List updated successfully"})
}
