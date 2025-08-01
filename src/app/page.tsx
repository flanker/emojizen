'use client';

import { useState, useCallback, useMemo } from 'react';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import EmojiGrid from '@/components/EmojiGrid';
import CopyNotification from '@/components/CopyNotification';
import emojiData from '@/data/emojis.json';
import styles from "./page.module.css";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [copiedEmoji, setCopiedEmoji] = useState<string>('');
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
      setSearchQuery(''); // Clear search when filtering by category
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
          <div className={styles.hero}>
            <h1 className={styles.title}>
              <span className={styles.titleEmoji}>🎨</span>
              Emojizen
            </h1>
            <p className={styles.subtitle}>
              Discover, search, and copy beautiful emojis with just a click
            </p>
          </div>
          
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search emojis by name or keyword..."
          />
          
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
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
            Made with <span className={styles.heart}>❤️</span> for emoji lovers everywhere
          </p>
          <div className={styles.footerStats}>
            <span>{categories.reduce((total, cat) => total + cat.emojis.length, 0)} emojis</span>
            <span>•</span>
            <span>{categories.length} categories</span>
          </div>
        </div>
      </footer>

      <CopyNotification
        emoji={copiedEmoji}
        show={showNotification}
        onHide={hideNotification}
      />
    </div>
  );
}
