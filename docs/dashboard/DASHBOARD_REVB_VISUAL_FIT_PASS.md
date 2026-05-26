# Dashboard RevB Visual Fit Pass — Batch 6R

## Summary

Corrective fixes for sidebar visibility, chart console placement, and panel surface treatment.

## Changes

### 1. Sidebar Rail — Restored Full-Stage Visibility

- **Problem (6Q):** SidebarRail was squeezed into an 86px wrapper, making the 1920×1080 SVG invisible.
- **Fix:** Restored full-stage rendering with CSS transform for slight narrowing.
- Wrapper: `.cockpit-shell-asset--full-stage.cockpit-shell-asset--sidebar`
- CSS:
  ```css
  .cockpit-shell-asset--sidebar {
    opacity: 0.88;
    transform-origin: left center;
    transform: translateX(-4px) scaleX(0.92);
  }
  ```
- Sidebar is visible, slightly narrower, and sits < 5px from left edge.
- No `preserveAspectRatio` override on SidebarRail.

### 2. Panel Surface — Correct Glow/Fill Treatment

- **Removed:** Aura (`_soft_inner_aura`), inner glow (`_inner_glow`), all `filter` effects.
- **Kept:** Controlled dark panel fill at `rgba(3,2,1,0.28)` on `_panel_fill` paths.
- **Reduced:** `#panel_fill_gradient` stops to 0.08 opacity, `#panel_aura` stops to 0.
- Panel border strokes remain fully visible.
- No SVG source file modified — CSS-only overrides.

### 3. ChartConsoleFrame Uses Full chartConsoleBounds

- **Problem (6Q):** `chartFrameVisual.y = 106` offset cancelled the coordinate change.
- **Fix:** Removed `chartFrameVisual`. ChartConsoleFrame fills entire console zone.
- Outer wrapper: `left: 622, top: 94, width: 737, height: 729`
- `ChartConsoleFrame preserveAspectRatio="none"` fills the 737×729 area.
- Chart candles inside with insets: `left: 46, top: 92, right: 52, bottom: 96`
- Resulting chart area: `639×541` pixels within the console zone.

### 4. TopSystemBarIsolated — Confirmed

- Position: `x: 18, y: 18, w: 1884, h: 52`
- `preserveAspectRatio="none"` — fills the bar width.
- No changes needed.

## Invariants Preserved

- No SVG source files modified
- No landing page files modified
- Connectors disabled (`SHOW_CONNECTOR_LAYER = false`)
- Calibration overlay disabled (`SHOW_GEOMETRY_CALIBRATION = false`)
- SVG-06 panel borders disabled (`SHOW_SVG06_PANEL_BORDERS = false`)
- DashboardCustomPanelShellLayer deleted (not in runtime)
- Only first two panels populated (Directional Bias, Confidence Matrix)

## Files Modified

| File | Change |
|------|--------|
| `src/dashboard/cockpit/DashboardShellLayer.tsx` | Sidebar restored to full-stage |
| `src/dashboard/cockpit/DashboardChartFrame.tsx` | Uses chartConsoleBounds directly, removed chartFrameVisual |
| `src/dashboard/styles/dashboard.cockpit.css` | Sidebar CSS, panel surface CSS, chart full-console CSS |
