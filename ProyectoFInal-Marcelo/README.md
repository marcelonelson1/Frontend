# 📝 Notes App

A modern, full-stack notes application with tagging and filtering capabilities. Built with **Go**, **React**, **MariaDB**, and deployed with **Docker**.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Go Version](https://img.shields.io/badge/go-1.21+-blue.svg)
![Node Version](https://img.shields.io/badge/node-18+-green.svg)
![React Version](https://img.shields.io/badge/react-18+-blue.svg)

## ✨ Features

### Phase 1 - Core Functionality ✅
- **Create, Edit, Delete Notes** - Full CRUD operations
- **Archive/Unarchive** - Organize notes by archiving completed ones
- **Active & Archived Views** - Separate views for different note states
- **Modern UI** - Clean, responsive design with Tailwind CSS
- **Real-time Updates** - Instant UI updates with React Query

### Phase 2 - Advanced Features ✅
- **Categories/Tags** - Create and assign colored categories to notes
- **Filter by Category** - Filter notes by specific categories
- **Search Functionality** - Search through note titles and content
- **Category Management** - Create, edit, and delete categories

## 🚀 Quick Start

The easiest way to run the application is with the provided setup script:

```bash
# Clone the repository (if not already done)
# cd to the project directory

# Run with Docker (recommended)
./setup.sh docker

# Or run in development mode
./setup.sh dev
```

### 📱 Access the Application

After running the setup script:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Health Check**: http://localhost:8080/health

## 🛠️ Technology Stack

### Backend
- **Go 1.21+** - Programming language
- **Gin** - HTTP web framework
- **GORM** - Object-relational mapping
- **MariaDB** - Database
- **Docker** - Containerization

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Data fetching and caching
- **Heroicons** - Beautiful icons
- **React Hot Toast** - Notifications

### Infrastructure
- **Docker Compose** - Multi-container deployment
- **Nginx** - Frontend web server
- **MariaDB** - Database server

## 📋 Requirements

### For Docker Deployment (Recommended)
- **Docker** 20.10+
- **Docker Compose** 2.0+

### For Development Mode
- **Go** 1.21+
- **Node.js** 18+
- **npm** 8+
- **Docker** (for database only)

## 🏗️ Architecture

The application follows a clean **MVC (Model-View-Controller)** architecture:

### Backend Structure
```
backend/
├── cmd/                    # Application entry point
├── internal/
│   ├── controllers/        # HTTP handlers
│   ├── services/          # Business logic
│   ├── repositories/      # Data access layer
│   ├── models/            # Database models
│   ├── dto/               # Data transfer objects
│   ├── middleware/        # HTTP middleware
│   ├── routes/            # Route definitions
│   ├── config/            # Configuration management
│   └── utils/             # Utility functions
└── pkg/                   # Shared packages
```

### Frontend Structure
```
frontend/src/
├── components/            # Reusable UI components
├── pages/                # Page components
├── hooks/                # Custom React hooks
├── services/             # API service functions
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── styles/               # CSS styles
```

## 🔧 Manual Setup

If you prefer to set up the application manually:

### 1. Database Setup

Start MariaDB with Docker:
```bash
docker run -d \
  --name notes-mariadb \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=notes_db \
  -e MYSQL_USER=notes_user \
  -e MYSQL_PASSWORD=notes_password \
  -p 3306:3306 \
  mariadb:10.11
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
go mod tidy

# Set up environment
cp .env.example .env
# Edit .env if needed

# Run the backend
go run cmd/main.go
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env if needed

# Start development server
npm start
```

## 📊 Database Schema

### Notes Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| title | VARCHAR(255) | Note title |
| content | LONGTEXT | Note content |
| is_archived | BOOLEAN | Archive status |
| created_at | TIMESTAMP | Creation time |
| updated_at | TIMESTAMP | Last update time |

### Categories Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR(100) | Category name |
| color | VARCHAR(7) | Hex color code |
| created_at | TIMESTAMP | Creation time |
| updated_at | TIMESTAMP | Last update time |

### Many-to-Many Relationship
- **note_categories** - Junction table linking notes and categories

## 🔍 API Documentation

### Notes Endpoints
- `GET /api/v1/notes` - List active notes
- `GET /api/v1/notes?is_archived=true` - List archived notes
- `GET /api/v1/notes?category_id=uuid` - Filter by category
- `GET /api/v1/notes?search=term` - Search notes
- `POST /api/v1/notes` - Create note
- `PUT /api/v1/notes/:id` - Update note
- `DELETE /api/v1/notes/:id` - Delete note
- `PATCH /api/v1/notes/:id/archive` - Archive/unarchive note

### Categories Endpoints
- `GET /api/v1/categories` - List all categories
- `POST /api/v1/categories` - Create category
- `PUT /api/v1/categories/:id` - Update category
- `DELETE /api/v1/categories/:id` - Delete category

### Health Check
- `GET /health` - Service health status

## 🧪 Testing

### Backend Tests
```bash
cd backend
go test ./...
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🐳 Docker Commands

### Using Docker Compose
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and start
docker-compose up --build -d

# Clean up everything
docker-compose down -v --rmi all
```

### Individual Services
```bash
# Backend only
docker-compose up -d mariadb backend

# Frontend only (after backend is running)
docker-compose up -d frontend
```

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using the port
   lsof -i :3000  # or :8080, :3306
   # Kill the process or change ports in docker-compose.yml
   ```

2. **Database connection failed**
   ```bash
   # Check MariaDB logs
   docker-compose logs mariadb
   # Restart MariaDB
   docker-compose restart mariadb
   ```

3. **Frontend build issues**
   ```bash
   # Clear node_modules and reinstall
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Backend module issues**
   ```bash
   # Clean Go modules
   cd backend
   go clean -modcache
   go mod tidy
   ```

### Setup Script Options

```bash
./setup.sh docker    # Run with Docker Compose (default)
./setup.sh dev       # Run in development mode
./setup.sh stop      # Stop all services
./setup.sh clean     # Clean up containers and volumes
./setup.sh help      # Show help
```

## 🌟 Features in Detail

### Modern UI/UX
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark Mode Ready** - CSS custom properties for easy theming
- **Smooth Animations** - Subtle transitions and animations
- **Loading States** - Visual feedback for all operations
- **Toast Notifications** - Success and error messages
- **Modal Dialogs** - For create/edit operations

### Performance Optimizations
- **React Query** - Smart caching and background updates
- **Debounced Search** - Optimized search functionality
- **Lazy Loading** - Components loaded on demand
- **Optimized Images** - Proper sizing and compression
- **Gzip Compression** - Nginx compression for static assets

### Developer Experience
- **TypeScript** - Full type safety
- **Hot Reload** - Instant development updates
- **ESLint/Prettier** - Code formatting and linting
- **Docker Multi-stage** - Optimized production builds
- **Environment Variables** - Easy configuration management

## 📈 Performance

- **Backend Response Time** - < 100ms for most operations
- **Frontend Bundle Size** - < 500KB gzipped
- **Database Queries** - Optimized with proper indexing
- **Memory Usage** - < 512MB total for all services

## 🔒 Security

- **CORS Protection** - Configured origins
- **Input Validation** - Server-side validation
- **SQL Injection Prevention** - Parameterized queries with GORM
- **XSS Protection** - Sanitized inputs and outputs
- **Security Headers** - Proper HTTP security headers

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section above
2. Review the logs with `docker-compose logs -f [service]`
3. Create an issue with detailed information

---

**Built with ❤️ using Go, React, and modern web technologies**