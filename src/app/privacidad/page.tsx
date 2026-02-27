import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad",
};

export default function PrivacidadPage() {
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
          Política de Privacidad
        </h1>
        <p className="text-white/40 text-sm mb-12">
          Última actualización: 27 de febrero de 2026
        </p>

        <div className="space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              1. Información que recopilamos
            </h2>
            <p>
              Al utilizar Godínez.AI, podemos recopilar la siguiente
              información:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong className="text-white/90">Datos de registro:</strong>{" "}
                nombre, correo electrónico, empresa, industria
              </li>
              <li>
                <strong className="text-white/90">Datos de uso:</strong>{" "}
                conversaciones con tu agente, proyectos, tareas y archivos
                creados
              </li>
              <li>
                <strong className="text-white/90">Datos técnicos:</strong>{" "}
                dirección IP, tipo de navegador, sistema operativo (recopilados
                automáticamente)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. Cómo utilizamos tu información
            </h2>
            <p>Utilizamos tu información para:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Proporcionar y mejorar el Servicio</li>
              <li>
                Personalizar tu experiencia con tu agente de IA
              </li>
              <li>Comunicarnos contigo sobre actualizaciones del Servicio</li>
              <li>Analizar el uso del Servicio de forma agregada y anónima</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. Almacenamiento y seguridad
            </h2>
            <p>
              Tus datos se almacenan en servidores seguros. Las conversaciones y
              datos de tu agente se mantienen en un entorno aislado por
              workspace. Utilizamos cifrado en tránsito (HTTPS/TLS) para todas
              las comunicaciones.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Compartición de datos
            </h2>
            <p>
              <strong className="text-white/90">
                No vendemos tu información personal.
              </strong>{" "}
              No compartimos tus datos con terceros, excepto:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                Proveedores de infraestructura necesarios para operar el
                Servicio (hosting, base de datos)
              </li>
              <li>Cuando sea requerido por ley o proceso legal</li>
              <li>Con tu consentimiento explícito</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Modelos de IA y tus datos
            </h2>
            <p>
              Tus conversaciones y datos{" "}
              <strong className="text-white/90">
                no se utilizan para entrenar modelos de IA
              </strong>
              . Tu agente opera en un entorno privado y aislado. Los modelos de
              lenguaje utilizados son proporcionados por terceros (OpenClaw) bajo
              acuerdos de privacidad.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              6. Tus derechos
            </h2>
            <p>Tienes derecho a:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Acceder a tus datos personales</li>
              <li>Solicitar la corrección de datos inexactos</li>
              <li>Solicitar la eliminación de tu cuenta y datos</li>
              <li>Exportar tus datos en un formato estándar</li>
            </ul>
            <p className="mt-2">
              Para ejercer estos derechos, contáctanos en{" "}
              <a
                href="mailto:hola@godinez.ai"
                className="text-magenta hover:underline"
              >
                hola@godinez.ai
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              7. Cookies
            </h2>
            <p>
              Utilizamos cookies mínimas necesarias para el funcionamiento del
              Servicio (autenticación, preferencia de idioma). No utilizamos
              cookies de seguimiento de terceros ni publicidad.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              8. Retención de datos
            </h2>
            <p>
              Conservamos tus datos mientras tu cuenta esté activa. Si solicitas
              la eliminación de tu cuenta, eliminaremos tus datos en un plazo de
              30 días, excepto cuando la ley requiera su conservación.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              9. Cambios a esta política
            </h2>
            <p>
              Podemos actualizar esta política periódicamente. Te notificaremos
              de cambios significativos por correo electrónico o mediante un
              aviso en el Servicio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              10. Contacto
            </h2>
            <p>
              Para preguntas sobre privacidad, contáctanos en{" "}
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
