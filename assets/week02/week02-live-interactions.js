(function () {
  const resolveViewport = () => document.querySelector(".reveal-viewport") || document.body;

  const createOverlay = () => {
    const overlay = document.createElement("div");
    overlay.className = "w2-zoom-overlay";
    overlay.innerHTML = [
      '<button type="button" class="w2-zoom-overlay__close" aria-label="关闭放大图">×</button>',
      '<div class="w2-zoom-overlay__frame">',
      '<img class="w2-zoom-overlay__image" alt="" />',
      '<div class="w2-zoom-overlay__caption"></div>',
      "</div>"
    ].join("");
    resolveViewport().appendChild(overlay);
    return {
      root: overlay,
      close: overlay.querySelector(".w2-zoom-overlay__close"),
      image: overlay.querySelector(".w2-zoom-overlay__image"),
      caption: overlay.querySelector(".w2-zoom-overlay__caption")
    };
  };

  const getCaption = (node) => {
    const stage = node.closest(".figure-stage");
    return (
      stage?.querySelector(".figure-caption")?.textContent?.trim() ||
      node.getAttribute("fig-alt") ||
      node.getAttribute("alt") ||
      ""
    );
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (!document.body.classList.contains("week02-live")) return;

    const overlay = createOverlay();

    const openZoom = (node) => {
      const image = node instanceof HTMLImageElement ? node : node.querySelector("img");
      if (!(image instanceof HTMLImageElement)) return;
      overlay.image.src = image.currentSrc || image.src;
      overlay.image.alt = image.alt || "";
      overlay.caption.textContent = getCaption(image);
      overlay.root.classList.add("is-open");
      document.body.dataset.zoomOpen = "true";
    };

    const closeZoom = () => {
      overlay.root.classList.remove("is-open");
      overlay.image.removeAttribute("src");
      overlay.image.alt = "";
      overlay.caption.textContent = "";
      document.body.dataset.zoomOpen = "false";
    };

    const bindZoomTargets = () => {
      document
        .querySelectorAll(".teacher-figure.is-zoom-ready, .teacher-figure.teacher-zoomable, .teacher-zoomable img")
        .forEach((node) => {
          if (node.dataset.zoomBound === "1") return;
          node.dataset.zoomBound = "1";
          node.addEventListener("click", () => openZoom(node));
        });
    };

    const currentSlide = () => window.week02Live?.getCurrentSlide?.() || document.querySelector(".slides > section.present");

    const zoomCurrentSlide = () => {
      const slide = currentSlide();
      if (!slide) return;
      const candidate =
        slide.querySelector(".teacher-figure.is-portrait") ||
        slide.querySelector(".teacher-figure.teacher-zoomable") ||
        slide.querySelector(".teacher-figure.is-zoom-ready");
      if (candidate) openZoom(candidate);
    };

    overlay.close.addEventListener("click", closeZoom);
    overlay.root.addEventListener("click", (event) => {
      if (event.target === overlay.root) closeZoom();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && overlay.root.classList.contains("is-open")) {
        event.preventDefault();
        closeZoom();
        return;
      }

      if (event.key.toLowerCase() === "z") {
        event.preventDefault();
        if (overlay.root.classList.contains("is-open")) {
          closeZoom();
        } else {
          zoomCurrentSlide();
        }
      }
    });

    if (window.Reveal?.on) {
      window.Reveal.on("ready", bindZoomTargets);
      window.Reveal.on("slidechanged", bindZoomTargets);
    }

    bindZoomTargets();
  });
})();
