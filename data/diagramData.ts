import type { ArchMiniCfg, BarsCfg, CompCfg, FairCfg, LiftCfg, MapCfg, RatesCfg, SceneCfg, ScoreCfg, StagesCfg, TreeCfg } from "@/components/materi/diagrams";
import { CASES_MIN, LIFT_ACT, LIFT_WATCH } from "@/data/route2";
import { JOINS_LABEL } from "@/data/measures";
import type { Joins } from "@/data/measures";
import { bi, euro, num, pct, t, tt } from "@/lib/lang";

/**
 * Everything the interactive diagrams of Materi A and B say, in one file (components/materi/diagrams.tsx draws them). Materi A uses the example
 * company Isar Hosting (a Munich provider of managed hosting, Case assumption), Materi B uses Neckar Systemhaus (a Stuttgart IT service provider,
 * Case assumption); never RecoverIT, so the answer to a task block is never printed. All figures here are Case assumptions.
 */

/* ------------------------------------------------------------------ A1 · three kinds of reason, and what a team does with each */

export const MECH: SceneCfg = bi({
  point: t(
    "A reason helps only when it is read as what it is. An emotional reason is about how the customer felt treated, so trust has to be repaired first. A rational reason is a comparison the customer can write down, so a better offer on that point can win it back. A reason outside our reach cannot be changed by anything the company does. Mixing them up wastes money and goodwill.",
    "Ein Grund hilft nur, wenn er als das gelesen wird, was er ist. Ein emotionaler Grund betrifft, wie sich der Kunde behandelt fühlte, also muss zuerst das Vertrauen repariert werden. Ein rationaler Grund ist ein Vergleich, den der Kunde aufschreiben kann, also kann ein besseres Angebot an dieser Stelle ihn zurückgewinnen. Ein Grund außerhalb unseres Einflusses lässt sich durch nichts ändern, was das Unternehmen tut. Sie zu verwechseln verschwendet Geld und Wohlwollen.",
  ),
  aria: t("What a team does with each kind of reason", "Was ein Team mit jeder Art von Grund tut"),
  groupLabel: t("Kind of reason", "Art des Grundes"),
  stateLabel: t("How it is answered", "Wie darauf geantwortet wird"),
  groups: [
    { id: "emotional", label: t("Emotional", "Emotional") },
    { id: "rational", label: t("Rational", "Rational") },
    { id: "outside", label: t("Outside our reach", "Außerhalb unseres Einflusses") },
  ],
  states: [
    { id: "right", label: t("Answered the right way", "Richtig beantwortet") },
    { id: "miss", label: t("Answered the wrong way", "Falsch beantwortet") },
    { id: "much", label: t("The same answer for everyone", "Dieselbe Antwort für alle") },
  ],
  okState: "right",
  initial: { group: "emotional", state: "right" },
  shown: {
    emotional: {
      right: t("A customer left after an outage when nobody called. Its former account owner calls, says what Isar changed since (a call within an hour of every outage) and asks for 15 minutes. The customer agrees to talk.", "Ein Kunde ging nach einem Ausfall, bei dem niemand anrief. Sein früherer Account Owner ruft an, sagt, was Isar seitdem geändert hat (ein Anruf innerhalb einer Stunde nach jedem Ausfall), und bittet um 15 Minuten. Der Kunde stimmt einem Gespräch zu."),
      miss: t("The same customer gets a 25% discount e-mail. Nothing says that anyone is sorry or that anything changed, so the mail is ignored and the trust reason is still there.", "Derselbe Kunde bekommt eine Rabatt-E-Mail über 25 %. Nichts sagt, dass es jemandem leidtut oder dass sich etwas geändert hat, also wird die Mail ignoriert, und der Vertrauensgrund bleibt."),
      much: t("Isar sends one “we miss you” mail to every lost customer. The customer who felt ignored feels ignored again, now by a mass mailing.", "Isar schickt jedem verlorenen Kunden dieselbe „Wir vermissen Sie“-Mail. Der Kunde, der sich ignoriert fühlte, fühlt sich wieder ignoriert, jetzt von einem Massenmailing."),
    },
    rational: {
      right: t("A customer left for a provider that is 18% cheaper for the same scope. Isar sends a tailored offer that closes the gap on the one function the customer used most. The customer compares again and asks for a quote.", "Ein Kunde ging zu einem Anbieter, der bei gleichem Umfang 18 % günstiger ist. Isar schickt ein maßgeschneidertes Angebot, das die Lücke bei der einen Funktion schließt, die der Kunde am meisten nutzte. Der Kunde vergleicht neu und bittet um ein Angebot."),
      miss: t("The same customer gets a personal call about how much Isar cares, with no offer. The customer was never unhappy with the people, so the price gap is still there and nothing changes.", "Derselbe Kunde bekommt einen persönlichen Anruf darüber, wie viel Isar an ihm liegt, ohne Angebot. Der Kunde war nie mit den Leuten unzufrieden, also bleibt die Preislücke, und nichts ändert sich."),
      much: t("Isar gives every lost customer 25% off. The customers who left over price may return, but so do the ones who would have returned anyway, and the discount repeats every year.", "Isar gibt jedem verlorenen Kunden 25 % Rabatt. Die Kunden, die wegen des Preises gingen, kehren vielleicht zurück, aber auch die, die ohnehin zurückgekommen wären, und der Rabatt wiederholt sich jedes Jahr."),
    },
    outside: {
      right: t("A customer's company was taken over by a group with its own IT. Isar notes it, sends one friendly message and stops. No money and no calls are spent on a customer that cannot choose.", "Die Firma eines Kunden wurde von einem Konzern mit eigener IT übernommen. Isar hält es fest, schickt eine freundliche Nachricht und hört auf. Für einen Kunden, der nicht wählen kann, werden weder Geld noch Anrufe ausgegeben."),
      miss: t("The same customer receives an offer, a call and a reminder. Nothing Isar offers changes a group decision, and the account owner's week is gone.", "Derselbe Kunde erhält ein Angebot, einen Anruf und eine Erinnerung. Nichts, was Isar anbietet, ändert eine Konzernentscheidung, und die Woche des Account Owners ist vertan."),
      much: t("Every lost customer, closed or taken over, is on the same mailing list. Marketing reports “2,400 mails sent”, and not one of those customers could have returned.", "Jeder verlorene Kunde, geschlossen oder übernommen, steht auf derselben Mailingliste. Das Marketing meldet „2.400 Mails versendet“, und kein einziger dieser Kunden hätte zurückkehren können."),
    },
  },
  read: {
    right: t("The reason is read as what it is. An emotional reason gets a repair and a person, a rational one an offer on the point it names, and a reason outside our reach gets nothing but a friendly note. The team spends its time where it changes something.", "Der Grund wird als das gelesen, was er ist. Ein emotionaler Grund bekommt eine Reparatur und einen Menschen, ein rationaler ein Angebot zu dem Punkt, den er nennt, und ein Grund außerhalb unseres Einflusses nichts als eine freundliche Notiz. Das Team verbringt seine Zeit dort, wo es etwas ändert."),
    miss: t("The reason is answered the wrong way. A discount does not repair trust, a call without an offer does not close a price gap, and any answer to a closed company is lost.", "Auf den Grund wird falsch geantwortet. Ein Rabatt repariert kein Vertrauen, ein Anruf ohne Angebot schließt keine Preislücke, und jede Antwort an eine geschlossene Firma ist verloren."),
    much: t("One answer for everyone ignores the reason. It costs the most (every lost customer gets it), repeats every year and teaches the wrong customers to wait for the next one.", "Eine Antwort für alle ignoriert den Grund. Sie kostet am meisten (jeder verlorene Kunde bekommt sie), wiederholt sich jedes Jahr und bringt den falschen Kunden bei, auf die nächste zu warten."),
  },
  steps: [
    { title: t("An emotional reason, answered right", "Ein emotionaler Grund, richtig beantwortet"), say: t("Isar Hosting is an example company, not your case. A customer left after an outage nobody followed up. Its former account owner calls and says what changed. The customer agrees to talk.", "Isar Hosting ist ein Beispielunternehmen, nicht Ihr Fall. Ein Kunde ging nach einem Ausfall, dem niemand nachging. Sein früherer Account Owner ruft an und sagt, was sich geändert hat. Der Kunde stimmt einem Gespräch zu."), look: t("the first card, with a solid frame", "die erste Karte, mit durchgezogenem Rahmen"), group: "emotional", state: "right" },
    { title: t("A rational reason, answered the wrong way", "Ein rationaler Grund, falsch beantwortet"), say: t("Now a customer who left for a cheaper offer gets a call about how much Isar cares, with no offer. The price gap is still there, so nothing changes.", "Jetzt bekommt ein Kunde, der wegen eines günstigeren Angebots ging, einen Anruf darüber, wie viel Isar an ihm liegt, ohne Angebot. Die Preislücke bleibt, also ändert sich nichts."), look: t("the dashed second card", "die gestrichelte zweite Karte"), group: "rational", state: "miss" },
    { title: t("The point", "Das Wichtigste"), say: t("Ask of every reason: would the same price and the same functions have kept the customer? Repair trust, answer a comparison with an offer, and leave a reason outside your reach alone. Try the three kinds and the three answers.", "Fragen Sie bei jedem Grund: Hätten derselbe Preis und dieselben Funktionen den Kunden gehalten? Reparieren Sie Vertrauen, beantworten Sie einen Vergleich mit einem Angebot, und lassen Sie einen Grund außerhalb Ihres Einflusses in Ruhe. Probieren Sie die drei Arten und die drei Antworten."), look: t("the reason outside our reach, answered right", "der Grund außerhalb unseres Einflusses, richtig beantwortet"), group: "outside", state: "right" },
  ],
  sort: {
    title: t("A worked sort: three reasons heard at Isar Hosting", "Eine Beispielsortierung: drei Gründe, die bei Isar Hosting zu hören waren"),
    showLabel: t("Show the kind and why", "Art und Grund zeigen"),
    items: [
      { id: "a", text: t("“We felt like a ticket number after the outage.”", "„Nach dem Ausfall kamen wir uns vor wie eine Ticketnummer.“"), tag: t("Emotional", "Emotional"), why: t("It is about how the customer felt treated, and a lower price would not repair it.", "Es geht darum, wie sich der Kunde behandelt fühlte, und ein niedrigerer Preis würde es nicht reparieren.") },
      { id: "b", text: t("“A competitor offers the same scope for 15% less.”", "„Ein Wettbewerber bietet denselben Umfang für 15 % weniger.“"), tag: t("Rational", "Rational"), why: t("A comparison the customer can write down: a better offer on price can win it back.", "Ein Vergleich, den der Kunde aufschreiben kann: Ein besseres Angebot beim Preis kann ihn zurückgewinnen.") },
      { id: "c", text: t("“Our company was taken over by a group with its own IT.”", "„Unsere Firma wurde von einem Konzern mit eigener IT übernommen.“"), tag: t("Outside our reach", "Außerhalb unseres Einflusses"), why: t("A group decision: nothing Isar offers changes it.", "Eine Konzernentscheidung: Nichts, was Isar anbietet, ändert sie.") },
    ],
  },
  footnote: t("Illustration on Isar Hosting (Case assumption). A dashed frame marks an answer that wastes money or goodwill.", "Illustration mit Isar Hosting (Fallannahme). Ein gestrichelter Rahmen markiert eine Antwort, die Geld oder Wohlwollen verschwendet."),
});

