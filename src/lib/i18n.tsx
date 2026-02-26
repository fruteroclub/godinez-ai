"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { content, type Content } from "./content";
import { contentEn } from "./content-en";

type Locale = "es" | "en";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "godinez-locale";

const contentMap: Record<Locale, Content> = {
  es: content,
  en: contentEn,
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "es") {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "es" ? "en" : "es");
  }, [locale, setLocale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

export function useContent(): Content {
  const { locale } = useLanguage();
  return contentMap[locale];
}
