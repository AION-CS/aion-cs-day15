import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 1.1 (Core, Level 1). Nine things RecoverIT's customer success team heard from customers who left (exit calls, exit surveys, account
 * notes). The learner tags each with what kind of reason it is (Materi A1): an emotional reason (how the customer felt treated: trust lost, promises
 * broken, nobody came to see it), a rational reason (a comparison the customer can write down: a lower price, a missing function, a simpler contract)
 * or a reason outside RecoverIT's reach (a takeover, a closure, a frozen budget: nothing RecoverIT does changes it). (The identifiers `LINES`, `LineId`
 * and `LevelTag` keep the names of the sort board this file was built from: a "line" is one statement, a "level tag" is the kind of reason.) `truth` is
 * never shown outside the mentor answer key.
 */
export type LevelTag = "emotional" | "rational" | "outside";
export const LEVEL_TAGS = bi([
  { id: "emotional" as LevelTag, label: t("Emotional", "Emotional"), hint: t("It is about how the customer felt treated: trust lost, promises broken, nobody came to see it. A lower price alone would not have kept the customer.", "Es geht darum, wie sich der Kunde behandelt fühlte: Vertrauen verloren, Versprechen gebrochen, niemand kam vorbei. Ein niedrigerer Preis allein hätte den Kunden nicht gehalten.") },
  { id: "rational" as LevelTag, label: t("Rational", "Rational"), hint: t("It is a comparison the customer can write down: a lower price, a missing function, a simpler contract. A better offer on that point could win the customer back.", "Es ist ein Vergleich, den der Kunde aufschreiben kann: ein niedrigerer Preis, eine fehlende Funktion, ein einfacherer Vertrag. Ein besseres Angebot an dieser Stelle könnte den Kunden zurückgewinnen.") },
  { id: "outside" as LevelTag, label: t("Outside our reach", "Außerhalb unseres Einflusses"), hint: t("A change RecoverIT could not influence: a takeover, a closure, a frozen budget. No approach changes it, so winning back is not worth the effort now.", "Eine Veränderung, auf die RecoverIT keinen Einfluss hatte: eine Übernahme, eine Schließung, ein eingefrorenes Budget. Kein Ansatz ändert sie, also lohnt die Rückgewinnung jetzt nicht.") },
]);
export const LEVEL_LABEL = bi({ emotional: t("Emotional", "Emotional"), rational: t("Rational", "Rational"), outside: t("Outside our reach", "Außerhalb unseres Einflusses") });

export type LineId = "l1" | "l2" | "l3" | "l4" | "l5" | "l6" | "l7" | "l8" | "l9";
export type Line = { id: LineId; text: string; source: string; truth: LevelTag; clue: string; why: string; rejected: Partial<Record<LevelTag, string>> };