/* ------------------------------------------------------------------ A2 · what brings a customer back */

const ROW_REASON = { trust: "trust lost", effort: "too much work to move back", value: "a missing function" } as const;
const ROW_REASON_DE = { trust: "verlorenes Vertrauen", effort: "zu viel Aufwand für den Rückumzug", value: "eine fehlende Funktion" } as const;
export const PRIZE: BarsCfg = bi({
  point: t(
    "Customers come back for different reasons: because trust is repaired, because coming back is easy, or because there is new value or an incentive. A personal approach after the fix answers each of these. A discount mail answers none of them for long, and where the reason is outside our reach, nothing works.",
    "Kunden kommen aus verschiedenen Gründen zurück: weil Vertrauen repariert ist, weil die Rückkehr leicht ist, oder weil es neuen Nutzen oder einen Anreiz gibt. Ein persönlicher Ansatz nach der Behebung beantwortet jeden davon. Eine Rabatt-Mail beantwortet keinen davon lange, und wo der Grund außerhalb unseres Einflusses liegt, wirkt nichts.",
  ),
  aria: t("Share of lost customers who return, by the reason they left and by the kind of approach", "Anteil der verlorenen Kunden, die zurückkehren, nach dem Grund, aus dem sie gingen, und nach der Art des Ansatzes"),
  states: [
    { id: "personal", label: t("A personal approach after the fix", "Ein persönlicher Ansatz nach der Behebung") },
    { id: "mail", label: t("The standard discount e-mail", "Die Standard-Rabatt-E-Mail") },
  ],
  initial: { state: "personal", row: "trust" },
  max: 100,
  unit: "%",
  stateToggleLabel: t("Approach", "Ansatz"),
  rowToggleLabel: t("Reason", "Grund"),
  rows: [
    { id: "trust", label: t("Trust lost: nobody called after an outage", "Vertrauen verloren: Nach einem Ausfall rief niemand an"), values: { personal: 48, mail: 6 }, good: { personal: true, mail: false } },
    { id: "effort", label: t("Too much work to move back: the new provider is slower, but moving again is a chore", "Zu viel Aufwand für den Rückumzug: Der neue Anbieter ist langsamer, aber ein erneuter Umzug ist mühsam"), values: { personal: 41, mail: 5 }, good: { personal: true, mail: false } },
    { id: "value", label: t("A missing function: the customer needed monitoring Isar did not offer", "Eine fehlende Funktion: Der Kunde brauchte ein Monitoring, das Isar nicht anbot"), values: { personal: 36, mail: 8 }, good: { personal: true, mail: false } },
    { id: "outside", label: t("Taken over by a group with its own IT", "Von einem Konzern mit eigener IT übernommen"), values: { personal: 3, mail: 2 }, good: { personal: false, mail: false } },
  ],
  steps: [
    { title: t("A reason an approach can answer", "Ein Grund, den ein Ansatz beantworten kann"), say: t("Isar Hosting is an example company, not your case. Customers who left because nobody called after an outage got a call that said what changed. 48% of them came back: the reason was trust, and trust can be repaired.", "Isar Hosting ist ein Beispielunternehmen, nicht Ihr Fall. Kunden, die gingen, weil nach einem Ausfall niemand anrief, bekamen einen Anruf, der sagte, was sich geändert hat. 48 % von ihnen kamen zurück: Der Grund war Vertrauen, und Vertrauen lässt sich reparieren."), look: t("the first bar, personal approach", "der erste Balken, persönlicher Ansatz"), state: "personal", row: "trust" },
    { title: t("The same reason, a discount mail", "Derselbe Grund, eine Rabatt-Mail"), say: t("The same customers got the standard discount e-mail instead: 6% came back. A discount does not repair a trust reason, and it names nothing that changed.", "Dieselben Kunden bekamen stattdessen die Standard-Rabatt-E-Mail: 6 % kamen zurück. Ein Rabatt repariert keinen Vertrauensgrund und nennt nichts, was sich geändert hat."), look: t("the first bar, discount mail", "der erste Balken, Rabatt-Mail"), state: "mail", row: "trust" },
    { title: t("The point", "Das Wichtigste"), say: t("Match the approach to the reason: a call for trust, a free move for effort, an offer with the missing function for value. Where a group decision took the choice away, nothing works. Switch the reason and the approach.", "Passen Sie den Ansatz an den Grund an: einen Anruf bei Vertrauen, einen kostenlosen Umzug bei Aufwand, ein Angebot mit der fehlenden Funktion bei Nutzen. Wo eine Konzernentscheidung die Wahl nahm, wirkt nichts. Wechseln Sie Grund und Ansatz."), look: t("the last bar, which stays low", "der letzte Balken, der niedrig bleibt"), state: "personal", row: "outside" },
  ],
  read: (row: string, state: string, v: number) =>
    row === "outside"
      ? tt(`${v}% come back ${state === "personal" ? "even after a personal approach" : "after the discount mail"}: a takeover is a reason no approach removes. Win-back effort here is lost; a friendly note and a note in the CRM are enough.`, `${v} % kommen zurück${state === "personal" ? " selbst nach einem persönlichen Ansatz" : " nach der Rabatt-Mail"}: Eine Übernahme ist ein Grund, den kein Ansatz beseitigt. Rückgewinnungsaufwand ist hier verloren; eine freundliche Nachricht und ein Vermerk im CRM genügen.`)
      : state === "personal"
        ? tt(`${v}% come back after a personal approach: the reason (${ROW_REASON[row as keyof typeof ROW_REASON]}) is one an approach can answer, so the customer has something that is different from when it left.`, `${v} % kommen nach einem persönlichen Ansatz zurück: Der Grund (${ROW_REASON_DE[row as keyof typeof ROW_REASON_DE]}) ist einer, den ein Ansatz beantworten kann, also hat der Kunde etwas, das anders ist als beim Abschied.`)
        : tt(`${v}% come back after the discount mail: it names no reason and fixes nothing, so it moves few. A discount is an incentive, not an answer.`, `${v} % kommen nach der Rabatt-Mail zurück: Sie nennt keinen Grund und behebt nichts, also bewegt sie wenige. Ein Rabatt ist ein Anreiz, keine Antwort.`),
  footnote: t("Illustration on Isar Hosting (Case assumption). Share of lost customers who return within 90 days.", "Illustration mit Isar Hosting (Fallannahme). Anteil der verlorenen Kunden, die innerhalb von 90 Tagen zurückkehren."),
});

/* ------------------------------------------------------------------ A3 · where a win-back pays, and where it can use data that exists */

