import { ARCH_BY_ID, ARCH_IDS, R2_BUDGET, R2_MONTHS } from "@/data/route2";
import type { ArchId } from "@/data/route2";
import { CLEAN_ID, ENGINE_IDS, KPI_SYSTEM_ID, PANEL, READY_BAR, WEAK_POINTS, TIER_LABEL } from "@/data/route2Panel";
import type { Tier } from "@/data/route2Panel";
import { euro, tt } from "@/lib/lang";

/**
 * The logic of the Route 2 control panel (CLAUDE.md #47): one place that turns the learner's choices (when each item happens) into what the
 * diagram, the three bars, the tests, the reading of the plan, the export and the mentor's worked answer all say. Nothing here is a verdict:
 * every line is a fact about the plan and, where something is open, the rule and two ways to act. The learner calculates nothing (#44).
 *
 * Time is derived, not asked for: *Now* items start in month 1; *After data is ready* items start in the month the lost-customer data clean-up is in use (so
 * the clean-up must itself be Now: one customer ID and one set of reason codes is what puts the data onto the shared list of lost customers); an item is in use in month =
 * start + weeks ÷ 4, rounded up (the rule Materi B5 teaches). With four months the time test catches the vendor win-back platform: at 24 weeks it is in use only in month 7.
 */
export type Scn = 0 | 1;
type HasTier = { tier: Record<string, Tier> };

const NEVER = R2_MONTHS + 1;

export const tierOf = (r2: HasTier, id: ArchId): Tier => r2.tier[id] ?? "not";
export const isFunded = (r2: HasTier, id: ArchId) => tierOf(r2, id) !== "not";
export const fundedIds = (r2: HasTier): ArchId[] => ARCH_IDS.filter((id) => isFunded(r2, id));
export const nowIds = (r2: HasTier): ArchId[] => ARCH_IDS.filter((id) => tierOf(r2, id) === "now");
export const monthsOf = (id: ArchId) => Math.ceil(ARCH_BY_ID[id].weeks / 4);
const readyOf = (id: ArchId, scn: Scn) => (PANEL[id].data === null ? null : PANEL[id].data! - scn * WEAK_POINTS);

/** The month an item starts: 1 for Now, the month the lost-customer data clean-up is in use for After data (the clean-up must be Now), null when not funded. */
export function startOf(r2: HasTier, id: ArchId): number | null {
  const tier = tierOf(r2, id);
  if (tier === "not") return null;
  if (tier === "now") return 1;
  return tierOf(r2, CLEAN_ID) === "now" ? 1 + monthsOf(CLEAN_ID) : NEVER;
}
export function inUseOf(r2: HasTier, id: ArchId): number | null {
  const s = startOf(r2, id);
  return s === null ? null : s + monthsOf(id);
}

/** The base comes first: the scoreboard and list of lost customers start no later than the item. */
export function measOk(r2: HasTier, id: ArchId): boolean {
  if (id === KPI_SYSTEM_ID) return true;
  const s = startOf(r2, id);
  if (s === null) return false;
  const f = startOf(r2, KPI_SYSTEM_ID);
  return f !== null && f <= s;
}

/** The data an item reads is at least READY_BAR percent complete when it starts (the lost-customer data clean-up lifts the data of the items it prepares). */
export function dataOk(r2: HasTier, id: ArchId, scn: Scn): boolean {
  const v = readyOf(id, scn);
  if (v === null || v >= READY_BAR) return true;
  if (PANEL[id].cleaned && tierOf(r2, CLEAN_ID) === "now") {
    const s = startOf(r2, id);
    const q = inUseOf(r2, CLEAN_ID);
    if (s !== null && q !== null && q <= s) return true;
  }
  return false;
}

export type ItemView = { id: ArchId; tier: Tier; start: number | null; inUse: number | null; measOk: boolean; dataOk: boolean; late: boolean; never: boolean; notes: string[] };
export type Bars = { spent: number; over: number; left: number; meas: number | null; risk: number | null };
export type TestId = "measure" | "purpose" | "data" | "budget";
/** One way to act on an open test; `go` names the Step A cards it is done on (each becomes a jump chip in the panel). */
export type Way = { text: string; go: ArchId[] };
/** One open finding: the fact, what it means in plain words, the rule, the items involved and the ways to act. */
export type OpenDetail = { fact: string; plain: string; rule: string; where: ArchId[]; ways: Way[] };
export type TestView = { id: TestId; name: string; rule: string; applies: boolean; holds: boolean; open: OpenDetail[] };
export type PlanView = { items: Record<ArchId, ItemView>; funded: ArchId[]; nowCount: number; bars: Bars; tests: TestView[]; holding: number; applicable: number };

const nm = (id: ArchId) => PANEL[id].short;
/** The title printed on the item card in Step A, so a step names the card the learner will see. */
const card = (id: ArchId) => tt(`“${ARCH_BY_ID[id].name}”`, `„${ARCH_BY_ID[id].name}“`);

function itemView(r2: HasTier, id: ArchId, scn: Scn): ItemView {
  const tier = tierOf(r2, id);
  const start = startOf(r2, id);
  const inUse = inUseOf(r2, id);
  const funded = tier !== "not";
  const never = funded && start === NEVER;
  const m = measOk(r2, id);
  const d = dataOk(r2, id, scn);
  const late = funded && !never && inUse !== null && inUse > R2_MONTHS;
  const notes: string[] = [];
  if (funded) {
    if (never) notes.push(tt("never starts: the lost-customer data clean-up it waits for is not planned", "startet nie: Die Bereinigung der Daten verlorener Kunden, auf die es wartet, ist nicht eingeplant"));
    if (!m && !never) notes.push(tt("starts before the scoreboard and list of lost customers are in place", "startet, bevor Scoreboard und Liste verlorener Kunden stehen"));
    if (!d && !never) notes.push(tt(`the data it reads is ${readyOf(id, scn)}% complete, below ${READY_BAR}%, when it starts`, `die Daten, die es liest, sind zu ${readyOf(id, scn)} % vollständig, unter ${READY_BAR} %, wenn es startet`));
    if (PANEL[id].blackBox) notes.push(tt("black box: nobody can see why a lost customer gets its offer", "Black Box: Niemand kann sehen, warum ein verlorener Kunde sein Angebot bekommt"));
    if (late) notes.push(tt(`in use only in month ${inUse}, after the ${R2_MONTHS} months`, `erst in Monat ${inUse} im Einsatz, nach den ${R2_MONTHS} Monaten`));
  }
  return { id, tier, start, inUse, measOk: m, dataOk: d, late, never, notes };
}

