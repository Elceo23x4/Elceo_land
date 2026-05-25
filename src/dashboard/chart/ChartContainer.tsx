import ChartEngine from "./ChartEngine";
import type { ChartEngineProps } from "./chartTypes";

/**
 * ChartContainer — Batch 5
 *
 * Wraps ChartEngine with status strip and fixture notice.
 * Fits inside the chart console frame.
 */
export default function ChartContainer(props: ChartEngineProps) {
  return (
    <div className="elceo-chart-shell">
      <div className="elceo-chart-status">
        <span className="elceo-chart-status__label">Fixture OHLC</span>
        <span className="elceo-chart-status__badge">not live</span>
        <span className="elceo-chart-status__notice">
          Fixture-only chart. No provider connection is active.
        </span>
      </div>
      <div className="elceo-chart-body">
        <ChartEngine {...props} />
      </div>
      <div className="elceo-chart-attribution">
        Charts by TradingView Lightweight Charts
      </div>
    </div>
  );
}
