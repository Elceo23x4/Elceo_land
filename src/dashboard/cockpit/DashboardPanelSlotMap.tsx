import { PANEL_SLOTS } from "./dashboardCockpitLayout";

interface DashboardPanelSlotMapProps {
  showLabels?: boolean;
  visible?: boolean;
}

/**
 * Debug-only panel slot overlay.
 * Renders transparent slot boundaries for internal layout review.
 * Not visible by default in production cockpit.
 */
export default function DashboardPanelSlotMap({
  showLabels = false,
  visible = false,
}: DashboardPanelSlotMapProps) {
  if (!visible) return null;

  return (
    <div className="cockpit-layer cockpit-layer--slots">
      {PANEL_SLOTS.map((slot) => (
        <div
          key={slot.id}
          className="cockpit-slot"
          data-slot={slot.id}
          aria-label={slot.label}
          style={{
            position: "absolute",
            left: slot.x,
            top: slot.y,
            width: slot.w,
            height: slot.h,
          }}
        >
          {showLabels && (
            <span className="cockpit-slot__label">{slot.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}
