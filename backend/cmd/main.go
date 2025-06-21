package main

import (
	"log"
	"fmt"
	"time"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	// "github.com/joho/godotenv"
)

var DB *sql.DB

func InitDB(dsn string) error {
	var err error
	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Printf("Error opening the database: %v", err)
		return err
	}

	err = DB.Ping()
	if err != nil {
		log.Printf("Error pingin+g the database: %v", err)
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
		err = InitDB(dsn)
		if err == nil {
			break
		}
		log.Println("DB not ready, retrying in 2 seconds...")
		time.Sleep(2 * time.Second)
	}
	
	if err != nil {
		log.Fatalf("DB error after retries: %v", err)
	}

}