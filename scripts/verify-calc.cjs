/**
 * Re-derives every figure and every rule the day rests on, from the same data files the site uses, and compares them with the
 * results briefed in the README. Run: npm run verify:calc. A failed line prints FAIL and the process exits with code 1.
 *
 * The data files are TypeScript with "@/" imports, so a tiny loader transpiles them on the fly (no test framework, no extra dependency).
 */
const path = require("path");
const fs = require("fs");
const Module = require("module");
const ts = require(path.join(process.cwd(), "node_modules", "typescript"));

const root = process.cwd();
const origResolve = Module._resolveFilename;
Module._resolveFilename = function (request, ...rest) {
  if (request.startsWith("@/")) {
    const base = path.join(root, request.slice(2));
    for (const ext of [".ts", ".tsx", "/index.ts"]) if (fs.existsSync(base + ext)) return base + ext;
  }
  return origResolve.call(this, request, ...rest);
};
for (const ext of [".ts", ".tsx"])
  require.extensions[ext] = function (module, filename) {
    const out = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX },
    });
    module._compile(out.outputText, filename);
  };

let failed = 0;
const ok = (name, cond, detail = "") => {
  console.log(`${cond ? "ok  " : "FAIL"}  ${name}${detail ? "  " + detail : ""}`);
  if (!cond) failed++;
};
const eq = (name, a, b) => ok(name, JSON.stringify(a) === JSON.stringify(b), `got ${JSON.stringify(a)}, want ${JSON.stringify(b)}`);

const lang = require("@/lib/lang");
const fc = require("@/data/forecast");
const ld = require("@/data/ladder");
const pt = require("@/data/patterns");
const meas = require("@/data/measures");
const r2 = require("@/data/route2");
const key = require("@/data/mentorKey");
const checks = require("@/lib/checks");
const missing = require("@/lib/missing");
const progress = require("@/lib/progress");
const store = require("@/store/useStore");
const mg = require("@/lib/mentorGuide");
const routes = require("@/lib/routes");
const mat = require("@/data/materialIndex");

const read = (f) => fs.readFileSync(path.join(root, f), "utf8");
/** The source text of one exported function (up to the next export) of a file. */
const fnText = (file, name) => {
  const src = read(file);
  const i = src.indexOf(`export function ${name}(`);
  if (i < 0) return "";
  const ends = [src.indexOf("\n/* ----", i + 10), src.indexOf("\nexport ", i + 10)].filter((x) => x > 0);
  return src.slice(i, ends.length ? Math.min(...ends) : src.length);
};

// --- Block 1.2 (Optional, read-only) ----------------------------------------------------
eq("F1 return rate with the call", fc.FORECAST.f1, 20);
eq("return rate with the e-mail", fc.FORECAST.controlRate, 5);
eq("F2 lift", fc.FORECAST.f2, 4);
eq("Isar worked example", [fc.MOSEL_RESULT.rate, fc.MOSEL_RESULT.other, fc.MOSEL_RESULT.lift, fc.MOSEL_RESULT.extra], [24, 6, 4, 324000]);
eq("task extra revenue a year", fc.FORECAST.f3, 337500);
ok("worked example uses other numbers than the task", fc.MOSEL.order !== fc.PILOT.order && fc.MOSEL.yearly !== fc.PILOT.yearly && fc.MOSEL_RESULT.rate !== fc.FORECAST.f1);
ok("the diagram of A4 draws the same worked example as the data", require("@/data/diagramData").BAR_RATES.data.control.sent === fc.MOSEL.control.sent && require("@/data/diagramData").BAR_RATES.data.variant.orders === fc.MOSEL.variant.orders && require("@/data/diagramData").BAR_RATES.data.yearly === fc.MOSEL.yearly && require("@/data/diagramData").BAR_RATES.data.order === fc.MOSEL.order);

ok("sentence check accepts the printed return rate", checks.citesForecastFigure(`It brought back ${fc.FORECAST.f1}% of lost customers.`));
ok("sentence check accepts the printed rate in German writing", checks.citesForecastFigure(`Es erreichte ${String(fc.FORECAST.f1).replace(".", ",")} % der Neukunden.`));
ok("sentence check accepts the printed lift as a multiple", checks.citesForecastFigure(`It did ${fc.FORECAST.f2} times as well.`));
ok("sentence check accepts a printed count", checks.citesForecastFigure(`Only ${fc.PILOT.control.orders} cases stand behind it.`));
ok("sentence check rejects a sentence with no figure", !checks.citesForecastFigure("This seems to work for us."));

