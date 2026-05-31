# ELCEO Dashboard — Visual Asset Intake Audit + Implementation Contract

## Asset Inventory Table

| # | File | Path | Exists | Size | viewBox | Type | Safe `?react` | Risk | Batch |
|---|------|------|:------:|------|---------|------|:-------------:|------|-------|
| 1 | liquid_gauge.svg | src/assets/source/dashboard/shell/ | ✅ | 28KB | 0 0 1536 857 | Multi-layer single gauge | ✅ | Low | V1B-1 |
| 2 | elceo-svg-09-arrows-alerts-rings.svg | src/assets/source/dashboard/watchlist/ | ✅ | 3KB | 0 0 820 400 | Sprite (arrows, bells, ring) | ⚠️ Extract | Low | V1B-3 |
| 3 | elceo-svg-09-market-pulse-cards.svg | src/assets/source/dashboard/watchlist/ | ✅ | 7KB | 0 0 1110 430 | Multi-card sprite | ⚠️ Extract | Medium | V1B-4 |
| 4 | elceo-svg-08-news-impact-badges.svg | src/assets/source/dashboard/evidence/ | ✅ | 10KB | 0 0 540 340 | Badge sprite sheet | ⚠️ Extract | Medium | V1B-3 |
| 5 | elceo-svg-03-projection-paths-up-down-display-safe.svg | src/assets/source/dashboard/chart/ | ✅ | 6KB | 0 0 430 520 | Multi-element chart overlay | ✅ | Low | V1B-5 |
| 6 | elceo-svg-03-market-structure-markers-display-safe.svg | src/assets/source/dashboard/chart/ | ✅ | 6KB | 0 0 560 310 | Marker sprite | ✅ | Low | V1B-5 |
| 7 | elceo-svg-03-guides-and-anchors-display-safe.svg | src/assets/source/dashboard/chart/ | ✅ | 6KB | 0 0 680 320 | Guide lines sprite | ✅ | Low | V1B-5 |
| 8 | elceo-svg-14-radar-ring.svg | src/assets/source/dashboard/arrows/ | ✅ | 11KB | 0 0 512 512 | Single isolated graphic | ✅ | Low | V1B-2 |
| 9 | elceo-svg-14-arrow-down.svg | src/assets/source/dashboard/arrows/ | ✅ | 943B | 0 0 512 512 | Single isolated icon | ✅ | Low | V1B-2 |
| 10 | elceo-svg-14-arrow-up.svg | src/assets/source/dashboard/arrows/ | ✅ | 941B | 0 0 512 512 | Single isolated icon | ✅ | Low | V1B-2 |
| 11 | elceo-svg-10-horizontal-light-streaks.svg | src/assets/source/dashboard/background/ | ✅ | 4KB | 0 0 1920 1080 | Full-width decorative | ✅ | Low | V1B-4 |
| 12 | elceo-svg-04-nav-icons-display-safe.svg | src/assets/source/dashboard/shell/ | ✅ | 10KB | 0 0 704 320 | Multi-icon sprite sheet | ⚠️ Extract | Medium | V1B-3 |

**All 12 assets exist and are accounted for.**

---

## Approved Usage Map

| Asset | Approved Target |
|-------|----------------|
| liquid_gauge.svg | Confidence & Context panel — score gauges |
| arrows-alerts-rings | Bell icon (square border), directional arrows |
| market-pulse-cards | Watchlist Featured section (max 4 cards/row) |
| news-impact-badges | News & Macro Headlines (badge system) |
| projection-paths | Chart overlay — scenario path enhancement |
| market-structure-markers | Chart overlay — structure zone markers |
| guides-and-anchors | Chart overlay — anchor/guide decorations |
| radar-ring | Directional Bias panel — right-side visual |
| arrow-down | Directional Bias — negative direction indicator |
| arrow-up | Directional Bias — positive direction indicator |
| horizontal-light-streaks | Section dividers between content blocks |
| nav-icons-display-safe | Sidebar icon replacement |

---

## Rejected or Delayed Usage

| Asset | Decision | Reason |
|-------|----------|--------|
| None rejected | — | All assets have valid dashboard usage |
| Chart overlay sprites | Delayed to V1B-5 | Requires chart geometry awareness |
| Nav icons sprite | Needs extraction | Individual icons must be isolated from sheet |

---

## Recommended Implementation Order

