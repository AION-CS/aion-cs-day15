import { LEVEL_LABEL, LINES } from "@/data/ladder";
import { CHURN_TRUTH, CUSTOMERS, CUST_BY_ID, KNOWN_LABEL, PICK_WHY, VALUABLE_TRUTH } from "@/data/forecast";
import { AB, AB_PARTS, MEANINGS, MEANING_TRUTH, MEASURE_TRUTH, PATTERNS, PATTERN_IDS, PMEASURES, RECORDS, RISK_LABEL, TRUTH_COUNTS, TRUTH_LEFT, UNCERTAINTIES, riskOf } from "@/data/patterns";
import { BUDGET, JOINS_LABEL, MEASURES, MEASURE_BY_ID, MODEL_COST, MODEL_MEASURES, PROBLEM_LABEL, explainBucket, modelScore } from "@/data/measures";
import {
  ACTION_LABEL,
  ARCH_BY_ID,
  ARCH_IDS,
  COMPS,
  COMP_BY_ID,
  CRIT_IDS,
  DECISIONS,
  LOGIC_OWNER_LABEL,
  MODEL_COMPS,
  MODEL_DECISION,
  MODEL_GREATEST,
  OWNER_ACCEPT_LOGIC,
  PRINCIPLES,
  PRINCIPLE_IDS,
  PRINCIPLE_MUST,
  R2_BUDGET,
  R2_MONTHS,
  SITUATIONS,
  SOURCES,
  USE_LABEL,
  actionOf,
  maxRating,
  useOf,
} from "@/data/route2";
import type { ArchId } from "@/data/route2";
import { MODEL_ARCH, MODEL_TIER, PANEL, TIER_LABEL } from "@/data/route2Panel";
import { monthsOf, planOf, rangeOf } from "@/lib/r2Panel";
import { MODEL_ORDER } from "@/data/mentorKey";
import { euro } from "@/lib/lang";

/**
 * Mentor-only answer keys for the exercises where the learner picks from fixed options. Each key gives the expected answer and a
 * reason per option, including why each rejected option is rejected, plus a teaching note wherever more than one answer defends.
 * Never exported and never shown to a learner. Mentor tools stay in English (CLAUDE.md #32); the option labels they quote follow the
 * site's language.
 */
export type AnswerKeyOption = { label: string; expected: boolean; why: string };
export type AnswerKeyBlock = { title: string; expected: string; options: AnswerKeyOption[]; teachingNote?: string };

const B = ["—", "Low", "Mid", "High"];

/* ------------------------------------------------------------------ Route 1 */

export function sortKey(): AnswerKeyBlock {
  return {
    title: "Block 1.1 · Emotional, rational or outside our reach (Core, Level 1)",
    expected: LINES.map((r, i) => `${i + 1} → ${LEVEL_LABEL[r.truth]}`).join(" · "),
    options: LINES.flatMap((r, i) => [
      { label: `Statement ${i + 1} → ${LEVEL_LABEL[r.truth]}`, expected: true, why: r.why },
      ...(Object.entries(r.rejected) as [keyof typeof LEVEL_LABEL, string][]).map(([tag, why]) => ({ label: `Statement ${i + 1} → ${LEVEL_LABEL[tag]}`, expected: false, why })),
    ]),
    teachingNote:
      "Three of each. The traps are statement 3 (a change of staff looks like bad luck outside our reach, but RecoverIT could have introduced itself to the new IT lead: emotional), statement 5 (a new policy on the customer's side looks outside our reach, but it asks for a function RecoverIT can build: rational) and statement 9 (a frozen budget looks like a cost reason, but no offer changes it: outside our reach, so stay in touch and wait). Ask every statement the one question of Materi A1: would the same price and the same functions have kept the customer? If yes it would have gone anyway, the reason is emotional; if a better offer would have kept it, rational; and if nothing RecoverIT could do would have changed it, outside our reach. Many customers name both reasons: sort by the one named first. The cost of reading a statement wrong is on both sides: a discount offered to a customer who left over trust, or a call to a customer whose company has closed.",
  };
}

