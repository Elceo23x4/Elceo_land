/**
 * DirectionalBiasRadar.tsx
 *
 * V1B-4B: Displays the elceo-radar.svg asset with actual arrow SVG overlay.
 * Uses pre-scaled radar (141×127) + real arrow assets. No manual geometry.
 */

import RadarSvg from "../../../assets/source/dashboard/arrows/elceo-radar.svg?react";
import ArrowUpSvg from "../../../assets/source/dashboard/arrows/elceo-svg-14-arrow-up.svg?react";
import ArrowDownSvg from "../../../assets/source/dashboard/arrows/elceo-svg-14-arrow-down.svg?react";

export interface DirectionalBiasRadarProps {
  direction?: "up" | "down" | "neutral";
  confidence?: number;
  className?: string;
}

export default function DirectionalBiasRadar({ direction = "neutral", confidence = 0, className }: DirectionalBiasRadarProps) {
  return (
    <div className={`dashboard-directional-bias-radar${className ? ` ${className}` : ""}`} aria-hidden="true">
      <div className="dashboard-directional-bias-radar__asset">
        <RadarSvg preserveAspectRatio="xMidYMid meet" />
      </div>

      {direction !== "neutral" && (
        <div className="dashboard-directional-bias-radar__arrow">
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
