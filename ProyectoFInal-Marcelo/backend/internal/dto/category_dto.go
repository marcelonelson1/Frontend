package dto

type CreateCategoryRequest struct {
	Name  string `json:"name" binding:"required,min=1,max=100"`
	Color string `json:"color" binding:"omitempty,len=7"`
}

type UpdateCategoryRequest struct {
	Name  string `json:"name" binding:"omitempty,min=1,max=100"`
	Color string `json:"color" binding:"omitempty,len=7"`
}