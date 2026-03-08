"use client";

import { createContext, useContext, useState, useSyncExternalStore, ReactNode } from "react";
import { Locale, translations, Translations } from "./locales";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

function getBrowserLocale(): Locale {
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("zh")) return "zh";
  return "en";
}

function getSavedLocale(): Locale | null {
  const saved = localStorage.getItem("locale");
  if (saved === "en" || saved === "zh") return saved;
  return null;
}

function getInitialLocale(): Locale {
  return getSavedLocale() || getBrowserLocale();
}

const subscribe = () => () => {};

export function LocaleProvider({ children }: { children: ReactNode }) {
  const initialLocale = useSyncExternalStore(subscribe, getInitialLocale, () => "en" as Locale);
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: translations[locale] }}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    // Provide default for SSG/SSR
    return {
      locale: "en" as Locale,
      setLocale: () => {},
      t: translations.en,
    };
  }
  return context;
}
