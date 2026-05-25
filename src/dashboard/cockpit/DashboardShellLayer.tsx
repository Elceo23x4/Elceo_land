import {
  TopSystemBar,
  SidebarRail,
  ContentPanels,
  CentralWheel,
  FooterSlots,
} from "./dashboardCockpitAssets";
import { TOP_BAR, SIDEBAR, CENTRAL_WHEEL } from "./dashboardCockpitLayout";

/**
 * Structural shell layer: topbar, sidebar, content panels frame,
 * central radial wheel. Positioned absolutely within 1920×1080 stage.
 */
export default function DashboardShellLayer() {
  return (
    <div className="cockpit-layer cockpit-layer--shell" aria-hidden="true">
      {/* Top system bar — full width */}
      <div
        className="cockpit-shell-asset cockpit-shell-asset--topbar"
        style={{
          position: "absolute",
          left: TOP_BAR.x,
          top: TOP_BAR.y,
          width: TOP_BAR.w,
          height: TOP_BAR.h,
        }}
      >
        <TopSystemBar />
      </div>

      {/* Sidebar rail */}
      <div
        className="cockpit-shell-asset cockpit-shell-asset--sidebar"
        style={{
          position: "absolute",
          left: SIDEBAR.x,
          top: SIDEBAR.y,
          width: SIDEBAR.w,
          height: SIDEBAR.h,
        }}
      >
        <SidebarRail />
      </div>

      {/* Content panels frame — full stage overlay */}
      <div className="cockpit-shell-asset cockpit-shell-asset--content-panels">
        <ContentPanels />
      </div>

      {/* Central wheel / radial ring */}
      <div
        className="cockpit-shell-asset cockpit-shell-asset--central-wheel"
        style={{
          position: "absolute",
          left: CENTRAL_WHEEL.x,
          top: CENTRAL_WHEEL.y,
          width: CENTRAL_WHEEL.w,
          height: CENTRAL_WHEEL.h,
        }}
      >
        <CentralWheel />
      </div>

      {/* Footer slots */}
      <div className="cockpit-shell-asset cockpit-shell-asset--footer">
        <FooterSlots />
      </div>
    </div>
  );
}
