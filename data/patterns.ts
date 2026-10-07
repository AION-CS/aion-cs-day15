import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Blocks 2.1–2.3. Four families of return signal (Materi A5) and twelve things RecoverIT could watch in customers who have already left, each
 * with whether it went with coming back last year; the A/B test card of Block 2.3 (Materi A6). (Identifiers keep the names of the file this was built
 * from: a "pattern" is a family of signal, a "record" is one signal, and the outcome "left" means "went with coming back": among the customers who
 * showed it, clearly more came back within a year than among those who did not.)
 * Every figure is a Case assumption. `truth` is never printed outside the mentor answer key. Counts are 3/3/3/3.
 */
export type PatternId = "contact" | "visits" | "money" | "voice";
export const PATTERN_IDS: PatternId[] = ["contact", "visits", "money", "voice"];

export const PATTERNS = bi({
  contact: {
    id: "contact" as PatternId,
    label: t("Contact with us", "Kontakt mit uns"),
    means: t("How a former customer's people deal with ours: answers to messages, calls accepted, invitations taken up. It shows only if someone notices and writes it down.", "Wie die Leute eines früheren Kunden mit unseren umgehen: Antworten auf Nachrichten, angenommene Gespräche, wahrgenommene Einladungen. Es zeigt sich nur, wenn jemand es bemerkt und aufschreibt."),
    shape: t("noted by people", "von Menschen festgehalten"),
    test: t("Is it about whether a former customer's people answer, accept or call?", "Geht es darum, ob die Leute eines früheren Kunden antworten, annehmen oder anrufen?"),
  },
  visits: {
    id: "visits" as PatternId,
    label: t("Visits and logins", "Besuche und Logins"),
    means: t("What a former customer's people do on our site, in our mails or in the old portal: page visits, mail opens, logins. The systems count it by themselves, so nobody has to write it down.", "Was die Leute eines früheren Kunden auf unserer Seite, in unseren Mails oder im alten Portal tun: Seitenbesuche, geöffnete Mails, Logins. Die Systeme zählen es selbst, also muss es niemand aufschreiben."),
    shape: t("counted by the systems", "von den Systemen gezählt"),
    test: t("Is it something a former customer's people do on our site, counted by a system?", "Ist es etwas, das die Leute eines früheren Kunden auf unserer Seite tun, gezählt von einem System?"),
  },
  money: {
    id: "money" as PatternId,
    label: t("Price and offer questions", "Preis- und Angebotsfragen"),
    means: t("How a former customer asks about money and scope: quotes, prices, a smaller scope. It shows when the customer weighs coming back against staying away.", "Wie ein früherer Kunde nach Geld und Umfang fragt: Angebote, Preise, ein kleinerer Umfang. Es zeigt sich, wenn der Kunde eine Rückkehr gegen das Wegbleiben abwägt."),
    shape: t("seen in sales and finance", "in Vertrieb und Finanzen sichtbar"),
    test: t("Is it about money, scope or an offer?", "Geht es um Geld, Umfang oder ein Angebot?"),
  },
  voice: {
    id: "voice" as PatternId,
    label: t("What they say", "Was sie sagen"),
    means: t("What a former customer says when asked or when annoyed: survey scores, reasons ticked, reviews. It arrives only when the customer chooses to speak, and it is often polite.", "Was ein früherer Kunde sagt, wenn er gefragt wird oder verärgert ist: Umfragewerte, angekreuzte Gründe, Bewertungen. Es kommt nur, wenn der Kunde sich zu sprechen entscheidet, und ist oft höflich."),
    shape: t("arrives when the customer speaks", "kommt, wenn der Kunde spricht"),
    test: t("Is it something the customer said, scored or wrote?", "Ist es etwas, das der Kunde gesagt, bewertet oder geschrieben hat?"),
  },
});

