import { useEffect, useRef, useState } from "react";
import RetroBg from "../assets/source/global/retro_bg.svg?react";
import "../styles/hero.css";
import "../styles/about-popup.css";

interface RetroComputerPopupProps {
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

export default function RetroComputerPopup({ onClose }: RetroComputerPopupProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { scale, stageLeft, stageTop } = useStageLayout();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose();
  }

  // Background: retro_bg.svg 1320×830, left 287, top 147
  const bgLeft = 287;
  const bgTop = 147;
  const bgWidth = 1320;
  const bgHeight = 830;

  // Content area: 868×578, left 309, top 182
  const contentLeft = 309;
  const contentTop = 182;
  const contentWidth = 868;
  const contentHeight = 578;

  // Close button: top-right of background
  const closeLeft = bgLeft + bgWidth - 64 - 24; // 1519
  const closeTop = bgTop + 18; // 165

  return (
    <div
      className="retro-popup-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
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
        <RetroBg style={{ width: "100%", height: "100%" }} aria-hidden="true" />
      </div>

      {/* Close button at top-right of background */}
      <button
        className="popup-close-btn"
        onClick={onClose}
        aria-label="Close Retro"
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
        style={{
          position: "fixed",
          left: `${stageLeft + contentLeft * scale}px`,
          top: `${stageTop + contentTop * scale}px`,
          width: `${contentWidth * scale}px`,
          height: `${contentHeight * scale}px`,
          zIndex: 2,
          overflow: "hidden",
          padding: `${24 * scale}px`,
        }}
      >
        <div className="retro-popup-scanlines" aria-hidden="true" />
        <div className="retro-popup-content">
          <p className="retro-line retro-title">ELCEO MARKET REASONING OS</p>
          <p className="retro-line">BOOTING CONTEXT ENGINE...</p>
          <p className="retro-line">LOADING MACRO PRESSURE...</p>
          <p className="retro-line">SCANNING LIQUIDITY MAP...</p>
          <p className="retro-line">RISK MODEL ONLINE</p>
          <p className="retro-line retro-ready">SESSION READY</p>
        </div>
      </div>
    </div>
  );
}
