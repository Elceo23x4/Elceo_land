import { useEffect, useRef, useState } from "react";
import RetroBg from "../assets/source/global/retro_bg.svg?react";
import "../styles/hero.css";

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

  const bgStyle: React.CSSProperties = {
    position: "fixed",
    left: `${stageLeft + 287 * scale}px`,
    top: `${stageTop + 147 * scale}px`,
    width: `${1320 * scale}px`,
    height: `${830 * scale}px`,
    pointerEvents: "none",
    zIndex: 1,
  };

  const contentStyle: React.CSSProperties = {
    position: "fixed",
    left: `${stageLeft + 309 * scale}px`,
    top: `${stageTop + 182 * scale}px`,
    width: `${868 * scale}px`,
    height: `${578 * scale}px`,
    zIndex: 2,
    overflow: "hidden",
    padding: "32px 28px",
  };

  return (
    <div
      className="retro-popup-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      {/* Background SVG */}
      <div style={bgStyle}>
        <RetroBg style={{ width: "100%", height: "100%" }} aria-hidden="true" />
      </div>

      {/* Content area */}
      <div style={contentStyle}>
        <div className="retro-popup-scanlines" aria-hidden="true" />
        <button className="retro-popup-close" onClick={onClose} aria-label="Close">
          [X]
        </button>
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
