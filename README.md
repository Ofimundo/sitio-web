# Ofimundo - Catálogo de Equipos

Sistema de catálogo dinámico para Ofimundo que se conecta a una base de datos SQL Server para mostrar equipos de oficina.

## Características

- **Página Principal (Index)**: Muestra 6 equipos destacados de diferentes categorías
- **Catálogo (04.catalogo)**: Lista completa de equipos con filtros por tipo, marca, y características
- **Detalle de Equipo (02.detalle)**: Información detallada de cada equipo incluyendo especificaciones técnicas
- **API REST**: Endpoints para consultar equipos, marcas y filtros disponibles

## Estructura de la Base de Datos

### Tabla: EQUIPOS
- `ID_Equipo` (INT) - Identificador único
- `Tipo_Equipo` (NVARCHAR) - Tipo/categoría del equipo
- `Nombre_Equipo` (NVARCHAR) - Nombre del equipo
- `Marca_ID` (INT) - FK a tabla MARCAS
- `Modelo` (NVARCHAR) - Modelo del equipo
- `Descripcion_Equipo` (TEXT) - Descripción completa
- `Especificaciones` (NVARCHAR) - Especificaciones técnicas
- `Imagen_Equipo` (NVARCHAR) - URL de la imagen
- `Precio` (DECIMAL) - Precio del equipo
- `Stock` (INT) - Disponibilidad
- `Fecha_Registro` (DATETIME2) - Fecha de registro
- `Activo` (BIT) - Estado activo/inactivo

### Tabla: MARCAS
- `ID_Marca` (INT) - Identificador único
- `Nombre_Marca` (NVARCHAR) - Nombre de la marca
- `Sitio_Web` (NVARCHAR) - URL del sitio web
- `Fecha_Registro` (DATETIME2) - Fecha de registro
- `Activo` (BIT) - Estado activo/inactivo

## Configuración

### 1. Instalar Dependencias

```bash
npm install
# o
pnpm install
```

### 2. Configurar Variables de Entorno

Copia el archivo `.env.example` a `.env.local` y completa con tus datos de SQL Server:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus datos de conexión:

```env
DB_SERVER=tu-servidor-sql.com
DB_PORT=1433
DB_NAME=ofimundo_db
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_ENCRYPT=true
DB_TRUST_CERT=false
```

### 3. Ejecutar el Desarrollo

```bash
npm run dev
# o
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`

## API Endpoints

### Obtener todos los equipos (con opcionales)
```
GET /api/equipos?tipo=Multifuncionales&marca=HP&limite=6
```

Query Parameters:
- `tipo` - Filtrar por tipo de equipo
- `marca` - Filtrar por marca
- `limite` - Cantidad de resultados (default: 20)
- `offset` - Paginación (default: 0)

### Obtener equipo por ID
```
GET /api/equipos/[id]
```

### Obtener todas las marcas
```
GET /api/marcas
```

### Obtener opciones de filtros disponibles
```
GET /api/equipos/filtros
```

Respuesta:
```json
{
  "tipos": ["Multifuncionales", "Impresoras", "Scanners", ...],
  "marcas": ["HP", "Canon", "Xerox", ...],
  "velocidades": ["30 ppm", "40 ppm", ...]
}
```

## Estructura de Carpetas

```
/app
  /api
    /equipos
      route.ts          - GET todos los equipos
      /[id]
        route.ts        - GET equipo específico
      /filtros
        route.ts        - GET opciones de filtros
    /marcas
      route.ts          - GET todas las marcas
  /catalogo
    page.tsx            - Página de catálogo con filtros
  /equipo
    /[id]
      page.tsx          - Página de detalle del equipo
  layout.tsx
  page.tsx              - Página principal
  globals.css

/components
  Header.tsx            - Navegación principal
  Footer.tsx            - Pie de página
  ProductCard.tsx       - Tarjeta de producto
  ProductGrid.tsx       - Grid de productos
  FilterSidebar.tsx     - Barra lateral de filtros
  CatalogoContent.tsx   - Contenido del catálogo
  HeroSection.tsx       - Sección hero de inicio
  SolucionesSection.tsx - Sección de soluciones
  PartnersSection.tsx   - Sección de partners
  CategoriaSection.tsx  - Sección de categorías

/lib
  db.ts                 - Configuración de conexión SQL Server
  types.ts              - Tipos TypeScript
  data.ts               - Funciones de obtención de datos
```

## Nota Importante

⚠️ **Reemplaza el contenido estático**: Los archivos HTML originales (`index.html`, `02.detalle.html`, `04.catalogo.html`) han sido reemplazados por páginas dinámicas Next.js. Los datos ahora se obtienen directamente de la base de datos SQL Server.

## Soporte y Contacto

Para reportar problemas o sugerir mejoras, contacta al equipo de desarrollo.
