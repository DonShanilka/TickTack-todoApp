package main

import (
	"backend/internal/handler"
	"backend/pkg/store"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

// ✅ Middleware to enable CORS
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Allow requests from your Next.js frontend
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Handle preflight OPTIONS request
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

// ✅ Initialize database
func initDB(dsn string) error {
	var err error
	store.DB, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Printf("Error opening the database: %v", err)
		return err
	}

	err = store.DB.Ping()
	if err != nil {
		log.Printf("Error pinging the database: %v", err)
		return err
	}

	log.Println("Successfully connected to the database")
	return nil
}

func main() {
	// Database config
	dbUser := "root"
	dbPass := "Shanilka800@#"
	dbHost := "localhost"
	dbPort := "3306"
	dbName := "todo"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUser, dbPass, dbHost, dbPort, dbName)

	// Retry DB connection
	var err error
	for i := 0; i < 10; i++ {
		err = initDB(dsn)
		if err == nil {
			break
		}
		log.Println("DB not ready, retrying in 2 seconds...")
		time.Sleep(2 * time.Second)
	}
	if err != nil {
		log.Fatalf("DB error after retries: %v", err)
	}

	// ✅ Use ServeMux instead of default
	mux := http.NewServeMux()

	// User routes
	mux.HandleFunc("/api/saveuser", handler.SaveUserHandler)

	// List routes
	mux.HandleFunc("/api/savelist", handler.SaveListHandler)
	mux.HandleFunc("/api/updatelist", handler.UpdateListHandler)
	mux.HandleFunc("/api/deletelist", handler.DeleteListHandler)
	mux.HandleFunc("/api/getalllists", handler.GetAllListsHandler)

	// Task routes
	mux.HandleFunc("/api/savetask", handler.SaveTaskHandler)
	mux.HandleFunc("/api/updatetask", handler.UpdateTaskHandler)
	mux.HandleFunc("/api/deletetask", handler.DeleteTaskHandler)
	mux.HandleFunc("/api/getalltasks", handler.GetAllTasksHandler)

	// ✅ Wrap mux with CORS
	handlerWithCORS := enableCORS(mux)

	log.Println("🚀 Server started at :8080")
	log.Fatal(http.ListenAndServe(":8080", handlerWithCORS))
}
