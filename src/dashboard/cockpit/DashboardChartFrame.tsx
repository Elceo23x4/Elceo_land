import { ChartConsoleFrame } from "./dashboardCockpitAssets";
import { CHART_FRAME } from "./dashboardCockpitLayout";
import { ChartContainer, fixtureNormalizedOhlcData } from "../chart";

/**
 * Chart console frame — Batch 5
 * Renders ChartContainer with fixture OHLC data inside the SVG frame.
 * The SVG chart frame border remains visible around the chart.
 */
export default function DashboardChartFrame() {
  return (
    <div
      className="cockpit-layer cockpit-layer--chart-frame"
      style={{
        position: "absolute",
        left: CHART_FRAME.x,
        top: CHART_FRAME.y,
        width: CHART_FRAME.w,
        height: CHART_FRAME.h,
      }}
    >
      {/* SVG chart frame border — remains visible */}
      <div className="cockpit-chart-frame-asset">
        <ChartConsoleFrame />
      </div>

      {/* Chart engine inside the frame, inset from borders */}
      <div className="cockpit-chart-inner">
        <ChartContainer
          data={fixtureNormalizedOhlcData}
          mode="fixture_only"
        />
      </div>
    </div>
  );
}
