# ELCEO Dashboard — Chart Intelligence Overlay Contract

## Purpose

The chart intelligence overlay renders market-context layers directly on the chart display area. It visually connects the evidence stack, scenario conditions, and source freshness state to the active chart — giving the user immediate spatial context for the current bias reasoning.

This is a **fixture-only** overlay foundation. No live price data, no real-time updates, no network calls.

---

## Architecture

### Coordinate System

All overlay coordinates are **normalized 0–100** within the chart display rect (`SHELL_RECTS.chartDisplay`). This means:

- `x: 0` = left edge of chart display
- `x: 100` = right edge of chart display
- `y: 0` = top edge of chart display
- `y: 100` = bottom edge of chart display

Coordinates do not reference real price levels or timestamps. They are spatial fixtures designed to demonstrate overlay positioning.

### Layer Stack (inside chart display div)

| Layer | z-index | Content |
|-------|---------|---------|
| Chart candles | base | ChartContainer fixture data |
| Intelligence overlay | 6 | SVG zones, paths, markers, annotation anchors |
| Annotation labels | 8 | HTML positioned labels with tooltips |
| Context strip | 8 | Bottom-left asset/timeframe/session/state |
| Toggle controls | 9 | Top-left overlay visibility toggles |

### Component

`DashboardChartIntelligenceOverlay.tsx`

Props:
- `showZones: boolean` — demand/supply/structure zone visibility
- `showLiquidity: boolean` — liquidity band visibility
- `showScenario: boolean` — scenario path visibility
- `showNotes: boolean` — annotation label visibility

---

## Overlay Layers

### 1. Zone Overlays

| Kind | Tone | Visual |
|------|------|--------|
| Demand | positive | Green transparent fill, green border |
| Supply | negative | Red transparent fill, red border |
| Structure | positive | Gold dashed border, subtle fill |
| Liquidity | warning | Amber dotted border, minimal fill |

Zones use `<rect>` elements with transparent fills so candles remain visible beneath.

### 2. Scenario Paths

Dashed `<polyline>` elements showing projected scenario direction:
- **Primary**: positive tone, upward path, 65% confidence
- **Alternate**: warning tone, downward path, 30% confidence

Paths are subtle and do not claim prediction or instruction.

### 3. Markers

`<circle>` elements at specific chart locations:
- Liquidity sweep (warning)
- Structure retest (positive)
- Macro event / CPI (warning)
- Contradiction (negative)

### 4. Annotation Callouts

HTML labels positioned over the SVG overlay. Each annotation:
- Shows a compact label (Bias / Evidence / Macro / Freshness)
- On hover, reveals a tooltip with context text
- Links conceptually to a panel (no navigation)

### 5. Active Context Strip

Bottom-left compact strip showing:
- Active asset (XAU/USD)
- Timeframe (1H)
- Session (London/NY Overlap)
- Source state (Fixture Mode)

---

## Toggle Controls

Top-left inside chart frame. Four toggle buttons:
- **Zones** — demand/supply/structure visibility
- **Liquidity** — liquidity band visibility
- **Scenario** — scenario path visibility
- **Notes** — annotation labels visibility

All default to ON. Keyboard accessible with `aria-pressed`.

---

## Safe Language Rules

The overlay must never display:
- Price targets as instructions
- Entry/exit signals
- Buy/sell/hold recommendations
- Profit projections
- Risk-free claims

Allowed language:
- Structure zone
- Liquidity band
- Scenario path
- Confirmation required
- Contradiction present
- Caution area
- Review window
- Source freshness watch

---

## Fixture Data Source

`chartIntelligenceFixture.ts` exports:
- `chartZones` — 4 zone fixtures
- `chartMarkers` — 4 marker fixtures
- `chartAnnotations` — 4 annotation fixtures
- `scenarioPaths` — 2 scenario path fixtures
- `activeChartContextFixture` — context strip data

---

## What Is Intentionally Not Live Yet

| Feature | Status | Future Batch |
|---------|--------|--------------|
| Real price-mapped zones | Not active | R7B+ (requires live adapter) |
| Dynamic scenario recalculation | Not active | R7B+ |
| Live freshness indicators | Not active | R10 (source adapter) |
| Asset selector switching | Not active | R7B |
| Timeframe switching | Not active | R7B |
| Chart-to-panel navigation | Not active | R8 |
| Annotation click-to-expand | Not active | R8 |

---

## Future R7B Work

- Asset selector dropdown inside chart context strip
- Timeframe selector
- Dynamic zone visibility based on active scenario
- Chart annotation click → panel focus
- Additional overlay layers: session bands, volume profile ghost

---

_Last updated: R7A batch_
