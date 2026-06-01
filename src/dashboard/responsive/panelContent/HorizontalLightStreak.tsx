/**
 * HorizontalLightStreak.tsx
 *
 * V1B-10: Decorative horizontal separator using the light streak SVG asset.
 * Clipped to separator height, low opacity, pointer-events: none.
 * Used between major content groups in selected panels.
 */

import LightStreaksSvg from "../../../assets/source/dashboard/background/elceo-svg-10-horizontal-light-streaks.svg?react";

export interface HorizontalLightStreakProps {
  className?: string;
  opacity?: number;
}

export default function HorizontalLightStreak({ className, opacity = 0.35 }: HorizontalLightStreakProps) {
  return (
    <div
      className={`dashboard-light-streak${className ? ` ${className}` : ""}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <LightStreaksSvg preserveAspectRatio="none" />
    </div>
  );
}
