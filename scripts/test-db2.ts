import fs from "fs"
import path from "path"
import sql from "mssql"

const envPath = path.join(process.cwd(), ".env.local")
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8")
  content.split("\n").forEach((line) => {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith("#")) {
      const parts = trimmed.split("=")
      const key = parts[0]?.trim()
      const val = parts.slice(1).join("=").trim().replace(/^["']|["']$/g, "")
      if (key) process.env[key] = val
    }
  })
}

process.on("warning", (warning) => {
  if (warning.name === "DeprecationWarning" && (warning.code === "DEP0123" || warning.message.includes("DEP0123"))) {
    return
  }
})

async function main() {
  const [server, instanceName] = (process.env.DB_SERVER || "localhost").split("\\")
  const pool = new sql.ConnectionPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "THE_COOLER_SGCX",
    server,
    options: {
      encrypt: false,
      trustServerCertificate: true,
      instanceName,
    },
  })

  try {
    await pool.connect()
    console.log("Connected!")
    const res = await pool.request().query("SELECT TOP 10 * FROM [THE_COOLER_SGCX].[MPR].[VT_SEL_SALA_OPCION]")
    console.log("VT_SEL_SALA_OPCION rows count:", res.recordset.length)
    console.log("VT_SEL_SALA_OPCION rows:", JSON.stringify(res.recordset, null, 2))
  } catch (err) {
    console.error("DB Error:", err)
  } finally {
    await pool.close()
  }
}

main()
