package models

import (
	"time"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID        uuid.UUID `json:"id" gorm:"type:char(36);primary_key"`
	Username  string    `json:"username" gorm:"unique;not null;size:100"`
	Email     string    `json:"email" gorm:"unique;not null;size:255"`
	Password  string    `json:"-" gorm:"not null"` // El "-" evita que se serialice en JSON
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (u *User) BeforeCreate(tx *gorm.DB) error {
	if u.ID == uuid.Nil {
		u.ID = uuid.New()
	}
	return nil
}

// HashPassword hashea la contraseña del usuario
func (u *User) HashPassword(password string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)
	return nil
}

// CheckPassword verifica si la contraseña es correcta
func (u *User) CheckPassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
	return err == nil
}
