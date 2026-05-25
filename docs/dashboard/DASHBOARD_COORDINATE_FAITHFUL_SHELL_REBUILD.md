# Dashboard Coordinate-Faithful Shell Rebuild

**Batch:** 6E  
**Date:** 2026-05-25

---

## Why ContentPanels Rev-B Was Removed

ContentPanels Rev-B (viewBox 0 0 1920 1080) is a full-stage SVG with
baked-in internal element positioning. While it produced a clean visual,
it prevented the dashboard from obeying the user's explicit coordinates.

The user confirmed: "it looks clean but not following my coordinates."

Solution: Remove ContentPanels Rev-B as the visible shell and replace it
with SVG-06 panel borders placed at exact user coordinates.

---

## TopBar: Isolated Asset Found and Used

Asset: `elceo-svg-05-top-system-bar-isolated-empty.svg`  
ViewBox: `0 0 1920 120`

This IS an isolated asset (not full-stage 1920×1080).
It is placed at the user's exact rectangle:
- left: 18, top: 18, width: 1884, height: 52

The SVG's native height is 120px, so it is rendered into a 52px-tall
container. The SVG scales down via its viewBox — no distortion because
it's designed as a wide bar element.

---

## Sidebar: No Isolated Variant Exists

Both sidebar assets have viewBox `0 0 1920 1080` (full-stage).
No isolated sidebar SVG was provided.

Current treatment: Rendered full-stage. The SVG internally draws sidebar
content at the far-left edge. This means the sidebar stays far-left by
design but does not follow an explicit x/y/w/h rectangle.

Limitation: Cannot apply exact sidebar coordinates without an isolated asset.

---

## SVG-06 Panel Borders: Now Primary Panel Shell

`SHOW_SVG06_PANEL_BORDERS = true`

These are now the ONLY visible panel frame system:
- small: directionalBias (81,85,505×249), confidence (81,346,505×265), watchlist (83,622,503×223)
- medium: evidence (1322,83,529×370), news (1322,460,529×349)
- wide: coaching (81,855,738×191), marketRegime (841,829,1013×217)

No ContentPanels Rev-B behind them — no double borders.

---

## Central Wheel

Isolated (viewBox 0 0 1000 720), placed at:
x: 485, y: 99, w: 978, h: 685

---

## Chart Frame

Isolated (viewBox 0 0 680 450), placed at:
x: 622, y: 200, w: 737, h: 488

chartConsoleBounds (622,94,737,729) retained in geometry for reference only.

---

## Panel Content

Two panels populated (Directional Bias, Confidence & Context).
Content renders in exact header/body absolute rects.
No border, no background, no frame — transparent over SVG-06 borders.

---

## Connectors Remain Disabled

SHOW_CONNECTOR_LAYER = false

---

## No SVG Source Files Modified

All alignment achieved through asset selection and CSS positioning only.

---

## Remaining Limitations

1. Sidebar has no isolated asset — remains full-stage
2. TopBar isolated asset (1920×120) scaled into 52px height — may lose fine detail
3. SVG-06 panel borders may not perfectly match user's exact panel chrome design
4. Only 2 of 8 panels have content
5. Footer area has no visible shell element currently
