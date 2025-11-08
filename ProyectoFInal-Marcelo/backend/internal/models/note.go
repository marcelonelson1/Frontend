package models

import (
	"time"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Note struct {
	ID         uuid.UUID  `json:"id" gorm:"type:char(36);primary_key"`
	Title      string     `json:"title" gorm:"not null;size:255"`
	Content    string     `json:"content" gorm:"type:longtext"`
	IsArchived bool       `json:"is_archived" gorm:"default:false"`
	Categories []Category `json:"categories" gorm:"many2many:note_categories;"`
	CreatedAt  time.Time  `json:"created_at"`
	UpdatedAt  time.Time  `json:"updated_at"`
}

func (n *Note) BeforeCreate(tx *gorm.DB) error {
	if n.ID == uuid.Nil {
		n.ID = uuid.New()
	}
	return nil
}