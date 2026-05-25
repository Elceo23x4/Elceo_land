import { PANEL_SLOTS } from "./dashboardCockpitLayout";

interface DashboardPanelSlotMapProps {
  showLabels?: boolean;
}

/**
 * Semantic panel slot map for the cockpit layout.
 * Defines where each intelligence panel will be placed.
 * No final panel content — only transparent HUD slot boundaries.
 */
export default function DashboardPanelSlotMap({ showLabels = true }: DashboardPanelSlotMapProps) {
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
