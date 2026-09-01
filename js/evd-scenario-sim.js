// evd-scenario-sim.js -----------------------------------------------------
// Branching-scenario engine + UI for the EVD scenario library.
// Each scenario is a small decision tree; choices lead down different paths,
// some of which recover and some of which cascade to a poor outcome.

import { SCENARIOS, scenarioById } from "./evd-scenarios.js";

const SCOPE_NOTE =
  "Each scenario isolates one core EVD concept. Airway, anesthetic agents, and detailed " +
  "hemodynamic management are relevant and assumed — they are deliberately out of scope. " +
  "Blood-pressure numbers, where shown, are context only (one institution's protocol). " +
  "Branching logic and outcomes are a teaching model, not a substitute for your protocol.";

const TAG_LABEL = { best: "Best", ok: "Reasonable", poor: "Suboptimal", harmful: "Harmful" };
const TAG_CLASS = { best: "b-ok", ok: "b-info", poor: "b-warn", harmful: "b-bad" };
const TAG_ALERT = { best: "ok", ok: "info", poor: "warn", harmful: "bad" };

// ---- DOM helper ------------------------------------------------------

function el(tag, attrs = {}, ...kids) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "class") n.className = v;
    else if (k === "html") n.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v);
  }
  for (const kid of kids.flat()) {
    if (kid == null || kid === false) continue;
    n.appendChild(typeof kid === "string" ? document.createTextNode(kid) : kid);
  }
  return n;
}
const clearNode = (node) => { while (node.firstChild) node.removeChild(node.firstChild); };

// ---- widget ---------------------------------------------------------

