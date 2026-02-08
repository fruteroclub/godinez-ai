import { content } from "@/lib/content";
import AnimatedSection from "./AnimatedSection";

// Custom check icon
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="8" fill="currentColor" opacity="0.2" />
      <path
        d="M6 10L9 13L14 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PricingSection() {
  return (
    <AnimatedSection id="planes" className="relative py-24 sm:py-32 bg-dark overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-magenta/3 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-4">
            {content.pricing.headlinePrefix}
            <span className="text-magenta font-[family-name:var(--font-playfair)] italic font-black">
              {content.pricing.headlineAccent}
            </span>
            {content.pricing.headlineSuffix}
          </h2>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {content.pricing.plans.map((plan, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl transition-all duration-300 ${
                plan.popular ? "md:-mt-4 md:mb-4" : ""
              }`}
            >
              {/* Gradient border wrapper for popular */}
              {plan.popular && (
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-magenta via-violet to-gold opacity-75 blur-sm group-hover:opacity-100 transition-opacity" />
              )}

              {/* Card content */}
              <div
                className={`relative h-full bg-[#111111] rounded-2xl p-8 border transition-all duration-300 ${
                  plan.popular
                    ? "border-transparent"
                    : "border-white/5 hover:border-white/10"
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-magenta to-violet text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-magenta/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Popular
                    </span>
                  </div>
                )}

                {/* Plan header */}
                <div className="text-center mb-8 pt-2">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-white/40 mb-6">
                    {plan.idealFor}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl sm:text-5xl font-bold text-magenta">
                      {plan.price}
                    </span>
                    <span className="text-sm text-white/40">
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-white/60 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-auto">
                  <a
                    href="#lista-de-espera"
                    className={`block text-center py-3.5 px-6 rounded-full font-semibold transition-all duration-300 ${
                      plan.popular
                        ? "bg-magenta text-white hover:bg-magenta-dark hover:shadow-lg hover:shadow-magenta/30 hover:-translate-y-0.5"
                        : "bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border border-white/10"
                    }`}
                  >
                    Empezar
                  </a>
                </div>

                {/* Tagline */}
                <p className="text-center text-xs text-white/30 mt-6 font-[family-name:var(--font-playfair)] italic">
                  &ldquo;{plan.tagline}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-sm text-white/30 mt-12">
          {content.pricing.note}
        </p>
      </div>
    </AnimatedSection>
  );
}
