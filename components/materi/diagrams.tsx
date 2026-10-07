"use client";

import clsx from "clsx";
import { useId, useState } from "react";
import { Insight, Story, ThePoint, Toggles, useStory } from "@/components/materi/kit";
import { tt } from "@/lib/lang";

/**
 * The interactive diagrams of the material, as data-driven components (CLAUDE.md #20, #36). Each takes one config object written in the day's
 * `data/diagramData.ts`: the code never changes from one day to the next, only the words, the numbers and the example company do. Every diagram
 * opens with "The point", carries a three-step "Walk me through it" story that drives the real controls (a manual control leaves the story), and
 * ends every control with an always-visible "What this shows" that starts "In plain words". A story spotlights part of the picture (a dashed amber
 * ring with `anim-pulse`) while it runs, and every hit area has an HTML button equivalent.
 */
const plain = () => tt("In plain words: ", "In einfachen Worten: ");
export const C = { ink: "#1F2328", ash: "#59606A", paper: "#FFFEFA", mist: "#ECE6D6", line: "#D8D1BF", amber: "#8A5A0B", gold: "#D99A2B", teal: "#0F6B6B", tealSoft: "#DFEEEB", rust: "#A4472A", rustSoft: "#F6E3DB", data: "#2F5D62", grey: "#8B9098", soft: "#FBF0D6" };
const SPOT = "outline outline-2 -outline-offset-2 outline-dashed outline-[#8A5A0B] anim-pulse";
const onKey = (f: () => void) => (e: React.KeyboardEvent) => {
  if (e.key === "Enter" || e.key === " ") f();
};

/* ------------------------------------------------------------------ scene cards: groups × states */

export type SceneCfg = {
  point: string;
  aria: string;
  groupLabel: string;
  groups: { id: string; label: string }[];
  stateLabel: string;
  states: { id: string; label: string }[];
  /** The state that is drawn with a solid frame; the others are dashed. */
  okState: string;
  shown: Record<string, Record<string, string>>;
  read: Record<string, string>;
  steps: { title: string; say: string; look: string; group: string; state: string }[];
  initial: { group: string; state: string };
  sort?: { title: string; items: { id: string; text: string; tag: string; why: string }[]; showLabel: string };
  footnote: string;
};

