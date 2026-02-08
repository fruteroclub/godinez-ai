import { content } from "@/lib/content";
import AnimatedSection from "./AnimatedSection";

export default function ProblemSection() {
  return (
    <AnimatedSection className="relative py-24 sm:py-32 bg-dark overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-magenta/3 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-medium text-center mb-16 text-white">
          {content.problem.headline}
          <br />
          <span className="text-magenta font-[family-name:var(--font-playfair)] italic font-black">
            {content.problem.headlineAccent}
          </span>
        </h2>

        {/* Problems list - vertical layout with numbers */}
        <div className="space-y-6">
          {content.problem.items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-6 p-6 rounded-xl bg-charcoal/50 border border-white/5 hover:border-magenta/20 transition-colors"
            >
              {/* Number */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-magenta/10 border border-magenta/30 flex items-center justify-center">
                <span className="text-magenta font-bold">{index + 1}</span>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm sm:text-base">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
