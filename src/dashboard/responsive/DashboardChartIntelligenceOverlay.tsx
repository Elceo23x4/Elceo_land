/**
 * DashboardChartIntelligenceOverlay.tsx
 *
 * SVG overlay rendering chart intelligence layers:
 * zones, markers, scenario paths, and annotation callouts.
 * Positioned absolute inside chart display area.
 * Fixture-only — no live data.
 */

import { useState } from "react";
import {
  chartZones,
  chartMarkers,
  chartAnnotations,
  scenarioPaths,
  activeChartContextFixture,
} from "./chartIntelligenceFixture";

/* ─── Tone color mapping ─── */
const TONE_FILL: Record<string, string> = {
  positive: "rgba(92, 186, 110, 0.12)",
  negative: "rgba(224, 85, 85, 0.10)",
  warning: "rgba(212, 168, 83, 0.10)",
  neutral: "rgba(138, 129, 120, 0.08)",
};

const TONE_STROKE: Record<string, string> = {
  positive: "rgba(92, 186, 110, 0.6)",
  negative: "rgba(224, 85, 85, 0.55)",
  warning: "rgba(212, 168, 83, 0.55)",
  neutral: "rgba(138, 129, 120, 0.4)",
};

const TONE_COLOR: Record<string, string> = {
  positive: "#5cba6e",
  negative: "#e05555",
  warning: "#d4a853",
  neutral: "#8a8178",
};

interface OverlayProps {
  showZones: boolean;
  showLiquidity: boolean;
  showScenario: boolean;
  showNotes: boolean;
}

export default function DashboardChartIntelligenceOverlay({
  showZones,
  showLiquidity,
  showScenario,
  showNotes,
}: OverlayProps) {
  const [hoveredAnnotation, setHoveredAnnotation] = useState<string | null>(null);

  return (
    <div className="dashboard-chart-overlay" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="dashboard-chart-overlay__svg">
        {/* ─── Zone Overlays ─── */}
        {showZones && chartZones
          .filter((z) => z.kind !== "liquidity")
          .map((zone) => (
            <rect
              key={zone.id}
              className={`dashboard-chart-zone dashboard-chart-zone--${zone.kind}`}
              x={zone.x1}
              y={zone.y1}
              width={zone.x2 - zone.x1}
              height={zone.y2 - zone.y1}
              fill={TONE_FILL[zone.tone]}
              stroke={TONE_STROKE[zone.tone]}
              strokeWidth="0.25"
              strokeDasharray={zone.kind === "structure" ? "1 0.5" : undefined}
            />
          ))}

        {/* ─── Liquidity Bands ─── */}
        {showLiquidity && chartZones
          .filter((z) => z.kind === "liquidity")
          .map((zone) => (
            <rect
              key={zone.id}
              className="dashboard-chart-zone dashboard-chart-zone--liquidity"
              x={zone.x1}
              y={zone.y1}
              width={zone.x2 - zone.x1}
              height={zone.y2 - zone.y1}
              fill={TONE_FILL[zone.tone]}
              stroke={TONE_STROKE[zone.tone]}
              strokeWidth="0.2"
              strokeDasharray="1.5 0.8"
            />
          ))}

        {/* ─── Scenario Paths ─── */}
        {showScenario && scenarioPaths.map((path) => (
          <polyline
            key={path.id}
            className="dashboard-chart-scenario-path"
            points={path.points.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke={TONE_STROKE[path.tone]}
            strokeWidth="0.35"
            strokeDasharray="1.2 0.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {/* ─── Markers ─── */}
        {showZones && chartMarkers.map((marker) => (
          <circle
            key={marker.id}
            className={`dashboard-chart-marker dashboard-chart-marker--${marker.kind}`}
            cx={marker.x}
            cy={marker.y}
            r="1.2"
            fill={TONE_COLOR[marker.tone]}
            opacity="0.85"
          />
        ))}

        {/* ─── Annotation Anchors ─── */}
        {showNotes && chartAnnotations.map((ann) => (
          <circle
            key={ann.id}
            className="dashboard-chart-annotation-anchor"
            cx={ann.anchorX}
            cy={ann.anchorY}
            r="0.8"
            fill={TONE_COLOR[ann.tone]}
            opacity="0.7"
          />
        ))}
      </svg>

      {/* ─── Annotation Labels (HTML overlay for readability) ─── */}
      {showNotes && chartAnnotations.map((ann) => (
        <div
          key={ann.id}
          className={`dashboard-chart-annotation dashboard-chart-annotation--${ann.tone}`}
          style={{ left: `${ann.anchorX}%`, top: `${ann.anchorY}%` }}
          onMouseEnter={() => setHoveredAnnotation(ann.id)}
          onMouseLeave={() => setHoveredAnnotation(null)}
        >
          <span className="dashboard-chart-annotation__label">{ann.title}</span>
          {hoveredAnnotation === ann.id && (
            <div className="dashboard-chart-annotation__tooltip">
              <p>{ann.body}</p>
              <span className="dashboard-chart-annotation__link">→ {ann.panelLink}</span>
            </div>
          )}
        </div>
      ))}

      {/* ─── Active Context Strip ─── */}
      <div className="dashboard-chart-context-strip">
        <span className="dashboard-chart-context-strip__item dashboard-chart-context-strip__item--asset">
          {activeChartContextFixture.asset}
        </span>
        <span className="dashboard-chart-context-strip__item">
          {activeChartContextFixture.timeframe}
        </span>
        <span className="dashboard-chart-context-strip__item">
          {activeChartContextFixture.session}
        </span>
        <span className="dashboard-chart-context-strip__item dashboard-chart-context-strip__item--state">
          {activeChartContextFixture.sourceState}
        </span>
      </div>
    </div>
  );
}
