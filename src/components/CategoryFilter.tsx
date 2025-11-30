"use client";

import { useState } from "react";
import { useLocale } from "@/i18n/LocaleContext";
import styles from "./CategoryFilter.module.css";

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  const { t } = useLocale();
  const [isExpanded, setIsExpanded] = useState(false);

  // 简化的分类名称映射（用于小屏幕显示）
  const getShortName = (name: string): string => {
    const shortNames: Record<string, string> = {
      "Smileys & Emotion": "Smileys",
      "People & Body": "People",
      "Animals & Nature": "Animals",
      "Food & Drink": "Food",
      "Travel & Places": "Travel",
      Activities: "Activities",
      Objects: "Objects",
      Symbols: "Symbols",
      Flags: "Flags",
      Component: "Component",
    };
    return shortNames[name] || name;
  };

  const handleCategoryClick = (categoryId: string | null) => {
    onCategoryChange(categoryId);
    setIsExpanded(false);
  };

  const activeCategoryName = activeCategory
    ? categories.find((cat) => cat.id === activeCategory)?.name || t.allCategories
    : t.allCategories;

  return (
    <div className={styles.container}>
      {/* Mobile dropdown */}
      <div className={styles.mobileFilter}>
        <button className={styles.dropdownButton} onClick={() => setIsExpanded(!isExpanded)} aria-expanded={isExpanded}>
          <span>{activeCategoryName}</span>
          <svg
            className={`${styles.chevron} ${isExpanded ? styles.expanded : ""}`}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {isExpanded && (
          <div className={styles.dropdown}>
            <button
              className={`${styles.dropdownItem} ${!activeCategory ? styles.active : ""}`}
              onClick={() => handleCategoryClick(null)}
            >
              {t.allCategories}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.dropdownItem} ${activeCategory === category.id ? styles.active : ""}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop tabs */}
      <div className={styles.desktopFilter}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${!activeCategory ? styles.active : ""}`}
            onClick={() => handleCategoryClick(null)}
          >
            {t.allCategories}
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.tab} ${activeCategory === category.id ? styles.active : ""}`}
              onClick={() => handleCategoryClick(category.id)}
              title={category.name} /* 完整名称作为tooltip */
            >
              <span className={styles.tabShort}>{getShortName(category.name)}</span>
              <span className={styles.tabFull}>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
