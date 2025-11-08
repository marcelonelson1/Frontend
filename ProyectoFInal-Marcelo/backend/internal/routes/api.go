package routes

import (
	"notes-app/internal/controllers"
	"notes-app/internal/middleware"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(
	router *gin.Engine,
	noteController *controllers.NoteController,
	categoryController *controllers.CategoryController,
	authController *controllers.AuthController,
	jwtMiddleware *middleware.JWTMiddleware,
) {
	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"success": true, "status": "OK", "message": "Notes API is running"})
	})

	// API v1 routes
	v1 := router.Group("/api/v1")
	{
		// Auth routes (públicas)
		SetupAuthRoutes(v1, authController, jwtMiddleware)

		// Note routes (públicas por ahora, puedes protegerlas si quieres)
		SetupNoteRoutes(v1, noteController)

		// Category routes (públicas por ahora)
		SetupCategoryRoutes(v1, categoryController)
	}
}