# Dashboard Viewport Fit Contract — Batch 7C2

## Overview

The ELCEO dashboard cockpit is a fixed logical **1920×1080** canvas that must scale to fit any browser viewport while preserving the 16:9 aspect ratio.

## Scaling Mode: Contain (not Cover)

- The full cockpit must **always remain visible** — no cropping.
- Letterboxing (horizontal black bars) is acceptable at tall viewports.
- Pillarboxing (vertical black bars) is acceptable at narrow viewports.
- Cropping is **never acceptable**.

## Implementation

### `useCockpitScale` Hook

Measures viewport directly (not container element) to avoid circular dependency:
- Primary: `window.visualViewport.width/height`
- Fallback: `window.innerWidth/innerHeight`

Listens to:
- `window.resize` event
- `window.orientationchange` event
- `window.visualViewport.resize` (handles mobile browser chrome, pinch zoom)
- `window.visualViewport.scroll` (handles mobile address bar collapse)

Uses `requestAnimationFrame` to debounce and avoid layout thrashing.

Scale formula:
```
rawScale = Math.min(viewportWidth / 1920, viewportHeight / 1080)
scale = clamp(rawScale, 0.05, 1.5)
```

### `DashboardViewport` Component — Center-Scaled Fixed Stage

- Outer `.cockpit-viewport` fills the browser area (`position: fixed; inset: 0`).
- `.cockpit-stage-wrapper` is a **fixed 1920×1080** div positioned at `left: 50%; top: 50%`.
- Transform on wrapper: `translate3d(-50%, -50%, 0) scale(scale)` with `transform-origin: center center`.
- `.cockpit-stage` is a fixed 1920×1080 div with `overflow: hidden` to clip layers.
- **No flex centering.** Centering is done purely via absolute positioning + translate.

### CSS

- `.elceo-cockpit` uses `position: fixed; inset: 0` with `100vw`/`100dvh`.
- `.cockpit-viewport` uses `position: fixed; inset: 0` — no flex, no align-items, no justify-content.
- `.cockpit-stage-wrapper` is `position: absolute; left: 50%; top: 50%; width: 1920px; height: 1080px`.
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
