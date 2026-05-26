# Dashboard Exact Geometry and No-Glow Review

**Batch:** 6C  
**Date:** 2026-05-25

---

## User Geometry Applied

All cockpit coordinates now use exact user-provided measurements at 1920×1080.

### Top System Bar
x: 18, y: 18, w: 1884, h: 52

### Central Wheel
x: 485, y: 99, w: 978, h: 685

### Revision B Panel Border System
x: 81, y: 83, w: 1773, h: 963

### Chart Console
x: 622, y: 94, w: 737, h: 729

### Panel Coordinates (absolute to stage)

| Panel | Outer | Header | Body |
|-------|-------|--------|------|
| Directional Bias | 81,85 505×249 | 166,102 407×35 | 131,147 460×173 |
| Confidence | 81,346 505×265 | 166,367 407×35 | 135,412 460×189 |
| Watchlist | 83,622 503×223 | 166,637 407×35 | 133,686 460×151 |
| Evidence | 1322,83 529×370 | 1408,98 441×35 | 1374,147 483×294 |
| News/Macro | 1322,460 529×349 | 1395,480 454×40 | 1370,536 483×257 |
| Coaching | 81,855 738×191 | 157,878 652×29 | 126,923 689×119 |
| Market Regime | 841,829 1013×217 | 912,854 929×30 | 888,895 961×144 |

---

## Panel-Relative to Absolute Conversion

Panel outer coordinates listed relative to Revision B system (81, 83) were
converted: absoluteLeft = 81 + panelLeft, absoluteTop = 83 + panelTop.
Header/body coordinates were already absolute to 1920×1080.

---

## SVG-06 Panel Borders Restored

Panel borders from svg-06 are rendered at exact outer rectangles:
- small: directionalBias, confidence, watchlist
- medium: evidence, news/macro
- wide: coaching, marketRegime

Controlled by SHOW_SVG06_PANEL_BORDERS = true.
May create slight double-border with Revision B housing — documented for tuning.

---

## No-Glow Policy

All structural cockpit elements have glow/shadow/filter removed:
- Shell layer
- Chart frame
- Panel borders
- Panel content
- Popovers

Exceptions (untouched):
- Night sky background
- Dotted world map background

Implementation: `.elceo-cockpit-no-glow` class + CSS overrides.

---

## Sidebar

Sidebar SVG is full-stage (viewBox 0 0 1920 1080) — renders inset 0.
The SVG itself places content at the far-left edge. No repositioning needed.

---

## Connectors Remain Suspended

SHOW_CONNECTOR_LAYER = false.

---

## Remaining Limitations

1. SVG-06 borders may double with Revision B panel housing borders
2. Chart console inner inset for chart engine may need tuning (737×729 outer)
3. Only 2 of 8 panels have content — rest show borders only
4. Sidebar exact x-offset depends on SVG internal placement
5. preserveAspectRatio behavior of panel borders at non-native sizes

---

## Next Batch Recommendation

Batch 7: Watchlist + Evidence panel content, connector re-calibration
