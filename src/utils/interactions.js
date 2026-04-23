import { getCurrentLanguage } from "../i18n/index.js";

export function initInteractions() {
  initReveal();
  initSmoothScroll();
  initReadModeToggle();
  initContact();
  initProjectDetails();
  initParallaxOrbs();
  initCardTilt();
  initMagneticButtons();
  initActiveNav();
  initScrollProgress();
  initHeroSpotlight();
  initMediaLightbox();
  initHeroCarousel();
  initProjectGallery();
  initRadarChartAnimation();
  initTimelineFocus();
}

function initReveal() {
  if (prefersReducedMotion()) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
    return;
  }
  document.querySelectorAll(".reveal").forEach((el, idx) => {
    el.style.transitionDelay = `${Math.min(idx * 55, 280)}ms`;
  });
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    if (link.dataset.scrollBound) return;
    link.dataset.scrollBound = "1";
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initParallaxOrbs() {
  if (window.__parallaxBound || prefersReducedMotion()) return;
  window.__parallaxBound = true;
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY || 0;
      const orbA = document.querySelector(".orb-a");
      const orbB = document.querySelector(".orb-b");
      if (orbA) orbA.style.transform = `translate3d(0, ${y * 0.06}px, 0)`;
      if (orbB) orbB.style.transform = `translate3d(0, ${-y * 0.04}px, 0)`;
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initReadModeToggle() {
  const key = "profile-detail-expanded";
  const expanded = localStorage.getItem(key) === "1";
  document.body.classList.toggle("compact-mode", !expanded);
  syncReadModeSegment(expanded);

  document.querySelectorAll("[data-read-mode]").forEach((btn) => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = "1";
    btn.addEventListener("click", () => {
      const nextExpanded = btn.dataset.readMode === "full";
      document.body.classList.toggle("compact-mode", !nextExpanded);
      localStorage.setItem(key, nextExpanded ? "1" : "0");
      syncReadModeSegment(nextExpanded);
    });
  });
}

function syncReadModeSegment(expanded) {
  const compactBtn = document.querySelector('[data-read-mode="compact"]');
  const fullBtn = document.querySelector('[data-read-mode="full"]');
  if (!compactBtn || !fullBtn) return;

  const isEn = getCurrentLanguage() === "en";
  compactBtn.textContent = isEn ? "Speed Read" : "速读版";
  fullBtn.textContent = isEn ? "Full Profile" : "完整档案";

  compactBtn.classList.toggle("active", !expanded);
  fullBtn.classList.toggle("active", expanded);
  compactBtn.setAttribute("aria-selected", String(!expanded));
  fullBtn.setAttribute("aria-selected", String(expanded));
}

function initContact() {
  const form = document.querySelector("#contactForm");
  const copyBtn = document.querySelector("#copyEmailBtn");

  if (form && !form.dataset.bound) {
    form.dataset.bound = "1";
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const name = formData.get("name");
      const lang = getCurrentLanguage();
      const msg =
        lang === "en"
          ? `Thanks, ${name}. Message captured! You can wire this to Formspree/API next.`
          : `感谢你，${name}。留言已记录！你可以继续接入 Formspree 或后端 API。`;
      alert(msg);
      form.reset();
    });
  }

  if (copyBtn && !copyBtn.dataset.bound) {
    copyBtn.dataset.bound = "1";
    copyBtn.addEventListener("click", async () => {
      const email = "edwardliu.be@gmail.com";
      await navigator.clipboard.writeText(email);
      copyBtn.textContent = getCurrentLanguage() === "en" ? "Copied!" : "已复制";
      setTimeout(() => {
        copyBtn.textContent = getCurrentLanguage() === "en" ? "Copy Email" : "复制邮箱";
      }, 1200);
    });
  }
}

function initProjectDetails() {
  document.querySelectorAll("[data-modal]").forEach((btn) => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = "1";
    btn.addEventListener("click", () => {
      const card = btn.closest(".project");
      if (card) {
        card.classList.toggle("expanded");
        const zh = getCurrentLanguage() === "zh";
        btn.textContent = card.classList.contains("expanded")
          ? zh
            ? "收起详情 ↑"
            : "Collapse ↑"
          : zh
            ? "查看详情 →"
            : "View Details →";
      }
    });
  });
}

