import { content } from "@/lib/content";
import AnimatedSection from "./AnimatedSection";

// Icons for each problem
const problemIcons = [
  // Contratar es caro - Money/wallet icon
  <svg key="money" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
  </svg>,
  // Tu equipo duerme - Moon/sleep icon
  <svg key="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>,
  // 5 suscripciones - Grid/apps icon
  <svg key="apps" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>,
];

export default function ProblemSection() {
  return (
    <AnimatedSection className="relative py-24 bg-dark overflow-hidden">
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

        {/* Problems list - vertical layout with icons */}
        <div className="space-y-6">
          {content.problem.items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-6 p-6 rounded-xl bg-charcoal/50 border border-white/5 hover:border-magenta/20 transition-colors"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-magenta/10 border border-magenta/30 flex items-center justify-center text-magenta">
                {problemIcons[index]}
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
