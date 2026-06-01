# ELCEO Dashboard — V1B Deferred Items Completion (V1B-10)

## Summary

This batch completes all remaining V1B visual requirements that were previously deferred. Only one item remains intentionally deferred to V2.

---

## Completion Checklist

| # | Item | Status | Batch | Component/File |
|---|------|:------:|-------|----------------|
| 1 | Liquid gauge | ✅ | V1B-1 | `DashboardLiquidGauge.tsx` |
| 2 | Global typography scale | ✅ | V1B-1 | `dashboardResponsiveTypography.css` |
| 3 | Expanded panel font reset | ✅ | V1B-1 | Removed `--dashboard-expanded-text-scale` |
| 4 | Panel hover inline border glow | ✅ | V1B-9B | `dashboardResponsiveLayout.css` (9 ID-suffix selectors) |
| 5 | Sidebar designed SVG icons | ✅ | V1B sidebar | `elceo-sidebar-uni.svg` + `DashboardResponsiveSidebar.tsx` |
| 6 | Directional Bias radar/arrow | ✅ | V1B-4 | `DirectionalBiasRadar.tsx` |
| 7 | Market Regime table | ✅ | V1B-7 | `MarketRegimeTable.tsx` |
| 8 | News & Macro badges + events | ✅ | V1B-5 | `NewsImpactBadge.tsx` + split timeline |
| 9 | Guides & anchors SVG | ✅ | V1B-10 | `DashboardChartVisualGuides.tsx` |
| 10 | Market structure markers SVG | ✅ | V1B-10 | `DashboardChartVisualGuides.tsx` |
| 11 | Projection paths SVG | ✅ | V1B-10 | `DashboardChartVisualGuides.tsx` |
| 12 | CSS meter bars | ✅ | V1B-1 | `DashboardMeterBar.tsx` |
| 13 | Arrows-alerts-rings | 🔶 V2 | — | Bell + arrows done; score rings deferred (MarketPulseCard handles arcs) |
| 14 | Panel scrollbar cleanup | ✅ | V1B-8 | `ScrollFrame.tsx` + V1B-8C/D scrollbar suppression |
| 15 | Square alert bell icon | ✅ | V1B-3 | `PrecisionPanelGroup.tsx` inline bell |
| 16 | Coaching expanded +20% | ✅ | V1B-9B | `coachingInsights: 1.5` |
| 17 | Blog-like readable sections | ✅ | V1B-10 | `InsightTextBlock.tsx` |
| 18 | Secondary titles removed | ✅ | V1B-1 | Eyebrows removed from panel layer |
| 19 | Horizontal light streaks | ✅ | V1B-10 | `HorizontalLightStreak.tsx` |
| 20 | Watchlist market pulse cards | ✅ | V1B-6 | `MarketPulseCard.tsx` |
| 21 | Section scroll cue | ✅ | V1B-8 | `PanelSectionNav.tsx` |

---

## V1B-10 Implementations

### Chart Visual Guides

**Component:** `src/dashboard/responsive/DashboardChartVisualGuides.tsx`

Uses 3 display-safe SVG assets as a faint decorative layer behind the interactive chart overlay:
- `elceo-svg-03-guides-and-anchors-display-safe.svg` — zone guides/anchors
- `elceo-svg-03-market-structure-markers-display-safe.svg` — structure marker accents
- `elceo-svg-03-projection-paths-up-down-display-safe.svg` — scenario path visuals

Properties:
- Opacity: 0.18 (very faint backdrop)
- Mix-blend-mode: screen (additive light effect)
- Z-index: 4 (below interactive overlay at z-index 6)
- Pointer-events: none
- Toggle-aware: respects `showZones` and `showScenario` chart toggles

### Horizontal Light Streak

**Component:** `src/dashboard/responsive/panelContent/HorizontalLightStreak.tsx`

Uses `elceo-svg-10-horizontal-light-streaks.svg` clipped as a decorative separator:
- Height: clamp(14px, 2cqi, 24px)
- Overflow: hidden (clips the 1920×1080 asset)
- Default opacity: 0.35
- Pointer-events: none

**Applied in panels (V1B-10B):**
- Evidence → Insights mode: between source freshness and contradiction rows (opacity 0.25)
- Coaching → Journal Note mode: between note summary and evidence/contradiction lines (opacity 0.22)
- Coaching → Behavior mode: between review state and checklist rows (opacity 0.2)
- News & Macro → Macro Pulse mode: between regime pressure and macro watch rows (opacity 0.22)

### Insight Text Block

**Component:** `src/dashboard/responsive/panelContent/InsightTextBlock.tsx`

Blog-like readable presentation for long insight/summary text:
- Left accent line colored by tone
- Optional eyebrow (mono, gold)
- Optional title (bold, off-white)
- Body text: line-height 1.55, proper paragraph spacing
- Dense mode for tighter contexts
- No text below 0.78rem

**Applied in panels (V1B-10B):**
- Evidence → Insights mode: caution note wrapped with eyebrow="Caution", tone from cognition
- Coaching → Journal Note mode: note summary wrapped with tone="positive", dense mode

---

## Intentionally Deferred to V2

| Item | Reason |
|------|--------|
| Score ring extraction from arrows-alerts-rings sprite | MarketPulseCard already renders inline score arcs. Sprite extraction adds visual redundancy, requires manual viewBox isolation, medium risk with low value. |

---

_This document closes the V1B deferred items tracking. Dashboard is ready for final freeze._
