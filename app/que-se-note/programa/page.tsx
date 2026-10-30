export default function QueSeNoteProgramaPage() {
  return (
    <>
      <section className="hero">
        <div>
          <span className="kicker">Conoce el programa</span>
          <h1>
            CUATRO FORMAS<br />
            DE QUE <span>SE NOTE.</span>
          </h1>
          <p className="subtitle">
            Un sistema de reconocimiento que hace visibles las acciones del día a día, los proyectos destacados, la trayectoria de reconocimiento y las iniciativas estratégicas.
          </p>
        </div>
      </section>

      <section className="premios">
        <h2>¿Cómo funcionan los Reconocimientos?</h2>
        <p className="premiostxt">
          Cada dimensión tiene su propio momento, su propio comité y su propio peso. Juntas, forman el año completo.
        </p>
        <div className="dims-grid">
          {/* D1 */}
          <div className="dim-card reveal">
            <span className="dim-num">01</span>
            <p className="dim-tag">DÍA A DÍA</p>
            <p className="dim-name">SE NOTÓ</p>
            <p className="dim-desc">
              Reconocimiento por competencias transversales y de rol. Cualquier colaborador puede iniciarlo en el momento que ocurre, mediante el botón &quot;Quiero Reconocer&quot;.
            </p>
            <div className="dim-premios">
              <p className="dim-premios-label">Premios</p>
              <div className="dim-premio-item">Sello en tu pasaporte personal</div>
              <div className="dim-premio-item">Destacado en el Muro de Reconocimientos</div>
              <div className="dim-premio-item">Sorteo Giftcard $30.000</div>
            </div>
          </div>

          {/* D2 */}
          <div className="dim-card reveal">
            <span className="dim-num">02</span>
            <p className="dim-tag">TRIMESTRAL</p>
            <p className="dim-name">DESTACÓ</p>
            <p className="dim-desc">
              El comité elige un proyecto en el trimestre, mediante una evaluación con rúbrica objetiva y representatividad de todas las áreas.
            </p>
            <div className="dim-premios">
              <p className="dim-premios-label">Premios</p>
              <div className="dim-premio-item">Reconocimiento en Brújula</div>
              <div className="dim-premio-item">Mail de felicitaciones</div>
              <div className="dim-premio-item">Actividad con el equipo</div>
            </div>
          </div>

          {/* D3 */}
          <div className="dim-card reveal">
            <span className="dim-num">03</span>
            <p className="dim-tag">ANUAL</p>
            <p className="dim-name">DEJÓ HUELLA</p>
            <p className="dim-desc">
              Quienes completan su tarjeta con todos los sellos del año acceden a la premiación anual. El pasaporte completo es el requisito.
            </p>
            <div className="dim-premios">
              <p className="dim-premios-label">Premios</p>
              <div className="dim-premio-item">Destacado en el Muro de Reconocimientos</div>
              <div className="dim-premio-item">Reconocimiento en actividad de fin de año</div>
              <div className="dim-premio-item">Giftcard $50.000</div>
            </div>
          </div>

          {/* D4 */}
          <div className="dim-card reveal">
            <span className="dim-num">04</span>
            <p className="dim-tag">ESTRATÉGICO</p>
            <p className="dim-name">MARCÓ LA DIFERENCIA</p>
            <p className="dim-desc">
              El reconocimiento viene directo desde la gerencia general para quienes lideraron un proyecto estratégico para la empresa.
            </p>
            <div className="dim-premios">
              <p className="dim-premios-label">Premios</p>
              <div className="dim-premio-item">Destacado en el Muro de Reconocimientos</div>
              <div className="dim-premio-item">Reconocimiento en actividad de fin de año</div>
              <div className="dim-premio-item">Actividad especial con el equipo</div>
            </div>
          </div>
        </div>
      </section>

      <section className="proceso">
        <div>
          <span className="kicker">El Proceso</span>
          <h2>
            SIMPLE,<br />
            <span>OBJETIVO Y CONTINUO.</span>
          </h2>
          <p style={{ marginTop: "10px" }}>Estos son los pasos para el reconocimiento diario &quot;SE NOTÓ&quot;.</p>
        </div>
        <div className="flow-grid">
          <div className="flow-step reveal">
            <span className="flow-step-num">1</span>
            <p className="flow-step-title">OCURRE</p>
            <p className="flow-step-text">
              Un colaborador hace algo que se nota, resuelve, lidera, empuja los límites, va más allá dentro de las competencias. El colaborador lo identifica en el momento y lo reconoce.
            </p>
          </div>
          <div className="flow-step reveal">
            <span className="flow-step-num">2</span>
            <p className="flow-step-title">EVALUACIÓN</p>
            <p className="flow-step-text">
              Se aplica la rúbrica de la dimensión correspondiente. El proceso es transparente y documentado. No hay subjetividad.
            </p>
          </div>
          <div className="flow-step reveal">
            <span className="flow-step-num">3</span>
            <p className="flow-step-title">RESULTADO</p>
            <p className="flow-step-text">
              El reconocido recibe su sello. Su pasaporte se actualiza. El equipo lo sabe.
            </p>
          </div>
        </div>
      </section>

      <section className="funcion">
        <h2>Tipos de Competencias</h2>
        <p className="funciontxt">
          Las cuatro dimensiones tienen diferentes mecanismos de reconocimiento y premios, según el tipo de aporte que buscan visibilizar.
        </p>
        <div className="grid-3">
          <div className="card">
            <span className="number">MECÁNICA</span>
            <h3>Competencias transversales</h3>
            <p>
              Nuestras competencias transversales están asociadas a nuestros valores que son: Ambición, Accountability, Startup Mindset, Compañerismo, Customer Centric, Respeto, Honestidad y Trabajo bien hecho.
            </p>
          </div>
          <div className="card">
            <span className="number">MECÁNICA</span>
            <h3>Competencias específicas por rol</h3>
            <p>
              Se visualizan dentro del Pasaporte de cada colaborador según las competencias definidas para su rol.
            </p>
          </div>
          <div className="card">
            <span className="number">OBJETIVO</span>
            <h3>Visibilidad</h3>
            <p>
              El reconocimiento se conecta con las competencias que tenemos y queremos hacer visibles en todo nuestro equipo.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

