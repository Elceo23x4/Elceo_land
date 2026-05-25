# Dashboard Cockpit Alignment Review

**Batch:** 4  
**Date:** 2026-05-25

---

## 1. What Was Reviewed

- Stage viewport centering and scaling behavior
- SVG viewBox attributes of all 13 imported shell/background/connector assets
- Shell layer element sizing (full-stage vs isolated)
- Background layer vertical fit (1920×760 assets within 1080 stage)
- Panel slot positioning relative to shell frame
- Connector overlay alignment
- Opacity balance across all layers
- Internal review label subtlety

---

## 2. Alignment Changes Made

### Viewport Centering Fix
- Added `cockpit-stage-wrapper` div sized to `STAGE_W × scale` by `STAGE_H × scale`
- This ensures the scaled stage is properly centered by flexbox
- Previously, `transform-origin: top left` caused a visual offset because flexbox centered the unscaled 1920px box

### Full-Stage vs Isolated Asset Classification

| Asset | viewBox | Treatment |
|-------|---------|-----------|
| TopSystemBar | 0 0 1920 1080 | Full-stage (inset 0) |
| SidebarRail | 0 0 1920 1080 | Full-stage (inset 0) |
| ContentPanels | 0 0 1920 1080 | Full-stage (inset 0) |
| Connectors | 0 0 1920 1080 | Full-stage (inset 0) |
| CentralWheel | 0 0 1000 720 | Isolated (460, 160, 1000×720) |
| FooterSlots | 0 330 680 120 | Isolated (620, 950, 680×120) |
| ChartConsoleFrame | 0 0 680 450 | Isolated (620, 200, 680×450) |
| NightSky | 0 0 1920 760 | Full-width, centered vertically (top: 160px) |
| WorldMap | 0 0 1920 760 | Full-width, centered vertically (top: 160px) |
| BackgroundBaseTexture | 0 0 1920 1080 | Full-stage |
| HorizontalLightStreaks | 0 0 1920 1080 | Full-stage |
| ScanArcs | 0 0 1920 1080 | Full-stage |
| ParticleGlowField | 0 0 1920 1080 | Full-stage |

### Key Sizing Corrections
- **TopSystemBar**: Was constrained to 1920×72px (squished 1080-tall SVG). Now renders full-stage inset 0.
- **SidebarRail**: Was constrained to 90×840px (squished 1080-tall SVG). Now renders full-stage inset 0.
- **FooterSlots**: Was stretched full-width at bottom. Now correctly placed at native 680×120 size.
- **CentralWheel**: Was placed at (480, 70) with 960×720. Now at (460, 160) with native 1000×720.
- **ChartFrame**: Was 700×480. Now matches native viewBox 680×450.
- **NightSky/WorldMap**: Were stretched to 1920×1080. Now correctly sized at 1920×760, centered vertically.

### Opacity Adjustments
| Layer | Before | After |
|-------|--------|-------|
| Base texture | 0.10 | 0.08 |
| Night sky | 0.24 | 0.20 |
| World map | 0.22 | 0.18 |
| Scan arcs | 0.10 | 0.08 |
| Particles | 0.08 | 0.06 |
| Connectors | 0.60 | 0.50 |
| Content panels | 0.85 | 0.80 |
| Central wheel | (none) | 0.75 |
| Footer | 0.70 | 0.65 |

### CSS Class Refactor
- Introduced `.cockpit-shell-asset--full-stage` for 1920×1080 SVGs (replaces per-asset inline positioning)
- Introduced `.cockpit-shell-asset--isolated` for non-full-stage SVGs
- Slot labels reduced to 8px, opacity 0.5
- Stage labels reduced to 7px, opacity 0.35
- Panel slot background added: `rgba(0, 0, 0, 0.15)` for subtle visibility

---

## 3. SVG Assets — All Untouched

No SVG file contents were modified. All changes are to wrapper sizing, CSS classes, and layout coordinates only.

---

## 4. Current Known Visual Limitations

1. **Panel slot positions are estimates** — they align to the content-panels SVG frame but may need fine-tuning once real panel content is added.
2. **CentralWheel positioning** — placed at (460, 160) based on visual estimation; may need ±20px adjustment after chart integration.
3. **FooterSlots** — small element with unusual viewBox offset (0 330 680 120); may need revisit if it doesn't align with the bottom shell area perfectly.
4. **Night-sky/World-map vertical centering** — at 160px from top; this is a reasonable center but the assets may have been designed to sit lower.

---

## 5. SVG-10 Remains Partial

All svg-10 atmosphere layers (base-texture, light-streaks, scan-arcs, particle-glow) remain status: partial.
They are used at very low opacity (0.06–0.10) and should not be relied upon as final assets.

---

## 6. SVG-11 Remains Unused for Desktop

SVG-11 (portrait/compact variant) is not used in the desktop 1920×1080 cockpit.
It remains available for future mobile/portrait layouts.

---

## 7. SVG-12 Remains Missing

SVG-12 master pack was not provided and remains `pending_manual_asset_drop`.
Not invented, not recreated.

---

## 8. Next Recommended Batch

Batch 5 should focus on:
- Lightweight Charts integration in the chart console frame
- First fixture data contract for chart display
- Initial MetricTile population in one or two panel slots
- Verify shell alignment holds with real panel content inside slots
