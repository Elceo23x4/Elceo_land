import { useState, useCallback } from "react";
import HeroSection from "./components/HeroSection";
import AboutPopup from "./components/AboutPopup";
import FloatingElceoFigure from "./components/FloatingElceoFigure";

export default function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const handleAboutOpen = useCallback(() => setIsAboutOpen(true), []);
  const handleAboutClose = useCallback(() => setIsAboutOpen(false), []);

  return (
    <>
      <HeroSection onAboutClick={handleAboutOpen} />
      <FloatingElceoFigure dimmed={isAboutOpen} />
      <AboutPopup isOpen={isAboutOpen} onClose={handleAboutClose} />
    </>
  );
}
