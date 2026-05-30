/**
 * dashboardPanelAlertService.ts
 *
 * Frontend fixture service only. Replace with real backend alert client when available.
 * No network. No persistence. Returns immediately.
 */

import type { DashboardPanelAlertUpdate } from "./dashboardPanelAlertTypes";

export async function updateDashboardPanelAlertPreference(
  update: DashboardPanelAlertUpdate
): Promise<{ ok: true; mode: "fixture"; updated: DashboardPanelAlertUpdate }> {
  return { ok: true, mode: "fixture", updated: update };
}
