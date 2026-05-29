import type { ReactNode } from "react";
import { TopSystemBarFrame, SidebarRailFrame } from "./dashboardResponsiveAssets";

/**
 * DashboardResponsiveShell
 *
 * The responsive shell layout component.
 * Provides: topbar, sidebar, and main content grid area.
 *
 * Uses CSS Grid — NOT absolute positioning from 1920×1080 board.
 * SVG frames used as decorative chrome only.
 */

const SIDEBAR_ITEMS = [
  { id: "overview", label: "OV", active: true },
  { id: "chart", label: "CH", active: false },
  { id: "watchlist", label: "WL", active: false },
  { id: "macro", label: "MA", active: false },
  { id: "coaching", label: "CO", active: false },
  { id: "settings", label: "ST", active: false },
];

interface DashboardResponsiveShellProps {
  children: ReactNode;
}

export default function DashboardResponsiveShell({ children }: DashboardResponsiveShellProps) {
  return (
    <div className="dashboard-responsive-shell">
      {/* ─── Topbar ─── */}
      <div className="dashboard-topbar-zone">
        <div className="dashboard-topbar-frame" aria-hidden="true">
          <TopSystemBarFrame preserveAspectRatio="none" />
        </div>
        <div className="dashboard-topbar-content">
          <span className="dashboard-topbar-brand">ELCEO</span>
          <span className="dashboard-topbar-title">Market Cognition Cockpit</span>
          <span className="dashboard-topbar-spacer" />
          <span className="dashboard-topbar-badge dashboard-topbar-badge--fixture">
            Fixture Mode
          </span>
          <span className="dashboard-topbar-badge">Market Data Pending</span>
          <span className="dashboard-topbar-clock">UTC —:—</span>
        </div>
      </div>

      {/* ─── Sidebar ─── */}
      <div className="dashboard-sidebar-zone">
        <div className="dashboard-sidebar-frame" aria-hidden="true">
          <SidebarRailFrame preserveAspectRatio="none" />
        </div>
        <nav className="dashboard-sidebar-content" aria-label="Dashboard navigation">
          {SIDEBAR_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`dashboard-sidebar-icon${item.active ? " dashboard-sidebar-icon--active" : ""}`}
              title={item.id}
              role="button"
              tabIndex={0}
            >
              {item.label}
            </div>
          ))}
          <div className="dashboard-sidebar-dot" />
        </nav>
      </div>

      {/* ─── Main Grid ─── */}
      <div className="dashboard-main-grid">
        {children}
      </div>
    </div>
  );
}
