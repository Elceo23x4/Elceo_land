/**
 * DashboardResponsiveChartZone.tsx
 *
 * Renders the central chart/wheel zone using exact board coordinates.
 * R7A: Includes chart intelligence overlay with toggle controls.
 *
 * Layers (z-index order):
 *   5  — Central wheel (decorative, behind everything)
 *   6  — Chart intelligence overlay (zones, paths, annotations)
 *   7  — Chart glass (straight-sided glass layer behind frame)
 *   8  — Chart console frame SVG
 *   9  — Overlay toggle controls
 *   10 — Chart display (ChartContainer with fixture data)
 */

import { useState } from "react";
import { CentralWheel, ChartConsoleFrame } from "./dashboardResponsiveAssets";
import { ChartContainer, fixtureNormalizedOhlcData } from "../chart";
import { boardRectStyle, SHELL_RECTS } from "./dashboardResponsiveGeometry";
import DashboardChartIntelligenceOverlay from "./DashboardChartIntelligenceOverlay";

export default function DashboardResponsiveChartZone() {
  const [showZones, setShowZones] = useState(true);
  const [showLiquidity, setShowLiquidity] = useState(true);
  const [showScenario, setShowScenario] = useState(true);
  const [showNotes, setShowNotes] = useState(true);

  return (
    <>
      {/* Central wheel — decorative, behind chart */}
      <div
        className="dashboard-precision-wheel"
        style={{ ...boardRectStyle(SHELL_RECTS.centralWheel), zIndex: 5 }}
        aria-hidden="true"
      >
        <CentralWheel preserveAspectRatio="xMidYMid meet" />
      </div>

      {/* Acrylic chart glass — realistic transparent glass layer behind frame */}
      <div
        className="dashboard-precision-chart-glass"
        style={{ ...boardRectStyle(SHELL_RECTS.chartGlass), zIndex: 7 }}
        aria-hidden="true"
      />

      {/* Chart console frame SVG */}
      <div
        className="dashboard-precision-chart-frame"
        style={{ ...boardRectStyle(SHELL_RECTS.chartConsoleFrame), zIndex: 8 }}
        aria-hidden="true"
      >
        <ChartConsoleFrame preserveAspectRatio="none" />
      </div>

      {/* Chart display — actual chart content + intelligence overlay */}
      <div
        className="dashboard-precision-chart-display"
        style={{ ...boardRectStyle(SHELL_RECTS.chartDisplay), zIndex: 10 }}
      >
        <ChartContainer data={fixtureNormalizedOhlcData} mode="fixture_only" />

        {/* Intelligence overlay — zones, paths, markers, annotations, context strip */}
        <DashboardChartIntelligenceOverlay
          showZones={showZones}
          showLiquidity={showLiquidity}
          showScenario={showScenario}
          showNotes={showNotes}
        />

        {/* Overlay toggle controls — top-left inside chart frame */}
        <div className="dashboard-chart-overlay-controls">
          <button
            type="button"
            className="dashboard-chart-overlay-toggle"
            aria-pressed={showZones}
            onClick={() => setShowZones((v) => !v)}
          >
            Zones
          </button>
          <button
            type="button"
            className="dashboard-chart-overlay-toggle"
            aria-pressed={showLiquidity}
            onClick={() => setShowLiquidity((v) => !v)}
          >
            Liquidity
          </button>
          <button
            type="button"
            className="dashboard-chart-overlay-toggle"
            aria-pressed={showScenario}
            onClick={() => setShowScenario((v) => !v)}
          >
            Scenario
          </button>
          <button
            type="button"
            className="dashboard-chart-overlay-toggle"
            aria-pressed={showNotes}
            onClick={() => setShowNotes((v) => !v)}
          >
            Notes
          </button>
        </div>
      </div>
    </>
  );
}
