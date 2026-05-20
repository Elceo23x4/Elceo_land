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

  // Background: pricing_bg.svg 854×837, left 527, top 126
  const bgLeft = 527;
  const bgTop = 126;
  const bgWidth = 854;
  const bgHeight = 837;

  // Offer badge: 201×150, left 829, top 212
  const offerLeft = 829;
  const offerTop = 212;
  const offerWidth = 201;
  const offerHeight = 150;

  // Content card: 660×455, left 625, top 382
  const cardLeft = 625;
  const cardTop = 382;
  const cardWidth = 660;
  const cardHeight = 455;

  // Close: top-right of background
  const closeLeft = bgLeft + bgWidth - 64 - 24; // 1293
  const closeTop = bgTop + 18; // 144

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
        <PricingBg style={{ width: "100%", height: "100%" }} aria-hidden="true" />
      </div>

      {/* Offer badge */}
      <div
        style={{
          position: "fixed",
          left: `${stageLeft + offerLeft * scale}px`,
          top: `${stageTop + offerTop * scale}px`,
          width: `${offerWidth * scale}px`,
          height: `${offerHeight * scale}px`,
          pointerEvents: "none",
          zIndex: 3,
        }}
      >
        <OfferBadge style={{ width: "100%", height: "100%" }} aria-hidden="true" />
      </div>

      {/* Close button */}
      <button
        className="popup-close-btn"
        onClick={onClose}
        aria-label="Close Pricing"
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

      {/* Pricing content card */}
      <div
        style={{
          position: "fixed",
          left: `${stageLeft + cardLeft * scale}px`,
          top: `${stageTop + cardTop * scale}px`,
          width: `${cardWidth * scale}px`,
          height: `${cardHeight * scale}px`,
          zIndex: 2,
          overflow: "auto",
          fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
          color: "#ffffff",
        }}
      >
        <h2
          id="pricing-popup-title"
          style={{ fontSize: "68px", fontWeight: 900, marginBottom: "12px", lineHeight: 0.95, color: "#ffffff" }}
        >
          Choose your <span className="popup-marker-orange">reasoning layer</span>
        </h2>
        <p style={{ fontSize: "32px", fontWeight: 700, color: "rgba(255,255,255,0.75)", marginBottom: "20px", lineHeight: 1.1 }}>
          Start with market context. Upgrade when you need deeper{" "}
          <span className="popup-marker-red">focus</span> and stronger decision discipline.
        </p>

        {/* Plan comparison table */}
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "30px", fontWeight: 700, lineHeight: 1.2, color: "#ffffff" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.2)" }}>
              <th style={{ textAlign: "left", padding: "8px 6px", fontWeight: 800, color: "rgba(255,255,255,0.6)" }}>Feature</th>
              <th style={{ textAlign: "center", padding: "8px 6px", fontWeight: 900 }}>Free</th>
              <th style={{ textAlign: "center", padding: "8px 6px", fontWeight: 900, color: "#e02020" }}>Focus</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Market overview", "Included", "Included"],
              ["Core watchlist", "Limited", "Expanded"],
              ["Macro context", "Basic", "Deeper"],
              ["Evidence stack", "Preview", "Full access"],
              ["Risk notes", "Limited", "Focus view"],
              ["Alerts", "—", "Included"],
              ["Workspace tools", "Starter", "Full tools"],
            ].map(([feature, free, focus], i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <td style={{ padding: "7px 6px" }}>{feature}</td>
                <td style={{ textAlign: "center", padding: "7px 6px", color: "rgba(255,255,255,0.6)" }}>{free}</td>
                <td style={{ textAlign: "center", padding: "7px 6px", fontWeight: 800 }}>{focus}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* CTA buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "20px" }}>
          <button
            type="button"
            style={{
              padding: "10px 28px",
              border: "2px solid rgba(255,255,255,0.4)",
              borderRadius: "6px",
              background: "transparent",
              color: "#ffffff",
              fontSize: "28px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Start Free
          </button>
          <button
            type="button"
            style={{
              padding: "10px 28px",
              border: "none",
              borderRadius: "6px",
              background: "#e02020",
              color: "#ffffff",
              fontSize: "28px",
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            Enter Focus
          </button>
        </div>
      </div>
    </div>
  );
}
