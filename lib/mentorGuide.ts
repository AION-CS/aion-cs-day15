import { BUDGET, JOINS_LABEL, MEASURE_BY_ID, MODEL_COST, MODEL_MEASURES, PROBLEM_LABEL, explainBucket, modelScore } from "@/data/measures";
import type { MeasureId } from "@/data/measures";
import { KEY_L1, KEY_R2 } from "@/data/mentorKey";
import { ARCH_BY_ID, ARCH_IDS, COMP_BY_ID, KPI_BY_ID, MODEL_GREATEST, PRINCIPLES, R2_BUDGET, R2_MONTHS } from "@/data/route2";
import type { PrincipleId } from "@/data/route2";
import { KPI_AIM } from "@/data/route2Extra";
import { MODEL_TIER, PANEL, READY_BAR } from "@/data/route2Panel";
import type { Tier } from "@/data/route2Panel";
import { euro, tt } from "@/lib/lang";
import { inUseOf, monthsOf, planOf, rangeOf } from "@/lib/r2Panel";

/**
 * Mentor-only worked answers for every task question the answer keys (lib/answerKey.ts) do not already cover: the numeric fields,
 * with every step of the calculation written out with its numbers, and the free-text answers, with the model text and what a good
 * answer must contain. Shown only after the mentor bar is unlocked, never exported. Numbers are computed from the same constants as
 * the tables, the calculators and the answer checks, so they cannot drift from the model answers. Mentor tools stay English
 * (CLAUDE.md #32); the model answers quoted follow the site's language, because the fill enters them in that language.
 */
export type WorkedStep = { label: string; calc: string; result: string };
export type MentorGuide = { title: string; answer: string; example?: string; steps?: WorkedStep[]; why?: string; lookFor?: string[]; pitfalls?: string[] };

const n = (v: number) => (Math.round(v * 100) / 100).toLocaleString("en-US");
const L1 = () => KEY_L1();
const R2 = () => KEY_R2();

/* ------------------------------------------------------------------ Route 1 */

export function extraInsightGuide(): MentorGuide {
  return {
    title: "1.1 · One thing that could bring a customer back (Core)",
    answer: L1().extraInsight ?? "",
    example: tt(
      "Company A lost a customer after a failed migration. A reason of my own to return: “a call from the project lead, who admits the mistake and offers to redo the migration free of charge” (rebuild trust). The exit call said the customer felt ignored, so a personal call that says what changed answers the feeling before any offer is made. Write yours for RecoverIT: what it does, which reason it answers and why that could change the customer's mind.",
      "Unternehmen A verlor einen Kunden nach einer fehlgeschlagenen Migration. Ein eigener Grund zur Rückkehr: „ein Anruf des Projektleiters, der den Fehler einräumt und anbietet, die Migration kostenlos zu wiederholen“ (Vertrauen wiederaufbauen). Im Abschlussgespräch hieß es, der Kunde habe sich ignoriert gefühlt, also beantwortet ein persönlicher Anruf, der sagt, was sich geändert hat, das Gefühl, bevor ein Angebot gemacht wird. Schreiben Sie Ihren für RecoverIT: was es tut, welchen Grund es beantwortet und warum das die Meinung des Kunden ändern könnte.",
    ),
    why: "A return motive of your own names what RecoverIT does, which reason it answers (emotional, rational or outside our reach) and why it could change the customer's mind. Ask the plan's question: what could motivate this customer to come back?",
    lookFor: ["A concrete action RecoverIT could take (not “be better”).", "The reason it answers (trust, the effort of coming back, value).", "Why it could change the customer's mind (“so …”)."],
    pitfalls: ["“A discount”, with no reason: it buys a return without answering why the customer left.", "A reason outside RecoverIT's reach (a closure): nothing RecoverIT does can answer it."],
  };
}

export function meaningGuide(): MentorGuide {
  return {
    title: "1.2 · What the return figures mean (Optional)",
    answer: L1().meaning ?? "",
    lookFor: ["At least one printed figure (5%, 20%, four times as often, or the 10 and 12 returned customers).", "What to do first: call the customers whose reason can be fixed, then test it fairly.", "Said as an estimate: the account owners may have called the customers they knew best."],
    pitfalls: ["A sentence with no figure: the app asks for one.", "“The call quadruples our returns”: the two groups may differ in other ways, so it is a hint, not proof."],
  };
}

