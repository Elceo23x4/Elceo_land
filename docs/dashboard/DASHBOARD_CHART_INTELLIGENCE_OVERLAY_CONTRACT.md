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
- Shows: title, kind, strength/confidence, freshness, linked panel, note, why-it-matters, caution.
- Action buttons: contextual label + Inspect Freshness + Save Market Note.
- Close button clears selection.

### Panel Linkage
- When an overlay item is selected, the matching cognition panel receives a `--linked` CSS class.
- Produces a subtle gold inset glow on the linked panel.
- Mapping: demand/structure → Evidence, scenario path → Bias, macro event → News & Macro, contradiction → Confidence, liquidity → Market Regime.
- No panel content changes. No drawer auto-open. No navigation.

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

## Panel Linkage Mapping

| Overlay element | Linked panel |
|-----------------|-------------|
| Demand zone | Evidence |
| Structure zone | Bias |
| Liquidity band | Market Regime |
| Supply zone | Confidence |
| Liquidity sweep marker | Market Regime |
| Structure retest marker | Evidence |
| CPI event marker | News & Macro |
| Contradiction marker | Confidence |
| Bias annotation | Bias |
| Evidence annotation | Evidence |
| Macro annotation | News & Macro |
| Freshness annotation | Confidence |
| Primary scenario path | Bias |
| Alternate scenario path | Bias |

---

## Safe Language Rules

Never display: price targets as instructions, buy/sell/hold, profit projections, risk-free claims, entry/exit signals.

Allowed: structure zone, liquidity band, scenario path, confirmation required, contradiction present, caution area, review window, source freshness, fixture mode, market data state.

---

## Inspector Actions (non-routing placeholders)

- View Evidence Context
- Inspect Market Context
- Inspect Bias Context
- Inspect Freshness
- Review Scenario
- Save Market Note

---

## Future R7C Items

- Chart-to-panel connector lines (SVG paths between overlay and panel)
- Timeframe selector
- Dynamic zone visibility based on active scenario
- Chart annotation click → panel focus/scroll
- Additional overlays: session bands, volume profile ghost
- Unit tests for overlay fixtures and interaction state

---

## R7E Updates

### Central Wheel Geometry
- Asset: `src/assets/source/dashboard/shell/central-wheel.svg`
- viewBox: `0 0 1536 1536` (isolated square asset)
- Board coordinates: `{ x: 569, y: 75, w: 771, h: 772 }`
- preserveAspectRatio: `xMidYMid meet`
- Layer order: z-index 5 (behind glass/frame/display/overlay)

### Chart Toggle Bar Coordinates
- Board rect: `{ x: 726, y: 706, w: 428, h: 33 }`
- Positioned outside chart candle area in the frame zone below

### Selected Overlay Style Rule
- Neon color transformation only
- No white/black outlines
- No outer glow / drop-shadow
- No stroke-width inflation
- `:focus-visible` uses subtle neon dashed outline (not white)

### Chart-to-Panel Cognition Mapping
| Overlay element | Linked panel | Recommended mode |
|---|---|---|
| Scenario path | Directional Bias | Scenario |
| Structure zone | Evidence Stack | Evidence Stack |
| Liquidity band | Market Regime | Liquidity/Risk |
| Macro event marker | News & Macro | Events |
| Contradiction marker | Confidence & Context | Contradiction |
| Freshness annotation | Evidence Stack | Source Freshness |
| Bias annotation | Directional Bias | Bias |

### Future R7F Visual QA Items
- Panel content density check at reduced viewports
- Chart overlay readability at 1366×768
- Asset selector dropdown overflow at small heights
- Toggle bar alignment verification
- Inspector positioning at edge cases
- Wheel opacity/visibility relative to chart layers

---

_Last updated: R7E batch_
