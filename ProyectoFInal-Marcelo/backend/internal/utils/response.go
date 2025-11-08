package utils

import (
	"notes-app/internal/dto"
	"github.com/gin-gonic/gin"
)

func SuccessResponse(ctx *gin.Context, statusCode int, message string, data interface{}) {
	response := dto.ApiResponse{
		Success: true,
		Message: message,
		Data:    data,
	}
	ctx.JSON(statusCode, response)
}

func ErrorResponse(ctx *gin.Context, statusCode int, message, error string) {
	response := dto.ErrorResponse{
		Success: false,
		Message: message,
		Error:   error,
	}
	ctx.JSON(statusCode, response)
}