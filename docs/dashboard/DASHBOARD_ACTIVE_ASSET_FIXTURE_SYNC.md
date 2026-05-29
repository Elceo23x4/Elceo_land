# ELCEO Dashboard — Active Asset Fixture Sync

## Overview

This document describes how the ELCEO Market Cognition Cockpit responds to the selected **active asset** using fixture-only market context. No live data is involved.

---

## Active Asset State Owner

- **File:** `src/dashboard/responsive/DashboardResponsiveCockpit.tsx`
- **Mechanism:** `useState("XAU/USD")` — React local state
- **Setter:** `setActiveAsset` passed via `onAssetChange` prop
- **Consumer components:** `DashboardResponsiveChartZone`, `DashboardResponsivePanelLayer`, topbar badge

---

## Asset Selector

- **File:** `src/dashboard/responsive/DashboardAssetSelector.tsx`
- **Location:** Top-right inside chart display area
- **Behavior:** Custom HUD dropdown. Calls `onAssetChange(asset)` on selection.
- **Source list:** `AVAILABLE_ASSETS` from `responsivePanelFixtures.ts`

---

## assetContextBySymbol Purpose

- **File:** `src/dashboard/responsive/responsivePanelFixtures.ts`
- **Type:** `Record<string, AssetContext>`
- **Purpose:** Provides per-asset fixture context used by panels, drawers, chart inspector, and topbar to display contextually appropriate content for the selected active asset.

### AssetContext Fields

| Field | Purpose |
|-------|---------|
| `symbol` | Ticker symbol |
| `label` | Human-readable asset name |
| `assetClass` | Asset classification (Metals, Indices, Crypto, FX Major) |
| `timeframe` | Active chart timeframe |
| `bias` | Current directional bias label |
| `biasTone` | Tone for bias chip |
| `primaryLens` | Primary analytical lens for this asset |
| `scenario` | Active scenario description |
| `marketContext` | Broader market context sentence |
| `evidenceFocus` | Key evidence layers for this asset |
| `macroSensitivity` | Macro factors this asset is sensitive to |
| `macroLink` | Macro environment link description |
| `regimeLink` | Market regime relationship |
| `freshnessNote` | Source freshness context |
| `reviewWindow` | Next review trigger |
| `cautionNote` | Active contradiction or caution |

---

## Supported Assets

1. XAU/USD — Gold Spot (Metals)
2. NAS100 — Nasdaq 100 (Indices)
3. SPX500 — S&P 500 (Indices)
4. DE30 — Germany 40 (Indices)
5. BTC/USD — Bitcoin (Crypto)
6. EUR/USD — Euro/Dollar (FX Major)
7. GBP/USD — Cable (FX Major)
8. USD/JPY — Dollar/Yen (FX Major)
9. USD/CHF — Dollar/Swiss (FX Major)
10. AUD/USD — Aussie/Dollar (FX Major)
11. NZD/USD — Kiwi/Dollar (FX Major)
12. USD/CAD — Dollar/Loonie (FX Major)

---

## Panels That Respond to activeAsset

| Panel | Response |
|-------|----------|
| **Directional Bias** | Active asset label, scenario, review window, caution note |
| **Confidence & Context** | Freshness note, caution note, active asset in data quality |
| **Watchlist** | Active asset highlighted in Featured/FX tabs, scenario map references active asset |
| **Evidence & Insights** | Evidence focus, caution note from asset context |
| **News & Macro** | Macro sensitivity for active asset shown in currency tab |
| **Coaching & Journal** | Dynamic headline, journal prompt, discipline note reference active asset |
| **Market Regime** | Regime link for active asset, volatility context |

---

## Drawers That Respond to activeAsset

All 7 drawer sections reflect the selected active asset:

- **Bias drawer** — scenario, primary lens, market context, caution, review window
- **Confidence drawer** — active asset label, freshness note
- **Watchlist drawer** — active focus asset, class, scenario
- **Evidence drawer** — evidence focus, market context, freshness note
- **News/Macro drawer** — macro sensitivity, market context
- **Coaching drawer** — journal prompt, discipline note, review window
- **Market Regime drawer** — regime link for active asset

---

## Chart Inspector Active Asset Integration

- **File:** `src/dashboard/responsive/DashboardChartOverlayInspector.tsx`
- **Behavior:** All overlay types (zones, markers, annotations, paths) prefix the active asset in title and show an `assetContextLine` referencing the asset's scenario/evidence context.
- **Examples:** "XAU/USD Structure Zone", "Linked to XAU/USD evidence", "EUR/USD scenario path"

---

## Chart Overlay Fixture Labels

- **File:** `src/dashboard/responsive/chartIntelligenceFixture.ts`
- **Labels:** Generic and asset-compatible:
  - "Structure zone"
  - "Liquidity band"
  - "Macro event marker"
  - "Contradiction marker"
- **Coordinates:** Normalized 0–100, unchanged
- **Asset specificity:** Inspector appends active asset dynamically

---

## Fixture-Only Boundary

- All content is deterministic fixture data
- No `fetch`, `axios`, `WebSocket`, `EventSource`, or `setInterval`
- No live data sources
- Source status shows "Fixture Mode" / "Market Data Pending"
- All panel/drawer content comes from typed fixture objects

---

## No-Live-Data Boundary

- Dashboard does not connect to any external data source
- No network requests for market data
- No timers or polling
- No real-time price updates
- Asset context is static fixture content that responds to user selection only

---

## Future Work

1. **Asset-specific overlay geometry** — When live data is available, overlay zones/markers may be generated per-asset with unique coordinates
2. **Timeframe-specific fixture variants** — Different fixture contexts for 5M, 15M, 1H, 4H, Daily timeframes per asset
3. **Live source integration** — Replace fixture mode with real market data state when source infrastructure is ready
4. **Asset-specific evidence stacks** — Per-asset evidence item arrays (currently shared fixture)
5. **Dynamic watchlist ordering** — Reorder watchlist based on active scenario priority

---

## Active Timeframe Pairing

Active timeframe (`activeTimeframe`) is now paired with active asset. Both are local state in `DashboardResponsiveCockpit.tsx`. The timeframe selector appears below the asset selector in the chart zone. Panels reference timeframe context from `timeframeContextByValue` for review lens, freshness sensitivity, and scenario pace. See `DASHBOARD_TIMEFRAME_FIXTURE_SYNC.md` for full details.

---

_This document is the reference for active asset intelligence sync. Safe language only. No trading instructions._