/**
 * Measurable: the share of the funded money on items that are measured, whose data is complete, that are in use inside the plan and are not a black box.
 * Risk: the share on a black box, on data below the bar or on an item that is in use only after the plan's months.
 */
function barsOf(r2: HasTier, scn: Scn): Bars {
  const f = fundedIds(r2);
  const spent = f.reduce((s, id) => s + ARCH_BY_ID[id].cost, 0);
  let meas = 0;
  let risk = 0;
  for (const id of f) {
    const c = ARCH_BY_ID[id].cost;
    const v = itemView(r2, id, scn);
    if (PANEL[id].measured && v.measOk && v.dataOk && !v.late && !v.never && !PANEL[id].blackBox) meas += c;
    if (PANEL[id].blackBox || !v.dataOk || v.late) risk += c;
  }
  return { spent, over: Math.max(0, spent - R2_BUDGET), left: R2_BUDGET - spent, meas: spent ? Math.round((meas / spent) * 100) : null, risk: spent ? Math.round((risk / spent) * 100) : null };
}

/** The Measurable and Risk bars are ranges across the two data scenarios: [as the brief says, weaker data]. */
export function rangeOf(r2: HasTier): { meas: [number | null, number | null]; risk: [number | null, number | null] } {
  const a = barsOf(r2, 0);
  const w = barsOf(r2, 1);
  return { meas: [a.meas, w.meas], risk: [a.risk, w.risk] };
}

/* ------------------------------------------------------------------ the four tests */

const TEST_NAME: Record<TestId, () => string> = {
  measure: () => tt("The base comes first", "Die Basis kommt zuerst"),
  purpose: () => tt("Every funded item has a purpose", "Jeder finanzierte Punkt hat einen Zweck"),
  data: () => tt("Data is complete when an approach starts", "Die Daten sind vollständig, wenn ein Ansatz startet"),
  budget: () => tt(`It fits the budget and the ${R2_MONTHS} months`, `Es passt ins Budget und in die ${R2_MONTHS} Monate`),
};
const TEST_RULE: Record<TestId, () => string> = {
  measure: () => tt("The scoreboard and list of lost customers start no later than the first approach, so every approach reads one lost customer and is measured by the same KPIs from its first week.", "Scoreboard und Liste verlorener Kunden starten nicht später als der erste Ansatz, damit jeder Ansatz einen verlorenen Kunden liest und ab seiner ersten Woche nach denselben KPIs gemessen wird."),
  purpose: () => tt("A funded item moves a named customer KPI or makes one measurable. A black box and a discount that names no customer KPI do neither: nobody can say what they change for customers.", "Ein finanzierter Punkt bewegt einen benannten Kunden-KPI oder macht einen messbar. Eine Black Box und ein Rabatt, der keinen Kunden-KPI nennt, tun keines von beidem: Niemand kann sagen, was sie für Kunden ändern."),
  data: () => tt(`An approach starts on data of which at least ${READY_BAR}% already reaches the shared list of lost customers. Data that is not complete teaches the approach its gaps.`, `Ein Ansatz startet auf Daten, von denen mindestens ${READY_BAR} % schon die gemeinsame Liste verlorener Kunden erreichen. Daten, die nicht vollständig sind, lehren den Ansatz seine Lücken.`),
  budget: () => tt(`The funded items stay inside ${euro(R2_BUDGET)} and are all in use by month ${R2_MONTHS}.`, `Die finanzierten Punkte bleiben innerhalb von ${euro(R2_BUDGET)} und sind alle bis Monat ${R2_MONTHS} im Einsatz.`),
};
export const TEST_IDS: TestId[] = ["measure", "purpose", "data", "budget"];

