import net from "net"
import sql from "mssql"

const [server, instanceName] = (process.env.DB_SERVER || "localhost").split("\\")
const configuredPort = process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined

// Conexión compartida por las APIs de equipos y salas.
const sqlConfig: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server,
  ...(configuredPort ? { port: configuredPort } : {}),
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
    ...(instanceName && !configuredPort ? { instanceName } : {}),
  },
}

// Pool de conexiones singleton
let pool: sql.ConnectionPool | null = null

export async function getConnection(): Promise<sql.ConnectionPool> {
  if (pool) {
    return pool
  }

  try {
    pool = await sql.connect(sqlConfig)
    console.log("Conexión a SQL Server establecida")
    return pool
  } catch (error) {
    console.error("Error conectando a SQL Server:", error)
    throw error
  }
}

export async function closeConnection(): Promise<void> {
  if (pool) {
    await pool.close()
    pool = null
    console.log("Conexión a SQL Server cerrada")
  }
}

// Helper para ejecutar queries
export async function executeQuery<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T[]> {
  const connection = await getConnection()
  const request = connection.request()

  // Agregar parámetros si existen
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      request.input(key, value)
    })
  }

  const result = await request.query(query)
  return result.recordset as T[]
}

/**
 * Limpia el RUT al formato exigido por Softland CRM (CodAux):
 * Sin puntos, sin guion y sin dígito verificador. Máximo 10 caracteres.
 * Ej: "13.668.657-7" -> "13668657"
 */
export function formatRutSoftland(rut: string): string {
  if (!rut) return "11111111"
  const parts = rut.trim().split("-")
  const base = parts.length > 1 ? parts.slice(0, -1).join("") : rut
  const cleanDigits = base.replace(/[^0-9]/g, "")
  return cleanDigits ? cleanDigits.slice(0, 10) : "11111111"
}

export interface SoftlandInjectionParams {
  rut_empresa: string
  nombre_empresa: string
  nombre_completo: string
  telefono: string
  correo_electronico: string
  tipo_contacto: string
}

export interface SoftlandInjectionResult {
  success: boolean
  message: string
}


/**
 * Invoca el procedimiento almacenado [SOFTLAND].[PA_INS_SITIO_OFIMUNDO_V2]
 * para crear/validar cliente y contacto e inyectar el evento de cotización en Softland CRM.
 */
export async function injectSoftlandCotizacion(
  params: SoftlandInjectionParams
): Promise<SoftlandInjectionResult> {
  const connection = await getConnection()
  const request = connection.request()

  // Formatear RUT a dígitos sin puntos/DV para cumplir con CodAux (VARCHAR 10)
  const cleanRut = formatRutSoftland(params.rut_empresa)

  request.input("rut_empresa", sql.VarChar(20), cleanRut)
  request.input("nombre_empresa", sql.VarChar(100), (params.nombre_empresa || "EMPRESA SIN NOMBRE").slice(0, 100))
  request.input("nombre_completo", sql.VarChar(50), (params.nombre_completo || "CONTACTO WEB").slice(0, 30))
  request.input("telefono", sql.VarChar(30), (params.telefono || "").slice(0, 20))
  request.input("correo_electronico", sql.VarChar(100), (params.correo_electronico || "").slice(0, 50))
  request.input("tipo_contacto", sql.VarChar(50), (params.tipo_contacto || "MPS").slice(0, 50))
  request.output("inyeccion", sql.NVarChar(200))

  const result = await request.execute("[SOFTLAND].[PA_INS_SITIO_OFIMUNDO_V2]")
  const responseText = String(result.output.inyeccion ?? "")

  const isSuccess = responseText.startsWith("ÉXITO") || responseText.includes("200")

  return {
    success: isSuccess,
    message: responseText,
  }
}


