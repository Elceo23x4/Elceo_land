import { ChartConsoleFrame } from "./dashboardCockpitAssets";
import { COCKPIT_GEOMETRY } from "./dashboardCockpitGeometry";
import { ChartContainer, fixtureNormalizedOhlcData } from "../chart";

const { chartConsoleBounds } = COCKPIT_GEOMETRY;

/**
 * Chart console frame — Batch 6R
 *
 * Outer wrapper uses chartConsoleBounds (622,94,737,729) — the full user chart zone.
 * ChartConsoleFrame fills the entire console area with preserveAspectRatio="none".
 * Chart candles sit inside with safe insets relative to the 737×729 console.
 */
const chartInnerInset = { left: 46, top: 92, right: 52, bottom: 96 };

export default function DashboardChartFrame() {
  return (
    <div
      className="cockpit-layer cockpit-layer--chart-frame elceo-cockpit-no-glow"
      style={{ position: "absolute", left: chartConsoleBounds.x, top: chartConsoleBounds.y, width: chartConsoleBounds.w, height: chartConsoleBounds.h }}
    >
      <div className="cockpit-chart-frame-asset cockpit-chart-frame-asset--full-console">
        <ChartConsoleFrame preserveAspectRatio="none" />
      </div>
      <div
        className="cockpit-chart-inner"
        style={{
          position: "absolute",
          left: chartInnerInset.left,
          top: chartInnerInset.top,
          width: chartConsoleBounds.w - chartInnerInset.left - chartInnerInset.right,
          height: chartConsoleBounds.h - chartInnerInset.top - chartInnerInset.bottom,
        }}
      >
        <ChartContainer data={fixtureNormalizedOhlcData} mode="fixture_only" />
      </div>
    </div>
  );
}