function testsOf(r2: HasTier, scn: Scn, items: Record<ArchId, ItemView>, bars: Bars): TestView[] {
  const f = fundedIds(r2);
  const engines = ENGINE_IDS.filter((id) => isFunded(r2, id));
  const view = (id: TestId, applies: boolean, open: OpenDetail[]): TestView => ({ id, name: TEST_NAME[id](), rule: TEST_RULE[id](), applies, holds: applies && open.length === 0, open });

  // 1 · base first
  const mOpen: OpenDetail[] = [];
  for (const id of engines) {
    const v = items[id];
    if (v.never || v.measOk) continue;
    const f0 = startOf(r2, KPI_SYSTEM_ID);
    const part = f0 === null ? tt("the scoreboard and list of lost customers are not funded", "Scoreboard und Liste verlorener Kunden sind nicht finanziert") : tt(`the scoreboard and list of lost customers start in month ${f0}`, `Scoreboard und Liste verlorener Kunden starten in Monat ${f0}`);
    mOpen.push({
      fact: tt(`${nm(id)}: starts in month ${v.start}, but ${part}.`, `${nm(id)}: startet in Monat ${v.start}, aber ${part}.`),
      plain: tt(`${nm(id)} would start before the scoreboard and list are in place. It would pick approaches for customers it sees only in part, and nobody could compare its results on the same KPIs.`, `${nm(id)} würde starten, bevor Scoreboard und Liste stehen. Es würde Ansätze für Kunden wählen, die es nur zum Teil sieht, und niemand könnte seine Ergebnisse an denselben KPIs vergleichen.`),
      where: [id, KPI_SYSTEM_ID],
      rule: TEST_RULE.measure(),
      ways: [
        { text: tt("Set the scoreboard and list of lost customers to Now: they start in month 1, before any approach.", "Setzen Sie Scoreboard und Liste verlorener Kunden auf „Jetzt“: Sie starten in Monat 1, vor jedem Ansatz."), go: [KPI_SYSTEM_ID] },
        { text: tt(`Or, on the card ${card(id)}, press “Not now” until they are in place.`, `Oder drücken Sie auf der Karte ${card(id)} „Jetzt nicht“, bis sie stehen.`), go: [id] },
      ],
    });
  }

  // 2 · every funded item has a purpose
  const pOpen: OpenDetail[] = f
    .filter((id) => !PANEL[id].named && !PANEL[id].enabler)
    .map((id) => ({
      fact: PANEL[id].blackBox
        ? tt(`${nm(id)} names no customer KPI it moves, and its reasons and results are not shown.`, `${nm(id)} nennt keinen Kunden-KPI, den es bewegt, und seine Gründe und Ergebnisse werden nicht gezeigt.`)
        : tt(`${nm(id)} names no customer KPI it moves: it counts discounts accepted, and nothing says whether that brought back a customer who would not have returned anyway.`, `${nm(id)} nennt keinen Kunden-KPI, den es bewegt: Es zählt angenommene Rabatte, und nichts sagt, ob das einen Kunden zurückbrachte, der sonst nicht zurückgekehrt wäre.`),
      plain: PANEL[id].blackBox ? tt(`You would pay ${euro(ARCH_BY_ID[id].cost)} for a platform that picks an offer for every lost customer without saying why. After ${R2_MONTHS} months nobody at RecoverIT could say whether that money brought back a single customer.`, `Sie würden ${euro(ARCH_BY_ID[id].cost)} für eine Plattform zahlen, die für jeden verlorenen Kunden ein Angebot wählt, ohne zu sagen, warum. Nach ${R2_MONTHS} Monaten könnte bei RecoverIT niemand sagen, ob dieses Geld auch nur einen Kunden zurückgebracht hat.`) : tt(`You would pay ${euro(ARCH_BY_ID[id].cost)} for a discount offer that is not connected to the reason a customer left and names no customer KPI. After ${R2_MONTHS} months nobody could say whether it brought back a customer who would not have returned anyway, and customers may simply have learned to wait for it.`, `Sie würden ${euro(ARCH_BY_ID[id].cost)} für ein Rabattangebot zahlen, das nicht mit dem Grund verbunden ist, aus dem ein Kunde ging, und keinen Kunden-KPI nennt. Nach ${R2_MONTHS} Monaten könnte niemand sagen, ob es einen Kunden zurückbrachte, der sonst nicht zurückgekehrt wäre, und Kunden haben vielleicht nur gelernt, darauf zu warten.`),
      where: [id],
      rule: TEST_RULE.purpose(),
      ways: [
        { text: tt(`Set it to Not now and use the ${euro(ARCH_BY_ID[id].cost)} on an item that moves a named customer KPI.`, `Setzen Sie es auf „Jetzt nicht“ und nutzen Sie die ${euro(ARCH_BY_ID[id].cost)} für einen Punkt, der einen benannten Kunden-KPI bewegt.`), go: [id] },
        { text: tt("Or keep it, and say in your reasons how RecoverIT will explain what it does and measure its effect.", "Oder behalten Sie es, und sagen Sie in Ihren Begründungen, wie RecoverIT erklären wird, was es tut, und seine Wirkung misst."), go: [] },
      ],
    }));

  // 3 · data complete when an approach starts
  const dOpen: OpenDetail[] = [];
  for (const id of engines) {
    const v = items[id];
    if (v.never) {
      dOpen.push({
        fact: tt(`${nm(id)}: waits for data, but the lost-customer data clean-up it waits for is not set to Now, so it never starts.`, `${nm(id)}: wartet auf die Daten, aber die Bereinigung der Daten verlorener Kunden, auf die es wartet, steht nicht auf „Jetzt“, also startet es nie.`),
        plain: tt(`“${TIER_LABEL.later}” means: wait until ${card(CLEAN_ID)} is in use. But that item is not set to Now, so ${nm(id)} waits for ever and its money is booked for nothing.`, `„${TIER_LABEL.later}“ heißt: warten, bis ${card(CLEAN_ID)} im Einsatz ist. Dieser Punkt steht aber nicht auf „Jetzt“, also wartet ${nm(id)} für immer, und sein Geld ist für nichts verbucht.`),
        where: [id, CLEAN_ID],
        rule: TEST_RULE.data(),
        ways: [
          { text: tt("Set the lost-customer data clean-up to Now.", "Setzen Sie die Bereinigung der Daten verlorener Kunden auf „Jetzt“."), go: [CLEAN_ID] },
          { text: tt(`Or, on the card ${card(id)}, press “Not now”.`, `Oder drücken Sie auf der Karte ${card(id)} „Jetzt nicht“.`), go: [id] },
        ],
      });
      continue;
    }
    if (v.dataOk) continue;
    const val = readyOf(id, scn);
    if (PANEL[id].cleaned) {
      dOpen.push({
        fact: tt(`${nm(id)}: starts in month ${v.start} on data ${val}% complete, below ${READY_BAR}%. The lost-customer data clean-up is ${isFunded(r2, CLEAN_ID) && tierOf(r2, CLEAN_ID) === "now" ? `in use only in month ${inUseOf(r2, CLEAN_ID)}` : "not set to Now"}.`, `${nm(id)}: startet in Monat ${v.start} auf Daten, die zu ${val} % vollständig sind, unter ${READY_BAR} %. Die Bereinigung der Daten verlorener Kunden ist ${isFunded(r2, CLEAN_ID) && tierOf(r2, CLEAN_ID) === "now" ? `erst in Monat ${inUseOf(r2, CLEAN_ID)} im Einsatz` : "nicht auf „Jetzt“ gesetzt"}.`),
        plain: tt(`${nm(id)} would work on data of which only ${val}% reaches the shared list of lost customers, so it would see only part of what each customer was worth and why it left. The lost-customer data clean-up completes exactly this data, but ${nm(id)} starts before the clean-up is in use.`, `${nm(id)} würde auf Daten arbeiten, von denen nur ${val} % die gemeinsame Liste verlorener Kunden erreichen, und also nur einen Teil davon sehen, was jeder Kunde wert war und warum er ging. Die Bereinigung der Daten verlorener Kunden vervollständigt genau diese Daten, aber ${nm(id)} startet, bevor die Bereinigung im Einsatz ist.`),
        where: [id, CLEAN_ID],
        rule: TEST_RULE.data(),
        ways: [
          { text: tt(`Set the lost-customer data clean-up to Now and ${nm(id)} to After data is ready: it then starts in month ${1 + monthsOf(CLEAN_ID)}, when the clean-up is in use.`, `Setzen Sie die Bereinigung der Daten verlorener Kunden auf „Jetzt“ und ${nm(id)} auf „Wenn die Daten bereit sind“: Es startet dann in Monat ${1 + monthsOf(CLEAN_ID)}, wenn die Bereinigung im Einsatz ist.`), go: [CLEAN_ID, id] },
          { text: tt(`Or, on the card ${card(id)}, press “Not now”.`, `Oder drücken Sie auf der Karte ${card(id)} „Jetzt nicht“.`), go: [id] },
        ],
      });
    } else {
      dOpen.push({
        fact: tt(`${nm(id)}: starts on data ${val}% complete, below ${READY_BAR}%. The lost-customer data clean-up does not prepare this data.`, `${nm(id)}: startet auf Daten, die zu ${val} % vollständig sind, unter ${READY_BAR} %. Die Bereinigung der Daten verlorener Kunden bereitet diese Daten nicht vor.`),
        plain: tt(`${nm(id)} would work on data of which only ${val}% reaches the shared list of lost customers, so it would see only part of what each customer was worth and why it left. Nothing in this plan completes this data.`, `${nm(id)} würde auf Daten arbeiten, von denen nur ${val} % die gemeinsame Liste verlorener Kunden erreichen, und also nur einen Teil davon sehen, was jeder Kunde wert war und warum er ging. Nichts in diesem Plan vervollständigt diese Daten.`),
        where: [id],
        rule: TEST_RULE.data(),
        ways: [
          { text: tt(`On the card ${card(id)}, press “Not now” until the data is better.`, `Drücken Sie auf der Karte ${card(id)} „Jetzt nicht“, bis die Daten besser sind.`), go: [id] },
          { text: tt(`Or keep it, and say in your reasons what you will do if the data stays below ${READY_BAR}%.`, `Oder behalten Sie es, und sagen Sie in Ihren Begründungen, was Sie tun, wenn die Daten unter ${READY_BAR} % bleiben.`), go: [] },
        ],
      });
    }
  }

  // 4 · budget and the plan's months
  const bOpen: OpenDetail[] = [];
  if (bars.over > 0)
    bOpen.push({
      fact: tt(`The funded items cost ${euro(bars.spent)}, which is ${euro(bars.over)} over the ${euro(R2_BUDGET)} budget.`, `Die finanzierten Punkte kosten ${euro(bars.spent)}, das sind ${euro(bars.over)} über dem Budget von ${euro(R2_BUDGET)}.`),
      plain: tt(`Your plan spends more than the ${euro(R2_BUDGET)} you have. To fit, take items worth at least ${euro(bars.over)} out of the plan. Your funded items are listed below with their costs, most expensive first; choose the one whose case you find weakest.`, `Ihr Plan gibt mehr aus als die ${euro(R2_BUDGET)}, die Sie haben. Damit er passt, nehmen Sie Punkte im Wert von mindestens ${euro(bars.over)} aus dem Plan. Ihre finanzierten Punkte stehen unten mit ihren Kosten, die teuersten zuerst; wählen Sie den, dessen Begründung Sie am schwächsten finden.`),
      where: [],
      rule: TEST_RULE.budget(),
      ways: [
        { text: tt(`On one or more of these cards, press “Not now” (together at least ${euro(bars.over)}):`, `Drücken Sie auf einer oder mehreren dieser Karten „Jetzt nicht“ (zusammen mindestens ${euro(bars.over)}):`), go: [...f].sort((a, c) => ARCH_BY_ID[c].cost - ARCH_BY_ID[a].cost) },
        { text: tt("Or keep the total, and say in your reasons why it is worth going over.", "Oder behalten Sie die Summe, und sagen Sie in Ihren Begründungen, warum es sich lohnt, darüber zu liegen."), go: [] },
      ],
    });
  for (const id of f) {
    const v = items[id];
    if (!v.late) continue;
    bOpen.push({
      fact: tt(`${nm(id)}: in use only in month ${v.inUse}, after the ${R2_MONTHS} months (${monthsOf(id)} months to build, starting in month ${v.start}).`, `${nm(id)}: erst in Monat ${v.inUse} im Einsatz, nach den ${R2_MONTHS} Monaten (${monthsOf(id)} Monate Aufbau, Start in Monat ${v.start}).`),
      plain: tt(`${nm(id)} would be ready only after the plan ends, so it cannot show any result inside the ${R2_MONTHS} months.`, `${nm(id)} wäre erst nach dem Ende des Plans fertig und kann also innerhalb der ${R2_MONTHS} Monate kein Ergebnis zeigen.`),
      where: [id],
      rule: TEST_RULE.budget(),
      ways: [
        { text: v.tier === "later" ? tt(`On the card ${card(id)}, press “Now”: it then starts in month 1.`, `Drücken Sie auf der Karte ${card(id)} „Jetzt“: Es startet dann in Monat 1.`) : tt(`On the card ${card(id)}, press “Not now”.`, `Drücken Sie auf der Karte ${card(id)} „Jetzt nicht“.`), go: [id] },
        { text: tt(`Or keep it, and say in your reasons what the plan does without it before month ${R2_MONTHS + 1}.`, `Oder behalten Sie es, und sagen Sie in Ihren Begründungen, was der Plan ohne es vor Monat ${R2_MONTHS + 1} tut.`), go: [] },
      ],
    });
  }

  const any = f.length > 0;
  return [view("measure", engines.length > 0, mOpen), view("purpose", any, pOpen), view("data", engines.length > 0, dOpen), view("budget", any, bOpen)];
}

