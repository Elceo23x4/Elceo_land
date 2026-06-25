import { ChartConsoleFrame } from "./dashboardCockpitAssets";
import { SHELL_GEOMETRY, boardRectStyle } from "./dashboardCockpitGeometry";
import { ChartContainer, fixtureNormalizedOhlcData } from "../chart";

/**
 * Chart console frame — Batch 7D
 *
 * Uses SHELL_GEOMETRY.chartConsoleFrame for percentage-based board positioning.
 * ChartConsoleFrame fills the zone. Chart candles sit inside with safe insets.
 */
const chartInnerInset = { left: 46, top: 92, right: 52, bottom: 96 };

export default function DashboardChartFrame() {
  return (
    <div
      className="cockpit-layer cockpit-layer--chart-frame"
      style={boardRectStyle(SHELL_GEOMETRY.chartConsoleFrame)}
    >
      <div className="cockpit-chart-frame-asset">
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
