# ELCEO Dashboard — Chart Intelligence Overlay Contract (R7B)

## Purpose

The chart intelligence overlay renders interactive market-context layers directly on the chart display area. Selecting an overlay element opens a compact inspector and highlights the linked cognition panel — creating a visual bridge between chart structure and the dashboard's evidence/bias/macro reasoning.

Fixture-only. No live price data. No network calls. Market language only.

---

## Interaction Model

### Hover
- Hovering a zone, marker, or scenario path shows a lightweight tooltip (label + note).
- Hovering an annotation label shows its tooltip (body + linked panel label).
- No layout shift. Tooltip is position-absolute inside chart overlay.

### Selection
- Clicking an overlay element selects it.
- Selected element stays highlighted (brighter stroke/fill, larger radius for markers).
- Only one element selected at a time.
- Clicking the same element again deselects it.
- Escape key clears selection.
- Toggling off a layer that contains the selected item clears selection.

### Inspector
- Shown when an element is selected.
- Compact dark-glass HUD panel, bottom-right inside chart frame.
- Shows: title (asset · timeframe · item label), kind, strength/confidence, freshness, linked panel, suggested view, note, why-it-matters, timeframe context note, caution.
- Action buttons: contextual label + Inspect Freshness + Save Market Note.
- Close button clears selection.

### Panel Linkage
- When an overlay item is selected, the matching cognition panel receives a `--linked` CSS class.
- Produces a subtle gold inset glow on the linked panel.
- Mapping: demand/structure → Evidence, scenario path → Bias, macro event → News & Macro, contradiction → Confidence, liquidity → Market Regime.
- No panel content changes. No drawer auto-open. No navigation.
- Inspector shows "Suggested view" for the relevant panel mode.

---

## Timeframe Selector (R7F)

### Behavior
- Compact HUD dropdown positioned near the asset selector inside chart display area.
- Available timeframes: 15M, 1H, 4H, 1D.
- Default: 1H.
- Local state only — no route change, no network calls, no localStorage.
- Selecting a timeframe updates chart context labels, inspector context, and panel fixture references.
- Chart candle data remains the same deterministic fixture dataset.
- Keyboard accessible. Escape closes dropdown.

### State Ownership
- `activeTimeframe` state is owned by `DashboardResponsiveCockpit`.
- Passed to: chart zone, overlay, inspector, panel layer, context strip, topbar.
- Never duplicated in child components.

### Fixture-Only Boundary
- Timeframe selection does not imply live data.
- Chart fixture candles remain the same normalized dataset regardless of timeframe.
- Context labels and panel notes update to reflect timeframe awareness.
- UI clearly states "Fixture Mode" and "Market Data Pending" at all times.

---

## Active Asset + Timeframe Ownership (R7F)

- Cockpit owns: `activeAsset` (default: "XAU/USD") and `activeTimeframe` (default: "1H").
- Both are passed as props to all dependent components.
- Asset/timeframe changes propagate to: overlay context strip, inspector title, panel content, topbar badges.
- `assetTimeframeContextBySymbol` provides per-asset timeframe notes for all 12 ELCEO assets.

---

## Overlay-to-Panel Mapping (R7F)

| Overlay element | Linked panel | Suggested view |
|-----------------|-------------|----------------|
| Demand zone | Evidence | Evidence Stack |
| Structure zone | Bias | Evidence Stack |
| Liquidity band | Market Regime | Market Regime |
| Supply zone | Confidence | Confidence & Context |
| Liquidity sweep marker | Market Regime | Market Regime |
| Structure retest marker | Evidence | Evidence Stack |
| CPI event marker | News & Macro | News & Macro |
| Contradiction marker | Confidence | Confidence & Context |
| Bias annotation | Bias | Directional Bias |
| Evidence annotation | Evidence | Evidence Stack |
| Macro annotation | News & Macro | News & Macro |
| Freshness annotation | Confidence | Confidence & Context |
| Primary scenario path | Bias | Directional Bias |
| Alternate scenario path | Bias | Directional Bias |

### Sync Behavior
- Inspector shows "Suggested view" label for the recommended panel mode.
- Linked panel highlight remains subtle (gold inset glow).
- No auto-switch of panel modes.
- No drawer auto-open.
- No panel movement or navigation.

---

## Chart Inspector Asset/Timeframe Context (R7F)

- Inspector title format: `{asset} · {timeframe} {item label}` (e.g. "XAU/USD · 1H Structure Zone").
- Inspector shows: linked panel, suggested view, timeframe context note.
- Timeframe note sourced from `getTimeframeNote(asset, timeframe)`.
- Used by the current scenario review and source freshness layer.
- No route paths. No provider wording. No unsafe language.

---

## Overlay Layers

| Layer | Elements | Interactive | Toggle |
|-------|----------|-------------|--------|
| Zones (demand/supply/structure) | `<rect>` | Yes — hover + click | Zones |
| Liquidity bands | `<rect>` dashed | Yes — hover + click | Liquidity |
| Scenario paths | `<polyline>` dashed | Yes — hover + click | Scenario |
| Markers | `<circle>` | Yes — hover + click | Zones |
| Annotations | HTML labels | Yes — hover + click | Notes |
| Context strip | HTML badges | No | Always visible |
| Toggle controls | HTML buttons | Yes (toggle) | — |
| Inspector | HTML panel | Yes (close/actions) | — |
| Timeframe selector | HTML dropdown | Yes (select) | — |

---

## Fixture Data (chartIntelligenceFixture.ts)

### Zone fields
`id, label, kind, tone, x1/x2/y1/y2, strength, freshness, note, linkedPanel, whyItMatters, evidenceWeight, caution?`

### Marker fields
`id, label, kind, tone, x/y, note, linkedPanel, whyItMatters, freshness, timestampLabel`

### Annotation fields
`id, title, body, tone, anchorX/anchorY, panelLink, linkedPanelLabel, evidenceTags[], freshness, actionLabel`

### Scenario path fields
`id, label, tone, points[], confidence, condition, linkedPanel, alternativeNote`

### Helper
`getOverlayItemById(id)` → returns typed `OverlayItem` union or undefined.

---

## Safe Language Rules

Never display: price targets as instructions, buy/sell/hold, profit projections, risk-free claims, entry/exit signals.

Allowed: structure zone, liquidity band, scenario path, confirmation required, contradiction present, caution area, review window, source freshness, fixture mode, market data state, timeframe, active asset, review lens.

---

## Inspector Actions (non-routing placeholders)

- View Evidence Context
- Inspect Market Context
- Inspect Bias Context
- Inspect Freshness
- Review Scenario
- Save Market Note

---

## Future R7G Items

- Asset-specific overlay geometries (different zone positions per asset)
- Chart annotation drawer (expandable annotation detail)
- Chart-to-panel connector lines (SVG paths between overlay and panel)
- Zone strength algorithm UI (visual strength indicators)
- Source freshness test fixtures (automated freshness decay simulation)
- Panel mode sync from overlay selection (auto-switch panel mode on overlay click)
- Dynamic zone visibility based on active scenario
- Chart annotation click → panel focus/scroll
- Additional overlays: session bands, volume profile ghost
- Unit tests for overlay fixtures and interaction state

---

_Last updated: R7F batch_
