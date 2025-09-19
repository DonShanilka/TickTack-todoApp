package store

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

type List struct {
	ID        int
	Title     string
	UserID    int
	UserEmail string
}


