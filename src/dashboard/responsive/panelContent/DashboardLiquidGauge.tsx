/**
 * DashboardLiquidGauge.tsx
 *
 * Premium liquid gauge score visualization using liquid_gauge.svg as frame.
 * CSS-based animated liquid fill overlay. No SVG edits.
 * Accessible: role="meter" with aria attributes.
 * Respects reduced motion.
 */

import LiquidGaugeSvg from "../../../assets/source/dashboard/shell/liquid_gauge.svg?react";

export interface DashboardLiquidGaugeProps {
  value: number;
  label: string;
  tone?: "auto" | "red" | "amber" | "green";
  className?: string;
}

function getTone(value: number, tone?: string): "red" | "amber" | "green" {
  if (tone && tone !== "auto") return tone as "red" | "amber" | "green";
  if (value < 40) return "red";
  if (value < 60) return "amber";
  return "green";
}

const TONE_COLORS = {
  red: { primary: "rgba(224, 85, 85, 0.7)", secondary: "rgba(180, 50, 50, 0.5)" },
  amber: { primary: "rgba(212, 168, 83, 0.7)", secondary: "rgba(180, 130, 50, 0.5)" },
  green: { primary: "rgba(92, 186, 110, 0.7)", secondary: "rgba(60, 150, 80, 0.5)" },
};

export default function DashboardLiquidGauge({ value, label, tone, className }: DashboardLiquidGaugeProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  const resolvedTone = getTone(clamped, tone);
  const colors = TONE_COLORS[resolvedTone];
  const fillPercent = 100 - clamped;

  return (
    <div
      className={`dashboard-liquid-gauge ${className ?? ""}`}
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      aria-label={`${label}: ${clamped}%`}
      style={{
        "--gauge-fill-percent": `${fillPercent}%`,
        "--gauge-liquid-primary": colors.primary,
        "--gauge-liquid-secondary": colors.secondary,
      } as React.CSSProperties}
    >
      <div className="dashboard-liquid-gauge__frame" aria-hidden="true">
        <LiquidGaugeSvg preserveAspectRatio="xMidYMid meet" />
      </div>
      <div className="dashboard-liquid-gauge__liquid" aria-hidden="true">
        <div className="dashboard-liquid-gauge__wave dashboard-liquid-gauge__wave--1" />
        <div className="dashboard-liquid-gauge__wave dashboard-liquid-gauge__wave--2" />
      </div>
      <div className="dashboard-liquid-gauge__score">
        <span className="dashboard-liquid-gauge__value">{clamped}%</span>
      </div>
      <div className="dashboard-liquid-gauge__label">{label}</div>
    </div>
  );
}
