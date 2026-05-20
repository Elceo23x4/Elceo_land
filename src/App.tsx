import { useState, useCallback } from "react";
import LandingDeck from "./components/LandingDeck";
import ScrollCue from "./components/ScrollCue";
import AboutPopup from "./components/AboutPopup";
import PricingPopup from "./components/PricingPopup";
import FaqPopup from "./components/FaqPopup";
import FloatingElceoFigure from "./components/FloatingElceoFigure";
import GoldCursor3D from "./components/GoldCursor3D";

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
      <LandingDeck
        onAboutClick={handleAboutOpen}
        onPricingClick={handlePricingOpen}
        onFaqClick={handleFaqOpen}
      />
      <FloatingElceoFigure dimmed={anyPopupOpen} />
      <ScrollCue />
      <AboutPopup isOpen={isAboutOpen} onClose={handleAboutClose} />
      <PricingPopup isOpen={isPricingOpen} onClose={handlePricingClose} />
      <FaqPopup isOpen={isFaqOpen} onClose={handleFaqClose} />
      <GoldCursor3D />
    </>
  );
}
