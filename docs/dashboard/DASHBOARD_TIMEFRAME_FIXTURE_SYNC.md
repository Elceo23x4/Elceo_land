# ELCEO Dashboard — Timeframe Fixture Sync

## Overview

This document describes how the ELCEO Market Cognition Cockpit responds to the selected **active timeframe** using fixture-only context. No live data is involved.

---

## Active Timeframe State Owner

- **File:** `src/dashboard/responsive/DashboardResponsiveCockpit.tsx`
- **Mechanism:** `useState("1H")` — React local state
- **Setter:** `setActiveTimeframe` passed via `onTimeframeChange` prop
- **No URL state.** No localStorage. No network.

---

## Supported Timeframes

| Value | Label | Review Lens |
|-------|-------|-------------|
| `15M` | 15M | Short-window structure review |
| `1H` | 1H | Primary cockpit structure lens |
| `4H` | 4H | Higher-context scenario review |
| `1D` | 1D | Macro regime lens |

---

## Timeframe Selector

- **File:** `src/dashboard/responsive/DashboardTimeframeSelector.tsx`
- **Location:** Top-right inside chart display area, directly below asset selector
- **Style:** Same HUD visual language as DashboardAssetSelector
- **Behavior:** Button shows active timeframe, click opens 4 options, Escape/click-outside closes
- **CSS:** Scoped to `.dashboard-timeframe-selector` only

---

## timeframeContextByValue Purpose

- **File:** `src/dashboard/responsive/responsivePanelFixtures.ts`
- **Type:** `Record<string, TimeframeContext>`
- **Purpose:** Provides per-timeframe fixture context used by panels to display appropriate review lens, freshness sensitivity, scenario pace, and evidence notes.

### TimeframeContext Fields

| Field | Purpose |
|-------|---------|
| `label` | Display label |
| `reviewLens` | Primary analytical lens description |
| `freshnessSensitivity` | How sensitive freshness is at this timeframe |
| `scenarioPace` | Pace of scenario evolution |
| `evidenceNote` | Guidance for evidence alignment |

---

## Components Receiving activeTimeframe

| Component | Prop |
|-----------|------|
| `DashboardResponsiveChartZone` | `activeTimeframe` + `onTimeframeChange` |
| `DashboardResponsivePanelLayer` | `activeTimeframe` |
| `DashboardChartOverlayInspector` | `activeTimeframe` |
| Topbar (in Cockpit) | Badge shows `activeTimeframe` |

---

## Panels Responding to Timeframe

| Panel | Response |
|-------|----------|
| **Directional Bias** | Timeframe chip in Bias mode; timeframe lens in Scenario mode |
| **Confidence** | Freshness sensitivity from timeframe context |
| **Watchlist** | Scenario Map shows timeframe + scenario pace |
| **Evidence** | Insights tab shows timeframe evidence note |
| **News & Macro** | Macro Pulse shows timeframe review lens |
| **Coaching** | Journal Note references asset + timeframe |
| **Market Regime** | Volatility tab shows asset + timeframe + review lens |

---

## Fixture-Only Boundary

- Timeframe selection is purely local state
- No network calls triggered by timeframe change
- No live data sources
- Chart overlay coordinates remain normalized (unchanged by timeframe)
- All timeframe context is static fixture content

---

## No-Live-Data Boundary

- Timeframe changes do not imply live data
- Timeframe does not trigger `fetch`, `axios`, `WebSocket`, or `setInterval`
- When live data boundary is implemented, timeframe will control data resolution
- Until then, timeframe only affects fixture text/context displayed

---

## Future Work

1. **Asset/timeframe-specific overlay geometries** — Different zone/marker positions per asset + timeframe
2. **Timeframe-specific fixture variants** — Different evidence stacks and confidence scores per timeframe
3. **Real provider boundary** — Timeframe controls data resolution from live sources
4. **Chart candle resolution** — Timeframe drives chart candle period when live chart data exists

---

_This document is the reference for timeframe fixture sync. Safe language only. No trading instructions._
