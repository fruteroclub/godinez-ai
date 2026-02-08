import { content } from "@/lib/content";

// Robot logo icon (matches Navbar)
function FooterRobotIcon() {
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

export default function Footer() {
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
                <span className="font-[family-name:var(--font-plus-jakarta)] font-medium text-white">Godínez</span>
                <span className="text-gold">.</span>
                <span className="font-[family-name:var(--font-playfair)] italic font-bold text-magenta inline-block" style={{ transform: 'skewX(6deg)' }}>AI</span>
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
