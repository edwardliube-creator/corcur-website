import { getContentSource, loadPosts } from "./content-source.js";
import { initTheme } from "../utils/theme.js";

const LANG_KEY = "site-lang";
let lang = localStorage.getItem(LANG_KEY) || "zh";
let activeCategory = "All";
let blogPosts = [];
let currentPostSlug = null;

initTheme();
bindControls();
initBlog();

async function initBlog() {
  blogPosts = await loadPosts();
  updateI18n();
  renderBlog();
}

function bindControls() {
  const langBtn = document.querySelector("#blogLangToggle");
  langBtn?.addEventListener("click", () => {
    lang = lang === "zh" ? "en" : "zh";
    localStorage.setItem(LANG_KEY, lang);
    updateI18n();
    renderBlog();
  });

  const filterMap = [
    ["#filterAll", "All"],
    ["#filterAgent", "AI Agent"],
    ["#filterEntry", "Market Entry"],
    ["#filterGrowth", "Growth"]
  ];

  filterMap.forEach(([selector, category]) => {
    const btn = document.querySelector(selector);
    btn?.addEventListener("click", () => {
      activeCategory = category;
      renderBlog();
    });
  });
}

function updateI18n() {
  document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
  const langBtn = document.querySelector("#blogLangToggle");
  if (langBtn) langBtn.textContent = lang === "zh" ? "EN" : "中";

  const source = getContentSource() === "local-markdown" ? "Markdown" : "CMS";
  document.querySelector("#blogChip").textContent = lang === "zh" ? `博客模块（${source}）` : `Blog Module (${source})`;
  document.querySelector("#blogTitle").textContent = lang === "zh" ? "博客模块骨架" : "Blog Module Skeleton";
  document.querySelector("#blogDesc").textContent =
    lang === "zh"
      ? "用于后续扩展行业洞察、项目复盘、自动化案例与方法论文章，不影响当前主页结构。"
      : "A starter module for future insights, case studies, and automation notes without affecting the current homepage.";
  document.querySelector("#filterAll").textContent = "All";
  document.querySelector("#filterAgent").textContent = lang === "zh" ? "AI Agent" : "AI Agent";
  document.querySelector("#filterEntry").textContent = lang === "zh" ? "Market Entry" : "Market Entry";
  document.querySelector("#filterGrowth").textContent = "Growth";
}

function renderBlog() {
  const list = document.querySelector("#blogList");
  const articleSection = document.querySelector("#articleSection");
  if (articleSection) articleSection.hidden = true;
  const posts = activeCategory === "All" ? blogPosts : blogPosts.filter((item) => item.category === activeCategory);
  list.innerHTML = posts
    .map(
      (post) => `
      <article class="card blog-item reveal visible">
        <p class="blog-meta">${post.date} · ${post.readingTime} · ${post.category}</p>
        <h3>${lang === "zh" ? post.titleZh : post.titleEn}</h3>
        <p class="article-subtitle">${lang === "zh" ? post.subtitleZh : post.subtitleEn}</p>
        <p>${lang === "zh" ? post.coverDescZh : post.coverDescEn}</p>
        <p class="blog-meta">${(post.tags || []).slice(0, 2).join(" / ")}</p>
        <button class="btn btn-ghost open-post" type="button" data-slug="${post.slug || post.id}">Read Article →</button>
      </article>
    `
    )
    .join("");

  list.querySelectorAll(".open-post").forEach((btn) => {
    btn.addEventListener("click", () => openPost(btn.dataset.slug));
  });
}

function openPost(slug) {
  const post = blogPosts.find((item) => (item.slug || item.id) === slug);
  if (!post) return;
  currentPostSlug = slug;
  const articleSection = document.querySelector("#articleSection");
  const articleMeta = document.querySelector("#articleMeta");
  const articleTitle = document.querySelector("#articleTitle");
  const articleSubtitle = document.querySelector("#articleSubtitle");
  const articleCoverTitle = document.querySelector("#articleCoverTitle");
  const articleCoverDesc = document.querySelector("#articleCoverDesc");
  const articleTags = document.querySelector("#articleTags");
  const articleSideTags = document.querySelector("#articleSideTags");
  const articleBody = document.querySelector("#articleBody");
  const articlePrev = document.querySelector("#articlePrev");
  const articleNext = document.querySelector("#articleNext");
  articleMeta.textContent = `${post.date} · ${post.readingTime} · ${post.category}`;
  articleTitle.textContent = lang === "zh" ? post.titleZh : post.titleEn;
  articleSubtitle.textContent = lang === "zh" ? post.subtitleZh : post.subtitleEn;
  articleCoverTitle.textContent = lang === "zh" ? post.titleZh : post.titleEn;
  articleCoverDesc.textContent = lang === "zh" ? post.coverDescZh : post.coverDescEn;
  const tagMarkup = (post.tags || []).map((tag) => `<span>${tag}</span>`).join("");
  articleTags.innerHTML = tagMarkup;
  articleSideTags.innerHTML = tagMarkup;
  articleBody.innerHTML = post.html || `<p>${lang === "zh" ? post.excerptZh : post.excerptEn}</p>`;
  document.title = lang === "zh" ? post.seoTitleZh : post.seoTitleEn;

  const currentIndex = blogPosts.findIndex((item) => (item.slug || item.id) === slug);
  const prevPost = blogPosts[(currentIndex - 1 + blogPosts.length) % blogPosts.length];
  const nextPost = blogPosts[(currentIndex + 1) % blogPosts.length];
  articlePrev.textContent = lang === "zh" ? "上一篇" : "Previous";
  articleNext.textContent = lang === "zh" ? "下一篇" : "Next";
  articlePrev.onclick = () => openPost(prevPost.slug || prevPost.id);
  articleNext.onclick = () => openPost(nextPost.slug || nextPost.id);

  articleSection.hidden = false;
  articleSection.scrollIntoView({ behavior: "smooth", block: "start" });
}