export const PATTERN_PAIR_TESTS = bi([
  { pair: t("Visits or contact?", "Besuche oder Kontakt?"), test: t("Visits are what a former customer's people do on our site, counted by a system. Contact is what they do with our people: an answer, a call, an event.", "Besuche sind das, was die Leute eines früheren Kunden auf unserer Seite tun, gezählt von einem System. Kontakt ist das, was sie mit unseren Leuten tun: eine Antwort, ein Gespräch, eine Veranstaltung.") },
  { pair: t("Price questions or what they say?", "Preisfragen oder was sie sagen?"), test: t("A request for a quote or a price for a smaller scope is a price and offer question: an action about money. A review, a score or a ticked reason is what they say: an opinion.", "Die Anfrage nach einem Angebot oder einem Preis für einen kleineren Umfang ist eine Preis- und Angebotsfrage: eine Handlung rund ums Geld. Eine Bewertung, ein Wert oder ein angekreuzter Grund ist, was sie sagen: eine Meinung.") },
  { pair: t("Contact or what they say?", "Kontakt oder was sie sagen?"), test: t("Contact is whether they answer or turn up at all. What they say is what they write or score when they do.", "Kontakt ist, ob sie überhaupt antworten oder erscheinen. Was sie sagen, ist das, was sie schreiben oder bewerten, wenn sie es tun.") },
]);

export type RecId = "p01" | "p02" | "p03" | "p04" | "p05" | "p06" | "p07" | "p08" | "p09" | "p10" | "p11" | "p12";
/** outcome "left" = went with coming back last year; "stayed" = did not go with it. */
export type Record_ = { id: RecId; code: string; text: string; outcome: "stayed" | "left"; truth: PatternId; clue: string; why: string; rejected: Partial<Record<PatternId, string>> };
export const OUTCOME_LABEL = bi({ stayed: t("Did not go with coming back", "Ging nicht mit der Rückkehr einher"), left: t("Went with coming back", "Ging mit der Rückkehr einher") });

