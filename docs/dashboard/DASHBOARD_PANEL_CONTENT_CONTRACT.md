# Dashboard Panel Content Contract

**Batch:** 6  
**Date:** 2026-05-25

---

## 1. Purpose

Batch 6 populates the first two panel slots with real ELCEO reasoning
content using fixture-only data and the Batch 2 component system.

---

## 2. Panels Populated

Only two panels are filled in this batch:

1. **Directional Bias Summary** — shows headline bias, strength, drivers
2. **Confidence & Context Matrix** — tabbed workspace with snapshot/drivers/caution

All other slots remain empty.

---

## 3. Fixture-Only Reasoning Data

- Data is deterministic, locally stored in `dashboardReasoningFixture.ts`
- No real market prices or asset names
- No backend API calls
- No live provider connections
- Data is typed via `dashboardReasoningTypes.ts`

---

## 4. No Live Data / No Backend Calls

- No fetch(), axios, WebSocket, or EventSource calls
- No streaming
- No timers or intervals
- Static fixture data only

---

## 5. No Trading Instruction Language

Panel content avoids: buy, sell, hold, entry, target, stop loss,
guaranteed, profit, risk-free, sure win, signal to enter, prediction certainty.

Uses neutral reasoning language: bias, pressure, condition, contradiction,
freshness, evidence, driver, reasoning, watch condition.

---

## 6. PanelWorkspace Internal Page Model

The Confidence & Context panel uses PanelWorkspace with internal tabs:
- Snapshot: status rows
- Drivers: conflict list + hover popover
- Caution: warnings + detail drawer trigger

No route changes occur during tab switching.

---

## 7. Hover → Pin → Drawer Model

- HoverInsightPopover: hover/focus shows summary, click pins with detail
- DetailDrawer: opened from Caution tab, shows full context breakdown
- Both use existing Batch 2 components
- Scoped CSS overrides keep them compact within cockpit

---

## 8. Connectors Remain Suspended

SHOW_CONNECTOR_LAYER remains false. Connector lines are quarantined
until exact post-panel calibration in a future batch.

---

## 9. What Is Intentionally Not Done

- No chart overlays
- No watchlist panel
- No evidence panel
- No macro intelligence panel
- No coaching panel
- No market regime panel
- No live data
- No backend integration
- No real asset names

---

## 10. Next Batch Recommendation

Batch 7 should focus on:
- Watchlist panel slot content
- Evidence/reasoning panel slot content
- Possible connector layer re-enablement after panel calibration
