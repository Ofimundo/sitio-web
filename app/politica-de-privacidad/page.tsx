import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function PoliticaDePrivacidadPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-gray-100 flex flex-col">
      <Header />

      {/* Hero Header */}
      <section className="relative pt-28 sm:pt-32 pb-10 sm:pb-14 px-4 overflow-hidden bg-linear-to-b from-purple-900/10 via-pink-900/5 to-transparent dark:from-purple-950/40 dark:via-pink-950/20">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 mb-4 border border-purple-200 dark:border-purple-800">
            Legal
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gradient mb-3 leading-tight">
            Política de Privacidad de Datos
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 font-medium">
            Última modificación: 07 Noviembre 2024
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <article className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-xl p-6 sm:p-10 md:p-12 space-y-8 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-gray-300">
          {/* Introducción */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Introducción
            </h2>
            <p>
              En Ofimundo, nos comprometemos a proteger y respetar tu privacidad. Esta Política de Privacidad tiene como objetivo informarte sobre cómo recopilamos, utilizamos y protegemos tus datos personales, conforme a lo establecido por la Ley 19.496 de Protección de los Derechos de los Consumidores y la Ley 20.575 de Protección de la Vida Privada (Ley de Protección de Datos Personales). En Ofimundo, tu privacidad es nuestra prioridad.
            </p>
          </section>

          {/* 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              1- Información que recopilamos
            </h2>
            <p>
              Recopilamos datos personales que tú nos proporcionas de forma directa y que son los mínimos necesarios para poder contactarte y apoyarte con lo que tu empresa necesita, específicamente:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Nombre y Apellido</li>
              <li>Correo electrónico laboral y/o personal</li>
              <li>Teléfono</li>
              <li>Nombre Empresa</li>
              <li>RUT Empresa</li>
            </ul>
          </section>

          {/* 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              2- Uso de la Información
            </h2>
            <p>
              Los datos antes mencionados son utilizados para los siguientes fines:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Responder a tu solicitud sobre algún producto o servicio que ofrecemos.</li>
              <li>Comunicarnos contigo sobre actualizaciones, promociones y novedades de Ofimundo.</li>
              <li>Pedir tu opinión sobre la experiencia que tuviste con nuestra empresa.</li>
              <li>Mejorar nuestra oferta de productos y servicios.</li>
            </ul>
          </section>

          {/* 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              3- ¿Por cuánto tiempo almacenamos tus datos personales?
            </h2>
            <p>
              En Ofimundo, conservamos tus datos personales según la legislación aplicable. Durante este tiempo, tus datos se mantendrán en un formato seguro y controlado. Pero por supuesto, si en algún momento no quieres recibir más comunicación de nosotros puedes ejercer tu derecho a la cancelación de los mismos, contactándonos a través de cualquiera de nuestros canales oficiales.
            </p>
          </section>

          {/* 4 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              4- ¿Cómo recabamos tus datos personales?
            </h2>
            <p>
              En Ofimundo, recopilamos tus datos personales a través de distintos medios: formulario de nuestra sitio corporativo, formularios de landings asociados a campañas puntuales, solicitudes a nuestro call center y bases de datos formales como por ejemplo: bases del servicio de impuestos internos o la base del libro rojo de empresas chilenas. Recuerda que recopilamos y almacenamos tus datos personales únicamente para los fines establecidos en esta política, y siempre puedes solicitar más información o ejercer tus derechos sobre el tratamiento de tus datos.
            </p>
          </section>

          {/* 5 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              5- Derechos de los titulares de los datos
            </h2>
            <p>
              Tienes derecho a ejercer en cualquier momento tus Derechos ARCO (Acceso, Rectificación, Cancelación o Supresión y, Oposición) de acuerdo con la legislación chilena:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-slate-900 dark:text-white">Acceso:</strong> Derecho a solicitar información sobre los datos personales que tenemos sobre ti.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Rectificación:</strong> Derecho a corregir cualquier dato personal incorrecto o incompleto.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Cancelación:</strong> Derecho a solicitar la eliminación de tus datos personales, en los casos permitidos por la ley.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Oposición:</strong> Derecho a oponerte al tratamiento de tus datos personales bajo ciertos supuestos establecidos por la ley. Para ejercer cualquiera de estos derechos, puedes ponerte en contacto con nosotros a través de nuestro correo electrónico{" "}
                <a
                  href="mailto:hola@ofimundo.cl"
                  className="text-pink-600 dark:text-pink-400 font-semibold hover:underline"
                >
                  hola@ofimundo.cl
                </a>{" "}
                o por medio de nuestro canal de atención telefónica: (2) 2810 4700
              </li>
            </ul>
          </section>

          {/* 6 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              6- Compartición de información:
            </h2>
            <p>
              Ofimundo no vende ni alquila tus datos personales. Sin embargo, podemos compartirlos con terceros en los siguientes casos:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Proveedores y colaboradores que nos ayuden a ofrecer nuestros servicios, como empresas de logística o plataformas de pago.</li>
              <li>Para cumplir con obligaciones legales o en caso de ser requerido por una autoridad competente.</li>
            </ul>
          </section>

          {/* 7 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              7- Medidas de seguridad:
            </h2>
            <p>
              Implementamos medidas técnicas y organizativas adecuadas para proteger tus datos personales de accesos no autorizados, alteraciones, divulgación o destrucción. Nos esforzamos continuamente en mantener actualizadas nuestras medidas de seguridad conforme a las mejores prácticas del sector. Si bien no es posible asegurar completamente la protección de datos en entornos digitales, los sistemas de seguridad de Ofimundo están diseñados para minimizar riesgos y prevenir accesos no autorizados o amenazas externas.
            </p>
          </section>

          {/* 8 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              8- Uso de cookies:
            </h2>
            <p>
              Para mejorar tu experiencia en nuestro sitio corporativo, utilizamos cookies. Estas son pequeñas piezas de información almacenadas en tu dispositivo que nos permiten ofrecerte contenido personalizado y analizar el tráfico del sitio. Puedes gestionar las preferencias de cookies a través de la configuración de tu navegador.
            </p>
          </section>

          {/* 9 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              9- Cambios a la política de privacidad:
            </h2>
            <p>
              Podemos actualizar esta Política de privacidad en cualquier momento. Cualquier cambio será notificado a través de nuestro sitio corporativo o mediante otros medios de comunicación apropiados. Te recomendamos revisar esta política periódicamente.
            </p>
          </section>

          {/* 10 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              10- Contacto:
            </h2>
            <p>
              Si tienes alguna pregunta o inquietud sobre esta Política de Privacidad, o si deseas ejercer cualquiera de tus derechos en relación con tus datos personales, por favor contáctanos a:
            </p>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>
                Correo electrónico:{" "}
                <a
                  href="mailto:hola@ofimundo.cl"
                  className="text-pink-600 dark:text-pink-400 font-semibold hover:underline"
                >
                  hola@ofimundo.cl
                </a>
              </li>
              <li>Teléfono: (2) 2810 4700</li>
              <li>Dirección: Lota 2305, Providencia, Santiago.</li>
            </ul>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  )
}

