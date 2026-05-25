import type { CSSProperties } from "react";
import { PANEL_SLOTS } from "../cockpit/dashboardCockpitLayout";

export function getPanelSlotStyle(slotId: string): CSSProperties {
  const slot = PANEL_SLOTS.find((s) => s.id === slotId);
  if (!slot) return {};
  return {
    position: "absolute",
    left: slot.x,
    top: slot.y,
    width: slot.w,
    height: slot.h,
  };
}