| Batch | Name | Content |
|-------|------|---------|
| **V1B-1** | Liquid Gauge + Typography + Meter Bars | Gauge component, typography scale, CSS meter bars, expanded-panel font fix |
| **V1B-2** | Directional Bias Radar + Panel Hover Glow | Radar ring + arrows in Bias panel, panel border glow on hover |
| **V1B-3** | Sidebar Icons + Bell Square + News Badges | Nav icon extraction, bell icon swap, news headline badge system |
| **V1B-4** | Watchlist Cards + Light Streaks + Scrollbar | Market pulse cards, horizontal separators, premium scrollbar |
| **V1B-5** | Chart Overlay Decorative + Market Regime Table | Projection paths, structure markers, guides, tabular regime |
| **V1B-6** | Polish Pass + Blog Text + Coaching Expand | Readability pass, coaching expansion exception, final QA |

---

## 1. Liquid Gauge Component Contract

**File:** `src/assets/source/dashboard/shell/liquid_gauge.svg`
**Target:** Confidence & Context panel (confMode 0)
**Key IDs:** `acrylicRimFill`, `acrylicBodyFill`, `acrylicEdgeStroke`, `liquidCyanCrest`, `liquidCyanBody`, `liquidCyanBase`, `tickGlowGradient`

**Spec:**
- Component: `DashboardLiquidGauge.tsx`
- Props: `score: number`, `label: string`, `tone: "positive" | "warning" | "negative"`
- Size: width 141px, height 75px
- Layout: max 3 per row (flex-wrap)
- Score text: centered in arc
- Fill tone: red (<40), amber (40–59), green (60–100)
- Animation: multi-layered CSS keyframes (liquid wave effect), slow, 4–6s cycle
- Performance: CSS animations only, no JS requestAnimationFrame loop
- Import: Use `?react` for component-level SVG manipulation

---

## 2. CSS Meter Bar Component Contract

**No SVG file — pure CSS implementation.**

**Component:** `DashboardMeterBar.tsx`
**Spec:**
- `<div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} aria-label={label}>`
- Black glass rail background
- Thin amber/gold border (1px)
- Inner fill: gradient based on tone (red/amber/green)
- Diagonal shimmer: CSS pseudo-element with repeating gradient, animated
- Height: 6–8px
- Border-radius: 3px
- Tone thresholds: red (<40), amber (40–59), green (60–100)
- No native `<progress>` or `<meter>` element

---

## 3. Typography/Title Cleanup Contract

**Changes:**
- Set dashboard-wide type scale: xs=0.78rem, sm=0.88rem, md=1.1rem, lg=1.2rem, xl=1.4rem
- Enforce min 0.78rem (no text smaller)
- Remove `--dashboard-expanded-text-scale` variable and its usage
- Expanded panels use same font sizes as default

**Eyebrow removal targets:**
- "Reasoning Snapshot" → remove eyebrow block
- "Reasoning Matrix" → remove eyebrow block
- "Active Instruments" → remove eyebrow block
- "Decision Support" → remove eyebrow block
- "Evidence Alignment" → remove eyebrow block
- "Context Drivers" → remove eyebrow block
- "Environment State" → remove eyebrow block

Main titles remain. Header slot geometry may need vertical adjustment.

---

## 4. Sidebar Icon Contract

**File:** `src/assets/source/dashboard/shell/elceo-svg-04-nav-icons-display-safe.svg`
**Type:** Multi-icon sprite sheet (704×320 viewBox, 11 groups)
**Key IDs:** `svg04_nav_icon_sheet_display_safe`

**Approach:** Extract individual icon groups by position/ID. Create isolated React components or a single sprite-reference approach with `<use>`.

---

## 5. Directional Bias Radar/Arrow Contract

**Files:**
- `elceo-svg-14-radar-ring.svg` (512×512, 11KB, single graphic)
- `elceo-svg-14-arrow-up.svg` (512×512, 941B, single icon)
- `elceo-svg-14-arrow-down.svg` (512×512, 943B, single icon)

**Placement:** Right side of Directional Bias panel body
**Behavior:** Radar ring as background, arrow (up/down) overlaid based on `cognition.scenarioTone`
**Size:** ~48–60px constrained within panel body area
**Import:** Direct `?react` import — all three are isolated single graphics

---

## 6. News Badge/Event Timeline Contract

**File:** `src/assets/source/dashboard/evidence/elceo-svg-08-news-impact-badges.svg`
**Type:** Badge sprite (540×340, multiple badge variants)
**Key IDs:** `news_impact_badges_display_safe`, `news_event_calendar_icon`, `news_event_frame`

**Changes:**
- Headlines mode (newsMode 0): Replace timeline styling with badge-per-headline layout
- Events mode (newsMode 1): Keep timeline styling, make side-by-side
- Badge variants: high/medium/low impact visuals

---

## 7. Watchlist Market Pulse Card Contract

