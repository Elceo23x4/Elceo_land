# Dashboard RevB Restoration Note

**Batch:** 6O  
**Date:** 2026-05-26

---

## What Happened

Batch 6L introduced DashboardCustomPanelShellLayer which drew generic inline
SVG rectangles as panel frames. This was rejected because it recreated panels
generically instead of using the adjusted RevB SVG.

## Correction

- ContentPanels RevB (`elceo-svg-01-content-panels-revb.svg`) is restored as
  the official visible panel shell, rendered full-stage.
- DashboardCustomPanelShellLayer is removed from runtime rendering.
- React does NOT redraw panel borders. The SVG contains all panel frames.
- Panel content uses COCKPIT_PANEL_CONTENT_RECTS for header/body placement.

## What Remains Disabled

- SVG-06 panel borders (SHOW_SVG06_PANEL_BORDERS = false)
- Connector layer (SHOW_CONNECTOR_LAYER = false)
- Calibration overlay (SHOW_GEOMETRY_CALIBRATION = false)
- DashboardCustomPanelShellLayer (not imported in cockpit)

## No SVG Source Files Modified

The adjusted RevB SVG is used as-is. No source SVG editing occurred.
