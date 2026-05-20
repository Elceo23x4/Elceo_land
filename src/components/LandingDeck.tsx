import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "./HeroSection";
import SectionTwo from "./SectionTwo";

gsap.registerPlugin(ScrollTrigger);

interface LandingDeckProps {
  onAboutClick: () => void;
  onPricingClick: () => void;
  onFaqClick: () => void;
}

export default function LandingDeck({ onAboutClick, onPricingClick, onFaqClick }: LandingDeckProps) {
  const deckRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const s2Ref = useRef<HTMLDivElement>(null);
  const edgeRef = useRef<HTMLDivElement>(null);
  const [reduced] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reduced) return;
    const deck = deckRef.current;
    const hero = heroRef.current;
    const s2 = s2Ref.current;
    const edge = edgeRef.current;
    if (!deck || !hero || !s2 || !edge) return;

    const ctx = gsap.context(() => {
      // Initial state: Section 2 slightly recessed underneath
      gsap.set(s2, { scale: 1.04, yPercent: 2, filter: "brightness(0.74) saturate(0.88)" });
      gsap.set(edge, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: deck,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Hero sheet recedes/flips upward
      tl.to(hero, {
        rotateX: -68,
        yPercent: -16,
        z: -200,
        scale: 0.88,
        opacity: 0.02,
        filter: "brightness(0.4) blur(1px)",
        ease: "none",
      }, 0);

      // Section 2 settles into full view
      tl.to(s2, {
        scale: 1,
        yPercent: 0,
        filter: "brightness(1) saturate(1)",
        ease: "none",
      }, 0);

      // Paper edge shadow grows during flip
      tl.fromTo(edge, { opacity: 0 }, { opacity: 1, ease: "none" }, 0);
      tl.to(edge, { opacity: 0, ease: "none" }, 0.7);
    }, deck);

    return () => ctx.revert();
  }, [reduced]);

  // Reduced motion: simple stacked flow
  if (reduced) {
    return (
      <div className="landing-page">
        <HeroSection onAboutClick={onAboutClick} onPricingClick={onPricingClick} onFaqClick={onFaqClick} />
        <SectionTwo />
      </div>
    );
  }

  return (
    <div className="landing-deck" ref={deckRef}>
      <div className="landing-deck-viewport">
        {/* Section 2 underneath */}
        <div className="deck-layer deck-section-two-under" ref={s2Ref}>
          <SectionTwo />
        </div>

        {/* Hero sheet on top */}
        <div className="deck-layer deck-hero-sheet" ref={heroRef}>
          <HeroSection onAboutClick={onAboutClick} onPricingClick={onPricingClick} onFaqClick={onFaqClick} />
        </div>

        {/* Paper edge shadow */}
        <div className="deck-page-edge" ref={edgeRef} aria-hidden="true" />
      </div>
    </div>
  );
}