export const RECORDS: Record_[] = bi([
  { id: "p01" as RecId, code: "R-01", outcome: "left" as const, text: t("Share of the former account owner's check-in messages that a former customer's contact answers within a week.", "Anteil der Check-in-Nachrichten des früheren Account Owners, die ein Kontakt eines früheren Kunden innerhalb einer Woche beantwortet."), truth: "contact" as PatternId, clue: t("Is it what a customer does on our site, or what its people do with ours?", "Ist es das, was ein Kunde auf unserer Seite tut, oder das, was seine Leute mit unseren tun?"), why: t("It counts whether the former customer's people answer ours: contact with us. It shows only if the answers are logged. Those who answered came back far more often.", "Es zählt, ob die Leute des früheren Kunden unseren antworten: Kontakt mit uns. Es zeigt sich nur, wenn die Antworten festgehalten werden. Wer antwortete, kam viel öfter zurück."), rejected: { visits: t("Nothing is counted from a web log; it comes from the contact log.", "Nichts wird aus einem Web-Log gezählt; es kommt aus dem Kontaktprotokoll.") } },
  { id: "p02" as RecId, code: "R-02", outcome: "left" as const, text: t("Former contacts who accept an invitation to a customer event or a call.", "Frühere Ansprechpartner, die eine Einladung zu einer Kundenveranstaltung oder einem Gespräch annehmen."), truth: "contact" as PatternId, clue: t("Is accepting an invitation something a customer does with our people?", "Ist das Annehmen einer Einladung etwas, das ein Kunde mit unseren Leuten tut?"), why: t("Accepting an invitation is a former customer's people dealing with ours: contact with us. Customers who accepted came back about three times as often.", "Eine Einladung anzunehmen heißt, dass die Leute eines früheren Kunden mit unseren umgehen: Kontakt mit uns. Kunden, die annahmen, kamen etwa dreimal so oft zurück."), rejected: { money: t("Nothing is said about money or scope; the customer only says yes to a meeting.", "Es wird nichts über Geld oder Umfang gesagt; der Kunde sagt nur Ja zu einem Treffen.") } },
  { id: "p03" as RecId, code: "R-03", outcome: "left" as const, text: t("Former contacts who agree to a 15-minute call to say what went wrong.", "Frühere Ansprechpartner, die einem 15-minütigen Gespräch zustimmen, in dem sie sagen, was schiefgelaufen ist."), truth: "contact" as PatternId, clue: t("Agreeing to a call: is that the customer speaking, or the customer turning up?", "Einem Gespräch zustimmen: Ist das der Kunde, der spricht, oder der Kunde, der erscheint?"), why: t("Agreeing to a call is contact with us, and it is the most direct sign that the customer is still open. What is said in the call comes after, and counts as what they say.", "Einem Gespräch zuzustimmen ist Kontakt mit uns und das direkteste Zeichen, dass der Kunde noch offen ist. Was im Gespräch gesagt wird, kommt danach und zählt als das, was sie sagen."), rejected: { voice: t("The customer has not said anything about the reasons yet; it only agrees to talk.", "Der Kunde hat zu den Gründen noch nichts gesagt; er stimmt nur zu zu reden.") } },
  { id: "p04" as RecId, code: "R-04", outcome: "stayed" as const, text: t("Opens of the monthly product e-mail by former customers' contacts.", "Öffnungen der monatlichen Produkt-E-Mail durch Kontakte früherer Kunden."), truth: "visits" as PatternId, clue: t("Who counts it, and does an open mean the customer wants to return?", "Wer zählt es, und heißt ein Öffnen, dass der Kunde zurückkehren will?"), why: t("Opens are counted by the e-mail system: visits and logins. Many are opened out of habit or by an automatic preview, so it did not go with coming back.", "Öffnungen zählt das E-Mail-System: Besuche und Logins. Viele werden aus Gewohnheit oder durch eine automatische Vorschau geöffnet, also ging es nicht mit der Rückkehr einher."), rejected: { contact: t("Nobody answered or spoke to us; a system counted an open.", "Niemand antwortete oder sprach mit uns; ein System zählte ein Öffnen.") } },
  { id: "p05" as RecId, code: "R-05", outcome: "left" as const, text: t("Visits by a former customer's contacts to the release-notes page, twice or more in a month.", "Besuche von Kontakten eines früheren Kunden auf der Release-Notes-Seite, zweimal oder öfter in einem Monat."), truth: "visits" as PatternId, clue: t("What is on that page, and who counts the visits?", "Was steht auf dieser Seite, und wer zählt die Besuche?"), why: t("A page visit is counted by the website: visits and logins. Repeated visits to what is new since the customer left did go with coming back.", "Ein Seitenbesuch wird von der Website gezählt: Besuche und Logins. Wiederholte Besuche bei dem, was seit dem Abschied neu ist, gingen mit der Rückkehr einher."), rejected: { money: t("The page shows what is new, not prices or offers.", "Die Seite zeigt, was neu ist, nicht Preise oder Angebote.") } },
  { id: "p06" as RecId, code: "R-06", outcome: "stayed" as const, text: t("Logins to the old portal to export the customer's own reports.", "Logins im alten Portal, um die eigenen Berichte des Kunden zu exportieren."), truth: "visits" as PatternId, clue: t("Why would someone export their own reports after leaving?", "Warum würde jemand nach dem Abschied seine eigenen Berichte exportieren?"), why: t("A login is counted by the portal: visits and logins. But taking its reports away is the customer closing its history with RecoverIT, so it did not go with coming back.", "Einen Login zählt das Portal: Besuche und Logins. Aber seine Berichte mitzunehmen heißt, dass der Kunde seine Geschichte mit RecoverIT abschließt, also ging es nicht mit der Rückkehr einher."), rejected: { contact: t("No answer, no meeting; the system recorded a login.", "Keine Antwort, kein Meeting; das System hat einen Login festgehalten.") } },
  { id: "p07" as RecId, code: "R-07", outcome: "left" as const, text: t("Former customers who ask sales for a quote for a scope like their old contract.", "Frühere Kunden, die den Vertrieb nach einem Angebot für einen Umfang wie ihren alten Vertrag fragen."), truth: "money" as PatternId, clue: t("Is the request about money or scope?", "Geht die Anfrage um Geld oder Umfang?"), why: t("A quote request is about money and scope: a price and offer question. It shows the customer is weighing a way back.", "Eine Angebotsanfrage betrifft Geld und Umfang: eine Preis- und Angebotsfrage. Sie zeigt, dass der Kunde einen Weg zurück abwägt."), rejected: { contact: t("The customer does talk to us here, but what the talk is about is money and scope.", "Der Kunde spricht hier zwar mit uns, aber worum es geht, sind Geld und Umfang.") } },
  { id: "p08" as RecId, code: "R-08", outcome: "left" as const, text: t("Former customers who ask what the price would be today for a smaller scope than before.", "Frühere Kunden, die fragen, was der Preis heute für einen kleineren Umfang als vorher wäre."), truth: "money" as PatternId, clue: t("What is the customer testing with that question?", "Was testet der Kunde mit dieser Frage?"), why: t("A question about the price for a smaller scope is about money and scope: a price and offer question. The customer is testing a way back that costs less.", "Eine Frage nach dem Preis für einen kleineren Umfang betrifft Geld und Umfang: eine Preis- und Angebotsfrage. Der Kunde testet einen Weg zurück, der weniger kostet."), rejected: { visits: t("It is a question put to sales, not a visit counted by the website.", "Es ist eine Frage an den Vertrieb, kein Besuch, den die Website zählt.") } },
  { id: "p09" as RecId, code: "R-09", outcome: "stayed" as const, text: t("Former customers' finance teams who ask for a copy of the closing invoice.", "Finanzteams früherer Kunden, die um eine Kopie der Schlussrechnung bitten."), truth: "money" as PatternId, clue: t("Which department asks, and why?", "Welche Abteilung fragt, und warum?"), why: t("It is about money and seen in finance: a price and offer question. But a closing invoice is paperwork that belongs to leaving, so it did not go with coming back.", "Es geht um Geld und zeigt sich in der Finanzabteilung: eine Preis- und Angebotsfrage. Aber eine Schlussrechnung ist Papierkram, der zum Abschied gehört, also ging es nicht mit der Rückkehr einher."), rejected: { contact: t("Finance asks for a document; it is not a conversation about the relationship.", "Die Finanzabteilung fragt nach einem Dokument; es ist kein Gespräch über die Beziehung.") } },
  { id: "p10" as RecId, code: "R-10", outcome: "stayed" as const, text: t("Overall satisfaction score from the exit survey.", "Gesamtzufriedenheitswert aus der Abschlussumfrage."), truth: "voice" as PatternId, clue: t("Did the customer do something, or say something?", "Hat der Kunde etwas getan, oder etwas gesagt?"), why: t("A score is what the customer says when asked: what they say. Only 20% answered, mostly with polite scores, so it did not go with coming back.", "Ein Wert ist, was der Kunde sagt, wenn er gefragt wird: was sie sagen. Nur 20 % antworteten, meist mit höflichen Werten, also ging es nicht mit der Rückkehr einher."), rejected: { contact: t("A score is an opinion, not an answer or a call kept.", "Ein Wert ist eine Meinung, keine Antwort und kein eingehaltenes Gespräch.") } },
  { id: "p11" as RecId, code: "R-11", outcome: "stayed" as const, text: t("Number of negative reviews a former customer wrote about RecoverIT on review sites.", "Zahl der negativen Bewertungen, die ein früherer Kunde auf Bewertungsseiten über RecoverIT schrieb."), truth: "voice" as PatternId, clue: t("Is a review a visit counted by our site, or something the customer wrote?", "Ist eine Bewertung ein Besuch, den unsere Seite zählt, oder etwas, das der Kunde schrieb?"), why: t("A review is what a customer says when annoyed: what they say. Customers who wrote one and customers who did not came back about equally often.", "Eine Bewertung ist, was ein Kunde sagt, wenn er verärgert ist: was sie sagen. Kunden, die eine schrieben, und Kunden, die keine schrieben, kamen etwa gleich oft zurück."), rejected: { visits: t("A review is the customer speaking, not our site counting a visit.", "Eine Bewertung ist der Kunde, der spricht, nicht unsere Seite, die einen Besuch zählt.") } },
  { id: "p12" as RecId, code: "R-12", outcome: "stayed" as const, text: t("The reason category a former customer ticked in the exit survey.", "Die Grundkategorie, die ein früherer Kunde in der Abschlussumfrage ankreuzte."), truth: "voice" as PatternId, clue: t("Is a ticked box an action or a statement?", "Ist ein angekreuztes Kästchen eine Handlung oder eine Aussage?"), why: t("A ticked reason is what the customer says: what they say. Customers often tick “price” out of politeness even when trust was the cause, so it did not go with coming back.", "Ein angekreuzter Grund ist, was der Kunde sagt: was sie sagen. Kunden kreuzen oft „Preis“ aus Höflichkeit an, auch wenn Vertrauen die Ursache war, also ging es nicht mit der Rückkehr einher."), rejected: { money: t("Price may be the ticked reason, but the field records what was said, not an offer or a question about money.", "Der Preis mag der angekreuzte Grund sein, aber das Feld hält fest, was gesagt wurde, nicht ein Angebot oder eine Frage zu Geld.") } },
]);
export const REC_IDS: RecId[] = ["p01", "p02", "p03", "p04", "p05", "p06", "p07", "p08", "p09", "p10", "p11", "p12"];
export const REC_BY_ID = Object.fromEntries(RECORDS.map((r) => [r.id, r])) as Record<RecId, Record_>;

