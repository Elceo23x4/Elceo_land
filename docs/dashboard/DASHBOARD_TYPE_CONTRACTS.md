# ELCEO Dashboard — Type Contracts

## Shared Tone Type

**Source:** `src/dashboard/responsive/responsivePanelFixtures.ts`

```ts
export type Tone = "positive" | "negative" | "warning" | "neutral" | "stale" | "pending";
```

This is the single dashboard tone contract. All tone-bearing fields across the dashboard must be compatible with this type.

---

## Engine Tone Aliases

All fixture engines re-export tone aliases that resolve to the shared `Tone`:

| Engine | Alias | Source |
|--------|-------|--------|
| Cognition | `DashboardCognitionTone` | `= Tone` (imported from responsivePanelFixtures) |
| Scenario | `ScenarioTone` | `= DashboardCognitionTone` |
| Review Workflow | `ReviewCheckTone` | `= DashboardCognitionTone` |
| Condition Watch | `ConditionWatchTone` | `= DashboardCognitionTone` |
| Cross-Asset | `CrossAssetTone` | `= DashboardCognitionTone` |
| Source Freshness | `SourceFreshnessTone` | `= DashboardCognitionTone` |

All aliases automatically inherit the full `Tone` union, ensuring any engine output can be passed directly to UI components.

---

## Why Type Casts Should Be Avoided

- Casts (`as Tone`) hide type mismatches that indicate real incompatibilities.
- If an engine produces a value outside the shared `Tone` union, the correct fix is to widen the union — not to cast.
- If a UI component accepts `Tone`, all data flowing to it must already be `Tone`-compatible at the source.

---

## Tone Value Usage Guidelines

| Value | Meaning | Color |
|-------|---------|-------|
| `positive` | Favorable market context, elevated confidence, upside pressure | Green `#5cba6e` / `#1de074` |
| `negative` | Adverse context, downside pressure, high contradiction | Red `#e05555` / `#ff4d5e` |
| `warning` | Caution, conditional, pending macro event | Amber `#d4a853` / `#f0a11a` |
| `neutral` | No clear direction, watching, no setup | Muted `#8a8178` / `#7b6650` |
| `stale` | Data quality concern, source freshness degraded | Gray `#8a8178` |
| `pending` | Awaiting data, fixture mode marker, scheduled | Gold `#d4a853` |

---

## Other Type Notes

- `ReviewCheckStatus` (`"complete" | "watch" | "pending" | "caution"`) is a string literal union. It is assignable to `string` (used in `DataRow` value prop).
- `MarketPulseCardProps.tone` accepts `Tone` directly (fixed in V1B-6).
- `DataRow.tone` accepts `Tone | undefined`.

---

_This document is a reference for dashboard type discipline. Do not introduce new tone unions without updating this contract._
