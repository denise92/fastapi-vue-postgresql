import { createI18n, useI18n } from "vue-i18n";

/**
 * 語系結構：
 * - locales/{locale}/index.ts   整合 global、errors（常用翻譯）及頁面模組
 * - locales/{locale}/{page}.ts  依頁面用途切分的翻譯
 */
import zhTW from "./locales/zh-TW";
import en from "./locales/en";

const messages = {
  "zh-TW": zhTW,
  en,
};

export const i18n = createI18n({
  legacy: false,
  locale: "zh-TW",
  fallbackLocale: "en",
  globalInjection: true,
  messages,
});

export function useAppI18n() {
  return useI18n({ useScope: "global" });
}
