# Dashboard Cockpit Visual Stabilization

**Batch:** 5B  
**Date:** 2026-05-25

---

## Summary

This hotfix removes visible debug scaffolding from the production /dashboard
route. Debug/review layers are quarantined behind compile-time constants
and disabled by default.

---

## Changes

### Debug Layers Disabled by Default

In `DashboardCockpit.tsx`:

```ts
const SHOW_PANEL_SLOT_DEBUG = false;
const SHOW_CONNECTOR_LAYER = false;
const SHOW_SHELL_STATUS_LAYER = false;
const SHOW_STAGE_LABELS = false;
```

The production dashboard now renders only:
- DashboardBackgroundLayers (atmosphere)
- DashboardShellLayer (topbar, sidebar, content panels, wheel)
- DashboardChartFrame (chart console + fixture OHLC)

### Panel Slot Map — Debug Only

- `DashboardPanelSlotMap` now accepts `visible?: boolean` (default false)
- Returns null when visible is false
- Borders reduced to opacity 0.06, background to 0.03
- Labels reduced to opacity 0.3
- These never look like real panel headings

### Connector Layer — Quarantined

- SVG-13 full connector composite is NOT deleted
- It is disabled by default (SHOW_CONNECTOR_LAYER = false)
- The connector lines were visually scattered before exact calibration
- Will be re-enabled after post-chart alignment work in a future batch

### Stage Labels — Quarantined

- DashboardStageLabels.tsx remains in codebase
- Disabled by default (SHOW_STAGE_LABELS = false)
- No debug text (dimensions, route, batch) visible on /dashboard

### Shell Status Layer — Quarantined

- DashboardShellStatusLayer.tsx remains in codebase
- Disabled by default (SHOW_SHELL_STATUS_LAYER = false)
- No badge/status text appears in bottom-right of cockpit

### Central Wheel Recentered

Previous position: (460, 160, 1000×720)  
New position: (460, 65, 1000×720)

This centers the wheel behind the chart frame:
- Chart center: (960, 425)
- Wheel center: (460 + 500, 65 + 360) = (960, 425) ✓

### Chart Attribution

"Charts by TradingView Lightweight Charts" remains inside `.elceo-chart-shell`
positioned absolute bottom-right, 5px font, opacity 0.35, pointer-events none.

---

## Unchanged

- No SVG file contents modified
- No landing files modified
- No live data added
- Chart remains fixture-only normalized OHLC
- No new dependencies
- No new routes

---

## Remaining Visual Limitations

1. Connector lines need exact calibration (quarantined, not deleted)
2. Panel slot positions are estimates (debug overlay available when needed)
3. Content panels SVG may have internal elements that look like borders
   (these are part of the approved asset, not debug scaffolding)
4. Footer slots placement may need adjustment in future batch
