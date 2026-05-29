# ELCEO Dashboard — UI Flow Fixture Coverage (R6B)

Market-only production simulation. The dashboard represents market intelligence exclusively.

---

## Security Boundary: What Dashboard Must Not Expose

The ELCEO market dashboard intentionally does NOT show:

| Excluded Content | Reason | Future Surface |
|---|---|---|
| Account information | Not market content | Account page |
| Billing / subscription state | Not market content | Billing page |
| Social identifier readiness | Security-sensitive | Account page |
| Payment readiness | Security-sensitive | Billing page |
| Restricted-user access states | Internal access control | Admin surfaces |
| Notification preferences / delivery settings | Not market content | Notification settings page |
| Security / session / step-up information | Security-sensitive | Auth flows |
| Route URLs / path strings | Implementation detail | Router internals |
| Subscription wall implementation | Internal gating | Billing page |
| Raw provider payloads | Security-sensitive | Provider admin |
| Admin / super-admin readiness | Not user-facing | Admin surfaces |

**Safe market-facing labels allowed on dashboard:**
- Fixture Mode
- Provider Pending
- Source Freshness Watch
- Market Data Pending
- News Fixture
- Macro Fixture

---

## Panel Mode Architecture (Market-Only)

| Panel | Mode 0 | Mode 1 | Mode 2 | Mode 3 |
|-------|--------|--------|--------|--------|
| Directional Bias | Bias | Scenario | Drivers | Asset |
| Confidence & Context | Confidence | Contradiction | Freshness | Data Quality |
| Watchlist | Featured | FX Majors | Alerts | Scenario Map |
| Evidence · Insights | Stack | Insights | Provider Trace | Source Freshness |
| News & Macro | Headlines | Events | Currency Compare | Macro Pulse |
| Coaching · Journal | Coaching | Journal Note | Discipline | Behavior |
| Market Regime | Cross-Asset | Liquidity/Risk | Volatility | Correlation |

---

## Market Content Coverage

| Area | Dashboard Representation | Status |
|---|---|---|
| Asset cockpit | Bias / Asset mode + chart zone | Active |
| Directional bias | Bias mode — direction, strength, condition | Active |
| Scenario conditions | Scenario mode — primary, alternate, invalidation | Active |
| Driver analysis | Drivers mode — 5 drivers with freshness | Active |
| Confidence decomposition | Confidence mode — 6 metrics with donuts | Active |
| Contradiction analysis | Contradiction mode — conflicts, why not higher/lower | Active |
| Source freshness | Freshness mode + Evidence / Freshness mode | Active |
| Data quality | Data Quality mode — quality score, coverage, staleness | Active |
| Watchlist (priority) | Featured mode — XAU/USD, NAS100, SPX500, DE30, BTC/USD | Active |
| FX majors | FX Majors mode — 7 pairs with sparklines | Active |
| Scenario alerts | Alerts mode — zone retest, contradiction, momentum | Active |
| Scenario map | Scenario Map mode — tracked asset scenarios | Active |
| Evidence stack | Stack mode — 10 items with weight bars | Active |
| Market insights | Insights mode — summary, supports, contradictions | Active |
| Provider trace (safe) | Provider mode — market/news/macro/extraction labels | Active |
| Macro headlines | Headlines mode — vertical timeline, impact colors | Active |
| Event calendar | Events mode — flowing timeline with linking lines | Active |
| Currency compare | Currency mode — USD/Gold, USD/JPY, EUR/USD, yields | Active |
| Macro pulse | Macro Pulse mode — central bank, liquidity, risk | Active |
| Coaching | Coaching mode — headline, checklist, body | Active |
| Journal note | Journal Note mode — prompt, tags, emotional state | Active |
| Discipline metrics | Discipline mode — score, consistency, caution | Active |
| Behavior overlay | Behavior mode — readiness gate, recent quality | Active |
| Cross-asset pulse | Cross-Asset mode — 7 assets with mini pulse | Active |
| Liquidity / risk | Liquidity mode — regime strip, spread | Active |
| Volatility | Volatility mode — regime, event risk, session note | Active |
| Correlation | Correlation mode — 5 cross-asset pairs | Active |

---

## Sidebar (Market Cockpit Controls)

| Button | Title |
|--------|-------|
| Cockpit | Market Cockpit |
| Chart | Chart Context |
| Assets | Watchlist Assets |
| Evidence | Evidence Stack |
| Macro | News & Macro |
| Regime | Market Regime |
| Journal | Journal & Coaching |

---

## Drawer Actions (Market-Only)

- Expand Evidence
- Capture Journal Note
- Save Market View
- Review Scenario
- Compare Assets
- Inspect Freshness

---

## Intentionally Separated (Future Surfaces)

| Feature | Future Batch | Notes |
|---------|-------------|-------|
| Account page | R9 | Social ID, profile, security |
| Billing page | R9 | Subscription, payment, plan management |
| Notification settings | R9 | Delivery, preferences, channels |
| Auth / plan gating | R9 | Protected routes, restricted user |
| Admin surfaces | R9+ | Read-only admin, super-admin step-up |
| Chart overlays | R7 | Zones, annotations, asset selector |
| Deep route pages | R8 | Full evidence, journal, analytics pages |

---

_Last updated: R6B batch_
