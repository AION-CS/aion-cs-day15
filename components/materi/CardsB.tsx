"use client";

import { Bul, Diagram } from "@/components/materi/kit";
import { ArchMini, CompProfile, LiftCases, ScatterMap, StageBars } from "@/components/materi/diagrams";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { ARCH_MINI, COMP_TESTS, LIFT, SOURCE_MAP, STAGES } from "@/data/diagramData";
import { CASES_MIN, CRITERIA, LIFT_ACT, LIFT_WATCH, QUALITY_BAR, R2_MONTHS } from "@/data/route2";
import { tt } from "@/lib/lang";

/** Materi B: the five cards of Route 2 (Level 3). 60 minutes in all; B5 is the one Core card (CLAUDE.md #48). */
const p = "text-body text-ink";

export function CardB1() {
  return (
    <MaterialCard
      id="B1"
      scan={tt("A retention and win-back system joins what a company already knows about a lost customer: one list that customer success, sales and finance all read, and one rulebook that says which reason triggers which approach, who owns it and how fast they act. A target vision says in two sentences what all of it is for, and how the company will steer it.", "Ein Retention- und Win-back-System verbindet, was ein Unternehmen schon über einen verlorenen Kunden weiß: eine Liste, die Customer Success, Vertrieb und Finance alle lesen, und ein Regelwerk, das sagt, welcher Grund welchen Ansatz auslöst, wer ihn besitzt und wie schnell er handelt. Ein Zielbild sagt in zwei Sätzen, wofür das alles da ist und wie das Unternehmen es steuert.")}
      reasoning={[
        tt("A target vision says, in two sentences, what changes for customers and teams once the system runs, and how the company steers it: by which few KPIs, and what every new offer has to do before it grows.", "Ein Zielbild sagt in zwei Sätzen, was sich für Kunden und Teams ändert, wenn das System läuft, und wie das Unternehmen es steuert: nach welchen wenigen KPIs, und was jedes neue Angebot tun muss, bevor es wächst."),
        tt("Two foundations hold a win-back system: one list of lost customers that the teams all read (every approach then knows why the customer left and what it was worth), and one written rule with an owner for every approach (so nobody waits for somebody else).", "Zwei Fundamente tragen ein Win-back-System: eine Liste verlorener Kunden, die die Teams alle lesen (jeder Ansatz weiß dann, warum der Kunde ging und was er wert war), und eine schriftliche Regel mit einem Owner für jeden Ansatz (damit niemand auf jemand anderen wartet)."),
        tt("A good third principle is a KPI owner who can move the number, or a monthly review that compares each approach with who really returned and decides keep, change or stop.", "Ein gutes drittes Prinzip ist ein KPI-Owner, der die Zahl bewegen kann, oder ein monatliches Review, das jeden Ansatz damit vergleicht, wer wirklich zurückkam, und entscheidet: behalten, ändern oder stoppen."),
        tt("Reject “approach every lost customer you can find”: it spends on groups that cannot or will not return and adds cost, not returns. Reject “buy one prediction model first”: nothing changes for customers until it runs, and nobody can explain its offers.", "Verwerfen Sie „jeden verlorenen Kunden ansprechen, den man findet“: Es gibt Geld für Gruppen aus, die nicht zurückkehren können oder wollen, und bringt Kosten, keine Rückkehrer. Verwerfen Sie „zuerst ein Vorhersagemodell kaufen“: Für Kunden ändert sich nichts, bis es läuft, und niemand kann seine Angebote erklären."),
        tt("Say what each principle means in the company, and which problem or risk it answers: high churn, inefficient win-back, measures that are not measurable, or a good approach that is never used.", "Sagen Sie, was jedes Prinzip im Unternehmen bedeutet und welches Problem oder Risiko es beantwortet: hoher Churn, ineffiziente Rückgewinnung, nicht messbare Maßnahmen oder ein guter Ansatz, der nie genutzt wird."),
      ]}
      sources={["kaplan1992", "courtney1997"]}
    >
      <ShowMore id="B1" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kaplan and Norton (1992) argued for a few linked measures instead of many unrelated ones, which is what one shared list makes possible. Courtney, Kirkland and Viguerie (1997) advise matching the commitment to what is known: build the foundations that no-regret moves rest on first.",
            "Kaplan und Norton (1992) plädierten für wenige verbundene Kennzahlen statt vieler unverbundener, was eine gemeinsame Liste möglich macht. Courtney, Kirkland und Viguerie (1997) raten, die Festlegung an das Bekannte anzupassen: zuerst die Fundamente bauen, auf denen No-regret-Schritte ruhen.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Four stages towards a win-back system · a worked example on Neckar Systemhaus", "Vier Stufen zu einem Win-back-System · ein Beispiel mit Neckar Systemhaus")} caption={tt("Move through the four stages and read what each one adds.", "Gehen Sie die vier Stufen durch und lesen Sie, was jede hinzufügt.")}>
        <StageBars cfg={STAGES} />
      </Diagram>
    </MaterialCard>
  );
}

