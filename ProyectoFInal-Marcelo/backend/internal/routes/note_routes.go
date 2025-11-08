package routes

import (
	"notes-app/internal/controllers"
	"github.com/gin-gonic/gin"
)

func SetupNoteRoutes(rg *gin.RouterGroup, noteController *controllers.NoteController) {
	notes := rg.Group("/notes")
	{
		notes.POST("", noteController.CreateNote)
		notes.GET("", noteController.GetNotes)
		notes.GET("/:id", noteController.GetNote)
		notes.PUT("/:id", noteController.UpdateNote)
		notes.DELETE("/:id", noteController.DeleteNote)
		notes.PATCH("/:id/archive", noteController.ArchiveNote)
	}
}