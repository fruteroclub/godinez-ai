"use client";

import { useContent } from "@/lib/i18n";
import AnimatedSection from "./AnimatedSection";

export default function BridgeSection() {
  const content = useContent();
  return (
    <AnimatedSection className="relative pt-8 pb-16 bg-dark overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main statement */}
        <p className="text-xl sm:text-2xl md:text-3xl text-white/75 leading-relaxed mb-4">
          {content.bridge.line1}
        </p>
        {/* Emphasis line */}

        <p className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-medium text-center mb-8 text-white">
          {content.bridge.headline}
          <br />
          <span className="text-gold font-[family-name:var(--font-playfair)] italic font-semibold">
            {content.bridge.headlineAccent}
          </span>
        </p>

        {/* Good news */}

        <div className="flex items-center justify-center">
          <p className="text-2xl sm:text-3xl md:text-4xl text-white leading-relaxed mb-4">
            {content.bridge.line2}
            <br />
            {content.bridge.line3}
          </p>
        </div>
        <div className="mb-8">
          <p className="text-base sm:text-lg text-white/75">
            {content.bridge.subtext}{" "}
            <span className="text-magenta">{content.bridge.subtextAccent}</span>
            {content.bridge.subtextSuffix
              ? ` ${content.bridge.subtextSuffix}`
              : ""}
          </p>
        </div>
        <div>
          <a
            href={content.bridge.ctaHref}
            className="inline-block bg-magenta hover:bg-magenta-dark text-white font-semibold px-12 py-4 rounded-full text-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-magenta/30 cursor-pointer"
          >
            {content.bridge.cta}
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
