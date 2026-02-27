import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos de Servicio",
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-magenta transition-colors text-sm mb-12"
        >
          &larr; Volver a Godínez.AI
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Términos de Servicio
        </h1>
        <p className="text-white/40 text-sm mb-12">
          Última actualización: 27 de febrero de 2026
        </p>

        <div className="space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              1. Aceptación de los términos
            </h2>
            <p>
              Al acceder y utilizar Godínez.AI (&ldquo;el Servicio&rdquo;),
              proporcionado por Pulpa Labs / Frutero Club
              (&ldquo;nosotros&rdquo;), aceptas estos términos de servicio. Si
              no estás de acuerdo, no utilices el Servicio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. Descripción del servicio
            </h2>
            <p>
              Godínez.AI es una plataforma de agentes de inteligencia artificial
              actualmente en fase beta. El Servicio permite a los usuarios
              interactuar con asistentes de IA para automatizar tareas,
              gestionar proyectos y comunicarse a través de múltiples canales.
            </p>
            <p className="mt-2 text-gold/80 text-sm">
              Nota: Este servicio se encuentra en beta. Las funcionalidades,
              disponibilidad y rendimiento pueden cambiar sin previo aviso.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. Uso aceptable
            </h2>
            <p>Te comprometes a:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Proporcionar información veraz al registrarte</li>
              <li>No utilizar el Servicio para actividades ilegales</li>
              <li>
                No intentar acceder a cuentas o datos de otros usuarios
              </li>
              <li>No abusar, sobrecargar o interferir con el Servicio</li>
              <li>
                No utilizar el Servicio para generar contenido dañino,
                discriminatorio o que infrinja derechos de terceros
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Propiedad intelectual
            </h2>
            <p>
              El contenido que crees utilizando el Servicio te pertenece. Sin
              embargo, nos reservamos el derecho de utilizar datos anonimizados
              y agregados para mejorar el Servicio. La plataforma, su código,
              diseño y marca son propiedad de Pulpa Labs / Frutero Club.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Limitación de responsabilidad
            </h2>
            <p>
              El Servicio se proporciona &ldquo;tal cual&rdquo; y &ldquo;según
              disponibilidad&rdquo;, sin garantías de ningún tipo. Durante la
              fase beta:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                No garantizamos disponibilidad continua ni libre de errores
              </li>
              <li>Los datos pueden perderse durante actualizaciones</li>
              <li>
                Las respuestas generadas por IA pueden contener errores o
                inexactitudes
              </li>
              <li>
                No somos responsables por decisiones tomadas basadas en las
                respuestas del agente
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              6. Pagos y facturación
            </h2>
            <p>
              Los precios publicados están sujetos a cambios. Durante la fase
              beta, se aplicarán los precios de lanzamiento indicados en la
              página principal. Todos los precios están en pesos mexicanos (MXN)
              e incluyen IVA.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              7. Terminación
            </h2>
            <p>
              Nos reservamos el derecho de suspender o terminar tu acceso al
              Servicio en cualquier momento, con o sin causa, con o sin aviso
              previo. Tú puedes dejar de utilizar el Servicio en cualquier
              momento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              8. Cambios a estos términos
            </h2>
            <p>
              Podemos modificar estos términos en cualquier momento. Los cambios
              entrarán en vigor al publicarse en esta página. El uso continuado
              del Servicio constituye aceptación de los términos modificados.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              9. Contacto
            </h2>
            <p>
              Para preguntas sobre estos términos, contáctanos en{" "}
              <a
                href="mailto:hola@godinez.ai"
                className="text-magenta hover:underline"
              >
                hola@godinez.ai
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