const zero = () => ({ contact: 0, visits: 0, money: 0, voice: 0 }) as Record<PatternId, number>;
export const TRUTH_COUNTS: Record<PatternId, number> = RECORDS.reduce((o, x) => ({ ...o, [x.truth]: o[x.truth] + 1 }), zero());
export const TRUTH_LEFT: Record<PatternId, number> = RECORDS.reduce((o, x) => ({ ...o, [x.truth]: o[x.truth] + (x.outcome === "left" ? 1 : 0) }), zero());

/* ------------------------------------------------------------------ Block 2.2 · link to coming back, when each family shows, how to use it */

export type Risk = "high" | "mid" | "low";
export const RISK_LABEL = bi({ high: t("Strong", "Stark"), mid: t("Partial", "Teilweise"), low: t("None", "Keine") });
export const RISK_GLYPH: Record<Risk, string> = { high: "●", mid: "◐", low: "○" };
export const riskOf = (moved: number, count: number): Risk | null => (count === 0 ? null : moved / count >= 0.5 ? "high" : moved > 0 ? "mid" : "low");
export const RISK_RULE = bi({ v: t("Link to coming back from last year: half or more of the family's signals went with coming back = Strong; some did = Partial; none did = None.", "Verbindung zur Rückkehr aus dem letzten Jahr: Die Hälfte oder mehr der Signale dieser Familie ging mit der Rückkehr einher = Stark; einige = Teilweise; keines = Keine.") });

