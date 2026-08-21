"use client"

import { useEffect, useState, useRef } from "react"
import { MessageCircle, Send, X, Loader2, RefreshCw, Sparkles } from "lucide-react"

const AVATAR_CHATBOT = "/chatbot/chatofi.png"

type ProductoChat = Record<string, unknown>

type Mensaje = {
  rol: "usuario" | "bot"
  texto: string
  categoria?: string
  productos?: ProductoChat[]
}

function textoProducto(valor: unknown) {
  return typeof valor === "string" ? valor : ""
}

function obtenerTarjeta(producto: ProductoChat, categoria?: string) {
  if (categoria === "salas") {
    const idOriginal = textoProducto(
      producto.id_Producto ??
      producto.id_producto ??
      producto.ID_Producto
    )

    const slug = idOriginal
      .replace(/^sala_/i, "")
      .replace(/_/g, "-")
      .toLowerCase()

    return {
      tipo: "🤝 SALA",
      nombre:
        textoProducto(producto.nombre_sala) ||
        textoProducto(producto.titulo_sala) ||
        "Sala colaborativa",
      descripcion:
        textoProducto(producto.descripcion_corta) ||
        textoProducto(producto.tamano_sala),
      imagen:
        textoProducto(producto.imagen_Equipo) ||
        textoProducto(producto.Imagen_Equipo),
      cotizar: slug ? `/cotizar-salas/${slug}` : "",
      detalle: slug ? `/salas/${slug}` : "",
    }
  }

  if (categoria === "equipos") {
    const id = textoProducto(
      producto.ID_Producto ??
      producto.id_Producto ??
      producto.id_producto
    )

    return {
      tipo: "🖨️ EQUIPO",
      nombre:
        textoProducto(producto.Nombre_Equipo) ||
        textoProducto(producto.nombre) ||
        textoProducto(producto.descripcion_corta) ||
        "Equipo de impresión",
      descripcion:
        [
          textoProducto(producto.Nombre_Marca),
          textoProducto(producto.Tipo_Equipo),
        ].filter(Boolean).join(" · "),
      imagen:
        textoProducto(producto.Imagen_Equipo) ||
        textoProducto(producto.imagen_Equipo),
      cotizar: id ? `/cotizar-mps/${encodeURIComponent(id)}` : "",
      detalle: id ? `/equipo/${encodeURIComponent(id)}` : "",
    }
  }

  if (categoria === "automatizaciones") {
    const textoAutomatizacion = [
      textoProducto(producto.slug),
      textoProducto(producto.id_Producto),
      textoProducto(producto.id_producto),
      textoProducto(producto.modelo),
      textoProducto(producto.nombre_producto),
      textoProducto(producto.descripcion_corta),
    ]
      .join(" ")
      .toLowerCase()

    let slug = textoProducto(producto.slug)

    if (!slug) {
      if (
        textoAutomatizacion.includes("factura") ||
        textoAutomatizacion.includes("a.r.f")
      ) {
        slug = "aceptacion-rechazo-facturas"
      } else if (
        textoAutomatizacion.includes("saldo") ||
        textoAutomatizacion.includes("bancario")
      ) {
        slug = "saldos-bancarios"
      } else if (
        textoAutomatizacion.includes("finiquito") ||
        textoAutomatizacion.includes("f.q")
      ) {
        slug = "finiquitos-dt"
      } else if (
        textoAutomatizacion.includes("gestion de cuentas") ||
        textoAutomatizacion.includes("gestión de cuentas") ||
        textoAutomatizacion.includes("g.c")
      ) {
        slug = "gestion-cuentas"
      }
    }

    return {
      tipo: "⚙️ AUTOMATIZACIÓN",
      nombre:
        textoProducto(producto.nombre_producto) ||
        textoProducto(producto.modelo) ||
        "Automatización",
      descripcion:
        textoProducto(producto.descripcion_corta) ||
        textoProducto(producto.beneficio),
      imagen: textoProducto(producto.link_imagen),
      cotizar: slug ? `/cotizar-automatizaciones/${slug}` : "",
      detalle: slug ? `/automatizaciones/${slug}` : "",
    }
  }

  return null
}

const OPCIONES_RAPIDAS = [
  "🖨️ Multifuncional A4 Color",
  "⚙️ Aceptación de Facturas SII",
  "🤝 Equipamiento Sala Reuniones",
  "🖨️ Impresora Monocromo Alto Volumen",
]

interface ChatbotOfimundoProps {
  embedded?: boolean
}

