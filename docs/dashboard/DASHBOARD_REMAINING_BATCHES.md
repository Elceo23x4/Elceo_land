# ELCEO Dashboard — Remaining Batch Roadmap

Post-R5G development batches for the ELCEO Market Cognition Dashboard.

---

## R6 — Visual QA and Panel Density Polish

Refine panel content density, spacing, and visual consistency across all 7 panels. Ensure typography hierarchy is balanced at all viewport sizes. Validate that mini graphics render correctly at reduced widths. Fix any visual regressions from R5G.

---

## R7 — Chart Intelligence Overlays

Add chart overlays including: structure zones, liquidity markers, session annotations, and an active asset selector. Chart should visually represent the current bias context (XAU/USD as default). No live data — fixture overlays only.

---

## R8 — Drawer and Deep Route Prototypes

Build enriched drawer views for: Evidence Chain, Journal, Analytics, Coaching Detail, and Workspace. Each drawer should show expanded fixture content beyond what the panel body displays. Prepare route structure for deep navigation.

---

## R9 — Auth/Plan Gating and User/Admin Route Shell

Implement authentication boundary, plan gating UI (free/pro/enterprise), and user/admin route shell alignment. Define protected routes and gated features. Stub provider connection states.

---

## R10 — Provider Adapter Integration Preparation

Define provider adapter schemas, stale/pending states, and fixture-to-live toggle boundary. Prepare data contracts for each panel's provider dependency. Document which panels require which data sources.

---

## R11 — Accessibility, Performance, and Responsiveness Hardening

ARIA audit across all interactive components. Keyboard navigation testing. Performance profiling (paint, layout, GSAP cost). Touch target sizing for mobile. Reduced motion full compliance. Container query behavior at extreme breakpoints.

---

## R12 — Production Readiness

End-to-end tests. Vercel build validation. Asset audit (unused files, bundle size). Safe copy audit (no unsafe investment language). Launch checklist completion. Documentation finalization.

---

_Last updated: R5G batch_
