"use client";

import { useLanguage } from "@/lib/i18n";

export default function LanguageToggle() {
  const { locale, toggleLocale } = useLanguage();

  return (
    <button
      onClick={toggleLocale}
      className="text-sm font-medium text-white/50 hover:text-white transition-colors border border-white/20 hover:border-white/40 rounded px-2 py-0.5"
      aria-label={locale === "es" ? "Switch to English" : "Cambiar a español"}
    >
      {locale === "es" ? "EN" : "ES"}
    </button>
  );
}
