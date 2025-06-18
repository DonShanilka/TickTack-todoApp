package main

import (
	"log"
	"net/http"

	"./config"
	"./routes"
)

func main() {
	config.ConnectDB()
	routes.RegisterRoutes()

	log.Println("Server started on http://localhost:3001")
	log.Fatal(http.ListenAndServe(":3001", nil))
}
