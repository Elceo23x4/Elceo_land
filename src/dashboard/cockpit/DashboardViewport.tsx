import type { ReactNode } from "react";
import useCockpitScale, { STAGE_W, STAGE_H } from "../hooks/useCockpitScale";

interface DashboardViewportProps {
  children: ReactNode;
}

/**
 * Dashboard viewport — scales the 1920×1080 logical stage to fit
 * the browser viewport while preserving 16:9 aspect ratio (contain mode).
 *
 * Batch 7C: Hardened scaling, explicit wrapper sizing, overflow visible
 * to prevent rounding-related clipping at edges.
 */
export default function DashboardViewport({ children }: DashboardViewportProps) {
  const { containerRef, cockpitScale } = useCockpitScale();
  const { scale, scaledWidth, scaledHeight } = cockpitScale;

  return (
    <div className="cockpit-viewport" ref={containerRef}>
      <div
        className="cockpit-stage-wrapper"
        data-cockpit-scale={scale.toFixed(4)}
        data-cockpit-fit="contain"
        style={{
          width: scaledWidth,
          height: scaledHeight,
        }}
      >
        <div
          className="cockpit-stage"
          style={{
            width: STAGE_W,
            height: STAGE_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
