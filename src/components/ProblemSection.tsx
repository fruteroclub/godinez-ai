import { content } from "@/lib/content";
import AnimatedSection from "./AnimatedSection";

// Custom SVG icons matching the problem cards
function MoneyIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
      aria-hidden="true"
    >
      {/* Stack of coins */}
      <ellipse cx="24" cy="36" rx="14" ry="4" fill="#FFB800" opacity="0.3" />
      <ellipse cx="24" cy="32" rx="14" ry="4" fill="#FFB800" opacity="0.5" />
      <ellipse cx="24" cy="28" rx="14" ry="4" fill="#FFB800" opacity="0.7" />
      <ellipse cx="24" cy="24" rx="14" ry="4" fill="#FFB800" />
      {/* Dollar sign */}
      <path
        d="M24 18V30M20 21.5C20 20.12 21.79 19 24 19C26.21 19 28 20.12 28 21.5C28 22.88 26.21 24 24 24C21.79 24 20 25.12 20 26.5C20 27.88 21.79 29 24 29C26.21 29 28 27.88 28 26.5"
        stroke="#0A0A0A"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonClockIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
      aria-hidden="true"
    >
      {/* Moon */}
      <path
        d="M34 14C34 21.18 28.18 27 21 27C18.55 27 16.26 26.35 14.31 25.21C16.23 30.56 21.38 34.4 27.5 34.4C35.23 34.4 41.5 28.13 41.5 20.4C41.5 14.28 37.66 9.13 32.31 7.21C33.45 9.16 34 11.45 34 14Z"
        fill="#8B5CF6"
        opacity="0.8"
      />
      {/* Clock */}
      <circle cx="16" cy="28" r="10" stroke="#E91E8C" strokeWidth="2" fill="#0A0A0A" />
      <path
        d="M16 22V28L20 30"
        stroke="#E91E8C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Z's for sleep */}
      <text x="28" y="16" fill="#8B5CF6" fontSize="8" fontWeight="bold" opacity="0.6">
        z
      </text>
      <text x="32" y="12" fill="#8B5CF6" fontSize="10" fontWeight="bold" opacity="0.8">
        z
      </text>
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
      aria-hidden="true"
    >
      {/* Clipboard */}
      <rect x="10" y="8" width="28" height="34" rx="4" fill="#1A1A1A" stroke="#8B5CF6" strokeWidth="2" />
      <rect x="16" y="4" width="16" height="8" rx="2" fill="#8B5CF6" />
      {/* Checkmarks */}
      <path d="M16 20L19 23L24 18" stroke="#E91E8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="28" y="18" width="6" height="2" rx="1" fill="#E91E8C" opacity="0.5" />
      <path d="M16 28L19 31L24 26" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="28" y="26" width="6" height="2" rx="1" fill="#FFB800" opacity="0.5" />
      {/* Pending item */}
      <circle cx="20" cy="36" r="3" stroke="#8B5CF6" strokeWidth="2" opacity="0.5" />
      <rect x="28" y="34" width="6" height="2" rx="1" fill="#8B5CF6" opacity="0.3" />
    </svg>
  );
}

const icons = [MoneyIcon, MoonClockIcon, ChecklistIcon];

export default function ProblemSection() {
  return (
    <AnimatedSection className="relative py-24 sm:py-32 bg-dark overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-magenta/3 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-medium text-center mb-16 text-white">
          {content.problem.headline}{" "}
          <span className="text-magenta font-[family-name:var(--font-playfair)] italic font-black">
            {content.problem.headlineAccent}
          </span>
          <span className="text-white/60">{content.problem.headlineSuffix}</span>
        </h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {content.problem.cards.map((card, index) => {
            const IconComponent = icons[index];
            return (
              <div
                key={index}
                className="group relative bg-[#111111] rounded-2xl p-8 border border-white/5 hover:border-magenta/30 transition-all duration-300"
              >
                {/* Gradient border glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-magenta/10 via-transparent to-violet/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {/* Icon container */}
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-magenta/20 to-violet/20 flex items-center justify-center mb-6 group-hover:animate-pulse-glow">
                  <IconComponent />
                </div>

                {/* Content */}
                <h3 className="relative text-xl font-semibold text-white mb-3">
                  {card.title}
                </h3>
                <p className="relative text-white/50 leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
