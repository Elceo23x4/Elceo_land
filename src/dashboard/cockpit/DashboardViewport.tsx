import type { ReactNode } from "react";
import useCockpitScale, { STAGE_W, STAGE_H } from "../hooks/useCockpitScale";

interface DashboardViewportProps {
  children: ReactNode;
}

export default function DashboardViewport({ children }: DashboardViewportProps) {
  const { containerRef, cockpitScale } = useCockpitScale();
  const { scale } = cockpitScale;

  return (
    <div className="cockpit-viewport" ref={containerRef}>
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
  );
}
