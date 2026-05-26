import { ChartConsoleFrame } from "./dashboardCockpitAssets";
import { COCKPIT_GEOMETRY } from "./dashboardCockpitGeometry";
import { ChartContainer, fixtureNormalizedOhlcData } from "../chart";

const { chartConsoleBounds } = COCKPIT_GEOMETRY;

/**
 * Chart console frame — Batch 6Q
 *
 * Outer wrapper uses chartConsoleBounds (622,94,737,729) — the full user chart zone.
 * Inner chartFrameVisual positions the ChartConsoleFrame SVG (680×450 viewBox)
 * within the console bounds so candles remain fitted inside.
 */
const chartFrameVisual = { x: 0, y: 106, w: 737, h: 488 };

export default function DashboardChartFrame() {
  return (
    <div
      className="cockpit-layer cockpit-layer--chart-frame elceo-cockpit-no-glow"
      style={{ position: "absolute", left: chartConsoleBounds.x, top: chartConsoleBounds.y, width: chartConsoleBounds.w, height: chartConsoleBounds.h }}
    >
      <div className="cockpit-chart-frame-asset" style={{ position: "absolute", left: chartFrameVisual.x, top: chartFrameVisual.y, width: chartFrameVisual.w, height: chartFrameVisual.h }}>
        <ChartConsoleFrame />
      </div>
      <div className="cockpit-chart-inner" style={{ position: "absolute", left: chartFrameVisual.x + 38, top: chartFrameVisual.y + 42, width: chartFrameVisual.w - 80, height: chartFrameVisual.h - 88 }}>
        <ChartContainer data={fixtureNormalizedOhlcData} mode="fixture_only" />
      </div>
    </div>
  );
}
