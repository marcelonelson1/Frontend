package repositories

import (
	"notes-app/internal/dto"
	"notes-app/internal/models"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type noteRepository struct {
	db *gorm.DB
}

func NewNoteRepository(db *gorm.DB) NoteRepository {
	return &noteRepository{db: db}
}

func (r *noteRepository) Create(note *models.Note) error {
	return r.db.Create(note).Error
}

func (r *noteRepository) GetByID(id uuid.UUID) (*models.Note, error) {
	var note models.Note
	err := r.db.Preload("Categories").First(&note, "id = ?", id).Error
	if err != nil {
		return nil, err
	}
	return &note, nil
}

func (r *noteRepository) GetAll(filter dto.NoteFilterRequest) ([]models.Note, int64, error) {
	var notes []models.Note
	var total int64

	query := r.db.Model(&models.Note{}).Preload("Categories")

	// Apply filters
	if filter.IsArchived != nil {
		query = query.Where("is_archived = ?", *filter.IsArchived)
	}

	if filter.CategoryID != nil {
		query = query.Joins("JOIN note_categories ON notes.id = note_categories.note_id").
			Where("note_categories.category_id = ?", *filter.CategoryID)
	}

	if filter.Search != "" {
		searchTerm := "%" + filter.Search + "%"
		query = query.Where("title LIKE ? OR content LIKE ?", searchTerm, searchTerm)
	}

	// Count total records
	query.Count(&total)

	// Apply pagination
	if filter.Limit > 0 {
		query = query.Limit(filter.Limit)
	}
	if filter.Offset > 0 {
		query = query.Offset(filter.Offset)
	}

	// Order by updated_at desc
	err := query.Order("updated_at DESC").Find(&notes).Error
	return notes, total, err
}

func (r *noteRepository) Update(note *models.Note) error {
	return r.db.Save(note).Error
}

func (r *noteRepository) Delete(id uuid.UUID) error {
	// Start a transaction to ensure atomicity
	tx := r.db.Begin()
	if tx.Error != nil {
		return tx.Error
	}

	// First, delete the note-category associations
	if err := tx.Exec("DELETE FROM note_categories WHERE note_id = ?", id).Error; err != nil {
		tx.Rollback()
		return err
	}

	// Then, delete the note itself
	if err := tx.Delete(&models.Note{}, "id = ?", id).Error; err != nil {
		tx.Rollback()
		return err
	}

	// Commit the transaction
	return tx.Commit().Error
}

func (r *noteRepository) Archive(id uuid.UUID, isArchived bool) error {
	return r.db.Model(&models.Note{}).Where("id = ?", id).Update("is_archived", isArchived).Error
}

func (r *noteRepository) AddCategories(noteID uuid.UUID, categoryIDs []uuid.UUID) error {
	var note models.Note
	if err := r.db.First(&note, "id = ?", noteID).Error; err != nil {
		return err
	}

	var categories []models.Category
	if err := r.db.Where("id IN ?", categoryIDs).Find(&categories).Error; err != nil {
		return err
	}

	return r.db.Model(&note).Association("Categories").Append(categories)
}

func (r *noteRepository) RemoveCategories(noteID uuid.UUID, categoryIDs []uuid.UUID) error {
	var note models.Note
	if err := r.db.First(&note, "id = ?", noteID).Error; err != nil {
		return err
	}

	var categories []models.Category
	if err := r.db.Where("id IN ?", categoryIDs).Find(&categories).Error; err != nil {
		return err
	}

	return r.db.Model(&note).Association("Categories").Delete(categories)
}