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

  // Background: scroll.svg 1586×836, left 173, top 157
  const bgLeft = 173;
  const bgTop = 157;
  const bgWidth = 1586;
  const bgHeight = 836;

  // Content: 820×587, left 561, top 287
  const contentLeft = 561;
  const contentTop = 287;
  const contentWidth = 820;
  const contentHeight = 587;

  // Close: top-right of background
  const closeLeft = bgLeft + bgWidth - 64 - 24; // 1671
  const closeTop = bgTop + 18; // 175

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

      {/* Close button */}
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

      {/* Content — no background */}
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
        <span className="popup-kicker">ABOUT ELCEO</span>

        <h2 id="about-popup-title" className="popup-heading">
          A market reasoning interface for traders who need{" "}
          <span className="popup-marker-orange">context before conviction</span>.
        </h2>

        <div className="popup-body">
          <p>
            ELCEO brings price action,{" "}
            <span className="popup-marker-red">macro pressure</span>, cross-asset
            awareness, and{" "}
            <span className="popup-marker-orange">risk context</span> into one visual
            reasoning environment.
          </p>
          <p>
            It does not replace judgment. It sharpens it. The interface is
            built to make{" "}
            <span className="popup-marker-red">market evidence</span> easier to
            interpret, compare, and act on with discipline.
          </p>
        </div>

        <ul className="about-blocks">
          <li>Context before conviction</li>
          <li>Macro pressure made visible</li>
          <li>Cross-asset reasoning in one view</li>
          <li>Risk awareness before execution</li>
        </ul>
      </div>
    </div>
  );
}
