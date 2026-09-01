// evd-scenarios.js --------------------------------------------------------
// A library of short BRANCHING scenarios, each built around a single core EVD
// concept. Choices lead down different paths; some recover, some cascade.
// Modeled on multi-pathway simulation-based transport training.
//
// Educational use only. DRAFT clinical content and DRAFT branching logic —
// verify against your institution's protocols before teaching use.
//
// ---- schema ------------------------------------------------------------
// scenario = {
//   id, title, concept, level: "core" | "advanced", setup, start,
//   nodes: {
//     <id>: {
//       situation,               // what is happening now (optional)
//       prompt,                  // the decision
//       choices: [ { text, tag: "best"|"ok"|"poor"|"harmful", feedback, goto } ],
//     }
//     <id>: { end: true, outcome: "good"|"mixed"|"bad", title, debrief }
//   }
// }

const C = (text, tag, feedback, goto) => ({ text, tag, feedback, goto });
const END = (outcome, title, debrief) => ({ end: true, outcome, title, debrief });

export const SCENARIOS = [

  // ==================================================================
  {
    id: "clamp-no-monitor",
    title: "Clamped without monitoring",
    concept: "Never move a clamped EVD without continuous ICP monitoring.",
    level: "core",
    setup:
      "Day 3 aneurysmal SAH, aneurysm coiled. EVD at +15 cm H₂O (leveled at the tragus), " +
      "ICP 9–12, ~4 mL/hr of xanthochromic CSF. Ordered for a routine follow-up CT. You are " +
      "setting up for transport.",
    start: "plan",
    nodes: {
      plan: {
        prompt: "How will the EVD travel?",
        choices: [
          C("Clamp it and continuously transduce ICP, with a threshold to reopen and drain",
            "best",
            "This is the standard: the drain is closed so it can't over-drain with position changes, and you keep a continuous ICP reading the whole way.",
            "monitored"),
          C("Clamp it — it's a short CT run, no need to transduce",
            "harmful",
            "A clamped EVD with no ICP monitoring leaves you with no pressure reading during transport. If the ICP rises you will not know until the exam changes, which is much later and much worse.",
            "unmonitored"),
          C("Leave it open at +15 for the trip",
            "poor",
            "An open drain can siphon and over-drain during transfers and elevation changes, and while it drains you are not monitoring ICP. There is a dedicated over-drainage scenario for this.",
            "open"),
          C("Ask the covering team what they want and do that, without documenting a plan",
            "poor",
            "Even the right choice fails if it isn't written down and communicated — the transport team and the receiving team need to know the plan and the reopen threshold.",
            "unmonitored"),
        ],
      },
      monitored: {
        situation:
          "Clamped, transducer zeroed at the tragus, good waveform. During the elevator " +
          "transfer the ICP rises to 24 and the patient grimaces.",
        prompt: "What now?",
        choices: [
          C("Briefly open the drain to the set level, confirm the ICP falls, document the volume out",
            "best",
            "You have data, you acted early, and you drained to a set level rather than wide open. ICP settles to 12.",
            "good"),
          C("Note it and keep going — you're almost at CT",
            "poor",
            "You have the information and chose not to use it. The window to act cheaply is now.",
            "delayed"),
          C("Deepen sedation to bring the ICP down",
            "poor",
            "Sedation may blunt the number without treating the cause, and it removes the exam you are relying on. Drain first.",
            "delayed"),
        ],
      },
      unmonitored: {
        situation:
          "Clamped, no transducer. Twenty minutes in (waiting outside CT) the patient is " +
          "harder to rouse and the right pupil is now 5 mm and sluggish.",
        prompt: "You have no ICP number. What do you do?",
        choices: [
          C("Open the EVD to drain now, call for help, get the scan STAT, start hyperosmolar therapy per protocol",
            "best",
            "Correct rescue — but you are acting on a herniation sign, not a number. A monitored transport would have flagged this 15+ minutes ago.",
            "rescued"),
          C("Set up the transducer to get an ICP number before you do anything",
            "harmful",
            "The pupil is the number. Do not delay drainage and escalation to instrument a patient who is herniating.",
            "bad"),
          C("Give a fluid bolus for the pupil change",
            "harmful",
            "A fluid bolus does nothing for a rising ICP and wastes the minutes that matter.",
            "bad"),
        ],
      },
      open: {
        situation:
          "Open at +15. By the time you reach CT the drain has put out 19 mL and the patient " +
          "reports a new severe headache that is worse when the head of bed is up.",
        prompt: "What now?",
        choices: [
          C("Clamp the drain, check the leveling, assess for over-drainage, notify the team, low threshold for imaging",
            "best",
            "Recognized and contained. That output rate is far above baseline — over-drainage until proven otherwise.",
            "good"),
          C("Keep draining — more CSF out is a good thing",
            "harmful",
            "Acute over-drainage causes subdural bleeding, ventricular collapse, and (with an unsecured aneurysm) a dangerous transmural gradient. Rate is the red flag.",
            "bad"),
        ],
      },
      delayed: END("mixed", "Preventable escalation",
        "By CT the ICP was 30 and the exam had slipped. The patient recovered but needed " +
        "osmotherapy and a longer ICU stay. You had the ICP number at 24 and a drain in your " +
        "hand — acting then would very likely have prevented all of it. A monitored transport " +
        "is only useful if you act on what it shows you."),
      rescued: END("mixed", "Rescued, but late",
        "The patient was drained and escalated and ultimately did well, but the trigger to act " +
        "was a blown pupil rather than an ICP trend. With continuous monitoring you would have " +
        "seen the rise to the low 20s about 15 minutes earlier and drained it at the bedside. " +
        "The rule stands: never transport a clamped EVD without continuous ICP monitoring."),
      good: END("good", "Good outcome",
        "A planned, monitored, communicated transport. You saw the problem early, acted on it " +
        "with data, drained to a set level, and documented it. This is the target."),
      bad: END("bad", "Preventable deterioration",
        "The patient herniated during transport and the response was delayed or misdirected. " +
        "The root cause was the setup: a clamped drain with no ICP monitoring, so the first " +
        "warning was a pupil. Clamp-and-transduce, with a reopen threshold, every time."),
    },
  },

  // ==================================================================
  {
    id: "rising-icp-troubleshoot",
    title: "Rising ICP on transport — the troubleshoot",
    concept: "A high ICP reading gets a fast differential before it gets aggressive treatment: is it real, is it mechanical, is it the patient — then drain, then osmotherapy, then escalate.",
    level: "core",
    setup:
      "Transporting a clamped, transduced EVD (day 2 SAH, coiled). Baseline ICP 12 with a " +
      "normal waveform. On the ramp into the elevator the monitor reads ICP 33.",
    start: "first",
    nodes: {
      first: {
        prompt: "First move?",
        choices: [
          C("Look at the patient and the waveform — is this real, and is the exam changing?",
            "best",
            "Right instinct. A number in isolation isn't an emergency; a number plus a changing exam or a plausible waveform is.",
            "assess"),
          C("Open the drain wide immediately",
            "ok",
            "Draining isn't wrong, but wide-open with no set level and no check risks over-drainage — especially if the reading turns out to be artifact.",
            "drained_wide"),
          C("Give mannitol / hypertonic saline now",
            "poor",
            "Osmotherapy for an unverified number can mean an unnecessary intervention and its side effects. It comes after you've drained and confirmed a real rise.",
            "premature_osmo"),
          C("Pick up the pace to finish the transport",
            "harmful",
            "Ignoring a possible ICP crisis to save two minutes is how a monitored transport still ends badly.",
            "ignored"),
        ],
      },
      assess: {
        situation:
          "The waveform is present but damped. The patient is calm, pupils equal, exam " +
          "unchanged. The transducer was zeroed 25 minutes ago before you left the unit; the " +
          "bed backrest was just raised for the elevator.",
        prompt: "Next?",
        choices: [
          C("Check the mechanics — transducer level vs the tragus, chamber height, kinks, stopcock",
            "best",
            "A recent position change plus a damped waveform plus a stable exam points hard at a leveling artifact.",
            "mechanical"),
          C("Take the 33 at face value and treat it aggressively",
            "poor",
            "You have three soft signs it may not be real. Verify before you commit to treatment.",
            "overtreated"),
        ],
      },
      mechanical: {
        situation:
          "No kink; stopcock correct. But the transducer is still taped where it was for the " +
          "flat bed — now well below the tragus after the backrest came up.",
        prompt: "What do you do?",
        choices: [
          C("Re-level the transducer to the tragus at the current position and re-zero, then recheck",
            "best",
            "Re-zeroed at the tragus: ICP reads 13 with a normal waveform. The 33 was a leveling artifact from the position change.",
            "artifact_found"),
          C("Leave it — the transducer height doesn't matter once it's been zeroed once",
            "poor",
            "Zeroing is only valid for the position it was done in. Any change in the transducer's height relative to the head invalidates it.",
            "overtreated"),
        ],
      },
      artifact_found: {
        situation: "ICP 13, normal waveform, exam at baseline.",
        prompt: "Now?",
        choices: [
          C("Document the artifact and its cause, re-secure the transducer, finish transport, re-zero again on arrival",
            "best", "Clean recovery and a teachable near-miss.", "good_artifact"),
          C("Give osmotherapy anyway, to be safe",
            "poor",
            "Treating a corrected artifact exposes the patient to hypernatremia, a diuresis, and an unnecessary line draw for no benefit.",
            "overtreated"),
          C("Keep watching closely — an artifact and a real rise aren't mutually exclusive",
            "best",
            "Good instinct. Ten minutes later the ICP genuinely climbs to 28 with a rounding waveform and the patient is drowsier — and you're still on it.",
            "real_rise"),
        ],
      },
      real_rise: {
        situation:
          "This time it's real: ICP 28, plateau-ish waveform, patient less responsive. Head is " +
          "rotated hard to the left against the rail and the ETT is riding against the circuit.",
        prompt: "What now?",
        choices: [
          C("Fix the reversible contributors first — head midline and up, free the neck/jugular outflow, check ventilation/CO₂ and for coughing",
            "best",
            "Position and venous outflow are the fastest free wins. Head midline, neck freed: ICP drifts to 20.",
            "then_drain"),
          C("Open the drain to the set level and drain against the rise",
            "best",
            "Also correct — the drain is a primary tool. You do both.",
            "then_drain"),
          C("Sedate deeply and continue",
            "poor",
            "Masks the exam without addressing position, outflow, or CSF volume.",
            "escalated"),
        ],
      },
      then_drain: {
        situation:
          "Contributors corrected and drained to the set level: ICP now 16. You're outside CT.",
        prompt: "?",
        choices: [
          C("Proceed with the scan, keep draining/monitoring per plan, tell the team what happened",
            "best", "Worked the ladder, found and fixed the causes, kept the patient safe.", "good_real"),
          C("If it hadn't settled: give hyperosmolar therapy and call for help before the scan",
            "ok", "Correct next rung — osmotherapy and escalation come after position and drainage.", "good_real"),
        ],
      },
      drained_wide: {
        situation:
          "You open the drain wide. It runs 16 mL quickly; the ICP now reads 1 and the patient " +
          "winces with a new headache.",
        prompt: "?",
        choices: [
          C("Clamp / raise to the set level, re-zero, reassess — you may have over-drained on a possibly artifactual number",
            "best", "Recovered. The lesson: even 'just drain' needs a set level and a check.", "recovered_od"),
          C("Good — the ICP is controlled now",
            "harmful", "1 mmHg after a rapid 16 mL run is over-drainage, not control.", "bad_od"),
        ],
      },
      premature_osmo: END("mixed", "Treated the monitor, not the patient",
        "Hyperosmolar therapy was given for a number that turned out to be a leveling artifact. " +
        "The patient got an unnecessary sodium load and diuresis. The ladder exists for a reason: " +
        "real? → mechanical? → patient? → drain → osmotherapy → escalate."),
      ignored: END("bad", "Missed a real rise",
        "Whether or not that first reading was artifact, choosing not to look meant that when the " +
        "ICP genuinely climbed you didn't see it. The exam declined and the patient needed " +
        "rescue. A monitor you don't check is not monitoring."),
      overtreated: END("mixed", "Over-treated an artifact",
        "The reading was a leveling artifact and it was treated as a crisis — aggressive " +
        "osmotherapy, an unplanned detour, family alarm. A 15-second check of the transducer " +
        "level would have resolved it."),
      good_artifact: END("good", "Near-miss, well handled",
        "You verified before treating, found the leveling artifact, fixed it, documented it, and " +
        "kept monitoring. Textbook."),
      good_real: END("good", "Good outcome",
        "You ran the differential in order — confirmed it was real, corrected head position and " +
        "venous outflow, drained to a set level, and had osmotherapy and escalation ready as the " +
        "next rungs. The ICP was controlled without over-treatment."),
      escalated: END("mixed", "Got there eventually",
        "Deep sedation delayed recognition; the ICP kept climbing until it forced escalation. " +
        "Position, outflow, and drainage are faster and don't cost you the exam."),
      recovered_od: END("mixed", "Recovered from over-drainage",
        "Opening wide with no set level dropped the ICP to 1 and gave the patient a low-pressure " +
        "headache. You caught it and re-leveled. Drain to the ordered level, not wide open."),
      bad_od: END("bad", "Over-drainage missed",
        "A rapid large-volume drain to an ICP of 1 is over-drainage — risking subdural bleeding " +
        "and ventricular collapse — and it was read as success. The reading may also have been " +
        "artifact to begin with."),
    },
  },

  // ==================================================================
  {
    id: "open-drain-overdrainage",
    title: "Open EVD: 18 mL in 15 minutes",
    concept: "A drainage rate well above baseline is acute over-drainage until proven otherwise — clamp first, diagnose second.",
    level: "core",
    setup:
      "Day 4 aneurysmal SAH, coiled. EVD at +12 cm H₂O, normally draining ~5 mL/hr. For " +
      "transport to MRI you elect to keep it open at +12. Fifteen minutes into the trip the " +
      "burette holds 18 mL.",
    start: "recognize",
    nodes: {
      recognize: {
        prompt: "18 mL in 15 minutes is roughly 72 mL/hr against a baseline of 5. What do you do?",
        choices: [
          C("Clamp the drain now, then work out why",
            "best",
            "Stop the loss first. Everything else — leveling, cause, patient assessment — happens with the drain closed.",
            "clamped"),
          C("Raise the system / lower the head of bed and re-level, keep it open",
            "ok",
            "Re-leveling addresses the cause, but leaving it open means it keeps draining while you work. Clamping is safer as the first move.",
            "releveled"),
          C("Keep going — the patient looks fine and the total isn't dangerous yet",
            "harmful",
            "The rate is the warning, not the total. By the time the patient looks unwell you are already deep into an over-drainage injury.",
            "kept_open"),
          C("Assume the burette was already partly full and ignore it",
            "harmful",
            "Assuming away an abnormal number is how over-drainage gets missed. Verify, don't assume.",
            "kept_open"),
        ],
      },
      clamped: {
        situation: "Clamped. CSF loss stopped. Now the cause.",
        prompt: "Most likely contributor during a transport?",
        choices: [
          C("The drainage chamber / bag dropped below the patient's head during a transfer — siphoning",
            "best",
            "The classic transport failure: a system that gets moved, snagged, or set down low, so gravity siphons CSF.",
            "cause"),
          C("The SAH made the patient produce much more CSF",
            "poor",
            "CSF production doesn't triple acutely. A sudden output jump is almost always mechanical / leveling.",
            "cause"),
          C("The catheter tip migrated into the ventricle",
            "ok",
            "Possible but less likely mid-transport than a leveling/siphon problem. Check leveling first.",
            "cause"),
        ],
      },
      cause: {
        situation:
          "The chamber had slipped down against the bed frame, well below the tragus, and the " +
          "system siphoned. The patient is now drowsy with a dull bifrontal headache.",
        prompt: "Management?",
        choices: [
          C("Keep it clamped, restore correct leveling, lay the patient flatter, full neuro exam, hold transport, notify the team, low threshold for CT to exclude a subdural or collapsed ventricles",
            "best",
            "Symptoms are already present, so this is a clinical over-drainage event, not just a leveling slip. Contain it and image.",
            "managed"),
          C("Now that it's re-leveled, unclamp and continue to MRI",
            "poor",
            "The patient is symptomatic. The acute-risk window (bridging vein tear, subdural, herniation) isn't closed just because the level is fixed.",
            "premature"),
          C("Give a fluid bolus and continue",
            "poor",
            "A bolus doesn't reverse the intracranial hypotension or its risks, and it delays recognition.",
            "premature"),
        ],
      },
      releveled: {
        situation:
          "You raise and re-level the system without clamping. Output slows, but it has already " +
          "run about 22 mL and the patient now has a headache that is worse sitting up.",
        prompt: "?",
        choices: [
          C("Clamp now, assess for over-drainage, hold transport, involve the team, consider imaging",
            "best", "Better late than not — the positional headache is the tell.", "managed"),
          C("Output has slowed, so continue to MRI",
            "poor", "Slowing output doesn't undo 22 mL of acute loss in a symptomatic patient.", "premature"),
        ],
      },
      kept_open: END("bad", "Over-drainage injury",
        "By MRI the drain had put out 55 mL. The patient was difficult to arouse; the scan " +
        "showed a thin acute subdural collection and slit-like ventricles. The drainage rate — " +
        "roughly 14x baseline — was an unmistakable warning 40 mL earlier. Clamp on the rate, " +
        "not on the total or the exam."),
      managed: END("good", "Contained",
        "You treated the rate as the red flag, clamped first, found the siphon, and managed the " +
        "patient as an over-drainage event rather than a leveling footnote. The headache and " +
        "drowsiness resolved over hours; the CT was clean."),
      premature: END("mixed", "Re-opened too soon",
        "Fixing the leveling stops further loss, but a patient who is already symptomatic from " +
        "acute over-drainage needs assessment and often imaging before the transport continues. " +
        "Re-opening and pressing on risked compounding a bridging-vein or subdural injury."),
      // kept_open resolves to this terminal via engine (node has no choices -> treat as end)
    },
  },

  // ==================================================================
  {
    id: "rezero-after-move",
    title: "Re-zeroing after every move",
    concept: "Zeroing is only valid for the position it was done in — every transfer invalidates the ICP number until you re-level to the tragus and re-zero.",
    level: "core",
    setup:
      "You arrive in the angiography suite with a clamped, transduced EVD (day 2 SAH). The " +
      "patient is slid from the transport bed onto the angio table. The monitor still shows " +
      "ICP 10 from the trip.",
    start: "onarrival",
    nodes: {
      onarrival: {
        prompt: "Before anyone uses that ICP number, what do you do?",
        choices: [
          C("Re-level the transducer to the tragus at the new table position and re-zero, then read the ICP",
            "best",
            "Correct. The table height, the mattress, and the head position all differ from the transport bed.",
            "rezeroed"),
          C("Use the 10 — it was zeroed before transport and nothing was disconnected",
            "poor",
            "Nothing was disconnected, but the patient's head is now at a different height relative to the transducer. The 10 is not trustworthy.",
            "falsenumber"),
          C("Wait until the case is over and re-zero back in the ICU",
            "harmful",
            "The ICP guides intra-procedural drainage and CPP. A whole case run off an un-leveled number is a whole case of wrong data.",
            "falsenumber"),
        ],
      },
      rezeroed: {
        situation:
          "Re-leveled to the tragus and re-zeroed: the ICP actually reads 19, not 10 — the " +
          "transducer had been sitting about 12 cm above the head on the transport bed, reading " +
          "roughly 9 mmHg low.",
        prompt: "?",
        choices: [
          C("Note the corrected value, set the intra-procedural drainage/monitoring plan off 19, re-check the level after any table movement",
            "best", "This is why you re-zero: a 'reassuring' 10 was really a borderline 19.", "good"),
          C("Average the two readings",
            "poor", "There is nothing to average. The un-leveled reading is simply invalid.", "good"),
        ],
      },
      falsenumber: {
        situation:
          "Later in the case the patient's exam can't be followed (draped, anesthetized) and " +
          "the team is reassured by a 'stable ICP of 10'. Post-procedure CT shows new hydrocephalus " +
          "and the true ICP on a proper re-zero is 24.",
        prompt: "What was the error?",
        choices: [
          C("The ICP was read off a transducer that was never re-leveled after the transfer, so it read falsely low all case",
            "best",
            "Exactly. A transducer above the tragus under-reads; below it over-reads. Re-level and re-zero after every position change.",
            "bad"),
          C("The monitor malfunctioned",
            "poor",
            "The monitor was fine. It faithfully reported the pressure at the wrong reference point.",
            "bad"),
        ],
      },
      good: END("good", "Right reference, right number",
        "Re-leveling to the tragus and re-zeroing after the transfer turned a falsely reassuring " +
        "10 into a real 19 that changed the plan. Do it after every move — bed to table, table " +
        "to CT, CT to ICU bed."),
      bad: END("bad", "A case run on a false number",
        "An un-leveled transducer read the ICP ~9 mmHg low for the whole procedure. The team was " +
        "falsely reassured and missed developing hydrocephalus. The tragus is the reference " +
        "(a surrogate for the foramen of Monro); re-zero there after every position change."),
    },
  },

  // ==================================================================
  {
    id: "csf-turns-bloody",
    title: "The CSF turns bloody",
    concept: "During a procedure the EVD is an early-warning monitor — a change in CSF colour or output is information the team needs in real time, not a charting entry for later.",
    level: "advanced",
    setup:
      "You are running the EVD during coiling of a wide-necked aneurysm. At the start the CSF " +
      "was xanthochromic and output was ~3 mL over the first 20 minutes. Over the last 10 " +
      "minutes it has turned visibly pink-red and 8 mL has drained.",
    start: "notice",
    nodes: {
      notice: {
        prompt: "What do you do?",
        choices: [
          C("Tell the proceduralist and the anesthesia team now — CSF is turning bloody and output has jumped",
            "best",
            "This is a real-time monitor. The proceduralist correlates it with what they see on the angiogram; anesthesia prepares for a possible rupture.",
            "told"),
          C("Chart the change and keep watching quietly",
            "poor",
            "By the time a trend is obvious on the chart, the moment to act on it may have passed. Say it out loud.",
            "delayed"),
          C("Assume it's blood from the recent tap / sampling and disregard it",
            "poor",
            "A progressive colour change with rising output is not a sampling artifact. Treat it as real.",
            "delayed"),
          C("Flush the drain to clear the line and get a better look",
            "harmful",
            "Never flush an EVD toward the patient. It risks raising ICP and introducing infection, and it destroys the very information you're trying to read.",
            "flushed"),
        ],
      },
      told: {
        situation:
          "The proceduralist checks: there is a small contrast blush — a contained intraprocedural " +
          "rupture. They move to balloon control and more coils. ICP is climbing.",
        prompt: "Your EVD move?",
        choices: [
          C("Open the drain and drain to a set level against the ICP rise; keep calling out output and colour",
            "best",
            "The drain is now a primary ICP-control tool and a live readout. The team gets the aneurysm sealed with the ICP controlled.",
            "good"),
          C("Clamp the drain to preserve CSF",
            "harmful",
            "The opposite of what's needed — clamping during a rupture lets the ICP climb unchecked.",
            "bad"),
        ],
      },
      delayed: {
        situation:
          "Ten more minutes pass. The patient becomes hypertensive and bradycardic, the ICP is " +
          "40, and now the angiogram clearly shows extravasation.",
        prompt: "?",
        choices: [
          C("Call it out now, open the drain wide against the ICP, support the team through the rupture response",
            "ok",
            "Right actions, later than ideal — the drain colour was telling you this 10 minutes ago.",
            "mixed"),
          C("Wait for the proceduralist to say something first",
            "harmful",
            "You are holding the monitor. Silence isn't deference, it's a missed warning.",
            "bad"),
        ],
      },
      flushed: END("bad", "Never flush toward the patient",
        "Flushing an EVD toward the ventricle risks an ICP spike and ventriculitis, and it " +
        "erased the trend you needed. The bloody CSF was an early sign of an intraprocedural " +
        "rupture that was then recognized late."),
      good: END("good", "The monitor did its job",
        "You read the drain as a monitor, communicated the change immediately, and then used the " +
        "drain to control the ICP through the rupture. Early communication bought the team time."),
      mixed: END("mixed", "Recognized late",
        "The rupture was managed, but the drain had signalled it about 10 minutes earlier through " +
        "a colour and output change that wasn't communicated. The CSF is a live monitor — narrate it."),
      bad: END("bad", "A missed early warning",
        "A progressive change in CSF colour and output during a procedure is the drain telling you " +
        "something is happening intracranially. It was charted, or waited on, instead of spoken — " +
        "and the rupture was recognized only once the patient decompensated."),
    },
  },

  // ==================================================================
  {
    id: "handoff-gap",
    title: "The handoff gap",
    concept: "The minimum EVD dataset a receiving team needs — and what goes wrong when one item is missing.",
    level: "core",
    setup:
      "Back in the ICU after an uneventful coiling. The patient's drain was clamped and " +
      "transduced for the trip and is still clamped. You give a quick verbal handoff to the " +
      "oncoming nurse and physician.",
    start: "handoff",
    nodes: {
      handoff: {
        prompt: "Which of these do you make sure to say? (pick the single most important to not omit)",
        choices: [
          C("The drain is CLAMPED right now, at +12, and the reopen threshold is ICP ≥ 20 or an exam change",
            "best",
            "Clamp status 'right now' is the item most likely to cause immediate harm if wrong — a team that thinks it's open won't watch the ICP; a team that thinks it's clamped may not notice it draining.",
            "good"),
          C("The total CSF output for the case was 12 mL",
            "ok",
            "Useful, but not the item that causes an immediate error if omitted.",
            "partial"),
          C("The CSF was xanthochromic and unchanged",
            "ok",
            "Worth saying, but lower stakes than the current clamp status and setting.",
            "partial"),
          C("The EVD is on day 3",
            "ok",
            "Matters for the ventriculitis clock, but not the highest-priority handoff item.",
            "partial"),
        ],
      },
      partial: {
        situation:
          "You covered output, colour, and EVD day but were vague about the current status. Two " +
          "hours later the night nurse believes the drain is open and draining; it is actually " +
          "clamped. The ICP monitor alarms are silenced as 'the drain will handle it.' The " +
          "patient's ICP is 26 and the exam is down when the physician re-checks.",
        prompt: "?",
        choices: [
          C("Open the drain, reassess, and fix the handoff process — the current setting and clamp status must be stated and confirmed back",
            "best",
            "The catch here is a read-back: the receiver repeats the setting and clamp status so a mismatch surfaces immediately.",
            "recovered"),
          C("Note that the nurse should have checked the orders",
            "poor",
            "The order may say 'clamp for transport, reassess on arrival' — ambiguous. The verbal handoff is where it gets pinned down.",
            "recovered"),
        ],
      },
      good: {
        situation:
          "You state the full set: setting +12, reference at the tragus, CLAMPED now, last ICP " +
          "11, output 12 mL total / ~4 mL the last hour, CSF xanthochromic unchanged, reopen at " +
          "ICP ≥ 20 or exam change, EVD day 3, site clean, plan to resume the prior drainage " +
          "orders. The nurse reads it back.",
        prompt: "?",
        choices: [
          C("Confirm the read-back and document the same in the chart handoff",
            "best", "Spoken, read back, and written. Nothing to drift.", "cleanend"),
        ],
      },
      recovered: END("mixed", "Caught on the second pass",
        "The ICP rise was found and drained, and the patient recovered — but only after an exam " +
        "change, because the handoff didn't pin down whether the drain was open or clamped. Make " +
        "the current setting and clamp status an explicit, read-back item every time."),
      cleanend: END("good", "A handoff that holds",
        "Setting, reference, current clamp status, last ICP, output total and recent rate, CSF " +
        "colour, reopen threshold, EVD day, site, and forward plan — stated, read back, and " +
        "written. This is the minimum set."),
    },
  },
];

export const scenarioById = (id) => SCENARIOS.find((s) => s.id === id) || null;
