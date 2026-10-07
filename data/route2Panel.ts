import { ARCH_IDS } from "@/data/route2";
import type { ArchId } from "@/data/route2";
import { bi, t } from "@/lib/lang";

/**
 * What the Route 2 control panel reads (CLAUDE.md #47). Every figure is a Case assumption and is printed on the item cards and in "the
 * numbers today", so the Core frame never reads an Optional block (#40): `data` is the share of the data an approach reads that already reaches the
 * shared list of lost customers, the same figure the source list of the “Go deeper” part prints for the source it also names (a check in
 * `npm run verify:calc` keeps them equal). Nothing here asks the learner to calculate (#44): the panel computes it and says what it means.
 * (Identifiers keep the names of the file this was built from: `chat` is the lost-customer data clean-up, `personal` the reason-based approach,
 * `routing` the value-based priority, `tracking` the test-and-learn routine, `relaunch` the 25% discount for every lost customer.)
 */
export type Tier = "now" | "later" | "not";
export const TIER_IDS: Tier[] = ["now", "later", "not"];
export const TIER_LABEL = bi({ now: t("Now", "Jetzt"), later: t("After data is ready", "Wenn die Daten bereit sind"), not: t("Not now", "Jetzt nicht") });

/** The "weaker data" scenario: every readiness figure is this many points lower (the plan's “incomplete data situation”). */
export const WEAK_POINTS = 15;
/** An approach starts on data that is at least this complete (the rule of Materi B5; the same bar as the “Go deeper” part's). */
export const READY_BAR = 80;

/** Where an item sits in the architecture diagram. */
export type Layer = "suite" | "site" | "engine" | "people" | "base";

export type PanelFacts = {
  layer: Layer;
  /** Short name for the diagram. */
  short: string;
  /** What the item does for the system, in one phrase after "Moves". */
  moves: string;
  /** It moves a named KPI of customers (a rate customers' behaviour changes). */
  named: boolean;
  /** It makes the other items measurable or usable (the scoreboard and list, the data clean-up, the training, the test-and-learn routine). */
  enabler: boolean;
  /** Its effect can be measured once it is in place (a named KPI, or the measurement system itself). */
  measured: boolean;
  /** Share of the data it reads that already reaches the shared list of lost customers today (percent), or null when it needs no data to start. */
  data: number | null;
  /** The lost-customer data clean-up prepares the data this item reads: it is ready when the clean-up is in use before the item starts. */
  cleaned: boolean;
  blackBox: boolean;
};

export const PANEL: Record<ArchId, PanelFacts> = bi({
  foundation: { layer: "base" as Layer, short: t("Win-back scoreboard and list of lost customers", "Win-back-Scoreboard und Liste verlorener Kunden"), moves: t("no KPI by itself: every approach reads one lost customer, and every KPI is counted once for all of them", "keinen KPI selbst: Jeder Ansatz liest einen verlorenen Kunden, und jeder KPI wird einmal für alle gezählt"), named: false, enabler: true, measured: true, data: null, cleaned: false, blackBox: false },
  chat: { layer: "people" as Layer, short: t("Lost-customer data clean-up", "Bereinigung der Daten verlorener Kunden"), moves: t("no KPI by itself: the reason and the contract value of a lost customer are recorded the same way in the CRM, the contract system and the exit survey", "keinen KPI selbst: Grund und Vertragswert eines verlorenen Kunden werden in CRM, Vertragssystem und Abschlussumfrage gleich erfasst"), named: false, enabler: true, measured: false, data: null, cleaned: false, blackBox: false },
  personal: { layer: "engine" as Layer, short: t("Reason-based approach", "Grundbasierter Ansatz"), moves: t("the share of approached lost customers who answer within two weeks, by matching the approach to the reason", "den Anteil der angesprochenen verlorenen Kunden, die innerhalb von zwei Wochen antworten, indem der Ansatz zum Grund passt"), named: true, enabler: false, measured: true, data: 82, cleaned: false, blackBox: false },
  routing: { layer: "engine" as Layer, short: t("Value-based priority", "Wertbasierte Priorität"), moves: t("the win-back rate, by sending effort to the customers worth most and skipping the groups that cannot return", "die Win-back Rate, indem der Aufwand an die wertvollsten Kunden geht und die Gruppen übersprungen werden, die nicht zurückkehren können"), named: true, enabler: false, measured: true, data: 60, cleaned: true, blackBox: false },
  training: { layer: "people" as Layer, short: t("Training for win-back conversations", "Training für Rückgewinnungsgespräche"), moves: t("no KPI by itself: the teams open return calls with the fixed reason and log what the customer said", "keinen KPI selbst: Die Teams eröffnen Rückkehr-Anrufe mit dem behobenen Grund und halten fest, was der Kunde sagte"), named: false, enabler: true, measured: false, data: null, cleaned: false, blackBox: false },
  tracking: { layer: "people" as Layer, short: t("Test-and-learn routine", "Test-and-learn-Routine"), moves: t("the win-back rate, by testing every offer on a random half first and keeping only what the return rates support", "die Win-back Rate, indem jedes Angebot zuerst an einer zufälligen Hälfte getestet wird und nur behalten wird, was die Rückkehrquoten stützen"), named: true, enabler: true, measured: true, data: null, cleaned: false, blackBox: false },
  suite: { layer: "suite" as Layer, short: t("Vendor win-back platform", "Win-back-Plattform des Anbieters"), moves: t("no KPI it reports: it picks an offer for every lost customer and its reasons and results are not shown", "keinen KPI, den es berichtet: Es wählt für jeden verlorenen Kunden ein Angebot, und seine Gründe und Ergebnisse werden nicht gezeigt"), named: false, enabler: false, measured: false, data: null, cleaned: false, blackBox: true },
  relaunch: { layer: "site" as Layer, short: t("25% discount for every lost customer", "25 % Rabatt für jeden verlorenen Kunden"), moves: t("no KPI it names: it counts discounts accepted, which is revenue given away, and it is not connected to the reason a customer left", "keinen KPI, den er nennt: Er zählt angenommene Rabatte, also verschenkten Umsatz, und ist nicht mit dem Grund verbunden, aus dem ein Kunde ging"), named: false, enabler: false, measured: false, data: null, cleaned: false, blackBox: false },
});

/** The approaches that read the shared list: the reason-based approach and the value-based priority. */
export const ENGINE_IDS: ArchId[] = ["personal", "routing"];
/** The item the "After data is ready" tier waits for (a clean record puts the data onto the shared list), and the one that makes everything else measurable. */
export const CLEAN_ID: ArchId = "chat";
export const KPI_SYSTEM_ID: ArchId = "foundation";

/**
 * The model plan (CLAUDE.md #47): the six items that fit the budget; the value-based priority waits for the lost-customer data clean-up to put
 * its data onto the shared list; the vendor platform and the discount for every lost customer stay out (the platform is in use only in month 7,
 * after the 4 months; the discount names no KPI and is not connected).
 */
export const MODEL_TIER: Record<ArchId, Tier> = { foundation: "now", chat: "now", personal: "now", routing: "later", training: "now", tracking: "now", suite: "not", relaunch: "not" };
export const MODEL_ARCH: ArchId[] = ARCH_IDS.filter((id) => MODEL_TIER[id] !== "not");