export const MOMENTS: MapCfg = bi({
  point: t(
    "A win-back pays most where the reason is one the company can fix and a quarter or more would consider coming back. It can run on existing data only where part or all of the record of the group (who, why, what it was worth) is already on the list. Where neither is true, other work comes first.",
    "Eine Rückgewinnung lohnt sich am meisten dort, wo der Grund einer ist, den das Unternehmen beheben kann, und ein Viertel oder mehr eine Rückkehr erwägt. Sie kann nur dort auf vorhandenen Daten laufen, wo ein Teil oder alles vom Datensatz der Gruppe (wer, warum, was er wert war) schon in der Liste steht. Wo beides nicht zutrifft, kommt andere Arbeit zuerst.",
  ),
  aria: t("Isar Hosting's groups of lost customers by the share open to returning and the record already on the list", "Gruppen verlorener Kunden von Isar Hosting nach dem Anteil, der für eine Rückkehr offen ist, und dem Datensatz, der schon in der Liste steht"),
  xTicks: [0, 25, 50, 75, 100],
  xUnit: "%",
  xAxisLabel: t("share open to returning →", "Anteil, der für eine Rückkehr offen ist →"),
  rows: [t("all of the record on the list", "der ganze Datensatz in der Liste"), t("part of the record on the list", "ein Teil des Datensatzes in der Liste"), t("none of the record on the list", "nichts vom Datensatz in der Liste")],
  zones: [
    { x1: 0, x2: 100, r1: 0, r2: 1, kind: "teal", label: t("on the list: a win-back can run on data we have", "in der Liste: Eine Rückgewinnung kann auf vorhandenen Daten laufen"), lx: 50, lr: 0, color: "teal" },
    { x1: 25, x2: 100, r1: 0, r2: 2, kind: "hatch", label: t("reason fixable + 25% open: pays most", "Grund behebbar + 25 % offen: lohnt sich am meisten"), lx: 62, lr: 2, color: "amber" },
  ],
  items: [
    { id: "g1", name: t("Left after a failed migration nobody apologised for", "Nach einer fehlgeschlagenen Migration gegangen, für die sich niemand entschuldigte"), x: 45, row: 2, square: true, glyph: "●", verdict: t("pays most", "lohnt sich am meisten"), fact: t("45% open to returning · the reason is fixable · none of the record on the list", "45 % offen für eine Rückkehr · der Grund ist behebbar · nichts vom Datensatz in der Liste"), why: t("The reason is one Isar can fix and 45% are open: a call has something to change. Nothing records these customers today.", "Der Grund ist einer, den Isar beheben kann, und 45 % sind offen: Ein Anruf hat etwas zu ändern. Heute erfasst nichts diese Kunden.") },
    { id: "g2", name: t("Left because the monthly report lacked a function", "Gegangen, weil dem Monatsbericht eine Funktion fehlte"), x: 30, row: 2, square: true, glyph: "●", verdict: t("pays most", "lohnt sich am meisten"), fact: t("30% open to returning · the reason is fixable · none of the record on the list", "30 % offen für eine Rückkehr · der Grund ist behebbar · nichts vom Datensatz in der Liste"), why: t("A missing function can be built, and 30% are open: an offer with the function can start a conversation.", "Eine fehlende Funktion lässt sich bauen, und 30 % sind offen: Ein Angebot mit der Funktion kann ein Gespräch anstoßen.") },
    { id: "g3", name: t("Left because their budget was frozen", "Gegangen, weil ihr Budget eingefroren wurde"), x: 55, row: 2, square: false, glyph: "○", verdict: t("stay in touch and wait", "in Kontakt bleiben und warten"), fact: t("55% open to returning · Isar cannot fix the reason · none of the record on the list", "55 % offen für eine Rückkehr · Isar kann den Grund nicht beheben · nichts vom Datensatz in der Liste"), why: t("55% would return, but a frozen budget is not something Isar can fix. The step is to stay in touch and wait, not to run a win-back.", "55 % würden zurückkehren, aber ein eingefrorenes Budget kann Isar nicht beheben. Der Schritt ist, in Kontakt zu bleiben und zu warten, keine Rückgewinnung zu fahren.") },
    { id: "g4", name: t("Left for a cheaper competitor on a three-year contract", "Zu einem günstigeren Wettbewerber auf einen Dreijahresvertrag gewechselt"), x: 10, row: 0, square: false, glyph: "◐", verdict: t("can use data we have", "kann vorhandene Daten nutzen"), fact: t("10% open to returning · not fixable · all of the record on the list", "10 % offen für eine Rückkehr · nicht behebbar · der ganze Datensatz in der Liste"), why: t("The record is complete, so a win-back could run on it. Only 10% are open and they are tied to a contract, so it is not where a win-back pays most.", "Der Datensatz ist vollständig, also könnte eine Rückgewinnung darauf laufen. Nur 10 % sind offen, und sie sind an einen Vertrag gebunden, also lohnt es sich hier nicht am meisten.") },
    { id: "g5", name: t("Left because a function was missing, and have since moved their setup", "Gegangen, weil eine Funktion fehlte, und haben ihre Einrichtung seitdem umgezogen"), x: 15, row: 1, square: true, glyph: "◐", verdict: t("can use data we have", "kann vorhandene Daten nutzen"), fact: t("15% open to returning · the reason is fixable · part of the record on the list", "15 % offen für eine Rückkehr · der Grund ist behebbar · ein Teil des Datensatzes in der Liste"), why: t("Part of the record is already on the list, so a win-back can build on it. Only 15% are open, so it is not the most valuable group.", "Ein Teil des Datensatzes steht schon in der Liste, also kann eine Rückgewinnung darauf aufbauen. Nur 15 % sind offen, also ist es nicht die wertvollste Gruppe.") },
    { id: "g6", name: t("Closed down, or taken over by a group with its own IT", "Geschlossen oder von einem Konzern mit eigener IT übernommen"), x: 4, row: 2, square: false, glyph: "○", verdict: t("not worth the effort", "den Aufwand nicht wert"), fact: t("4% open to returning · not fixable · none of the record on the list", "4 % offen für eine Rückkehr · nicht behebbar · nichts vom Datensatz in der Liste"), why: t("Almost nobody can return, and no approach changes a closure or a group decision. Not worth any effort.", "Fast niemand kann zurückkehren, und kein Ansatz ändert eine Schließung oder eine Konzernentscheidung. Keinen Aufwand wert.") },
  ],
  steps: [
    { title: t("Pays most here first", "Hier lohnt es sich zuerst"), say: t("Isar Hosting is an example company, not your case. Customers who left after a failed migration nobody apologised for are open (45%), and the reason can be fixed. A call here has something to change.", "Isar Hosting ist ein Beispielunternehmen, nicht Ihr Fall. Kunden, die nach einer fehlgeschlagenen Migration gingen, für die sich niemand entschuldigte, sind offen (45 %), und der Grund lässt sich beheben. Ein Anruf hat hier etwas zu ändern."), look: t("square 1, in the hatched area at the bottom", "Quadrat 1, im schraffierten Bereich unten"), item: "g1" },
    { title: t("A win-back can use existing data here", "Hier kann eine Rückgewinnung vorhandene Daten nutzen"), say: t("Customers who left for a cheaper competitor are already on a complete record, so a win-back could use it at once, but only 10% are open. Not the biggest prize.", "Kunden, die zu einem günstigeren Wettbewerber gingen, stehen schon in einem vollständigen Datensatz, also könnte eine Rückgewinnung ihn sofort nutzen, aber nur 10 % sind offen. Nicht der größte Gewinn."), look: t("circle 4, in the teal row at the top", "Kreis 4, in der teal Zeile oben"), item: "g4" },
    { title: t("The point", "Das Wichtigste"), say: t("Customers whose budget was frozen are 55% open, but Isar cannot fix a frozen budget: stay in touch and wait. Win back where the reason is fixable. Try the dots.", "Kunden, deren Budget eingefroren wurde, sind zu 55 % offen, aber Isar kann ein eingefrorenes Budget nicht beheben: in Kontakt bleiben und warten. Gewinnen Sie dort zurück, wo der Grund behebbar ist. Probieren Sie die Punkte."), look: t("circle 3, in the bottom row", "Kreis 3, in der unteren Zeile"), item: "g3" },
  ],
  initial: "g1",
  toggleLabel: t("Groups", "Gruppen"),
  legend: t("Illustration on Isar Hosting (Case assumption). Squares are groups whose reason Isar can fix, circles are not. Hatched = 25% or more open to returning; teal = part or all of the record is on the list; the rest comes after.", "Illustration mit Isar Hosting (Fallannahme). Quadrate sind Gruppen, deren Grund Isar beheben kann, Kreise nicht. Schraffiert = 25 % oder mehr offen für eine Rückkehr; teal = ein Teil oder der ganze Datensatz steht in der Liste; der Rest kommt danach."),
});

/* ------------------------------------------------------------------ A4 · what a personal approach is worth */

export const BAR_RATES: RatesCfg = bi({
  point: t(
    "A comparison gives two return rates, one per approach. Their ratio says how many times better the personal approach did, and the difference, over a year of lost customers whose reason can be fixed, says what it is worth. A comparison the account owners shaped is promising, not proof.",
    "Ein Vergleich gibt zwei Rückkehrquoten, eine pro Ansatz. Ihr Verhältnis sagt, wie viel Mal besser der persönliche Ansatz abschnitt, und der Unterschied, über ein Jahr verlorener Kunden mit behebbarem Grund, sagt, was er wert ist. Ein Vergleich, den die Account Owner mitgeprägt haben, ist vielversprechend, kein Beweis.",
  ),
  aria: t("Isar Hosting: lost customers who got a call after the fix against lost customers who got the standard e-mail", "Isar Hosting: verlorene Kunden, die nach der Behebung angerufen wurden, gegen verlorene Kunden, die die Standard-E-Mail bekamen"),
  data: { control: { sent: 150, orders: 9 }, variant: { sent: 50, orders: 12 }, yearly: 90, order: 20000, min: 30, max: 300, step: 30 },
  rateScale: 25,
  labels: {
    variant: t("Call after the fix", "Anruf nach der Behebung"),
    control: t("Standard e-mail", "Standard-E-Mail"),
    ofWord: t("of", "von"),
    slider: (n: number) => tt(`Isar's lost customers a year whose reason it can fix: ${num(n)}`, `Verlorene Kunden von Isar pro Jahr, deren Grund es beheben kann: ${num(n)}`),
    lift: (rate: number, other: number, lift: number) => tt(`Lift = ${rate} ÷ ${other} = ${num(lift)} times as often`, `Lift = ${num(rate)} ÷ ${num(other)} = ${num(lift)}-mal so oft`),
  },
  steps: [
    { title: t("Two approaches, two rates", "Zwei Ansätze, zwei Quoten"), yearlyMult: 1, look: t("the two bars and the amber line under them", "die zwei Balken und die bernsteinfarbene Zeile darunter"), say: (r: { rate: number; other: number; lift: number }) => tt(`Isar Hosting is an example company, not your case. Lost customers who got a call after the fix returned at ${pct(r.rate, 1)}, against ${pct(r.other, 1)} with the standard e-mail: ${num(r.lift)} times as often.`, `Isar Hosting ist ein Beispielunternehmen, nicht Ihr Fall. Verlorene Kunden, die nach der Behebung angerufen wurden, kehrten zu ${pct(r.rate, 1)} zurück, gegenüber ${pct(r.other, 1)} mit der Standard-E-Mail: ${num(r.lift)}-mal so oft.`) },
    { title: t("Only the difference is extra", "Nur der Unterschied ist zusätzlich"), yearlyMult: 2, look: t("the slider at double the lost customers, and the sum in “What this shows”", "der Regler bei doppelt so vielen verlorenen Kunden und die Rechnung in „Was das zeigt“"), say: (r: { other: number; extraAt: (y: number) => number }) => tt(`With the e-mail, ${pct(r.other, 1)} would have returned anyway. On ${num(180)} lost customers a year whose reason can be fixed, the difference is worth about ${euro(r.extraAt(180))}. The app does the arithmetic.`, `Mit der E-Mail wären ohnehin ${pct(r.other, 1)} zurückgekehrt. Bei ${num(180)} verlorenen Kunden pro Jahr mit behebbarem Grund ist der Unterschied etwa ${euro(r.extraAt(180))} wert. Die Rechnung übernimmt die App.`) },
    { title: t("The point", "Das Wichtigste"), yearlyMult: 1, look: t("the returned customers printed behind each bar", "die zurückgekehrten Kunden, die hinter jedem Balken stehen"), say: () => tt("Two return rates side by side turn “the calls seem to help” into a figure. But if account owners called mostly the customers they knew best, the gap overstates the call: promising, not proven.", "Zwei Rückkehrquoten nebeneinander machen aus „die Anrufe scheinen zu helfen“ eine Zahl. Riefen die Account Owner aber vor allem die Kunden an, die sie am besten kannten, überschätzt der Abstand den Anruf: vielversprechend, nicht bewiesen.") },
  ],
  insight: (v: { yearly: number; rate: number; other: number; extra: number; order: number; base: number }) =>
    tt(
      `${num(v.yearly)} lost customers × (${pct(v.rate)} − ${pct(v.other)}) × ${euro(v.order)} = ${euro(v.extra)} extra a year if every one of them were called. Only the difference counts: customers who got the e-mail would have returned ${pct(v.other)} anyway. ${v.yearly === v.base ? `At ${num(v.base)} lost customers the example gives ${euro(v.extra)}.` : `More lost customers use the same lift more often: ${v.yearly > v.base ? "more" : "less"} extra revenue.`}`,
      `${num(v.yearly)} verlorene Kunden × (${pct(v.rate)} − ${pct(v.other)}) × ${euro(v.order)} = ${euro(v.extra)} zusätzlich pro Jahr, wenn jeder von ihnen angerufen würde. Nur der Unterschied zählt: Kunden mit der E-Mail wären ohnehin zu ${pct(v.other)} zurückgekehrt. ${v.yearly === v.base ? `Bei ${num(v.base)} verlorenen Kunden ergibt das Beispiel ${euro(v.extra)}.` : `Mehr verlorene Kunden nutzen denselben Lift öfter: ${v.yearly > v.base ? "mehr" : "weniger"} zusätzlicher Umsatz.`}`,
    ),
  footnote: t("Illustration on Isar Hosting (Case assumption). The extra revenue is the yearly value of a returned customer, times how many more return.", "Illustration mit Isar Hosting (Fallannahme). Der zusätzliche Umsatz ist der Jahreswert eines zurückgekehrten Kunden, mal wie viele mehr zurückkehren."),
});

