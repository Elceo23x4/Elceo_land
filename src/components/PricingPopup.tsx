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

  // Close button: top-right of background
  const closeLeft = bgLeft + bgWidth - 64 - 24; // 1293
  const closeTop = bgTop + 18; // 144

  const fs = (base: number) => `${Math.max(10, base * scale)}px`;

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

      {/* Close button at top-right of background */}
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
          color: "rgba(30, 15, 5, 0.92)",
          padding: `${16 * scale}px`,
        }}
      >
        <h2
          id="pricing-popup-title"
          style={{ fontSize: fs(22), fontWeight: 700, marginBottom: `${8 * scale}px`, letterSpacing: "-0.01em" }}
        >
          Choose your reasoning layer
        </h2>
        <p style={{ fontSize: fs(13), color: "rgba(50, 30, 10, 0.72)", marginBottom: `${18 * scale}px`, lineHeight: 1.5 }}>
          Start with market context. Upgrade when you need deeper focus, cleaner evidence, and stronger decision discipline.
        </p>

        {/* Plan comparison table */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: fs(12),
            lineHeight: 1.4,
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid rgba(180, 80, 10, 0.2)" }}>
              <th style={{ textAlign: "left", padding: `${6 * scale}px ${4 * scale}px`, fontWeight: 600, color: "rgba(30, 15, 5, 0.6)" }}>Feature</th>
              <th style={{ textAlign: "center", padding: `${6 * scale}px ${4 * scale}px`, fontWeight: 700 }}>Free</th>
              <th style={{ textAlign: "center", padding: `${6 * scale}px ${4 * scale}px`, fontWeight: 700, color: "#e02020" }}>Focus</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Market overview", "Included", "Included"],
              ["Core watchlist", "Limited", "Expanded"],
              ["Macro context", "Basic", "Deeper context"],
              ["Evidence stack", "Preview", "Full access"],
              ["Risk notes", "Limited", "Focus view"],
              ["Alerts", "—", "Included"],
              ["Workspace tools", "Starter", "Full focus tools"],
            ].map(([feature, free, focus], i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(180, 80, 10, 0.1)" }}>
                <td style={{ padding: `${6 * scale}px ${4 * scale}px`, color: "rgba(30, 15, 5, 0.82)" }}>{feature}</td>
                <td style={{ textAlign: "center", padding: `${6 * scale}px ${4 * scale}px`, color: "rgba(50, 30, 10, 0.65)" }}>{free}</td>
                <td style={{ textAlign: "center", padding: `${6 * scale}px ${4 * scale}px`, color: "rgba(30, 15, 5, 0.88)", fontWeight: 500 }}>{focus}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* CTA buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: `${20 * scale}px`, marginTop: `${20 * scale}px` }}>
          <button
            type="button"
            style={{
              padding: `${8 * scale}px ${22 * scale}px`,
              border: "1px solid rgba(30, 15, 5, 0.3)",
              borderRadius: "4px",
              background: "transparent",
              color: "rgba(30, 15, 5, 0.8)",
              fontSize: fs(12),
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Start Free
          </button>
          <button
            type="button"
            style={{
              padding: `${8 * scale}px ${22 * scale}px`,
              border: "none",
              borderRadius: "4px",
              background: "#e02020",
              color: "#fff",
              fontSize: fs(12),
              fontWeight: 700,
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
