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