import { useState, useEffect, useRef, useCallback } from "react";

export const STAGE_W = 1920;
export const STAGE_H = 1080;

export interface CockpitScale {
  scale: number;
  viewportWidth: number;
  viewportHeight: number;
}

/**
 * Calculates scale factor to contain 1920×1080 inside the visible viewport.
 *
 * Batch 7C2: Uses window.visualViewport / window.innerWidth as primary source.
 * Does NOT rely on container element measurement (avoids circular dependency).
 * Listens to: window resize, orientationchange, visualViewport resize/scroll.
 * Uses requestAnimationFrame debouncing.
 */
export default function useCockpitScale(): {
  containerRef: React.RefObject<HTMLDivElement | null>;
  cockpitScale: CockpitScale;
} {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);
  const [cockpitScale, setCockpitScale] = useState<CockpitScale>(() => {
    const w = typeof window !== "undefined" ? (window.visualViewport?.width ?? window.innerWidth) : STAGE_W;
    const h = typeof window !== "undefined" ? (window.visualViewport?.height ?? window.innerHeight) : STAGE_H;
    const raw = Math.min(w / STAGE_W, h / STAGE_H);
    return { scale: Math.max(0.05, Math.min(raw, 1.5)), viewportWidth: w, viewportHeight: h };
  });

  const recalc = useCallback(() => {
    const width = window.visualViewport?.width ?? window.innerWidth;
    const height = window.visualViewport?.height ?? window.innerHeight;

    if (width === 0 || height === 0) return;

    const rawScale = Math.min(width / STAGE_W, height / STAGE_H);
    const scale = Math.max(0.05, Math.min(rawScale, 1.5));

    setCockpitScale((prev) => {
      if (prev.scale === scale && prev.viewportWidth === width && prev.viewportHeight === height) {
        return prev;
      }
      return { scale, viewportWidth: width, viewportHeight: height };
    });
  }, []);

  const scheduleRecalc = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(recalc);
  }, [recalc]);

  useEffect(() => {
    // Initial calculation
    recalc();

    // Window resize + orientationchange
    window.addEventListener("resize", scheduleRecalc);
    window.addEventListener("orientationchange", scheduleRecalc);

    // visualViewport resize (handles mobile browser chrome, pinch zoom)
    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener("resize", scheduleRecalc);
      vv.addEventListener("scroll", scheduleRecalc);
    }

    return () => {
      window.removeEventListener("resize", scheduleRecalc);
      window.removeEventListener("orientationchange", scheduleRecalc);
      if (vv) {
        vv.removeEventListener("resize", scheduleRecalc);
        vv.removeEventListener("scroll", scheduleRecalc);
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [recalc, scheduleRecalc]);

  return { containerRef, cockpitScale };
}
