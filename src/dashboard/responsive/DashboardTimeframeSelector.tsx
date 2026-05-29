/**
 * DashboardTimeframeSelector.tsx
 *
 * Compact HUD-style timeframe selector for the chart zone.
 * Follows the same pattern as DashboardAssetSelector.
 * Fixture-only. No route state. No live data.
 */

import { useState, useRef, useEffect, useCallback } from "react";

const TIMEFRAMES = ["15M", "1H", "4H", "1D"] as const;

interface TimeframeSelectorProps {
  activeTimeframe: string;
  onTimeframeChange: (tf: string) => void;
}

export default function DashboardTimeframeSelector({ activeTimeframe, onTimeframeChange }: TimeframeSelectorProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  const select = useCallback((tf: string) => {
    onTimeframeChange(tf);
    setOpen(false);
  }, [onTimeframeChange]);

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

  return (
    <div ref={containerRef} className="dashboard-timeframe-selector">
      <button
        type="button"
        className="dashboard-timeframe-selector__trigger"
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Active timeframe: ${activeTimeframe}`}
      >
        <span className="dashboard-timeframe-selector__value">{activeTimeframe}</span>
        <span className="dashboard-timeframe-selector__arrow">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="dashboard-timeframe-selector__dropdown" role="listbox" aria-label="Select timeframe">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              type="button"
              className={`dashboard-timeframe-selector__option${tf === activeTimeframe ? " is-active" : ""}`}
              role="option"
              aria-selected={tf === activeTimeframe}
              onClick={() => select(tf)}
            >
              {tf}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
