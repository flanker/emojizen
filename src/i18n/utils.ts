import { Translations } from "./locales";

export function translateCategoryName(categoryName: string, t: Translations): string {
  return t.categoryNames[categoryName] || categoryName;
}