export function insightGuide(i: number): MentorGuide {
  const a = (L1().insights ?? [])[i];
  return {
    title: `1.3 · Win-back approach ${i + 1} (Optional)`,
    answer: a ? `${a.basis ?? ""} · ${a.text}` : "",
    why: "Three simple win-back approaches, each using a different motive to return (rebuild trust, lower the cost of coming back, add value or an incentive) and each saying why it gives the group a reason to return. The app checks only that each names a motive, is long enough and says what follows.",
    lookFor: ["A concrete group and a concrete step (a named reason, a number of weeks, a named offer).", "The motive it uses (trust, the cost of coming back, value).", "Why it gives a reason to return (“so …”)."],
    pitfalls: ["A goal instead of a step (“win them back”): ask what exactly someone would do.", "Two approaches with the same motive."],
  };
}

export function reflectGuide(k: "interpret" | "causation" | "decider"): MentorGuide {
  const r = L1().reflect;
  return {
    title: k === "interpret" ? "1.4 · When a win-back is worthwhile, and when not (Optional)" : k === "causation" ? "1.4 · Emotional versus financial incentives (Optional)" : "1.4 · The wrong customers and the unnecessary costs (Optional)",
    answer: r ? r[k] : "",
    lookFor:
      k === "interpret"
        ? ["Worthwhile: the reason is one RecoverIT can fix and a good share would consider returning.", "Not worthwhile: the reason is outside RecoverIT's reach (a closure, a group decision, a frozen budget)."]
        : k === "causation"
          ? ["An emotional incentive speaks to trust (a call, an admission, what changed); a financial one is a discount or a free service.", "A discount does not repair a broken promise and teaches customers to wait for the next one."]
          : ["The wrong customers: groups that cannot or will not return, or customers who would have returned anyway.", "Where unnecessary costs arise: mailing everyone, a discount that repeats every year.", "Starts with the groups where the reason is fixable and a quarter or more would return."],
  };
}

export function misreadGuide(): MentorGuide {
  return {
    title: "2.1 · Your three return signals (Optional)",
    answer: L1().misread ?? "",
    example: tt("Company A steers its win-back by three return signals. The share of its owner's check-in messages that a former customer's contact answers within a week, from the CRM contact log, aim: above 25%; it is contact with us, so someone must log it. Visits to its release-notes page twice or more in a month, from the website log, aim: the owner reviews the customer that week; it is counted by the system. Requests for a quote for a smaller scope, from the sales notes, aim: a tailored offer within a week; it shows the customer weighing a way back. Choose yours from RecoverIT's twelve signals.", "Unternehmen A steuert seine Rückgewinnung mit drei Rückkehr-Signalen. Der Anteil der Check-in-Nachrichten seines Owners, die ein Kontakt eines früheren Kunden innerhalb einer Woche beantwortet, aus dem CRM-Kontaktprotokoll, Ziel: über 25 %; es ist Kontakt mit uns, also muss jemand es festhalten. Besuche seiner Release-Notes-Seite, zweimal oder öfter in einem Monat, aus dem Website-Log, Ziel: Der Owner prüft den Kunden in dieser Woche; es wird vom System gezählt. Anfragen nach einem Angebot für einen kleineren Umfang, aus den Vertriebsnotizen, Ziel: ein maßgeschneidertes Angebot innerhalb einer Woche; es zeigt, dass der Kunde einen Weg zurück abwägt. Wählen Sie Ihre aus den zwölf Signalen von RecoverIT."),
    lookFor: ["At least one contact signal (it went with coming back most).", "At least one from price and offer questions or visits and logins.", "For each: where the number comes from and a target; saying why each is a signal and not noise is a strong answer."],
    pitfalls: ["The exit survey score as the only signal: it arrives last, only if the customer answers, and it did not go with coming back.", "A signal per team: the breaks between the data stay invisible."],
  };
}

