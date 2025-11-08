package models

import (
	"time"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Category struct {
	ID        uuid.UUID `json:"id" gorm:"type:char(36);primary_key"`
	Name      string    `json:"name" gorm:"unique;not null;size:100"`
	Color     string    `json:"color" gorm:"default:#6366f1;size:7"`
	Notes     []Note    `json:"notes,omitempty" gorm:"many2many:note_categories;"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (c *Category) BeforeCreate(tx *gorm.DB) error {
	if c.ID == uuid.Nil {
		c.ID = uuid.New()
	}
	return nil
}