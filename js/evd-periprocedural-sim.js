// evd-periprocedural-sim.js ----------------------------------------------
// Self-contained virtual-patient scenario: an aneurysmal SAH patient going to
// the IR suite for coiling of an anterior communicating artery aneurysm, walked
// through pre-procedure assessment, transport, intra-procedural care, and
// emergence / transfer / handoff.
//
// Educational use only. DRAFT clinical content — verify against your
// institution's protocols and the primary literature before teaching use.

// ---- the case --------------------------------------------------------

const CASE = {
  presentation:
    "48 y/o woman, thunderclap headache 6 hours ago with brief loss of consciousness. " +
    "Now GCS 14 (E4 V4 M6), mildly confused, no focal deficit, moderate headache and photophobia. " +
    "Hunt-Hess 2, WFNS 2. CT: diffuse cisternal SAH, no intraventricular hemorrhage, no hydrocephalus. " +
    "Modified Fisher 3. CTA: 7 mm wide-necked anterior communicating artery aneurysm. " +
    "Neuro-interventional radiology plans endovascular coiling now; balloon or stent assist is possible given the neck. " +
    "No EVD. BP 168/94 on arrival, started on a nicardipine infusion. Not intubated. Last ate 3 hours ago.",

  checkpoints: [
    {
      label: "1 — Pre-procedure assessment",
      where: "NCCU / holding area",
      vignette:
        "You are seeing her before transport to the angiography suite. BP now 150/88 on nicardipine, HR 82, " +
        "SpO₂ 98% on 2 L. One peripheral IV (20 g). No arterial line. Labs pending. She is anxious, follows " +
        "commands, moves all four extremities.",
      options: [
        "Document a full, timed baseline neurologic exam now for post-procedure comparison",
        "Place an arterial line before transport for beat-to-beat blood-pressure control",
        "Confirm the SBP target (< ~140–160) and that a titratable infusion plus IV push agents are ready",
        "Ensure a second large-bore IV, send a type & screen, confirm blood is available",
        "Review coagulation studies and platelet count; reverse any anticoagulant or antiplatelet",
        "Check sodium, renal function and glucose before the iodinated-contrast load",
        "Confirm nimodipine has been started and note the dose timing",
        "Agree the airway plan for general anesthesia (aspiration risk, wide-neck aneurysm needs immobility)",
        "Discuss stent-assist possibility with neuro-IR and the antiplatelet plan if a stent is used",
        "Confirm consent, family communication and code status",
        "Liberalize the blood pressure now to improve cerebral perfusion",
        "Give a prophylactic dose of tranexamic acid before transport",
        "Defer the baseline neuro exam to the IR team after arrival",
      ],
      keyActions: [
        "Document a full, timed baseline neurologic exam now for post-procedure comparison",
        "Place an arterial line before transport for beat-to-beat blood-pressure control",
        "Confirm the SBP target (< ~140–160) and that a titratable infusion plus IV push agents are ready",
        "Ensure a second large-bore IV, send a type & screen, confirm blood is available",
        "Review coagulation studies and platelet count; reverse any anticoagulant or antiplatelet",
        "Check sodium, renal function and glucose before the iodinated-contrast load",
        "Confirm nimodipine has been started and note the dose timing",
        "Agree the airway plan for general anesthesia (aspiration risk, wide-neck aneurysm needs immobility)",
        "Discuss stent-assist possibility with neuro-IR and the antiplatelet plan if a stent is used",
        "Confirm consent, family communication and code status",
      ],
      contraindicated: [
        "Liberalize the blood pressure now to improve cerebral perfusion",
        "Give a prophylactic dose of tranexamic acid before transport",
        "Defer the baseline neuro exam to the IR team after arrival",
      ],
      teaching:
        "Before an unsecured aneurysm leaves the unit: a timed baseline exam (so a post-procedure change is " +
        "attributable), an arterial line, a firm SBP ceiling with agents in hand, real IV access with blood " +
        "available, and the labs that matter for a contrast load. The wide A-comm neck means stent-assist is on " +
        "the table — the antiplatelet decision must be made with neuro-IR before the case, not discovered " +
        "afterward. Blood pressure stays controlled until the aneurysm is secured; liberalizing now trades a " +
        "theoretical perfusion benefit for rerupture risk. Routine short-course tranexamic acid before securing " +
        "is not recommended (ULTRA trial).",
      evolution:
        "Arterial line placed, second IV in, type & screen sent, blood available. Neuro-IR plans to start " +
        "without a stent but keeps balloon and stent on the shelf; if a stent is needed she will get " +
        "intraprocedural antiplatelet loading. Transported to the angio suite.",
    },

    {
      label: "2 — Transport to the IR suite",
      where: "In transit, two floors down",
      vignette:
        "Ready to move. She remains awake, SBP 145 on nicardipine. The angio suite is two floors down.",
      options: [
        "Keep the arterial line transduced en route, with ECG and SpO₂",
        "Run the blood-pressure infusion on a transport pump and carry IV push agents for a surge",
        "Carry airway equipment, a bag-valve mask, oxygen sized for the trip plus a margin, and emergency drugs",
        "Assign explicit team roles (airway, monitor/lines, bed) and brief the route beforehand",
        "Minimize noxious stimulation and treat any blood-pressure surge promptly to prevent rerupture",
        "Confirm there is no EVD to manage — if one were present it would be clamped for transport and re-zeroed on arrival",
        "Give a structured SBAR handoff to the angio and anesthesia teams on arrival",
        "Disconnect the arterial line transducer for the move and reconnect it on arrival",
        "Transport with pulse oximetry only to save time",
        "Give a benzodiazepine bolus pre-emptively to keep her calm for the trip",
      ],
      keyActions: [
        "Keep the arterial line transduced en route, with ECG and SpO₂",
        "Run the blood-pressure infusion on a transport pump and carry IV push agents for a surge",
        "Carry airway equipment, a bag-valve mask, oxygen sized for the trip plus a margin, and emergency drugs",
        "Assign explicit team roles (airway, monitor/lines, bed) and brief the route beforehand",
        "Minimize noxious stimulation and treat any blood-pressure surge promptly to prevent rerupture",
        "Confirm there is no EVD to manage — if one were present it would be clamped for transport and re-zeroed on arrival",
        "Give a structured SBAR handoff to the angio and anesthesia teams on arrival",
      ],
      contraindicated: [
        "Disconnect the arterial line transducer for the move and reconnect it on arrival",
        "Transport with pulse oximetry only to save time",
        "Give a benzodiazepine bolus pre-emptively to keep her calm for the trip",
      ],
      teaching:
        "Transport is a monitoring downgrade unless you actively prevent it: keep the arterial line transduced, " +
        "keep the blood-pressure infusion on a pump with bolus agents in hand, and bring an airway. The rerupture " +
        "risk here is a stimulation-and-surge risk — a smooth, quiet transfer is itself the intervention, and a " +
        "sedative bolus that obtunds her trades that for aspiration risk and a lost exam. If she had an EVD it " +
        "would be clamped for the move and re-zeroed on arrival; left open at the wrong height it causes " +
        "over-drainage or an ICP swing. Hand off with a structured format so nothing is dropped at the door.",
      evolution:
        "Uneventful transfer. SBAR given to neuroanesthesia and neuro-IR. She is moved onto the angiography table.",
    },

    {
      label: "3 — Intra-procedural care",
      where: "Angiography suite",
      vignette:
        "Plan: general anesthesia. She is pre-oxygenated. Neuro-IR will obtain femoral access and heparinize " +
        "after the sheath is in.",
      options: [
        "Induce with a blunted hemodynamic response to laryngoscopy (adequate depth, opioid ± lidocaine, treat hypertension)",
        "Keep SBP controlled until the aneurysm is secured, then set blood-pressure goals with neuro-IR",
        "Have protamine drawn up and immediately available before heparin is given",
        "Follow the ACT for systemic heparinization per the neuro-IR team",
        "Maintain normocapnia, normothermia and normoglycemia; limit contrast and support renal perfusion",
        "Rehearse the intraprocedural-rupture response: reverse heparin with protamine, lower BP, mannitol, call for help, support while IR regains control, consider emergent ventriculostomy",
        "Plan a smooth emergence (no cough, strain or hypertension) and decide extubation by grade, exam and intra-op course",
        "Allow permissive hypertension throughout the case for vasospasm prophylaxis",
        "Give protamine routinely at the end of the case regardless of the neuro-IR plan",
        "Hyperventilate to an EtCO₂ of 28–30 mmHg to relax the brain for access",
        "Plan to extubate immediately at case end regardless of her pre-op grade",
      ],
      keyActions: [
        "Induce with a blunted hemodynamic response to laryngoscopy (adequate depth, opioid ± lidocaine, treat hypertension)",
        "Keep SBP controlled until the aneurysm is secured, then set blood-pressure goals with neuro-IR",
        "Have protamine drawn up and immediately available before heparin is given",
        "Follow the ACT for systemic heparinization per the neuro-IR team",
        "Maintain normocapnia, normothermia and normoglycemia; limit contrast and support renal perfusion",
        "Rehearse the intraprocedural-rupture response: reverse heparin with protamine, lower BP, mannitol, call for help, support while IR regains control, consider emergent ventriculostomy",
        "Plan a smooth emergence (no cough, strain or hypertension) and decide extubation by grade, exam and intra-op course",
      ],
      contraindicated: [
        "Allow permissive hypertension throughout the case for vasospasm prophylaxis",
        "Give protamine routinely at the end of the case regardless of the neuro-IR plan",
        "Hyperventilate to an EtCO₂ of 28–30 mmHg to relax the brain for access",
        "Plan to extubate immediately at case end regardless of her pre-op grade",
      ],
      teaching:
        "The two hemodynamic hazards are opposite: a hypertensive response to laryngoscopy (rerupture) and " +
        "intra-op hypotension (hypoperfusion of an already-injured brain). Blunt the first, avoid the second, " +
        "and keep the pressure controlled until the coil mass is in. Heparin is given per neuro-IR with ACT " +
        "monitoring and protamine ready — but reversing it is a coordinated decision, not a reflex, because " +
        "stent or flow-diverter cases may deliberately stay anticoagulated. Intraprocedural rupture is the " +
        "rehearsed emergency: reverse heparin, drop the pressure, mannitol, call for help, and support " +
        "oxygenation and circulation while IR seals the aneurysm; an emergent ventriculostomy may be needed. " +
        "Emergence is planned backward from the post-op exam you need.",
      evolution:
        "General anesthesia induced smoothly. Femoral access, heparin to target ACT. The A-comm aneurysm is " +
        "coiled without a stent; no intraprocedural rupture. Heparin is allowed to drift down and no protamine " +
        "is given, per neuro-IR. A groin closure device is placed.",
    },

    {
      label: "4 — Emergence, transfer & handoff",
      where: "Angio suite → NCCU",
      vignette:
        "Case complete. She is being emerged. You are preparing to transfer her back to the NCCU and give handoff.",
      options: [
        "Perform an immediate neurologic exam and compare it against the timed baseline",
        "Treat any new focal deficit as a thromboembolic complication — image / back to angio, not 'still anesthetized'",
        "Check the access site for hematoma, check distal pulses, watch for retroperitoneal bleeding",
        "Now that the aneurysm is secured, liberalize blood-pressure goals and target euvolemia; avoid hypotension",
        "Communicate the heparin / protamine status and the antiplatelet plan (none — no stent placed)",
        "Monitor urine output and renal function after the contrast load",
        "Control pain and nausea without over-sedating, so serial neuro exams stay reliable",
        "Give a structured handoff: how the aneurysm was secured (coil, no stent, no antiplatelet), intra-op events, access site, every infusion, exam vs baseline, no EVD, and that DCI surveillance + nimodipine now continue",
        "Keep the SBP tightly restricted at the pre-procedure ceiling",
        "Attribute a new right-arm drift to residual anesthetic and plan to reassess in a few hours",
        "Skip the access-site and distal-pulse check because a closure device was used",
      ],
      keyActions: [
        "Perform an immediate neurologic exam and compare it against the timed baseline",
        "Treat any new focal deficit as a thromboembolic complication — image / back to angio, not 'still anesthetized'",
        "Check the access site for hematoma, check distal pulses, watch for retroperitoneal bleeding",
        "Now that the aneurysm is secured, liberalize blood-pressure goals and target euvolemia; avoid hypotension",
        "Communicate the heparin / protamine status and the antiplatelet plan (none — no stent placed)",
        "Monitor urine output and renal function after the contrast load",
        "Control pain and nausea without over-sedating, so serial neuro exams stay reliable",
        "Give a structured handoff: how the aneurysm was secured (coil, no stent, no antiplatelet), intra-op events, access site, every infusion, exam vs baseline, no EVD, and that DCI surveillance + nimodipine now continue",
      ],
      contraindicated: [
        "Keep the SBP tightly restricted at the pre-procedure ceiling",
        "Attribute a new right-arm drift to residual anesthetic and plan to reassess in a few hours",
        "Skip the access-site and distal-pulse check because a closure device was used",
      ],
      teaching:
        "The aneurysm is secured, so the blood-pressure logic inverts: liberalize, avoid hypotension, target " +
        "euvolemia — the enemy is now delayed cerebral ischemia, not rerupture. The first post-procedure exam " +
        "is the highest-yield data point of the day; a new deficit after coiling is a thromboembolic event " +
        "until angiography says otherwise, and 'she is still waking up' is how those get missed. Check the " +
        "access site and distal pulses even with a closure device. The handoff is a safety procedure: state how " +
        "the aneurysm was secured (coil vs stent, and therefore whether she is on an antiplatelet), what " +
        "happened intra-op, the access site, every infusion, the exam against baseline, and that the DCI window " +
        "and nimodipine now own the plan.",
      evolution:
        "Extubated, exam at baseline, groin intact with normal distal pulses. Structured handoff given to the " +
        "NCCU team. Day 0 of the delayed-cerebral-ischemia surveillance clock begins.",
    },
  ],
};