export function pickKey(): AnswerKeyBlock {
  return {
    title: "Block 1.3a/b · Where a win-back pays most, where it can run on data we have (Optional)",
    expected: `Pays most: ${VALUABLE_TRUTH.map((c) => CUST_BY_ID[c].name).join(", ")} · Can run on data we have: ${CHURN_TRUTH.map((c) => CUST_BY_ID[c].name).join(", ")}`,
    options: CUSTOMERS.map((c) => ({
      label: `${c.name} · ${c.volume}/year · ${c.leave}% open to returning · reason RecoverIT can fix: ${c.decision ? "yes" : "no"} · recorded: ${KNOWN_LABEL[c.known]}`,
      expected: VALUABLE_TRUTH.includes(c.id) || CHURN_TRUTH.includes(c.id),
      why: `${VALUABLE_TRUTH.includes(c.id) ? "Pays most. " : CHURN_TRUTH.includes(c.id) ? "Can run on data we have. " : "Neither list. "}${PICK_WHY[c.id]}`,
    })),
    teachingNote: "The traps are the frozen budget (60% would return, but RecoverIT cannot change the reason: stay in touch and wait) and the group tender (40% would rejoin, but only if RecoverIT wins a bid: that is a sales proposal, not a win-back approach). The competitor fee tempts on the data side: the record is complete, but only 8% would return and they are tied to a three-year contract. The group that lost its contact is the near miss: fixable, but 22% is below the 25% line, so a second wave. The check reports only how many of the four picks hold.",
  };
}

export function tagKey(): AnswerKeyBlock {
  return {
    title: "Block 2.1 · Family of return signal (Optional)",
    expected: RECORDS.map((o) => `${o.code} → ${PATTERNS[o.truth].label}`).join(" · "),
    options: RECORDS.flatMap((o) => [
      { label: `${o.code} → ${PATTERNS[o.truth].label}`, expected: true, why: o.why },
      ...(Object.entries(o.rejected) as [keyof typeof PATTERNS, string][]).map(([s, why]) => ({ label: `${o.code} → ${PATTERNS[s].label}`, expected: false, why })),
    ]),
    teachingNote: `${PATTERN_IDS.map((p) => `${TRUTH_COUNTS[p]} ${PATTERNS[p].label} (${TRUTH_LEFT[p]} went with coming back)`).join(", ")}. R-06 (logins to export its own reports) is the trap: it is a login counted by the portal, so visits and logins, even though it did not go with coming back; tag what a signal measures, not how it behaved. R-09 (finance asks for the closing invoice) is price and offer questions although it did not go with coming back: the family says where it comes from, not whether it predicts. R-03 (agreeing to a 15-minute call) is contact with us, not what they say: the customer has not said anything about the reasons yet.`,
  };
}

export function rowKey(): AnswerKeyBlock {
  return {
    title: "Block 2.2 · Link, when it shows and what to do, per family (Optional)",
    expected: PATTERN_IDS.map((p) => `${PATTERNS[p].label}: ${RISK_LABEL[riskOf(TRUTH_LEFT[p], TRUTH_COUNTS[p])!]} · ${MEANINGS.find((m) => m.id === MEANING_TRUTH[p])!.label} · ${PMEASURES.find((m) => m.id === MEASURE_TRUTH[p])!.label}`).join(" | "),
    options: PATTERN_IDS.flatMap((p) =>
      PMEASURES.map((m) => ({
        label: `${PATTERNS[p].label} → ${m.label}`,
        expected: m.id === MEASURE_TRUTH[p],
        why:
          m.id === MEASURE_TRUTH[p]
            ? `${PATTERNS[p].means} This use fits exactly that.`
            : m.id === "bonus"
              ? "A bonus on a number rewards reporting it, not moving it, and invites gaming; it fits no family."
              : "This use fits a different family; read when this family shows and who sees it.",
      })),
    ),
    teachingNote: "The link is checked against the learner's own tally from 2.1, not against the reference, so a learner who mis-tagged one signal is not punished twice. With the reference tags, contact with us is Strong (3 of 3 went with coming back), price and offer questions Strong (2 of 3), visits and logins Partial (1 of 3), what they say None (0 of 3: only 20% answer the exit survey, mostly politely).",
  };
}

