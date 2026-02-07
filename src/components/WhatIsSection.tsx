import { content } from "@/lib/content";
import AnimatedSection from "./AnimatedSection";
import { BlobPurpleLight } from "./BlobSVG";

export default function WhatIsSection() {
  return (
    <AnimatedSection id="que-es" className="relative py-20 sm:py-28 overflow-hidden">
      <BlobPurpleLight className="absolute -right-40 top-0 w-96 h-96 opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl md:text-5xl font-medium text-charcoal mb-6">
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
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-purple/5"
            >
              <div className="w-16 h-16 bg-yellow/20 rounded-2xl flex items-center justify-center text-3xl mb-6">
                {card.emoji}
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-3">
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
            className="hover:text-purple transition-colors"
          >
            {content.whatIs.poweredBy}
          </a>
        </p>
      </div>
    </AnimatedSection>
  );
}
