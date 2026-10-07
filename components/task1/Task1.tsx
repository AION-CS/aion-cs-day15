"use client";

import { ExportBar } from "@/components/ui/ExportBar";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { Block11, Block12, Block13, Block14 } from "@/components/task1/Part1";
import { Block21, Block22, Block23, Block24 } from "@/components/task1/Part2";
import { Callout } from "@/components/ui/MaterialCard";
import { BUDGET, MONTHS } from "@/data/measures";
import { analysisBody } from "@/lib/exportDoc";
import { l1Missing } from "@/lib/missing";
import { euro, num, tt } from "@/lib/lang";
import { FORECAST, PILOT } from "@/data/forecast";
import { exportName } from "@/lib/slug";
import { usePersisted } from "@/store/usePersisted";
import { Gloss } from "@/lib/glossify";
import { BLOCK_MINUTES, CORE1_MINUTES, TASK1_MINUTES } from "@/lib/routes";

function CaseBrief() {
  return (
    <section id="case-brief" aria-labelledby="case-h" className="card space-y-3 p-4 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="case-h">{tt("The case: RecoverIT Services GmbH", "Der Fall: RecoverIT Services GmbH")}</h2>
        <span className="smallcaps">{tt("Read once · about 5 min", "Einmal lesen · ca. 5 Min.")}</span>
      </div>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt("RecoverIT Services GmbH sells managed IT services to the Mittelstand: monitoring, cloud hosting and a service desk. Too many customers leave every year, and the only thing the company does about it is one discount e-mail to every customer who left. It does not know why they went, what each was worth or how many came back because of the mail, so its measures cannot be measured. Management wants to know which lost customers are worth winning back, with what, and which measures fit the budget and the time.", "RecoverIT Services GmbH verkauft dem Mittelstand Managed IT-Services: Monitoring, Cloud Hosting und einen Service Desk. Zu viele Kunden gehen jedes Jahr, und das Einzige, was das Unternehmen dagegen tut, ist eine Rabatt-E-Mail an jeden Kunden, der ging. Es weiß nicht, warum sie gingen, was jeder wert war oder wie viele wegen der Mail zurückkamen, also lassen sich seine Maßnahmen nicht messen. Die Geschäftsführung will wissen, welche verlorenen Kunden sich zurückzugewinnen lohnen, womit, und welche Maßnahmen in Budget und Zeit passen.")}
        </Gloss>
      </p>
      <p className="max-w-prose text-body text-ink">
        <Gloss>
          {tt(
            `One first hint: last year ${num(PILOT.control.sent)} lost customers whose reason RecoverIT could fix got the standard e-mail; ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })}% returned. ${num(PILOT.variant.sent)} were called by their former account owner after the reason was fixed; ${num(FORECAST.f1, { maximumFractionDigits: 1 })}% returned, ${num(FORECAST.f2)} times as often. The owners may have called the customers they knew best, so it is a hint, not proof.`,
            `Ein erster Hinweis: Im letzten Jahr bekamen ${num(PILOT.control.sent)} verlorene Kunden, deren Grund RecoverIT beheben konnte, die Standard-E-Mail; ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })} % kehrten zurück. ${num(PILOT.variant.sent)} rief ihr früherer Account Owner an, nachdem der Grund behoben war; ${num(FORECAST.f1, { maximumFractionDigits: 1 })} % kehrten zurück, ${num(FORECAST.f2)}-mal so oft. Die Account Owner riefen vielleicht die Kunden an, die sie am besten kannten, also ist es ein Hinweis, kein Beweis.`,
          )}
        </Gloss>
      </p>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("What you have", "Was Sie haben")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>{tt("Nine reasons the customer success team has heard from customers who left (Block 1.1).", "Neun Gründe, die das Customer-Success-Team von Kunden gehört hat, die gegangen sind (Block 1.1).")}</li>
            <li>{tt("Last year's return figures (optional Block 1.2) and eight groups of lost customers (optional Block 1.3).", "Die Rückkehr-Werte des letzten Jahres (optionaler Block 1.2) und acht Gruppen verlorener Kunden (optionaler Block 1.3).")}</li>
            <li>{tt("Twelve return signals RecoverIT could watch (optional Block 2.1) and six win-back measures it could fund (Block 2.4).", "Zwölf Rückkehr-Signale, die RecoverIT beobachten könnte (optionaler Block 2.1), und sechs Rückgewinnungsmaßnahmen, die es finanzieren könnte (Block 2.4).")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt("The limits", "Die Grenzen")}</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-ink">
            <li>
              {tt("Budget: ", "Budget: ")}
              <strong>{euro(BUDGET)}</strong>
            </li>
            <li>
              {tt("Time: ", "Zeit: ")}
              <strong>{tt(`${MONTHS} months`, `${MONTHS} Monate`)}</strong>
            </li>
            <li>{tt("The cost, the weeks and who every measure aims at are printed in Block 2.4. A returned customer is worth about €9,000 a year.", "Kosten, Wochen und worauf jede Maßnahme zielt, stehen in Block 2.4. Ein zurückgekehrter Kunde ist etwa 9.000 € im Jahr wert.")}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-3 text-caption">
          <p className="smallcaps">{tt(`How the task runs · two core blocks, about ${CORE1_MINUTES} min`, `So läuft die Aufgabe · zwei Kernblöcke, ca. ${CORE1_MINUTES} Min.`)}</p>
          <ol className="mt-1 list-decimal space-y-1 pl-4 text-ink">
            <li>{tt("Block 1.1: sort nine reasons into emotional, rational or outside our reach, and add one reason a customer could come back, of your own (Level 1, material A1).", "Block 1.1: neun Gründe in emotional, rational oder außerhalb unseres Einflusses sortieren und einen eigenen Grund ergänzen, aus dem ein Kunde zurückkommen könnte (Level 1, Material A1).")}</li>
            <li>{tt("Block 2.4: choose three of six measures, score them by economic viability, effect and sustainability, and defend the order (Level 2, material A7).", "Block 2.4: drei von sechs Maßnahmen wählen, sie nach Wirtschaftlichkeit, Wirkung und Nachhaltigkeit bewerten und die Reihenfolge begründen (Level 2, Material A7).")}</li>
          </ol>
          <p className="mt-1 text-ash">{tt(`Six more blocks (about ${TASK1_MINUTES - CORE1_MINUTES} min) are optional and folded.`, `Sechs weitere Blöcke (ca. ${TASK1_MINUTES - CORE1_MINUTES} Min.) sind optional und eingeklappt.`)}</p>
        </div>
      </div>
      <Callout label={tt("Case assumption", "Fallannahme")} tone="amber">
        <p>
          {tt("The brief says: the churn rate is high; win-back is inefficient; the measures are not measurable; €140,000 and four months. Everything else is made up for this exercise: the reasons, the return figures, the groups of lost customers, the signals, the rates, the €9,000 a year and the costs.", "Der Auftrag sagt: Die Churn Rate ist hoch; die Rückgewinnung ist ineffizient; die Maßnahmen sind nicht messbar; 140.000 € und vier Monate. Alles andere ist für diese Übung erfunden: die Gründe, die Rückkehr-Werte, die Gruppen verlorener Kunden, die Signale, die Quoten, die 9.000 € im Jahr und die Kosten.")}
        </p>
      </Callout>
    </section>
  );
}

