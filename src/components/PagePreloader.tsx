import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "../styles/page-preloader.css";

export default function PagePreloader() {
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
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
    const candles = candlesRef.current;
    const redCandle = redCandleRef.current;
    const greenCandle = greenCandleRef.current;
    const redTop = redTopRef.current;
    const redBottom = redBottomRef.current;
    const greenTop = greenTopRef.current;
    const greenBottom = greenBottomRef.current;
    const scratch = scratchRef.current;

    if (!leftCurtain || !rightCurtain || !candles || !redCandle || !greenCandle || !redTop || !redBottom || !greenTop || !greenBottom || !scratch) return;

    // Initial state: halves hidden
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

    // Stage 3: Curtains open + candles fade (1.25s – 2.45s)
    tl.to(candles, { opacity: 0, duration: 0.3, ease: "power2.out" }, 1.25)
      .to(leftCurtain, { xPercent: -105, duration: 1.2, ease: "expo.inOut" }, 1.25)
      .to(rightCurtain, { xPercent: 105, duration: 1.2, ease: "expo.inOut" }, 1.25);

    // Stage 4: Overlay fade (2.35s – 2.85s)
    tl.to(overlay, { opacity: 0, duration: 0.5, ease: "power2.out" }, 2.35);
  }, []);

  if (done) return null;

  return (
    <div className="page-preloader" ref={overlayRef} aria-hidden="true">
      {/* Left curtain — green */}
      <div className="preloader-curtain preloader-curtain-left" ref={leftCurtainRef}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="preloader-curtain-svg">
          <defs>
            <linearGradient id="curtainGreenGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#006838" />
              <stop offset="18%" stopColor="#00a35a" />
              <stop offset="35%" stopColor="#007a44" />
              <stop offset="52%" stopColor="#00b15d" />
              <stop offset="68%" stopColor="#008a4a" />
              <stop offset="84%" stopColor="#00a35a" />
              <stop offset="100%" stopColor="#005c30" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="100" height="100" fill="url(#curtainGreenGrad)" />
          {/* Fold ridges */}
          <line x1="20" y1="0" x2="20" y2="100" stroke="rgba(0,0,0,0.15)" strokeWidth="0.4" />
          <line x1="40" y1="0" x2="40" y2="100" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" />
          <line x1="60" y1="0" x2="60" y2="100" stroke="rgba(0,0,0,0.12)" strokeWidth="0.4" />
          <line x1="80" y1="0" x2="80" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" />
          {/* Rolled edge at right */}
          <ellipse cx="99" cy="50" rx="3" ry="50" fill="rgba(0,60,20,0.7)" />
          <ellipse cx="100" cy="50" rx="1.5" ry="50" fill="rgba(0,40,15,0.9)" />
        </svg>
      </div>

      {/* Right curtain — red */}
      <div className="preloader-curtain preloader-curtain-right" ref={rightCurtainRef}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="preloader-curtain-svg">
          <defs>
            <linearGradient id="curtainRedGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5c0010" />
              <stop offset="16%" stopColor="#b00020" />
              <stop offset="33%" stopColor="#8a0018" />
              <stop offset="50%" stopColor="#c5162e" />
              <stop offset="67%" stopColor="#950020" />
              <stop offset="83%" stopColor="#b00020" />
              <stop offset="100%" stopColor="#6a0014" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="100" height="100" fill="url(#curtainRedGrad)" />
          {/* Fold ridges */}
          <line x1="20" y1="0" x2="20" y2="100" stroke="rgba(0,0,0,0.15)" strokeWidth="0.4" />
          <line x1="40" y1="0" x2="40" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" />
          <line x1="60" y1="0" x2="60" y2="100" stroke="rgba(0,0,0,0.12)" strokeWidth="0.4" />
          <line x1="80" y1="0" x2="80" y2="100" stroke="rgba(255,255,255,0.04)" strokeWidth="0.3" />
          {/* Rolled edge at left */}
          <ellipse cx="1" cy="50" rx="3" ry="50" fill="rgba(60,0,10,0.7)" />
          <ellipse cx="0" cy="50" rx="1.5" ry="50" fill="rgba(40,0,8,0.9)" />
        </svg>
      </div>

      {/* Center candlesticks */}
      <svg className="preloader-candles" viewBox="0 0 420 260" ref={candlesRef}>
        {/* Red candle (sits on green/left side) */}
        <g ref={redCandleRef}>
          {/* Wick */}
          <line x1="168" y1="62" x2="168" y2="48" stroke="#333" strokeWidth="2" strokeLinecap="round" />
          <circle cx="168" cy="46" r="3" fill="#ff6a00" opacity="0.8" />
          {/* Body */}
          <rect x="158" y="62" width="20" height="110" rx="2" fill="#c5162e" />
          <rect x="160" y="62" width="4" height="110" fill="rgba(255,255,255,0.08)" rx="1" />
        </g>

        {/* Green candle (sits on red/right side) */}
        <g ref={greenCandleRef}>
          {/* Wick */}
          <line x1="252" y1="88" x2="252" y2="74" stroke="#333" strokeWidth="2" strokeLinecap="round" />
          <circle cx="252" cy="72" r="3" fill="#ff6a00" opacity="0.8" />
          {/* Body */}
          <rect x="242" y="88" width="20" height="84" rx="2" fill="#00a35a" />
          <rect x="244" y="88" width="4" height="84" fill="rgba(255,255,255,0.08)" rx="1" />
        </g>

        {/* Red candle halves (hidden initially) */}
        <g ref={redTopRef} opacity="0">
          <line x1="168" y1="62" x2="168" y2="48" stroke="#333" strokeWidth="2" strokeLinecap="round" />
          <circle cx="168" cy="46" r="3" fill="#ff6a00" opacity="0.8" />
          <rect x="158" y="62" width="20" height="55" rx="2" fill="#c5162e" />
          <rect x="160" y="62" width="4" height="55" fill="rgba(255,255,255,0.08)" rx="1" />
          {/* Crack edge */}
          <path d="M158 117 L163 114 L168 118 L173 113 L178 117" fill="none" stroke="#1a0005" strokeWidth="1.5" />
        </g>
        <g ref={redBottomRef} opacity="0">
          <rect x="158" y="117" width="20" height="55" rx="2" fill="#c5162e" />
          <rect x="160" y="117" width="4" height="55" fill="rgba(255,255,255,0.08)" rx="1" />
          <path d="M158 117 L163 120 L168 116 L173 121 L178 117" fill="none" stroke="#1a0005" strokeWidth="1.5" />
        </g>

        {/* Green candle halves (hidden initially) */}
        <g ref={greenTopRef} opacity="0">
          <line x1="252" y1="88" x2="252" y2="74" stroke="#333" strokeWidth="2" strokeLinecap="round" />
          <circle cx="252" cy="72" r="3" fill="#ff6a00" opacity="0.8" />
          <rect x="242" y="88" width="20" height="42" rx="2" fill="#00a35a" />
          <rect x="244" y="88" width="4" height="42" fill="rgba(255,255,255,0.08)" rx="1" />
          <path d="M242 130 L247 127 L252 131 L257 126 L262 130" fill="none" stroke="#002a10" strokeWidth="1.5" />
        </g>
        <g ref={greenBottomRef} opacity="0">
          <rect x="242" y="130" width="20" height="42" rx="2" fill="#00a35a" />
          <rect x="244" y="130" width="4" height="42" fill="rgba(255,255,255,0.08)" rx="1" />
          <path d="M242 130 L247 133 L252 129 L257 134 L262 130" fill="none" stroke="#002a10" strokeWidth="1.5" />
        </g>

        {/* Scratch sparks */}
        <g ref={scratchRef} opacity="0">
          <line x1="195" y1="118" x2="225" y2="108" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
          <line x1="200" y1="126" x2="220" y2="114" stroke="#ffcc00" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
          <line x1="205" y1="110" x2="218" y2="122" stroke="#fff" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          <circle cx="210" cy="118" r="4" fill="#ffdd44" opacity="0.5" />
          <circle cx="208" cy="115" r="2" fill="#fff" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
}
