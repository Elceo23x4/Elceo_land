# ELCEO SVG-08 Layer Map — Evidence, News, Coaching + Market Intelligence Icons

## Batch status
SVG-08 creates the reusable custom icon language for the right-side evidence stack, news/macro panel, and coaching insight panel.

## Locked production rules followed
- No readable text inside the SVG artwork.
- No generic icon font dependency.
- All icons are editable SVG groups with stable IDs.
- All styling is inline/import-safe enough for Figma and frontend use.
- The icon language stays within the reference roles: evidence categories, news/event impact states, coaching/risk/setup icons.
- No extra unrelated decorative glyphs were added.

## Files

### elceo-svg-08-evidence-icons.svg
Contains:
- `#evidence_icon_macro`
- `#evidence_icon_technical`
- `#evidence_icon_event`
- `#evidence_icon_sentiment`
- `#evidence_icon_risk`
- `#evidence_rows_preview`

### elceo-svg-08-coaching-icons.svg
Contains:
- `#coaching_ai_hub_icon`
- `#coaching_icon_patience`
- `#coaching_icon_avoidance`
- `#coaching_icon_manage_risk`
- `#coaching_icon_setup_window`

### elceo-svg-08-news-impact-badges.svg
Contains:
- `#news_event_calendar_icon`
- `#news_impact_shape_1` to `#news_impact_shape_4`
- `#news_timeline_strip`

### elceo-svg-08-composite-preview.svg
A context preview showing how the icon families sit inside evidence, news, and coaching panel spaces.

### elceo-svg-08-review-sheet.svg
A display-safe review sheet for visual QA and import checks.

## Integration notes
- Evidence icons are designed to sit inside 64–88px row badges.
- Coaching hub can scale larger than the small badge icons.
- Impact badges are visual shape/state capsules only; React should provide readable text outside the SVG where needed.
- These icons can be converted to React components later with each top-level group preserved.
