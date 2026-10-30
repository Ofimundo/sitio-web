"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function QueSeNoteNav() {
  const pathname = usePathname()

  const links = [
    { href: "/que-se-note", label: "Inicio", exact: true },
    { href: "/que-se-note/programa", label: "El programa" },
    { href: "/que-se-note/pasaportes", label: "Pasaportes" },
    { href: "/que-se-note/reconocimientos", label: "Reconocimientos" },
  ]

  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <nav className="nav">
      <Link href="/que-se-note" className="brand">
        QUE <span>SE NOTE.</span>
      </Link>
      <div className="navlinks">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={isActive(link.href, link.exact) ? "active" : ""}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <Link href="/que-se-note/quiero-reconocer" className="btn-primary">
        Quiero reconocer
      </Link>
    </nav>
  )
}

