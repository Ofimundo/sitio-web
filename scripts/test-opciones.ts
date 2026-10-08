import fs from "fs"
import path from "path"

const envPath = path.join(process.cwd(), ".env.local")
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8")
  content.split("\n").forEach((line) => {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith("#")) {
      const parts = trimmed.split("=")
      const key = parts[0]?.trim()
      const val = parts.slice(1).join("=").trim().replace(/^["']|["']$/g, "")
      if (key && !process.env[key]) {
        process.env[key] = val
      }
    }
  })
}

async function main() {
  const { executeQuery, closeConnection } = await import("../lib/db")
  try {
    const rows = await executeQuery<any>("SELECT * FROM [THE_COOLER_SGCX].[MPR].[VT_SEL_SALA_OPCION]")
    console.log("VT_SEL_SALA_OPCION rows count:", rows.length)
    console.log(JSON.stringify(rows, null, 2))
  } catch (err) {
    console.error(err)
  } finally {
    await closeConnection()
  }
}

main()
