import { useRef, useEffect } from "react";
import type { ChartEngineProps } from "./chartTypes";
import {
  elceoChartLayoutOptions,
  elceoChartGridOptions,
  elceoChartCrosshairOptions,
  elceoCandlestickOptions,
  elceoTimeScaleOptions,
  elceoPriceScaleOptions,
} from "./chartTheme";

/**
 * ChartEngine — Batch 5
 *
 * Client-side Lightweight Charts v5 wrapper.
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
    let rafId: number | null = null;

    function initChart(module: typeof import("lightweight-charts")) {
      const { createChart, CandlestickSeries } = module;
      if (!el || !el.isConnected) return;

      // Measure container using getBoundingClientRect for accuracy
      const rect = el.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width || el.clientWidth));
      const resolvedHeight = Math.max(1, Math.floor(height ?? rect.height ?? el.clientHeight));

      // If container has no real size yet, retry once on next frame
      if (width <= 1 || resolvedHeight <= 1) {
        rafId = requestAnimationFrame(() => initChart(module));
        return;
      }

      chart = createChart(el, {
        width,
        height: resolvedHeight,
        layout: elceoChartLayoutOptions,
        grid: elceoChartGridOptions,
        crosshair: elceoChartCrosshairOptions,
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
            const r = el.getBoundingClientRect();
            const w = Math.max(1, Math.floor(r.width || el.clientWidth));
            const h = Math.max(1, Math.floor(height ?? r.height ?? el.clientHeight));
            if (w > 0 && h > 0) {
              chart.applyOptions({ width: w, height: h });
            }
          }
        });
        ro.observe(el);
      }
    }

    // Dynamic import to handle SSR-like environments gracefully
    import("lightweight-charts").then((module) => {
      initChart(module);
    });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
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
