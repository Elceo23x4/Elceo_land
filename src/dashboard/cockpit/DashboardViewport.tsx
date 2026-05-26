import type { ReactNode } from "react";
import useCockpitScale from "../hooks/useCockpitScale";

interface DashboardViewportProps {
  children: ReactNode;
}

/**
 * Dashboard viewport — center-scaled fixed stage approach.
 *
 * Batch 7C2: The cockpit-stage-wrapper is a fixed 1920×1080 element positioned
 * at absolute 50%/50% and centered via translate3d(-50%, -50%, 0) combined with
 * the contain scale. This eliminates flex-centering rounding issues and ensures
 * the full cockpit is always visible regardless of viewport dimensions.
 */
export default function DashboardViewport({ children }: DashboardViewportProps) {
  const { containerRef, cockpitScale } = useCockpitScale();
  const { scale, viewportWidth, viewportHeight } = cockpitScale;

  return (
    <div className="cockpit-viewport" ref={containerRef}>
      <div
        className="cockpit-stage-wrapper"
        data-cockpit-scale={scale.toFixed(4)}
        data-cockpit-fit="contain-center"
        data-viewport-width={Math.round(viewportWidth)}
        data-viewport-height={Math.round(viewportHeight)}
        style={{
          transform: `translate3d(-50%, -50%, 0) scale(${scale})`,
        }}
      >
        <div className="cockpit-stage">
          {children}
        </div>
      </div>
    </div>
  );
}