/** Everything the panel shows for one data scenario. */
export function planOf(r2: HasTier, scn: Scn): PlanView {
  const items = Object.fromEntries(ARCH_IDS.map((id) => [id, itemView(r2, id, scn)])) as Record<ArchId, ItemView>;
  const bars = barsOf(r2, scn);
  const tests = testsOf(r2, scn, items, bars);
  const applicable = tests.filter((x) => x.applies).length;
  return { items, funded: fundedIds(r2), nowCount: nowIds(r2).length, bars, tests, holding: tests.filter((x) => x.holds).length, applicable };
}

/* ------------------------------------------------------------------ the reading of the plan */

export type Reading = { gives: string[]; costs: string[] };

/** What the plan gives, and what it costs or leaves open: two lists of facts, never a grade (CLAUDE.md #47). */
export function readingOf(r2: HasTier, scn: Scn): Reading {
  const plan = planOf(r2, scn);
  const gives: string[] = [];
  const costs: string[] = [];
  for (const id of ARCH_IDS) {
    const v = plan.items[id];
    const p = PANEL[id];
    const cost = ARCH_BY_ID[id].cost;
    if (v.tier === "not") {
      if (p.blackBox) gives.push(tt(`${nm(id)} not bought: ${euro(cost)} is not spent on a black box.`, `${nm(id)} nicht gekauft: ${euro(cost)} werden nicht für eine Black Box ausgegeben.`));
      else if (id === "relaunch") gives.push(tt(`${nm(id)} not now: ${euro(cost)} and ${ARCH_BY_ID[id].weeks} weeks are not spent on a discount that names no customer KPI and is not connected to the reason a customer left.`, `${nm(id)} jetzt nicht: ${euro(cost)} und ${ARCH_BY_ID[id].weeks} Wochen werden nicht für einen Rabatt ausgegeben, der keinen Kunden-KPI nennt und nicht mit dem Grund verbunden ist, aus dem ein Kunde ging.`));
      else if (id === KPI_SYSTEM_ID) costs.push(tt("Scoreboard and list of lost customers not funded: every approach keeps its own customer list, and each team counts the KPIs its own way.", "Scoreboard und Liste verlorener Kunden nicht finanziert: Jeder Ansatz führt weiter seine eigene Kundenliste, und jedes Team zählt die KPIs auf seine Weise."));
      else if (id === "training") costs.push(tt("Training not now: account owners and sales may not open return calls with the fixed reason or log what the customer said.", "Training jetzt nicht: Account Owner und Vertrieb eröffnen Rückkehr-Anrufe vielleicht nicht mit dem behobenen Grund oder halten nicht fest, was der Kunde sagte."));
      else if (id === "tracking") costs.push(tt("Test-and-learn routine not now: no offer is tested on a random half first, and nobody checks every month which approach to keep, change or stop.", "Test-and-learn-Routine jetzt nicht: Kein Angebot wird zuerst an einer zufälligen Hälfte getestet, und niemand prüft jeden Monat, welcher Ansatz zu behalten, zu ändern oder zu stoppen ist."));
      else if (p.named) costs.push(tt(`${nm(id)} not now: does not move ${p.moves}.`, `${nm(id)} jetzt nicht: bewegt ${p.moves} nicht.`));
      continue;
    }
    if (v.never) {
      costs.push(tt(`${nm(id)}: waits for a lost-customer data clean-up that is not planned, so it never starts.`, `${nm(id)}: wartet auf eine Bereinigung der Daten verlorener Kunden, die nicht eingeplant ist, und startet daher nie.`));
      continue;
    }
    if (p.blackBox) {
      costs.push(tt(`${nm(id)}: ${euro(cost)} on offers nobody can explain or challenge.`, `${nm(id)}: ${euro(cost)} für Angebote, die niemand erklären oder hinterfragen kann.`));
    } else if (id === "relaunch") {
      costs.push(tt(`${nm(id)}: ${euro(cost)} on a discount that is not connected to the reason a customer left, so it goes to customers who would have returned anyway, and nobody can show whether it brought back one who would not have.`, `${nm(id)}: ${euro(cost)} für einen Rabatt, der nicht mit dem Grund verbunden ist, aus dem ein Kunde ging, sodass er an Kunden geht, die ohnehin zurückgekommen wären, und niemand zeigen kann, ob er einen zurückbrachte, der sonst nicht gekommen wäre.`));
    } else if (id === KPI_SYSTEM_ID) {
      gives.push(tt("Scoreboard and list of lost customers: every approach reads one lost customer, and every KPI is defined once across them.", "Scoreboard und Liste verlorener Kunden: Jeder Ansatz liest einen verlorenen Kunden, und jeder KPI ist einmal über alle definiert."));
    } else if (id === "training") {
      gives.push(tt("Training: account owners and sales open return calls with the fixed reason and log what the customer said.", "Training: Account Owner und Vertrieb eröffnen Rückkehr-Anrufe mit dem behobenen Grund und halten fest, was der Kunde sagte."));
    } else if (id === "tracking") {
      gives.push(tt("Test-and-learn routine: every new offer goes to a random half first, and a monthly review keeps, changes or stops each approach.", "Test-and-learn-Routine: Jedes neue Angebot geht zuerst an eine zufällige Hälfte, und ein monatliches Review behält, ändert oder stoppt jeden Ansatz."));
    } else if (id === CLEAN_ID) {
      gives.push(cleanGives(r2));
    } else {
      const ready = readyOf(id, scn);
      if (v.measOk && v.dataOk)
        gives.push(tt(`${nm(id)}: moves ${p.moves}, is measured, and the data it reads is complete${ready !== null ? ` (${ready}%)` : ""}${v.tier === "later" ? `; it starts in month ${v.start}, when the lost-customer data clean-up is in use` : ""}.`, `${nm(id)}: bewegt ${p.moves}, wird gemessen, und die Daten, die es liest, sind vollständig${ready !== null ? ` (${ready} %)` : ""}${v.tier === "later" ? `; startet in Monat ${v.start}, wenn die Bereinigung der Daten verlorener Kunden im Einsatz ist` : ""}.`));
      if (!v.measOk) costs.push(tt(`${nm(id)}: nothing measures it when it starts, so its effect on ${p.moves} cannot be shown.`, `${nm(id)}: Nichts misst es, wenn es startet, seine Wirkung auf ${p.moves} lässt sich also nicht zeigen.`));
      if (!v.dataOk) costs.push(tt(`${nm(id)}: the data it reads is ${ready}% complete, below ${READY_BAR}%, when it starts.`, `${nm(id)}: Die Daten, die es liest, sind zu ${ready} % vollständig, unter ${READY_BAR} %, wenn es startet.`));
    }
    if (v.late) costs.push(tt(`${nm(id)}: in use only in month ${v.inUse}, after the ${R2_MONTHS} months.`, `${nm(id)}: erst in Monat ${v.inUse} im Einsatz, nach den ${R2_MONTHS} Monaten.`));
  }
  const b = plan.bars;
  if (plan.funded.length === 0) costs.unshift(tt("Nothing is built: the three problems in the brief stay as they are.", "Nichts wird gebaut: Die drei Probleme des Auftrags bleiben, wie sie sind."));
  else if (b.over > 0) costs.push(tt(`${euro(b.over)} over the budget. Keep it only with a reason.`, `${euro(b.over)} über dem Budget. Behalten Sie es nur mit einer Begründung.`));
  else if (b.left > 0) costs.push(tt(`${euro(b.left)} of the budget stays unspent. Say what it is for, or why you hold it back.`, `${euro(b.left)} des Budgets bleiben ungenutzt. Sagen Sie, wofür es gedacht ist oder warum Sie es zurückhalten.`));
  if (plan.funded.length > 0) {
    const top = plan.funded.filter((id) => !PANEL[id].blackBox).reduce((a, id) => (ARCH_BY_ID[id].cost > ARCH_BY_ID[a].cost ? id : a), plan.funded[0]);
    if (b.spent > 0 && ARCH_BY_ID[top].cost / b.spent >= 0.35 && !PANEL[top].blackBox) costs.push(tt(`${Math.round((ARCH_BY_ID[top].cost / b.spent) * 100)}% of the money rides on one item: ${nm(top)}.`, `${Math.round((ARCH_BY_ID[top].cost / b.spent) * 100)} % des Geldes hängen an einem Punkt: ${nm(top)}.`));
  }
  if (gives.length === 0) gives.push(tt("Nothing yet. Set at least one item to Now.", "Noch nichts. Setzen Sie mindestens einen Punkt auf „Jetzt“."));
  return { gives, costs };
}

