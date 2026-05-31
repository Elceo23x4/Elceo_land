/**
 * DirectionalBiasRadar.tsx
 *
 * V1B-4: Displays the elceo-radar.svg asset inside the Directional Bias panel.
 * Uses the pre-scaled SVG (141×127) as-is — no custom paths, circles, or overlays.
 */

import RadarSvg from "../../../assets/source/dashboard/arrows/elceo-radar.svg?react";

export interface DirectionalBiasRadarProps {
  className?: string;
}

export default function DirectionalBiasRadar({ className }: DirectionalBiasRadarProps) {
  return (
    <div className={`dashboard-directional-bias-radar${className ? ` ${className}` : ""}`} aria-hidden="true">
      <RadarSvg preserveAspectRatio="xMidYMid meet" />
    </div>
  );
}
