package main

import (
	"backend/internal/handler"
	"backend/pkg/store" // 👈 use store package here
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

func initDB(dsn string) error {
	var err error
	store.DB, err = sql.Open("mysql", dsn) // 👈 initialize store.DB directly
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
	dbUser := "root"
	dbPass := "Shanilka800@#"
	dbHost := "localhost"
	dbPort := "3306"
	dbName := "todo"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUser, dbPass, dbHost, dbPort, dbName)

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

	http.HandleFunc("/api/saveuser", handler.SaveUserHandler)

	http.HandleFunc("/api/savelist", handler.SaveListHandler)
	http.HandleFunc("/api/updatelist", handler.UpdateListHandler)
	http.HandleFunc("/api/deletelist", handler.DeleteListHandler)
	http.HandleFunc("/api/getalllists", handler.GetAllListsHandler)

	http.HandleFunc("/api/savetask", handler.SaveTaskHandler)
	http.HandleFunc("/api/updatetask", handler.UpdateTaskHandler)

	log.Println("Server started at :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
