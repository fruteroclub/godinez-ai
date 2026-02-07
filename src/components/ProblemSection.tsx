import { content } from "@/lib/content";
import AnimatedSection from "./AnimatedSection";

export default function ProblemSection() {
  return (
    <AnimatedSection className="py-20 sm:py-28 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-medium text-center mb-16">
          {content.problem.headline}{" "}
          <span className="font-[family-name:var(--font-playfair)] italic font-semibold text-magenta">
            {content.problem.headlineAccent}
          </span>
          {content.problem.headlineSuffix}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.problem.cards.map((card, index) => (
            <div
              key={index}
              className="bg-charcoal rounded-2xl p-8 border border-charcoal-light/30 hover:border-magenta/50 transition-all"
            >
              <div className="w-16 h-16 bg-magenta/20 rounded-2xl flex items-center justify-center text-3xl mb-6">
                {card.emoji}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {card.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
