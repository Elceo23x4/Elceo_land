# Dashboard Custom Panel Shell Contract

**Batch:** 6L  
**Date:** 2026-05-26

---

## Why Custom Panel Shell

The old ContentPanels RevB SVG is a full-stage baked file. Its internal panel
paths are fixed and cannot be resized by React coordinates. The user requires
custom panel sizes that differ from the baked SVG.

Solution: Draw panel frames using an inline SVG at exact user coordinates.

---

## Custom Panel Rects (board-space)

| Panel | x | y | w | h |
|-------|---|---|---|---|
| Directional Bias | 63 | 68 | 589 | 320 |
| Confidence | 61 | 332 | 589 | 328 |
| Watchlist | 63 | 603 | 589 | 294 |
| Evidence | 1299 | 68 | 638 | 430 |
| News/Macro | 1293 | 446 | 638 | 400 |
| Coaching | 62 | 834 | 820 | 280 |
| Market Regime | 813 | 799 | 1118 | 316 |

---

## Content Rects Unchanged

Header/body content rectangles remain at their original board-space positions.

---

## SVG-06 Remains Disabled

Not used as main shell. ContentPanels RevB also removed from visible shell.

---

## No SVG Source Files Modified

Panel frames are drawn programmatically via inline SVG paths.