export function CardB2() {
  return (
    <MaterialCard
      id="B2"
      scan={tt("Start from what the customer decides through a source of evidence, not from the tool. A source through which the customer decides something and whose data is complete is used now; where the data is not complete it waits; where the customer decides nothing it is not central, however complete.", "Gehen Sie von dem aus, was der Kunde über eine Quelle von Evidenz entscheidet, nicht vom Werkzeug. Eine Quelle, über die der Kunde etwas entscheidet und deren Daten vollständig sind, wird jetzt genutzt; wo die Daten nicht vollständig sind, wartet sie; wo der Kunde nichts entscheidet, ist sie nicht zentral, egal wie vollständig.")}
      reasoning={[
        tt("Does the customer decide something through the source (say what went wrong or stay silent, keep talking or go quiet, come back or stay away)? If not, a win-back built on it would aim at many who never meant to return: not central.", "Entscheidet der Kunde über die Quelle etwas (sagen, was schiefgelaufen ist, oder schweigen, im Gespräch bleiben oder verstummen, zurückkommen oder wegbleiben)? Wenn nicht, würde eine darauf gebaute Rückgewinnung viele treffen, die nie zurückwollten: nicht zentral."),
        tt(`Does at least ${QUALITY_BAR}% of its data reach the shared list of lost customers? Then use it now. If not, improve the data first: built on now, an approach would learn the gaps.`, `Erreichen mindestens ${QUALITY_BAR} % seiner Daten die gemeinsame Liste verlorener Kunden? Dann nutzen Sie sie jetzt. Wenn nicht, verbessern Sie zuerst die Daten: Jetzt darauf gebaut, würde ein Ansatz die Lücken lernen.`),
        tt("Volume and cost are not the test: newsletter opens that nobody decides anything by are not central; the replies to the former account owner are.", "Menge und Kosten sind nicht der Test: Newsletter-Öffnungen, über die niemand etwas entscheidet, sind nicht zentral; die Antworten an den früheren Account Owner schon."),
        tt("Using and joining data about former customers, and contacting them, is processing personal data: it needs a lawful basis (GDPR Art. 6), and scoring customers automatically brings Art. 22 into play. Check with the data protection officer before a mailing to everyone.", "Daten ehemaliger Kunden zu nutzen und zu verbinden und sie zu kontaktieren ist Verarbeitung personenbezogener Daten: Sie braucht eine Rechtsgrundlage (DSGVO Art. 6), und das automatische Bewerten von Kunden bringt Art. 22 ins Spiel. Klären Sie das mit dem Datenschutzbeauftragten, bevor ein Mailing an alle geht."),
      ]}
      sources={["davenport2018", "gdpr2016"]}
    >
      <ShowMore id="B2" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Davenport and Ronanki (2018) found that technology pays where it starts from a business problem and fits existing processes and data. The GDPR (2016) adds the legal condition for joining data about customers and for contacting them: a lawful basis for each use.",
            "Davenport und Ronanki (2018) fanden, dass sich Technologie dort auszahlt, wo sie von einem Geschäftsproblem ausgeht und zu bestehenden Prozessen und Daten passt. Die DSGVO (2016) ergänzt die rechtliche Bedingung für das Verbinden von Kundendaten und für die Kontaktaufnahme: eine Rechtsgrundlage für jede Nutzung.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("The source first, then the tool · a worked example on Neckar Systemhaus", "Zuerst die Quelle, dann das Werkzeug · ein Beispiel mit Neckar Systemhaus")} caption={tt("Choose a source on the map or in the list and read what the rule gives.", "Wählen Sie eine Quelle auf der Karte oder in der Liste und lesen Sie, was die Regel ergibt.")}>
        <ScatterMap cfg={SOURCE_MAP} />
      </Diagram>
    </MaterialCard>
  );
}

