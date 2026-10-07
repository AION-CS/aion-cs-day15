import { bi, t } from "@/lib/lang";

/**
 * Task 1 · Block 2.4 (Core, Level 2). Six measures RecoverIT could fund inside €140,000 and four months (the plan's framework). Costs, weeks and who
 * each aims at are Case assumptions; every price is built from parts (set-up, a licence for the months, days or hours of work) so a learner sees
 * why it is that number. The score is the plan's own evaluation: Economic Viability × Effect × Sustainability. Economic Viability follows from the
 * printed "aims at", so it is checkable; effect and sustainability are the learner's judgement. (Field names keep the earlier ones: `exp` = Economic
 * Viability, `eff` = Effect, `fea` = Sustainability; `evidence` is the economic band, derived from `joins`; `targets` are the problems a measure
 * answers. The problem ids use/retain/integrate are the three problems of the brief: use = win-back is inefficient, retain = high churn rate,
 * integrate = measures are not measurable.)
 *
 * Three are strong, three are traps of different kinds: a "we miss you" series to every lost customer repeats a friendly message and fixes no reason, a
 * 25% discount for everyone buys the return without changing the reason and repeats every year, and the vendor's platform is over budget, in use only
 * after the four months, and sends offers nobody can explain.
 */
export type MeasureId = "unified" | "handover" | "predictive" | "chatbot" | "app" | "suite";
export const BUDGET = 140000;
export const MONTHS = 4;
/** The four months in weeks: the frame in which a measure has to start working. */
export const FRAME_WEEKS = MONTHS * 4;
export type Bucket = 1 | 2 | 3;

/**
 * The category printed after the weeks (CLAUDE.md #45): which of the levers taught in Materi A1 a measure uses (rebuild trust, lower the cost of coming
 * back, add value, give a discount). A fact about the measure taken from that card's own text, never a score and never the problem it answers (that stays
 * the learner's job).
 */
export type MeasureArea = "trust" | "switch" | "value" | "price";
export const MEASURE_AREA_LABEL = bi({
  trust: t("Rebuild trust", "Vertrauen wiederaufbauen"),
  switch: t("Lower the cost of coming back", "Die Rückkehr leichter machen"),
  value: t("Add value", "Nutzen stiften"),
  price: t("Give a discount", "Einen Rabatt geben"),
});
export const AREA_NOTE = bi({
  v: t(
    "The brief names three problems. Each card carries a small label with the lever it uses (taught in Materi A1): rebuilding trust, lowering the cost of coming back, adding value, or giving a discount.",
    "Der Auftrag nennt drei Probleme. Jede Karte trägt ein kleines Etikett mit dem Hebel, den sie nutzt (gelehrt in Materi A1): Vertrauen wiederaufbauen, die Rückkehr leichter machen, Nutzen stiften oder einen Rabatt geben.",
  ),
});

export type ProblemId = "use" | "retain" | "integrate";
export const PROBLEM_IDS: ProblemId[] = ["use", "retain", "integrate"];
export const PROBLEM_LABEL = bi({
  use: t("Win-back is inefficient", "Die Rückgewinnung ist ineffizient"),
  retain: t("High churn rate", "Hohe Churn Rate"),
  integrate: t("Measures are not measurable", "Maßnahmen sind nicht messbar"),
});
/** The three problems in everyday words, for the picture under the cards. */
export const PROBLEM_PLAIN = bi({
  use: t("The same discount mail goes to everyone and few customers come back", "Dieselbe Rabatt-Mail geht an alle, und wenige Kunden kommen zurück"),
  retain: t("Too many customers leave each year", "Zu viele Kunden gehen jedes Jahr"),
  integrate: t("Nobody can say which measure brought a customer back", "Niemand kann sagen, welche Maßnahme einen Kunden zurückgebracht hat"),
});

