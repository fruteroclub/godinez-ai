"use client";

import { useState, useEffect } from "react";
import { content } from "@/lib/content";
import Image from "next/image";

// Robot logo icon
function RobotLogo() {
  return (
    <Image src="images/logo.svg" alt="Godínez AI" width={28} height={28} />
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-dark/95 backdrop-blur-lg border-b border-white/5"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <RobotLogo />
            <span className="text-xl">
              <span className="font-[family-name:var(--font-plus-jakarta)] font-medium text-white">
                Godínez
              </span>
              <span className="text-gold">.</span>
              <span
                className="font-[family-name:var(--font-playfair)] italic font-bold text-magenta inline-block"
                style={{ transform: "skewX(6deg)" }}
              >
                AI
              </span>
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
              className="block py-3 text-white/75 hover:text-magenta transition-colors font-medium border-b border-white/5 last:border-0"
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
