import { content } from "@/lib/content";
import AnimatedSection from "./AnimatedSection";

export default function PricingSection() {
  return (
    <AnimatedSection id="planes" className="py-20 sm:py-28 bg-gray-soft">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal mb-4">
            {content.pricing.headline}
          </h2>
          <p className="text-lg sm:text-xl text-charcoal-light">
            {content.pricing.headlinePrefix}
            <span className="italic text-purple bg-yellow-light px-2 rounded-lg font-semibold">
              {content.pricing.headlineAccent}
            </span>
            {content.pricing.headlineSuffix}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {content.pricing.plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border ${
                plan.popular
                  ? "border-purple ring-2 ring-purple/20 scale-[1.02]"
                  : "border-purple/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-purple text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-charcoal mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-charcoal-light mb-4">
                  {plan.idealFor}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-purple">
                    {plan.price}
                  </span>
                  <span className="text-sm text-charcoal-light">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-yellow mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-charcoal-light text-sm">
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
                      ? "bg-purple text-white hover:bg-purple-dark hover:shadow-lg hover:shadow-purple/30"
                      : "bg-purple/10 text-purple hover:bg-purple/20"
                  }`}
                >
                  Empezar
                </a>
              </div>

              <p className="text-center text-xs text-charcoal-light/60 mt-4 italic">
                &ldquo;{plan.tagline}&rdquo;
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-charcoal-light/60 mt-8">
          {content.pricing.note}
        </p>
      </div>
    </AnimatedSection>
  );
}
