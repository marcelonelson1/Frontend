package controllers

import (
	"net/http"
	"notes-app/internal/dto"
	"notes-app/internal/services"
	"notes-app/internal/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type AuthController struct {
	authService *services.AuthService
}

func NewAuthController(authService *services.AuthService) *AuthController {
	return &AuthController{
		authService: authService,
	}
}

// Register maneja el registro de nuevos usuarios
// POST /api/v1/auth/register
func (ctrl *AuthController) Register(c *gin.Context) {
	var req dto.RegisterRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Datos de registro inválidos", err.Error())
		return
	}

	response, err := ctrl.authService.Register(req)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, err.Error(), "")
		return
	}

	utils.SuccessResponse(c, http.StatusCreated, "Usuario registrado exitosamente", response)
}

// Login maneja el inicio de sesión
// POST /api/v1/auth/login
func (ctrl *AuthController) Login(c *gin.Context) {
	var req dto.LoginRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Datos de login inválidos", err.Error())
		return
	}

	response, err := ctrl.authService.Login(req)
	if err != nil {
		utils.ErrorResponse(c, http.StatusUnauthorized, err.Error(), "")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Login exitoso", response)
}

// GetCurrentUser obtiene el usuario actual autenticado
// GET /api/v1/auth/me
func (ctrl *AuthController) GetCurrentUser(c *gin.Context) {
	// El middleware JWT debe haber establecido el user_id en el contexto
	userIDStr, exists := c.Get("user_id")
	if !exists {
		utils.ErrorResponse(c, http.StatusUnauthorized, "No autenticado", "")
		return
	}

	userID, err := uuid.Parse(userIDStr.(string))
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "ID de usuario inválido", err.Error())
		return
	}

	user, err := ctrl.authService.GetUserByID(userID)
	if err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Usuario no encontrado", err.Error())
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Usuario obtenido exitosamente", user)
}
