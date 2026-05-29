# ELCEO Dashboard — UI Flow Fixture Coverage (R6A)

Production-simulation content architecture mapping every user-facing ELCEO surface
to its dashboard panel/mode/drawer representation.

---

## Panel Mode Architecture

| Panel | Mode 0 | Mode 1 | Mode 2 | Mode 3 |
|-------|--------|--------|--------|--------|
| Directional Bias | Bias | Scenario | Readiness | Asset |
| Confidence & Context | Confidence | Contradiction | Freshness | Access |
| Watchlist | Featured | FX Majors | Alerts | Portfolio |
| Evidence · Insights | Stack | Insights | Provider Trace | Source Freshness |
| News & Macro | Headlines | Events | Currency Compare | Macro Pulse |
| Coaching · Journal | Coaching | Journal | Analytics | Behavior |
| Market Regime | Cross-Asset | Liquidity/Risk | Notifications | Account/Billing |

---

## UI Flow Coverage Table

| UI Flow Area | Panel / Mode | Fixture Export | Route Preview | Status |
|---|---|---|---|---|
| Dashboard asset cockpit | Bias / Asset mode | `assetCockpitFixture` | `/dashboard/xau-usd` | Represented |
| Directional bias | Bias / Bias mode | `biasFixture` | — | Represented |
| Scenario conditions | Bias / Scenario mode | `biasFixture.scenarios` | — | Represented |
| Confidence decomposition | Confidence / Confidence mode | `confidenceDecompositionFixture` | — | Represented |
| Contradiction analysis | Confidence / Contradiction mode | `confidenceDecompositionFixture.conflicts` | — | Represented |
| Source freshness | Confidence / Freshness + Evidence / Freshness | `confidenceDecompositionFixture`, `marketInsightsFixture` | — | Represented |
| Access / plan gating | Confidence / Access mode | `accountBillingReadinessFixture` | `/account/billing` | Represented |
| Watchlist (priority assets) | Watchlist / Featured mode | `launchAssetUniverseFixture.priorityAssets` | — | Represented |
| FX majors | Watchlist / FX Majors mode | `launchAssetUniverseFixture.fxMajors` | — | Represented |
| Alerts | Watchlist / Alerts mode | `portfolioWatchlistFixture.alerts` | — | Represented |
| Portfolio / tracked scenarios | Watchlist / Portfolio mode | `portfolioWatchlistFixture` | `/portfolio` | Represented |
| Evidence stack | Evidence / Stack mode | `evidenceStackFixture` | `/market-evidence` | Represented |
| Market insights | Evidence / Insights mode | `marketInsightsFixture` | — | Represented |
| Provider trace (safe view) | Evidence / Provider mode | `providerTraceFixture` | — | Represented |
| Macro headlines | News / Headlines mode | `macroIntelligenceFixture.headlines` | — | Represented |
| Event calendar | News / Events mode | `macroIntelligenceFixture.events` | — | Represented |
| Currency compare | News / Currency mode | `macroIntelligenceFixture.currencyCompare` | — | Represented |
| Macro pulse | News / Macro Pulse mode | `macroIntelligenceFixture.macroPulse` | — | Represented |
| Coaching | Coaching / Coaching mode | `coachingFixture` | `/coaching` | Represented |
| Journal quick capture | Coaching / Journal mode | `journalQuickCaptureFixture` | `/journal/new` | Represented |
| Analytics preview | Coaching / Analytics mode | `analyticsPreviewFixture` | `/analytics` | Represented |
| Behavior overlay | Coaching / Behavior mode | `coachingFixture.behaviorOverlay` | — | Represented |
| Cross-asset pulse | Regime / Cross-Asset mode | `regimeFixture` | — | Represented |
| Liquidity / risk | Regime / Liquidity mode | `regimeStrip` | — | Represented |
| Notifications readiness | Regime / Notifications mode | `notificationReadinessFixture` | `/notifications` | Represented |
| Account & billing | Regime / Account mode | `accountBillingReadinessFixture` | `/account`, `/account/billing` | Represented |
| Subscription wall preview | Confidence / Access + Regime / Account | `accountBillingReadinessFixture.subscriptionWallPreview` | `/account/billing` | Represented |
| Provider pending states | Evidence / Provider + topbar badges | `providerTraceFixture`, `dashboardAccessFixture` | — | Represented |
| Restricted user caveat | Confidence / Access mode | `accountBillingReadinessFixture.restrictedUser` | — | Represented |
| Kick off vs Focus gating | Confidence / Access mode | `dashboardAccessFixture.planState` | — | Represented |
| Chart intelligence overlays | Chart zone (fixture display) | — | — | Future (R7) |
| Admin read-only surfaces | — | — | — | Future (R9) |
| Super Admin step-up surfaces | — | — | — | Future (R9) |

---

## Sidebar Route Surface Mapping

| Button | Label | Route Context (title/aria) |
|--------|-------|---------------------------|
| Dashboard | Dashboard | Dashboard — Asset Cockpit |
| Assets | Assets | Assets — Portfolio / Watchlist |
| Evidence | Evidence | Market Evidence — Source Freshness |
| Journal | Journal | Journal — Quick Capture |
| Analytics | Analytics | Analytics — Coaching / Behavior |
| Notifications | Notifications | Notifications — Preferences |
| Account | Account | Account — Billing / Readiness |

---

## Drawer Route Previews

| Drawer | Route Previews Shown |
|--------|---------------------|
| Bias | `/dashboard/xau-usd` |
| Confidence | Plan + billing readiness |
| Evidence | `/market-evidence`, provider trace, persistence |
| Coaching | `/journal`, `/analytics`, `/coaching` |
| News | `/market-evidence`, `/notifications` |
| Regime | `/notifications`, `/account`, `/account/billing` |

---

## Fixture Export Groups (14)

1. `assetCockpitFixture` — active asset, timeframe, session, route
2. `launchAssetUniverseFixture` — priority assets + FX majors (12 total)
3. `evidenceStackFixture` — 10-item evidence hierarchy
4. `marketInsightsFixture` — summary, supports, contradictions, caution
5. `confidenceDecompositionFixture` — 6 metrics, 3 conflicts, quality
6. `macroIntelligenceFixture` — headlines, events, currency, macro pulse
7. `journalQuickCaptureFixture` — prompt, tags, emotional state, fields
8. `portfolioWatchlistFixture` — scenarios, alerts, workspace, route
9. `analyticsPreviewFixture` — discipline, consistency, behavior caution
10. `coachingFixture` — headline, checklist, tiles, behavior overlay
11. `notificationReadinessFixture` — inbox, topics, channels, delivery
12. `accountBillingReadinessFixture` — plan, social ID, billing, wall
13. `providerTraceFixture` — per-source provider status
14. `routePreviewFixture` — 11 typed route previews with access states

---

## Still Future

| Feature | Batch | Notes |
|---------|-------|-------|
| Chart intelligence overlays | R7 | Zones, annotations, asset selector |
| Drawer deep route pages | R8 | Full page views for evidence, journal, analytics |
| Auth / plan gating enforcement | R9 | Protected routes, restricted user handling |
| Provider adapter integration | R10 | Fixture-to-live toggle |
| Accessibility hardening | R11 | ARIA audit, keyboard nav, reduced motion |
| Production readiness | R12 | Tests, build, launch checklist |

---

_Last updated: R6A batch_
