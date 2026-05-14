const enhanceSiteBrand = () => {
  const container = document.querySelector(".navbar-brand-container");
  if (!container || container.dataset.brandReady === "true") return;

  const fallbackLink = container.querySelector(".navbar-brand[href]");
  const fallbackLogo = container.querySelector(".navbar-logo");
  const homeHref = fallbackLink?.getAttribute("href") || "./index.html";
  const logoSrc = fallbackLogo?.getAttribute("src") || "./assets/brand/logo-mark-inverse.svg";
  const assetPrefix = logoSrc.replace(/[^/]+$/, "");

  const brand = document.createElement("a");
  brand.className = "site-brand";
  brand.href = homeHref;
  brand.setAttribute("aria-label", "极客时间 AI 数据工程实战营");
  brand.innerHTML = `
    <span class="site-brand__mark" aria-hidden="true">
      <img src="${assetPrefix}logo-mark-inverse.svg" alt="" class="site-brand__mark-asset light-content">
      <img src="${assetPrefix}logo-mark.svg" alt="" class="site-brand__mark-asset dark-content">
    </span>
    <span class="site-brand__text">
      <span class="site-brand__title site-brand__title--full">AI 数据工程实战营</span>
      <span class="site-brand__title site-brand__title--compact">AI 数据工程</span>
      <span class="site-brand__meta">GeekTime · 企业 AI 交付蓝图</span>
    </span>
  `;

  container.textContent = "";
  container.dataset.brandReady = "true";
  container.classList.add("site-brand-container");
  container.appendChild(brand);
};

