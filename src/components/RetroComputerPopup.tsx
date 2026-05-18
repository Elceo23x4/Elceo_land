import { useEffect, useRef } from "react";
import "../styles/hero.css";

interface RetroComputerPopupProps {
  onClose: () => void;
}

export default function RetroComputerPopup({ onClose }: RetroComputerPopupProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      className="retro-popup-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div className="retro-popup-terminal">
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
