import { ChartConsoleFrame } from "./dashboardCockpitAssets";
import { COCKPIT_GEOMETRY } from "./dashboardCockpitGeometry";
import { ChartContainer, fixtureNormalizedOhlcData } from "../chart";

const { chartConsole } = COCKPIT_GEOMETRY;

export default function DashboardChartFrame() {
  return (
    <div
      className="cockpit-layer cockpit-layer--chart-frame elceo-cockpit-no-glow"
      style={{ position: "absolute", left: chartConsole.x, top: chartConsole.y, width: chartConsole.w, height: chartConsole.h }}
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
