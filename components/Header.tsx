"use client"

import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "@/components/ThemeToggle"

export function Header() {
  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        {/* Logo */}
        <div className="logo">
          <Link href="/" className="logo-link">
            <Image className="logo-light" src="https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/01-logos/logo-ofimundo.png" alt="Ofimundo" width={230} height={50} priority />
            <Image className="logo-dark" src="https://d3d57fbyf4vdnc.cloudfront.net/banco_imagenes/01-logos/logo-ofimundo-blanco.png" alt="Ofimundo" width={230} height={50} priority />
          </Link>
        </div>

        {/* Links */}
        <ul className="nav-links">
          <li className="dropdown">
            <a href="#" className="flex items-center gap-1">
              Soluciones y Servicios
              <i className="fas fa-chevron-down text-xs"></i>
            </a>

            <div className="mega-menu">
              <a href="https://www.ofimundo.cl/servicios/mps.html" target="_blank" rel="noopener noreferrer" className="mega-item">
                <div className="icon">
                  <i className="fas fa-print"></i>
                </div>
                <div className="text">
                  <h4>MPS</h4>
                  <p>Servicio de Impresión Gestionado</p>
                </div>
              </a>

              <a href="https://www.ofimundo.cl/servicios/smart-office.html" target="_blank" rel="noopener noreferrer" className="mega-item">
                <div className="icon">
                  <i className="fas fa-building"></i>
                </div>
                <div className="text">
                  <h4>Salas Inmersivas</h4>
                  <p>Reuniones inmersivas con tecnología</p>
                </div>
              </a>

              <a
                href="https://www.ofimundo.cl/servicios/rpa.html"
                target="_blank"
                rel="noopener noreferrer"
                className="mega-item"
              >
                <div className="icon">
                  <i className="fas fa-robot"></i>
                </div>
                <div className="text">
                  <h4>Automatización</h4>
                  <p>Automatiza tareas repetitivas</p>
                </div>
              </a>

              <a
                href="https://www.ofimundo.cl/servicios/daas.html"
                target="_blank"
                rel="noopener noreferrer"
                className="mega-item"
              >
                <div className="icon">
                  <i className="fas fa-laptop"></i>
                </div>
                <div className="text">
                  <h4>DaaS</h4>
                  <p>Arriendo de equipos de cómputo</p>
                </div>
              </a>
            </div>
          </li>
          <li>
            <a
              href="https://www.ofimundo.cl/aniversario/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Somos Ofimundo
            </a>
          </li>
          <li>
            <Link href="/catalogo">Catálogo</Link>
          </li>
          <li>
            <a
              href="https://www.ofimundo.cl/contacto.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contacto
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <ThemeToggle />
          <a
            href="https://micuenta.ofimundo.cl/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-account flex-1 text-center px-4 py-3 bg-linear-to-br from-(--ofimundo-purple) to-(--ofimundo-magenta) text-white rounded-lg text-sm font-semibold hover:from-[#241a78] hover:to-[#c62842] transition"
          >
            MI CUENTA
          </a>
        </div>
      </nav>
    </header>
  )
}
