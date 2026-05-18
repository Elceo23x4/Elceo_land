import { useEffect, useState, isValidElement, cloneElement } from "react";
import "../styles/hero.css";
import RetroComputerPopup from "./RetroComputerPopup";
import HeroNav from "./HeroNav";
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

// ── Tape text content ────────────────────────────────────────────────────────
const TAPE_TEXT =
  "DATA DRIVES THE MARKET \u2022 TRADE SMART \u2022 STAY INFORMED \u2022 DON\u2019T GAMBLE \u2022 ";

// ── Hero Section Component ───────────────────────────────────────────────────
export default function HeroSection() {
  const scale = useHeroScale();
  const viewportWidth = useViewportWidth();
  const [popupOpen, setPopupOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Dynamic tape sizing: tape spans full viewport width inside the stage
  const tapeBleed = 120;
  const tapeWidth = viewportWidth / scale + tapeBleed;
  const tapeLeft = (1920 - tapeWidth) / 2;

  // Nav centering on desktop
  const NAV_WIDTH = 797;
  const navLeft = (1920 - NAV_WIDTH) / 2;

  const motionClass = prefersReducedMotion ? "motion-reduced" : "motion-enabled";

  return (
    <section className={`hero ${motionClass}`} aria-label="ELCEO Hero">
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

        {/* Layer 7: HUD Annotations */}
        <PositionedSvgAsset
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

        {/* Click-here arrow */}
        <div className="click-here-arrow" aria-hidden="true">
          <svg
            viewBox="0 0 120 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="click-here-svg"
          >
            <path
              d="M10 58 C 30 52, 60 38, 90 20 C 95 17, 100 14, 108 12"
              stroke="rgba(255,106,0,0.85)"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M98 8 L110 12 L100 20"
              stroke="rgba(255,106,0,0.85)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span className="click-here-text">click here</span>
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
            <span className="tape-text-content">{TAPE_TEXT.repeat(8)}</span>
            <span className="tape-text-content">{TAPE_TEXT.repeat(8)}</span>
          </div>
        </div>
      </div>

      {/* Retro Computer Popup */}
      {popupOpen && <RetroComputerPopup onClose={() => setPopupOpen(false)} />}
    </section>
  );
}
