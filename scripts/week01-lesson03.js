(function () {
  var body = document.body;
  if (!body || !body.classList.contains("week01-lesson03-page")) {
    return;
  }

  body.classList.add("lesson03-enhanced");

  var canHover = window.matchMedia("(hover: hover)").matches;

  function bindToggle(options) {
    var triggers = Array.prototype.slice.call(document.querySelectorAll(options.triggerSelector));
    var panels = Array.prototype.slice.call(document.querySelectorAll(options.panelSelector));
    if (!triggers.length || !panels.length) return;

    function dataValue(node, key) {
      return node.dataset ? node.dataset[key] : null;
    }

    function setActive(value) {
      triggers.forEach(function (trigger) {
        var active = dataValue(trigger, options.triggerKey) === value;
        trigger.classList.toggle("is-active", active);
        trigger.setAttribute("aria-pressed", active ? "true" : "false");
      });

      panels.forEach(function (panel) {
        var active = dataValue(panel, options.panelKey) === value;
        panel.classList.toggle("is-active", active);
        panel.hidden = !active;
      });
    }

    var initialTrigger = triggers.find(function (trigger) {
      return trigger.classList.contains("is-active");
    }) || triggers[0];
    setActive(dataValue(initialTrigger, options.triggerKey));

    triggers.forEach(function (trigger) {
      var activate = function () {
        setActive(dataValue(trigger, options.triggerKey));
      };

      trigger.addEventListener("click", activate);
      trigger.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      });

      if (options.hover && canHover) {
        trigger.addEventListener("mouseenter", activate);
      }
    });
  }

  bindToggle({
    triggerSelector: ".route-card[data-route]",
    panelSelector: ".route-detail[data-route-detail]",
    triggerKey: "route",
    panelKey: "routeDetail",
    hover: true
  });

  bindToggle({
    triggerSelector: ".layer-button[data-layer]",
    panelSelector: ".layer-detail[data-layer-detail]",
    triggerKey: "layer",
    panelKey: "layerDetail",
    hover: true
  });

  bindToggle({
    triggerSelector: ".week-chip[data-week]",
    panelSelector: ".week-detail[data-week-detail]",
    triggerKey: "week",
    panelKey: "weekDetail",
    hover: false
  });

})();