export function uncKey(): AnswerKeyBlock {
  return {
    title: "Block 2.2 · Uncertainties in the return figures (Optional)",
    expected: UNCERTAINTIES.filter((w) => w.real).map((w) => w.label).join(" · "),
    options: UNCERTAINTIES.map((w) => ({ label: w.label, expected: w.real, why: w.why })),
    teachingNote: "Any two of the four real uncertainties complete the block. The most important is “the customers who were called may be the ones the account owners knew best”: the return figures are not a fair test, which is why Block 2.3 asks for one. The three false ones are common beliefs about win-back; each is contradicted in the material.",
  };
}

export function abKey(): AnswerKeyBlock {
  return {
    title: "Block 2.3 · A fair A/B test (Optional)",
    expected: AB_PARTS.map((k) => `${AB[k].label}: ${AB[k].options.find((o) => o.right)!.label}`).join(" | "),
    options: AB_PARTS.flatMap((k) =>
      AB[k].options.map((o) => ({
        label: `${AB[k].label} → ${o.label}`,
        expected: o.right,
        why: o.right
          ? k === "change"
            ? "One change only, so a difference can be put down to it."
            : k === "control"
              ? "Chance decides who is in which group, and both groups live through the same weeks."
              : k === "kpi"
                ? "The goal is customers who come back and stay; the test is judged by the share of approached lost customers who sign again and are still customers after 90 days, not by e-mails opened or calls made."
                : "The size is fixed before the start, so nobody stops at a lucky moment; waiting 90 days includes the customers who decide late."
          : o.clue,
      })),
    ),
    teachingNote: "The check flags a wrong option per part (three options each, so naming the part does not hand over the answer), a hypothesis without “if … because …” and a rule without a number. The hypothesis and the rule are judged: look for one change, one KPI, a reason, and a rule written before the test that includes a guardrail.",
  };
}

export function measureKey(): AnswerKeyBlock {
  const rows = [...MEASURES].sort((a, b) => modelScore(b.id) - modelScore(a.id));
  const m = MEASURE_BY_ID;
  return {
    title: "Block 2.4 · The three measures (Core, Level 2)",
    expected: `${MODEL_MEASURES.map((id) => MEASURES.find((x) => x.id === id)!.name).join(", ")} · ${euro(MODEL_COST)} of ${euro(BUDGET)}`,
    options: rows.map((x) => ({
      label: `${x.name} · ${explainBucket(x.evidence)} × ${x.model.effect} × ${x.model.feasibility} = ${modelScore(x.id)} · ${euro(x.cost)} · ${x.weeks} weeks · aims at ${JOINS_LABEL[x.joins]} · answers ${x.targets.length ? x.targets.map((t) => PROBLEM_LABEL[t]).join(", ") : "none"}`,
      expected: MODEL_MEASURES.includes(x.id),
      why: `${x.verdict} ${x.model.note}`,
    })),
    teachingNote: `Score = Economic Viability × Effect × Sustainability (the plan's evaluation). The check looks only at economic viability, which follows from who the measure is printed to aim at. Which problems a choice answers, and when it starts working, is shown by the picture under the cards, not by a verdict. Effect and sustainability are judged; the model values are here. The model three cost ${euro(MODEL_COST)} (${euro(BUDGET - MODEL_COST)} left). The “we miss you” series scores 3: ${euro(m.chatbot.cost)} for the same friendly message to everyone, with no reason fixed (cheap and easy to keep up, but it aims at every lost customer). The 25% discount for every lost customer scores 1: ${euro(m.app.cost)} for the first year of about 40 returns buys the return without changing the reason, and the discount repeats every year. The vendor platform scores 6: on paper it aims at the likeliest returners, but at ${euro(m.suite.cost)} it costs more than the whole budget, and at ${m.suite.weeks} weeks it is in use only after the four months (the picture shows no bar of working time); with the return call and the tailored offer it would be ${euro(m.suite.cost + m.unified.cost + m.predictive.cost - BUDGET)} over the budget. A different, well-reasoned choice is acceptable (CLAUDE.md #38).`,
  };
}

