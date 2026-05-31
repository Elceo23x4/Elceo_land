/**
 * DashboardResponsiveSidebar.tsx
 *
 * R6C: Market cockpit navigation only.
 * Uses designed icons from SVG-04 nav icons asset (extracted).
 */

import { SidebarRailFrame } from "./dashboardResponsiveAssets";
import { boardRectStyle, SHELL_RECTS } from "./dashboardResponsiveGeometry";
import DashboardSidebarIcon from "./DashboardSidebarIcon";
import type { DashboardSidebarIconName } from "./DashboardSidebarIcon";

const SIDEBAR_BUTTONS: { id: DashboardSidebarIconName; title: string; active: boolean }[] = [
  { id: "cockpit", title: "Market Cockpit", active: true },
  { id: "chart", title: "Chart Context", active: false },
  { id: "assets", title: "Watchlist Assets", active: false },
  { id: "evidence", title: "Evidence Stack", active: false },
  { id: "macro", title: "News & Macro", active: false },
  { id: "regime", title: "Market Regime", active: false },
  { id: "journal", title: "Journal & Coaching", active: false },
];

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
            <DashboardSidebarIcon name={btn.id} />
          </button>
        ))}
      </div>
    </div>
  );
}
