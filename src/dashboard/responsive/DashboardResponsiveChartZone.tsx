/**
 * DashboardResponsiveChartZone.tsx
 *
 * Renders the central chart/wheel zone using exact board coordinates.
 *
 * Layers (z-index order):
 *   5  — Central wheel (decorative, behind everything)
 *   7  — Chart glass (straight-sided glass layer behind frame)
 *   8  — Chart console frame SVG
 *   10 — Chart display (ChartContainer with fixture data)
 *
 * All positioned using boardRectStyle() from dashboardResponsiveGeometry.
 * Does NOT use old board coordinates from the absolute cockpit.
 * Does NOT use full-board SVG layout.
 */

import { CentralWheel, ChartConsoleFrame } from "./dashboardResponsiveAssets";
import { ChartContainer, fixtureNormalizedOhlcData } from "../chart";
import { boardRectStyle, SHELL_RECTS } from "./dashboardResponsiveGeometry";

export default function DashboardResponsiveChartZone() {
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

      {/* Chart display — actual chart content */}
      <div
        className="dashboard-precision-chart-display"
        style={{ ...boardRectStyle(SHELL_RECTS.chartDisplay), zIndex: 10 }}
      >
        <ChartContainer data={fixtureNormalizedOhlcData} mode="fixture_only" />
      </div>
    </>
  );
}
