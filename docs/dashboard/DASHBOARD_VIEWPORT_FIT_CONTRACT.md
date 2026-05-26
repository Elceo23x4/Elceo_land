# Dashboard Viewport Fit Contract — Batch 7D

## Architecture: Responsive Board Model

The ELCEO dashboard uses a **responsive board model** instead of JS-driven transform scaling.

### Core Concept

- The board uses `aspect-ratio: 1920/1080` and CSS containment to fit any viewport.
- Width: `min(100vw, calc(100dvh * 1920 / 1080))`
- The board never crops — it letterboxes/pillarboxes with the dark background.
- All internal positioning uses **percentage coordinates** derived from the 1920×1080 reference.
- Typography scales via `clamp()` using container query inline-size (`cqi`).

### No Transform Scaling

The old `transform: scale()` + fixed 1920×1080px stage wrapper is removed.
The new model uses pure CSS responsive sizing.

## Geometry Source of Truth

`src/dashboard/cockpit/dashboardCockpitGeometry.ts`

- `SHELL_GEOMETRY`: topSystemBar, centralWheel, chartConsoleFrame, sidebarRail
- `PANEL_CONTENT_RECTS`: all 7 panel header/body coordinates (board-space px)
- `boardRectStyle()`: converts board-px rect to percentage inline styles

## Expected Behavior

| Viewport | Behavior |
|----------|----------|
| 1920×1080 | Full fit, no bars |
| 1600×900 | Scaled down, centered |
| 1366×768 | Scaled down, centered |
| 1280×720 | Scaled down, centered |
| 1024×768 | Letterboxed (wider aspect than 16:9) |
| Tablet landscape | Full fit, text remains readable |

## Visual Sanitization

- Panel aura/glow/shadow disabled via CSS (`display: none` + `opacity: 0`)
- `svg02a_corner_thickness_system` under chart disabled
- No SVG source files modified — CSS-only overrides

## Invariants

- ContentPanels RevB remains the only visible panel shell
- No React-drawn panel rectangles
- All coordinates from `PANEL_CONTENT_RECTS` (Batch 7D updated values)
- Fixture-only data
- No landing page changes



## Batch 7D-BuildFix

Removed stale `COCKPIT_PANEL_RECTS` references from obsolete calibration/custom shell files after the responsive board geometry rewrite. Deleted `DashboardCustomPanelShellLayer.tsx` and `dashboard.custom-panels.css`. Replaced `DashboardGeometryCalibrationOverlay.tsx` with a null stub.
