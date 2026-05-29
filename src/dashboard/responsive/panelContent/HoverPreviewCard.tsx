/**
 * HoverPreviewCard.tsx
 *
 * Portal-based hover/pinned preview card for panel rows.
 * Uses createPortal to render preview into document.body — layout-independent.
 * Position calculated from triggerRef bounding rect.
 * Hover preview uses pointer-events:none (no flicker).
 * Pinned preview uses pointer-events:auto with close button.
 * No timers, no intervals.
 */

import { useState, useRef, useCallback, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface HoverPreviewCardProps {
  trigger: ReactNode;
  preview: ReactNode;
  className?: string;
}

export default function HoverPreviewCard({ trigger, preview, className = "" }: HoverPreviewCardProps) {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const show = hovered || pinned;

  const calcPosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const previewWidth = 280;
    const previewHeight = 120;
    const margin = 8;

    let top = rect.bottom + 6;
    let left = rect.left;

    // Flip left if near right edge
    if (left + previewWidth > window.innerWidth - margin) {
      left = Math.max(margin, rect.right - previewWidth);
    }

    // Place above if near bottom edge
    if (top + previewHeight > window.innerHeight - margin) {
      top = rect.top - previewHeight - 6;
    }

    // Clamp within viewport
    left = Math.max(margin, Math.min(left, window.innerWidth - previewWidth - margin));
    top = Math.max(margin, top);

    setPosition({ top, left });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    calcPosition();
  }, [calcPosition]);

  const handleMouseLeave = useCallback(() => {
    if (!pinned) {
      setHovered(false);
    }
  }, [pinned]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!pinned) {
      calcPosition();
    }
    setPinned((p) => !p);
  }, [pinned, calcPosition]);

  // Escape closes pinned preview
  useEffect(() => {
    if (!pinned) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPinned(false);
        setHovered(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [pinned]);

  // Recalculate position on scroll/resize while visible
  useEffect(() => {
    if (!show) return;
    const update = () => calcPosition();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [show, calcPosition]);

  return (
    <div
      ref={triggerRef}
      className={`dashboard-preview-trigger ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {trigger}
      {show && position && createPortal(
        <div
          className={`dashboard-hover-preview-floating${pinned ? " is-pinned" : ""}`}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
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
        </div>,
        document.body
      )}
    </div>
  );
}
