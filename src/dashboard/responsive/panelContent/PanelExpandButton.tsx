/**
 * PanelExpandButton.tsx
 *
 * Top-right maximize/restore icon for each panel.
 * Click once: panel scales to 2x. Click again: restore.
 * Uses inline SVG icons — no external dependency.
 */

interface PanelExpandButtonProps {
  expanded: boolean;
  onToggle: () => void;
}

const maximizeIcon = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6,2 2,2 2,6" />
    <polyline points="10,14 14,14 14,10" />
    <polyline points="14,6 14,2 10,2" />
    <polyline points="2,10 2,14 6,14" />
  </svg>
);

const restoreIcon = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4,2 8,2 8,6" />
    <polyline points="12,14 8,14 8,10" />
    <polyline points="14,4 14,8 10,8" />
    <polyline points="2,12 2,8 6,8" />
  </svg>
);

export default function PanelExpandButton({ expanded, onToggle }: PanelExpandButtonProps) {
  return (
    <button
      type="button"
      className={`dashboard-panel-expand-btn${expanded ? " dashboard-panel-expand-btn--active" : ""}`}
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      aria-label={expanded ? "Restore panel" : "Enlarge panel"}
      title={expanded ? "Restore panel" : "Enlarge panel"}
    >
      {expanded ? restoreIcon : maximizeIcon}
    </button>
  );
}
