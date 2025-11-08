package main

import (
	"log"
	"notes-app/internal/config"
	"notes-app/internal/controllers"
	"notes-app/internal/middleware"
	"notes-app/internal/repositories"
	"notes-app/internal/routes"
	"notes-app/internal/services"
	"github.com/gin-gonic/gin"
)

func main() {
	// Load configuration
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatal("Failed to load config: ", err)
	}

	// Connect to database
	if err := config.ConnectDatabase(cfg); err != nil {
		log.Fatal("Failed to connect to database: ", err)
	}

	// Set Gin mode
	gin.SetMode(cfg.GinMode)

	// Initialize repositories
	db := config.GetDB()
	noteRepo := repositories.NewNoteRepository(db)
	categoryRepo := repositories.NewCategoryRepository(db)
	userRepo := repositories.NewUserRepository(db)

	// Initialize services
	noteService := services.NewNoteService(noteRepo, categoryRepo)
	categoryService := services.NewCategoryService(categoryRepo)
	authService := services.NewAuthService(userRepo, cfg.JWTSecret)

	// Initialize controllers
	noteController := controllers.NewNoteController(noteService)
	categoryController := controllers.NewCategoryController(categoryService)
	authController := controllers.NewAuthController(authService)

	// Initialize middleware
	jwtMiddleware := middleware.NewJWTMiddleware(authService)

	// Initialize Gin router
	router := gin.New()

	// Middleware
	router.Use(middleware.LoggerMiddleware())
	router.Use(gin.Recovery())
	router.Use(middleware.CORSMiddleware(cfg.AllowedOrigins))

	// Setup routes
	routes.SetupRoutes(router, noteController, categoryController, authController, jwtMiddleware)

	// Start server
	log.Printf("🚀 Server starting on port %s", cfg.Port)
	log.Printf("🗄️ Database connected successfully")
	log.Printf("🌐 CORS enabled for: %s", cfg.AllowedOrigins)
	
	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatal("Failed to start server: ", err)
	}
}