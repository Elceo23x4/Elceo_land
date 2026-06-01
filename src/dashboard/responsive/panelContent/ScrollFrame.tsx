/**
 * ScrollFrame.tsx
 *
 * V1B-8B: Premium ELCEO HUD scroll indicator for panel bodies.
 * Owns vertical scroll (panel body slot set to overflow:hidden).
 * Renders a modern amber scroll capsule thumb on a near-invisible rail.
 * Includes top/bottom edge fades for scroll context.
 *
 * - Native scroll still works (keyboard, touch, wheel)
 * - Custom thumb tracks scrollTop / scrollHeight / clientHeight
 * - Uses onScroll + ResizeObserver — no setInterval
 * - Thumb hidden when content does not overflow
 * - Edge fades show only when scrollable
 */

import { useRef, useState, useEffect, useCallback, type ReactNode } from "react";

interface ScrollFrameProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollFrame({ children, className = "" }: ScrollFrameProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);

  const recalc = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const overflow = scrollHeight > clientHeight + 2;
    setHasOverflow(overflow);
    setAtTop(scrollTop < 3);
    setAtBottom(scrollTop + clientHeight >= scrollHeight - 3);
    if (!overflow) return;
    const ratio = clientHeight / scrollHeight;
    const thumbH = Math.max(ratio * 100, 14); // percent, min 14%
    const scrollable = scrollHeight - clientHeight;
    const topPct = scrollable > 0 ? (scrollTop / scrollable) * (100 - thumbH) : 0;
    setThumbHeight(thumbH);
    setThumbTop(topPct);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    recalc();
    const ro = new ResizeObserver(recalc);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => ro.disconnect();
  }, [recalc]);

  return (
    <div className={`dashboard-scroll-frame ${className}`}>
      {/* Top edge fade */}
      {hasOverflow && !atTop && (
        <div className="dashboard-scroll-frame__fade dashboard-scroll-frame__fade--top" aria-hidden="true" />
      )}

      <div
        ref={viewportRef}
        className="dashboard-scroll-frame__viewport"
        onScroll={recalc}
      >
        {children}
      </div>

      {/* Bottom edge fade */}
      {hasOverflow && !atBottom && (
        <div className="dashboard-scroll-frame__fade dashboard-scroll-frame__fade--bottom" aria-hidden="true" />
      )}

      {/* Premium scroll rail + capsule thumb */}
      {hasOverflow && (
        <div className="dashboard-scroll-frame__rail" aria-hidden="true">
          <div
            className="dashboard-scroll-frame__thumb"
            style={{
              height: `${thumbHeight}%`,
              top: `${thumbTop}%`,
            }}
          >
            <span className="dashboard-scroll-frame__thumb-core" />
          </div>
        </div>
      )}
    </div>
  );
}
