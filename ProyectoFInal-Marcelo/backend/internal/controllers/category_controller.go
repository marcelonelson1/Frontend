package controllers

import (
	"net/http"
	"notes-app/internal/dto"
	"notes-app/internal/services"
	"notes-app/internal/utils"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CategoryController struct {
	categoryService services.CategoryService
}

func NewCategoryController(categoryService services.CategoryService) *CategoryController {
	return &CategoryController{
		categoryService: categoryService,
	}
}

func (c *CategoryController) CreateCategory(ctx *gin.Context) {
	var req dto.CreateCategoryRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		utils.ErrorResponse(ctx, http.StatusBadRequest, "Invalid request data", err.Error())
		return
	}

	category, err := c.categoryService.CreateCategory(req)
	if err != nil {
		if err.Error() == "category with this name already exists" {
			utils.ErrorResponse(ctx, http.StatusConflict, "Category already exists", err.Error())
			return
		}
		utils.ErrorResponse(ctx, http.StatusInternalServerError, "Failed to create category", err.Error())
		return
	}

	utils.SuccessResponse(ctx, http.StatusCreated, "Category created successfully", category)
}

func (c *CategoryController) GetCategory(ctx *gin.Context) {
	idParam := ctx.Param("id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		utils.ErrorResponse(ctx, http.StatusBadRequest, "Invalid category ID", err.Error())
		return
	}

	category, err := c.categoryService.GetCategoryByID(id)
	if err != nil {
		if err.Error() == "category not found" {
			utils.ErrorResponse(ctx, http.StatusNotFound, "Category not found", err.Error())
			return
		}
		utils.ErrorResponse(ctx, http.StatusInternalServerError, "Failed to get category", err.Error())
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Category retrieved successfully", category)
}

func (c *CategoryController) GetCategories(ctx *gin.Context) {
	categories, err := c.categoryService.GetCategories()
	if err != nil {
		utils.ErrorResponse(ctx, http.StatusInternalServerError, "Failed to get categories", err.Error())
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Categories retrieved successfully", categories)
}

func (c *CategoryController) UpdateCategory(ctx *gin.Context) {
	idParam := ctx.Param("id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		utils.ErrorResponse(ctx, http.StatusBadRequest, "Invalid category ID", err.Error())
		return
	}

	var req dto.UpdateCategoryRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		utils.ErrorResponse(ctx, http.StatusBadRequest, "Invalid request data", err.Error())
		return
	}

	category, err := c.categoryService.UpdateCategory(id, req)
	if err != nil {
		if err.Error() == "category not found" {
			utils.ErrorResponse(ctx, http.StatusNotFound, "Category not found", err.Error())
			return
		}
		if err.Error() == "category with this name already exists" {
			utils.ErrorResponse(ctx, http.StatusConflict, "Category already exists", err.Error())
			return
		}
		utils.ErrorResponse(ctx, http.StatusInternalServerError, "Failed to update category", err.Error())
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Category updated successfully", category)
}

func (c *CategoryController) DeleteCategory(ctx *gin.Context) {
	idParam := ctx.Param("id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		utils.ErrorResponse(ctx, http.StatusBadRequest, "Invalid category ID", err.Error())
		return
	}

	err = c.categoryService.DeleteCategory(id)
	if err != nil {
		if err.Error() == "category not found" {
			utils.ErrorResponse(ctx, http.StatusNotFound, "Category not found", err.Error())
			return
		}
		utils.ErrorResponse(ctx, http.StatusInternalServerError, "Failed to delete category", err.Error())
		return
	}

	utils.SuccessResponse(ctx, http.StatusOK, "Category deleted successfully", nil)
}