// --- Block 1.1 (Core) / 1.3 (Optional) -------------------------------------------------------
const lvl = ld.LINES.reduce((o, r) => ({ ...o, [r.truth]: (o[r.truth] || 0) + 1 }), {});
eq("reasons: three per kind", lvl, { emotional: 3, rational: 3, outside: 3 });
eq("three kinds are bins", ld.LEVEL_TAGS.map((x) => x.id), ["emotional", "rational", "outside"]);
const respondRule = fc.CUSTOMERS.filter((c) => c.decision && c.leave >= fc.LEAVE_MIN).map((c) => c.id);
eq("helps most = the customer wants the result and 25%+ stop", [...respondRule].sort(), [...fc.VALUABLE_TRUTH].sort());
const personalRule = fc.CUSTOMERS.filter((c) => c.known !== "none").map((c) => c.id);
eq("can plug in = part or all of what exists is connected", [...personalRule].sort(), [...fc.CHURN_TRUTH].sort());
ok("the frozen-budget group is neither", !fc.VALUABLE_TRUTH.includes("c3") && !fc.CHURN_TRUTH.includes("c3"));
ok("the missing-function group (12% open) does not pay most", !fc.VALUABLE_TRUTH.includes("c5"));
ok("approach check needs a consequence word", fc.hasSoWhat("The bar shows the next step, so the customer finishes sooner.") && !fc.hasSoWhat("The bar shows the next step and the level."));

// --- Block 2.1 / 2.2 / 2.3 (Optional) ------------------------------------------------------
eq("signals per family", pt.TRUTH_COUNTS, { contact: 3, visits: 3, money: 3, voice: 3 });
eq("went with coming back per family", pt.TRUTH_LEFT, { contact: 3, visits: 1, money: 2, voice: 0 });
eq("model link per kind", pt.PATTERN_IDS.map((x) => pt.riskOf(pt.TRUTH_LEFT[x], pt.TRUTH_COUNTS[x])), ["high", "mid", "high", "low"]);
eq("real uncertainties", pt.UNCERTAINTIES.filter((w) => w.real).map((w) => w.id), ["sample", "cause", "missing", "shift"]);
ok("every kind has its own use", new Set(Object.values(pt.MEASURE_TRUTH)).size === 4);
ok("the bonus fits no kind", !Object.values(pt.MEASURE_TRUTH).includes("bonus"));
ok("each A/B part has exactly one fair option", pt.AB_PARTS.every((k) => pt.AB[k].options.filter((o) => o.right).length === 1));
eq("model A/B card flags nothing", checks.abFlagsOf({ ...pt.AB_MODEL, hyp: "If we show the bar, then finishing rises, because it fits.", rule: "Roll out at 10% uplift." }), []);
eq("A/B card flags a wrong part", checks.abFlagsOf({ ...pt.AB_MODEL, control: "lastyear", hyp: "", rule: "" }), ["control"]);
eq("A/B card flags a rule without a number", checks.abFlagsOf({ ...pt.AB_MODEL, hyp: "", rule: "Roll out if it wins." }), ["rule"]);

// --- Block 2.4 (Core) --------------------------------------------------------------------
const scores = Object.fromEntries(meas.MEASURES.map((m) => [m.id, meas.modelScore(m.id)]));
eq("model scores (economic viability × effect × sustainability)", scores, { unified: 18, handover: 12, predictive: 18, chatbot: 3, app: 1, suite: 6 });
eq("model three cost", meas.MODEL_COST, 131000);
eq("six measures", meas.MEASURE_IDS, ["unified", "handover", "predictive", "chatbot", "app", "suite"]);
eq("measure prices", Object.fromEntries(meas.MEASURES.map((m) => [m.id, m.cost])), { unified: 49000, handover: 46000, predictive: 36000, chatbot: 29000, app: 100000, suite: 150000 });
for (const m of meas.MEASURES) ok(`price of ${m.id} is the sum of its printed parts`, m.costParts.length >= 2 && m.costParts.reduce((x, c) => x + c.amount, 0) === m.cost);
ok("the suite alone is over the budget", meas.MEASURE_BY_ID.suite.cost > meas.BUDGET);
ok("the budget bites: the platform with the return call and the tailored offer is over", meas.MEASURE_BY_ID.suite.cost + meas.MEASURE_BY_ID.unified.cost + meas.MEASURE_BY_ID.predictive.cost > meas.BUDGET);
ok("the suite has no working time inside the four months", meas.workingWeeks("suite") === 0 && meas.workingWeeks("handover") === 8 && meas.FRAME_WEEKS === 16);
{
  const cv = (chosen) => checks.coverage({ chosen }).map((c) => (c.covered ? "on" : c.tooLate ? "late" : "open"));
  eq("coverage of the model three", cv(["unified", "handover", "predictive"]), ["on", "on", "on"]);
  eq("coverage of the mailing, the discount and the vendor platform", cv(["chatbot", "app", "suite"]), ["late", "on", "late"]);
  eq("the platform alone answers its problems too late", cv(["suite"]), ["late", "late", "late"]);
}
{
  const blob = { l1: { ...store.emptyL1(), chosen: ["unified"] } };
  eq("the version-1 blob migrates unchanged", store.migratePersisted(blob, 1), blob);
}
ok("model three fit the budget", meas.MODEL_COST <= meas.BUDGET);
eq("model three are the three highest scores", [...meas.MEASURES].sort((a, b) => meas.modelScore(b.id) - meas.modelScore(a.id)).slice(0, 3).map((m) => m.id).sort(), [...meas.MODEL_MEASURES].sort());
ok("the model three answer all three problems", meas.PROBLEM_IDS.every((p) => meas.MODEL_MEASURES.some((id) => meas.MEASURE_BY_ID[id].targets.includes(p))));
ok("the discount for every lost customer answers no problem of the brief", meas.MEASURE_BY_ID.app.targets.length === 0);
ok("the order of the model plan has no inversion", checks.orderInversions({ ...store.emptyL1(), chosen: key.MODEL_ORDER, order: key.MODEL_ORDER, exp: { unified: 3, predictive: 3, handover: 2 }, fea: { unified: 2, predictive: 3, handover: 2 }, eff: { unified: 3, predictive: 2, handover: 3 } }).length === 0);

