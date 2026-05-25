import { PlanBadge, ProviderReadinessBadge, PersistenceStatusBadge } from "../components/system";

/**
 * Safe non-live status indicators for the shell composition preview.
 * Does not claim live providers, production persistence, or live notifications.
 */
export default function DashboardShellStatusLayer() {
  return (
    <div className="cockpit-layer cockpit-layer--status">
      <div className="cockpit-status-bar">
        <PlanBadge plan="kickoff" size="sm" />
        <ProviderReadinessBadge status="provider_pending" />
        <PersistenceStatusBadge status="memory_fallback" internalOnly />
        <span className="cockpit-status-bar__label">
          Shell composition preview — Fixture-only interface
        </span>
      </div>
    </div>
  );
}
