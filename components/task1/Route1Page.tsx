"use client";

import { SectionRail } from "@/components/chrome/SectionRail";
import { PageNav } from "@/components/chrome/PageNav";
import { HashFlash } from "@/components/chrome/HashFlash";
import { SuggestedOrderBanner } from "@/components/ui/Banner";
import { MateriA } from "@/components/materi/Materi";
import { Task1 } from "@/components/task1/Task1";
import { ResetRoute } from "@/components/ui/ResetRoute";
import { tt } from "@/lib/lang";

export function Route1Page() {
  return (
    <div className="space-y-8 pt-4">
      <HashFlash />
      <header className="space-y-1">
        <p className="smallcaps text-accent">{tt("Route 1 · Levels 1 and 2 · Knowledge and application", "Route 1 · Level 1 und 2 · Wissen und Anwendung")}</p>
        <h1>{tt("Win-back: why customers leave, what brings them back, which lost customers are worth the effort, and which measures to choose", "Rückgewinnung: warum Kunden gehen, was sie zurückbringt, welche verlorenen Kunden den Aufwand wert sind, und welche Maßnahmen zu wählen sind")}</h1>
      </header>
      <SuggestedOrderBanner
        routeKey="r1"
        text={tt("Materi A (the two core cards are A1 and A7) → the Win-Back Analysis task, one case in two parts (Understand churn and win-back, Analyse and choose), with two core blocks. Every section stays open, so you can start anywhere.", "Materi A (die zwei Kernkarten sind A1 und A7) → die Aufgabe Win-Back Analysis, ein Fall in zwei Teilen (Churn und Rückgewinnung verstehen, Analysieren und auswählen), mit zwei Kernblöcken. Jeder Abschnitt bleibt offen, Sie können überall beginnen.")}
      />
      <SectionRail route={1} />
      <PageNav route={1} />
      <MateriA />
      <Task1 />
      <ResetRoute route={1} />
    </div>
  );
}
