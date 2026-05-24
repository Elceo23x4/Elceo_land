import "../styles/dashboard.asset-inventory.css";
import {
  dashboardAssetManifest,
  getDashboardAssetsByCategory,
  getApprovedDashboardAssets,
  getPartialDashboardAssets,
  getPendingDashboardAssets,
} from "./dashboardAssetManifest";
import type {
  DashboardAssetCategory,
  DashboardAssetEntry,
} from "./dashboardAssetManifest";
import { dashboardAssetImportSmokeSet } from "./dashboardAssetImports";

const CATEGORIES: DashboardAssetCategory[] = [
  "shell",
  "chart",
  "panels",
  "gauges",
  "evidence",
  "watchlist",
  "background",
  "connectors",
  "arrows",
  "maps",
  "sky",
  "master",
  "preview",
  "layer-map",
];

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === "approved"
      ? "asset-inventory__badge--approved"
      : status === "partial"
        ? "asset-inventory__badge--partial"
        : "asset-inventory__badge--pending";
  return (
    <span className={`asset-inventory__badge ${cls}`}>{status}</span>
  );
}


function AssetTable({ assets }: { assets: DashboardAssetEntry[] }) {
  if (assets.length === 0) {
    return (
      <p style={{ color: "#555", fontSize: "0.72rem", fontStyle: "italic" }}>
        No assets in this category.
      </p>
    );
  }
  return (
    <table className="asset-inventory__table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Batch</th>
          <th>Status</th>
          <th>Mode</th>
          <th>Source Path</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((a) => (
          <tr key={a.id}>
            <td>{a.id}</td>
            <td>{a.name}</td>
            <td>{a.batch}{a.revision ? ` (${a.revision})` : ""}</td>
            <td><StatusBadge status={a.status} /></td>
            <td>{a.importMode}</td>
            <td style={{ fontSize: "0.6rem", color: "#666" }}>{a.sourcePath}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function DashboardAssetInventory() {
  const approved = getApprovedDashboardAssets();
  const partial = getPartialDashboardAssets();
  const pending = getPendingDashboardAssets();

  return (
    <div className="asset-inventory">
      <header className="asset-inventory__header">
        <h1 className="asset-inventory__title">
          ELCEO Dashboard Asset Inventory
        </h1>
        <p className="asset-inventory__subtitle">
          Batch 1 — Asset foundation catalog. Total entries:{" "}
          {dashboardAssetManifest.length} | Approved: {approved.length} |
          Partial: {partial.length} | Pending: {pending.length}
        </p>
      </header>

      {CATEGORIES.map((cat) => {
        const assets = getDashboardAssetsByCategory(cat);
        return (
          <section key={cat} className="asset-inventory__section">
            <h2 className="asset-inventory__section-title">
              {cat}
              <span className="asset-inventory__count">
                ({assets.length})
              </span>
            </h2>
            <AssetTable assets={assets} />
          </section>
        );
      })}

      <section className="asset-inventory__smoke-section">
        <h2 className="asset-inventory__smoke-title">
          SVGR Import Smoke Set ({dashboardAssetImportSmokeSet.length} assets)
        </h2>
        <div className="asset-inventory__smoke-grid">
          {dashboardAssetImportSmokeSet.map((item) => (
            <div key={item.id} className="asset-inventory__smoke-card">
              <item.Component />
              <div className="asset-inventory__smoke-label">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
