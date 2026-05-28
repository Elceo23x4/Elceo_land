/**
 * HoverPreviewCard.tsx
 *
 * Compact hover/pinned preview card for panel rows.
 * R5D: Fixed flicker/vibration by using contain:layout paint on trigger,
 * absolute positioning with pointer-events:none for hover state,
 * and preventing layout shift from preview insertion.
 */

import { useState, useRef, useCallback, useEffect, type ReactNode } from "react";

interface HoverPreviewCardProps {
  trigger: ReactNode;
  preview: ReactNode;
  className?: string;
}

export default function HoverPreviewCard({ trigger, preview, className = "" }: HoverPreviewCardProps) {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const show = hovered || pinned;

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setPinned((p) => !p);
  }, []);

  useEffect(() => {
    if (!pinned) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPinned(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [pinned]);

  return (
    <div
      ref={wrapperRef}
      className={`dashboard-preview-trigger ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { if (!pinned) setHovered(false); }}
      onClick={handleClick}
    >
      {trigger}
      {show && (
        <div className={`dashboard-hover-preview${pinned ? " dashboard-hover-preview--pinned" : ""}`}>
          {pinned && (
            <button
              type="button"
              className="dashboard-hover-preview__close"
              onClick={(e) => { e.stopPropagation(); setPinned(false); setHovered(false); }}
              aria-label="Close preview"
            >
              ✕
            </button>
          )}
          {preview}
        </div>
      )}
    </div>
  );
}
