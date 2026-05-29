/**
 * DashboardChartIntelligenceOverlay.tsx
 *
 * R7B: Interactive SVG overlay with selection, hover tooltips,
 * and panel linkage. Fixture-only. Market language only.
 */

import { useState, useCallback, useEffect } from "react";
import {
  chartZones,
  chartMarkers,
  chartAnnotations,
  scenarioPaths,
  activeChartContextFixture,
} from "./chartIntelligenceFixture";

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
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export default function DashboardChartIntelligenceOverlay({
  showZones,
  showLiquidity,
  showScenario,
  showNotes,
  selectedId,
  onSelect,
}: OverlayProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Escape clears selection
  useEffect(() => {
    if (!selectedId) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onSelect(null);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [selectedId, onSelect]);

  const handleClick = useCallback((id: string) => {
    onSelect(selectedId === id ? null : id);
  }, [selectedId, onSelect]);

  const isHighlighted = (id: string) => id === selectedId || id === hoveredId;

  return (
    <div className="dashboard-chart-overlay">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="dashboard-chart-overlay__svg">
        {/* ─── Zone Overlays (interactive) ─── */}
        {showZones && chartZones
          .filter((z) => z.kind !== "liquidity")
          .map((zone) => (
            <rect
              key={zone.id}
              className={`dashboard-chart-zone dashboard-chart-zone--${zone.kind}${isHighlighted(zone.id) ? " is-highlighted" : ""}${selectedId === zone.id ? " is-selected" : ""}`}
              x={zone.x1} y={zone.y1}
              width={zone.x2 - zone.x1} height={zone.y2 - zone.y1}
              fill={TONE_FILL[zone.tone]}
              stroke={TONE_STROKE[zone.tone]}
              strokeWidth={isHighlighted(zone.id) ? "0.5" : "0.25"}
              strokeDasharray={zone.kind === "structure" ? "1 0.5" : undefined}
              style={{ pointerEvents: "auto", cursor: "pointer" }}
              role="button"
              tabIndex={0}
              aria-label={`${zone.label} — ${zone.note}`}
              onClick={() => handleClick(zone.id)}
              onMouseEnter={() => setHoveredId(zone.id)}
              onMouseLeave={() => setHoveredId(null)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(zone.id); }}
            />
          ))}

        {/* ─── Liquidity Bands (interactive) ─── */}
        {showLiquidity && chartZones
          .filter((z) => z.kind === "liquidity")
          .map((zone) => (
            <rect
              key={zone.id}
              className={`dashboard-chart-zone dashboard-chart-zone--liquidity${isHighlighted(zone.id) ? " is-highlighted" : ""}${selectedId === zone.id ? " is-selected" : ""}`}
              x={zone.x1} y={zone.y1}
              width={zone.x2 - zone.x1} height={zone.y2 - zone.y1}
              fill={TONE_FILL[zone.tone]}
              stroke={TONE_STROKE[zone.tone]}
              strokeWidth={isHighlighted(zone.id) ? "0.45" : "0.2"}
              strokeDasharray="1.5 0.8"
              style={{ pointerEvents: "auto", cursor: "pointer" }}
              role="button"
              tabIndex={0}
              aria-label={`${zone.label} — ${zone.note}`}
              onClick={() => handleClick(zone.id)}
              onMouseEnter={() => setHoveredId(zone.id)}
              onMouseLeave={() => setHoveredId(null)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(zone.id); }}
            />
          ))}

        {/* ─── Scenario Paths (interactive) ─── */}
        {showScenario && scenarioPaths.map((path) => (
          <polyline
            key={path.id}
            className={`dashboard-chart-scenario-path${isHighlighted(path.id) ? " is-highlighted" : ""}${selectedId === path.id ? " is-selected" : ""}`}
            points={path.points.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke={TONE_STROKE[path.tone]}
            strokeWidth={isHighlighted(path.id) ? "0.6" : "0.35"}
            strokeDasharray="1.2 0.6"
            strokeLinecap="round" strokeLinejoin="round"
            style={{ pointerEvents: "auto", cursor: "pointer" }}
            role="button"
            tabIndex={0}
            aria-label={`${path.label} — ${path.condition}`}
            onClick={() => handleClick(path.id)}
            onMouseEnter={() => setHoveredId(path.id)}
            onMouseLeave={() => setHoveredId(null)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(path.id); }}
          />
        ))}

        {/* ─── Markers (interactive) ─── */}
        {showZones && chartMarkers.map((marker) => (
          <circle
            key={marker.id}
            className={`dashboard-chart-marker dashboard-chart-marker--${marker.kind}${isHighlighted(marker.id) ? " is-highlighted" : ""}${selectedId === marker.id ? " is-selected" : ""}`}
            cx={marker.x} cy={marker.y}
            r={isHighlighted(marker.id) ? "1.8" : "1.2"}
            fill={TONE_COLOR[marker.tone]}
            opacity={isHighlighted(marker.id) ? 1 : 0.85}
            style={{ pointerEvents: "auto", cursor: "pointer" }}
            role="button"
            tabIndex={0}
            aria-label={`${marker.label} — ${marker.note}`}
            onClick={() => handleClick(marker.id)}
            onMouseEnter={() => setHoveredId(marker.id)}
            onMouseLeave={() => setHoveredId(null)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(marker.id); }}
          />
        ))}
      </svg>

      {/* ─── Annotation Labels (interactive HTML) ─── */}
      {showNotes && chartAnnotations.map((ann) => (
        <div
          key={ann.id}
          className={`dashboard-chart-annotation dashboard-chart-annotation--${ann.tone}${isHighlighted(ann.id) ? " is-highlighted" : ""}${selectedId === ann.id ? " is-selected" : ""}`}
          style={{ left: `${ann.anchorX}%`, top: `${ann.anchorY}%` }}
          role="button"
          tabIndex={0}
          aria-label={`${ann.title} — ${ann.body}`}
          onClick={() => handleClick(ann.id)}
          onMouseEnter={() => setHoveredId(ann.id)}
          onMouseLeave={() => setHoveredId(null)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(ann.id); }}
        >
          <span className="dashboard-chart-annotation__label">{ann.title}</span>
          {hoveredId === ann.id && selectedId !== ann.id && (
            <div className="dashboard-chart-annotation__tooltip">
              <p>{ann.body}</p>
              <span className="dashboard-chart-annotation__link">→ {ann.linkedPanelLabel}</span>
            </div>
          )}
        </div>
      ))}

      {/* ─── Hover Tooltip for zones/markers/paths ─── */}
      {hoveredId && hoveredId !== selectedId && !chartAnnotations.find((a) => a.id === hoveredId) && (
        <HoverTooltip id={hoveredId} />
      )}

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

/* ─── Hover tooltip for non-annotation items ─── */
function HoverTooltip({ id }: { id: string }) {
  const zone = chartZones.find((z) => z.id === id);
  if (zone) {
    return (
      <div className="dashboard-chart-hover-tip" style={{ left: `${(zone.x1 + zone.x2) / 2}%`, top: `${zone.y1}%` }}>
        <strong>{zone.label}</strong>
        <p>{zone.note}</p>
      </div>
    );
  }
  const marker = chartMarkers.find((m) => m.id === id);
  if (marker) {
    return (
      <div className="dashboard-chart-hover-tip" style={{ left: `${marker.x}%`, top: `${marker.y}%` }}>
        <strong>{marker.label}</strong>
        <p>{marker.note}</p>
      </div>
    );
  }
  const path = scenarioPaths.find((p) => p.id === id);
  if (path) {
    const midPt = path.points[Math.floor(path.points.length / 2)];
    return (
      <div className="dashboard-chart-hover-tip" style={{ left: `${midPt.x}%`, top: `${midPt.y}%` }}>
        <strong>{path.label}</strong>
        <p>{path.condition}</p>
      </div>
    );
  }
  return null;
}
