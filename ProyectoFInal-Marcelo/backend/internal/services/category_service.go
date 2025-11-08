package services

import (
	"errors"
	"notes-app/internal/dto"
	"notes-app/internal/models"
	"notes-app/internal/repositories"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type CategoryService interface {
	CreateCategory(req dto.CreateCategoryRequest) (*models.Category, error)
	GetCategoryByID(id uuid.UUID) (*models.Category, error)
	GetCategories() ([]models.Category, error)
	UpdateCategory(id uuid.UUID, req dto.UpdateCategoryRequest) (*models.Category, error)
	DeleteCategory(id uuid.UUID) error
}

type categoryService struct {
	categoryRepo repositories.CategoryRepository
}

func NewCategoryService(categoryRepo repositories.CategoryRepository) CategoryService {
	return &categoryService{
		categoryRepo: categoryRepo,
	}
}

func (s *categoryService) CreateCategory(req dto.CreateCategoryRequest) (*models.Category, error) {
	// Check if category with same name exists
	existingCategory, err := s.categoryRepo.GetByName(req.Name)
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}
	if existingCategory != nil {
		return nil, errors.New("category with this name already exists")
	}

	category := &models.Category{
		Name:  req.Name,
		Color: req.Color,
	}

	// Set default color if not provided
	if category.Color == "" {
		category.Color = "#6366f1"
	}

	if err := s.categoryRepo.Create(category); err != nil {
		return nil, err
	}

	return category, nil
}

func (s *categoryService) GetCategoryByID(id uuid.UUID) (*models.Category, error) {
	category, err := s.categoryRepo.GetByID(id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("category not found")
		}
		return nil, err
	}
	return category, nil
}

func (s *categoryService) GetCategories() ([]models.Category, error) {
	return s.categoryRepo.GetAll()
}

func (s *categoryService) UpdateCategory(id uuid.UUID, req dto.UpdateCategoryRequest) (*models.Category, error) {
	// Get existing category
	category, err := s.categoryRepo.GetByID(id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("category not found")
		}
		return nil, err
	}

	// Check if new name already exists (if name is being updated)
	if req.Name != "" && req.Name != category.Name {
		existingCategory, err := s.categoryRepo.GetByName(req.Name)
		if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, err
		}
		if existingCategory != nil {
			return nil, errors.New("category with this name already exists")
		}
		category.Name = req.Name
	}

	// Update color if provided
	if req.Color != "" {
		category.Color = req.Color
	}

	if err := s.categoryRepo.Update(category); err != nil {
		return nil, err
	}

	return category, nil
}

func (s *categoryService) DeleteCategory(id uuid.UUID) error {
	// Check if category exists
	_, err := s.categoryRepo.GetByID(id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return errors.New("category not found")
		}
		return err
	}

	return s.categoryRepo.Delete(id)
}