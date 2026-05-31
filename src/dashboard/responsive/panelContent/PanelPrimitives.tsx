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
export function DataRow({ label, value, tone, mono }: { label: string; value: string; tone?: Tone; mono?: boolean }) {
  const color = tone === "positive" ? "#5cba6e" : tone === "negative" ? "#e05555" : tone === "warning" ? "#d4a853" : "#8a8178";
  return (
    <div className="dashboard-precision-data-row">
      <span className="dashboard-precision-data-label">{label}</span>
      <span className={`dashboard-precision-data-value${mono ? " dashboard-precision-data-value--mono" : ""}`} style={{ color }}>{value}</span>
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

/* ─── SectionNav (delegates to PanelSectionNav with overflow arrows) ─── */
import PanelSectionNav from "./PanelSectionNav";
export function SectionNav({ items, active, onSelect }: { items: string[]; active: number; onSelect: (i: number) => void }) {
  return <PanelSectionNav items={items} active={active} onSelect={onSelect} />;
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
