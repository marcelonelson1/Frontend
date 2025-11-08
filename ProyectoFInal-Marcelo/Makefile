# Notes App Makefile

.PHONY: help build dev start stop clean test lint backend frontend docker-build docker-up docker-down

# Default target
help:
	@echo "Available targets:"
	@echo "  build        Build the entire application"
	@echo "  dev          Start in development mode"
	@echo "  start        Start with Docker Compose"
	@echo "  stop         Stop all services"
	@echo "  clean        Clean up containers and volumes"
	@echo "  test         Run all tests"
	@echo "  lint         Run linters"
	@echo "  backend      Backend specific commands"
	@echo "  frontend     Frontend specific commands"
	@echo "  docker-*     Docker specific commands"

# Build everything
build: docker-build

# Development mode
dev:
	@./setup.sh dev

# Start with Docker
start:
	@./setup.sh docker

# Stop services
stop:
	@./setup.sh stop

# Clean everything
clean:
	@./setup.sh clean

# Run tests
test: test-backend test-frontend

test-backend:
	@echo "Running backend tests..."
	cd backend && go test ./...

test-frontend:
	@echo "Running frontend tests..."
	cd frontend && npm test -- --watchAll=false

# Lint code
lint: lint-backend lint-frontend

lint-backend:
	@echo "Running backend linter..."
	cd backend && go fmt ./...
	cd backend && go vet ./...

lint-frontend:
	@echo "Running frontend linter..."
	cd frontend && npm run lint

# Backend commands
backend-install:
	cd backend && go mod tidy

backend-run:
	cd backend && go run cmd/main.go

backend-build:
	cd backend && CGO_ENABLED=0 GOOS=linux go build -o main cmd/main.go

# Frontend commands
frontend-install:
	cd frontend && npm install

frontend-dev:
	cd frontend && npm start

frontend-build:
	cd frontend && npm run build

frontend-test:
	cd frontend && npm test

# Docker commands
docker-build:
	docker-compose build

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

docker-logs:
	docker-compose logs -f

docker-clean:
	docker-compose down -v --rmi all

# Database commands
db-reset:
	docker-compose down -v
	docker-compose up -d mariadb

# Health check
health:
	@echo "Checking application health..."
	@curl -f http://localhost:8080/health || echo "Backend not responding"
	@curl -f http://localhost:3000 || echo "Frontend not responding"

# Install dependencies
install: backend-install frontend-install

# Complete setup
setup:
	@./setup.sh docker