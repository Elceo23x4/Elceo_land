/**
 * ScrollFrame.tsx
 *
 * Custom ELCEO scroll indicator for panel bodies.
 * Wraps scrollable content with a hidden native scrollbar and
 * renders a modern flat amber/gold thumb overlay on a subtle rail.
 *
 * - Native scroll still works (keyboard, touch, wheel)
 * - Custom thumb tracks scrollTop / scrollHeight / clientHeight
 * - Uses onScroll + ResizeObserver — no setInterval
 * - Thumb hidden when content does not overflow
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

  const recalc = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const overflow = scrollHeight > clientHeight + 2;
    setHasOverflow(overflow);
    if (!overflow) return;
    const ratio = clientHeight / scrollHeight;
    const thumbH = Math.max(ratio * 100, 12); // percent, min 12%
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
    // Also observe first child for content changes
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => ro.disconnect();
  }, [recalc]);

  return (
    <div className={`dashboard-scroll-frame ${className}`}>
      <div
        ref={viewportRef}
        className="dashboard-scroll-frame__viewport"
        onScroll={recalc}
      >
        {children}
      </div>
      {hasOverflow && (
        <div className="dashboard-scroll-frame__rail dashboard-scroll-frame__rail--y" aria-hidden="true">
          <div
            className="dashboard-scroll-frame__thumb"
            style={{
              height: `${thumbHeight}%`,
              top: `${thumbTop}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}
