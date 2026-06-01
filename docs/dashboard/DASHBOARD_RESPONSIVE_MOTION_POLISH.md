# ELCEO Dashboard — Responsive & Motion Polish (V1B-8)

## Overview

This document covers the framer-motion integration, responsive panel navigation, and content collapse rules introduced in V1B-8.

---

## Section Nav Arrow Behavior

- Section heading tabs are rendered inside a horizontally scrollable rail.
- When tabs overflow the container width, arrow buttons appear.
- **Right arrow:** visible when content exists beyond the right edge.
- **Left arrow:** visible when the user has scrolled right.
- If all tabs fit without overflow, no arrows appear.
- Clicking an arrow scrolls the rail by ~60% of its width.
- When active tab changes, the active tab auto-scrolls into view.
- Arrows animate in/out using framer-motion `AnimatePresence` (scale + opacity).

### Component

`src/dashboard/responsive/panelContent/PanelSectionNav.tsx`

### Overflow Detection

- Uses `ResizeObserver` on the scroll rail.
- Listens to `scroll` event (passive) for real-time arrow state.
- Cleans up all listeners on unmount.
- No `setInterval`, `setTimeout`, or polling.

---

## Panel Content Transitions

- When switching tabs within a panel, content fades/slides subtly.
- Uses framer-motion `AnimatePresence` with `mode="wait"`.
- Duration: 0.18s ease-out.
- Y offset: 4px enter, -3px exit.
- Keyed by `${panelId}-${mode}` to ensure unique transitions.
- Integrated via `activeSectionKey` prop on `PrecisionPanelGroup`.

### Component

`src/dashboard/responsive/panelContent/PanelContentTransition.tsx`

---

## Responsive Content Collapse Rules

Panel body content adapts via CSS container queries:

| Breakpoint | Affected layouts | Behavior |
|------------|-----------------|----------|
| ≤340px | News headline grid, event timeline, bias content row | Collapse to single column |
| ≤320px | Liquid gauge grid | Collapse to auto-fill 100px min |
| ≤300px | Watchlist card grid | Collapse to 2 columns |
| ≤240px | DataRow | Stack label/value vertically |
| ≤220px | Liquid gauges, watchlist cards | Single column |
| ≤200px | Market regime table | Single column (driver only) |

### Rules

- Panel body uses `overflow-x: hidden` — never horizontal scroll.
- Panel body uses `scroll-behavior: smooth`.
- Scroll edge fades (top/bottom gradients) indicate scrollable content.
- All content prefers vertical scroll inside panel body.

---

## Responsive Typography Scale

Typography tokens adjust at smaller viewports:

| Viewport | xs | sm | md | lg | xl |
|----------|------|------|------|------|------|
| >1366px | 0.78rem | 0.88rem | 1.1rem | 1.2rem | 1.4rem |
| ≤1366px | 0.78rem | 0.82rem | 1.0rem | 1.1rem | 1.25rem |
| ≤1280px | 0.78rem | 0.80rem | 0.95rem | 1.05rem | 1.18rem |

**Rule:** `xs` never changes — 0.78rem is the absolute minimum for dashboard text.

---

## Framer Motion Usage Boundaries

**Approved uses:**
- Section nav arrow enter/exit animations
- Panel content section transitions (tab switch)
- Sidebar active marker (CSS transition already handles this)
- Future: drawer enter/exit, expanded panel scale

**Not approved:**
- Panel frame geometry animation
- Chart candle/overlay animation via framer
- Heavy layout animations that cause reflows
- Any animation that blocks interaction

**Reduced motion:**
- All framer transitions respect `prefers-reduced-motion: reduce` via CSS override.
- `PanelContentTransition` has `transition: none !important` under reduced motion.
- Sidebar pulse animation disabled under reduced motion.

---

## Sidebar Motion

Sidebar active marker and icon glow use CSS transitions (already implemented in V1B sidebar fixes). No additional framer-motion integration needed — skipped to avoid regression risk.

---

## Future V2 Notes

- Drawer enter/exit could use framer-motion `motion.div` with slide-in.
- Expanded panel could animate scale via framer instead of CSS transition.
- Chart overlay element selection could use framer for highlight animation.
- Panel drag-to-reorder is not planned for V1.

---

_This document is a reference for the V1B-8 responsive and motion polish pass._
