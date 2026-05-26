import { useState, useEffect, useRef, useCallback } from "react";

export const STAGE_W = 1920;
export const STAGE_H = 1080;

export interface CockpitScale {
  scale: number;
  scaledWidth: number;
  scaledHeight: number;
  viewportWidth: number;
  viewportHeight: number;
}

/**
 * Calculates scale factor to fit 1920×1080 logical stage
 * inside the observed container while preserving 16:9 aspect ratio.
 *
 * Batch 7C: Hardened with multiple resize listeners, getBoundingClientRect,
 * visualViewport fallback, and rAF debouncing.
 */
export default function useCockpitScale(): {
  containerRef: React.RefObject<HTMLDivElement | null>;
  cockpitScale: CockpitScale;
} {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);
  const [cockpitScale, setCockpitScale] = useState<CockpitScale>({
    scale: 1,
    scaledWidth: STAGE_W,
    scaledHeight: STAGE_H,
    viewportWidth: STAGE_W,
    viewportHeight: STAGE_H,
  });

  const recalc = useCallback(() => {
    const el = containerRef.current;

    let vw = 0;
    let vh = 0;

    if (el) {
      const rect = el.getBoundingClientRect();
      vw = rect.width;
      vh = rect.height;
    }

    // Fallback to visualViewport or window inner dimensions
    if (!vw || !vh) {
      vw = window.visualViewport?.width ?? window.innerWidth;
      vh = window.visualViewport?.height ?? window.innerHeight;
    }

    if (vw === 0 || vh === 0) return;

    const rawScale = Math.min(vw / STAGE_W, vh / STAGE_H);
    const scale = Math.max(0.1, Math.min(rawScale, 1.5));

    setCockpitScale({
      scale,
      scaledWidth: Math.floor(STAGE_W * scale),
      scaledHeight: Math.floor(STAGE_H * scale),
      viewportWidth: vw,
      viewportHeight: vh,
    });
  }, []);

  const scheduleRecalc = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(recalc);
  }, [recalc]);

  useEffect(() => {
    const el = containerRef.current;

    // Initial calculation
    recalc();

    // ResizeObserver on container
    let ro: ResizeObserver | undefined;
    if (el && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(scheduleRecalc);
      ro.observe(el);
    }

    // Window resize + orientationchange
    window.addEventListener("resize", scheduleRecalc);
    window.addEventListener("orientationchange", scheduleRecalc);

    // visualViewport resize (handles mobile browser chrome changes, pinch zoom)
    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener("resize", scheduleRecalc);
      vv.addEventListener("scroll", scheduleRecalc);
    }

    return () => {
      if (ro) ro.disconnect();
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
