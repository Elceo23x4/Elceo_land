import { useState, useCallback, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "./components/HeroSection";
import SectionTwo from "./components/SectionTwo";
import ScrollCue from "./components/ScrollCue";
import AboutPopup from "./components/AboutPopup";
import PricingPopup from "./components/PricingPopup";
import FaqPopup from "./components/FaqPopup";
import FloatingElceoFigure from "./components/FloatingElceoFigure";
import GoldCursor3D from "./components/GoldCursor3D";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  const heroPanelRef = useRef<HTMLDivElement>(null);
  const heroMotionRef = useRef<HTMLDivElement>(null);

  const handleAboutOpen = useCallback(() => setIsAboutOpen(true), []);
  const handleAboutClose = useCallback(() => setIsAboutOpen(false), []);
  const handlePricingOpen = useCallback(() => setIsPricingOpen(true), []);
  const handlePricingClose = useCallback(() => setIsPricingOpen(false), []);
  const handleFaqOpen = useCallback(() => setIsFaqOpen(true), []);
  const handleFaqClose = useCallback(() => setIsFaqOpen(false), []);

  const anyPopupOpen = isAboutOpen || isPricingOpen || isFaqOpen;

  // GSAP parallax on Hero only
  useLayoutEffect(() => {
    const heroPanel = heroPanelRef.current;
    const heroMotion = heroMotionRef.current;
    if (!heroPanel || !heroMotion) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.set(heroMotion, {
        transformPerspective: 1400,
        transformOrigin: "center bottom",
        scale: 1,
        yPercent: 0,
        rotateX: 0,
        opacity: 1,
        filter: "brightness(1) saturate(1) blur(0px)",
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: heroPanel,
          start: "top top",
          end: "bottom top",
          scrub: 0.9,
          invalidateOnRefresh: true,
        },
      }).to(heroMotion, {
        scale: 0.86,
        yPercent: -10,
        rotateX: 8,
        opacity: 0.42,
        filter: "brightness(0.58) saturate(0.84) blur(0.4px)",
        ease: "none",
      }, 0);
    }, heroPanel);

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div className="landing-page">
        <div className="magazine-hero-panel" ref={heroPanelRef}>
          <div className="magazine-hero-motion" ref={heroMotionRef}>
            <HeroSection
              onAboutClick={handleAboutOpen}
              onPricingClick={handlePricingOpen}
              onFaqClick={handleFaqOpen}
            />
          </div>
        </div>
        <SectionTwo />
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
