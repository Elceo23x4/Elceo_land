/**
 * PanelPrimitives.tsx
 *
 * Reusable micro-components for panel content.
 * Kept small and composable.
 */

import type { ReactNode } from "react";
import type { Tone } from "../responsivePanelFixtures";

/* ─── Chip ─── */
export function Chip({ value, tone }: { value: string; tone: Tone }) {
  return <span className={`dashboard-precision-chip dashboard-precision-chip--${tone}`}>{value}</span>;
}

/* ─── DataRow ─── */
export function DataRow({ label, value, tone }: { label: string; value: string; tone?: Tone }) {
  const color = tone === "positive" ? "#5cba6e" : tone === "negative" ? "#e05555" : tone === "warning" ? "#d4a853" : "#8a8178";
  return (
    <div className="dashboard-precision-data-row">
      <span className="dashboard-precision-data-label">{label}</span>
      <span style={{ color }}>{value}</span>
    </div>
  );
}

/* ─── MiniMeter ─── */
export function MiniMeter({ score, tone }: { score: number; tone: Tone }) {
  return (
    <div className="dashboard-mini-meter">
      <div className={`dashboard-mini-meter__fill dashboard-mini-meter__fill--${tone}`} style={{ width: `${score}%` }} />
    </div>
  );
}

/* ─── SectionNav ─── */
export function SectionNav({ items, active, onSelect }: { items: string[]; active: number; onSelect: (i: number) => void }) {
  return (
    <div className="dashboard-section-nav">
      {items.map((item, i) => (
        <span key={item} className={`dashboard-section-nav__item${i === active ? " dashboard-section-nav__item--active" : ""}`} onClick={() => onSelect(i)} role="tab" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelect(i); }}>{item}</span>
      ))}
    </div>
  );
}

/* ─── ActionBar ─── */
export function ActionBar({ onExpand, actions }: { onExpand?: () => void; actions?: string[] }) {
  const btns = actions ?? ["Expand", "Evidence", "Journal"];
  return (
    <div className="dashboard-panel-action-bar">
      {btns.map((a, i) => (
        <button key={a} type="button" className="dashboard-panel-action-btn" onClick={i === 0 ? onExpand : undefined}>{a}</button>
      ))}
    </div>
  );
}

/* ─── SlideStripWrapper (with edge fades) ─── */
export function SlideStripWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="dashboard-slide-strip-wrapper">
      <div className="dashboard-panel-scroll-x dashboard-slide-strip">
        {children}
      </div>
    </div>
  );
}

/* ─── FreshnessIndicator ─── */
export function FreshnessIndicator({ label }: { label: string }) {
  const tone: Tone = label === "Current" ? "positive" : label === "Watch" ? "warning" : "stale";
  return <Chip value={`⏱ ${label}`} tone={tone} />;
}

/* ─── StatusLabel ─── */
export function StatusLabel({ label }: { label: string }) {
  return <Chip value={label} tone="pending" />;
}
