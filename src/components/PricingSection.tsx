import { content } from "@/lib/content";
import AnimatedSection from "./AnimatedSection";

export default function PricingSection() {
  return (
    <AnimatedSection id="planes" className="py-20 sm:py-28 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-medium mb-4">
            {content.pricing.headlinePrefix}
            <span className="font-[family-name:var(--font-playfair)] italic font-semibold text-gold">
              {content.pricing.headlineAccent}
            </span>
            {content.pricing.headlineSuffix}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {content.pricing.plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-charcoal rounded-2xl p-8 transition-all hover:-translate-y-1 border ${
                plan.popular
                  ? "border-magenta ring-2 ring-magenta/30 scale-[1.02]"
                  : "border-charcoal-light/30 hover:border-magenta/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-magenta text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-white/60 mb-4">
                  {plan.idealFor}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-magenta">
                    {plan.price}
                  </span>
                  <span className="text-sm text-white/60">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gold mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-white/80 text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <a
                  href="#lista-de-espera"
                  className={`block text-center py-3 px-6 rounded-full font-semibold transition-all ${
                    plan.popular
                      ? "bg-magenta text-white hover:bg-magenta-dark hover:shadow-lg hover:shadow-magenta/30"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Empezar
                </a>
              </div>

              <p className="text-center text-xs text-white/40 mt-4 italic">
                &ldquo;{plan.tagline}&rdquo;
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-white/40 mt-8">
          {content.pricing.note}
        </p>
      </div>
    </AnimatedSection>
  );
}
