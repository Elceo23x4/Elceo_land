import { useState, useCallback, useEffect, useRef } from "react";
import HeroSection from "./components/HeroSection";
import SectionTwo from "./components/SectionTwo";
import ScrollCue from "./components/ScrollCue";
import AboutPopup from "./components/AboutPopup";
import PricingPopup from "./components/PricingPopup";
import FaqPopup from "./components/FaqPopup";
import FloatingElceoFigure from "./components/FloatingElceoFigure";
import GoldCursor3D from "./components/GoldCursor3D";

// ── Hero flip sheet overlay ──────────────────────────────────────────────────
function HeroFlipSheet() {
  const [flipClass, setFlipClass] = useState("");
  const lastSection = useRef(0);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleScroll = () => {
      if (prefersReduced.current) return;
      const scrollY = window.scrollY;
      const viewH = window.innerHeight;
      const currentSection = scrollY > viewH * 0.35 ? 1 : 0;

      if (currentSection !== lastSection.current) {
        if (currentSection === 1 && lastSection.current === 0) {
          setFlipClass("flip-up");
          setTimeout(() => setFlipClass(""), 950);
        } else if (currentSection === 0 && lastSection.current === 1) {
          setFlipClass("flip-down");
          setTimeout(() => setFlipClass(""), 950);
        }
        lastSection.current = currentSection;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!flipClass) return null;

  return <div className={`hero-flip-sheet ${flipClass}`} aria-hidden="true" />;
}

export default function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  const handleAboutOpen = useCallback(() => setIsAboutOpen(true), []);
  const handleAboutClose = useCallback(() => setIsAboutOpen(false), []);
  const handlePricingOpen = useCallback(() => setIsPricingOpen(true), []);
  const handlePricingClose = useCallback(() => setIsPricingOpen(false), []);
  const handleFaqOpen = useCallback(() => setIsFaqOpen(true), []);
  const handleFaqClose = useCallback(() => setIsFaqOpen(false), []);

  const anyPopupOpen = isAboutOpen || isPricingOpen || isFaqOpen;

  return (
    <>
      <div className="landing-page">
        <HeroSection
          onAboutClick={handleAboutOpen}
          onPricingClick={handlePricingOpen}
          onFaqClick={handleFaqOpen}
        />
        <SectionTwo />
      </div>
      <HeroFlipSheet />
      <FloatingElceoFigure dimmed={anyPopupOpen} />
      <ScrollCue />
      <AboutPopup isOpen={isAboutOpen} onClose={handleAboutClose} />
      <PricingPopup isOpen={isPricingOpen} onClose={handlePricingClose} />
      <FaqPopup isOpen={isFaqOpen} onClose={handleFaqClose} />
      <GoldCursor3D />
    </>
  );
}
