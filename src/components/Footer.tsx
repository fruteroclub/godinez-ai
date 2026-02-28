"use client";

import { useContent } from "@/lib/i18n";
import Image from "next/image";

// Robot logo icon (matches Navbar)
function FooterRobotIcon() {
  return <Image src="images/logo.svg" alt="Godínez" width={28} height={28} />;
}

export default function Footer() {
  const content = useContent();
  return (
    <footer className="relative bg-dark text-white py-16 overflow-hidden">
      {/* Subtle gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-magenta/30 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & tagline */}
          <div className="text-center md:text-left">
            <a href="#" className="inline-flex items-center gap-2 mb-2 group">
              <FooterRobotIcon />
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
            <p className="text-gold text-sm">{content.footer.tagline}</p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {content.footer.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/40 hover:text-magenta transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Powered by & copyright */}
          <div className="text-center md:text-right">
            <a
              href={content.footer.poweredByUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/30 hover:text-white/50 transition-colors text-xs mb-2"
            >
              <span className="w-1 h-1 rounded-full bg-violet animate-pulse" />
              {content.footer.poweredBy}
            </a>
            <p className="text-white/20 text-xs">{content.footer.copyright}</p>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <a
            href="https://frutero.club"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-white/30 hover:text-white/50 transition-colors text-xs"
          >
            <span>Construido por un</span>
            <img
              src="images/logo.svg"
              alt="Godínez"
              className="mb-1 h-6 w-auto"
            />
            <span className="font-semibold">de Frutero</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
