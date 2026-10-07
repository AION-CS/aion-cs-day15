# Retention Lab · Day 15

**Customer Retention & Buying Behaviour in B2B IT Sales · Module 8, Day 2 of 2.**
*Strategically managing customer win-back and systematically optimising retention: why customers leave, what brings them back, which lost customers are worth the effort, and how to build a system that learns.*
A self-study companion: study material with live instruments, two tasks and two working documents, in **English and German**
(EN | DE in the top bar, `../CLAUDE.md` #32). It carries the shared standards `../CLAUDE.md` #1 to #47 and the two-route form of #30.
From Day 13 it follows **#48: one Core block and one Core card per level** (see the deviations).

The case company is **RecoverIT Services GmbH** (managed IT services for the Mittelstand): churn is high, win-back is inefficient (one discount e-mail goes to every lost customer) and the measures cannot be measured.
Budget €140,000 and four months (Route 1), €180,000 and four months (Route 2, Case assumption); a returned customer is worth about €9,000 a year (Case assumption).
Route 2 puts the learner in the Chief Customer Officer's chair: build a retention and win-back system and make an investment decision despite an unclear success rate.

This repo was bootstrapped from `day14` (chrome, primitives, store pattern, tokens, language machinery, the generic diagram components in
`components/materi/diagrams.tsx`) and its content replaced. Several data identifiers keep earlier names; each file's header says what they hold now:
`CUSTOMERS` holds the eight groups of lost customers (`leave` = share open to returning, `decision` = the reason is one RecoverIT can fix, `known` = how much of the record is on the list),
`PILOT` the call-after-the-fix test, `LINES` the nine exit statements, `LevelTag` the kind of reason (emotional, rational, outside our reach), `Basis` the three motives to return
(trust, switch, value), `PatternId` the four families of return signal, `MeasureArea` the lever (trust, switch, value, price); in `MEASURES` the fields `exp`, `eff`, `fea` hold
Economic Viability, Effect and Sustainability; the Route 2 item ids `chat` (lost-customer data clean-up), `personal` (reason-based approach), `routing` (value-based priority),
`tracking` (test-and-learn routine), `relaunch` (25% discount for every lost customer), `suite` (vendor win-back platform), `foundation` (scoreboard and list of lost customers).

## Routes

| Route | Content | Export |
|---|---|---|
| `/route-1/` **Levels 1 + 2** | **Materi A**: seven cards, 60 min (A1 why customers leave: emotional, rational or outside our reach **Core**, A2 what brings a customer back, A3 where a win-back pays and what data it can use, A4 what a personal approach is worth, A5 return signals in four families, A6 a fair test and continuous optimisation, A7 choosing win-back measures: economic viability × effect × sustainability **Core**). **Task 1, Win-Back Analysis**: 1.1 **Core** (sort nine reasons heard from customers who left into emotional, rational or outside our reach, and name one reason a customer could come back), 1.2 to 1.4 Optional, 2.1 to 2.3 Optional, 2.4 **Core** (choose three of six measures, score, reason, order). | `1-{name}-day15-l1l2-win-back-analysis-file.html` |
| `/route-2/` **Level 3** | **Materi B**: five cards, 60 min (B5 how a retention and win-back system is built, and how to invest under an unclear success rate **Core**). **Task 2, Win-Back System Memo**: the live panel, **Step A** (build the system, eight items Now / After data is ready / Not now) and **Step B** (decide despite an unclear success rate) are one Core frame; Optional “Go deeper” 3.1 to 3.4. | `2-{name}-day15-l3-win-back-system-memo.html` |

Minutes: Materi A 60 + Task 1 64 (Core 20), Materi B 60 + Task 2 53 (Core 19). All in `lib/routes.ts`.

## Stack

Next.js 14 · TypeScript · Tailwind (CS tokens) · Zustand + `persist` (key `cs-d15-v1`, version 1, `skipHydration`, deep merge, pure `migratePersisted`) · static export.

```bash
npm install
npm run dev
npm run typecheck
npm run verify:calc  # re-derives every figure, rule, panel bar/test/category, Core-only fill, in both languages
npm run build        # stop `npm run dev` first
```

## Mentor bar

First element on every page. `muchson123` fills every model answer of both routes (and the name if empty); answer keys and worked answers appear
after the same unlock. Convenience gate, not security; a reload locks it.

## Notes on deviations

1. **#48 (this day onward): one Core block and one Core card per level.** Route 1: Core blocks 1.1 and 2.4, Core cards A1 and A7. Route 2: Core card B5 and
   one Core frame (Step A + Step B counted as one unit in the ring). Everything else is folded, never removed, and Core never reads Optional (#40).
2. **Plan mapping (#44).** The plan's Level 1 items (psychological causes of churn, recognise the motivation to return, sort emotional against rational, develop three win-back approaches) →
   1.1 Core (sort the reasons and add one return reason of your own) and Optional 1.2–1.4 (return figures, three approaches, coaching reflection); the case study (analyse the causes, develop a
   win-back strategy, define KPIs, build an optimisation concept, prioritise measures with Economic Viability × Effect × Sustainability within €140,000 and four months, #45) → 2.4 Core with
   2.1–2.3 Optional (return signals, uncertainties, a fair test); the Level 3 transfer project (target vision, central KPIs, a win-back strategy, a continuous optimisation process,
   a prioritised decision architecture, and an investment decision under uncertainty) → Step A / Step B, with Optional 3.1 to 3.4. The plan asks for no calculation beyond the printed rates,
   the budget and the score formula; the three KPI definitions (churn rate, win-back rate, reactivation rate) are taught with a worked example in Materi B3 and printed in the case brief.
3. **Not rebuilt in this pass:** the Word documents (#31) and videos (#33).
4. **Every figure beyond the brief is a Case assumption** (the €9,000 a year, groups, open shares, rates, costs, weeks, data shares, KPI baselines).
5. **The worked-example companies** are Isar Hosting (Materi A) and Neckar Systemhaus (Materi B); the task never prints its own answer.
6. **The economic criterion of Block 2.4** is read from a printed fact (“aims at”), the same pattern Day 14 used for early detection: only the groups where a win-back pays scores 3, a mix scores 2, every lost customer scores 1.

## Dependency checklist (#40)

| Item | Status | Reads from | Core-safe |
|---|---|---|---|
| 1.1 Emotional, rational or outside our reach? | **Core** | brief, own items, card A1 | ✓ |
| 1.2, 1.3, 1.4, 2.1, 2.2, 2.3 | Optional | brief, own items, cards A2–A6 | self-contained |
| 2.4 Three measures, scored and ordered | **Core** | brief, own items, card A7 | ✓ |
| Panel, Step A, Step B (one Core frame) | **Core** | printed item facts, “the numbers today”, card B5; Step B quotes Step A | ✓ |
| 3.1 to 3.4 | Optional | own items, cards B1–B4 | self-contained |
| Cards A1, A7, B5 | Core | each other and the case | ✓ |
| Cards A2–A6, B1–B4 | Optional | — | no Core block cites them |

`verify:calc` scans the Core blocks and cards for names of Optional blocks and cards and fills only the Core blocks to check the missing lists empty.

## Verified

`tsc`, `verify:calc`, production build, static export served locally from a clean `localStorage`: mentor fill, Route 1 and Route 2 render, no console errors.
