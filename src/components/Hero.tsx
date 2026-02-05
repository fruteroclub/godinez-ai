import { content } from "@/lib/content";
import { BlobPurple, BlobYellow } from "./BlobSVG";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Decorative blobs */}
      <BlobPurple className="absolute -top-20 -right-20 w-80 h-80 opacity-20 animate-blob" />
      <BlobYellow className="absolute -bottom-20 -left-20 w-96 h-96 opacity-20 animate-blob-delayed" />
      <BlobPurple className="absolute top-1/3 left-10 w-40 h-40 opacity-10 animate-blob-delayed" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Fun emoji composition */}
        <div className="text-6xl sm:text-7xl mb-8">
          🤖💼
        </div>

        <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal leading-tight mb-6">
          {content.hero.headline.split("nunca falta")[0]}
          <span className="text-purple italic">nunca falta</span>
          {" al trabajo"}
        </h1>

        <p className="text-lg sm:text-xl text-charcoal-light max-w-2xl mx-auto mb-10 leading-relaxed">
          {content.hero.subtitle}
        </p>

        <a
          href="#lista-de-espera"
          className="inline-block bg-purple hover:bg-purple-dark text-white font-semibold px-8 py-4 rounded-full text-lg transition-all hover:shadow-lg hover:shadow-purple/30 hover:-translate-y-0.5"
        >
          {content.hero.cta} →
        </a>

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce">
          <svg
            className="w-6 h-6 mx-auto text-purple/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
