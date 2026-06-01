/**
 * InsightTextBlock.tsx
 *
 * V1B-10: Blog-like readable presentation for long insight/summary sections.
 * Improves readability with increased line-height, paragraph spacing,
 * and optional left accent + eyebrow label.
 */

import type { ReactNode } from "react";
import type { Tone } from "../responsivePanelFixtures";

export interface InsightTextBlockProps {
  children: ReactNode;
  eyebrow?: string;
  title?: string;
  tone?: Tone;
  dense?: boolean;
  className?: string;
}

const ACCENT_COLORS: Record<string, string> = {
  positive: "rgba(92, 186, 110, 0.5)",
  negative: "rgba(224, 85, 85, 0.45)",
  warning: "rgba(212, 168, 83, 0.5)",
  neutral: "rgba(138, 129, 120, 0.3)",
  stale: "rgba(138, 129, 120, 0.2)",
  pending: "rgba(212, 168, 83, 0.35)",
};

export default function InsightTextBlock({ children, eyebrow, title, tone = "neutral", dense = false, className }: InsightTextBlockProps) {
  const accentColor = ACCENT_COLORS[tone] ?? ACCENT_COLORS.neutral;

  return (
    <div
      className={`dashboard-insight-block${dense ? " dashboard-insight-block--dense" : ""}${className ? ` ${className}` : ""}`}
      style={{ borderLeftColor: accentColor }}
    >
      {eyebrow && <span className="dashboard-insight-block__eyebrow">{eyebrow}</span>}
      {title && <strong className="dashboard-insight-block__title">{title}</strong>}
      <div className="dashboard-insight-block__body">
        {children}
      </div>
    </div>
  );
}
