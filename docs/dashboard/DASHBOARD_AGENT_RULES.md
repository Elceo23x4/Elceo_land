# ELCEO Dashboard Agent Rules

Read this file before making any changes to the ELCEO dashboard.

---

## Non-negotiable dashboard boundary

- Dashboard is **market intelligence only**.
- Do not show account, billing, security, subscription, restricted-user, social identifier, payment, notification settings, admin, or route-gating details inside market panels.
- Do not expose route paths (e.g. `/market-evidence`, `/journal`, `/account`) in dashboard runtime content.
- Do not expose raw provider/source payloads.
- Use only safe market-facing status labels: **Fixture Mode**, **Market Data State**, **Source Status**, **Source Freshness**, **Market Data Pending**.

---

## Geometry rules

- Do not change `PANEL_FRAME_RECTS` unless user explicitly gives new panel geometry.
- Do not change `PANEL_CONTENT_RECTS` unless user explicitly gives new content geometry.
- Do not change `SHELL_RECTS` unless user explicitly gives new chart/sidebar/topbar/wheel geometry.
- Do not return to poster/contain mode.
- Do not use generic CSS grid placement for dashboard cockpit runtime.
- **Fluid coordinate canvas** is the active layout method.

---

## Asset/SVG rules

- Do not modify SVG source files unless user explicitly asks.
- Do not redraw panel frames generically.
- Do not use old full-board RevB shell as runtime.
- Isolated panel/frame assets remain the runtime shell source.

---

## Data rules

- No live data in dashboard fixture batches.
- No `fetch`, `axios`, `WebSocket`, `EventSource`, `setInterval`.
- Fixture data must be deterministic and clearly safe.
- Asset universe must remain ELCEO-specific:
  `XAU/USD, NAS100, SPX500, DE30, BTC/USD, EUR/USD, GBP/USD, USD/JPY, USD/CHF, AUD/USD, NZD/USD, USD/CAD`

---

## Timeframe rules

- Timeframe selector is fixture/local state only until live data boundary exists.
- Timeframe changes must not imply live data.
- Timeframe must not trigger network calls.
- Timeframe must not change layout geometry.
- Supported timeframes: `15M, 1H, 4H, 1D`.

---

## Cognition fixture engine rules

- Cognition fixture engine must remain deterministic (same input → same output).
- No `Math.random`, `Date.now`, `new Date`, network calls, or timers.
- Fixture scores must not imply live market advice.
- Score copy must use safe scenario/evidence/confidence language.
- Engine is located in `src/dashboard/responsive/dashboardCognitionFixtureEngine.ts`.

---

## Scenario fixture engine rules

- Scenario fixture engine must remain deterministic.
- Scenario engine must not use unsafe recommendation language.
- Scenario engine must not imply live market advice.
- Engine is located in `src/dashboard/responsive/dashboardScenarioFixtureEngine.ts`.

---

## Review workflow fixture rules

- Review workflow fixture must remain deterministic.
- No `localStorage`, `sessionStorage`, or persistence in dashboard fixture batches.
- Generated market note drafts are fixture previews only.
- No account/user private information in market note fixtures.
- Engine is located in `src/dashboard/responsive/dashboardReviewWorkflowFixtureEngine.ts`.

---

## Condition watch fixture rules

- Condition watch is market context only, not notification delivery.
- Do not use "signal" language for watch items — use "condition watch" or "review condition."
- No notification settings/preferences inside dashboard panels.
- No notification delivery, push, email, or channel content.
- Engine is located in `src/dashboard/responsive/dashboardConditionWatchFixtureEngine.ts`.

---

## Cross-asset fixture engine rules

- Cross-asset engine must remain deterministic.
- No live correlation claims — all relationships are fixture context.
- All cross-asset language must be framed as fixture market context.
- Avoid "signal" completely; use cue/condition/pressure/context.
- Engine is located in `src/dashboard/responsive/dashboardCrossAssetFixtureEngine.ts`.

---

## Source freshness fixture engine rules