// ---- state machine + scoring ---------------------------------------

function scoreCheckpoint(cp, selected) {
  const sel = new Set(selected);
  const correct = cp.keyActions.filter((a) => sel.has(a));
  const missed = cp.keyActions.filter((a) => !sel.has(a));
  const harmful = cp.contraindicated.filter((a) => sel.has(a));
  const pct = Math.round(
    100 * Math.min(1, Math.max(0, (correct.length - harmful.length) / Math.max(1, cp.keyActions.length)))
  );
  const grade = pct >= 85 ? "on target" : pct >= 60 ? "mostly there" : pct >= 35 ? "gaps" : "review this step";
  return { selected: [...selected], correct, missed, harmful, pct, grade };
}

// ---- rendering ----------------------------------------------------

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
const clear = (node) => { while (node.firstChild) node.removeChild(node.firstChild); };

export function mountPeriproceduralSim(root) {
  let idx = 0;
  const results = {};

  function chips(items, cls) {
    return items.map((t) => el("span", { class: `evdsim-badge ${cls}` }, t));
  }

  function feedbackEl(sc, cp) {
    const alert = sc.pct >= 85 ? "evdsim-ok" : sc.pct >= 60 ? "evdsim-info"
      : sc.pct >= 35 ? "evdsim-warn" : "evdsim-bad";
    return el("div", { class: "evdsim-feedback" },
      el("div", { class: `evdsim-alert ${alert}` }, el("strong", {}, `${sc.pct}% — ${sc.grade}`)),
      sc.correct.length ? el("div", { class: "evdsim-fbrow" },
        el("div", { class: "evdsim-sm evdsim-tok-ok" }, "On target"), el("div", {}, chips(sc.correct, "evdsim-b-ok"))) : null,
      sc.missed.length ? el("div", { class: "evdsim-fbrow" },
        el("div", { class: "evdsim-sm evdsim-tok-warn" }, "Missed"), el("div", {}, chips(sc.missed, "evdsim-b-warn"))) : null,
      sc.harmful.length ? el("div", { class: "evdsim-fbrow" },
        el("div", { class: "evdsim-sm evdsim-tok-bad" }, "Reconsider — runs against best practice"), el("div", {}, chips(sc.harmful, "evdsim-b-bad"))) : null,
      el("p", { class: "evdsim-sm evdsim-teach" }, cp.teaching));
  }

  function summaryEl() {
    const scs = Object.values(results);
    const mean = Math.round(scs.reduce((a, s) => a + s.pct, 0) / scs.length);
    const missed = [...new Set(scs.flatMap((s) => s.missed))];
    const harmful = [...new Set(scs.flatMap((s) => s.harmful))];
    return el("div", { class: "evdsim-card evdsim-card-primary" },
      el("div", { class: "evdsim-card-head evdsim-head-primary" }, "Scenario complete"),
      el("div", { class: "evdsim-card-body" },
        el("div", {}, `Mean score across ${scs.length} steps: ${mean}%`),
        missed.length ? el("div", {}, el("div", { class: "evdsim-sm evdsim-strong" }, "Key actions missed at least once:"),
          el("ul", {}, missed.map((t) => el("li", {}, t)))) : null,
        harmful.length ? el("div", {}, el("div", { class: "evdsim-sm evdsim-strong evdsim-tok-bad" }, "Actions against best practice selected:"),
          el("ul", {}, harmful.map((t) => el("li", {}, t)))) : null,
        el("button", { class: "evdsim-btn", onclick: () => { idx = 0; for (const k in results) delete results[k]; render(); } }, "Restart scenario")));
  }

  function render() {
    clear(root);
    const total = CASE.checkpoints.length;

    root.appendChild(el("div", { class: "evdsim-card" },
      el("div", { class: "evdsim-card-head" }, "Virtual patient — presentation"),
      el("div", { class: "evdsim-card-body" }, CASE.presentation)));

    root.appendChild(el("div", { class: "evdsim-progress" },
      CASE.checkpoints.map((cp, i) =>
        el("span", { class: "evdsim-step " + (i < idx ? "done" : i === idx ? "current" : "") },
          `${i + 1}. ${cp.label.replace(/^\d+\s+—\s+/, "")}`))));

    const cp = CASE.checkpoints[idx];
    const done = results[idx];

    const boxes = cp.options.map((opt) =>
      el("label", { class: "evdsim-opt" },
        el("input", { type: "checkbox", value: opt,
          ...(done && done.selected.includes(opt) ? { checked: "checked" } : {}),
          ...(done ? { disabled: "disabled" } : {}) }),
        el("span", {}, opt)));

    const card = el("div", { class: "evdsim-card" },
      el("div", { class: "evdsim-card-head" }, `${cp.label}`, el("span", { class: "evdsim-where" }, cp.where)),
      el("div", { class: "evdsim-card-body" },
        el("p", {}, cp.vignette),
        el("div", { class: "evdsim-opts" }, boxes)));
    root.appendChild(card);

    const body = card.querySelector(".evdsim-card-body");

    if (!done) {
      body.appendChild(el("button", { class: "evdsim-btn evdsim-btn-primary",
        onclick: () => {
          const selected = [...card.querySelectorAll("input:checked")].map((i) => i.value);
          results[idx] = scoreCheckpoint(cp, selected);
          render();
        } }, "Submit choices"));
    } else {
      body.appendChild(feedbackEl(done, cp));
      body.appendChild(el("div", { class: "evdsim-evolution" },
        el("div", { class: "evdsim-strong" }, "What happens next:"),
        el("div", {}, cp.evolution)));
      if (idx < total - 1) {
        body.appendChild(el("button", { class: "evdsim-btn evdsim-btn-ok",
          onclick: () => { idx += 1; render(); } }, "Continue →"));
      } else {
        body.appendChild(summaryEl());
      }
    }
  }

  render();
}
