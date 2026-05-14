document.addEventListener("DOMContentLoaded", () => {
  const reveal = window.Reveal;
  const viewport = document.querySelector(".reveal-viewport");
  if (!reveal || !viewport) return;

  const resolveLiveMode = () => {
    const params = new URLSearchParams(window.location.search);
    const mode = (params.get("mode") || "").toLowerCase();
    const presenter = (params.get("presenter") || "").toLowerCase();
    const isWeek02Live = window.location.pathname.includes("/weeks/week02/") && window.location.pathname.includes("-live");

    if (mode === "presenter" || presenter === "1" || presenter === "true") {
      return "presenter";
    }

    if (mode === "obs" || mode === "viewer") {
      return "viewer";
    }

    return isWeek02Live ? "viewer" : "presenter";
  };

  const liveMode = resolveLiveMode();
  document.body.dataset.liveMode = liveMode;
  viewport.dataset.liveMode = liveMode;

  const configNode = document.getElementById("teacher-live-act-config");
  let removedConfigSlide = false;

  const defaultActDefs = [
    { key: "opening", label: "幕 1 · 开场定性", target: "cover", match: ["cover", "core-judgement", "why-now"] },
    { key: "cases", label: "幕 2 · 三案群像", target: "cases-overview", match: ["cases-overview", "cases-pattern"] },
    {
      key: "deconstruct",
      label: "幕 3 · 三案拆解",
      target: "air-canada-story",
      match: [
        "air-canada-story",
        "air-canada-deconstruct",
        "mycity-story",
        "mycity-deconstruct",
        "donotpay-story",
        "donotpay-deconstruct",
        "cases-to-method"
      ]
    },
    { key: "framework", label: "幕 4 · 五层模型", target: "five-layer-model", match: ["five-layer-model", "five-step-review", "course-mapping"] },
    { key: "shift", label: "幕 5 · 认知切换", target: "demo-prod-bridge", match: ["demo-prod-bridge", "demo-prod-dimensions", "demo-prod-figure"] },
    { key: "delivery", label: "幕 6 · 交付链", target: "delivery-chain", match: ["delivery-chain", "delivery-chain-order"] },
    { key: "copilot", label: "幕 7 · 主案例", target: "copilot-positioning", match: ["copilot-positioning", "copilot-constraints", "copilot-sequence", "copilot-baseline"] },
    { key: "close", label: "幕 8 · 收束与过桥", target: "industry-signals", match: ["industry-signals", "demoable-vs-launchable", "readiness", "takeaways", "lesson02-bridge", "appendix"] }
  ];

  const readActConfig = () => {
    if (!configNode) {
      return { eyebrow: "Week02 教师演示", acts: defaultActDefs };
    }

    try {
      const payload = JSON.parse(configNode.textContent || "");
      if (Array.isArray(payload)) {
        return { eyebrow: "Week02 教师演示", acts: payload };
      }

      return {
        eyebrow: payload.eyebrow || "Week02 教师演示",
        acts: payload.acts || defaultActDefs
      };
    } catch (error) {
      console.warn("Failed to parse teacher live act config:", error);
      return { eyebrow: "Week02 教师演示", acts: defaultActDefs };
    }
  };

  const normalizeActDefs = (acts) =>
    acts
      .map((act, index) => {
        const target = act.target || act.match?.[0] || `slide-${index + 1}`;
        const match = Array.isArray(act.match) && act.match.length ? [...act.match] : [target];
        if (!match.includes(target)) {
          match.unshift(target);
        }

        return {
          key: act.key || `act-${index + 1}`,
          label: act.label || `幕 ${index + 1}`,
          target,
          match
        };
      })
      .filter((act) => act.target);

  const actConfig = readActConfig();
  const configSlide = configNode?.parentElement;
  if (
    configSlide &&
    configSlide.matches("section.slide") &&
    configSlide.parentElement?.classList.contains("slides") &&
    configSlide.childElementCount === 1
  ) {
    configSlide.remove();
    removedConfigSlide = true;
    if (typeof reveal.sync === "function") {
      reveal.sync();
    }
  }

  const actDefs = normalizeActDefs(actConfig.acts);

  const buildHud = () => {
    const hud = document.createElement("aside");
    hud.className = "teacher-stage-hud";
    hud.innerHTML = [
      '<div class="teacher-stage-hud__head">',
      '<div class="teacher-stage-hud__meta">',
      `<div class="teacher-stage-hud__eyebrow">${actConfig.eyebrow}</div>`,
      `<div class="teacher-stage-hud__act">${actDefs[0]?.label || "Week02 教师演示"}</div>`,
      "</div>",
      '<div class="teacher-stage-hud__counter">1 / 1</div>',
      "</div>",
      '<div class="teacher-stage-hud__progress">',
      actDefs
        .map(
          (act) =>
            '<a class="teacher-stage-hud__segment" href="#' +
            act.target +
            '" data-act="' +
            act.key +
            '" title="' +
            act.label +
            '" aria-label="' +
            act.label +
            '"></a>'
        )
        .join(""),
      "</div>"
    ].join("");
    viewport.appendChild(hud);
    return hud;
  };

  const buildDrawingUi = () => {
    const layer = document.createElement("div");
    layer.className = "teacher-draw-layer";
    layer.innerHTML = '<canvas class="teacher-draw-layer__canvas" aria-hidden="true"></canvas>';

    const dock = document.createElement("aside");
    dock.className = "teacher-draw-dock";
    dock.innerHTML = [
      '<button type="button" class="teacher-draw-dock__toggle" data-action="panel" title="打开画笔工具" aria-expanded="false" aria-controls="teacher-draw-panel">✎</button>',
      '<div class="teacher-draw-toolbar" id="teacher-draw-panel">',
      '<div class="teacher-draw-toolbar__title">讲师画笔</div>',
      '<div class="teacher-draw-toolbar__actions">',
      '<button type="button" class="teacher-draw-toolbar__button" data-action="toggle" title="开关画笔（D）">启用画笔</button>',
      '<button type="button" class="teacher-draw-toolbar__button" data-action="clear" title="清空当前页（C）">清空当前页</button>',
      "</div>",
      '<div class="teacher-draw-toolbar__colors" aria-label="画笔颜色">',
      '<button type="button" class="teacher-draw-toolbar__swatch is-active" data-color="#ffd15c" style="--swatch:#ffd15c" title="黄色"></button>',
      '<button type="button" class="teacher-draw-toolbar__swatch" data-color="#7ad7ff" style="--swatch:#7ad7ff" title="蓝色"></button>',
      '<button type="button" class="teacher-draw-toolbar__swatch" data-color="#ff7b7b" style="--swatch:#ff7b7b" title="红色"></button>',
      "</div>",
      '<div class="teacher-draw-toolbar__hint">D 开关 · C 清空当前页 · Esc 收起</div>',
      "</div>"
    ].join("");

    viewport.appendChild(layer);
    viewport.appendChild(dock);

    return {
      layer,
      canvas: layer.querySelector(".teacher-draw-layer__canvas"),
      dock,
      toolbar: dock.querySelector(".teacher-draw-toolbar"),
      panelButton: dock.querySelector('[data-action="panel"]'),
      toggleButton: dock.querySelector('[data-action="toggle"]'),
      clearButton: dock.querySelector('[data-action="clear"]'),
      colorButtons: Array.from(dock.querySelectorAll("[data-color]"))
    };
  };

  const buildZoomUi = () => {
    const overlay = document.createElement("div");
    overlay.className = "teacher-zoom-overlay";
    overlay.innerHTML = [
      '<button type="button" class="teacher-zoom-overlay__close" aria-label="关闭放大图">×</button>',
      '<div class="teacher-zoom-overlay__frame">',
      '<img class="teacher-zoom-overlay__image" alt="" />',
      '<div class="teacher-zoom-overlay__caption"></div>',
      "</div>"
    ].join("");
    viewport.appendChild(overlay);
    return {
      overlay,
      closeButton: overlay.querySelector(".teacher-zoom-overlay__close"),
      image: overlay.querySelector(".teacher-zoom-overlay__image"),
      caption: overlay.querySelector(".teacher-zoom-overlay__caption")
    };
  };

  const resolveAct = (slide) => {
    const id = slide?.id || "";
    return actDefs.find((act) => act.match.includes(id)) || actDefs[0];
  };

  const hud = buildHud();
  const drawUi = buildDrawingUi();
  const zoomUi = buildZoomUi();
  const hudAct = hud.querySelector(".teacher-stage-hud__act");
  const hudCounter = hud.querySelector(".teacher-stage-hud__counter");
  const hudProgress = hud.querySelector(".teacher-stage-hud__progress");
  const hudSegments = Array.from(hud.querySelectorAll(".teacher-stage-hud__segment"));
  const getOrderedSlides = () =>
    Array.from(document.querySelectorAll(".slides > section")).filter((slide) => !slide.classList.contains("stack"));

  const resolvePrimarySlide = (candidate) => {
    if (!(candidate instanceof HTMLElement)) return null;
    if (candidate.matches(".slides > section")) return candidate;
    return candidate.closest(".slides > section");
  };

  const getActiveSlide = () => {
    const presentSlide = document.querySelector(".slides > section.present");
    if (presentSlide instanceof HTMLElement) return presentSlide;

    const currentSlide = resolvePrimarySlide(reveal.getCurrentSlide());
    if (currentSlide) return currentSlide;

    const rawHash = window.location.hash.replace(/^#\/?/, "");
    const hash = rawHash ? decodeURIComponent(rawHash) : "";
    const hashTarget = hash ? document.getElementById(hash) : null;
    const hashedSlide = resolvePrimarySlide(hashTarget);
    if (hashedSlide) return hashedSlide;
    return reveal.getCurrentSlide();
  };

  const strokeStore = new Map();
  const drawingState = {
    enabled: false,
    panelOpen: false,
    color: "#ffd15c",
    width: 4.5,
    stroke: null,
    context: null
  };

  const isEditableTarget = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return false;
    return Boolean(target.closest("input, textarea, select, button, a, [contenteditable='true']"));
  };

  const getSlideKey = (slide = reveal.getCurrentSlide()) => {
    const resolvedSlide = getActiveSlide() || resolvePrimarySlide(slide) || slide;
    if (!resolvedSlide) return "slide-0";
    if (resolvedSlide.id) return resolvedSlide.id;
    const index = getOrderedSlides().indexOf(resolvedSlide);
    return `slide-${index >= 0 ? index : 0}`;
  };

  const getCanvasMetrics = () => {
    const rect = viewport.getBoundingClientRect();
    return {
      rect,
      width: Math.max(Math.round(rect.width), 1),
      height: Math.max(Math.round(rect.height), 1)
    };
  };

  const ensureCanvas = () => {
    const { width, height } = getCanvasMetrics();
    const dpr = Math.max(window.devicePixelRatio || 1, 1);
    drawUi.canvas.width = width * dpr;
    drawUi.canvas.height = height * dpr;
    drawUi.canvas.style.width = `${width}px`;
    drawUi.canvas.style.height = `${height}px`;

    const context = drawUi.canvas.getContext("2d");
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.lineCap = "round";
    context.lineJoin = "round";
    drawingState.context = context;
  };

  const renderStroke = (stroke) => {
    const context = drawingState.context;
    if (!context || !stroke?.points?.length) return;

    const { width, height } = getCanvasMetrics();
    context.strokeStyle = stroke.color;
    context.lineWidth = stroke.width;
    context.beginPath();
    stroke.points.forEach((point, index) => {
      const x = point.x * width;
      const y = point.y * height;
      if (index === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    });
    context.stroke();
  };

  const renderCurrentSlideStrokes = () => {
    ensureCanvas();
    const context = drawingState.context;
    if (!context) return;

    const { width, height } = getCanvasMetrics();
    context.clearRect(0, 0, width, height);

    const strokes = strokeStore.get(getSlideKey()) || [];
    strokes.forEach(renderStroke);
  };

  const syncDrawingUi = () => {
    viewport.dataset.liveDrawing = drawingState.enabled ? "active" : "idle";
    drawUi.layer.classList.toggle("is-active", drawingState.enabled);
    drawUi.dock.classList.toggle("is-open", drawingState.panelOpen);
    drawUi.dock.classList.toggle("is-drawing", drawingState.enabled);
    drawUi.toolbar.classList.toggle("is-open", drawingState.panelOpen);
    drawUi.panelButton.classList.toggle("is-active", drawingState.enabled);
    drawUi.panelButton.setAttribute("aria-expanded", drawingState.panelOpen ? "true" : "false");
    drawUi.toggleButton.classList.toggle("is-active", drawingState.enabled);
    drawUi.toggleButton.textContent = drawingState.enabled ? "退出画笔" : "启用画笔";
    drawUi.toggleButton.setAttribute("aria-pressed", drawingState.enabled ? "true" : "false");

    drawUi.colorButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.color === drawingState.color);
    });
  };

  const setPanelOpen = (open) => {
    drawingState.panelOpen = open;
    syncDrawingUi();
  };

  const setDrawingEnabled = (enabled) => {
    drawingState.enabled = enabled;
    if (!enabled) {
      drawingState.stroke = null;
    }
    if (enabled) {
      drawingState.panelOpen = true;
    }
    syncDrawingUi();
  };

  const toggleDrawing = () => {
    setDrawingEnabled(!drawingState.enabled);
  };

  const togglePanel = () => {
    setPanelOpen(!drawingState.panelOpen);
  };

  const clearCurrentSlide = () => {
    strokeStore.delete(getSlideKey());
    renderCurrentSlideStrokes();
  };

  const getPoint = (event) => {
    const rect = drawUi.canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) / Math.max(rect.width, 1),
      y: (event.clientY - rect.top) / Math.max(rect.height, 1)
    };
  };

  const beginStroke = (event) => {
    if (!drawingState.enabled || event.button !== 0) return;

    event.preventDefault();
    drawUi.canvas.setPointerCapture(event.pointerId);
    const slideKey = getSlideKey();
    const strokes = strokeStore.get(slideKey) || [];
    const stroke = {
      color: drawingState.color,
      width: drawingState.width,
      points: [getPoint(event)]
    };
    strokes.push(stroke);
    strokeStore.set(slideKey, strokes);
    drawingState.stroke = stroke;
    renderCurrentSlideStrokes();
  };

  const extendStroke = (event) => {
    if (!drawingState.enabled || !drawingState.stroke) return;
    event.preventDefault();
    drawingState.stroke.points.push(getPoint(event));
    renderCurrentSlideStrokes();
  };

  const endStroke = (event) => {
    if (drawingState.stroke && drawUi.canvas.hasPointerCapture(event.pointerId)) {
      drawUi.canvas.releasePointerCapture(event.pointerId);
    }
    drawingState.stroke = null;
  };

  const resetToFirstContentSlide = () => {
    const orderedSlides = getOrderedSlides();
    if (!removedConfigSlide || !orderedSlides.length) return;
    const current = reveal.getCurrentSlide();
    const first = orderedSlides[0];
    if (first && current !== first) {
      reveal.slide(0);
    }
  };

  if (hudProgress && actDefs.length) {
    hudProgress.style.gridTemplateColumns = `repeat(${actDefs.length}, minmax(0, 1fr))`;
  }

  const queueUpdate = () => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(update);
    });
  };

  const update = () => {
    const slide = getActiveSlide();
    const orderedSlides = getOrderedSlides();
    const act = resolveAct(slide);
    const actIndex = actDefs.findIndex((item) => item.key === act.key);
    const totalSlides = orderedSlides.length || 1;
    const slideIndex = Math.max(orderedSlides.indexOf(slide), 0) + 1;

    hudAct.textContent = act.label;
    hudCounter.textContent = `${slideIndex} / ${totalSlides}`;

    document.body.dataset.liveAct = act.key;
    viewport.dataset.liveAct = act.key;

    hudSegments.forEach((segment, index) => {
      segment.classList.toggle("is-complete", index < actIndex);
      segment.classList.toggle("is-current", index === actIndex);
    });

    renderCurrentSlideStrokes();
  };

  const setZoomOpen = (open) => {
    zoomUi.overlay.classList.toggle("is-open", open);
    viewport.dataset.zoomOpen = open ? "true" : "false";
  };

  const getZoomCaption = (element) => {
    const stage = element.closest(".figure-stage");
    const explicit = element.getAttribute("fig-alt") || element.getAttribute("alt");
    const caption = stage?.querySelector(".figure-caption")?.textContent?.trim();
    return caption || explicit || "";
  };

  const openZoom = (element) => {
    const image =
      element instanceof HTMLImageElement
        ? element
        : element.matches("img")
          ? element
          : element.querySelector("img");
    if (!(image instanceof HTMLImageElement)) return;

    zoomUi.image.src = image.currentSrc || image.src;
    zoomUi.image.alt = image.alt || "";
    zoomUi.caption.textContent = getZoomCaption(image);
    setZoomOpen(true);
  };

  const closeZoom = () => {
    setZoomOpen(false);
    zoomUi.image.removeAttribute("src");
    zoomUi.image.alt = "";
    zoomUi.caption.textContent = "";
  };

  drawUi.panelButton.addEventListener("click", togglePanel);
  drawUi.toggleButton.addEventListener("click", toggleDrawing);
  drawUi.clearButton.addEventListener("click", clearCurrentSlide);
  zoomUi.closeButton.addEventListener("click", closeZoom);
  zoomUi.overlay.addEventListener("click", (event) => {
    if (event.target === zoomUi.overlay) {
      closeZoom();
    }
  });
  drawUi.colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      drawingState.color = button.dataset.color || drawingState.color;
      syncDrawingUi();
    });
  });

  document.querySelectorAll(".teacher-zoomable").forEach((element) => {
    element.classList.add("is-zoom-ready");
    element.addEventListener("click", () => openZoom(element));
  });

  drawUi.canvas.addEventListener("pointerdown", beginStroke);
  drawUi.canvas.addEventListener("pointermove", extendStroke);
  drawUi.canvas.addEventListener("pointerup", endStroke);
  drawUi.canvas.addEventListener("pointercancel", endStroke);
  drawUi.canvas.addEventListener("pointerleave", (event) => {
    if (drawingState.stroke && event.buttons === 0) {
      endStroke(event);
    }
  });

  window.addEventListener("resize", renderCurrentSlideStrokes);
  document.addEventListener("keydown", (event) => {
    if (isEditableTarget(event)) return;

    if (event.key === "Escape" && zoomUi.overlay.classList.contains("is-open")) {
      event.preventDefault();
      closeZoom();
      return;
    }

    if (event.key.toLowerCase() === "d") {
      event.preventDefault();
      toggleDrawing();
      return;
    }

    if (event.key.toLowerCase() === "c") {
      if (!drawingState.enabled) return;
      event.preventDefault();
      clearCurrentSlide();
      return;
    }

    if (event.key === "Escape" && (drawingState.enabled || drawingState.panelOpen)) {
      event.preventDefault();
      setDrawingEnabled(false);
      setPanelOpen(false);
    }
  });

  document.addEventListener("pointerdown", (event) => {
    if (!drawingState.panelOpen) return;
    if (!(event.target instanceof HTMLElement)) return;
    if (event.target.closest(".teacher-draw-dock")) return;
    setPanelOpen(false);
  });

  reveal.on("ready", () => {
    resetToFirstContentSlide();
    queueUpdate();
  });
  reveal.on("slidechanged", queueUpdate);
  window.addEventListener("hashchange", queueUpdate);

  setPanelOpen(false);
  setDrawingEnabled(false);
  resetToFirstContentSlide();
  queueUpdate();
});
