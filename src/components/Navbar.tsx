"use client";

import { useState, useEffect } from "react";
import { content } from "@/lib/content";

// Small robot logo
function RobotLogo() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8" aria-hidden="true">
      <rect x="6" y="10" width="20" height="16" rx="4" fill="#111111" stroke="#8B5CF6" strokeWidth="1.5" />
      <rect x="10" y="14" width="12" height="7" rx="2" fill="#0A0A0A" />
      <circle cx="13" cy="17" r="1.5" fill="#E91E8C">
        <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="19" cy="17" r="1.5" fill="#8B5CF6">
        <animate attributeName="opacity" values="1;0.5;1" dur="2s" begin="0.3s" repeatCount="indefinite" />
      </circle>
      <line x1="16" y1="10" x2="16" y2="6" stroke="#8B5CF6" strokeWidth="1.5" />
      <circle cx="16" cy="4" r="2" fill="#E91E8C" />
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
            <span className="text-xl text-white">
              <span className="font-[family-name:var(--font-plus-jakarta)] font-medium">Godinez.</span>
              <span className="font-[family-name:var(--font-playfair)] italic font-bold">AI</span>
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
