# Guía de Configuración - Ofimundo Catálogo

Esta guía te ayudará a configurar el proyecto para que funcione correctamente con tu base de datos SQL Server.

## Requisitos Previos

1. **Node.js** 18.17.0 o superior instalado
2. **SQL Server** accesible con:
   - Host/servidor
   - Puerto (default: 1433)
   - Nombre de base de datos
   - Usuario y contraseña
3. **Tabla EQUIPOS** con los campos especificados
4. **Tabla MARCAS** con los campos especificados

## Pasos de Configuración

### Paso 1: Clonar/Descargar el Proyecto

```bash
git clone <tu-repo>
cd sitio-ofimundo
```

### Paso 2: Instalar Dependencias

```bash
npm install
# o si usas pnpm
pnpm install
```

### Paso 3: Configurar Variables de Entorno

1. Localiza el archivo `.env.local` en la raíz del proyecto
2. Actualiza los valores con tus datos de SQL Server:

```env
DB_SERVER=tu.servidor.com          # Host del SQL Server
DB_PORT=1433                        # Puerto (default 1433)
DB_NAME=nombre_tu_bd               # Nombre de tu base de datos
DB_USER=usuario_sql_server          # Usuario con acceso a las tablas
DB_PASSWORD=tu_contraseña_secura   # Contraseña del usuario
DB_ENCRYPT=true                     # Encriptar conexión (true/false)
DB_TRUST_CERT=false                 # Confiar en certificado autofirmado
```

### Paso 4: Verificar Conexión a BD

Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

Abre http://localhost:3000 en tu navegador. Si ves errores de conexión:

1. Verifica que los datos en `.env.local` sean correctos
2. Asegúrate que el servidor SQL Server esté accesible
3. Revisa los logs en la consola del servidor

## Detalles de Conexión SQL Server

### Ejemplos de DB_SERVER según tipo:

**SQL Server Local:**
```
DB_SERVER=localhost
```

**SQL Server en Red:**
```
DB_SERVER=192.168.1.50
DB_SERVER=server-name.domain.com
```

**Azure SQL Database:**
```
DB_SERVER=tu-server.database.windows.net
DB_ENCRYPT=true
DB_TRUST_CERT=true
```

### Encriptación y Certificados

- `DB_ENCRYPT=true`: Requiere conexión encriptada (recomendado para producción)
- `DB_TRUST_CERT=true`: Confía en certificados autofirmados (use solo en desarrollo)

## Estructura de Tablas Esperadas

### EQUIPOS
```sql
CREATE TABLE EQUIPOS (
    ID_Equipo INT PRIMARY KEY,
    Tipo_Equipo NVARCHAR(50),
    Nombre_Equipo NVARCHAR(100),
    Marca_ID INT,
    Modelo NVARCHAR(100),
    Descripcion_Equipo TEXT,
    Especificaciones NVARCHAR(MAX),
    Imagen_Equipo NVARCHAR(255),
    Precio DECIMAL(10,2),
    Stock INT,
    Velocidad_BN NVARCHAR(50),
    Velocidad_Color NVARCHAR(50),
    Resolucion NVARCHAR(50),
    Conectividad NVARCHAR(100),
    Fecha_Registro DATETIME2,
    Activo BIT
)
```

### MARCAS
```sql
CREATE TABLE MARCAS (
    ID_Marca INT PRIMARY KEY,
    Nombre_Marca NVARCHAR(50),
    Sitio_Web NVARCHAR(255),
    Fecha_Registro DATETIME2,
    Activo BIT
)
```

## Solución de Problemas

### Error: "Database Connection Failed"

**Causa:** No puede conectar al SQL Server

**Soluciones:**
- [ ] Verifica que `DB_SERVER` es correcto
- [ ] Verifica que `DB_PORT` es accesible
- [ ] Verifica credenciales (`DB_USER`, `DB_PASSWORD`)
- [ ] Chequea firewall del servidor
- [ ] Asegúrate que SQL Server está ejecutándose

### Error: "Table EQUIPOS not found"

**Causa:** La tabla EQUIPOS no existe en la base de datos

**Soluciones:**
- [ ] Verifica que `DB_NAME` sea la base de datos correcta
- [ ] Ejecuta el script SQL para crear las tablas
- [ ] Asegúrate que el usuario tiene permisos SELECT en las tablas

### Error: "Cannot read property 'Nombre_Equipo' of undefined"

**Causa:** Los datos en la tabla EQUIPOS están vacíos o con estructura diferente

**Soluciones:**
- [ ] Verifica que hay registros en la tabla EQUIPOS
- [ ] Comprueba que los nombres de columnas coinciden exactamente
- [ ] Revisa el archivo `lib/types.ts` si necesitas ajustar los tipos

## Testing de la API

Puedes probar los endpoints directamente:

```bash
# Obtener todos los equipos
curl http://localhost:3000/api/equipos

# Obtener un equipo específico
curl http://localhost:3000/api/equipos/1

# Obtener marcas
curl http://localhost:3000/api/marcas

# Obtener opciones de filtro
curl http://localhost:3000/api/equipos/filtros
```

## Despliegue en Producción

Para desplegar en **Vercel**:

1. Push del código a GitHub
2. Conecta el repositorio en Vercel
3. Añade las variables de entorno en Vercel Settings → Environment Variables
4. Deploy automático

⚠️ Asegúrate que tu SQL Server es accesible desde Vercel (no localhost)

## Soporte

Si encuentras problemas:

1. Revisa los logs de desarrollo (`npm run dev`)
2. Verifica la conexión SQL Server con herramientas como SQL Server Management Studio
3. Consulta la documentación de mssql: https://github.com/tediousjs/node-mssql