/** What the lost-customer data clean-up gives, depending on whether the value-based priority is part of the plan. */
function cleanGives(r2: HasTier): string {
  return isFunded(r2, "routing")
    ? tt("Lost-customer data clean-up: the reason and the contract value of a lost customer are recorded the same way everywhere, so the data the value-based priority reads reaches the shared list before it starts.", "Bereinigung der Daten verlorener Kunden: Grund und Vertragswert eines verlorenen Kunden werden überall gleich erfasst, sodass die Daten, die die wertbasierte Priorität liest, die gemeinsame Liste erreichen, bevor sie startet.")
    : tt("Lost-customer data clean-up: the reason and the contract value of a lost customer are recorded the same way everywhere, so the list is comparable across the CRM, the contract system and the exit survey; a later value-based priority would not learn the gaps.", "Bereinigung der Daten verlorener Kunden: Grund und Vertragswert eines verlorenen Kunden werden überall gleich erfasst, sodass die Liste über CRM, Vertragssystem und Abschlussumfrage vergleichbar ist; eine spätere wertbasierte Priorität würde die Lücken nicht lernen.");
}

/* ------------------------------------------------------------------ Step B: the decision against Step A */

/** One plain hint when the Step B decision and the Step A plan point in different directions; null when they agree. */
export function decisionHint(r2: HasTier & { decision: string | null }): string | null {
  const n = nowIds(r2).length;
  if (r2.decision === "wait" && n > 0) return tt("Step B says wait until the success rate is known, while Step A builds " + n + (n === 1 ? " item" : " items") + " now. Say in your reason how the two fit together.", "Schritt B sagt, zu warten, bis die Erfolgsquote bekannt ist, während Schritt A jetzt " + n + (n === 1 ? " Punkt" : " Punkte") + " baut. Sagen Sie in Ihrer Begründung, wie beides zusammenpasst.");
  if (r2.decision === "commit" && !isFunded(r2, "suite")) return tt("Step B says buy the vendor's win-back platform now, while Step A leaves it out. Say in your reason which of the two you stand behind.", "Schritt B sagt, jetzt die Win-back-Plattform des Anbieters zu kaufen, während Schritt A sie weglässt. Sagen Sie in Ihrer Begründung, zu welchem von beiden Sie stehen.");
  if (r2.decision === "stage" && tierOf(r2, "suite") === "now") return tt("Step B says build in stages, while Step A starts the vendor platform now, all at once. Say in your reason how that is staged.", "Schritt B sagt, in Stufen zu bauen, während Schritt A die Anbieter-Plattform jetzt auf einmal startet. Sagen Sie in Ihrer Begründung, wie das gestuft ist.");
  return null;
}

