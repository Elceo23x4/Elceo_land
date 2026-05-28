/**
 * useGsapStarTwinkle.ts
 *
 * GSAP-driven star twinkle animation hook.
 * Targets actual SVG star elements inside the night sky container,
 * plus fallback overlay spans from DashboardTwinkleStarLayer.
 *
 * - Uses gsap.context for cleanup.
 * - Respects prefers-reduced-motion.
 * - No setInterval, no random runtime values.
 * - Deterministic animation parameters derived from element index.
 */

import { useEffect, type RefObject } from "react";
import gsap from "gsap";

const OPACITY_TARGETS = [0.35, 0.55, 0.75, 1, 0.6, 0.8, 0.45, 0.9];
const SCALE_TARGETS = [1.12, 1.24, 1.08, 1.18, 1.14, 1.22, 1.1, 1.2];
const DURATION_TARGETS = [5.5, 7.2, 8.8, 10.5, 12, 6.4, 9.2, 11];
const DELAY_TARGETS = [0, 0.6, 1.2, 1.8, 2.4, 3.0, 0.3, 1.5];

function wrap<T>(arr: T[], index: number): T {
  return arr[index % arr.length];
}

/**
 * Animates SVG star candidates inside skyRef with GSAP yoyo tweens.
 * Also animates fallback twinkle spans inside twinkleRef if provided.
 */
export function useGsapStarTwinkle(
  skyRef: RefObject<HTMLDivElement | null>,
  twinkleRef?: RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const skyRoot = skyRef.current;
    if (!skyRoot) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // ─── Target actual SVG star elements ───
      const allCandidates = Array.from(
        skyRoot.querySelectorAll(
          "svg circle, svg ellipse, svg use, svg path, svg [id*='star'], svg [class*='star']"
        )
      ) as SVGElement[];

      // Filter to small elements (likely stars, not background fills)
      const starCandidates = allCandidates.filter((el) => {
        try {
          if ("getBBox" in el && typeof (el as SVGGraphicsElement).getBBox === "function") {
            const bbox = (el as SVGGraphicsElement).getBBox();
            return bbox.width <= 24 && bbox.height <= 24 && bbox.width > 0;
          }
        } catch {
          // getBBox can throw if element is not rendered
        }
        // Keep circles, ellipses, and use elements as fallback
        const tag = el.tagName.toLowerCase();
        return tag === "circle" || tag === "ellipse" || tag === "use";
      });

      // Animate SVG star candidates
      starCandidates.forEach((el, index) => {
        gsap.to(el, {
          opacity: wrap(OPACITY_TARGETS, index),
          scale: wrap(SCALE_TARGETS, index),
          duration: wrap(DURATION_TARGETS, index),
          delay: wrap(DELAY_TARGETS, index),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          transformOrigin: "50% 50%",
        });
      });

      // ─── Animate fallback twinkle overlay spans ───
      const twinkleRoot = twinkleRef?.current;
      if (twinkleRoot) {
        const spans = Array.from(
          twinkleRoot.querySelectorAll(".dashboard-twinkle-star")
        ) as HTMLElement[];

        spans.forEach((span, index) => {
          gsap.to(span, {
            opacity: wrap(OPACITY_TARGETS, index + 3),
            scale: wrap(SCALE_TARGETS, index + 2),
            duration: wrap(DURATION_TARGETS, index + 1),
            delay: wrap(DELAY_TARGETS, index),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            transformOrigin: "50% 50%",
          });
        });
      }
    }, skyRoot);

    return () => ctx.revert();
  }, [skyRef, twinkleRef]);
}
