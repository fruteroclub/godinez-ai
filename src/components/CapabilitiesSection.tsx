import { content } from "@/lib/content";
import AnimatedSection from "./AnimatedSection";

export default function CapabilitiesSection() {
  return (
    <AnimatedSection id="capacidades" className="py-20 sm:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-medium text-center text-black mb-16">
          {content.capabilities.headline}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.capabilities.items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 border border-black/5 text-center group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-magenta/20 to-violet/20 group-hover:from-magenta group-hover:to-violet rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto transition-all">
                {item.emoji}
              </div>
              <h3 className="font-semibold text-black mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-charcoal-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
