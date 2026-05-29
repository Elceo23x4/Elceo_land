/**
 * DashboardResponsiveSidebar.tsx
 *
 * R6B: Market cockpit navigation only.
 * No account/billing/notification/security route concepts.
 * Buttons are fixture placeholders — no navigation behavior.
 */

import { SidebarRailFrame } from "./dashboardResponsiveAssets";
import { boardRectStyle, SHELL_RECTS } from "./dashboardResponsiveGeometry";

const icons = {
  cockpit: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="11" y="3" width="6" height="6" rx="1" />
      <rect x="3" y="11" width="6" height="6" rx="1" />
      <rect x="11" y="11" width="6" height="6" rx="1" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3,14 7,8 11,11 17,4" />
      <line x1="3" y1="17" x2="17" y2="17" />
    </svg>
  ),
  assets: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="6" />
      <circle cx="10" cy="10" r="2.5" />
      <line x1="10" y1="4" x2="10" y2="2" />
      <line x1="10" y1="18" x2="10" y2="16" />
    </svg>
  ),
  evidence: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h12v14H4z" /><line x1="7" y1="8" x2="13" y2="8" /><line x1="7" y1="11" x2="13" y2="11" />
    </svg>
  ),
  macro: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="7" />
      <line x1="3" y1="10" x2="17" y2="10" />
      <ellipse cx="10" cy="10" rx="3.5" ry="7" />
    </svg>
  ),
  regime: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="10" width="3" height="7" rx="0.5" /><rect x="8.5" y="6" width="3" height="11" rx="0.5" /><rect x="14" y="3" width="3" height="14" rx="0.5" />
    </svg>
  ),
  journal: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 3h10a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z" />
      <line x1="8" y1="7" x2="12" y2="7" /><line x1="8" y1="10" x2="14" y2="10" />
    </svg>
  ),
};


const SIDEBAR_BUTTONS = [
  { id: "cockpit", label: "Cockpit", title: "Market Cockpit", icon: icons.cockpit, active: true },
  { id: "chart", label: "Chart", title: "Chart Context", icon: icons.chart, active: false },
  { id: "assets", label: "Assets", title: "Watchlist Assets", icon: icons.assets, active: false },
  { id: "evidence", label: "Evidence", title: "Evidence Stack", icon: icons.evidence, active: false },
  { id: "macro", label: "Macro", title: "News & Macro", icon: icons.macro, active: false },
  { id: "regime", label: "Regime", title: "Market Regime", icon: icons.regime, active: false },
  { id: "journal", label: "Journal", title: "Journal & Coaching", icon: icons.journal, active: false },
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
