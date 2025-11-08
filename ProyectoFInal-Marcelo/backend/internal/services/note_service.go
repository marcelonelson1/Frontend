package services

import (
	"errors"
	"notes-app/internal/dto"
	"notes-app/internal/models"
	"notes-app/internal/repositories"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type NoteService interface {
	CreateNote(req dto.CreateNoteRequest) (*models.Note, error)
	GetNoteByID(id uuid.UUID) (*models.Note, error)
	GetNotes(filter dto.NoteFilterRequest) ([]models.Note, int64, error)
	UpdateNote(id uuid.UUID, req dto.UpdateNoteRequest) (*models.Note, error)
	DeleteNote(id uuid.UUID) error
	ArchiveNote(id uuid.UUID, req dto.ArchiveNoteRequest) (*models.Note, error)
}

type noteService struct {
	noteRepo     repositories.NoteRepository
	categoryRepo repositories.CategoryRepository
}

func NewNoteService(noteRepo repositories.NoteRepository, categoryRepo repositories.CategoryRepository) NoteService {
	return &noteService{
		noteRepo:     noteRepo,
		categoryRepo: categoryRepo,
	}
}

func (s *noteService) CreateNote(req dto.CreateNoteRequest) (*models.Note, error) {
	note := &models.Note{
		Title:   req.Title,
		Content: req.Content,
	}

	// Create note first
	if err := s.noteRepo.Create(note); err != nil {
		return nil, err
	}

	// Add categories if provided
	if len(req.Categories) > 0 {
		if err := s.noteRepo.AddCategories(note.ID, req.Categories); err != nil {
			return nil, err
		}
	}

	// Fetch and return the complete note with categories
	return s.noteRepo.GetByID(note.ID)
}

func (s *noteService) GetNoteByID(id uuid.UUID) (*models.Note, error) {
	note, err := s.noteRepo.GetByID(id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("note not found")
		}
		return nil, err
	}
	return note, nil
}

func (s *noteService) GetNotes(filter dto.NoteFilterRequest) ([]models.Note, int64, error) {
	return s.noteRepo.GetAll(filter)
}

func (s *noteService) UpdateNote(id uuid.UUID, req dto.UpdateNoteRequest) (*models.Note, error) {
	// Get existing note
	note, err := s.noteRepo.GetByID(id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("note not found")
		}
		return nil, err
	}

	// Update fields
	if req.Title != "" {
		note.Title = req.Title
	}
	note.Content = req.Content

	// Update note
	if err := s.noteRepo.Update(note); err != nil {
		return nil, err
	}

	// Update categories if provided
	if req.Categories != nil {
		// Clear existing categories
		if err := s.noteRepo.RemoveCategories(note.ID, []uuid.UUID{}); err != nil {
			return nil, err
		}

		// Add new categories
		if len(req.Categories) > 0 {
			if err := s.noteRepo.AddCategories(note.ID, req.Categories); err != nil {
				return nil, err
			}
		}
	}

	// Return updated note
	return s.noteRepo.GetByID(id)
}

func (s *noteService) DeleteNote(id uuid.UUID) error {
	// Check if note exists
	_, err := s.noteRepo.GetByID(id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return errors.New("note not found")
		}
		return err
	}

	return s.noteRepo.Delete(id)
}

func (s *noteService) ArchiveNote(id uuid.UUID, req dto.ArchiveNoteRequest) (*models.Note, error) {
	// Check if note exists
	_, err := s.noteRepo.GetByID(id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("note not found")
		}
		return nil, err
	}

	// Update archive status
	if err := s.noteRepo.Archive(id, req.IsArchived); err != nil {
		return nil, err
	}

	// Return updated note
	return s.noteRepo.GetByID(id)
}