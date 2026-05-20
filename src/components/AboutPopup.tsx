import { useEffect, useRef, useState } from "react";
import ScrollGraphic from "../assets/source/global/scroll.svg?react";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import "../styles/about-popup.css";

interface AboutPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

function useStageLayout() {
  const [layout, setLayout] = useState(() => compute());
  function compute() {
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    const stageLeft = (window.innerWidth - 1920 * scale) / 2;
    return { scale, stageLeft, stageTop: 0 };
  }
  useEffect(() => {
    const handler = () => setLayout(compute());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return layout;
}

export default function AboutPopup({ isOpen, onClose }: AboutPopupProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const { scale, stageLeft, stageTop } = useStageLayout();

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  if (!isOpen) return null;

  const scrollStyle: React.CSSProperties = {
    position: "fixed",
    left: `${stageLeft + 305 * scale}px`,
    top: `${stageTop + 139 * scale}px`,
    width: `${1294 * scale}px`,
    height: `${803 * scale}px`,
  };

  return (
    <div
      ref={backdropRef}
      className="about-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-popup-title"
      onClick={handleBackdropClick}
    >
      {/* Scroll SVG background at exact stage coordinates */}
      <div
        className={`about-scroll-stage ${prefersReduced ? "about-scroll-reduced" : "about-scroll-reveal"}`}
        style={scrollStyle}
      >
        <div className="about-scroll-frame">
          <ScrollGraphic className="about-scroll-svg" aria-hidden="true" />
        </div>

        {/* Content overlay inside scroll body */}
        <div className="about-parchment">
          <button
            className="about-close-btn"
            onClick={onClose}
            aria-label="Close About"
          >
            &times;
          </button>

          <div className="about-content">
            <span className="about-kicker">ABOUT ELCEO</span>

            <h2 id="about-popup-title" className="about-heading">
              A market reasoning interface for traders who need{" "}
              <span className="about-marker">context before conviction</span>.
            </h2>

            <p className="about-intro">
              ELCEO brings price action,{" "}
              <span className="about-marker">macro pressure</span>, cross-asset
              awareness, and{" "}
              <span className="about-marker">risk context</span> into one visual
              reasoning environment.
            </p>

            <div className="about-body">
              <p>
                Markets rarely move from one signal alone. They move through
                pressure, contradiction, liquidity, timing, and narrative. ELCEO
                is designed to help traders read those layers without drowning in
                scattered information.
              </p>
              <p>
                It does not replace judgment. It sharpens it. The interface is
                built to make{" "}
                <span className="about-marker">market evidence</span> easier to
                interpret, compare, and act on with discipline.
              </p>
            </div>

            <ul className="about-blocks">
              <li>Context before conviction</li>
              <li>Macro pressure made visible</li>
              <li>Cross-asset reasoning in one view</li>
              <li>Risk awareness before execution</li>
            </ul>

            <p className="about-closing">
              ELCEO is built for traders who want fewer blind spots and a clearer
              relationship with{" "}
              <span className="about-marker">market evidence</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
