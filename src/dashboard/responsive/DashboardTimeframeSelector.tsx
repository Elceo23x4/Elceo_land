/**
 * DashboardTimeframeSelector.tsx
 *
 * R7F: Compact HUD-style timeframe selector for the chart zone.
 * Local state only. No route change. No network calls. No localStorage.
 * Keyboard accessible. Escape closes dropdown.
 * Fixture-only. Market language only.
 */

import { useState, useRef, useEffect, useCallback } from "react";

export const AVAILABLE_TIMEFRAMES = ["15M", "1H", "4H", "1D"] as const;
export type Timeframe = (typeof AVAILABLE_TIMEFRAMES)[number];

const TIMEFRAME_LABELS: Record<Timeframe, string> = {
  "15M": "15 Min",
  "1H": "1 Hour",
  "4H": "4 Hour",
  "1D": "1 Day",
};

interface TimeframeSelectorProps {
  activeTimeframe: Timeframe;
  onTimeframeChange: (tf: Timeframe) => void;
}

export default function DashboardTimeframeSelector({
  activeTimeframe,
  onTimeframeChange,
}: TimeframeSelectorProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  const select = useCallback(
    (tf: Timeframe) => {
      onTimeframeChange(tf);
      setOpen(false);
    },
    [onTimeframeChange]
  );

  // Close on Escape or outside click
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node))
        setOpen(false);
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
        <span className="dashboard-timeframe-selector__arrow">{open ? "\u25B2" : "\u25BC"}</span>
      </button>

      {open && (
        <div
          className="dashboard-timeframe-selector__dropdown"
          role="listbox"
          aria-label="Select timeframe"
        >
          {AVAILABLE_TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              type="button"
              className={`dashboard-timeframe-selector__option${tf === activeTimeframe ? " is-active" : ""}`}
              role="option"
              aria-selected={tf === activeTimeframe}
              onClick={() => select(tf)}
            >
              <span className="dashboard-timeframe-selector__option-value">{tf}</span>
              <span className="dashboard-timeframe-selector__option-label">
                {TIMEFRAME_LABELS[tf]}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
