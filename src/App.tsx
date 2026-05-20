import { useState, useCallback } from "react";
import HeroSection from "./components/HeroSection";
import AboutPopup from "./components/AboutPopup";
import PricingPopup from "./components/PricingPopup";
import FloatingElceoFigure from "./components/FloatingElceoFigure";

export default function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  const handleAboutOpen = useCallback(() => setIsAboutOpen(true), []);
  const handleAboutClose = useCallback(() => setIsAboutOpen(false), []);
  const handlePricingOpen = useCallback(() => setIsPricingOpen(true), []);
  const handlePricingClose = useCallback(() => setIsPricingOpen(false), []);

  const anyPopupOpen = isAboutOpen || isPricingOpen;

  return (
    <>
      <HeroSection onAboutClick={handleAboutOpen} onPricingClick={handlePricingOpen} />
      <FloatingElceoFigure dimmed={anyPopupOpen} />
      <AboutPopup isOpen={isAboutOpen} onClose={handleAboutClose} />
      <PricingPopup isOpen={isPricingOpen} onClose={handlePricingClose} />
    </>
  );
}
