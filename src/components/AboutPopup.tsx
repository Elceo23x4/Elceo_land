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

  // Background: scroll.svg at 1294×803, left 305, top 139
  const bgLeft = 305;
  const bgTop = 139;
  const bgWidth = 1294;
  const bgHeight = 803;

  // Content: 650×592, left 635, top 247
  const contentLeft = 635;
  const contentTop = 247;
  const contentWidth = 650;
  const contentHeight = 592;

  // Close button: top-right of background
  const closeLeft = bgLeft + bgWidth - 64 - 24; // 1511
  const closeTop = bgTop + 18; // 157

  return (
    <div
      ref={backdropRef}
      className="about-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-popup-title"
      onClick={handleBackdropClick}
    >
      {/* Scroll SVG background */}
      <div
        className={`about-scroll-stage ${prefersReduced ? "about-scroll-reduced" : "about-scroll-reveal"}`}
        style={{
          position: "fixed",
          left: `${stageLeft + bgLeft * scale}px`,
          top: `${stageTop + bgTop * scale}px`,
          width: `${bgWidth * scale}px`,
          height: `${bgHeight * scale}px`,
        }}
      >
        <div className="about-scroll-frame">
          <ScrollGraphic className="about-scroll-svg" aria-hidden="true" />
        </div>
      </div>

      {/* Close button at top-right of background */}
      <button
        className="popup-close-btn"
        onClick={onClose}
        aria-label="Close About"
        type="button"
        style={{
          position: "fixed",
          left: `${stageLeft + closeLeft * scale}px`,
          top: `${stageTop + closeTop * scale}px`,
          zIndex: 10,
        }}
      >
        &times;
      </button>

      {/* Content area — no background */}
      <div
        className="about-content-area"
        style={{
          position: "fixed",
          left: `${stageLeft + contentLeft * scale}px`,
          top: `${stageTop + contentTop * scale}px`,
          width: `${contentWidth * scale}px`,
          height: `${contentHeight * scale}px`,
          zIndex: 2,
          overflow: "auto",
        }}
      >
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
  );
}
