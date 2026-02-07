import { content } from "@/lib/content";
import AnimatedSection from "./AnimatedSection";

export default function CapabilitiesSection() {
  return (
    <AnimatedSection id="capacidades" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-charcoal mb-16">
          {content.capabilities.headline}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.capabilities.items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-purple/5 text-center"
            >
              <div className="w-14 h-14 bg-purple/10 rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto">
                {item.emoji}
              </div>
              <h3 className="font-semibold text-charcoal mb-2">
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
