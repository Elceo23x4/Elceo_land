# Dashboard Chart Engine Contract

**Batch:** 5  
**Date:** 2026-05-25

---

## 1. Purpose

Batch 5 integrates Lightweight Charts inside the existing central chart
console frame, using fixture-only normalized OHLC data. This creates a
visible candlestick chart within the approved dashboard shell.

---

## 2. Why Lightweight Charts

Lightweight Charts (by TradingView) provides:
- Small bundle size (~45KB gzipped)
- Canvas-based high-performance rendering
- Candlestick, line, area, histogram series types
- Resize-aware API
- No external runtime dependencies
- MIT licensed

It was chosen because ELCEO needs a professional-grade financial chart
that integrates cleanly with the existing React/TypeScript/Vite pipeline.

---

## 3. Fixture-Only Normalized OHLC Rule

- Data is deterministic, locally stored
- Scale is normalized around 100 (not real asset prices)
- No real market data is used
- No external fetching occurs
- No timers or simulated live updates
- Data is named `fixtureNormalizedOhlcData` to prevent confusion
- A visible "Fixture OHLC — not live" badge is displayed

---

## 4. No Live Data Rule

- No fetch(), axios, WebSocket, or EventSource calls
- No provider adapters
- No streaming data
- No interval-based updates
- The chart displays static fixture bars only

---

## 5. No Trading Instruction Language

The chart and its surrounding UI must not contain:
- buy, sell, hold
- entry, target, stop loss
- guaranteed, profit, risk-free
- signal to enter
- prediction certainty

Neutral terms only: fixture, normalized, candlestick structure, context.

---

## 6. Chart Integration Position

The chart sits inside `DashboardChartFrame.tsx`:
- The SVG chart frame border (`elceo-svg-02-chart-console-frame.svg`)
  remains visible as the outer frame
- The chart engine renders in `.cockpit-chart-inner` which is inset
  from the frame borders (left: 38px, right: 42px, top: 42px, bottom: 46px)
- This ensures the HUD frame corners/borders remain visible around the chart

---

## 7. Cleanup and Resize Behavior

- Chart is created on mount via dynamic import
- ResizeObserver adjusts chart dimensions on container resize
- On unmount, `chart.remove()` is called and ResizeObserver disconnects
- No memory leaks from orphaned charts

---

## 8. What Is Intentionally Not Done

- No live data connection
- No real asset labels (no XAU/USD, BTC, etc.)
- No chart overlays from svg-03 yet
- No indicators or technical analysis tools
- No chart interaction handlers beyond default crosshair
- No panel data integration
- No time-range selectors
- No chart type switching

---

## 9. Next Batch Recommendation

Batch 6 should focus on:
- First panel slot content integration (e.g., MetricTile in Directional Bias)
- Potential chart overlay from svg-03 (zones, markers)
- Time-range controls for chart
- Panel workspace instances for evidence or macro panels
