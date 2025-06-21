package auth

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var jwtKey = []byte("99c27360ea90ac0a145ef8bb887a86a235ef86c8737fec9b7965f520e951c45aae0273171265aa46e7e8813df771c9b730d5af21bf792653fdc334e734f79665e8ceb1f8d4035ac3372cda249d06d418bead5fa8cba4efd78a38eb02780fb625848905c75d1f51898c501a03544a0015758cf4b40b33b2e8cf2614b1bb6dbabb")

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string (bytes), err
}