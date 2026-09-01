// evd-periprocedural-sim.js ----------------------------------------------
// Virtual-patient scenarios: an aneurysmal SAH patient with an EVD in place,
// taken to the IR suite for coiling of an anterior communicating artery
// aneurysm — pre-procedure assessment, transport, intra-procedural care, and
// emergence / transfer / handoff.
//
// Two cases: "routine" (deliberately uneventful) and "advanced" (poor grade,
// institutional SBP exception, stent + antiplatelet, intraprocedural rupture,
// transported back intubated).
//
// Educational use only. DRAFT clinical content and DRAFT scoring rubric —
// verify against your institution's protocols and the primary literature
// before teaching use. Blood-pressure targets below are written to one
// institution's protocol (pre-securement SBP 90–120 mmHg for all patients
// except those >=75 years or with uncontrolled hypertension, where it is
// 90–140 mmHg) — change them to match yours.

// ---- helpers --------------------------------------------------------

const cp = (o) => ({
  label: o.label, where: o.where, vignette: o.vignette,
  groups: o.groups, keyActions: o.keyActions || [],
  contraindicated: o.contraindicated || [], teaching: o.teaching, evolution: o.evolution,
});

// ====================================================================
// CASE A — ROUTINE (uneventful)
// ====================================================================

const ROUTINE = {
  id: "routine",
  label: "Routine case (uneventful)",
  presentation:
    "54 y/o woman, thunderclap headache ~8 hours ago with brief loss of consciousness. Now GCS 15, " +
    "no focal deficit, moderate headache. Hunt-Hess 2, WFNS 2. CT: diffuse cisternal SAH, modified " +
    "Fisher 3, mild early ventriculomegaly — an EVD was placed in the ED and is draining at +20 cm H₂O " +
    "(leveled at the tragus), ICP 12, good waveform, ~8 mL/hr of lightly xanthochromic CSF. CTA: 6 mm " +
    "anterior communicating artery aneurysm, favorable neck. Plan: endovascular coiling now. BMI 27. " +
    "Ate breakfast shortly before onset. No prior hypertension, no anticoagulation. Age <75, no " +
    "uncontrolled hypertension → institutional pre-securement SBP goal 90–120 mmHg. Nimodipine started; " +
    "levetiracetam not yet given.",
  checkpoints: [
    cp({
      label: "1 — Pre-procedure assessment",
      where: "Neuro ICU",
      vignette:
        "You are assessing her before transport to the angiography suite. She follows commands, moves all " +
        "four extremities. One 20 g peripheral IV, no arterial line. Labs pending.",
      groups: [
        {
          heading: "EVD parameters (document all)",
          options: [
            "Reference level (tragus / EAM) and current setting (+20 cm H₂O)",
            "ICP value and waveform morphology",
            "Hourly CSF output volume and CSF colour / character",
            "System integrity — tubing secured, dressing intact, stopcock orientation",
            "Decide and document the EVD plan for transport (clamp vs open) and the ICP threshold to reopen",
          ],
        },
        {
          heading: "Anesthesia assessment",
          options: [
            "Airway exam (Mallampati, mouth opening, neck mobility, dentition) and RSI plan",
            "Confirm NPO interval and treat as a full stomach — aspiration prophylaxis, rapid-sequence induction",
            "Document BMI and its implications for airway, access and positioning",
            "Send type & screen; confirm blood availability",
            "Review coagulation studies, platelets, hemoglobin; reverse any anticoagulant / antiplatelet",
            "Check sodium, renal function and glucose before the iodinated-contrast load",
            "Plan an arterial line before induction (placed awake under local)",
            "Ensure a second large-bore IV",
          ],
        },
        {
          heading: "SAH / neuro management",
          options: [
            "Set the pre-securement SBP goal to 90–120 mmHg (she is <75 with no uncontrolled hypertension)",
            "Confirm nimodipine is started; note timing relative to induction (hypotension risk)",
            "Load levetiracetam for seizure prophylaxis per institutional protocol",
            "Timed baseline neurologic exam for post-procedure comparison",
            "Confirm consent, family communication and code status",
          ],
        },
        {
          heading: "Not appropriate here",
          options: [
            "Set an SBP goal of 160 mmHg pre-securement to maximize cerebral perfusion",
            "Accept the stated NPO time and proceed without aspiration precautions",
            "Give prophylactic tranexamic acid before the aneurysm is secured",
            "Plan to place the arterial line after induction to spare her discomfort",
          ],
        },
      ],
      keyActions: [
        "Reference level (tragus / EAM) and current setting (+20 cm H₂O)",
        "ICP value and waveform morphology",
        "Hourly CSF output volume and CSF colour / character",
        "System integrity — tubing secured, dressing intact, stopcock orientation",
        "Decide and document the EVD plan for transport (clamp vs open) and the ICP threshold to reopen",
        "Airway exam (Mallampati, mouth opening, neck mobility, dentition) and RSI plan",
        "Confirm NPO interval and treat as a full stomach — aspiration prophylaxis, rapid-sequence induction",
        "Document BMI and its implications for airway, access and positioning",
        "Send type & screen; confirm blood availability",
        "Review coagulation studies, platelets, hemoglobin; reverse any anticoagulant / antiplatelet",
        "Check sodium, renal function and glucose before the iodinated-contrast load",
        "Plan an arterial line before induction (placed awake under local)",
        "Ensure a second large-bore IV",
        "Set the pre-securement SBP goal to 90–120 mmHg (she is <75 with no uncontrolled hypertension)",
        "Confirm nimodipine is started; note timing relative to induction (hypotension risk)",
        "Load levetiracetam for seizure prophylaxis per institutional protocol",
        "Timed baseline neurologic exam for post-procedure comparison",
        "Confirm consent, family communication and code status",
      ],
      contraindicated: [
        "Set an SBP goal of 160 mmHg pre-securement to maximize cerebral perfusion",
        "Accept the stated NPO time and proceed without aspiration precautions",
        "Give prophylactic tranexamic acid before the aneurysm is secured",
        "Plan to place the arterial line after induction to spare her discomfort",
      ],
      teaching:
        "EVD parameters are vital signs here: the reference level, the setting, the ICP and waveform, and the " +
        "hourly volume and colour of the CSF all belong in your pre-op note — and the single most consequential " +
        "decision you make before leaving the unit is the EVD transport plan. On the anesthesia side this is an " +
        "emergency airway: she ate before onset, so treat her as a full stomach and plan a rapid-sequence " +
        "induction; document the BMI, send a type & screen, and check the labs that matter for a contrast load " +
        "and for nimodipine-related hypotension. Load levetiracetam per your protocol (guidelines support a " +
        "short course or none over routine prolonged prophylaxis — institutional practice varies). The " +
        "institutional pre-securement blood-pressure goal is 90–120 mmHg; the 90–140 band applies only to " +
        "patients ≥75 years or with uncontrolled hypertension. Place the arterial line before induction, under " +
        "local, so you have beat-to-beat pressure through the most turbulent minutes of the case.",
      evolution:
        "EVD documented: +20 at the tragus, ICP 11, good waveform, ~7 mL/hr lightly xanthochromic CSF. Type & " +
        "screen sent, labs acceptable, levetiracetam loaded, nimodipine confirmed. Arterial line planned " +
        "pre-induction. Transported to the angio suite.",
    }),

    cp({
      label: "2 — Transport to the IR suite",
      where: "In transit",
      vignette:
        "Before you initiate transport you must decide how the EVD travels, and what you will monitor. She " +
        "remains awake, SBP 112 on no infusion. The angio suite is two floors down.",
      groups: [
        {
          heading: "The EVD decision",
          options: [
            "Clamp the EVD for transport and continuously transduce ICP, with a pre-set threshold (sustained ICP ≥ 20–25 mmHg or a neuro change) to briefly reopen and drain",
            "Communicate the EVD plan — clamped, transduced, reopen threshold — to every team member and the receiving team",
            "Re-level and re-zero the EVD to the tragus on arrival before any drainage decision",
            "Keep the EVD open and draining at +20 throughout the move",
            "Clamp the EVD and do not transduce ICP during the move",
          ],
        },
        {
          heading: "What you will monitor en route (choose explicitly)",
          options: [
            "ECG",
            "SpO₂",
            "Transduced arterial line (place before transport if not already in)",
            "ICP (transduced from the clamped EVD)",
            "EVD setting and clamp status",
            "Non-invasive BP as a backup",
          ],
        },
        {
          heading: "Transport readiness",
          options: [
            "Blood-pressure infusion on a transport pump; IV push agents carried for a surge",
            "Keep MAP high enough for CPP ≥ 60 with the drain clamped, while holding SBP in the 90–120 band",
            "Airway equipment, oxygen sized for the trip plus a margin, suction, emergency drugs",
            "Assigned team roles; structured SBAR handoff on arrival including last ICP and CSF output",
            "Minimize stimulation; treat blood-pressure surges promptly to prevent rerupture",
          ],
        },
        {
          heading: "Not appropriate here",
          options: [
            "Transport with pulse oximetry alone to save time",
            "Disconnect the arterial line transducer for the move",
            "Give a sedative bolus to keep her comfortable and still",
          ],
        },
      ],
      keyActions: [
        "Clamp the EVD for transport and continuously transduce ICP, with a pre-set threshold (sustained ICP ≥ 20–25 mmHg or a neuro change) to briefly reopen and drain",
        "Communicate the EVD plan — clamped, transduced, reopen threshold — to every team member and the receiving team",
        "Re-level and re-zero the EVD to the tragus on arrival before any drainage decision",
        "ECG",
        "SpO₂",
        "Transduced arterial line (place before transport if not already in)",
        "ICP (transduced from the clamped EVD)",
        "EVD setting and clamp status",
        "Non-invasive BP as a backup",
        "Blood-pressure infusion on a transport pump; IV push agents carried for a surge",
        "Keep MAP high enough for CPP ≥ 60 with the drain clamped, while holding SBP in the 90–120 band",
        "Airway equipment, oxygen sized for the trip plus a margin, suction, emergency drugs",
        "Assigned team roles; structured SBAR handoff on arrival including last ICP and CSF output",
        "Minimize stimulation; treat blood-pressure surges promptly to prevent rerupture",
      ],
      contraindicated: [
        "Keep the EVD open and draining at +20 throughout the move",
        "Clamp the EVD and do not transduce ICP during the move",
        "Transport with pulse oximetry alone to save time",
        "Disconnect the arterial line transducer for the move",
        "Give a sedative bolus to keep her comfortable and still",
      ],
      teaching:
        "The pre-transport EVD decision is the crux of this phase. Leaving the drain open during a move invites " +
        "overdrainage and siphoning as the bed and the head change height — and while it drains you are not " +
        "monitoring ICP. Clamping blindly leaves you unaware of a rise. For a short transport in a patient with " +
        "a normal ICP, the defensible plan is to clamp and continuously transduce ICP with a pre-specified " +
        "reopen threshold, and to communicate that plan to everyone touching the patient. Decide before you " +
        "leave exactly what you will watch: ECG, SpO₂, a transduced arterial line, ICP, and the EVD's setting " +
        "and clamp status. With the drain clamped, cerebral perfusion pressure is MAP minus ICP — keep the MAP " +
        "high enough for a CPP of at least 60 even while you hold SBP in the 90–120 band. Re-zero the drain to " +
        "the tragus on arrival before you touch the stopcock.",
      evolution:
        "EVD clamped, ICP transduced and stable at 12–14 during the move, no reopening needed. Monitors " +
        "maintained, SBAR given. EVD re-zeroed to the tragus in the angio suite.",
    }),

    cp({
      label: "3 — Intra-procedural care",
      where: "Angiography suite",
      vignette:
        "She is on the table, arterial line in from pre-induction placement, EVD re-zeroed and transduced. " +
        "Plan: general anesthesia for coiling.",
      groups: [
        {
          heading: "Monitoring — before induction",
          options: [
            "Full monitoring before induction: ECG, transduced arterial line, SpO₂, capnography, temperature, urinary catheter, neuromuscular monitor, transduced EVD/ICP",
            "Confirm the arterial line is functioning before induction",
          ],
        },
        {
          heading: "Agents",
          options: [
            "Induction: propofol + opioid (fentanyl or remifentanil) ± lidocaine to blunt the laryngoscopy response, rocuronium; rapid-sequence given full-stomach status",
            "Maintenance: TIVA (propofol / remifentanil) or low-dose volatile (< 1 MAC) + remifentanil; no nitrous oxide",
            "Isotonic, non–glucose-containing crystalloid; avoid ketamine and histamine-releasing agents",
          ],
        },
        {
          heading: "Hemodynamics & EVD",
          options: [
            "Hold SBP in the pre-securement band (90–120 mmHg) until the aneurysm is secured, then reset goals with neuro-IR",
            "Maintain CPP ≥ 60 (MAP − ICP) throughout; treat hypotension promptly",
            "Transduce ICP intra-op; drain to the set level if ICP rises; record CSF output and colour",
            "Follow ACT for systemic heparinization per neuro-IR; protamine available (reversal is a coordinated decision)",
          ],
        },
        {
          heading: "Neuromuscular blockade & emergence",
          options: [
            "Deep neuromuscular blockade for absolute immobility — target post-tetanic count (PTC) 0 on the twitch monitor during coil deployment",
            "Full reversal at the end with sugammadex (block is too deep for neostigmine); document train-of-four ratio ≥ 0.9",
            "Plan a smooth emergence; extubate awake, fully reversed, following commands so a neuro exam is possible",
            "Antibiotic prophylaxis per protocol — document name, dose, time",
          ],
        },
        {
          heading: "Not appropriate here",
          options: [
            "Permissive hypertension throughout the case for vasospasm prophylaxis",
            "Nitrous oxide as part of maintenance",
            "Hypotonic or glucose-containing maintenance fluid",
            "Reverse with neostigmine while the block is still deep (PTC 0)",
            "Extubate deep to avoid coughing on the tube",
          ],
        },
      ],
      keyActions: [
        "Full monitoring before induction: ECG, transduced arterial line, SpO₂, capnography, temperature, urinary catheter, neuromuscular monitor, transduced EVD/ICP",
        "Confirm the arterial line is functioning before induction",
        "Induction: propofol + opioid (fentanyl or remifentanil) ± lidocaine to blunt the laryngoscopy response, rocuronium; rapid-sequence given full-stomach status",
        "Maintenance: TIVA (propofol / remifentanil) or low-dose volatile (< 1 MAC) + remifentanil; no nitrous oxide",
        "Isotonic, non–glucose-containing crystalloid; avoid ketamine and histamine-releasing agents",
        "Hold SBP in the pre-securement band (90–120 mmHg) until the aneurysm is secured, then reset goals with neuro-IR",
        "Maintain CPP ≥ 60 (MAP − ICP) throughout; treat hypotension promptly",
        "Transduce ICP intra-op; drain to the set level if ICP rises; record CSF output and colour",
        "Follow ACT for systemic heparinization per neuro-IR; protamine available (reversal is a coordinated decision)",
        "Deep neuromuscular blockade for absolute immobility — target post-tetanic count (PTC) 0 on the twitch monitor during coil deployment",
        "Full reversal at the end with sugammadex (block is too deep for neostigmine); document train-of-four ratio ≥ 0.9",
        "Plan a smooth emergence; extubate awake, fully reversed, following commands so a neuro exam is possible",
        "Antibiotic prophylaxis per protocol — document name, dose, time",
      ],
      contraindicated: [
        "Permissive hypertension throughout the case for vasospasm prophylaxis",
        "Nitrous oxide as part of maintenance",
        "Hypotonic or glucose-containing maintenance fluid",
        "Reverse with neostigmine while the block is still deep (PTC 0)",
        "Extubate deep to avoid coughing on the tube",
      ],
      teaching:
        "Sequence matters — full monitoring, including the arterial line and the transduced EVD, before " +
        "induction, not after. A blunted rapid-sequence induction protects against both the hypertensive " +
        "laryngoscopy response and aspiration. Keep the pressure in the pre-securement band until the coil mass " +
        "is in; with the EVD available to drain, track CPP as MAP minus ICP and don't let it fall below 60. " +
        "Absolute immobility during coil deployment is non-negotiable — run a deep block to a post-tetanic " +
        "count of zero, and because that depth cannot be reversed with neostigmine, plan sugammadex and " +
        "document a train-of-four ratio of at least 0.9 before extubation. Extubate her awake and following " +
        "commands: the neuro exam is the point. Nitrous oxide is avoided (pneumocephalus with the " +
        "ventriculostomy and intracranial air); fluids are isotonic and glucose-free.",
      evolution:
        "Full monitoring established pre-induction. Smooth RSI, TIVA maintenance, SBP held 95–115, CPP 60–75, " +
        "ICP 10–15 with ~10 mL of clear-xanthochromic CSF drained over the case. Deep block held at PTC 0 " +
        "during coiling. A-comm aneurysm coiled without a stent, no intraprocedural rupture. Heparin allowed to " +
        "drift down, no protamine. Sugammadex given, TOF ratio 1.0. Extubated awake and following commands.",
    }),

    cp({
      label: "4 — Emergence, documentation & handoff",
      where: "Angio suite → Neuro ICU",
      vignette:
        "Case complete, extubated, exam at baseline. You are completing the anesthetic record and preparing " +
        "transport back to the neuro ICU.",
      groups: [
        {
          heading: "Anesthetic record — document",
          options: [
            "Antibiotic: name, dose, time",
            "Anesthetic: induction agents and doses; maintenance technique",
            "Fluids: crystalloid type and total volume; blood products if any; estimated blood loss",
            "Urine output",
            "Hemodynamics: SBP / MAP range, CPP range, any vasoactive infusions",
            "ICP values and trend",
            "EVD: reference level, setting, open/clamped status and changes, total CSF output, CSF colour",
            "Heparin / ACT values, protamine (given or not), contrast volume",
            "Neuromuscular blockade: agent, monitoring (PTC / TOF), reversal agent and dose, TOF ratio at extubation",
            "Temperature and glucose",
            "Neurologic exam at emergence vs the timed baseline",
          ],
        },
        {
          heading: "Transport back & handoff",
          options: [
            "Transport to the ICU with continued ICP monitoring and full monitoring; maintain the blood-pressure goal",
            "EVD for the return trip: clamped and transduced with a reopen threshold, re-zeroed to the tragus on arrival",
            "Immediate post-procedure neuro exam; treat any new deficit as thromboembolic → imaging / back to angio",
            "Access-site check: hematoma, distal pulses, retroperitoneal signs",
            "Structured handoff: aneurysm secured (coil, no stent, no antiplatelet), intra-op course, EVD plan and last ICP / CSF output, infusions, exam, and that DCI surveillance + nimodipine continue",
          ],
        },
        {
          heading: "Not appropriate here",
          options: [
            "Transport back without ICP monitoring now that she is awake and extubated",
            "Keep SBP restricted at the pre-securement ceiling now that the aneurysm is secured",
            "Attribute a new mild arm drift to residual anesthetic and reassess in a few hours",
            "Omit CSF output and colour from the anesthetic record",
          ],
        },
      ],
      keyActions: [
        "Antibiotic: name, dose, time",
        "Anesthetic: induction agents and doses; maintenance technique",
        "Fluids: crystalloid type and total volume; blood products if any; estimated blood loss",
        "Urine output",
        "Hemodynamics: SBP / MAP range, CPP range, any vasoactive infusions",
        "ICP values and trend",
        "EVD: reference level, setting, open/clamped status and changes, total CSF output, CSF colour",
        "Heparin / ACT values, protamine (given or not), contrast volume",
        "Neuromuscular blockade: agent, monitoring (PTC / TOF), reversal agent and dose, TOF ratio at extubation",
        "Temperature and glucose",
        "Neurologic exam at emergence vs the timed baseline",
        "Transport to the ICU with continued ICP monitoring and full monitoring; maintain the blood-pressure goal",
        "EVD for the return trip: clamped and transduced with a reopen threshold, re-zeroed to the tragus on arrival",
        "Immediate post-procedure neuro exam; treat any new deficit as thromboembolic → imaging / back to angio",
        "Access-site check: hematoma, distal pulses, retroperitoneal signs",
        "Structured handoff: aneurysm secured (coil, no stent, no antiplatelet), intra-op course, EVD plan and last ICP / CSF output, infusions, exam, and that DCI surveillance + nimodipine continue",
      ],
      contraindicated: [
        "Transport back without ICP monitoring now that she is awake and extubated",
        "Keep SBP restricted at the pre-securement ceiling now that the aneurysm is secured",
        "Attribute a new mild arm drift to residual anesthetic and reassess in a few hours",
        "Omit CSF output and colour from the anesthetic record",
      ],
      teaching:
        "The anesthetic record for an EVD case carries more than the usual dataset: alongside antibiotics, " +
        "agents, fluids (type and volume), urine output and estimated blood loss, document the ICP trend and " +
        "CPP range, and the EVD in full — reference level, setting, whether it was open or clamped and when " +
        "that changed, total CSF volume, and the colour of the CSF. Record the neuromuscular blockade depth, " +
        "how it was monitored, the reversal agent, and the train-of-four ratio at extubation. She returns to " +
        "the unit with continued ICP monitoring and the same clamp-and-transduce logic as the trip out. The " +
        "aneurysm is secured, so the pre-securement 90–120 band no longer governs — reset the goal with the " +
        "team — and a new deficit now is a thromboembolic event until angiography says otherwise.",
      evolution:
        "Complete anesthetic record including full EVD and neuromuscular data. Transported to the ICU with ICP " +
        "monitoring, EVD clamped and transduced, exam at baseline, groin intact. Structured handoff given. " +
        "Uneventful case.",
    }),
  ],
};