export function SceneCards({ cfg }: { cfg: SceneCfg }) {
  const [g, setGRaw] = useState(cfg.initial.group);
  const [s, setSRaw] = useState(cfg.initial.state);
  const [open, setOpen] = useState<string[]>([]);
  const story = useStory(
    cfg.steps.map((x) => ({
      title: x.title,
      say: x.say,
      look: x.look,
      apply: () => {
        setGRaw(x.group);
        setSRaw(x.state);
      },
    })),
  );
  const setG = (v: string) => {
    story.leave();
    setGRaw(v);
  };
  const setS = (v: string) => {
    story.leave();
    setSRaw(v);
  };
  const label = (list: { id: string; label: string }[], id: string) => list.find((x) => x.id === id)?.label ?? id;
  return (
    <div className="space-y-3">
      <ThePoint>{cfg.point}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <div className="grid gap-2 sm:grid-cols-3" role="img" aria-label={cfg.aria}>
        {cfg.groups.map((x) => (
          <div key={x.id} className={clsx("rounded-md border px-3 py-2 text-caption", x.id === g ? "border-accent bg-accentSoft" : "border-line bg-paper", s !== cfg.okState && x.id === g && "border-dashed", story.step !== null && x.id === g && SPOT)}>
            <p className="smallcaps">{x.label}</p>
            <p className="mt-1 text-ink">{cfg.shown[x.id][s]}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Toggles<string> label={cfg.groupLabel} value={g} onChange={setG} options={cfg.groups} />
        <Toggles<string> label={cfg.stateLabel} value={s} onChange={setS} options={cfg.states} />
      </div>
      <Insight>
        {plain()}
        {`${label(cfg.groups, g)} · ${label(cfg.states, s)}: ${cfg.read[s]}`}
      </Insight>
      {cfg.sort && (
        <div className="space-y-1.5">
          <p className="smallcaps">{cfg.sort.title}</p>
          <ul className="space-y-1.5">
            {cfg.sort.items.map((x) => {
              const on = open.includes(x.id);
              return (
                <li key={x.id} className="rounded-md border border-line bg-paper px-3 py-2 text-caption">
                  <p className="text-ink">{x.text}</p>
                  <button type="button" aria-expanded={on} onClick={() => setOpen((o) => (on ? o.filter((y) => y !== x.id) : [...o, x.id]))} className="btn-ghost btn-sm mt-1">
                    {on ? tt("Hide", "Verbergen") : cfg.sort!.showLabel}
                  </button>
                  {on && (
                    <p className="mt-1 text-ink">
                      <strong>{x.tag}.</strong> {x.why}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <p className="text-caption text-ash">{cfg.footnote}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ bars: rows × states (for example before and after a prize stops) */

export type BarsCfg = {
  point: string;
  aria: string;
  states: { id: string; label: string }[];
  initial: { state: string; row: string };
  max: number;
  /** Printed after a value, for example "%" or " of 100". */
  unit: string;
  rows: { id: string; label: string; values: Record<string, number>; good: Record<string, boolean> }[];
  stateToggleLabel: string;
  rowToggleLabel: string;
  steps: { title: string; say: string; look: string; state: string; row: string }[];
  read: (row: string, state: string, value: number) => string;
  footnote: string;
};

export function BarToggle({ cfg }: { cfg: BarsCfg }) {
  const uid = useId().replace(/:/g, "");
  const [st, setStRaw] = useState(cfg.initial.state);
  const [row, setRowRaw] = useState(cfg.initial.row);
  const story = useStory(
    cfg.steps.map((x) => ({
      title: x.title,
      say: x.say,
      look: x.look,
      apply: () => {
        setStRaw(x.state);
        setRowRaw(x.row);
      },
    })),
  );
  const setSt = (v: string) => {
    story.leave();
    setStRaw(v);
  };
  const setRow = (v: string) => {
    story.leave();
    setRowRaw(v);
  };
  const cur = cfg.rows.find((r) => r.id === row)!;
  const H = 18 + cfg.rows.length * 44;
  const W = (v: number) => (Math.max(0, v) / cfg.max) * 280;
  return (
    <div className="space-y-3">
      <ThePoint>{cfg.point}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox={`0 0 560 ${H}`} className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{cfg.aria}</title>
        <desc id={`${uid}-d`}>{cfg.rows.map((r) => `${r.label}: ${r.values[st]}${cfg.unit}`).join("; ")}</desc>
        {cfg.rows.map((r, i) => {
          const y = 10 + i * 44;
          const v = r.values[st];
          const on = r.id === row;
          return (
            <g key={r.id} className="hit" role="button" tabIndex={0} aria-label={r.label} onClick={() => setRow(r.id)} onKeyDown={onKey(() => setRow(r.id))}>
              {on && story.step !== null && <rect x="-4" y={y - 4} width="566" height="38" rx="7" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
              <foreignObject x="0" y={y - 2} width="236" height="34">
                <div style={{ fontSize: 11.5, lineHeight: 1.15, color: C.ink, fontWeight: on ? 700 : 400, fontFamily: "system-ui,sans-serif" }}>{r.label}</div>
              </foreignObject>
              <rect className="hit-shape" x="244" y={y} width={Math.max(2, W(v))} height="26" fill={r.good[st] ? (on ? C.gold : C.data) : C.grey} stroke={C.ink} strokeWidth={on ? 2 : 1} />
              <text x={250 + W(v)} y={y + 18} fontSize="12.5" fontWeight="700" fill={C.ink}>{`${v}${cfg.unit}`}</text>
            </g>
          );
        })}
      </svg>
      <div className="flex flex-wrap items-center gap-3">
        <Toggles<string> label={cfg.stateToggleLabel} value={st} onChange={setSt} options={cfg.states} />
        <Toggles<string> label={cfg.rowToggleLabel} value={row} onChange={setRow} options={cfg.rows.map((r) => ({ id: r.id, label: r.label }))} />
      </div>
      <Insight>
        {plain()}
        {cfg.read(cur.id, st, cur.values[st])}
      </Insight>
      <p className="text-caption text-ash">{cfg.footnote}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ a map: items placed by a percentage and a row */

export type MapZone = { x1: number; x2: number; r1: number; r2: number; kind: "teal" | "hatch" | "soft" | "mist"; label: string; lx: number; lr: number; color: "teal" | "amber" | "ash" };
export type MapItem = { id: string; name: string; x: number; row: number; square: boolean; glyph: string; verdict: string; why: string; fact: string };
export type MapCfg = {
  point: string;
  aria: string;
  xTicks: number[];
  xUnit: string;
  xAxisLabel: string;
  rows: string[];
  zones: MapZone[];
  items: MapItem[];
  steps: { title: string; say: string; look: string; item: string }[];
  initial: string;
  toggleLabel: string;
  legend: string;
  /** Tick marks on the x axis are drawn at these values; the plot spans from the first to the last. */
};

export function ScatterMap({ cfg }: { cfg: MapCfg }) {
  const uid = useId().replace(/:/g, "");
  const [sel, setSelRaw] = useState(cfg.initial);
  const story = useStory(
    cfg.steps.map((x) => ({
      title: x.title,
      say: x.say,
      look: x.look,
      apply: () => setSelRaw(x.item),
    })),
  );
  const setSel = (v: string) => {
    story.leave();
    setSelRaw(v);
  };
  const s = cfg.items.find((x) => x.id === sel)!;
  const x0 = cfg.xTicks[0];
  const x1 = cfg.xTicks[cfg.xTicks.length - 1];
  const X = (v: number) => 70 + ((v - x0) / (x1 - x0)) * 440;
  const n = cfg.rows.length;
  const rowH = 190 / n;
  const Yt = (r: number) => 36 + r * rowH;
  const fills = { teal: C.tealSoft, hatch: `url(#${uid}-hatch)`, soft: C.soft, mist: C.mist } as const;
  const colors = { teal: C.teal, amber: C.amber, ash: C.ash } as const;
  const perRow: Record<number, number> = {};
  const pos = cfg.items.map((it) => {
    const k = perRow[it.row] ?? 0;
    perRow[it.row] = k + 1;
    return { it, cx: X(it.x), cy: Yt(it.row) + rowH / 2 + (k % 2 === 0 ? -9 : 11) };
  });
  return (
    <div className="space-y-3">
      <ThePoint>{cfg.point}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox="0 0 560 270" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{cfg.aria}</title>
        <desc id={`${uid}-d`}>{`${s.name}: ${s.verdict}.`}</desc>
        <defs>
          <pattern id={`${uid}-hatch`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke={C.gold} strokeWidth="2" opacity="0.5" />
          </pattern>
        </defs>
        {cfg.zones.map((z, i) => (
          <g key={i}>
            <rect x={X(z.x1)} y={Yt(z.r1)} width={X(z.x2) - X(z.x1)} height={Yt(z.r2 + 1) - Yt(z.r1)} fill={fills[z.kind]} stroke={z.kind === "hatch" ? C.amber : C.line} opacity={z.kind === "teal" ? 0.8 : 1} />
            <text x={X(z.lx)} y={Yt(z.lr) + 13} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={colors[z.color]}>{z.label}</text>
          </g>
        ))}
        {cfg.rows.map((r, i) => (
          <text key={i} x="64" y={Yt(i) + rowH / 2 + 4} textAnchor="end" fontSize="10.5" fill={C.ash}>{r}</text>
        ))}
        {cfg.xTicks.map((v) => (
          <text key={v} x={X(v)} y="262" textAnchor="middle" fontSize="11" fill={C.ash}>{`${v}${cfg.xUnit}`}</text>
        ))}
        <text x="70" y="22" fontSize="10.5" fill={C.ash}>{cfg.xAxisLabel}</text>
        {pos.map(({ it, cx, cy }, i) => {
          const on = it.id === sel;
          return (
            <g key={it.id} className="hit" role="button" tabIndex={0} aria-label={it.name} onClick={() => setSel(it.id)} onKeyDown={onKey(() => setSel(it.id))}>
              {on && story.step !== null && <circle cx={cx} cy={cy} r="21" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
              {it.square ? <rect className="hit-shape" x={cx - (on ? 14 : 11)} y={cy - (on ? 14 : 11)} width={on ? 28 : 22} height={on ? 28 : 22} rx="3" fill={on ? C.gold : C.data} stroke={C.ink} strokeWidth="1.4" /> : <circle className="hit-shape" cx={cx} cy={cy} r={on ? 14 : 11} fill={on ? C.gold : C.data} stroke={C.ink} strokeWidth="1.4" />}
              <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={on ? C.ink : C.paper}>{i + 1}</text>
            </g>
          );
        })}
      </svg>
      <div role="group" aria-label={cfg.toggleLabel} className="flex flex-wrap gap-2">
        {cfg.items.map((x, i) => (
          <button key={x.id} type="button" aria-pressed={x.id === sel} onClick={() => setSel(x.id)} className={`btn btn-sm min-h-[40px] border ${x.id === sel ? "border-accent bg-accentSoft text-ink" : "border-line bg-paper text-ash hover:border-ash"}`}>
            {`${i + 1} · ${x.name}`}
          </button>
        ))}
      </div>
      <Insight>
        {plain()}
        {`${s.name} · ${s.fact} · ${s.glyph} ${s.verdict}. ${s.why}`}
      </Insight>
      <p className="text-caption text-ash">{cfg.legend}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ two groups, two rates, a lift and what it is worth a year */

export type RatesCfg = {
  point: string;
  aria: string;
  data: { control: { sent: number; orders: number }; variant: { sent: number; orders: number }; yearly: number; order: number; min: number; max: number; step: number };
  rateScale: number;
  labels: { variant: string; control: string; ofWord: string; slider: (n: number) => string; lift: (rate: number, other: number, lift: number) => string };
  steps: { title: string; say: (r: { rate: number; other: number; lift: number; extraAt: (yearly: number) => number }) => string; look: string; yearlyMult: number }[];
  insight: (v: { yearly: number; rate: number; other: number; extra: number; order: number; base: number }) => string;
  footnote: string;
};

const r2 = (x: number) => Math.round(x * 100) / 100;

export function TwoRates({ cfg }: { cfg: RatesCfg }) {
  const uid = useId().replace(/:/g, "");
  const d = cfg.data;
  const rate = r2((d.variant.orders / d.variant.sent) * 100);
  const other = r2((d.control.orders / d.control.sent) * 100);
  const lift = r2(rate / other);
  const extraAt = (y: number) => r2(y * ((rate - other) / 100) * d.order);
  const [yearly, setYearlyRaw] = useState(d.yearly);
  const story = useStory(
    cfg.steps.map((x) => ({
      title: x.title,
      say: x.say({ rate, other, lift, extraAt }),
      look: x.look,
      apply: () => setYearlyRaw(d.yearly * x.yearlyMult),
    })),
  );
  const setYearly = (v: number) => {
    story.leave();
    setYearlyRaw(v);
  };
  const Wd = (p: number) => (p / cfg.rateScale) * 300;
  const fmt = (v: number) => v.toLocaleString(tt("en-US", "de-DE"), { maximumFractionDigits: 2 });
  return (
    <div className="space-y-3">
      <ThePoint>{cfg.point}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox="0 0 560 150" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{cfg.aria}</title>
        <desc id={`${uid}-d`}>{`${cfg.labels.variant} ${fmt(rate)}%, ${cfg.labels.control} ${fmt(other)}%, ${fmt(lift)}.`}</desc>
        {story.step !== null && <rect x="164" y="14" width="396" height="88" rx="8" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
        <text x="0" y="36" fontSize="12" fill={C.ink}>{cfg.labels.variant}</text>
        <rect x="170" y="20" width={Wd(rate)} height="26" fill={C.data} stroke={C.ink} />
        <text x={176 + Wd(rate)} y="38" fontSize="12.5" fontWeight="700" fill={C.ink}>{`${fmt(rate)}% (${d.variant.orders} ${cfg.labels.ofWord} ${d.variant.sent.toLocaleString(tt("en-US", "de-DE"))})`}</text>
        <text x="0" y="86" fontSize="12" fill={C.ink}>{cfg.labels.control}</text>
        <rect x="170" y="70" width={Wd(other)} height="26" fill={C.grey} stroke={C.ink} />
        <text x={176 + Wd(other)} y="88" fontSize="12.5" fontWeight="700" fill={C.ink}>{`${fmt(other)}% (${d.control.orders} ${cfg.labels.ofWord} ${d.control.sent.toLocaleString(tt("en-US", "de-DE"))})`}</text>
        <text x="170" y="128" fontSize="13" fontWeight="700" fill={C.amber}>{cfg.labels.lift(rate, other, lift)}</text>
      </svg>
      <div className="space-y-1.5">
        <label htmlFor={`${uid}-y`} className="smallcaps block">
          {cfg.labels.slider(yearly)}
        </label>
        <input id={`${uid}-y`} type="range" min={d.min} max={d.max} step={d.step} value={yearly} onChange={(e) => setYearly(Number(e.target.value))} className="w-full max-w-md accent-[#8A5A0B]" />
      </div>
      <Insight>
        {plain()}
        {cfg.insight({ yearly, rate, other, extra: extraAt(yearly), order: d.order, base: d.yearly })}
      </Insight>
      <p className="text-caption text-ash">{cfg.footnote}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ four families of indicator, each with its metrics */

export type TreeMetric = { id: string; name: string; kind: string; moved: boolean; why: string };
export type TreeCfg = {
  point: string;
  aria: string;
  metrics: TreeMetric[];
  /** The four families, drawn as a 2 × 2 board in this order. */
  kinds: { id: string; label: string }[];
  kindLabel: Record<string, string>;
  initial: string;
  steps: { title: string; say: string; look: string; sel: string }[];
  labels: { moved: string; notMoved: string; toggleMetric: string; toggleYear: string; yearOn: string; yearOff: string };
  insightPast: (m: TreeMetric) => string;
  insightNow: (m: TreeMetric) => string;
};

export function KpiTree({ cfg }: { cfg: TreeCfg }) {
  const uid = useId().replace(/:/g, "");
  const [sel, setSelRaw] = useState(cfg.initial);
  const [past, setPastRaw] = useState(false);
  const story = useStory(
    cfg.steps.map((x) => ({
      title: x.title,
      say: x.say,
      look: x.look,
      apply: () => {
        setSelRaw(x.sel);
        setPastRaw(true);
      },
    })),
  );
  const setSel = (v: string) => {
    story.leave();
    setSelRaw(v);
  };
  const setPast = (v: boolean) => {
    story.leave();
    setPastRaw(v);
  };
  const m = cfg.metrics.find((x) => x.id === sel)!;
  const boxes = cfg.metrics.map((x) => {
    const ki = Math.max(0, cfg.kinds.findIndex((k) => k.id === x.kind));
    const same = cfg.metrics.filter((y) => y.kind === x.kind);
    const k = same.indexOf(x);
    const fx = 8 + (ki % 2) * 280;
    const fy = 8 + Math.floor(ki / 2) * 160;
    const w = 122;
    const start = same.length > 1 ? 10 : (270 - w) / 2;
    return { x, bx: fx + start + k * 130, by: fy + 34, w };
  });
  return (
    <div className="space-y-3">
      <ThePoint>{cfg.point}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox="0 0 560 330" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{cfg.aria}</title>
        <desc id={`${uid}-d`}>{`${m.name}: ${cfg.kindLabel[m.kind]}.`}</desc>
        {cfg.kinds.map((k, i) => {
          const fx = 8 + (i % 2) * 280;
          const fy = 8 + Math.floor(i / 2) * 160;
          return (
            <g key={k.id}>
              <rect x={fx} y={fy} width="270" height="150" rx="8" fill={C.mist} fillOpacity="0.55" stroke={C.line} strokeDasharray={i === 3 ? "4 4" : undefined} />
              <text x={fx + 10} y={fy + 20} fontSize="11" fontWeight="700" fill={C.ash} style={{ textTransform: "uppercase", letterSpacing: 0.6 }}>{k.label}</text>
            </g>
          );
        })}
        {boxes.map(({ x, bx, by, w }) => {
          const on = x.id === sel;
          return (
            <g key={x.id} className="hit" role="button" tabIndex={0} aria-label={x.name} onClick={() => setSel(x.id)} onKeyDown={onKey(() => setSel(x.id))}>
              {on && story.step !== null && <rect x={bx - 5} y={by - 5} width={w + 10} height="82" rx="9" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
              <rect className="hit-shape" x={bx} y={by} width={w} height="72" rx="6" fill={on ? C.soft : C.paper} stroke={on ? C.amber : C.ink} strokeWidth={on ? 2.4 : 1.2} />
              <foreignObject x={bx + 4} y={by + 4} width={w - 8} height="46">
                <div style={{ fontSize: 11, lineHeight: 1.2, color: C.ink, textAlign: "center", fontFamily: "system-ui,sans-serif" }}>{x.name}</div>
              </foreignObject>
              {past && (
                <text x={bx + w / 2} y={by + 64} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={x.moved ? C.teal : C.ash}>{x.moved ? cfg.labels.moved : cfg.labels.notMoved}</text>
              )}
            </g>
          );
        })}
      </svg>
      <div className="flex flex-wrap items-center gap-3">
        <Toggles<string> label={cfg.labels.toggleMetric} value={sel} onChange={setSel} options={cfg.metrics.map((x) => ({ id: x.id, label: x.name }))} />
        <Toggles<string> label={cfg.labels.toggleYear} value={past ? "on" : null} onChange={() => setPast(!past)} options={[{ id: "on", label: past ? cfg.labels.yearOff : cfg.labels.yearOn }]} />
      </div>
      <Insight>
        {plain()}
        {past ? cfg.insightPast(m) : cfg.insightNow(m)}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ a fair test, and how sure a small test is */

export type FlawCfg = { id: string; label: string; a: string; b: string; reading: string };
export type FairCfg = {
  point: string;
  aria: string;
  flaws: FlawCfg[];
  ratio: number;
  groupA: string;
  groupB: string;
  runLabel: string;
  steps: { title: string; say: (lo: number) => string; look: string; flaw: string; conv: number; spot: "b" | "range" | null }[];
  rangeAria: string;
  slider: (conv: number) => string;
  measured: (lo: number, hi: number) => string;
  noDiff: string;
  proven: (conv: number, lo: number, hi: number) => string;
  open: (conv: number, lo: number, hi: number) => string;
  footnote: string;
};

const ciOf = (ctl: number, ratio: number) => {
  const se = Math.sqrt(1 / (ctl * ratio) + 1 / ctl);
  return { lo: r2(Math.exp(Math.log(ratio) - 1.96 * se)), hi: r2(Math.exp(Math.log(ratio) + 1.96 * se)) };
};

export function FairTest({ cfg }: { cfg: FairCfg }) {
  const uid = useId().replace(/:/g, "");
  const [flaw, setFlawRaw] = useState(cfg.flaws[0].id);
  const [conv, setConvRaw] = useState(30);
  const story = useStory(
    cfg.steps.map((x) => ({
      title: x.title,
      say: x.say(ciOf(30, cfg.ratio).lo),
      look: x.look,
      apply: () => {
        setFlawRaw(x.flaw);
        setConvRaw(x.conv);
      },
    })),
  );
  const setFlaw = (v: string) => {
    story.leave();
    setFlawRaw(v);
  };
  const setConv = (v: number) => {
    story.leave();
    setConvRaw(v);
  };
  const f = cfg.flaws.find((x) => x.id === flaw)!;
  const { lo, hi } = ciOf(conv, cfg.ratio);
  const X = (r: number) => 40 + ((r - 0.5) / 2.5) * 480;
  const zero = X(1);
  const proven = lo > 1;
  const spot = story.step !== null ? cfg.steps[story.step].spot : null;
  const fmt = (v: number) => v.toLocaleString(tt("en-US", "de-DE"), { maximumFractionDigits: 2 });
  return (
    <div className="space-y-4">
      <ThePoint>{cfg.point}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <div className="space-y-2">
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-md border border-line bg-paper px-3 py-2 text-caption">
            <p className="smallcaps">{cfg.groupA}</p>
            <p className="text-ink">{f.a}</p>
          </div>
          <div className={clsx("rounded-md border px-3 py-2 text-caption", f.id === cfg.flaws[0].id ? "border-line bg-paper" : "border-dashed border-accent bg-accentSoft", spot === "b" && SPOT)}>
            <p className="smallcaps">{cfg.groupB}</p>
            <p className="text-ink">{f.b}</p>
          </div>
        </div>
        <Toggles<string> label={cfg.runLabel} value={flaw} onChange={setFlaw} options={cfg.flaws.map((k) => ({ id: k.id, label: k.label }))} />
        <Insight>
          {plain()}
          {f.reading}
        </Insight>
      </div>
      <div className="space-y-2">
        <svg viewBox="0 0 560 120" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
          <title id={`${uid}-t`}>{cfg.rangeAria}</title>
          <desc id={`${uid}-d`}>{`${conv}: ${fmt(lo)} – ${fmt(hi)}.`}</desc>
          <line x1="40" y1="60" x2="520" y2="60" stroke={C.ash} />
          {[0.5, 1, 1.5, 2, 2.5, 3].map((v) => (
            <g key={v}>
              <line x1={X(v)} y1="55" x2={X(v)} y2="65" stroke={C.ash} />
              <text x={X(v)} y="84" textAnchor="middle" fontSize="11" fill={C.ash}>{`${fmt(v)}×`}</text>
            </g>
          ))}
          <line x1={zero} y1="20" x2={zero} y2="70" stroke={C.rust} strokeDasharray="4 3" />
          <text x={zero + 4} y="22" fontSize="10.5" fill={C.rust}>{cfg.noDiff}</text>
          <defs>
            <pattern id={`${uid}-h`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="8" stroke={C.gold} strokeWidth="2" />
            </pattern>
          </defs>
          {spot === "range" && <rect x={X(Math.max(lo, 0.5)) - 4} y="42" width={Math.max(2, X(Math.min(hi, 3)) - X(Math.max(lo, 0.5))) + 8} height="36" rx="5" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
          <rect x={X(Math.max(lo, 0.5))} y="48" width={Math.max(2, X(Math.min(hi, 3)) - X(Math.max(lo, 0.5)))} height="24" fill={proven ? C.tealSoft : `url(#${uid}-h)`} stroke={proven ? C.teal : C.amber} />
          <circle cx={X(cfg.ratio)} cy="60" r="6" fill={C.data} stroke={C.ink} />
          <text x="40" y="110" fontSize="11.5" fill={C.ink}>{cfg.measured(lo, hi)}</text>
        </svg>
        <label htmlFor={`${uid}-c`} className="smallcaps block">
          {cfg.slider(conv)}
        </label>
        <input id={`${uid}-c`} type="range" min={10} max={300} step={10} value={conv} onChange={(e) => setConv(Number(e.target.value))} className="w-full max-w-md accent-[#8A5A0B]" />
        <Insight>
          {plain()}
          {proven ? cfg.proven(conv, lo, hi) : cfg.open(conv, lo, hi)}
        </Insight>
      </div>
      <p className="text-caption text-ash">{cfg.footnote}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ a score: three factors multiplied, one bar per measure */

export type ScoreMeasure = { id: string; name: string; cost: number; joins: string; i: 1 | 2 | 3; eff: 1 | 2 | 3; fea: 1 | 2 | 3; note: string };
export type ScoreCfg = {
  point: string;
  aria: string;
  measures: ScoreMeasure[];
  initial: string;
  toggleLabel: string;
  steps: { title: string; say: (s: Record<string, number>) => string; look: string; sel: string }[];
  insight: (m: ScoreMeasure, score: number) => string;
};

export function ScoreBars({ cfg }: { cfg: ScoreCfg }) {
  const uid = useId().replace(/:/g, "");
  const [sel, setSelRaw] = useState(cfg.initial);
  const score = (m: ScoreMeasure) => m.i * m.eff * m.fea;
  const scores = Object.fromEntries(cfg.measures.map((m) => [m.id, score(m)]));
  const story = useStory(cfg.steps.map((x) => ({ title: x.title, say: x.say(scores), look: x.look, apply: () => setSelRaw(x.sel) })));
  const setSel = (v: string) => {
    story.leave();
    setSelRaw(v);
  };
  const m = cfg.measures.find((x) => x.id === sel)!;
  return (
    <div className="space-y-3">
      <ThePoint>{cfg.point}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox={`0 0 560 ${14 + cfg.measures.length * 38}`} className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{cfg.aria}</title>
        <desc id={`${uid}-d`}>{cfg.measures.map((x) => `${x.name}: ${score(x)}`).join("; ")}</desc>
        {cfg.measures.map((x, i) => {
          const s = score(x);
          const y = 12 + i * 38;
          const on = x.id === sel;
          return (
            <g key={x.id} className="hit" role="button" tabIndex={0} aria-label={x.name} onClick={() => setSel(x.id)} onKeyDown={onKey(() => setSel(x.id))}>
              {on && story.step !== null && <rect x="-4" y={y - 4} width="556" height="32" rx="7" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
              <foreignObject x="0" y={y} width="290" height="28">
                <div style={{ fontSize: 12, lineHeight: 1.15, color: C.ink, fontWeight: on ? 700 : 400, fontFamily: "system-ui,sans-serif" }}>{x.name}</div>
              </foreignObject>
              <rect className="hit-shape" x="300" y={y} width={(s / 27) * 220} height="24" fill={on ? C.gold : C.data} stroke={C.ink} />
              <text x={306 + (s / 27) * 220} y={y + 17} fontSize="12.5" fontWeight="700" fill={C.ink}>{s}</text>
            </g>
          );
        })}
      </svg>
      <Toggles<string> label={cfg.toggleLabel} value={sel} onChange={setSel} options={cfg.measures.map((x) => ({ id: x.id, label: x.name }))} />
      <Insight>
        {plain()}
        {cfg.insight(m, score(m))}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ four stages (bars that grow) */

export type StagesCfg = {
  point: string;
  aria: string;
  caption: string;
  company: string;
  stages: { id: string; name: string; spree: string; reading: string }[];
  initial: string;
  steps: { title: string; say: string; look: string; stage: string }[];
  toggleLabel: string;
};

export function StageBars({ cfg }: { cfg: StagesCfg }) {
  const uid = useId().replace(/:/g, "");
  const [st, setStRaw] = useState(cfg.initial);
  const story = useStory(cfg.steps.map((x) => ({ title: x.title, say: x.say, look: x.look, apply: () => setStRaw(x.stage) })));
  const setSt = (v: string) => {
    story.leave();
    setStRaw(v);
  };
  const idx = cfg.stages.findIndex((x) => x.id === st);
  const s = cfg.stages[idx];
  return (
    <div className="space-y-3">
      <ThePoint>{cfg.point}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox="0 0 560 170" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{cfg.aria}</title>
        <desc id={`${uid}-d`}>{s.name}</desc>
        {cfg.stages.map((k, i) => {
          const x = 10 + i * 137;
          const h = 40 + i * 25;
          const on = i <= idx;
          return (
            <g key={k.id} className="hit" role="button" tabIndex={0} aria-label={k.name} onClick={() => setSt(k.id)} onKeyDown={onKey(() => setSt(k.id))}>
              {k.id === st && story.step !== null && <rect x={x - 4} y={150 - h - 4} width="136" height={h + 8} rx="6" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
              <rect className="hit-shape" x={x} y={150 - h} width="128" height={h} fill={k.id === st ? C.gold : on ? C.data : C.paper} stroke={C.ink} strokeWidth="1.4" />
              <text x={x + 64} y={166} textAnchor="middle" fontSize="11" fill={C.ash}>{`${i + 1}`}</text>
            </g>
          );
        })}
        <text x="10" y="18" fontSize="11.5" fill={C.ash}>{cfg.caption}</text>
      </svg>
      <Toggles<string> label={cfg.toggleLabel} value={st} onChange={setSt} options={cfg.stages.map((k, i) => ({ id: k.id, label: `${i + 1} · ${k.name}` }))} />
      <p className="rounded-md border border-line bg-paper px-3 py-2 text-caption text-ink">
        <span className="smallcaps mr-1.5">{cfg.company}</span>
        {s.spree}
      </p>
      <Insight>
        {plain()}
        {s.reading}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ four tests for one KPI candidate */

export type CompCfg = {
  point: string;
  aria: string;
  crits: { id: string; name: string }[];
  comps: { id: string; name: string; facts: string; r: Record<string, number>; note: string }[];
  levels: string[];
  initial: string;
  toggleLabel: string;
  factsLabel: string;
  steps: { title: string; say: string; look: string; sel: string; spot: string | null }[];
  insight: (c: { name: string; note: string }, total: number) => string;
};

export function CompProfile({ cfg }: { cfg: CompCfg }) {
  const uid = useId().replace(/:/g, "");
  const [sel, setSelRaw] = useState(cfg.initial);
  const story = useStory(cfg.steps.map((x) => ({ title: x.title, say: x.say, look: x.look, apply: () => setSelRaw(x.sel) })));
  const setSel = (v: string) => {
    story.leave();
    setSelRaw(v);
  };
  const c = cfg.comps.find((x) => x.id === sel)!;
  const total = cfg.crits.reduce((s, k) => s + c.r[k.id], 0);
  const spot = story.step !== null ? cfg.steps[story.step].spot : null;
  return (
    <div className="space-y-3">
      <ThePoint>{cfg.point}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox="0 0 560 170" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{cfg.aria}</title>
        <desc id={`${uid}-d`}>{cfg.crits.map((k) => `${k.name} ${c.r[k.id]}`).join(", ")}</desc>
        {cfg.crits.map((k, i) => {
          const y = 14 + i * 38;
          const v = c.r[k.id];
          return (
            <g key={k.id}>
              {spot === k.id && <rect x="-4" y={y - 3} width="556" height="32" rx="6" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
              <text x="0" y={y + 18} fontSize="12" fill={C.ink}>{k.name}</text>
              {[1, 2, 3].map((b) => (
                <rect key={b} x={160 + (b - 1) * 110} y={y} width="104" height="26" fill={b <= v ? (v === 1 ? C.grey : C.data) : C.paper} stroke={C.ink} strokeDasharray={b <= v ? undefined : "4 3"} />
              ))}
              <text x="500" y={y + 18} fontSize="12.5" fontWeight="700" fill={C.ink}>{cfg.levels[v - 1]}</text>
            </g>
          );
        })}
      </svg>
      <Toggles<string> label={cfg.toggleLabel} value={sel} onChange={setSel} options={cfg.comps.map((x) => ({ id: x.id, label: x.name }))} />
      <p className="text-caption text-ash">
        <span className="font-semibold text-ink">{cfg.factsLabel}</span>
        {c.facts}
      </p>
      <Insight>
        {plain()}
        {cfg.insight(c, total)}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ roll out, keep testing or stop: uplift against conversions */

export type LiftCfg = {
  point: string;
  aria: string;
  actAt: number;
  watchAt: number;
  casesMin: number;
  steps: { title: string; say: string; look: string; lift: number; cases: number }[];
  labels: { roll: string; keep: string; stop: string; x: string; y: string; lift: (lift: number) => string; cases: (cases: number) => string };
  read: { act: (lift: number, cases: number) => string; watchHigh: (lift: number, cases: number) => string; watchLow: (lift: number) => string; none: (lift: number) => string };
  initial: { lift: number; cases: number };
};

export function LiftCases({ cfg }: { cfg: LiftCfg }) {
  const uid = useId().replace(/:/g, "");
  const [lift, setLiftRaw] = useState(cfg.initial.lift);
  const [cases, setCasesRaw] = useState(cfg.initial.cases);
  const story = useStory(
    cfg.steps.map((x) => ({
      title: x.title,
      say: x.say,
      look: x.look,
      apply: () => {
        setLiftRaw(x.lift);
        setCasesRaw(x.cases);
      },
    })),
  );
  const setLift = (v: number) => {
    story.leave();
    setLiftRaw(v);
  };
  const setCases = (v: number) => {
    story.leave();
    setCasesRaw(v);
  };
  const act = lift >= cfg.actAt && cases >= cfg.casesMin ? "intervene" : lift >= cfg.watchAt ? "watch" : "none";
  const X = (c: number) => 60 + (Math.min(c, 300) / 300) * 460;
  const Y = (l: number) => 170 - ((Math.min(Math.max(l, -10), 60) + 10) / 70) * 150;
  return (
    <div className="space-y-3">
      <ThePoint>{cfg.point}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <svg viewBox="0 0 560 200" className="mx-auto h-auto w-full max-w-[600px]" role="img" aria-labelledby={`${uid}-t ${uid}-d`}>
        <title id={`${uid}-t`}>{cfg.aria}</title>
        <desc id={`${uid}-d`}>{`${lift}%, ${cases}: ${act}.`}</desc>
        <rect x={X(cfg.casesMin)} y={Y(60)} width={X(300) - X(cfg.casesMin)} height={Y(cfg.actAt) - Y(60)} fill={C.tealSoft} />
        <rect x={X(0)} y={Y(60)} width={X(cfg.casesMin) - X(0)} height={Y(cfg.actAt) - Y(60)} fill={C.soft} />
        <rect x={X(0)} y={Y(cfg.actAt)} width={X(300) - X(0)} height={Y(cfg.watchAt) - Y(cfg.actAt)} fill={C.soft} />
        <rect x={X(0)} y={Y(cfg.watchAt)} width={X(300) - X(0)} height={Y(-10) - Y(cfg.watchAt)} fill={C.mist} />
        <text x={X(200)} y={Y(45)} textAnchor="middle" fontSize="12" fontWeight="700" fill={C.teal}>{cfg.labels.roll}</text>
        <text x={X(50)} y={Y(45)} textAnchor="middle" fontSize="11" fontWeight="700" fill={C.amber}>{cfg.labels.keep}</text>
        <text x={X(200)} y={Y(6)} textAnchor="middle" fontSize="11" fontWeight="700" fill={C.amber}>{cfg.labels.keep}</text>
        <text x={X(200)} y={Y(-4)} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={C.ash}>{cfg.labels.stop}</text>
        <line x1={X(0)} y1={Y(0)} x2={X(300)} y2={Y(0)} stroke={C.rust} strokeDasharray="4 3" />
        <line x1={X(0)} y1={Y(-10)} x2={X(0)} y2={Y(60)} stroke={C.ash} />
        <text x={X(150)} y="196" textAnchor="middle" fontSize="11" fill={C.ash}>{cfg.labels.x}</text>
        <text x="16" y={Y(25)} textAnchor="middle" fontSize="11" fill={C.ash} transform={`rotate(-90 16 ${Y(25)})`}>{cfg.labels.y}</text>
        {story.step !== null && <circle cx={X(cases)} cy={Y(lift)} r="17" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="5 4" className="anim-pulse" />}
        <circle cx={X(cases)} cy={Y(lift)} r="9" fill={C.gold} stroke={C.ink} strokeWidth="2" />
      </svg>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-lift`} className="smallcaps block">{cfg.labels.lift(lift)}</label>
          <input id={`${uid}-lift`} type="range" min={-10} max={60} step={1} value={lift} onChange={(e) => setLift(Number(e.target.value))} className="w-full accent-[#8A5A0B]" />
        </div>
        <div>
          <label htmlFor={`${uid}-cases`} className="smallcaps block">{cfg.labels.cases(cases)}</label>
          <input id={`${uid}-cases`} type="range" min={10} max={300} step={10} value={cases} onChange={(e) => setCases(Number(e.target.value))} className="w-full accent-[#8A5A0B]" />
        </div>
      </div>
      <Insight>
        {plain()}
        {act === "intervene" ? cfg.read.act(lift, cases) : act === "watch" ? (lift >= cfg.actAt ? cfg.read.watchHigh(lift, cases) : cfg.read.watchLow(lift)) : cfg.read.none(lift)}
      </Insight>
    </div>
  );
}

/* ------------------------------------------------------------------ a small architecture: a tool, the base it reads, and the data under it */

export type ArchMiniCfg = {
  point: string;
  aria: string;
  company: string;
  meet: string;
  tool: { name: string; startsFirst: string; startsAfter: string; noBase: string; weak: (pct: number) => string };
  base: { name: string; first: string; after: string };
  link: { ok: string; no: string };
  data: { flow: string; lives: (pct: number) => string };
  levels: { ready: number; weak: number; bar: number };
  toggles: { baseLabel: string; baseFirst: string; baseAfter: string; dataLabel: string; dataReady: string; dataWeak: string; heading: string };
  steps: { title: string; say: string; look: string; measFirst: boolean; ready: boolean }[];
  read: { good: string; noBase: string; weakData: string };
};

export function ArchMini({ cfg }: { cfg: ArchMiniCfg }) {
  const [measFirst, setMeasFirstRaw] = useState(true);
  const [ready, setReadyRaw] = useState(true);
  const story = useStory(
    cfg.steps.map((x) => ({
      title: x.title,
      say: x.say,
      look: x.look,
      apply: () => {
        setMeasFirstRaw(x.measFirst);
        setReadyRaw(x.ready);
      },
    })),
  );
  const setMeasFirst = (v: boolean) => {
    story.leave();
    setMeasFirstRaw(v);
  };
  const setReady = (v: boolean) => {
    story.leave();
    setReadyRaw(v);
  };
  const dataPct = ready ? cfg.levels.ready : cfg.levels.weak;
  const dataOk = dataPct >= cfg.levels.bar;
  return (
    <div className="space-y-3">
      <ThePoint>{cfg.point}</ThePoint>
      <Story steps={story.plan} step={story.step} onStep={story.go} />
      <div role="group" aria-label={cfg.aria} className="mx-auto max-w-xl">
        <div className="rounded-lg border border-dashed border-line bg-canvas px-3 py-1.5 text-center text-caption text-ash">{cfg.meet}</div>
        <div className="my-1 flex h-7 items-center justify-center" aria-hidden />
        <div className="rounded-lg border border-signal bg-signalSoft p-2 text-caption leading-snug">
          <p className="font-semibold text-ink">{cfg.tool.name}</p>
          <p className="text-ash">{measFirst ? cfg.tool.startsFirst : cfg.tool.startsAfter}</p>
          {!measFirst && <p className="text-accent">{cfg.tool.noBase}</p>}
          {!dataOk && <p className="text-accent">{cfg.tool.weak(dataPct)}</p>}
        </div>
        <div className={clsx("flex h-7 items-center justify-center gap-2 text-micro normal-case tracking-normal", measFirst ? "text-ash" : "text-accent")}>
          <span aria-hidden className={clsx("block h-full w-0 border-l-[3px]", measFirst ? "border-solid border-signal" : "border-dashed border-gold")} />
          <span>{measFirst ? cfg.link.ok : cfg.link.no}</span>
        </div>
        <div className="rounded-lg border border-signal bg-signalSoft p-2 text-caption leading-snug">
          <p className="font-semibold text-ink">{cfg.base.name}</p>
          <p className="text-ash">{measFirst ? cfg.base.first : cfg.base.after}</p>
        </div>
        <div className="flex h-7 items-center justify-center gap-2 text-micro normal-case tracking-normal text-ash">
          <span aria-hidden className="block h-full w-0 border-l-[3px] border-solid border-signal" />
          <span>{cfg.data.flow}</span>
        </div>
        <div className="rounded-lg border border-dashed border-line bg-canvas px-3 py-1.5 text-center text-caption text-ash">{cfg.data.lives(dataPct)}</div>
      </div>
      <div className="space-y-1.5">
        <p className="smallcaps">{cfg.toggles.heading}</p>
        <Toggles<string> label={cfg.toggles.baseLabel} value={measFirst ? "first" : "after"} onChange={(v) => setMeasFirst(v === "first")} options={[{ id: "first", label: cfg.toggles.baseFirst }, { id: "after", label: cfg.toggles.baseAfter }]} />
        <Toggles<string> label={cfg.toggles.dataLabel} value={ready ? "ready" : "weak"} onChange={(v) => setReady(v === "ready")} options={[{ id: "ready", label: cfg.toggles.dataReady }, { id: "weak", label: cfg.toggles.dataWeak }]} />
      </div>
      <Insight>
        {plain()}
        {measFirst && dataOk ? cfg.read.good : !measFirst ? cfg.read.noBase : cfg.read.weakData}
      </Insight>
    </div>
  );
}
