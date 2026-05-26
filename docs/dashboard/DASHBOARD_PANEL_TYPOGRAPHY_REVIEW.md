# Dashboard Panel Typography Review

**Batch:** 6B  
**Date:** 2026-05-25

---

## Why Typography Was Increased

Batch 6A reduced panel text to 4.5–6px which was unreadable at 1920×1080
after viewport scaling. Batch 6B restores readable sizes while keeping
content compact enough to fit inside SVG panel inner areas.

---

## Final Font-Size Targets

| Element | Size |
|---------|------|
| Eyebrow | 7px |
| Panel title | 10px |
| Headline | 13px |
| Mini grid label | 7px |
| Mini grid value | 9px |
| Driver row label | 8px |
| Driver row summary | 7px |
| Watch condition | 7.5px |
| Panel summary | 7.5px |
| Caveat | 6px |
| Detail button | 6.5px |
| Workspace tab | 7px |
| Status list item | 8px |
| Notice | 7px |
| Popover trigger | 7px |
| Popover title | 8px |
| Popover summary | 7px |

---

## Final Safe-Area Insets

| Panel | Left | Top | Right | Bottom |
|-------|------|-----|-------|--------|
| directional-bias-summary | 28 | 42 | 26 | 22 |
| confidence-context-matrix | 28 | 44 | 26 | 22 |

Top insets increased from 28/30 to 42/44 to clear SVG panel chrome.

---

## Popover Treatment

- Glow removed: `box-shadow: none`
- Background: `rgba(5, 3, 2, 0.82)` (slightly transparent dark)
- Border: `rgba(255, 106, 0, 0.22)` (subtle amber)
- Backdrop-filter: `blur(6px)` (graceful degradation)
- Placement: changed to `side="bottom"` for both panels

---

## Connectors Remain Suspended

SHOW_CONNECTOR_LAYER = false.

## No SVG Changes

All alignment via CSS insets and positioning only.

## Remaining Limitations

1. Inset values are calibrated for the specific SVG panel design — if SVGs change, insets need recalibration
2. 13px headline may need reduction if future content is longer
3. Popover bottom placement may extend below panel — acceptable because overflow is visible
4. Only 2 of 8 panels populated
