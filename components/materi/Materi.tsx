"use client";

import { CARDS_A } from "@/components/materi/CardsA";
import { CARDS_B } from "@/components/materi/CardsB";
import { useCardMore } from "@/store/useCardMore";
import { OptionalSection } from "@/components/ui/OptionalSection";
import { ReferencesAccordion } from "@/components/ui/ReferencesAccordion";
import { MATERIALS, SECTIONS, materialAnchorId } from "@/data/materialIndex";
import type { RefKey } from "@/data/references";
import { tt } from "@/lib/lang";

const REFS_A: RefKey[] = ["morgan1994", "griffin2001", "burnham2003", "stauss1999", "reinartz2000", "gupta2004", "provost2013", "kaplan1992", "dawes1979", "kohavi2020", "thomas2004", "hubbard2014", "davenport2018"];
const REFS_B: RefKey[] = ["kaplan1992", "gdpr2016", "hubbard2014", "kohavi2020", "thomas2004", "davenport2018", "courtney1997", "klein2007"];

const CARDS_A_META = MATERIALS.filter((m) => m.block === "A");
const CARDS_B_META = MATERIALS.filter((m) => m.block === "B");

function Block({ id, title, intro, children }: { id: string; title: string; intro: string; children: React.ReactNode }) {
  const all = useCardMore((s) => s.all);
  const setAll = useCardMore((s) => s.setAll);
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="space-y-4">
      <header className="space-y-1">
        <p className="smallcaps text-accent">{title}</p>
        <h2 id={`${id}-h`}>{intro}</h2>
        <button type="button" aria-pressed={all} onClick={() => setAll(!all)} className="btn-ghost btn-sm">
          {all ? tt("Hide the extra explanations", "Zusatzerklärungen ausblenden") : tt("Show every extra explanation, video and rule", "Alle Zusatzerklärungen, Videos und Regeln zeigen")}
        </button>
      </header>
      {children}
    </section>
  );
}
const NOTE = () => tt("Check every source before you teach from it: page numbers and editions differ between printings.", "Prüfen Sie jede Quelle, bevor Sie damit unterrichten: Seitenzahlen und Auflagen unterscheiden sich.");

export function MateriA() {
  const s = SECTIONS[1][0];
  return (
    <Block id={s.id} title={tt(`Materi A · ${s.minutes} minutes, facilitator-led`, `Materi A · ${s.minutes} Minuten, moderiert`)} intro={tt("Winning customers back: why customers leave, what brings them back, which lost customers are worth the effort, which signals to watch, and how to weigh win-back measures", "Kunden zurückgewinnen: warum Kunden gehen, was sie zurückbringt, welche verlorenen Kunden den Aufwand wert sind, welche Signale man beobachtet, und wie man Rückgewinnungsmaßnahmen abwägt")}>
      <p className="max-w-prose text-body text-ash">
        {tt("Seven cards, Level 1 and Level 2 in one run. Two are core, one per level: A1 (why customers leave, emotional, rational or outside our reach, for Block 1.1) and A7 (how to weigh win-back measures, for Block 2.4), together about 17 minutes. The other five go deeper and are folded. Every diagram uses Isar Hosting, another company, so the task is never answered for you.", "Sieben Karten, Level 1 und Level 2 in einem Durchgang. Zwei sind Kern, eine pro Level: A1 (warum Kunden gehen, emotional, rational oder außerhalb unseres Einflusses, für Block 1.1) und A7 (wie man Rückgewinnungsmaßnahmen abwägt, für Block 2.4), zusammen etwa 17 Minuten. Die anderen fünf vertiefen und sind eingeklappt. Jedes Diagramm nutzt Isar Hosting, ein anderes Unternehmen, damit die Aufgabe nie für Sie gelöst wird.")}
      </p>
      {CARDS_A.map((C, i) => {
        const m = CARDS_A_META[i];
        return m.optional ? (
          <OptionalSection
            key={i}
            id={materialAnchorId(m.id)}
            title={`${m.id} · ${m.title}`}
            minutes={m.minutes}
            reason={tt("Deepens a card a Core task block already covers. Not needed to complete the Win-Back Analysis File.", "Vertieft eine Karte, die ein Kern-Block schon abdeckt. Für die Win-Back Analysis File nicht nötig.")}
          >
            <C />
          </OptionalSection>
        ) : (
          <C key={i} />
        );
      })}
      <ReferencesAccordion block="A" keys={REFS_A} note={NOTE()} />
    </Block>
  );
}

export function MateriB() {
  const s = SECTIONS[2][0];
  return (
    <Block id={s.id} title={tt(`Materi B · ${s.minutes} minutes, facilitator-led`, `Materi B · ${s.minutes} Minuten, moderiert`)} intro={tt("A retention and win-back system: the vision, the central sources of evidence, the KPI system, optimising win-back, and an investment decision under an unclear success rate", "Ein Retention- und Win-back-System: das Zielbild, die zentralen Quellen von Evidenz, das KPI-System, die Optimierung der Rückgewinnung, und eine Investitionsentscheidung bei unklarer Erfolgsquote")}>
      <p className="max-w-prose text-body text-ash">
        {tt("Five cards for Level 3. One is core: B5, how a retention and win-back system is built and how to decide under an unclear success rate (about 12 minutes). The other four go deeper and are folded. You stop weighing single measures and start designing how the whole win-back system is joined around the lost customer. Each diagram uses Neckar Systemhaus, another company.", "Fünf Karten für Level 3. Eine ist Kern: B5, wie ein Retention- und Win-back-System gebaut wird und wie man bei unklarer Erfolgsquote entscheidet (etwa 12 Minuten). Die anderen vier vertiefen und sind eingeklappt. Sie wägen keine einzelnen Maßnahmen mehr ab, sondern gestalten, wie das ganze Win-back-System um den verlorenen Kunden verbunden wird. Jedes Diagramm nutzt Neckar Systemhaus, ein anderes Unternehmen.")}
      </p>
      {CARDS_B.map((C, i) => {
        const m = CARDS_B_META[i];
        return m.optional ? (
          <OptionalSection
            key={i}
            id={materialAnchorId(m.id)}
            title={`${m.id} · ${m.title}`}
            minutes={m.minutes}
            reason={tt("Deepens a card a Core task block already covers. Not needed to complete the Win-Back System Memo.", "Vertieft eine Karte, die ein Kern-Block schon abdeckt. Für das Win-Back System Memo nicht nötig.")}
          >
            <C />
          </OptionalSection>
        ) : (
          <C key={i} />
        );
      })}
      <ReferencesAccordion block="B" keys={REFS_B} note={NOTE()} />
    </Block>
  );
}
