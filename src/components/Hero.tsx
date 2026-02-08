import { content } from "@/lib/content";

function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-md mx-auto animate-float"
      aria-hidden="true"
    >
      {/* Main body — rounded bot silhouette */}
      <rect x="120" y="80" width="160" height="160" rx="32" fill="#1A1A1A" stroke="#8B5CF6" strokeWidth="2" />

      {/* Screen / face area */}
      <rect x="144" y="104" width="112" height="72" rx="12" fill="#0A0A0A" />

      {/* Eyes — gradient glow */}
      <circle cx="176" cy="140" r="10" fill="#E91E8C">
        <animate attributeName="opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="224" cy="140" r="10" fill="#8B5CF6">
        <animate attributeName="opacity" values="1;0.5;1" dur="3s" begin="0.5s" repeatCount="indefinite" />
      </circle>

      {/* Mouth — small smile */}
      <path d="M184 160 Q200 172 216 160" stroke="#FFB800" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Antenna */}
      <line x1="200" y1="80" x2="200" y2="52" stroke="#8B5CF6" strokeWidth="2" />
      <circle cx="200" cy="46" r="6" fill="#E91E8C">
        <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Arms */}
      <rect x="84" y="120" width="36" height="12" rx="6" fill="#1A1A1A" stroke="#E91E8C" strokeWidth="1.5" />
      <rect x="280" y="120" width="36" height="12" rx="6" fill="#1A1A1A" stroke="#E91E8C" strokeWidth="1.5" />

      {/* Briefcase in right hand */}
      <rect x="296" y="108" width="28" height="22" rx="4" fill="#FFB800" />
      <path d="M304 108 V102 Q304 98 308 98 H314 Q318 98 318 102 V108" stroke="#0A0A0A" strokeWidth="2" fill="none" />

      {/* Floating data particles */}
      <circle cx="80" cy="200" r="3" fill="#E91E8C" opacity="0.6">
        <animate attributeName="cy" values="200;180;200" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="320" cy="100" r="2.5" fill="#8B5CF6" opacity="0.5">
        <animate attributeName="cy" values="100;80;100" dur="3.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="340" cy="220" r="2" fill="#FFB800" opacity="0.5">
        <animate attributeName="cy" values="220;200;220" dur="5s" repeatCount="indefinite" />
      </circle>
      <circle cx="60" cy="120" r="2" fill="#FFB800" opacity="0.4">
        <animate attributeName="cy" values="120;100;120" dur="4.5s" repeatCount="indefinite" />
      </circle>

      {/* Base / feet */}
      <rect x="152" y="240" width="96" height="16" rx="8" fill="#1A1A1A" stroke="#3A3A3A" strokeWidth="1.5" />

      {/* Shadow */}
      <ellipse cx="200" cy="276" rx="60" ry="8" fill="#8B5CF6" opacity="0.1" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-dark">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-magenta/8 blur-3xl animate-float" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-violet/8 blur-3xl animate-float delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold/5 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <div className="text-center lg:text-left">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-magenta/30 bg-magenta/10">
              <span className="text-magenta text-sm font-medium tracking-wide">
                AI para PyMEs de LATAM
              </span>
            </div>

            <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl font-medium text-white leading-[1.1] mb-6">
              {content.hero.headline.split("nunca falta")[0]}
              <span className="text-magenta font-[family-name:var(--font-playfair)] italic font-black">
                nunca falta
              </span>
              {" al trabajo"}
            </h1>

            <p className="text-lg sm:text-xl text-white/60 max-w-xl mb-10 leading-relaxed">
              {content.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 lg:justify-start justify-center">
              <a
                href="#lista-de-espera"
                className="inline-block bg-magenta hover:bg-magenta-dark text-white font-semibold px-8 py-4 rounded-full text-lg transition-all hover:-translate-y-0.5 animate-pulse-glow"
              >
                {content.hero.cta} →
              </a>

              <a
                href="#que-es"
                className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium"
              >
                Conoce más
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right — SVG Illustration */}
          <div className="hidden lg:block">
            <HeroIllustration />
          </div>
        </div>

        {/* Mobile illustration — smaller, below CTA */}
        <div className="lg:hidden mt-12 max-w-xs mx-auto">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
