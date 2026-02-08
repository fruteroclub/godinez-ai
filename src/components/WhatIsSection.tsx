import { content } from "@/lib/content";
import AnimatedSection from "./AnimatedSection";

// Custom SVG icons for WhatIs cards
function ChatIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
      aria-hidden="true"
    >
      {/* Main chat bubble */}
      <path
        d="M8 12C8 9.79 9.79 8 12 8H36C38.21 8 40 9.79 40 12V28C40 30.21 38.21 32 36 32H18L10 40V32H12C9.79 32 8 30.21 8 28V12Z"
        fill="#E91E8C"
        opacity="0.2"
      />
      <path
        d="M8 12C8 9.79 9.79 8 12 8H36C38.21 8 40 9.79 40 12V28C40 30.21 38.21 32 36 32H18L10 40V32H12C9.79 32 8 30.21 8 28V12Z"
        stroke="#E91E8C"
        strokeWidth="2"
        fill="none"
      />
      {/* Chat dots */}
      <circle cx="18" cy="20" r="2" fill="#E91E8C">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="24" cy="20" r="2" fill="#8B5CF6">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" begin="0.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="30" cy="20" r="2" fill="#FFB800">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" begin="0.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
      aria-hidden="true"
    >
      {/* Chart background */}
      <rect x="6" y="6" width="36" height="36" rx="4" fill="#8B5CF6" opacity="0.2" />
      {/* Bars */}
      <rect x="12" y="28" width="6" height="10" rx="1" fill="#E91E8C" />
      <rect x="21" y="20" width="6" height="18" rx="1" fill="#8B5CF6" />
      <rect x="30" y="14" width="6" height="24" rx="1" fill="#FFB800" />
      {/* Trend line */}
      <path
        d="M10 30L18 24L27 18L38 10"
        stroke="#E91E8C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 2"
        opacity="0.6"
      />
    </svg>
  );
}

function AutomationIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
      aria-hidden="true"
    >
      {/* Circular arrows */}
      <circle cx="24" cy="24" r="16" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="6 4" opacity="0.3" />
      <path
        d="M24 8C32.84 8 40 15.16 40 24"
        stroke="#8B5CF6"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M40 24L36 20M40 24L36 28"
        stroke="#8B5CF6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 40C15.16 40 8 32.84 8 24"
        stroke="#E91E8C"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M8 24L12 28M8 24L12 20"
        stroke="#E91E8C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center gear */}
      <circle cx="24" cy="24" r="6" fill="#FFB800" />
      <circle cx="24" cy="24" r="3" fill="#0A0A0A" />
    </svg>
  );
}

const icons = [ChatIcon, ChartIcon, AutomationIcon];

export default function WhatIsSection() {
  return (
    <AnimatedSection id="que-es" className="relative py-24 sm:py-32 bg-dark overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet/5 blur-[120px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-6">
            ¿Qué es un{" "}
            <span className="text-violet font-[family-name:var(--font-playfair)] italic font-black">
              Godínez
            </span>
            ?
          </h2>
          <p className="text-lg sm:text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
            {content.whatIs.description}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {content.whatIs.cards.map((card, index) => {
            const IconComponent = icons[index];
            return (
              <div
                key={index}
                className="group relative bg-[#111111] rounded-2xl p-8 border border-white/5 hover:border-violet/30 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-magenta/20 via-transparent to-violet/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10" />

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-charcoal border border-white/10 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:border-magenta/30 transition-all duration-300">
                  <IconComponent />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-white/50 leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Powered by */}
        <p className="text-center">
          <a
            href={content.whatIs.poweredByUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-magenta transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-magenta animate-pulse" />
            {content.whatIs.poweredBy}
          </a>
        </p>
      </div>
    </AnimatedSection>
  );
}
