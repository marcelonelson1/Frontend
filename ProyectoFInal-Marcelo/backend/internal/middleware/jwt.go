package middleware

import (
	"net/http"
	"notes-app/internal/services"
	"strings"

	"github.com/gin-gonic/gin"
)

type JWTMiddleware struct {
	authService *services.AuthService
}

func NewJWTMiddleware(authService *services.AuthService) *JWTMiddleware {
	return &JWTMiddleware{
		authService: authService,
	}
}

// Authenticate verifica el token JWT en las peticiones
func (m *JWTMiddleware) Authenticate() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Obtener el token del header Authorization
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Token de autorización no proporcionado",
			})
			c.Abort()
			return
		}

		// El token debe venir en formato "Bearer <token>"
		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Formato de token inválido",
			})
			c.Abort()
			return
		}

		tokenString := parts[1]

		// Validar el token
		userID, err := m.authService.ValidateToken(tokenString)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Token inválido o expirado",
			})
			c.Abort()
			return
		}

		// Guardar el user_id en el contexto para usarlo en los handlers
		c.Set("user_id", userID.String())
		c.Next()
	}
}

// OptionalAuthenticate es un middleware opcional que intenta autenticar pero no aborta si falla
func (m *JWTMiddleware) OptionalAuthenticate() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader != "" {
			parts := strings.Split(authHeader, " ")
			if len(parts) == 2 && parts[0] == "Bearer" {
				userID, err := m.authService.ValidateToken(parts[1])
				if err == nil {
					c.Set("user_id", userID.String())
				}
			}
		}
		c.Next()
	}
}
