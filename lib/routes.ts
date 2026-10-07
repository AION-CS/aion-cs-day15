import { bi, t } from "@/lib/lang";

/**
 * Day 15 route registry: Customer Retention & Buying Behaviour in B2B IT Sales, Module 8, Day 2 (strategically managing customer win-back and
 * systematically optimising retention). From Day 3 on, a day has TWO routes (CLAUDE.md #30): Route 1 merges Level 1 and Level 2 on one case, Route 2 is Level 3. From
 * Day 13 each level has ONE Core block and ONE Core card (CLAUDE.md #48): Route 1 Core is Block 1.1 (Level 1) and Block 2.4 (Level 2); Route 2
 * Core is one frame (Step A and Step B together).
 */
export const COURSE = bi({
  title: t("Strategically Managing Customer Win-Back and Systematically Optimising Retention", "Kundenrückgewinnung strategisch steuern und Retention systematisch optimieren"),
  site: t("Retention Lab · Day 15", "Retention Lab · Tag 15"),
  module: t("Module 8, Day 2 of 2", "Modul 8, Tag 2 von 2"),
  course: t("Customer Retention & Buying Behaviour in B2B IT Sales", "Customer Retention & Kaufverhalten im B2B-IT-Vertrieb"),
  day: 15,
  company: "RecoverIT Services GmbH",
});

export type RouteNo = 1 | 2;

export const BLOCK_MINUTES = { "1.1": 6, "1.2": 5, "1.3": 9, "1.4": 5, "2.1": 11, "2.2": 6, "2.3": 8, "2.4": 14, "3.1": 5, "3.2": 8, "3.3": 10, "3.4": 8, "3.5": 10, "3.6": 9 } as const;
const sum = (keys: (keyof typeof BLOCK_MINUTES)[]) => keys.reduce((s, k) => s + BLOCK_MINUTES[k], 0);
export const TASK1_MINUTES = sum(["1.1", "1.2", "1.3", "1.4", "2.1", "2.2", "2.3", "2.4"]);
export const TASK2_MINUTES = sum(["3.1", "3.2", "3.3", "3.4", "3.5", "3.6"]);
/** The Core part of each task: one block per level in Route 1, one frame in Route 2 (CLAUDE.md #48). */
export const CORE1_MINUTES = sum(["1.1", "2.4"]);
export const CORE2_MINUTES = sum(["3.5", "3.6"]);
/** Minutes of the Core cards (A1 and A7, B5), as printed in the material index. */
export const CORE_CARD_MINUTES = { 1: 17, 2: 12 } as const;

export type RouteInfo = { n: RouteNo; href: string; short: string; title: string; level: string; blurb: string; plan: { label: string; minutes: number }[]; built: boolean };

export const ROUTES: RouteInfo[] = bi([
  {
    n: 1 as RouteNo,
    href: "/route-1/",
    short: t("Win back", "Zurückgewinnen"),
    title: t("Route 1 · Understand, analyse, choose", "Route 1 · Verstehen, analysieren, wählen"),
    level: t("Levels 1 + 2 · Knowledge and application", "Level 1 + 2 · Wissen und Anwendung"),
    blurb: t(
      "One case, two levels: RecoverIT Services has a high churn rate, its win-back is inefficient and its measures cannot be measured. You learn why customers leave (emotional, rational or outside RecoverIT's reach), what could bring them back, how to read the behaviour of customers who have left and test an approach fairly, and how to weigh win-back measures by economic viability, effect and sustainability. The core is two blocks, one per level: you sort nine reasons heard from customers who left (Level 1), then choose three of six win-back measures inside €140,000 and four months, score them and defend the order (Level 2). Six more blocks are optional and folded. Material first, then one task that ends in a Win-Back Analysis File.",
      "Ein Fall, zwei Level: RecoverIT Services hat eine hohe Churn Rate, seine Rückgewinnung ist ineffizient, und seine Maßnahmen lassen sich nicht messen. Sie lernen, warum Kunden gehen (emotional, rational oder außerhalb des Einflusses von RecoverIT), was sie zurückbringen könnte, wie man das Verhalten von Kunden liest, die gegangen sind, und einen Ansatz fair testet, und wie man Rückgewinnungsmaßnahmen nach Wirtschaftlichkeit, Wirkung und Nachhaltigkeit bewertet. Der Kern sind zwei Blöcke, einer pro Level: Sie ordnen neun Gründe, die verlorene Kunden nannten (Level 1), und wählen dann drei von sechs Rückgewinnungsmaßnahmen innerhalb von 140.000 € und vier Monaten, bewerten sie und begründen die Reihenfolge (Level 2). Sechs weitere Blöcke sind optional und eingeklappt. Erst das Material, dann eine Aufgabe, die in einer Win-Back Analysis File endet.",
    ),
    plan: [
      { label: t("Materi A · seven cards, two of them core (A1, A7)", "Materi A · sieben Karten, zwei davon Kern (A1, A7)"), minutes: 60 },
      { label: t("Task 1 · Win-Back Analysis, two core blocks", "Task 1 · Win-Back Analysis, zwei Kernblöcke"), minutes: TASK1_MINUTES },
    ],
    built: true,
  },
  {
    n: 2 as RouteNo,
    href: "/route-2/",
    short: t("Decide", "Entscheiden"),
    title: t("Route 2 · Management decision", "Route 2 · Managemententscheidung"),
    level: t("Level 3 · Management decision", "Level 3 · Managemententscheidung"),
    blurb: t(
      "You are now RecoverIT's Chief Customer Officer. Churn is high, win-back is inefficient and the measures are not managed. You build a retention and win-back system on a live panel that shows what your choices do: each of eight items is set to Now, After the data is ready or Not now, and the diagram, three bars and four tests redraw at once. Then you make an investment decision despite an unclear success rate and say what you will watch and when you would stop. That is the one core task of this route; four optional blocks go deeper. Material first (one core card), then one task that ends in a Win-Back System Memo that assembles below your answers.",
      "Sie sind jetzt Chief Customer Officer von RecoverIT. Der Churn ist hoch, die Rückgewinnung ineffizient, und die Maßnahmen werden nicht gesteuert. Sie bauen ein Retention- und Win-back-System an einem Live-Panel, das zeigt, was Ihre Entscheidungen bewirken: Jeder von acht Punkten steht auf Jetzt, Wenn die Daten bereit sind oder Jetzt nicht, und Diagramm, drei Balken und vier Tests zeichnen sich sofort neu. Dann treffen Sie eine Investitionsentscheidung trotz unklarer Erfolgsquote und sagen, was Sie beobachten und wann Sie aufhören würden. Das ist die eine Kernaufgabe dieser Route; vier optionale Blöcke vertiefen. Erst das Material (eine Kernkarte), dann eine Aufgabe, die in einem Win-Back System Memo endet, das sich unter Ihren Antworten zusammensetzt.",
    ),
    plan: [
      { label: t("Materi B · five cards, one of them core (B5)", "Materi B · fünf Karten, eine davon Kern (B5)"), minutes: 60 },
      { label: t("Task 2 · Win-Back System Memo, one core task", "Task 2 · Win-Back System Memo, eine Kernaufgabe"), minutes: TASK2_MINUTES },
    ],
    built: true,
  },
]);
