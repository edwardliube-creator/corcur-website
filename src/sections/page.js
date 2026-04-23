const sections = [
  hero(),
  about(),
  competencies(),
  skills(),
  experience(),
  projects(),
  education(),
  social(),
  contact(),
];

export function renderPage(container, footerContainer) {
  container.innerHTML = sections.join("\n");
  footerContainer.innerHTML = `
    <div class="container">
      <p data-i18n="footer.copy">© ${new Date().getFullYear()} 刘波 Edward. Built for global growth.</p>
      <a href="#hero" data-i18n="footer.backTop">Back to top ↑</a>
    </div>
  `;
}

function hero() {
  const heroImages = [
    "https://picsum.photos/id/1015/1400/900",
    "https://picsum.photos/id/1043/1400/900",
    "https://picsum.photos/id/1033/1400/900"
  ];
  return `
  <section id="hero" class="section hero reveal launch-flow">
    <div class="container hero-grid">
      <div class="hero-content stage-item stage-title">
        <span class="chip" data-i18n="hero.chip">Personal Brand Site</span>
        <h1>刘波 Edward</h1>
        <p class="subtitle" data-i18n="hero.subtitle">印尼工商业地产战略官 · 超自动化（Hyper-automation）实践者 · 跨学科增长引擎</p>
      </div>
      <div class="hero-avatar glass stage-item stage-card">
        <img class="profile-photo" src="./assets/profile-photo.png" alt="刘波 Edward 证件照" />
        <p data-i18n="hero.side">Global Strategy × AI Automation</p>
        <div class="hero-carousel" id="heroCarousel">
          <div class="hero-carousel-track">
            ${heroImages
              .map(
                (src, idx) => `
              <figure class="hero-slide ${idx === 0 ? "active" : ""}">
                <img class="visual-media" src="${src}" alt="Hero visual ${idx + 1}" data-preview="${src}" loading="${idx === 0 ? "eager" : "lazy"}" />
              </figure>`
              )
              .join("")}
          </div>
          <div class="hero-carousel-dots">
            ${heroImages.map((_, idx) => `<button type="button" class="hero-dot ${idx === 0 ? "active" : ""}" data-hero-dot="${idx}" aria-label="Go to slide ${idx + 1}"></button>`).join("")}
          </div>
          <div class="hero-carousel-meta"><span id="heroCurrentIndex">01</span><em>/</em><span id="heroTotalCount">${String(heroImages.length).padStart(2, "0")}</span></div>
          <div class="hero-carousel-progress"><span id="heroCarouselProgress"></span></div>
          <div class="hero-carousel-controls">
            <button type="button" class="icon-btn" data-hero-nav="prev" aria-label="Previous visual">←</button>
            <button type="button" class="icon-btn" data-hero-toggle aria-label="Pause autoplay">Pause</button>
            <button type="button" class="icon-btn" data-hero-nav="next" aria-label="Next visual">→</button>
          </div>
        </div>
      </div>
      <div class="hero-content stage-item stage-detail">
        <p class="desc" data-i18n="hero.desc">专注印尼工商业地产战略准入与企业落地执行，结合 AI Agent 与自动化工作流，构建跨境商业增长引擎。</p>
        <div class="cta-row">
          <a class="btn btn-primary" href="#experience" data-i18n="hero.ctaResume">View Resume</a>
          <a class="btn btn-ghost" href="#contact" data-i18n="hero.ctaContact">Contact Me</a>
          <a class="btn btn-soft" href="./assets/Edward-Liu-CV.pdf" download data-i18n="hero.ctaDownload">Download CV</a>
        </div>
      </div>
    </div>
  </section>`;
}

function about() {
  return `
  <section id="about" class="section reveal">
    <div class="container">
      <h2 data-i18n="about.title">About</h2>
      <p class="desc max-760" data-i18n="about.desc">具备战略思维与技术底座的复合型人才，专注东南亚市场与 AI 自动化解决方案。擅长从 0 到 1 构建本土团队，驱动商业项目落地，并通过 AI Agent 实现业务流程重构。</p>
      <div class="grid cards-4">
        <article class="card"><h3 data-i18n="about.locationLabel">Location</h3><p data-i18n="about.locationValue">杭州 / 印尼</p></article>
        <article class="card"><h3>Email</h3><p><a href="mailto:edwardliu.be@gmail.com">edwardliu.be@gmail.com</a></p></article>
        <article class="card"><h3>Phone</h3><p><a href="tel:+8618758127863">18758127863</a></p></article>
        <article class="card"><h3 data-i18n="about.focusLabel">Focus</h3><p>AI Automation / Indonesia Market</p></article>
      </div>
      <div class="about-visual-grid">
        <img class="visual-media" src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1400&q=80" alt="Indonesia local execution visual" data-preview="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1800&q=80" loading="lazy" />
        <img class="visual-media" src="https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?auto=format&fit=crop&w=1400&q=80" alt="Cross-border growth visual" data-preview="https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?auto=format&fit=crop&w=1800&q=80" loading="lazy" />
      </div>
    </div>
  </section>`;
}

