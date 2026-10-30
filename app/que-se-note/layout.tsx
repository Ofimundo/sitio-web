import type { Metadata } from "next"
import { QueSeNoteNav } from "@/components/que-se-note/QueSeNoteNav"
import { QueSeNoteFooter } from "@/components/que-se-note/QueSeNoteFooter"
import "./que-se-note.css"

export const metadata: Metadata = {
  title: "QUE SE NOTE — Programa de Reconocimiento",
  description:
    "Un programa para reconocer y hacer visibles las acciones, desempeños y proyectos que generan valor en Ofimundo, Dreamtec, Global Horizon y Hiway.",
}

export default function QueSeNoteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="que-se-note-scope min-h-screen bg-[#0a0a0a] text-[#f0efea]">
      <QueSeNoteNav />
      {children}
      <QueSeNoteFooter />
    </div>
  )
}