/* ------------------------------------------------------------------ A5 · four families of return signal */

const KIND_DE = { contact: "ein Kontakt-Signal", visits: "ein Signal aus Besuchen und Logins", money: "eine Preis- oder Angebotsfrage", voice: "ein Signal aus dem, was sie sagen" } as const;
export const KPI_TREE: TreeCfg = bi({
  point: t(
    "Return signals come in four families: contact with us, visits and logins, price and offer questions, and what they say. The ones that come from a former customer's people dealing with ours went with coming back most; the ones that need the customer to speak went with it least.",
    "Rückkehr-Signale gibt es in vier Familien: Kontakt mit uns, Besuche und Logins, Preis- und Angebotsfragen, und was sie sagen. Die, bei denen die Leute eines früheren Kunden mit unseren umgehen, gingen am stärksten mit der Rückkehr einher; die, bei denen der Kunde sprechen muss, am schwächsten.",
  ),
  aria: t("Isar Hosting's return signals in four families", "Die Rückkehr-Signale von Isar Hosting in vier Familien"),
  kinds: [
    { id: "contact", label: t("Contact with us", "Kontakt mit uns") },
    { id: "visits", label: t("Visits and logins", "Besuche und Logins") },
    { id: "money", label: t("Price and offer questions", "Preis- und Angebotsfragen") },
    { id: "voice", label: t("What they say", "Was sie sagen") },
  ],
  kindLabel: { contact: t("Contact with us", "Kontakt mit uns"), visits: t("Visits and logins", "Besuche und Logins"), money: t("Price and offer questions", "Preis- und Angebotsfragen"), voice: t("What they say", "Was sie sagen") },
  initial: "reply",
  metrics: [
    { id: "reply", name: t("Check-in messages answered within a week", "Innerhalb einer Woche beantwortete Check-in-Nachrichten"), kind: "contact", moved: true, why: t("It shows whether the former customer's people still answer ours; it appears only if the answers are logged.", "Es zeigt, ob die Leute des früheren Kunden unseren noch antworten; es erscheint nur, wenn die Antworten festgehalten werden.") },
    { id: "event", name: t("Invitations to a customer event accepted", "Angenommene Einladungen zu einer Kundenveranstaltung"), kind: "contact", moved: true, why: t("Saying yes to a meeting is a former customer's people dealing with ours.", "Ja zu einem Treffen zu sagen heißt, dass die Leute eines früheren Kunden mit unseren umgehen.") },
    { id: "notes", name: t("Visits to the release-notes page, twice or more in a month", "Besuche der Release-Notes-Seite, zweimal oder öfter in einem Monat"), kind: "visits", moved: true, why: t("The website counts it by itself, so nobody has to write it down.", "Die Website zählt es selbst, also muss es niemand aufschreiben.") },
    { id: "opens", name: t("Opens of the monthly product e-mail", "Öffnungen der monatlichen Produkt-E-Mail"), kind: "visits", moved: false, why: t("The e-mail system counts it, but many opens are habit or an automatic preview, so it did not go with coming back.", "Das E-Mail-System zählt es, aber viele Öffnungen sind Gewohnheit oder eine automatische Vorschau, also ging es nicht mit der Rückkehr einher.") },
    { id: "quote", name: t("Requests for a quote for a scope like the old contract", "Anfragen nach einem Angebot für einen Umfang wie den alten Vertrag"), kind: "money", moved: true, why: t("A request about money and scope: it shows the customer weighing a way back.", "Eine Anfrage zu Geld und Umfang: Sie zeigt, dass der Kunde einen Weg zurück abwägt.") },
    { id: "score", name: t("Exit survey score", "Wert der Abschlussumfrage"), kind: "voice", moved: false, why: t("What the customer says when asked: only 20% answer, mostly politely, so it did not go with coming back.", "Was der Kunde sagt, wenn er gefragt wird: Nur 20 % antworten, meist höflich, also ging es nicht mit der Rückkehr einher.") },
  ],
  steps: [
    { title: t("A sign a person logs", "Ein Zeichen, das eine Person festhält"), say: t("Isar Hosting is an example company, not your case. A former customer's contact answers the owner's check-in message within a week. It takes a person to log it, and it went with coming back last year: the strongest thing to watch.", "Isar Hosting ist ein Beispielunternehmen, nicht Ihr Fall. Ein Kontakt eines früheren Kunden antwortet innerhalb einer Woche auf die Check-in-Nachricht des Owners. Es braucht eine Person, die es festhält, und es ging letztes Jahr mit der Rückkehr einher: das Stärkste, worauf man schaut."), look: t("the first box, top left, and “went with coming back”", "der erste Kasten oben links und „mit der Rückkehr einhergegangen“"), sel: "reply" },
    { title: t("A sign that waits for the customer", "Ein Zeichen, das auf den Kunden wartet"), say: t("The exit survey score is what the customer says when asked. Only 20% answer, mostly politely: it did not go with coming back. It is a conversation, not a signal to act on.", "Der Wert der Abschlussumfrage ist, was der Kunde sagt, wenn er gefragt wird. Nur 20 % antworten, meist höflich: Er ging nicht mit der Rückkehr einher. Er ist ein Gespräch, kein Signal, auf das man handelt."), look: t("the box bottom right", "der Kasten unten rechts"), sel: "score" },
    { title: t("The point", "Das Wichtigste"), say: t("Watch first how former customers deal with your people and your offers, add what the systems count, and treat what they say as a conversation. Even a counted sign can mislead. Choose any signal.", "Beobachten Sie zuerst, wie frühere Kunden mit Ihren Leuten und Ihren Angeboten umgehen, nehmen Sie dazu, was die Systeme zählen, und behandeln Sie, was sie sagen, als Gespräch. Auch ein gezähltes Zeichen kann täuschen. Wählen Sie ein beliebiges Signal."), look: t("the visits family: one went with coming back, one did not", "die Besuche-Familie: eines ging mit der Rückkehr einher, eines nicht"), sel: "opens" },
  ],
  labels: {
    moved: t("● went with coming back", "● ging mit der Rückkehr einher"),
    notMoved: t("○ did not go with it", "○ ging nicht damit einher"),
    toggleMetric: t("Signal", "Signal"),
    toggleYear: t("Last year", "Letztes Jahr"),
    yearOn: t("Show whether it went with coming back last year", "Zeigen, ob es letztes Jahr mit der Rückkehr einherging"),
    yearOff: t("Hide last year", "Letztes Jahr verbergen"),
  },
  insightPast: (m: { name: string; kind: string; moved: boolean; why: string }) =>
    tt(
      `${m.name} → ${KPI_TREE.kindLabel[m.kind]}. ${m.why} Last year it ${m.moved ? "went" : "did not go"} with coming back. Both contact signals, the page visits and the quote request went with it; the e-mail opens and the survey score did not: the closer a sign is to what a former customer does with us, the stronger the link.`,
      `${m.name} ist ${KIND_DE[m.kind as keyof typeof KIND_DE]}: ${m.why} Letztes Jahr ${m.moved ? "ging es" : "ging es nicht"} mit der Rückkehr einher. Beide Kontakt-Signale, die Seitenbesuche und die Angebotsanfrage gingen damit einher; die E-Mail-Öffnungen und der Umfragewert nicht: Je näher ein Zeichen an dem ist, was ein früherer Kunde mit uns tut, desto stärker die Verbindung.`,
    ),
  insightNow: (m: { name: string; kind: string; why: string }) =>
    tt(`${m.name} → ${KPI_TREE.kindLabel[m.kind]}. ${m.why} Switch on “last year” to see which signals go with coming back.`, `${m.name} ist ${KIND_DE[m.kind as keyof typeof KIND_DE]}. ${m.why} Schalten Sie „letztes Jahr“ ein, um zu sehen, welche Signale mit der Rückkehr einhergehen.`),
});

/* ------------------------------------------------------------------ A6 · a fair test of a call after the fix */

