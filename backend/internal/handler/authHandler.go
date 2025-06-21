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

