# ELCEO SVG-02 Rev-A Layer Map

## Status
SVG-02 has been rebuilt as a blank structural chart console, following the corrected direction.

## Locked Design Decisions
- Desktop base remains 1920 × 1080.
- No fake chart content.
- No label containers.
- No supply/demand holders.
- No TP/SL/entry holders.
- No separate right-side price-axis gutter, because the real chart engine will own its own price section.
- Footer uses 5 structural cells.
- Footer borders are intentionally simple: top segments and gapped dividers only.
- Footer borders do not connect into a continuous boxed grid.

## Files
- `elceo-svg-02-reva-central-chart-console-complete.svg`
- `elceo-svg-02-reva-chart-console-frame.svg`
- `elceo-svg-02-reva-footer-slots.svg`
- `elceo-svg-02-reva-composite-preview.svg`
- `elceo-svg-02-reva-composite-preview.png`

## Key IDs

### Console Frame
- `svg02a_blank_chart_console_frame`
- `svg02a_outer_beveled_body`
- `svg02a_console_shadow_aura`
- `svg02a_inner_chart_viewport`
- `svg02a_corner_thickness_system`
- `svg02a_corner_top_left_outer_heavy`
- `svg02a_corner_top_left_diagonal_heavy`
- `svg02a_corner_top_right_outer_heavy`
- `svg02a_corner_top_right_diagonal_heavy`
- `svg02a_corner_bottom_left_outer_heavy`
- `svg02a_corner_bottom_right_outer_heavy`
- `svg02a_inset_corner_brackets`

### Footer
- `svg02a_simple_footer_five_cells`
- `svg02a_footer_top_segments`
- `svg02a_footer_vertical_dividers_gapped`
- `svg02a_footer_cell_01_top`
- `svg02a_footer_cell_02_top`
- `svg02a_footer_cell_03_top`
- `svg02a_footer_cell_04_top`
- `svg02a_footer_cell_05_top`
- `svg02a_footer_divider_01`
- `svg02a_footer_divider_02`
- `svg02a_footer_divider_03`
- `svg02a_footer_divider_04`

## Integration Notes
The future chart component should be mounted inside the blank chart viewport area. Recommended mount rectangle for code alignment:

```txt
x: 42
y: 48
width: 577
height: 318 before footer area
```

The footer can be implemented either as SVG background only or as React HTML overlaid with 5 live metric cells.
