"use client";

import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { content } from "@/lib/content";

function GodinezIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Head — rounded rectangle with screen face */}
      <rect
        x="130"
        y="60"
        width="140"
        height="120"
        rx="24"
        fill="#1A1A1A"
        stroke="#8B5CF6"
        strokeWidth="2"
      />
      {/* Screen face inner glow */}
      <rect x="145" y="75" width="110" height="80" rx="12" fill="#0A0A0A" />
      {/* Eyes — glowing dots */}
      <circle cx="175" cy="110" r="8" fill="#E91E8C" />
      <circle cx="225" cy="110" r="8" fill="#E91E8C" />
      <circle cx="175" cy="110" r="4" fill="#FF4DA6" />
      <circle cx="225" cy="110" r="4" fill="#FF4DA6" />
      {/* Smile */}
      <path
        d="M185 130 Q200 145 215 130"
        stroke="#FFB800"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Antenna */}
      <line
        x1="200"
        y1="60"
        x2="200"
        y2="38"
        stroke="#8B5CF6"
        strokeWidth="2"
      />
      <circle cx="200" cy="32" r="6" fill="#FFB800" />

      {/* Neck */}
      <rect
        x="185"
        y="180"
        width="30"
        height="16"
        rx="4"
        fill="#1A1A1A"
        stroke="#3A3A3A"
        strokeWidth="1"
      />

      {/* Body — torso with tie */}
      <rect
        x="120"
        y="196"
        width="160"
        height="120"
        rx="20"
        fill="#1A1A1A"
        stroke="#8B5CF6"
        strokeWidth="2"
      />
      {/* Tie */}
      <polygon points="200,206 192,226 200,246 208,226" fill="#E91E8C" />
      {/* Shirt collar lines */}
      <line
        x1="185"
        y1="196"
        x2="195"
        y2="216"
        stroke="#3A3A3A"
        strokeWidth="1.5"
      />
      <line
        x1="215"
        y1="196"
        x2="205"
        y2="216"
        stroke="#3A3A3A"
        strokeWidth="1.5"
      />
      {/* Chest badge — "G.AI" */}
      <rect
        x="225"
        y="230"
        width="36"
        height="18"
        rx="4"
        fill="#0A0A0A"
        stroke="#FFB800"
        strokeWidth="1"
      />
      <text
        x="243"
        y="243"
        textAnchor="middle"
        fill="#FFB800"
        fontSize="10"
        fontFamily="monospace"
        fontWeight="bold"
      >
        G.AI
      </text>

      {/* Arms */}
      {/* Left arm */}
      <rect
        x="85"
        y="206"
        width="35"
        height="80"
        rx="12"
        fill="#1A1A1A"
        stroke="#8B5CF6"
        strokeWidth="2"
      />
      {/* Left hand holding coffee */}
      <rect
        x="80"
        y="280"
        width="44"
        height="14"
        rx="7"
        fill="#1A1A1A"
        stroke="#3A3A3A"
        strokeWidth="1.5"
      />
      <rect
        x="72"
        y="268"
        width="24"
        height="20"
        rx="4"
        fill="#3A3A3A"
        stroke="#FFB800"
        strokeWidth="1"
      />
      <path
        d="M72 274 Q64 278 72 282"
        stroke="#FFB800"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Steam */}
      <path
        d="M78 264 Q80 256 84 260"
        stroke="#8B5CF6"
        strokeWidth="1"
        opacity="0.5"
        fill="none"
      />
      <path
        d="M86 262 Q88 254 92 258"
        stroke="#E91E8C"
        strokeWidth="1"
        opacity="0.5"
        fill="none"
      />

      {/* Right arm */}
      <rect
        x="280"
        y="206"
        width="35"
        height="80"
        rx="12"
        fill="#1A1A1A"
        stroke="#8B5CF6"
        strokeWidth="2"
      />
      {/* Right hand with thumbs up */}
      <rect
        x="282"
        y="280"
        width="30"
        height="14"
        rx="7"
        fill="#1A1A1A"
        stroke="#3A3A3A"
        strokeWidth="1.5"
      />
      <rect
        x="294"
        y="268"
        width="8"
        height="16"
        rx="4"
        fill="#1A1A1A"
        stroke="#FFB800"
        strokeWidth="1.5"
      />

      {/* Legs */}
      <rect
        x="145"
        y="316"
        width="40"
        height="50"
        rx="10"
        fill="#1A1A1A"
        stroke="#3A3A3A"
        strokeWidth="1.5"
      />
      <rect
        x="215"
        y="316"
        width="40"
        height="50"
        rx="10"
        fill="#1A1A1A"
        stroke="#3A3A3A"
        strokeWidth="1.5"
      />
      {/* Shoes */}
      <rect
        x="138"
        y="358"
        width="52"
        height="16"
        rx="8"
        fill="#0A0A0A"
        stroke="#E91E8C"
        strokeWidth="1.5"
      />
      <rect
        x="210"
        y="358"
        width="52"
        height="16"
        rx="8"
        fill="#0A0A0A"
        stroke="#E91E8C"
        strokeWidth="1.5"
      />

      {/* Floating elements around the robot */}
      {/* Gear */}
      <circle
        cx="60"
        cy="120"
        r="14"
        stroke="#8B5CF6"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
      <circle
        cx="60"
        cy="120"
        r="6"
        stroke="#8B5CF6"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
      {/* Data nodes */}
      <circle cx="340" cy="100" r="4" fill="#FFB800" opacity="0.5" />
      <circle cx="355" cy="130" r="3" fill="#E91E8C" opacity="0.5" />
      <circle cx="330" cy="150" r="5" fill="#8B5CF6" opacity="0.4" />
      <line
        x1="340"
        y1="100"
        x2="355"
        y2="130"
        stroke="#FFB800"
        strokeWidth="0.5"
        opacity="0.3"
      />
      <line
        x1="355"
        y1="130"
        x2="330"
        y2="150"
        stroke="#E91E8C"
        strokeWidth="0.5"
        opacity="0.3"
      />
      {/* Chat bubble */}
      <rect
        x="310"
        y="190"
        width="60"
        height="30"
        rx="8"
        fill="none"
        stroke="#FFB800"
        strokeWidth="1"
        opacity="0.4"
      />
      <circle cx="325" cy="205" r="2" fill="#FFB800" opacity="0.4" />
      <circle cx="337" cy="205" r="2" fill="#FFB800" opacity="0.4" />
      <circle cx="349" cy="205" r="2" fill="#FFB800" opacity="0.4" />
      {/* Lightning bolt */}
      <path
        d="M50 220 L56 238 L52 238 L58 258"
        stroke="#FFB800"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}

