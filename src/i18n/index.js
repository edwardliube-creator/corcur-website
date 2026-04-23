import { translations } from "./translations.js";

const LANG_KEY = "site-lang";
const DEFAULT_LANG = "zh";
let currentLang = DEFAULT_LANG;

export function initI18n() {
  currentLang = localStorage.getItem(LANG_KEY) || DEFAULT_LANG;
  document.documentElement.lang = currentLang === "en" ? "en" : "zh-CN";
  bindLanguageToggle();
}

export function applyTranslations(root = document) {
  const dict = translations[currentLang] || translations[DEFAULT_LANG];
  root.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (key && dict[key]) el.textContent = dict[key];
  });
  root.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (key && dict[key]) el.setAttribute("placeholder", dict[key]);
  });
  refreshLanguageButton();
}

export function getCurrentLanguage() {
  return currentLang;
}

function bindLanguageToggle() {
  const btn = document.querySelector("#langToggle");
  if (!btn || btn.dataset.bound) return;
  btn.dataset.bound = "1";
  btn.addEventListener("click", () => {
    currentLang = currentLang === "zh" ? "en" : "zh";
    localStorage.setItem(LANG_KEY, currentLang);
    document.documentElement.lang = currentLang === "en" ? "en" : "zh-CN";
    document.dispatchEvent(new CustomEvent("languagechange", { detail: { lang: currentLang } }));
    refreshLanguageButton();
  });
  refreshLanguageButton();
}

function refreshLanguageButton() {
  const btn = document.querySelector("#langToggle");
  if (!btn) return;
  btn.textContent = currentLang === "zh" ? "EN" : "中";
}
