package dto

import "github.com/google/uuid"

// LoginRequest representa la solicitud de login
type LoginRequest struct {
	Username string `json:"username" binding:"required,min=3"`
	Password string `json:"password" binding:"required,min=6"`
}

// RegisterRequest representa la solicitud de registro
type RegisterRequest struct {
	Username string `json:"username" binding:"required,min=3,max=100"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

// AuthResponse representa la respuesta de autenticación
type AuthResponse struct {
	Token string      `json:"token"`
	User  UserResponse `json:"user"`
}

// UserResponse representa los datos del usuario en las respuestas
type UserResponse struct {
	ID       uuid.UUID `json:"id"`
	Username string    `json:"username"`
	Email    string    `json:"email"`
}
