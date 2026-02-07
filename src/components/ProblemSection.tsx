import { content } from "@/lib/content";
import AnimatedSection from "./AnimatedSection";

export default function ProblemSection() {
  return (
    <AnimatedSection className="py-20 sm:py-28 bg-gray-soft">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl sm:text-4xl md:text-5xl font-semibold text-center text-charcoal mb-16">
          {content.problem.headline}{" "}
          <span className="font-[family-name:var(--font-playfair)] italic text-purple bg-yellow-light px-2 rounded-lg">
            {content.problem.headlineAccent}
          </span>
          {content.problem.headlineSuffix}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.problem.cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-purple/5"
            >
              <div className="w-16 h-16 bg-purple/10 rounded-2xl flex items-center justify-center text-3xl mb-6">
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
      </div>
    </AnimatedSection>
  );
}