export const FAIR: FairCfg = bi({
  point: t(
    "A test is fair when only one thing differs, chance decides who is in which group, both groups run in the same weeks, and the size is fixed in advance. Even then, a small test tells you less than it seems. And a good test is not the end: the best approach is tested again, kept, changed or stopped, month after month.",
    "Ein Test ist fair, wenn sich nur eine Sache unterscheidet, der Zufall entscheidet, wer in welcher Gruppe ist, beide Gruppen in denselben Wochen laufen und die Größe vorab feststeht. Selbst dann sagt ein kleiner Test weniger, als es scheint. Und ein guter Test ist nicht das Ende: Der beste Ansatz wird wieder getestet, behalten, geändert oder gestoppt, Monat für Monat.",
  ),
  aria: t("How sure the test is: the range of lifts the result is compatible with", "Wie sicher der Test ist: die Spanne der Lifts, mit denen das Ergebnis vereinbar ist"),
  rangeAria: t("How sure the test is: the range of lifts the result is compatible with", "Wie sicher der Test ist: die Spanne der Lifts, mit denen das Ergebnis vereinbar ist"),
  ratio: 1.5,
  groupA: t("Group A", "Gruppe A"),
  groupB: t("Group B", "Gruppe B"),
  runLabel: t("How Isar runs the test", "Wie Isar den Test durchführt"),
  flaws: [
    { id: "none", label: t("Fair test", "Fairer Test"), a: t("Lost customers who get the standard e-mail · random half · weeks 1–12", "Verlorene Kunden mit der Standard-E-Mail · zufällige Hälfte · Wochen 1–12"), b: t("Lost customers called after the fix · other half · weeks 1–12", "Verlorene Kunden, nach der Behebung angerufen · andere Hälfte · Wochen 1–12"), reading: t("One change, a random split, the same weeks, a size fixed in advance: a difference between the groups can be put down to the call.", "Eine Änderung, eine zufällige Aufteilung, dieselben Wochen, eine vorab festgelegte Größe: Ein Unterschied zwischen den Gruppen lässt sich dem Anruf zuschreiben.") },
    { id: "two", label: t("Three changes at once", "Drei Änderungen auf einmal"), a: t("Standard e-mail · random half", "Standard-E-Mail · zufällige Hälfte"), b: t("A call, a 25% discount and a free migration together · other half", "Ein Anruf, 25 % Rabatt und eine kostenlose Migration zusammen · andere Hälfte"), reading: t("The variant differs in three things. If it wins, nobody can say whether the call, the discount or the free move did it.", "Die Variante unterscheidet sich in drei Dingen. Gewinnt sie, kann niemand sagen, ob Anruf, Rabatt oder kostenloser Umzug es waren.") },
    { id: "time", label: t("Compared with last year", "Mit dem Vorjahr verglichen"), a: t("Last year's lost customers, standard e-mail · first year", "Die verlorenen Kunden des Vorjahres, Standard-E-Mail · erstes Jahr"), b: t("This year's lost customers, called · second year", "Die verlorenen Kunden dieses Jahres, angerufen · zweites Jahr"), reading: t("The groups are different years. A competitor's price change, the economy or a different mix of reasons can explain the difference. Comparing years is reading a trend, not testing a cause.", "Die Gruppen sind verschiedene Jahre. Eine Preisänderung eines Wettbewerbers, die Konjunktur oder eine andere Mischung von Gründen können den Unterschied erklären. Jahre zu vergleichen heißt einen Trend lesen, nicht eine Ursache testen.") },
    { id: "peek", label: t("Stopped when ahead on the dashboard", "Gestoppt, sobald im Dashboard vorn"), a: t("Standard e-mail · random half · stopped after week 2", "Standard-E-Mail · zufällige Hälfte · nach Woche 2 gestoppt"), b: t("Called · other half · stopped after week 2", "Angerufen · andere Hälfte · nach Woche 2 gestoppt"), reading: t("A return rate swings with every customer. Stopping at the first lead picks a lucky moment, and customers who decide in week 8 are left out.", "Eine Rückkehrquote schwankt mit jedem Kunden. Beim ersten Vorsprung zu stoppen, wählt einen glücklichen Moment, und Kunden, die sich in Woche 8 entscheiden, fehlen.") },
  ],
  steps: [
    { title: t("A fair test", "Ein fairer Test"), say: () => tt("Isar Hosting is an example company, not your case. A fair test is like a race: same track, same start, one runner changed. Isar calls a random half of its lost customers whose reason is fixed, in the same weeks.", "Isar Hosting ist ein Beispielunternehmen, nicht Ihr Fall. Ein fairer Test ist wie ein Rennen: dieselbe Bahn, derselbe Start, ein Läufer ausgetauscht. Isar ruft eine zufällige Hälfte seiner verlorenen Kunden an, deren Grund behoben ist, in denselben Wochen."), look: t("Group A and Group B: only the call differs", "Gruppe A und Gruppe B: Nur der Anruf unterscheidet sich"), flaw: "none", conv: 30, spot: null },
    { title: t("An unfair test", "Ein unfairer Test"), say: () => tt("Now the variant gets a call, a 25% discount and a free migration together. If it wins, nobody knows which of the three did it.", "Jetzt bekommt die Variante einen Anruf, 25 % Rabatt und eine kostenlose Migration zusammen. Gewinnt sie, weiß niemand, was von den dreien es war."), look: t("the dashed amber Group B box", "der gestrichelte bernsteinfarbene Kasten von Gruppe B"), flaw: "two", conv: 30, spot: "b" },
    { title: t("The point", "Das Wichtigste"), say: (lo: number) => tt(`Even a fair test says less than it seems on few results: with 30 returned customers per group, the same 1.5× could be ${num(lo)}×, which is no gain. Move the slider to 100.`, `Selbst ein fairer Test sagt bei wenigen Ergebnissen weniger, als es scheint: Mit 30 zurückgekehrten Kunden pro Gruppe könnte dasselbe 1,5× ${num(lo)}× sein, also kein Gewinn. Bewegen Sie den Regler auf 100.`), look: t("the hatched bar crossing the dashed 1× line", "der schraffierte Balken, der die gestrichelte 1×-Linie kreuzt"), flaw: "none", conv: 30, spot: "range" },
  ],
  noDiff: t("1× = no difference", "1× = kein Unterschied"),
  slider: (conv: number) => tt(`Returned customers in the group with the e-mail: ${conv} (the called group has 1.5 times as many)`, `Zurückgekehrte Kunden in der Gruppe mit der E-Mail: ${conv} (die angerufene Gruppe hat 1,5-mal so viele)`),
  measured: (lo: number, hi: number) => tt(`measured: 1.5× · plausible range ${num(lo)}× to ${num(hi)}×`, `gemessen: 1,5× · plausible Spanne ${num(lo)}× bis ${num(hi)}×`),
  proven: (conv: number, lo: number, hi: number) =>
    tt(`With ${conv} returned customers per group, even the low end of the range (${num(lo)}×) is above “no difference”: the lift is real, though its size is still uncertain (up to ${num(hi)}×). Around 100 per group is where a 1.5× result becomes solid.`, `Mit ${conv} zurückgekehrten Kunden pro Gruppe liegt selbst das untere Ende der Spanne (${num(lo)}×) über „kein Unterschied“: Der Lift ist echt, auch wenn seine Größe noch unsicher ist (bis ${num(hi)}×). Um 100 pro Gruppe wird ein Ergebnis von 1,5× belastbar.`),
  open: (conv: number, lo: number, hi: number) =>
    tt(`With ${conv} returned customers per group, the same 1.5× could be anything from ${num(lo)}× to ${num(hi)}×, and the range still includes “no difference” (hatched). Promising, not proven: keep the test running, however good the dashboard looks.`, `Mit ${conv} zurückgekehrten Kunden pro Gruppe könnte dasselbe 1,5× alles zwischen ${num(lo)}× und ${num(hi)}× sein, und die Spanne schließt „kein Unterschied“ noch ein (schraffiert). Vielversprechend, nicht bewiesen: Lassen Sie den Test weiterlaufen, egal wie gut das Dashboard aussieht.`),
  footnote: t("Illustration on Isar Hosting (Case assumption). The range is a standard approximation, shown so the effect of the sample size is visible; the task never asks you to compute it.", "Illustration mit Isar Hosting (Fallannahme). Die Spanne ist eine übliche Näherung, gezeigt, damit die Wirkung der Stichprobengröße sichtbar wird; die Aufgabe verlangt nie, sie zu berechnen."),
});

/* ------------------------------------------------------------------ A7 · scoring: Isar's three measures */

export const SCORE: ScoreCfg = bi({
  point: t(
    "Score a measure on three questions: does it aim at customers worth winning back, does it really change the reason, and does it keep working after the budget is spent? The three scores are multiplied, so one weak answer lowers the whole.",
    "Bewerten Sie eine Maßnahme nach drei Fragen: Zielt sie auf Kunden, die sich zurückzugewinnen lohnen, ändert sie wirklich den Grund, und wirkt sie weiter, wenn das Budget ausgegeben ist? Die drei Werte werden multipliziert, also senkt eine schwache Antwort das Ganze.",
  ),
  aria: t("Isar's three measures scored: economic viability × effect × sustainability", "Die drei Maßnahmen von Isar bewertet: Wirtschaftlichkeit × Wirkung × Nachhaltigkeit"),
  toggleLabel: t("Measure", "Maßnahme"),
  initial: "call",
  measures: [
    { id: "call", name: t("A personal call from the former account owner after the fix", "Ein persönlicher Anruf des früheren Account Owners nach der Behebung"), cost: 38000, joins: "all", i: 3 as const, eff: 3 as const, fea: 3 as const, note: t("It goes only to customers whose reason can be fixed, answers the reason itself and runs on the account owners Isar already has.", "Er geht nur an Kunden, deren Grund sich beheben lässt, beantwortet den Grund selbst und läuft mit den Account Ownern, die Isar schon hat.") },
    { id: "mailing", name: t("A monthly “we miss you” e-mail to every lost customer", "Eine monatliche „Wir vermissen Sie“-E-Mail an jeden verlorenen Kunden"), cost: 20000, joins: "none", i: 1 as const, eff: 1 as const, fea: 3 as const, note: t("It is cheap and runs by itself, but it aims at every lost customer and repeats a friendly message that fixes no reason.", "Sie ist billig und läuft von selbst, zielt aber auf jeden verlorenen Kunden und wiederholt eine freundliche Botschaft, die keinen Grund behebt.") },
    { id: "discount", name: t("A 20% discount for every lost customer who returns", "Ein Rabatt von 20 % für jeden verlorenen Kunden, der zurückkehrt"), cost: 60000, joins: "none", i: 1 as const, eff: 1 as const, fea: 1 as const, note: t("It aims at everyone, buys the return without changing the reason, and the discount is given away again every year.", "Er zielt auf alle, erkauft die Rückkehr, ohne den Grund zu ändern, und der Rabatt wird jedes Jahr wieder verschenkt.") },
  ],
  steps: [
    { title: t("Strong on all three", "Stark in allen dreien"), say: (s: Record<string, number>) => tt(`Isar Hosting is an example company, not your case. The personal call scores ${s.call}: it goes only to customers whose reason can be fixed, answers the reason itself and is easy to keep going.`, `Isar Hosting ist ein Beispielunternehmen, nicht Ihr Fall. Der persönliche Anruf erzielt ${s.call}: Er geht nur an Kunden, deren Grund sich beheben lässt, beantwortet den Grund selbst und lässt sich leicht am Laufen halten.`), look: t("the longest bar", "der längste Balken"), sel: "call" },
    { title: t("One weak factor", "Ein schwacher Faktor"), say: (s: Record<string, number>) => tt(`The discount for everyone scores only ${s.discount}: it aims at every lost customer and does not change why they left. One weak factor pulls the product down.`, `Der Rabatt für alle erzielt nur ${s.discount}: Er zielt auf jeden verlorenen Kunden und ändert nicht, warum sie gingen. Ein schwacher Faktor zieht das Produkt herunter.`), look: t("the short bar, and its three parts in “What this shows”", "der kurze Balken und seine drei Teile in „Was das zeigt“"), sel: "discount" },
    { title: t("The point", "Das Wichtigste"), say: () => tt("Multiply economic viability, effect and sustainability. Economic viability is read from who the measure aims at, never guessed. Choose a measure to read its three parts.", "Multiplizieren Sie Wirtschaftlichkeit, Wirkung und Nachhaltigkeit. Die Wirtschaftlichkeit wird daraus gelesen, worauf die Maßnahme zielt, nie geschätzt. Wählen Sie eine Maßnahme, um ihre drei Teile zu lesen."), look: t("the mailing: cheap and easy, but aimed at everyone", "das Mailing: billig und leicht, aber auf alle gerichtet"), sel: "mailing" },
  ],
  insight: (m: { name: string; cost: number; joins: string; i: number; eff: number; fea: number; note: string }, score: number) =>
    tt(
      `${m.name} (${euro(m.cost)}, aims at ${JOINS_LABEL[m.joins as Joins]}): economic viability ${m.i} × effect ${m.eff} × sustainability ${m.fea} = ${score}. ${m.note}`,
      `${m.name} (${euro(m.cost)}, zielt auf ${JOINS_LABEL[m.joins as Joins]}): Wirtschaftlichkeit ${m.i} × Wirkung ${m.eff} × Nachhaltigkeit ${m.fea} = ${score}. ${m.note}`,
    ),
});

