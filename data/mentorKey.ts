import { LINES } from "@/data/ladder";
import type { LevelTag, LineId } from "@/data/ladder";
import { CHURN_TRUTH, FORECAST, VALUABLE_TRUTH } from "@/data/forecast";
import type { Basis } from "@/data/forecast";
import { AB_MODEL, MEANING_TRUTH, MEASURE_TRUTH, PATTERN_IDS, RECORDS, TRUTH_COUNTS, TRUTH_LEFT, riskOf } from "@/data/patterns";
import type { PatternId, PatternRow, RecId, UncId } from "@/data/patterns";
import { MEASURE_BY_ID, MODEL_MEASURES, explainBucket } from "@/data/measures";
import type { MeasureId } from "@/data/measures";
import { ARCH_BY_ID, COMP_BY_ID, MODEL_COMPS, MODEL_GREATEST, OWNER_ACCEPT_LOGIC, R2_BUDGET, SITUATIONS, SOURCES, actionOf, useOf } from "@/data/route2";
import { MODEL_ARCH, MODEL_TIER } from "@/data/route2Panel";
import type { Criterion, LogicRow, Use } from "@/data/route2";
import { euro, num, tt } from "@/lib/lang";
import type { L1State, R2State, Score } from "@/store/useStore";

/**
 * Every model answer of the day, in one file. "Fill all model answers" in the mentor bar enters these, so that after one fill every
 * route's missing list is empty and every export downloads at once. Free text follows the site's language. A convenience for
 * facilitators, not security.
 */
export const MENTOR_PASSCODE = "muchson123";
/** The model order: by score, highest first (18, 18, 12). */
export const MODEL_ORDER: MeasureId[] = ["unified", "predictive", "handover"];

/** The model reason for the two judged scores of each model measure (CLAUDE.md #45): effect, sustainability, and a printed fact. */
const MEASURE_REASON: Record<string, () => string> = {
  unified: () =>
    tt(
      "Effect 3: it deals with the reason the customer gave (nobody called after the outage) and the customer hears it from someone it knew, before deciding anything. Sustainability 2: it needs account-owner time, 350 hours are planned, and that time grows with the number of customers called; the card says 6 weeks.",
      "Wirkung 3: Es geht auf den Grund ein, den der Kunde nannte (nach dem Ausfall rief niemand an), und der Kunde hört es von jemandem, den er kannte, bevor er etwas entscheidet. Nachhaltigkeit 2: Es braucht Zeit der Account Owner, 350 Stunden sind eingeplant, und diese Zeit wächst mit der Zahl der angerufenen Kunden; die Karte nennt 6 Wochen.",
    ),
  handover: () =>
    tt(
      "Effect 3: moving everything back for the customer removes the work that keeps it away, which is exactly what customers who left for practical reasons say. Sustainability 2: engineers spend two days per customer, so it needs more days as more customers say yes; the card says 8 weeks.",
      "Wirkung 3: Alles für den Kunden zurückzubringen nimmt die Arbeit ab, die ihn fernhält, und genau das sagen Kunden, die aus praktischen Gründen gingen. Nachhaltigkeit 2: Ingenieure brauchen zwei Tage pro Kunde, also braucht es mehr Tage, wenn mehr Kunden Ja sagen; die Karte nennt 8 Wochen.",
    ),
  predictive: () =>
    tt(
      "Effect 2: it adds what the customer named, but it does not cover every reason, so it helps part of the customers. Sustainability 3: the review page and the CRM already exist, the offer repeats no discount every year, and the card says 6 weeks.",
      "Wirkung 2: Es fügt hinzu, was der Kunde nannte, deckt aber nicht jeden Grund ab, also hilft es einem Teil der Kunden. Nachhaltigkeit 3: Die Review-Seite und das CRM gibt es schon, das Angebot wiederholt keinen Rabatt jedes Jahr, und die Karte nennt 6 Wochen.",
    ),
};

