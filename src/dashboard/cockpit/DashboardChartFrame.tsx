import { ChartConsoleFrame } from "./dashboardCockpitAssets";
import { COCKPIT_GEOMETRY } from "./dashboardCockpitGeometry";
import { ChartContainer, fixtureNormalizedOhlcData } from "../chart";

const { chartFrame } = COCKPIT_GEOMETRY;

/**
 * Chart console frame — Batch 6D
 *
 * Uses chartFrame (not chartConsoleBounds) to preserve native 680:450 aspect.
 * ChartConsoleFrame SVG viewBox is 680×450 — do NOT stretch to 737×729.
 */
export default function DashboardChartFrame() {
  return (
    <div
      className="cockpit-layer cockpit-layer--chart-frame elceo-cockpit-no-glow"
      style={{ position: "absolute", left: chartFrame.x, top: chartFrame.y, width: chartFrame.w, height: chartFrame.h }}
    >
      <div className="cockpit-chart-frame-asset">
        <ChartConsoleFrame />
      </div>
      <div className="cockpit-chart-inner">
        <ChartContainer data={fixtureNormalizedOhlcData} mode="fixture_only" />
      </div>
    </div>
  );
}
