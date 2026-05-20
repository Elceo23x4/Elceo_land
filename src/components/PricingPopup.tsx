import { useEffect, useRef, useState } from "react";
import PricingBg from "../assets/source/global/pricing_bg.svg?react";
import OfferBadge from "../assets/source/global/offer.svg?react";
import "../styles/about-popup.css";

interface PricingPopupProps {
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

export default function PricingPopup({ isOpen, onClose }: PricingPopupProps) {
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
    left: `${stageLeft + 527 * scale}px`,
    top: `${stageTop + 126 * scale}px`,
    width: `${854 * scale}px`,
    height: `${837 * scale}px`,
    pointerEvents: "none",
    zIndex: 1,
  };

  const offerStyle: React.CSSProperties = {
    position: "fixed",
    left: `${stageLeft + 829 * scale}px`,
    top: `${stageTop + 212 * scale}px`,
    width: `${201 * scale}px`,
    height: `${150 * scale}px`,
    pointerEvents: "none",
    zIndex: 2,
  };

  return (
    <div
      ref={backdropRef}
      className="about-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pricing-popup-title"
      onClick={handleBackdropClick}
    >
      {/* Background SVG */}
      <div style={bgStyle}>
        <PricingBg style={{ width: "100%", height: "100%" }} aria-hidden="true" />
      </div>

      {/* Offer badge */}
      <div style={offerStyle}>
        <OfferBadge style={{ width: "100%", height: "100%" }} aria-hidden="true" />
      </div>

      {/* Placeholder content */}
      <div
        style={{
          position: "fixed",
          left: `${stageLeft + 580 * scale}px`,
          top: `${stageTop + 300 * scale}px`,
          width: `${740 * scale}px`,
          height: `${600 * scale}px`,
          zIndex: 3,
          textAlign: "center",
          pointerEvents: "auto",
        }}
      >
        <button
          className="popup-close-btn"
          onClick={onClose}
          aria-label="Close Pricing"
          type="button"
        >
          &times;
        </button>
        <h2
          id="pricing-popup-title"
          style={{
            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            fontSize: `${Math.max(18, 28 * scale)}px`,
            color: "rgba(30, 15, 5, 0.92)",
            marginBottom: "16px",
            marginTop: "32px",
          }}
        >
          Pricing
        </h2>
        <p
          style={{
            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            fontSize: `${Math.max(12, 16 * scale)}px`,
            color: "rgba(50, 30, 10, 0.7)",
          }}
        >
          Pricing details coming soon.
        </p>
      </div>
    </div>
  );
}