export function abGuide(): MentorGuide {
  const k = L1().ab;
  return {
    title: "2.3 · Hypothesis and decision rule (Optional)",
    answer: k ? `${k.hyp} · ${k.rule}` : "",
    example: tt("Company A tests a call after a fix. Hypothesis: if the former account owner calls a lost customer after the reason is fixed, then the share who return within 90 days rises, because the customer hears from someone it knew that something has changed. Rule, written before the start: roll out if the return rate is at least 8 points above the control group with 80 customers per group and requests for discounts stay under 5%; keep testing between 3 and 8 points; stop below 3. Write yours for RecoverIT's test card.", "Unternehmen A testet einen Anruf nach einer Behebung. Hypothese: Wenn der frühere Account Owner einen verlorenen Kunden anruft, nachdem der Grund behoben wurde, dann steigt der Anteil, der innerhalb von 90 Tagen zurückkehrt, weil der Kunde von jemandem, den er kannte, hört, dass sich etwas geändert hat. Regel, vor dem Start geschrieben: ausrollen, wenn die Rückkehrquote bei 80 Kunden pro Gruppe mindestens 8 Punkte über der Kontrollgruppe liegt und die Rabattanfragen unter 5 % bleiben; weiter testen zwischen 3 und 8 Punkten; stoppen unter 3. Schreiben Sie Ihre für die Testkarte von RecoverIT."),
    lookFor: ["Hypothesis: one change, the KPI expected to move, and a reason (“because …”).", "Decision rule written before the test: a threshold to roll out, a band to keep testing, a point to stop.", "A guardrail in the rule (requests for discounts, customers who ask to be taken off the list)."],
    pitfalls: ["“The call will help”: no KPI, no reason.", "A rule without numbers, or one decided after looking at the result."],
  };
}

export function scoreGuide(id: MeasureId): MentorGuide {
  const m = MEASURE_BY_ID[id];
  const e = explainBucket(m.evidence);
  return {
    title: `2.4 · ${m.name}`,
    answer: `${e} × ${m.model.effect} × ${m.model.feasibility} = ${modelScore(id)}`,
    steps: [
      { label: "Price from its parts (printed on the card)", calc: m.costParts.map((c) => n(c.amount)).join(" + "), result: euro(m.cost) },
      { label: "Economic viability from who it aims at (A7)", calc: `aims at ${JOINS_LABEL[m.joins]} → only the groups where the reason is fixable and a quarter or more would consider coming back: 3 · those groups with others mixed in: 2 · every lost customer whatever the reason: 1`, result: String(e) },
      { label: "Score = Economic Viability × Effect × Sustainability", calc: `${e} × ${m.model.effect} × ${m.model.feasibility}`, result: String(modelScore(id)) },
    ],
    why: `${m.model.note} Answers: ${m.targets.length ? m.targets.map((t) => PROBLEM_LABEL[t]).join(", ") : "none of the three problems"}. A different, well-reasoned effect or sustainability score is acceptable: only the score that follows a printed rule is checked.`,
    pitfalls:
      id === "chatbot"
        ? ["Economic viability 3 “because it is cheap”: cost does not decide it, who the measure aims at does; it is printed to aim at every lost customer: 1.", "Effect 3 “because friendly mails build trust”: a message that fixes no reason does not answer the reason the customer gave: 1."]
        : id === "suite"
          ? [`Effect 3 or sustainability 3 “because it uses all our data”: it is in use only after ${m.weeks} weeks, beyond the four months (the picture shows no bar of working time), and an offer nobody can explain gives an account owner nothing to say.`, `Adding it to the return call and the tailored offer: ${euro(m.cost + MEASURE_BY_ID.unified.cost + MEASURE_BY_ID.predictive.cost)}, over the ${euro(BUDGET)} budget.`]
          : id === "app"
            ? ["Economic viability 2 “because it only costs when a customer returns”: it is offered to every lost customer, including those who would have returned anyway: 1.", "Effect 2 “because it brings customers back”: it buys the return without changing the reason, and the discount repeats every year: 1."]
            : undefined,
  };
}

