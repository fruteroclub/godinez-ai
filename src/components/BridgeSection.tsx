import AnimatedSection from "./AnimatedSection";

export default function BridgeSection() {
  return (
    <AnimatedSection className="relative py-20 sm:py-28 bg-dark overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main statement */}
        <p className="text-2xl sm:text-3xl md:text-4xl font-medium text-white leading-relaxed mb-4">
          Imagina hacer más, sin escalar tu esfuerzo y estrés.
        </p>

        {/* Emphasis line */}
        <p className="text-xl sm:text-2xl text-white/70 mb-8">
          Recupera{" "}
          <span className="text-gold font-[family-name:var(--font-playfair)] italic font-semibold">
            lo que más importa
          </span>
          .
        </p>

        {/* Good news */}
        <p className="text-base sm:text-lg text-white/50">
          La buena noticia: listo en minutos, sin código, con las{" "}
          <span className="text-magenta">Skills IA</span> más avanzadas.
        </p>
      </div>
    </AnimatedSection>
  );
}