function PartHeading({ id, n, title, level }: { id: string; n: number; title: string; level: string }) {
  return (
    <div id={id} className="flex flex-wrap items-baseline gap-x-3 border-b-2 border-ink pb-1 pt-2">
      <span className="smallcaps text-accent">{tt(`Part ${n}`, `Teil ${n}`)}</span>
      <h2>{title}</h2>
      <span className="smallcaps ml-auto">{level}</span>
    </div>
  );
}

export function Task1() {
  const p = usePersisted();
  const missing = l1Missing(p);
  const filename = exportName(p.participant.name, "l1l2-win-back-analysis-file");
  return (
    <section id="task-1" aria-labelledby="task1-h" className="space-y-6">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt(`Task 1 · two core blocks, one per level; optional blocks folded`, `Task 1 · zwei Kernblöcke, einer pro Level; optionale Blöcke eingeklappt`)}</p>
        <h2 id="task1-h">{tt("Win-Back Analysis: understand, analyse, choose", "Win-Back Analysis: verstehen, analysieren, wählen")}</h2>
      </header>
      <CaseBrief />
      <PartHeading id="part-1" n={1} title={tt("Understand churn and win-back", "Churn und Rückgewinnung verstehen")} level={tt("Level 1 · Knowledge", "Level 1 · Wissen")} />
      <Block11 />
      <OptionalSection
        id="block-1-2"
        title={tt("Block 1.2 · Read the return figures: two return rates side by side", "Block 1.2 · Die Rückkehr-Werte lesen: zwei Rückkehrquoten nebeneinander")}
        minutes={BLOCK_MINUTES["1.2"]}
        reason={tt("Practises reading one comparison without being fooled by it (the two groups may differ in other ways); the choices of Block 2.4 do not need it.", "Übt, einen Vergleich zu lesen, ohne sich täuschen zu lassen (die zwei Gruppen unterscheiden sich vielleicht auch in anderem); die Entscheidungen in Block 2.4 brauchen es nicht.")}
      >
        <Block12 />
      </OptionalSection>
      <OptionalSection
        id="block-1-3"
        title={tt("Block 1.3 · Where a win-back pays, where it can use data we have, and three approaches", "Block 1.3 · Wo sich die Rückgewinnung lohnt, wo sie vorhandene Daten nutzen kann, und drei Ansätze")}
        minutes={BLOCK_MINUTES["1.3"]}
        reason={tt("Develops three simple win-back approaches and finds the groups where a win-back pays; Block 1.1 and the measures of Block 2.4 are answered without it.", "Entwickelt drei einfache Rückgewinnungsansätze und findet die Gruppen, in denen sich die Rückgewinnung lohnt; Block 1.1 und die Maßnahmen in Block 2.4 werden auch ohne ihn beantwortet.")}
      >
        <Block13 />
      </OptionalSection>
      <OptionalSection
        id="block-1-4"
        title={tt("Block 1.4 · Coaching reflection: from Level 1 to Level 2", "Block 1.4 · Coaching-Reflexion: von Level 1 zu Level 2")}
        minutes={BLOCK_MINUTES["1.4"]}
        reason={tt("A reflective bridge between Level 1 and Level 2, not content the Win-Back Analysis File itself needs.", "Eine reflektierende Brücke zwischen Level 1 und Level 2, kein Inhalt, den die Win-Back Analysis File selbst braucht.")}
      >
        <Block14 />
      </OptionalSection>
      <PartHeading id="part-2" n={2} title={tt("Analyse and choose", "Analysieren und auswählen")} level={tt("Level 2 · Application", "Level 2 · Anwendung")} />
      <OptionalSection
        id="block-2-1"
        title={tt("Block 2.1 · Tag RecoverIT's twelve return signals by family, and name your three", "Block 2.1 · Die zwölf Rückkehr-Signale von RecoverIT nach Familie zuordnen, und Ihre drei nennen")}
        minutes={BLOCK_MINUTES["2.1"]}
        reason={tt("Practises telling the four families of return signal apart; the choices of Block 2.4 are made and scored without it.", "Übt, die vier Familien von Rückkehr-Signalen zu unterscheiden; die Entscheidungen in Block 2.4 werden auch ohne ihn getroffen und bewertet.")}
      >
        <Block21 />
      </OptionalSection>
      <OptionalSection
        id="block-2-2"
        title={tt("Block 2.2 · What each family of return signal is worth, and the uncertainties", "Block 2.2 · Was jede Familie von Rückkehr-Signalen wert ist, und die Unsicherheiten")}
        minutes={BLOCK_MINUTES["2.2"]}
        reason={tt("Reads when each family of return signal shows, from your tags in Block 2.1, and what can mislead win-back data; Block 2.4 can be answered without it.", "Liest, wann sich jede Familie von Rückkehr-Signalen zeigt, aus Ihren Zuordnungen in Block 2.1, und was Win-back-Daten in die Irre führen kann; Block 2.4 lässt sich auch ohne es beantworten.")}
      >
        <Block22 />
      </OptionalSection>
      <OptionalSection
        id="block-2-3"
        title={tt("Block 2.3 · Design a fair A/B test", "Block 2.3 · Einen fairen A/B-Test entwerfen")}
        minutes={BLOCK_MINUTES["2.3"]}
        reason={tt("Applies the fair-test rules of Materi A6 to a call after the fix; the measures of Block 2.4 are chosen and scored without it.", "Wendet die Regeln eines fairen Tests aus Materi A6 auf einen Anruf nach der Behebung an; die Maßnahmen in Block 2.4 werden auch ohne ihn gewählt und bewertet.")}
      >
        <Block23 />
      </OptionalSection>
      <Block24 />
      <ExportBar
        id="export-l1l2"
        previewTitle={tt("Preview of your Win-Back Analysis File", "Vorschau Ihrer Win-Back Analysis File")}
        exportLabel={tt("Export the Win-Back Analysis File", "Win-Back Analysis File exportieren")}
        docTitle="Win-Back Analysis File"
        filename={filename}
        missing={missing}
        buildBody={() => analysisBody(p)}
      />
    </section>
  );
}
