import { content } from "@/lib/content";

// Small robot logo for footer
function FooterRobot() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
      <rect x="4" y="8" width="16" height="12" rx="3" fill="#111111" stroke="#8B5CF6" strokeWidth="1" />
      <rect x="7" y="11" width="10" height="5" rx="1.5" fill="#0A0A0A" />
      <circle cx="9.5" cy="13.5" r="1" fill="#E91E8C" />
      <circle cx="14.5" cy="13.5" r="1" fill="#8B5CF6" />
      <line x1="12" y1="8" x2="12" y2="5" stroke="#8B5CF6" strokeWidth="1" />
      <circle cx="12" cy="4" r="1.5" fill="#E91E8C" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] text-white py-16 overflow-hidden">
      {/* Subtle gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-magenta/30 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & tagline */}
          <div className="text-center md:text-left">
            <a href="#" className="inline-flex items-center gap-2 mb-2 group">
              <FooterRobot />
              <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-gradient-brand">
                {content.footer.logo}
              </span>
            </a>
            <p className="text-white/40 text-sm">{content.footer.tagline}</p>
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
          <p className="text-white/20 text-xs font-[family-name:var(--font-playfair)] italic">
            Hecho con 🤖 para PyMEs de LATAM
          </p>
        </div>
      </div>
    </footer>
  );
}
