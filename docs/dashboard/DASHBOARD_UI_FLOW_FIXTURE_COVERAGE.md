# ELCEO Dashboard — UI Flow Fixture Coverage

Maps every dashboard-visible ELCEO feature/route from the UI/UX Flow Blueprint to the current fixture/component representation.

---

## Coverage Table

| Requirement | Dashboard fixture/component | Status | Future route |
|---|---|---|---|
| Dashboard main cockpit | All 7 panels + chart + topbar + sidebar | Represented | `/dashboard` |
| Asset cockpit (active asset) | `biasFixture.activeAsset` + chart zone + evidence/regime panels | Represented | `/dashboard/:asset` |
| Asset selector | `assetSelectorFixture` (favorites, launch priority, FX majors) | Fixture ready | `/dashboard/assets` |
| Market evidence | Evidence Stack panel + drawer with provider trace + route preview | Represented | `/market-evidence` |
| Journal quick capture | Coaching drawer `journalQuickCaptureFixture` + drawer action | Represented | `/journal/new` |
| Portfolio / Watchlist | Watchlist panel (ELCEO assets, sparklines, alerts, bias) | Represented | `/portfolio` |
| Analytics preview | Coaching drawer `analyticsPreviewFixture` (discipline, consistency) | Represented | `/analytics` |
| Coaching | Coaching Insights panel + drawer (checklist, tiles, journal prompt) | Represented | `/coaching` |
| Notifications summary | Topbar notification count + `notificationFixture` (topics, quiet hours) | Represented | `/notifications` |
| Account / social ID readiness | `accountReadinessFixture` + drawer action (Account Readiness) | Represented | `/account` |
| Billing / subscription state | `dashboardAccessFixture` (plan, live activation) + drawer action | Represented | `/billing` |
| Provider pending / fixture mode | Topbar badges + `providerTraceFixture` + evidence drawer trace | Represented | Provider readiness later |
| Plan state / Focus vs Kick off | `dashboardAccessFixture.plan` + `planState` in topbar | Represented | Plan gating (R9) |
| Restricted-user override | `dashboardAccessFixture.restricted` (false = no override shown) | Fixture ready | Access control (R9) |
| Market evidence source freshness | Evidence items with `freshness` field + confidence freshness metric | Represented | `/market-evidence` |
| Provider trace safe view | `providerTraceFixture` in evidence drawer (market data, news, macro, extraction) | Represented | Provider admin later |
| Risk / liquidity / regime | Market Regime panel (cross-asset pulse, correlation, liquidity, volatility) | Represented | `/dashboard` |
| Macro / news / currency split | News & Macro panel (Headlines timeline, Events flow, Compare split) | Represented | `/dashboard` |
| Chart annotation / cognition overlays | Chart zone (fixture display) | Placeholder | R7 — Chart intelligence overlays |
| Confidence / contradiction | Confidence & Context panel (4 metrics, conflicts, data quality) | Represented | `/dashboard` |
| Cross-asset pulse | Market Regime panel (7 assets with direction/strength/mini pulse) | Represented | `/dashboard` |
| Session / review window | `biasFixture.session` + `biasFixture.reviewWindow` + SessionBadge | Represented | `/dashboard` |
| Drawer deep views | All 4 drawer panels (bias, confidence, evidence, coaching) | Represented | R8 — Drawer routes |

---

## Fixture Groups in `responsivePanelFixtures.ts`

| Export | Purpose |
|---|---|
| `biasFixture` | Directional bias + active asset + drivers + session |
| `confidenceFixture` | Confidence metrics + conflicts + data quality |
| `watchlistFixture` | ELCEO launch assets with sparklines |
| `watchlistAlerts` | Asset-specific alert conditions |
| `evidenceFixture` | 9-item evidence stack with categories |
| `evidenceConviction` | Aggregate conviction score |
| `newsFixture` | 8 macro headlines |
| `macroEvents` | 5 scheduled macro events |
| `coachingFixture` | Coaching headline + checklist + tiles |
| `regimeFixture` | 7-asset cross-asset pulse |
| `regimeStrip` | Regime/volatility/liquidity/correlation |
| `dashboardAccessFixture` | Plan state, provider mode, live activation |
| `assetSelectorFixture` | Active asset, favorites, launch priority, FX majors |
| `journalQuickCaptureFixture` | Journal prompt, tags, emotion check |
| `routePreviewFixture` | 8 route access states |
| `notificationFixture` | Inbox count, topics, delivery state |
| `accountReadinessFixture` | Social ID, payment, security, billing |
| `analyticsPreviewFixture` | Discipline score, consistency, overconfidence |
| `providerTraceFixture` | Per-source provider status |

---

## Still Future / Full-Route Work

| Feature | Batch | Notes |
|---|---|---|
| Chart intelligence overlays | R7 | Zones, liquidity markers, annotations, asset selector |
| Drawer deep route prototypes | R8 | Evidence, Journal, Analytics, Coaching, Workspace |
| Auth / plan gating | R9 | Protected routes, plan toggle, restricted user |
| Provider adapter schemas | R10 | Fixture-to-live toggle, stale states |
| Accessibility hardening | R11 | ARIA, keyboard, reduced motion full audit |
| Production readiness | R12 | Tests, build, asset audit, launch checklist |

---

_Last updated: R5H batch_
