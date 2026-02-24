import { content } from "@/lib/content";

export default function BetaBanner() {
  return (
    <div className="relative z-50 bg-gradient-to-r from-violet-dark via-magenta-dark to-violet-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 py-2 text-sm">
          <span className="text-white/80">{content.beta.banner}</span>
          <a
            href="/sign-in"
            className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-0.5 text-xs font-semibold text-gold hover:bg-white/20 transition-colors"
          >
            {content.beta.bannerCta} →
          </a>
        </div>
      </div>
    </div>
  );
}