export function mountScenarioSim(root) {
  let current = null;   // scenario object, or null for the library view
  let nodeId = null;
  let path = [];        // [{ prompt, choiceText, tag }]
  let firstRender = true;

  function openLibrary() { current = null; nodeId = null; path = []; render(); }
  function startScenario(id) {
    current = scenarioById(id);
    nodeId = current.start;
    path = [];
    render();
  }

  // -- library view --
  function libraryView() {
    const wrap = el("div", {});
    wrap.appendChild(el("div", { class: "evdsim-scope" }, el("strong", {}, "How this works. "), SCOPE_NOTE));
    wrap.appendChild(el("p", { class: "evdsim-sm evdsim-muted" },
      "Pick a scenario. You'll make a series of decisions; each one changes what happens next."));
    const grid = el("div", { class: "evdsim-lib" });
    for (const s of SCENARIOS) {
      grid.appendChild(el("button", { class: "evdsim-lib-card", onclick: () => startScenario(s.id) },
        el("div", { class: "evdsim-lib-top" },
          el("span", { class: "evdsim-strong" }, s.title),
          el("span", { class: "evdsim-badge " + (s.level === "advanced" ? "b-bad" : "b-info") }, s.level)),
        el("div", { class: "evdsim-sm evdsim-muted" }, s.concept)));
    }
    wrap.appendChild(grid);
    return wrap;
  }

  // -- decision node --
  function nodeView(node) {
    const wrap = el("div", {});

    wrap.appendChild(el("div", { class: "evdsim-crumbs" },
      el("button", { class: "evdsim-link", onclick: openLibrary }, "← All scenarios"),
      el("span", { class: "evdsim-muted evdsim-sm" }, "  ·  " + current.title)));

    wrap.appendChild(el("div", { class: "evdsim-card" },
      el("div", { class: "evdsim-card-head" }, "Scenario — " + current.title),
      el("div", { class: "evdsim-card-body" },
        el("p", { class: "evdsim-muted evdsim-sm" }, el("strong", {}, "Concept: "), current.concept),
        el("p", {}, current.setup))));

    if (path.length) wrap.appendChild(pathRecap());

    const card = el("div", { class: "evdsim-card" });
    const body = el("div", { class: "evdsim-card-body" });
    card.appendChild(el("div", { class: "evdsim-card-head" }, `Decision ${path.length + 1}`));
    if (node.situation) body.appendChild(el("p", { class: "evdsim-situation" }, node.situation));
    body.appendChild(el("p", { class: "evdsim-strong" }, node.prompt));

    const choiceWrap = el("div", { class: "evdsim-choices" });
    node.choices.forEach((ch) => {
      const btn = el("button", { class: "evdsim-choice", onclick: () => pick(node, ch, choiceWrap, body) }, ch.text);
      choiceWrap.appendChild(btn);
    });
    body.appendChild(choiceWrap);
    card.appendChild(body);
    wrap.appendChild(card);
    return wrap;
  }

  function pick(node, choice, choiceWrap, body) {
    [...choiceWrap.querySelectorAll("button")].forEach((b) => {
      b.disabled = true;
      if (b.textContent === choice.text) b.classList.add("picked");
    });
    path.push({ prompt: node.prompt, choiceText: choice.text, tag: choice.tag });

    body.appendChild(el("div", { class: `evdsim-alert ${TAG_ALERT[choice.tag]}` },
      el("div", { class: "evdsim-sm evdsim-strong" }, TAG_LABEL[choice.tag]),
      el("div", { class: "evdsim-sm" }, choice.feedback)));

    body.appendChild(el("button", { class: "evdsim-btn evdsim-btn-primary",
      onclick: () => { nodeId = choice.goto; render(); } }, "Continue →"));
  }

  // -- terminal node --
  function endView(node) {
    const wrap = el("div", {});
    wrap.appendChild(el("div", { class: "evdsim-crumbs" },
      el("button", { class: "evdsim-link", onclick: openLibrary }, "← All scenarios"),
      el("span", { class: "evdsim-muted evdsim-sm" }, "  ·  " + current.title)));

    const oc = node.outcome; // good | mixed | bad
    wrap.appendChild(el("div", { class: `evdsim-outcome evdsim-oc-${oc}` },
      el("div", { class: "evdsim-oc-tag" }, oc === "good" ? "Good outcome" : oc === "mixed" ? "Mixed outcome" : "Poor outcome"),
      el("div", { class: "evdsim-strong" }, node.title)));

    wrap.appendChild(el("div", { class: "evdsim-card" },
      el("div", { class: "evdsim-card-head" }, "Debrief"),
      el("div", { class: "evdsim-card-body" },
        el("p", {}, node.debrief),
        el("p", { class: "evdsim-sm evdsim-muted" }, el("strong", {}, "Core concept: "), current.concept))));

    wrap.appendChild(pathRecap(true));

    wrap.appendChild(el("div", { class: "evdsim-endbtns" },
      el("button", { class: "evdsim-btn evdsim-btn-primary", onclick: () => startScenario(current.id) }, "Replay this scenario"),
      el("button", { class: "evdsim-btn", onclick: openLibrary }, "Pick another scenario")));
    return wrap;
  }

  function pathRecap(full = false) {
    const counts = { best: 0, ok: 0, poor: 0, harmful: 0 };
    path.forEach((p) => { counts[p.tag]++; });
    const dots = path.map((p, i) =>
      el("span", { class: `evdsim-pathdot dot-${p.tag}`, title: p.choiceText }, String(i + 1)));
    const card = el("div", { class: "evdsim-card evdsim-pathcard" },
      el("div", { class: "evdsim-card-head" }, full ? "Your path" : "Path so far"),
      el("div", { class: "evdsim-card-body" },
        el("div", { class: "evdsim-pathdots" }, dots),
        full ? el("ol", { class: "evdsim-pathlist" },
          path.map((p) => el("li", {},
            el("span", { class: `evdsim-badge ${TAG_CLASS[p.tag]}` }, TAG_LABEL[p.tag]),
            " " + p.choiceText))) : null,
        el("div", { class: "evdsim-sm evdsim-muted" },
          `${counts.best} best · ${counts.ok} reasonable · ${counts.poor} suboptimal · ${counts.harmful} harmful`)));
    return card;
  }

  function render() {
    clearNode(root);
    if (!current) { root.appendChild(libraryView()); return; }
    const node = current.nodes[nodeId];
    if (!node) { root.appendChild(el("div", { class: "evdsim-alert bad" }, "Scenario error: missing node " + nodeId)); return; }
    root.appendChild(node.end ? endView(node) : nodeView(node));
    if (!firstRender) root.scrollIntoView({ behavior: "smooth", block: "start" });
    firstRender = false;
  }

  render();
}