export default function ChatbotOfimundo({ embedded = false }: ChatbotOfimundoProps) {
  const [abierto, setAbierto] = useState(false)
  const [mensaje, setMensaje] = useState("")
  const [cargando, setCargando] = useState(false)
  const [sesionId, setSesionId] = useState("")
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let id = localStorage.getItem("ofimundo-chatbot-session")

    if (!id) {
      id = `sesion-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
      localStorage.setItem("ofimundo-chatbot-session", id)
    }

    setSesionId(id)
  }, [])

  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      rol: "bot",
      texto:
        "¡Hola! Soy el asistente virtual de Ofimundo. Cuéntame qué tipo de equipo de impresión, sala colaborativa o servicio de automatización necesitas.",
    },
  ])

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [mensajes, cargando])

  async function enviarMensajeTexto(textoAEnviar?: string) {
    const texto = (textoAEnviar || mensaje).trim()

    if (!texto || cargando) return

    setMensajes((prev) => [
      ...prev,
      {
        rol: "usuario",
        texto,
      },
    ])

    if (!textoAEnviar) setMensaje("")
    setCargando(true)

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mensaje: texto,
          sesion_id: sesionId,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Error consultando el asistente")
      }

      setMensajes((prev) => [
        ...prev,
        {
          rol: "bot",
          texto:
            data.respuesta ||
            "Encontré algunas opciones que podrían servirte.",
          categoria:
            typeof data.categoria === "string"
              ? data.categoria
              : undefined,
          productos:
            Array.isArray(data.productos)
              ? data.productos.slice(0, 3)
              : [],
        },
      ])
    } catch (error) {
      console.error(error)

      setMensajes((prev) => [
        ...prev,
        {
          rol: "bot",
          texto:
            "En este momento no pude procesar tu consulta. Intenta nuevamente en unos segundos.",
        },
      ])
    } finally {
      setCargando(false)
    }
  }

  function reiniciarChat() {
    const nuevoId = `sesion-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
    localStorage.setItem("ofimundo-chatbot-session", nuevoId)
    setSesionId(nuevoId)
    setMensajes([
      {
        rol: "bot",
        texto:
          "¡Hola! Soy el asistente virtual de Ofimundo. Cuéntame qué tipo de equipo de impresión, sala colaborativa o servicio de automatización necesitas.",
      },
    ])
  }

  // Componente de contenido del chat reutilizable
  const contenidoChatJSX = (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header del Chatbot */}
      <div
        className="flex items-center justify-between px-5 py-4 text-white shrink-0 shadow-md"
        style={{
          background: "linear-gradient(90deg, #552B7E 0%, #A33A5E 100%)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white/30 bg-white shadow-sm shrink-0">
            <img
              src={AVATAR_CHATBOT}
              alt="Asistente Ofimundo"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <div className="font-semibold text-base flex items-center gap-2">
              Asistente Virtual Ofimundo
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <div className="text-xs text-white/80">
              Recomendador inteligente de productos y servicios
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={reiniciarChat}
            className="rounded-lg p-2 transition hover:bg-white/10 text-white/90 hover:text-white"
            title="Reiniciar conversación"
            aria-label="Reiniciar conversación"
          >
            <RefreshCw size={18} />
          </button>

          {!embedded && (
            <button
              onClick={() => setAbierto(false)}
              className="rounded-lg p-2 transition hover:bg-white/10"
              aria-label="Cerrar chatbot"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Opciones rápidas */}
      <div className="bg-purple-50/80 dark:bg-gray-800/60 px-4 py-2 border-b border-purple-100 dark:border-gray-700/50 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
        <span className="text-[11px] font-semibold text-purple-800 dark:text-purple-300 flex items-center gap-1 shrink-0 self-center">
          <Sparkles size={12} /> Sugerencias:
        </span>
        {OPCIONES_RAPIDAS.map((opcion, idx) => (
          <button
            key={idx}
            onClick={() => enviarMensajeTexto(opcion)}
            disabled={cargando}
            className="text-[11px] font-medium px-3 py-1 bg-white dark:bg-gray-800 text-purple-900 dark:text-purple-200 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 border border-purple-200 dark:border-gray-700 rounded-full transition-all shrink-0 whitespace-nowrap shadow-xs disabled:opacity-50"
          >
            {opcion}
          </button>
        ))}
      </div>

      {/* Lista de Mensajes */}
      <div ref={messagesContainerRef} className="flex-1 space-y-4 overflow-y-auto bg-slate-50 dark:bg-gray-950 p-4">
        {mensajes.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              item.rol === "usuario" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`flex w-full items-start gap-2.5 ${
                item.rol === "usuario" ? "justify-end" : "justify-start"
              }`}
            >
              {item.rol === "bot" && (
                <img
                  src={AVATAR_CHATBOT}
                  alt="Asistente Ofimundo"
                  className="mt-1 h-8 w-8 shrink-0 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 object-cover shadow-xs"
                />
              )}

              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  item.rol === "usuario"
                    ? "rounded-br-xs bg-slate-900 dark:bg-purple-700 text-white shadow-xs"
                    : "rounded-bl-xs border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-800 dark:text-gray-100 shadow-sm"
                }`}
              >
                {item.texto}
              </div>
            </div>

            {item.rol === "bot" &&
              item.productos &&
              item.productos.length > 0 && (
                <div className="mt-3 ml-10 w-[88%] space-y-2.5">
                  <div className="px-1 text-[11px] font-bold text-[#2D1B4B] dark:text-purple-300 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={12} /> Productos recomendados
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {item.productos.map((producto, productoIndex) => {
                      const tarjeta = obtenerTarjeta(
                        producto,
                        item.categoria
                      )

                      if (!tarjeta) return null

                      return (
                        <div
                          key={productoIndex}
                          className="flex gap-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 shadow-xs hover:shadow-md transition-all"
                        >
                          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 p-1">
                            {tarjeta.imagen ? (
                              <img
                                src={tarjeta.imagen}
                                alt={tarjeta.nombre}
                                className="h-full w-full object-contain"
                              />
                            ) : (
                              <span className="text-2xl">📦</span>
                            )}
                          </div>

                          <div className="min-w-0 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="text-[10px] font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider">
                                {tarjeta.tipo}
                              </div>

                              <div className="text-xs font-semibold leading-snug text-slate-900 dark:text-white line-clamp-1">
                                {tarjeta.nombre}
                              </div>

                              {tarjeta.descripcion && (
                                <div className="mt-0.5 line-clamp-2 text-[11px] text-slate-500 dark:text-gray-400">
                                  {tarjeta.descripcion}
                                </div>
                              )}
                            </div>

                            <div className="mt-2 flex items-center gap-2">
                              {tarjeta.cotizar && (
                                <a
                                  href={tarjeta.cotizar}
                                  className="rounded-lg px-3 py-1.5 text-[10px] font-bold text-white transition hover:opacity-90 inline-block"
                                  style={{
                                    background: "linear-gradient(90deg, #552B7E 0%, #A33A5E 100%)",
                                  }}
                                >
                                  Cotizar
                                </a>
                              )}

                              {tarjeta.detalle && (
                                <a
                                  href={tarjeta.detalle}
                                  className="px-2 py-1.5 text-[10px] font-semibold text-purple-700 dark:text-purple-300 hover:underline inline-block"
                                >
                                  Ver más →
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
          </div>
        ))}

        {cargando && (
          <div className="flex justify-start items-center gap-2 ml-10">
            <div className="flex items-center gap-2 rounded-2xl rounded-bl-xs border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-slate-500 dark:text-gray-400 shadow-sm">
              <Loader2 size={16} className="animate-spin text-purple-600" />
              Buscando las mejores opciones para tu empresa...
            </div>
          </div>
        )}
      </div>

      {/* Input del Chatbot */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3.5 shrink-0">
        <div className="flex items-center gap-2">
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                enviarMensajeTexto()
              }
            }}
            rows={1}
            placeholder="Escribe lo que necesitas (ej: Multifuncional a color A4, Automatizar facturas...)"
            className="max-h-28 min-h-[46px] flex-1 resize-none rounded-xl border border-gray-300 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition focus:border-purple-600 focus:bg-white dark:focus:bg-gray-900"
          />

          <button
            onClick={() => enviarMensajeTexto()}
            disabled={cargando || !mensaje.trim()}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-r from-purple-700 to-pink-700 text-white transition hover:from-purple-800 hover:to-pink-800 disabled:cursor-not-allowed disabled:opacity-40 shrink-0 shadow-sm"
            aria-label="Enviar mensaje"
          >
            <Send size={18} />
          </button>
        </div>

        <div className="mt-2 text-center text-[10px] text-gray-400 dark:text-gray-500">
          Asistente Inteligente de Ofimundo · Respuesta instantánea 24/7
        </div>
      </div>
    </div>
  )

  if (embedded) {
    return (
      <div className="w-full max-w-5xl mx-auto h-[390px] rounded-3xl border border-purple-200/80 dark:border-purple-900/40 bg-white dark:bg-gray-900 shadow-xl overflow-hidden my-2">
        {contenidoChatJSX}
      </div>
    )
  }

  return (
    <>
      {abierto && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[580px] w-[420px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl">
          {contenidoChatJSX}
        </div>
      )}

      <button
        onClick={() => setAbierto((valor) => !valor)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl transition hover:scale-105"
        style={{
          background: "linear-gradient(90deg, #552B7E 0%, #A33A5E 100%)",
        }}
        aria-label="Abrir asistente Ofimundo"
      >
        {abierto ? <X size={24} /> : <MessageCircle size={26} />}
      </button>
    </>
  )
}