**File:** `src/assets/source/dashboard/watchlist/elceo-svg-09-market-pulse-cards.svg`
**Type:** Multi-card sprite (1110×430, 13 groups)
**Key IDs:** `market_card_1`, `market_card_2`, `sparkline_up_87`, `sparkline_down_249`, `score_ring_177_300`

**Layout:** Max 4 cards per row in Featured mode (watchMode 0)
**Size:** Each card ~180px wide in a flex-wrap container
**Content:** Asset name, sparkline direction, score ring

---

## 8. Market Regime Table Contract

**Target:** Market Regime panel Cross-Asset mode (regimeMode 0)
**Current:** DataRow list from `crossAsset.pressureMap`
**Change:** Tabular layout with columns: Driver, Risk Tone, USD Link, Liquidity, Volatility, Relationship
**Implementation:** CSS table/grid within existing panel body — no geometry change

---

## 9. Scrollbar/Parallax Polish Contract

**Target:** All panel body scroll areas + drawer body
**Change:** Unify to one premium style:
- 4px thin track
- Amber/gold rounded thumb
- No generic browser appearance
- Consistent across all scroll containers

---

## 10. Panel Hover Border Glow Contract

**Target:** Panel frame SVG paths on hover
**Glow targets (if present in panel SVGs):**
- `corner_diagonal_emphasis`
- `primary_top_heavy`
- `secondary_top_medium`
- `right_edge_fine`
- `left_edge_lower_hair`
- `left_edge_upper_fine`
- `bottom_right_accent`
- `bottom_main_medium`
- `bottom_left_accent`

**Behavior:** On `.dashboard-panel-group:hover`, apply gold glow filter to named border paths — inline only (no external spread)

---

## 11. Alert Bell Square Icon Contract

**Source:** `elceo-svg-09-arrows-alerts-rings.svg` → IDs: `bell_165`, `bell_305`
**Change:** Replace current inline SVG bell in `PrecisionPanelGroup.tsx` with extracted bell asset
**Border:** Square (border-radius: 3px), not circular ring
**Size:** Same hitbox as current (18–24px)

---

## 12. Coaching Expansion Exception Contract

**Target:** `PANEL_EXPANSION_SCALE` in `PrecisionPanelGroup.tsx`
**Current:** `coachingInsights: 1.25`
**Change:** `coachingInsights: 1.5` (20% more than current 1.25)
**Other panels:** Unchanged

---

## 13. Blog-Like Text Readability Contract

**Target:** Evidence Insights, Coaching body, Drawer long text
**Changes:**
- line-height: 1.6–1.7 for body text blocks
- paragraph margin: 8–12px between blocks
- Subtle 1px dividers between sections (rgba gold, 0.08 opacity)
- No dense wall of text

---

## 14. Horizontal Light Streaks Contract

**File:** `src/assets/source/dashboard/background/elceo-svg-10-horizontal-light-streaks.svg`
**Type:** Full-width decorative (1920×1080)
**Usage:** Visual separator between panel content sections
**Implementation:** Render at ~20–30px height, full-width, opacity 0.3–0.5
**Import:** `?react` — single group, safe

---

## Safety Rules

- **No geometry changes** unless explicitly requested in implementation batch
- **No SVG file edits** — use as-is or extract with CSS/JS isolation
- **No intelligence logic changes** — fixture engines are frozen
- **No layout redesign** — visual polish within existing coordinate system
- **No live data** — no fetch/axios/WebSocket/timers
- **No route/account/security content** in dashboard panels
- **No "signal" wording** — use cue/condition/pressure
- **All visual batches must pass agent rules validation**

---

## V1B-4 — Directional Bias Radar Clean Restart

| Item | Detail |
|------|--------|
| Asset used | `src/assets/source/dashboard/arrows/elceo-radar.svg` |
| Old asset NOT used | `elceo-svg-14-radar-ring.svg` — not imported in this batch |
| SVG source edits | None — asset used as-is |
| Custom recreation | None — no hand-drawn paths/circles/polygons |
| Display size | 141×130px (responsive via `min(141px, 36cqi)` with `aspect-ratio: 141/130`) |
| Placement | Right side of Directional Bias panel, Bias mode (biasMode 0) |
| Animation | Subtle core pulse on `#svg14_radar_core` group, disabled under `prefers-reduced-motion` |
| Component | `src/dashboard/responsive/panelContent/DirectionalBiasRadar.tsx` |
| Layout classes | `.dashboard-bias-content-row`, `.dashboard-bias-content-main`, `.dashboard-bias-content-visual` |

---

_This document is the implementation contract for the V1B visual elevation phase. Do not implement until the corresponding batch is started._
