/**
 * PanelSectionNav.tsx
 *
 * V1B-8: Scrollable section nav with overflow arrows + framer-motion.
 * Detects overflow, shows left/right arrows, scrolls to reveal hidden tabs.
 * Active tab auto-scrolls into view.
 */

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface PanelSectionNavProps {
  items: string[];
  active: number;
  onSelect: (i: number) => void;
}

export default function PanelSectionNav({ items, active, onSelect }: PanelSectionNavProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkOverflow = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    checkOverflow();
    el.addEventListener("scroll", checkOverflow, { passive: true });
    const ro = new ResizeObserver(checkOverflow);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", checkOverflow);
      ro.disconnect();
    };
  }, [checkOverflow]);

  /* Auto-scroll active tab into view */
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const activeTab = el.children[active] as HTMLElement | undefined;
    if (activeTab) {
      activeTab.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
    }
  }, [active]);

  const scrollBy = useCallback((dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.6, behavior: "smooth" });
  }, []);

  return (
    <div className="dashboard-section-nav-shell">
      {/* Left arrow */}
      <AnimatePresence>
        {canScrollLeft && (
          <motion.button
            key="arrow-left"
            className="dashboard-section-nav-arrow dashboard-section-nav-arrow--left"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15 }}
            onClick={() => scrollBy(-1)}
            aria-label="Scroll tabs left"
            type="button"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M7 1L3 5L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Tab rail */}
      <div ref={railRef} className="dashboard-section-nav-scroll">
        {items.map((item, i) => (
          <span
            key={item}
            className={`dashboard-section-nav__item${i === active ? " dashboard-section-nav__item--active" : ""}`}
            onClick={() => onSelect(i)}
            role="tab"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelect(i); }}
          >
            {item}
          </span>
        ))}
      </div>

      {/* Right arrow */}
      <AnimatePresence>
        {canScrollRight && (
          <motion.button
            key="arrow-right"
            className="dashboard-section-nav-arrow dashboard-section-nav-arrow--right"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15 }}
            onClick={() => scrollBy(1)}
            aria-label="Scroll tabs right"
            type="button"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M3 1L7 5L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