/** The reason a learner gives for a measure's two judged scores (CLAUDE.md #45). The mentor's answer is the measure's own model note. */
export function reasonGuide(id: MeasureId): MentorGuide {
  const m = MEASURE_BY_ID[id];
  return {
    title: `2.4 · Why ${m.name} gets its effect and sustainability scores`,
    answer: `Effect ${m.model.effect}, sustainability ${m.model.feasibility}: ${m.model.note}`,
    example: tt("Company A's “25% discount for every lost customer”: effect 1, because it buys the return without changing why the customer left; sustainability 1, because it gives away margin every year and cannot be kept up. Give your own reason for each score, with a fact printed on the card.", "Der „Rabatt von 25 % für jeden verlorenen Kunden“ von Unternehmen A: Wirkung 1, weil er die Rückkehr erkauft, ohne zu ändern, warum der Kunde ging; Nachhaltigkeit 1, weil er jedes Jahr Marge verschenkt und sich nicht durchhalten lässt. Geben Sie für jeden Wert Ihren eigenen Grund an, mit einer auf der Karte gedruckten Tatsache."),
    why: "Effect and sustainability are judgements; a different score with a clear reason is as good as the model. The reason should say whether the measure deals with a reason the customer really gave (effect) and whether it can be kept up after the four months with people and tools RecoverIT already has (sustainability).",
    lookFor: ["Effect: which reason is addressed, and whether the customer notices it before deciding.", "Sustainability: what it takes (time, tools, people, a repeating discount) and whether it lasts after the four months.", "A fact from the card, not only “it is good”."],
  };
}

export function whyGuide(): MentorGuide {
  return {
    title: "2.4 · Why the first priority goes first (Core)",
    answer: L1().why ?? "",
    example: tt("Company A puts its win-back call first: it scores 18 and aims only at customers whose reason can be fixed. The tailored offer comes second and is tested on a random half. Together they cost €60,000 of €100,000. The discount for every lost customer stays out: it aims at everyone, so it scores 1. Make the same three statements about your own measures.", "Unternehmen A setzt seinen Rückgewinnungs-Anruf an die erste Stelle: Er erzielt 18 und zielt nur auf Kunden, deren Grund sich beheben lässt. Das maßgeschneiderte Angebot kommt als Zweites und wird an einer zufälligen Hälfte getestet. Zusammen kosten sie 60.000 € von 100.000 €. Der Rabatt für jeden verlorenen Kunden bleibt draußen: Er zielt auf alle, also erzielt er 1. Machen Sie dieselben drei Aussagen über Ihre eigenen Maßnahmen."),
    steps: [
      { label: "Model plan cost", calc: MODEL_MEASURES.map((id) => n(MEASURE_BY_ID[id].cost)).join(" + "), result: euro(MODEL_COST) },
      { label: "Left of the budget", calc: `${n(BUDGET)} − ${n(MODEL_COST)}`, result: euro(BUDGET - MODEL_COST) },
    ],
    lookFor: ["The order and what decides it (the score, or the problem of the brief it answers).", `The cost against ${euro(BUDGET)}.`, "What was left out, said as a decision (the same message to everyone, a discount that repeats, over budget or too slow, or no problem answered)."],
  };
}

/* ------------------------------------------------------------------ Route 2 */

export function principleTextGuide(c: PrincipleId): MentorGuide {
  return {
    title: `3.1 · ${PRINCIPLES[c].name} (Optional)`,
    answer: (R2().principleText ?? {})[c] ?? PRINCIPLES[c].means,
    lookFor: ["What changes for RecoverIT's teams or customers.", "Which problem of the brief it answers (high churn, inefficient win-back, measures not measurable) or which risk (a good approach that is never used)."],
    pitfalls: c === "hoard" || c === "blackbox" ? ["This principle is one the key rejects; if the learner kept it, ask which lost customers could return at all, or what an account owner would say to a customer who received an offer nobody can explain."] : undefined,
  };
}

