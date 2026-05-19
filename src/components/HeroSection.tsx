import { useEffect, useState, isValidElement, cloneElement } from "react";
import "../styles/hero.css";
import RetroComputerPopup from "./RetroComputerPopup";
import HeroNav from "./HeroNav";
import TypingText from "./TypingText";
import GoldCursor3D from "./GoldCursor3D";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

// SVGR imports — each SVG is imported as a React component
import VerticalLogo1 from "../assets/source/hero/vertical_logo_1.svg?react";
import VerticalLogo2 from "../assets/source/hero/vertical_logo_2.svg?react";
import HeroWheelNoCta from "../assets/source/hero/hero_wheel_no_cta.svg?react";
import WheelSide from "../assets/source/hero/wheel_side.svg?react";
import HudAnnotation3 from "../assets/source/hero/hud_annotation_3.svg?react";
import HudAnnotation4 from "../assets/source/hero/hud_annotation_4.svg?react";
import HudAnnotation5 from "../assets/source/hero/hud_annotation_5.svg?react";
import HudAnnotation6 from "../assets/source/hero/hud_annotation_6.svg?react";
import HeroWheelCta from "../assets/source/hero/hero_wheel_cta.svg?react";
import RetroComputerLogo from "../assets/source/hero/retro_computer_logo.svg?react";
import YellowTape from "../assets/source/hero/yellow_tape.svg?react";

// ── Reusable positioned SVG wrapper ──────────────────────────────────────────
interface PositionedSvgAssetProps {
  children: React.ReactNode;
  className?: string;
  width: number;
  height: number;
  left: number;
  top: number;
  rotation?: number;
  zIndex: number;
  preserveAspectRatio?: string;
}

function PositionedSvgAsset({
  children,
  className = "",
  width,
  height,
  left,
  top,
  rotation,
  zIndex,
  preserveAspectRatio = "xMidYMid meet",
}: PositionedSvgAssetProps) {
  const style: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    left: `${left}px`,
    top: `${top}px`,
    zIndex,
    transform: rotation !== undefined ? `rotate(${rotation}deg)` : undefined,
    transformOrigin: rotation !== undefined ? "center center" : undefined,
  };

  const svgChild = isValidElement(children)
    ? cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        preserveAspectRatio,
        focusable: "false",
      })
    : children;

  return (
    <div className={`positioned-asset ${className}`} style={style}>
      {svgChild}
    </div>
  );
}

