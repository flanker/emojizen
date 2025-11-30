import { Translations } from "./locales";
import { emojiTranslationsZh } from "./emojiTranslations";

export function translateCategoryName(categoryName: string, t: Translations): string {
  return t.categoryNames[categoryName] || categoryName;
}

export function getEmojiName(emoji: string, originalName: string, locale: string): string {
  if (locale === "zh" && emojiTranslationsZh[emoji]) {
    return emojiTranslationsZh[emoji].name;
  }
  return originalName;
}

export function getEmojiKeywords(emoji: string, originalKeywords: string[], locale: string): string[] {
  if (locale === "zh" && emojiTranslationsZh[emoji]) {
    return emojiTranslationsZh[emoji].keywords;
  }
  return originalKeywords;
}
