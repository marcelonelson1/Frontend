package repositories

import (
	"notes-app/internal/dto"
	"notes-app/internal/models"
	"github.com/google/uuid"
)

type NoteRepository interface {
	Create(note *models.Note) error
	GetByID(id uuid.UUID) (*models.Note, error)
	GetAll(filter dto.NoteFilterRequest) ([]models.Note, int64, error)
	Update(note *models.Note) error
	Delete(id uuid.UUID) error
	Archive(id uuid.UUID, isArchived bool) error
	AddCategories(noteID uuid.UUID, categoryIDs []uuid.UUID) error
	RemoveCategories(noteID uuid.UUID, categoryIDs []uuid.UUID) error
}

type CategoryRepository interface {
	Create(category *models.Category) error
	GetByID(id uuid.UUID) (*models.Category, error)
	GetAll() ([]models.Category, error)
	Update(category *models.Category) error
	Delete(id uuid.UUID) error
	GetByName(name string) (*models.Category, error)
}

type UserRepository interface {
	Create(user *models.User) error
	GetByID(id uuid.UUID) (*models.User, error)
	GetByUsername(username string) (*models.User, error)
	GetByEmail(email string) (*models.User, error)
	GetAll() ([]models.User, error)
	Update(user *models.User) error
	Delete(id uuid.UUID) error
}