export function CardB3() {
  return (
    <MaterialCard
      id="B3"
      scan={tt("A KPI system for management reads three rates, churn rate, win-back rate and reactivation rate, and uses a few numbers that pass four tests: linked to coming back, early, covering every approached customer, and counted by the systems. A number that only counts what you did, like e-mails sent, fails the first test, however easy it is to count.", "Ein KPI-System für das Management liest drei Quoten, Churn Rate, Win-back Rate und Reactivation Rate, und nutzt wenige Zahlen, die vier Tests bestehen: mit der Rückkehr verbunden, früh, jeden angesprochenen Kunden abdeckend und von den Systemen gezählt. Eine Zahl, die nur zählt, was Sie getan haben, wie versendete E-Mails, besteht den ersten Test nicht, egal wie leicht sie zu zählen ist.")}
      reasoning={[
        tt("Churn rate = customers who left in the period ÷ customers at the start of the period. Win-back rate = approached lost customers who sign again ÷ approached lost customers. Reactivation rate = returned customers still active after 90 days ÷ returned customers. The first counts the loss, the second the return, the third whether the return is real.", "Churn Rate = Kunden, die im Zeitraum gingen, ÷ Kunden zu Beginn des Zeitraums. Win-back Rate = angesprochene verlorene Kunden, die erneut unterschreiben, ÷ angesprochene verlorene Kunden. Reactivation Rate = zurückgekehrte Kunden, die nach 90 Tagen noch aktiv sind, ÷ zurückgekehrte Kunden. Die erste zählt den Verlust, die zweite die Rückkehr, die dritte, ob die Rückkehr echt ist."),
        ...CRITERIA.map((c) => `${c.name}: ${c.test} ${tt("Low:", "Niedrig:")} ${c.low} ${tt("High:", "Hoch:")} ${c.high}`),
        tt("The printed facts cap each rating: “not linked to coming back” caps the link at Low; “after the customer has left” or “twice a year” caps early at Low; “some customers” caps reach at Mid; “collected by hand” caps measured automatically at Low.", "Die gedruckten Fakten deckeln jede Bewertung: „nicht mit der Rückkehr verbunden“ deckelt die Verbindung bei Niedrig; „nachdem der Kunde gegangen ist“ oder „zweimal im Jahr“ deckeln früh bei Niedrig; „einige Kunden“ deckelt die Reichweite bei Mittel; „von Hand gesammelt“ deckelt automatisch gemessen bei Niedrig."),
        tt("A management system needs most of its KPIs to show a change while there is still time to act (weekly or monthly).", "Ein Managementsystem braucht, dass die meisten seiner KPIs eine Veränderung zeigen, solange noch Zeit zum Handeln ist (wöchentlich oder monatlich)."),
        tt("The KPI with the greatest leverage is one a team can move this month and that is linked to coming back: name the tests that decide it and the problem it answers.", "Der KPI mit der größten Hebelwirkung ist einer, den ein Team diesen Monat bewegen kann und der mit der Rückkehr verbunden ist: Nennen Sie die Tests, die es entscheiden, und das Problem, das er beantwortet."),
        tt("The churn rate per quarter is exact and linked to leaving, but it counts the loss after it is too late to act: a number for learning, not for steering.", "Die Churn Rate pro Quartal ist genau und mit dem Gehen verbunden, aber sie zählt den Verlust, wenn es zu spät zum Handeln ist: eine Zahl zum Lernen, nicht zum Steuern."),
      ]}
      sources={["kaplan1992", "hubbard2014"]}
    >
      <ShowMore id="B3" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kaplan and Norton (1992) argued for a few linked measures, results and the drivers behind them. Hubbard (2014) adds that a measure earns its place when it would change a decision, which is why a number that only counts what you did does not.",
            "Kaplan und Norton (1992) plädierten für wenige verbundene Kennzahlen, Ergebnisse und ihre Treiber. Hubbard (2014) ergänzt, dass eine Kennzahl ihren Platz verdient, wenn sie eine Entscheidung ändern würde, weshalb eine Zahl, die nur zählt, was Sie getan haben, ihn nicht verdient.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Four tests for one KPI candidate · a worked example on Neckar Systemhaus", "Vier Tests für einen KPI-Kandidaten · ein Beispiel mit Neckar Systemhaus")} caption={tt("Choose a candidate and read how it does on each test.", "Wählen Sie einen Kandidaten und lesen Sie, wie er bei jedem Test abschneidet.")}>
        <CompProfile cfg={COMP_TESTS} />
      </Diagram>
      <ShowMore id="B3" part="table" label={tt("Show the table: the three rates on other numbers (Case assumption)", "Tabelle zeigen: Die drei Quoten mit anderen Zahlen (Fallannahme)")}>
        <DataTable
          head={[tt("Rate", "Quote"), tt("Neckar's figures", "Zahlen von Neckar"), tt("Result", "Ergebnis")]}
          rows={[
            [tt("Churn rate: 1,000 customers at the start of the quarter, 60 left", "Churn Rate: 1.000 Kunden zu Beginn des Quartals, 60 gingen"), "60 ÷ 1,000", "6%"],
            [tt("Win-back rate: 80 lost customers approached, 12 signed again", "Win-back Rate: 80 verlorene Kunden angesprochen, 12 unterschrieben erneut"), "12 ÷ 80", "15%"],
            [tt("Reactivation rate: of the 12, 9 are still active after 90 days", "Reactivation Rate: Von den 12 sind 9 nach 90 Tagen noch aktiv"), "9 ÷ 12", "75%"],
          ]}
          caption={tt("The three rates on other numbers than the task (Case assumption)", "Die drei Quoten mit anderen Zahlen als in der Aufgabe (Fallannahme)")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardB4() {
  return (
    <MaterialCard
      id="B4"
      scan={tt("Win-back is optimised by testing it continuously: every test ends in a decision, roll out, keep testing or stop, and who acts. Two numbers decide it: the lift over the control group, and how many approached customers it rests on. A measure that makes customers ask for more discount is stopped, however good the number looks, and then the next small change is tested.", "Die Rückgewinnung wird optimiert, indem man sie laufend testet: Jeder Test endet in einer Entscheidung, ausrollen, weiter testen oder stoppen, und wer handelt. Zwei Zahlen entscheiden: der Lift gegenüber der Kontrollgruppe und auf wie vielen angesprochenen Kunden er beruht. Eine Maßnahme, die Kunden um mehr Rabatt bitten lässt, wird gestoppt, egal wie gut die Zahl aussieht, und dann wird die nächste kleine Änderung getestet.")}
      reasoning={[
        tt(`Roll out when the lift is ${LIFT_ACT}% or more and each group has at least ${CASES_MIN} approached customers: the gain is clear and proven.`, `Ausrollen, wenn der Lift ${LIFT_ACT} % oder mehr beträgt und jede Gruppe mindestens ${CASES_MIN} angesprochene Kunden hat: Der Gewinn ist klar und belegt.`),
        tt(`Keep testing when the lift is ${LIFT_ACT}% or more but on fewer than ${CASES_MIN} approached customers, or when it is between ${LIFT_WATCH}% and ${LIFT_ACT}%.`, `Weiter testen, wenn der Lift ${LIFT_ACT} % oder mehr beträgt, aber auf weniger als ${CASES_MIN} angesprochenen Kunden beruht, oder wenn er zwischen ${LIFT_WATCH} % und ${LIFT_ACT} % liegt.`),
        tt(`Stop when the lift is below ${LIFT_WATCH}% or negative. Many customers do not rescue a tiny lift: they prove it is tiny.`, `Stoppen, wenn der Lift unter ${LIFT_WATCH} % liegt oder negativ ist. Viele Kunden retten keinen winzigen Lift: Sie belegen, dass er winzig ist.`),
        tt("A guardrail can stop a winner: if requests for discounts rise, or customers ask to be taken off the list, the measure is not rolled out until the cause is fixed.", "Eine Guardrail kann einen Gewinner stoppen: Steigen die Rabattanfragen oder bitten Kunden, von der Liste genommen zu werden, wird die Maßnahme nicht ausgerollt, bis die Ursache behoben ist."),
        tt("Who acts follows from what the test is about: a call by the former account owner or a free move goes to customer success; a call that needs a director goes to sales and account management; keep testing belongs to the data team; a stopped test has no owner.", "Wer handelt, folgt daraus, worum es im Test geht: Ein Anruf des früheren Account Owners oder ein kostenloser Umzug geht an Customer Success; ein Anruf, der eine Direktorin oder einen Direktor braucht, geht an Vertrieb und Account Management; Weitertesten gehört dem Datenteam; ein gestoppter Test hat keinen Owner."),
        tt("Optimising is continuous: after a decision, the next small change is tested against the new baseline, and approaches that worked are checked again, because what worked last year may not work this year.", "Optimieren ist fortlaufend: Nach einer Entscheidung wird die nächste kleine Änderung gegen die neue Basislinie getestet, und Ansätze, die wirkten, werden erneut geprüft, weil das, was letztes Jahr wirkte, dieses Jahr vielleicht nicht wirkt."),
      ]}
      sources={["kohavi2020", "thomas2004"]}
    >
      <ShowMore id="B4" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kohavi, Tang and Xu (2020) describe how firms that test continuously decide on each result with rules agreed before the test: a minimum effect worth shipping, a minimum sample, and guardrail metrics that veto a rollout. Thomas, Blattberg and Fox (2004) studied how companies recapture lost customers and how long they then stay, which is why each approach is tested and the return is checked after 90 days.",
            "Kohavi, Tang und Xu (2020) beschreiben, wie Firmen, die laufend testen, über jedes Ergebnis mit Regeln entscheiden, die vor dem Test vereinbart sind: ein Mindesteffekt, der einen Rollout lohnt, eine Mindeststichprobe und Guardrail-Kennzahlen, die einen Rollout verhindern können. Thomas, Blattberg und Fox (2004) untersuchten, wie Unternehmen verlorene Kunden zurückholen und wie lange sie dann bleiben, weshalb jeder Ansatz getestet und die Rückkehr nach 90 Tagen geprüft wird.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Roll out, keep testing or stop · move the two sliders", "Ausrollen, weiter testen oder stoppen · die zwei Regler bewegen")} caption={tt("Set a lift and a number of approached customers and read which decision the rule gives.", "Stellen Sie einen Lift und eine Zahl angesprochener Kunden ein und lesen Sie, welche Entscheidung die Regel ergibt.")}>
        <LiftCases cfg={LIFT} />
      </Diagram>
      <ShowMore id="B4" part="table" label={tt("Show the table: a worked decision on other tests (Case assumption)", "Tabelle zeigen: Eine Beispielentscheidung mit anderen Tests (Fallannahme)")}>
        <DataTable
          head={[tt("Neckar test", "Test bei Neckar"), tt("Lift", "Lift"), tt("Approached customers", "Angesprochene Kunden"), tt("Rule gives", "Regel ergibt"), tt("Who acts", "Wer handelt")]}
          rows={[
            [tt("Call by the former owner after the fix", "Anruf des früheren Owners nach der Behebung"), "+36%", "150", tt("Roll out", "Ausrollen"), tt("Customer success", "Customer Success")],
            [tt("Director call to the former sponsor", "Anruf einer Direktorin beim früheren Sponsor"), "+28%", "30", tt("Keep testing", "Weiter testen"), tt("Data team", "Datenteam")],
            [tt("A cartoon “we miss you” e-mail", "Eine Comic-„Wir vermissen Sie“-E-Mail"), "+1%", "700", tt("Stop", "Stoppen"), tt("No one", "Niemand")],
          ]}
          caption={tt("A worked decision on other tests (Case assumption)", "Eine Beispielentscheidung mit anderen Tests (Fallannahme)")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardB5() {
  return (
    <MaterialCard
      id="B5"
      scan={tt(`A retention and win-back system is built in order: the base first (one scoreboard and list of lost customers with the three rates), then the data, the routine and the people, then the approaches on complete data, and the rest held back. Four tests tell you whether it holds, and with ${R2_MONTHS} months the time test matters. Decide now, in stages, because nobody knows the success rate, and say what you will watch and when you would stop.`, `Ein Retention- und Win-back-System wird der Reihe nach gebaut: zuerst die Basis (ein Scoreboard und eine Liste verlorener Kunden mit den drei Quoten), dann die Daten, die Routine und die Menschen, dann die Ansätze auf vollständigen Daten, und der Rest wird zurückgehalten. Vier Tests sagen Ihnen, ob es hält, und bei ${R2_MONTHS} Monaten zählt der Zeittest. Entscheiden Sie jetzt, in Stufen, weil niemand die Erfolgsquote kennt, und sagen Sie, was Sie beobachten und wann Sie aufhören würden.`)}
      reasoning={[
        tt("Build in this order. The base first: the scoreboard and the list of lost customers (reason, value, owner) with the churn rate, the win-back rate and the reactivation rate on one page, so every approach reads one lost customer. Then the data, the routine and the people: the lost-customer data clean-up so the reason and the contract value are recorded the same way everywhere, a test-and-learn routine that tests every offer on a random half and reviews it monthly, and teams trained to open return calls with the fixed reason. Then the approaches that move a named customer KPI, on data that is complete. Hold back the rest.", "Bauen Sie in dieser Reihenfolge. Zuerst die Basis: das Scoreboard und die Liste verlorener Kunden (Grund, Wert, Owner) mit Churn Rate, Win-back Rate und Reactivation Rate auf einer Seite, damit jeder Ansatz einen verlorenen Kunden liest. Dann die Daten, die Routine und die Menschen: die Bereinigung der Daten verlorener Kunden, damit Grund und Vertragswert überall gleich erfasst werden, eine Test-and-learn-Routine, die jedes Angebot an einer zufälligen Hälfte testet und monatlich prüft, und Teams, die geschult sind, Rückkehr-Anrufe mit dem behobenen Grund zu eröffnen. Dann die Ansätze, die einen benannten Kunden-KPI bewegen, auf Daten, die vollständig sind. Den Rest halten Sie zurück."),
        tt(`Four tests check a system. The base comes first: the scoreboard and list start no later than the first approach. Every funded item has a purpose: it moves a named customer KPI or makes one measurable; a black box and a discount that names no customer KPI do neither. Data complete: an approach starts on data of which at least ${QUALITY_BAR}% already reaches the shared list of lost customers. It fits: inside the budget and in use by month ${R2_MONTHS}.`, `Vier Tests prüfen ein System. Die Basis kommt zuerst: Scoreboard und Liste starten nicht später als der erste Ansatz. Jeder finanzierte Punkt hat einen Zweck: Er bewegt einen benannten Kunden-KPI oder macht einen messbar; eine Black Box und ein Rabatt, der keinen Kunden-KPI nennt, tun keines von beidem. Daten vollständig: Ein Ansatz startet auf Daten, von denen mindestens ${QUALITY_BAR} % schon die gemeinsame Liste verlorener Kunden erreichen. Es passt: innerhalb des Budgets und bis Monat ${R2_MONTHS} im Einsatz.`),
        tt(`Time: an item is in use in the month = start + weeks ÷ 4, rounded up. A Now item starts in month 1; an After data is ready item starts in the month the lost-customer data clean-up is in use, so the clean-up has to be Now itself: one customer ID and one set of reason codes is what puts the data onto the shared list. With ${R2_MONTHS} months, an item of 24 weeks is in use only in month 7.`, `Zeit: Ein Punkt ist im Monat = Start + Wochen ÷ 4, aufgerundet, im Einsatz. Ein Jetzt-Punkt startet in Monat 1; ein Punkt „Wenn die Daten bereit sind“ startet in dem Monat, in dem die Bereinigung der Daten verlorener Kunden im Einsatz ist, die Bereinigung muss also selbst auf Jetzt stehen: Eine Kunden-ID und ein Satz Grundcodes bringen die Daten auf die gemeinsame Liste. Bei ${R2_MONTHS} Monaten ist ein Punkt mit 24 Wochen erst in Monat 7 im Einsatz.`),
        tt(`Three bars show where the money sits: Budget (the money against the limit), Measurable (the share on items that are measured, whose data is complete and that are in use within the ${R2_MONTHS} months) and Risk (the share on a black box, on data below ${QUALITY_BAR}% complete or on an item in use only after the ${R2_MONTHS} months). Measurable and Risk are ranges, because the data may be weaker than the brief says: a plan that holds at both ends is the safer one.`, `Drei Balken zeigen, wo das Geld liegt: Budget (das Geld gegen die Grenze), Messbar (der Anteil auf Punkten, die gemessen werden, deren Daten vollständig sind und die innerhalb der ${R2_MONTHS} Monate im Einsatz sind) und Risiko (der Anteil auf einer Black Box, auf Daten unter ${QUALITY_BAR} % vollständig oder auf einem Punkt, der erst nach den ${R2_MONTHS} Monaten im Einsatz ist). Messbar und Risiko sind Spannen, weil die Daten schwächer sein können, als der Auftrag sagt: Ein Plan, der an beiden Enden hält, ist der sicherere.`),
        tt("Two goals pull against each other: costs against customer value. A win-back is worth its cost only where the returned customer's yearly value is much larger than what it cost to reach and win back that customer, so effort goes to the lost customers worth most first and the groups that cannot return are skipped.", "Zwei Ziele ziehen gegeneinander: Kosten gegen Kundenwert. Eine Rückgewinnung ist ihre Kosten nur dort wert, wo der Jahreswert des zurückgekehrten Kunden viel größer ist als das, was es kostete, diesen Kunden zu erreichen und zurückzugewinnen, also geht der Aufwand zuerst an die verlorenen Kunden, die am meisten wert sind, und die Gruppen, die nicht zurückkehren können, werden übersprungen."),
        tt("Waiting until the success rate is known is also a decision: lost customers stay unapproached in the meantime, while the exit notes and the cancellation forms, which are already well complete, could start within weeks. The brief asks for an investment decision despite an unclear success rate.", "Zu warten, bis die Erfolgsquote bekannt ist, ist auch eine Entscheidung: Verlorene Kunden bleiben in der Zwischenzeit unangesprochen, obwohl die Abschlussnotizen und die Kündigungsformulare, die schon gut vollständig sind, in Wochen starten könnten. Der Auftrag verlangt eine Investitionsentscheidung trotz unklarer Erfolgsquote."),
        tt("Buying one vendor win-back platform at once feels like catching up, but it is in use only after 24 weeks, takes most of the budget, and nobody can say what to tell a customer who got an automatic offer. Staging puts a call on the customers whose reason is fixed within weeks, tests the success rate on a small group, and spends the rest as the evidence arrives.", "Eine Win-back-Plattform eines Anbieters auf einmal zu kaufen fühlt sich wie Aufholen an, ist aber erst nach 24 Wochen in Betrieb, nimmt den Großteil des Budgets, und niemand kann sagen, was man einem Kunden sagen soll, der ein automatisches Angebot bekam. Stufenweise liegt innerhalb von Wochen ein Anruf bei den Kunden, deren Grund behoben ist, die Erfolgsquote wird an einer kleinen Gruppe getestet, und der Rest wird ausgegeben, während die Evidenz kommt."),
        tt("Fund inside the budget, and fund nothing nobody at the company can explain or measure: a platform that picks offers without reasons cannot be steered. A 25% discount for every lost customer, not connected to the reason a customer left, buys a return and names no customer KPI.", "Finanzieren Sie innerhalb des Budgets, und nichts, was im Unternehmen niemand erklären oder messen kann: Eine Plattform, die Angebote ohne Gründe wählt, lässt sich nicht steuern. Ein Rabatt von 25 % für jeden verlorenen Kunden, nicht mit dem Grund verbunden, aus dem ein Kunde ging, erkauft eine Rückkehr und nennt keinen Kunden-KPI."),
        tt("What you will watch is one figure about customers (the win-back rate, or the share of approached customers who have not answered after 30 days), not what you did (e-mails sent, reports opened, calls made), the month it can first be read, and what you do if it falls short: stop, pause or change one thing.", "Was Sie beobachten, ist eine Zahl über Kunden (die Win-back Rate oder der Anteil der angesprochenen Kunden, die nach 30 Tagen nicht geantwortet haben), nicht das, was Sie getan haben (versendete E-Mails, geöffnete Berichte, geführte Anrufe), der Monat, in dem sie sich zuerst lesen lässt, und was Sie tun, wenn sie zu kurz greift: stoppen, pausieren oder eine Sache ändern."),
        tt("Every plan gives something and costs something. Say what it gives (measured, complete data, inside the budget and the months) and what it leaves open (an item not now, data below 80% if the data is weaker, budget left unspent). A plan that differs from this order can still be argued: say why.", "Jeder Plan gibt etwas und kostet etwas. Sagen Sie, was er gibt (gemessen, vollständige Daten, innerhalb von Budget und Monaten) und was er offen lässt (ein Punkt, der jetzt nicht kommt, Daten unter 80 %, wenn die Daten schwächer sind, ungenutztes Budget). Ein Plan, der von dieser Reihenfolge abweicht, lässt sich trotzdem vertreten: Sagen Sie, warum."),
      ]}
      sources={["courtney1997", "klein2007"]}
    >
      <Diagram label={tt("A reason-based approach and its base · a worked example on Neckar Systemhaus", "Ein grundbasierter Ansatz und seine Basis · ein Beispiel mit Neckar Systemhaus")} caption={tt("Change when the shared list starts and how much of the data is complete, and watch the links.", "Ändern Sie, wann die gemeinsame Liste startet und wie viel der Daten vollständig ist, und beobachten Sie die Verbindungen.")}>
        <ArchMini cfg={ARCH_MINI} />
      </Diagram>
      <ShowMore id="B5" part="calc" label={tt("Show the worked numbers on another company (Case assumption)", "Die Rechenwege an einem anderen Unternehmen zeigen (Fallannahme)")}>
        <DataTable
          head={[tt("Rule", "Regel"), tt("Neckar's figures", "Zahlen von Neckar"), tt("Result", "Ergebnis")]}
          rows={[
            [tt("Month in use: starts in month 1, needs 8 weeks", "Monat im Einsatz: startet in Monat 1, braucht 8 Wochen"), "1 + 8 ÷ 4 = 1 + 2", tt("month 3", "Monat 3")],
            [tt("After data is ready: the lost-customer data clean-up is in use in month 2, the item needs 6 weeks", "Wenn die Daten bereit sind: Die Bereinigung der Daten verlorener Kunden ist in Monat 2 im Einsatz, der Punkt braucht 6 Wochen"), "2 + 6 ÷ 4 = 2 + 2 (6 ÷ 4 = 1.5 → 2)", tt("starts month 2, in use month 4", "Start Monat 2, im Einsatz Monat 4")],
            [tt("Time: a platform of 20 weeks that starts in month 1, in a plan of 4 months", "Zeit: eine Plattform mit 20 Wochen, die in Monat 1 startet, in einem Plan von 4 Monaten"), "1 + 20 ÷ 4 = 1 + 5", tt("month 6: too late", "Monat 6: zu spät")],
            [tt("Data complete: the approach's data is 90% complete, the bar is 80%", "Daten vollständig: Die Daten des Ansatzes sind zu 90 % vollständig, die Grenze ist 80 %"), "90 ≥ 80", tt("ready", "bereit")],
            [tt("The same approach when the data is 15 points weaker", "Derselbe Ansatz, wenn die Daten 15 Punkte schwächer sind"), "90 − 15 = 75 < 80", tt("not ready", "nicht bereit")],
            [tt("Money: three funded items against Neckar's €110,000", "Geld: drei finanzierte Punkte gegen Neckars 110.000 €"), "50,000 + 20,000 + 15,000", tt("€85,000, €25,000 left", "85.000 €, 25.000 € übrig")],
          ]}
          caption={tt("Neckar's numbers (Case assumption). The panel in the task does this for you and says what it means.", "Zahlen von Neckar (Fallannahme). Das Panel in der Aufgabe macht das für Sie und sagt, was es bedeutet.")}
        />
      </ShowMore>
      <ShowMore id="B5" part="notes" label={tt("Show two short notes", "Zwei kurze Hinweise zeigen")}>
        <Bul
          items={[
            tt("Stage it: the no-regret items first (the list, the test routine), the approaches that need more complete data when the lost-customer data is clean.", "Stufenweise: die No-regret-Punkte zuerst (die Liste, die Testroutine), die Ansätze, die mehr vollständige Daten brauchen, wenn die Daten verlorener Kunden sauber sind."),
            tt("Premortem: imagine the plan failed after four months, and write down why. Those reasons are what you watch.", "Premortem: Stellen Sie sich vor, der Plan sei nach vier Monaten gescheitert, und schreiben Sie auf, warum. Diese Gründe beobachten Sie."),
          ]}
        />
      </ShowMore>
      <ShowMore id="B5" part="extra" label={tt("Show: An unclear success rate is not a reason to bet everything, or nothing", "Zeigen: Eine unklare Erfolgsquote ist kein Grund, alles oder nichts zu setzen")}>
        <Callout label={tt("An unclear success rate is not a reason to bet everything, or nothing", "Eine unklare Erfolgsquote ist kein Grund, alles oder nichts zu setzen")} tone="signal">
          <p>{tt("Courtney, Kirkland and Viguerie (1997) advise matching the commitment to what is known: no-regret moves now, options that can be scaled later, and big bets only when the evidence is in. A staged system with a sentence on what you watch is decisive and still honest about what you do not know yet.", "Courtney, Kirkland und Viguerie (1997) raten, die Festlegung an das Bekannte anzupassen: No-regret-Schritte jetzt, Optionen, die sich später ausweiten lassen, und große Wetten erst, wenn die Evidenz da ist. Ein gestuftes System mit einem Satz dazu, was Sie beobachten, ist entschlossen und trotzdem ehrlich darüber, was Sie noch nicht wissen.")}</p>
        </Callout>
      </ShowMore>
    </MaterialCard>
  );
}

export const CARDS_B = [CardB1, CardB2, CardB3, CardB4, CardB5];
