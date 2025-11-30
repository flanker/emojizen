"use client";

import { useState, useCallback, useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import EmojiGrid from "@/components/EmojiGrid";
import CopyNotification from "@/components/CopyNotification";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLocale } from "@/i18n/LocaleContext";
import emojiData from "@/data/emojis.json";
import styles from "./page.module.css";

export default function Home() {
  const { t } = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [copiedEmoji, setCopiedEmoji] = useState<string>("");
  const [showNotification, setShowNotification] = useState(false);

  const categories = useMemo(() => emojiData.categories, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setActiveCategory(null); // Clear category filter when searching
    }
  }, []);

  const handleCategoryChange = useCallback((categoryId: string | null) => {
    setActiveCategory(categoryId);
    if (categoryId) {
      setSearchQuery(""); // Clear search when filtering by category
    }
  }, []);

  const handleEmojiCopy = useCallback((emoji: string) => {
    setCopiedEmoji(emoji);
    setShowNotification(true);
  }, []);

  const hideNotification = useCallback(() => {
    setShowNotification(false);
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.languageSwitcherWrapper}>
              <LanguageSwitcher />
            </div>

            <div className={styles.hero}>
              <h1 className={styles.title}>
                <span className={styles.titleEmoji}>🎨</span>
              </h1>
              <p className={styles.subtitle}>{t.subtitle}</p>
            </div>

            <div className={styles.searchSection}>
              <SearchBar onSearch={handleSearch} placeholder={t.searchPlaceholder} />
            </div>

            <div className={styles.filterSection}>
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <EmojiGrid
            categories={categories}
            activeCategory={activeCategory}
            searchQuery={searchQuery}
            onEmojiCopy={handleEmojiCopy}
          />
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>
            {t.madeWith} <span className={styles.heart}>❤️</span> {t.forEmojiLovers}
          </p>
          <div className={styles.footerStats}>
            <span>
              {categories.reduce((total, cat) => total + cat.emojis.length, 0)} {t.emojis}
            </span>
            <span>•</span>
            <span>
              {categories.length} {t.categories}
            </span>
          </div>
        </div>
      </footer>

      <CopyNotification emoji={copiedEmoji} show={showNotification} onHide={hideNotification} />
    </div>
  );
}
