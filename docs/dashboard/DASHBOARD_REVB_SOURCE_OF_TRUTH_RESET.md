# Dashboard RevB Source of Truth Reset

## Summary

The uploaded RevB SVG (`src/assets/source/dashboard/shell/elceo-svg-01-content-panels-revb.svg`) is the **only visible panel shell** for the ELCEO dashboard cockpit.

## Key Decisions

1. **RevB SVG is the visible panel shell**
   - Full 1920x1080 artwork containing all panel frames with proper borders, gradients, and styling.
   - Rendered full-stage via `<ContentPanels />` in `DashboardShellLayer.tsx`.
   - React does NOT redraw panel borders.

2. **React panel redraw removed**
   - `DashboardCustomPanelShellLayer.tsx` deleted (generic inline SVG rectangles rejected).
   - `dashboard.custom-panels.css` deleted.
   - No runtime import or render of these components.

3. **SVG-06 remains disabled**
   - `SHOW_SVG06_PANEL_BORDERS = false` in `DashboardPanelBorderLayer.tsx`.
   - SVG-06 is not the main dashboard shell.

4. **Content coordinates mirror SVG invisible content blocks**
   - `COCKPIT_PANEL_CONTENT_RECTS` in `dashboardCockpitGeometry.ts` matches the invisible `<rect>` elements inside `panel_content_blocks_invisible` in the RevB SVG.
   - `DashboardPanelContentLayer.tsx` uses these coordinates for absolute positioning of panel content.

5. **Connectors remain disabled**
   - `SHOW_CONNECTOR_LAYER = false`
   - `SHOW_GEOMETRY_CALIBRATION = false`
   - `SHOW_PANEL_SLOT_DEBUG = false`
   - `SHOW_SHELL_STATUS_LAYER = false`
   - `SHOW_STAGE_LABELS = false`

6. **Only first two panels populated**
   - Directional Bias Summary (header + body)
   - Confidence & Context Matrix (header + body)
   - Remaining panels will be populated in future batches.

## Files

| File | Role |
|------|------|
| `src/assets/source/dashboard/shell/elceo-svg-01-content-panels-revb.svg` | Visible panel shell (source of truth) |
| `src/dashboard/cockpit/DashboardShellLayer.tsx` | Renders ContentPanels full-stage |
| `src/dashboard/cockpit/DashboardCockpit.tsx` | Cockpit composition (no custom panel shell) |
| `src/dashboard/cockpit/dashboardCockpitGeometry.ts` | Content placement coordinates |
| `src/dashboard/panels/DashboardPanelContentLayer.tsx` | Panel content (first two panels) |
| `src/dashboard/cockpit/DashboardPanelBorderLayer.tsx` | SVG-06 borders (dormant) |
