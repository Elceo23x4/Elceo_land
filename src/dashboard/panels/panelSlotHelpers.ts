import type { CSSProperties } from "react";
import { PANEL_SLOTS } from "../cockpit/dashboardCockpitLayout";

export interface PanelContentInset {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

const PANEL_CONTENT_INSETS: Record<string, PanelContentInset> = {
  "directional-bias-summary": { left: 28, top: 42, right: 26, bottom: 22 },
  "confidence-context-matrix": { left: 28, top: 44, right: 26, bottom: 22 },
};

const DEFAULT_INSET: PanelContentInset = { left: 24, top: 38, right: 24, bottom: 20 };

export function getPanelSlotOuterStyle(slotId: string): CSSProperties {
  const slot = PANEL_SLOTS.find((s) => s.id === slotId);
  if (!slot) return {};
  return { position: "absolute", left: slot.x, top: slot.y, width: slot.w, height: slot.h };
}

export function getPanelSlotInnerStyle(slotId: string): CSSProperties {
  const slot = PANEL_SLOTS.find((s) => s.id === slotId);
  if (!slot) return {};
  const inset = PANEL_CONTENT_INSETS[slotId] ?? DEFAULT_INSET;
  return {
    position: "absolute",
    left: slot.x + inset.left,
    top: slot.y + inset.top,
    width: slot.w - inset.left - inset.right,
    height: slot.h - inset.top - inset.bottom,
  };
}
