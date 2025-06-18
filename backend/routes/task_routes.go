package routes

import (
	"net/http"

	"todoApp/backend/controllers"
)

func RegisterRoutes() {
	http.HandleFunc("/api/tasks", controllers.CreateTask)
}
