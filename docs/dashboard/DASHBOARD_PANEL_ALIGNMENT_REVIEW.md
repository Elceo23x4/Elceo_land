# Dashboard Panel Alignment Review

**Batch:** 6A  
**Date:** 2026-05-25

---

## Reason for Inner Safe Areas

Raw PANEL_SLOTS coordinates describe the outer boundary of SVG panel frames.
The frames have chrome, corners, and decorative elements. Content placed at
outer bounds collides with panel borders and appears outside the usable area.

Inner safe areas (insets) push content below top ornaments, away from corners.

---

## Panel Insets

### directional-bias-summary
- Left: 22px, Top: 28px, Right: 22px, Bottom: 24px
- Content area: 361 x 198 (from outer 405 x 250)

### confidence-context-matrix
- Left: 22px, Top: 30px, Right: 22px, Bottom: 24px
- Content area: 361 x 176 (from outer 405 x 230)

---

## Changes Made

- panelSlotHelpers.ts: added getPanelSlotInnerStyle() with calibrated insets
- DashboardPanelContentLayer.tsx: uses inner style instead of raw slot bounds
- PanelFrame.tsx: density="ultra", no border/background, pure content compositor
- DirectionalBiasPanel.tsx: driver summaries shortened, fits without scroll
- ConfidenceContextPanel.tsx: tabs below header, compact per tab
- dashboard.panels.css: no visible borders/backgrounds on PanelFrame, ultra-compact

---

## SVG Files Untouched

Content alignment achieved purely through CSS insets and positioning.

## Connector Layer Remains Disabled

SHOW_CONNECTOR_LAYER = false. Quarantined until post-panel calibration.

## Remaining Limitations

1. Inset values are visual estimates — may need +/- 4px
2. Popover may clip near right edge of left-column panels
3. DetailDrawer renders as full-viewport overlay
4. Only 2 of 8 panels populated
5. Optimized for 1920x1080 — very small text at lower resolutions
