# Dashboard Geometry Calibration Overlay

**Batch:** 6G  
**Date:** 2026-05-26

---

## Why This Overlay Was Added

The coordinate geometry contract exists in TypeScript but the visual preview
could not confirm whether the measured rectangles align with the visible
SVG panel frames. This overlay draws the exact user-provided rectangles
on top of the rendered cockpit so we can visually verify alignment.

---

## Overlay Is Temporary

`SHOW_GEOMETRY_CALIBRATION = true` is set for this review pass only.
It must be turned OFF (set to false) before final production merge.

---

## TopBar Switched to Isolated Asset

Asset: `elceo-svg-05-top-system-bar-isolated-empty.svg`  
ViewBox: `0 0 1920 120`

Placed at user rect: left 18, top 18, width 1884, height 52.

Uses `preserveAspectRatio="none"` to force the SVG to fill the exact
rectangle without maintaining its native 1920:120 aspect ratio.

This is intentional — the user's coordinate system says the topbar
occupies exactly 1884×52 at that position.

---

## ContentPanels RevB Remains Full-Stage

Still the primary panel housing. The geometry overlay draws on top
of it to show whether panel rects align with the SVG frames.

---

## SVG-06 Remains Disabled

`SHOW_SVG06_PANEL_BORDERS = false`

---

## Overlay Color Legend

| Color | Style | Element |
|-------|-------|---------|
| Cyan (#00bcd4) | Dashed | RevB panel-border-system outline |
| Cyan (#00bcd4) | Solid | TopBar rect |
| Orange (#ff6a00) | Dashed | Central wheel |
| Purple (#9c27b0) | Dashed | Chart console bounds |
| Red (#ff445c) | Solid | Chart frame (fitted) |
| Amber (#ffbf4a) | Solid | Panel outer rects |
| Green (#32e66a) | Solid | Panel header rects |
| White/Gray (#d8dee7) | Solid | Panel body rects |

---

## Next Step

After visual review:
1. Compare overlay rects to visible SVG frame positions
2. If aligned: turn off overlay, proceed to next batch
3. If misaligned: adjust geometry values by measured offset
4. Do NOT adjust the SVG files — only adjust the TypeScript geometry
