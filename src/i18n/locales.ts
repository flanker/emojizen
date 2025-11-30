export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];

export interface Translations {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  searchingFor: string;
  allCategories: string;
  noEmojisFound: string;
  noEmojisInCategory: string;
  trySearchElse: string;
  categoryEmpty: string;
  emojiFound: string;
  emojisFound: string;
  madeWith: string;
  forEmojiLovers: string;
  emojis: string;
  categories: string;
  copiedToClipboard: string;
  categoryNames: Record<string, string>;
}

export const translations: Record<Locale, Translations> = {
  en: {
    title: "Emojizen",
    subtitle: "Discover, search, and copy beautiful emojis with just a click",
    searchPlaceholder: "Search emojis by name or keyword...",
    searchingFor: "Searching for",
    allCategories: "All Categories",
    noEmojisFound: "No emojis found",
    noEmojisInCategory: "No emojis in this category",
    trySearchElse: "Try searching for something else or check your spelling.",
    categoryEmpty: "This category appears to be empty.",
    emojiFound: "emoji found",
    emojisFound: "emojis found",
    madeWith: "Made with",
    forEmojiLovers: "for emoji lovers everywhere",
    emojis: "emojis",
    categories: "categories",
    copiedToClipboard: "Copied to clipboard!",
    categoryNames: {
      "Smileys & Emotion": "Smileys & Emotion",
      "People & Body": "People & Body",
      Component: "Component",
      "Animals & Nature": "Animals & Nature",
      "Food & Drink": "Food & Drink",
      "Travel & Places": "Travel & Places",
      Activities: "Activities",
      Objects: "Objects",
      Symbols: "Symbols",
      Flags: "Flags",
    },
  },
  zh: {
    title: "Emojizen",
    subtitle: "发现、搜索并一键复制精美表情符号",
    searchPlaceholder: "按名称或关键词搜索表情符号...",
    searchingFor: "正在搜索",
    allCategories: "全部分类",
    noEmojisFound: "未找到表情符号",
    noEmojisInCategory: "该分类中没有表情符号",
    trySearchElse: "尝试搜索其他内容或检查拼写。",
    categoryEmpty: "该分类似乎是空的。",
    emojiFound: "个表情符号",
    emojisFound: "个表情符号",
    madeWith: "用",
    forEmojiLovers: "为全世界的表情符号爱好者制作",
    emojis: "个表情符号",
    categories: "个分类",
    copiedToClipboard: "已复制到剪贴板！",
    categoryNames: {
      "Smileys & Emotion": "笑脸与情感",
      "People & Body": "人物与身体",
      Component: "组件",
      "Animals & Nature": "动物与自然",
      "Food & Drink": "食物与饮料",
      "Travel & Places": "旅行与地点",
      Activities: "活动",
      Objects: "物品",
      Symbols: "符号",
      Flags: "旗帜",
    },
  },
};
