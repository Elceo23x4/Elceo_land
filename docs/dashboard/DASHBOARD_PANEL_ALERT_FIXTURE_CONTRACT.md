# ELCEO Dashboard — Panel Alert Fixture Contract

## Purpose

Per-panel market alert toggles that allow users to arm/disarm condition watch alerts for each of the 7 dashboard panels. Frontend fixture-only simulation — no backend available in this repository.

---

## Frontend Fixture-Only Boundary

- There is no backend alert/email/WhatsApp implementation in this frontend repo.
- The fixture service (`dashboardPanelAlertService.ts`) returns immediately with no network call.
- No `fetch`, `axios`, `WebSocket`, `EventSource`, `setTimeout`, `setInterval`.
- No `localStorage` or `sessionStorage`.
- When a real backend client/contract is provided, the fixture service will be replaced.
- No fake endpoints or API paths are invented.

---

## Supported Panels

All 7 dashboard panels have alert support:

| Panel | Triggers |
|-------|----------|
| Directional Bias | scenario_change, condition_watch_high, review_window |
| Confidence & Context | contradiction_watch, freshness_watch, source_quality_watch |
| Watchlist | condition_watch_high, cross_asset_pressure |
| Evidence · Insights | source_quality_watch, freshness_watch |
| News & Macro | macro_condition_watch, condition_watch_high |
| Coaching · Journal | review_window, condition_watch_high |
| Market Regime | cross_asset_pressure, scenario_change |

---

## Supported Channels

- **Email** — market condition alert via email
- **WhatsApp** — market condition alert via WhatsApp

Channels are labels only in this fixture implementation. No delivery occurs.

---

## Alert State Model

| State | Meaning |
|-------|---------|
| `off` | Alert not armed |
| `armed` | Alert armed — bell shows active accent |
| `paused` | Alert temporarily paused (future) |
| `pending` | Alert state pending confirmation (future) |

---

## Fixture Service Behavior

```typescript
async function updateDashboardPanelAlertPreference(update): Promise<{ ok: true; mode: "fixture"; updated }>
```

- Returns immediately
- No network
- Marks `mode: "fixture"`
- Replace with real backend client when contract is available

---

## Bell Icon Toggle

- Inline SVG bell icon inside each PrecisionPanelGroup
- Click toggles between `off` and `armed`
- Armed state shows gold accent color
- Off state shows muted/transparent bell
- `aria-label` and `title` reflect state + summary
- Keyboard accessible
- Does not block UI
- No modal/popup/settings page

---

## Future Backend Replacement Contract

When backend alert client is available:

1. Replace `dashboardPanelAlertService.ts` with real HTTP client
2. Add authentication headers from session
3. Persist alert preferences server-side
4. Enable real Email and WhatsApp delivery
5. Add delivery status tracking
6. Full alert channel configuration will belong to a Settings/Notification Preferences page — not the dashboard

---

## Boundaries

- Dashboard shows per-panel market alert toggles and channel labels only.
- Dashboard does NOT expose full notification preference management.
- Dashboard does NOT show account/security/billing details.
- Full notification preferences belong to a future Settings/Notification Preferences page.
- No backend/API payloads in dashboard runtime.

---

_This document is the reference for the panel alert fixture contract. Safe language only._
