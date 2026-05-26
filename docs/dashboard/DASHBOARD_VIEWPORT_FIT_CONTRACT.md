# Dashboard Viewport Fit Contract — Batch 7C

## Overview

The ELCEO dashboard cockpit is a fixed logical **1920×1080** canvas that must scale to fit any browser viewport while preserving the 16:9 aspect ratio.

## Scaling Mode: Contain (not Cover)

- The full cockpit must **always remain visible** — no cropping.
- Letterboxing (horizontal black bars) is acceptable at tall viewports.
- Pillarboxing (vertical black bars) is acceptable at narrow viewports.
- Cropping is **never acceptable**.

## Implementation

### `useCockpitScale` Hook

Listens to multiple resize sources for robust recalculation:
- `ResizeObserver` on the container element
- `window.resize` event
- `window.orientationchange` event
- `window.visualViewport.resize` (handles mobile browser chrome, pinch zoom)
- `window.visualViewport.scroll` (handles mobile address bar collapse)

Uses `requestAnimationFrame` to debounce and avoid layout thrashing.

Measurement priority:
1. Container `getBoundingClientRect()` width/height
2. Fallback: `window.visualViewport.width/height`
3. Fallback: `window.innerWidth/innerHeight`

Scale formula:
```
rawScale = Math.min(viewportWidth / 1920, viewportHeight / 1080)
scale = clamp(rawScale, 0.1, 1.5)
```

### `DashboardViewport` Component

- Outer `.cockpit-viewport` fills the browser area and centers content via flexbox.
- `.cockpit-stage-wrapper` is sized to `1920 * scale` × `1080 * scale` with `overflow: visible`.
- `.cockpit-stage` is a fixed 1920×1080 div with `transform: scale(scale)` from `top left`.

### CSS

- `.elceo-cockpit` uses `position: fixed; inset: 0` with `100vw`/`100dvh`.
- `.cockpit-viewport` uses `100vw`/`100dvh` with flex centering.
- `.cockpit-stage-wrapper` has `overflow: visible` to prevent edge clipping from rounding.
- `.cockpit-stage` has `overflow: hidden` to clip internal layer content at 1920×1080.

## Expected Behavior by Viewport Size

| Viewport | Behavior |
|----------|----------|
| 1920×1080 | Scale ~1.0, full fit |
| 1600×900 | Scale ~0.833, full fit |
| 1366×768 | Scale ~0.711, full fit |
| 1280×720 | Scale ~0.667, full fit |
| 1024×768 | Scale ~0.533, letterboxed |
| 900×600 | Scale ~0.469, full fit |

## Invariants

- No panel content was changed
- No shell/SVG source files were modified
- No landing page files were modified
- Scaling is pure CSS transform + JS measurement
- The 1920×1080 coordinate system inside `.cockpit-stage` is unchanged