export type MeaningId = "first" | "soft" | "compare" | "late";
export const MEANINGS = bi([
  { id: "first" as MeaningId, label: t("The systems count it by themselves, so nobody has to write it down", "Die Systeme zählen es selbst, also muss es niemand aufschreiben") },
  { id: "soft" as MeaningId, label: t("It shows only if a person notices it and logs it, and it comes from the customer's own people", "Es zeigt sich nur, wenn eine Person es bemerkt und festhält, und es kommt von den eigenen Leuten des Kunden") },
  { id: "compare" as MeaningId, label: t("It shows when the customer weighs coming back against staying away", "Es zeigt sich, wenn der Kunde eine Rückkehr gegen das Wegbleiben abwägt") },
  { id: "late" as MeaningId, label: t("It arrives only when the customer chooses to tell us, and is often polite", "Es kommt nur, wenn der Kunde sich entscheidet, es uns zu sagen, und ist oft höflich") },
]);
export const MEANING_TRUTH: Record<PatternId, MeaningId> = { visits: "first", contact: "soft", money: "compare", voice: "late" };

export type PMeasureId = "alert" | "log" | "talk" | "close" | "bonus";
export const PMEASURES = bi([
  { id: "alert" as PMeasureId, label: t("Build an automatic list from the logs and let the former account owner decide every Monday whether to call", "Eine automatische Liste aus den Logs bauen und den früheren Account Owner jeden Montag entscheiden lassen, ob er anruft") },
  { id: "log" as PMeasureId, label: t("Ask every account owner to log each answer, accepted call and event in the CRM, because only people notice it", "Jeden Account Owner bitten, jede Antwort, jedes angenommene Gespräch und jede Veranstaltung im CRM festzuhalten, weil nur Menschen es bemerken") },
  { id: "talk" as PMeasureId, label: t("Hand it to sales the same week for a tailored offer, before the customer settles with the new provider", "Es in derselben Woche dem Vertrieb für ein maßgeschneidertes Angebot geben, bevor der Kunde sich beim neuen Anbieter einrichtet") },
  { id: "close" as PMeasureId, label: t("Answer every exit survey and review personally, and never use a score alone as a sign that someone will return", "Jede Abschlussumfrage und jede Bewertung persönlich beantworten und einen Wert nie allein als Zeichen nutzen, dass jemand zurückkehrt") },
  { id: "bonus" as PMeasureId, label: t("Pay a bonus on it to the team that reports it", "Dem Team, das es berichtet, einen Bonus darauf zahlen") },
]);
export const MEASURE_TRUTH: Record<PatternId, PMeasureId> = { visits: "alert", contact: "log", money: "talk", voice: "close" };
export type PatternRow = { risk: Risk | null; meaning: MeaningId | null; measure: PMeasureId | null };