/* ------------------------------------------------------------------ B1 · four stages towards a retention and win-back system */

export const STAGES: StagesCfg = bi({
  point: t(
    "A retention and win-back system is not a pile of mailings. It is one list of lost customers every team reads, one rulebook with owners, and approaches that are tested every month against who really returned.",
    "Ein Retention- und Win-back-System ist keine Ansammlung von Mailings. Es ist eine Liste verlorener Kunden, die jedes Team liest, ein Regelwerk mit Ownern, und Ansätze, die jeden Monat gegen die geprüft werden, die wirklich zurückkamen.",
  ),
  aria: t("Four stages towards a retention and win-back system", "Vier Stufen zu einem Retention- und Win-back-System"),
  caption: t("from mailing everyone → to one list → to one rulebook → to approaches that learn", "vom Mailing an alle → zu einer Liste → zu einem Regelwerk → zu Ansätzen, die lernen"),
  company: "Neckar Systemhaus",
  toggleLabel: t("Stage", "Stufe"),
  initial: "profile",
  stages: [
    { id: "side", name: t("Mailing everyone", "Mailing an alle"), spree: t("Reasons sit in exit notes, values in the contract system and results in a manager's mailbox. One discount e-mail goes to every customer who left, and nobody knows who came back because of it.", "Gründe liegen in Abschlussnotizen, Werte im Vertragssystem und Ergebnisse im Postfach eines Managers. Eine Rabatt-E-Mail geht an jeden Kunden, der ging, und niemand weiß, wer deswegen zurückkam."), reading: t("Every return is luck, and each team has a reason why the result was not theirs to read.", "Jede Rückkehr ist Glück, und jedes Team hat einen Grund, warum das Ergebnis nicht seine Sache war.") },
    { id: "profile", name: t("One list of lost customers", "Eine Liste verlorener Kunden"), spree: t("Every lost customer is on one list with the reason, the contract value and an owner, and the three rates sit on one page.", "Jeder verlorene Kunde steht in einer Liste mit dem Grund, dem Vertragswert und einem Owner, und die drei Quoten stehen auf einer Seite."), reading: t("Every team now sees the same lost customer; what to do about the reason is still left to chance.", "Jedes Team sieht jetzt denselben verlorenen Kunden; was gegen den Grund zu tun ist, bleibt noch dem Zufall überlassen.") },
    { id: "rules", name: t("One rulebook with owners", "Ein Regelwerk mit Ownern"), spree: t("One page says which reason triggers which approach, who owns it, who calls within five working days and what is logged afterwards.", "Eine Seite sagt, welcher Grund welchen Ansatz auslöst, wer ihn besitzt, wer innerhalb von fünf Arbeitstagen anruft und was danach festgehalten wird."), reading: t("An approach is used, not noticed and forgotten. This is where separate mailings become one system.", "Ein Ansatz wird genutzt, nicht bemerkt und vergessen. Hier werden aus getrennten Mailings ein System.") },
    { id: "game", name: t("Approaches that learn", "Ansätze, die lernen"), spree: t("Every new offer goes to a random half first; every month the same few numbers show how many approached customers returned and how many of the control group did, and each approach is kept, changed or stopped.", "Jedes neue Angebot geht zuerst an eine zufällige Hälfte; jeden Monat zeigen dieselben wenigen Zahlen, wie viele angesprochene Kunden zurückkamen und wie viele aus der Kontrollgruppe, und jeder Ansatz wird behalten, geändert oder gestoppt."), reading: t("The system improves month by month, and each approach has to earn its place.", "Das System wird Monat für Monat besser, und jeder Ansatz muss sich seinen Platz verdienen.") },
  ],
  steps: [
    { title: t("Approaches that learn", "Ansätze, die lernen"), say: t("Neckar Systemhaus is an example company, not your case. Every new offer goes to a random half first, and every month the same numbers decide which approach is kept.", "Neckar Systemhaus ist ein Beispielunternehmen, nicht Ihr Fall. Jedes neue Angebot geht zuerst an eine zufällige Hälfte, und jeden Monat entscheiden dieselben Zahlen, welcher Ansatz bleibt."), look: t("the last, tallest bar", "der letzte, höchste Balken"), stage: "game" },
    { title: t("Mailing everyone", "Mailing an alle"), say: t("Before that, reasons, values and results each lived in their own place. One discount mail went to everyone, and nobody knew who came back because of it.", "Davor lagen Gründe, Werte und Ergebnisse je an ihrem eigenen Ort. Eine Rabatt-Mail ging an alle, und niemand wusste, wer deswegen zurückkam."), look: t("the first, shortest bar", "der erste, niedrigste Balken"), stage: "side" },
    { title: t("The point", "Das Wichtigste"), say: t("The jump from separate mailings to a system is one list of lost customers that every team reads and writes. Try the four stages.", "Der Sprung von getrennten Mailings zu einem System ist eine Liste verlorener Kunden, die jedes Team liest und schreibt. Probieren Sie die vier Stufen."), look: t("the second bar", "der zweite Balken"), stage: "profile" },
  ],
});

/* ------------------------------------------------------------------ B2 · the source first, then the tool */

export const SOURCE_MAP: MapCfg = bi({
  point: t(
    "Start from what the customer decides through a source, not from the tool. A source through which the customer decides and whose data is complete is used now; with data not complete it waits; where the customer decides nothing it is not central, however complete.",
    "Gehen Sie von dem aus, was der Kunde über eine Quelle entscheidet, nicht vom Werkzeug. Eine Quelle, über die der Kunde etwas entscheidet und deren Daten vollständig sind, wird jetzt genutzt; mit nicht vollständigen Daten wartet sie; wo der Kunde nichts entscheidet, ist sie nicht zentral, egal wie vollständig.",
  ),
  aria: t("Neckar Systemhaus's sources of evidence by what the customer decides and complete data", "Quellen von Evidenz von Neckar Systemhaus nach dem, was der Kunde entscheidet, und vollständigen Daten"),
  xTicks: [0, 20, 40, 60, 80, 100],
  xUnit: "%",
  xAxisLabel: t("share of its data that reaches the shared list of lost customers →", "Anteil seiner Daten, der die gemeinsame Liste verlorener Kunden erreicht →"),
  rows: [t("the customer decides something through it", "der Kunde entscheidet etwas darüber"), t("the customer decides nothing through it", "der Kunde entscheidet nichts darüber")],
  zones: [
    { x1: 0, x2: 80, r1: 0, r2: 0, kind: "soft", label: t("Central: improve the data first", "Zentral: zuerst die Daten verbessern"), lx: 40, lr: 0, color: "amber" },
    { x1: 80, x2: 100, r1: 0, r2: 0, kind: "teal", label: t("use now", "jetzt nutzen"), lx: 90, lr: 0, color: "teal" },
    { x1: 0, x2: 100, r1: 1, r2: 1, kind: "mist", label: t("Not central: the customer decides nothing here", "Nicht zentral: Der Kunde entscheidet hier nichts"), lx: 50, lr: 1, color: "ash" },
  ],
  items: [
    { id: "s1", name: t("Notes from exit calls", "Notizen aus Abschlussgesprächen"), x: 88, row: 0, square: false, glyph: "●", verdict: t("use now", "jetzt nutzen"), fact: t("88% complete · the customer decides to say what went wrong or stay silent", "88 % vollständig · der Kunde entscheidet, zu sagen, was schiefgelaufen ist, oder zu schweigen"), why: t("The customer decides what to tell us, and 88% of the notes reach the shared list. Central: use them now.", "Der Kunde entscheidet, was er uns sagt, und 88 % der Notizen erreichen die gemeinsame Liste. Zentral: jetzt nutzen.") },
    { id: "s2", name: t("Cancellation forms with the reason ticked", "Kündigungsformulare mit angekreuztem Grund"), x: 92, row: 0, square: false, glyph: "●", verdict: t("use now", "jetzt nutzen"), fact: t("92% complete · the customer decides to give a reason or just cancel", "92 % vollständig · der Kunde entscheidet, einen Grund zu nennen oder einfach zu kündigen"), why: t("A reason ticked on the way out is a decision in the customer's own words, and the data is complete: use now.", "Ein Grund, der beim Gehen angekreuzt wird, ist eine Entscheidung in den eigenen Worten des Kunden, und die Daten sind vollständig: jetzt nutzen.") },
    { id: "s3", name: t("Replies to the former owner's check-in message", "Antworten auf die Check-in-Nachricht des früheren Owners"), x: 50, row: 0, square: false, glyph: "◐", verdict: t("improve the data first", "zuerst die Daten verbessern"), fact: t("50% complete · the customer decides to keep talking or go quiet", "50 % vollständig · der Kunde entscheidet, im Gespräch zu bleiben oder zu verstummen"), why: t("Replies matter, but only 50% of them are logged. Built on now, an approach would learn the gaps. Improve the data first.", "Antworten sind wichtig, aber nur 50 % werden festgehalten. Jetzt darauf gebaut, würde ein Ansatz die Lücken lernen. Erst die Daten verbessern.") },
    { id: "s4", name: t("Newsletter opens by former customers", "Newsletter-Öffnungen früherer Kunden"), x: 75, row: 1, square: false, glyph: "○", verdict: t("not central", "nicht zentral"), fact: t("75% complete · the customer decides nothing through it", "75 % vollständig · der Kunde entscheidet nichts darüber"), why: t("75% complete, but nobody decides to return by opening a newsletter. A win-back built on it would aim at many who never meant to come back.", "75 % vollständig, aber niemand entscheidet über die Rückkehr, indem er einen Newsletter öffnet. Eine darauf gebaute Rückgewinnung würde viele treffen, die nie zurückwollten.") },
    { id: "s5", name: t("Supplier invoices", "Lieferantenrechnungen"), x: 98, row: 1, square: false, glyph: "○", verdict: t("not central", "nicht zentral"), fact: t("98% complete · the customer decides nothing through it", "98 % vollständig · der Kunde entscheidet nichts darüber"), why: t("The most complete data of all, but it has nothing to do with the lost customer. Not central, however complete.", "Die vollständigsten Daten von allen, aber sie haben mit dem verlorenen Kunden nichts zu tun. Nicht zentral, egal wie vollständig.") },
  ],
  steps: [
    { title: t("Use now", "Jetzt nutzen"), say: t("Neckar Systemhaus is an example company, not your case. The customer decides what to tell in an exit call and 88% of those notes are on the list: use now, and check it against who really returns.", "Neckar Systemhaus ist ein Beispielunternehmen, nicht Ihr Fall. Der Kunde entscheidet in einem Abschlussgespräch, was er erzählt, und 88 % dieser Notizen stehen in der Liste: jetzt nutzen und gegen die prüfen, die wirklich zurückkehren."), look: t("the dot in the teal area", "der Punkt im türkisen Feld"), item: "s1" },
    { title: t("Data first", "Erst die Daten"), say: t("Replies to the check-in message would help too, but only 50% of them are logged. Built on now, an approach would learn the gaps. Fix the logging first.", "Antworten auf die Check-in-Nachricht würden auch helfen, aber nur 50 % werden festgehalten. Jetzt darauf gebaut, würde ein Ansatz die Lücken lernen. Erst das Festhalten verbessern."), look: t("the dot in the amber area", "der Punkt im bernsteinfarbenen Feld"), item: "s3" },
    { title: t("The point", "Das Wichtigste"), say: t("Supplier invoices have 98% of the data complete, but the customer decides nothing there. However complete, not central. Try the other sources.", "Lieferantenrechnungen haben 98 % der Daten vollständig, aber der Kunde entscheidet dort nichts. Egal wie vollständig: nicht zentral. Probieren Sie die anderen Quellen."), look: t("the dot in the grey area", "der Punkt im grauen Feld"), item: "s5" },
  ],
  initial: "s3",
  toggleLabel: t("Sources", "Quellen"),
  legend: t("Illustration on Neckar Systemhaus (Case assumption). Top row: the customer decides something through the source; bottom row: nothing. Left to right: how much of its data reaches the shared list of lost customers.", "Illustration mit Neckar Systemhaus (Fallannahme). Obere Zeile: Der Kunde entscheidet etwas über die Quelle; untere Zeile: nichts. Von links nach rechts: wie viel seiner Daten die gemeinsame Liste verlorener Kunden erreicht."),
});

