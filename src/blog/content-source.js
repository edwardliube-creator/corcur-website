import { parseMarkdown } from "./markdown.js";
import { blogPosts as fallbackPosts } from "./data.js";

const CMS_MODE = {
  LOCAL_MARKDOWN: "local-markdown",
  NOTION: "notion",
  SANITY: "sanity",
  CONTENTFUL: "contentful"
};

// Switch this constant to one of CMS_MODE values.
const CONTENT_SOURCE = CMS_MODE.LOCAL_MARKDOWN;

export async function loadPosts() {
  if (CONTENT_SOURCE === CMS_MODE.LOCAL_MARKDOWN) {
    return loadLocalMarkdownPosts();
  }
  return loadFromCms(CONTENT_SOURCE);
}

export function getContentSource() {
  return CONTENT_SOURCE;
}

async function loadLocalMarkdownPosts() {
  try {
    const manifestRes = await fetch("./content/blog/index.json");
    const manifest = await manifestRes.json();
    const items = await Promise.all(
      manifest.posts.map(async (post) => {
        const mdRes = await fetch(`./content/blog/${post.slug}.md`);
        const markdown = await mdRes.text();
        return {
          ...post,
          markdown,
          html: parseMarkdown(markdown)
        };
      })
    );
    return items;
  } catch {
    return fallbackPosts.map((item) => ({
      ...item,
      slug: item.id,
      html: `<p>${item.excerptEn}</p>`,
      markdown: item.excerptEn
    }));
  }
}

async function loadFromCms(provider) {
  if (provider === CMS_MODE.NOTION) return loadFromNotion();
  if (provider === CMS_MODE.SANITY) return loadFromSanity();
  if (provider === CMS_MODE.CONTENTFUL) return loadFromContentful();
  return [];
}

async function loadFromNotion() {
  // TODO: Replace with /api/notion-posts proxy endpoint.
  return [];
}

async function loadFromSanity() {
  // TODO: Replace with Sanity GROQ endpoint request.
  return [];
}

async function loadFromContentful() {
  // TODO: Replace with Contentful Delivery API request.
  return [];
}