export type UncId = "sample" | "cause" | "missing" | "shift" | "objective" | "highsafe" | "moredata";
export const UNCERTAINTIES = bi([
  { id: "sample" as UncId, label: t("12 returned customers out of the 60 who were called is a small base; a second year of data would confirm the rate", "12 zurückgekehrte Kunden von den 60, die angerufen wurden, sind eine kleine Basis; ein zweites Jahr an Daten würde die Quote bestätigen"), real: true, why: t("With fewer than about 100 cases per group, a few more or less move the rate a lot (Materi A6).", "Bei weniger als etwa 100 Fällen pro Gruppe verschieben ein paar mehr oder weniger die Quote stark (Materi A6).") },
  { id: "cause" as UncId, label: t("The customers who were called may be the ones the account owners knew best, so the call may not be the whole cause", "Die Kunden, die angerufen wurden, sind vielleicht die, die die Account Owner am besten kannten, also ist der Anruf vielleicht nicht die ganze Ursache"), real: true, why: t("If owners called their favourite former customers, part of the lift is the customer, not the call. Only a fair test (a random choice of who is called) shows how much the call adds.", "Haben Account Owner ihre liebsten früheren Kunden angerufen, ist ein Teil des Lifts der Kunde, nicht der Anruf. Nur ein fairer Test (zufällige Auswahl, wer angerufen wird) zeigt, wie viel der Anruf bringt.") },
  { id: "missing" as UncId, label: t("The reason for leaving was written down for only half of the lost customers, so the groups may be mixed", "Der Abschiedsgrund wurde nur für die Hälfte der verlorenen Kunden aufgeschrieben, also sind die Gruppen vielleicht gemischt"), real: true, why: t("What is not recorded cannot be sorted; a group labelled “broken promises” may hold customers who left for a price reason.", "Was nicht erfasst wird, kann nicht sortiert werden; eine Gruppe „gebrochene Versprechen“ kann Kunden enthalten, die aus Preisgründen gingen.") },
  { id: "shift" as UncId, label: t("A competitor's new price list can change why customers leave, so next year's return rate may mean something different", "Eine neue Preisliste eines Wettbewerbers kann ändern, warum Kunden gehen, also kann die Rückkehrquote im nächsten Jahr etwas anderes bedeuten"), real: true, why: t("A rule built on last year assumes the past repeats; a new market situation brings different reasons.", "Eine Regel, die auf dem letzten Jahr beruht, nimmt an, dass sich die Vergangenheit wiederholt; eine neue Marktlage bringt andere Gründe.") },
  { id: "objective" as UncId, label: t("Every customer who answers a message will return", "Jeder Kunde, der auf eine Nachricht antwortet, kehrt zurück"), real: false, why: t("An answer shows the customer is open, not that it will come back. Contact is a reason to talk, not proof (Materi A5).", "Eine Antwort zeigt, dass der Kunde offen ist, nicht dass er zurückkommt. Kontakt ist ein Grund zu reden, kein Beweis (Materi A5).") },
  { id: "highsafe" as UncId, label: t("A return rate that is right for last year's lost customers stays right for years", "Eine Rückkehrquote, die für die verlorenen Kunden des letzten Jahres stimmt, stimmt auch noch in Jahren"), real: false, why: t("Customers and offers change. A rate needs a regular check against who actually came back (Materi A5 and A6).", "Kunden und Angebote ändern sich. Eine Quote braucht eine regelmäßige Prüfung dagegen, wer wirklich zurückkam (Materi A5 und A6).") },
  { id: "moredata" as UncId, label: t("The more lost customers we approach, the more come back and the better the economics", "Je mehr verlorene Kunden wir ansprechen, desto mehr kommen zurück und desto besser rechnet es sich"), real: false, why: t("Approaching customers whose reason is outside our reach adds cost and few returns. Fewer, better chosen customers can pay more (Materi A3).", "Kunden anzusprechen, deren Grund außerhalb unseres Einflusses liegt, bringt Kosten und wenige Rückkehrer. Weniger, besser gewählte Kunden können sich mehr lohnen (Materi A3).") },
]);
export const UNC_BY_ID = Object.fromEntries(UNCERTAINTIES.map((w) => [w.id, w])) as Record<UncId, (typeof UNCERTAINTIES)[number]>;

