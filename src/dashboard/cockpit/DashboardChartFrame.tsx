import { ChartConsoleFrame } from "./dashboardCockpitAssets";
import { SHELL_GEOMETRY, boardRectStyle } from "./dashboardCockpitGeometry";
import { ChartContainer, fixtureNormalizedOhlcData } from "../chart";

/**
 * Chart console frame — Batch 7D
 *
 * Uses SHELL_GEOMETRY.chartConsoleFrame for percentage-based board positioning.
 * ChartConsoleFrame fills the zone. Chart candles sit inside with safe insets.
 */
export default function DashboardChartFrame() {
  return (
    <div
      className="cockpit-layer cockpit-layer--chart-frame"
      style={boardRectStyle(SHELL_GEOMETRY.chartConsoleFrame)}
    >
      <div className="cockpit-chart-frame-asset">
        <ChartConsoleFrame preserveAspectRatio="none" />
      </div>
      <div className="cockpit-chart-inner">
        <ChartContainer data={fixtureNormalizedOhlcData} mode="fixture_only" />
      </div>
    </div>
  );
}
