# ELCEO Dashboard — Cognition Fixture Engine

## Purpose

The Deterministic Market Cognition Fixture Engine provides derived intelligence values for the ELCEO Market Cognition Cockpit. It takes the selected `activeAsset` and `activeTimeframe` and returns a complete `DashboardCognitionSnapshot` with scores, conditions, reasons, and context — all deterministic and fixture-only.

---

## No-Live-Data Boundary

- Pure function: `getDashboardCognitionSnapshot(activeAsset, activeTimeframe)`
- No `Math.random`, `Date.now`, `new Date`
- No `fetch`, `axios`, `WebSocket`, `EventSource`, `setInterval`
- No network calls of any kind
- Same input always produces the same output
- Safe language only — no trading instructions

---

## Deterministic Design

The engine uses two lookup tables:

1. **Asset Profiles** (`ASSET_PROFILES`) — Base scores and context for each of the 12 supported assets
2. **Timeframe Modifiers** (`TIMEFRAME_MODIFIERS`) — Adjustments applied to base scores per timeframe

Final score = `clamp(baseScore + timeframeAdjustment, 0, 100)`

This ensures:
- Every asset has unique intelligence character
- Timeframe changes produce visible but proportional shifts
- Output is always deterministic

---

## Supported Assets

| Asset | Class | Character |
|-------|-------|-----------|
| XAU/USD | Metals | High macro sensitivity, USD/yield-driven |
| NAS100 | Indices | Tech momentum, earnings cycle |
| SPX500 | Indices | Broad macro, CPI-conditional |
| DE30 | Indices | European session, ECB-dependent |
| BTC/USD | Crypto | High volatility, risk-sentiment correlation |
| EUR/USD | FX Major | Rate differential, range-bound |
| GBP/USD | FX Major | UK data-conditional |
| USD/JPY | FX Major | Intervention risk, yield differential |
| USD/CHF | FX Major | Safe-haven flows, low conviction |
| AUD/USD | FX Major | China data sensitivity |
| NZD/USD | FX Major | Low liquidity, follows AUD |
| USD/CAD | FX Major | Oil correlation |

---

## Supported Timeframes

| Timeframe | Confidence | Contradiction | Freshness | Zone Strength | Evidence |
|-----------|-----------|---------------|-----------|---------------|----------|
| 15M | -6 | +8 | +6 | -4 | -4 |
| 1H | 0 | 0 | 0 | 0 | 0 |
| 4H | +4 | -4 | -6 | +6 | +4 |
| 1D | +6 | -6 | -10 | +8 | +6 |

---

## Output Fields (DashboardCognitionSnapshot)

| Field | Type | Purpose |
|-------|------|---------|
| `asset` | string | Active asset symbol |
| `timeframe` | string | Active timeframe |
| `confidenceScore` | number (0–100) | Overall confidence level |
| `contradictionScore` | number (0–100) | Cross-asset/signal contradiction |
| `freshnessScore` | number (0–100) | Source freshness assessment |
| `zoneStrengthScore` | number (0–100) | Structure zone relevance |
| `evidenceWeight` | number (0–100) | Aggregate evidence conviction |
| `liquidityCondition` | string | Current liquidity assessment |
| `volatilityCondition` | string | Volatility regime description |
| `macroSensitivity` | string | Key macro factors |
| `regimePressure` | string | Market regime pressure description |
| `scenarioTone` | Tone | Primary scenario directional tone |
| `cautionTone` | Tone | Caution/contradiction tone |
| `reviewWindow` | string | Next review trigger |
| `confidenceReason` | string | Why confidence is at this level |
| `contradictionReason` | string | What creates contradiction |
| `freshnessReason` | string | Source freshness context |
| `zoneReason` | string | Zone strength explanation |
| `evidenceSummary` | string | Key evidence layers |
| `cautionNote` | string | Active caution/contradiction |

---

## Panel Usage

| Panel | Cognition Fields Used |
|-------|----------------------|
| **Directional Bias** | `scenarioTone`, `reviewWindow`, `cautionNote` |
| **Confidence** | `confidenceScore`, `contradictionScore`, `freshnessScore`, `zoneStrengthScore`, `evidenceWeight`, `confidenceReason`, `contradictionReason`, `freshnessReason` |
| **Watchlist** | Active asset `scenarioTone` |
| **Evidence** | `evidenceWeight`, `evidenceSummary`, `freshnessScore`, `freshnessReason`, `cautionNote` |
| **News & Macro** | `macroSensitivity`, `regimePressure`, `liquidityCondition`, `contradictionReason` |
| **Coaching** | `cautionNote`, `reviewWindow`, `volatilityCondition`, `confidenceScore` |
| **Market Regime** | `liquidityCondition`, `volatilityCondition`, `regimePressure`, `zoneStrengthScore` |

---

## Chart Inspector Usage

The chart overlay inspector uses cognition to enhance overlay context:

- **Zone selected:** Shows `zoneStrengthScore` and `zoneReason`
- **Contradiction marker:** Shows `contradictionScore` and `contradictionReason`
- **Annotation:** Shows `confidenceScore` in context line
- **Scenario path:** Shows `confidenceScore` and `confidenceReason`, `reviewWindow`

Freshness display is derived from `freshnessScore` (≥65 = "Current", <65 = "Watch").

---

## Future Real-Engine Boundary

When live data becomes available:
1. `getDashboardCognitionSnapshot` will be replaced by a real cognition service
2. The interface (`DashboardCognitionSnapshot`) will remain stable
3. Asset profiles will be driven by real market data extraction
4. Timeframe modifiers will reflect actual candle-period analysis
5. Scores will be dynamic rather than fixture-deterministic

---

## Scenario Engine Integration

The scenario fixture engine (`dashboardScenarioFixtureEngine.ts`) consumes `DashboardCognitionSnapshot` and produces structured primary/alternate scenarios, condition checks, and evidence drilldown rows. It derives `scenarioConfidence` from the cognition scores and generates per-asset condition/evidence/contradiction/freshness items.

---

_This document is the reference for the cognition fixture engine. Safe language only. No trading instructions._