export default function Hero() {
  const waitlistCount = useQuery(api.waitlist.count);
  const [serverCount, setServerCount] = useState<number | null>(null);

  // Fetch cached count from API on mount (server-side cache)
  useEffect(() => {
    fetch("/api/waitlist/count")
      .then((res) => res.json())
      .then((data) => setServerCount(data.count))
      .catch(() => setServerCount(0));
  }, []);

  // Real-time count takes priority, then server cache, then 0
  const displayCount = waitlistCount ?? serverCount ?? 0;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-24 lg:pt-20 bg-dark">
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-violet/5 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-magenta/5 blur-[120px]" />
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl md:text-6xl font-medium text-white leading-[1.1] mb-6">
              El asistente al que le <br className="lg:hidden" />
              <span className="text-gold font-[family-name:var(--font-playfair)] italic font-black">
                delegas todo
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/75 max-w-xl mb-10 leading-relaxed mx-auto lg:mx-0">
              {content.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 lg:justify-start justify-center">
              <a
                href="#lista-de-espera"
                className="inline-block bg-magenta hover:bg-magenta-dark text-white font-semibold px-8 py-4 rounded-full text-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-magenta/30 cursor-pointer"
              >
                {content.hero.cta} →
              </a>

              <a
                href="#que-es"
                className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium px-4 py-3 -mx-4 -my-3"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("que-es")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Conoce más
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-3 justify-center lg:justify-start text-white/30 text-sm">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-dark"
                    style={{
                      background: `linear-gradient(135deg, ${
                        ["#E91E8C", "#8B5CF6", "#FFB800", "#E91E8C"][i]
                      }40, ${["#8B5CF6", "#FFB800", "#E91E8C", "#8B5CF6"][i]}40)`,
                    }}
                  />
                ))}
              </div>
              <span>+{displayCount} en lista de espera</span>
            </div>
          </div>

          {/* SVG Illustration */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow behind illustration */}
              <div className="absolute inset-0 bg-magenta/10 blur-[60px] rounded-full scale-75" />
              <GodinezIllustration className="relative w-72 sm:w-80 md:w-96 h-auto animate-float" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
          });
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:text-magenta transition-colors"
        aria-label="Scroll to next section"
      >
        <svg
          className="w-12 h-12 text-magenta/40 hover:text-magenta/60 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </section>
  );
}
