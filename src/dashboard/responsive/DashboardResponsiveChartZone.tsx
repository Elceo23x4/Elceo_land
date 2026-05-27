import { CentralWheel, ChartConsoleFrame } from "./dashboardResponsiveAssets";
import { ChartContainer, fixtureNormalizedOhlcData } from "../chart";

/**
 * DashboardResponsiveChartZone
 *
 * Central chart/wheel zone for the responsive dashboard.
 * - central-wheel.svg rendered as decorative background
 * - chart-console-frame.svg rendered as chart panel chrome
 * - ChartContainer with fixture OHLC data inside
 *
 * Does NOT use old board coordinates.
 * Does NOT use full-board SVG layout.
 */
export default function DashboardResponsiveChartZone() {
  return (
    <div className="dashboard-chart-zone">
      <div className="chart-zone">
        {/* Decorative wheel behind chart */}
        <div className="chart-zone-wheel" aria-hidden="true">
          <CentralWheel preserveAspectRatio="xMidYMid meet" />
        </div>

        {/* Chart console frame */}
        <div className="chart-zone-console">
          <div className="chart-zone-console-frame" aria-hidden="true">
            <ChartConsoleFrame preserveAspectRatio="none" />
          </div>

          {/* Actual chart content */}
          <div className="chart-inner">
            <ChartContainer data={fixtureNormalizedOhlcData} mode="fixture_only" />
          </div>
        </div>
      </div>
    </div>
  );
}
