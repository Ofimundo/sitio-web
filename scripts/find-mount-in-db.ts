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
    const views = await executeQuery<any>("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.VIEWS WHERE TABLE_SCHEMA = 'MPR'")
    console.log("MPR Views:", views.map(v => v.TABLE_NAME))
    for (const v of views) {
      try {
        const rows = await executeQuery<any>(`SELECT * FROM [THE_COOLER_SGCX].[MPR].[${v.TABLE_NAME}]`)
        const matches = rows.filter(r => JSON.stringify(r).includes("10010756") || JSON.stringify(r).toLowerCase().includes("mount"))
        if (matches.length > 0) {
          console.log(`MATCH IN VIEW ${v.TABLE_NAME}:`, matches)
        }
      } catch (e: any) {
        console.log(`Error reading ${v.TABLE_NAME}:`, e.message)
      }
    }
  } catch (err) {
    console.error(err)
  } finally {
    await closeConnection()
  }
}

main()
