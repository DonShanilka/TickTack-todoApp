package handler

import (
	"backend/internal/auth"
	"backend/pkg/store"
	"encoding/json"
	"net/http"
	"strings"
	"time"
)

type RegisterRequest struct {
	Username string `json:"email"`
	Password string `json:"password"`
}

func SaveUserHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Username == "" || req.Password == "" {
		http.Error(w, "Username and password are required", http.StatusBadRequest)
		return
	}

	hash, err := auth.HashPassword(req.Password)
	if err != nil {
		http.Error(w, "Error hashing password", http.StatusInternalServerError)
		return
	}

	user := store.User{Username: req.Username, PasswordHash: hash}
	if err := store.SaveUser(user); err != nil {
		http.Error(w, "Error saving user", http.StatusInternalServerError)
		return
	}
	
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "User created successfully"})	
}