// --- Route 2 --------------------------------------------------------------------
eq("moment decisions by the rule", r2.SOURCES.map((s) => r2.useOf(s)), ["core", "core", "core", "later", "later", "later", "leave", "leave"]);
eq("test decisions by the rule", r2.SITUATIONS.map((s) => r2.actionOf(s)), ["intervene", "watch", "none", "watch", "none", "intervene"]);
for (const c of r2.COMPS) for (const k of r2.CRIT_IDS) ok(`model rating within the printed limit (${c.id}.${k})`, c.model[k] <= r2.maxRating(c.id, k));
ok("model KPIs all show a change early", checks.earlyCount(r2.MODEL_COMPS) === r2.MODEL_COMPS.length);
const pnl = require("@/data/route2Panel");
const rpl = require("@/lib/r2Panel");
const modelCost = pnl.MODEL_ARCH.reduce((x, id) => x + r2.ARCH_BY_ID[id].cost, 0);
eq("model architecture cost", modelCost, 156000);
ok("model architecture inside the budget", modelCost <= r2.R2_BUDGET);
ok("adding the vendor platform breaks the budget", modelCost + r2.ARCH_BY_ID.suite.cost > r2.R2_BUDGET);
eq("the model plan keeps the platform and the discount for every customer out", r2.ARCH_IDS.filter((id) => pnl.MODEL_TIER[id] === "not"), ["suite", "relaunch"]);

// --- Measures: category, scene, who (CLAUDE.md #45, #46) ---------------------------------------
const AREAS = Object.keys(meas.MEASURE_AREA_LABEL);
for (const l of ["en", "de"]) {
  lang.setCurrentLang(l);
  for (const m of meas.MEASURES) ok(`[${l}] measure ${m.id} has a scene, a who-does-what line and a category`, m.scene.length > 30 && m.who.length > 30 && AREAS.includes(m.area));
  ok(`[${l}] the area note and labels are written`, meas.AREA_NOTE.v.length > 40 && AREAS.every((a) => meas.MEASURE_AREA_LABEL[a].length > 2));
}
lang.setCurrentLang("en");

// --- Key phrases are real substrings, in both languages ---------------------------------
for (const l of ["en", "de"]) {
  lang.setCurrentLang(l);
  for (const r of ld.LINES) ok(`[${l}] key phrase of idea ${r.id} is in its text`, r.text.includes(ld.LINE_KEY[r.id]));
  for (const r of pt.RECORDS) ok(`[${l}] key phrase of metric ${r.id} is in its text`, r.text.includes(pt.REC_KEY[r.id]));
}
lang.setCurrentLang("en");

// --- One Core block and one Core card per level (CLAUDE.md #48) ------------------------------
eq("Optional blocks", [...progress.OPTIONAL_BLOCKS].sort(), ["b12", "b13", "b14", "b21", "b22", "b23", "b31", "b32", "b33", "b34"]);
eq("Core units: Route 1 has two blocks, Route 2 one frame", [progress.CORE_UNITS[1], progress.CORE_UNITS[2]], [["b11", "b24"], ["b3f"]]);
eq("Core cards of Materi A", mat.MATERIALS.filter((m) => !m.optional && m.block === "A").map((m) => m.id), ["A1", "A7"]);
eq("Core card of Materi B", mat.MATERIALS.filter((m) => !m.optional && m.block === "B").map((m) => m.id), ["B5"]);
eq("Optional cards of Materi A", mat.MATERIALS.filter((m) => m.optional && m.block === "A").map((m) => m.id), ["A2", "A3", "A4", "A5", "A6"]);
eq("Optional cards of Materi B", mat.MATERIALS.filter((m) => m.optional && m.block === "B").map((m) => m.id), ["B1", "B2", "B3", "B4"]);
eq("material minutes: 60 for each route", [mat.MATERIALS.filter((m) => m.block === "A").reduce((s, m) => s + m.minutes, 0), mat.MATERIALS.filter((m) => m.block === "B").reduce((s, m) => s + m.minutes, 0)], [60, 60]);
eq("Core card minutes printed on the home page equal the cards", [mat.MATERIALS.filter((m) => !m.optional && m.block === "A").reduce((s, m) => s + m.minutes, 0), mat.MATERIALS.filter((m) => !m.optional && m.block === "B").reduce((s, m) => s + m.minutes, 0)], [routes.CORE_CARD_MINUTES[1], routes.CORE_CARD_MINUTES[2]]);
eq("Core task minutes", [routes.CORE1_MINUTES, routes.CORE2_MINUTES], [20, 19]);

