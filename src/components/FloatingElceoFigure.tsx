import { useEffect, useState } from "react";
import ElceoFigure from "../assets/source/global/elceo_fig.svg?react";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

// Stage coordinates (1920×1080 design)
const FIGURE_LEFT = 1841;
const FIGURE_TOP = 444;
const FIGURE_WIDTH = 79;
const FIGURE_HEIGHT = 171;

function useHeroScale() {
  const [scale, setScale] = useState(() =>
    Math.min(window.innerWidth / 1920, window.innerHeight / 1080)
  );

  useEffect(() => {
    function handleResize() {
      setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return scale;
}

interface FloatingElceoFigureProps {
  dimmed?: boolean;
}

export default function FloatingElceoFigure({ dimmed = false }: FloatingElceoFigureProps) {
  const prefersReduced = usePrefersReducedMotion();
  const scale = useHeroScale();

  const stageLeft = (window.innerWidth - 1920 * scale) / 2;
  const width = FIGURE_WIDTH * scale;
  const height = FIGURE_HEIGHT * scale;
  const margin = 12;
  const unclampedLeft = stageLeft + FIGURE_LEFT * scale;
  const maxLeft = window.innerWidth - width - margin;
  const left = Math.max(margin, Math.min(unclampedLeft, maxLeft));
  const top = Math.max(8, Math.min(FIGURE_TOP * scale, window.innerHeight - height - 8));

  return (
    <div
      className={`floating-elceo-figure ${dimmed ? "floating-elceo-dimmed" : ""}`}
      aria-hidden="true"
      style={{
        position: "fixed",
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
        zIndex: 900,
        pointerEvents: "none",
        transition: "opacity 0.4s ease",
      }}
    >
      <div className={prefersReduced ? "" : "floating-elceo-bob"}>
        <ElceoFigure className="floating-elceo-svg" />
      </div>
    </div>
  );
}
