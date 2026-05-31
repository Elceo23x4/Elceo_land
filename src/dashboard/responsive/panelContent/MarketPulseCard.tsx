/**
 * MarketPulseCard.tsx
 *
 * V1B-6: Market pulse card for Watchlist Featured section.
 * Visual language extracted from elceo-svg-09-market-pulse-cards.svg.
 * Source SVG not modified — card frame/accent/ring pattern replicated faithfully.
 *
 * Design from source asset:
 *   Card: dark bg #050504, border #392006, rx=11
 *   Accent bar: colored per tone (green=#1de074, red=#ff4d5e, amber=#f0a11a)
 *   Score ring: arc fill proportional to confidence
 *   Sparkline: polyline with tone color
 */

import type { Tone } from "../responsivePanelFixtures";

export interface MarketPulseCardProps {
  symbol: string;
  label?: string;
  assetClass?: string;
  bias?: string;
  tone?: Tone;
  active?: boolean;
  metric?: string;
  note?: string;
  sparkline?: number[];
  className?: string;
}

const TONE_COLORS: Record<Tone, string> = {
  positive: "#1de074",
  warning: "#f0a11a",
  negative: "#ff4d5e",
  neutral: "#7b6650",
  stale: "#8a8178",
  pending: "#d4a853",
};

function MiniSparklinePath({ data, color }: { data: number[]; color: string }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 24;
  const w = 56;
  const step = w / (data.length - 1);
  const points = data
    .map((v, i) => `${(i * step).toFixed(1)},${(h - ((v - min) / range) * h).toFixed(1)}`)
    .join(" ");
  return (
    <svg className="dashboard-pulse-card__sparkline" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ScoreArc({ tone, className }: { tone: Tone; className?: string }) {
  const color = TONE_COLORS[tone];
  /* Arc length varies by tone to suggest confidence level */
  const arcEnd: Record<Tone, string> = {
    positive: "M 0 -12 A 12 12 0 1 1 -10.4 6",    /* ~270° */
    warning: "M 0 -12 A 12 12 0 1 1 -6 10.4",      /* ~240° */
    negative: "M 0 -12 A 12 12 0 0 1 10.4 6",       /* ~120° */
    neutral: "M 0 -12 A 12 12 0 0 1 12 0",          /* ~90° */
    stale: "M 0 -12 A 12 12 0 0 1 12 0",            /* same as neutral */
    pending: "M 0 -12 A 12 12 0 1 1 -6 10.4",       /* same as warning */
  };
  return (
    <svg className={`dashboard-pulse-card__score-ring ${className ?? ""}`} viewBox="-16 -16 32 32" aria-hidden="true">
      <circle cx="0" cy="0" r="12" fill="none" stroke="#1b150d" strokeWidth="3.5" opacity="0.95" />
      <path d={arcEnd[tone]} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="0" cy="0" r="9" fill="none" stroke="#2a1a0b" strokeWidth="0.6" opacity="0.55" />
    </svg>
  );
}

export default function MarketPulseCard({
  symbol,
  label,
  assetClass,
  bias,
  tone = "neutral",
  active = false,
  metric,
  note,
  sparkline,
  className,
}: MarketPulseCardProps) {
  const color = TONE_COLORS[tone];

  return (
    <article
      className={`dashboard-pulse-card${active ? " dashboard-pulse-card--active" : ""}${className ? ` ${className}` : ""}`}
      aria-current={active ? "true" : undefined}
    >
      {/* Accent bar — faithful to source asset colored bar */}
      <div className="dashboard-pulse-card__accent" style={{ backgroundColor: color }} />

      {/* Card header */}
      <div className="dashboard-pulse-card__header">
        <span className="dashboard-pulse-card__symbol">{symbol}</span>
        {assetClass && <span className="dashboard-pulse-card__class">{assetClass}</span>}
      </div>

      {/* Sparkline */}
      {sparkline && sparkline.length >= 2 && (
        <MiniSparklinePath data={sparkline} color={color} />
      )}

      {/* Card body */}
      <div className="dashboard-pulse-card__body">
        {bias && <span className="dashboard-pulse-card__bias" style={{ color }}>{bias}</span>}
        {metric && <span className="dashboard-pulse-card__metric">{metric}</span>}
        {note && <span className="dashboard-pulse-card__note">{note}</span>}
      </div>

      {/* Score arc ring */}
      <div className="dashboard-pulse-card__footer">
        <ScoreArc tone={tone} />
        {label && <span className="dashboard-pulse-card__label">{label}</span>}
      </div>
    </article>
  );
}
