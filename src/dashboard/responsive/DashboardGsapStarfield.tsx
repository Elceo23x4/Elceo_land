/**
 * DashboardGsapStarfield.tsx
 *
 * Guaranteed visible GSAP-driven SVG starfield layer.
 * Renders its own SVG with deterministic <circle> stars.
 * GSAP animates opacity and scale with yoyo/repeat for twinkle.
 * Mounted above night sky, behind panels/chart/topbar.
 *
 * - 110 stars: mostly silver, ~15 orange
 * - 12 "hero" stars (r 0.18–0.28) for obvious visibility
 * - gsap.context for cleanup
 * - Respects prefers-reduced-motion
 * - No setInterval, no randomness at runtime
 */

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface Star {
  cx: number;
  cy: number;
  r: number;
  tone: "silver" | "orange";
  group: number;
}

const STARS: Star[] = [
  // Hero stars (larger, obviously visible)
  { cx: 8, cy: 12, r: 0.24, tone: "silver", group: 0 },
  { cx: 22, cy: 6, r: 0.22, tone: "orange", group: 1 },
  { cx: 38, cy: 18, r: 0.26, tone: "silver", group: 2 },
  { cx: 55, cy: 8, r: 0.20, tone: "silver", group: 3 },
  { cx: 72, cy: 15, r: 0.28, tone: "orange", group: 0 },
  { cx: 88, cy: 5, r: 0.22, tone: "silver", group: 1 },
  { cx: 15, cy: 42, r: 0.24, tone: "silver", group: 2 },
  { cx: 45, cy: 35, r: 0.20, tone: "orange", group: 3 },
  { cx: 65, cy: 48, r: 0.26, tone: "silver", group: 0 },
  { cx: 82, cy: 38, r: 0.22, tone: "silver", group: 1 },
  { cx: 30, cy: 72, r: 0.24, tone: "orange", group: 2 },
  { cx: 92, cy: 62, r: 0.20, tone: "silver", group: 3 },
  // Regular stars
  { cx: 3, cy: 4, r: 0.12, tone: "silver", group: 0 },
  { cx: 6, cy: 19, r: 0.10, tone: "silver", group: 1 },
  { cx: 11, cy: 28, r: 0.14, tone: "silver", group: 2 },
  { cx: 14, cy: 8, r: 0.09, tone: "silver", group: 3 },
  { cx: 17, cy: 52, r: 0.11, tone: "silver", group: 0 },
  { cx: 20, cy: 34, r: 0.13, tone: "silver", group: 1 },
  { cx: 24, cy: 62, r: 0.10, tone: "silver", group: 2 },
  { cx: 27, cy: 22, r: 0.15, tone: "orange", group: 3 },
  { cx: 31, cy: 45, r: 0.09, tone: "silver", group: 0 },
  { cx: 34, cy: 14, r: 0.12, tone: "silver", group: 1 },
  { cx: 36, cy: 58, r: 0.11, tone: "silver", group: 2 },
  { cx: 40, cy: 26, r: 0.13, tone: "silver", group: 3 },
  { cx: 42, cy: 70, r: 0.10, tone: "silver", group: 0 },
  { cx: 46, cy: 11, r: 0.14, tone: "silver", group: 1 },
  { cx: 49, cy: 44, r: 0.09, tone: "silver", group: 2 },
  { cx: 52, cy: 30, r: 0.12, tone: "orange", group: 3 },
  { cx: 56, cy: 55, r: 0.11, tone: "silver", group: 0 },
  { cx: 59, cy: 20, r: 0.15, tone: "silver", group: 1 },
  { cx: 62, cy: 68, r: 0.10, tone: "silver", group: 2 },
  { cx: 64, cy: 3, r: 0.13, tone: "silver", group: 3 },
  { cx: 67, cy: 40, r: 0.09, tone: "silver", group: 0 },
  { cx: 70, cy: 25, r: 0.14, tone: "silver", group: 1 },
  { cx: 73, cy: 58, r: 0.11, tone: "silver", group: 2 },
  { cx: 76, cy: 9, r: 0.12, tone: "orange", group: 3 },
  { cx: 79, cy: 45, r: 0.10, tone: "silver", group: 0 },
  { cx: 81, cy: 32, r: 0.13, tone: "silver", group: 1 },
  { cx: 84, cy: 65, r: 0.09, tone: "silver", group: 2 },
  { cx: 87, cy: 18, r: 0.15, tone: "silver", group: 3 },
  { cx: 90, cy: 50, r: 0.11, tone: "silver", group: 0 },
  { cx: 93, cy: 28, r: 0.12, tone: "silver", group: 1 },
  { cx: 96, cy: 72, r: 0.10, tone: "silver", group: 2 },
  { cx: 98, cy: 12, r: 0.14, tone: "orange", group: 3 },
  { cx: 5, cy: 38, r: 0.09, tone: "silver", group: 0 },
  { cx: 9, cy: 65, r: 0.13, tone: "silver", group: 1 },
  { cx: 13, cy: 75, r: 0.11, tone: "silver", group: 2 },
  { cx: 16, cy: 55, r: 0.12, tone: "silver", group: 3 },
  { cx: 19, cy: 82, r: 0.10, tone: "silver", group: 0 },
  { cx: 23, cy: 48, r: 0.14, tone: "silver", group: 1 },
  { cx: 26, cy: 88, r: 0.09, tone: "silver", group: 2 },
  { cx: 29, cy: 15, r: 0.13, tone: "orange", group: 3 },
  { cx: 33, cy: 78, r: 0.11, tone: "silver", group: 0 },
  { cx: 37, cy: 92, r: 0.10, tone: "silver", group: 1 },
  { cx: 41, cy: 62, r: 0.12, tone: "silver", group: 2 },
  { cx: 44, cy: 85, r: 0.09, tone: "silver", group: 3 },
  { cx: 47, cy: 75, r: 0.14, tone: "silver", group: 0 },
  { cx: 50, cy: 90, r: 0.11, tone: "silver", group: 1 },
  { cx: 53, cy: 68, r: 0.13, tone: "orange", group: 2 },
  { cx: 57, cy: 82, r: 0.10, tone: "silver", group: 3 },
  { cx: 60, cy: 95, r: 0.09, tone: "silver", group: 0 },
  { cx: 63, cy: 78, r: 0.12, tone: "silver", group: 1 },
  { cx: 66, cy: 88, r: 0.11, tone: "silver", group: 2 },
  { cx: 69, cy: 55, r: 0.14, tone: "silver", group: 3 },
  { cx: 71, cy: 92, r: 0.10, tone: "silver", group: 0 },
  { cx: 74, cy: 72, r: 0.13, tone: "silver", group: 1 },
  { cx: 77, cy: 85, r: 0.09, tone: "silver", group: 2 },
  { cx: 80, cy: 95, r: 0.12, tone: "orange", group: 3 },
  { cx: 83, cy: 78, r: 0.11, tone: "silver", group: 0 },
  { cx: 86, cy: 42, r: 0.14, tone: "silver", group: 1 },
  { cx: 89, cy: 88, r: 0.10, tone: "silver", group: 2 },
  { cx: 91, cy: 75, r: 0.13, tone: "silver", group: 3 },
  { cx: 94, cy: 55, r: 0.09, tone: "silver", group: 0 },
  { cx: 97, cy: 42, r: 0.12, tone: "silver", group: 1 },
  { cx: 2, cy: 92, r: 0.11, tone: "silver", group: 2 },
  { cx: 7, cy: 48, r: 0.14, tone: "silver", group: 3 },
  { cx: 10, cy: 95, r: 0.10, tone: "silver", group: 0 },
  { cx: 18, cy: 88, r: 0.13, tone: "orange", group: 1 },
  { cx: 25, cy: 32, r: 0.09, tone: "silver", group: 2 },
  { cx: 28, cy: 55, r: 0.12, tone: "silver", group: 3 },
  { cx: 32, cy: 95, r: 0.11, tone: "silver", group: 0 },
  { cx: 35, cy: 82, r: 0.14, tone: "silver", group: 1 },
  { cx: 39, cy: 38, r: 0.10, tone: "silver", group: 2 },
  { cx: 43, cy: 22, r: 0.13, tone: "silver", group: 3 },
  { cx: 48, cy: 58, r: 0.09, tone: "silver", group: 0 },
  { cx: 51, cy: 42, r: 0.12, tone: "orange", group: 1 },
  { cx: 54, cy: 15, r: 0.11, tone: "silver", group: 2 },
  { cx: 58, cy: 72, r: 0.14, tone: "silver", group: 3 },
  { cx: 61, cy: 38, r: 0.10, tone: "silver", group: 0 },
  { cx: 68, cy: 82, r: 0.13, tone: "silver", group: 1 },
  { cx: 75, cy: 42, r: 0.09, tone: "silver", group: 2 },
  { cx: 78, cy: 62, r: 0.12, tone: "silver", group: 3 },
  { cx: 85, cy: 92, r: 0.11, tone: "silver", group: 0 },
  { cx: 88, cy: 72, r: 0.14, tone: "orange", group: 1 },
  { cx: 95, cy: 85, r: 0.10, tone: "silver", group: 2 },
  { cx: 99, cy: 55, r: 0.13, tone: "silver", group: 3 },
  { cx: 4, cy: 72, r: 0.09, tone: "silver", group: 0 },
  { cx: 12, cy: 58, r: 0.12, tone: "silver", group: 1 },
  { cx: 21, cy: 92, r: 0.11, tone: "silver", group: 2 },
  { cx: 46, cy: 95, r: 0.14, tone: "silver", group: 3 },
];