/* ------------------------------------------------------------------ three internal categories (CLAUDE.md #47) */

/**
 * 1 · safe: the base is built before the approaches and every applicable test holds (there can be several such plans).
 * 2 · fair: a base exists but a fundamental is missing or a better approach is available.
 * 3 · clearly wrong: approaches or the vendor platform are funded without the base (no scoreboard and list of lost customers), or nothing is built.
 * Used only to choose what the reading says and for the mentor's understanding; the learner never sees it and it is never exported.
 */
export type Category = 1 | 2 | 3;
const GAME_IDS: ArchId[] = ["personal", "routing", "suite"];

export function categoryOf(r2: HasTier, scn: Scn = 0): { cat: Category; why: string } {
  const f = fundedIds(r2);
  if (f.length === 0) return { cat: 3, why: "Nothing is built: the task asks for a system." };
  const game = f.filter((id) => GAME_IDS.includes(id));
  const base = isFunded(r2, KPI_SYSTEM_ID);
  if (game.length > 0 && !base) return { cat: 3, why: `${game.map((id) => PANEL[id].short).join(", ")} funded with no scoreboard and list of lost customers: approaches are bought before the base exists.` };
  const plan = planOf(r2, scn);
  const open = plan.tests.filter((x) => x.applies && !x.holds).map((x) => x.name);
  if (!base) return { cat: 2, why: "No scoreboard and list of lost customers yet, so nothing can be joined or measured; no approach is bought without it." };
  if (open.length === 0) return { cat: 1, why: "The scoreboard and list of lost customers are funded and every applicable test holds." };
  return { cat: 2, why: `The scoreboard and list of lost customers are funded, but these tests are open: ${open.join("; ")}.` };
}

export type Change = { id: ArchId; to: Tier; text: string };

const CUT_ORDER: ArchId[] = ["suite", "relaunch", "training", "tracking", "routing", "personal", "chat"];

