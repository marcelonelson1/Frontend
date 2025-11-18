# 🐳 Sistema de Notas - Guía Docker

Sistema completo de gestión de notas con autenticación JWT, construido con React + TypeScript (Frontend) y Go + Gin + GORM (Backend).

## 📋 Requisitos Previos

- Docker (>= 20.10)
- Docker Compose (>= 1.29)

## 🚀 Inicio Rápido

### 1. Levantar todo el sistema

```bash
docker-compose up -d
```

Este comando:
- ✅ Crea y levanta el contenedor de MariaDB
- ✅ Crea automáticamente la base de datos `notes_db`
- ✅ Ejecuta las migraciones automáticas (crea tablas)
- ✅ Levanta el backend en `http://localhost:8080`
- ✅ Construye y levanta el frontend en `http://localhost:3000`

### 2. Verificar que todo esté corriendo

```bash
docker-compose ps
```

Deberías ver 3 servicios corriendo:
- `notes-mariadb` - Base de datos
- `notes-backend` - API REST
- `notes-frontend` - Aplicación web

### 3. Ver los logs

```bash
# Ver logs de todos los servicios
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mariadb
```

### 4. Acceder a la aplicación

Abre tu navegador en: **http://localhost:3000**

## 🔐 Credenciales

### Base de Datos
- **Host**: localhost:3306
- **Usuario**: notes_user
- **Contraseña**: notes_password
- **Base de datos**: notes_db

### Usuario de Prueba
Una vez que la aplicación esté corriendo, puedes registrar un nuevo usuario o usar la funcionalidad de registro.

## 📊 Arquitectura

```
┌─────────────────┐
│   Frontend      │  Puerto 3000 (React + Nginx)
│   (Nginx)       │
└────────┬────────┘
         │ HTTP
         ▼
┌─────────────────┐
│   Backend       │  Puerto 8080 (Go + Gin)
│   (Go API)      │
└────────┬────────┘
         │ MySQL Protocol
         ▼
┌─────────────────┐
│   MariaDB       │  Puerto 3306
│   (Database)    │
└─────────────────┘
```

## 🛠️ Comandos Útiles

### Detener todos los servicios
```bash
docker-compose down
```

### Detener y eliminar volúmenes (CUIDADO: borra la base de datos)
```bash
docker-compose down -v
```

### Reconstruir los contenedores
```bash
docker-compose up -d --build
```

### Reconstruir solo un servicio
```bash
docker-compose up -d --build backend
docker-compose up -d --build frontend
```

### Reiniciar un servicio
```bash
docker-compose restart backend
docker-compose restart frontend
docker-compose restart mariadb
```

### Acceder a la shell de un contenedor
```bash
# Backend
docker-compose exec backend sh

# Frontend
docker-compose exec frontend sh

# Base de datos
docker-compose exec mariadb mysql -u notes_user -pnotes_password notes_db
```

### Ver el estado de salud de los contenedores
```bash
docker-compose ps
```

## 📁 Estructura de Archivos Docker

```
ProyectoFInal-Marcelo/
├── docker-compose.yml      # Orquestación de servicios
├── init.sql               # Script SQL inicial (opcional)
├── backend/
│   ├── Dockerfile         # Imagen del backend (multi-stage)
│   └── .dockerignore      # Archivos a ignorar
└── frontend/
    ├── Dockerfile         # Imagen del frontend (multi-stage)
    ├── nginx.conf         # Configuración de Nginx
    └── .dockerignore      # Archivos a ignorar
```

## 🔧 Variables de Entorno

### Backend
Las siguientes variables se configuran en `docker-compose.yml`:

```yaml
DB_HOST=mariadb           # Host de la base de datos
DB_PORT=3306              # Puerto de MariaDB
DB_USER=notes_user        # Usuario de la BD
DB_PASSWORD=notes_password # Contraseña de la BD
DB_NAME=notes_db          # Nombre de la BD
PORT=8080                 # Puerto del backend
GIN_MODE=release          # Modo de Gin (debug/release)
AUTO_MIGRATE=true         # Auto-migración de BD
JWT_SECRET=...            # Secreto para JWT
ALLOWED_ORIGINS=...       # CORS origins permitidos
```

