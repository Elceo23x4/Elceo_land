# ELCEO Dashboard — Source Freshness + Evidence Quality Fixture Engine

## Purpose

The Source Freshness Fixture Engine checks whether market context is fresh, complete, stale, incomplete, or under review. It produces per-layer freshness assessments, evidence quality scores, missing context warnings, and confidence impact explanations — all market-facing and fixture-only.

---

## Deterministic Design

- Pure function: `getDashboardSourceFreshnessSnapshot(asset, timeframe, cognition, scenario, conditionWatch, crossAsset)`
- No `Math.random`, `Date.now`, `new Date`
- No `fetch`, `axios`, `WebSocket`, `EventSource`, `setInterval`
- No `localStorage`, `sessionStorage`
- Same input always produces the same output
- Safe market language only — no backend/provider/API exposure

---

## Relationship to Upstream Engines

```
Cognition → Scenario → ReviewWorkflow → ConditionWatch → CrossAsset → SourceFreshness
```

Uses:
- `cognition.freshnessScore` as base score
- `cognition.evidenceWeight` and `contradictionScore` for quality assessment
- `scenario.scenarioConfidence` for scenario freshness
- `conditionWatch.topPriority` for watch sensitivity
- Timeframe sensitivity multiplier (15M=1.3, 1H=1.0, 4H=0.8, 1D=0.6)

---

## Source Freshness States

| State | Score Range | Meaning |
|-------|------------|---------|
| `fresh` | ≥ 75 | Context adequate for review |
| `watch` | 60–74 | Approaching freshness boundary |
| `stale_risk` | 45–59 | Review sources before escalation |
| `incomplete` | 30–44 | Multiple layers need review |
| `fixture_only` | < 30 | Fixture mode — no live data |

---

## Layer Fields

7 layers assessed:
1. **Chart data** — Chart fixture freshness
2. **Macro context** — Macro/event freshness (timeframe-sensitive)
3. **News context** — News freshness (timeframe-sensitive)
4. **Cross-asset context** — Cross-asset relationship freshness
5. **Evidence alignment** — Evidence stack quality
6. **Scenario freshness** — Scenario condition currency
7. **Condition watch state** — Watch priority impact on freshness

Each layer has: id, label, state, tone, score, detail, confidenceImpact, linkedArea

---

## Evidence Quality Fields

| Item | Derivation |
|------|-----------|
| Evidence coverage | evidenceWeight + 5 |
| Contradiction clarity | 100 - contradictionScore |
| Context alignment | scenarioConfidence |

---

## Missing Context

Layers with score < 60 are flagged as missing context with detail explaining confidence impact.

---

## Panel Usage

| Panel | Freshness Content |
|-------|------------------|
| **Confidence (Freshness)** | overallScore, strongest/weakest layer, staleRisk, reviewCue |
| **Confidence (Data Quality)** | overallScore, overallState, evidenceQuality items, confidenceImpact |
| **Evidence (Insights)** | summary line |
| **Evidence (Source Status)** | layers with state/score |
| **Evidence (Freshness)** | overallScore, missingContext, staleRisk, freshnessWatch, reviewCue |

---

## Chart Inspector Usage

Freshness annotations show: weakest layer, stale risk score, and summary.

---

## Drawer Usage

| Drawer | Freshness Content |
|--------|------------------|
| **Confidence** | Overall score, strongest/weakest layers, confidence impact |
| **Evidence** | Full layer list, missing context, stale risk |

---

## No-Backend/Provider Boundary

- No backend service names exposed
- No provider trace/pending language
- No API endpoint references
- All freshness is described in market-facing terms only
- Source quality is explained through "evidence coverage", "context alignment", "stale risk"

---

## No-Live-Data Boundary

- All freshness scores derived from fixture cognition scores
- No real-time data quality monitoring
- Freshness changes only when user selects different asset/timeframe
- When live data exists, freshness will reflect actual source timestamps

---

## Future Real Source Freshness Boundary

When live data becomes available:
1. Each layer will have actual last-updated timestamps
2. Freshness scores will decay over time
3. Missing context will reflect actual data gaps
4. Stale risk will trigger real condition watch escalation
5. Evidence quality will be computed from real extraction coverage

---

_This document is the reference for the source freshness fixture engine. Safe language only. No backend/provider exposure._
