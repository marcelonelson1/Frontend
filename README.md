# Prácticos Taller Web - Frontend

Este repositorio contiene los 3 trabajos prácticos de Taller Web, organizados en carpetas separadas y completamente funcionales.

## 📁 Estructura del Repositorio

```
Frontend/
├── practico1-html-css/       # Práctico 1: HTML + CSS
├── practico2-angular/        # Práctico 2: Angular
│   └── cv-angular/
└── practico3-react/          # Práctico 3: React
```

## 📋 Prácticos

### 1️⃣ Práctico 1: HTML + CSS

**Ubicación:** `practico1-html-css/`

CV estático desarrollado con HTML5, CSS3 y JavaScript vanilla.

**Características:**
- ✅ CV completo en HTML estático
- ✅ Estilos CSS personalizados y responsivos
- ✅ Formulario de contacto con 6 validaciones diferentes
- ✅ JavaScript para validaciones en tiempo real
- ✅ Diseño responsive (móvil, tablet, escritorio)

**Cómo ejecutar:**
```bash
cd practico1-html-css
# Opción 1: Abrir index.html en el navegador
# Opción 2: Usar servidor local
python -m http.server 8000
# o
npx serve
```

[Ver documentación completa](practico1-html-css/README.md)

---

### 2️⃣ Práctico 2: Angular

**Ubicación:** `practico2-angular/cv-angular/`

Aplicación Angular completa con todas las características modernas del framework.

**Características:**
- ✅ Componentes modulares (Header, Footer, páginas)
- ✅ Señales (signals) para manejo de estado reactivo
- ✅ Servicios: AuthService, ArtworkService
- ✅ @if y @for para renderización
- ✅ Guards para rutas protegidas
- ✅ Interceptor HTTP con logging
- ✅ Formularios reactivos con validaciones
- ✅ PrimeNG (UI components)
- ✅ Pipes personalizados
- ✅ ngOnInit en componentes
- ✅ Consumo de API: https://api.artic.edu/api/v1/artworks

**Cómo ejecutar:**
```bash
# IMPORTANTE: El proyecto está en la subcarpeta cv-angular
cd practico2-angular/cv-angular

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start
# o
ng serve
```

Acceder a: `http://localhost:4200`

**⚠️ Nota:** Asegúrate de entrar a la carpeta `cv-angular` antes de ejecutar npm install

[Ver documentación completa](practico2-angular/cv-angular/README.md)

---

### 3️⃣ Práctico 3: React

**Ubicación:** `practico3-react/`

Aplicación React moderna con hooks, context y Material-UI.

**Características:**
- ✅ Componentes funcionales
- ✅ useState y useEffect
- ✅ Renderización condicional y en loop
- ✅ React Router DOM (rutas públicas y privadas)
- ✅ Context API + custom hook (useAuth)
- ✅ Axios con interceptores
- ✅ Material-UI components
- ✅ React Hook Form con validaciones
- ✅ Consumo de API: https://jsonplaceholder.typicode.com/users

**Cómo ejecutar:**
```bash
cd practico3-react
npm install
npm run dev
```

Acceder a: `http://localhost:5173`

[Ver documentación completa](practico3-react/README.md)

---

## 🎯 Requisitos Cumplidos por Práctico

### Práctico 1: HTML + CSS ✅
| Requisito | Estado |
|-----------|--------|
| CV en HTML estático | ✅ |
| Estilos CSS aplicados | ✅ |
| Formulario con validaciones | ✅ |

### Práctico 2: Angular ✅
| Requisito | Estado |
|-----------|--------|
| Componentes distintos | ✅ |
| Señales y servicios | ✅ |
| Input y Output | ✅ |
| @if (renderización condicional) | ✅ |
| @for (renderización repetida) | ✅ |
| Guards y rutas privadas/públicas | ✅ |
| Interceptor HTTP | ✅ |
| Formularios reactivos con validaciones | ✅ |
| PrimeNG | ✅ |
| Pipes | ✅ |
| ngOnInit | ✅ |
| Llamada a API de obras de arte | ✅ |

### Práctico 3: React ✅
| Requisito | Estado |
|-----------|--------|
| Componentes distintos | ✅ |
| useState | ✅ |
| useEffect | ✅ |
| Renderización condicional y loop | ✅ |
| Rutas privadas y públicas | ✅ |
| React Router DOM | ✅ |
| Context + hook + provider | ✅ |
| Axios con interceptor | ✅ |
| Material-UI | ✅ |
| React Hook Form | ✅ |
| Llamada a API de usuarios | ✅ |

---

## 🚀 Instalación General

Cada práctico es independiente y tiene sus propias instrucciones de instalación en su README correspondiente.

**Requisitos previos:**
- Node.js 18+ (para Angular y React)
- npm o yarn
- Navegador moderno (Chrome, Firefox, Edge, Safari)

---

## 📝 Notas Importantes

1. **Práctico 1** no requiere instalación, solo abrir el archivo HTML
2. **Práctico 2** requiere Angular CLI y puede tardar unos minutos en compilar
3. **Práctico 3** usa Vite que es muy rápido para desarrollo

### Credenciales de Login (simuladas)

Para los prácticos 2 y 3, el login es simulado. Puedes usar cualquier email y contraseña:

- **Email:** cualquier email válido (ej: `demo@test.com`)
- **Contraseña:** cualquier contraseña (ej: `123456`)

---

## 📚 Tecnologías Utilizadas

### Práctico 1
- HTML5
- CSS3 (Grid, Flexbox, Variables CSS)
- JavaScript (ES6+)

### Práctico 2
- Angular 20+
- TypeScript
- PrimeNG
- RxJS
- Angular Signals

### Práctico 3
- React 18
- TypeScript/JavaScript
- React Router DOM
- Material-UI
- Axios
- React Hook Form
- Vite

---

## 👨‍💻 Autor

Desarrollado para la materia Taller Web - 2025

---

## 📄 Licencia

Este proyecto es de uso educativo.
