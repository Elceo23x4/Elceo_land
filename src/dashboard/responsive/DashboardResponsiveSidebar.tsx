/**
 * DashboardResponsiveSidebar.tsx
 *
 * Renders visible, clickable sidebar navigation buttons over the sidebar rail SVG frame.
 * Uses inline SVG icons — no external icon package dependency.
 * Buttons are real <button> elements with aria-label, title, focus-visible styling.
 */

import { SidebarRailFrame } from "./dashboardResponsiveAssets";
import { boardRectStyle, SHELL_RECTS } from "./dashboardResponsiveGeometry";

/* ─── Inline SVG Icons ─── */
const icons = {
  overview: (
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
  watchlist: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="6" />
      <circle cx="10" cy="10" r="2.5" />
      <line x1="10" y1="4" x2="10" y2="2" />
      <line x1="10" y1="18" x2="10" y2="16" />
      <line x1="4" y1="10" x2="2" y2="10" />
      <line x1="18" y1="10" x2="16" y2="10" />
    </svg>
  ),
  macro: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="7" />
      <line x1="3" y1="10" x2="17" y2="10" />
      <ellipse cx="10" cy="10" rx="3.5" ry="7" />
    </svg>
  ),
  coaching: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3 L10 10 L15 13" />
      <circle cx="10" cy="10" r="7" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="2.5" />
      <path d="M10 2.5 v1.5 M10 16 v1.5 M2.5 10 h1.5 M16 10 h1.5 M4.5 4.5 l1 1 M14.5 14.5 l1 1 M4.5 15.5 l1-1 M14.5 5.5 l1-1" />
    </svg>
  ),
};

const SIDEBAR_BUTTONS = [
  { id: "overview", label: "Overview", icon: icons.overview, active: true },
  { id: "chart", label: "Chart", icon: icons.chart, active: false },
  { id: "watchlist", label: "Watchlist", icon: icons.watchlist, active: false },
  { id: "macro", label: "Macro", icon: icons.macro, active: false },
  { id: "coaching", label: "Coaching", icon: icons.coaching, active: false },
  { id: "settings", label: "Settings", icon: icons.settings, active: false },
] as const;

export default function DashboardResponsiveSidebar() {
  return (
    <div
      className="dashboard-precision-sidebar"
      style={{ ...boardRectStyle(SHELL_RECTS.sidebarRail), zIndex: 30 }}
    >
      {/* Rail frame chrome */}
      <div className="dashboard-precision-sidebar-frame" aria-hidden="true">
        <SidebarRailFrame preserveAspectRatio="none" />
      </div>

      {/* Button layer */}
      <div className="dashboard-sidebar-button-layer">
        {SIDEBAR_BUTTONS.map((btn) => (
          <button
            key={btn.id}
            type="button"
            className={`dashboard-sidebar-btn${btn.active ? " dashboard-sidebar-btn--active" : ""}`}
            aria-label={btn.label}
            title={btn.label}
          >
            {btn.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