/** The changes that put the plan on the safe side, as information: which item to which tier and why, and what the plan looks like after them. */
export function changesFor(r2: HasTier, scn: Scn): { changes: Change[]; after: PlanView } {
  const t: Record<string, Tier> = { ...r2.tier };
  const cur = (id: ArchId): Tier => t[id] ?? "not";
  const changes: Change[] = [];
  const set = (id: ArchId, to: Tier, text: string) => {
    if (cur(id) === to) return;
    t[id] = to;
    changes.push({ id, to, text });
  };
  const any = () => ARCH_IDS.some((id) => cur(id) !== "not");
  const baseText = tt("Set the scoreboard and list of lost customers to Now: the base comes first, and it starts in month 1, no later than any approach.", "Setzen Sie Scoreboard und Liste verlorener Kunden auf „Jetzt“: Die Basis kommt zuerst, und sie startet in Monat 1, nicht später als jeder Ansatz.");

  if (!any()) {
    set(KPI_SYSTEM_ID, "now", baseText);
    set("tracking", "now", tt("Add the test-and-learn routine, set to Now: it needs no data to start, and it moves the win-back rate by testing every offer before it grows.", "Fügen Sie die Test-and-learn-Routine hinzu, auf „Jetzt“: Sie braucht keine Daten zum Start und bewegt die Win-back Rate, indem jedes Angebot getestet wird, bevor es wächst."));
  }
  if (any() && cur(KPI_SYSTEM_ID) !== "now") set(KPI_SYSTEM_ID, "now", baseText);
  if (cur("suite") !== "not") set("suite", "not", tt(`Set the vendor win-back platform to Not now: it names no customer KPI it moves, nobody can see inside it, and at ${ARCH_BY_ID.suite.weeks} weeks it is in use only in month ${1 + monthsOf("suite")}.`, `Setzen Sie die Win-back-Plattform des Anbieters auf „Jetzt nicht“: Sie nennt keinen Kunden-KPI, den sie bewegt, niemand kann hineinsehen, und mit ${ARCH_BY_ID.suite.weeks} Wochen ist sie erst in Monat ${1 + monthsOf("suite")} im Einsatz.`));
  if (cur("relaunch") !== "not") set("relaunch", "not", tt("Set the 25% discount for every lost customer to Not now: it names no customer KPI it moves, and it is not connected to the reason a customer left.", "Setzen Sie den Rabatt von 25 % für jeden verlorenen Kunden auf „Jetzt nicht“: Er nennt keinen Kunden-KPI, den er bewegt, und ist nicht mit dem Grund verbunden, aus dem ein Kunde ging."));
  const spent = () => ARCH_IDS.filter((id) => cur(id) !== "not").reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  const cut = () => {
    for (const id of CUT_ORDER) {
      if (spent() <= R2_BUDGET) return;
      if (cur(id) === "not") continue;
      set(id, "not", tt(`Set ${PANEL[id].short} to Not now: the plan is ${euro(spent() - R2_BUDGET)} over the budget and this is the item with the weakest case.`, `Setzen Sie ${PANEL[id].short} auf „Jetzt nicht“: Der Plan liegt ${euro(spent() - R2_BUDGET)} über dem Budget, und dies ist der Punkt mit der schwächsten Begründung.`));
    }
  };
  cut();
  for (const id of ENGINE_IDS.filter((x) => PANEL[x].cleaned)) {
    if (cur(id) === "not") continue;
    if (cur(CLEAN_ID) !== "now") set(CLEAN_ID, "now", tt("Set the lost-customer data clean-up to Now: the reason and the contract value of a lost customer are then recorded the same way everywhere and the data the value-based priority reads reaches the shared list.", "Setzen Sie die Bereinigung der Daten verlorener Kunden auf „Jetzt“: Grund und Vertragswert eines verlorenen Kunden werden dann überall gleich erfasst, und die Daten, die die wertbasierte Priorität liest, erreichen die gemeinsame Liste."));
    if (!dataOk({ tier: t }, id, scn)) set(id, "later", tt(`Set ${PANEL[id].short} to After data is ready: its data is ${PANEL[id].data}% complete, so it starts in month ${1 + monthsOf(CLEAN_ID)}, when the lost-customer data clean-up is in use.`, `Setzen Sie ${PANEL[id].short} auf „Wenn die Daten bereit sind“: Seine Daten sind zu ${PANEL[id].data} % vollständig, also startet es in Monat ${1 + monthsOf(CLEAN_ID)}, wenn die Bereinigung der Daten verlorener Kunden im Einsatz ist.`));
    cut();
  }
  return { changes, after: planOf({ tier: t }, scn) };
}

/* ------------------------------------------------------------------ how the system reads the plan (wording by category) */

/** One paragraph on how the plan stands, worded by category; it never names the category. */
export function standingOf(r2: HasTier, scn: Scn): string {
  const { cat } = categoryOf(r2, scn);
  const f = fundedIds(r2);
  const game = f.filter((id) => GAME_IDS.includes(id));
  const brief = planOf(r2, 0);
  const weak = planOf(r2, 1);
  if (cat === 3) {
    return f.length === 0
      ? tt("Nothing is built, so the three problems in the brief stay as they are. The task asks for a system. Below are the changes that put the base first.", "Nichts wird gebaut, also bleiben die drei Probleme des Auftrags, wie sie sind. Die Aufgabe verlangt ein System. Unten stehen die Änderungen, die die Basis an die erste Stelle setzen.")
      : tt(`${game.map((id) => PANEL[id].short).join(", ")} ${game.length === 1 ? "is" : "are"} funded, but there is no scoreboard and list of lost customers. Without it the approach reads only one system, nothing can say whether it works, and it picks offers for customers it knows only in part. Below are the changes that put the base first.`, `${game.map((id) => PANEL[id].short).join(", ")} ${game.length === 1 ? "ist" : "sind"} finanziert, aber es gibt kein Scoreboard und keine Liste verlorener Kunden. Ohne sie liest der Ansatz nur ein System, nichts kann sagen, ob er wirkt, und er wählt Angebote für Kunden, die er nur zum Teil kennt. Unten stehen die Änderungen, die die Basis an die erste Stelle setzen.`);
  }
  if (cat === 2) {
    const open = brief.tests.filter((x) => x.applies && !x.holds).map((x) => x.name);
    return open.length
      ? tt(`The base is there, but ${open.length} of ${brief.applicable} tests are open with the brief's data: ${open.join("; ")}. Each is explained in the panel; below are the changes that make the plan hold.`, `Die Basis ist da, aber ${open.length} von ${brief.applicable} Tests sind bei den Daten des Auftrags offen: ${open.join("; ")}. Jeder ist im Panel erklärt; unten stehen die Änderungen, mit denen der Plan hält.`)
      : tt("There is no scoreboard and list of lost customers yet, so nothing can be joined or measured. Below are the changes that put the base first.", "Es gibt noch kein Scoreboard und keine Liste verlorener Kunden, also lässt sich nichts verbinden oder messen. Unten stehen die Änderungen, die die Basis an die erste Stelle setzen.");
  }
  const watch = weak.tests.filter((x) => x.applies && !x.holds).map((x) => x.name);
  return tt(
    `The base comes before the approaches and every test holds with the brief's data: the scoreboard and list of lost customers start no later than the first approach, every funded item has a purpose, the approaches start on complete data, and the plan fits the budget and the ${R2_MONTHS} months. Other plans can hold too.${watch.length ? ` With the data ${WEAK_POINTS} points weaker, ${watch.length === 1 ? "this test opens" : "these tests open"}: ${watch.join("; ")}. That is what the sentence “what you will watch” in Step B is for.` : ""}`,
    `Die Basis kommt vor den Ansätzen, und jeder Test stimmt bei den Daten des Auftrags: Scoreboard und Liste verlorener Kunden starten nicht später als der erste Ansatz, jeder finanzierte Punkt hat einen Zweck, die Ansätze starten auf vollständigen Daten, und der Plan passt ins Budget und in die ${R2_MONTHS} Monate. Auch andere Pläne können halten.${watch.length ? ` Bei um ${WEAK_POINTS} Punkte schwächeren Daten ${watch.length === 1 ? "öffnet sich dieser Test" : "öffnen sich diese Tests"}: ${watch.join("; ")}. Dafür ist der Satz „Was Sie beobachten“ in Schritt B da.` : ""}`,
  );
}

