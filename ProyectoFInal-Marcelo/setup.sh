#!/bin/bash

# Notes App Setup Script
# This script sets up and runs the complete Notes application

set -e

echo "🚀 Setting up Notes App..."
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if required tools are installed
check_requirements() {
    print_info "Checking requirements..."
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    # Check Go (for development)
    if ! command -v go &> /dev/null; then
        print_warning "Go is not installed. Only Docker mode will be available."
    else
        print_status "Go $(go version | cut -d' ' -f3) is installed"
    fi
    
    # Check Node.js (for development)
    if ! command -v node &> /dev/null; then
        print_warning "Node.js is not installed. Only Docker mode will be available."
    else
        print_status "Node.js $(node --version) is installed"
    fi
    
    print_status "Requirements check completed"
}

# Setup environment files
setup_env_files() {
    print_info "Setting up environment files..."
    
    # Backend .env
    if [ ! -f "backend/.env" ]; then
        cp backend/.env.example backend/.env
        print_status "Created backend/.env from template"
    else
        print_warning "backend/.env already exists, skipping..."
    fi
    
    # Frontend .env
    if [ ! -f "frontend/.env" ]; then
        cp frontend/.env.example frontend/.env
        print_status "Created frontend/.env from template"
    else
        print_warning "frontend/.env already exists, skipping..."
    fi
}

# Run with Docker Compose
run_with_docker() {
    print_info "Starting application with Docker Compose..."
    
    # Stop any existing containers
    docker-compose down -v 2>/dev/null || true
    
    # Build and start services
    print_info "Building and starting services..."
    docker-compose up --build -d
    
    # Wait for services to be ready
    print_info "Waiting for services to be ready..."
    
    # Wait for MariaDB
    print_info "Waiting for MariaDB to be ready..."
    timeout=60
    while ! docker-compose exec -T mariadb mysqladmin ping -h localhost -u notes_user -pnotes_password --silent; do
        sleep 2
        timeout=$((timeout - 2))
        if [ $timeout -le 0 ]; then
            print_error "MariaDB failed to start within 60 seconds"
            docker-compose logs mariadb
            exit 1
        fi
    done
    print_status "MariaDB is ready"
    
    # Wait for backend
    print_info "Waiting for backend API to be ready..."
    timeout=60
    while ! curl -f http://localhost:8080/health &>/dev/null; do
        sleep 2
        timeout=$((timeout - 2))
        if [ $timeout -le 0 ]; then
            print_error "Backend API failed to start within 60 seconds"
            docker-compose logs backend
            exit 1
        fi
    done
    print_status "Backend API is ready"
    
    # Wait for frontend
    print_info "Waiting for frontend to be ready..."
    timeout=60
    while ! curl -f http://localhost:3000 &>/dev/null; do
        sleep 2
        timeout=$((timeout - 2))
        if [ $timeout -le 0 ]; then
            print_error "Frontend failed to start within 60 seconds"
            docker-compose logs frontend
            exit 1
        fi
    done
    print_status "Frontend is ready"
    
    print_status "All services are running!"
    echo ""
    echo "🌐 Application URLs:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend API: http://localhost:8080"
    echo "   API Health: http://localhost:8080/health"
    echo ""
    echo "📊 Database Connection:"
    echo "   Host: localhost:3306"
    echo "   Database: notes_db"
    echo "   Username: notes_user"
    echo "   Password: notes_password"
    echo ""
    echo "🔍 To view logs: docker-compose logs -f [service_name]"
    echo "🛑 To stop: docker-compose down"
}

# Run in development mode
run_development() {
    if ! command -v go &> /dev/null || ! command -v node &> /dev/null; then
        print_error "Development mode requires both Go and Node.js to be installed"
        exit 1
    fi
    
    print_info "Starting application in development mode..."
    
    # Start MariaDB with Docker
    print_info "Starting MariaDB with Docker..."
    docker-compose up -d mariadb
    
    # Wait for MariaDB
    print_info "Waiting for MariaDB to be ready..."
    while ! docker-compose exec -T mariadb mysqladmin ping -h localhost -u notes_user -pnotes_password --silent; do
        sleep 2
    done
    print_status "MariaDB is ready"
    
    # Install backend dependencies
    print_info "Installing backend dependencies..."
    cd backend
    go mod tidy
    cd ..
    
    # Install frontend dependencies
    print_info "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    
    print_status "Dependencies installed"
    print_info "Starting backend and frontend servers..."
    
    # Start backend in background
    cd backend
    go run cmd/main.go &
    BACKEND_PID=$!
    cd ..
    
    # Start frontend in background
    cd frontend
    npm start &
    FRONTEND_PID=$!
    cd ..
    
    # Function to cleanup on exit
    cleanup() {
        print_info "Shutting down servers..."
        kill $BACKEND_PID 2>/dev/null || true
        kill $FRONTEND_PID 2>/dev/null || true
        docker-compose stop mariadb
        exit 0
    }
    
    # Register cleanup function
    trap cleanup INT TERM EXIT
    
    print_status "Development servers started!"
    echo ""
    echo "🌐 Application URLs:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend API: http://localhost:8080"
    echo ""
    echo "Press Ctrl+C to stop all services"
    
    # Wait for user to stop
    wait
}

# Show usage
show_usage() {
    echo "Usage: $0 [option]"
    echo ""
    echo "Options:"
    echo "  docker     Run with Docker Compose (default)"
    echo "  dev        Run in development mode"
    echo "  stop       Stop all services"
    echo "  clean      Clean up containers and volumes"
    echo "  help       Show this help message"
    echo ""
}

# Stop all services
stop_services() {
    print_info "Stopping all services..."
    docker-compose down
    print_status "All services stopped"
}

# Clean up everything
clean_up() {
    print_info "Cleaning up containers, images, and volumes..."
    docker-compose down -v --rmi all 2>/dev/null || true
    print_status "Cleanup completed"
}

# Main script logic
main() {
    case "${1:-docker}" in
        "docker")
            check_requirements
            setup_env_files
            run_with_docker
            ;;
        "dev")
            check_requirements
            setup_env_files
            run_development
            ;;
        "stop")
            stop_services
            ;;
        "clean")
            clean_up
            ;;
        "help")
            show_usage
            ;;
        *)
            print_error "Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
}

# Run main function
main "$@"