"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Menu, X, ChevronDown } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [solucionesOpen, setSolucionesOpen] = useState(false)
  const pathname = usePathname()

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false)
    setSolucionesOpen(false)
  }, [pathname])

  // Prevenir scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  return (
    <header className="navbar-wrapper px-3 sm:px-6">
      <nav className="navbar relative" aria-label="Navegación principal">
        {/* Logo */}
        <div className="logo shrink-0">
          <Link href="/" className="logo-link flex items-center" onClick={handleLogoClick} aria-label="Ir al inicio">
            <Image
              className="logo-light w-[140px] sm:w-[180px] md:w-[220px] h-auto"
              src="https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/01-logos/logo-ofimundo.png"
              alt="Ofimundo"
              width={230}
              height={50}
              priority
            />
            <Image
              className="logo-dark w-[140px] sm:w-[180px] md:w-[220px] h-auto"
              src="https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/01-logos/logo-ofimundo-blanco.png"
              alt="Ofimundo"
              width={230}
              height={50}
              priority
            />
          </Link>
        </div>

        {/* Links de escritorio */}
        <ul className="nav-links">
          <li className="dropdown">
            <a href="#" className="flex items-center gap-1">
              Soluciones y Servicios
              <i className="fas fa-chevron-down text-xs"></i>
            </a>

            <div className="mega-menu">
              <Link href="/soluciones#mps" className="mega-item">
                <div className="icon">
                  <i className="fas fa-print"></i>
                </div>
                <div className="text">
                  <h4>MPS</h4>
                  <p>Servicio de Impresión Gestionado</p>
                </div>
              </Link>

              <Link href="/soluciones#salas" className="mega-item">
                <div className="icon">
                  <i className="fas fa-building"></i>
                </div>
                <div className="text">
                  <h4>Salas Colaborativas</h4>
                  <p>Equipamiento de videoconferencia y comunicaciones</p>
                </div>
              </Link>

              <Link href="/soluciones#automatizaciones" className="mega-item">
                <div className="icon">
                  <i className="fas fa-robot"></i>
                </div>
                <div className="text">
                  <h4>Servicios de Automatización</h4>
                  <p>Servicios de automatización de procesos</p>
                </div>
              </Link>
            </div>
          </li>
          <li>
            <Link href="/somos-ofimundo">
              Somos Ofimundo
            </Link>
          </li>
          <li>
            <Link href="/catalogo">Catálogo</Link>
          </li>
          <li>
            <Link href="/contacto">
              Contacto
            </Link>
          </li>
        </ul>

        {/* Acciones de la derecha */}
        <div className="nav-actions flex items-center gap-1.5 sm:gap-3">
          <ThemeToggle />

          {/* Botón Mi Cuenta para escritorio y tablet */}
          <a
            href="https://micuenta.ofimundo.cl/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-account hidden sm:inline-flex text-center px-4 py-2.5 sm:py-3 bg-linear-to-br from-(--ofimundo-purple) to-(--ofimundo-magenta) text-white rounded-lg text-xs sm:text-sm font-semibold hover:from-[#241a78] hover:to-[#c62842] transition shadow-md shrink-0"
          >
            MI CUENTA
          </a>

          {/* Botón Hamburguesa para móvil/tablet (< 1024px) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shrink-0"
            aria-label={mobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Menú móvil desplegable */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl p-5 max-w-[1200px] mx-auto animate-in fade-in slide-in-from-top-4 duration-200">
          <ul className="flex flex-col gap-2">
            {/* Acordeón de Soluciones */}
            <li className="border-b border-gray-100 dark:border-gray-800 pb-2">
              <button
                type="button"
                onClick={() => setSolucionesOpen((prev) => !prev)}
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <span>Soluciones y Servicios</span>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 transition-transform duration-200 ${
                    solucionesOpen ? "rotate-180 text-purple-600" : ""
                  }`}
                />
              </button>

              {solucionesOpen && (
                <div className="mt-1 ml-2 flex flex-col gap-1 border-l-2 border-purple-200 dark:border-purple-900/60 pl-3 py-1">
                  <Link
                    href="/soluciones#mps"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-2 px-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-800 hover:text-purple-600 transition"
                  >
                    <i className="fas fa-print text-purple-600 w-4"></i>
                    <div>
                      <span className="font-semibold block">MPS</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Arriendo + mantención e insumos</span>
                    </div>
                  </Link>

                  <Link
                    href="/soluciones#salas"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-2 px-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-800 hover:text-purple-600 transition"
                  >
                    <i className="fas fa-building text-purple-600 w-4"></i>
                    <div>
                      <span className="font-semibold block">Salas Colaborativas</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Videoconferencia y pantallas</span>
                    </div>
                  </Link>

                  <Link
                    href="/soluciones#automatizaciones"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-2 px-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-800 hover:text-purple-600 transition"
                  >
                    <i className="fas fa-robot text-purple-600 w-4"></i>
                    <div>
                      <span className="font-semibold block">Servicios de Automatización</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Automatización de procesos</span>
                    </div>
                  </Link>
                </div>
              )}
            </li>

            <li>
              <Link
                href="/somos-ofimundo"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <span>Somos Ofimundo</span>
              </Link>
            </li>

            <li>
              <Link
                href="/catalogo"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-xl font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                Catálogo
              </Link>
            </li>

            <li>
              <Link
                href="/contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-xl font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                Contacto
              </Link>
            </li>

            {/* Botón Mi Cuenta en menú móvil */}
            <li className="pt-2">
              <a
                href="https://micuenta.ofimundo.cl/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center block py-3 bg-linear-to-br from-(--ofimundo-purple) to-(--ofimundo-magenta) text-white rounded-xl text-sm font-bold shadow-md hover:opacity-95 transition"
              >
                MI CUENTA
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
