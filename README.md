# 个人简历网站（生产可部署）

现代化、高级感、单页个人品牌网站，包含：

- 响应式布局（PC / Tablet / Mobile）
- 深色 / 浅色模式切换
- Section reveal 与 hover 微动效
- 模块化结构（可扩展博客、多语言）
- 中英双语切换框架（i18n 预留，可扩展更多语言）
- SEO + Open Graph + Twitter Card + Structured Data
- 项目卡片交互、联系表单交互、邮箱复制、简历下载
- Vercel 一键部署
- 本地 HTML 预览
- 博客支持本地静态 Markdown 文章
- 预留 CMS 接口层（Notion / Sanity / Contentful）

## 项目结构

```text
.
├─ index.html
├─ blog.html
├─ content/blog/
│  ├─ index.json
│  └─ *.md
├─ assets/
│  ├─ Edward-Liu-CV.pdf
│  └─ og-cover.svg
├─ src/
│  ├─ main.js
│  ├─ sections/page.js
│  ├─ styles/main.css
│  └─ utils/
│     ├─ interactions.js
│     └─ theme.js
├─ src/blog/
│  ├─ content-source.js
│  ├─ data.js
│  ├─ markdown.js
│  └─ main.js
├─ src/i18n/
│  ├─ index.js
│  └─ translations.js
├─ server.mjs
├─ package.json
└─ vercel.json
```

## 本地预览

你当前环境若无法直接使用 `npm`，可以直接运行：

```bash
node server.mjs
```

打开 [http://localhost:5173](http://localhost:5173) 即可预览。

如果本机可用 npm，也可用：

```bash
npm run dev
```

## Vercel 一键部署

1. 将项目推送到 GitHub。
2. 在 Vercel 导入仓库（Framework 选择 Other）。
3. 保持默认构建设置（静态站点无需构建步骤）。
4. 部署完成后，更新 `index.html` 中的：
   - `canonical` URL
   - `og:url`
   - `og:image`
   - `twitter:image`

## 博客内容来源（Markdown / CMS）

默认使用本地 Markdown：

- 文章清单在 `content/blog/index.json`
- 文章正文在 `content/blog/*.md`
- 浏览器端解析在 `src/blog/markdown.js`

切换到 CMS 预留接口：

- 修改 `src/blog/content-source.js` 中 `CONTENT_SOURCE`
- 可选值：`local-markdown`、`notion`、`sanity`、`contentful`
- 在同文件的 `loadFromNotion/loadFromSanity/loadFromContentful` 填入真实请求逻辑（建议通过 Vercel API Route 代理密钥）

## 上线前建议

- 用真实简历替换 `assets/Edward-Liu-CV.pdf`
- 替换 `assets/og-cover.svg` 为品牌主视觉图
- 为 LinkedIn / GitHub / WeChat 填入真实链接
- 将联系表单接入 Formspree 或后端 API
- 在 `src/i18n/translations.js` 中继续扩展语言键值
- 在 `content/blog/` 中新增 Markdown 文章即可扩展博客
- 如接 CMS，请将密钥放在 Vercel 环境变量，不要写入前端代码