/* ------------------------------------------------------------------ B3 · four tests for a management KPI */

export const COMP_TESTS: CompCfg = bi({
  point: t(
    "A KPI worth steering by is linked to coming back, shows a change early, covers every approached customer and is counted by the systems. The printed facts cap each rating.",
    "Ein KPI, nach dem es sich zu steuern lohnt, ist mit der Rückkehr verbunden, zeigt früh eine Veränderung, deckt jeden angesprochenen Kunden ab und wird von den Systemen gezählt. Die gedruckten Fakten deckeln jede Bewertung.",
  ),
  aria: t("One KPI candidate of Neckar Systemhaus on four tests", "Ein KPI-Kandidat von Neckar Systemhaus nach vier Tests"),
  crits: [
    { id: "explain", name: t("Link to coming back", "Verbindung zur Rückkehr") },
    { id: "timely", name: t("Early", "Früh") },
    { id: "reach", name: t("Reach", "Reichweite") },
    { id: "scale", name: t("Measured automatically", "Automatisch gemessen") },
  ],
  levels: [t("Low", "Niedrig"), t("Mid", "Mittel"), t("High", "Hoch")],
  initial: "emails",
  toggleLabel: t("KPI candidate", "KPI-Kandidat"),
  factsLabel: t("Printed facts: ", "Gedruckte Fakten: "),
  comps: [
    { id: "winback", name: t("Win-back rate", "Win-back Rate"), facts: t("linked to coming back · weekly · every approached customer · counted by the systems", "mit der Rückkehr verbunden · wöchentlich · jeder angesprochene Kunde · von den Systemen gezählt"), r: { explain: 3, timely: 3, reach: 3, scale: 3 }, note: t("High on all four: it is the result the whole system exists for, it updates every week, it covers every approached customer and nobody has to collect it.", "Hoch auf allen vier: Es ist das Ergebnis, für das das ganze System da ist, es wird jede Woche aktualisiert, deckt jeden angesprochenen Kunden ab, und niemand muss es sammeln.") },
    { id: "survey", name: t("Yearly survey of returned customers", "Jährliche Befragung zurückgekehrter Kunden"), facts: t("linked to coming back · yearly · those who answer · by a survey", "mit der Rückkehr verbunden · jährlich · wer antwortet · über eine Befragung"), r: { explain: 3, timely: 1, reach: 2, scale: 2 }, note: t("Linked to returns, but once a year is too late to steer a four-month plan, and few returned customers answer.", "Mit der Rückkehr verbunden, aber einmal im Jahr ist zu spät, um einen Viermonatsplan zu steuern, und wenige zurückgekehrte Kunden antworten.") },
    { id: "emails", name: t("“We miss you” e-mails sent per month", "Pro Monat versendete „Wir vermissen Sie“-E-Mails"), facts: t("not linked to coming back · weekly · every customer on the list · counted by the systems", "nicht mit der Rückkehr verbunden · wöchentlich · jeder Kunde der Liste · von den Systemen gezählt"), r: { explain: 1, timely: 3, reach: 3, scale: 3 }, note: t("Easy to count, and it can double while returns do not move: it counts what Neckar sent, not what customers did.", "Leicht zu zählen, und er kann sich verdoppeln, während sich die Rückkehr nicht bewegt: Er zählt, was Neckar sendete, nicht was Kunden taten.") },
    { id: "stories", name: t("Account owners' monthly “won back” stories", "Monatliche „zurückgewonnen“-Geschichten der Account Owner"), facts: t("not linked to coming back · monthly · cases someone picks · collected by hand", "nicht mit der Rückkehr verbunden · monatlich · von jemandem ausgewählte Fälle · von Hand gesammelt"), r: { explain: 1, timely: 2, reach: 2, scale: 1 }, note: t("Each owner reports a favourite case, so the customers who stayed away never appear.", "Jeder Owner berichtet einen Lieblingsfall, also tauchen die Kunden, die wegblieben, nie auf.") },
  ],
  steps: [
    { title: t("A KPI that passes", "Ein KPI, der besteht"), say: t("Neckar Systemhaus is an example company, not your case. The win-back rate is linked to returns and counted every week for every approached customer by the systems: High on all four, 12 of 12.", "Neckar Systemhaus ist ein Beispielunternehmen, nicht Ihr Fall. Die Win-back Rate ist mit der Rückkehr verbunden und wird jede Woche für jeden angesprochenen Kunden von den Systemen gezählt: Hoch auf allen vier, 12 von 12."), look: t("all four rows filled to High", "alle vier Zeilen bis Hoch gefüllt"), sel: "winback", spot: null },
    { title: t("A number that does not", "Eine Zahl, die nicht besteht"), say: t("E-mails sent are easy to count, but they can double while returns do not move: sending more is not a better result. The link to coming back stays Low, whatever the rest.", "Versendete E-Mails sind leicht zu zählen, können sich aber verdoppeln, während sich die Rückkehr nicht bewegt: Mehr zu senden ist kein besseres Ergebnis. Die Verbindung zur Rückkehr bleibt Niedrig, egal wie der Rest ist."), look: t("the first row, Link to coming back", "die erste Zeile, Verbindung zur Rückkehr"), sel: "emails", spot: "explain" },
    { title: t("The point", "Das Wichtigste"), say: t("The yearly survey is linked to returns but arrives once a year, so it is Low on early: a number for learning, not for steering. Try the other candidates.", "Die jährliche Befragung ist mit der Rückkehr verbunden, kommt aber einmal im Jahr und ist daher bei „früh“ Niedrig: eine Zahl zum Lernen, nicht zum Steuern. Probieren Sie die anderen Kandidaten."), look: t("the second row, Early", "die zweite Zeile, Früh"), sel: "survey", spot: "timely" },
  ],
  insight: (c: { name: string; note: string }, total: number) =>
    tt(
      `${c.name}: ${total} of 12. ${c.note} Each rating is capped by a printed fact: “not linked to coming back” caps the link at Low; “after the customer has left” or “yearly” caps early at Low; “some customers” caps reach at Mid; “collected by hand” caps measured automatically at Low.`,
      `${c.name}: ${total} von 12. ${c.note} Jede Bewertung ist durch einen gedruckten Fakt gedeckelt: „nicht mit der Rückkehr verbunden“ deckelt die Verbindung bei Niedrig; „nachdem der Kunde gegangen ist“ oder „jährlich“ deckeln früh bei Niedrig; „einige Kunden“ deckelt die Reichweite bei Mittel; „von Hand gesammelt“ deckelt automatisch gemessen bei Niedrig.`,
    ),
});

/* ------------------------------------------------------------------ B4 · roll out, keep testing or stop */

