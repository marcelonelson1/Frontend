package routes

import (
	"notes-app/internal/controllers"
	"github.com/gin-gonic/gin"
)

func SetupCategoryRoutes(rg *gin.RouterGroup, categoryController *controllers.CategoryController) {
	categories := rg.Group("/categories")
	{
		categories.POST("", categoryController.CreateCategory)
		categories.GET("", categoryController.GetCategories)
		categories.GET("/:id", categoryController.GetCategory)
		categories.PUT("/:id", categoryController.UpdateCategory)
		categories.DELETE("/:id", categoryController.DeleteCategory)
	}
}