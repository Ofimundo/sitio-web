"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
    setMounted(true)
  }, [])

  function toggleTheme() {
    const nextDark = !dark
    document.documentElement.classList.toggle("dark", nextDark)
    document.documentElement.style.colorScheme = nextDark ? "dark" : "light"
    localStorage.setItem("ofimundo-theme", nextDark ? "dark" : "light")
    setDark(nextDark)
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={mounted && dark ? "Activar modo claro" : "Activar modo oscuro"}
      title={mounted && dark ? "Modo claro" : "Modo oscuro"}
    >
      {mounted && dark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </button>
  )
}
