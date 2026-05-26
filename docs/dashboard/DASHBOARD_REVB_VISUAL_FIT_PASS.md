# Dashboard RevB Visual Fit Pass — Batch 6Q

## Summary

Four surgical visual fixes applied to the dashboard cockpit without modifying SVG source files, landing pages, or panel content.

## Changes

### 1. Sidebar Rail — Width Reduced, Left Spacing < 5px

- Sidebar changed from full-stage rendering to isolated fit wrapper.
- New wrapper class: `.cockpit-shell-asset--sidebar-rail-fit`
- Position: `left: 2px`, `top: 104px`, `width: 86px`, `height: 830px`
- `preserveAspectRatio="xMinYMid meet"` preserves icon/rail fidelity.
- Left edge spacing is 2px (< 5px requirement met).

### 2. Panel Internal Glow/Fill Reduced (CSS Only)

- CSS overrides target SVG elements inside `.cockpit-shell-asset--content-panels`:
  - `[id*="_fill"]` → opacity 0.04
  - `[id*="_aura"]` → opacity 0.04
  - `[id*="inner_glow"]` → opacity 0.04
  - `[id*="panel_fill_gradient"]` stop-opacity → 0.02
- Panel border strokes remain fully visible.
- No SVG source file modified.

### 3. ChartConsoleFrame Uses chartConsoleBounds

- Outer `DashboardChartFrame` wrapper now uses `chartConsoleBounds`:
  - `x: 622, y: 94, w: 737, h: 729`
- Inner `chartFrameVisual` positions the ChartConsoleFrame SVG (680×450 viewBox) at:
  - `x: 0, y: 106, w: 737, h: 488` (relative inside chartConsoleBounds)
- Chart candles remain fitted inside ChartConsoleFrame via computed insets.
- No distortion of the 680×450 SVG.

### 4. TopSystemBarIsolated Confirmed

- Already using `COCKPIT_GEOMETRY.topSystemBar`: `x: 18, y: 18, w: 1884, h: 52`
- `preserveAspectRatio="none"` fills the full bar width.
- No change was needed.

## Invariants Preserved

- No SVG source files modified
- No landing page files modified
- Connectors remain disabled (`SHOW_CONNECTOR_LAYER = false`)
- Calibration overlay disabled (`SHOW_GEOMETRY_CALIBRATION = false`)
- SVG-06 panel borders disabled (`SHOW_SVG06_PANEL_BORDERS = false`)
- DashboardCustomPanelShellLayer deleted (not in runtime)
- Only first two panels populated (Directional Bias, Confidence Matrix)

## Files Modified

| File | Change |
|------|--------|
| `src/dashboard/cockpit/DashboardShellLayer.tsx` | Sidebar wrapper changed to fit class |
| `src/dashboard/cockpit/DashboardChartFrame.tsx` | Outer uses chartConsoleBounds, inner uses chartFrameVisual |
| `src/dashboard/styles/dashboard.cockpit.css` | Sidebar fit CSS + panel glow/fill reduction CSS |
