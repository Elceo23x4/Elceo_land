import { FullConnectorComposite } from "./dashboardCockpitAssets";

/**
 * Connector line overlay layer.
 * Renders SVG-13 full connector composite over the cockpit shell.
 * Lines/nodes only — no label capsules, no extra crosshairs.
 * If the asset is 1920×1080, it renders full-stage.
 */
export default function DashboardConnectorLayer() {
  return (
    <div className="cockpit-layer cockpit-layer--connectors" aria-hidden="true">
      <div className="cockpit-connector-asset">
        <FullConnectorComposite />
      </div>
    </div>
  );
}
