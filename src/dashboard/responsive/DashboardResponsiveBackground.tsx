/**
 * DashboardResponsiveBackground.tsx
 *
 * Renders the night sky, GSAP starfield, and dotted world map behind the dashboard.
 * DashboardGsapStarfield is the primary visible twinkle layer (z-index 3).
 * Old DashboardTwinkleStarLayer and useGsapStarTwinkle are no longer active runtime.
 */

import NightSky from "../../assets/source/dashboard/sky/elceo-svg-16-revb-clear-night-sky.svg?react";
import DottedWorldMap from "../../assets/source/dashboard/maps/elceo-svg-15-revb-dotted-world-map.svg?react";
import DashboardGsapStarfield from "./DashboardGsapStarfield";

export default function DashboardResponsiveBackground() {
  return (
    <>
      {/* Night sky — fills board, slight opacity */}
      <div
        className="dashboard-precision-layer dashboard-precision-bg-sky"
        aria-hidden="true"
      >
        <NightSky preserveAspectRatio="xMidYMid slice" />
      </div>

      {/* GSAP SVG starfield — visible twinkle layer (z-index 3) */}
      <DashboardGsapStarfield />

      {/* Dotted world map — fills board, lower opacity */}
      <div
        className="dashboard-precision-layer dashboard-precision-bg-map"
        aria-hidden="true"
      >
        <DottedWorldMap preserveAspectRatio="xMidYMid meet" />
      </div>
    </>
  );
}