// ====================================================================
// CASE B — ADVANCED (poor grade, SBP exception, stent + antiplatelet,
// intraprocedural rupture, back to ICU intubated)
// ====================================================================

const ADVANCED = {
  id: "advanced",
  label: "Advanced case (poor grade, complications)",
  presentation:
    "78 y/o man, long-standing poorly controlled hypertension, found unresponsive. Intubated in the field. " +
    "Off sedation: localizes on the left, extensor on the right, no eye opening. Hunt-Hess 4, WFNS 4. CT: " +
    "thick cisternal SAH, bilateral IVH, hydrocephalus — EVD placed, draining at +15 cm H₂O, ICP 22, " +
    "frankly bloody CSF, ~15 mL/hr. CTA: 9 mm wide-necked anterior communicating artery aneurysm — " +
    "neuro-IR expects to need stent assist. Troponin elevated, echo shows an apical wall-motion " +
    "abnormality with mildly reduced EF (neurogenic stunned myocardium). Age ≥75 AND uncontrolled " +
    "hypertension → institutional pre-securement SBP goal 90–140 mmHg.",
  checkpoints: [
    cp({
      label: "1 — Pre-procedure assessment",
      where: "Neuro ICU",
      vignette:
        "He is intubated and mechanically ventilated, on a low-dose norepinephrine infusion for MAP support. " +
        "ICP 20–24 with a sluggish waveform. Family at bedside.",
      groups: [
        {
          heading: "EVD & ICP",
          options: [
            "Document reference level, setting (+15), ICP trend (already 20–24), waveform, hourly CSF output (~15 mL/hr), bloody CSF",
            "Recognize baseline intracranial hypertension — the routine 'clamp for transport' default does not apply unchanged; plan for drainage availability",
            "Set a low reopen threshold and expect to reopen; consider transporting with the drain open under direct observation",
          ],
        },
        {
          heading: "Anesthesia / hemodynamics",
          options: [
            "Airway already secured — confirm ETT position, cuff, ventilator settings; aspiration risk already mitigated",
            "Set the pre-securement SBP goal to 90–140 mmHg (he is ≥75 AND has uncontrolled hypertension — the institutional exception)",
            "Account for the neurogenic stunned myocardium: cautious fluid loading, consider an inotrope rather than pure vasopressor for CPP support",
            "Target CPP ≥ 60 with ICP in the low 20s — this needs a higher MAP than the routine case",
            "Type & crossmatch (not just screen); confirm blood in the room given the wide neck and IVH",
            "Review coags / platelets / hemoglobin; transport ventilator, infusion pumps, full monitoring",
          ],
        },
        {
          heading: "Procedure planning",
          options: [
            "Coordinate the antiplatelet plan with neuro-IR now — a stent is expected and intraprocedural loading must be decided before the case",
            "Confirm nimodipine (split dosing if the pressure is soft) and levetiracetam load per protocol",
            "Timed baseline exam (off sedation) for post-procedure comparison",
            "Goals-of-care conversation with the family given poor grade + age",
          ],
        },
        {
          heading: "Not appropriate here",
          options: [
            "Use the standard 90–120 mmHg pre-securement goal",
            "Clamp the EVD for transport with a routine ICP ≥ 25 reopen threshold and no expectation of reopening",
            "Aggressively fluid-load to a high CVP to support blood pressure",
            "Defer the antiplatelet discussion until a stent is actually deployed",
          ],
        },
      ],
      keyActions: [
        "Document reference level, setting (+15), ICP trend (already 20–24), waveform, hourly CSF output (~15 mL/hr), bloody CSF",
        "Recognize baseline intracranial hypertension — the routine 'clamp for transport' default does not apply unchanged; plan for drainage availability",
        "Set a low reopen threshold and expect to reopen; consider transporting with the drain open under direct observation",
        "Airway already secured — confirm ETT position, cuff, ventilator settings; aspiration risk already mitigated",
        "Set the pre-securement SBP goal to 90–140 mmHg (he is ≥75 AND has uncontrolled hypertension — the institutional exception)",
        "Account for the neurogenic stunned myocardium: cautious fluid loading, consider an inotrope rather than pure vasopressor for CPP support",
        "Target CPP ≥ 60 with ICP in the low 20s — this needs a higher MAP than the routine case",
        "Type & crossmatch (not just screen); confirm blood in the room given the wide neck and IVH",
        "Review coags / platelets / hemoglobin; transport ventilator, infusion pumps, full monitoring",
        "Coordinate the antiplatelet plan with neuro-IR now — a stent is expected and intraprocedural loading must be decided before the case",
        "Confirm nimodipine (split dosing if the pressure is soft) and levetiracetam load per protocol",
        "Timed baseline exam (off sedation) for post-procedure comparison",
        "Goals-of-care conversation with the family given poor grade + age",
      ],
      contraindicated: [
        "Use the standard 90–120 mmHg pre-securement goal",
        "Clamp the EVD for transport with a routine ICP ≥ 25 reopen threshold and no expectation of reopening",
        "Aggressively fluid-load to a high CVP to support blood pressure",
        "Defer the antiplatelet discussion until a stent is actually deployed",
      ],
      teaching:
        "Two things move the targets in this patient. First, the institutional SBP exception applies — he is " +
        "≥75 AND has uncontrolled hypertension — so the pre-securement goal is 90–140, not 90–120; and with an " +
        "ICP in the low 20s a CPP ≥ 60 requires a higher MAP than usual, which the stunned myocardium makes " +
        "harder to deliver (favor an inotrope over pure vasoconstriction, and avoid aggressive fluid loading). " +
        "Second, his baseline intracranial hypertension changes the transport EVD calculus: the reflex 'clamp " +
        "and transduce' plan is for a patient with a normal ICP — here you plan for reopening, set a low " +
        "threshold, and may reasonably transport with the drain open under direct observation. The stent is " +
        "expected, so the antiplatelet decision is made with neuro-IR before the case, not after a stent is on " +
        "the screen.",
      evolution:
        "EVD parameters documented, blood crossmatched and in the room, antiplatelet plan agreed with neuro-IR " +
        "(intraprocedural cangrelor if a stent is placed). Norepinephrine plus a low-dose epinephrine infusion " +
        "started for CPP. Transported to the angio suite with the drain open under direct observation, ICP 18–22 en route.",
    }),

    cp({
      label: "2 — Transport & ICP event",
      where: "In transit",
      vignette:
        "Midway through the transport the ICP climbs from 20 to 32 over two minutes. MAP 95, CPP now ~63 and " +
        "falling. He is more extensor on the right.",
      groups: [
        {
          heading: "Immediate response",
          options: [
            "Open the EVD and drain to the set level; document the volume and response",
            "Confirm head-of-bed elevation and a neutral neck; check for ETT / circuit obstruction, ventilator asynchrony, hypercarbia",
            "Raise the MAP to restore CPP ≥ 60 while you address the ICP",
            "Give a hyperosmolar bolus (hypertonic saline or mannitol) if the ICP does not settle with drainage and positioning",
            "Hand-ventilate to normocapnia; brief mild hyperventilation only as a bridge if herniation is threatened",
            "Call ahead so neuro-IR and the OR team are ready on arrival; consider whether imaging is needed first",
          ],
        },
        {
          heading: "Not appropriate here",
          options: [
            "Keep the drain clamped and continue to the suite since the transport is almost done",
            "Sustain aggressive hyperventilation to an EtCO₂ of 25 for the rest of the transport",
            "Lower the MAP to reduce the ICP",
            "Give a large crystalloid bolus to treat the rising ICP",
          ],
        },
      ],
      keyActions: [
        "Open the EVD and drain to the set level; document the volume and response",
        "Confirm head-of-bed elevation and a neutral neck; check for ETT / circuit obstruction, ventilator asynchrony, hypercarbia",
        "Raise the MAP to restore CPP ≥ 60 while you address the ICP",
        "Give a hyperosmolar bolus (hypertonic saline or mannitol) if the ICP does not settle with drainage and positioning",
        "Hand-ventilate to normocapnia; brief mild hyperventilation only as a bridge if herniation is threatened",
        "Call ahead so neuro-IR and the OR team are ready on arrival; consider whether imaging is needed first",
      ],
      contraindicated: [
        "Keep the drain clamped and continue to the suite since the transport is almost done",
        "Sustain aggressive hyperventilation to an EtCO₂ of 25 for the rest of the transport",
        "Lower the MAP to reduce the ICP",
        "Give a large crystalloid bolus to treat the rising ICP",
      ],
      teaching:
        "This is exactly the event the transport plan should have anticipated. The first move is to drain — the " +
        "EVD is the fastest ICP-lowering tool you have — then optimize the reversible contributors: head " +
        "position, venous drainage, ETT and circuit patency, CO₂. Protect CPP by raising the MAP, not by " +
        "letting the pressure fall. Hyperosmolar therapy is the next step if drainage and positioning don't " +
        "settle it; aggressive, sustained hyperventilation causes ischemia and is only a short bridge to a " +
        "definitive intervention. A large crystalloid bolus does nothing for the ICP and worsens cerebral " +
        "edema — support the circulation with pressors and inotropes and targeted osmotherapy instead.",
      evolution:
        "EVD opened, ~12 mL of bloody CSF drained, ICP falls to 18. MAP supported to 100, CPP 82. Hypertonic " +
        "saline bolus given. He arrives in the suite; exam back to his pre-transport baseline. Proceed with the procedure.",
    }),

    cp({
      label: "3 — Intra-procedural care & rupture",
      where: "Angiography suite",
      vignette:
        "General anesthesia continued (he was already intubated). Femoral access, heparin to ACT. During " +
        "coiling of the wide neck, neuro-IR places a stent and gives intraprocedural cangrelor. Moments later: " +
        "contrast extravasation — intraprocedural rupture. Sudden ICP rise to 40, bradycardia, hypertension.",
      groups: [
        {
          heading: "Rupture response — anesthesia",
          options: [
            "Call it out, call for help, and get the massive-transfusion / blood products started",
            "Acutely lower the blood pressure (short-acting agent) to reduce bleeding while IR gains control",
            "Open the EVD wide and drain aggressively to control the ICP; give a hyperosmolar bolus",
            "Discuss heparin reversal with neuro-IR — a stent plus cangrelor is on board, so protamine is a shared decision and cangrelor's short half-life is relevant",
            "Support oxygenation and circulation; transfuse to maintain oxygen-carrying capacity and correct coagulopathy",
            "Maintain deep neuromuscular blockade (PTC 0) — absolute immobility while IR deploys a balloon / more coils",
          ],
        },
        {
          heading: "After control is regained",
          options: [
            "Do NOT extubate — poor grade plus intraprocedural rupture; keep intubated and sedated for transport",
            "Plan an immediate post-procedure CT to assess the bleed, ventricle size and infarction",
            "Reconcile the bleeding-vs-thrombosis tension created by the stent + antiplatelet with neuro-IR and neurosurgery",
            "Continue full neuromuscular reversal documentation even though he stays intubated (agent, TOF)",
          ],
        },
        {
          heading: "Not appropriate here",
          options: [
            "Raise the blood pressure to improve cerebral perfusion during active extravasation",
            "Give full-dose protamine immediately without discussing the stent",
            "Keep the EVD clamped to avoid CSF loss",
            "Plan to extubate at the end of the case since access was uncomplicated",
          ],
        },
      ],
      keyActions: [
        "Call it out, call for help, and get the massive-transfusion / blood products started",
        "Acutely lower the blood pressure (short-acting agent) to reduce bleeding while IR gains control",
        "Open the EVD wide and drain aggressively to control the ICP; give a hyperosmolar bolus",
        "Discuss heparin reversal with neuro-IR — a stent plus cangrelor is on board, so protamine is a shared decision and cangrelor's short half-life is relevant",
        "Support oxygenation and circulation; transfuse to maintain oxygen-carrying capacity and correct coagulopathy",
        "Maintain deep neuromuscular blockade (PTC 0) — absolute immobility while IR deploys a balloon / more coils",
        "Do NOT extubate — poor grade plus intraprocedural rupture; keep intubated and sedated for transport",
        "Plan an immediate post-procedure CT to assess the bleed, ventricle size and infarction",
        "Reconcile the bleeding-vs-thrombosis tension created by the stent + antiplatelet with neuro-IR and neurosurgery",
        "Continue full neuromuscular reversal documentation even though he stays intubated (agent, TOF)",
      ],
      contraindicated: [
        "Raise the blood pressure to improve cerebral perfusion during active extravasation",
        "Give full-dose protamine immediately without discussing the stent",
        "Keep the EVD clamped to avoid CSF loss",
        "Plan to extubate at the end of the case since access was uncomplicated",
      ],
      teaching:
        "Intraprocedural rupture inverts the hemodynamic goal for a few minutes: drop the pressure to reduce " +
        "bleeding while IR regains control with a balloon and more coils. The EVD earns its place now — open it " +
        "and drain aggressively against the ICP spike, and add osmotherapy. Heparin reversal is not automatic: " +
        "a freshly deployed stent with cangrelor on board means protamine is a shared decision with neuro-IR, " +
        "and cangrelor's very short half-life means antiplatelet effect resolves quickly once it is stopped. " +
        "Absolute immobility still matters while coils are being placed, so the deep block stays. Afterward, a " +
        "poor-grade patient who has just had an intraprocedural rupture does not get extubated — he goes back " +
        "to the unit intubated, sedated, with ICP monitoring, and gets a CT.",
      evolution:
        "Blood pressure dropped acutely, balloon inflated, additional coils placed, extravasation stops. ~40 mL " +
        "of bloody CSF drained, hypertonic saline given, ICP settles to 20. Cangrelor stopped; no protamine per " +
        "neuro-IR. Two units of red cells transfused. He remains intubated. Deep block maintained then partially " +
        "reversed for transport per plan.",
    }),

    cp({
      label: "4 — Transfer (intubated) & handoff",
      where: "Angio suite → CT → Neuro ICU",
      vignette:
        "Aneurysm secured with a stent-assisted coil. He remains intubated and sedated, on norepinephrine and " +
        "epinephrine, EVD draining at +15, ICP 18–22.",
      groups: [
        {
          heading: "Transfer",
          options: [
            "Transport intubated with continued ICP monitoring, full monitoring, transport ventilator, and infusions on pumps",
            "EVD open and draining at the set level under direct observation for this trip, given the rupture and IVH; re-zero to the tragus at each stop",
            "Go to CT en route to the ICU; have the images reviewed before handoff",
            "Maintain CPP ≥ 60 with pressor + inotrope; the pre-securement SBP band no longer applies (aneurysm secured) — set the new goal with the team",
            "Sedation and analgesia titrated for transport without losing the ability to trend the pupils",
          ],
        },
        {
          heading: "Handoff — must include",
          options: [
            "Aneurysm secured with a STENT + coil → he is on antiplatelet (cangrelor stopped; bridging / oral plan pending) — the bleeding-vs-thrombosis tension",
            "Intraprocedural rupture: timeline, blood pressure management, CSF drained, blood products, current coagulation status",
            "Heparin / protamine status (no protamine given) and ACT",
            "EVD: setting, open/clamped, total CSF output, CSF colour; ICP and CPP trend",
            "Anesthetic record: agents, fluids/crystalloid type and volume, urine output, antibiotics, temperature, glucose, neuromuscular agent + monitoring + reversal",
            "Not extubated and why; sedation plan; pending post-procedure CT read; that DCI surveillance and nimodipine continue",
          ],
        },
        {
          heading: "Not appropriate here",
          options: [
            "Clamp the EVD for the transfer to avoid CSF loss",
            "Extubate before leaving the suite since the aneurysm is secured",
            "Hold the SBP at the pre-securement band during transfer",
            "Defer the CT until the next morning",
          ],
        },
      ],
      keyActions: [
        "Transport intubated with continued ICP monitoring, full monitoring, transport ventilator, and infusions on pumps",
        "EVD open and draining at the set level under direct observation for this trip, given the rupture and IVH; re-zero to the tragus at each stop",
        "Go to CT en route to the ICU; have the images reviewed before handoff",
        "Maintain CPP ≥ 60 with pressor + inotrope; the pre-securement SBP band no longer applies (aneurysm secured) — set the new goal with the team",
        "Sedation and analgesia titrated for transport without losing the ability to trend the pupils",
        "Aneurysm secured with a STENT + coil → he is on antiplatelet (cangrelor stopped; bridging / oral plan pending) — the bleeding-vs-thrombosis tension",
        "Intraprocedural rupture: timeline, blood pressure management, CSF drained, blood products, current coagulation status",
        "Heparin / protamine status (no protamine given) and ACT",
        "EVD: setting, open/clamped, total CSF output, CSF colour; ICP and CPP trend",
        "Anesthetic record: agents, fluids/crystalloid type and volume, urine output, antibiotics, temperature, glucose, neuromuscular agent + monitoring + reversal",
        "Not extubated and why; sedation plan; pending post-procedure CT read; that DCI surveillance and nimodipine continue",
      ],
      contraindicated: [
        "Clamp the EVD for the transfer to avoid CSF loss",
        "Extubate before leaving the suite since the aneurysm is secured",
        "Hold the SBP at the pre-securement band during transfer",
        "Defer the CT until the next morning",
      ],
      teaching:
        "The advanced case changes the transfer in three ways. The EVD travels open and draining under direct " +
        "observation — a patient with fresh IVH and an intraprocedural rupture is the wrong patient for a " +
        "clamp-and-hope transport. He goes to CT before he goes to a bed. And the handoff has one item that " +
        "cannot be missed: he has a stent and is on antiplatelet therapy, immediately after an intracranial " +
        "bleed — every subsequent decision (a repeat tap, a shunt, an OR trip) is now a bleeding-versus-stent-" +
        "thrombosis trade-off, and the receiving team has to know that before anything else. Document the " +
        "rupture timeline, the CSF drained, the blood products, the antiplatelet and heparin status, the full " +
        "EVD and neuromuscular data, and why he is still intubated.",
      evolution:
        "CT: expected post-coil changes, stable ventricles on drainage, no new large infarct. Transferred to " +
        "the ICU intubated, EVD draining, on pressor + inotrope, with a structured handoff that led with the " +
        "stent + antiplatelet status. Neurosurgery and neuro-IR aware.",
    }),
  ],
};