- Source freshness is market-facing only — describes evidence/data quality.
- Do not expose backend, provider, API, or internal payload details.
- Use only: Source Status, Source Freshness, Market Data State, Evidence Quality.
- Do not use: Provider Trace, Provider Pending, or any internal service names.
- Engine is located in `src/dashboard/responsive/dashboardSourceFreshnessFixtureEngine.ts`.

---

## Dashboard panel alert rules

- Panel market alert toggles are allowed in the dashboard.
- They are per-panel market condition toggles, not notification preference management.
- Dashboard may show Email/WhatsApp as channel labels only.
- Dashboard must not expose account/security/billing information.
- Full alert channel configuration belongs to a future Settings/Notification Preferences page.
- Do not invent backend endpoints.
- If backend contract is unavailable, use fixture-mode service with no network and document it.
- No localStorage/sessionStorage in fixture alert batches.

---

## Copy rules

**Avoid:** buy, sell, hold, profit, guaranteed, risk-free, trade now, take position, stop loss, entry, exit.

The banned term "signal" may appear only in this rules file as a reference to what is banned. It must not appear in runtime dashboard files, fixtures, comments, registry labels, or asset manifest copy.

**Use:** bias, scenario, evidence, confidence, contradiction, freshness, structure, liquidity, review, confirmation, caution, source status, market data state, fixture mode.

---

## Typography rules

- Dashboard runtime text must not go below 0.78rem.
- Dashboard uses rem-based scale tokens: xs (0.78rem), sm (0.88rem), md (1.1rem), lg (1.2rem), xl (1.4rem).
- Expanded panels must not enlarge font size unless explicitly requested.
- Secondary panel eyebrow/title blocks should remain removed unless explicitly restored.
- Do not reintroduce forbidden fonts.

---

## Visual component rules

- Liquid gauge must be component-based and must not edit source SVG.
- Dashboard meter bars must be custom accessible components (role="progressbar").
- Native/generic progress appearance should not be used in dashboard panels.
- Respect reduced motion (prefers-reduced-motion: reduce) for liquid/meter animations.
- Sidebar and alert icons should use approved dashboard SVG assets when available.
- Sprite assets must be extracted into component-safe icons without modifying source SVG files.
- Alert bell button must remain square-bordered unless explicitly changed.
- If a user supplies a correctly scaled SVG for a panel visual, do not reinterpret it as an icon.
- Do not recreate supplied SVG visuals with hand-drawn paths.
- Directional Bias radar must use "elceo-radar.svg" unless explicitly changed.
- News headlines should not use timeline styling unless explicitly requested.
- News impact labels must use High/Medium/Low with red/green/amber mapping.
- SVG badge sprite assets must be extracted safely without modifying source SVG.
- Watchlist Featured assets should use Market Pulse Card visual system when available.
- Market pulse card SVG source must not be edited.
- Card grids must wrap responsively and avoid horizontal overflow.
- Market Regime cross-asset information should prefer table/structured comparison format.
- Tables must collapse responsively and must not force horizontal overflow.
- Dashboard table text must not go below 0.78rem.

---

## Font rules

- Do not use Tribes, Trybes, Offbit, Space Grotesk, or decorative/geometric dashboard fonts.
- Dashboard UI uses Inter/Geist/system body stack.
- Mono font only for tickers, numbers, timestamps, and compact technical values.

---

## Chart overlay rules

- Selected chart overlay elements must **not** show thick white/black outlines.
- Selection should transform the element's existing color to neon only.
- No outer glow for selected elements.
- Chart text must be white/off-white, not muted gray.
- Toggle controls are positioned at board coordinates (`SHELL_RECTS.chartOverlayToggleBar`), not inside chart candle area.

---

## Validation rules

Every dashboard batch must report:

1. Files modified
2. No coordinates changed (unless explicitly requested)
3. No source SVG files modified (unless explicitly requested)
4. No landing files modified
5. No live data/network/timers
6. Unsafe wording grep result
7. Route/account/security boundary grep result
8. Build result

---

_This file is the permanent dashboard discipline reference. Future prompts can say: "Read docs/dashboard/DASHBOARD_AGENT_RULES.md first."_
