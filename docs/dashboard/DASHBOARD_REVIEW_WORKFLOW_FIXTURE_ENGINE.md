# ELCEO Dashboard — Review Workflow Fixture Engine

## Purpose

The Review Workflow Fixture Engine simulates how ELCEO helps a user review market context, evidence, contradiction, freshness, and discipline before saving a market note. It produces a structured review checklist, readiness score, market note draft, and coaching prompts — all deterministic and fixture-only.

---

## Deterministic Design

- Pure function: `getDashboardReviewWorkflowSnapshot(asset, timeframe, cognition, scenario)`
- No `Math.random`, `Date.now`, `new Date`
- No `fetch`, `axios`, `WebSocket`, `EventSource`, `setInterval`
- No `localStorage`, `sessionStorage`
- Same input always produces the same output
- Safe language only

---

## Relationship to Cognition Engine

The review workflow engine sits downstream of both engines:

```
Asset + Timeframe
  → getDashboardCognitionSnapshot (scores)
    → getDashboardScenarioSnapshot (scenarios + conditions)
      → getDashboardReviewWorkflowSnapshot (checklist + note draft + coaching)
```

---

## Relationship to Scenario Engine

The review workflow consumes `DashboardScenarioSnapshot` for:
- `scenarioConfidence` — used in readiness calculation
- `primaryScenario` — used as note draft summary
- `conditions` — referenced for checklist context
- `contradictionItems` — informs contradiction check status
- `reviewWindow` — used as next review cue

---

## reviewState Logic

```
if freshnessScore < 60         → "needs_freshness_check"
else if contradictionScore > 55 → "contradiction_watch"
else if scenarioConfidence < 55 → "scenario_watch"
else                            → "ready_for_review"
```

---

## readinessScore Derivation

```
readinessScore = clamp(
  confidenceScore × 0.30 +
  evidenceWeight × 0.25 +
  freshnessScore × 0.25 +
  (100 - contradictionScore) × 0.20,
  0, 100
)
```

---

## Checklist Fields

| Check | Linked Area | Logic |
|-------|------------|-------|
| Scenario reviewed | scenario | scenarioConfidence ≥ 55 → complete |
| Evidence alignment checked | evidence | evidenceWeight ≥ 55 → complete |
| Contradiction acknowledged | contradiction | ≥ 45 → caution, ≥ 35 → watch |
| Source freshness verified | freshness | ≥ 70 → complete, ≥ 60 → watch |
| Discipline check | discipline | readinessScore ≥ 60 → complete |
| Market regime context | regime | zoneStrengthScore ≥ 60 → complete |

---

## Market Note Draft Fields

| Field | Source |
|-------|--------|
| `title` | `{asset} · {timeframe} Market Review` |
| `summary` | `scenario.primaryScenario` |
| `evidenceLine` | `cognition.evidenceSummary` |
| `contradictionLine` | `cognition.contradictionReason` |
| `freshnessLine` | `cognition.freshnessReason` |
| `cautionLine` | `scenario.cautionNote` |
| `reviewWindow` | `scenario.reviewWindow` |
| `tags` | Asset, timeframe, "scenario", "evidence", "review" |

---

## Panel Usage

| Panel | Review Workflow Fields |
|-------|----------------------|
| **Coaching (Coaching)** | `coachingPrompt`, `readinessScore`, `reviewState`, `nextReviewCue`, `disciplineReminder` |
| **Coaching (Journal Note)** | `noteDraft.*` — title, summary, evidence, contradiction, freshness, caution, tags |
| **Coaching (Discipline)** | `readinessScore`, filtered checklist (discipline/scenario/evidence) |
| **Coaching (Behavior)** | `reviewState`, filtered checklist (contradiction/freshness), `nextReviewCue` |

---

## Drawer Usage

| Drawer | Review Workflow Content |
|--------|----------------------|
| **Bias** | `reviewState`, scenario checklist items |
| **Confidence** | `readinessScore`, contradiction/freshness checklist items |
| **Evidence** | Evidence checklist items, `noteDraft.evidenceLine` |
| **Coaching** | Full `noteDraft`, complete `checklist`, `readinessScore`, `nextReviewCue` |
| **Market Regime** | Regime checklist items, `disciplineReminder` |

---

## Chart Inspector Usage

The inspector shows concise review context in the `assetContextLine`:
- Zone: "Review: ready for review" or "Review: needs freshness check"
- Annotation: "Next review: {reviewWindow}"
- Path: "Review window: {reviewWindow}"

---

## No-Persistence Boundary

- No data is saved to localStorage or sessionStorage
- Market note drafts are generated deterministically on each render
- No user-specific state persists between sessions
- When real journal/persistence exists, the note draft will feed into a save workflow

---

## Future Real Journal Boundary

When the real journal system exists:
1. `noteDraft` will be used as a pre-filled template for user confirmation
2. Checklist completion will gate the "Save Note" action
3. Tags will be persisted with the journal entry
4. Review history will be stored server-side
5. Readiness scores will be tracked over time for discipline analysis

---

## Condition Watch Integration

The condition watch fixture engine (`dashboardConditionWatchFixtureEngine.ts`) consumes the review workflow and scenario/cognition snapshots to produce market condition watch items. These are market context conditions to monitor — not notification settings or delivery preferences.

The cross-asset fixture engine (`dashboardCrossAssetFixtureEngine.ts`) consumes condition watch output to explain correlation, liquidity, risk tone, and external pressure relationships between assets.

---

_This document is the reference for the review workflow fixture engine. Safe language only. No trading instructions._
