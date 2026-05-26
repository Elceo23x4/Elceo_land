# Dashboard Geometry Reset Review

**Batch:** 6D  
**Date:** 2026-05-25

---

## Problem

Batch 6C applied user geometry but incorrectly:
- Full-stage SVGs (1920×1080) were squeezed into small isolated rectangles
- SVG-06 panel borders were stacked on top of ContentPanels Rev-B housing
- ChartConsoleFrame was stretched to 737×729 despite native 680×450 viewBox
- Double-border noise made the cockpit visually messy

---

## Fixes Applied

### 1. SVG-06 Panel Borders Disabled

`SHOW_SVG06_PANEL_BORDERS = false`

Reason: ContentPanels Rev-B (full-stage, 1920×1080) already contains all
panel housing chrome. Adding SVG-06 borders on top creates double borders.
SVG-06 component preserved for future calibration but not rendered.

### 2. Full-Stage SVGs Rendered Full-Stage

| Asset | ViewBox | Treatment |
|-------|---------|-----------|
| TopSystemBar (full) | 0 0 1920 1080 | Full-stage inset 0 |
| SidebarRail | 0 0 1920 1080 | Full-stage inset 0 (far-left) |
| ContentPanels Rev-B | 0 0 1920 1080 | Full-stage inset 0 |
| Connectors (disabled) | 0 0 1920 1080 | Would be full-stage |

These SVGs draw their elements within their own coordinate system.
Squeezing them into smaller wrappers distorts them.

### 3. Chart Console Split

User provided chartConsole: 622,94,737,729 — this is the full center zone.

ChartConsoleFrame native viewBox: 680×450 (aspect ~1.51:1).

Stretching it to 737×729 (aspect ~1.01:1) distorts it vertically.

Solution:
- `chartConsoleBounds`: 622,94,737,729 (user's full zone, for reference)
- `chartFrame`: 622,200,737,488 (preserves aspect ratio within bounds)

### 4. TopBar Treatment

TopSystemBar full-desktop has viewBox 0 0 1920 1080 — it IS full-stage.
The SVG internally draws the topbar at its correct position.
Rendering it full-stage is correct; squeezing to 1884×52 distorts it.

### 5. Sidebar

SidebarRail has viewBox 0 0 1920 1080 — full-stage.
The SVG draws sidebar content at the far-left edge internally.
Rendered full-stage — stays far-left by design.

### 6. Central Wheel

viewBox: 0 0 1000 720 (isolated). Placed at user coordinates:
x: 485, y: 99, w: 978, h: 685

---

## Only One Panel-Frame System Visible

ContentPanels Rev-B provides all panel housing.
SVG-06 borders are disabled to prevent double frames.
Only one structural layer defines panel borders.

---

## Panel Content

Two panels remain populated (header + body regions from geometry):
- Directional Bias Summary
- Confidence & Context Matrix

Content has no border/background — sits transparently over the SVG housing.

---

## No-Glow

Structural cockpit elements retain `.elceo-cockpit-no-glow`.
World map and night sky background excluded from no-glow removal.

---

## Connectors Remain Disabled

`SHOW_CONNECTOR_LAYER = false`

---

## Remaining Limitations

1. TopBar renders full-stage — exact 18,18,1884,52 rectangle requires an isolated asset
2. Chart frame y:200 is estimated — may need ±20px
3. Only 2 of 8 panels have content
4. SVG-06 borders need separate calibration pass if enabled later
5. Footer slots removed from shell (were poorly positioned)

---

## Next Batch Recommendation

Batch 7: Watchlist + Evidence panel content, visual review of chart Y position
