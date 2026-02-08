import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import Image from "next/image";

export default function BridgeSection() {
  return (
    <AnimatedSection className="relative py-20 bg-dark overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main statement */}
        <p className="text-xl sm:text-2xl md:text-3xl text-white/75 leading-relaxed mb-4">
          Imagina hacer más, sin escalar tu esfuerzo y estrés.
        </p>
        {/* Emphasis line */}

        <p className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-medium text-center mb-8 text-white">
          Recupera lo que<br />
          <span className="text-gold font-[family-name:var(--font-playfair)] italic font-semibold">
            más importa
          </span>
        </p>

        {/* Good news */}

        <div className="flex items-center justify-center">
          <p className="text-2xl sm:text-3xl md:text-4xl text-white leading-relaxed mb-4">
            Con tu Godínez,<br />puedes hacerlo
          </p>
        </div>
        <div className="mb-8">
          <p className="text-base sm:text-lg text-white/75">
            Listo en minutos, sin código, con las{" "}
            <span className="text-magenta">Skills IA</span> más avanzadas
          </p>
        </div>
        <div>
          <a
            href="#lista-de-espera"
            className="inline-block bg-magenta hover:bg-magenta-dark text-white font-semibold px-8 py-4 rounded-full text-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-magenta/30 cursor-pointer"
          >
            Quiero el mío
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
