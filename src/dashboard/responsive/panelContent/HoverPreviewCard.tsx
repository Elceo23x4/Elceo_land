/**
 * HoverPreviewCard.tsx
 *
 * Compact hover/pinned preview card for panel rows.
 * - Hover/focus shows preview
 * - Click pins the preview
 * - Pinned preview has close button, Escape closes
 * - Dark glass HUD styling
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

  const handleClick = useCallback(() => {
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
      className={`dashboard-hover-trigger ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      style={{ position: "relative", cursor: "pointer" }}
    >
      {trigger}
      {show && (
        <div className={`dashboard-hover-preview${pinned ? " dashboard-hover-preview--pinned" : ""}`}>
          {pinned && (
            <button
              type="button"
              className="dashboard-hover-preview__close"
              onClick={(e) => { e.stopPropagation(); setPinned(false); }}
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