export const LINES: Line[] = bi([
  {
    id: "l1" as LineId,
    source: t("Exit call", "Abschlussgespräch"),
    text: t("The managing director of a former customer says: “After the outage in March nobody from your side called us. We felt like a ticket number, and we stopped believing you would be there when it matters.”", "Der Geschäftsführer eines früheren Kunden sagt: „Nach dem Ausfall im März hat uns von Ihrer Seite niemand angerufen. Wir kamen uns vor wie eine Ticketnummer und glaubten nicht mehr, dass Sie da sind, wenn es darauf ankommt.“"),
    truth: "emotional" as LevelTag,
    clue: t("Would a lower price on its own have kept this customer, or is it about how the customer felt treated?", "Hätte ein niedrigerer Preis allein diesen Kunden gehalten, oder geht es darum, wie der Kunde sich behandelt fühlte?"),
    why: t("The reason is how the customer was treated after the outage: trust was lost. A better price would not have repaired it. Emotional.", "Der Grund ist, wie der Kunde nach dem Ausfall behandelt wurde: Das Vertrauen ging verloren. Ein besserer Preis hätte es nicht repariert. Emotional."),
    rejected: { rational: t("No price, function or contract is named. What the customer names is a feeling of being ignored.", "Es wird kein Preis, keine Funktion und kein Vertrag genannt. Der Kunde nennt das Gefühl, ignoriert worden zu sein.") },
  },
  {
    id: "l2" as LineId,
    source: t("Exit survey", "Abschlussumfrage"),
    text: t("A former customer wrote: “Your service desk promised a call back by Friday three times and never called. I am tired of chasing you.”", "Ein früherer Kunde schrieb: „Ihr Service Desk hat dreimal einen Rückruf bis Freitag versprochen und nie angerufen. Ich bin es leid, Ihnen hinterherzulaufen.“"),
    truth: "emotional" as LevelTag,
    clue: t("Is it about a gap that fits on a price list, or about promises that were not kept?", "Geht es um eine Lücke, die auf eine Preisliste passt, oder um Versprechen, die nicht gehalten wurden?"),
    why: t("Promises broken again and again are about trust and disappointment, not a comparison of offers. Emotional.", "Immer wieder gebrochene Versprechen betreffen Vertrauen und Enttäuschung, nicht einen Vergleich von Angeboten. Emotional."),
    rejected: { rational: t("Service could be read as a function, but the customer names being let down again and again, not a measurable gap. A discount would not repair a promise.", "Service ließe sich als Funktion lesen, aber der Kunde nennt, immer wieder enttäuscht worden zu sein, keine messbare Lücke. Ein Rabatt würde kein Versprechen reparieren.") },
  },
  {
    id: "l3" as LineId,
    source: t("Account notes", "Kontonotizen"),
    text: t("After the customer's IT lead left, the new IT lead said she had never been introduced to anyone at RecoverIT and saw no reason to keep a provider she did not know.", "Nachdem der IT-Leiter des Kunden gegangen war, sagte die neue IT-Leiterin, ihr sei bei RecoverIT nie jemand vorgestellt worden, und sie sehe keinen Grund, einen Anbieter zu behalten, den sie nicht kenne."),
    truth: "emotional" as LevelTag,
    clue: t("What did the new IT lead miss: a better offer, or a relationship?", "Was vermisste die neue IT-Leiterin: ein besseres Angebot oder eine Beziehung?"),
    why: t("The relationship was with her predecessor and nobody at RecoverIT built a new one. The customer left for want of a relationship. Emotional.", "Die Beziehung bestand zu ihrem Vorgänger, und niemand bei RecoverIT baute eine neue auf. Der Kunde ging aus Mangel an einer Beziehung. Emotional."),
    rejected: { outside: t("A change of staff looks like an event nobody could influence, but RecoverIT could have introduced itself to the new IT lead.", "Ein Personalwechsel sieht aus wie ein Ereignis, auf das niemand Einfluss hatte, aber RecoverIT hätte sich der neuen IT-Leiterin vorstellen können.") },
  },
  {
    id: "l4" as LineId,
    source: t("Sales", "Vertrieb"),
    text: t("The purchasing department of a former customer compared three offers and chose a provider whose monthly managed-service fee is 18% lower for the same scope.", "Die Einkaufsabteilung eines früheren Kunden verglich drei Angebote und wählte einen Anbieter, dessen monatliche Managed-Service-Gebühr bei gleichem Umfang 18 % niedriger ist."),
    truth: "rational" as LevelTag,
    clue: t("Is there a comparison that can be written down in numbers?", "Gibt es einen Vergleich, der sich in Zahlen aufschreiben lässt?"),
    why: t("A cheaper offer for the same scope is a rational comparison of cost and value. A better offer on price could win the customer back. Rational.", "Ein günstigeres Angebot für denselben Umfang ist ein rationaler Vergleich von Kosten und Nutzen. Ein besseres Angebot beim Preis könnte den Kunden zurückgewinnen. Rational."),
    rejected: { emotional: t("Nobody says they were unhappy with the people. The customer compared numbers.", "Niemand sagt, mit den Menschen unzufrieden gewesen zu sein. Der Kunde verglich Zahlen.") },
  },
  {
    id: "l5" as LineId,
    source: t("Exit survey", "Abschlussumfrage"),
    text: t("A former customer wrote: “Our new security policy requires monitoring for cloud workloads. Your service does not offer it; a competitor does.”", "Ein früherer Kunde schrieb: „Unsere neue Sicherheitsrichtlinie verlangt Überwachung für Cloud-Workloads. Ihr Service bietet das nicht an, ein Wettbewerber schon.“"),
    truth: "rational" as LevelTag,
    clue: t("Is it about a function the customer needs, or about how it felt?", "Geht es um eine Funktion, die der Kunde braucht, oder darum, wie es sich anfühlte?"),
    why: t("A missing function the customer now needs is a concrete gap. If RecoverIT closes it, the customer may return. Rational.", "Eine fehlende Funktion, die der Kunde jetzt braucht, ist eine konkrete Lücke. Schließt RecoverIT sie, kann der Kunde zurückkehren. Rational."),
    rejected: { outside: t("A new policy is a change on the customer's side, but it asks for something RecoverIT can build.", "Eine neue Richtlinie ist eine Veränderung auf Kundenseite, aber sie verlangt etwas, das RecoverIT bauen kann.") },
  },
  {
    id: "l6" as LineId,
    source: t("Account notes", "Kontonotizen"),
    text: t("A former customer moved to a vendor that bundles hardware, support and licences in one contract, and said that managing three contracts had cost its team too much time.", "Ein früherer Kunde wechselte zu einem Anbieter, der Hardware, Support und Lizenzen in einem Vertrag bündelt, und sagte, drei Verträge zu verwalten habe sein Team zu viel Zeit gekostet."),
    truth: "rational" as LevelTag,
    clue: t("What did the customer gain by switching: an advantage it can count, or a good feeling?", "Was gewann der Kunde durch den Wechsel: einen Vorteil, den er zählen kann, oder ein gutes Gefühl?"),
    why: t("A simpler contract that saves the customer's own time is a rational reason (effort and cost). RecoverIT could offer a bundle too. Rational.", "Ein einfacherer Vertrag, der dem Kunden eigene Zeit spart, ist ein rationaler Grund (Aufwand und Kosten). RecoverIT könnte auch ein Bündel anbieten. Rational."),
    rejected: { emotional: t("The customer does not say it was unhappy with RecoverIT's people. It names effort and cost.", "Der Kunde sagt nicht, mit den Leuten von RecoverIT unzufrieden gewesen zu sein. Er nennt Aufwand und Kosten.") },
  },
  {
    id: "l7" as LineId,
    source: t("Exit call", "Abschlussgespräch"),
    text: t("The customer was bought by a group whose IT is run centrally by the group's own provider; all subsidiaries must move by the end of the year.", "Der Kunde wurde von einem Konzern übernommen, dessen IT zentral vom konzerneigenen Anbieter betrieben wird; alle Tochterfirmen müssen bis Jahresende wechseln."),
    truth: "outside" as LevelTag,
    clue: t("Could anything RecoverIT did have changed the decision?", "Hätte irgendetwas, das RecoverIT tat, die Entscheidung ändern können?"),
    why: t("The decision was made at group level and the subsidiary has no choice. Nothing RecoverIT does changes it. Outside our reach.", "Die Entscheidung fiel auf Konzernebene, und die Tochter hat keine Wahl. Nichts, was RecoverIT tut, ändert sie. Außerhalb unseres Einflusses."),
    rejected: { rational: t("A group contract is a cost argument for the group, but the subsidiary cannot choose, so no offer would work.", "Ein Konzernvertrag ist ein Kostenargument für den Konzern, aber die Tochter kann nicht wählen, also würde kein Angebot wirken.") },
  },
  {
    id: "l8" as LineId,
    source: t("Customer success", "Customer Success"),
    text: t("A small design studio closed down after its owner retired; the owner thanked the team and said the service had always worked well.", "Ein kleines Designstudio schloss, nachdem sein Inhaber in den Ruhestand gegangen war; der Inhaber dankte dem Team und sagte, der Service habe immer gut funktioniert."),
    truth: "outside" as LevelTag,
    clue: t("Is there still a customer who could return?", "Gibt es noch einen Kunden, der zurückkehren könnte?"),
    why: t("The customer no longer exists, so there is nobody to win back. Outside our reach.", "Den Kunden gibt es nicht mehr, also ist niemand zurückzugewinnen. Außerhalb unseres Einflusses."),
    rejected: { emotional: t("The owner was happy with the service. The company simply ended.", "Der Inhaber war mit dem Service zufrieden. Die Firma endete einfach.") },
  },
  {
    id: "l9" as LineId,
    source: t("Account notes", "Kontonotizen"),
    text: t("A customer's budget was frozen by its regulator after an audit; it cut all external IT services for two years but says it would like to return.", "Das Budget eines Kunden wurde nach einer Prüfung von der Aufsichtsbehörde eingefroren; er strich alle externen IT-Dienste für zwei Jahre, sagt aber, er würde gern zurückkehren."),
    truth: "outside" as LevelTag,
    clue: t("Is the customer unhappy with us, or unable to pay?", "Ist der Kunde unzufrieden mit uns, oder kann er nicht zahlen?"),
    why: t("The reason is a frozen budget, which RecoverIT cannot change. The customer may return when it thaws, so the step is to stay in touch and wait, not to push an offer. Outside our reach.", "Der Grund ist ein eingefrorenes Budget, das RecoverIT nicht ändern kann. Der Kunde kann zurückkehren, wenn es auftaut; der Schritt ist also, in Kontakt zu bleiben und zu warten, nicht ein Angebot aufzudrängen. Außerhalb unseres Einflusses."),
    rejected: { rational: t("It looks like a cost reason, but no offer from RecoverIT changes a frozen budget.", "Es sieht nach einem Kostengrund aus, aber kein Angebot von RecoverIT ändert ein eingefrorenes Budget.") },
  },
]);
export const LINE_IDS: LineId[] = ["l1", "l2", "l3", "l4", "l5", "l6", "l7", "l8", "l9"];

