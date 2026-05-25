import type { ReactNode } from "react";
import useCockpitScale, { STAGE_W, STAGE_H } from "../hooks/useCockpitScale";

interface DashboardViewportProps {
  children: ReactNode;
}

/**
 * Dashboard viewport — scales the 1920×1080 logical stage to fit
 * the browser viewport while preserving 16:9 aspect ratio.
 *
 * Batch 4: Fixed centering approach. The stage is scaled from top-left,
 * and the wrapper div is sized to the scaled dimensions so flexbox
 * centering works correctly (no visual offset).
 */
export default function DashboardViewport({ children }: DashboardViewportProps) {
  const { containerRef, cockpitScale } = useCockpitScale();
  const { scale } = cockpitScale;

  return (
    <div className="cockpit-viewport" ref={containerRef}>
      <div
        className="cockpit-stage-wrapper"
        style={{
          width: STAGE_W * scale,
          height: STAGE_H * scale,
          overflow: "hidden",
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
