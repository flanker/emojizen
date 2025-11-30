"use client";

import { useState } from "react";
import { useLocale } from "@/i18n/LocaleContext";
import { translateCategoryName } from "@/i18n/utils";
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
    const shortNamesEn: Record<string, string> = {
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

    const shortNamesZh: Record<string, string> = {
      笑脸与情感: "笑脸",
      人物与身体: "人物",
      动物与自然: "动物",
      食物与饮料: "食物",
      旅行与地点: "旅行",
      活动: "活动",
      物品: "物品",
      符号: "符号",
      旗帜: "旗帜",
      组件: "组件",
    };

    const translatedName = translateCategoryName(name, t);
    const shortNames = t.categoryNames["Smileys & Emotion"] === "笑脸与情感" ? shortNamesZh : shortNamesEn;
    return shortNames[translatedName] || translatedName;
  };

  const handleCategoryClick = (categoryId: string | null) => {
    onCategoryChange(categoryId);
    setIsExpanded(false);
  };

  const activeCategory_obj = activeCategory ? categories.find((cat) => cat.id === activeCategory) : null;
  const activeCategoryName = activeCategory_obj ? translateCategoryName(activeCategory_obj.name, t) : t.allCategories;

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
                {translateCategoryName(category.name, t)}
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
              title={translateCategoryName(category.name, t)} /* 完整名称作为tooltip */
            >
              <span className={styles.tabShort}>{getShortName(category.name)}</span>
              <span className={styles.tabFull}>{translateCategoryName(category.name, t)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
