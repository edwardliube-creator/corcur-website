import { renderPage } from "./sections/page.js";
import { applyTranslations, initI18n } from "./i18n/index.js";
import { initInteractions } from "./utils/interactions.js";
import { initTheme } from "./utils/theme.js";

function mountHome() {
  renderPage(document.querySelector("#app"), document.querySelector("#footer"));
  applyTranslations();
  initInteractions();
}

initTheme();
initI18n();
mountHome();

document.addEventListener("languagechange", () => {
  mountHome();
});
