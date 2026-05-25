import { useRef, useEffect } from "react";
import type { ChartEngineProps } from "./chartTypes";
import {
  elceoChartLayoutOptions,
  elceoCandlestickOptions,
  elceoTimeScaleOptions,
  elceoPriceScaleOptions,
} from "./chartTheme";

/**
 * ChartEngine — Batch 5
 *
 * Client-side Lightweight Charts wrapper.
 * - Creates chart on mount
 * - Observes container resize
 * - Cleans up on unmount
 * - Does not fetch data
 * - Does not create timers or simulate live updates
 */
export default function ChartEngine({ data, height, className }: ChartEngineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof import("lightweight-charts").createChart> | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (data.length === 0) return;

    let chart: ReturnType<typeof import("lightweight-charts").createChart> | null = null;
    let ro: ResizeObserver | null = null;

    // Dynamic import to handle SSR-like environments gracefully
    import("lightweight-charts").then(({ createChart, CandlestickSeries }) => {
      if (!el.isConnected) return;

      chart = createChart(el, {
        width: el.clientWidth,
        height: height ?? el.clientHeight,
        layout: elceoChartLayoutOptions,
        grid: elceoChartLayoutOptions.grid,
        crosshair: elceoChartLayoutOptions.crosshair,
        timeScale: elceoTimeScaleOptions,
        rightPriceScale: elceoPriceScaleOptions,
      });

      const series = chart.addSeries(CandlestickSeries, elceoCandlestickOptions);
      series.setData(data as Parameters<typeof series.setData>[0]);
      chart.timeScale().fitContent();

      chartRef.current = chart;

      // Resize observer
      if (typeof ResizeObserver !== "undefined") {
        ro = new ResizeObserver(() => {
          if (chart && el.isConnected) {
            chart.applyOptions({
              width: el.clientWidth,
              height: height ?? el.clientHeight,
            });
          }
        });
        ro.observe(el);
      }
    });

    return () => {
      if (ro) ro.disconnect();
      if (chart) {
        chart.remove();
        chartRef.current = null;
      }
    };
  }, [data, height]);

  if (data.length === 0) {
    return (
      <div className={`elceo-chart-empty ${className ?? ""}`}>
        <span>No chart data available</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`elceo-chart-surface ${className ?? ""}`}
      style={{ width: "100%", height: height ?? "100%" }}
    />
  );
}
