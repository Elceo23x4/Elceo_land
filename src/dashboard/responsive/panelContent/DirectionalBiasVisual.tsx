/**
 * DirectionalBiasVisual.tsx
 *
 * Uses actual SVG-14 assets only: radar ring, arrow up, arrow down.
 * No custom scan overlay. No recreated shapes.
 * Animation targets actual SVG group IDs via scoped CSS.
 * Purely decorative, aria-hidden. Respects reduced motion.
 */

import RadarRingSvg from "../../../assets/source/dashboard/arrows/elceo-svg-14-radar-ring.svg?react";
import ArrowUpSvg from "../../../assets/source/dashboard/arrows/elceo-svg-14-arrow-up.svg?react";
import ArrowDownSvg from "../../../assets/source/dashboard/arrows/elceo-svg-14-arrow-down.svg?react";

export interface DirectionalBiasVisualProps {
  direction: "up" | "down" | "neutral";
  confidence: number;
  tone?: "positive" | "warning" | "negative" | "neutral";
}

export default function DirectionalBiasVisual({ direction, confidence, tone }: DirectionalBiasVisualProps) {
  const toneClass = tone ? `dashboard-directional-bias-visual--${tone}` : "";
  const opacity = Math.max(0.55, Math.min(1, confidence / 100));

  return (
    <div className={`dashboard-directional-bias-visual ${toneClass}`} aria-hidden="true">
      {/* Actual radar ring SVG asset */}
      <div className="dashboard-directional-bias-visual__radar">
        <RadarRingSvg preserveAspectRatio="xMidYMid meet" />
      </div>

      {/* Actual arrow SVG asset */}
      {direction !== "neutral" && (
        <div className="dashboard-directional-bias-visual__arrow" style={{ opacity }}>
          {direction === "up" ? (
            <ArrowUpSvg preserveAspectRatio="xMidYMid meet" />
          ) : (
            <ArrowDownSvg preserveAspectRatio="xMidYMid meet" />
          )}
        </div>
      )}
    </div>
  );
}
