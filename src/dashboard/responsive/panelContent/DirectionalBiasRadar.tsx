/**
 * DirectionalBiasRadar.tsx
 *
 * V1B-4C: Displays elceo-radar.svg with arrow overlay (up/down) or
 * a neutral radar scan animation when market has no clear direction.
 * Uses actual supplied SVG assets — no manual geometry recreation.
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

      {/* Neutral/Watching state — radar scan overlay */}
      {direction === "neutral" && (
        <svg
          className="dashboard-directional-bias-radar__neutral-scan"
          viewBox="0 0 141 127"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="dbr_scan_core_glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0aff66" stopOpacity="0.18" />
              <stop offset="60%" stopColor="#00c94d" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#00ff66" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="dbr_sweep_fill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0aff66" stopOpacity="0.38" />
              <stop offset="50%" stopColor="#d4a853" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#0aff66" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Core glow pulse */}
          <circle
            className="dashboard-directional-bias-radar__scan-core"
            cx="70.5"
            cy="63.5"
            r="22"
            fill="url(#dbr_scan_core_glow)"
          />

          {/* Rotating scan wedge */}
          <g className="dashboard-directional-bias-radar__scan-rotor">
            <path
              d="M70.5 63.5 L70.5 27 A36.5 36.5 0 0 1 96 42 Z"
              fill="url(#dbr_sweep_fill)"
            />
            <line
              x1="70.5"
              y1="63.5"
              x2="70.5"
              y2="27"
              stroke="#0aff66"
              strokeOpacity="0.45"
              strokeWidth="0.6"
              strokeLinecap="round"
            />
          </g>
        </svg>
      )}

      {/* Directional arrow overlay (up/down only) */}
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
