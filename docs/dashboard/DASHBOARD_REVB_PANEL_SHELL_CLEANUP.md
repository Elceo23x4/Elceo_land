# Dashboard RevB Panel Shell Cleanup

**Batch:** 6I  
**Date:** 2026-05-26

---

## Official Panel Shell

The official visible panel shell is:

`src/assets/source/dashboard/shell/elceo-svg-01-content-panels-revb.svg`

This SVG (viewBox 0 0 1920 1080) is rendered full-stage. It internally
contains the RevB panel-border-system block at board position 81,83
with dimensions 1773×963. All panel frames are part of this SVG.

---

## SVG-06 Disabled for Main Cockpit

`SHOW_SVG06_PANEL_BORDERS = false`

SVG-06 panel border assets are NOT the main dashboard shell.
They would create double borders if rendered over RevB.
Preserved for future popup/special effect usage only.

---

## Panel Content Architecture

Panel content uses board-space header/body rectangles directly:

| Panel | Header (x,y,w,h) | Body (x,y,w,h) |
|-------|-------------------|-----------------|
| Directional Bias | 166, 102, 407, 35 | 131, 147, 460, 173 |
| Confidence | 166, 367, 407, 35 | 135, 412, 460, 189 |

Content is:
- Transparent (no background)
- Borderless (no frame)
- No box-shadow
- No second visible container

---

## First Two Panels Only

Only Directional Bias Summary and Confidence & Context Matrix are
populated. All other panel slots remain empty until future batches.

---

## Content Simplification

Content was intentionally reduced for visual seating:
- Short headlines
- Compact metric rows
- Brief driver labels
- Details moved into hover popovers
- Long explanations in drawer only

---

## No SVG Source Files Modified

All positioning via TypeScript geometry contract and CSS only.

---

## Connectors Remain Disabled

`SHOW_CONNECTOR_LAYER = false`

---

## Remaining Limitations

1. Content may still need micro-adjustment after visual review
2. Only 2 of 8 panels populated
3. Topbar uses isolated asset with preserveAspectRatio="none"
4. Sidebar is full-stage (no isolated variant)
5. Chart frame is fitted (737×488) inside chartConsoleBounds (737×729)

---

## Batch 6J Update

Added temporary calibration rectangles for first two panel contents.
Reduced body content area and simplified panel body content for visual seating.
Tabs removed from Confidence panel temporarily. Driver list removed from
Directional Bias body. Content constrained to max-width 365px.

---

## Next Batch Recommendation

Batch 7: Watchlist + Evidence panel content, verify content alignment
with RevB shell at production viewport sizes.
