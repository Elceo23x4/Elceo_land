import {
  TopSystemBar,
  SidebarRail,
  ContentPanels,
  CentralWheel,
  FooterSlots,
} from "./dashboardCockpitAssets";
import { COCKPIT_GEOMETRY } from "./dashboardCockpitGeometry";

const { topSystemBar, centralWheel } = COCKPIT_GEOMETRY;

export default function DashboardShellLayer() {
  return (
    <div className="cockpit-layer cockpit-layer--shell elceo-cockpit-no-glow" aria-hidden="true">
      {/* Content panels frame — full stage (viewBox 0 0 1920 1080) */}
      <div className="cockpit-shell-asset--full-stage cockpit-shell-asset--content-panels">
        <ContentPanels />
      </div>

      {/* Top system bar — exact rectangle */}
      <div
        className="cockpit-shell-asset--isolated cockpit-shell-asset--topbar"
        style={{ left: topSystemBar.x, top: topSystemBar.y, width: topSystemBar.w, height: topSystemBar.h }}
      >
        <TopSystemBar />
      </div>

      {/* Sidebar rail — full stage, stays far-left */}
      <div className="cockpit-shell-asset--full-stage cockpit-shell-asset--sidebar">
        <SidebarRail />
      </div>

      {/* Central wheel — exact rectangle */}
      <div
        className="cockpit-shell-asset--isolated cockpit-shell-asset--central-wheel"
        style={{ left: centralWheel.x, top: centralWheel.y, width: centralWheel.w, height: centralWheel.h }}
      >
        <CentralWheel />
      </div>

      {/* Footer slots — isolated */}
      <div
        className="cockpit-shell-asset--isolated cockpit-shell-asset--footer"
        style={{ left: 620, top: 950, width: 680, height: 120 }}
      >
        <FooterSlots />
      </div>
    </div>
  );
}