/** The tests taught in Materi A1 for each kind of reason, and the pair tests. */
export const LEVEL_TESTS = bi([
  { name: t("Emotional", "Emotional"), test: t("Is the reason a feeling about how the customer was treated (trust lost, promises broken, nobody came to see it), so that a lower price alone would not have kept the customer?", "Ist der Grund ein Gefühl darüber, wie der Kunde behandelt wurde (Vertrauen verloren, Versprechen gebrochen, niemand kam vorbei), sodass ein niedrigerer Preis allein den Kunden nicht gehalten hätte?") },
  { name: t("Rational", "Rational"), test: t("Is the reason a comparison the customer can write down (a lower price, a missing function, a simpler contract), so that a better offer on that point could win the customer back?", "Ist der Grund ein Vergleich, den der Kunde aufschreiben kann (ein niedrigerer Preis, eine fehlende Funktion, ein einfacherer Vertrag), sodass ein besseres Angebot an dieser Stelle den Kunden zurückgewinnen könnte?") },
  { name: t("Outside our reach", "Außerhalb unseres Einflusses"), test: t("Was the reason a change RecoverIT could not influence (a takeover, a closure, a frozen budget)? Then no approach changes it, and winning back is not worth the effort now.", "War der Grund eine Veränderung, auf die RecoverIT keinen Einfluss hatte (eine Übernahme, eine Schließung, ein eingefrorenes Budget)? Dann ändert kein Ansatz sie, und die Rückgewinnung lohnt jetzt nicht.") },
  { name: t("Emotional or rational?", "Emotional oder rational?"), test: t("Ask: if RecoverIT had offered the same price and the same functions, would the customer still have gone? If yes, the reason is emotional. If a better offer would have kept it, the reason is rational. Many customers name both; sort by the one they name first.", "Fragen Sie: Hätte der Kunde auch bei gleichem Preis und gleichen Funktionen von RecoverIT gekündigt? Wenn ja, ist der Grund emotional. Wenn ein besseres Angebot ihn gehalten hätte, ist der Grund rational. Viele Kunden nennen beides; ordnen Sie nach dem zu, was sie zuerst nennen.") },
  { name: t("Rational or outside?", "Rational oder außerhalb?"), test: t("A rational reason is a choice the customer made between providers. An outside reason is a change that took the choice away: a takeover, a closure, a frozen budget.", "Ein rationaler Grund ist eine Wahl, die der Kunde zwischen Anbietern getroffen hat. Ein äußerer Grund ist eine Veränderung, die die Wahl genommen hat: eine Übernahme, eine Schließung, ein eingefrorenes Budget.") },
  { name: t("Emotional or outside?", "Emotional oder außerhalb?"), test: t("A change of staff or an outage can look like bad luck. If RecoverIT could have acted (introduced itself, called after the outage), the reason is emotional, not outside.", "Ein Personalwechsel oder ein Ausfall kann wie Pech aussehen. Hätte RecoverIT handeln können (sich vorstellen, nach dem Ausfall anrufen), ist der Grund emotional, nicht äußerlich.") },
]);

