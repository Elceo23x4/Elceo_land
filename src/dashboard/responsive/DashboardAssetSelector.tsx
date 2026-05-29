/**
 * DashboardAssetSelector.tsx
 *
 * Custom HUD-style asset dropdown for the chart zone.
 * Shows active asset, opens dropdown on click, selects asset.
 * Keyboard accessible. No native select look. Fixture-only.
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { AVAILABLE_ASSETS, assetContextBySymbol } from "./responsivePanelFixtures";

interface AssetSelectorProps {
  activeAsset: string;
  onAssetChange: (asset: string) => void;
}

export default function DashboardAssetSelector({ activeAsset, onAssetChange }: AssetSelectorProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  const select = useCallback((asset: string) => {
    onAssetChange(asset);
    setOpen(false);
  }, [onAssetChange]);

  // Close on Escape or outside click
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open]);

  const ctx = assetContextBySymbol[activeAsset];

  return (
    <div ref={containerRef} className="dashboard-asset-selector">
      <button
        type="button"
        className="dashboard-asset-selector__trigger"
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Active asset: ${activeAsset}`}
      >
        <span className="dashboard-asset-selector__symbol">{activeAsset}</span>
        <span className="dashboard-asset-selector__class">{ctx?.assetClass ?? ""}</span>
        <span className="dashboard-asset-selector__arrow">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="dashboard-asset-selector__dropdown" role="listbox" aria-label="Select asset">
          {AVAILABLE_ASSETS.map((asset) => (
            <button
              key={asset}
              type="button"
              className={`dashboard-asset-selector__option${asset === activeAsset ? " is-active" : ""}`}
              role="option"
              aria-selected={asset === activeAsset}
              onClick={() => select(asset)}
            >
              <span className="dashboard-asset-selector__option-symbol">{asset}</span>
              <span className="dashboard-asset-selector__option-label">{assetContextBySymbol[asset]?.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