function initCardTilt() {
  if (prefersReducedMotion()) return;
  document.querySelectorAll(".card").forEach((card) => {
    if (card.dataset.tiltBound) return;
    card.dataset.tiltBound = "1";
    card.addEventListener("pointermove", (event) => {
      if (window.innerWidth < 900) return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${-y * 3.5}deg) rotateY(${x * 4.5}deg) translateY(-2px)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

function initMagneticButtons() {
  if (prefersReducedMotion()) return;
  document.querySelectorAll(".btn, .icon-btn, .segment-btn").forEach((btn) => {
    if (btn.dataset.magnetBound) return;
    btn.dataset.magnetBound = "1";
    btn.addEventListener("pointermove", (event) => {
      const rect = btn.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });
    btn.addEventListener("pointerleave", () => {
      btn.style.transform = "";
    });
  });
}

function initActiveNav() {
  const links = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (!links.length) return;
  const sectionMap = links
    .map((link) => [link, document.querySelector(link.getAttribute("href"))])
    .filter(([, section]) => section);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sectionMap.forEach(([link, section]) => {
          link.classList.toggle("active", section === entry.target);
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
  );
  sectionMap.forEach(([, section]) => observer.observe(section));
}

function initScrollProgress() {
  const bar = document.querySelector("#scrollProgress");
  if (!bar) return;
  const sections = Array.from(document.querySelectorAll("main .section"));
  if (!sections.length) return;

  let activeRatio = 0;
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const total = Math.max(sections.length - 1, 1);
          const idx = sections.indexOf(entry.target);
          const sectionRatio = Math.max(0, idx / total);
          activeRatio = Math.max(activeRatio, sectionRatio);
        }
      });
    },
    { threshold: 0.32, rootMargin: "-20% 0px -55% 0px" }
  );
  sections.forEach((section) => sectionObserver.observe(section));

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const h = document.documentElement;
      const max = h.scrollHeight - window.innerHeight;
      const raw = max > 0 ? window.scrollY / max : 0;
      const mixed = raw * 0.7 + activeRatio * 0.3;
      const ratio = Math.min(1, Math.max(0, mixed));
      bar.style.setProperty("--progress-scale", ratio.toFixed(4));
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initHeroSpotlight() {
  if (prefersReducedMotion()) return;
  if (window.innerWidth < 860) return;
  const hero = document.querySelector(".hero");
  if (!hero || hero.dataset.spotlightBound) return;
  hero.dataset.spotlightBound = "1";
  hero.classList.add("hero-spotlight");

  const onMove = (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    hero.style.setProperty("--spot-x", `${Math.max(0, Math.min(100, x)).toFixed(2)}%`);
    hero.style.setProperty("--spot-y", `${Math.max(0, Math.min(100, y)).toFixed(2)}%`);
  };

  hero.addEventListener("pointermove", onMove);
  hero.addEventListener("pointerleave", () => {
    hero.style.setProperty("--spot-x", "50%");
    hero.style.setProperty("--spot-y", "50%");
  });
}

function initMediaLightbox() {
  const lightbox = document.querySelector("#mediaLightbox");
  const image = document.querySelector("#lightboxImage");
  const close = document.querySelector("#lightboxClose");
  if (!lightbox || !image || !close) return;

  if (!document.body.dataset.lightboxBound) {
    document.body.dataset.lightboxBound = "1";
    document.body.addEventListener("click", (event) => {
      const target = event.target.closest(".visual-media[data-preview]");
      if (!target) return;
      image.src = target.dataset.preview;
      image.alt = target.alt || "Visual preview";
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
    });
  }

  if (!close.dataset.bound) {
    close.dataset.bound = "1";
    close.addEventListener("click", hideLightbox);
  }
  if (!lightbox.dataset.bound) {
    lightbox.dataset.bound = "1";
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) hideLightbox();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") hideLightbox();
    });
  }

  function hideLightbox() {
    lightbox.hidden = true;
    image.src = "";
    document.body.style.overflow = "";
  }
}

