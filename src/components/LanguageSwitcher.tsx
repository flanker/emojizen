"use client";

import { useLocale } from "@/i18n/LocaleContext";
import { Locale } from "@/i18n/locales";
import styles from "./LanguageSwitcher.module.css";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  const handleChange = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  return (
    <div className={styles.switcher}>
      <button
        className={`${styles.button} ${locale === "en" ? styles.active : ""}`}
        onClick={() => handleChange("en")}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className={styles.divider}>|</span>
      <button
        className={`${styles.button} ${locale === "zh" ? styles.active : ""}`}
        onClick={() => handleChange("zh")}
        aria-label="切换到中文"
      >
        中文
      </button>
    </div>
  );
}
