import { ChartConsoleFrame } from "./dashboardCockpitAssets";
import { CHART_FRAME } from "./dashboardCockpitLayout";

/**
 * Chart console frame placeholder.
 * No chart engine, no candlesticks, no fake data.
 * Blank frame ready for future Lightweight Charts integration.
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
      <div className="cockpit-chart-frame-asset">
        <ChartConsoleFrame />
      </div>
      <div className="cockpit-chart-placeholder">
        <span className="cockpit-chart-placeholder__text">
          Chart engine placeholder — Batch 3 shell only
        </span>
      </div>
    </div>
  );
}
