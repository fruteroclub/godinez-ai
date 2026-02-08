import { content } from "@/lib/content";
import AnimatedSection from "./AnimatedSection";

// Icon: Chat/Available
function AvailableIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
      aria-hidden="true"
    >
      {/* Chat bubble */}
      <path
        d="M8 12C8 9.79 9.79 8 12 8H36C38.21 8 40 9.79 40 12V28C40 30.21 38.21 32 36 32H18L10 40V32H12C9.79 32 8 30.21 8 28V12Z"
        fill="#8B5CF6"
        opacity="0.2"
      />
      <path
        d="M8 12C8 9.79 9.79 8 12 8H36C38.21 8 40 9.79 40 12V28C40 30.21 38.21 32 36 32H18L10 40V32H12C9.79 32 8 30.21 8 28V12Z"
        stroke="#8B5CF6"
        strokeWidth="2"
        fill="none"
      />
      {/* 24/7 dots */}
      <circle cx="18" cy="20" r="2" fill="#8B5CF6">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="24" cy="20" r="2" fill="#8B5CF6">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" begin="0.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="30" cy="20" r="2" fill="#8B5CF6">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" begin="0.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

// Icon: Brain/Memory
function MemoryIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
      aria-hidden="true"
    >
      {/* Brain outline */}
      <path
        d="M24 8C16 8 10 14 10 22C10 30 16 38 24 40C32 38 38 30 38 22C38 14 32 8 24 8Z"
        fill="#E91E8C"
        opacity="0.2"
      />
      <path
        d="M24 8C16 8 10 14 10 22C10 30 16 38 24 40C32 38 38 30 38 22C38 14 32 8 24 8Z"
        stroke="#E91E8C"
        strokeWidth="2"
        fill="none"
      />
      {/* Neural connections */}
      <circle cx="18" cy="18" r="2" fill="#E91E8C" />
      <circle cx="30" cy="18" r="2" fill="#E91E8C" />
      <circle cx="24" cy="26" r="2" fill="#E91E8C" />
      <path d="M18 18L24 26M30 18L24 26" stroke="#E91E8C" strokeWidth="1.5" opacity="0.6" />
      <circle cx="24" cy="34" r="1.5" fill="#E91E8C" opacity="0.5" />
      <path d="M24 26V34" stroke="#E91E8C" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

// Icon: Settings/Personalized
function PersonalizedIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
      aria-hidden="true"
    >
      {/* Palette shape */}
      <circle cx="24" cy="24" r="16" fill="#FFB800" opacity="0.2" stroke="#FFB800" strokeWidth="2" />
      {/* Color dots */}
      <circle cx="18" cy="18" r="3" fill="#E91E8C" />
      <circle cx="30" cy="18" r="3" fill="#8B5CF6" />
      <circle cx="24" cy="30" r="3" fill="#FFB800" />
      {/* Brush stroke */}
      <path
        d="M32 28L36 32"
        stroke="#FFB800"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const icons = [AvailableIcon, MemoryIcon, PersonalizedIcon];

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
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-6">
            ¿Qué es un{" "}
            <span className="text-violet font-[family-name:var(--font-playfair)] italic font-black">
              Godínez
            </span>
            ?
          </h2>
          <p className="text-lg sm:text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
            Un{" "}
            <span className="text-gold font-[family-name:var(--font-playfair)] italic font-semibold">
              Godínez
            </span>
            {" "}es un{" "}
            <span className="text-magenta font-[family-name:var(--font-playfair)] italic font-semibold">
              Agente IA
            </span>
            {" "}que hace el trabajo que te drena para que tú hagas el que te llena. Atiende clientes por WhatsApp, agenda citas, genera reportes, y responde emails. Todo en español, 24/7, personalizado.
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
