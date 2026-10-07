"use client";

import Link from "next/link";
import { CORE1_MINUTES, CORE2_MINUTES, CORE_CARD_MINUTES, ROUTES } from "@/lib/routes";
import { tt } from "@/lib/lang";

/** The two route cards on the home page. Both are always open: a suggested order is only a suggestion. */
export function RouteCards() {
  return (
    <section aria-labelledby="routes-h" className="space-y-3">
      <h2 id="routes-h" className="sr-only">
        {tt("Routes", "Routen")}
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {ROUTES.map((r) => (
          <Link key={r.n} href={r.href} className="card group block space-y-3 p-5 transition-shadow hover:shadow-md">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <span className="smallcaps text-accent">Route {r.n}</span>
              <span className="text-micro font-semibold uppercase text-ash">{r.level}</span>
            </div>
            <h3 className="text-h2">{r.title}</h3>
            <p className="text-caption text-ash">{r.blurb}</p>
            <table className="w-full text-caption">
              <caption className="sr-only">{tt(`Time plan for Route ${r.n}`, `Zeitplan für Route ${r.n}`)}</caption>
              <tbody>
                {r.plan.map((p) => (
                  <tr key={p.label} className="border-t border-line">
                    <td className="py-1.5">{p.label}</td>
                    <td className="tnum py-1.5 text-right text-ash">
                      {p.minutes} {tt("min", "Min.")}
                    </td>
                  </tr>
                ))}
                <tr className="border-t border-line">
                  <td className="py-1.5 text-ink">{r.n === 1 ? tt("Core only: card A1 + card A7 + Blocks 1.1 and 2.4", "Nur der Kern: Karte A1 + Karte A7 + Blöcke 1.1 und 2.4") : tt("Core only: card B5 + the one frame (Step A and Step B)", "Nur der Kern: Karte B5 + der eine Rahmen (Schritt A und Schritt B)")}</td>
                  <td className="tnum py-1.5 text-right text-ash">
                    {r.n === 1 ? CORE_CARD_MINUTES[1] + CORE1_MINUTES : CORE_CARD_MINUTES[2] + CORE2_MINUTES} {tt("min", "Min.")}
                  </td>
                </tr>
                <tr className="border-t-2 border-ink font-semibold">
                  <td className="py-1.5">{tt("Total", "Gesamt")}</td>
                  <td className="tnum py-1.5 text-right">
                    {r.plan.reduce((s, p) => s + p.minutes, 0)} {tt("min", "Min.")}
                  </td>
                </tr>
              </tbody>
            </table>
            <span className="inline-block text-caption font-semibold text-accent group-hover:underline">{tt(`Open Route ${r.n} →`, `Route ${r.n} öffnen →`)}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
