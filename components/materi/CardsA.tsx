"use client";

import { Bul, Diagram } from "@/components/materi/kit";
import { BarToggle, FairTest, KpiTree, SceneCards, ScatterMap, ScoreBars, TwoRates } from "@/components/materi/diagrams";
import { Callout, DataTable, MaterialCard } from "@/components/ui/MaterialCard";
import { ShowMore } from "@/components/ui/ShowMore";
import { BAR_RATES, FAIR, KPI_TREE, MECH, MOMENTS, PRIZE, SCORE } from "@/data/diagramData";
import { LEVEL_TESTS } from "@/data/ladder";
import { PATTERNS, PATTERN_IDS, PATTERN_PAIR_TESTS, RISK_RULE } from "@/data/patterns";
import { EFFECT_ANCHOR, EXPLAIN_RULE, SCALE_ANCHOR } from "@/data/measures";
import { MOSEL, MOSEL_RESULT } from "@/data/forecast";
import { euro, num, pct, tt } from "@/lib/lang";

/** Materi A: the seven cards of Route 1 (Levels 1 and 2 on one case). 60 minutes in all; A1 (Level 1) and A7 (Level 2) are the two Core cards (CLAUDE.md #48). */
const p = "text-body text-ink";

export function CardA1() {
  return (
    <MaterialCard
      id="A1"
      scan={tt("Customers who leave give a reason, and not every reason is the same kind. An emotional reason is about how the customer felt treated (trust lost, promises broken). A rational reason is a comparison the customer can write down (a lower price, a missing function, a simpler contract). Some reasons lie outside the company's reach (a takeover, a closure, a frozen budget). The kind of reason decides what could bring a customer back, and whether trying is worth it.", "Kunden, die gehen, nennen einen Grund, und nicht jeder Grund ist von derselben Art. Ein emotionaler Grund betrifft, wie sich der Kunde behandelt fühlte (Vertrauen verloren, Versprechen gebrochen). Ein rationaler Grund ist ein Vergleich, den der Kunde aufschreiben kann (ein niedrigerer Preis, eine fehlende Funktion, ein einfacherer Vertrag). Manche Gründe liegen außerhalb des Einflusses des Unternehmens (eine Übernahme, eine Schließung, ein eingefrorenes Budget). Die Art des Grundes entscheidet, was einen Kunden zurückbringen könnte und ob der Versuch sich lohnt.")}
      reasoning={[
        tt("A win-back starts from the reason the customer gave, not from the offer. Sort every reason into one of three kinds before you choose a step.", "Eine Rückgewinnung geht von dem Grund aus, den der Kunde nannte, nicht vom Angebot. Ordnen Sie jeden Grund einer von drei Arten zu, bevor Sie einen Schritt wählen."),
        ...LEVEL_TESTS.map((x) => `${x.name}: ${x.test}`),
        tt("The question that sorts most reasons: if the company had offered the same price and the same functions, would the customer still have gone? Yes: emotional. No, a better offer would have kept it: rational. And if nothing the company could do would have changed it: outside our reach.", "Die Frage, die die meisten Gründe sortiert: Hätte der Kunde auch bei gleichem Preis und gleichen Funktionen gekündigt? Ja: emotional. Nein, ein besseres Angebot hätte ihn gehalten: rational. Und wenn nichts, was das Unternehmen tun konnte, es geändert hätte: außerhalb unseres Einflusses."),
        tt("Many customers name two reasons (“the price went up and nobody called us”). Sort by the one they name first, and keep the other as a note.", "Viele Kunden nennen zwei Gründe („der Preis stieg, und uns rief niemand an“). Ordnen Sie nach dem zu, den sie zuerst nennen, und behalten Sie den anderen als Notiz."),
        tt("Typical emotional reasons: trust lost after an outage nobody followed up, promises broken again and again, a relationship that went cold when a contact left. Typical rational reasons: a lower price for the same scope, a function that is missing, a simpler contract. Typical reasons outside our reach: a takeover by a group with its own IT, a closure, a frozen budget.", "Typische emotionale Gründe: Vertrauen verloren nach einem Ausfall, dem niemand nachging, immer wieder gebrochene Versprechen, eine Beziehung, die erkaltete, als ein Ansprechpartner ging. Typische rationale Gründe: ein niedrigerer Preis für denselben Umfang, eine fehlende Funktion, ein einfacherer Vertrag. Typische Gründe außerhalb unseres Einflusses: eine Übernahme durch einen Konzern mit eigener IT, eine Schließung, ein eingefrorenes Budget."),
        tt("A change of staff or an outage can look like bad luck. If the company could have acted (introduced itself to the new IT lead, called after the outage), the reason is emotional, not outside our reach.", "Ein Personalwechsel oder ein Ausfall kann wie Pech aussehen. Hätte das Unternehmen handeln können (sich der neuen IT-Leiterin vorstellen, nach dem Ausfall anrufen), ist der Grund emotional, nicht außerhalb unseres Einflusses."),
        tt("Three motives can bring a customer back: trust restored (a person who takes responsibility and says what changed), the effort and cost of switching back reduced (a free move, a parallel run), and new value or an incentive (a function the customer named, a tailored offer; a discount is an incentive, not an answer).", "Drei Motive können einen Kunden zurückbringen: wiederhergestelltes Vertrauen (eine Person, die Verantwortung übernimmt und sagt, was sich geändert hat), ein geringerer Aufwand und geringere Kosten für den Rückwechsel (ein kostenloser Umzug, ein Parallelbetrieb) und neuer Nutzen oder ein Anreiz (eine Funktion, die der Kunde nannte, ein maßgeschneidertes Angebot; ein Rabatt ist ein Anreiz, keine Antwort)."),
        tt("Match the motive to the kind of reason: an emotional reason needs trust restored first; a rational reason needs a better offer on the point it names, or an easier return; a reason outside our reach needs only a friendly note and patience.", "Passen Sie das Motiv an die Art des Grundes an: Ein emotionaler Grund braucht zuerst wiederhergestelltes Vertrauen; ein rationaler Grund braucht ein besseres Angebot zu dem Punkt, den er nennt, oder eine leichtere Rückkehr; ein Grund außerhalb unseres Einflusses braucht nur eine freundliche Notiz und Geduld."),
        tt("Emotional against financial incentives: an emotional incentive speaks to how the customer felt (a call, an admission, what changed); a financial incentive is money (a discount, a free service). A discount alone does not repair a broken promise and teaches customers to wait for the next one.", "Emotionale gegen finanzielle Anreize: Ein emotionaler Anreiz spricht an, wie sich der Kunde fühlte (ein Anruf, ein Eingeständnis, was sich geändert hat); ein finanzieller Anreiz ist Geld (ein Rabatt, ein kostenloser Service). Ein Rabatt allein repariert kein gebrochenes Versprechen und bringt Kunden bei, auf den nächsten zu warten."),
        tt("The wrong customers: a win-back that spends calls and offers on a reason outside our reach, or gives a discount to customers who would have returned anyway, costs money and brings nothing.", "Die falschen Kunden: Eine Rückgewinnung, die Anrufe und Angebote für einen Grund außerhalb unseres Einflusses ausgibt oder Kunden einen Rabatt gibt, die ohnehin zurückgekommen wären, kostet Geld und bringt nichts."),
        tt("A reason of your own for a customer to return names something the company could do, which kind of reason it answers (trust, the effort of coming back, value) and why that could change the customer's mind (“so …”).", "Ein eigener Grund für die Rückkehr eines Kunden nennt etwas, das das Unternehmen tun könnte, welche Art von Grund es beantwortet (Vertrauen, der Aufwand der Rückkehr, Nutzen) und warum das die Meinung des Kunden ändern könnte („sodass …“)."),
      ]}
      sources={["morgan1994", "griffin2001", "burnham2003"]}
    >
      <ShowMore id="A1" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Morgan and Hunt (1994) describe trust and commitment as the centre of lasting business relationships, which is why a trust reason is repaired by a person before an offer. Burnham, Frels and Mahajan (2003) sort the costs of switching providers into effort, money and relationship, which is why a free move back can matter more than a lower price. Griffin and Lowenstein (2001) describe win-back as a process that starts by finding out why customers left and which of them are worth winning back.",
            "Morgan und Hunt (1994) beschreiben Vertrauen und Bindung als Kern dauerhafter Geschäftsbeziehungen, weshalb ein Vertrauensgrund von einer Person repariert wird, bevor es ein Angebot gibt. Burnham, Frels und Mahajan (2003) ordnen die Kosten eines Anbieterwechsels in Aufwand, Geld und Beziehung, weshalb ein kostenloser Rückumzug mehr bedeuten kann als ein niedrigerer Preis. Griffin und Lowenstein (2001) beschreiben Rückgewinnung als Prozess, der damit beginnt herauszufinden, warum Kunden gingen und welche von ihnen sich zurückzugewinnen lohnen.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Three kinds of reason, three answers · a worked example on Isar Hosting", "Drei Arten von Gründen, drei Antworten · ein Beispiel mit Isar Hosting")} caption={tt("Choose a kind of reason and an answer and see what the team does; then try the worked sort below.", "Wählen Sie eine Art von Grund und eine Antwort und sehen Sie, was das Team tut; probieren Sie dann die Beispielsortierung darunter.")}>
        <SceneCards cfg={MECH} />
      </Diagram>
      <ShowMore id="A1" part="notes" label={tt("Show two short notes", "Zwei kurze Hinweise zeigen")}>
        <Bul
          items={[
            tt("Emotional: how the customer felt treated. Rational: a comparison it can write down. Outside our reach: a change nobody at the company could influence.", "Emotional: wie sich der Kunde behandelt fühlte. Rational: ein Vergleich, den er aufschreiben kann. Außerhalb unseres Einflusses: eine Veränderung, auf die niemand im Unternehmen Einfluss hatte."),
            tt("Winning back is not always right: some customers cannot return, and some would have returned without any offer.", "Rückgewinnen ist nicht immer richtig: Manche Kunden können nicht zurückkehren, und manche wären auch ohne Angebot zurückgekommen."),
          ]}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA2() {
  return (
    <MaterialCard
      id="A2"
      scan={tt("Three things can bring a customer back: trust that has been repaired, a return that is easy, or new value and incentives. A personal call after the fix answers trust. A free move answers the effort of switching back. An offer with the function the customer named answers value. A discount alone answers none of them for long, and where the reason is outside our reach nothing works.", "Drei Dinge können einen Kunden zurückbringen: repariertes Vertrauen, eine leichte Rückkehr, oder neuer Nutzen und Anreize. Ein persönlicher Anruf nach der Behebung beantwortet das Vertrauen. Ein kostenloser Umzug beantwortet den Aufwand des Rückwechsels. Ein Angebot mit der Funktion, die der Kunde nannte, beantwortet den Nutzen. Ein Rabatt allein beantwortet keinen davon lange, und wo der Grund außerhalb unseres Einflusses liegt, wirkt nichts.")}
      reasoning={[
        tt("Restoring trust: a person the customer knew, an admission of what went wrong and what changed, before any offer. It answers emotional reasons.", "Vertrauen wiederherstellen: eine Person, die der Kunde kannte, ein Eingeständnis, was schiefging und was sich geändert hat, vor jedem Angebot. Es beantwortet emotionale Gründe."),
        tt("Reducing switching costs: the customer who left has already moved its data and setup, and coming back means doing it again. A free move, a parallel run for a month or a done-for-you plan removes that effort. It answers rational reasons about effort.", "Wechselkosten senken: Der Kunde, der ging, hat seine Daten und Einrichtung schon umgezogen, und eine Rückkehr heißt, es noch einmal zu tun. Ein kostenloser Umzug, ein Parallelbetrieb für einen Monat oder ein Rundum-Plan nimmt diesen Aufwand ab. Es beantwortet rationale Gründe zum Aufwand."),
        tt("New value or an incentive: add what the customer named (a function, a service review, a named contact), and only then, if needed, a modest incentive. Value answers a rational reason; an incentive without value only buys the return.", "Neuer Nutzen oder ein Anreiz: Fügen Sie hinzu, was der Kunde nannte (eine Funktion, ein Service-Review, einen benannten Ansprechpartner), und erst dann, wenn nötig, einen maßvollen Anreiz. Nutzen beantwortet einen rationalen Grund; ein Anreiz ohne Nutzen erkauft nur die Rückkehr."),
        tt("Emotional incentives (a call, an admission, a changed process) cost time; financial incentives (a discount, a free month) cost margin. Use the emotional one first when trust was the reason, value when a comparison was, and a discount last and in a measured way.", "Emotionale Anreize (ein Anruf, ein Eingeständnis, ein geänderter Prozess) kosten Zeit; finanzielle Anreize (ein Rabatt, ein freier Monat) kosten Marge. Nutzen Sie zuerst den emotionalen, wenn Vertrauen der Grund war, Nutzen, wenn ein Vergleich der Grund war, und einen Rabatt zuletzt und maßvoll."),
        tt("A discount repeats: given once, it is expected again and teaches customers to wait for it. It is an incentive, not an answer to the reason.", "Ein Rabatt wiederholt sich: Einmal gegeben, wird er wieder erwartet und bringt Kunden bei, darauf zu warten. Er ist ein Anreiz, keine Antwort auf den Grund."),
        tt("Timing: the call works best soon after the fix and before the customer has settled with the new provider; every month of waiting makes the return harder.", "Zeitpunkt: Der Anruf wirkt am besten bald nach der Behebung und bevor sich der Kunde beim neuen Anbieter eingerichtet hat; jeder Monat Warten macht die Rückkehr schwerer."),
        tt("Three win-back approaches use three different motives, and each says why it gives the group a reason to return (“so …”).", "Drei Rückgewinnungsansätze nutzen drei verschiedene Motive, und jeder sagt, warum er der Gruppe einen Grund zur Rückkehr gibt („sodass …“)."),
      ]}
      sources={["burnham2003", "stauss1999"]}
    >
      <ShowMore id="A2" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Burnham, Frels and Mahajan (2003) separate three kinds of switching cost: procedural (time and effort), financial (money lost) and relational (links to people and the provider). Stauss and Friege (1999) treat winning back lost customers as a managed process with its own costs and benefits, which starts from the customer's reason for leaving. This card follows both: match the motive to the reason, and count what the approach costs.",
            "Burnham, Frels und Mahajan (2003) unterscheiden drei Arten von Wechselkosten: prozedurale (Zeit und Aufwand), finanzielle (verlorenes Geld) und relationale (Verbindungen zu Menschen und zum Anbieter). Stauss und Friege (1999) behandeln die Rückgewinnung verlorener Kunden als gesteuerten Prozess mit eigenen Kosten und Nutzen, der vom Abschiedsgrund des Kunden ausgeht. Diese Karte folgt beiden: das Motiv an den Grund anpassen und zählen, was der Ansatz kostet.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("What brings a customer back · a worked example on Isar Hosting", "Was einen Kunden zurückbringt · ein Beispiel mit Isar Hosting")} caption={tt("Switch between a personal approach and the standard discount e-mail, and choose a reason.", "Wechseln Sie zwischen einem persönlichen Ansatz und der Standard-Rabatt-E-Mail, und wählen Sie einen Grund.")}>
        <BarToggle cfg={PRIZE} />
      </Diagram>
      <ShowMore id="A2" part="table" label={tt("Show the table: three motives and what each costs", "Tabelle zeigen: Drei Motive und was jedes kostet")}>
        <DataTable
          head={[tt("Motive", "Motiv"), tt("It answers", "Es beantwortet"), tt("Example at Isar Hosting", "Beispiel bei Isar Hosting"), tt("What it costs", "Was es kostet")]}
          rows={[
            [tt("Rebuild trust", "Vertrauen wiederaufbauen"), tt("Emotional reasons", "Emotionale Gründe"), tt("A call from the former account owner after the fix", "Ein Anruf des früheren Account Owners nach der Behebung"), tt("Owner time", "Zeit des Owners")],
            [tt("Lower the cost of coming back", "Die Rückkehr leichter machen"), tt("Rational reasons about effort", "Rationale Gründe zum Aufwand"), tt("A free move back, both setups side by side for a month", "Ein kostenloser Rückumzug, beide Setups einen Monat parallel"), tt("Engineer days per customer", "Ingenieurtage pro Kunde")],
            [tt("Add value or an incentive", "Nutzen oder einen Anreiz bieten"), tt("Rational reasons about a missing function or price", "Rationale Gründe zu einer fehlenden Funktion oder zum Preis"), tt("An offer with the function the customer named, then a modest incentive", "Ein Angebot mit der Funktion, die der Kunde nannte, dann ein maßvoller Anreiz"), tt("Licence or margin", "Lizenz oder Marge")],
          ]}
          caption={tt("Three motives and what each costs", "Drei Motive und was jedes kostet")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA3() {
  return (
    <MaterialCard
      id="A3"
      scan={tt("Not every group of lost customers is worth the effort. A win-back pays most where the reason is one the company can fix and a quarter or more would consider coming back. It can run on data you already have only where part or all of the record of the group (who, why, what it was worth) is already on the list. Where neither is true, other work comes first.", "Nicht jede Gruppe verlorener Kunden ist den Aufwand wert. Eine Rückgewinnung lohnt sich am meisten dort, wo der Grund einer ist, den das Unternehmen beheben kann, und ein Viertel oder mehr eine Rückkehr erwägt. Sie kann nur dort auf Daten laufen, die Sie schon haben, wo ein Teil oder alles vom Datensatz der Gruppe (wer, warum, was er wert war) schon in der Liste steht. Wo beides nicht zutrifft, kommt andere Arbeit zuerst.")}
      reasoning={[
        tt("A win-back pays most where two things hold: the reason is one the company can fix itself, and 25% or more of the group say they would consider coming back. Work those groups first.", "Eine Rückgewinnung lohnt sich am meisten, wo zwei Dinge gelten: Der Grund ist einer, den das Unternehmen selbst beheben kann, und 25 % oder mehr der Gruppe sagen, sie würden eine Rückkehr erwägen. Bearbeiten Sie diese Gruppen zuerst."),
        tt("Many open is not enough: where the reason is outside the company's reach (a frozen budget, a group tender), the step is to stay in touch and wait, or to bid, not to run a win-back. That is the rule of Materi A1 for reasons outside our reach.", "Dass viele offen sind, reicht nicht: Wo der Grund außerhalb des Einflusses des Unternehmens liegt (ein eingefrorenes Budget, eine Konzernausschreibung), ist der Schritt, in Kontakt zu bleiben und zu warten oder ein Angebot abzugeben, nicht eine Rückgewinnung zu fahren. Das ist die Regel aus Materi A1 für Gründe außerhalb unseres Einflusses."),
        tt("A group with a fixable reason but few open (under 25%) is a second wave, not the first place to spend.", "Eine Gruppe mit behebbarem Grund, aber wenigen Offenen (unter 25 %), ist eine zweite Welle, nicht der erste Ort zum Ausgeben."),
        tt("An approach can run on data we have only where part or all of the record of the group (who the customer is, the reason, the contract value) is already on the list of lost customers. Where nothing is recorded, the record must be built first.", "Ein Ansatz kann nur dort auf vorhandenen Daten laufen, wo ein Teil oder alles vom Datensatz der Gruppe (wer der Kunde ist, der Grund, der Vertragswert) schon in der Liste verlorener Kunden steht. Wo nichts erfasst ist, muss der Datensatz erst aufgebaut werden."),
        tt("Groups that pay most and groups that can use data we have are two different lists. The group that pays most often has no record yet; the best-recorded group is often not the one that pays most.", "Gruppen, in denen es sich am meisten lohnt, und Gruppen, die vorhandene Daten nutzen können, sind zwei verschiedene Listen. Die Gruppe, in der es sich am meisten lohnt, hat oft noch keinen Datensatz; die am besten erfasste Gruppe ist oft nicht die, in der es sich am meisten lohnt."),
        tt("Think in money: a returned customer is worth its yearly value; an approach costs time and money for every customer approached. Aim at the groups where enough of them return to cover that cost, and leave the others.", "Denken Sie in Geld: Ein zurückgekehrter Kunde ist seinen Jahreswert wert; ein Ansatz kostet für jeden angesprochenen Kunden Zeit und Geld. Zielen Sie auf die Gruppen, in denen genug von ihnen zurückkehren, um diese Kosten zu decken, und lassen Sie die anderen."),
        tt("The wrong customers: groups outside reach waste effort, and customers who would have returned anyway take a discount they did not need.", "Die falschen Kunden: Gruppen außerhalb des Einflusses verschwenden Aufwand, und Kunden, die ohnehin zurückgekommen wären, nehmen einen Rabatt, den sie nicht brauchten."),
        tt("Three win-back approaches use three different motives, aimed at a group you name, and each says why it gives that group a reason to return.", "Drei Rückgewinnungsansätze nutzen drei verschiedene Motive, auf eine Gruppe gerichtet, die Sie nennen, und jeder sagt, warum er dieser Gruppe einen Grund zur Rückkehr gibt."),
      ]}
      sources={["reinartz2000", "gupta2004", "griffin2001"]}
    >
      <ShowMore id="A3" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Reinartz and Kumar (2000) showed that long-standing customers are not automatically the most profitable ones, which is why a win-back looks at value and not only at who used to be a customer. Gupta, Lehmann and Stuart (2004) value a customer by the money it brings over its lifetime, which is what a returned customer is worth. Griffin and Lowenstein (2001) advise deciding which lost customers are worth winning back before making any offer.",
            "Reinartz und Kumar (2000) zeigten, dass langjährige Kunden nicht automatisch die profitabelsten sind, weshalb eine Rückgewinnung auf den Wert schaut und nicht nur darauf, wer früher Kunde war. Gupta, Lehmann und Stuart (2004) bewerten einen Kunden nach dem Geld, das er über seine Lebenszeit bringt, und genau das ist ein zurückgekehrter Kunde wert. Griffin und Lowenstein (2001) raten, vor jedem Angebot zu entscheiden, welche verlorenen Kunden sich zurückzugewinnen lohnen.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Where a win-back pays, and where it can use data that exists · a worked example on Isar Hosting", "Wo sich eine Rückgewinnung lohnt, und wo sie vorhandene Daten nutzen kann · ein Beispiel mit Isar Hosting")} caption={tt("Choose a group on the map or in the list and read where it falls and why.", "Wählen Sie eine Gruppe auf der Karte oder in der Liste und lesen Sie, wo sie liegt und warum.")}>
        <ScatterMap cfg={MOMENTS} />
      </Diagram>
      <ShowMore id="A3" part="table" label={tt("Show the table: three records a win-back needs", "Tabelle zeigen: Drei Datensätze, die eine Rückgewinnung braucht")}>
        <DataTable
          head={[tt("Record", "Datensatz"), tt("What it holds", "Was er enthält"), tt("What a win-back needs from it", "Was eine Rückgewinnung davon braucht")]}
          rows={[
            [tt("Exit notes and forms", "Abschlussnotizen und -formulare"), tt("The reason the customer gave, in its own words", "Den Grund, den der Kunde nannte, in seinen eigenen Worten"), tt("The reason sorted as emotional, rational or outside our reach", "Den Grund, einsortiert als emotional, rational oder außerhalb unseres Einflusses")],
            [tt("Contract data", "Vertragsdaten"), tt("Yearly value, term and end date", "Jahreswert, Laufzeit und Enddatum"), tt("What a returned customer would be worth", "Was ein zurückgekehrter Kunde wert wäre")],
            [tt("Contact log (CRM)", "Kontaktprotokoll (CRM)"), tt("Who owned the account and who the contact was", "Wer das Konto betreute und wer der Ansprechpartner war"), tt("Who calls, and whom", "Wer anruft, und wen")],
          ]}
          caption={tt("Three records a win-back needs", "Drei Datensätze, die eine Rückgewinnung braucht")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA4() {
  const r = MOSEL_RESULT;
  return (
    <MaterialCard
      id="A4"
      scan={tt("To put a euro figure on a personal approach, compare how often lost customers returned after a call and after the standard e-mail. Three figures read it: the return rate of each group, the lift, and the extra revenue a year.", "Um einem persönlichen Ansatz einen Euro-Wert zu geben, vergleichen Sie, wie oft verlorene Kunden nach einem Anruf und nach der Standard-E-Mail zurückkehrten. Drei Werte lesen es: die Rückkehrquote jeder Gruppe, der Lift und der zusätzliche Umsatz pro Jahr.")}
      reasoning={[
        tt("Return rate = returned customers ÷ approached customers × 100. Take both numbers from the same group's rows.", "Rückkehrquote = zurückgekehrte Kunden ÷ angesprochene Kunden × 100. Nehmen Sie beide Zahlen aus den Zeilen derselben Gruppe."),
        tt("Lift = return rate with the call ÷ return rate with the e-mail. Work out the second rate from its own rows first; the groups are not the same size, so compare rates, never counts.", "Lift = Rückkehrquote mit Anruf ÷ Rückkehrquote mit E-Mail. Berechnen Sie die zweite Quote zuerst aus ihren eigenen Zeilen; die Gruppen sind nicht gleich groß, also vergleichen Sie Quoten, nie Zahlen."),
        tt("Extra revenue a year = lost customers a year whose reason can be fixed × (rate with − rate without, as a share of one) × the yearly value of a returned customer. Only the difference counts: customers who got the e-mail would have returned their share anyway. One point is 0.01.", "Zusätzlicher Umsatz pro Jahr = verlorene Kunden pro Jahr mit behebbarem Grund × (Quote mit − Quote ohne, als Anteil von eins) × der Jahreswert eines zurückgekehrten Kunden. Nur der Unterschied zählt: Kunden mit der E-Mail wären ihren Anteil ohnehin zurückgekehrt. Ein Punkt ist 0,01."),
        tt("Use the lost customers of a whole year whose reason can be fixed, not the customers of one group.", "Nehmen Sie die verlorenen Kunden eines ganzen Jahres mit behebbarem Grund, nicht die Kunden einer Gruppe."),
        tt("These figures compare customers that account owners happened to call or not, so they are not yet a fair test: say them as an estimate, and test fairly before you promise the full amount.", "Diese Werte vergleichen Kunden, die Account Owner zufällig anriefen oder nicht, sind also noch kein fairer Test: Sagen Sie sie als Schätzung, und testen Sie fair, bevor Sie den ganzen Betrag versprechen."),
        tt("A sentence about the return figures quotes at least one figure, says what to do first, and how sure it can be.", "Ein Satz über die Rückkehr-Werte nennt mindestens einen Wert, sagt, was zuerst zu tun ist, und wie sicher man sein kann."),
      ]}
      sources={["provost2013", "gupta2004"]}
    >
      <ShowMore id="A4" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Provost and Fawcett (2013) name rates, lift and expected value as the basic tools for reading any comparison: compare two groups, and put a value on the difference. Gupta, Lehmann and Stuart (2004) value a customer by what it brings over time, which is the yearly value used here. The worked example uses Isar Hosting's numbers; the steps are the same for any company.",
            "Provost und Fawcett (2013) nennen Raten, Lift und Erwartungswert als Grundwerkzeuge, um jeden Vergleich zu lesen: zwei Gruppen vergleichen und dem Unterschied einen Wert geben. Gupta, Lehmann und Stuart (2004) bewerten einen Kunden nach dem, was er über die Zeit bringt, und das ist der hier genutzte Jahreswert. Das Beispiel nutzt die Zahlen von Isar Hosting; die Schritte sind für jedes Unternehmen gleich.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("What a personal approach is worth · worked example on Isar Hosting (Case assumption)", "Was ein persönlicher Ansatz wert ist · Beispiel mit Isar Hosting (Fallannahme)")} caption={tt("Move the slider to change how many lost customers Isar has in a year.", "Bewegen Sie den Regler, um zu ändern, wie viele verlorene Kunden Isar pro Jahr hat.")}>
        <TwoRates cfg={BAR_RATES} />
      </Diagram>
      <ShowMore id="A4" part="calc" label={tt("Show the table: the four steps, on other numbers than the task", "Tabelle zeigen: Die vier Schritte, mit anderen Zahlen als in der Aufgabe")}>
        <DataTable
          head={[tt("Step", "Schritt"), tt("Calculation · Isar Hosting", "Rechnung · Isar Hosting"), tt("Result", "Ergebnis")]}
          rows={[
            [tt("1 · Return rate with the call", "1 · Rückkehrquote mit Anruf"), `${MOSEL.variant.orders} ÷ ${num(MOSEL.variant.sent)} × 100`, pct(r.rate)],
            [tt("2 · Return rate with the e-mail", "2 · Rückkehrquote mit E-Mail"), `${MOSEL.control.orders} ÷ ${num(MOSEL.control.sent)} × 100`, pct(r.other)],
            [tt("3 · Lift", "3 · Lift"), `${num(r.rate)} ÷ ${num(r.other)}`, tt(`${num(r.lift)} times`, `${num(r.lift)}-mal`)],
            [tt("4 · Extra revenue a year", "4 · Zusätzlicher Umsatz pro Jahr"), `${num(MOSEL.yearly)} × ${num((r.rate - r.other) / 100)} × ${euro(MOSEL.order)}`, euro(r.extra)],
          ]}
          caption={tt("The four steps, on other numbers than the task", "Die vier Schritte, mit anderen Zahlen als in der Aufgabe")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA5() {
  return (
    <MaterialCard
      id="A5"
      scan={tt("What lost customers do after they left says whether they might return. Return signals come in four families: contact with us, visits and logins, price and offer questions, and what they say. The ones where a former customer's people deal with ours went with coming back most. The ones the systems count can mislead, and the ones that need the customer to speak, like a survey, went with it least.", "Was verlorene Kunden nach ihrem Abschied tun, sagt, ob sie zurückkehren könnten. Rückkehr-Signale gibt es in vier Familien: Kontakt mit uns, Besuche und Logins, Preis- und Angebotsfragen, und was sie sagen. Die, bei denen die Leute eines früheren Kunden mit unseren umgehen, gingen am stärksten mit der Rückkehr einher. Die, die die Systeme zählen, können täuschen, und die, bei denen der Kunde sprechen muss, wie eine Umfrage, gingen am schwächsten damit einher.")}
      reasoning={[
        ...PATTERN_IDS.map((x) => `${PATTERNS[x].label}: ${PATTERNS[x].test}`),
        ...PATTERN_PAIR_TESTS.map((x) => `${x.pair} ${x.test}`),
        tt("Tag what a signal measures, not how it behaved last year: a visit that did not go with coming back is still a visit. Logging in to export its own reports is visits and logins although it did not go with coming back.", "Ordnen Sie zu, was ein Signal misst, nicht wie es sich letztes Jahr verhielt: Ein Besuch, der nicht mit der Rückkehr einherging, ist trotzdem ein Besuch. Sich einzuloggen, um die eigenen Berichte zu exportieren, sind Besuche und Logins, obwohl es nicht mit der Rückkehr einherging."),
        RISK_RULE.v,
        tt("When each family shows and what to do with it: visits and logins are counted by the systems, so build an automatic list and let the former account owner decide each Monday whether to call; contact shows only if a person logs it, so ask every account owner to log each answer, accepted call and event; price and offer questions show when the customer weighs coming back, so give them to sales the same week for a tailored offer; what they say arrives when the customer chooses to speak, so answer every exit survey and review personally and never use a score alone as a sign. A bonus on a number rewards reporting it, not moving it.", "Wann sich jede Familie zeigt und was damit zu tun ist: Besuche und Logins zählen die Systeme, also bauen Sie eine automatische Liste und lassen den früheren Account Owner jeden Montag entscheiden, ob er anruft; Kontakt zeigt sich nur, wenn eine Person ihn festhält, also bitten Sie jeden Account Owner, jede Antwort, jedes angenommene Gespräch und jede Veranstaltung festzuhalten; Preis- und Angebotsfragen zeigen sich, wenn der Kunde eine Rückkehr abwägt, also geben Sie sie in derselben Woche dem Vertrieb für ein maßgeschneidertes Angebot; was sie sagen, kommt, wenn der Kunde sich zu sprechen entscheidet, also beantworten Sie jede Abschlussumfrage und jede Bewertung persönlich und nutzen einen Wert nie allein als Zeichen. Ein Bonus auf eine Zahl belohnt, dass sie berichtet wird, nicht dass sie bewegt wird."),
        tt("A good set of three signals has at least one from contact with us and one from price and offer questions or visits and logins, each with where the number comes from, what you would aim for and why it is a signal and not noise.", "Ein gutes Set aus drei Signalen hat mindestens eines aus Kontakt mit uns und eines aus Preis- und Angebotsfragen oder Besuchen und Logins, jedes mit der Quelle der Zahl, dem, was Sie anstreben würden, und warum es ein Signal ist und kein Rauschen."),
      ]}
      sources={["kaplan1992", "dawes1979", "stauss1999"]}
    >
      <ShowMore id="A5" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kaplan and Norton (1992) argued that managers should steer by a few linked measures: the results, and the drivers that lead to them. Dawes (1979) found that a simple score of a few well-chosen signs often predicts as well as a complicated one. Stauss and Friege (1999) treat the behaviour of lost customers, not only their stated reasons, as the basis for deciding whom to approach.",
            "Kaplan und Norton (1992) forderten, dass Führungskräfte nach wenigen verbundenen Kennzahlen steuern: den Ergebnissen und den Treibern, die zu ihnen führen. Dawes (1979) fand, dass ein einfacher Score aus wenigen gut gewählten Zeichen oft so gut voraussagt wie ein komplizierter. Stauss und Friege (1999) behandeln das Verhalten verlorener Kunden, nicht nur ihre genannten Gründe, als Grundlage für die Entscheidung, wen man anspricht.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Four families of return signal · a worked example on Isar Hosting", "Vier Familien von Rückkehr-Signalen · ein Beispiel mit Isar Hosting")} caption={tt("Choose a signal to read its family, then show whether each went with coming back last year.", "Wählen Sie ein Signal, um seine Familie zu lesen, und zeigen Sie dann, ob jedes letztes Jahr mit der Rückkehr einherging.")}>
        <KpiTree cfg={KPI_TREE} />
      </Diagram>
      <ShowMore id="A5" part="table" label={tt("Show the table: the four families of return signal", "Tabelle zeigen: Die vier Familien von Rückkehr-Signalen")}>
        <DataTable
          head={[tt("Family", "Familie"), tt("What it is", "Was es ist"), tt("Where it comes from", "Woher es kommt")]}
          rows={PATTERN_IDS.map((x) => [PATTERNS[x].label, PATTERNS[x].means, PATTERNS[x].shape])}
          caption={tt("The four families of return signal", "Die vier Familien von Rückkehr-Signalen")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA6() {
  return (
    <MaterialCard
      id="A6"
      scan={tt("Two tools tell you whether an approach works, and optimising never ends. A fair A/B test shows the cause: one change, a random split in the same weeks, judged by the result, with a size fixed before the start. Reading trends shows the direction: a change that holds over several periods, not one good month. Then the best approach is kept, changed or stopped, and tested again.", "Zwei Werkzeuge zeigen, ob ein Ansatz wirkt, und das Optimieren hört nie auf. Ein fairer A/B-Test zeigt die Ursache: eine Änderung, eine zufällige Aufteilung in denselben Wochen, am Ergebnis gemessen, mit einer vor dem Start festgelegten Größe. Trends zu lesen zeigt die Richtung: eine Veränderung, die über mehrere Zeiträume hält, nicht ein guter Monat. Dann wird der beste Ansatz behalten, geändert oder gestoppt und wieder getestet.")}
      reasoning={[
        tt("One change: if the variant differs in two things and wins, nobody knows which one did it.", "Eine Änderung: Unterscheidet sich die Variante in zwei Dingen und gewinnt, weiß niemand, welches es war."),
        tt("A random split in the same weeks: comparing with last year, one region with another, or customers whose owner chose not to call lets something other than the change explain the difference.", "Eine zufällige Aufteilung in denselben Wochen: Der Vergleich mit dem letzten Jahr, einer Region mit einer anderen oder mit Kunden, bei denen der Owner sich gegen einen Anruf entschied, lässt etwas anderes als die Änderung den Unterschied erklären."),
        tt("The KPI that decides is the result the problem is about (for win-back: the share of approached lost customers who sign again and are still customers after 90 days), not e-mails opened and not calls made.", "Der KPI, der entscheidet, ist das Ergebnis, um das es beim Problem geht (bei der Rückgewinnung: der Anteil der angesprochenen verlorenen Kunden, die erneut unterschreiben und nach 90 Tagen noch Kunden sind), nicht geöffnete E-Mails und nicht geführte Anrufe."),
        tt("Fix the size before you start: about 100 approached customers per group, and long enough for them to decide (90 days). Stopping when the variant is ahead picks a lucky moment.", "Legen Sie die Größe vor dem Start fest: etwa 100 angesprochene Kunden pro Gruppe, und lange genug, dass sie entscheiden können (90 Tage). Zu stoppen, wenn die Variante vorn liegt, wählt einen glücklichen Moment."),
        tt("Write the hypothesis (“if we …, then … rises, because …”) and the decision rule (roll out, keep testing, stop, and which guardrail must hold) before the test starts.", "Schreiben Sie die Hypothese („wenn wir …, dann steigt …, weil …“) und die Entscheidungsregel (ausrollen, weiter testen, stoppen, und welche Guardrail halten muss) vor dem Teststart auf."),
        tt("Optimising is a loop, not a project: roll out what a fair test supports, keep testing what is promising but small, stop what does not move the result, and test the next small change. What worked last year may not work this year.", "Optimieren ist eine Schleife, kein Projekt: Rollen Sie aus, was ein fairer Test stützt, testen Sie weiter, was vielversprechend, aber klein ist, stoppen Sie, was das Ergebnis nicht bewegt, und testen Sie die nächste kleine Änderung. Was letztes Jahr wirkte, wirkt vielleicht dieses Jahr nicht."),
        tt("A trend is a change that holds for several periods in a row; one good month is noise. Compare the same periods and look at the groups: a rise in one group and a fall in another may be one shift, not two trends.", "Ein Trend ist eine Veränderung, die mehrere Zeiträume in Folge hält; ein guter Monat ist Rauschen. Vergleichen Sie gleiche Zeiträume und schauen Sie auf die Gruppen: Ein Anstieg in einer Gruppe und ein Rückgang in einer anderen können eine Verschiebung sein, nicht zwei Trends."),
        tt("Real uncertainties in win-back data: a small base, customers called that the owners knew best (not a fair split), a reason for leaving written down for only half of the lost customers, and a competitor's new price list that changes why customers leave. “Every customer who answers will return”, “a return rate that is right today stays right for years” and “the more customers we approach, the better the economics” are mistakes, not uncertainties.", "Echte Unsicherheiten bei Win-back-Daten: eine kleine Basis, angerufene Kunden, die die Owner am besten kannten (keine faire Aufteilung), ein Abschiedsgrund, der nur für die Hälfte der verlorenen Kunden aufgeschrieben wurde, und eine neue Preisliste eines Wettbewerbers, die ändert, warum Kunden gehen. „Jeder Kunde, der antwortet, kehrt zurück“, „eine Rückkehrquote, die heute stimmt, stimmt auch in Jahren“ und „je mehr Kunden wir ansprechen, desto besser rechnet es sich“ sind Fehler, keine Unsicherheiten."),
      ]}
      sources={["kohavi2020", "hubbard2014", "thomas2004"]}
    >
      <ShowMore id="A6" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Kohavi, Tang and Xu (2020) collected what makes controlled experiments trustworthy: a random split, one change at a time, a size fixed in advance, guardrail metrics, and no peeking to stop early. Hubbard (2014) reminds us that most business measurement is about reducing uncertainty enough to decide, which is what reading a trend over several periods does. Thomas, Blattberg and Fox (2004) studied how companies recapture lost customers and how long they then stay, which is why a return is judged by who is still a customer after 90 days.",
            "Kohavi, Tang und Xu (2020) haben gesammelt, was kontrollierte Experimente vertrauenswürdig macht: eine zufällige Aufteilung, eine Änderung auf einmal, eine vorab festgelegte Größe, Guardrail-Kennzahlen und kein vorzeitiges Hinschauen, um früh zu stoppen. Hubbard (2014) erinnert daran, dass die meiste Messung im Unternehmen Unsicherheit so weit verringern soll, dass man entscheiden kann; genau das tut ein Trend über mehrere Zeiträume. Thomas, Blattberg und Fox (2004) untersuchten, wie Unternehmen verlorene Kunden zurückholen und wie lange sie dann bleiben, weshalb eine Rückkehr daran gemessen wird, wer nach 90 Tagen noch Kunde ist.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("A fair test of a call after the fix, and how sure it is · a worked example on Isar Hosting", "Ein fairer Test eines Anrufs nach der Behebung, und wie sicher er ist · ein Beispiel mit Isar Hosting")} caption={tt("Switch between the four ways of running the test, then move the slider to change how many returned customers each group has.", "Wechseln Sie zwischen den vier Arten, den Test durchzuführen, und bewegen Sie dann den Regler, um zu ändern, wie viele zurückgekehrte Kunden jede Gruppe hat.")}>
        <FairTest cfg={FAIR} />
      </Diagram>
      <ShowMore id="A6" part="table" label={tt("Show the table: reading a trend: Isar's figures by quarter (Case assumption)", "Tabelle zeigen: Einen Trend lesen: Zahlen von Isar nach Quartal (Fallannahme)")}>
        <DataTable
          head={[tt("Figure at Isar", "Zahl bei Isar"), "Q1", "Q2", "Q3", "Q4", tt("Reading", "Lesart")]}
          rows={[
            [tt("Approached lost customers who return", "Angesprochene verlorene Kunden, die zurückkehren"), pct(8), pct(7), pct(15), pct(17), tt("A trend: it rose after the call after the fix started in Q3 and held in Q4.", "Ein Trend: Es stieg, nachdem der Anruf nach der Behebung in Q3 startete, und hielt in Q4.")],
            [tt("Lost customers who ask for a quote on their own", "Verlorene Kunden, die von sich aus ein Angebot anfragen"), pct(4), pct(5), pct(5), pct(4), tt("Flat: small moves are noise, not a trend.", "Flach: Kleine Bewegungen sind Rauschen, kein Trend.")],
            [tt("Returned customers still active after 90 days", "Zurückgekehrte Kunden, die nach 90 Tagen noch aktiv sind"), pct(80), pct(70), pct(55), pct(40), tt("A shift: it fell after the discount e-mail started in Q2; customers who took the discount leave again.", "Eine Verschiebung: Er fiel, nachdem die Rabatt-E-Mail in Q2 startete; Kunden, die den Rabatt nahmen, gehen wieder.")],
          ]}
          caption={tt("Reading a trend: Isar's figures by quarter (Case assumption)", "Einen Trend lesen: Zahlen von Isar nach Quartal (Fallannahme)")}
        />
      </ShowMore>
      <ShowMore id="A6" part="table" label={tt("Show the table: the test card, part by part", "Tabelle zeigen: Die Testkarte, Teil für Teil")}>
        <DataTable
          head={[tt("Part of the test card", "Teil der Testkarte"), tt("Fair", "Fair"), tt("What goes wrong otherwise", "Was sonst schiefgeht")]}
          rows={[
            [tt("What changes", "Was sich ändert"), tt("One thing only", "Nur eine Sache"), tt("A win cannot be put down to anything", "Ein Gewinn lässt sich nichts zuschreiben")],
            [tt("Control group", "Kontrollgruppe"), tt("Random half, same weeks", "Zufällige Hälfte, dieselben Wochen"), tt("Another year, another region or self-chosen cases explain the difference", "Ein anderes Jahr, eine andere Region oder selbst gewählte Fälle erklären den Unterschied")],
            [tt("Success KPI", "Erfolgs-KPI"), tt("The result: share of approached customers who sign again and stay 90 days", "Das Ergebnis: Anteil der angesprochenen Kunden, die erneut unterschreiben und 90 Tage bleiben"), tt("E-mails are opened and calls made and nobody comes back", "E-Mails werden geöffnet und Anrufe geführt, und niemand kommt zurück")],
            [tt("Size and duration", "Größe und Dauer"), tt("Fixed: about 100 approached customers per group, until they have had time to decide", "Fest: etwa 100 angesprochene Kunden pro Gruppe, bis sie Zeit hatten, zu entscheiden"), tt("A lucky moment on the dashboard is taken for a result", "Ein glücklicher Moment im Dashboard wird für ein Ergebnis gehalten")],
          ]}
          caption={tt("The test card, part by part", "Die Testkarte, Teil für Teil")}
        />
      </ShowMore>
    </MaterialCard>
  );
}

export function CardA7() {
  return (
    <MaterialCard
      id="A7"
      scan={tt("Choose win-back measures by the plan's three tests, each Low (1) to High (3), multiplied: economic viability (who the measure aims at), effect (does it deal with a reason the customer really gave) and sustainability (does it keep working after the four months). Then check the budget, the weeks and which problems you answer.", "Wählen Sie Rückgewinnungsmaßnahmen nach den drei Tests des Plans, jeweils Niedrig (1) bis Hoch (3), multipliziert: Wirtschaftlichkeit (worauf die Maßnahme zielt), Wirkung (geht sie auf einen Grund ein, den der Kunde wirklich nannte) und Nachhaltigkeit (wirkt sie nach den vier Monaten weiter). Prüfen Sie dann das Budget, die Wochen und welche Probleme Sie beantworten.")}
      reasoning={[
        tt("The plan's evaluation is Economic Viability × Effect × Sustainability. Score each from 1 to 3 and multiply: one weak answer lowers the whole.", "Die Bewertung des Plans ist Wirtschaftlichkeit × Wirkung × Nachhaltigkeit. Bewerten Sie jede von 1 bis 3 und multiplizieren Sie: Eine schwache Antwort senkt das Ganze."),
        EXPLAIN_RULE.v,
        tt(`Effect. ${EFFECT_ANCHOR.v}`, `Wirkung. ${EFFECT_ANCHOR.v}`),
        tt(`Sustainability. ${SCALE_ANCHOR.v}`, `Nachhaltigkeit. ${SCALE_ANCHOR.v}`),
        tt("Think in money: a returned customer is worth about €9,000 a year; a measure costs time and money for every customer it reaches. A cheap message to everyone is still expensive if it fixes no reason, and a discount for everyone gives margin away to customers who would have come back.", "Denken Sie in Geld: Ein zurückgekehrter Kunde ist etwa 9.000 € im Jahr wert; eine Maßnahme kostet für jeden Kunden, den sie erreicht, Zeit und Geld. Eine billige Nachricht an alle ist trotzdem teuer, wenn sie keinen Grund behebt, und ein Rabatt für alle verschenkt Marge an Kunden, die ohnehin zurückgekommen wären."),
        tt("Apply the sorting question of Materi A1 to the measure: does it answer the reason the customer gave? A discount for everyone, or the same friendly e-mail for everyone, answers none, aims at everyone and buys a return without changing the reason: do not rank it above a measure that fixes a reason first.", "Wenden Sie die Sortierfrage aus Materi A1 auf die Maßnahme an: Beantwortet sie den Grund, den der Kunde nannte? Ein Rabatt für alle oder dieselbe freundliche E-Mail für alle beantwortet keinen, zielt auf alle und erkauft eine Rückkehr, ohne den Grund zu ändern: Setzen Sie sie nicht über eine Maßnahme, die zuerst einen Grund behebt."),
        tt("Match each measure to the problems it really answers: “win-back is inefficient” is answered by what aims the effort at the customers worth winning back; “high churn rate” by what gives a lost customer a reason to return; “measures are not measurable” by what lets the company read the result (a control group, a logged call). A mailing or a discount for all answers none of them well.", "Ordnen Sie jede Maßnahme den Problemen zu, die sie wirklich beantwortet: „Die Rückgewinnung ist ineffizient“ beantwortet, was den Aufwand auf die Kunden richtet, die sich zurückzugewinnen lohnen; „hohe Churn Rate“, was einem verlorenen Kunden einen Grund zur Rückkehr gibt; „Maßnahmen sind nicht messbar“, was das Unternehmen das Ergebnis ablesen lässt (eine Kontrollgruppe, ein festgehaltener Anruf). Ein Mailing oder ein Rabatt für alle beantwortet keines davon gut."),
        tt("The label after the weeks says which lever the measure uses: rebuild trust, lower the cost of coming back, add value or give a discount. It is a fact, not a score: a call can be strong (a named reason, a person the customer knew) or weak (the same call for every lost customer). Judge it by the three scores.", "Das Etikett hinter den Wochen sagt, welchen Hebel die Maßnahme nutzt: Vertrauen wiederaufbauen, die Rückkehr leichter machen, Nutzen stiften oder einen Rabatt geben. Es ist eine Tatsache, keine Note: Ein Anruf kann stark sein (ein benannter Grund, eine Person, die der Kunde kannte) oder schwach (derselbe Anruf für jeden verlorenen Kunden). Beurteilen Sie ihn an den drei Werten."),
        tt("A price is built from parts: set-up, a licence for the months, and days or hours of work × the day or hour rate. Add the parts to check a price, and ask which part recurs: people and discounts grow with volume, a list built once does not.", "Ein Preis besteht aus Teilen: Einrichtung, eine Lizenz für die Monate und Arbeitstage oder -stunden × Tages- oder Stundensatz. Addieren Sie die Teile, um einen Preis zu prüfen, und fragen Sie, welcher Teil wiederkehrt: Personal und Rabatte wachsen mit der Menge, eine einmal gebaute Liste nicht."),
        tt("Weeks decide whether a measure has time to work. Four months are 16 weeks: a measure in use after 8 weeks works for the other 8; one in use only after 24 weeks answers its problem too late, however good it sounds.", "Die Wochen entscheiden, ob eine Maßnahme Zeit hat zu wirken. Vier Monate sind 16 Wochen: Eine Maßnahme, die nach 8 Wochen in Betrieb ist, wirkt in den übrigen 8; eine, die erst nach 24 Wochen in Betrieb ist, beantwortet ihr Problem zu spät, so gut sie auch klingt."),
        tt("An offer nobody can explain lowers effect and sustainability: an account owner who sees an automatic offer and no reason has nothing to say to the customer, and the work cannot be kept going by a small team.", "Ein Angebot, das niemand erklären kann, senkt Wirkung und Nachhaltigkeit: Ein Account Owner, der ein automatisches Angebot und keinen Grund sieht, hat dem Kunden nichts zu sagen, und ein kleines Team kann die Arbeit nicht am Laufen halten."),
        tt("Give a reason for the two judged scores, in your own words and with a fact from the card: for effect, which reason the customer gave it answers and whether the customer notices it before deciding; for sustainability, what it takes (time, tools, people) and whether it lasts after the four months, and the weeks it needs.", "Geben Sie für die zwei beurteilten Werte einen Grund, in eigenen Worten und mit einer Tatsache von der Karte: bei der Wirkung, welchen Grund, den der Kunde nannte, sie beantwortet und ob der Kunde es vor der Entscheidung bemerkt; bei der Nachhaltigkeit, was es braucht (Zeit, Werkzeuge, Personal) und ob es nach den vier Monaten hält, und die Wochen, die es braucht."),
        tt("The budget is a limit to weigh, not a lock. If the plan is over, the rule is to leave out the lowest score rather than trim every measure a little; if you keep it anyway, say why.", "Das Budget ist eine Grenze zum Abwägen, keine Sperre. Liegt der Plan darüber, ist die Regel, den niedrigsten Wert wegzulassen, statt jede Maßnahme ein bisschen zu kürzen; behalten Sie ihn trotzdem, sagen Sie warum."),
        tt("Order by score and by dependency: what others read from goes first; a measure that needs the data of another comes after it. Name what you left out and why.", "Ordnen Sie nach Wert und nach Abhängigkeit: Woraus andere lesen, kommt zuerst; eine Maßnahme, die die Daten einer anderen braucht, kommt danach. Nennen Sie, was Sie weggelassen haben und warum."),
      ]}
      sources={["gupta2004", "davenport2018", "hubbard2014"]}
    >
      <ShowMore id="A7" part="research" label={tt("Show the research behind this card", "Die Forschung hinter dieser Karte zeigen")}>
        <p className={p}>
          {tt(
            "Gupta, Lehmann and Stuart (2004) value a customer by the money it brings over time, which is why a measure is judged by the customers it can win back and what they are worth. Davenport and Ronanki (2018) found that technology projects succeed when they start from a business problem and fit into existing processes, and fail when they are bought as stand-alone tools. Hubbard (2014) advises measuring what would change a decision. The plan names the evaluation for this day: economic viability × effect × sustainability.",
            "Gupta, Lehmann und Stuart (2004) bewerten einen Kunden nach dem Geld, das er über die Zeit bringt, weshalb eine Maßnahme an den Kunden gemessen wird, die sie zurückgewinnen kann, und was sie wert sind. Davenport und Ronanki (2018) fanden, dass Technologieprojekte gelingen, wenn sie von einem Geschäftsproblem ausgehen und in bestehende Prozesse passen, und scheitern, wenn sie als allein stehende Werkzeuge gekauft werden. Hubbard (2014) rät, zu messen, was eine Entscheidung ändern würde. Der Plan nennt die Bewertung für diesen Tag: Wirtschaftlichkeit × Wirkung × Nachhaltigkeit.",
          )}
        </p>
      </ShowMore>
      <Diagram label={tt("Three measures of Isar Hosting, scored", "Drei Maßnahmen von Isar Hosting, bewertet")} caption={tt("Choose a measure to read its three scores and why each one is what it is.", "Wählen Sie eine Maßnahme, um ihre drei Werte zu lesen und warum jeder so ist.")}>
        <ScoreBars cfg={SCORE} />
      </Diagram>
      <ShowMore id="A7" part="notes" label={tt("Show two short notes", "Zwei kurze Hinweise zeigen")}>
        <Bul
          items={[
            tt("Economic viability is read from who the measure is printed to aim at, never guessed.", "Die Wirtschaftlichkeit wird aus dem gelesen, worauf die Maßnahme laut Beschreibung zielt, nie geschätzt."),
            tt("A cheap, friendly measure that aims at everyone scores low: it spends effort where a return was never possible.", "Eine billige, freundliche Maßnahme, die auf alle zielt, punktet niedrig: Sie gibt Aufwand dort aus, wo eine Rückkehr nie möglich war."),
          ]}
        />
      </ShowMore>
      <ShowMore id="A7" part="extra" label={tt("Show: A discount is not an answer", "Zeigen: Ein Rabatt ist keine Antwort")}>
        <Callout label={tt("A discount is not an answer", "Ein Rabatt ist keine Antwort")} tone="signal">
          <p>{tt("A discount for every lost customer turns a win-back into a price cut: customers who would have returned anyway take it, customers who left over trust leave again, and the margin is given away every year. Fix the reason, show value or make coming back easy, and keep money off for the case where a comparison on price is the whole reason.", "Ein Rabatt für jeden verlorenen Kunden macht aus einer Rückgewinnung eine Preissenkung: Kunden, die ohnehin zurückgekommen wären, nehmen ihn, Kunden, die wegen Vertrauens gingen, gehen wieder, und die Marge wird jedes Jahr verschenkt. Beheben Sie den Grund, zeigen Sie Nutzen oder machen Sie die Rückkehr leicht, und heben Sie Preisnachlass für den Fall auf, dass ein Vergleich beim Preis der ganze Grund ist.")}</p>
        </Callout>
      </ShowMore>
    </MaterialCard>
  );
}

export const CARDS_A = [CardA1, CardA2, CardA3, CardA4, CardA5, CardA6, CardA7];
