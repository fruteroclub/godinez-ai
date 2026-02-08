"use client";

import { useState, useEffect } from "react";
import { content } from "@/lib/content";

// Robot logo icon
function RobotLogo() {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-7 h-7"
      aria-hidden="true"
    >
      <rect x="2" y="6" width="24" height="18" rx="6" fill="#1A1A1A" stroke="#8B5CF6" strokeWidth="1.5" />
      <circle cx="10" cy="14" r="2.5" fill="#E91E8C" />
      <circle cx="18" cy="14" r="2.5" fill="#E91E8C" />
      <path d="M10.5 19 Q14 22 17.5 19" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <line x1="14" y1="6" x2="14" y2="2" stroke="#8B5CF6" strokeWidth="1.5" />
      <circle cx="14" cy="1" r="1.5" fill="#FFB800" />
    </svg>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-dark/95 backdrop-blur-lg border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group"
          >
            <RobotLogo />
            <span className="text-xl">
              <span className="font-[family-name:var(--font-plus-jakarta)] font-medium text-white">Godínez</span>
              <span className="text-gold">.</span>
              <span className="font-[family-name:var(--font-playfair)] italic font-bold text-magenta inline-block" style={{ transform: 'skewX(6deg)' }}>AI</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {content.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/50 hover:text-white transition-colors font-medium text-sm relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-magenta transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-dark/95 backdrop-blur-lg border-t border-white/5 py-4 px-4">
          {content.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-3 text-white/60 hover:text-magenta transition-colors font-medium border-b border-white/5 last:border-0"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
