/**
 * DashboardResponsiveSidebar.tsx
 *
 * R6A: Sidebar buttons mapped to ELCEO user route surfaces.
 * Dashboard, Assets, Evidence, Journal, Analytics, Coaching, Notifications, Account.
 * Compressed to fit rail — uses title/aria for grouped route context.
 */

import { SidebarRailFrame } from "./dashboardResponsiveAssets";
import { boardRectStyle, SHELL_RECTS } from "./dashboardResponsiveGeometry";

/* ─── Inline SVG Icons ─── */
const icons = {
  dashboard: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="11" y="3" width="6" height="6" rx="1" />
      <rect x="3" y="11" width="6" height="6" rx="1" />
      <rect x="11" y="11" width="6" height="6" rx="1" />
    </svg>
  ),
  assets: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3,14 7,8 11,11 17,4" />
      <line x1="3" y1="17" x2="17" y2="17" />
    </svg>
  ),
  evidence: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h12v14H4z" /><line x1="7" y1="8" x2="13" y2="8" /><line x1="7" y1="11" x2="13" y2="11" /><line x1="7" y1="14" x2="10" y2="14" />
    </svg>
  ),
  journal: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 3h10a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z" /><line x1="8" y1="7" x2="12" y2="7" /><line x1="8" y1="10" x2="14" y2="10" /><line x1="8" y1="13" x2="11" y2="13" />
    </svg>
  ),
  analytics: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="10" width="3" height="7" rx="0.5" /><rect x="8.5" y="6" width="3" height="11" rx="0.5" /><rect x="14" y="3" width="3" height="14" rx="0.5" />
    </svg>
  ),
  coaching: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="7" /><path d="M10 3v7l4 3" />
    </svg>
  ),
  notifications: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2a5 5 0 015 5v4l2 2H3l2-2V7a5 5 0 015-5z" /><path d="M8.5 16a1.5 1.5 0 003 0" />
    </svg>
  ),
  account: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="7" r="3.5" /><path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    </svg>
  ),
};

const SIDEBAR_BUTTONS = [
  { id: "dashboard", label: "Dashboard", title: "Dashboard — Asset Cockpit", icon: icons.dashboard, active: true },
  { id: "assets", label: "Assets", title: "Assets — Portfolio / Watchlist", icon: icons.assets, active: false },
  { id: "evidence", label: "Evidence", title: "Market Evidence — Source Freshness", icon: icons.evidence, active: false },
  { id: "journal", label: "Journal", title: "Journal — Quick Capture", icon: icons.journal, active: false },
  { id: "analytics", label: "Analytics", title: "Analytics — Coaching / Behavior", icon: icons.analytics, active: false },
  { id: "notifications", label: "Notifications", title: "Notifications — Preferences", icon: icons.notifications, active: false },
  { id: "account", label: "Account", title: "Account — Billing / Readiness", icon: icons.account, active: false },
] as const;

export default function DashboardResponsiveSidebar() {
  return (
    <div
      className="dashboard-precision-sidebar"
      style={{ ...boardRectStyle(SHELL_RECTS.sidebarRail), zIndex: 30 }}
    >
      <div className="dashboard-precision-sidebar-frame" aria-hidden="true">
        <SidebarRailFrame preserveAspectRatio="none" />
      </div>
      <div className="dashboard-sidebar-button-layer">
        {SIDEBAR_BUTTONS.map((btn) => (
          <button
            key={btn.id}
            type="button"
            className={`dashboard-sidebar-btn${btn.active ? " dashboard-sidebar-btn--active" : ""}`}
            aria-label={btn.title}
            title={btn.title}
          >
            {btn.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
