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
