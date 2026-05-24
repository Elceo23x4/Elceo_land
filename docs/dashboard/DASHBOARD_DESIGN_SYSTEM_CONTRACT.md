# Dashboard Design System Contract

**Batch:** 2  
**Date:** 2026-05-24

---

## 1. Purpose

Batch 2 establishes the reusable design-token foundation and core state
components that all future ELCEO dashboard pages will consume. It does
NOT build the final cockpit layout or import SVG compositions.

---

## 2. Scoped Design Tokens

All dashboard CSS variables live under `.elceo-dashboard-scope`.
They do not leak into global CSS or affect the landing page.

Token file: `src/dashboard/styles/dashboard.tokens.css`

---

## 3. Core Components Created

| Component | Location | Purpose |
|-----------|----------|---------|
| PlanBadge | system/ | Displays user plan state |
| ProviderReadinessBadge | system/ | Shows provider activation status |
| PersistenceStatusBadge | system/ | Shows durable vs memory fallback |
| SubscriptionWall | system/ | Denial reason wall with safe copy |
| RestrictedPanel | system/ | Restricted-user serious state |
| LoadingState | system/ | Skeleton loading without layout jump |
| EmptyState | system/ | No-data placeholder |
| StaleDataWarning | system/ | Amber warning for delayed data |
| AccessDeniedPanel | system/ | Safe denial explanation |
| MetricTile | system/ | Neutral metric display |
| SystemNotice | system/ | Info/warning/danger/success notices |
| SafeStatusList | system/ | Key-value status summary |
| WorkspaceTabs | workspace/ | In-panel tab navigation |
| PanelWorkspace | workspace/ | HUD panel frame with tabs/states |
| HoverInsightPopover | workspace/ | Hover preview + click-to-pin |
| DetailDrawer | workspace/ | Slide-out detail panel |

---

## 4. PanelWorkspace Model

PanelWorkspace allows a single dashboard panel to host multiple
internal modes (tabs) without route changes. This supports the
compact cockpit layout where panels like Macro Intelligence can
switch between Headlines, Currency Comparison, Calendar, Driver
Breakdown, and Source Freshness without navigation.

---

## 5. Interaction Model: Hover → Pin → Drawer

1. **Hover** (or focus): Quick summary popover appears
2. **Click** (or Enter): Popover becomes pinned with expanded detail
3. **Escape**: Closes pinned popover
4. **Drawer button**: Opens DetailDrawer for full evidence/detail view
5. **Escape** or backdrop click: Closes drawer

This three-tier model allows progressive disclosure without
forcing route changes or full-page transitions.

---

## 6. Restricted User Override Rule

If SubscriptionWall receives `reason: "restricted_user"`, it MUST
render RestrictedPanel (or equivalent restricted-state content)
instead of an upgrade CTA. Restricted denial always overrides
subscription upsell. This is a product safety rule.

---

## 7. Provider / Readiness Caveat Rule

- `provider_pending`: Display "Provider pending" — never imply live
- `blocked_live_activation`: Display "Activation blocked" — never
  present checkout or live service as available
- `fixture_only`: Display "Fixture only" — clearly not production
- Provider readiness, live payments, live notifications, and
  production 2FA must not be presented as live if not activated

---

## 8. Copy Safety Rule

The following words must NEVER appear in user-facing dashboard copy:

- buy, sell, hold
- guaranteed, risk-free, sure win
- profit (as promise)
- signal to enter
- prediction certainty

Allowed neutral terms:
bias, pressure, condition, scenario, caution, contradiction,
freshness, evidence, driver, context, reasoning, watch condition

---

## 9. What Batch 2 Intentionally Does NOT Do

- Does not build the final 1920x1080 dashboard cockpit
- Does not import or compose SVG dashboard assets visually
- Does not wire chart engine or real data
- Does not add backend API calls
- Does not add real authentication
- Does not add billing/payment logic
- Does not add admin or product routes beyond /dashboard/system
- Does not install new dependencies
- Does not modify the landing page
- Does not modify existing SVG asset files

---

## 10. Next Batch Recommendation

Batch 3 should focus on:
- Dashboard shell composition using Batch 1 SVG assets
- Sidebar rail + top system bar integration
- Panel positioning within 1920x1080 viewport
- Connection of PanelWorkspace instances to shell layout slots
