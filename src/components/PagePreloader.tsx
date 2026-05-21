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
      {/* Left curtain — green with enhanced fabric detail */}
      <div className="preloader-curtain preloader-curtain-left" ref={leftCurtainRef}>
        <svg viewBox="0 0 200 200" preserveAspectRatio="none" className="preloader-curtain-svg">
          <defs>
            <linearGradient id="curtainGreenGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#004420" />
              <stop offset="10%" stopColor="#006838" />
              <stop offset="22%" stopColor="#00a35a" />
              <stop offset="34%" stopColor="#006d3a" />
              <stop offset="46%" stopColor="#00b15d" />
              <stop offset="56%" stopColor="#007a44" />
              <stop offset="68%" stopColor="#00a35a" />
              <stop offset="78%" stopColor="#008a4a" />
              <stop offset="88%" stopColor="#00a35a" />
              <stop offset="100%" stopColor="#003d1c" />
            </linearGradient>
            <filter id="greenNoise">
              <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" seed="3" result="noise" />
              <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
              <feComponentTransfer in="grayNoise" result="fadedNoise">
                <feFuncA type="linear" slope="0.06" />
              </feComponentTransfer>
              <feBlend mode="overlay" in="SourceGraphic" in2="fadedNoise" />
            </filter>
          </defs>
          <rect x="0" y="0" width="200" height="200" fill="url(#curtainGreenGrad)" filter="url(#greenNoise)" />
          {/* Deep fold shadows */}
          <path d="M30 0 Q32 100 28 200" stroke="rgba(0,0,0,0.22)" strokeWidth="2.5" fill="none" />
          <path d="M31 0 Q33 100 29 200" stroke="rgba(0,80,30,0.15)" strokeWidth="1" fill="none" />
          <path d="M60 0 Q58 100 62 200" stroke="rgba(0,0,0,0.18)" strokeWidth="2" fill="none" />
          <path d="M61 0 Q59 100 63 200" stroke="rgba(200,255,200,0.04)" strokeWidth="1" fill="none" />
          <path d="M95 0 Q97 100 93 200" stroke="rgba(0,0,0,0.2)" strokeWidth="2.2" fill="none" />
          <path d="M96 0 Q98 100 94 200" stroke="rgba(150,255,180,0.03)" strokeWidth="0.8" fill="none" />
          <path d="M130 0 Q128 100 132 200" stroke="rgba(0,0,0,0.16)" strokeWidth="1.8" fill="none" />
          <path d="M160 0 Q162 100 158 200" stroke="rgba(0,0,0,0.14)" strokeWidth="1.5" fill="none" />
          <path d="M161 0 Q163 100 159 200" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" fill="none" />
          {/* Rolled edge at right with cylindrical shading */}
          <ellipse cx="196" cy="100" rx="6" ry="100" fill="rgba(0,50,18,0.8)" />
          <ellipse cx="198" cy="100" rx="3" ry="100" fill="rgba(0,30,10,0.95)" />
          <ellipse cx="199.5" cy="100" rx="1" ry="100" fill="rgba(0,90,35,0.4)" />
        </svg>
      </div>

      {/* Right curtain — red with enhanced fabric detail */}
      <div className="preloader-curtain preloader-curtain-right" ref={rightCurtainRef}>
        <svg viewBox="0 0 200 200" preserveAspectRatio="none" className="preloader-curtain-svg">
          <defs>
            <linearGradient id="curtainRedGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3d000a" />
              <stop offset="12%" stopColor="#6a0014" />
              <stop offset="24%" stopColor="#b00020" />
              <stop offset="36%" stopColor="#7a0016" />
              <stop offset="48%" stopColor="#c5162e" />
              <stop offset="58%" stopColor="#8a0018" />
              <stop offset="70%" stopColor="#b00020" />
              <stop offset="80%" stopColor="#950020" />
              <stop offset="90%" stopColor="#b00020" />
              <stop offset="100%" stopColor="#4a000e" />
            </linearGradient>
            <filter id="redNoise">
              <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" seed="11" result="noise" />
              <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
              <feComponentTransfer in="grayNoise" result="fadedNoise">
                <feFuncA type="linear" slope="0.06" />
              </feComponentTransfer>
              <feBlend mode="overlay" in="SourceGraphic" in2="fadedNoise" />
            </filter>
          </defs>
          <rect x="0" y="0" width="200" height="200" fill="url(#curtainRedGrad)" filter="url(#redNoise)" />
          {/* Deep fold shadows */}
          <path d="M40 0 Q38 100 42 200" stroke="rgba(0,0,0,0.2)" strokeWidth="2.2" fill="none" />
          <path d="M41 0 Q39 100 43 200" stroke="rgba(255,200,200,0.03)" strokeWidth="0.8" fill="none" />
          <path d="M75 0 Q77 100 73 200" stroke="rgba(0,0,0,0.18)" strokeWidth="2" fill="none" />
          <path d="M105 0 Q103 100 107 200" stroke="rgba(0,0,0,0.22)" strokeWidth="2.5" fill="none" />
          <path d="M106 0 Q104 100 108 200" stroke="rgba(255,180,180,0.03)" strokeWidth="0.8" fill="none" />
          <path d="M140 0 Q142 100 138 200" stroke="rgba(0,0,0,0.16)" strokeWidth="1.8" fill="none" />
          <path d="M141 0 Q143 100 139 200" stroke="rgba(255,255,255,0.025)" strokeWidth="0.7" fill="none" />
          <path d="M170 0 Q168 100 172 200" stroke="rgba(0,0,0,0.14)" strokeWidth="1.5" fill="none" />
          {/* Rolled edge at left with cylindrical shading */}
          <ellipse cx="4" cy="100" rx="6" ry="100" fill="rgba(50,0,8,0.8)" />
          <ellipse cx="2" cy="100" rx="3" ry="100" fill="rgba(30,0,5,0.95)" />
          <ellipse cx="0.5" cy="100" rx="1" ry="100" fill="rgba(90,0,15,0.4)" />
        </svg>
      </div>

      {/* Center trading candlesticks — flat chart style, no flames */}
      <svg className="preloader-candles" viewBox="0 0 420 260" ref={candlesRef}>
        {/* Red trading candlestick (bearish — on green/left side) */}
        <g ref={redCandleRef}>
          {/* Upper wick */}
          <line x1="168" y1="38" x2="168" y2="72" stroke="#f0f0f0" strokeWidth="2.5" />
          {/* Body */}
          <rect x="156" y="72" width="24" height="86" rx="1" fill="#c5162e" />
          {/* Lower wick */}
          <line x1="168" y1="158" x2="168" y2="188" stroke="#f0f0f0" strokeWidth="2.5" />
        </g>

        {/* Green trading candlestick (bullish — on red/right side) */}
        <g ref={greenCandleRef}>
          {/* Upper wick */}
          <line x1="252" y1="56" x2="252" y2="98" stroke="#f0f0f0" strokeWidth="2.5" />
          {/* Body */}
          <rect x="240" y="98" width="24" height="52" rx="1" fill="#00a35a" />
          {/* Lower wick */}
          <line x1="252" y1="150" x2="252" y2="178" stroke="#f0f0f0" strokeWidth="2.5" />
        </g>

        {/* Red candlestick halves (hidden initially) */}
        <g ref={redTopRef} opacity="0">
          {/* Upper wick + top body half */}
          <line x1="168" y1="38" x2="168" y2="72" stroke="#f0f0f0" strokeWidth="2.5" />
          <rect x="156" y="72" width="24" height="43" rx="1" fill="#c5162e" />
          <path d="M156 115 L162 112 L168 116 L174 111 L180 115" fill="none" stroke="#200005" strokeWidth="1.5" />
        </g>
        <g ref={redBottomRef} opacity="0">
          {/* Bottom body half + lower wick */}
          <rect x="156" y="115" width="24" height="43" rx="1" fill="#c5162e" />
          <path d="M156 115 L162 118 L168 114 L174 119 L180 115" fill="none" stroke="#200005" strokeWidth="1.5" />
          <line x1="168" y1="158" x2="168" y2="188" stroke="#f0f0f0" strokeWidth="2.5" />
        </g>

        {/* Green candlestick halves (hidden initially) */}
        <g ref={greenTopRef} opacity="0">
          {/* Upper wick + top body half */}
          <line x1="252" y1="56" x2="252" y2="98" stroke="#f0f0f0" strokeWidth="2.5" />
          <rect x="240" y="98" width="24" height="26" rx="1" fill="#00a35a" />
          <path d="M240 124 L246 121 L252 125 L258 120 L264 124" fill="none" stroke="#002a10" strokeWidth="1.5" />
        </g>
        <g ref={greenBottomRef} opacity="0">
          {/* Bottom body half + lower wick */}
          <rect x="240" y="124" width="24" height="26" rx="1" fill="#00a35a" />
          <path d="M240 124 L246 127 L252 123 L258 128 L264 124" fill="none" stroke="#002a10" strokeWidth="1.5" />
          <line x1="252" y1="150" x2="252" y2="178" stroke="#f0f0f0" strokeWidth="2.5" />
        </g>

        {/* Scratch sparks — subtle */}
        <g ref={scratchRef} opacity="0">
          <line x1="192" y1="120" x2="228" y2="110" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="198" y1="128" x2="222" y2="116" stroke="rgba(255,200,60,0.6)" strokeWidth="1" strokeLinecap="round" />
          <line x1="204" y1="112" x2="216" y2="124" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
