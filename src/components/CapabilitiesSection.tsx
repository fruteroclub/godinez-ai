"use client";

import { useContent } from "@/lib/i18n";
import AnimatedSection from "./AnimatedSection";

// SVG icons for each capability
const capabilityIcons = [
  // 💬 Atención al cliente
  () => (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6" aria-hidden="true">
      <path
        d="M6 10C6 7.79 7.79 6 10 6H30C32.21 6 34 7.79 34 10V22C34 24.21 32.21 26 30 26H14L8 32V26C6.9 26 6 25.1 6 24V10Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="14" cy="16" r="1.5" fill="currentColor" />
      <circle cx="20" cy="16" r="1.5" fill="currentColor" />
      <circle cx="26" cy="16" r="1.5" fill="currentColor" />
    </svg>
  ),
  // 📅 Gestión de agenda
  () => (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6" aria-hidden="true">
      <rect
        x="6"
        y="10"
        width="28"
        height="24"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M6 16H34" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 6V12M28 6V12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="11" y="21" width="4" height="4" rx="1" fill="currentColor" />
      <rect
        x="18"
        y="21"
        width="4"
        height="4"
        rx="1"
        fill="currentColor"
        opacity="0.5"
      />
      <rect
        x="25"
        y="21"
        width="4"
        height="4"
        rx="1"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  ),
  // 📝 Creación de contenido
  () => (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6" aria-hidden="true">
      <path
        d="M8 8H26L32 14V32C32 33.1 31.1 34 30 34H8C6.9 34 6 33.1 6 32V10C6 8.9 6.9 8 8 8Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M26 8V14H32" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 20H28M12 26H22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  // 📊 Reportes y análisis
  () => (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6" aria-hidden="true">
      <rect
        x="8"
        y="24"
        width="5"
        height="10"
        rx="1"
        fill="currentColor"
        opacity="0.5"
      />
      <rect
        x="17"
        y="18"
        width="5"
        height="16"
        rx="1"
        fill="currentColor"
        opacity="0.7"
      />
      <rect x="26" y="10" width="5" height="24" rx="1" fill="currentColor" />
      <path
        d="M6 8L14 16L23 12L34 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 2"
        opacity="0.6"
      />
    </svg>
  ),
  // 🧾 Facturación
  () => (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6" aria-hidden="true">
      <path
        d="M10 6H30V34L26 31L22 34L18 31L14 34L10 31V6Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M14 14H26M14 20H22M14 26H18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="24"
        cy="23"
        r="5"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M24 21V25M22.5 22.5H25.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  // 🔍 Investigación de mercado
  () => (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6" aria-hidden="true">
      <circle cx="18" cy="18" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M26 26L34 34"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 18H22M18 14V22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  ),
  // 📣 Marketing digital
  () => (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6" aria-hidden="true">
      <path
        d="M8 16V24C8 25.1 8.9 26 10 26H14L24 34V6L14 14H10C8.9 14 8 14.9 8 16Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M28 14C30.21 14 32 17.13 32 21C32 24.87 30.21 28 28 28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M28 18C29.1 18 30 19.34 30 21C30 22.66 29.1 24 28 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  ),
  // 🤝 CRM y seguimiento
  () => (
    <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6" aria-hidden="true">
      <circle cx="14" cy="14" r="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="26" cy="14" r="6" stroke="currentColor" strokeWidth="2" />
      <path
        d="M6 32C6 27.58 9.58 24 14 24C16.4 24 18.56 25.06 20 26.74C21.44 25.06 23.6 24 26 24C30.42 24 34 27.58 34 32"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
];

export default function CapabilitiesSection() {
  const content = useContent();
  return (
    <AnimatedSection
      id="capacidades"
      className="relative pt-24 pb-12 lg:pb-16 bg-dark overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] rounded-full bg-violet/3 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-medium text-center text-white mb-16">
          {content.capabilities.headlinePre}
          <span className="text-magenta font-[family-name:var(--font-playfair)] italic font-black">
            {content.capabilities.headlineAccent}
          </span>
          {content.capabilities.headlineSuffix}
        </h2>

        {/* Capabilities grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {content.capabilities.items.map((item, index) => {
            const IconComponent = capabilityIcons[index];
            return (
              <div
                key={index}
                className="group relative bg-[#111111] rounded-2xl p-5 sm:p-6 border border-white/5 hover:border-magenta/30 transition-all duration-300 text-center"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-magenta/10 to-violet/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Icon */}
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 rounded-xl bg-charcoal border border-white/10 flex items-center justify-center text-magenta group-hover:border-magenta/30 group-hover:bg-magenta/10 transition-all duration-300">
                  <IconComponent />
                </div>

                {/* Content */}
                <h3 className="relative font-semibold text-white text-sm sm:text-base mb-1">
                  {item.title}
                </h3>
                <p className="relative text-xs sm:text-sm text-white/40 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
