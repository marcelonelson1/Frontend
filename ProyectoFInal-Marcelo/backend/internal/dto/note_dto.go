package dto

import "github.com/google/uuid"

type CreateNoteRequest struct {
	Title      string      `json:"title" binding:"required,min=1,max=255"`
	Content    string      `json:"content"`
	Categories []uuid.UUID `json:"categories"`
}

type UpdateNoteRequest struct {
	Title      string      `json:"title" binding:"omitempty,min=1,max=255"`
	Content    string      `json:"content"`
	Categories []uuid.UUID `json:"categories"`
}

type ArchiveNoteRequest struct {
	IsArchived bool `json:"is_archived"`
}

type NoteFilterRequest struct {
	IsArchived *bool       `form:"is_archived"`
	CategoryID *uuid.UUID  `form:"category_id"`
	Search     string      `form:"search"`
	Limit      int         `form:"limit,default=50"`
	Offset     int         `form:"offset,default=0"`
}