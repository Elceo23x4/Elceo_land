/**
 * DirectionalBiasVisual.tsx
 *
 * Decorative radar ring + directional arrow for the Directional Bias panel.
 * Uses SVG assets from elceo-svg-14. Purely decorative, aria-hidden.
 * No source SVG edits. Respects reduced motion.
 */

import { useId } from "react";
import RadarRingSvg from "../../../assets/source/dashboard/arrows/elceo-svg-14-radar-ring.svg?react";

export interface DirectionalBiasVisualProps {
  direction: "up" | "down" | "neutral";
  confidence: number;
  tone?: "positive" | "warning" | "negative" | "neutral";
}

// Arrow paths extracted from source SVGs (no edits to source files)
const ARROW_UP_POINTS = "156.89,362.15 318.11,204.48 343.28,230.22 372.00,128.00 269.17,154.43 294.34,180.17 133.11,337.85";
const ARROW_DOWN_POINTS = "133.01,172.05 292.81,331.14 267.41,356.65 370.00,384.00 342.19,281.53 316.80,307.04 156.99,147.95";

export default function DirectionalBiasVisual({ direction, confidence, tone }: DirectionalBiasVisualProps) {
  const rawId = useId();
  const safeId = rawId.replace(/:/g, "");
  const glowId = `dbv-glow-${safeId}`;
  const gradId = `dbv-grad-${safeId}`;

  const toneClass = tone ? `dashboard-directional-bias-visual--${tone}` : "";
  const showArrow = direction !== "neutral";

  // Arrow color based on direction
  const arrowStops = direction === "up"
    ? { start: "#24dc57", mid: "#4df06f", end: "#d6ffe0" }
    : { start: "#ff2b48", mid: "#ff5e73", end: "#ffd6dc" };

  const arrowPoints = direction === "up" ? ARROW_UP_POINTS : ARROW_DOWN_POINTS;
  const opacity = Math.max(0.5, Math.min(1, confidence / 100));

  return (
    <div className={`dashboard-directional-bias-visual ${toneClass}`} aria-hidden="true">
      {/* Radar ring background */}
      <div className="dashboard-directional-bias-visual__radar">
        <RadarRingSvg preserveAspectRatio="xMidYMid meet" />
      </div>

      {/* Directional arrow overlay */}
      {showArrow && (
        <svg className="dashboard-directional-bias-visual__arrow" viewBox="0 0 512 512" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id={glowId} x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <linearGradient id={gradId} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={arrowStops.start} stopOpacity="0.92" />
              <stop offset="65%" stopColor={arrowStops.mid} stopOpacity="1" />
              <stop offset="100%" stopColor={arrowStops.end} stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <polygon
            points={arrowPoints}
            fill={`url(#${gradId})`}
            filter={`url(#${glowId})`}
            opacity={opacity}
          />
        </svg>
      )}
    </div>
  );
}
