import { content } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & tagline */}
          <div className="text-center md:text-left">
            <p className="font-[family-name:var(--font-playfair)] text-xl font-bold mb-1">
              🤖 {content.footer.logo}
            </p>
            <p className="text-white/60 text-sm">{content.footer.tagline}</p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {content.footer.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/60 hover:text-white transition-colors text-sm"
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
              className="text-white/40 hover:text-white/60 transition-colors text-xs block mb-1"
            >
              {content.footer.poweredBy}
            </a>
            <p className="text-white/40 text-xs">{content.footer.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