export function greatestGuide(): MentorGuide {
  return {
    title: "3.3 · The KPI with the greatest leverage (Optional)",
    answer: `${COMP_BY_ID[MODEL_GREATEST].name} · ${R2().greatestWhy ?? ""}`,
    example: tt("Company A picks “the share of reactivated customers still active after 90 days” as its greatest-leverage KPI: it is linked to returns, counted every week for every customer by the systems, so every approach can be judged within weeks, and it answers the problem that nobody can say which measure brought a customer back. Name your own KPI, the tests it passes best and the problem of the brief it answers.", "Unternehmen A wählt „den Anteil der reaktivierten Kunden, die nach 90 Tagen noch aktiv sind“ als KPI mit der größten Hebelwirkung: Er ist mit der Rückkehr verbunden und wird jede Woche für jeden Kunden von den Systemen gezählt, sodass sich jeder Ansatz innerhalb von Wochen beurteilen lässt, und er beantwortet das Problem, dass niemand sagen kann, welche Maßnahme einen Kunden zurückbrachte. Nennen Sie Ihren eigenen KPI, die Tests, die er am besten besteht, und das Problem des Auftrags, das er beantwortet."),
    lookFor: ["One of the learner's three KPIs.", "The tests that decide it (early and linked to coming back together).", "The problem of the brief it answers (measures not measurable)."],
    pitfalls: ["E-mails sent as greatest “because it is counted weekly and complete”: it is not linked to coming back."],
  };
}

const ids = (m: Record<string, Tier>, f: (t: Tier) => boolean) => ARCH_IDS.filter((id) => f(m[id] ?? "not"));

export function architectureGuide(): MentorGuide {
  const model = MODEL_TIER;
  const funded = ids(model, (t) => t !== "not");
  const mr2 = { tier: model };
  const plan = planOf(mr2, 0);
  const weak = planOf(mr2, 1);
  const r = rangeOf(mr2);
  const cost = funded.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  const meas = (p: typeof plan) => funded.filter((id) => PANEL[id].measured && p.items[id].measOk && p.items[id].dataOk && !p.items[id].late && !PANEL[id].blackBox);
  const sum = (list: (keyof typeof ARCH_BY_ID)[]) => list.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  const measuredIds = meas(plan);
  const measuredWeakIds = meas(weak);
  const riskWeak = funded.filter((id) => PANEL[id].blackBox || !weak.items[id].dataOk || weak.items[id].late);
  const plus = (list: string[]) => list.join(" + ");
  const sp = planOf({ tier: { ...model, suite: "now" as const } }, 0);
  const rl = planOf({ tier: { ...model, relaunch: "now" as const } }, 0);
  const pn = planOf({ tier: { ...model, routing: "now" as const } }, 0);
  return {
    title: "Step A · The system and what the panel shows for it (Core)",
    answer: `Now: ${ids(model, (t) => t === "now").map((id) => PANEL[id].short).join(", ")}. After data is ready: ${ids(model, (t) => t === "later").map((id) => PANEL[id].short).join(", ")}. Not now: ${ids(model, (t) => t === "not").map((id) => PANEL[id].short).join(", ")}.`,
    steps: [
      { label: "Funded items (every Now and After data item)", calc: plus(funded.map((id) => n(ARCH_BY_ID[id].cost))), result: euro(cost) },
      { label: "Budget left", calc: `${n(R2_BUDGET)} − ${n(cost)}`, result: euro(R2_BUDGET - cost) },
      { label: `Month in use = start + weeks ÷ 4, rounded up (Now starts in month 1; After data starts when the lost-customer data clean-up is in use, month ${1 + monthsOf("chat")})`, calc: funded.map((id) => `${PANEL[id].short}: ${plan.items[id].start} + ${ARCH_BY_ID[id].weeks} ÷ 4 → ${inUseOf(mr2, id)}`).join(" · "), result: `all by month ${Math.max(...funded.map((id) => inUseOf(mr2, id)!))} of ${R2_MONTHS}` },
      { label: "Measurable, brief's data: money on measured items with data complete and in use in time ÷ funded money", calc: `(${plus(measuredIds.map((id) => n(ARCH_BY_ID[id].cost)))}) ÷ ${n(cost)} = ${n(sum(measuredIds))} ÷ ${n(cost)}`, result: `${r.meas[0]}%` },
      { label: `Measurable, data 15 points weaker (the reason-based approach drops to ${(PANEL.personal.data ?? 0) - 15}%)`, calc: `${n(sum(measuredWeakIds))} ÷ ${n(cost)}`, result: `${r.meas[1]}%` },
      { label: "Risk: money on a black box, on data below 80% complete or in use after the months ÷ funded money", calc: `0 ÷ ${n(cost)} (brief) · ${n(sum(riskWeak))} ÷ ${n(cost)} (weaker)`, result: `${r.risk[0]}% · ${r.risk[1]}%` },
    ],
    why: `The model set holds all four tests with the brief's data (${plan.holding} of ${plan.applicable}) and opens the data test when the data is 15 points weaker (${weak.holding} of ${weak.applicable}). That open test is the reason Step B asks what the learner watches. The numbers on screen are computed from one data file, so this table equals the panel.`,
    lookFor: ["At least one item Now (the task asks for a system).", "The scoreboard and list of lost customers are in place no later than any approach.", `Nothing the learner cannot explain or measure is funded without a reason, and nothing arrives after the ${R2_MONTHS} months without one.`],
    pitfalls: [
      `Adding the vendor platform: ${euro(sp.bars.spent)} funded, ${euro(sp.bars.over)} over the budget, Risk ${sp.bars.risk}% (a black box, in use only in month ${sp.items.suite.inUse}), and ${sp.holding} of ${sp.applicable} tests hold.`,
      `Adding the 25% discount for every lost customer: ${euro(rl.bars.spent)} funded, ${euro(rl.bars.over)} over the budget; it names no customer KPI and is not connected to the reason a customer left, so ${rl.holding} of ${rl.applicable} tests hold.`,
      `Setting the value-based priority to Now beside the model set: it starts in month 1 on data ${PANEL.routing.data}% complete, below ${READY_BAR}%, so the data test opens (${pn.holding} of ${pn.applicable} hold); After data with the lost-customer data clean-up Now starts it in month ${1 + monthsOf("chat")}.`,
      "Leaving the scoreboard and list of lost customers out: every approach loses its link to the shared list and the KPIs, so the Measurable bar falls to nothing.",
    ],
  };
}

