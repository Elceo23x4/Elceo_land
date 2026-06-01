/**
 * PanelSectionNav.tsx
 *
 * V1B-8B: Scrollable section nav with single adaptive premium scroll cue.
 * Detects overflow, shows one HUD-style cue that changes direction.
 * Uses useReducedMotion for accessibility.
 */

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export interface PanelSectionNavProps {
  items: string[];
  active: number;
  onSelect: (i: number) => void;
}

export default function PanelSectionNav({ items, active, onSelect }: PanelSectionNavProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const reduceMotion = useReducedMotion();

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
      const tabLeft = activeTab.offsetLeft;
      const tabRight = tabLeft + activeTab.offsetWidth;
      const visibleLeft = el.scrollLeft;
      const visibleRight = visibleLeft + el.clientWidth;
      if (tabLeft < visibleLeft || tabRight > visibleRight) {
        activeTab.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
      }
    }
  }, [active]);

  /* Single adaptive cue: right when can scroll right, left when at end */
  const cueDirection: "right" | "left" | null =
    canScrollRight ? "right" : canScrollLeft ? "left" : null;

  const handleCueClick = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    if (cueDirection === "right") {
      el.scrollBy({ left: el.clientWidth * 0.7, behavior: "smooth" });
    } else {
      el.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [cueDirection]);

  const cueLabel = cueDirection === "right"
    ? "Reveal more section tabs"
    : "Return to earlier section tabs";

  return (
    <div className="dashboard-section-nav-shell">
      {/* Tab rail */}
      <div ref={railRef} className="dashboard-section-nav-scroll">
        {items.map((item, i) => (
          <button
            key={item}
            type="button"
            className={`dashboard-section-nav__item${i === active ? " dashboard-section-nav__item--active" : ""}`}
            onClick={() => onSelect(i)}
            role="tab"
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Single adaptive premium scroll cue */}
      <AnimatePresence>
        {cueDirection && (
          <motion.button
            key="section-cue"
            className={`dashboard-section-nav-cue dashboard-section-nav-cue--${cueDirection}`}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: cueDirection === "right" ? -4 : 4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: cueDirection === "right" ? 4 : -4 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.15, ease: "easeOut" }}
            onClick={handleCueClick}
            aria-label={cueLabel}
            title={cueLabel}
            type="button"
          >
            <span className="dashboard-section-nav-cue__glyph" aria-hidden="true">
              {cueDirection === "right" ? "»" : "«"}
            </span>
            <span className="dashboard-section-nav-cue__shine" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
