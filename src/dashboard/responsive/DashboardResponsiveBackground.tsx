/**
 * DashboardResponsiveBackground.tsx
 *
 * Renders the night sky, twinkle star layer, and dotted world map behind the entire dashboard board.
 * Both assets are positioned absolute, filling the board, at z-index 0.
 *
 * Uses preserveAspectRatio="xMidYMid slice" for the sky (fills without gaps)
 * and preserveAspectRatio="xMidYMid meet" for the map (avoids distortion).
 *
 * GSAP star twinkle animates actual SVG star elements + fallback overlay spans.
 */

import { useRef } from "react";
import NightSky from "../../assets/source/dashboard/sky/elceo-svg-16-revb-clear-night-sky.svg?react";
import DottedWorldMap from "../../assets/source/dashboard/maps/elceo-svg-15-revb-dotted-world-map.svg?react";
import DashboardTwinkleStarLayer from "./DashboardTwinkleStarLayer";
import { useGsapStarTwinkle } from "./useGsapStarTwinkle";

export default function DashboardResponsiveBackground() {
  const skyRef = useRef<HTMLDivElement>(null);
  const twinkleRef = useRef<HTMLDivElement>(null);

  // GSAP drives both actual SVG star elements and fallback overlay spans
  useGsapStarTwinkle(skyRef, twinkleRef);

  return (
    <>
      {/* Night sky — fills board, slight opacity */}
      <div
        ref={skyRef}
        className="dashboard-precision-layer dashboard-precision-bg-sky"
        aria-hidden="true"
      >
        <NightSky preserveAspectRatio="xMidYMid slice" />
      </div>

      {/* Deterministic twinkle star overlay — GSAP animated, above sky, behind panels */}
      <DashboardTwinkleStarLayer ref={twinkleRef} />

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