function competencies() {
  const items = [
    [
      "◉",
      "印尼市场战略准入与合规",
      "深度洞察印尼监管框架（如 KBLI、税务体系及劳工法），具备从 0 到 1 快速构建全职能本土团队、驱动大型商用项目合法化落地的卓越能力。"
    ],
    [
      "✦",
      "AI Agent 与数字化转型",
      "资深 AI 效率专家，擅长将大语言模型（LLM）与自动化工具整合，构建 Agentic Workflows（智能体工作流），实现业务流程的指数级增效。"
    ],
    [
      "◎",
      "全球化资源协同",
      "拥有跨国政商高层对接经验，成功驱动与 KFC、Starbucks、Indomaret 等世界级零售与餐饮巨头的战略合作。"
    ],
    [
      "⬢",
      "跨学科产品方法论",
      "本科视觉传达设计背景与多年 Web3、TikTok 生态创业经历相结合，具备极强的产品审美洞察力与全球化流量运营思维。"
    ],
  ];
  return `
  <section id="core" class="section reveal">
    <div class="container">
      <h2 data-i18n="core.title">Core Competencies</h2>
      <div class="grid cards-2">
        ${items
          .map(
            ([icon, title, text]) => `
          <article class="card hover-rise">
            <div class="icon">${icon}</div>
            <h3>${title}</h3>
            <p class="expandable-text">${text}</p>
          </article>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

function skills() {
  const skillList = ["Make", "Zapier", "Apify", "LLM", "Gemini", "GPT-4", "Agentic Workflows", "Data Lake", "Figma", "Sketch", "Adobe Creative Suite"];
  const dimensions = [
    ["AI视频", 90],
    ["AI制图", 86],
    ["市场推广", 88],
    ["Agent工作流", 94],
    ["AI网站搭建", 85]
  ];
  const specialSkills = [
    {
      title: "端到端工作流重构",
      text: "熟练运用 Make（原 Integromat）、Zapier 等低代码平台，通过复杂条件逻辑、多路径分支与数据湖集成，将传统人工作业转化为全自动生产线。"
    },
    {
      title: "Agentic Data Scraper（智能体抓取）",
      text: "结合 Apify 与 LLM（Gemini/GPT-4）构建智能爬虫，实现非结构化社交媒体数据（如 Facebook 房源群组）的自动感知、清洗、价值评估及实时表格化沉淀。"
    },
    {
      title: "多模态 AI 应用部署",
      text: "针对跨境营销、客户服务等业务痛点定制 AI Agent，实现自动化邮件闭环、智能线索分发及社交媒体内容矩阵自动生成。"
    },
    {
      title: "技术驱动型降本",
      text: "通过构建“人机协作”的自动化体系，有效替代重复性劳动，大幅降低行政与运营成本，持续优化企业 ROI。"
    }
  ];
  return `
  <section id="skills" class="section reveal launch-flow">
    <div class="container">
      <h2 class="stage-item stage-title" data-i18n="skills.title">Skills</h2>
      <div class="grid two-col">
        <article class="card stage-item stage-card" style="--i:0;">
          <h3 data-i18n="skills.category">Category</h3>
          <div class="radar-wrap" data-radar-values="${dimensions.map(([, score]) => score).join(",")}">
            <svg class="radar-chart" viewBox="0 0 220 220" role="img" aria-label="Five-dimensional competency chart">
              <circle cx="110" cy="110" r="86" class="radar-halo"></circle>
              <line x1="110" y1="110" x2="110" y2="25" class="radar-axis"></line>
              <line x1="110" y1="110" x2="188" y2="82" class="radar-axis"></line>
              <line x1="110" y1="110" x2="159" y2="172" class="radar-axis"></line>
              <line x1="110" y1="110" x2="61" y2="172" class="radar-axis"></line>
              <line x1="110" y1="110" x2="32" y2="82" class="radar-axis"></line>
              <polygon points="110,25 188,82 159,172 61,172 32,82" class="radar-grid"></polygon>
              <polygon points="110,46 171,90 146,160 74,160 49,90" class="radar-grid inner"></polygon>
              <polygon points="110,110 110,110 110,110 110,110 110,110" class="radar-value"></polygon>
              <text x="110" y="10" class="radar-label top">
                <tspan x="110" dy="0">AI视频</tspan>
                <tspan x="110" dy="10" class="radar-score">90</tspan>
              </text>
              <text x="206" y="72" class="radar-label right">
                <tspan x="206" dy="0">AI制图</tspan>
                <tspan x="206" dy="10" class="radar-score">86</tspan>
              </text>
              <text x="176" y="203" class="radar-label right">
                <tspan x="176" dy="0">市场推广</tspan>
                <tspan x="176" dy="10" class="radar-score">88</tspan>
              </text>
              <text x="44" y="203" class="radar-label left">
                <tspan x="44" dy="0">Agent工作流</tspan>
                <tspan x="44" dy="10" class="radar-score">94</tspan>
              </text>
              <text x="10" y="72" class="radar-label left">
                <tspan x="10" dy="0">AI网站搭建</tspan>
                <tspan x="10" dy="10" class="radar-score">85</tspan>
              </text>
            </svg>
          </div>
          <h3 class="stage-item stage-detail" style="margin-top:1rem;">专项技能：AI 智能体与超自动化架构</h3>
          <div class="grid" style="margin-top:0.8rem;">
            ${specialSkills
              .map(
                (item, idx) => `
              <article class="card stage-item stage-detail" style="--i:${idx};">
                <h3>${item.title}</h3>
                <p class="expandable-text">${item.text}</p>
              </article>
            `
              )
              .join("")}
          </div>
        </article>
        <article class="card stage-item stage-card" style="--i:1;">
          <h3 data-i18n="skills.toolbox">Toolbox</h3>
          <div class="tag-cloud skill-cloud stage-item stage-detail">
            ${skillList.map((s) => `<span>${s}</span>`).join("")}
          </div>
        </article>
      </div>
    </div>
  </section>`;
}

function experience() {
  const timeline = [
    {
      company: "PT. SHUNWEIXINGBANG Packaging Technology",
      role: "销售总监 (Sales Director)",
      period: "2025.02 - 2025.05",
      bullets: [
        "全职能本土化中心构建：主导印尼本土执行团队架构设计与人才池组建，覆盖财务合规、人力资源、战略销售等关键职能，通过本地化管理协议将团队留存率提升 30%。",
        "头部渠道战略准入：成功敲开印尼两大零售商（Indomaret、Alfamart）及顶级 F&B 品牌（KFC、Starbucks、霸王茶姬等）的供应链入口，确立首年 3,600 万元预期业绩规模。",
        "高标准风险管控：主导工厂选址尽职调查（DD），协同当地移民局与投资部，确保生产基地在复杂合规背景下快速启动。"
      ],
    },
    {
      company: "PT. JAYADINASTY",
      role: "总助 / 首席执行官助理 (Assistant to CEO)",
      period: "2024.05 - 2025.01",
      bullets: [
        "战略合伙人生态搭建：维护印尼总商会及主流媒体关系，通过高层对话促成多项全面合作协议，累计驱动产业园区招商引资额超 1,000 万元。",
        "数字品牌资产运营：统筹品牌出海视觉规范与自媒体矩阵策略，单月内容传播力突破 20,000+ 阅读量，粉丝转化率环比增长 300%。",
        "组织效能优化：重新定义外籍员工薪酬激励模型与财务报销流转体系，实现行政响应速度 40% 的提升。"
      ],
    },
    {
      company: "Redbired Limited HK",
      role: "首席执行官 (CEO)",
      period: "2019.10 - 2022.07",
      bullets: [
        "社交商业化探索：针对 TikTok 生态开发云控网络营销系统，通过数字化推广策略精准触达全球跨境电商客户群。",
        "流量变现矩阵：主导两款移动端轻量级游戏研运一体化流程，通过接入穿山甲广告及支付体系实现稳定盈利，上线即达首月 GMV 目标。",
        "Web3 社区治理：完成 NFT 数字艺术资产的智能合约部署与发行，构建横跨 Discord / Telegram 的高活跃度去中心化社区。"
      ],
    },
  ];
  return `
  <section id="experience" class="section reveal launch-flow">
    <div class="container">
      <h2 class="stage-item stage-title" data-i18n="experience.title">Experience</h2>
      <div class="timeline vertical-zigzag">
        ${timeline
          .map(
            (item, idx) => `
          <article class="timeline-item ${idx % 2 === 0 ? "left" : "right"} stage-item stage-card" style="--i:${idx};" data-timeline-item>
            <div class="time">${item.period}</div>
            <div class="timeline-dot"></div>
            <div class="card timeline-card">
              <h3>${item.role}</h3>
              <p class="muted">${item.company}</p>
              <ul>${item.bullets.map((b) => `<li class="expandable-text stage-item stage-detail">${b}</li>`).join("")}</ul>
            </div>
          </article>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

function projects() {
  const projectList = [
    ["AI Agent 自动化系统", "构建可复用工作流编排，实现多场景任务自动化。", "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80"],
    ["印尼产业园招商系统", "整合招商流程、线索管理与本地合规对接。", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80"],
    ["TikTok 营销云控系统", "提升多账号运营效率与投放协同能力。", "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=1400&q=80"],
    ["跨境商业自动化平台", "串联市场洞察、销售触达与运营复盘环节。", "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80"],
  ];
  return `
  <section id="projects" class="section reveal">
    <div class="container">
      <h2 data-i18n="projects.title">Projects</h2>
      <div class="grid cards-2 project-grid">
        ${projectList
          .map(
            ([title, text, image], idx) => `
          <article class="card project project-card" tabindex="0">
            <div class="project-media-wrap">
              <img class="project-media visual-media" src="${image}" alt="${title}" data-preview="${image}" loading="lazy" />
              <div class="project-media-overlay">
                <h3>${title}</h3>
              </div>
            </div>
            <h3>${title}</h3>
            <p>${text}</p>
            <button class="link-btn" data-modal="project-${idx}" data-i18n="projects.detail">查看详情 →</button>
          </article>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

function education() {
  return `
  <section id="education" class="section reveal">
    <div class="container">
      <h2 data-i18n="education.title">Education</h2>
      <article class="card edu-card">
        <div class="edu-head">
          <h3>浙江科技大学 | 本科</h3>
          <span class="edu-badge">Visual Communication Design</span>
        </div>
        <p>视觉传达设计</p>
        <div class="edu-grid">
          <section class="edu-panel">
            <h4>核心模块</h4>
            <p class="expandable-text">平面构成、用户界面（UI）、交互体验设计（UX）</p>
          </section>
          <section class="edu-panel">
            <h4>设计工具</h4>
            <p class="expandable-text">精通 Figma、Sketch、Adobe Creative Suite（PS / AI / ID）</p>
          </section>
        </div>
        <div class="tag-cloud"><span>UI</span><span>UX</span><span>Figma</span><span>Sketch</span><span>Adobe</span><span>Visual Design</span></div>
      </article>
    </div>
  </section>`;
}

function social() {
  const socials = [
    ["Email", "mailto:edwardliu.be@gmail.com"],
    ["LinkedIn", "https://www.linkedin.com/"],
    ["GitHub", "https://github.com/"],
    ["WeChat", "#contact"],
    ["Phone", "tel:+8618758127863"],
  ];
  return `
  <section id="social" class="section reveal">
    <div class="container">
      <h2 data-i18n="social.title">Social</h2>
      <div class="grid cards-5">
        ${socials.map(([name, url]) => `<a class="card hover-rise" href="${url}" target="_blank" rel="noreferrer">${name}</a>`).join("")}
      </div>
    </div>
  </section>`;
}

function contact() {
  return `
  <section id="contact" class="section reveal">
    <div class="container">
      <h2 data-i18n="contact.title">Contact</h2>
      <div class="grid two-col">
        <form id="contactForm" class="card contact-form">
          <label><span data-i18n="contact.name">Name</span><input required name="name" type="text" placeholder="Your name" data-i18n-placeholder="contact.namePh" /></label>
          <label><span data-i18n="contact.email">Email</span><input required name="email" type="email" placeholder="you@example.com" data-i18n-placeholder="contact.emailPh" /></label>
          <label><span data-i18n="contact.message">Message</span><textarea required name="message" rows="4" placeholder="Tell me about your project..." data-i18n-placeholder="contact.msgPh"></textarea></label>
          <button type="submit" class="btn btn-primary" data-i18n="contact.send">Send Message</button>
          <p class="muted form-tip" data-i18n="contact.tip">示例交互：提交后会触发本地确认提示，可接入 Formspree / 自建 API。</p>
        </form>
        <article class="card contact-actions">
          <a class="btn btn-ghost" href="mailto:edwardliu.be@gmail.com" data-i18n="contact.emailMe">Email Me</a>
          <button class="btn btn-soft" id="copyEmailBtn" type="button" data-i18n="contact.copyEmail">Copy Email</button>
          <a class="btn btn-primary" href="./assets/Edward-Liu-CV.pdf" download data-i18n="contact.download">Download CV</a>
          <p class="muted">edwardliu.be@gmail.com · 18758127863</p>
        </article>
      </div>
    </div>
  </section>`;
}