function initHeroCarousel() {
  const root = document.querySelector("#heroCarousel");
  if (!root) return;
  const slides = Array.from(root.querySelectorAll(".hero-slide"));
  const prev = root.querySelector('[data-hero-nav="prev"]');
  const next = root.querySelector('[data-hero-nav="next"]');
  const toggle = root.querySelector("[data-hero-toggle]");
  const dots = Array.from(root.querySelectorAll("[data-hero-dot]"));
  const progress = root.querySelector("#heroCarouselProgress");
  const currentLabel = root.querySelector("#heroCurrentIndex");
  const totalLabel = root.querySelector("#heroTotalCount");
  if (!slides.length) return;

  const reduced = prefersReducedMotion() || window.innerWidth < 640;
  let current = 0;
  let playing = !reduced;
  let timer = null;
  let progressTimer = null;
  const duration = 4200;

  const sync = () => {
    slides.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === current);
    });
    dots.forEach((dot, idx) => dot.classList.toggle("active", idx === current));
    if (currentLabel) currentLabel.textContent = String(current + 1).padStart(2, "0");
    if (totalLabel) totalLabel.textContent = String(slides.length).padStart(2, "0");
    if (toggle) toggle.textContent = playing ? "Pause" : "Play";
    if (progress) progress.style.transform = "scaleX(0)";
  };

  const go = (delta) => {
    current = (current + delta + slides.length) % slides.length;
    sync();
  };

  const start = () => {
    if (!playing || reduced) return;
    stop();
    timer = setInterval(() => {
      go(1);
      animateProgress();
    }, duration);
    animateProgress();
  };
  const stop = () => {
    if (timer) clearInterval(timer);
    if (progressTimer) clearTimeout(progressTimer);
    timer = null;
    progressTimer = null;
  };

  const animateProgress = () => {
    if (!progress) return;
    progress.style.transition = "none";
    progress.style.transform = "scaleX(0)";
    progressTimer = setTimeout(() => {
      progress.style.transition = `transform ${duration - 120}ms linear`;
      progress.style.transform = "scaleX(1)";
    }, 24);
  };

  prev?.addEventListener("click", () => {
    go(-1);
    start();
  });
  next?.addEventListener("click", () => {
    go(1);
    start();
  });
  toggle?.addEventListener("click", () => {
    playing = !playing;
    sync();
    if (playing) start();
    else stop();
  });
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      current = Number(dot.dataset.heroDot || 0);
      sync();
      start();
    });
  });

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  sync();
  start();
}

