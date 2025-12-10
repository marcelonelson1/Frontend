# 📝 Notes App - Sistema de Gestión de Notas

Una aplicación moderna y completa para gestión de notas con categorías, construida con React 18, TypeScript y Vite.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178c6.svg)
![Vite](https://img.shields.io/badge/Vite-5.0.12-646cff.svg)

---

## 🚀 Características Principales

- ✅ **CRUD Completo de Notas**: Crear, leer, actualizar y eliminar notas
- 📁 **Sistema de Categorías**: Organiza tus notas con categorías personalizadas
- 🎨 **Categorías con Colores**: 10 colores predefinidos + color personalizado
- 🔍 **Búsqueda en Tiempo Real**: Búsqueda instantánea con debounce de 300ms
- 🏷️ **Filtrado por Categorías**: Filtra notas por una o múltiples categorías
- 📦 **Archivo de Notas**: Archiva notas para mantener tu espacio organizado
- 🔐 **Autenticación JWT**: Sistema seguro de login y registro
- 📱 **100% Responsive**: Diseño adaptable desde 320px hasta 2560px+
- 🎭 **Validaciones en Tiempo Real**: Validación de formularios con react-hook-form
- 🌈 **Interfaz Moderna**: Material-UI + Tailwind CSS + SCSS
- 🚦 **Rutas Protegidas**: Rutas privadas con autenticación
- 📐 **Layout con Outlet**: Arquitectura de rutas anidadas
- 🎯 **TypeScript Estricto**: Type-safety en todo el proyecto
- ⚡ **Optimización de Performance**: React Query para cache y sincronización

---

## 🛠️ Tecnologías Utilizadas (2026)

### **Core**
- **React** 18.2.0 - Biblioteca de interfaz de usuario
- **TypeScript** 5.3.3 - Superset tipado de JavaScript
- **Vite** 5.0.12 - Build tool y dev server ultrarrápido

### **Enrutamiento & Estado**
- **React Router DOM** 6.11.2 - Enrutamiento declarativo
- **React Query** 3.39.3 - Gestión de estado del servidor y caché
- **Context API** - Estado global de autenticación

### **UI & Estilos**
- **Material-UI (MUI)** 7.3.5 - Componentes de interfaz
- **Tailwind CSS** 3.4.1 - Framework CSS utility-first
- **SCSS** 1.70.0 - Preprocesador CSS con sintaxis anidada
- **Emotion** 11.14.0 - CSS-in-JS para MUI
- **Heroicons** 2.0.18 - Iconos SVG

### **Formularios & Validaciones**
- **React Hook Form** 7.66.0 - Gestión eficiente de formularios
- **React Hot Toast** 2.4.1 - Notificaciones toast elegantes

### **HTTP & API**
- **Axios** 1.4.0 - Cliente HTTP con interceptores

### **Desarrollo**
- **ESLint** 8.56.0 - Linting de código
- **PostCSS** 8.4.33 - Procesamiento CSS
- **Autoprefixer** 10.4.17 - Prefijos CSS automáticos

---

## 📁 Estructura del Proyecto

```
frontend/
├── public/
│   ├── images/
│   │   └── logo.svg                    # Logo de la aplicación
│   └── vite.svg                        # Icono de Vite
│
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── notes-illustration.svg  # Ilustración de notas
│   │
│   ├── components/
│   │   ├── categories/
│   │   │   ├── CategoryBadge.tsx       # Badge visual de categoría
│   │   │   ├── CategoryManager.tsx     # CRUD de categorías
│   │   │   └── CategorySelector.tsx    # Selector para asignar categorías
│   │   │
│   │   ├── common/
│   │   │   ├── Header.tsx              # Encabezado con navegación
│   │   │   ├── Loading.tsx             # Componente de carga
│   │   │   ├── Modal.tsx               # Modal reutilizable
│   │   │   └── PrivateRoute.tsx        # Protección de rutas
│   │   │
│   │   ├── layout/
│   │   │   ├── MainLayout.tsx          # Layout para rutas privadas
│   │   │   └── PublicLayout.tsx        # Layout para rutas públicas
│   │   │
│   │   └── notes/
│   │       ├── NoteCard.tsx            # Tarjeta individual de nota
│   │       ├── NoteFilters.tsx         # Búsqueda y filtros
│   │       ├── NoteForm.tsx            # Formulario crear/editar
│   │       ├── NotesList.tsx           # Grid de notas
│   │       └── NoteViewer.tsx          # Vista detallada
│   │
│   ├── context/
│   │   └── AuthContext.tsx             # Contexto de autenticación
│   │
│   ├── hooks/
│   │   ├── useCategories.ts            # Hook para categorías
│   │   └── useNotes.ts                 # Hook para notas
│   │
│   ├── pages/
│   │   ├── AboutPage.tsx               # Página informativa
│   │   ├── HomePage.tsx                # Página de inicio
│   │   ├── LoginPage.tsx               # Inicio de sesión
│   │   ├── NotesPage.tsx               # Gestión de notas
│   │   └── RegisterPage.tsx            # Registro de usuarios
│   │
│   ├── services/
│   │   ├── api.ts                      # Configuración de Axios
│   │   ├── authService.ts              # Servicios de autenticación
│   │   ├── categoryService.ts          # Servicios de categorías
│   │   └── noteService.ts              # Servicios de notas
│   │
│   ├── styles/
│   │   ├── pages/
│   │   │   ├── AboutPage.scss
│   │   │   ├── HomePage.scss
│   │   │   ├── LoginPage.scss
│   │   │   └── RegisterPage.scss
│   │   └── globals.scss                # Estilos globales
│   │
│   ├── types/
│   │   ├── api.types.ts                # Tipos de API
│   │   └── note.types.ts               # Tipos de notas
│   │
│   ├── App.tsx                         # Componente principal
│   └── main.tsx                        # Entry point
│
├── .env.example                        # Variables de entorno ejemplo
├── index.html                          # HTML principal
├── package.json                        # Dependencias y scripts
├── postcss.config.js                   # Configuración PostCSS
├── tailwind.config.js                  # Configuración Tailwind
├── tsconfig.json                       # Configuración TypeScript
├── tsconfig.node.json                  # TypeScript para Node
└── vite.config.ts                      # Configuración Vite

```

---

## ⚙️ Configuración de Alias

El proyecto utiliza **path aliases** para imports más limpios y mantenibles:

```typescript
// vite.config.ts & tsconfig.json
{
  '@/*': './src/*',
  '@components/*': './src/components/*',
  '@pages/*': './src/pages/*',
  '@styles/*': './src/styles/*',
  '@hooks/*': './src/hooks/*',
  '@context/*': './src/context/*',
  '@types/*': './src/types/*',
  '@assets/*': './src/assets/*',
  '@services/*': './src/services/*'
}
```

**Ejemplos de uso:**
```typescript
// ❌ Antes (imports relativos)
import { useAuth } from '../../context/AuthContext';
import Modal from '../common/Modal';

// ✅ Ahora (con alias)
import { useAuth } from '@context/AuthContext';
import Modal from '@components/common/Modal';
```

---

## 🔧 Instalación y Configuración

### **Prerrequisitos**
- Node.js 18.x o superior
- npm 9.x o superior
- Backend corriendo en `http://localhost:8080`

### **Pasos de Instalación**

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd proyectofinal-marcelo/frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar .env y configurar:
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:3000**

---

## 📜 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con hot reload |
| `npm run build` | Compila el proyecto para producción |
| `npm run preview` | Previsualiza el build de producción |
| `npm run lint` | Ejecuta ESLint para verificar el código |

---

## 🏗️ Build para Producción

```bash
# 1. Compilar el proyecto
npm run build

# 2. Los archivos compilados estarán en la carpeta 'dist/'

# 3. Previsualizar el build (opcional)
npm run preview
```

### **Optimizaciones de Build**
- ✅ Code splitting automático
- ✅ Minificación de JS y CSS
- ✅ Tree shaking
- ✅ Compresión de assets
- ✅ Source maps para debugging

---

## 🔐 Autenticación

El sistema usa **JWT (JSON Web Tokens)** almacenados en `localStorage`:

```typescript
// Flujo de autenticación
1. Usuario ingresa credenciales
2. Backend valida y retorna JWT + datos de usuario
3. Frontend almacena token en localStorage
4. Token se envía automáticamente en cada petición (Axios interceptor)
5. Rutas privadas verifican autenticación con PrivateRoute
```

**Archivos clave:**
- `src/context/AuthContext.tsx` - Estado global de autenticación
- `src/services/authService.ts` - Servicios de login/register
- `src/components/common/PrivateRoute.tsx` - Protección de rutas

---

## 🎨 Sistema de Estilos

### **Arquitectura de Estilos**
1. **Tailwind CSS** - Clases utility-first para layout y spacing
2. **SCSS** - Estilos específicos de componentes con anidamiento
3. **Material-UI Theme** - Tema personalizado para componentes MUI

### **Paleta de Colores**
```scss
// Primarios
$primary-600: #667eea;
$primary-700: #5568d3;

// Secundarios
$secondary: #764ba2;

// Grises
$gray-50: #f9fafb;
$gray-900: #111827;

// Estados
$success: #10b981;
$error: #ef4444;
$warning: #f59e0b;
```

### **Responsive Breakpoints**
```scss
xs: 475px   // Móvil pequeño
sm: 640px   // Móvil
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Desktop grande
2xl: 1536px // Ultra wide
```

---

## 🌐 API Endpoints

### **Autenticación**
```typescript
POST /api/v1/auth/login      // Iniciar sesión
POST /api/v1/auth/register   // Registrarse
GET  /api/v1/auth/me         // Usuario actual
```

### **Notas**
```typescript
GET    /api/v1/notes              // Listar notas (con filtros)
POST   /api/v1/notes              // Crear nota
GET    /api/v1/notes/:id          // Obtener nota
PUT    /api/v1/notes/:id          // Actualizar nota
DELETE /api/v1/notes/:id          // Eliminar nota
PATCH  /api/v1/notes/:id/archive  // Archivar/desarchivar
```

### **Categorías**
```typescript
GET    /api/v1/categories     // Listar categorías
POST   /api/v1/categories     // Crear categoría
GET    /api/v1/categories/:id // Obtener categoría
PUT    /api/v1/categories/:id // Actualizar categoría
DELETE /api/v1/categories/:id // Eliminar categoría
```

---

## 🧪 Testing (Pendiente)

```bash
# Ejecutar tests (cuando estén implementados)
npm test

# Coverage
npm run test:coverage
```

---

## 🚀 Despliegue

### **Opciones de Hosting**
- **Vercel** (Recomendado para Vite)
- **Netlify**
- **GitHub Pages**
- **Docker** (incluye Dockerfile)

### **Deploy en Vercel**
```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Deploy
vercel
```

### **Deploy con Docker**
```bash
# 1. Build imagen
docker build -t notes-frontend .

# 2. Ejecutar contenedor
docker run -p 80:80 notes-frontend
```

---

## 📝 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | URL base de la API | `http://localhost:8080/api/v1` |

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 👥 Autores

- **Marcelo Nelson** - Desarrollo Full Stack

---

## 🎯 Roadmap

- [ ] Implementar tests unitarios y e2e
- [ ] Agregar modo oscuro (dark mode)
- [ ] Exportación de notas (PDF, Markdown)
- [ ] Compartir notas entre usuarios
- [ ] Notas colaborativas en tiempo real
- [ ] Soporte offline con Service Workers
- [ ] Paginación avanzada
- [ ] Búsqueda avanzada con filtros complejos

---

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en GitHub.

---

**Hecho con ❤️ usando React + TypeScript + Vite**
