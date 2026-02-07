import { content } from "@/lib/content";
import AnimatedSection from "./AnimatedSection";

export default function WhatIsSection() {
  return (
    <AnimatedSection id="que-es" className="relative py-20 sm:py-28 bg-cream overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream-dark/50 to-cream" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-medium text-black mb-6">
            {content.whatIs.headline}
          </h2>
          <p className="text-lg sm:text-xl text-charcoal-light max-w-3xl mx-auto leading-relaxed">
            {content.whatIs.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {content.whatIs.cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 border border-black/5"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-magenta to-violet rounded-2xl flex items-center justify-center text-3xl mb-6">
                {card.emoji}
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">
                {card.title}
              </h3>
              <p className="text-charcoal-light leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-charcoal-light/60">
          <a
            href={content.whatIs.poweredByUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-magenta transition-colors"
          >
            {content.whatIs.poweredBy}
          </a>
        </p>
      </div>
    </AnimatedSection>
  );
}