export const LIFT: LiftCfg = bi({
  point: t(
    "Every test ends in a decision. A clear lift on enough approached customers: roll out. A strong lift on too few, or a small one: keep testing. No real lift: stop.",
    "Jeder Test endet in einer Entscheidung. Ein klarer Lift bei genug angesprochenen Kunden: ausrollen. Ein starker Lift bei zu wenigen oder ein kleiner: weiter testen. Kein echter Lift: stoppen.",
  ),
  aria: t("Roll out, keep testing or stop, by lift and approached customers per group", "Ausrollen, weiter testen oder stoppen, nach Lift und angesprochenen Kunden pro Gruppe"),
  actAt: LIFT_ACT,
  watchAt: LIFT_WATCH,
  casesMin: CASES_MIN,
  initial: { lift: 20, cases: 40 },
  steps: [
    { title: t("Roll out", "Ausrollen"), say: t("Neckar Systemhaus is an example company, not your case. A test of a personal call after the fix shows +30% on 200 approached customers per group: clear and proven. Roll out.", "Neckar Systemhaus ist ein Beispielunternehmen, nicht Ihr Fall. Ein Test eines persönlichen Anrufs nach der Behebung zeigt +30 % bei 200 angesprochenen Kunden pro Gruppe: klar und belegt. Ausrollen."), look: t("the dot in the teal area", "der Punkt im türkisen Feld"), lift: 30, cases: 200 },
    { title: t("Keep testing", "Weiter testen"), say: t(`Another test, a free move back, also shows +30%, but on only 40 approached customers per group, fewer than ${CASES_MIN}. Too few to trust it: keep testing.`, `Ein anderer Test, ein kostenloser Rückumzug, zeigt auch +30 %, aber nur bei 40 angesprochenen Kunden pro Gruppe, weniger als ${CASES_MIN}. Zu wenig, um ihm zu trauen: weiter testen.`), look: t("the dot in the left amber strip", "der Punkt im linken bernsteinfarbenen Streifen"), lift: 30, cases: 40 },
    { title: t("The point", "Das Wichtigste"), say: t("A third test, a “we miss you” banner on the portal login page, shows +2% on 300 approached customers. Many customers do not rescue a tiny lift: they prove it is tiny. Stop. Move the two sliders to try your own.", "Ein dritter Test, ein „Wir vermissen Sie“-Banner auf der Login-Seite des Portals, zeigt +2 % bei 300 angesprochenen Kunden. Viele Kunden retten keinen winzigen Lift: Sie beweisen, dass er winzig ist. Stoppen. Bewegen Sie die beiden Regler, um eigene Werte zu probieren."), look: t("the dot in the grey area", "der Punkt im grauen Feld"), lift: 2, cases: 300 },
  ],
  labels: {
    roll: t("roll out", "ausrollen"),
    keep: t("keep testing", "weiter testen"),
    stop: t("stop", "stoppen"),
    x: t("approached customers in the smaller group →", "angesprochene Kunden in der kleineren Gruppe →"),
    y: t("lift % →", "Lift % →"),
    lift: (l: number) => tt(`Lift over the control group: ${l > 0 ? "+" : ""}${l}%`, `Lift gegenüber der Kontrollgruppe: ${l > 0 ? "+" : ""}${l} %`),
    cases: (c: number) => tt(`Approached customers per group: ${c}`, `Angesprochene Kunden pro Gruppe: ${c}`),
  },
  read: {
    act: (l: number, c: number) => tt(`A lift of ${l}% on ${c} approached customers per group: clear and proven. Roll out, and hand it to the team that owns it.`, `Ein Lift von ${l} % bei ${c} angesprochenen Kunden pro Gruppe: klar und belegt. Ausrollen, und dem Team übergeben, dem es gehört.`),
    watchHigh: (l: number, c: number) => tt(`A lift of ${l}% looks strong, but ${c} approached customers are too few to trust it (fewer than ${CASES_MIN}). Keep testing; the data team runs it until the size is reached.`, `Ein Lift von ${l} % sieht stark aus, aber ${c} angesprochene Kunden sind zu wenig, um ihm zu trauen (weniger als ${CASES_MIN}). Weiter testen; das Datenteam lässt ihn laufen, bis die Größe erreicht ist.`),
    watchLow: (l: number) => tt(`A lift of ${l}%: a small difference. Not worth a rollout yet; keep testing a stronger variant.`, `Ein Lift von ${l} %: ein kleiner Unterschied. Noch keinen Rollout wert; eine stärkere Variante weiter testen.`),
    none: (l: number) => tt(`A lift of ${l}%: the variant does about as well as the control, or worse. Stop; running it on costs money and attention for nothing.`, `Ein Lift von ${l} %: Die Variante schneidet etwa so gut ab wie die Kontrolle, oder schlechter. Stoppen; sie weiterlaufen zu lassen kostet Geld und Aufmerksamkeit für nichts.`),
  },
});

/* ------------------------------------------------------------------ B5 · how a retention and win-back system is built */

export const ARCH_MINI: ArchMiniCfg = bi({
  point: t(
    "A win-back system is built in order: the base first (one list of lost customers and the KPIs), then the data, then the approaches. Where a link in that chain is missing, the approach above it cannot be trusted.",
    "Ein Win-back-System wird der Reihe nach gebaut: zuerst die Basis (eine Liste verlorener Kunden und die KPIs), dann die Daten, dann die Ansätze. Wo ein Glied dieser Kette fehlt, lässt sich dem Ansatz darüber nicht trauen.",
  ),
  aria: t("Neckar's reason-based approach and its base", "Der grundbasierte Ansatz von Neckar und seine Basis"),
  company: "Neckar Systemhaus",
  meet: t("What lost customers meet: a call from their former account owner", "Was verlorene Kunden erleben: ein Anruf ihres früheren Account Owners"),
  tool: {
    name: t("Reason-based approach reading the shared list", "Grundbasierter Ansatz, der die gemeinsame Liste liest"),
    startsFirst: t("Starts in month 1", "Startet in Monat 1"),
    startsAfter: t("Starts in month 1, before the base", "Startet in Monat 1, vor der Basis"),
    noBase: t("no shared list to read and nothing measures it yet", "noch keine gemeinsame Liste zum Lesen, und nichts misst ihn"),
    weak: (p: number) => tt(`its data is ${p}% complete, below 80%, when it starts`, `seine Daten sind zu ${p} % vollständig, unter 80 %, wenn er startet`),
  },
  base: { name: t("Scoreboard and list of lost customers", "Scoreboard und Liste verlorener Kunden"), first: t("Starts in month 1", "Startet in Monat 1"), after: t("Starts in month 3, after the approach", "Startet in Monat 3, nach dem Ansatz") },
  link: { ok: t("reads the shared list", "liest die gemeinsame Liste"), no: t("no shared list to read", "keine gemeinsame Liste zum Lesen") },
  data: {
    flow: t("raw data from every system flows up", "Rohdaten aus jedem System fließen nach oben"),
    lives: (p: number) => tt(`Where the data lives: CRM, contract system and exit survey, ${p}% of what the approach reads is complete`, `Wo die Daten liegen: CRM, Vertragssystem und Abschlussumfrage, ${p} % dessen, was der Ansatz liest, sind vollständig`),
  },
  levels: { ready: 90, weak: 75, bar: 80 },
  toggles: {
    heading: t("Two things to change", "Zwei Dinge zum Ändern"),
    baseLabel: t("The shared list starts", "Die gemeinsame Liste startet"),
    baseFirst: t("Before the approach", "Vor dem Ansatz"),
    baseAfter: t("After the approach", "Nach dem Ansatz"),
    dataLabel: t("Data behind the approach", "Daten hinter dem Ansatz"),
    dataReady: t("90% complete", "90 % vollständig"),
    dataWeak: t("75% complete", "75 % vollständig"),
  },
  steps: [
    { title: t("The base first", "Die Basis zuerst"), say: t("Neckar Systemhaus is an example company, not your case. It builds its list of lost customers and its scoreboard first, so its approach reads one lost customer and is measured from its first week.", "Neckar Systemhaus ist ein Beispielunternehmen, nicht Ihr Fall. Es baut zuerst seine Liste verlorener Kunden und sein Scoreboard, damit sein Ansatz einen verlorenen Kunden liest und ab der ersten Woche gemessen wird."), look: t("the solid teal link between the approach and the base", "die durchgezogene teal Verbindung zwischen Ansatz und Basis"), measFirst: true, ready: true },
    { title: t("The approach before the base", "Der Ansatz vor der Basis"), say: t("Now the approach starts first. It has no shared list to read and nothing measures it, so nobody can say whether it helps. Its link is dashed.", "Jetzt startet der Ansatz zuerst. Er hat keine gemeinsame Liste zum Lesen, und nichts misst ihn, also kann niemand sagen, ob er hilft. Seine Verbindung ist gestrichelt."), look: t("the dashed amber link and the note on the approach", "die gestrichelte amberfarbene Verbindung und der Vermerk am Ansatz"), measFirst: false, ready: true },
    { title: t("The point", "Das Wichtigste"), say: t("With the base first but data only 75% complete, the approach would learn the gaps. Base first, then an approach on complete data. Try the two buttons.", "Mit der Basis zuerst, aber Daten nur zu 75 % vollständig, würde der Ansatz die Lücken lernen. Zuerst die Basis, dann ein Ansatz auf vollständigen Daten. Probieren Sie die beiden Schaltflächen."), look: t("the data note under the approach", "den Datenvermerk unter dem Ansatz"), measFirst: true, ready: false },
  ],
  read: {
    good: t("The base exists before the approach and the approach runs on data that is complete. Neckar can say whether the approach helps, and its data does not teach it gaps. This is what a plan that holds looks like.", "Die Basis steht vor dem Ansatz, und der Ansatz läuft auf vollständigen Daten. Neckar kann sagen, ob der Ansatz hilft, und seine Daten lehren ihn keine Lücken. So sieht ein Plan aus, der hält."),
    noBase: t("The approach starts before the list it reads exists. Its link to the base is dashed: Neckar would pay for an approach and never know whether it works. The fix is the order: the list of lost customers and the scoreboard first.", "Der Ansatz startet, bevor die Liste existiert, die er liest. Seine Verbindung zur Basis ist gestrichelt: Neckar würde für einen Ansatz zahlen und nie wissen, ob er wirkt. Die Lösung ist die Reihenfolge: zuerst Liste verlorener Kunden und Scoreboard."),
    weakData: t("It reads the shared list, but its data is only 75% complete, below the 80% an approach should start on. It would learn the gaps. The fix is to complete the data first, or to hold the approach back until it is ready.", "Er liest die gemeinsame Liste, aber seine Daten sind nur zu 75 % vollständig, unter den 80 %, auf denen ein Ansatz starten sollte. Er würde die Lücken lernen. Die Lösung ist, zuerst die Daten zu vervollständigen oder den Ansatz zurückzuhalten, bis sie bereit sind."),
  },
});
