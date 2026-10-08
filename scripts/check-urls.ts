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
    for (const row of rows) {
      const rawImg = row.imagen ?? row.imagen_Equipo ?? row.imagen_equipo ?? ""
      const cleanedRaw = rawImg.replace(/[\r\n]+/g, "").trim()
      const encoded = encodeURI(cleanedRaw)
      
      // Let's test fetch
      try {
        const res = await fetch(encoded, { method: 'HEAD' })
        console.log(`Status ${res.status}: original="${rawImg.replace(/\r\n/g, '\\r\\n')}" -> fetched="${encoded}"`)
        if (res.status !== 200) {
          // try replacing space with underscore or vice versa or %20
          const alt1 = encodeURI(cleanedRaw.replace(/ /g, "_"))
          const res1 = await fetch(alt1, { method: 'HEAD' })
          console.log(`   Alt space->underscore (${res1.status}): ${alt1}`)

          const alt2 = cleanedRaw.replace(/_/, "%20")
          const res2 = await fetch(alt2, { method: 'HEAD' })
          console.log(`   Alt underscore->space (${res2.status}): ${alt2}`)
          
          const alt3 = cleanedRaw.replace(/Mount 2/, "Mount2")
          const res3 = await fetch(alt3, { method: 'HEAD' })
          console.log(`   Alt Mount 2 -> Mount2 (${res3.status}): ${alt3}`)
        }
      } catch (e: any) {
        console.log(`Error fetching ${encoded}: ${e.message}`)
      }
    }
  } catch (err) {
    console.error(err)
  } finally {
    await closeConnection()
  }
}

main()
