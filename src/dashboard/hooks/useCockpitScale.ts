import { useState, useEffect, useRef, useCallback } from "react";

const STAGE_W = 1920;
const STAGE_H = 1080;

interface CockpitScale {
  scale: number;
  stageWidth: number;
  stageHeight: number;
}

/**
 * Calculates scale factor to fit 1920×1080 logical stage
 * inside the observed container while preserving 16:9 aspect ratio.
 */
export default function useCockpitScale(): {
  containerRef: React.RefObject<HTMLDivElement | null>;
  cockpitScale: CockpitScale;
} {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cockpitScale, setCockpitScale] = useState<CockpitScale>({
    scale: 1,
    stageWidth: STAGE_W,
    stageHeight: STAGE_H,
  });

  const recalc = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const vw = el.clientWidth;
    const vh = el.clientHeight;
    if (vw === 0 || vh === 0) return;
    const scale = Math.min(vw / STAGE_W, vh / STAGE_H);
    setCockpitScale({ scale, stageWidth: STAGE_W, stageHeight: STAGE_H });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (typeof ResizeObserver === "undefined") {
      recalc();
      return;
    }
    const ro = new ResizeObserver(() => recalc());
    ro.observe(el);
    recalc();
    return () => ro.disconnect();
  }, [recalc]);

  return { containerRef, cockpitScale };
}

export { STAGE_W, STAGE_H };
