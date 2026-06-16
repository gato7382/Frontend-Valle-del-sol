
bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en desarrollo
npm run dev

# 3. Abrir en el navegador
http://localhost:5173



Antes de Empezar

Necesitas tener instalado:

-**Node.js** v16+ ([Descargar aquí](https://nodejs.org/))
- **npm** (viene con Node.js)

Verifica tu instalación

node -v    # Debe mostrar v16 o superior
npm -v     # Debe mostrar versión
```



 Instalación Completa

 Paso 1: Descargar el proyecto
bash
cd Frontend-Valle-del-sol
```

### Paso 2: Instalar todas las dependencias
bash
npm install


**Esto instalará:**
- React 19 & React DOM
- React Router para navegación
- Bootstrap 5 para estilos
- Leaflet para mapas interactivos
- Axios para peticiones HTTP
- Vitest para testing
- ESLint para validar código



Comandos Principales


npm run dev

- Abre: http://localhost:5173
- Recarga automática al guardar cambios
- Perfecto para desarrollo

 Testing

npm test

- Ejecuta todas las pruebas
- Archivos de test: `src/components/test/*.test.jsx`

### Construir para Producción
```bash
npm run build
```
- Crea carpeta `dist/` optimizada
- Archivo lista para desplegar

### Vista Previa de Producción
```bash
npm run build
npm run preview
```
- Ve cómo se vería en producción

### Validar Código
```bash
npm run lint
```
- Encuentra errores de código
- `npm run lint -- --fix` arregla automáticamente


Estructura del Proyecto

```
src/
├── components/
│   ├── home/              ← Componentes de inicio
│   ├── page/              ← Páginas principales
│   ├── layout/            ← Layouts (Login, Registro)
│   ├── img/               ← Imágenes del proyecto
│   └── styles/            ← Archivos CSS
├── services/              ← Conexión con API
│   ├── api.js            ← Cliente HTTP
│   ├── authService.js    ← Autenticación
│   ├── adminService.js   ← Admin
│   └── reporteService.js ← Reportes
├── context/               ← Estado global (Auth)
├── App.jsx               ← Componente principal
├── main.jsx              ← Punto de entrada
└── index.css             ← Estilos globales
```


 Testing
**Archivos de test disponibles:**
- Alertas.test.jsx
- login.test.jsx  
- Registro.test.jsx
- Reportes.test.jsx





