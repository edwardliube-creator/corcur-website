const STORAGE_KEY = "edward-theme";

export function initTheme() {
  const root = document.documentElement;
  const toggle = document.querySelector("#themeToggle");
  const preferred = localStorage.getItem(STORAGE_KEY);
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const mode = preferred || (systemDark ? "dark" : "light");
  root.dataset.theme = mode;

  toggle?.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem(STORAGE_KEY, next);
  });
}
