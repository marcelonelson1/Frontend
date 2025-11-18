package config

import (
	"fmt"
	"log"
	"notes-app/internal/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func ConnectDatabase(config *Config) error {
	// Primero, conectar sin especificar la base de datos para poder crearla si no existe
	dsnWithoutDB := fmt.Sprintf("%s:%s@tcp(%s:%s)/?charset=utf8mb4&parseTime=True&loc=Local",
		config.DBUser,
		config.DBPassword,
		config.DBHost,
		config.DBPort,
	)

	dbTemp, err := gorm.Open(mysql.Open(dsnWithoutDB), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	})
	if err != nil {
		return fmt.Errorf("failed to connect to MySQL server: %w", err)
	}

	// Crear la base de datos si no existe
	createDBSQL := fmt.Sprintf("CREATE DATABASE IF NOT EXISTS `%s` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci", config.DBName)
	if err := dbTemp.Exec(createDBSQL).Error; err != nil {
		return fmt.Errorf("failed to create database: %w", err)
	}
	log.Printf("✓ Database '%s' is ready", config.DBName)

	// Ahora conectar a la base de datos específica
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		config.DBUser,
		config.DBPassword,
		config.DBHost,
		config.DBPort,
		config.DBName,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}

	DB = db

	// Auto Migrate
	if config.AutoMigrate == "true" {
		log.Println("🔄 Running auto migration...")
		err = AutoMigrate(db)
		if err != nil {
			return fmt.Errorf("failed to auto migrate: %w", err)
		}
		log.Println("✓ Auto migration completed successfully")
		log.Println("✓ Tables created: users, notes, categories, note_categories")
	}

	log.Println("✓ Database connection established successfully")
	return nil
}

func AutoMigrate(db *gorm.DB) error {
	return db.AutoMigrate(
		&models.User{},
		&models.Note{},
		&models.Category{},
	)
}

func GetDB() *gorm.DB {
	return DB
}
