# Práctico 3 - CV con React

Aplicación web de Currículum Vitae desarrollada con React que cumple con todos los requisitos del Práctico 3.

## Tecnologías utilizadas

- **React** 18.2.0
- **Vite** 5.0.0
- **React Router DOM** 6.22.0
- **Material-UI** 5.15.0
- **Axios** 1.6.0
- **React Hook Form** 7.50.0

## Requisitos cumplidos

### ✅ Componentes
- Componentes modulares: Header, Footer, PrivateRoute
- Páginas: Home, Login, Curriculum, Users, Contact

### ✅ useState
- Implementado en múltiples componentes para manejo de estado local
- Ejemplos: greeting en Home, skills/experience/education en Curriculum, users/loading/error en Users

### ✅ useEffect
- Usado para determinar saludo según hora del día (Home)
- Carga de usuarios desde API (Users)
- Verificación de sesión guardada en localStorage (AuthContext)

### ✅ Renderizado condicional
- Operador ternario para mostrar contenido según autenticación
- Condicionales para mostrar loading, errores, y datos
- Renderizado de información opcional de usuarios

### ✅ Renderizado en loop
- Uso de map() para renderizar listas de experiencia, educación, habilidades
- Grid de usuarios con map()

### ✅ Rutas privadas y públicas
- React Router DOM implementado
- Rutas públicas: /, /login, /curriculum, /contact
- Rutas privadas: /users (requiere autenticación)
- Componente PrivateRoute para proteger rutas

### ✅ Context + Hook + Provider
- AuthContext para manejo de autenticación
- useAuth hook personalizado
- AuthProvider envolviendo la aplicación

### ✅ Axios con interceptor
- Instancia configurada de axios
- Interceptor de request: agrega token y logging
- Interceptor de response: manejo de errores y redirección en 401

### ✅ Material UI
- AppBar, Toolbar, Button, Card, TextField, Alert, etc.
- Diseño responsive con Grid
- Iconos de Material Icons

### ✅ React Hook Form
- Formulario de login con validaciones
- Formulario de contacto con validaciones complejas
- Validación de email, longitud mínima/máxima

### ✅ Llamada HTTP
- Servicio de usuarios consumiendo https://jsonplaceholder.typicode.com/users
- CRUD completo en userService
- Manejo de estados de carga y error

## Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## Uso

1. La aplicación se ejecuta en `http://localhost:5173`
2. Puedes navegar libremente por Home, Currículum y Contacto
3. Para acceder a la sección de Usuarios, debes iniciar sesión
4. En el login, ingresa cualquier email y contraseña (es simulado)
5. Una vez autenticado, podrás ver la lista de usuarios desde la API

## Estructura del proyecto

```
practico3-react/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── PrivateRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Curriculum.jsx
│   │   ├── Users.jsx
│   │   └── Contact.jsx
│   ├── services/
│   │   └── api.js
│   ├── styles/
│   │   └── App.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Características destacadas

- **Sistema de autenticación**: Login simulado con persistencia en localStorage
- **Rutas protegidas**: Control de acceso a secciones privadas
- **Consumo de API**: Integración con JSONPlaceholder
- **Formularios validados**: React Hook Form con validaciones en tiempo real
- **Diseño responsive**: Material-UI con breakpoints
- **Interceptores HTTP**: Logging y manejo de tokens
- **Estados de carga**: Feedback visual durante peticiones HTTP
