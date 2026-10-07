import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 1.2 (Optional, read-only: the rates are PRINTED, no figure is asked for, CLAUDE.md #44) and the worked example of Materi A4: what a
 * personal approach is worth. RecoverIT's lost customers last year whose reason it could fix, split by whether they got the standard discount e-mail or
 * a call from the former account owner after the reason was fixed (Case assumption). The method is
 *
 *   return rate                  = returned customers ÷ approached customers × 100
 *   lift (how many times)        = return rate with the call ÷ return rate with the e-mail
 *   extra revenue a year         = customers a year whose reason can be fixed × (rate with − rate without, as a share of one) × yearly value of one returned customer
 *
 * (Identifiers keep the names of the file this was built from: `control` = lost customers who got the standard e-mail, `variant` = lost customers who
 * got a call after the reason was fixed, `sent` = approached customers, `orders` = returned customers, `order` = yearly value of one returned customer.)
 * Results are rounded to two decimals.
 */
export const PILOT = {
  control: { sent: 200, orders: 10 },
  variant: { sent: 60, orders: 12 },
  yearly: 250,
  order: 9000,
};

const r2 = (x: number) => Math.round(x * 100) / 100;
export const rateOf = (orders: number, sent: number) => r2((orders / sent) * 100);
export const liftOf = (a: number, b: number) => r2(a / b);
export const extraOf = (yearly: number, variantRate: number, controlRate: number, order: number) => r2(yearly * ((variantRate - controlRate) / 100) * order);

export const FORECAST = {
  f1: rateOf(PILOT.variant.orders, PILOT.variant.sent),
  controlRate: rateOf(PILOT.control.orders, PILOT.control.sent),
  get f2() {
    return liftOf(this.f1, this.controlRate);
  },
  get f3() {
    return extraOf(PILOT.yearly, this.f1, this.controlRate, PILOT.order);
  },
};

/** The worked example of Materi A4: a different provider (Isar Hosting), the same method on other numbers. Case assumption. */
export const MOSEL = { control: { sent: 150, orders: 9 }, variant: { sent: 50, orders: 12 }, yearly: 90, order: 20000 };
export const MOSEL_RESULT = (() => {
  const rate = rateOf(MOSEL.variant.orders, MOSEL.variant.sent);
  const other = rateOf(MOSEL.control.orders, MOSEL.control.sent);
  return { rate, other, lift: liftOf(rate, other), extra: extraOf(MOSEL.yearly, rate, other, MOSEL.order) };
})();

/* ------------------------------------------------------------------ Block 1.3a · eight groups of lost customers */

/**
 * Eight groups of lost customers, by the reason they gave. (The type keeps the name "customer" of the file it was built from: `volume` = customers lost
 * a year in the group, `leave` = share of them who say they would consider coming back, `decision` = the reason is one RecoverIT can fix itself, so a
 * win-back has something to change, `known` = how much of what a win-back needs (who the customer is, the reason, the contract value) is already in
 * RecoverIT's list of lost customers.) The rule of Materi A1 and A3: a win-back pays most where the reason is fixable and a quarter or more would
 * consider coming back; it can run on data RecoverIT already has only where part or all of that record is connected.
 */
export type CustId = "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8";
export type Known = "none" | "part" | "all";
export const KNOWN_LABEL = bi({ none: t("Nothing: the reason and the contact are not in the list of lost customers", "Nichts: Grund und Ansprechpartner stehen nicht in der Liste verlorener Kunden"), part: t("Part of it: the reason or the contact is recorded for some, not for all", "Ein Teil: Grund oder Ansprechpartner sind für einige festgehalten, nicht für alle"), all: t("All of it: reason and contact are recorded for every customer in the group", "Alles: Grund und Ansprechpartner sind für jeden Kunden der Gruppe festgehalten") });
export const DECISION_LABEL = bi({ yes: t("Yes", "Ja"), no: t("No", "Nein") });
export type Customer = { id: CustId; name: string; volume: number; leave: number; decision: boolean; known: Known };
export const LEAVE_MIN = 25;
export const CUSTOMERS: Customer[] = bi([
  { id: "c1" as CustId, name: t("Left after an outage when nobody from RecoverIT called", "Nach einem Ausfall gegangen, bei dem niemand von RecoverIT anrief"), volume: 65, leave: 38, decision: true, known: "none" as Known },
  { id: "c2" as CustId, name: t("Left after repeated broken promises from the service desk", "Nach wiederholt gebrochenen Versprechen des Service Desks gegangen"), volume: 45, leave: 31, decision: true, known: "none" as Known },
  { id: "c3" as CustId, name: t("Left because the budget was frozen; they say they would return when it thaws", "Gegangen, weil das Budget eingefroren wurde; sie sagen, sie kämen zurück, wenn es auftaut"), volume: 30, leave: 60, decision: false, known: "none" as Known },
  { id: "c4" as CustId, name: t("Left for a competitor with a lower monthly fee on a three-year contract", "Zu einem Wettbewerber mit niedrigerer Monatsgebühr auf einen Dreijahresvertrag gewechselt"), volume: 90, leave: 8, decision: false, known: "all" as Known },
  { id: "c5" as CustId, name: t("Left because a function they needed was missing", "Gegangen, weil eine benötigte Funktion fehlte"), volume: 55, leave: 12, decision: true, known: "part" as Known },
  { id: "c6" as CustId, name: t("Left after the main contact moved on and the relationship went cold", "Gegangen, nachdem der Hauptansprechpartner wechselte und die Beziehung erkaltete"), volume: 85, leave: 22, decision: true, known: "none" as Known },
  { id: "c7" as CustId, name: t("Closed down, or taken over by a group with its own IT", "Geschlossen oder von einem Konzern mit eigener IT übernommen"), volume: 120, leave: 3, decision: false, known: "none" as Known },
  { id: "c8" as CustId, name: t("Left when the parent company ran a group tender; they would rejoin if RecoverIT wins it", "Gegangen, als die Muttergesellschaft eine Konzernausschreibung machte; sie kämen zurück, wenn RecoverIT sie gewinnt"), volume: 25, leave: 40, decision: false, known: "none" as Known },
]);
export const CUST_BY_ID = Object.fromEntries(CUSTOMERS.map((c) => [c.id, c])) as Record<CustId, Customer>;
export const PICK = 2;
export const AUTO_MIN_VOLUME = LEAVE_MIN;
/** A win-back pays most: the reason is fixable and 25% or more would consider coming back (Materi A1, A3). */
export const VALUABLE_TRUTH: CustId[] = ["c1", "c2"];
/** A win-back can run on data RecoverIT already has: part or all of the record of the group is connected (Materi A1, A3). */
export const CHURN_TRUTH: CustId[] = ["c4", "c5"];
export const PICK_WHY = bi({
  c1: t("The reason is one RecoverIT can fix (call after an outage) and 38% say they would consider coming back: a win-back here has something to change. The list does not record these customers yet, so nobody can approach them today. A group where a win-back pays most.", "Der Grund ist einer, den RecoverIT beheben kann (Anruf nach einem Ausfall), und 38 % sagen, sie würden eine Rückkehr erwägen: Eine Rückgewinnung hat hier etwas zu ändern. Die Liste erfasst diese Kunden noch nicht, also kann sie heute niemand ansprechen. Eine Gruppe, in der sich die Rückgewinnung am meisten lohnt."),
  c2: t("Broken promises are fixable by keeping promises, and 31% would consider coming back. Nothing records these customers today. A group where a win-back pays most.", "Gebrochene Versprechen lassen sich beheben, indem man Versprechen hält, und 31 % würden eine Rückkehr erwägen. Heute erfasst nichts diese Kunden. Eine Gruppe, in der sich die Rückgewinnung am meisten lohnt."),
  c3: t("60% would return, but the reason is a frozen budget and RecoverIT cannot change that. The step is to stay in touch and wait, not to run a win-back.", "60 % würden zurückkehren, aber der Grund ist ein eingefrorenes Budget, und das kann RecoverIT nicht ändern. Der Schritt ist, in Kontakt zu bleiben und zu warten, keine Rückgewinnung zu fahren."),
  c4: t("Reason and contact are recorded for every customer, so a win-back could run on data RecoverIT has. But only 8% would consider coming back and the customers are tied to a three-year contract, so it is not where a win-back pays most.", "Grund und Ansprechpartner sind für jeden Kunden festgehalten, also könnte eine Rückgewinnung auf Daten laufen, die RecoverIT hat. Aber nur 8 % würden eine Rückkehr erwägen, und die Kunden sind an einen Dreijahresvertrag gebunden; hier lohnt es sich nicht am meisten."),
  c5: t("Part of the record is connected, so a win-back can build on it. The function can be built, but only 12% would consider coming back, since they have already moved their setup. Data exists, but it is not where it pays most.", "Ein Teil des Datensatzes ist verbunden, also kann eine Rückgewinnung darauf aufbauen. Die Funktion lässt sich bauen, aber nur 12 % würden eine Rückkehr erwägen, da sie ihre Einrichtung schon umgezogen haben. Daten sind da, aber hier lohnt es sich nicht am meisten."),
  c6: t("The reason is fixable (introduce a new owner), but 22% is under the 25% line and nothing records these customers: a good second-wave group, not the first.", "Der Grund ist behebbar (einen neuen Betreuer vorstellen), aber 22 % liegen unter der 25-%-Linie, und nichts erfasst diese Kunden: eine gute Gruppe für die zweite Welle, nicht die erste."),
  c7: t("Almost nobody can return from here (3%); no approach changes a closure or a group decision. Not worth any effort.", "Von hier kann fast niemand zurückkehren (3 %); kein Ansatz ändert eine Schließung oder eine Konzernentscheidung. Keinen Aufwand wert."),
  c8: t("40% would rejoin, but only if RecoverIT wins a tender the group runs. That is a sales bid, not a win-back approach RecoverIT can start itself.", "40 % kämen zurück, aber nur, wenn RecoverIT eine Ausschreibung des Konzerns gewinnt. Das ist ein Vertriebsangebot, kein Rückgewinnungsansatz, den RecoverIT selbst starten kann."),
});

/* ------------------------------------------------------------------ Block 1.3b · three concrete win-back approaches */

/** The three motives to return (Materi A2); each approach the learner writes uses a different one. (The type keeps its earlier name, "basis".) */
export type Basis = "trust" | "switch" | "value";
export const BASES = bi([
  { id: "trust" as Basis, label: t("Rebuild trust", "Vertrauen wiederaufbauen"), short: t("Trust", "Vertrauen") },
  { id: "switch" as Basis, label: t("Lower the cost of coming back", "Die Rückkehr leichter machen"), short: t("Coming back", "Rückkehr") },
  { id: "value" as Basis, label: t("Add value or an incentive", "Nutzen oder einen Anreiz bieten"), short: t("Value", "Nutzen") },
]);
export const BASIS_LABEL = bi({ trust: t("Rebuild trust", "Vertrauen wiederaufbauen"), switch: t("Lower the cost of coming back", "Die Rückkehr leichter machen"), value: t("Add value or an incentive", "Nutzen oder einen Anreiz bieten") });
export const INSIGHT_COUNT = 3;
export const INSIGHT_MIN = 45;
export const INSIGHT_FRAME = bi({ v: t("[The group we approach] with [the step we take], so [why that gives them a reason to return].", "[Die Gruppe, die wir ansprechen] mit [dem Schritt, den wir tun], sodass [warum das ihnen einen Grund zur Rückkehr gibt].") });
/** True when the sentence says what the approach gives. A floor, not a judge of quality; English and German forms. */
export const hasSoWhat = (s: string) => /\b(so|therefore|which means|because|means|so that|thus|hence|daher|deshalb|weil|das heißt|bedeutet|sodass|damit|also)\b/i.test(s);
