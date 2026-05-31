/**
 * DirectionalBiasVisual.tsx
 *
 * Uses actual SVG-14 assets: radar ring, arrow up, arrow down.
 * No manual recreation. Radar scan core animation overlaid.
 * Purely decorative, aria-hidden. Respects reduced motion.
 */

import { useId } from "react";
import RadarRingSvg from "../../../assets/source/dashboard/arrows/elceo-svg-14-radar-ring.svg?react";
import ArrowUpSvg from "../../../assets/source/dashboard/arrows/elceo-svg-14-arrow-up.svg?react";
import ArrowDownSvg from "../../../assets/source/dashboard/arrows/elceo-svg-14-arrow-down.svg?react";

export interface DirectionalBiasVisualProps {
  direction: "up" | "down" | "neutral";
  confidence: number;
  tone?: "positive" | "warning" | "negative" | "neutral";
}

export default function DirectionalBiasVisual({ direction, confidence, tone }: DirectionalBiasVisualProps) {
  const rawId = useId();
  const safeId = rawId.replace(/:/g, "");
  const scanGradId = `dbv-scan-${safeId}`;

  const toneClass = tone ? `dashboard-directional-bias-visual--${tone}` : "";
  const opacity = Math.max(0.55, Math.min(1, confidence / 100));

  return (
    <div className={`dashboard-directional-bias-visual ${toneClass}`} aria-hidden="true">
      {/* Layer 1: Actual radar ring SVG */}
      <div className="dashboard-directional-bias-visual__radar">
        <RadarRingSvg preserveAspectRatio="xMidYMid meet" />
      </div>

      {/* Layer 2: Radar scan core overlay */}
      <svg className="dashboard-directional-bias-visual__scan" viewBox="0 0 512 512" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={scanGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1de074" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1de074" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="dashboard-directional-bias-visual__scan-rotor">
          <path
            d="M256 256 L256 158 A98 98 0 0 1 330 192 Z"
            fill={`url(#${scanGradId})`}
            opacity="0.5"
          />
          <line x1="256" y1="256" x2="256" y2="155" stroke="#1de074" strokeWidth="1.5" opacity="0.7" strokeLinecap="round" />
        </g>
        <circle className="dashboard-directional-bias-visual__scan-center" cx="256" cy="256" r="6" fill="#1de074" opacity="0.8" />
      </svg>

      {/* Layer 3: Actual arrow SVG */}
      {direction !== "neutral" && (
        <div className="dashboard-directional-bias-visual__arrow" style={{ opacity }}>
          {direction === "up" && <ArrowUpSvg preserveAspectRatio="xMidYMid meet" />}
          {direction === "down" && <ArrowDownSvg preserveAspectRatio="xMidYMid meet" />}
        </div>
      )}
    </div>
  );
}
