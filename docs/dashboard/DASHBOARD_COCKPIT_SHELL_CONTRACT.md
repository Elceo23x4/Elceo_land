# Dashboard Cockpit Shell Contract

**Batch:** 3  
**Date:** 2026-05-25

---

## 1. Purpose

Batch 3 replaces the temporary /dashboard placeholder with the first real
ELCEO dashboard cockpit shell composition using approved SVG assets from
Batch 1 and the scoped design system from Batch 2.

This is the **visual shell foundation only** — no chart engine, no real
data, no final intelligence panels.

---

## 2. 1920×1080 Logical Stage Model

The cockpit uses a fixed 1920×1080 logical coordinate system. All SVG
assets, panel slots, and shell elements are positioned in this space.

The stage is scaled responsively to fit the browser viewport while
preserving 16:9 aspect ratio. Black letterbox/pillarbox is acceptable.

---

## 3. Responsive Scaling Approach

- `useCockpitScale` hook observes the viewport container via ResizeObserver
- Calculates: `scale = min(viewportWidth / 1920, viewportHeight / 1080)`
- Applies `transform: scale(scale)` with `transform-origin: top left`
- Stage remains centered within the viewport via flexbox
- No horizontal/vertical page scroll for normal desktop view

---

## 4. Layer Order (bottom to top)

| Z-Index | Layer | Purpose |
|---------|-------|---------|
| 1 | BackgroundLayers | Night sky, world map, atmosphere |
| 10 | ShellLayer | Top bar, sidebar, content panels, wheel |
| 15 | PanelSlotMap | Semantic panel boundaries |
| 25 | ChartFrame | Empty chart console frame |
| 40 | ConnectorLayer | SVG-13 connector lines |
| 50 | ShellStatusLayer | Plan/provider/persistence badges |
| 50 | StageLabels | Internal review labels |

---

## 5. Assets Imported

**Background:**
- elceo-svg-16-revb-clear-night-sky.svg (sky)
- elceo-svg-15-revb-dotted-world-map.svg (maps)
- elceo-svg-10-background-base-texture.svg (partial)
- elceo-svg-10-horizontal-light-streaks.svg (partial)
- elceo-svg-10-scan-arcs.svg (partial)
- elceo-svg-10-particle-glow-field.svg (partial)

**Shell:**
- elceo-svg-05-top-system-bar-full-desktop.svg
- elceo-svg-04-sidebar-rail-complete-approved.svg
- elceo-svg-01-content-panels-revb.svg
- elceo-svg-01-central-wheel-v1-isolated.svg
- elceo-svg-02-footer-slots.svg

**Chart:**
- elceo-svg-02-chart-console-frame.svg

**Connectors:**
- elceo-svg-13-full-connector-composite.svg

---

## 6. Slot Map Created

Eight semantic panel slots defined in `dashboardCockpitLayout.ts`:

1. Directional Bias Summary
2. Confidence & Context Matrix
3. Watchlist
4. Evidence Stack / Reasoning Engine
5. News & Macro Intelligence
6. Coaching Insights
7. Market Regime / Cross-Asset Pulse
8. Central Chart Console

---

## 7. What Is Intentionally Placeholder

- Chart console area shows "Chart engine placeholder — Batch 3 shell only"
- Panel slots show internal labels only (no panel content)
- Status badges show fixture/preview state

---

## 8. What Is Not Live

- No live market data
- No real provider connections
- No production persistence
- No live notifications
- No authenticated sessions
- Backend guards remain source of truth

---

## 9. What Must Not Be Modified in Later Batches

- SVG asset file contents (no path editing, no optimization)
- Landing page files
- The 1920×1080 stage model (coordinate system is canonical)
- Scoped CSS variable names in dashboard.tokens.css

---

## 10. Next Batch Recommendation

Batch 4 should focus on:
- Lightweight Charts integration in the chart console frame
- First fixture data connection for chart display
- MetricTile integration in panel slots
- Panel workspace instances for Macro Intelligence and Directional Bias

---

## Explicit Confirmations

- No chart engine yet
- No real data yet
- No final intelligence panels yet
- No SVG visual contents were edited
- SVG-10 remains partial/revisit (used at very low opacity)
- SVG-11 is not used for desktop cockpit in this batch
- SVG-12 remains pending/missing