// ── Scale hook (safe contain-fit) ────────────────────────────────────────────
function useHeroScale() {
  const [scale, setScale] = useState(() =>
    Math.min(window.innerWidth / 1920, window.innerHeight / 1080)
  );

  useEffect(() => {
    function handleResize() {
      setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return scale;
}

// ── Viewport width hook (for dynamic tape sizing) ────────────────────────────
function useViewportWidth() {
  const [vw, setVw] = useState(() => window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setVw(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return vw;
}

// ── Tape text content (wider dot spacing) ────────────────────────────────────
const TAPE_TEXT =
  "DATA DRIVES THE MARKET\u00A0\u00A0\u00A0\u2022\u00A0\u00A0\u00A0TRADE SMART\u00A0\u00A0\u00A0\u2022\u00A0\u00A0\u00A0STAY INFORMED\u00A0\u00A0\u00A0\u2022\u00A0\u00A0\u00A0DON\u2019T GAMBLE\u00A0\u00A0\u00A0\u2022\u00A0\u00A0\u00A0";

// ── Hero Section Component ───────────────────────────────────────────────────
export default function HeroSection() {
  const scale = useHeroScale();
  const viewportWidth = useViewportWidth();
  const [popupOpen, setPopupOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Dynamic tape sizing: tape spans full viewport width inside the stage
  const tapeBleed = 520;
  const tapeWidth = viewportWidth / scale + tapeBleed;
  const tapeLeft = (1920 - tapeWidth) / 2;

  // Nav centering on desktop
  const NAV_WIDTH = 797;
  const navLeft = (1920 - NAV_WIDTH) / 2;

  const motionClass = prefersReducedMotion ? "motion-reduced" : "motion-enabled";

  return (
    <section
      className={`hero ${motionClass}`}
      aria-label="ELCEO Hero"
      data-motion={prefersReducedMotion ? "reduced" : "enabled"}
    >
      {/* Background texture */}
      <div className="hero-bg" aria-hidden="true" />

      {/* 1920×1080 coordinate stage */}
      <div
        className="hero-stage"
        style={{ "--hero-scale": scale } as React.CSSProperties}
      >
        {/* Layer 3: Vertical Logo 1 */}
        <PositionedSvgAsset
          className="asset-vertical-logo"
          width={104}
          height={823}
          left={24}
          top={109}
          zIndex={3}
        >
          <VerticalLogo1 />
        </PositionedSvgAsset>

        {/* Layer 4: Vertical Logo 2 */}
        <PositionedSvgAsset
          className="asset-vertical-logo asset-vertical-logo-2"
          width={104}
          height={823}
          left={33}
          top={118}
          zIndex={4}
        >
          <VerticalLogo2 />
        </PositionedSvgAsset>

        {/* Layer 4: Wheel Side (behind occlusion shield) */}
        <PositionedSvgAsset
          className="asset-wheel-side"
          width={332}
          height={294}
          left={1203}
          top={84}
          zIndex={4}
        >
          <WheelSide />
        </PositionedSvgAsset>

        {/* Wheel Side micro-life: overlay cars */}
        <div className="wheel-side-cars" aria-hidden="true">
          <svg viewBox="0 0 80 16" className="city-car city-car-1" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="28" height="10" rx="3" fill="#FDDF75" />
            <rect x="8" y="1" width="18" height="7" rx="2" fill="#FDDF75" opacity="0.85" />
            <circle cx="10" cy="14" r="3" fill="#333" /><circle cx="26" cy="14" r="3" fill="#333" />
          </svg>
          <svg viewBox="0 0 80 16" className="city-car city-car-2" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="24" height="9" rx="3" fill="#FDDF74" />
            <rect x="7" y="1" width="15" height="6" rx="2" fill="#FDDF74" opacity="0.85" />
            <circle cx="9" cy="13" r="2.5" fill="#333" /><circle cx="23" cy="13" r="2.5" fill="#333" />
          </svg>
        </div>

        {/* Airplane flying across wheel_side area */}
        <div className="city-airplane" aria-hidden="true">
          <svg viewBox="0 0 60 24" xmlns="http://www.w3.org/2000/svg" className="airplane-svg">
            <path d="M4 12 L20 10 L28 4 L32 4 L26 10 L52 8 L56 4 L58 5 L54 10 L58 10 L58 12 L54 13 L58 18 L56 19 L52 15 L26 13 L32 19 L28 19 L20 13 L4 12 Z" fill="#fff" />
            <path d="M28 4 L32 4 L26 10 L20 10 Z" fill="#3B7DD8" opacity="0.8" />
            <path d="M56 4 L58 5 L54 10 L52 8 Z" fill="#3B7DD8" opacity="0.7" />
          </svg>
        </div>

        {/* Layer 5: Wheel Occlusion Shield */}
        <div className="wheel-occlusion-shield" aria-hidden="true" />

        {/* Layer 6: Main Wheel (no CTA) */}
        <PositionedSvgAsset
          className="asset-hero-wheel"
          width={987}
          height={964}
          left={519}
          top={104}
          zIndex={6}
        >
          <HeroWheelNoCta />
        </PositionedSvgAsset>

        {/* Globe breathing aura overlay */}
        <div className="globe-breathing-aura" aria-hidden="true" />

        {/* Layer 7: HUD Annotations */}
        <PositionedSvgAsset
          className="asset-hud-annotation-3"
          width={500}
          height={350}
          left={1396}
          top={210}
          zIndex={7}
          preserveAspectRatio="none"
        >
          <HudAnnotation3 />
        </PositionedSvgAsset>

        <PositionedSvgAsset
          className="asset-hud-annotation-4"
          width={642}
          height={243}
          left={155.77}
          top={630}
          rotation={180.36}
          zIndex={7}
          preserveAspectRatio="none"
        >
          <HudAnnotation4 />
        </PositionedSvgAsset>

        <PositionedSvgAsset
          className="asset-hud-annotation-5"
          width={440}
          height={517}
          left={246.78}
          top={110.17}
          rotation={90.07}
          zIndex={7}
          preserveAspectRatio="none"
        >
          <HudAnnotation5 />
        </PositionedSvgAsset>

        <PositionedSvgAsset
          className="asset-hud-annotation-6"
          width={438}
          height={496}
          left={1384.15}
          top={332.17}
          rotation={270.04}
          zIndex={7}
          preserveAspectRatio="none"
        >
          <HudAnnotation6 />
        </PositionedSvgAsset>

        {/* Layer 8: HUD Textboxes */}
        <div className="hud3-content-frame" aria-hidden="true" style={{ position: "absolute", left: 1580, top: 222, width: 292, height: 138, zIndex: 8 }} />

        <div className="hud-textbox hud-textbox-3" style={{ left: 1600, top: 246, width: 250, height: 96, zIndex: 9 }}>
          <p className="hud-title"><span className="marker-highlight">MARKET</span> PRESSURE</p>
          <p className="hud-body">Price action, macro flow, <span className="marker-highlight">liquidity</span>, and risk context in one reasoning layer.</p>
        </div>

        <div className="hud-textbox hud-textbox-4" style={{ left: 229, top: 696, width: 256, height: 126, zIndex: 8 }}>
          <p className="hud-title"><span className="marker-highlight">RISK</span> MAPPING</p>
          <p className="hud-body">See volatility, invalidation, <span className="marker-highlight">exposure pressure</span>, and market uncertainty before acting.</p>
        </div>

        <div className="hud-textbox hud-textbox-5" style={{ left: 281, top: 203, width: 144, height: 289, zIndex: 8 }}>
          <p className="hud-title"><span className="marker-highlight">MARKET</span> COGNITION</p>
          <p className="hud-body">ELCEO turns scattered market evidence into <span className="marker-highlight">readable</span> trader context.</p>
        </div>

        <div className="hud-textbox hud-textbox-6" style={{ left: 1652, top: 438, width: 134, height: 297, zIndex: 8 }}>
          <p className="hud-title"><span className="marker-highlight">CROSS-ASSET</span> LOGIC</p>
          <p className="hud-body">Connect FX, gold, indices, crypto, macro events, and <span className="marker-highlight">sentiment</span> without guessing.</p>
        </div>

        {/* Layer 9: CTA Button */}
        <PositionedSvgAsset
          className="asset-hero-wheel-cta"
          width={300}
          height={97}
          left={861}
          top={526}
          zIndex={9}
        >
          <HeroWheelCta />
        </PositionedSvgAsset>

        {/* CTA Typing Text Overlay */}
        <div className="cta-typing-overlay" style={{ position: "absolute", left: 861, top: 526, width: 300, height: 97, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <TypingText
            text="EXPLORE ELCEO"
            className="cta-typing-text"
            speedMs={90}
            pauseMs={1200}
            loop
          />
        </div>

        {/* Layer 10: Nav (real interactive links) */}
        <div
          className="hero-nav-wrapper"
          style={{
            position: "absolute",
            left: `${navLeft}px`,
            top: "29px",
            width: `${NAV_WIDTH}px`,
            height: "43px",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HeroNav />
        </div>

        {/* Layer 11: Retro Computer Logo (clickable) */}
        <button
          className="retro-computer-btn"
          style={{
            position: "absolute",
            left: 1796,
            top: 19,
            width: 123,
            height: 95,
            zIndex: 11,
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
          onClick={() => setPopupOpen(true)}
          aria-label="Open ELCEO terminal"
        >
          <PositionedSvgAsset
            className="asset-retro-computer"
            width={123}
            height={95}
            left={0}
            top={0}
            zIndex={11}
          >
            <RetroComputerLogo />
          </PositionedSvgAsset>
        </button>

        {/* Click-here arrow with typing text */}
        <div className="click-here-arrow" aria-hidden="true">
          <svg
            viewBox="0 0 80 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="click-here-svg"
          >
            {/* Hand-drawn imperfect curve stroke 1 */}
            <path
              d="M6 56 C 14 48, 28 34, 44 22 C 52 16, 60 12, 68 8"
              stroke="#F6C343"
              strokeWidth="3.6"
              strokeLinecap="round"
              fill="none"
            />
            {/* Offset imperfect second line for hand-drawn feel */}
            <path
              d="M8 54 C 16 47, 30 33, 46 21 C 53 15, 61 11, 69 7"
              stroke="#FFD700"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
            {/* Irregular arrowhead */}
            <path
              d="M60 4 L72 7 L64 15"
              stroke="#F6C343"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <TypingText
            text="click here"
            className="click-here-text"
            speedMs={110}
            pauseMs={900}
            loop
          />
        </div>

        {/* Layer 12: Yellow Tape (dynamic width to span viewport) */}
        <PositionedSvgAsset
          className="asset-yellow-tape"
          width={tapeWidth}
          height={120}
          left={tapeLeft}
          top={905}
          rotation={356.8}
          zIndex={12}
          preserveAspectRatio="none"
        >
          <YellowTape />
        </PositionedSvgAsset>

        {/* Layer 13: Tape Text Marquee */}
        <div
          className="tape-text-overlay"
          style={{
            left: `${tapeLeft}px`,
            top: "930px",
            width: `${tapeWidth}px`,
            height: "60px",
            transform: "rotate(356.8deg) scaleY(1.18)",
            transformOrigin: "center center",
            zIndex: 13,
          }}
          aria-hidden="true"
        >
          <div className="tape-marquee-track">
            <span className="tape-text-content">{TAPE_TEXT.repeat(10)}</span>
            <span className="tape-text-content">{TAPE_TEXT.repeat(10)}</span>
          </div>
        </div>
      </div>

      {/* Retro Computer Popup */}
      {popupOpen && <RetroComputerPopup onClose={() => setPopupOpen(false)} />}

      {/* 3D Gold Cursor */}
      <GoldCursor3D />
    </section>
  );
}