export function KEY_L1(): Partial<L1State> {
  return {
    sort: Object.fromEntries(LINES.map((r) => [r.id, r.truth])) as Record<LineId, LevelTag>,
    extraInsight: tt(
      "A customer that left after an outage nobody followed up could return if its former account owner calls and says what the service desk changed since. That answers a trust reason (rebuild trust): the customer hears that someone takes responsibility, so it has a reason to talk for 15 minutes before deciding anything.",
      "Ein Kunde, der nach einem Ausfall ging, dem niemand nachging, könnte zurückkehren, wenn sein früherer Account Owner anruft und sagt, was der Service Desk seitdem geändert hat. Das beantwortet einen Vertrauensgrund (Vertrauen wiederaufbauen): Der Kunde hört, dass jemand Verantwortung übernimmt, und hat einen Grund, 15 Minuten zu reden, bevor er etwas entscheidet.",
    ),
    meaning: tt(
      `Lost customers who got a personal call after the reason was fixed returned at ${FORECAST.f1}% against ${FORECAST.controlRate}% with the standard e-mail, ${FORECAST.f2} times as often, so RecoverIT should call the customers whose reason it can fix, and test it fairly, because the owners may have called the customers they knew best.`,
      `Verlorene Kunden, die nach dem Beheben des Grundes einen persönlichen Anruf bekamen, kehrten zu ${num(FORECAST.f1)} % zurück gegenüber ${num(FORECAST.controlRate)} % mit der Standard-E-Mail, ${num(FORECAST.f2)}-mal so oft, also sollte RecoverIT die Kunden anrufen, deren Grund es beheben kann, und fair testen, weil die Account Owner vielleicht die Kunden anriefen, die sie am besten kannten.`,
    ),
    valuable: [...VALUABLE_TRUTH],
    churners: [...CHURN_TRUTH],
    insights: [
      { basis: "trust" as Basis, text: tt("Call the customers who left after the March outage, with a note of what the service desk changed since, so they hear that someone took responsibility and have a reason to talk again.", "Rufen Sie die Kunden an, die nach dem Ausfall im März gingen, mit einer Notiz, was der Service Desk seitdem geändert hat, sodass sie hören, dass jemand Verantwortung übernahm, und einen Grund haben, wieder zu reden.") },
      { basis: "switch" as Basis, text: tt("Offer the customers who left for a competitor a free move back, with both setups side by side for a month, so coming back costs them almost no effort.", "Bieten Sie den Kunden, die zu einem Wettbewerber gingen, einen kostenlosen Rückumzug an, mit beiden Setups einen Monat lang parallel, sodass die Rückkehr sie fast keinen Aufwand kostet.") },
      { basis: "value" as Basis, text: tt("Offer the customers who left because cloud monitoring was missing the monitoring in their old contract for six months at no extra fee, so they get the function they went elsewhere for without paying twice.", "Bieten Sie den Kunden, die gingen, weil Cloud-Monitoring fehlte, das Monitoring in ihrem alten Vertrag sechs Monate ohne Zusatzgebühr an, sodass sie die Funktion bekommen, für die sie woanders hingingen, ohne doppelt zu zahlen.") },
    ],
    reflect: {
      interpret: tt("A win-back is worthwhile when the reason is one RecoverIT can fix and a good share of the customers would consider returning, such as customers who left after an outage nobody followed up (38% say they are open). It is not worthwhile when the reason is outside RecoverIT's reach, such as a closure or a group decision: nothing RecoverIT offers changes it.", "Eine Rückgewinnung lohnt sich, wenn der Grund einer ist, den RecoverIT beheben kann, und ein guter Teil der Kunden eine Rückkehr erwägt, etwa Kunden, die nach einem Ausfall gingen, dem niemand nachging (38 % sagen, sie seien offen). Sie lohnt sich nicht, wenn der Grund außerhalb des Einflusses von RecoverIT liegt, etwa eine Schließung oder eine Konzernentscheidung: Nichts, was RecoverIT anbietet, ändert ihn."),
      causation: tt("An emotional incentive speaks to trust: a call from someone who takes responsibility and says what changed. A financial incentive is a discount or a free service. Emotional incentives work when the customer left over how it felt treated; a discount only buys the return, does not repair a broken promise and teaches customers to wait for the next one. They work best together: first the fix, then a modest offer.", "Ein emotionaler Anreiz spricht das Vertrauen an: ein Anruf von jemandem, der Verantwortung übernimmt und sagt, was sich geändert hat. Ein finanzieller Anreiz ist ein Rabatt oder ein kostenloser Service. Emotionale Anreize wirken, wenn der Kunde ging, weil er sich schlecht behandelt fühlte; ein Rabatt erkauft nur die Rückkehr, repariert kein gebrochenes Versprechen und bringt Kunden bei, auf den nächsten zu warten. Zusammen wirken sie am besten: zuerst die Behebung, dann ein maßvolles Angebot."),
      decider: tt("Winning back the wrong customers means spending on groups that cannot or will not stay, such as customers whose company closed, or giving 25% off to customers who would have returned anyway. Unnecessary costs arise from mailing everyone and from a discount that repeats every year. A strategic decision-maker starts with the groups where the reason is fixable and a quarter or more would return, tests each approach on a random half and stops what does not move the return rate.", "Die falschen Kunden zurückzugewinnen heißt, Geld für Gruppen auszugeben, die nicht bleiben können oder wollen, etwa Kunden, deren Firma schloss, oder 25 % Rabatt an Kunden zu geben, die ohnehin zurückgekommen wären. Unnötige Kosten entstehen durch Mailings an alle und durch einen Rabatt, der sich jedes Jahr wiederholt. Eine strategische Entscheiderin beginnt mit den Gruppen, in denen der Grund behebbar ist und ein Viertel oder mehr zurückkäme, testet jeden Ansatz an einer zufälligen Hälfte und stoppt, was die Rückkehrquote nicht bewegt."),
    },
    tags: Object.fromEntries(RECORDS.map((r) => [r.id, r.truth])) as Record<RecId, PatternId>,
    unc: ["sample", "cause", "missing", "shift"] as UncId[],
    rows: Object.fromEntries(PATTERN_IDS.map((x) => [x, { risk: riskOf(TRUTH_LEFT[x], TRUTH_COUNTS[x]), meaning: MEANING_TRUTH[x], measure: MEASURE_TRUTH[x] }])) as Record<PatternId, PatternRow>,
    misread: tt(
      "1) Share of the former account owner's check-in messages that a former customer's contact answers within a week (contact with us), from the CRM contact log, aim: above 30%, then the owner calls. 2) Visits to the release-notes page twice or more in a month (visits and logins), from the website log, aim: the owner reviews the customer the same week. 3) Requests for a quote for a scope like the old contract (price and offer questions), from the sales notes, aim: a tailored offer within a week.",
      "1) Anteil der Check-in-Nachrichten des früheren Account Owners, die ein Kontakt eines früheren Kunden innerhalb einer Woche beantwortet (Kontakt mit uns), aus dem CRM-Kontaktprotokoll, Ziel: über 30 %, dann ruft der Owner an. 2) Besuche der Release-Notes-Seite, zweimal oder öfter in einem Monat (Besuche und Logins), aus dem Website-Log, Ziel: Der Owner prüft den Kunden in derselben Woche. 3) Anfragen nach einem Angebot für einen Umfang wie den alten Vertrag (Preis- und Angebotsfragen), aus den Vertriebsnotizen, Ziel: ein maßgeschneidertes Angebot innerhalb einer Woche.",
    ),
    ab: {
      ...AB_MODEL,
      hyp: tt("If the former account owner calls a lost customer after the reason is fixed instead of sending the standard e-mail, then the share who return within 90 days rises, because the customer hears from a person it knew that something has changed.", "Wenn der frühere Account Owner einen verlorenen Kunden anruft, nachdem der Grund behoben wurde, statt die Standard-E-Mail zu senden, dann steigt der Anteil, der innerhalb von 90 Tagen zurückkehrt, weil der Kunde von einer Person, die er kannte, hört, dass sich etwas geändert hat."),
      rule: tt("Roll out if the return rate of called customers is at least 10 points higher than the control group, with 100 approached customers per group and no rise in discount requests; keep testing if 3 to 10 points higher; stop if less than 3 points higher.", "Ausrollen, wenn die Rückkehrquote der angerufenen Kunden bei 100 angesprochenen Kunden pro Gruppe mindestens 10 Punkte über der Kontrollgruppe liegt und die Rabattanfragen nicht steigen; weiter testen bei 3 bis 10 Punkten darüber; stoppen bei weniger als 3 Punkten darüber."),
    },
    chosen: [...MODEL_MEASURES],
    exp: Object.fromEntries(MODEL_MEASURES.map((id) => [id, explainBucket(MEASURE_BY_ID[id].evidence)])) as Record<string, Score>,
    fea: Object.fromEntries(MODEL_MEASURES.map((id) => [id, MEASURE_BY_ID[id].model.feasibility])) as Record<string, Score>,
    eff: Object.fromEntries(MODEL_MEASURES.map((id) => [id, MEASURE_BY_ID[id].model.effect])) as Record<string, Score>,
    reasons: Object.fromEntries(MODEL_MEASURES.map((id) => [id, MEASURE_REASON[id]()])) as Record<string, string>,
    order: [...MODEL_ORDER],
    why: tt(
      "The personal return call goes first with 18: it goes only to customers whose reason can be fixed, and it answers the trust reason itself. The tailored offer comes second, also with 18: it adds what the customer named, runs on tools RecoverIT already has and can be measured on a random half. The free move back comes third with 12: it removes the work of coming back, but it aims at everyone who left for a competitor and needs engineer days per customer. The three cost €131,000 of the €140,000; the “we miss you” series is left out because it sends the same message to everyone and fixes no reason, the 25% discount for everyone buys the return without changing the reason and repeats every year, and the vendor platform costs more than the whole budget and would not be in use within four months.",
      "Der persönliche Rückkehr-Anruf kommt zuerst mit 18: Er geht nur an Kunden, deren Grund sich beheben lässt, und beantwortet den Vertrauensgrund selbst. Das maßgeschneiderte Angebot kommt als Zweites, ebenfalls mit 18: Es fügt hinzu, was der Kunde nannte, läuft auf Werkzeugen, die RecoverIT schon hat, und lässt sich an einer zufälligen Hälfte messen. Der kostenlose Rückumzug kommt als Drittes mit 12: Er nimmt die Arbeit der Rückkehr ab, zielt aber auf alle, die zu einem Wettbewerber gingen, und braucht Ingenieurtage pro Kunden. Die drei kosten 131.000 € von 140.000 €; die „Wir vermissen Sie“-Serie bleibt draußen, weil sie allen dieselbe Botschaft schickt und keinen Grund behebt, der Rabatt von 25 % für alle die Rückkehr erkauft, ohne den Grund zu ändern, und sich jedes Jahr wiederholt, und die Anbieter-Plattform mehr als das ganze Budget kostet und in vier Monaten nicht im Einsatz wäre.",
    ),
  };
}