### Frontend
```yaml
REACT_APP_API_BASE_URL=http://localhost:8080/api/v1
```

## 📡 Endpoints de la API

### Health Check
```bash
curl http://localhost:8080/health
```

### Autenticación
```bash
# Registro
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"test123"}'

# Login
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123"}'
```

### Notas (requiere token JWT)
```bash
# Listar notas
curl http://localhost:8080/api/v1/notes \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Crear nota
curl -X POST http://localhost:8080/api/v1/notes \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Mi nota","content":"Contenido"}'
```

## 🐛 Troubleshooting

### El backend no se conecta a la base de datos
```bash
# Ver logs del backend
docker-compose logs backend

# Verificar que MariaDB esté healthy
docker-compose ps mariadb
```

### El frontend no se comunica con el backend
- Verifica que CORS esté habilitado en el backend
- Asegúrate de que `ALLOWED_ORIGINS` incluya `http://localhost:3000`
- Verifica que `REACT_APP_API_BASE_URL` apunte a `http://localhost:8080/api/v1`

### Puerto ya en uso
Si el puerto 3000, 8080 o 3306 ya está en uso, puedes cambiarlos en `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Frontend en puerto 3001
  - "8081:8080"  # Backend en puerto 8081
  - "3307:3306"  # MariaDB en puerto 3307
```

### Limpiar todo y empezar de nuevo
```bash
# Detener y eliminar contenedores, volúmenes y redes
docker-compose down -v

# Eliminar imágenes construidas
docker rmi proyectofinal-marcelo-backend
docker rmi proyectofinal-marcelo-frontend

# Reconstruir todo
docker-compose up -d --build
```

## 🔄 Actualizar el Código

Si haces cambios en el código:

```bash
# Backend
docker-compose up -d --build backend

# Frontend
docker-compose up -d --build frontend
```

## 📊 Monitoreo

### Ver uso de recursos
```bash
docker stats
```

### Inspeccionar un contenedor
```bash
docker inspect notes-backend
docker inspect notes-frontend
docker inspect notes-mariadb
```

## 🎯 Características del Proyecto

### Backend (Go)
- ✅ Auto-creación de base de datos
- ✅ Auto-migración de tablas
- ✅ Autenticación JWT (registro, login)
- ✅ CRUD completo de notas
- ✅ CRUD completo de categorías
- ✅ Relaciones many-to-many
- ✅ Validaciones con Gin
- ✅ CORS configurado

### Frontend (React + TypeScript)
- ✅ Paleta de colores coherente y moderna
- ✅ 100% Responsive (móvil, tablet, desktop)
- ✅ Material-UI para componentes
- ✅ React Query para manejo de estado
- ✅ Rutas públicas y privadas
- ✅ Formularios con validaciones
- ✅ Toasts informativos
- ✅ Servido con Nginx optimizado

## 🛡️ Seguridad

- Backend corre como usuario no-root
- Frontend corre como usuario no-root
- Health checks configurados
- Headers de seguridad en Nginx
- JWT con expiración de 7 días
- Contraseñas hasheadas con bcrypt

## 📝 Notas Adicionales

- Los datos de MariaDB se persisten en un volumen Docker
- El backend espera a que MariaDB esté healthy antes de iniciar
- El frontend espera a que el backend esté listo
- Nginx está configurado con compresión gzip
- El modo de producción está optimizado para performance

## 🆘 Soporte

Si encuentras problemas:

1. Verifica que Docker y Docker Compose estén instalados
2. Revisa los logs con `docker-compose logs -f`
3. Asegúrate de que los puertos no estén en uso
4. Verifica el estado de los contenedores con `docker-compose ps`

---

**¡Listo! Tu sistema de notas está corriendo en Docker** 🎉
