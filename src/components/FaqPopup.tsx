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

  const bgStyle: React.CSSProperties = {
    position: "fixed",
    left: `${stageLeft + 266 * scale}px`,
    top: `${stageTop + 190 * scale}px`,
    width: `${1389 * scale}px`,
    height: `${890 * scale}px`,
    pointerEvents: "none",
    zIndex: 1,
  };

  const contentStyle: React.CSSProperties = {
    position: "fixed",
    left: `${stageLeft + 307 * scale}px`,
    top: `${stageTop + 216 * scale}px`,
    width: `${1313 * scale}px`,
    height: `${593 * scale}px`,
    zIndex: 2,
    overflow: "auto",
  };

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
      <div style={bgStyle}>
        <FaqBg style={{ width: "100%", height: "100%" }} aria-hidden="true" />
      </div>

      {/* Content area */}
      <div style={contentStyle} className="about-content-area">
        <button
          className="popup-close-btn"
          onClick={onClose}
          aria-label="Close FAQ"
          type="button"
        >
          &times;
        </button>

        <div className="about-content">
          <h2
            id="faq-popup-title"
            style={{
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
              fontSize: `${Math.max(18, 28 * scale)}px`,
              fontWeight: 700,
              color: "rgba(30, 15, 5, 0.95)",
              marginBottom: "16px",
            }}
          >
            Frequently Asked Questions
          </h2>
          <p
            style={{
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
              fontSize: `${Math.max(12, 15 * scale)}px`,
              color: "rgba(50, 30, 10, 0.7)",
            }}
          >
            FAQ content coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}
