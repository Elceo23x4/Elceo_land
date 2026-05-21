import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "../styles/page-preloader.css";

export default function PagePreloader() {
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const centerShadowRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const candlesRef = useRef<SVGSVGElement>(null);
  const redCandleRef = useRef<SVGGElement>(null);
  const greenCandleRef = useRef<SVGGElement>(null);
  const redTopRef = useRef<SVGGElement>(null);
  const redBottomRef = useRef<SVGGElement>(null);
  const greenTopRef = useRef<SVGGElement>(null);
  const greenBottomRef = useRef<SVGGElement>(null);
  const scratchRef = useRef<SVGGElement>(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (prefersReduced) {
      gsap.to(overlay, { opacity: 0, duration: 0.4, delay: 0.2, onComplete: () => setDone(true) });
      return;
    }

    const leftCurtain = leftCurtainRef.current;
    const rightCurtain = rightCurtainRef.current;
    const centerShadow = centerShadowRef.current;
    const emblem = emblemRef.current;
    const candles = candlesRef.current;
    const redCandle = redCandleRef.current;
    const greenCandle = greenCandleRef.current;
    const redTop = redTopRef.current;
    const redBottom = redBottomRef.current;
    const greenTop = greenTopRef.current;
    const greenBottom = greenBottomRef.current;
    const scratch = scratchRef.current;

    if (!leftCurtain || !rightCurtain || !centerShadow || !emblem || !candles || !redCandle || !greenCandle || !redTop || !redBottom || !greenTop || !greenBottom || !scratch) return;

    gsap.set([redTop, redBottom, greenTop, greenBottom], { opacity: 0 });
    gsap.set(scratch, { opacity: 0 });

    const tl = gsap.timeline({ onComplete: () => setDone(true) });

    // Stage 1: Scratch (0.2s – 0.95s)
    tl.to(scratch, { opacity: 1, duration: 0.15 }, 0.2)
      .to(redCandle, { x: 18, y: 12, rotation: 4, duration: 0.75, ease: "power2.inOut" }, 0.2)
      .to(greenCandle, { x: -18, y: -12, rotation: -4, duration: 0.75, ease: "power2.inOut" }, 0.2)
      .to(scratch, { opacity: 0.9, scaleX: 1.3, duration: 0.4, ease: "power1.in" }, 0.5)
      .to(scratch, { opacity: 0, duration: 0.2 }, 0.9);

    // Stage 2: Break (0.95s – 1.25s)
    tl.to(redCandle, { opacity: 0, duration: 0.05 }, 0.95)
      .to(greenCandle, { opacity: 0, duration: 0.05 }, 0.95)
      .set([redTop, redBottom, greenTop, greenBottom], { opacity: 1 }, 0.95)
      .to(redTop, { y: -14, x: 6, rotation: 5, duration: 0.3, ease: "back.out(1.6)" }, 0.95)
      .to(redBottom, { y: 14, x: -4, rotation: -3, duration: 0.3, ease: "back.out(1.6)" }, 0.95)
      .to(greenTop, { y: -12, x: -6, rotation: -5, duration: 0.3, ease: "back.out(1.6)" }, 0.95)
      .to(greenBottom, { y: 12, x: 5, rotation: 3, duration: 0.3, ease: "back.out(1.6)" }, 0.95);

    // Stage 3: Curtains open + candles fade + emblem/seam animate (1.25s – 2.8s)
    tl.to(candles, { opacity: 0, duration: 0.3, ease: "power2.out" }, 1.25)
      .to(emblem, { opacity: 0, scale: 0.72, duration: 0.55, ease: "power2.in" }, 1.25)
      .to(leftCurtain, { xPercent: -104, filter: "brightness(0.72)", duration: 1.55, ease: "power4.inOut" }, 1.3)
      .to(rightCurtain, { xPercent: 104, filter: "brightness(0.72)", duration: 1.55, ease: "power4.inOut" }, 1.3)
      .to(centerShadow, { width: "46vw", opacity: 0.75, duration: 1.35, ease: "power4.inOut" }, 1.35);

    // Stage 4: Overlay fade (2.75s – 3.2s)
    tl.to(overlay, { opacity: 0, duration: 0.45, ease: "power2.out" }, 2.75);
  }, []);

  if (done) return null;

  return (
    <div className="page-preloader" ref={overlayRef} aria-hidden="true">
      {/* Left curtain — luxury emerald velvet */}
      <div className="curtain-panel curtain-left" ref={leftCurtainRef}>
        <svg viewBox="0 0 200 400" preserveAspectRatio="none" className="curtain-fold-svg">
          <path d="M28 0 Q30 200 26 400" stroke="rgba(0,0,0,0.3)" strokeWidth="2.5" fill="none" />
          <path d="M29 0 Q31 200 27 400" stroke="rgba(67,199,160,0.08)" strokeWidth="0.8" fill="none" />
          <path d="M58 0 Q56 200 60 400" stroke="rgba(0,0,0,0.24)" strokeWidth="2" fill="none" />
          <path d="M88 0 Q90 200 86 400" stroke="rgba(0,0,0,0.28)" strokeWidth="2.2" fill="none" />
          <path d="M89 0 Q91 200 87 400" stroke="rgba(67,199,160,0.05)" strokeWidth="0.6" fill="none" />
          <path d="M118 0 Q116 200 120 400" stroke="rgba(0,0,0,0.2)" strokeWidth="1.8" fill="none" />
          <path d="M148 0 Q150 200 146 400" stroke="rgba(0,0,0,0.22)" strokeWidth="2" fill="none" />
          <path d="M175 0 Q173 200 177 400" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" fill="none" />
          {/* Rolled edge right */}
          <ellipse cx="196" cy="200" rx="5" ry="200" fill="rgba(2,20,15,0.85)" />
          <ellipse cx="198.5" cy="200" rx="2" ry="200" fill="rgba(0,10,6,0.95)" />
        </svg>
      </div>

      {/* Right curtain — luxury ruby velvet */}
      <div className="curtain-panel curtain-right" ref={rightCurtainRef}>
        <svg viewBox="0 0 200 400" preserveAspectRatio="none" className="curtain-fold-svg">
          <path d="M25 0 Q27 200 23 400" stroke="rgba(0,0,0,0.22)" strokeWidth="2" fill="none" />
          <path d="M55 0 Q53 200 57 400" stroke="rgba(0,0,0,0.28)" strokeWidth="2.3" fill="none" />
          <path d="M56 0 Q54 200 58 400" stroke="rgba(217,54,46,0.05)" strokeWidth="0.6" fill="none" />
          <path d="M85 0 Q87 200 83 400" stroke="rgba(0,0,0,0.24)" strokeWidth="2" fill="none" />
          <path d="M115 0 Q113 200 117 400" stroke="rgba(0,0,0,0.3)" strokeWidth="2.5" fill="none" />
          <path d="M116 0 Q114 200 118 400" stroke="rgba(217,54,46,0.06)" strokeWidth="0.7" fill="none" />
          <path d="M145 0 Q147 200 143 400" stroke="rgba(0,0,0,0.2)" strokeWidth="1.8" fill="none" />
          <path d="M172 0 Q170 200 174 400" stroke="rgba(0,0,0,0.16)" strokeWidth="1.5" fill="none" />
          {/* Rolled edge left */}
          <ellipse cx="4" cy="200" rx="5" ry="200" fill="rgba(23,2,3,0.85)" />
          <ellipse cx="1.5" cy="200" rx="2" ry="200" fill="rgba(8,0,0,0.95)" />
        </svg>
      </div>

      {/* Center seam shadow */}
      <div className="curtain-center-shadow" ref={centerShadowRef} />

      {/* Gold emblem at center */}
      <div className="curtain-emblem" ref={emblemRef}><span /></div>

      {/* Center trading candlesticks — flat chart style, no flames */}
      <svg className="preloader-candles" viewBox="0 0 420 260" ref={candlesRef}>
        {/* Red trading candlestick (bearish — on green/left side) */}
        <g ref={redCandleRef}>
          <line x1="168" y1="38" x2="168" y2="72" stroke="#f0f0f0" strokeWidth="2.5" />
          <rect x="156" y="72" width="24" height="86" rx="1" fill="#c5162e" />
          <line x1="168" y1="158" x2="168" y2="188" stroke="#f0f0f0" strokeWidth="2.5" />
        </g>

        {/* Green trading candlestick (bullish — on red/right side) */}
        <g ref={greenCandleRef}>
          <line x1="252" y1="56" x2="252" y2="98" stroke="#f0f0f0" strokeWidth="2.5" />
          <rect x="240" y="98" width="24" height="52" rx="1" fill="#00a35a" />
          <line x1="252" y1="150" x2="252" y2="178" stroke="#f0f0f0" strokeWidth="2.5" />
        </g>

        {/* Red candlestick halves */}
        <g ref={redTopRef} opacity="0">
          <line x1="168" y1="38" x2="168" y2="72" stroke="#f0f0f0" strokeWidth="2.5" />
          <rect x="156" y="72" width="24" height="43" rx="1" fill="#c5162e" />
          <path d="M156 115 L162 112 L168 116 L174 111 L180 115" fill="none" stroke="#200005" strokeWidth="1.5" />
        </g>
        <g ref={redBottomRef} opacity="0">
          <rect x="156" y="115" width="24" height="43" rx="1" fill="#c5162e" />
          <path d="M156 115 L162 118 L168 114 L174 119 L180 115" fill="none" stroke="#200005" strokeWidth="1.5" />
          <line x1="168" y1="158" x2="168" y2="188" stroke="#f0f0f0" strokeWidth="2.5" />
        </g>

        {/* Green candlestick halves */}
        <g ref={greenTopRef} opacity="0">
          <line x1="252" y1="56" x2="252" y2="98" stroke="#f0f0f0" strokeWidth="2.5" />
          <rect x="240" y="98" width="24" height="26" rx="1" fill="#00a35a" />
          <path d="M240 124 L246 121 L252 125 L258 120 L264 124" fill="none" stroke="#002a10" strokeWidth="1.5" />
        </g>
        <g ref={greenBottomRef} opacity="0">
          <rect x="240" y="124" width="24" height="26" rx="1" fill="#00a35a" />
          <path d="M240 124 L246 127 L252 123 L258 128 L264 124" fill="none" stroke="#002a10" strokeWidth="1.5" />
          <line x1="252" y1="150" x2="252" y2="178" stroke="#f0f0f0" strokeWidth="2.5" />
        </g>

        {/* Scratch sparks */}
        <g ref={scratchRef} opacity="0">
          <line x1="192" y1="120" x2="228" y2="110" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="198" y1="128" x2="222" y2="116" stroke="rgba(255,200,60,0.6)" strokeWidth="1" strokeLinecap="round" />
          <line x1="204" y1="112" x2="216" y2="124" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