const COURSE_CODEBLOCK_SELECTOR = [
  ".week02-lesson-page .code-copy-outer-scaffold",
  ".week02-lab-page .code-copy-outer-scaffold",
  ".week02-assignment-page .code-copy-outer-scaffold",
  ".week03-lesson-page .code-copy-outer-scaffold",
  ".week03-lab-page .code-copy-outer-scaffold",
  ".week03-assignment-page .code-copy-outer-scaffold",
  ".week04-lesson-page .code-copy-outer-scaffold",
  ".week04-lab-page .code-copy-outer-scaffold",
  ".week04-assignment-page .code-copy-outer-scaffold",
  ".week05-lesson-page .code-copy-outer-scaffold",
  ".week05-lab-page .code-copy-outer-scaffold",
  ".week05-assignment-page .code-copy-outer-scaffold",
  ".week06-lesson-page .code-copy-outer-scaffold",
  ".week06-lab-page .code-copy-outer-scaffold",
  ".week06-assignment-page .code-copy-outer-scaffold",
  ".week07-lesson-page .code-copy-outer-scaffold",
  ".week07-lab-page .code-copy-outer-scaffold",
  ".week07-assignment-page .code-copy-outer-scaffold"
].join(", ");
const CODEBLOCK_FILENAME_CANDIDATES = [
  "source_manifest_schema.json",
  "sample_records.json",
  "manifest_week02_practice_v1.json",
  "submission_readme.md",
  "lab_report_v1.md",
  "asset_inventory_v1.csv",
  "ingest_strategy_v1.md",
  "ingestion_baseline_v1.md",
  "batch_ingestion_design_v1.md",
  "incremental_ingest_strategy_v1.md",
  "checkpoint_state_v1.md",
  "asset_flow_plan_v1.md",
  "replay_backfill_strategy_v1.md",
  "ingestion_runbook_v1.md",
  "week03_delivery_summary.md",
  "lab_observation_log.md",
  "lab_execution_summary.md",
  "recovery_decision_log.md",
  "late_arrival_decision_table.csv",
  "manifest_tickets_synthetic_v1.json",
  "manifest_workspace_helpcenter_v1.json",
  "manifest_edge_gateway_pdf_v1.json"
];
const CODEBLOCK_FILENAME_HINTS = [
  { pattern: /#\s*batch_ingestion_design_v1\b/i, filename: "batch_ingestion_design_v1.md" },
  { pattern: /#\s*incremental ingest strategy v1\b/i, filename: "incremental_ingest_strategy_v1.md" },
  { pattern: /#\s*checkpoint state v1\b/i, filename: "checkpoint_state_v1.md" },
  { pattern: /#\s*ingestion_baseline_v1\b/i, filename: "ingestion_baseline_v1.md" },
  { pattern: /week03_delivery_summary\b/i, filename: "week03_delivery_summary.md" },
  { pattern: /lab_execution_summary\b/i, filename: "lab_execution_summary.md" },
  { pattern: /lab_observation_log\b/i, filename: "lab_observation_log.md" },
  { pattern: /recovery_decision_log\b/i, filename: "recovery_decision_log.md" },
  { pattern: /scenario,\s*detected_by,\s*default_action/i, filename: "late_arrival_decision_table.csv" }
];

const prettifyCodeLanguage = (lang) => {
  const labelMap = {
    bash: "Bash",
    shell: "Shell",
    sh: "Shell",
    zsh: "Shell",
    json: "JSON",
    yaml: "YAML",
    yml: "YAML",
    toml: "TOML",
    ini: "INI",
    text: "Text",
    txt: "Text",
    markdown: "Markdown",
    md: "Markdown",
    csv: "CSV"
  };

  if (!lang) return "Code";
  return labelMap[lang] || lang.charAt(0).toUpperCase() + lang.slice(1);
};

const detectCodeLanguage = (scaffold) => {
  const tokenSource = [
    scaffold.className,
    scaffold.querySelector("pre")?.className || "",
    scaffold.querySelector("code")?.className || ""
  ]
    .join(" ")
    .toLowerCase();

  const candidates = ["bash", "shell", "sh", "zsh", "json", "yaml", "yml", "toml", "ini", "markdown", "md", "csv", "text", "txt"];
  return candidates.find((candidate) => new RegExp(`(^|\\s)${candidate}(\\s|$)`).test(tokenSource)) || "";
};

const inferCodeFilename = (textContent) => {
  const matches = CODEBLOCK_FILENAME_CANDIDATES.filter((name) => textContent.includes(name));
  if (matches.length === 1) return matches[0];

  const hintedFilename = CODEBLOCK_FILENAME_HINTS.find(({ pattern }) => pattern.test(textContent));
  return hintedFilename?.filename || "";
};

const classifyCodeVariant = (lang) => {
  if (["bash", "shell", "sh", "zsh"].includes(lang)) return "terminal";
  if (["json", "yaml", "yml", "toml", "ini"].includes(lang)) return "config";
  if (["markdown", "md", "csv", "text", "txt"].includes(lang)) return "template";
  return "config";
};

const isCodeAnnotation = (el) => {
  if (!el?.classList) return false;
  return Array.from(el.classList).some((className) => className.startsWith("code-annotation-"));
};

const extractCodeTextFromScaffold = (scaffold) => {
  const scaffoldClone = scaffold.cloneNode(true);
  const codeEl = scaffoldClone.querySelector("code");
  if (!codeEl) return "";

  for (const childEl of Array.from(codeEl.children)) {
    if (isCodeAnnotation(childEl)) {
      childEl.remove();
    }
  }

  return codeEl.innerText;
};

const copyText = async (text) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "fixed";
  helper.style.top = "-9999px";
  helper.style.left = "-9999px";
  document.body.appendChild(helper);
  helper.select();
  document.execCommand("copy");
  helper.remove();
};

const flashCopySuccess = (button) => {
  button.blur();
  button.classList.add("code-copy-button-checked");
  window.setTimeout(() => {
    button.classList.remove("code-copy-button-checked");
  }, 1000);
};

const ensureCopyButtonLabel = (button) => {
  let label = button.querySelector(".code-copy-button__label");
  if (!label) {
    button.replaceChildren();
    label = document.createElement("span");
    label.className = "code-copy-button__label";
    button.appendChild(label);
  }

  const syncState = () => {
    const copied = button.classList.contains("code-copy-button-checked");
    const text = copied ? "已复制" : "复制代码";
    button.setAttribute("title", text);
    button.setAttribute("aria-label", text);
    label.textContent = text;
  };

  if (button.dataset.copyObserverReady !== "true") {
    const observer = new MutationObserver(syncState);
    observer.observe(button, { attributes: true, attributeFilter: ["class"] });
    button.addEventListener("click", () => {
      window.setTimeout(syncState, 50);
    });
    button.dataset.copyObserverReady = "true";
  }

  syncState();
};

const attachEnhancedCopyHandler = (button, scaffold) => {
  if (button.dataset.courseCopyReady === "true") return;
  button.dataset.courseCopyReady = "true";
  button.type = "button";

  button.addEventListener(
    "click",
    async (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      const text = extractCodeTextFromScaffold(scaffold);
      if (!text) return;

      try {
        await copyText(text);
        flashCopySuccess(button);
      } catch (error) {
        console.error("Course code copy failed", error);
      }
    },
    true
  );
};

const enhanceCourseCodeBlocks = () => {
  const scaffolds = document.querySelectorAll(COURSE_CODEBLOCK_SELECTOR);
  scaffolds.forEach((scaffold) => {
    if (scaffold.dataset.codeShellReady === "true") return;
    scaffold.dataset.codeShellReady = "true";

    const authoringShell = scaffold.parentElement?.classList.contains("code-shell")
      ? scaffold.parentElement
      : scaffold.closest(".code-shell");
    const codeText = scaffold.querySelector("code")?.textContent || "";
    const lang = (authoringShell?.dataset.codeLang || detectCodeLanguage(scaffold) || "").toLowerCase();
    const variant = authoringShell?.dataset.codeKind || classifyCodeVariant(lang);
    const filename = authoringShell?.dataset.codeFilename || inferCodeFilename(codeText);

    scaffold.classList.add("code-shell", `is-${variant}`);
    if (lang) scaffold.dataset.codeLang = lang;
    if (filename) scaffold.dataset.codeFilename = filename;

    let toolbar = scaffold.querySelector(":scope > .code-block-toolbar");
    if (!toolbar) {
      toolbar = document.createElement("div");
      toolbar.className = "code-block-toolbar";

      const meta = document.createElement("div");
      meta.className = "code-block-meta";

      const badge = document.createElement("span");
      badge.className = "code-lang-badge";
      badge.textContent = prettifyCodeLanguage(lang);
      meta.appendChild(badge);

      if (filename) {
        const filenameNode = document.createElement("span");
        filenameNode.className = "code-filename";
        filenameNode.textContent = filename;
        meta.appendChild(filenameNode);
      }

      const actions = document.createElement("div");
      actions.className = "code-block-actions";

      toolbar.append(meta, actions);
      scaffold.insertBefore(toolbar, scaffold.firstChild);
    }

    const copyButton = scaffold.querySelector(":scope > .code-copy-button");
    if (copyButton) {
      const actions = toolbar.querySelector(".code-block-actions");
      if (actions && copyButton.parentElement !== actions) {
        actions.appendChild(copyButton);
      }
      ensureCopyButtonLabel(copyButton);
      attachEnhancedCopyHandler(copyButton, scaffold);
    }
  });
};

const initCourseUi = () => {
  const body = document.body;
  if (!body || body.dataset.courseUiReady === "true") return;
  body.dataset.courseUiReady = "true";
  enhanceSiteBrand();
  enhanceCourseCodeBlocks();
  const main = document.querySelector("main.content");
  const sidebar = document.querySelector("#quarto-sidebar");

  const enhanceSidebar = () => {
    if (!sidebar) return;

    sidebar.classList.add("course-nav-ready");

    const splitLabel = (text) => {
      const parts = text.split("｜");
      if (parts.length < 2) {
        return { kicker: "", title: text.trim() };
      }

      return {
        kicker: parts[0].trim(),
        title: parts.slice(1).join("｜").trim()
      };
    };

    const renderLabel = (node, type) => {
      const textNode = node.querySelector(".menu-text");
      if (!textNode || textNode.dataset.enhanced === "true") return;

      const { kicker, title } = splitLabel(textNode.textContent || "");
      if (!kicker) return;

      const wrapper = document.createElement("span");
      wrapper.className = `${type}-label`;

      const kickerSpan = document.createElement("span");
      kickerSpan.className = `${type}-kicker`;
      kickerSpan.textContent = kicker;

      const titleSpan = document.createElement("span");
      titleSpan.className = `${type}-title`;
      titleSpan.textContent = title;

      wrapper.append(kickerSpan, titleSpan);
      textNode.textContent = "";
      textNode.appendChild(wrapper);
      textNode.dataset.enhanced = "true";
    };

    const sections = sidebar.querySelectorAll(".sidebar-item.sidebar-item-section");
    sections.forEach((section) => {
      const headerLink = section.querySelector(":scope > .sidebar-item-container .sidebar-link, :scope > .sidebar-link");
      const toggle = section.querySelector(":scope > .sidebar-item-container .sidebar-item-toggle");
      const lessons = section.querySelectorAll(":scope > ul.sidebar-section > .sidebar-item .sidebar-link");

      if (headerLink) {
        renderLabel(headerLink, "week");
      }

      if (lessons.length) {
        section.classList.add("has-lessons");
      }

      lessons.forEach((lessonLink, index) => {
        renderLabel(lessonLink, "lesson");
        lessonLink.style.setProperty("--lesson-order", `${index}`);
      });

      const activeLesson = section.querySelector(".sidebar-section .sidebar-link.active");
      if (activeLesson) {
        section.classList.add("is-current-branch");
      }

      if (toggle) {
        const icon = toggle.querySelector("i");
        if (icon) {
          icon.classList.add("nav-chevron");
        }
      }
    });

    const activeLink = sidebar.querySelector(".sidebar-link.active");
    if (activeLink) {
      window.requestAnimationFrame(() => {
        activeLink.scrollIntoView({ block: "nearest", inline: "nearest" });
      });
    }
  };

  enhanceSidebar();
  if (!main) return;

  const progress = document.createElement("div");
  progress.className = "reading-progress";
  progress.innerHTML = '<span class="reading-progress-bar"></span>';
  body.appendChild(progress);

  const dock = document.createElement("div");
  dock.className = "action-dock";
  dock.innerHTML = `
    <button type="button" class="dock-btn" data-action="toc" aria-label="跳转本页导航">目录</button>
    <button type="button" class="dock-btn" data-action="reading" aria-label="切换阅读模式">阅读</button>
    <button type="button" class="dock-btn" data-action="top" aria-label="返回顶部">顶部</button>
  `;
  body.appendChild(dock);

  const progressBar = progress.querySelector(".reading-progress-bar");
  const toc = document.querySelector("#TOC");
  const topButton = dock.querySelector('[data-action="top"]');
  const tocButton = dock.querySelector('[data-action="toc"]');
  const readingButton = dock.querySelector('[data-action="reading"]');
  const handoutSource = document.querySelector(".lesson-handout-card[data-handout]");
  if (handoutSource) {
    body.classList.add("handout-enhanced");
    const pdf = handoutSource.dataset.pdf || "";
    const docx = handoutSource.dataset.docx || "";

    const renderHandoutLinks = () => `
      <div class="handout-card-title">下载讲义</div>
      <p class="handout-card-copy">提供适合离线阅读的 PDF 版和适合批注整理的 Word 版。</p>
      <div class="handout-link-list">
        <a class="handout-link" href="${pdf}" download>
          <span class="handout-link-title">PDF 版</span>
          <span class="handout-link-meta">打印 / 离线阅读</span>
        </a>
        <a class="handout-link" href="${docx}" download>
          <span class="handout-link-title">Word 版</span>
          <span class="handout-link-meta">批注 / 二次整理</span>
        </a>
      </div>
    `;

    const marginSidebar = document.querySelector("#quarto-margin-sidebar");
    if (marginSidebar) {
      const sidebarCard = document.createElement("section");
      sidebarCard.className = "handout-sidebar-card margin-sidebar-item";
      sidebarCard.innerHTML = renderHandoutLinks();

      const tocCard = marginSidebar.querySelector("#TOC");
      if (tocCard) {
        marginSidebar.insertBefore(sidebarCard, tocCard);
      } else {
        marginSidebar.appendChild(sidebarCard);
      }
    }

    const handoutButton = document.createElement("button");
    handoutButton.type = "button";
    handoutButton.className = "dock-btn handout-dock-btn";
    handoutButton.dataset.action = "handout";
    handoutButton.setAttribute("aria-label", "打开下载讲义面板");
    handoutButton.textContent = "下载";
    dock.insertBefore(handoutButton, readingButton);

    const handoutSheet = document.createElement("section");
    handoutSheet.className = "handout-sheet";
    handoutSheet.setAttribute("aria-hidden", "true");
    handoutSheet.innerHTML = `
      <div class="handout-sheet-panel">
        ${renderHandoutLinks()}
      </div>
    `;
    body.appendChild(handoutSheet);

    const closeHandoutSheet = () => {
      handoutSheet.classList.remove("is-open");
      handoutSheet.setAttribute("aria-hidden", "true");
      handoutButton.classList.remove("is-active");
    };

    const toggleHandoutSheet = () => {
      const willOpen = !handoutSheet.classList.contains("is-open");
      if (willOpen) {
        handoutSheet.classList.add("is-open");
        handoutSheet.setAttribute("aria-hidden", "false");
        handoutButton.classList.add("is-active");
      } else {
        closeHandoutSheet();
      }
    };

    handoutButton.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleHandoutSheet();
    });

    handoutSheet.addEventListener("click", (event) => {
      if (event.target === handoutSheet) {
        closeHandoutSheet();
      }
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (!handoutSheet.contains(target) && !handoutButton.contains(target)) {
        closeHandoutSheet();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeHandoutSheet();
      }
    });
  }

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const viewport = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight - viewport;
    const ratio = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
    progressBar.style.transform = `scaleX(${ratio})`;
    topButton.classList.toggle("is-visible", scrollTop > 320);
  };

  topButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  tocButton.addEventListener("click", () => {
    if (toc) {
      toc.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  readingButton.addEventListener("click", () => {
    body.classList.toggle("reading-mode");
    readingButton.classList.toggle("is-active", body.classList.contains("reading-mode"));
  });

  const longSections = main.querySelectorAll("section.level2");
  longSections.forEach((section) => {
    const heading = section.querySelector(":scope > h2");
    if (!heading) return;
    heading.classList.add("section-heading");
  });

  const voiceoverSection = Array.from(longSections).find((section) => {
    const heading = section.querySelector(":scope > h2");
    return heading && heading.textContent.trim() === "逐段口播稿";
  });

  if (voiceoverSection) {
    const heading = voiceoverSection.querySelector(":scope > h2");
    if (heading) {
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "section-toggle";
      toggle.textContent = "折叠";
      heading.appendChild(toggle);
      voiceoverSection.classList.add("is-expandable");

      toggle.addEventListener("click", () => {
        voiceoverSection.classList.toggle("is-collapsed");
        toggle.textContent = voiceoverSection.classList.contains("is-collapsed") ? "展开" : "折叠";
      });
    }
  }
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCourseUi, { once: true });
} else {
  initCourseUi();
}