export function visionGuide(): MentorGuide {
  return {
    title: "Step A · The target vision (Core)",
    answer: R2().vision ?? "",
    example: tt(
      "Company A will know why its customers leave and what each would be worth back: one list shows the reason and the value, and the account owner calls the customers whose reason is fixed within a week. It steers by two KPIs, and every new offer has to move one of them before it grows. Write your own target vision for RecoverIT.",
      "Unternehmen A wird wissen, warum seine Kunden gehen und was jeder zurück wert wäre: Eine Liste zeigt den Grund und den Wert, und der Account Owner ruft die Kunden, deren Grund behoben ist, innerhalb einer Woche an. Es steuert über zwei KPIs, und jedes neue Angebot muss einen davon bewegen, bevor es wächst. Schreiben Sie Ihr eigenes Zielbild für RecoverIT.",
    ),
    why: "The plan asks for a target vision of a retention system. It is the one place the learner says, in two sentences, what the whole system is for, before the items.",
    lookFor: ["What the system does for the company and its customers (customers won back whose reason is fixed).", "Steering by a few KPIs, not by single offers.", "Two sentences, in the learner's own words."],
  };
}

export function giveUpGuide(): MentorGuide {
  return {
    title: "Step A · What the plan gives, and what the learner gives up (Core)",
    answer: R2().giveUp ?? "",
    example: tt(
      "Company A's plan gives it one shared list of lost customers, a test-and-learn routine and approaches that run on data that is complete enough. It gives up an AI platform, which names no KPI, and €25,000 stay unspent. If the data is weaker, the approaches rest on data below 80%, so they are watched first. Write yours about your own plan: what it gives, what it costs or leaves open.",
      "Der Plan von Unternehmen A gibt ihm eine gemeinsame Liste verlorener Kunden, eine Test-and-learn-Routine und Ansätze, die auf ausreichend vollständigen Daten laufen. Es verzichtet auf eine KI-Plattform, die keinen KPI nennt, und 25.000 € bleiben ungenutzt. Sind die Daten schwächer, beruhen die Ansätze auf Daten unter 80 %, also werden sie zuerst beobachtet. Schreiben Sie Ihre über Ihren eigenen Plan: was er gibt, was er kostet oder offen lässt.",
    ),
    why: "Every plan gives something and costs something. Writing it first, before the system's reading is opened, is what makes the learner think about the trade-off instead of reading it off.",
    lookFor: ["One thing the plan gives (measured, complete data, in budget, in time).", `One thing it costs or leaves open (an item not now, data below 80%, an item after the ${R2_MONTHS} months, budget unspent).`, "A link to the two data scenarios if the learner saw them."],
  };
}