export function orderKey(): AnswerKeyBlock {
  return {
    title: "Block 2.4 · The order (Core, Level 2)",
    expected: MODEL_ORDER.map((id) => MEASURES.find((x) => x.id === id)!.name).join(" → "),
    options: MODEL_ORDER.map((id, i) => ({
      label: `${i + 1}. ${MEASURES.find((x) => x.id === id)!.name} (${modelScore(id)})`,
      expected: true,
      why: i === 0 ? "Score 18 (tied with the tailored offer): it goes only to customers whose reason can be fixed, answers the trust reason itself and starts within six weeks." : i === 1 ? "Score 18: it adds what the customer named, runs on a review page and a CRM RecoverIT already has, and is measured on a random half, so it keeps working without new budget." : "Score 12: it removes the work of coming back, but it aims at everyone who left for a competitor and needs engineer days for every customer who says yes.",
    })),
    teachingNote: "The first two tie at 18, so a learner who puts the tailored offer first defends it too: it can be tested on a random half and needs no new budget. A learner who puts the free move back first defends it as well: it removes the work customers who left for practical reasons complain about, and it is the only one that makes the return itself easier. The model orders by score because the return call also answers the reason before it offers anything. Ask any learner who ranks the discount or the “we miss you” series: does it deal with the reason the customer gave?",
  };
}

/* ------------------------------------------------------------------ Route 2 */

export function principleKey(): AnswerKeyBlock {
  return {
    title: "Block 3.1 · Principles of the retention and win-back system (Optional)",
    expected: `${PRINCIPLES[PRINCIPLE_MUST[0]].name} and ${PRINCIPLES[PRINCIPLE_MUST[1]].name}, plus a third that is not “approach every lost customer you can find” or “buy one prediction model first”`,
    options: PRINCIPLE_IDS.map((c) => ({
      label: PRINCIPLES[c].name,
      expected: PRINCIPLE_MUST.includes(c) || c === "owners" || c === "review",
      why:
        c === "defs"
          ? "Required: without one shared list of lost customers, every approach meets the customer as a stranger; this is “measures not measurable”."
          : c === "rules"
            ? "Required: a written rule with an owner for every approach is the answer to the risk that a good approach is never used."
            : c === "owners"
              ? "A good third: a KPI without someone who can move it stays a number on a screen."
              : c === "review"
                ? "A good third: a monthly review of the approaches against who really returned is how RecoverIT improves step by step."
                : c === "hoard"
                  ? "Rejected: approaching every lost customer spends on groups that cannot or will not return and adds cost, not returns (Materi A3)."
                  : "Rejected: nothing changes for customers until the platform runs, which takes longer than the four months, and nobody can explain its offers to a customer.",
    })),
    teachingNote: "The check only asks for the shared list and the written rule with an owner. The third is judged; KPI owners and the monthly review both defend.",
  };
}

export function sourceKey(): AnswerKeyBlock {
  return {
    title: "Block 3.2 · Central sources of evidence about lost customers (Optional)",
    expected: SOURCES.map((s) => `${s.name}: ${USE_LABEL[useOf(s)]}`).join(" · "),
    options: SOURCES.map((s) => ({
      label: `${s.name} → ${USE_LABEL[useOf(s)]}`,
      expected: true,
      why: !s.decision ? `The customer decides nothing through it, so a win-back built on it would aim at many who never meant to return: not central, however complete (${s.complete}%).` : s.complete >= 80 ? `The customer decides something through it (“${s.decision}”) and ${s.complete}% of its data reaches the shared list: use now.` : `The customer decides something through it (“${s.decision}”), but only ${s.complete}% of its data reaches the shared list: improve the data first.`,
    })),
    teachingNote: "The newsletter is the trap: 95% complete, but nobody decides to return by opening it. The replies to the former account owner are the other: keep talking or go quiet is central, but only 55% of the replies are logged, so the logging comes first.",
  };
}

