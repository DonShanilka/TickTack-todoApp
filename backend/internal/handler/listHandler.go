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
}