export function decisionWhyGuide(): MentorGuide {
  return {
    title: "Step B · Why this decision (Core)",
    answer: R2().decisionWhy ?? "",
    example: tt(
      "Company A builds in stages: the shared list and the test routine start first, so every approach reads one customer and is tested on a random half from its first week, and the big platform waits because nobody could say what to tell a customer who got an offer it cannot explain. Write your reason for your own decision.",
      "Unternehmen A baut in Stufen: Die gemeinsame Liste und die Testroutine starten zuerst, damit jeder Ansatz einen Kunden liest und ab seiner ersten Woche an einer zufälligen Hälfte getestet wird, und die große Plattform wartet, weil niemand sagen könnte, was man einem Kunden sagt, der ein Angebot bekam, das sie nicht erklären kann. Schreiben Sie Ihre Begründung für Ihre eigene Entscheidung.",
    ),
    why: "A decision part has no single right answer (CLAUDE.md #38): what counts is a clear reason, and that it fits the learner's own Step A. If the decision and Step A disagree, the panel hints and the reason should explain it.",
    lookFor: ["Names the decision and one rule from Materi B5 it rests on.", "Fits the learner's own Step A, or says why it does not.", "Says how the unclear success rate is handled (start with the data that is complete, test on a small group, measure from week one)."],
  };
}

export function watchGuide(): MentorGuide {
  const cleanMonth = inUseOf({ tier: MODEL_TIER }, "personal") ?? 0;
  const conv = KPI_BY_ID.conv;
  const eng = KPI_BY_ID.engage;
  return {
    title: "Step B · What the learner watches, and when they would stop (Core)",
    answer: R2().watch ?? "",
    example: tt(
      "Company A watches the share of approached customers who answer within two weeks: today it is 25%, and if it has not clearly risen by month 3 on enough approached customers, it stops adding approaches and rewrites its call guide. It also watches the discount requests after calls: if they rise above 5%, it pauses the call that triggers them. Write yours with the figure from your own plan.",
      "Unternehmen A beobachtet den Anteil der angesprochenen Kunden, die innerhalb von zwei Wochen antworten: Heute liegt er bei 25 %, und ist er bis Monat 3 bei genug angesprochenen Kunden nicht deutlich gestiegen, hört es auf, Ansätze hinzuzufügen, und schreibt seinen Gesprächsleitfaden neu. Es beobachtet auch die Rabattanfragen nach Anrufen: Steigen sie über 5 %, pausiert es den Anruf, der sie auslöst. Schreiben Sie Ihre mit der Zahl aus Ihrem eigenen Plan.",
    ),
    why: `A figure about customers (the win-back rate, or the share of approached customers who have not answered after 30 days), not the company's own output (e-mails sent, reports opened, calls made), a month in which it can first be read (the reason-based approach is in use from month ${cleanMonth} in the model, so a figure can first be read from month ${cleanMonth}), and an action. The numbers are the ones printed in “the numbers today”: ${conv.baseline}% of approached lost customers return within 90 days today with an aim of ${KPI_AIM.conv}%; ${eng.baseline}% have not answered after 30 days today with an aim of ${KPI_AIM.engage}%; the data bar is ${READY_BAR}%.`,
    lookFor: ["A customer figure, with today's value.", "A month by which it can be read.", "What the learner does if it falls short (stop, pause, change one thing)."],
    pitfalls: ["E-mails sent, reports opened or calls made as the figure: that counts what RecoverIT did.", "No month: a sign nobody can act on."],
  };
}
