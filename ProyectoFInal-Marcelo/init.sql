-- Initialize MariaDB database for Notes App
CREATE DATABASE IF NOT EXISTS notes_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user and grant privileges
CREATE USER IF NOT EXISTS 'notes_user'@'%' IDENTIFIED BY 'notes_password';
GRANT ALL PRIVILEGES ON notes_db.* TO 'notes_user'@'%';
FLUSH PRIVILEGES;

-- Switch to the notes database
USE notes_db;

-- Enable UUID functions
SET sql_mode = '';

-- Insert some default categories (optional)
-- Tables will be created by GORM auto-migration