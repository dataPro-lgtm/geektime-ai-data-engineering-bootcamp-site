(function () {
  const LESSON_TITLES = {
    1: "输入风险判断",
    2: "对象建模与资产盘点",
    3: "运行时 Metadata 与 PII",
    4: "Data Contract 工程门禁",
    5: "Manifest 与 Ingest Admission"
  };

  const SLIDE_TITLE_MAP = {
    w2l1_propagation: "输入问题如何穿透到 RAG、Tool、Audit",
    w2l1_risk_hero: "开场定调：高自信地错",
    w2l1_demo_vs_prod: "Demo 思维 vs 生产思维",
    w2l1_three_lines: "三条底线：真假、证据、边界",
    w2l1_silent_failures: "三种静默失败",
    w2l1_incident_a: "事故复盘 A：语义漂移",
    w2l1_incident_b: "事故复盘 B：证据链断裂",
    w2l1_decision_board: "先修 Prompt 还是先修输入",
    w2l1_industry_signals: "行业新信号",
    w2l1_transition_demo: "进入仓库前，只验证三件事",
    w2l1_demo_summary: "把本地动作翻译回工程判断",
    w2l2_judgement: "开场判断：盘点不是列目录",
    w2l2_bridge: "从风险判断进入对象建模",
    w2l2_object_model: "先把三层对象分清",
    w2l2_antipatterns: "盘点最容易失败的 3 种假动作",
    w2l2_document_asset: "Document 资产最常见的误判",
    w2l2_audio_asset: "Audio 资产最常见的误判",
    w2l2_video_asset: "Video 资产最常见的误判",
    w2l3_judgement: "开场判断：这节课在定义系统接口",
    w2l3_bridge: "从课时2接过来：先立运行时上下文",
    w2l3_bad_samples: "坏样本为什么会让系统动作失效",
    w2l3_signals: "行业信号：这已经是企业 AI 工程现实",
    w2l4_judgement: "开场判断：Contract 是 gate",
    w2l4_position: "这讲在 Week02 的工程位置",
    w2l4_objects_table: "先把 4 个对象彻底分开",
    w2l4_schema_demo: "为什么 JSON Schema 不等于 Contract",
    w2l4_schema_prod: "Production 思维：Contract 是 admission gate",
    w2l4_layers_figure: "一份可执行的 Contract 至少有 5 层",
    w2l4_layers_table: "这 5 层各自守什么门",
    w2l4_ticket_what: "先看 ticket_contract 最该盯什么",
    w2l4_ticket_guard: "ticket_contract 真正在守什么资格",
    w2l4_doc_what: "先看 doc_asset_contract 最该盯什么",
    w2l4_doc_guard: "doc_asset_contract 最危险的地方",
    w2l4_compatibility_cases: "兼容性里最值得讲透的案例",
    w2l4_evolution_cards: "evolution 真正增加了什么要求",
    w2l4_contract_tests_cards: "contract tests 到底在验证什么",
    w2l4_signals: "行业信号：Contract 正在靠近 admission",
    w2l5_judgement: "开场判断：让 Contract 开始驱动 admission",
    w2l5_position: "这讲在 Week02 的位置",
    w2l5_overview_map: "先看 Week02 的准入链总图",
    w2l5_manifest_intent: "Manifest 不是清单，而是运行时意图",
    w2l5_manifest_structured: "结构化 source 的最小 manifest",
    w2l5_dry_run_table: "dry-run 结果到底给 Week03 留下了什么",
    w2l5_boundary: "为什么 Week02 只做到这里",
    w2l5_signals: "行业信号：Manifest 与 Run Evidence 正在连起来",
    w2l3_bad_samples_a: "坏样本收口：缺的不是内容，而是运行时上下文",
    w2l4_reminders: "本课收束",
    w2l5_reminders: "本课收束",
    w2l2_reminders: "本课收束",
    w2l1_next: "进入课时2：开始定义输入对象",
    w2l2_next: "进入课时3：开始统一运行时上下文",
    w2l3_next: "进入课时4：开始把规则写成门禁",
    w2l4_next: "进入课时5：开始进入运行时准入",
    w2l5_next: "进入 Week03：准入规则开始驱动采集链"
  };

  const HERO_TITLE_MAP = {
    w2l1_cover: "为什么输入问题会先于模型问题摧毁系统",
    w2l2_cover: "从资源目录到输入地图",
    w2l3_cover: "多模态 Metadata 与 PII 分级",
    w2l4_cover: "把 Data Contract 做成工程门禁",
    w2l5_cover: "Manifest 与 Week03 起跑线"
  };

  const TEACHER_NOTE_TITLES = new Set([
    "这页最关键的一句",
    "讲这一屏时最该落住的点",
    "这页真正要立住什么",
    "这页最该讲透的 3 句",
    "这页先立住"
  ]);

  const TABLE_HEADER_MAP = {
    "最关键提醒": "关键边界",
    "最容易被误会成什么": "常见误解"
  };

  const COVER_KICKER = {
    1: "Week02 · Lesson 01",
    2: "Week02 · Lesson 02",
    3: "Week02 · Lesson 03",
    4: "Week02 · Lesson 04",
    5: "Week02 · Lesson 05"
  };

  const normalizeIdKey = (value) => (value || "").replace(/-/g, "_");

  const inWeek02LessonLive = () =>
    /\/weeks\/week02\/lesson0[1-5]-live\.html$/.test(window.location.pathname);

  const resolveLiveMode = () => {
    const params = new URLSearchParams(window.location.search);
    const presenter = (params.get("presenter") || "").toLowerCase();
    const mode = (params.get("mode") || "").toLowerCase();
    if (mode === "presenter" || presenter === "1" || presenter === "true") return "presenter";
    if (mode === "viewer" || mode === "obs") return "viewer";
    return "presenter";
  };

  const parseLessonIndex = () => {
    const match = window.location.pathname.match(/lesson0?([1-5])-live\.html$/);
    return match ? Number(match[1]) : 0;
  };

  const parseActConfig = () => {
    const node = document.getElementById("teacher-live-act-config");
    if (!node) {
      return { eyebrow: "Week02 教师录屏版", acts: [] };
    }

    try {
      const payload = JSON.parse(node.textContent || "{}");
      return {
        eyebrow: payload.eyebrow || "Week02 教师录屏版",
        acts: Array.isArray(payload.acts) ? payload.acts : []
      };
    } catch (error) {
      console.warn("Failed to parse Week02 live config", error);
      return { eyebrow: "Week02 教师录屏版", acts: [] };
    }
  };

  const normalizeActs = (acts) =>
    acts.map((act, index) => ({
      key: act.key || `act-${index + 1}`,
      label: act.label || `幕 ${index + 1}`,
      target: act.target || (Array.isArray(act.match) && act.match[0]) || `slide-${index + 1}`,
      match: Array.isArray(act.match) && act.match.length ? act.match : [act.target || `slide-${index + 1}`]
    }));

  const getSlides = () =>
    window.Reveal?.getSlides?.() ||
    Array.from(document.querySelectorAll(".slides section")).filter((slide) => !slide.classList.contains("stack"));

  const getCurrentSlide = () =>
    window.Reveal?.getCurrentSlide?.() ||
    document.querySelector(".slides section.present") ||
    getSlides()[0];

  const findAct = (acts, slide) => {
    const id = slide?.id || "";
    return acts.find((act) => act.match.includes(id)) || acts[0] || null;
  };

  const findNoteHost = (slide) => {
    let notes = slide.querySelector("aside.notes");
    if (!notes) {
      notes = document.createElement("aside");
      notes.className = "notes";
      slide.appendChild(notes);
    }
    return notes;
  };

  const appendNote = (slide, label, content) => {
    const notes = findNoteHost(slide);
    const wrapper = document.createElement("div");
    if (label) {
      const title = document.createElement("p");
      title.innerHTML = `<strong>${label}</strong>`;
      wrapper.appendChild(title);
    }

    if (typeof content === "string") {
      const block = document.createElement("div");
      block.innerHTML = content;
      wrapper.appendChild(block);
    } else if (content instanceof Node) {
      wrapper.appendChild(content);
    }

    notes.appendChild(wrapper);
  };

  const promoteTeacherNotes = (slide) => {
    slide.querySelectorAll(".hero-note").forEach((node) => {
      appendNote(slide, "录制提示", node.innerHTML);
      node.remove();
    });

    slide.querySelectorAll(".teacher-card-title").forEach((title) => {
      const text = title.textContent.trim();
      if (!TEACHER_NOTE_TITLES.has(text)) return;
      const card = title.closest(".signal-surface, .comparison-band-item, .evidence-card");
      if (!card) return;
      appendNote(slide, text, card.innerHTML);
      card.remove();
    });
  };

  const normalizeVisibleCopy = (slide, lessonIndex) => {
    const key = normalizeIdKey(slide.id);
    const title = slide.querySelector(":scope > h2");
    const heroTitle = slide.querySelector(".teacher-hero-title");
    if (title && SLIDE_TITLE_MAP[key]) {
      title.textContent = SLIDE_TITLE_MAP[key];
    }
    if (heroTitle && HERO_TITLE_MAP[key]) {
      heroTitle.textContent = HERO_TITLE_MAP[key];
    }

    slide.querySelectorAll(".stage-kicker").forEach((node) => {
      node.textContent = COVER_KICKER[lessonIndex] || "Week02";
    });

    slide.querySelectorAll("th").forEach((th) => {
      const text = th.textContent.trim();
      if (TABLE_HEADER_MAP[text]) {
        th.textContent = TABLE_HEADER_MAP[text];
      }
    });
  };

  const classifyTemplate = (slide) => {
    const id = slide.id || "";
    let template = "CardsSlide";

    if (/cover$/.test(id) || slide.querySelector(".teacher-hero")) {
      template = "W2CoverSlide";
    } else if (/demo-transition|demo-open/.test(id)) {
      template = "OBSHandoffSlide";
    } else if (/demo-return/.test(id)) {
      template = "ReturnRecapSlide";
    } else if (/next/.test(id)) {
      template = "NextBridgeSlide";
    } else if (/reminders|takeaway/.test(id)) {
      template = "LessonTakeawaySlide";
    } else if (slide.querySelector(".code-shell")) {
      template = "CodeWalkthroughSlide";
    } else if (slide.querySelector(".launch-table")) {
      template = "TableBoardSlide";
    } else if (slide.querySelector(".figure-stage")) {
      template = "BlueprintImageSlide";
    } else if (slide.querySelector(".big-judgement")) {
      template = "ThesisSlide";
    } else if (slide.querySelector(".teacher-flow-track")) {
      template = "WeekMapSlide";
    } else if (slide.querySelector(".comparison-band")) {
      template = "CompareSlide";
    }

    slide.dataset.w2Template = template;
  };

  const markImages = (slide) => {
    slide.querySelectorAll("img.teacher-figure, .teacher-zoomable img, img.teacher-zoomable").forEach((img) => {
      const apply = () => {
        const ratio = img.naturalWidth / Math.max(img.naturalHeight, 1);
        img.classList.add(ratio >= 1 ? "is-landscape" : "is-portrait");
        img.classList.add("is-zoom-ready");
      };
      if (img.complete) apply();
      else img.addEventListener("load", apply, { once: true });
    });
  };

  const buildChrome = (lessonIndex, acts) => {
    const topbar = document.createElement("div");
    topbar.className = "w2-live-topbar";
    topbar.innerHTML = [
      '<div class="w2-live-topbar__meta">',
      '<div class="w2-live-topbar__eyebrow">AI Data Engineering Bootcamp</div>',
      `<div class="w2-live-topbar__lesson">Week02 · Lesson 0${lessonIndex}</div>`,
      `<div class="w2-live-topbar__subline">${LESSON_TITLES[lessonIndex] || "Week02 教师录屏版"}</div>`,
      "</div>",
      '<nav class="w2-live-weekrail" aria-label="Week02 lesson rail">',
      Array.from({ length: 5 }, (_, idx) => {
        const lesson = idx + 1;
        return [
          `<a class="w2-live-weekrail__item${lesson === lessonIndex ? " is-active" : ""}" href="lesson0${lesson}-live.html?presenter=1">`,
          `<span class="w2-live-weekrail__label">Lesson 0${lesson}</span>`,
          `<span class="w2-live-weekrail__title">${LESSON_TITLES[lesson]}</span>`,
          "</a>"
        ].join("");
      }).join(""),
      "</nav>"
    ].join("");

    const bottombar = document.createElement("div");
    bottombar.className = "w2-live-bottombar";
    bottombar.innerHTML = [
      '<div class="w2-live-bottombar__panel">',
      '<div class="w2-live-bottombar__copy">',
      '<div class="w2-live-bottombar__act">幕 1</div>',
      '<div class="w2-live-bottombar__title">当前 slide</div>',
      "</div>",
      '<div class="w2-live-bottombar__counter">1 / 1</div>',
      `<div class="w2-live-actrail" style="--w2-live-act-count:${Math.max(acts.length, 1)}">`,
      acts.map((act) => `<a class="w2-live-actrail__node" data-act="${act.key}" href="#/${act.target}" aria-label="${act.label}"></a>`).join(""),
      "</div>",
      "</div>"
    ].join("");

    document.body.appendChild(topbar);
    document.body.appendChild(bottombar);
    return {
      topbar,
      bottombar,
      actLabel: bottombar.querySelector(".w2-live-bottombar__act"),
      slideLabel: bottombar.querySelector(".w2-live-bottombar__title"),
      counter: bottombar.querySelector(".w2-live-bottombar__counter"),
      actNodes: Array.from(bottombar.querySelectorAll(".w2-live-actrail__node"))
    };
  };

  const updateChrome = (chrome, acts, slides) => {
    const slide = getCurrentSlide();
    const act = findAct(acts, slide);
    const currentIndex = Math.max(slides.indexOf(slide), 0) + 1;
    const slideTitleNode =
      slide?.querySelector(".teacher-hero-title") ||
      slide?.querySelector(":scope > h2") ||
      slide?.querySelector("h3");

    chrome.actLabel.textContent = act?.label || "Week02";
    chrome.slideLabel.textContent = slideTitleNode?.textContent?.trim() || slide?.id || "";
    chrome.counter.textContent = `${currentIndex} / ${slides.length || 1}`;

    chrome.actNodes.forEach((node, index) => {
      const matchIndex = acts.findIndex((item) => item.key === node.dataset.act);
      node.classList.toggle("is-current", act ? act.key === node.dataset.act : index === 0);
      node.classList.toggle("is-complete", act && matchIndex < acts.findIndex((item) => item.key === act.key));
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (!inWeek02LessonLive()) return;

    document.body.classList.add("week02-live");
    document.body.dataset.liveMode = resolveLiveMode();

    const lessonIndex = parseLessonIndex();
    const config = parseActConfig();
    const acts = normalizeActs(config.acts);
    const slides = getSlides();

    slides.forEach((slide) => {
      classifyTemplate(slide);
      promoteTeacherNotes(slide);
      normalizeVisibleCopy(slide, lessonIndex);
      markImages(slide);
    });

    const chrome = buildChrome(lessonIndex, acts);
    const sync = () => updateChrome(chrome, acts, slides);

    if (window.Reveal?.on) {
      window.Reveal.on("ready", sync);
      window.Reveal.on("slidechanged", sync);
    }
    window.addEventListener("hashchange", sync);
    sync();

    window.week02Live = {
      lessonIndex,
      acts,
      slides,
      getCurrentSlide
    };
  });
})();
