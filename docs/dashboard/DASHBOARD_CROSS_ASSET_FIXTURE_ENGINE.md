# ELCEO Dashboard — Cross-Asset Relationship Fixture Engine

## Purpose

The Cross-Asset Relationship Fixture Engine produces structured cross-asset intelligence that explains relationships between the active asset and other instruments in the ELCEO universe. It provides USD links, risk tone, liquidity/volatility context, aligned/diverging/inverse asset relationships, and a pressure map.

---

## Deterministic Design

- Pure function: `getDashboardCrossAssetSnapshot(asset, timeframe, cognition, scenario, conditionWatch)`
- No `Math.random`, `Date.now`, `new Date`
- No `fetch`, `axios`, `WebSocket`, `EventSource`, `setInterval`
- No `localStorage`, `sessionStorage`
- Same input always produces the same output
- Safe language only — no "signal" wording

---

## Relationship to Cognition/Scenario/Condition Watch

```
Asset + Timeframe
  → CognitionSnapshot (scores)
    → ScenarioSnapshot (scenarios)
      → ReviewWorkflow (checklist)
        → ConditionWatch (watch items)
          → CrossAssetSnapshot (relationships + pressure)
```

The cross-asset engine is the final intelligence layer, consuming all upstream outputs.

---

## DashboardCrossAssetSnapshot Fields

| Field | Type | Purpose |
|-------|------|---------|
| `activeAsset` | string | Selected asset |
| `timeframe` | string | Selected timeframe |
| `summary` | string | One-line cross-asset summary |
| `dominantDriver` | string | Primary external driver |
| `riskTone` | string | Current risk context |
| `usdLink` | string | USD relationship description |
| `liquidityLink` | string | Liquidity context |
| `volatilityLink` | string | Volatility context |
| `correlationNote` | string | Correlation explanation |
| `alignedAssets` | CrossAssetLink[] | Assets moving in same direction |
| `divergingAssets` | CrossAssetLink[] | Assets contradicting context |
| `inverseAssets` | CrossAssetLink[] | Assets with inverse relationship |
| `pressureMap` | CrossAssetPressureItem[] | External pressure factors |
| `cautionNote` | string | Cross-asset caution |

---

## Supported Asset Universe

All 12 ELCEO assets have unique cross-asset profiles:

| Asset | Dominant Driver | Key Relationships |
|-------|----------------|-------------------|
| XAU/USD | USD + real yields | Inverse USD, aligned JPY/CHF, diverging equities |
| NAS100 | Risk appetite + Fed | Aligned SPX/BTC, diverging gold |
| SPX500 | Macro clarity + CPI | Aligned NAS100, diverging gold |
| DE30 | US risk + ECB | Follows US equity direction |
| BTC/USD | Risk sentiment | Aligned NAS100, diverging gold |
| EUR/USD | ECB vs Fed divergence | Aligned GBP/USD, inverse USD/JPY |
| GBP/USD | UK data + USD | Aligned EUR/USD |
| USD/JPY | Yields + BoJ | Sensitive to gold/risk, inverse EUR/USD |
| USD/CHF | Safe-haven + SNB | Sensitive to gold |
| AUD/USD | China + commodities | Aligned NZD/USD |
| NZD/USD | RBNZ + AUD | Aligned AUD/USD |
| USD/CAD | Oil + BoC | Commodity sensitivity |

---

## Panel Usage

| Panel | Cross-Asset Content |
|-------|-------------------|
| **Market Regime (Cross-Asset)** | Summary, driver, risk tone, pressure map |
| **Market Regime (Liquidity)** | liquidityLink, volatilityLink, usdLink, riskTone |
| **Market Regime (Volatility)** | volatilityLink, regime watch, caution |
| **Market Regime (Correlation)** | correlationNote, aligned/diverging/inverse assets |
| **News/Macro (Currency)** | usdLink, correlationNote, aligned/inverse assets |
| **Watchlist (Featured)** | dominantDriver row |
| **Watchlist (FX Majors)** | usdLink, aligned asset links |
| **Watchlist (Alerts/Watch)** | dominantDriver as cross-asset pressure row |
| **Watchlist (Scenario Map)** | correlationNote |
| **Evidence (Stack)** | dominantDriver row |
| **Evidence (Insights)** | dominantDriver, correlationNote, cautionNote |

---

## Chart Inspector Usage

Each overlay type includes concise cross-asset context in the watch line:
- Zone: USD link context
- Marker: Dominant driver context
- Annotation: Correlation note
- Path: Correlation note

---

## Drawer Usage

| Drawer | Cross-Asset Content |
|--------|-------------------|
| **Regime** | Full cross-asset detail: driver, risk, USD, liquidity, volatility, aligned/diverging/inverse, pressure map |
| **News** | Dominant driver, USD link, risk tone, caution note |
| **Watchlist** | Cross-Asset Relationship section: driver, USD link, risk tone, correlation, aligned/diverging/inverse |
| **Evidence** | Cross-Asset Evidence section: driver, USD link, correlation, caution, top pressure items |

---

## No-Live-Data Boundary

- All relationships are fixture context — not live correlation claims
- Cross-asset links do not change in real-time
- Only user selection (asset/timeframe) changes the output
- When live data exists, relationships will be driven by real correlation computation

---

## Future Real Cross-Asset Engine Boundary

When live data becomes available:
1. Cross-asset relationships will use real-time correlation computation
2. Pressure map will reflect live market pressure
3. Aligned/diverging/inverse classifications will update dynamically
4. Risk tone will reflect actual cross-market risk indicators
5. Live correlation breakdowns will trigger condition watch escalation

---

_This document is the reference for the cross-asset fixture engine. Safe language only. No trading instructions._
