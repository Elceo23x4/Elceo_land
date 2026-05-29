# ELCEO Dashboard — Scenario Fixture Engine

## Purpose

The Scenario Fixture Engine produces structured scenario and evidence drilldown data from the cognition snapshot. It turns raw scores into actionable scenario context: primary/alternate scenarios, condition checks, evidence items with chart links, contradiction drilldowns, and freshness assessments.

---

## Deterministic Design

- Pure function: `getDashboardScenarioSnapshot(activeAsset, activeTimeframe, cognition)`
- No `Math.random`, `Date.now`, `new Date`
- No `fetch`, `axios`, `WebSocket`, `EventSource`, `setInterval`
- Same input always produces the same output
- Safe language only — no trading instructions

---

## No-Live-Data Boundary

- All scenario data is derived from fixture profiles
- No network calls triggered by scenario computation
- Scenario changes reflect only user selection (asset + timeframe)
- When live data boundary exists, scenario engine will be driven by real extraction

---

## Relationship to Cognition Fixture Engine

```
User selects asset + timeframe
    → getDashboardCognitionSnapshot(asset, timeframe)
        → DashboardCognitionSnapshot (scores + conditions)
            → getDashboardScenarioSnapshot(asset, timeframe, cognition)
                → DashboardScenarioSnapshot (scenarios + conditions + evidence)
```

The scenario engine **consumes** cognition scores to:
- Derive `scenarioConfidence` from confidence, evidence weight, zone strength
- Apply contradiction penalty and freshness penalty
- Generate condition summary based on score thresholds
- Override scenario tone if contradiction exceeds threshold

---

## scenarioConfidence Derivation

```
rawConfidence = (confidenceScore × 0.5) + (evidenceWeight × 0.3) + (zoneStrengthScore × 0.2)
contradictionPenalty = max(0, (contradictionScore - 40) × 0.4)  // only if > 40%
freshnessPenalty = max(0, (60 - freshnessScore) × 0.3)          // only if < 60%
scenarioConfidence = clamp(rawConfidence - contradictionPenalty - freshnessPenalty, 0, 100)
```

---

## Condition Rows

Each asset has deterministic conditions that reflect its market character:

| Status | Meaning |
|--------|---------|
| `aligned` | Condition supports primary scenario |
| `watch` | Condition requires monitoring |
| `contradicting` | Condition opposes primary scenario |
| `pending` | Condition awaiting catalyst or data |

Conditions are linked to areas: `structure`, `liquidity`, `macro`, `freshness`, `contradiction`, `regime`

---

## Evidence Drilldown Rows

Three categories of evidence items:

1. **Evidence Items** — Support the primary scenario (structure, macro, liquidity, sentiment)
2. **Contradiction Items** — Oppose or cap the primary scenario
3. **Freshness Items** — Source freshness state assessment

Each item has:
- `id` — Deterministic identifier
- `label` — Display name
- `category` — Evidence category
- `weight` — Derived from cognition scores
- `tone` — Visual tone indicator
- `summary` — Human-readable explanation
- `chartLink` — Optional link to chart overlay element type

---

## Panel Usage

| Panel | Scenario Fields Used |
|-------|---------------------|
| **Directional Bias (Bias)** | `primaryScenario`, `scenarioConfidence`, `scenarioTone`, `reviewWindow`, `cautionNote` |
| **Directional Bias (Scenario)** | `primaryScenario`, `alternateScenario`, `conditionSummary`, `cautionNote` |
| **Directional Bias (Drivers)** | `conditions[]` with status/tone/detail |
| **Confidence (Contradiction)** | `contradictionItems[]`, `conditionSummary` |
| **Evidence (Stack)** | `evidenceItems[]` with summary/tone |
| **Evidence (Insights)** | `primaryScenario`, `alternateScenario`, `contradictionItems[]` |
| **News/Macro drawer** | Macro-linked conditions |
| **Market Regime drawer** | Regime/liquidity-linked conditions |

---

## Chart Inspector Usage

| Overlay Type | Scenario Data Used |
|-------------|-------------------|
| **Structure zone** | Structure-linked evidence item, `zoneStrengthScore`, `conditionSummary` |
| **Liquidity band** | Liquidity evidence item, zone strength |
| **Scenario path** | `primaryScenario`, `scenarioConfidence`, `conditionSummary`, `reviewWindow` |
| **Macro marker** | Macro-linked evidence item |
| **Contradiction marker** | `contradictionItems[0]`, `contradictionScore`, `contradictionReason` |
| **Annotations** | `scenarioConfidence` |

---

## Drawer Drilldown

All 7 drawers now use scenario data:
- **Bias drawer:** Full scenario summary, condition checks, caution
- **Confidence drawer:** Scenario confidence, contradiction drilldown, condition summary
- **Evidence drawer:** Evidence items, contradiction items, freshness items
- **News/Macro drawer:** Macro-linked conditions, alternate scenario
- **Regime drawer:** Regime/liquidity conditions, cross-asset pulse

---

## Future Real-Engine Boundary

When live data becomes available:
1. Asset scenario profiles will be driven by real market extraction
2. Conditions will reflect actual structure/macro/freshness state
3. Evidence items will be generated from real signal alignment
4. Chart links will connect to dynamically placed overlay elements
5. Scenario confidence will reflect real-time conviction computation

---

## Review Workflow Integration

The review workflow engine (`dashboardReviewWorkflowFixtureEngine.ts`) consumes `DashboardScenarioSnapshot` and `DashboardCognitionSnapshot` to produce a market review checklist, readiness score, and market note draft fixtures.

---

_This document is the reference for the scenario fixture engine. Safe language only. No trading instructions._
