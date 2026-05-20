import { useLayoutEffect, useRef, useState } from "react";
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

  useLayoutEffect(() => {
    if (reduced) return;
    const deck = deckRef.current;
    const hero = heroRef.current;
    const s2 = s2Ref.current;
    const edge = edgeRef.current;
    if (!deck || !hero || !s2 || !edge) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(hero, {
        transformPerspective: 1600,
        rotateX: 0,
        yPercent: 0,
        z: 0,
        scale: 1,
        opacity: 1,
        filter: "brightness(1) blur(0px)",
      });

      gsap.set(s2, {
        scale: 1.035,
        yPercent: 1.5,
        opacity: 1,
        filter: "brightness(0.72) saturate(0.9)",
      });

      gsap.set(edge, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: deck,
          start: "top top",
          end: "+=100%",
          scrub: 0.75,
          invalidateOnRefresh: true,
        },
      });

      // Hero recedes/flips upward
      tl.to(hero, {
        rotateX: -62,
        yPercent: -14,
        z: -180,
        scale: 0.88,
        opacity: 0,
        filter: "brightness(0.42) blur(0.8px)",
        ease: "none",
      }, 0);

      // Section 2 settles into full view
      tl.to(s2, {
        scale: 1,
        yPercent: 0,
        opacity: 1,
        filter: "brightness(1) saturate(1)",
        ease: "none",
      }, 0);

      // Paper edge shadow appears mid-transition
      tl.fromTo(edge, { opacity: 0 }, { opacity: 0.8, ease: "none", duration: 0.5 }, 0);
      tl.to(edge, { opacity: 0, ease: "none", duration: 0.5 }, 0.5);
    }, deck);

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
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
