import type { ReactNode } from "react";
import useCockpitScale from "../hooks/useCockpitScale";

interface DashboardViewportProps {
  children: ReactNode;
}

/**
 * Dashboard Viewport — Batch 7D Responsive Board Model
 *
 * The board uses CSS aspect-ratio: 1920/1080 to maintain proportions.
 * It fits inside the viewport via max-width/max-height constraints.
 * No JS-driven transform scaling. Pure CSS responsive containment.
 * All internal layers use percentage-based positioning relative to the board.
 */
export default function DashboardViewport({ children }: DashboardViewportProps) {
  const { boardRef } = useCockpitScale();

  return (
    <div className="cockpit-viewport">
      <div className="cockpit-board" ref={boardRef}>
        {children}
      </div>
    </div>
  );
}
