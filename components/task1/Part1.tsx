"use client";

import clsx from "clsx";
import { AnswerBlock } from "@/components/ui/AnswerBlock";
import { AnswerKey } from "@/components/ui/AnswerKey";
import { BlockMissing } from "@/components/ui/BlockMissing";
import { ExampleAnswer } from "@/components/ui/ExampleAnswer";
import { CheckBar, OptionList, Reading, TextBox } from "@/components/ui/Inputs";
import { MaterialRefs } from "@/components/ui/MaterialRefs";
import { MentorGuide } from "@/components/ui/MentorGuide";
import { PlacementBoard } from "@/components/ui/PlacementBoard";
import { RevealHint } from "@/components/ui/RevealHint";
import { WritingHelp } from "@/components/ui/WritingHelp";
import { LEVEL_TAGS, LEVEL_TESTS, LINES, LINE_KEY } from "@/data/ladder";
import type { LevelTag, LineId } from "@/data/ladder";
import { BASES, BASIS_LABEL, CUSTOMERS, DECISION_LABEL, INSIGHT_COUNT, INSIGHT_FRAME, INSIGHT_MIN, KNOWN_LABEL, LEAVE_MIN, PICK, PILOT, FORECAST } from "@/data/forecast";
import type { Basis, CustId, } from "@/data/forecast";
import { citesForecastFigure, insightFlags, pickHolds, sortHolds } from "@/lib/checks";
import { scrollToAndFlash } from "@/lib/flash";
import { Gloss } from "@/lib/glossify";
import { IDS } from "@/lib/missing";
import { num, pct, tt } from "@/lib/lang";
import { extraInsightGuide, insightGuide, meaningGuide, reflectGuide } from "@/lib/mentorGuide";
import { pickKey, sortKey } from "@/lib/answerKey";
import { MIN_LINE, MIN_SENTENCE } from "@/lib/progress";
import { BLOCK_MINUTES } from "@/lib/routes";
import { useStore } from "@/store/useStore";

/* ------------------------------------------------------------------ Block 1.1 (Core, Level 1) */

