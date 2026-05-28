/**
 * DashboardResponsiveBackground.tsx
 *
 * Renders the night sky, twinkle star layer, and dotted world map behind the entire dashboard board.
 * Both assets are positioned absolute, filling the board, at z-index 0.
 *
 * Uses preserveAspectRatio="xMidYMid slice" for the sky (fills without gaps)
 * and preserveAspectRatio="xMidYMid meet" for the map (avoids distortion).
 *
 * Twinkle star layer sits above night sky (z-index 2), behind panels.
 */

import NightSky from "../../assets/source/dashboard/sky/elceo-svg-16-revb-clear-night-sky.svg?react";
import DottedWorldMap from "../../assets/source/dashboard/maps/elceo-svg-15-revb-dotted-world-map.svg?react";
import DashboardTwinkleStarLayer from "./DashboardTwinkleStarLayer";

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

      {/* Deterministic twinkle star overlay — above sky, behind panels */}
      <DashboardTwinkleStarLayer />

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
