package config

import (
	"os"
	"github.com/joho/godotenv"
)

type Config struct {
	DBHost         string
	DBPort         string
	DBUser         string
	DBPassword     string
	DBName         string
	Port           string
	GinMode        string
	AllowedOrigins string
	AutoMigrate    string
	JWTSecret      string
}

func LoadConfig() (*Config, error) {
	// Load .env file if it exists
	_ = godotenv.Load()

	config := &Config{
		DBHost:         getEnv("DB_HOST", "localhost"),
		DBPort:         getEnv("DB_PORT", "3306"),
		DBUser:         getEnv("DB_USER", "root"),
		DBPassword:     getEnv("DB_PASSWORD", "root"),
		DBName:         getEnv("DB_NAME", "notes_db"),
		Port:           getEnv("PORT", "8080"),
		GinMode:        getEnv("GIN_MODE", "debug"),
		AllowedOrigins: getEnv("ALLOWED_ORIGINS", "http://localhost:3000"),
		AutoMigrate:    getEnv("AUTO_MIGRATE", "true"),
		JWTSecret:      getEnv("JWT_SECRET", "your-secret-key-change-in-production"),
	}

	return config, nil
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}