/** The decisive phrase inside each statement's own text, for "Highlight the key words" (never which kind it points to). */
export const LINE_KEY: Record<string, string> = bi({
  l1: t("nobody from your side called us. We felt like a ticket number", "niemand angerufen. Wir kamen uns vor wie eine Ticketnummer"),
  l2: t("promised a call back by Friday three times and never called", "dreimal einen Rückruf bis Freitag versprochen und nie angerufen"),
  l3: t("never been introduced to anyone at RecoverIT", "nie jemand vorgestellt worden"),
  l4: t("monthly managed-service fee is 18% lower for the same scope", "monatliche Managed-Service-Gebühr bei gleichem Umfang 18 % niedriger"),
  l5: t("requires monitoring for cloud workloads. Your service does not offer it", "verlangt Überwachung für Cloud-Workloads. Ihr Service bietet das nicht an"),
  l6: t("bundles hardware, support and licences in one contract", "Hardware, Support und Lizenzen in einem Vertrag bündelt"),
  l7: t("all subsidiaries must move by the end of the year", "alle Tochterfirmen müssen bis Jahresende wechseln"),
  l8: t("closed down after its owner retired", "schloss, nachdem sein Inhaber in den Ruhestand gegangen war"),
  l9: t("budget was frozen by its regulator", "wurde nach einer Prüfung von der Aufsichtsbehörde eingefroren"),
});
