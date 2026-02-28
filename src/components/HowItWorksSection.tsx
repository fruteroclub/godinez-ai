"use client";

import { useContent } from "@/lib/i18n";
import AnimatedSection from "./AnimatedSection";

export default function HowItWorksSection() {
  const content = useContent();
  return (
    <AnimatedSection
      id="como-funciona"
      className="relative py-24 bg-dark overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-gold/3 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-medium text-center text-white mb-16">
          {content.howItWorks.headlinePre}
          <span className="text-gold font-[family-name:var(--font-playfair)] italic font-black">
            {content.howItWorks.headlineAccent}
          </span>
          {content.howItWorks.headlineSuffix}
        </h2>

        {/* Steps */}
        <div className="space-y-8 sm:space-y-12">
          {content.howItWorks.steps.map((step, index) => (
            <div
              key={index}
              className="relative flex gap-6 sm:gap-8 items-start"
            >
              {/* Step number */}
              <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                <span className="text-gold font-[family-name:var(--font-playfair)] italic font-black text-xl sm:text-2xl">
                  {step.number}
                </span>
              </div>

              {/* Connector line */}
              {index < content.howItWorks.steps.length - 1 && (
                <div className="absolute left-7 sm:left-8 top-16 sm:top-18 w-px h-8 sm:h-12 bg-gradient-to-b from-gold/30 to-transparent" />
              )}

              {/* Content */}
              <div className="pt-1">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