// GSAP animation parameters per group (deterministic, no runtime randomness)
const GROUP_PARAMS = [
  { opacityTo: 1, scaleTo: 1.4, duration: 5.5, delay: 0 },
  { opacityTo: 0.9, scaleTo: 1.3, duration: 7.2, delay: 0.8 },
  { opacityTo: 0.85, scaleTo: 1.25, duration: 9.0, delay: 1.6 },
  { opacityTo: 0.95, scaleTo: 1.35, duration: 11.0, delay: 2.4 },
];

export default function DashboardGsapStarfield() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const stars = svg.querySelectorAll(".dashboard-gsap-star");

      stars.forEach((star, index) => {
        const group = STARS[index]?.group ?? 0;
        const params = GROUP_PARAMS[group];

        gsap.to(star, {
          opacity: params.opacityTo,
          scale: params.scaleTo,
          duration: params.duration + (index % 5) * 0.4,
          delay: params.delay + (index % 7) * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          transformOrigin: "50% 50%",
        });
      });
    }, svg);

    return () => ctx.revert();
  }, []);

  return (
    <div className="dashboard-gsap-starfield-layer" aria-hidden="true">
      <svg
        ref={svgRef}
        className="dashboard-gsap-starfield"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {STARS.map((star, i) => (
          <circle
            key={i}
            className={`dashboard-gsap-star dashboard-gsap-star--${star.tone}`}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
          />
        ))}
      </svg>
    </div>
  );
}