export function compKey(): AnswerKeyBlock {
  return {
    title: "Block 3.3 · KPIs and ratings (Optional)",
    expected: `${MODEL_COMPS.map((id) => COMP_BY_ID[id].name).join(", ")}; greatest leverage: ${COMP_BY_ID[MODEL_GREATEST].name}`,
    options: COMPS.map((l) => ({
      label: `${l.name}: ${CRIT_IDS.map((c) => `${c} ${B[l.model[c]]} (max ${B[maxRating(l.id, c)]})`).join(", ")}`,
      expected: MODEL_COMPS.includes(l.id),
      why: l.note,
    })),
    teachingNote: "The check flags only a rating above what the printed facts allow and counts how many chosen KPIs show a change early. The win-back rate is the model's greatest lever: High on all four and the result the whole system exists for. A learner who picks the reactivation rate defends it as the number that shows a return is real, and one who picks the answer rate defends it as the first sign an approach lands; ask which number shows whether the money is worth what it costs. The churn rate per quarter is linked to leaving but counted only after the customers are gone: a quarter-end check, not a steering KPI.",
  };
}

export function logicKey(): AnswerKeyBlock {
  return {
    title: "Block 3.4 · Win-back approaches tested: roll out, keep testing or stop (Optional)",
    expected: SITUATIONS.map((s) => `${s.signal}: ${ACTION_LABEL[actionOf(s)]} · ${OWNER_ACCEPT_LOGIC[s.id].map((o) => LOGIC_OWNER_LABEL[o]).join(" or ")}`).join(" | "),
    options: SITUATIONS.map((s) => ({
      label: `${s.signal} (lift ${s.lift}%, ${s.cases} approached customers)`,
      expected: true,
      why:
        actionOf(s) === "intervene"
          ? `Lift ${s.lift}% on ${s.cases} approached customers: clear and proven, guardrail intact. Customer success makes the calls, so customer success rolls it out.`
          : actionOf(s) === "watch"
            ? s.lift >= 10
              ? `Lift ${s.lift}% looks strong, but ${s.cases} approached customers are too few: keep testing; ${s.id === "renewal" ? "sales and account management run it on" : "the data team runs it on"}.`
              : `Lift ${s.lift}%: a small difference, and some customers asked to be taken off the list. Keep testing a stronger variant; the data team runs it.`
            : `Lift ${s.lift}%: no real gain${s.lift < 0 ? ", and margin lost" : ""}. Stop, so no owner.`,
    })),
    teachingNote: "The director's call to the former sponsor is the trap: +25% tempts learners to roll out, but forty approached customers can be chance. The “we miss you” banner is the second: six hundred customers prove there is almost no difference, so a large sample does not rescue a tiny lift. The 25% discount for every lost customer is stopped: worse, and it trains customers to ask again.",
  };
}

