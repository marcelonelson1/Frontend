package routes

import (
	"notes-app/internal/controllers"
	"notes-app/internal/middleware"
	"github.com/gin-gonic/gin"
)

func SetupAuthRoutes(rg *gin.RouterGroup, authController *controllers.AuthController, authMiddleware *middleware.JWTMiddleware) {
	auth := rg.Group("/auth")
	{
		// Rutas públicas
		auth.POST("/register", authController.Register)
		auth.POST("/login", authController.Login)

		// Rutas protegidas
		auth.GET("/me", authMiddleware.Authenticate(), authController.GetCurrentUser)
	}
}