export function Block11() {
  const l1 = useStore((s) => s.l1);
  const place = useStore((s) => s.placeLine);
  const undo = useStore((s) => s.undoSort);
  const redo = useStore((s) => s.redoSort);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  return (
    <AnswerBlock
      id="block-1-1"
      title={tt("Block 1.1 · Emotional, rational or outside our reach?", "Block 1.1 · Emotional, rational oder außerhalb unseres Einflusses?")}
      kind="OBJECTIVE"
      core
      minutes={BLOCK_MINUTES["1.1"]}
      findIt={tt("Route 1 → Task 1 → the nine statements on the sort board below, heard by RecoverIT's customer success team from customers who left. Answer on the sort board.", "Route 1 → Task 1 → die neun Aussagen auf der Sortiertafel unten, vom Customer-Success-Team von RecoverIT von Kunden gehört, die gegangen sind. Antworten Sie auf der Sortiertafel.")}
    >
      <MaterialRefs refs={["A1"]} />
      <PlacementBoard<LevelTag>
        items={LINES.map((r) => ({ id: r.id, meta: r.source, text: r.text }))}
        bins={LEVEL_TAGS.map((t) => ({ id: t.id, label: t.label, hint: t.hint }))}
        value={l1.sort}
        onPlace={(id, tag) => place(id as LineId, tag)}
        onUndo={undo}
        onRedo={redo}
        undoCount={l1.sortHistory.length}
        redoCount={l1.sortFuture.length}
        domId={IDS.line}
        keyPhrases={LINE_KEY}
        clues={Object.fromEntries(LINES.map((r) => [r.id, r.clue]))}
        reasons={Object.fromEntries(LINES.map((r) => [r.id, r.why]))}
        result={l1.sortResult}
        checks={l1.sortChecks}
        onCheck={() => patch((s) => ({ checks: s.checks + 1, sortChecks: s.sortChecks + 1, sortResult: sortHolds(s.sort) }))}
        onClue={() => patch({ sortClue: true })}
        clueShown={l1.sortClue}
        reasoningOpened={l1.sortReasoning}
        onOpenReasoning={() => patch({ sortReasoning: true })}
        noun={tt("statement", "Aussage")}
        intro={tt("Drag a statement onto the kind of reason it is, or select it and then select a kind. Select a placed one to move it again. One kind per statement: the one the customer names first.", "Ziehen Sie eine Aussage auf die Art von Grund, die sie ist, oder wählen Sie sie aus und dann eine Art. Wählen Sie eine platzierte, um sie zu verschieben. Eine Art pro Aussage: die, die der Kunde zuerst nennt.")}
        tests={
          <RevealHint id="sort-tests" label={tt("Show the test questions", "Testfragen zeigen")} title={tt("Test questions · taught in Materi A1", "Testfragen · aus Materi A1")}>
            <div className="space-y-2 text-caption text-ink">
              <p>{tt("Ask these of every statement. They repeat the tests from Materi A1; they never say which statement goes where.", "Stellen Sie diese Fragen zu jeder Aussage. Sie wiederholen die Tests aus Materi A1; sie sagen nie, welche Aussage wohin gehört.")}</p>
              <ul className="space-y-1.5">
                {LEVEL_TESTS.map((c) => (
                  <li key={c.name}>
                    <span className="font-semibold">{c.name}. </span>
                    <Gloss>{c.test}</Gloss>
                  </li>
                ))}
              </ul>
              <MaterialRefs refs={["A1"]} lead={tt("Taught in", "Gelehrt in")} />
            </div>
          </RevealHint>
        }
      />
      <TextBox
        id={IDS.extraInsight}
        label={tt("One reason a customer could come back, of your own", "Ein eigener Grund, aus dem ein Kunde zurückkommen könnte")}
        help={tt("Name something RecoverIT could do, which reason it answers (trust, the effort of coming back, value) and why that could change the customer's mind (“so …”). At least 30 characters.", "Nennen Sie etwas, das RecoverIT tun könnte, welchen Grund es beantwortet (Vertrauen, der Aufwand der Rückkehr, Nutzen) und warum das die Meinung des Kunden ändern könnte („sodass …“). Mindestens 30 Zeichen.")}
        value={l1.extraInsight}
        onChange={(v) => patch({ extraInsight: v })}
        min={MIN_LINE}
        rows={2}
      >
        <WritingHelp
          id="extra-insight-kit"
          refs={[
            { label: tt("What goes wrong today (the case)", "Was heute schiefgeht (der Fall)"), value: tt("high churn, inefficient win-back, measures that cannot be measured", "hoher Churn, ineffiziente Rückgewinnung, Maßnahmen, die sich nicht messen lassen"), target: "case-brief" },
            { label: tt("The three kinds of reason and the question that sorts them (Materi A1)", "Die drei Arten von Gründen und die Frage, die sie sortiert (Materi A1)"), value: tt("emotional · rational · outside our reach", "emotional · rational · außerhalb unseres Einflusses"), target: "mat-A1" },
            { label: tt("The nine statements above", "Die neun Aussagen oben"), value: tt("see what customers have already said", "sehen Sie, was Kunden schon gesagt haben"), target: IDS.line(LINES[0].id) },
          ]}
          steps={[
            tt("Name one thing RecoverIT could do (for example a call from the former account owner that says what was fixed), not “be better”.", "Nennen Sie eine Sache, die RecoverIT tun könnte (zum Beispiel einen Anruf des früheren Account Owners, der sagt, was behoben wurde), nicht „besser sein“."),
            tt("Say which reason it answers: trust, the effort of coming back, or new value.", "Sagen Sie, welchen Grund es beantwortet: Vertrauen, den Aufwand der Rückkehr oder neuen Nutzen."),
            tt("Finish with “so …”: why that could change the customer's mind.", "Schließen Sie mit „sodass …“: warum das die Meinung des Kunden ändern könnte."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="extra-insight-example" guide={extraInsightGuide()} />
      {mentor && <MentorGuide guide={extraInsightGuide()} />}
      <AnswerKey block={sortKey()} />
      <BlockMissing block="1.1" route={1} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.2 (Optional, read-only) */

const row = (id: string, cells: string[]) => (
  <tr id={id} className="border-t border-line">
    <td className="px-3 py-2 font-semibold">{cells[0]}</td>
    {cells.slice(1).map((c, i) => (
      <td key={i} className="tnum px-3 py-2 text-right">
        {c}
      </td>
    ))}
  </tr>
);

export function Block12() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const check = () =>
    patch((s) => {
      const w = s.meaning.trim();
      return { checks: s.checks + 1, meaningFlagged: w !== "" && (w.length < MIN_SENTENCE || !citesForecastFigure(w)), meaningClue: false };
    });
  const pct1 = (v: number) => `${num(v, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`;
  return (
    <AnswerBlock
      id="block-1-2"
      title={tt("Block 1.2 · Read the return figures: two return rates side by side", "Block 1.2 · Die Rückkehr-Werte lesen: zwei Rückkehrquoten nebeneinander")}
      kind="JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["1.2"]}
      findIt={tt("Route 1 → Task 1 → the table “Last year” directly below, with the two return rates the app prints. Answer in the field under the table.", "Route 1 → Task 1 → die Tabelle „Letztes Jahr“ direkt darunter, mit den zwei Rückkehrquoten, die die App druckt. Antworten Sie im Feld unter der Tabelle.")}
    >
      <MaterialRefs refs={["A4"]} />
      <p className="text-body text-ink">
        <Gloss>
          {tt("RecoverIT's records show how lost customers whose reason it could fix did last year, split by whether they got the standard discount e-mail or a call from the former account owner after the reason was fixed. The app divides returned customers by approached customers and prints both return rates for you; nothing is left to calculate. Your job is to read them side by side and say what they do and do not tell RecoverIT. How such a rate is worked out is shown in", "Die Unterlagen von RecoverIT zeigen, wie verlorene Kunden, deren Grund es beheben konnte, im letzten Jahr abschnitten, aufgeteilt danach, ob sie die Standard-Rabatt-E-Mail oder einen Anruf des früheren Account Owners bekamen, nachdem der Grund behoben war. Die App teilt zurückgekehrte Kunden durch angesprochene Kunden und druckt beide Rückkehrquoten für Sie; es bleibt nichts zu rechnen. Ihre Aufgabe ist, sie nebeneinander zu lesen und zu sagen, was sie RecoverIT sagen und was nicht. Wie eine solche Quote entsteht, zeigt")}
        </Gloss>{" "}
        <button type="button" onClick={() => scrollToAndFlash("mat-A4", "ref")} className="font-semibold text-accent underline decoration-dotted underline-offset-2">
          Materi A4
        </button>
        .
      </p>
      <div className="relative overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[30rem] border-collapse text-caption">
          <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("Last year · lost customers whose reason can be fixed, and what happened (Case assumption)", "Letztes Jahr · verlorene Kunden mit behebbarem Grund und was geschah (Fallannahme)")}</caption>
          <thead>
            <tr className="text-left text-micro uppercase text-ash">
              <th className="px-3 py-2">{tt("Group", "Gruppe")}</th>
              <th className="px-3 py-2 text-right">{tt("Approached customers", "Angesprochene Kunden")}</th>
              <th className="px-3 py-2 text-right">{tt("Returned", "Zurückgekehrt")}</th>
              <th className="px-3 py-2 text-right">{tt("Return rate (printed)", "Rückkehrquote (gedruckt)")}</th>
            </tr>
          </thead>
          <tbody>
            {row("fc-ctl", [tt("Standard discount e-mail", "Standard-Rabatt-E-Mail"), num(PILOT.control.sent), num(PILOT.control.orders), pct1(FORECAST.controlRate)])}
            {row("fc-var", [tt("Call from the former account owner after the fix", "Anruf des früheren Account Owners nach der Behebung"), num(PILOT.variant.sent), num(PILOT.variant.orders), pct1(FORECAST.f1)])}
          </tbody>
        </table>
      </div>
      <p className="text-caption text-ash">
        {tt(`Read it like this: of every 100 approached customers, ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })} returned after the e-mail and ${num(FORECAST.f1, { maximumFractionDigits: 1 })} after a call, so the call made a return ${num(FORECAST.f2)} times as likely. But the owners may have called the customers they knew best, so the true effect may be smaller.`, `So lesen Sie es: Von je 100 angesprochenen Kunden kehrten ${num(FORECAST.controlRate, { maximumFractionDigits: 1 })} nach der E-Mail zurück und ${num(FORECAST.f1, { maximumFractionDigits: 1 })} nach einem Anruf; der Anruf machte eine Rückkehr also ${num(FORECAST.f2)}-mal so wahrscheinlich. Aber die Account Owner riefen vielleicht die Kunden an, die sie am besten kannten, also kann der wahre Effekt kleiner sein.`)}
      </p>
      <TextBox
        id={IDS.meaning}
        label={tt("What do the return figures mean for RecoverIT?", "Was bedeuten die Rückkehr-Werte für RecoverIT?")}
        help={tt("One or two sentences. Quote at least one printed figure, say what RecoverIT should do first, and why it cannot be sure yet that the call alone made the difference.", "Ein oder zwei Sätze. Zitieren Sie mindestens einen gedruckten Wert, sagen Sie, was RecoverIT zuerst tun sollte, und warum es noch nicht sicher sein kann, dass allein der Anruf den Unterschied machte.")}
        value={l1.meaning}
        onChange={(v) => patch({ meaning: v, meaningFlagged: false })}
        min={MIN_SENTENCE}
        rows={4}
        flagged={l1.meaningFlagged}
        clue={tt("Which printed figure says how much more often customers returned after a call, and could the two groups differ in other ways? Quote one figure and say what follows.", "Welcher gedruckte Wert sagt, wie viel öfter Kunden nach einem Anruf zurückkehrten, und könnten sich die zwei Gruppen auch in anderem unterscheiden? Zitieren Sie einen Wert und sagen Sie, was folgt.")}
        clueShown={l1.meaningClue}
        onShowClue={() => patch({ meaningClue: true })}
      >
        <WritingHelp
          id="meaning-help"
          refs={[
            { label: tt("Return rates, with the e-mail and with a call", "Rückkehrquoten, mit E-Mail und mit Anruf"), value: `${pct1(FORECAST.controlRate)} · ${pct1(FORECAST.f1)}`, target: "fc-var" },
            { label: tt("Returned customers behind each group", "Zurückgekehrte Kunden hinter jeder Gruppe"), value: `${PILOT.control.orders} · ${PILOT.variant.orders}`, target: "fc-ctl" },
            { label: tt("Why a comparison like this is not yet proof (Materi A6)", "Warum ein solcher Vergleich noch kein Beweis ist (Materi A6)"), value: tt("the two groups may differ in other ways", "die zwei Gruppen unterscheiden sich vielleicht auch in anderem"), target: "mat-A6" },
          ]}
          steps={[
            tt("Say how much more often customers returned with a call (the two rates, or “four times”).", "Sagen Sie, wie viel öfter Kunden mit einem Anruf zurückkehrten (die zwei Quoten, oder „viermal“)."),
            tt("Say what RecoverIT should do first, for example call the customers whose reason can be fixed.", "Sagen Sie, was RecoverIT zuerst tun sollte, zum Beispiel die Kunden anrufen, deren Grund sich beheben lässt."),
            tt("Say it as an estimate: the owners may have called the customers they knew best.", "Sagen Sie es als Schätzung: Die Account Owner riefen vielleicht die Kunden an, die sie am besten kannten."),
          ]}
        />
      </TextBox>
      <ExampleAnswer id="meaning-example" guide={meaningGuide()} />
      {mentor && <MentorGuide guide={meaningGuide()} />}
      <CheckBar onCheck={check} checkLabel={tt("Check my sentence", "Meinen Satz prüfen")} checks={l1.checks} />
      {l1.checks > 0 && (
        <Reading>
          {!l1.meaningFlagged
            ? tt("Nothing is outlined by the last check.", "Die letzte Prüfung hat nichts markiert.")
            : tt("The sentence is outlined: it needs at least one printed figure and a few words more.", "Der Satz ist markiert: Er braucht mindestens einen gedruckten Wert und ein paar Worte mehr.")}
        </Reading>
      )}
      <BlockMissing block="1.2" route={1} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.3 (Optional) */

export function Block13() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const toggle = (k: "valuable" | "churners", id: CustId) => patch((s) => ({ [k]: s[k].includes(id) ? s[k].filter((x) => x !== id) : [...s[k], id], pickResult: null }) as Partial<typeof s>);
  const setRow = (i: number, p: Partial<{ basis: Basis | null; text: string }>) => patch((s) => ({ insights: s.insights.map((h, j) => (j === i ? { ...h, ...p } : h)), insFlagged: s.insFlagged.filter((x) => x !== i) }));
  const check = () => patch((s) => ({ checks: s.checks + 1, insChecked: true, insClue: false, insFlagged: insightFlags(s), pickResult: pickHolds(s), pickClue: false }));
  const opts = CUSTOMERS.map((c) => ({ id: c.id, label: c.name }));
  return (
    <AnswerBlock
      id="block-1-3"
      title={tt("Block 1.3 · Where a win-back pays, where it can use data we have, and three approaches", "Block 1.3 · Wo sich die Rückgewinnung lohnt, wo sie vorhandene Daten nutzen kann, und drei Ansätze")}
      kind="OBJECTIVE + JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["1.3"]}
      findIt={tt("Route 1 → Task 1 → the table “Eight groups of lost customers” below: customers lost a year, the share open to returning, whether RecoverIT can fix the reason, and what is recorded about the group. Answer in the two lists and the three fields under it.", "Route 1 → Task 1 → die Tabelle „Acht Gruppen verlorener Kunden“ unten: pro Jahr verlorene Kunden, der Anteil, der für eine Rückkehr offen ist, ob RecoverIT den Grund beheben kann, und was über die Gruppe festgehalten ist. Antworten Sie in den zwei Listen und den drei Feldern darunter.")}
    >
      <MaterialRefs refs={["A2", "A3"]} />
      <p className="rounded-md border border-line bg-mist/40 px-3 py-2 text-caption text-ink">
        <Gloss>
          {tt("How to read the table. Each row is one group of lost customers, by the reason they gave, for example customers who left after an outage nobody followed up. “Lost a year” says how many customers leave for that reason. “Open to returning” says what share of them say they would consider coming back (bold means 25% or more). “Can RecoverIT fix the reason? · What is recorded” says whether the reason is one RecoverIT can change itself (yes) or not (no), and how much of what a win-back needs (who the customer is, the reason, the contract value) is already in the list of lost customers.", "So lesen Sie die Tabelle. Jede Zeile ist eine Gruppe verlorener Kunden, nach dem Grund, den sie nannten, zum Beispiel Kunden, die nach einem Ausfall gingen, dem niemand nachging. „Pro Jahr verloren“ sagt, wie viele Kunden aus diesem Grund gehen. „Offen für eine Rückkehr“ sagt, welcher Anteil von ihnen sagt, er würde eine Rückkehr erwägen (fett heißt 25 % oder mehr). „Kann RecoverIT den Grund beheben? · Was festgehalten ist“ sagt, ob der Grund einer ist, den RecoverIT selbst ändern kann (Ja) oder nicht (Nein), und wie viel von dem, was eine Rückgewinnung braucht (wer der Kunde ist, der Grund, der Vertragswert), schon in der Liste verlorener Kunden steht.")}
        </Gloss>
      </p>
      <div className="relative overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[36rem] border-collapse text-caption">
          <caption className="bg-mist px-3 py-2 text-left text-micro font-semibold uppercase text-ash">{tt("Eight groups of lost customers · RecoverIT's records (Case assumption)", "Acht Gruppen verlorener Kunden · Unterlagen von RecoverIT (Fallannahme)")}</caption>
          <thead>
            <tr className="text-left text-micro uppercase text-ash">
              <th className="px-3 py-2">{tt("Group", "Gruppe")}</th>
              <th className="px-3 py-2 text-right">{tt("Lost a year", "Pro Jahr verloren")}</th>
              <th className="px-3 py-2">{tt("Open to returning", "Offen für eine Rückkehr")}</th>
              <th className="px-3 py-2">{tt("Can RecoverIT fix the reason? · What is recorded", "Kann RecoverIT den Grund beheben? · Was festgehalten ist")}</th>
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.map((c) => (
              <tr key={c.id} id={`cust-${c.id}`} className="border-t border-line">
                <td className="px-3 py-2 font-semibold">{c.name}</td>
                <td className="tnum px-3 py-2 text-right">{num(c.volume)}</td>
                <td className={clsx("tnum px-3 py-2", c.leave >= LEAVE_MIN && "font-semibold")}>{pct(c.leave)}</td>
                <td className="px-3 py-2">{`${DECISION_LABEL[c.decision ? "yes" : "no"]} · ${KNOWN_LABEL[c.known]}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div id={IDS.valuable} className="space-y-1.5">
          <p className="font-semibold text-ink">{tt(`a · The ${PICK} groups where a win-back pays most`, `a · Die ${PICK} Gruppen, in denen sich die Rückgewinnung am meisten lohnt`)}</p>
          <OptionList<CustId> multi label={tt("Pays most", "Lohnt sich am meisten")} value={l1.valuable} onChange={(id) => toggle("valuable", id)} disabledIds={l1.valuable.length >= PICK ? CUSTOMERS.map((c) => c.id) : []} onDisabledClick={() => scrollToAndFlash(IDS.valuable, "warn")} options={opts} />
          <p role="status" className="text-caption text-ash">{tt(`${l1.valuable.length} of ${PICK} chosen.`, `${l1.valuable.length} von ${PICK} gewählt.`)}</p>
        </div>
        <div id={IDS.churners} className="space-y-1.5">
          <p className="font-semibold text-ink">{tt(`b · The ${PICK} groups where a win-back can run on data we have`, `b · Die ${PICK} Gruppen, in denen eine Rückgewinnung auf vorhandenen Daten laufen kann`)}</p>
          <OptionList<CustId> multi label={tt("Can use data we have", "Kann vorhandene Daten nutzen")} value={l1.churners} onChange={(id) => toggle("churners", id)} disabledIds={l1.churners.length >= PICK ? CUSTOMERS.map((c) => c.id) : []} onDisabledClick={() => scrollToAndFlash(IDS.churners, "warn")} options={opts} />
          <p role="status" className="text-caption text-ash">{tt(`${l1.churners.length} of ${PICK} chosen.`, `${l1.churners.length} von ${PICK} gewählt.`)}</p>
        </div>
      </div>
      {l1.pickResult && (
        <Reading>
          {tt(`${l1.pickResult.holds} of ${l1.pickResult.total} picks hold. A check never says which. `, `${l1.pickResult.holds} von ${l1.pickResult.total} Wahlen stimmen. Eine Prüfung sagt nie, welche. `)}
          {l1.pickClue ? (
            tt("Clue: a win-back pays most where RecoverIT can fix the reason and a quarter or more would consider coming back. It can run on data we have only where part or all of the record of the group is already in the list. Which groups have a fixable reason and 25% or more open to returning? Where is part or all of the record already there?", "Hinweis: Eine Rückgewinnung lohnt sich am meisten dort, wo RecoverIT den Grund beheben kann und ein Viertel oder mehr eine Rückkehr erwägen würde. Sie kann nur dort auf vorhandenen Daten laufen, wo ein Teil oder alles vom Datensatz der Gruppe schon in der Liste steht. Welche Gruppen haben einen behebbaren Grund und 25 % oder mehr, die offen für eine Rückkehr sind? Wo ist ein Teil oder alles vom Datensatz schon da?")
          ) : l1.pickResult.holds < l1.pickResult.total ? (
            <button type="button" onClick={() => patch({ pickClue: true })} className="btn-ghost btn-sm border-gold">
              {tt("Show clue", "Hinweis zeigen")}
            </button>
          ) : null}
        </Reading>
      )}
      <AnswerKey block={pickKey()} />
      <div className="space-y-3 border-t border-line pt-3">
        <p className="font-semibold text-ink">{tt("c · Three win-back approaches", "c · Drei Rückgewinnungsansätze")}</p>
        <p className="text-body text-ink">
          <Gloss>{tt("Write three simple win-back approaches for RecoverIT, each using a different motive to return: rebuild trust, lower the cost of coming back, or add value or an incentive. Say why the approach gives the group a reason to return: that is the point of an approach, so it is not only an action on a list.", "Schreiben Sie drei einfache Rückgewinnungsansätze für RecoverIT, jeder nutzt ein anderes Motiv zur Rückkehr: Vertrauen wiederaufbauen, die Rückkehr leichter machen, oder Nutzen oder einen Anreiz bieten. Sagen Sie, warum der Ansatz der Gruppe einen Grund zur Rückkehr gibt: Das ist der Sinn eines Ansatzes, damit er nicht nur eine Aktion auf einer Liste ist.")}</Gloss>
        </p>
        <p className="text-caption text-ash">
          {tt("The frame: ", "Der Rahmen: ")}
          {INSIGHT_FRAME.v}
        </p>
        {l1.insights.map((a, i) => (
          <div key={i} className="space-y-1.5">
            <TextBox
              id={IDS.insight(i)}
              label={tt(`Approach ${i + 1}`, `Ansatz ${i + 1}`)}
              help={tt(`Choose the motive, then write the group, the step and why it gives them a reason to return in one or two sentences (“…, so …”), at least ${INSIGHT_MIN} characters.`, `Wählen Sie das Motiv und schreiben Sie dann die Gruppe, den Schritt und warum er ihr einen Grund zur Rückkehr gibt, in ein oder zwei Sätzen („…, sodass …“), mindestens ${INSIGHT_MIN} Zeichen.`)}
              value={a.text}
              onChange={(v) => setRow(i, { text: v })}
              min={INSIGHT_MIN}
              flagged={l1.insFlagged.includes(i)}
              clue={tt(`Use the frame: ${INSIGHT_FRAME.v} Choose a motive no other row uses, and finish with “so” and why the step gives the group a reason to return.`, `Nutzen Sie den Rahmen: ${INSIGHT_FRAME.v} Wählen Sie ein Motiv, das keine andere Zeile nutzt, und schließen Sie mit „sodass“ und warum der Schritt der Gruppe einen Grund zur Rückkehr gibt.`)}
              clueShown={l1.insClue}
              onShowClue={() => patch({ insClue: true })}
            >
              <div>
                <label htmlFor={`insight-${i}-basis`} className="smallcaps block">
                  {tt("Motive", "Motiv")}
                </label>
                <select id={`insight-${i}-basis`} className="field mt-1 max-w-md" value={a.basis ?? ""} onChange={(e) => setRow(i, { basis: (e.target.value || null) as Basis | null })}>
                  <option value="">{tt("Choose the motive…", "Motiv wählen…")}</option>
                  {BASES.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label}
                    </option>
                  ))}
                </select>
                {a.basis && <p className="mt-1 text-micro normal-case tracking-normal text-ash">{tt("Chosen: ", "Gewählt: ")}{BASIS_LABEL[a.basis]}</p>}
              </div>
            </TextBox>
            {i === 0 && (
              <WritingHelp
                id="insight-kit"
                refs={[
                  { label: tt("What brings a customer back (Materi A2)", "Was einen Kunden zurückbringt (Materi A2)"), value: tt("trust, an easier return, value or an incentive", "Vertrauen, eine leichtere Rückkehr, Nutzen oder ein Anreiz"), target: "mat-A2" },
                  { label: tt("The groups of lost customers (table above)", "Die Gruppen verlorener Kunden (Tabelle oben)"), value: tt("why they left and how open they are", "warum sie gingen und wie offen sie sind"), target: "cust-c1" },
                ]}
                steps={[
                  tt("Choose the motive and name the group you would approach.", "Wählen Sie das Motiv und nennen Sie die Gruppe, die Sie ansprechen würden."),
                  tt("Say the step in one sentence, concretely (a call, a free move, a named offer).", "Sagen Sie den Schritt in einem Satz, konkret (ein Anruf, ein kostenloser Umzug, ein benanntes Angebot)."),
                  tt("Finish with why it gives the group a reason to return.", "Schließen Sie damit, warum es der Gruppe einen Grund zur Rückkehr gibt."),
                ]}
              />
            )}
            <ExampleAnswer id={`insight-${i}-example`} guide={insightGuide(i)} />
            {mentor && <MentorGuide guide={insightGuide(i)} />}
          </div>
        ))}
      </div>
      <CheckBar onCheck={check} checkLabel={tt("Check my picks and approaches", "Meine Wahl und Ansätze prüfen")} checks={l1.checks} />
      {l1.insChecked && (
        <Reading>
          {l1.insFlagged.length === 0
            ? tt(`Nothing is outlined among the approaches. All ${INSIGHT_COUNT} use different motives and say why they give the group a reason to return; whether they are good is for you and your facilitator to judge.`, `Bei den Ansätzen ist nichts markiert. Alle ${INSIGHT_COUNT} nutzen verschiedene Motive und sagen, warum sie der Gruppe einen Grund zur Rückkehr geben; ob sie gut sind, beurteilen Sie und Ihre Moderation.`)
            : tt(`${l1.insFlagged.length} approach${l1.insFlagged.length === 1 ? " is" : "es are"} outlined: the motive is missing or repeated, the text is short, or it does not say why it gives the group a reason to return.`, `${l1.insFlagged.length} ${l1.insFlagged.length === 1 ? "Ansatz ist" : "Ansätze sind"} markiert: Das Motiv fehlt oder wiederholt sich, der Text ist kurz, oder er sagt nicht, warum er der Gruppe einen Grund zur Rückkehr gibt.`)}
        </Reading>
      )}
      <BlockMissing block="1.3" route={1} />
    </AnswerBlock>
  );
}

/* ------------------------------------------------------------------ Block 1.4 (Optional) */

export function Block14() {
  const l1 = useStore((s) => s.l1);
  const patch = useStore((s) => s.patchL1);
  const mentor = useStore((s) => s.mentorUnlocked);
  const fields: { k: "interpret" | "causation" | "decider"; label: string; help: string }[] = [
    { k: "interpret", label: tt("When is a win-back worthwhile, and when not?", "Wann lohnt sich eine Rückgewinnung, und wann nicht?"), help: tt("One or two sentences, using one of the nine statements in Block 1.1: say what makes a win-back worthwhile and what makes it not.", "Ein oder zwei Sätze, mit einer der neun Aussagen aus Block 1.1: Sagen Sie, was eine Rückgewinnung lohnend macht und was nicht.") },
    { k: "causation", label: tt("What is the difference between an emotional and a financial incentive?", "Was ist der Unterschied zwischen einem emotionalen und einem finanziellen Anreiz?"), help: tt("Name one example of each at RecoverIT, and say when each works.", "Nennen Sie je ein Beispiel bei RecoverIT, und sagen Sie, wann jeder wirkt.") },
    { k: "decider", label: tt("Which customers are the wrong ones to win back, and where do unnecessary costs arise?", "Welche Kunden sind die falschen zum Zurückgewinnen, und wo entstehen unnötige Kosten?"), help: tt("Name a group that is not worth it, one place where money is wasted, and what comes first for a strategic decision-maker. Be concrete.", "Nennen Sie eine Gruppe, die es nicht wert ist, eine Stelle, an der Geld verschwendet wird, und was für eine strategische Entscheiderin zuerst kommt. Seien Sie konkret.") },
  ];
  return (
    <AnswerBlock
      id="block-1-4"
      title={tt("Block 1.4 · Coaching reflection: from Level 1 to Level 2", "Block 1.4 · Coaching-Reflexion: von Level 1 zu Level 2")}
      kind="JUDGED"
      core={false}
      minutes={BLOCK_MINUTES["1.4"]}
      findIt={tt("Route 1 → Task 1 → your own answers in Block 1.1, and the rules in Materi A1 and A2. Answer in the three fields below.", "Route 1 → Task 1 → Ihre eigenen Antworten in Block 1.1 und die Regeln in Materi A1 und A2. Antworten Sie in den drei Feldern unten.")}
    >
      <MaterialRefs refs={["A1", "A2"]} />
      <p className="text-body text-ink">
        <Gloss>{tt("Before you weigh measures: when is a win-back worthwhile, how do emotional and financial incentives differ, and who is the wrong customer to win back?", "Bevor Sie Maßnahmen abwägen: Wann lohnt sich eine Rückgewinnung, wie unterscheiden sich emotionale und finanzielle Anreize, und welcher Kunde ist der falsche zum Zurückgewinnen?")}</Gloss>
      </p>
      {fields.map((f) => (
        <div key={f.k} className="space-y-1.5">
          <TextBox id={IDS.reflect(f.k)} label={f.label} help={f.help} value={l1.reflect[f.k]} onChange={(v) => patch((s) => ({ reflect: { ...s.reflect, [f.k]: v } }))} min={MIN_LINE} rows={3} />
          <ExampleAnswer id={`reflect-${f.k}-example`} guide={reflectGuide(f.k)} />
          {mentor && <MentorGuide guide={reflectGuide(f.k)} />}
        </div>
      ))}
      <BlockMissing block="1.4" route={1} />
    </AnswerBlock>
  );
}