export function KEY_R2(): Partial<R2State> {
  const rate: Record<string, Score> = {};
  for (const id of MODEL_COMPS) for (const c of ["explain", "timely", "reach", "scale"] as Criterion[]) rate[`${id}.${c}`] = COMP_BY_ID[id].model[c];
  const logic: Record<string, LogicRow> = {};
  for (const s of SITUATIONS) logic[s.id] = { action: actionOf(s), owner: OWNER_ACCEPT_LOGIC[s.id][0] };
  return {
    principles: ["defs", "rules", "review"],
    principleText: {
      defs: tt("Customer success, sales and finance read and write one list of lost customers, so every approach knows why the customer left, what the contract was worth and who spoke to it; this answers “measures not measurable”.", "Customer Success, Vertrieb und Finance lesen und schreiben eine Liste verlorener Kunden, sodass jeder Ansatz weiß, warum der Kunde ging, was der Vertrag wert war und wer mit ihm gesprochen hat; das beantwortet „Maßnahmen nicht messbar“."),
      rules: tt("Each approach has a written rule: which reason triggers it, who acts within five working days and what is logged, so nobody waits for somebody else, which answers the risk that a good approach is never used.", "Jeder Ansatz hat eine schriftliche Regel: welcher Grund ihn auslöst, wer innerhalb von fünf Arbeitstagen handelt und was festgehalten wird, sodass niemand auf jemand anderen wartet, was das Risiko beantwortet, dass ein guter Ansatz nie genutzt wird."),
      review: tt("Every month the same few numbers decide which approach is kept, changed or stopped: how many approached customers returned and how many of the control group did, so RecoverIT improves by measured steps instead of one big bet.", "Jeden Monat entscheiden dieselben wenigen Zahlen, welcher Ansatz bleibt, sich ändert oder gestoppt wird: wie viele angesprochene Kunden zurückkamen und wie viele aus der Kontrollgruppe, sodass RecoverIT in gemessenen Schritten besser wird statt mit einer großen Wette."),
    },
    sources: Object.fromEntries(SOURCES.map((s) => [s.id, useOf(s)])) as Record<string, Use>,
    comps: [...MODEL_COMPS],
    rate,
    greatest: MODEL_GREATEST,
    greatestWhy: tt(
      "The win-back rate is the result everything else exists for. It moves with every approach, covers every approached customer and is counted from the CRM every week, so each approach can be steered by it within weeks, and it shows quickly whether an approach is worth what it costs.",
      "Die Win-back Rate ist das Ergebnis, für das alles andere da ist. Sie bewegt sich mit jedem Ansatz, deckt jeden angesprochenen Kunden ab und wird jede Woche aus dem CRM gezählt, sodass sich jeder Ansatz innerhalb von Wochen daran steuern lässt, und sie zeigt schnell, ob ein Ansatz sein Geld wert ist.",
    ),
    logic,
    tier: { ...MODEL_TIER },
    vision: tt(
      "RecoverIT knows why customers leave and what each would be worth back: one list shows the reason, the value and an owner, every approach has a written rule, and effort goes first to the groups where the reason is fixable and a return is worth most. Every offer is tested on a random half before it grows, and a monthly review keeps, changes or stops it. The company steers by three KPIs, so winning customers back replaces mailing everyone.",
      "RecoverIT weiß, warum Kunden gehen und was jeder zurück wert wäre: Eine Liste zeigt den Grund, den Wert und einen Owner, jeder Ansatz hat eine schriftliche Regel, und der Aufwand geht zuerst an die Gruppen, in denen der Grund behebbar ist und eine Rückkehr am meisten wert ist. Jedes Angebot wird an einer zufälligen Hälfte getestet, bevor es wächst, und ein monatliches Review behält, ändert oder stoppt es. Das Unternehmen steuert über drei KPIs, sodass die Rückgewinnung von Kunden das Mailing an alle ersetzt.",
    ),
    giveUp: tt(
      `The plan gives me one scoreboard and list of lost customers, clean data, a reason-based approach (calls for emotional reasons, offers for rational ones), a test-and-learn routine and trained teams. The value-based priority starts once the data is clean. It costs me the vendor platform and the 25% discount for every lost customer, which name no KPI (the platform is in use only in month 7). ${euro(R2_BUDGET - MODEL_ARCH.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0))} stay unspent. If the data is weaker, the reason-based approach rests on data below 80% complete, so I watch it first.`,
      `Der Plan gibt mir ein Scoreboard und eine Liste verlorener Kunden, saubere Daten, einen grundbasierten Ansatz (Anrufe bei emotionalen Gründen, Angebote bei rationalen), eine Test-and-learn-Routine und geschulte Teams. Die wertbasierte Priorität startet, sobald die Daten sauber sind. Er kostet mich die Anbieter-Plattform und den Rabatt von 25 % für jeden verlorenen Kunden, die keinen KPI nennen (die Plattform ist erst in Monat 7 im Einsatz). ${euro(R2_BUDGET - MODEL_ARCH.reduce((x, id) => x + ARCH_BY_ID[id].cost, 0))} bleiben ungenutzt. Sind die Daten schwächer, beruht der grundbasierte Ansatz auf Daten unter 80 % Vollständigkeit, also beobachte ich ihn zuerst.`,
    ),
    decision: "stage",
    decisionWhy: tt(
      "It is the investment decision the brief asks for despite an unclear success rate: start with the data that is already complete (exit notes and cancellation forms), fix the gaps with the clean-up, test every offer on a random half, measure from the first week and spend the rest as the evidence arrives. The value-based priority waits for clean data, and the vendor platform and the discount stay out because neither names a KPI and the platform arrives only in month 7.",
      "Es ist die Investitionsentscheidung, die der Auftrag trotz unklarer Erfolgsquote verlangt: mit den Daten beginnen, die schon vollständig sind (Abschlussnotizen und Kündigungsformulare), die Lücken mit der Bereinigung schließen, jedes Angebot an einer zufälligen Hälfte testen, ab der ersten Woche messen und den Rest ausgeben, wie die Evidenz kommt. Die wertbasierte Priorität wartet auf saubere Daten, und die Anbieter-Plattform und der Rabatt bleiben draußen, weil keiner einen KPI nennt und die Plattform erst in Monat 7 ankommt.",
    ),
    watch: tt(
      "I watch the win-back rate: today it is 8%, and if it has not clearly risen, towards 15%, by month 3 on at least 100 approached lost customers, I stop adding approaches and rewrite the call guide with the account owners. I also watch the share of approached customers who have not answered after 30 days: today 70%, and if it is not below that by month 4, I pause the approach that creates the most contacts with no reply.",
      "Ich beobachte die Win-back Rate: Heute liegt sie bei 8 %, und ist sie bis Monat 3 bei mindestens 100 angesprochenen verlorenen Kunden nicht deutlich gestiegen, Richtung 15 %, höre ich auf, Ansätze hinzuzufügen, und schreibe den Gesprächsleitfaden mit den Account Ownern neu. Ich beobachte auch den Anteil der angesprochenen Kunden, die nach 30 Tagen nicht geantwortet haben: heute 70 %, und liegt er bis Monat 4 nicht darunter, pausiere ich den Ansatz, der die meisten Kontakte ohne Antwort erzeugt.",
    ),
  };
}