/* ------------------------------------------------------------------ Block 2.3 · an A/B test design */

export type AbPart = "change" | "control" | "kpi" | "size";
export const AB_PARTS: AbPart[] = ["change", "control", "kpi", "size"];
export type AbOption = { id: string; label: string; right: boolean; clue: string };
export const AB = bi({
  change: {
    label: t("What changes in the variant", "Was sich in der Variante ändert"),
    help: t("The one thing the test compares.", "Das eine, was der Test vergleicht."),
    options: [
      { id: "one", label: t("Only a personal call from the former account owner instead of the standard e-mail, with the same offer", "Nur ein persönlicher Anruf des früheren Account Owners statt der Standard-E-Mail, mit demselben Angebot"), right: true, clue: t("", "") },
      { id: "three", label: t("A call, a 25% discount and a free migration, all at once", "Ein Anruf, 25 % Rabatt und eine kostenlose Migration, alles auf einmal"), right: false, clue: t("If the variant wins, which of the changes made it win?", "Wenn die Variante gewinnt: Welche der Änderungen hat sie gewinnen lassen?") },
      { id: "channel", label: t("A call for customers in the north region, the e-mail for customers in the south", "Ein Anruf für Kunden im Norden, die E-Mail für Kunden im Süden"), right: false, clue: t("Are customers in the north and in the south the same people in the same situation?", "Sind Kunden im Norden und im Süden dieselben Menschen in derselben Lage?") },
    ],
  },
  control: {
    label: t("The control group", "Die Kontrollgruppe"),
    help: t("Which lost customers keep the standard e-mail, to compare against.", "Welche verlorenen Kunden die Standard-E-Mail behalten, als Vergleich."),
    options: [
      { id: "random", label: t("A random half of the lost customers from the same groups, in the same weeks", "Eine zufällige Hälfte der verlorenen Kunden aus denselben Gruppen, in denselben Wochen"), right: true, clue: t("", "") },
      { id: "lastyear", label: t("Last year's lost customers, who got the standard e-mail", "Die verlorenen Kunden des letzten Jahres, die die Standard-E-Mail bekamen"), right: false, clue: t("Are these the same customers, at the same time, under the same conditions?", "Sind das dieselben Kunden, zur selben Zeit, unter denselben Bedingungen?") },
      { id: "nonopen", label: t("Lost customers whose former owner chose not to call", "Verlorene Kunden, bei denen der frühere Account Owner sich entschied, nicht anzurufen"), right: false, clue: t("Who chose to be in this group: chance, or the owners themselves?", "Wer hat entschieden, in dieser Gruppe zu sein: der Zufall oder die Account Owner selbst?") },
    ],
  },
  kpi: {
    label: t("The success KPI", "Der Erfolgs-KPI"),
    help: t("The number that decides whether the variant won.", "Die Zahl, die entscheidet, ob die Variante gewonnen hat."),
    options: [
      { id: "conv", label: t("Share of approached lost customers who sign a new contract and are still customers after 90 days", "Anteil der angesprochenen verlorenen Kunden, die einen neuen Vertrag unterschreiben und nach 90 Tagen noch Kunden sind"), right: true, clue: t("", "") },
      { id: "opens", label: t("Number of e-mails opened", "Zahl der geöffneten E-Mails"), right: false, clue: t("The goal is customers who come back. Does the number of opens tell you whether more of them did?", "Das Ziel sind Kunden, die zurückkommen. Sagt die Zahl der Öffnungen, ob mehr von ihnen zurückkamen?") },
      { id: "sent", label: t("Number of calls made", "Zahl der geführten Anrufe"), right: false, clue: t("Which kind of number counts what we did rather than whether customers came back?", "Welche Art von Zahl zählt, was wir getan haben, statt ob Kunden zurückkamen?") },
    ],
  },
  size: {
    label: t("Size and duration", "Größe und Dauer"),
    help: t("When the test has enough cases to read.", "Wann der Test genug Fälle hat, um ihn zu lesen."),
    options: [
      { id: "fixed", label: t("Fixed in advance: until each group has about 100 approached lost customers, and long enough for them to decide (90 days)", "Vorab festgelegt: bis jede Gruppe etwa 100 angesprochene verlorene Kunden hat, und lange genug, dass sie entscheiden können (90 Tage)"), right: true, clue: t("", "") },
      { id: "peek", label: t("Stop as soon as the variant is ahead on the dashboard", "Stoppen, sobald die Variante im Dashboard vorn liegt"), right: false, clue: t("A return rate swings with every customer. What happens if you stop at a lucky moment?", "Eine Rückkehrquote schwankt mit jedem Kunden. Was passiert, wenn Sie in einem glücklichen Moment stoppen?") },
      { id: "day", label: t("One week, for a fast answer", "Eine Woche, für eine schnelle Antwort"), right: false, clue: t("How many lost customers decide to come back within one week?", "Wie viele verlorene Kunden entscheiden sich innerhalb einer Woche zurückzukommen?") },
    ],
  },
});
export type AbState = { change: string | null; control: string | null; kpi: string | null; size: string | null; hyp: string; rule: string };
export const emptyAb = (): AbState => ({ change: null, control: null, kpi: null, size: null, hyp: "", rule: "" });
export const AB_MODEL = { change: "one", control: "random", kpi: "conv", size: "fixed" };
/** A hypothesis states a change, an expected effect and a reason. A floor, not a judge: it needs "if … because". */
export const hasHypothesis = (s: string) => /\b(if|wenn|falls)\b/i.test(s) && /\b(because|since|as|weil|da|denn)\b/i.test(s);
/** A decision rule names a number to decide by. */
export const hasRuleNumber = (s: string) => /\d/.test(s);