function initProjectGallery() {
  const gallery = document.querySelector("#projectGallery");
  if (!gallery) return;
  const prev = document.querySelector('[data-gallery-nav="prev"]');
  const next = document.querySelector('[data-gallery-nav="next"]');
  const toggle = document.querySelector("#galleryPlayToggle");
  const scrollByCard = () => Math.max(300, gallery.clientWidth * 0.68);
  const reduced = prefersReducedMotion() || window.innerWidth < 760;
  let playing = !reduced;
  let autoplay = null;
  let isPointerDown = false;
  let startX = 0;
  let scrollStart = 0;
  let velocity = 0;
  let rafId = null;
  let lastX = 0;
  let lastT = 0;

  prev?.addEventListener("click", () => {
    gallery.scrollBy({ left: -scrollByCard(), behavior: "smooth" });
  });
  next?.addEventListener("click", () => {
    gallery.scrollBy({ left: scrollByCard(), behavior: "smooth" });
  });

  const step = () => {
    const nextLeft = gallery.scrollLeft + scrollByCard() * 0.55;
    if (nextLeft >= gallery.scrollWidth - gallery.clientWidth - 4) {
      gallery.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      gallery.scrollBy({ left: scrollByCard() * 0.55, behavior: "smooth" });
    }
  };
  const updateCentered = () => {
    const cards = Array.from(gallery.querySelectorAll(".gallery-card"));
    const center = gallery.scrollLeft + gallery.clientWidth / 2;
    let best = null;
    let bestDist = Number.POSITIVE_INFINITY;
    cards.forEach((card) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const dist = Math.abs(center - cardCenter);
      if (dist < bestDist) {
        bestDist = dist;
        best = card;
      }
      card.classList.remove("is-centered");
    });
    if (best) best.classList.add("is-centered");
  };
  const start = () => {
    if (!playing || reduced) return;
    stop();
    autoplay = setInterval(step, 3000);
  };
  const stop = () => {
    if (autoplay) clearInterval(autoplay);
    autoplay = null;
  };

  const onPointerDown = (event) => {
    isPointerDown = true;
    gallery.classList.add("dragging");
    startX = event.clientX;
    scrollStart = gallery.scrollLeft;
    velocity = 0;
    lastX = event.clientX;
    lastT = performance.now();
    stop();
    if (rafId) cancelAnimationFrame(rafId);
    gallery.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event) => {
    if (!isPointerDown) return;
    const dx = event.clientX - startX;
    gallery.scrollLeft = scrollStart - dx;
    const now = performance.now();
    const dt = Math.max(1, now - lastT);
    velocity = (event.clientX - lastX) / dt;
    lastX = event.clientX;
    lastT = now;
  };
  const onPointerUp = (event) => {
    if (!isPointerDown) return;
    isPointerDown = false;
    gallery.classList.remove("dragging");
    gallery.releasePointerCapture(event.pointerId);
    const decay = () => {
      if (Math.abs(velocity) < 0.01) {
        rafId = null;
        start();
        return;
      }
      gallery.scrollLeft -= velocity * 18;
      velocity *= 0.94;
      rafId = requestAnimationFrame(decay);
    };
    rafId = requestAnimationFrame(decay);
  };

  toggle?.addEventListener("click", () => {
    playing = !playing;
    toggle.textContent = playing ? "Pause" : "Play";
    if (playing) start();
    else stop();
  });
  gallery.addEventListener("pointerdown", onPointerDown);
  gallery.addEventListener("pointermove", onPointerMove);
  gallery.addEventListener("pointerup", onPointerUp);
  gallery.addEventListener("pointercancel", onPointerUp);
  gallery.addEventListener("scroll", updateCentered, { passive: true });
  gallery.addEventListener("mouseenter", stop);
  gallery.addEventListener("mouseleave", start);
  updateCentered();
  start();
}

function initRadarChartAnimation() {
  const blocks = document.querySelectorAll(".radar-wrap[data-radar-values]");
  if (!blocks.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateRadar(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );
  blocks.forEach((block) => observer.observe(block));
}

function animateRadar(block) {
  const polygon = block.querySelector(".radar-value");
  if (!polygon) return;
  block.classList.add("is-animated");
  const values = (block.dataset.radarValues || "")
    .split(",")
    .map((v) => Number(v.trim()))
    .filter((v) => Number.isFinite(v));
  if (values.length !== 5) return;

  const center = { x: 110, y: 110 };
  const angles = [-90, -18, 54, 126, 198];
  const target = values.map((score, idx) => {
    const radius = (score / 100) * 82;
    const rad = (angles[idx] * Math.PI) / 180;
    return { x: center.x + Math.cos(rad) * radius, y: center.y + Math.sin(rad) * radius };
  });

  const duration = prefersReducedMotion() ? 0 : 850;
  const startAt = performance.now();
  const tick = (now) => {
    const t = duration <= 0 ? 1 : Math.min(1, (now - startAt) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const points = target
      .map((p) => `${center.x + (p.x - center.x) * eased},${center.y + (p.y - center.y) * eased}`)
      .join(" ");
    polygon.setAttribute("points", points);
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function initTimelineFocus() {
  const items = document.querySelectorAll("[data-timeline-item]");
  if (!items.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-active", entry.isIntersecting);
      });
    },
    { threshold: 0.35, rootMargin: "-18% 0px -36% 0px" }
  );
  items.forEach((item) => observer.observe(item));
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