export type Joins = "all" | "one" | "none";
export type Evidence = "fast" | "mid" | "slow";
export const bandOf = (j: Joins): Evidence => (j === "all" ? "fast" : j === "one" ? "mid" : "slow");
export const JOINS_LABEL = bi({
  all: t("only the groups where the reason is fixable and a quarter or more would consider coming back", "nur die Gruppen, in denen der Grund behebbar ist und ein Viertel oder mehr eine Rückkehr erwägt"),
  one: t("those groups, with other lost customers mixed in", "diese Gruppen, mit anderen verlorenen Kunden dazwischen"),
  none: t("every lost customer, whatever the reason", "jeden verlorenen Kunden, egal aus welchem Grund"),
});
export const EVIDENCE_LABEL = bi({
  fast: t("aims at the groups where a win-back pays", "zielt auf die Gruppen, in denen sich die Rückgewinnung lohnt"),
  mid: t("aims at a mix", "zielt auf eine Mischung"),
  slow: t("aims at every lost customer", "zielt auf jeden verlorenen Kunden"),
});
export const explainBucket = (e: Evidence): Bucket => (e === "fast" ? 3 : e === "mid" ? 2 : 1);
export const EXPLAIN_RULE = bi({
  v: t(
    "Economic Viability follows from who the measure is printed to aim at: only the groups where the reason is fixable and a quarter or more would consider coming back scores 3, those groups with other lost customers mixed in scores 2, every lost customer whatever the reason scores 1. A measure that spends on customers who cannot or will not return loses money, however good it sounds.",
    "Die Wirtschaftlichkeit folgt daraus, auf wen die Maßnahme laut Beschreibung zielt: nur die Gruppen, in denen der Grund behebbar ist und ein Viertel oder mehr eine Rückkehr erwägt, ergibt 3, diese Gruppen mit anderen verlorenen Kunden dazwischen ergibt 2, jeden verlorenen Kunden egal aus welchem Grund ergibt 1. Eine Maßnahme, die Geld für Kunden ausgibt, die nicht zurückkehren können oder wollen, verliert Geld, so gut sie auch klingt.",
  ),
});

/** The plain-word anchors for the two judged scores, printed under the score buttons and taught in Materi A7. */
export const EFFECT_ANCHOR = bi({
  v: t(
    "3 = it deals with a reason the customer really gave, in a way the customer notices before deciding. 2 = it deals with the reason for only part of the customers, or the customer notices it only weakly. 1 = it repeats the same message or buys a return without changing the reason the customer left.",
    "3 = Es geht auf einen Grund ein, den der Kunde wirklich nannte, auf eine Weise, die der Kunde vor der Entscheidung bemerkt. 2 = Es geht nur für einen Teil der Kunden auf den Grund ein, oder der Kunde bemerkt es nur schwach. 1 = Es wiederholt dieselbe Botschaft oder erkauft eine Rückkehr, ohne den Grund zu ändern, aus dem der Kunde ging.",
  ),
});
export const SCALE_ANCHOR = bi({
  v: t(
    "3 = it keeps working after the four months with people and tools RecoverIT already has, and without a discount that repeats every year. 2 = it needs something new (a person, a tool, engineer days per customer) but can be kept up. 1 = it works only while the budget keeps paying, or needs people or data RecoverIT does not have.",
    "3 = Es wirkt nach den vier Monaten weiter, mit Leuten und Werkzeugen, die RecoverIT schon hat, und ohne einen Rabatt, der sich jedes Jahr wiederholt. 2 = Es braucht etwas Neues (eine Person, ein Werkzeug, Ingenieurtage pro Kunde), lässt sich aber durchhalten. 1 = Es wirkt nur, solange das Budget weiter zahlt, oder braucht Leute oder Daten, die RecoverIT nicht hat.",
  ),
});

export type CostPart = { label: string; amount: number };

export type Measure = {
  id: MeasureId;
  name: string;
  /** A short name for bars and rows. */
  short: string;
  /** In everyday words: what it is. */
  what: string;
  /** One concrete scene from RecoverIT's day (CLAUDE.md #46). */
  scene: string;
  /** Who does what, and what the customer notices. */
  who: string;
  area: MeasureArea;
  basis: string;
  joins: Joins;
  evidence: Evidence;
  /** What the price is made of; `cost` is their sum. */
  costParts: CostPart[];
  cost: number;
  weeks: number;
  targets: ProblemId[];
  model: { feasibility: Bucket; effect: Bucket; note: string };
  verdict: string;
};

/**
 * Identifiers keep the names of the file this was built from: `unified` is the personal return call from the former account owner after the reason is
 * fixed, `handover` the free return migration, `predictive` the tailored return offer with added value (tested on a random half first), `chatbot` the
 * "we miss you" e-mail series to every lost customer, `app` the 25% discount for every lost customer who returns and `suite` the vendor's win-back
 * platform with a prediction model.
 */