/** The decisive phrase inside each signal's own text, for "Highlight the key words" (never which family it points to). */
export const REC_KEY: Record<string, string> = bi({
  p01: t("check-in messages that a former customer's contact answers within a week", "die ein Kontakt eines früheren Kunden innerhalb einer Woche beantwortet"),
  p02: t("accept an invitation to a customer event or a call", "eine Einladung zu einer Kundenveranstaltung oder einem Gespräch annehmen"),
  p03: t("agree to a 15-minute call to say what went wrong", "einem 15-minütigen Gespräch zustimmen, in dem sie sagen, was schiefgelaufen ist"),
  p04: t("Opens of the monthly product e-mail", "Öffnungen der monatlichen Produkt-E-Mail"),
  p05: t("release-notes page, twice or more in a month", "Release-Notes-Seite, zweimal oder öfter in einem Monat"),
  p06: t("Logins to the old portal to export the customer's own reports", "Logins im alten Portal, um die eigenen Berichte des Kunden zu exportieren"),
  p07: t("ask sales for a quote for a scope like their old contract", "den Vertrieb nach einem Angebot für einen Umfang wie ihren alten Vertrag fragen"),
  p08: t("price would be today for a smaller scope", "Preis heute für einen kleineren Umfang"),
  p09: t("ask for a copy of the closing invoice", "um eine Kopie der Schlussrechnung bitten"),
  p10: t("Overall satisfaction score from the exit survey", "Gesamtzufriedenheitswert aus der Abschlussumfrage"),
  p11: t("negative reviews a former customer wrote", "negativen Bewertungen, die ein früherer Kunde"),
  p12: t("reason category a former customer ticked", "Grundkategorie, die ein früherer Kunde"),
});