// Core cites exactly its own Core card and names no Optional block or card (CLAUDE.md #40)
{
  const cites = (text) => [...new Set([...text.matchAll(/\b(?:Materi |mat-|")([AB][1-7])\b/g)].map((m) => m[1]))].sort();
  const OPT = /Block (1\.[234]|2\.[123]|3\.[1-4])\b/;
  const OPTCARD = (core) => new RegExp(`(?:Materi |mat-)(?!${core.join("|")}\\b)[AB][1-7]\\b`);
  const b11 = fnText("components/task1/Part1.tsx", "Block11");
  const b24 = fnText("components/task1/Part2.tsx", "Block24");
  eq("Block 1.1 (Core, Level 1) draws on card A1 only", cites(b11), ["A1"]);
  eq("Block 2.4 (Core, Level 2) draws on card A7 only", cites(b24), ["A7"]);
  ok("Block 1.1 names no Optional block", !OPT.test(b11));
  ok("Block 2.4 names no Optional block", !OPT.test(b24));
  ok("Block 2.4 does not read the set-up figures", !/fig\.|FORECAST|PILOT/.test(b24));
  const sa = read("components/task2/StepA.tsx");
  const sb = read("components/task2/StepB.tsx");
  eq("Step A draws on card B5 only", cites(sa), ["B5"]);
  eq("Step B draws on card B5 only", cites(sb), ["B5"]);
  for (const [file, fn, core] of [["components/materi/CardsA.tsx", "CardA1", ["A1", "A7"]], ["components/materi/CardsA.tsx", "CardA7", ["A1", "A7"]], ["components/materi/CardsB.tsx", "CardB5", ["B5"]]]) {
    const txt = fnText(file, fn);
    ok(`${fn} (Core) names no Optional block or card`, !OPT.test(txt) && !OPTCARD(core).test(txt));
  }
}

// --- Core-only fill: the two Route 1 Core blocks alone make a complete, exportable file -----------
{
  lang.setCurrentLang("en");
  const full = { ...store.emptyL1(), ...key.KEY_L1() };
  const e = store.emptyL1();
  const coreOnly = { ...e, sort: full.sort, extraInsight: full.extraInsight, chosen: full.chosen, exp: full.exp, fea: full.fea, eff: full.eff, reasons: full.reasons, order: full.order, why: full.why };
  const p = { participant: { name: "Core Only" }, ui: { bannerDismissed: {}, sectionsRead: {}, lang: "en" }, l1: coreOnly, r2: { ...store.emptyR2() } };
  eq("Core-only fill leaves the Route 1 missing list empty", missing.l1Missing(p).map((m) => m.label), []);
  const tb = progress.taskBlocks(p);
  eq("Core blocks complete after a Core-only fill", [tb.b11, tb.b24], [true, true]);
  eq("Optional blocks are not complete after a Core-only fill", [tb.b12, tb.b13, tb.b14, tb.b21, tb.b22, tb.b23], [false, false, false, false, false, false]);
  const cards = mat.MATERIALS.filter((m) => m.block === "A" && !m.optional);
  const readAll = Object.fromEntries(cards.map((m) => [m.id, true]));
  const done = progress.dossierProgress({ ...p, ui: { ...p.ui, sectionsRead: readAll } }, 1);
  eq("Route 1 ring: two Core cards + two Core blocks", [done.done, done.total], [4, 4]);
  const doc = require("@/lib/exportDoc").analysisBody(p);
  ok("an unanswered Optional block is marked in the file", doc.includes(lang.tt("Optional block · not filled in.", "Optionaler Block · nicht ausgefüllt.")));
  // a Core answer that differs from the model still exports (CLAUDE.md #38): the three dearest measures, over budget, with a reason each
  const dear = [...meas.MEASURES].sort((a, b) => b.cost - a.cost).slice(0, 3).map((m) => m.id);
  ok("the three dearest measures are over the budget", checks.totalCost(dear) > meas.BUDGET);
  const over = { ...coreOnly, chosen: dear, exp: Object.fromEntries(dear.map((id) => [id, 1])), fea: Object.fromEntries(dear.map((id) => [id, 2])), eff: Object.fromEntries(dear.map((id) => [id, 1])), reasons: Object.fromEntries(dear.map((id) => [id, "x".repeat(40)])), order: dear };
  const po = { ...p, l1: over };
  ok("an over-budget, against-the-model choice with reasons leaves nothing missing", missing.l1Missing(po).length === 0);
  ok("without a reason a measure is a named missing item", missing.l1Missing({ ...p, l1: { ...coreOnly, reasons: {} } }).some((m) => m.label.startsWith("Block 2.4:") && /why/.test(m.label)));
  ok("without the return reason of your own Block 1.1 is a named missing item", missing.l1Missing({ ...p, l1: { ...coreOnly, extraInsight: "" } }).some((m) => m.label.startsWith("Block 1.1:")));
}

// --- Old-shape blob (CLAUDE.md #9): fields an older blob lacks are filled from the defaults ------
{
  const old = { ...store.emptyL1(), chosen: ["unified"] };
  delete old.reasons;
  const merged = store.mergeDefaults(store.emptyL1(), old);
  ok("a partial blob gets the reasons field", typeof merged.reasons === "object" && merged.reasons !== null);
  ok("a partial blob keeps what it had", merged.chosen.length === 1 && merged.chosen[0] === "unified");
}

// --- Worked answers: every reason has a mentor guide and an example (CLAUDE.md #23, #45) ---
for (const id of meas.MODEL_MEASURES) {
  const g = mg.reasonGuide(id);
  ok(`reason guide of ${id} has an answer, a worked example and look-fors`, g.answer.length > 30 && g.example.length > 60 && g.lookFor.length >= 2);
}
ok("the signals guide carries a worked example on another company", mg.misreadGuide().example.length > 100);
ok("the why guide carries a worked example on another company", mg.whyGuide().example.length > 100);
ok("the return reason guide carries a worked example on another company", mg.extraInsightGuide().example.length > 100);

// --- Route 2 (CLAUDE.md #47, #48): the panel's figures, the tests, the categories, Core independence, Core-only fill ----------------
{
  const T = (tier) => ({ tier });
  const MODEL = pnl.MODEL_TIER;
  const testOf = (plan, id) => plan.tests.find((x) => x.id === id);

  // what Step A prints in Core equals what Block 3.2 prints (CLAUDE.md #40)
  eq("connected share of the progress paths' data printed in Core equals the moment list's set-up → full use", pnl.PANEL.personal.data, r2.SOURCES.find((x) => x.id === "chat").complete);
  eq("connected share of the referral invitations' data printed in Core equals the moment list's renewal talk", pnl.PANEL.routing.data, r2.SOURCES.find((x) => x.id === "social").complete);
  eq("the numbers today: win-back rate baseline and aim", [r2.KPI_BY_ID.conv.baseline, require("@/data/route2Extra").KPI_AIM.conv], [8, 15]);
  eq("the numbers today: silent-after-30-days baseline and aim", [r2.KPI_BY_ID.engage.baseline, require("@/data/route2Extra").KPI_AIM.engage], [70, 55]);

  // the model plan, recomputed by hand: 60+15+45+40+12+18 = 190,000; measured items 60+45+40+18 = 163,000 (86%); weaker data: the progress paths drop to 67%, so 60+40+18 = 118,000 (62%) and the paths' 45,000 are at risk (24%)
  const m0 = rpl.planOf(T(MODEL), 0);
  const m1 = rpl.planOf(T(MODEL), 1);
  eq("model plan: every test holds with the brief's data", [m0.holding, m0.applicable], [4, 4]);
  eq("model plan: only the data test opens when the data is 15 points weaker", m1.tests.map((x) => x.holds), [true, true, false, true]);
  eq("model bars: money, Measurable and Risk (brief, then weaker data)", [m0.bars.spent, m0.bars.meas, m0.bars.risk, m1.bars.meas, m1.bars.risk], [156000, 83, 0, 60, 22]);
  eq("model plan: months in use (start + weeks ÷ 4, rounded up)", pnl.MODEL_ARCH.map((id) => rpl.inUseOf(T(MODEL), id)), [3, 2, 3, 4, 2, 2]);
  eq("the Measurable and Risk ranges", [rpl.rangeOf(T(MODEL)).meas, rpl.rangeOf(T(MODEL)).risk], [[83, 60], [0, 22]]);

  // time and data rules
  const base = { foundation: "now", chat: "now" };
  ok("the referral invitations Now start in month 1 on data 60% connected: the data test opens", !testOf(rpl.planOf(T({ ...base, routing: "now" }), 0), "data").holds);
  eq("the referral invitations After data start when the usage data clean-up is in use and are in use by month 5", [rpl.startOf(T({ ...base, routing: "later" }), "routing"), rpl.inUseOf(T({ ...base, routing: "later" }), "routing")], [2, 4]);
  ok("the referral invitations After data: the data and budget tests hold", testOf(rpl.planOf(T({ ...base, routing: "later" }), 0), "data").holds && testOf(rpl.planOf(T({ ...base, routing: "later" }), 0), "budget").holds);
  ok("After data without a usage data clean-up never starts", rpl.planOf(T({ foundation: "now", routing: "later" }), 0).items.routing.never);
  ok("the shared profile after a game element opens the integration test", !testOf(rpl.planOf(T({ foundation: "later", chat: "now", personal: "now" }), 0), "measure").holds);
  ok("a game element without the shared profile opens the integration test", !testOf(rpl.planOf(T({ personal: "now" }), 0), "measure").holds);
  ok("the game platform opens the purpose test", !testOf(rpl.planOf(T({ ...base, suite: "now" }), 0), "purpose").holds);
  ok("the points per login and leaderboard open the purpose test", !testOf(rpl.planOf(T({ ...base, relaunch: "now" }), 0), "purpose").holds);
  eq("the platform (32 weeks) is in use only in month 9 and opens the budget test; the points scheme (12 weeks) is in use in month 4 and the budget test holds", [rpl.inUseOf(T({ suite: "now" }), "suite"), rpl.inUseOf(T({ relaunch: "now" }), "relaunch"), !testOf(rpl.planOf(T({ suite: "now" }), 0), "budget").holds, testOf(rpl.planOf(T({ ...base, relaunch: "now" }), 0), "budget").holds], [7, 3, true, true]);
  ok("going over the budget opens the budget test and is never a missing item", !testOf(rpl.planOf(T(Object.fromEntries(r2.ARCH_IDS.map((id) => [id, "now"]))), 0), "budget").holds);
  eq("with everything Now only the platform is late", Object.values(rpl.planOf(T(Object.fromEntries(r2.ARCH_IDS.map((id) => [id, "now"]))), 0).items).filter((v) => v.late).map((v) => v.id), ["suite"]);

  // the three internal categories (never shown to the learner)
  eq("category of the model plan", rpl.categoryOf(T(MODEL), 0).cat, 1);
  eq("category: nothing built", rpl.categoryOf(T({}), 0).cat, 3);
  eq("category: game elements without the base", rpl.categoryOf(T({ personal: "now", suite: "now" }), 0).cat, 3);
  eq("category: a base, but integration after the game element", rpl.categoryOf(T({ foundation: "later", chat: "now", personal: "now" }), 0).cat, 2);
  eq("category: the base alone is safe", rpl.categoryOf(T({ foundation: "now" }), 0).cat, 1);
  eq("category: enablers only, no base", rpl.categoryOf(T({ training: "now" }), 0).cat, 2);
  eq("category: model plus the platform is fair", rpl.categoryOf(T({ ...MODEL, suite: "now" }), 0).cat, 2);

  // the changes the reading names
  eq("the model plan needs no change", rpl.changesFor(T(MODEL), 0).changes.length, 0);
  const sOnly = rpl.changesFor(T({ suite: "now" }), 0);
  eq("a platform-only plan: build the base, drop the platform", sOnly.changes.map((c) => `${c.id}:${c.to}`), ["foundation:now", "suite:not"]);
  ok("after those changes every test holds and the category is 1", sOnly.after.holding === sOnly.after.applicable && rpl.categoryOf(T({ foundation: "now" }), 0).cat === 1);
  const nothing = rpl.changesFor(T({}), 0);
  eq("an empty plan: the base and the rulebook", nothing.changes.map((c) => `${c.id}:${c.to}`), ["foundation:now", "tracking:now"]);
  const everything = rpl.changesFor(T(Object.fromEntries(r2.ARCH_IDS.map((id) => [id, "now"]))), 0);
  eq("everything Now: drop the platform and the points scheme, the referral invitations After data", everything.changes.map((c) => `${c.id}:${c.to}`), ["suite:not", "relaunch:not", "routing:later"]);
  ok("a plan with everything Now is brought inside the budget, each item changed once", everything.after.bars.over === 0 && new Set(everything.changes.map((c) => c.id)).size === everything.changes.length);
  const tiersOf = (ch, start) => {
    const o = { ...start };
    for (const c of ch.changes) o[c.id] = c.to;
    return o;
  };
  eq("applying the changes of an empty plan gives category 1", rpl.categoryOf(T(tiersOf(nothing, {})), 0).cat, 1);
  eq("applying the changes of the everything-Now plan gives category 1", rpl.categoryOf(T(tiersOf(everything, Object.fromEntries(r2.ARCH_IDS.map((id) => [id, "now"])))), 0).cat, 1);

  // Step B: categories (mentor only) and the plain hint when Step B and Step A disagree
  const dr = (decision, tier) => rpl.decisionReading({ tier, decision }, 0);
  eq("decision categories: stage, wait, buy the platform (with and without a base)", [dr("stage", MODEL).cat, dr("wait", MODEL).cat, dr("commit", MODEL).cat, dr("commit", {}).cat], [1, 2, 2, 3]);
  ok("no decision, no reading", rpl.decisionReading({ tier: MODEL, decision: null }, 0) === null);
  ok("waiting while Step A builds gets a plain hint", !!rpl.decisionHint({ tier: MODEL, decision: "wait" }));
  ok("buying the platform while Step A leaves it out gets a plain hint", !!rpl.decisionHint({ tier: MODEL, decision: "commit" }));
  ok("staging with the model plan gets no hint", rpl.decisionHint({ tier: MODEL, decision: "stage" }) === null);

  // texts in both languages, and the learner never reads the category
  for (const l of ["en", "de"]) {
    lang.setCurrentLang(l);
    for (const tier of [MODEL, {}, { personal: "now", suite: "now" }, { ...base, routing: "now" }, Object.fromEntries(r2.ARCH_IDS.map((id) => [id, "now"]))]) {
      const plan = rpl.planOf(T(tier), 1);
      const rd = rpl.readingOf(T(tier), 1);
      const fix = rpl.changesFor(T(tier), 1);
      const learnerText = [rpl.standingOf(T(tier), 1), ...rd.gives, ...rd.costs, ...fix.changes.map((c) => c.text), ...plan.tests.flatMap((x) => [x.name, x.rule, ...x.open.flatMap((o) => [o.fact, o.plain, o.rule, ...o.ways.map((w) => w.text)])]), ...Object.values(plan.items).flatMap((v) => v.notes)].join(" | ");
      ok(`[${l}] the reading, the changes and the tests are written`, rd.gives.length > 0 && rpl.standingOf(T(tier), 1).length > 40 && plan.tests.every((x) => x.name.length > 8 && x.rule.length > 30));
      ok(`[${l}] the learner text never names a category`, !/categor|Kategorie|clearly wrong|eindeutig falsch/i.test(learnerText));
      ok(`[${l}] every open finding says what is off, in plain words, where, and two ways to act`, plan.tests.every((x) => x.open.every((o) => o.fact.length > 20 && o.plain.length > 40 && o.ways.length === 2)));
    }
    for (const id of ["stage", "wait", "commit"]) {
      const d = dr(id, MODEL);
      ok(`[${l}] the reading of the decision “${id}” is written and ends in a change`, d.text.length > 40 && d.change.length > 30 && !/categor|Kategorie/i.test(d.text + d.change));
    }
  }
  lang.setCurrentLang("en");

  // Core never reads Optional (3.1 to 3.4, cards B1 to B4)
  const OPT2 = /Block 3\.[1-4]\b|Materi B[1-4]\b/;
  for (const f of ["components/task2/StepA.tsx", "components/task2/StepB.tsx", "components/task2/Panel.tsx", "components/task2/Kits.tsx", "components/task2/MentorCategory.tsx", "lib/r2Panel.ts", "data/route2Panel.ts"]) ok(`${f} (Core) names no Optional block or card`, !OPT2.test(read(f)));
  const t2 = read("components/task2/Task2.tsx");
  ok("the Route 2 case brief names no Optional block", !OPT2.test(t2.slice(t2.indexOf("function CaseBrief"), t2.indexOf("export function Task2"))));
  ok("Route 2 Optional blocks are 3.1 to 3.4; the two steps are parts of the one Core frame", ["b31", "b32", "b33", "b34"].every((b) => progress.OPTIONAL_BLOCKS.includes(b)) && !progress.OPTIONAL_BLOCKS.includes("b35") && !progress.OPTIONAL_BLOCKS.includes("b36") && !progress.OPTIONAL_BLOCKS.includes("b3f"));

  // every item card prints its scene, and the panel facts exist in both languages
  for (const l of ["en", "de"]) {
    lang.setCurrentLang(l);
    for (const id of r2.ARCH_IDS) {
      ok(`[${l}] item ${id} prints a scene and its panel facts`, require("@/data/route2Extra").ARCH_EXTRA[id].scene.length > 60 && pnl.PANEL[id].short.length > 3 && pnl.PANEL[id].moves.length > 15);
    }
  }
  lang.setCurrentLang("en");

  // worked examples differ from the model text (CLAUDE.md #23)
  for (const g of [mg.greatestGuide(), mg.visionGuide(), mg.giveUpGuide(), mg.decisionWhyGuide(), mg.watchGuide()]) ok(`example of "${g.title}" exists and differs from the answer`, !!g.example && g.example.length > 60 && g.example !== g.answer);
  const ag = mg.architectureGuide();
  ok("the mentor's worked answer for Step A ends in the panel's own numbers", ag.steps.some((x) => x.result === "83%") && ag.steps.some((x) => x.result === "60%") && ag.steps.some((x) => x.result === "0% · 22%") && ag.steps[0].result === lang.euro(156000));
  eq("the answer key of Step A has one option per item", require("@/lib/answerKey").architectureKey().options.length, r2.ARCH_IDS.length);

  for (const l of ["en", "de"]) {
    lang.setCurrentLang(l);
    const k = key.KEY_R2();
    // Core-only: Step A and Step B alone (the one frame) make a complete memo; the Optional blocks 3.1 to 3.4 stay empty
    const coreR2 = { ...store.emptyR2(), tier: k.tier, vision: k.vision, giveUp: k.giveUp, decision: k.decision, decisionWhy: k.decisionWhy, watch: k.watch };
    const pc = { participant: { name: "Core Only" }, ui: { bannerDismissed: {}, sectionsRead: {}, lang: l }, l1: store.emptyL1(), r2: coreR2 };
    eq(`[${l}] Core-only fill leaves the Route 2 missing list empty`, missing.r2Missing(pc).map((m) => m.label), []);
    const tbc = progress.taskBlocks(pc);
    eq(`[${l}] the frame is one Core unit made of Step A and Step B`, [tbc.b35, tbc.b36, tbc.b3f], [true, true, true]);
    const ring = progress.dossierProgress({ ...pc, ui: { ...pc.ui, sectionsRead: { B5: true } } }, 2);
    eq(`[${l}] Route 2 ring: the Core card B5 + the one frame`, [ring.done, ring.total], [2, 2]);
    ok(`[${l}] doing nothing is a named missing item, not a wrong answer`, missing.r2Missing({ ...pc, r2: { ...coreR2, tier: {} } }).some((m) => m.label.startsWith(lang.tt("Step A", "Schritt A")) && /Now|Jetzt/.test(m.label)));
    ok(`[${l}] without a vision, a reason or a watch sentence they are named missing items`, ["vision", "giveUp", "decisionWhy", "watch"].every((f) => missing.r2Missing({ ...pc, r2: { ...coreR2, [f]: "" } }).length === 1));
    // a plan and a decision that differ from the model, over the budget, with the reasons, still exports (CLAUDE.md #38)
    const allNow = Object.fromEntries(r2.ARCH_IDS.map((id) => [id, "now"]));
    const over = { ...coreR2, tier: allNow, decision: "commit" };
    ok(`[${l}] everything Now, over the budget, with the fields filled leaves nothing missing`, missing.r2Missing({ ...pc, r2: over }).length === 0);
    const memoOver = require("@/lib/exportDoc").memoBody({ ...pc, r2: over });
    ok(`[${l}] the memo prints the amount over the budget as a fact`, memoOver.includes(lang.euro(rpl.planOf(T(allNow), 0).bars.over)));
    ok(`[${l}] the memo never prints a category or a verdict`, !/categor|Kategorie|clearly wrong/i.test(memoOver) && !/✓|✗|✔|✘/.test(memoOver));
    ok(`[${l}] an unanswered Optional block is marked in the memo`, require("@/lib/exportDoc").memoBody(pc).includes(lang.tt("Optional block, not answered.", "Optionaler Block, nicht beantwortet.")));
  }
  lang.setCurrentLang("en");
}

// --- the mentor fill, in both languages --------------------------------------------
for (const l of ["en", "de"]) {
  lang.setCurrentLang(l);
  const l1 = { ...store.emptyL1(), ...key.KEY_L1() };
  const rr = { ...store.emptyR2(), ...key.KEY_R2() };
  const p = { participant: { name: "Mentor Check" }, ui: { bannerDismissed: {}, sectionsRead: {}, lang: l }, l1, r2: rr };
  eq(`[${l}] mentor fill leaves Route 1 missing list empty`, missing.l1Missing(p).map((m) => m.label), []);
  eq(`[${l}] mentor fill leaves Route 2 missing list empty`, missing.r2Missing(p).map((m) => m.label), []);
  const tb = progress.taskBlocks(p);
  eq(`[${l}] every task block complete after the fill`, Object.values(tb).every(Boolean), true);
  eq(`[${l}] model sort all hold`, checks.sortHolds(l1.sort), { holds: 9, placed: 9 });
  eq(`[${l}] model picks all hold`, checks.pickHolds(l1), { holds: 4, total: 4 });
  eq(`[${l}] model insights pass the floor`, checks.insightFlags(l1), []);
  ok(`[${l}] model sentence cites a figure`, checks.citesForecastFigure(l1.meaning));
  eq(`[${l}] model tags all hold`, checks.tagHolds(l1.tags), { holds: 12, placed: 12 });
  eq(`[${l}] model uncertainties all real`, checks.uncHolds(l1.unc), { holds: 4, chosen: 4 });
  eq(`[${l}] model A/B card flags nothing`, checks.abFlagsOf(l1.ab), []);
  const rc = checks.rowChecks(l1);
  eq(`[${l}] model kind rows hold`, [rc.holds, rc.total, rc.flags], [12, 12, []]);
  for (const id of l1.chosen) ok(`[${l}] model integration scores follow the printed connections (${id})`, checks.expHolds(id, l1.exp[id]));
  eq(`[${l}] model order has no inversion`, checks.orderInversions(l1), []);
  eq(`[${l}] model principles hold`, checks.principlesHold(rr), { defs: true, rules: true });
  eq(`[${l}] model sources hold`, checks.sourceHolds(rr), { holds: 8, total: 8 });
  eq(`[${l}] model ratings flag nothing`, checks.ratingFlags(rr), []);
  eq(`[${l}] model decision logic holds`, checks.logicHolds(rr), { holds: 12, total: 12 });
}
lang.setCurrentLang("en");

console.log(failed ? `\n${failed} check(s) FAILED` : "\nAll checks passed.");
process.exit(failed ? 1 : 0);