export const MEASURES: Measure[] = [];
const RAW = bi([
  {
    id: "unified" as MeasureId,
    short: t("Return call", "Rückkehr-Anruf"),
    name: t("A personal return call from the former account owner, after the reason has been fixed", "Ein persönlicher Rückkehr-Anruf des früheren Account Owners, nachdem der Grund behoben wurde"),
    what: t(
      "For each customer in a group where the reason can be fixed, the former account owner first checks what was changed since the customer left, then calls the main contact, says what was fixed and asks for 15 minutes. Every call and its result is logged in the CRM.",
      "Für jeden Kunden einer Gruppe, in der sich der Grund beheben lässt, prüft der frühere Account Owner zuerst, was sich seit dem Abschied geändert hat, ruft dann den Hauptansprechpartner an, sagt, was behoben wurde, und bittet um 15 Minuten. Jeder Anruf und sein Ergebnis wird im CRM festgehalten.",
    ),
    scene: t(
      "A customer left after an outage in March when nobody called. In July its former account owner writes a one-page note: what happened, and what the service desk has changed since (a call within an hour of every outage). Then she calls the managing director, who agrees to talk for 15 minutes.",
      "Ein Kunde ging nach einem Ausfall im März, bei dem niemand anrief. Im Juli schreibt sein früherer Account Owner eine Seite: was geschah und was der Service Desk seitdem geändert hat (ein Anruf innerhalb einer Stunde nach jedem Ausfall). Dann ruft sie den Geschäftsführer an, der einem Gespräch von 15 Minuten zustimmt.",
    ),
    who: t(
      "The former account owner prepares and calls, and the service lead confirms what was fixed. The customer hears from a person it knew, with a concrete change, and nothing is sold on the first call.",
      "Der frühere Account Owner bereitet vor und ruft an, und der Service Lead bestätigt, was behoben wurde. Der Kunde hört von einer Person, die er kannte, mit einer konkreten Änderung, und beim ersten Anruf wird nichts verkauft.",
    ),
    area: "trust" as MeasureArea,
    basis: t("Aims at the lost customers whose reason can be fixed and who say they would consider coming back.", "Zielt auf die verlorenen Kunden, deren Grund sich beheben lässt und die sagen, sie würden eine Rückkehr erwägen."),
    joins: "all" as Joins,
    costParts: [
      { label: t("account owners' time for the calls, 350 h × €80", "Zeit der Account Owner für die Anrufe, 350 Std. × 80 €"), amount: 28000 },
      { label: t("a one-page “what we fixed” note and a call guide, 15 days × €800", "eine Seite „Was wir behoben haben“ und ein Gesprächsleitfaden, 15 Tage × 800 €"), amount: 12000 },
      { label: t("training for six account owners, 6 × €1,500", "Training für sechs Account Owner, 6 × 1.500 €"), amount: 9000 },
    ],
    cost: 0,
    weeks: 6,
    targets: ["use", "retain"] as ProblemId[],
    model: { feasibility: 2, effect: 3, note: t("It goes only to customers whose reason can be fixed, so economic 3; a call by someone the customer knew, with a real change to report, is what changes a trust reason, so effect 3; it needs account-owner time that grows with the number of customers called, so sustainability 2.", "Es geht nur an Kunden, deren Grund sich beheben lässt, also Wirtschaftlichkeit 3; ein Anruf von jemandem, den der Kunde kannte, mit einer echten Änderung, ändert einen Vertrauensgrund, also Wirkung 3; es braucht Zeit der Account Owner, die mit der Zahl der angerufenen Kunden wächst, daher Nachhaltigkeit 2.") },
    verdict: t("A model measure: it fixes the reason first, then calls the customers worth calling.", "Eine Modellmaßnahme: Sie behebt zuerst den Grund und ruft dann die Kunden an, bei denen es sich lohnt."),
  },
  {
    id: "handover" as MeasureId,
    short: t("Free move back", "Kostenloser Rückumzug"),
    name: t("A free return migration: RecoverIT moves the customer's data and setup back at its own cost", "Ein kostenloser Rückumzug: RecoverIT bringt Daten und Einrichtung des Kunden auf eigene Kosten zurück"),
    what: t(
      "When a lost customer agrees to return, RecoverIT's engineers move its data and setup back, run the old and the new setup side by side for a month and bill nothing for the move. The offer goes to every customer who left for a competitor in the last twelve months.",
      "Wenn ein verlorener Kunde einer Rückkehr zustimmt, bringen die Ingenieure von RecoverIT Daten und Einrichtung zurück, betreiben das alte und das neue Setup einen Monat lang parallel und stellen den Umzug nicht in Rechnung. Das Angebot geht an jeden Kunden, der in den letzten zwölf Monaten zu einem Wettbewerber ging.",
    ),
    scene: t(
      "A customer left for a lower fee but finds the new provider slower. Its IT lead would come back but dreads moving everything again. RecoverIT offers to move it back for free and to run both setups side by side for a month.",
      "Ein Kunde ging wegen einer niedrigeren Gebühr, findet den neuen Anbieter aber langsamer. Seine IT-Leiterin käme zurück, scheut aber, alles noch einmal umzuziehen. RecoverIT bietet an, ihn kostenlos zurückzuholen und beide Setups einen Monat lang parallel zu betreiben.",
    ),
    who: t(
      "Engineers do the move and a project lead plans it with the customer. The customer's own team does almost nothing, and the risk of a second move is on RecoverIT.",
      "Ingenieure führen den Umzug durch, und ein Projektleiter plant ihn mit dem Kunden. Das Team des Kunden tut fast nichts, und das Risiko eines zweiten Umzugs liegt bei RecoverIT.",
    ),
    area: "switch" as MeasureArea,
    basis: t("Aims at every customer who left for a competitor in the last twelve months, whatever the reason.", "Zielt auf jeden Kunden, der in den letzten zwölf Monaten zu einem Wettbewerber ging, egal aus welchem Grund."),
    joins: "one" as Joins,
    costParts: [
      { label: t("engineers move data and setup for 20 customers, 20 × 2 days × €800", "Ingenieure bringen Daten und Einrichtung für 20 Kunden zurück, 20 × 2 Tage × 800 €"), amount: 32000 },
      { label: t("migration scripts and a checklist, 10 days × €800", "Migrationsskripte und eine Checkliste, 10 Tage × 800 €"), amount: 8000 },
      { label: t("project lead, 60 h × €100", "Projektleitung, 60 Std. × 100 €"), amount: 6000 },
    ],
    cost: 0,
    weeks: 8,
    targets: ["retain"] as ProblemId[],
    model: { feasibility: 2, effect: 3, note: t("Taking away the work of coming back is what customers who left for practical reasons ask for, so effect 3; but it aims at everyone who left for a competitor, not only at fixable reasons, so economic 2; and engineer days per customer do not shrink with volume, so sustainability 2.", "Die Arbeit der Rückkehr abzunehmen ist, was Kunden verlangen, die aus praktischen Gründen gingen, also Wirkung 3; aber es zielt auf alle, die zu einem Wettbewerber gingen, nicht nur auf behebbare Gründe, also Wirtschaftlichkeit 2; und Ingenieurtage pro Kunde sinken nicht mit dem Volumen, daher Nachhaltigkeit 2.") },
    verdict: t("A model measure: it removes the work of coming back, and is quick to start.", "Eine Modellmaßnahme: Sie nimmt die Arbeit der Rückkehr ab und ist schnell gestartet."),
  },
  {
    id: "predictive" as MeasureId,
    short: t("Tailored offer", "Maßgeschneidertes Angebot"),
    name: t("A tailored return offer with added value, tested on a random half first", "Ein maßgeschneidertes Rückkehr-Angebot mit Zusatznutzen, zuerst an einer zufälligen Hälfte getestet"),
    what: t(
      "For each group with a fixable reason, sales prepares an offer that adds what the customer named (a service review, the missing monitoring function, a named contact) instead of a lower price. Half of the customers in the group get it first; the other half keeps the standard e-mail, so the return rates can be compared.",
      "Für jede Gruppe mit behebbarem Grund bereitet der Vertrieb ein Angebot vor, das hinzufügt, was der Kunde nannte (ein Service-Review, die fehlende Monitoring-Funktion, ein benannter Ansprechpartner), statt eines niedrigeren Preises. Die Hälfte der Kunden der Gruppe erhält es zuerst; die andere Hälfte behält die Standard-E-Mail, sodass die Rückkehrquoten verglichen werden können.",
    ),
    scene: t(
      "Customers who left because cloud monitoring was missing receive a short offer: monitoring added to the old contract at no extra fee for six months, plus a service review. Half get it first, half the standard mail. After 90 days the two return rates are compared.",
      "Kunden, die gingen, weil Cloud-Monitoring fehlte, erhalten ein kurzes Angebot: Monitoring im alten Vertrag für sechs Monate ohne Zusatzgebühr, plus ein Service-Review. Die Hälfte bekommt es zuerst, die Hälfte die Standard-Mail. Nach 90 Tagen werden die beiden Rückkehrquoten verglichen.",
    ),
    who: t(
      "IT builds the review page, sales makes the offer and account managers hold the reviews. The customer sees something it asked for, not a discount, and RecoverIT can read whether it worked.",
      "Die IT baut die Review-Seite, der Vertrieb macht das Angebot und Account Manager führen die Reviews. Der Kunde sieht etwas, worum er gebeten hat, keinen Rabatt, und RecoverIT kann ablesen, ob es wirkte.",
    ),
    area: "value" as MeasureArea,
    basis: t("Aims at the lost customers whose reason can be fixed and who say they would consider coming back.", "Zielt auf die verlorenen Kunden, deren Grund sich beheben lässt und die sagen, sie würden eine Rückkehr erwägen."),
    joins: "all" as Joins,
    costParts: [
      { label: t("IT builds the review page, 10 days × €800", "IT baut die Review-Seite, 10 Tage × 800 €"), amount: 8000 },
      { label: t("the extra module free for six months for 12 returning customers, 12 × €1,500", "das Zusatzmodul sechs Monate kostenlos für 12 zurückkehrende Kunden, 12 × 1.500 €"), amount: 18000 },
      { label: t("account managers hold the reviews, 100 h × €100", "Account Manager führen die Reviews, 100 Std. × 100 €"), amount: 10000 },
    ],
    cost: 0,
    weeks: 6,
    targets: ["use", "integrate"] as ProblemId[],
    model: { feasibility: 3, effect: 2, note: t("It goes only to groups whose reason can be fixed, so economic 3; it adds what the customer named but does not cover every reason, so effect 2; and it runs on the review page and the CRM RecoverIT already has, with no discount that repeats, so sustainability 3.", "Es geht nur an Gruppen, deren Grund sich beheben lässt, also Wirtschaftlichkeit 3; es fügt hinzu, was der Kunde nannte, deckt aber nicht jeden Grund ab, also Wirkung 2; und es läuft auf der Review-Seite und dem CRM, die RecoverIT schon hat, ohne einen Rabatt, der sich wiederholt, daher Nachhaltigkeit 3.") },
    verdict: t("A model measure: it adds value the customer asked for, and it can be measured.", "Eine Modellmaßnahme: Sie bietet Nutzen, um den der Kunde bat, und sie lässt sich messen."),
  },
  {
    id: "chatbot" as MeasureId,
    short: t("“We miss you” mails", "„Wir vermissen Sie“-Mails"),
    name: t("A monthly “we miss you” e-mail series to all 2,400 lost customers", "Eine monatliche „Wir vermissen Sie“-E-Mail-Serie an alle 2.400 verlorenen Kunden"),
    what: t(
      "Every month for six months a friendly e-mail goes to every customer in the database of lost customers, whatever the reason they left.",
      "Sechs Monate lang geht jeden Monat eine freundliche E-Mail an jeden Kunden in der Datenbank der verlorenen Kunden, egal aus welchem Grund er ging.",
    ),
    scene: t(
      "A customer whose company was taken over by a group gets the fourth “we miss you” mail. A customer who left over broken promises gets the same mail and deletes it.",
      "Ein Kunde, dessen Firma von einem Konzern übernommen wurde, bekommt die vierte „Wir vermissen Sie“-Mail. Ein Kunde, der wegen gebrochener Versprechen ging, bekommt dieselbe Mail und löscht sie.",
    ),
    who: t(
      "Marketing writes and sends the series. Nobody checks the reason. Customers see a friendly message that changes nothing.",
      "Das Marketing schreibt und versendet die Serie. Niemand prüft den Grund. Kunden sehen eine freundliche Nachricht, die nichts ändert.",
    ),
    area: "trust" as MeasureArea,
    basis: t("Aims at every lost customer in the database, whatever the reason.", "Zielt auf jeden verlorenen Kunden in der Datenbank, egal aus welchem Grund."),
    joins: "none" as Joins,
    costParts: [
      { label: t("writing and design, 20 days × €800", "Texten und Gestalten, 20 Tage × 800 €"), amount: 16000 },
      { label: t("sending tool, 6 months × €1,500", "Versandtool, 6 Monate × 1.500 €"), amount: 9000 },
      { label: t("list clean-up, 5 days × €800", "Listenbereinigung, 5 Tage × 800 €"), amount: 4000 },
    ],
    cost: 0,
    weeks: 3,
    targets: ["retain"] as ProblemId[],
    model: { feasibility: 3, effect: 1, note: t("It aims at every lost customer, whatever the reason, so economic 1; it repeats a friendly message and fixes no reason, so effect 1; but it is cheap and runs on its own, so sustainability 3.", "Es zielt auf jeden verlorenen Kunden, egal aus welchem Grund, also Wirtschaftlichkeit 1; es wiederholt eine freundliche Botschaft und behebt keinen Grund, also Wirkung 1; aber es ist billig und läuft von selbst, daher Nachhaltigkeit 3.") },
    verdict: t("Not in the model three: 3 points. It sends the same friendly message to everyone and fixes no reason.", "Nicht unter den drei Modellmaßnahmen: 3 Punkte. Es schickt allen dieselbe freundliche Botschaft und behebt keinen Grund."),
  },
  {
    id: "app" as MeasureId,
    short: t("25% discount for all", "25 % Rabatt für alle"),
    name: t("A 25% discount for every lost customer who returns within 90 days", "Ein Rabatt von 25 % für jeden verlorenen Kunden, der innerhalb von 90 Tagen zurückkehrt"),
    what: t(
      "Any lost customer who signs a new contract within 90 days of the offer gets 25% off the first year.",
      "Jeder verlorene Kunde, der innerhalb von 90 Tagen nach dem Angebot einen neuen Vertrag unterschreibt, erhält 25 % Rabatt auf das erste Jahr.",
    ),
    scene: t(
      "A customer who left over broken promises takes the discount and leaves again a year later, because nothing changed. A customer who would have returned anyway gets 25% off too.",
      "Ein Kunde, der wegen gebrochener Versprechen ging, nimmt den Rabatt und geht ein Jahr später wieder, weil sich nichts geändert hat. Ein Kunde, der ohnehin zurückgekehrt wäre, bekommt ebenfalls 25 % Rabatt.",
    ),
    who: t(
      "Finance sets the discount and sales sends the offer. Nobody checks the reason. Customers learn that leaving is rewarded.",
      "Finance legt den Rabatt fest, der Vertrieb verschickt das Angebot. Niemand prüft den Grund. Kunden lernen, dass Gehen belohnt wird.",
    ),
    area: "price" as MeasureArea,
    basis: t("Aims at every lost customer, whatever the reason.", "Zielt auf jeden verlorenen Kunden, egal aus welchem Grund."),
    joins: "none" as Joins,
    costParts: [
      { label: t("discount for the first year of about 40 returning customers, 40 × €9,000 × 25%", "Rabatt für das erste Jahr von etwa 40 zurückkehrenden Kunden, 40 × 9.000 € × 25 %"), amount: 90000 },
      { label: t("set-up in the contract tool", "Einrichtung im Vertragstool"), amount: 6000 },
      { label: t("approval process, 40 h × €100", "Genehmigungsprozess, 40 Std. × 100 €"), amount: 4000 },
    ],
    cost: 0,
    weeks: 2,
    targets: [] as ProblemId[],
    model: { feasibility: 1, effect: 1, note: t("It aims at every lost customer, including those who would return anyway, so economic 1; it buys the return without changing the reason the customer left, so effect 1; and the discount is given away again every year, so sustainability 1.", "Es zielt auf jeden verlorenen Kunden, auch auf die, die ohnehin zurückkämen, also Wirtschaftlichkeit 1; es erkauft die Rückkehr, ohne den Grund zu ändern, aus dem der Kunde ging, also Wirkung 1; und der Rabatt wird jedes Jahr wieder verschenkt, daher Nachhaltigkeit 1.") },
    verdict: t("Rejected: 1 point. It aims at everyone, buys the return without changing the reason, and the discount repeats every year.", "Verworfen: 1 Punkt. Es zielt auf alle, erkauft die Rückkehr, ohne den Grund zu ändern, und der Rabatt wiederholt sich jedes Jahr."),
  },
  {
    id: "suite" as MeasureId,
    short: t("Vendor platform", "Anbieter-Plattform"),
    name: t("A win-back platform from a vendor, with automatic offers chosen by a prediction model", "Eine Rückgewinnungs-Plattform eines Anbieters, mit automatischen Angeboten, die ein Vorhersagemodell wählt"),
    what: t(
      "A vendor cleans five years of customer records, trains a model that scores every lost customer on how likely it is to return, and sends the offer the model picks. The model's reasons are not shown.",
      "Ein Anbieter bereinigt fünf Jahre Kundendaten, trainiert ein Modell, das jeden verlorenen Kunden danach bewertet, wie wahrscheinlich er zurückkehrt, und versendet das Angebot, das das Modell wählt. Die Gründe des Modells werden nicht gezeigt.",
    ),
    scene: t(
      "For twenty-four weeks the vendor cleans records and trains the model. Then a lost customer gets an automatic offer, but nobody at RecoverIT can say why this one, or what the customer actually left over.",
      "Vierundzwanzig Wochen lang bereinigt der Anbieter Daten und trainiert das Modell. Dann bekommt ein verlorener Kunde ein automatisches Angebot, aber niemand bei RecoverIT kann sagen, warum gerade dieses, oder weswegen der Kunde eigentlich ging.",
    ),
    who: t(
      "A vendor builds and trains the model, IT cleans the data and managers read scores nobody can explain. Customers notice nothing until the model is live, after the four months.",
      "Ein Anbieter baut und trainiert das Modell, die IT bereinigt die Daten und Manager lesen Scores, die niemand erklären kann. Kunden bemerken nichts, bis das Modell live ist, nach den vier Monaten.",
    ),
    area: "value" as MeasureArea,
    basis: t("On paper aims at the customers the model scores highest, the ones most likely to return.", "Zielt auf dem Papier auf die Kunden, die das Modell am höchsten bewertet, also die mit der größten Rückkehrwahrscheinlichkeit."),
    joins: "all" as Joins,
    costParts: [
      { label: t("platform licences, 6 months × €8,000", "Plattform-Lizenzen, 6 Monate × 8.000 €"), amount: 48000 },
      { label: t("vendor builds and trains the model", "Anbieter baut und trainiert das Modell"), amount: 70000 },
      { label: t("data clean-up, 40 days × €800", "Datenbereinigung, 40 Tage × 800 €"), amount: 32000 },
    ],
    cost: 0,
    weeks: 24,
    targets: ["use", "retain", "integrate"] as ProblemId[],
    model: { feasibility: 1, effect: 2, note: t("On paper it aims at the likeliest returners, so economic 3, and it acts on part of the reasons, so effect 2; but it costs more than the whole budget, is in use only after 24 weeks, beyond the four months, and sends offers nobody can explain: sustainability 1.", "Auf dem Papier zielt es auf die wahrscheinlichsten Rückkehrer, also Wirtschaftlichkeit 3, und es geht auf einen Teil der Gründe ein, also Wirkung 2; aber es kostet mehr als das ganze Budget, ist erst nach 24 Wochen im Einsatz, nach den vier Monaten, und verschickt Angebote, die niemand erklären kann: Nachhaltigkeit 1.") },
    verdict: t("Rejected: 6 points. Nothing changes for customers within the four months, it takes more than the whole budget and nobody can explain its offers.", "Verworfen: 6 Punkte. In den vier Monaten ändert sich für Kunden nichts, es nimmt mehr als das ganze Budget, und niemand kann seine Angebote erklären."),
  },
]);
for (const m of RAW) {
  MEASURES.push(Object.assign(m, { evidence: bandOf(m.joins), cost: m.costParts.reduce((s, p) => s + p.amount, 0) }) as Measure);
}

export const MEASURE_BY_ID = Object.fromEntries(MEASURES.map((m) => [m.id, m])) as Record<MeasureId, Measure>;
export const MEASURE_IDS = MEASURES.map((m) => m.id);
export const CHOOSE = 3;
export const modelScore = (id: MeasureId) => {
  const m = MEASURE_BY_ID[id];
  return explainBucket(m.evidence) * m.model.feasibility * m.model.effect;
};
export const MODEL_MEASURES: MeasureId[] = ["unified", "handover", "predictive"];
export const MODEL_COST = MODEL_MEASURES.reduce((s, id) => s + MEASURE_BY_ID[id].cost, 0);

/** Weeks a measure is actually working inside the four months (0 when it only starts after them). */
export const workingWeeks = (id: MeasureId) => Math.max(0, FRAME_WEEKS - MEASURE_BY_ID[id].weeks);
