# 🚀 GUÍA DE INSTALACIÓN Y EJECUCIÓN

## ✅ Archivos Limpiados

Los siguientes archivos antiguos fueron eliminados:
- ❌ `src/index.tsx` (reemplazado por `src/main.tsx`)
- ❌ `src/styles/globals.css` (ahora es `globals.scss`)
- ❌ `src/pages/LoginPage.css` (ahora es `styles/pages/LoginPage.scss`)
- ❌ `src/pages/RegisterPage.css` (ahora es `styles/pages/RegisterPage.scss`)
- ❌ `src/pages/HomePage.css` (ahora es `styles/pages/HomePage.scss`)
- ❌ `src/pages/AboutPage.css` (ahora es `styles/pages/AboutPage.scss`)
- ❌ `public/index.html` (ahora está en la raíz del proyecto)

---

## 📋 Prerequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** 18.x o superior
- **npm** 9.x o superior

Verifica las versiones:
```bash
node --version   # Debe ser v18.x o superior
npm --version    # Debe ser v9.x o superior
```

---

## 🔧 Instalación Paso a Paso

### 1️⃣ Navegar al directorio del frontend

```bash
cd d:\tallerfrontend\Frontend\proyectofinal-marcelo\frontend
```

### 2️⃣ Eliminar node_modules y package-lock.json antiguos (IMPORTANTE)

```bash
# En Windows PowerShell o CMD
rmdir /s /q node_modules
del package-lock.json

# O en Git Bash
rm -rf node_modules
rm package-lock.json
```

### 3️⃣ Instalar todas las dependencias

```bash
npm install
```

Esto instalará:
- ✅ Vite 5.0.12
- ✅ React 18.2.0
- ✅ TypeScript 5.3.3
- ✅ SASS 1.70.0
- ✅ Material-UI 7.3.5
- ✅ Tailwind CSS 3.4.1
- ✅ Y todas las demás dependencias

### 4️⃣ Configurar variables de entorno (OPCIONAL)

```bash
# Copiar el archivo de ejemplo
copy .env.example .env

# O en Git Bash
cp .env.example .env
```

Editar `.env` si es necesario:
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

---

## ▶️ Ejecutar el Proyecto

### Modo Desarrollo

```bash
npm run dev
```

✅ El servidor se iniciará en: **http://localhost:3000**
✅ Hot Module Replacement (HMR) activado
✅ Los cambios se reflejan instantáneamente

### Build para Producción

```bash
npm run build
```

✅ Los archivos compilados estarán en: `dist/`
✅ Optimizado y minificado
✅ Listo para deploy

### Previsualizar Build de Producción

```bash
npm run preview
```

✅ Sirve los archivos de `dist/` localmente
✅ Útil para probar antes de deploy

---

## 🧪 Verificar Instalación

Después de `npm install`, verifica que todo esté correcto:

```bash
# Verificar que Vite está instalado
npm list vite

# Verificar estructura de carpetas
ls src/

# Debería mostrar:
# - assets/
# - components/
# - context/
# - hooks/
# - pages/
# - services/
# - styles/
# - types/
# - App.tsx
# - main.tsx
```

---

## 🐛 Solución de Problemas

### Error: "Cannot find module '@components/...'"

**Solución:**
```bash
# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error: "Vite not found"

**Solución:**
```bash
# Verificar que package.json tenga vite en devDependencies
npm install --save-dev vite @vitejs/plugin-react
```

### Error: "SCSS syntax error"

**Solución:**
```bash
# Instalar SASS
npm install --save-dev sass
```

### Puerto 3000 ocupado

**Solución:**
Editar `vite.config.ts`:
```typescript
server: {
  port: 3001,  // Cambiar a otro puerto
  open: true,
}
```

---

## 📦 Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia desarrollo en http://localhost:3000 |
| `npm run build` | Compila para producción |
| `npm run preview` | Previsualiza build de producción |
| `npm run lint` | Ejecuta ESLint |
| `npm install` | Instala todas las dependencias |
| `npm list` | Lista todas las dependencias instaladas |

---

## 🌐 Acceder a la Aplicación

Una vez ejecutado `npm run dev`:

1. Abre tu navegador
2. Navega a: **http://localhost:3000**
3. Deberías ver la página de inicio (HomePage)

### Rutas disponibles:

- `/` - Página de inicio
- `/login` - Inicio de sesión
- `/register` - Registro
- `/about` - Acerca de
- `/notes` - Gestión de notas (requiere autenticación)

---

## 🔗 Backend Requerido

El frontend espera que el backend esté corriendo en:

```
http://localhost:8080/api/v1
```

Asegúrate de tener el backend ejecutándose antes de usar funcionalidades que requieren API.

---

## ✨ Características Nuevas de Vite

- ⚡ **HMR ultra rápido** - Los cambios se ven al instante
- 🚀 **Build optimizado** - 10-100x más rápido que CRA
- 📦 **Bundle size reducido** - Solo incluye lo necesario
- 🔧 **Configuración simple** - Fácil de personalizar

---

## 📝 Notas Finales

- ✅ **Todos los imports usan alias** - No más `../../../`
- ✅ **Todos los estilos son SCSS** - No quedan archivos .css
- ✅ **Outlet implementado** - Arquitectura de rutas anidadas
- ✅ **Imágenes agregadas** - En /public y /assets
- ✅ **TypeScript estricto** - Type-safety garantizado

---

## 🆘 Soporte

Si encuentras algún problema:

1. Verifica que las versiones de Node.js y npm sean correctas
2. Elimina `node_modules` y `package-lock.json` y reinstala
3. Revisa el archivo [CAMBIOS_REALIZADOS.md](./CAMBIOS_REALIZADOS.md)
4. Lee la documentación completa en [README.md](./README.md)

---

**¡Listo para desarrollar! 🎉**