const CASES = { routine: ROUTINE, advanced: ADVANCED };

// ---- scoring -------------------------------------------------------

function scoreCheckpoint(checkpoint, selected) {
  const sel = new Set(selected);
  const correct = checkpoint.keyActions.filter((a) => sel.has(a));
  const missed = checkpoint.keyActions.filter((a) => !sel.has(a));
  const harmful = checkpoint.contraindicated.filter((a) => sel.has(a));
  const pct = Math.round(
    100 * Math.min(1, Math.max(0, (correct.length - harmful.length) / Math.max(1, checkpoint.keyActions.length)))
  );
  const grade = pct >= 85 ? "on target" : pct >= 60 ? "mostly there" : pct >= 35 ? "gaps" : "review this step";
  return { selected: [...selected], correct, missed, harmful, pct, grade };
}

// ---- DOM helpers --------------------------------------------------

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

// ---- widget -----------------------------------------------------

export function mountPeriproceduralSim(root) {
  let caseId = "routine";
  let idx = 0;
  let results = {};

  const start = () => { idx = 0; results = {}; render(); };

  function chips(items, cls) {
    return items.map((t) => el("span", { class: `evdsim-badge ${cls}` }, t));
  }

  function feedbackEl(sc, checkpoint) {
    const alert = sc.pct >= 85 ? "evdsim-ok" : sc.pct >= 60 ? "evdsim-info"
      : sc.pct >= 35 ? "evdsim-warn" : "evdsim-bad";
    return el("div", { class: "evdsim-feedback" },
      el("div", { class: `evdsim-alert ${alert}` }, el("strong", {}, `${sc.pct}% — ${sc.grade}`)),
      sc.correct.length ? el("div", { class: "evdsim-fbrow" },
        el("div", { class: "evdsim-sm evdsim-tok-ok" }, "On target"), el("div", {}, chips(sc.correct, "evdsim-b-ok"))) : null,
      sc.missed.length ? el("div", { class: "evdsim-fbrow" },
        el("div", { class: "evdsim-sm evdsim-tok-warn" }, "Missed"), el("div", {}, chips(sc.missed, "evdsim-b-warn"))) : null,
      sc.harmful.length ? el("div", { class: "evdsim-fbrow" },
        el("div", { class: "evdsim-sm evdsim-tok-bad" }, "Reconsider — runs against best practice"),
        el("div", {}, chips(sc.harmful, "evdsim-b-bad"))) : null,
      el("p", { class: "evdsim-sm evdsim-teach" }, checkpoint.teaching));
  }

  function summaryEl(kase) {
    const scs = Object.values(results);
    const mean = Math.round(scs.reduce((a, s) => a + s.pct, 0) / scs.length);
    const missed = [...new Set(scs.flatMap((s) => s.missed))];
    const harmful = [...new Set(scs.flatMap((s) => s.harmful))];
    return el("div", { class: "evdsim-card evdsim-card-primary" },
      el("div", { class: "evdsim-card-head evdsim-head-primary" }, `${kase.label} — complete`),
      el("div", { class: "evdsim-card-body" },
        el("div", {}, `Mean score across ${scs.length} steps: ${mean}%`),
        missed.length ? el("div", {},
          el("div", { class: "evdsim-sm evdsim-strong" }, "Key actions missed at least once:"),
          el("ul", {}, missed.map((t) => el("li", {}, t)))) : null,
        harmful.length ? el("div", {},
          el("div", { class: "evdsim-sm evdsim-strong evdsim-tok-bad" }, "Against best practice, selected:"),
          el("ul", {}, harmful.map((t) => el("li", {}, t)))) : null,
        el("button", { class: "evdsim-btn", onclick: start }, "Restart this case"),
        caseId === "routine"
          ? el("button", { class: "evdsim-btn evdsim-btn-primary",
              onclick: () => { caseId = "advanced"; start(); } }, "Try the advanced case →")
          : el("button", { class: "evdsim-btn",
              onclick: () => { caseId = "routine"; start(); } }, "Back to the routine case")));
  }

  function render() {
    clearNode(root);
    const kase = CASES[caseId];
    const total = kase.checkpoints.length;

    // case picker
    const picker = el("div", { class: "evdsim-picker" },
      el("span", { class: "evdsim-sm evdsim-strong" }, "Case: "),
      ...Object.values(CASES).map((c) =>
        el("button", {
          class: "evdsim-pick " + (c.id === caseId ? "active" : ""),
          onclick: () => { if (c.id !== caseId) { caseId = c.id; start(); } },
        }, c.label)));
    root.appendChild(picker);

    root.appendChild(el("div", { class: "evdsim-card" },
      el("div", { class: "evdsim-card-head" }, "Virtual patient — presentation"),
      el("div", { class: "evdsim-card-body" }, kase.presentation)));

    root.appendChild(el("div", { class: "evdsim-progress" },
      kase.checkpoints.map((c, i) =>
        el("span", { class: "evdsim-step " + (i < idx ? "done" : i === idx ? "current" : "") },
          c.label))));

    const checkpoint = kase.checkpoints[idx];
    const done = results[idx];

    const groupEls = checkpoint.groups.map((g) =>
      el("div", { class: "evdsim-group" },
        el("div", { class: "evdsim-group-head" }, g.heading),
        el("div", { class: "evdsim-opts" },
          g.options.map((opt) =>
            el("label", { class: "evdsim-opt" },
              el("input", { type: "checkbox", value: opt,
                ...(done && done.selected.includes(opt) ? { checked: "checked" } : {}),
                ...(done ? { disabled: "disabled" } : {}) }),
              el("span", {}, opt))))));

    const card = el("div", { class: "evdsim-card" },
      el("div", { class: "evdsim-card-head" }, checkpoint.label,
        el("span", { class: "evdsim-where" }, checkpoint.where)),
      el("div", { class: "evdsim-card-body" },
        el("p", {}, checkpoint.vignette),
        ...groupEls));
    root.appendChild(card);

    const body = card.querySelector(".evdsim-card-body");

    if (!done) {
      body.appendChild(el("button", { class: "evdsim-btn evdsim-btn-primary",
        onclick: () => {
          const selected = [...card.querySelectorAll("input:checked")].map((i) => i.value);
          results[idx] = scoreCheckpoint(checkpoint, selected);
          render();
        } }, "Submit choices"));
    } else {
      body.appendChild(feedbackEl(done, checkpoint));
      body.appendChild(el("div", { class: "evdsim-evolution" },
        el("div", { class: "evdsim-strong" }, "What happens next:"),
        el("div", {}, checkpoint.evolution)));
      if (idx < total - 1) {
        body.appendChild(el("button", { class: "evdsim-btn evdsim-btn-ok",
          onclick: () => { idx += 1; render(); } }, "Continue →"));
      } else {
        body.appendChild(summaryEl(kase));
      }
    }
  }

  render();
}
