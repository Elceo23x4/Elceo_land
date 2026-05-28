/**
 * MiniVisuals.tsx
 *
 * Compact inline SVG graphics for ELCEO dashboard panels.
 * Deterministic — no live data, no timers.
 */

import type { Tone } from "../responsivePanelFixtures";

const TONE_COLORS: Record<Tone, string> = {
  positive: "#5cba6e",
  negative: "#e05555",
  warning: "#d4a853",
  neutral: "#8a8178",
  stale: "#6b6560",
  pending: "#d4a853",
};

/* ─── MiniSparkline ─── */
export function MiniSparkline({ data, tone = "neutral", width = 48, height = 16 }: { data: number[]; tone?: Tone; width?: number; height?: number }) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);

  const points = data.map((v, i) => `${i * step},${height - ((v - min) / range) * height}`).join(" ");
  const color = TONE_COLORS[tone];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="dashboard-mini-sparkline" aria-hidden="true">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
    </svg>
  );
}

/* ─── MiniDonutScore ─── */
export function MiniDonutScore({ score, tone = "neutral", size = 22 }: { score: number; tone?: Tone; size?: number }) {
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = TONE_COLORS[tone];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="dashboard-mini-donut" aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(138,129,120,0.15)" strokeWidth="2" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        opacity="0.9"
      />
    </svg>
  );
}

/* ─── EvidenceWeightBar ─── */
export function EvidenceWeightBar({ score, tone = "neutral" }: { score: number; tone?: Tone }) {
  const color = TONE_COLORS[tone];
  return (
    <div className="dashboard-evidence-weight-bar" aria-hidden="true">
      <div className="dashboard-evidence-weight-bar__fill" style={{ width: `${score}%`, background: color }} />
      <div className="dashboard-evidence-weight-bar__tick" style={{ left: "60%" }} />
    </div>
  );
}

/* ─── SessionBadge ─── */
export function SessionBadge({ session }: { session: string }) {
  return (
    <span className="dashboard-session-badge">
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
        <circle cx="5" cy="5" r="3" fill="none" stroke="#d4a853" strokeWidth="1" opacity="0.7" />
        <circle cx="5" cy="5" r="1.2" fill="#d4a853" opacity="0.9" />
      </svg>
      {session}
    </span>
  );
}

/* ─── ProviderStatusGlyph ─── */
export function ProviderStatusGlyph({ status = "Fixture Mode" }: { status?: string }) {
  return (
    <span className="dashboard-provider-glyph">
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
        <rect x="2" y="2" width="6" height="6" rx="1" fill="none" stroke="#8a8178" strokeWidth="0.8" strokeDasharray="2 1" />
      </svg>
      {status}
    </span>
  );
}

/* ─── CrossAssetMiniPulse ─── */
export function CrossAssetMiniPulse({ strength, tone = "neutral" }: { strength: number; tone?: Tone }) {
  const color = TONE_COLORS[tone];
  const w = 36;
  const h = 12;
  // Deterministic pulse shape based on strength
  const mid = (strength / 100) * w;
  const path = `M0,${h / 2} Q${mid * 0.3},${h * 0.2} ${mid * 0.5},${h / 2} T${mid},${h * 0.25} T${w},${h / 2}`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="dashboard-mini-pulse" aria-hidden="true">
      <path d={path} fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}
