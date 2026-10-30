import Link from "next/link"
import { ArrowRight, Compass } from "lucide-react"

export default function QueSeNoteHomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-spotlight" />
        <div className="hero-glow" />
        <div>
          <span className="kicker">Programa de reconocimiento</span>
          <h1 className="hero-title">
            QUE
            <br />
            <span>SE NOTE.</span>
          </h1>
          <p className="subtitle">
            Un programa para reconocer y hacer visibles las acciones, desempeños y proyectos que generan valor.
          </p>
          <Link href="/que-se-note/programa" className="btn-primary">
            Conoce el programa <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="intro-statement">
        <div>
          <h2>
            HAY COSAS QUE <br />
            NO DEBERÍAN PASAR <br />
            <span>DESAPERCIBIDAS</span>
          </h2>
          <p className="subtitle">
            Hay personas que todos los días empujan los límites más allá de lo establecido.
            <br />
            Por eso nació &quot;Que Se Note&quot; un programa de reconocimiento para todo el grupo.
          </p>
        </div>
      </section>

      <section className="formas">
        <div>
          <h2>
            <span>4 Formas</span>
            <br />
            de que se note.
          </h2>
          <p className="formastxt">
            Cada dimensión reconoce una forma distinta de aportar, destacar y generar valor dentro del grupo.
          </p>
        </div>
        <div className="grid-4">
          <div className="card">
            <span className="number">01 · DÍA A DÍA</span>
            <h3>SE NOTÓ</h3>
            <p>Acciones y desempeños que destacan en lo cotidiano.</p>
          </div>
          <div className="card">
            <span className="number">02 · TRIMESTRAL</span>
            <h3>DESTACÓ</h3>
            <p>Proyectos de equipos que sobresalen por su aporte e impacto.</p>
          </div>
          <div className="card">
            <span className="number">03 · ANUAL</span>
            <h3>DEJÓ HUELLA</h3>
            <p>Reconocimiento a quién complete la mayor cantidad de sellos en su Pasaporte.</p>
          </div>
          <div className="card">
            <span className="number">04 · ESTRATÉGICA</span>
            <h3>MARCÓ LA DIFERENCIA</h3>
            <p>Proyectos estratégicos que generan un impacto relevante para el Grupo.</p>
          </div>
        </div>
      </section>

      <section className="passport-banner">
        <div className="grid-2">
          <div className="half">
            <img src="/que-se-note/img/ej-pasaporte.png" alt="Ejemplo Pasaporte" />
          </div>
          <div className="half">
            <h2>
              Todos tienen
              <br />
              un pasaporte.
            </h2>
            <p className="subtitle">
              Cada reconocimiento suma un sello y <br />
              queda visible en el recorrido de cada persona.
            </p>
            <Link href="/que-se-note/pasaportes" className="btn-primary">
              Explorar pasaportes <Compass size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="big-quote">
        <h2>
          « LO QUE HACES BIEN <br />
          MERECE SER VISTO »<br />
          <span>QUE SE NOTE</span>
        </h2>
      </section>
    </>
  )
}