export type DecisionReading = { cat: Category; why: string; text: string; change: string };

/** How the system reads the Step B decision against the Step A plan; null until a decision is chosen. The category is for the mentor only. */
export function decisionReading(r2: HasTier & { decision: string | null }, scn: Scn): DecisionReading | null {
  if (!r2.decision) return null;
  const plan = categoryOf(r2, scn);
  const base = isFunded(r2, KPI_SYSTEM_ID);
  const firstMoves = euro(ARCH_BY_ID[KPI_SYSTEM_ID].cost + ARCH_BY_ID.chat.cost + ARCH_BY_ID.personal.cost);
  if (r2.decision === "stage") {
    const clause =
      plan.cat === 1
        ? tt(" Your Step A is that staged plan.", " Ihr Schritt A ist dieser gestufte Plan.")
        : plan.cat === 2
          ? tt(" Step A still has open tests, so the staging is not complete yet: see what to change under Step A.", " Schritt A hat noch offene Tests, die Stufung ist also noch nicht vollständig: Siehe, was Sie unter Schritt A ändern können.")
          : tt(" Step A funds approaches before the base exists, so the staging is not real yet: put the base first (see Step A).", " Schritt A finanziert Ansätze, bevor die Basis steht, die Stufung ist also noch nicht echt: Setzen Sie die Basis an die erste Stelle (siehe Schritt A).");
    return {
      cat: 1,
      why: "Staging is the decision the brief asks for: build now, start where the data is complete and a lost customer is worth most, measure before scaling.",
      text: tt("Building in stages is what the brief asks for: it starts within weeks where the data is already complete and a lost customer is worth most, and it measures before it scales.", "Stufenweise zu bauen ist, was der Auftrag verlangt: Es startet innerhalb von Wochen dort, wo die Daten schon vollständig sind und ein verlorener Kunde am meisten wert ist, und es misst, bevor es skaliert.") + clause,
      change: plan.cat === 1 ? tt("Nothing to change in the decision. What is left is the sentence on what you will watch.", "An der Entscheidung ist nichts zu ändern. Es bleibt der Satz dazu, was Sie beobachten.") : tt("Keep the decision and apply the changes from the reading under Step A.", "Behalten Sie die Entscheidung und setzen Sie die Änderungen aus dem Lesen unter Schritt A um."),
    };
  }
  if (r2.decision === "commit")
    return {
      cat: base ? 2 : 3,
      why: base ? "The vendor platform is bought although a base is funded." : "The vendor platform is bought with no base: offers without a system around them.",
      text: tt(`Buying the vendor platform now puts ${euro(ARCH_BY_ID.suite.cost)} into a platform nobody can see inside, in use only in month ${1 + monthsOf("suite")}, after the ${R2_MONTHS} months, and the money is spent before any KPI shows what works.`, `Die Anbieter-Plattform jetzt zu kaufen steckt ${euro(ARCH_BY_ID.suite.cost)} in eine Plattform, in die niemand hineinsehen kann, erst in Monat ${1 + monthsOf("suite")} im Einsatz, nach den ${R2_MONTHS} Monaten, und das Geld ist ausgegeben, bevor ein KPI zeigt, was wirkt.`),
      change: tt(`Choose “Build the win-back system in stages and watch one figure”: set the scoreboard and list of lost customers, the lost-customer data clean-up and the reason-based approach to Now (together ${firstMoves}), then add the value-based priority once the data is clean.`, `Wählen Sie „Das Rückgewinnungssystem in Stufen bauen und eine Zahl beobachten“: Setzen Sie Scoreboard und Liste verlorener Kunden, die Bereinigung der Daten verlorener Kunden und den grundbasierten Ansatz auf „Jetzt“ (zusammen ${firstMoves}), und fügen Sie dann die wertbasierte Priorität hinzu, sobald die Daten sauber sind.`),
    };
  return {
    cat: 2,
    why: "Waiting leaves lost customers unapproached and tests nothing; the brief asks for an investment decision despite an unclear success rate.",
    text: tt(`Waiting until the success rate is known leaves lost customers unapproached for the ${R2_MONTHS} months, while the exit notes and the cancellation forms, which are already complete, could start within weeks.`, `Zu warten, bis die Erfolgsquote bekannt ist, lässt verlorene Kunden für die ${R2_MONTHS} Monate unangesprochen, obwohl die Abschlussnotizen und die Kündigungsformulare, die schon vollständig sind, in Wochen starten könnten.`),
    change: tt(`Choose “Build the win-back system in stages and watch one figure”: the first moves are the scoreboard and list of lost customers, the lost-customer data clean-up and the reason-based approach in month 1 (together ${firstMoves}). They use the data that exists instead of waiting for the success rate to be known.`, `Wählen Sie „Das Rückgewinnungssystem in Stufen bauen und eine Zahl beobachten“: Die ersten Schritte sind Scoreboard und Liste verlorener Kunden, die Bereinigung der Daten verlorener Kunden und der grundbasierte Ansatz in Monat 1 (zusammen ${firstMoves}). Sie nutzen die Daten, die es gibt, statt zu warten, bis die Erfolgsquote bekannt ist.`),
  };
}
