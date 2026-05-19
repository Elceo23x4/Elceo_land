import ElceoFigure from "../assets/source/global/elceo_fig.svg?react";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

interface FloatingElceoFigureProps {
  dimmed?: boolean;
}

export default function FloatingElceoFigure({ dimmed = false }: FloatingElceoFigureProps) {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <div
      className={`floating-elceo-figure ${prefersReduced ? "" : "floating-elceo-bob"} ${dimmed ? "floating-elceo-dimmed" : ""}`}
      aria-hidden="true"
    >
      <ElceoFigure className="floating-elceo-svg" />
    </div>
  );
}
