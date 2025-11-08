package services

import (
	"errors"
	"notes-app/internal/dto"
	"notes-app/internal/models"
	"notes-app/internal/repositories"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type AuthService struct {
	userRepo  repositories.UserRepository
	jwtSecret string
}

func NewAuthService(userRepo repositories.UserRepository, jwtSecret string) *AuthService {
	return &AuthService{
		userRepo:  userRepo,
		jwtSecret: jwtSecret,
	}
}

// Register crea un nuevo usuario
func (s *AuthService) Register(req dto.RegisterRequest) (*dto.AuthResponse, error) {
	// Verificar si el usuario ya existe
	existingUser, err := s.userRepo.GetByUsername(req.Username)
	if err == nil && existingUser != nil {
		return nil, errors.New("el nombre de usuario ya está en uso")
	}

	// Verificar si el email ya existe
	existingEmail, err := s.userRepo.GetByEmail(req.Email)
	if err == nil && existingEmail != nil {
		return nil, errors.New("el email ya está en uso")
	}

	// Crear el usuario
	user := &models.User{
		Username: req.Username,
		Email:    req.Email,
	}

	// Hashear la contraseña
	if err := user.HashPassword(req.Password); err != nil {
		return nil, errors.New("error al procesar la contraseña")
	}

	// Guardar en la base de datos
	if err := s.userRepo.Create(user); err != nil {
		return nil, errors.New("error al crear el usuario")
	}

	// Generar token JWT
	token, err := s.generateToken(user)
	if err != nil {
		return nil, err
	}

	return &dto.AuthResponse{
		Token: token,
		User: dto.UserResponse{
			ID:       user.ID,
			Username: user.Username,
			Email:    user.Email,
		},
	}, nil
}

// Login autentica a un usuario
func (s *AuthService) Login(req dto.LoginRequest) (*dto.AuthResponse, error) {
	// Buscar usuario por username
	user, err := s.userRepo.GetByUsername(req.Username)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("credenciales inválidas")
		}
		return nil, errors.New("error al buscar el usuario")
	}

	// Verificar la contraseña
	if !user.CheckPassword(req.Password) {
		return nil, errors.New("credenciales inválidas")
	}

	// Generar token JWT
	token, err := s.generateToken(user)
	if err != nil {
		return nil, err
	}

	return &dto.AuthResponse{
		Token: token,
		User: dto.UserResponse{
			ID:       user.ID,
			Username: user.Username,
			Email:    user.Email,
		},
	}, nil
}

// GetUserByID obtiene un usuario por ID
func (s *AuthService) GetUserByID(id uuid.UUID) (*dto.UserResponse, error) {
	user, err := s.userRepo.GetByID(id)
	if err != nil {
		return nil, err
	}

	return &dto.UserResponse{
		ID:       user.ID,
		Username: user.Username,
		Email:    user.Email,
	}, nil
}

// generateToken genera un JWT token para un usuario
func (s *AuthService) generateToken(user *models.User) (string, error) {
	claims := jwt.MapClaims{
		"user_id":  user.ID.String(),
		"username": user.Username,
		"email":    user.Email,
		"exp":      time.Now().Add(time.Hour * 24 * 7).Unix(), // 7 días
		"iat":      time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(s.jwtSecret))
	if err != nil {
		return "", errors.New("error al generar el token")
	}

	return tokenString, nil
}

// ValidateToken valida un JWT token y retorna el user ID
func (s *AuthService) ValidateToken(tokenString string) (uuid.UUID, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("método de firma inesperado")
		}
		return []byte(s.jwtSecret), nil
	})

	if err != nil {
		return uuid.Nil, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		userIDStr, ok := claims["user_id"].(string)
		if !ok {
			return uuid.Nil, errors.New("user_id no encontrado en el token")
		}

		userID, err := uuid.Parse(userIDStr)
		if err != nil {
			return uuid.Nil, errors.New("user_id inválido")
		}

		return userID, nil
	}

	return uuid.Nil, errors.New("token inválido")
}
