"use client";

import { useMemo } from "react";
import EmojiCard from "./EmojiCard";
import { useLocale } from "@/i18n/LocaleContext";
import styles from "./EmojiGrid.module.css";

interface Emoji {
  emoji: string;
  name: string;
  keywords: string[];
}

interface Category {
  id: string;
  name: string;
  emojis: Emoji[];
}

interface EmojiGridProps {
  categories: Category[];
  activeCategory: string | null;
  searchQuery: string;
  onEmojiCopy?: (emoji: string) => void;
}

export default function EmojiGrid({ categories, activeCategory, searchQuery, onEmojiCopy }: EmojiGridProps) {
  const { t } = useLocale();
  const filteredEmojis = useMemo(() => {
    let allEmojis: Array<Emoji & { categoryName: string }> = [];

    // Get emojis from selected category or all categories
    const categoriesToShow = activeCategory ? categories.filter((cat) => cat.id === activeCategory) : categories;

    categoriesToShow.forEach((category) => {
      category.emojis.forEach((emoji) => {
        allEmojis.push({
          ...emoji,
          categoryName: category.name,
        });
      });
    });

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      allEmojis = allEmojis.filter(
        (emoji) =>
          emoji.name.toLowerCase().includes(query) ||
          emoji.keywords.some((keyword) => keyword.toLowerCase().includes(query))
      );
    }

    return allEmojis;
  }, [categories, activeCategory, searchQuery]);

  const groupedEmojis = useMemo(() => {
    if (searchQuery.trim() || activeCategory) {
      // If searching or filtering by category, show flat grid
      return [{ categoryName: "", emojis: filteredEmojis }];
    }

    // Group by category for full display
    return categories.map((category) => ({
      categoryName: category.name,
      emojis: category.emojis.map((emoji) => ({ ...emoji, categoryName: category.name })),
    }));
  }, [categories, filteredEmojis, searchQuery, activeCategory]);

  if (filteredEmojis.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>🔍</div>
        <h3 className={styles.emptyTitle}>{searchQuery ? t.noEmojisFound : t.noEmojisInCategory}</h3>
        <p className={styles.emptyDescription}>{searchQuery ? t.trySearchElse : t.categoryEmpty}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {groupedEmojis.map((group, groupIndex) => (
        <div key={groupIndex} className={styles.categorySection}>
          {group.categoryName && !searchQuery && !activeCategory && (
            <div className={styles.categoryHeader}>
              <h2 className={styles.categoryTitle}>{group.categoryName}</h2>
              <div className={styles.categoryLine}></div>
            </div>
          )}

          <div className={styles.grid}>
            {group.emojis.map((emoji, index) => (
              <EmojiCard key={`${emoji.emoji}-${index}`} emoji={emoji} onCopy={onEmojiCopy} />
            ))}
          </div>
        </div>
      ))}

      {filteredEmojis.length > 0 && (
        <div className={styles.resultsCount}>
          <span>{filteredEmojis.length === 1 ? `1 ${t.emojiFound}` : `${filteredEmojis.length} ${t.emojisFound}`}</span>
        </div>
      )}
    </div>
  );
}
