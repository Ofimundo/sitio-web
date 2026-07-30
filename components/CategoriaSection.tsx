import Link from "next/link"
import { ProductCard } from "./ProductCard"
import type { Equipo } from "@/lib/types"

interface CategoriaSectionProps {
  titulo: string
  subtitulo: string
  equipos: Equipo[]
  verMasLink?: string
}

export function CategoriaSection({ titulo, subtitulo, equipos, verMasLink }: CategoriaSectionProps) {
  // Si no hay equipos de la BD, mostrar placeholders
  //const displayEquipos = equipos.length > 0 ? equipos : getMockEquipos()
  // Si no hay equipos, no renderizar nada (o mostrar mensaje)
  if (equipos.length === 0) {
    return null // o un mensaje: <div>No hay equipos disponibles</div>
  }

  return (
    <section className="py-2 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-5xl leading-snug text-gradient title-xl mb-2">{titulo}</h2>
          <p className="text-xl text-gray-600">{subtitulo}</p>
        </div>

        {/* Primera fila - 3 productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipos.slice(0, 3).map((equipo, index) => (
            <ProductCard
              key={equipo.ID_Producto || index}
              equipo={equipo}
              showBadge={index === 0}
              badgeText="DESTACADO"
            />
          ))}
        </div>

        {/* Segunda fila - 3 productos más */}
        {equipos.length > 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {equipos.slice(3, 6).map((equipo, index) => (
              <ProductCard
                key={equipo.ID_Producto || index + 3}
                equipo={equipo}
              />
            ))}
          </div>
        )}

        {/* Botón Ver más */}
        {verMasLink && (
          <div className="text-center mt-10">
            <Link
              href={verMasLink}
              className="inline-block px-8 py-3 bg-linear-to-br from-(--ofimundo-purple) to-(--ofimundo-magenta) text-white rounded-lg font-semibold hover:from-[#241a78] hover:to-[#c62842] transition"
            >
              Ver todos los productos
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

// Datos de ejemplo mientras no hay conexión a BD
function getMockEquipos(): Equipo[] {
  return [
    {
      ID_Producto: "WF-C5891",
      ID_Marca: 1,
      Nombre_Equipo: "WorkForce Pro WF-C5891",
      Tipo_Equipo: "Multifuncional",
      Tecnologia_Equipo: "Inyección de tinta",
      Color_Equipo: "Color",
      Tamano_Papel_Equipo: "A4",
      Velocidad_BN_Equipo: 25,
      Velocidad_Color_Equipo: 25,
      Velocidad_1ra_Pag_BN_Equipo: null,
      Velocidad_1ra_Pag_Color_Equipo: null,
      Capacidad_Bandeja1_Equipo: 250,
      Capacidad_Bypass_Equipo: null,
      Ciclo_Recomendado_Equipo: "8300 pág",
      Ciclo_Mensual_Equipo: null,
      Ciclo_Maximo_Equipo: null,
      Tipo_Pantalla_Equipo: "Táctil",
      Tamano_Pantalla_Equipo: null,
      Memoria_RAM_Equipo: null,
      Procesador_Equipo: null,
      Disco_Duro_Equipo: null,
      Funciones_Equipo: "Imprimir, Copiar, Escanear, Fax",
      Conectividad_Equipo: "WiFi, Ethernet, USB",
      Duracion_Bateria_Equipo: null,
      Archivo_PDF_Equipo: null,
      Imagen_Equipo: "/images/equipos/multifuncional/WF-C5891.png",
      Descripcion_Equipo: "Esta multifuncional PrecisionCore Heat-Free optimiza su oficina con 25 ppm ISO.",
      Fecha_Carga_Equipo: null,
      Fecha_Registro_Equipo: null,
      Nombre_Marca: "Epson",
    },
    {
      ID_Producto: "WF-M5899",
      ID_Marca: 1,
      Nombre_Equipo: "WorkForce Pro WF-M5899",
      Tipo_Equipo: "Multifuncional",
      Tecnologia_Equipo: "Inyección de tinta",
      Color_Equipo: "Monocromático",
      Tamano_Papel_Equipo: "A4",
      Velocidad_BN_Equipo: 25,
      Velocidad_Color_Equipo: null,
      Velocidad_1ra_Pag_BN_Equipo: null,
      Velocidad_1ra_Pag_Color_Equipo: null,
      Capacidad_Bandeja1_Equipo: 250,
      Capacidad_Bypass_Equipo: null,
      Ciclo_Recomendado_Equipo: null,
      Ciclo_Mensual_Equipo: null,
      Ciclo_Maximo_Equipo: null,
      Tipo_Pantalla_Equipo: null,
      Tamano_Pantalla_Equipo: null,
      Memoria_RAM_Equipo: null,
      Procesador_Equipo: null,
      Disco_Duro_Equipo: null,
      Funciones_Equipo: "Imprimir, Copiar, Escanear",
      Conectividad_Equipo: "WiFi, Ethernet, USB",
      Duracion_Bateria_Equipo: null,
      Archivo_PDF_Equipo: null,
      Imagen_Equipo: "/images/equipos/multifuncional/WF-M5899.png",
      Descripcion_Equipo: "Multifuncional que maximiza tu productividad con 25 ppm ISO.",
      Fecha_Carga_Equipo: null,
      Fecha_Registro_Equipo: null,
      Nombre_Marca: "Epson",
    },
    {
      ID_Producto: "M3170",
      ID_Marca: 1,
      Nombre_Equipo: "EcoTank M3180",
      Tipo_Equipo: "Multifuncional",
      Tecnologia_Equipo: "EcoTank",
      Color_Equipo: "Monocromático",
      Tamano_Papel_Equipo: "A4",
      Velocidad_BN_Equipo: 20,
      Velocidad_Color_Equipo: null,
      Velocidad_1ra_Pag_BN_Equipo: null,
      Velocidad_1ra_Pag_Color_Equipo: null,
      Capacidad_Bandeja1_Equipo: 250,
      Capacidad_Bypass_Equipo: null,
      Ciclo_Recomendado_Equipo: null,
      Ciclo_Mensual_Equipo: null,
      Ciclo_Maximo_Equipo: null,
      Tipo_Pantalla_Equipo: null,
      Tamano_Pantalla_Equipo: null,
      Memoria_RAM_Equipo: null,
      Procesador_Equipo: null,
      Disco_Duro_Equipo: null,
      Funciones_Equipo: "Imprimir, Copiar, Escanear",
      Conectividad_Equipo: "WiFi, Ethernet",
      Duracion_Bateria_Equipo: null,
      Archivo_PDF_Equipo: null,
      Imagen_Equipo: "/images/equipos/multifuncional/M3170.png",
      Descripcion_Equipo: "Revoluciona su oficina con ahorros de hasta el 90%.",
      Fecha_Carga_Equipo: null,
      Fecha_Registro_Equipo: null,
      Nombre_Marca: "Epson",
    },
    {
      ID_Producto: "WF-M5399",
      ID_Marca: 1,
      Nombre_Equipo: "WF-M5399",
      Tipo_Equipo: "Impresora",
      Tecnologia_Equipo: "Inyección de tinta",
      Color_Equipo: "Monocromático",
      Tamano_Papel_Equipo: "A4",
      Velocidad_BN_Equipo: 24,
      Velocidad_Color_Equipo: null,
      Velocidad_1ra_Pag_BN_Equipo: null,
      Velocidad_1ra_Pag_Color_Equipo: null,
      Capacidad_Bandeja1_Equipo: 250,
      Capacidad_Bypass_Equipo: null,
      Ciclo_Recomendado_Equipo: null,
      Ciclo_Mensual_Equipo: null,
      Ciclo_Maximo_Equipo: null,
      Tipo_Pantalla_Equipo: null,
      Tamano_Pantalla_Equipo: null,
      Memoria_RAM_Equipo: null,
      Procesador_Equipo: null,
      Disco_Duro_Equipo: null,
      Funciones_Equipo: "Imprimir",
      Conectividad_Equipo: "WiFi, Ethernet, USB",
      Duracion_Bateria_Equipo: null,
      Archivo_PDF_Equipo: null,
      Imagen_Equipo: "/images/equipos/impresoras/WF-M5399.png",
      Descripcion_Equipo: "Robusto equipo de impresión monocromática que ofrece alta productividad.",
      Fecha_Carga_Equipo: null,
      Fecha_Registro_Equipo: null,
      Nombre_Marca: "Epson",
    },
    {
      ID_Producto: "M1180",
      ID_Marca: 1,
      Nombre_Equipo: "EcoTank M1180",
      Tipo_Equipo: "Impresora",
      Tecnologia_Equipo: "EcoTank",
      Color_Equipo: "Monocromático",
      Tamano_Papel_Equipo: "A4",
      Velocidad_BN_Equipo: 20,
      Velocidad_Color_Equipo: null,
      Velocidad_1ra_Pag_BN_Equipo: "6 seg",
      Velocidad_1ra_Pag_Color_Equipo: null,
      Capacidad_Bandeja1_Equipo: 250,
      Capacidad_Bypass_Equipo: null,
      Ciclo_Recomendado_Equipo: null,
      Ciclo_Mensual_Equipo: null,
      Ciclo_Maximo_Equipo: null,
      Tipo_Pantalla_Equipo: null,
      Tamano_Pantalla_Equipo: null,
      Memoria_RAM_Equipo: null,
      Procesador_Equipo: null,
      Disco_Duro_Equipo: null,
      Funciones_Equipo: "Imprimir",
      Conectividad_Equipo: "WiFi, Ethernet",
      Duracion_Bateria_Equipo: null,
      Archivo_PDF_Equipo: null,
      Imagen_Equipo: "/images/equipos/impresoras/M1180.png",
      Descripcion_Equipo: "Maximiza su productividad con una primera página en 6 segundos y 20 ppm.",
      Fecha_Carga_Equipo: null,
      Fecha_Registro_Equipo: null,
      Nombre_Marca: "Epson",
    },
    {
      ID_Producto: "PA4500X",
      ID_Marca: 2,
      Nombre_Equipo: "ECOSYS PA4500x",
      Tipo_Equipo: "Impresora",
      Tecnologia_Equipo: "Láser",
      Color_Equipo: "Monocromático",
      Tamano_Papel_Equipo: "A4",
      Velocidad_BN_Equipo: 45,
      Velocidad_Color_Equipo: null,
      Velocidad_1ra_Pag_BN_Equipo: null,
      Velocidad_1ra_Pag_Color_Equipo: null,
      Capacidad_Bandeja1_Equipo: 500,
      Capacidad_Bypass_Equipo: null,
      Ciclo_Recomendado_Equipo: null,
      Ciclo_Mensual_Equipo: null,
      Ciclo_Maximo_Equipo: null,
      Tipo_Pantalla_Equipo: null,
      Tamano_Pantalla_Equipo: null,
      Memoria_RAM_Equipo: null,
      Procesador_Equipo: null,
      Disco_Duro_Equipo: null,
      Funciones_Equipo: "Imprimir",
      Conectividad_Equipo: "WiFi, Ethernet, USB",
      Duracion_Bateria_Equipo: null,
      Archivo_PDF_Equipo: null,
      Imagen_Equipo: "/images/equipos/impresoras/ECOSYS-PA-4500X.png",
      Descripcion_Equipo: "Impresora láser monocromática de alta velocidad para entornos exigentes.",
      Fecha_Carga_Equipo: null,
      Fecha_Registro_Equipo: null,
      Nombre_Marca: "Kyocera",
    },
  ]
}
