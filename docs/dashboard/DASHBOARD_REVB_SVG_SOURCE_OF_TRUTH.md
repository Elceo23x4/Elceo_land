# Dashboard RevB SVG Source of Truth

**Batch:** 6P  
**Date:** 2026-05-26

---

## Official Panel Shell

The uploaded adjusted RevB SVG is the source of truth:

`src/assets/source/dashboard/shell/elceo-svg-01-content-panels-revb.svg`

This file contains:
- Full 1920×1080 board
- RevB panel-border-system block at translate(81, 83)
- All 7 panel shell groups with correct sizes
- Invisible header/body content placement blocks

---

## React Does NOT Redraw Panel Frames

DashboardCustomPanelShellLayer is removed from runtime.
React only positions text content inside the SVG-defined content blocks.
Panel frame chrome comes exclusively from the RevB SVG.

---

## Content Coordinates Match SVG Invisible Blocks

The geometry contract (COCKPIT_PANEL_CONTENT_RECTS) mirrors the
invisible content placement blocks embedded in the SVG:

| Panel | Header (x,y,w,h) | Body (x,y,w,h) |
|-------|-------------------|-----------------|
| Directional Bias | 166,102,407,35 | 131,147,460,173 |
| Confidence | 166,367,407,35 | 135,412,460,189 |
| Watchlist | 166,637,407,35 | 133,686,460,151 |
| Evidence | 1408,98,441,35 | 1374,147,483,294 |
| News/Macro | 1395,480,454,40 | 1370,536,483,257 |
| Coaching | 157,878,652,29 | 126,923,689,119 |
| Market Regime | 912,854,929,30 | 888,895,961,144 |

---

## What Remains Disabled

- SVG-06 main panel borders (SHOW_SVG06_PANEL_BORDERS = false)
- Connector layer (SHOW_CONNECTOR_LAYER = false)
- Calibration overlay (SHOW_GEOMETRY_CALIBRATION = false)
- DashboardCustomPanelShellLayer (not imported in cockpit)

---

## Only First Two Panels Populated

- Directional Bias Summary
- Confidence & Context Matrix

All other slots await future batches.
