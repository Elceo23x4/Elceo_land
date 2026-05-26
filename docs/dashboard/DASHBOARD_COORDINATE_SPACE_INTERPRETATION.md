# Dashboard Coordinate-Space Interpretation

**Batch:** 6F  
**Date:** 2026-05-26

---

## Two Coordinate Spaces

### A. Board Space (absolute 1920×1080)

Used by:
- Top system bar: 18, 18, 1884×52
- Central wheel: 485, 99, 978×685
- Chart console bounds: 622, 94, 737×729
- Chart frame (fitted): 622, 200, 737×488
- Sidebar (full-stage, far-left by SVG design)
- All panel **header** and **body** content rectangles

### B. RevB Panel-System Local Space

Origin: board position (81, 83)
Size: 1773×963

Used ONLY for panel **outer** rectangles.

Conversion: `absoluteX = 81 + localX`, `absoluteY = 83 + localY`

---

## ContentPanels RevB = Primary Panel Housing

`elceo-svg-01-content-panels-revb.svg` (viewBox 0 0 1920 1080) is rendered
full-stage. It internally contains the RevB panel-border-system block at
board position 81,83. This provides all visible panel chrome/borders.

SVG-06 panel borders are DISABLED (`SHOW_SVG06_PANEL_BORDERS = false`).
They would create double borders if stacked on RevB.

---

## Panel Coordinates

| Panel | Local to RevB | Absolute Board Outer | Header (board) | Body (board) |
|-------|--------------|---------------------|----------------|--------------|
| Directional Bias | 0,2 505×249 | 81,85 505×249 | 166,102 407×35 | 131,147 460×173 |
| Confidence | 0,263 505×265 | 81,346 505×265 | 166,367 407×35 | 135,412 460×189 |
| Watchlist | 2,539 503×223 | 83,622 503×223 | 166,637 407×35 | 133,686 460×151 |
| Evidence | 1241,0 529×370 | 1322,83 529×370 | 1408,98 441×35 | 1374,147 483×294 |
| News/Macro | 1241,377 529×349 | 1322,460 529×349 | 1395,480 454×40 | 1370,536 483×257 |
| Coaching | 0,772 738×191 | 81,855 738×191 | 157,878 652×29 | 126,923 689×119 |
| Market Regime | 760,746 1013×217 | 841,829 1013×217 | 912,854 929×30 | 888,895 961×144 |

---

## TopBar

Full-stage SVG (viewBox 0 0 1920 1080). Draws topbar internally at its
correct board position. Rendered full-stage — NOT squeezed into 1884×52.

## Sidebar

Full-stage SVG (viewBox 0 0 1920 1080). No isolated variant.
Draws at far-left by SVG internal design.

## Connectors Remain Disabled

SHOW_CONNECTOR_LAYER = false

## No SVG Source Files Modified

All coordinate interpretation achieved through TypeScript geometry contract
and CSS positioning only.
