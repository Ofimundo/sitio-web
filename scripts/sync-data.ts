import fs from "fs"
import path from "path"

// Cargar variables de entorno desde .env.local
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
  console.log("DB_SERVER configured as:", process.env.DB_SERVER)
  const { executeQuery, closeConnection } = await import("../lib/db")
  const { VISTA_PRODUCTO_DETALLE, mapProducto } = await import("../lib/productos")
  console.log("Starting data export from SQL Server to local JSON files...")

  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  try {
    console.log("1. Exporting equipos from SQL Server...")
    const rowsEquipos = await executeQuery<any>(`SELECT * FROM ${VISTA_PRODUCTO_DETALLE}`)
    const equipos = rowsEquipos.map(mapProducto)
    if (equipos.length > 0) {
      fs.writeFileSync(
        path.join(dataDir, "equipos.json"),
        JSON.stringify(equipos, null, 2),
        "utf-8"
      )
      console.log(`SUCCESS: Saved ${equipos.length} real equipos to data/equipos.json`)
    } else {
      console.warn("No equipos returned from DB, keeping existing equipos.json")
    }

    console.log("2. Exporting salas from SQL Server...")
    const rowsSalas = await executeQuery<any>(`SELECT * FROM [THE_COOLER_SGCX].[MPR].[VT_SEL_SALA_DETALLE]`)
    if (rowsSalas && rowsSalas.length > 0) {
      const { complementosProvisionales } = await import("../lib/salas")
      const salasMapped = rowsSalas.map((row: any, index: number) => {
        const id = String(row.id_Producto ?? row.id_producto ?? "").trim()
        const slug = id.replace(/^sala_/i, "").replaceAll("_", "-").toLowerCase()
        const tamanoMatch = String(row.tamano_sala || "").toUpperCase().match(/(?:TAMAÑO|TAMANO)?\s*([SML])\b/)
        const tamano = (tamanoMatch?.[1] as "S" | "M" | "L") ?? "M"
        const linea = row.linea?.trim() || row.nombre_sala?.trim().split(/\s+/)[0] || "Salas"
        const destacada = ["SI", "SÍ", "TRUE", "1"].includes(String(row.sala_destacada ?? "").trim().toUpperCase())

        return {
          ID_Sala: index + 1,
          ID_Producto: id,
          Slug: slug,
          Nombre: row.nombre_sala?.trim() || row.titulo_sala?.trim() || id,
          Linea: linea,
          Tamano: tamano,
          Titulo: row.titulo_sala?.trim() || row.nombre_sala?.trim() || id,
          Descripcion: row.descripcion_larga?.trim() || row.descripcion_corta?.trim() || "",
          Imagen_Principal: row.imagen_Equipo ?? row.imagen_equipo ?? "",
          Beneficios: [],
          Compatibilidad: [],
          Destacada: destacada,
          Orden: index + 1,
          Opciones: [],
          Complementos: complementosProvisionales,
        }
      }).filter((s: any) => s.ID_Producto.length > 0)

      fs.writeFileSync(
        path.join(dataDir, "salas.json"),
        JSON.stringify(salasMapped, null, 2),
        "utf-8"
      )
      console.log(`SUCCESS: Saved ${salasMapped.length} real salas to data/salas.json`)
    }

    console.log("3. Exporting automatizaciones from SQL Server...")
    const rowsAuto = await executeQuery<any>(`SELECT * FROM [THE_COOLER_SGCX].[MPR].[VT_SEL_AUTOMATIZACION]`)
    if (rowsAuto && rowsAuto.length > 0) {
      console.log(`Retrieved ${rowsAuto.length} automatizaciones from DB`)
    }

    console.log("Export process finished successfully!")
  } catch (error) {
    console.error("Error during SQL data export:", error)
  } finally {
    await closeConnection()
  }
}

main()
