package routes

import (
	"net/http"

	"yourapp/controllers"
)

func RegisterRoutes() {
	http.HandleFunc("/api/tasks", controllers.CreateTask)
}
