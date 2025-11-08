# Práctico 3 - CV con React

Aplicación web de Currículum Vitae desarrollada con React que cumple con **TODOS** los requisitos del Práctico 3.

## 🎯 Especificaciones Cumplidas

### ✅ Componentes
- **Header** - Navegación con renderizado condicional según autenticación
- **Footer** - Pie de página con enlaces
- **PrivateRoute** - HOC para proteger rutas
- **Login** - Formulario de autenticación con React Hook Form
- **Home** - Página principal con useEffect para saludo dinámico
- **Curriculum** - CV completo con múltiples secciones y useState
- **Users** - Lista de usuarios con useEffect y llamada HTTP
- **Contact** - Formulario con React Hook Form y validaciones

### ✅ useState
Implementado en:
- **Curriculum**: proyectos, educación, idiomas, habilidades, filtros, vistas
- **Users**: users, loading, error
- **Contact**: submitSuccess
- **Home**: greeting
- **AuthContext**: user, isAuthenticated, loading

### ✅ useEffect
Implementado en:
- **Users**: Fetch de usuarios desde JSONPlaceholder API
- **Home**: Determina saludo según hora del día
- **AuthContext**: Verifica sesión guardada en localStorage

### ✅ Renderizado Condicional (JS)
- Header: Muestra/oculta botones según autenticación
- Users: Loading, error, lista vacía
- Curriculum: Tags, proyectos filtrados, vista grid/list
- Contact: Mensaje de éxito
- Home: Botón de login

### ✅ Renderizado en Loop (map)
- **Curriculum**: proyectos, educación, idiomas, habilidades técnicas, habilidades blandas
- **Users**: Lista de usuarios

### ✅ Rutas Públicas y Privadas
**Rutas Públicas:**
- `/` - Home
- `/login` - Login
- `/curriculum` - Curriculum
- `/contact` - Contacto

**Rutas Privadas:**
- `/users` - Usuarios (requiere autenticación)

### ✅ React Router DOM
- BrowserRouter, Routes, Route, Navigate
- useNavigate para navegación programática
- Link para navegación declarativa

### ✅ Context + Hook + Provider
**AuthContext.jsx:**
- Context: `AuthContext`
- Hook: `useAuth()`
- Provider: `AuthProvider`
- Manejo de autenticación con localStorage
- Login/logout simulado

### ✅ Axios + Interceptor
**services/api.js:**
- Instancia configurada de axios
- **Interceptor de Request**: Agrega token, logging
- **Interceptor de Response**: Manejo de errores, redirección 401
- `userService` con métodos CRUD

### ✅ Material UI
Componentes utilizados:
- AppBar, Toolbar, Button, Typography
- Container, Box, Grid, Paper, Card, CardContent
- TextField, Alert, Chip, Avatar, Divider
- CircularProgress, Select, MenuItem
- Iconos: Material Icons

### ✅ React Hook Form
**Login.jsx:**
- Validaciones de email y contraseña

**Contact.jsx:**
- Validaciones completas:
  - Nombre: required, minLength, maxLength
  - Email: required, pattern (regex)
  - Teléfono: pattern
  - Asunto: required (select)
  - Mensaje: required, minLength, maxLength

### ✅ Llamada HTTP
- **URL**: https://jsonplaceholder.typicode.com/users
- **Componente**: Users.jsx
- Usa axios con interceptores
- Manejo de estados: loading, error, success

---

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build
npm run preview
```

## 🚀 Uso

1. La aplicación se ejecuta en `http://localhost:5173`
2. Navega libremente por Home, Currículum y Contacto
3. Para acceder a Usuarios, debes hacer login
4. En el login, ingresa cualquier email y contraseña (es simulado)
5. Una vez autenticado, verás la opción de Usuarios en el menú

## 📁 Estructura del Proyecto

```
cv-react-practico3/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navegación con auth
│   │   ├── Footer.jsx          # Pie de página
│   │   └── PrivateRoute.jsx    # Protección de rutas
│   ├── context/
│   │   └── AuthContext.jsx     # Context + Hook + Provider
│   ├── pages/
│   │   ├── Home.jsx            # useState + useEffect
│   │   ├── Login.jsx           # React Hook Form
│   │   ├── Curriculum.jsx      # useState + map + filter
│   │   ├── Users.jsx           # useEffect + HTTP + map
│   │   └── Contact.jsx         # React Hook Form completo
│   ├── services/
│   │   └── api.js              # Axios + Interceptores
│   ├── styles/
│   │   ├── index.css           # Estilos globales
│   │   └── App.css             # Estilos de App
│   ├── App.jsx                 # Router principal
│   └── main.jsx                # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Características Destacadas

- **Diseño Responsive**: Material UI con Grid y breakpoints
- **Persistencia de sesión**: localStorage
- **Estados de carga**: Spinners y feedback visual
- **Manejo de errores**: Alerts y mensajes claros
- **Filtrado dinámico**: Proyectos con filtros en tiempo real
- **Vistas múltiples**: Grid y List en proyectos
- **Clean Code**: Componentes modulares y reutilizables

## 👤 Información Personal

- **Nombre**: Marcelo Nelson
- **Rol**: Desarrollador Backend Junior
- **Email**: marcelinho.nelson@gmail.com
- **GitHub**: [marcelonelson1](https://github.com/marcelonelson1)

---

## ✨ Conclusión

**TODOS LOS REQUISITOS DEL PRÁCTICO 3 HAN SIDO CUMPLIDOS AL 100%**

Este proyecto demuestra el dominio de React, hooks, routing, HTTP calls, formularios,
Material UI y arquitectura de componentes moderna.