export function architectureKey(): AnswerKeyBlock {
  const spent = MODEL_ARCH.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0);
  const alt = { ...MODEL_TIER, routing: "now" as const };
  const inUse = (id: ArchId) => 1 + monthsOf(id);
  const why: Record<ArchId, string> = {
    foundation: `Now. Every approach reads it and is measured by it; it starts in month 1, no later than the first approach (the test “the base comes first”). At ${ARCH_BY_ID.foundation.weeks} weeks it is in use in month ${inUse("foundation")}.`,
    chat: `Now. ${euro(ARCH_BY_ID.chat.cost)} for ${ARCH_BY_ID.chat.weeks} weeks: one customer ID and one set of reason codes across the CRM, the contract system and the exit survey. It names no KPI by itself, but it puts the reason and the contract value of every lost customer onto the shared list the value-based priority reads, so it is the item “After data is ready” waits for.`,
    personal: "Now. The reason-based approach reads exit notes and cancellation forms that are 82% complete (67% if the data is weaker: it then rests on data below 80%, which is why Step B asks what the learner watches). Not now is defensible too, if the learner prefers to wait for the weaker-data case.",
    routing: `After data is ready. Its data (contract values and how open a customer said it was) is only 60% complete; with the lost-customer data clean-up Now it starts in month 2 and is in use in month ${1 + monthsOf("chat") + monthsOf("routing")}, inside the ${R2_MONTHS} months. Now is possible too, but it starts in month 1 on data below 80% and the data test opens.`,
    training: `Now. ${euro(ARCH_BY_ID.training.cost)} for ${ARCH_BY_ID.training.weeks} weeks so that account owners and sales open return calls with the fixed reason and log what the customer said. A defensible cut if the learner needs the room, and then the reading says so.`,
    tracking: `Now. ${euro(ARCH_BY_ID.tracking.cost)} for ${ARCH_BY_ID.tracking.weeks} weeks: every new offer goes to a random half first and a monthly review keeps, changes or stops each approach. A defensible cut, and then the reading names the cost: nobody tests an offer before it grows.`,
    suite: `Not now. A black box: no KPI it moves, its reasons and results are not shown, ${euro(ARCH_BY_ID.suite.cost)} takes the plan ${euro(ARCH_BY_ID.suite.cost + spent - R2_BUDGET)} over the budget, and at ${ARCH_BY_ID.suite.weeks} weeks it is in use only in month ${inUse("suite")}, after the ${R2_MONTHS} months. Two tests open (purpose, budget and months).`,
    relaunch: `Not now. A 25% discount for every lost customer names no customer KPI (it counts discounts accepted) and is not connected to the reason a customer left; it would push the plan ${euro(ARCH_BY_ID.relaunch.cost + spent - R2_BUDGET)} over the budget. It is the discount trap of Route 1.`,
  };
  return {
    title: "Step A · The system: when does each item happen? (Core, Level 3)",
    expected: `Model: Now ${MODEL_ARCH.filter((id) => MODEL_TIER[id] === "now").map((id) => PANEL[id].short).join(", ")} · After data ${MODEL_ARCH.filter((id) => MODEL_TIER[id] === "later").map((id) => PANEL[id].short).join(", ")} (${euro(spent)} of ${euro(R2_BUDGET)}) · Not now ${ARCH_IDS.filter((id) => MODEL_TIER[id] === "not").map((id) => PANEL[id].short).join(", ")}`,
    options: ARCH_IDS.map((id) => ({ label: `${PANEL[id].short} → ${TIER_LABEL[MODEL_TIER[id]]}`, expected: MODEL_TIER[id] !== "not", why: why[id] })),
    teachingNote: `The panel shows four tests as facts, none a verdict, and the learner decides. A different, well-reasoned set is acceptable (CLAUDE.md #38): for example the value-based priority Now (the data test opens, ${planOf({ tier: alt }, 0).holding} of ${planOf({ tier: alt }, 0).applicable} tests hold), the training or the test-and-learn routine cut to make room, or going over the budget with a reason. Doing nothing (no item Now) is incomplete, not wrong: the missing list asks for at least one. The model set holds all four tests in the brief's data and opens the data test when the data is 15 points weaker (the reason-based approach, ${rangeOf({ tier: MODEL_TIER }).risk[1]}% of the money at risk).`,
  };
}

export function decisionKey(): AnswerKeyBlock {
  return {
    title: "Step B · The investment decision (Core, Level 3)",
    expected: DECISIONS.find((d) => d.id === MODEL_DECISION)!.label,
    options: DECISIONS.map((d) => ({ label: d.label, expected: d.id !== "wait", why: d.id === MODEL_DECISION ? d.why : d.id === "commit" ? `${d.why} ${d.rejected}` : d.rejected })),
    teachingNote: `“Buy the platform” and “Build in stages” are both decisions, with different reasoning; the plan rejects only “Wait”, because the brief asks for an investment decision despite an unclear success rate: the exit notes and the cancellation forms are already 88% and 92% complete and can start within weeks, and lost customers stay unapproached meanwhile. All three stay selectable. The panel shows one plain hint when the decision and Step A disagree (wait while Step A builds; buy the platform while Step A leaves it out) and the learner explains the contradiction in their reason. Push a learner who buys the platform on how a ${ARCH_BY_ID.suite.weeks}-week project fits into ${R2_MONTHS} months, and on what an account owner would say to a customer who received an offer nobody can explain.`,
  };
}
