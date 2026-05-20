import { useState, useCallback, useEffect, useRef } from "react";
import HeroSection from "./components/HeroSection";
import SectionTwo from "./components/SectionTwo";
import ScrollCue from "./components/ScrollCue";
import AboutPopup from "./components/AboutPopup";
import PricingPopup from "./components/PricingPopup";
import FaqPopup from "./components/FaqPopup";
import FloatingElceoFigure from "./components/FloatingElceoFigure";
import GoldCursor3D from "./components/GoldCursor3D";

// ── Sketchboard sheet observer hook ──────────────────────────────────────────
function useSheetObserver(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sheets = el.querySelectorAll(".landing-sheet");
    if (!sheets.length) return;

    // Check reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      sheets.forEach((s) => s.classList.add("sheet-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("sheet-entering");
            entry.target.classList.add("sheet-visible");
          } else {
            entry.target.classList.remove("sheet-visible");
            entry.target.classList.add("sheet-entering");
          }
        });
      },
      { threshold: 0.15 }
    );

    sheets.forEach((s) => {
      s.classList.add("sheet-entering");
      observer.observe(s);
    });

    // Mark first sheet visible immediately
    if (sheets[0]) {
      sheets[0].classList.remove("sheet-entering");
      sheets[0].classList.add("sheet-visible");
    }

    return () => observer.disconnect();
  }, [ref]);
}

export default function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const landingRef = useRef<HTMLDivElement>(null);

  useSheetObserver(landingRef);

  const handleAboutOpen = useCallback(() => setIsAboutOpen(true), []);
  const handleAboutClose = useCallback(() => setIsAboutOpen(false), []);
  const handlePricingOpen = useCallback(() => setIsPricingOpen(true), []);
  const handlePricingClose = useCallback(() => setIsPricingOpen(false), []);
  const handleFaqOpen = useCallback(() => setIsFaqOpen(true), []);
  const handleFaqClose = useCallback(() => setIsFaqOpen(false), []);

  const anyPopupOpen = isAboutOpen || isPricingOpen || isFaqOpen;

  return (
    <>
      <div className="landing-page" ref={landingRef}>
        <div className="landing-sheet">
          <HeroSection
            onAboutClick={handleAboutOpen}
            onPricingClick={handlePricingOpen}
            onFaqClick={handleFaqOpen}
          />
        </div>
        <div className="landing-sheet">
          <SectionTwo />
        </div>
      </div>
      <FloatingElceoFigure dimmed={anyPopupOpen} />
      <ScrollCue />
      <AboutPopup isOpen={isAboutOpen} onClose={handleAboutClose} />
      <PricingPopup isOpen={isPricingOpen} onClose={handlePricingClose} />
      <FaqPopup isOpen={isFaqOpen} onClose={handleFaqClose} />
      <GoldCursor3D />
    </>
  );
}
