# ELCEO Dashboard — Condition Watch Fixture Engine

## Purpose

The Condition Watch Fixture Engine produces structured market condition watch items that simulate what ELCEO would ask a user to monitor next. This includes structure confirmation, liquidity reaction, macro event caution, contradiction rise, freshness review, volatility/regime change, scenario alignment, and evidence watch.

This is **market condition context**, not notifications or delivery settings.

---

## Deterministic Design

- Pure function: `getDashboardConditionWatchSnapshot(asset, timeframe, cognition, scenario, reviewWorkflow)`
- No `Math.random`, `Date.now`, `new Date`
- No `fetch`, `axios`, `WebSocket`, `EventSource`, `setInterval`
- No `localStorage`, `sessionStorage`
- Same input always produces the same output
- Safe language only — no trading instructions, no "signal" language

---

## Relationship to Cognition/Scenario/Review Workflow

```
Asset + Timeframe
  → CognitionSnapshot (scores)
    → ScenarioSnapshot (scenarios + conditions)
      → ReviewWorkflowSnapshot (checklist + note draft)
        → ConditionWatchSnapshot (watch items + priorities)
```

The condition watch engine is the final layer in the fixture pipeline, consuming all upstream snapshots.

---

## Condition Watch Item Fields

| Field | Type | Purpose |
|-------|------|---------|
| `id` | string | Deterministic identifier |
| `label` | string | Human-readable watch label |
| `priority` | "high" \| "medium" \| "low" | Watch urgency |
| `tone` | Tone | Visual tone indicator |
| `category` | string | scenario/structure/liquidity/macro/contradiction/freshness/volatility/regime/evidence |
| `detail` | string | Concise watch description |
| `reviewCue` | string | When/what to review next |
| `linkedPanel` | string | Which panel this watch relates to |
| `chartLink` | string? | Optional chart overlay link type |

---

## Priority Logic

| Condition | Priority | Threshold |
|-----------|----------|-----------|
| Structure zone | high if zoneStrength ≥ 70, medium if ≥ 50 | Zone strength score |
| Scenario alignment | high if confidence < 45, medium if < 60 | Scenario confidence |
| Contradiction | high if > 55, medium if > 38 | Contradiction score |
| Freshness | high if < 60, medium if < 70 | Freshness score |
| Macro event | high if pending condition exists | Scenario conditions |
| Liquidity | medium if variable/lower liquidity | Liquidity condition text |
| Volatility/Regime | high if elevated/breakout | Volatility condition text |
| Evidence | high if weight < 50, medium if < 60 | Evidence weight score |

`topPriority` = highest priority among all items.

---

## Watch Categories Generated

1. **Structure watch** — Zone confirmation/rejection monitoring
2. **Scenario watch** — Scenario condition alignment status
3. **Contradiction watch** — Cross-context tension monitoring
4. **Freshness watch** — Source freshness verification
5. **Macro watch** — Macro event caution
6. **Liquidity watch** — Liquidity band reaction
7. **Regime/Volatility watch** — Regime change and volatility caution
8. **Evidence watch** — Evidence alignment monitoring

---

## Panel Usage

| Panel | Watch Content |
|-------|-------------|
| **Directional Bias (Scenario)** | Top priority watch item detail |
| **Watchlist (Alerts/Watch)** | Top 5 condition watch items |
| **Watchlist (Scenario Map)** | Watch summary line |
| **Evidence (Freshness)** | Freshness watch items |
| **News/Macro (Macro Pulse)** | Macro watch items |
| **Market Regime (Volatility)** | Regime watch items |
| **Coaching (Behavior)** | Top condition watch item |

---

## Drawer Usage

| Drawer | Watch Content |
|--------|-------------|
| **Bias** | Structure watch items in review checklist |
| **Evidence** | Freshness watch + contradiction watch items |
| **News/Macro** | Macro condition watch section |
| **Market Regime** | Regime + liquidity watch items |

---

## Chart Inspector Usage

Each overlay type shows a matching watch item by `chartLink`:

| Overlay | chartLink Match | Watch Context |
|---------|----------------|---------------|
| Structure zone | `structure-zone` | Structure condition watch |
| Liquidity band | `liquidity-band` | Liquidity reaction watch |
| Scenario path | `scenario-path` | Scenario alignment watch |
| Macro marker | `macro-marker` | Macro event caution |
| Contradiction marker | `contradiction-marker` | Contradiction context watch |
| Freshness annotation | `freshness-note` | Source freshness watch |

---

## No-Notification Boundary

- This is NOT a notification system
- No delivery preferences (push, email, SMS, webhook)
- No notification settings UI
- No alert scheduling or subscription management
- Watch items are inline market context — they appear within panels and inspector
- They represent "what to monitor" not "how to be notified"

---

## No-Live-Data Boundary

- All watch items are derived from fixture scores
- No real-time market data triggers watch state changes
- Watch priorities change only when user selects different asset/timeframe
- When live data exists, watch items will be driven by real market extraction

---

## Future Real-Condition-Watch Boundary

When live data becomes available:
1. Watch priorities will be driven by real-time score changes
2. Structure/liquidity/macro conditions will reflect actual market state
3. Watch items may trigger visual emphasis changes in the chart overlay
4. Integration with a real notification system (separate from dashboard panels) may exist
5. Persistence of watch acknowledgment state will require user session

---

_This document is the reference for the condition watch fixture engine. Safe language only. No trading instructions. No notification delivery._
