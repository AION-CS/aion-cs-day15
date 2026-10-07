import type { ArchId, KpiId } from "@/data/route2";
import { bi, t } from "@/lib/lang";

/**
 * What the Step A item cards of Route 2 print besides the panel's own facts (CLAUDE.md #47, #46): one line of a normal day at RecoverIT with
 * the item in use, who does what and what changes for the customer. Case assumptions, like every other figure of Route 2.
 */
export type ArchExtra = { scene: string };

export const ARCH_EXTRA: Record<ArchId, ArchExtra> = bi({
  foundation: {
    scene: t(
      "On Monday an account owner opens one list: the lost customers of the last twelve months with the reason each gave, what the contract was worth and who owns the next step. Next to it are the three rates on one page. Before, reasons sat in exit notes, values in the contract system and results in a manager's mailbox, and nobody saw them together.",
      "Am Montag öffnet ein Account Owner eine Liste: die verlorenen Kunden der letzten zwölf Monate mit dem Grund, den jeder nannte, dem Wert des Vertrags und wer den nächsten Schritt besitzt. Daneben stehen die drei Quoten auf einer Seite. Vorher lagen Gründe in Abschlussnotizen, Werte im Vertragssystem und Ergebnisse im Postfach eines Managers, und niemand sah sie zusammen.",
    ),
  },
  chat: {
    scene: t(
      "The CRM, the contract system and the exit survey now call a lost customer by the same ID and record the reason with the same codes. A customer who ticked “price” in the survey and said “nobody called us” in the exit call is one customer with both reasons, not two unrelated entries.",
      "CRM, Vertragssystem und Abschlussumfrage nennen einen verlorenen Kunden jetzt mit derselben ID und erfassen den Grund mit denselben Codes. Ein Kunde, der in der Umfrage „Preis“ ankreuzte und im Abschlussgespräch sagte „uns hat niemand angerufen“, ist ein Kunde mit beiden Gründen, nicht zwei unverbundene Einträge.",
    ),
  },
  personal: {
    scene: t(
      "A rule reads that one lost customer left after an outage nobody followed up. It creates a task for the former account owner: “Call this week and say what was fixed.” A customer who left for a lower fee gets a tailored offer instead. A customer whose company closed gets nothing.",
      "Eine Regel liest, dass ein verlorener Kunde nach einem Ausfall ging, dem niemand nachging. Sie legt eine Aufgabe für den früheren Account Owner an: „Diese Woche anrufen und sagen, was behoben wurde.“ Ein Kunde, der wegen einer niedrigeren Gebühr ging, bekommt stattdessen ein maßgeschneidertes Angebot. Ein Kunde, dessen Firma schloss, bekommt nichts.",
    ),
  },
  routing: {
    scene: t(
      "Two lost customers could be called this week. One paid €30,000 a year and said it was open to returning; the other paid €4,000 and did not answer. The list puts the first at the top, so the account owner's week goes where a return is worth most.",
      "Zwei verlorene Kunden könnten diese Woche angerufen werden. Einer zahlte 30.000 € im Jahr und sagte, er sei offen für eine Rückkehr; der andere zahlte 4.000 € und antwortete nicht. Die Liste setzt den ersten nach oben, sodass die Woche des Account Owners dorthin geht, wo eine Rückkehr am meisten wert ist.",
    ),
  },
  training: {
    scene: t(
      "In a half-day session an account owner and a sales manager each role-play a return call that starts with “Here is what we changed since you left” and practise logging the answer in the CRM. Both then talk about the same lost customers in the same words.",
      "In einer halbtägigen Einheit spielen ein Account Owner und ein Vertriebsmanager jeweils einen Rückkehr-Anruf durch, der mit „Das haben wir seit Ihrem Abschied geändert“ beginnt, und üben, die Antwort im CRM festzuhalten. Beide sprechen danach über dieselben verlorenen Kunden in denselben Worten.",
    ),
  },
  tracking: {
    scene: t(
      "Before a new offer goes to a whole group, half of the group gets it and the other half keeps the standard e-mail. Once a month a one-page review lists the return rates of both halves, and the team decides to keep, change or stop the offer.",
      "Bevor ein neues Angebot an eine ganze Gruppe geht, bekommt es die Hälfte der Gruppe, und die andere Hälfte behält die Standard-E-Mail. Einmal im Monat listet ein einseitiges Review die Rückkehrquoten beider Hälften auf, und das Team entscheidet, das Angebot zu behalten, zu ändern oder zu stoppen.",
    ),
  },
  suite: {
    scene: t(
      "A vendor builds a model on five years of records and sends each lost customer the offer the model picks. A manager sees that a customer got a 20% offer and cannot tell why, or what the customer actually left over.",
      "Ein Anbieter baut ein Modell auf fünf Jahren Daten und sendet jedem verlorenen Kunden das Angebot, das das Modell wählt. Ein Manager sieht, dass ein Kunde ein Angebot von 20 % bekam, und kann nicht sagen, warum, oder weswegen der Kunde eigentlich ging.",
    ),
  },
  relaunch: {
    scene: t(
      "Every lost customer receives an offer of 25% off the first year if it returns within 90 days. A customer who left over broken promises accepts and leaves again a year later; a customer who would have come back anyway gets the discount too. Nobody checks why a customer left.",
      "Jeder verlorene Kunde erhält das Angebot von 25 % Rabatt auf das erste Jahr, wenn er innerhalb von 90 Tagen zurückkehrt. Ein Kunde, der wegen gebrochener Versprechen ging, nimmt an und geht ein Jahr später wieder; ein Kunde, der ohnehin zurückgekommen wäre, bekommt den Rabatt auch. Niemand prüft, warum ein Kunde ging.",
    ),
  },
});

/** The aim printed beside each customer KPI in "the numbers today" (the figure Step B's "what I watch" sentence can quote). */
export const KPI_AIM: Partial<Record<KpiId, number>> = { conv: 15, engage: 55 };
