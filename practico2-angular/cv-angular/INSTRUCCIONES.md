# CV Angular - Práctico 2

## Datos Personales
- **Nombre:** Emanuel Boz
- **Edad:** 20 años
- **Email:** emanuel.boz@gmail.com
- **Teléfono:** +54 351 123-4567
- **Ubicación:** Córdoba, Argentina
- **Educación:** Ingeniería en Sistemas - Universidad Católica de Córdoba (2024 - Presente)

## Descripción del Proyecto

Aplicación web completa desarrollada con Angular que cumple con todos los requisitos del Práctico 2. Es un portafolio profesional con CV, galería de obras de arte y formulario de contacto.

## Requisitos Implementados

### 1. Componentes Creados
- **Header** - Navegación principal con autenticación
- **Footer** - Pie de página con información de copyright
- **Home** - Página principal con bienvenida
- **Login** - Login simulado con botón
- **Curriculum** - CV completo con información personal
- **Artworks** - Galería de obras de arte desde API
- **Contact** - Formulario de contacto con validaciones

### 2. Signals
- `Auth Service`: Manejo de estado de autenticación con signals
- `Artworks Service`: Lista de obras de arte con signals
- `Componentes`: Uso de signals en múltiples componentes

### 3. Input/Output
- **Footer Component**: Recibe `@Input() author` desde el componente App

### 4. Renderización Condicional (@if)
- Header: Muestra/oculta enlaces según autenticación
- Login: Muestra mensaje de éxito al iniciar sesión
- Artworks: Muestra loading, datos o mensaje vacío
- Contact: Muestra mensajes de error de validación

### 5. Renderización Repetida (@for)
- Home: Lista de características
- Curriculum: Educación y habilidades
- Artworks: Tabla de obras de arte

### 6. Guards y Rutas
- **authGuard**: Protege rutas privadas (curriculum, artworks, contact)
- **Rutas públicas**: home, login
- **Rutas privadas**: curriculum, artworks, contact
- Redirección automática al login si no está autenticado

### 7. Interceptor HTTP
- **loggingInterceptor**: Registra todas las peticiones HTTP en consola
- Muestra método, URL, tiempo de respuesta

### 8. Formularios Reactivos
- **Contact Component**: Formulario con validaciones
  - Campo nombre (requerido, mínimo 3 caracteres)
  - Campo email (requerido, formato email)
  - Campo asunto (requerido, mínimo 5 caracteres)
  - Campo mensaje (requerido, mínimo 10 caracteres)

### 9. Componentes PrimeNG
- **Button** - Botones en toda la aplicación
- **Card** - Tarjetas de contenido
- **Table** - Tabla de obras de arte
- **InputText** - Inputs del formulario

### 10. Pipes
- **DatePipe** - Formato de fecha en footer y curriculum
- **UpperCasePipe** - Nombre en mayúsculas en curriculum
- **PhoneFormatPipe** (custom) - Formato de teléfono argentino
- **HighlightPipe** (custom) - Resaltado de texto

### 11. ngOnInit
- Implementado en todos los componentes que lo requieren
- Curriculum, Artworks, Contact, Header

### 12. Llamada HTTP
- **Artworks Component**: Consume API https://api.artic.edu/api/v1/artworks
- Muestra 20 obras de arte con título, artista, fecha y origen
- Incluye botón de recarga

## Estructura del Proyecto

```
cv-angular/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/
│   │   │   ├── footer/
│   │   │   ├── home/
│   │   │   ├── login/
│   │   │   ├── curriculum/
│   │   │   ├── artworks/
│   │   │   └── contact/
│   │   ├── services/
│   │   │   ├── auth.ts
│   │   │   └── artworks.ts
│   │   ├── guards/
│   │   │   └── auth-guard.ts
│   │   ├── interceptors/
│   │   │   └── logging-interceptor.ts
│   │   ├── pipes/
│   │   │   ├── phone-format-pipe.ts
│   │   │   └── highlight-pipe.ts
│   │   ├── app.ts
│   │   ├── app.html
│   │   ├── app.css
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── styles.css
│   └── index.html
└── angular.json
```

## Instalación y Ejecución

1. **Navegar al directorio del proyecto:**
```bash
cd C:\Users\manub\OneDrive\Escritorio\Frontend\practico2-angular\cv-angular
```

2. **Instalar dependencias** (si es necesario):
```bash
npm install
```

3. **Ejecutar en modo desarrollo:**
```bash
npm start
```
O:
```bash
ng serve
```

4. **Abrir en el navegador:**
```
http://localhost:4200
```

5. **Compilar para producción:**
```bash
npm run build
```

## Flujo de Navegación

1. **Página de Inicio (/)** - Acceso público
   - Muestra información general
   - Botones para login

2. **Login (/login)** - Acceso público
   - Click en el botón "Iniciar Sesión como Emanuel Boz"
   - Redirige automáticamente al curriculum

3. **Curriculum (/curriculum)** - Acceso privado (requiere login)
   - Muestra CV completo
   - Información personal con pipes

4. **Artworks (/artworks)** - Acceso privado
   - Tabla con obras de arte de la API
   - Botón para recargar datos

5. **Contacto (/contact)** - Acceso privado
   - Formulario con validaciones
   - Mensajes de error en tiempo real

## Características Técnicas

- **Angular 19** (última versión)
- **Componentes standalone** (sin NgModules)
- **Signals** para manejo de estado reactivo
- **Control flow syntax** (@if, @for)
- **PrimeNG** para componentes UI
- **Routing funcional** con guards
- **HTTP Interceptors** para logging
- **Reactive Forms** con validaciones
- **TypeScript** tipado estricto

## Notas Importantes

- El login es simulado (no requiere contraseña)
- Las rutas protegidas redirigen al login si no estás autenticado
- El estado de autenticación se guarda en localStorage
- Los logs HTTP se pueden ver en la consola del navegador
- La API de artworks es pública y no requiere autenticación

## Autor

**Emanuel Boz**
Estudiante de Ingeniería en Sistemas
Universidad Católica de Córdoba
