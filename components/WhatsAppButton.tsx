"use client"

import React from "react"

interface WhatsAppButtonProps {
  phoneNumber?: string
  message?: string
}

export function WhatsAppButton({
  phoneNumber = "56988229379",
  message = "Hola, me gustaría obtener más información sobre los servicios de Ofimundo.",
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message)
  const href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  return (
    <aside
      aria-label="Contacto por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center group pointer-events-auto select-none"
    >
      {/* Tooltip flotante al pasar el mouse (visible en desktop) */}
      <div
        className="pointer-events-none mr-3 hidden sm:flex items-center rounded-full bg-white/95 dark:bg-gray-900/95 px-3.5 py-1.5 text-xs font-semibold text-gray-800 dark:text-gray-100 shadow-md border border-gray-200/80 dark:border-gray-800/80 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
        role="tooltip"
      >
        <span className="relative flex h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        ¿Necesitas ayuda? Escríbenos
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hablar con Ofimundo por WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-950/20 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:bg-[#20ba5a] active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
      >
        {/* Onda de pulso sutil */}
        <span
          className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping -z-10"
          aria-hidden="true"
        />

        {/* Ícono SVG oficial de WhatsApp */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-8 w-8"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.04 3.67C14.24 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.11 19.09L7.83 18.92L4.72 19.74L5.55 16.71L5.36 16.41C4.58 15.17 4.17 13.73 4.17 11.91C4.17 7.37 7.87 3.67 12.04 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.68C7.02 10.88 7.9 12.04 8.02 12.2C8.14 12.37 9.73 14.82 12.18 15.87C12.76 16.12 13.22 16.27 13.57 16.38C14.16 16.57 14.7 16.54 15.12 16.48C15.59 16.41 16.57 15.89 16.77 15.31C16.98 14.74 16.98 14.25 16.91 14.15C16.85 14.04 16.69 13.98 16.44 13.85C16.19 13.73 14.97 13.13 14.74 13.05C14.52 12.97 14.35 12.93 14.19 13.17C14.02 13.42 13.55 13.98 13.41 14.15C13.26 14.31 13.12 14.33 12.87 14.21C12.63 14.09 11.83 13.82 10.89 12.98C10.15 12.32 9.66 11.51 9.51 11.26C9.37 11.02 9.5 10.88 9.62 10.76C9.73 10.65 9.87 10.47 10 10.32C10.13 10.17 10.18 10.06 10.26 9.89C10.34 9.73 10.3 9.58 10.24 9.46C10.18 9.34 9.71 8.18 9.51 7.71C9.32 7.25 9.13 7.31 8.98 7.31C8.84 7.31 8.68 7.33 8.53 7.33Z" />
        </svg>
      </a>
    </aside>
  )
}
