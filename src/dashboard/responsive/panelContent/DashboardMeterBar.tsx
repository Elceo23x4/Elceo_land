/**
 * DashboardMeterBar.tsx
 *
 * Premium CSS-only meter bar. No native browser progress.
 * Black glass rail, gold edge, tone-based fill, diagonal shimmer.
 * Accessible: role="progressbar" with aria attributes.
 * Respects reduced motion.
 */

export interface DashboardMeterBarProps {
  value: number;
  label: string;
  tone?: "auto" | "red" | "amber" | "green" | "neutral";
  compact?: boolean;
  className?: string;
}

function resolveTone(value: number, tone?: string): string {
  if (tone && tone !== "auto") return tone;
  if (value < 40) return "red";
  if (value < 60) return "amber";
  return "green";
}

export default function DashboardMeterBar({ value, label, tone, compact, className }: DashboardMeterBarProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  const resolved = resolveTone(clamped, tone);

  return (
    <div
      className={`dashboard-meter-bar ${compact ? "dashboard-meter-bar--compact" : ""} ${className ?? ""}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      aria-label={`${label}: ${clamped}%`}
    >
      <div className={`dashboard-meter-bar__fill dashboard-meter-bar__fill--${resolved}`} style={{ width: `${clamped}%` }}>
        <div className="dashboard-meter-bar__shimmer" aria-hidden="true" />
      </div>
    </div>
  );
}
