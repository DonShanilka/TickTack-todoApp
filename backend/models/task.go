package models

type Task struct {
	Description string `json:"description" bson:"description"`
	Date        string `json:"date" bson:"date"`
}
