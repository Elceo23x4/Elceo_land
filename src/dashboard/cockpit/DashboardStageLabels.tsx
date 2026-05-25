/**
 * Temporary internal review labels for Batch 3.
 * Shows stage dimensions, route, and batch info.
 * Can be removed in later batches.
 */
export default function DashboardStageLabels() {
  return (
    <div className="cockpit-layer cockpit-layer--labels" aria-hidden="true">
      <div className="cockpit-stage-label cockpit-stage-label--top-right">
        <span>1920 × 1080</span>
        <span>/dashboard</span>
        <span>Batch 3 shell composition</span>
      </div>
      <div className="cockpit-stage-label cockpit-stage-label--bottom-left">
        <span>Backend guards remain source of truth</span>
        <span>Provider pending — not live</span>
      </div>
    </div>
  );
}
