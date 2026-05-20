import { useEffect, useRef, useState } from "react";
import FaqBg from "../assets/source/global/faq_bg.svg?react";
import "../styles/about-popup.css";

interface FaqPopupProps {
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

export default function FaqPopup({ isOpen, onClose }: FaqPopupProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
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

  // Background: faq_bg.svg 1389×890, left 266, top 190
  const bgLeft = 266;
  const bgTop = 190;
  const bgWidth = 1389;
  const bgHeight = 890;

  // Content: 1167×593, left 368, top 216
  const contentLeft = 368;
  const contentTop = 216;
  const contentWidth = 1167;
  const contentHeight = 593;

  // Close: top-right of background
  const closeLeft = bgLeft + bgWidth - 64 - 24; // 1567
  const closeTop = bgTop + 18; // 208

  return (
    <div
      ref={backdropRef}
      className="about-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="faq-popup-title"
      onClick={handleBackdropClick}
    >
      {/* Background SVG */}
      <div
        style={{
          position: "fixed",
          left: `${stageLeft + bgLeft * scale}px`,
          top: `${stageTop + bgTop * scale}px`,
          width: `${bgWidth * scale}px`,
          height: `${bgHeight * scale}px`,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <FaqBg style={{ width: "100%", height: "100%" }} aria-hidden="true" />
      </div>

      {/* Close button */}
      <button
        className="popup-close-btn"
        onClick={onClose}
        aria-label="Close FAQ"
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

      {/* Content area */}
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
          padding: "clamp(24px, 2.4vw, 44px) clamp(30px, 3vw, 56px)",
        }}
      >
        <h2 id="faq-popup-title" className="popup-heading">
          Frequently Asked <span className="popup-marker-red">Questions</span>
        </h2>
        <div className="popup-body">
          <p>FAQ content coming soon.</p>
        </div>
      </div>
    </div>
  );
}
