import { bi, t } from "@/lib/lang";
import { TASK1_MINUTES, TASK2_MINUTES } from "@/lib/routes";

/** One registry for every material card: the rail, the cards and the task chips all read it. */
export type MaterialId = "A1" | "A2" | "A3" | "A4" | "A5" | "A6" | "A7" | "B1" | "B2" | "B3" | "B4" | "B5";
export type Block = "A" | "B";
export type MaterialMeta = { id: MaterialId; block: Block; title: string; minutes: number; optional?: boolean };

/**
 * `optional: true` marks a card that no Core task block draws on (lib/progress.ts OPTIONAL_BLOCKS): collapsed by default via OptionalSection,
 * never removed (CLAUDE.md #35). From Day 13 each level has ONE Core card (CLAUDE.md #48): Route 1 Core cards are A1 (Level 1, the Core block 1.1)
 * and A7 (Level 2, the Core block 2.4); Route 2 Core card is B5. A Core block cites only its own Core card, and that card carries every rule the block needs
 * (CLAUDE.md #40), so A2 to A6 and B1 to B4 are Optional.
 *
 * Day 15: Materi A (Route 1, Levels 1 and 2) seven cards, 60 minutes (the two Core cards take 17); Materi B (Route 2, Level 3) five cards, 60 minutes
 * (the Core card takes 12). */
export const MATERIALS: MaterialMeta[] = bi([
  { id: "A1" as MaterialId, block: "A" as Block, title: t("Why customers leave: emotional, rational or outside our reach", "Warum Kunden gehen: emotional, rational oder außerhalb unseres Einflusses"), minutes: 9 },
  { id: "A2" as MaterialId, block: "A" as Block, title: t("What brings a customer back: trust, an easier return, value and incentives", "Was einen Kunden zurückbringt: Vertrauen, eine leichtere Rückkehr, Nutzen und Anreize"), minutes: 9, optional: true },
  { id: "A3" as MaterialId, block: "A" as Block, title: t("Where a win-back pays, and where it can use data that exists", "Wo sich eine Rückgewinnung lohnt, und wo sie vorhandene Daten nutzen kann"), minutes: 8, optional: true },
  { id: "A4" as MaterialId, block: "A" as Block, title: t("What a personal approach is worth: return rate, lift and extra revenue", "Was ein persönlicher Ansatz wert ist: Rückkehrquote, Lift und zusätzlicher Umsatz"), minutes: 9, optional: true },
  { id: "A5" as MaterialId, block: "A" as Block, title: t("Return signals: contact, visits, price questions and what they say", "Rückkehr-Signale: Kontakt, Besuche, Preisfragen und was sie sagen"), minutes: 8, optional: true },
  { id: "A6" as MaterialId, block: "A" as Block, title: t("Testing an approach fairly, and optimising as a continuous process", "Einen Ansatz fair testen, und Optimieren als fortlaufenden Prozess"), minutes: 9, optional: true },
  { id: "A7" as MaterialId, block: "A" as Block, title: t("Choosing win-back measures: economic viability, effect, sustainability", "Rückgewinnungsmaßnahmen wählen: Wirtschaftlichkeit, Wirkung, Nachhaltigkeit"), minutes: 8 },
  { id: "B1" as MaterialId, block: "B" as Block, title: t("A retention and win-back system: the target vision", "Ein Retention- und Win-back-System: das Zielbild"), minutes: 12, optional: true },
  { id: "B2" as MaterialId, block: "B" as Block, title: t("Central sources of evidence about lost customers: what the customer decides first, then the tool", "Zentrale Quellen von Evidenz über verlorene Kunden: zuerst, was der Kunde entscheidet, dann das Werkzeug"), minutes: 12, optional: true },
  { id: "B3" as MaterialId, block: "B" as Block, title: t("A KPI system for win-back: churn, win-back and reactivation rate, four tests", "Ein KPI-System für die Rückgewinnung: Churn, Win-back und Reactivation Rate, vier Tests"), minutes: 12, optional: true },
  { id: "B4" as MaterialId, block: "B" as Block, title: t("Optimising win-back: roll out, keep testing or stop", "Rückgewinnung optimieren: ausrollen, weiter testen oder stoppen"), minutes: 12, optional: true },
  { id: "B5" as MaterialId, block: "B" as Block, title: t("An investment decision under an unclear success rate, and the system", "Eine Investitionsentscheidung bei unklarer Erfolgsquote, und das System"), minutes: 12 },
]);

export const MATERIAL_BY_ID = Object.fromEntries(MATERIALS.map((m) => [m.id, m])) as Record<MaterialId, MaterialMeta>;
export const materialAnchorId = (id: MaterialId) => `mat-${id}`;

export type RailSection = { id: string; label: string; sub: string; minutes: number };
export const SECTIONS: Record<1 | 2, RailSection[]> = bi({
  1: [
    { id: "materi-a", label: t("Materi A", "Materi A"), sub: t("Levels 1 + 2 · understand, analyse, choose", "Level 1 + 2 · verstehen, analysieren, wählen"), minutes: 60 },
    { id: "task-1", label: t("Task 1", "Task 1"), sub: t("Win-Back Analysis · one case", "Win-Back Analysis · ein Fall"), minutes: TASK1_MINUTES },
  ],
  2: [
    { id: "materi-b", label: t("Materi B", "Materi B"), sub: t("Level 3 · retention and win-back system", "Level 3 · Retention- und Win-back-System"), minutes: 60 },
    { id: "task-2", label: t("Task 2", "Task 2"), sub: t("Win-Back System Memo · CCO", "Win-Back System Memo · CCO"), minutes: TASK2_MINUTES },
  ],
});
