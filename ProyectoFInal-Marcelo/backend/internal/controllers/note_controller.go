package controllers

import (
	"net/http"
	"notes-app/internal/dto"
	"notes-app/internal/services"
	"notes-app/internal/utils"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type NoteController struct {
	noteService services.NoteService
}

func NewNoteController(noteService services.NoteService) *NoteController {
	return &NoteController{
		noteService: noteService,
	}
}

func (c *NoteController) CreateNote(ctx *gin.Context) {
	var req dto.CreateNoteRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		utils.ErrorResponse(ctx, http.StatusBadRequest, "Invalid request data", err.Error())
		return
	}

	note, err := c.noteService.CreateNote(req)
	if err != nil {
		utils.ErrorResponse(ctx, http.StatusInternalServerError, "Failed to create note", err.Error())
		return
	}

	utils.SuccessResponse(ctx, http.StatusCreated, "Note created successfully", note)
}

func (c *NoteController) GetNote(ctx *gin.Context) {
	idParam := ctx.Param("id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		utils.ErrorResponse(ctx, http.StatusBadRequest, "Invalid note ID", err.Error())
		return
	}

	note, err := c.noteService.GetNoteByID(id)
	if err != nil {
		if err.Error() == "note not found" {
			utils.ErrorResponse(ctx, http.StatusNotFound, "Note not found", err.Error())
			return
		}
		utils.ErrorResponse(ctx, http.StatusInternalServerError, "Failed to get note", err.Error())
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Note retrieved successfully", note)
}

func (c *NoteController) GetNotes(ctx *gin.Context) {
	var filter dto.NoteFilterRequest
	if err := ctx.ShouldBindQuery(&filter); err != nil {
		utils.ErrorResponse(ctx, http.StatusBadRequest, "Invalid query parameters", err.Error())
		return
	}

	notes, total, err := c.noteService.GetNotes(filter)
	if err != nil {
		utils.ErrorResponse(ctx, http.StatusInternalServerError, "Failed to get notes", err.Error())
		return
	}

	response := dto.PaginatedResponse{
		Success: true,
		Message: "Notes retrieved successfully",
		Data:    notes,
		Meta: dto.MetaData{
			Total:  total,
			Limit:  filter.Limit,
			Offset: filter.Offset,
		},
	}

	ctx.JSON(http.StatusOK, response)
}

func (c *NoteController) UpdateNote(ctx *gin.Context) {
	idParam := ctx.Param("id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		utils.ErrorResponse(ctx, http.StatusBadRequest, "Invalid note ID", err.Error())
		return
	}

	var req dto.UpdateNoteRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		utils.ErrorResponse(ctx, http.StatusBadRequest, "Invalid request data", err.Error())
		return
	}

	note, err := c.noteService.UpdateNote(id, req)
	if err != nil {
		if err.Error() == "note not found" {
			utils.ErrorResponse(ctx, http.StatusNotFound, "Note not found", err.Error())
			return
		}
		utils.ErrorResponse(ctx, http.StatusInternalServerError, "Failed to update note", err.Error())
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Note updated successfully", note)
}

func (c *NoteController) DeleteNote(ctx *gin.Context) {
	idParam := ctx.Param("id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		utils.ErrorResponse(ctx, http.StatusBadRequest, "Invalid note ID", err.Error())
		return
	}

	err = c.noteService.DeleteNote(id)
	if err != nil {
		if err.Error() == "note not found" {
			utils.ErrorResponse(ctx, http.StatusNotFound, "Note not found", err.Error())
			return
		}
		utils.ErrorResponse(ctx, http.StatusInternalServerError, "Failed to delete note", err.Error())
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Note deleted successfully", nil)
}

func (c *NoteController) ArchiveNote(ctx *gin.Context) {
	idParam := ctx.Param("id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		utils.ErrorResponse(ctx, http.StatusBadRequest, "Invalid note ID", err.Error())
		return
	}

	var req dto.ArchiveNoteRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		utils.ErrorResponse(ctx, http.StatusBadRequest, "Invalid request data", err.Error())
		return
	}

	note, err := c.noteService.ArchiveNote(id, req)
	if err != nil {
		if err.Error() == "note not found" {
			utils.ErrorResponse(ctx, http.StatusNotFound, "Note not found", err.Error())
			return
		}
		utils.ErrorResponse(ctx, http.StatusInternalServerError, "Failed to archive note", err.Error())
		return
	}

	action := "archived"
	if !req.IsArchived {
		action = "unarchived"
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Note "+action+" successfully", note)
}