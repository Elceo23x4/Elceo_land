import { useEffect, useState, isValidElement, cloneElement } from "react";
import "../styles/hero.css";

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
import NavBar from "../assets/source/hero/nav_bar.svg?react";
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

// ── Hero Section Component ───────────────────────────────────────────────────
export default function HeroSection() {
  const scale = useHeroScale();
  const viewportWidth = useViewportWidth();

  // Dynamic tape sizing: tape spans full viewport width inside the stage
  const tapeBleed = 120;
  const tapeWidth = viewportWidth / scale + tapeBleed;
  const tapeLeft = (1920 - tapeWidth) / 2;

  return (
    <section className="hero" aria-label="ELCEO Hero">
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
          left={49}
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
          left={58}
          top={118}
          zIndex={4}
        >
          <VerticalLogo2 />
        </PositionedSvgAsset>

        {/* Layer 5: Main Wheel (no CTA) */}
        <PositionedSvgAsset
          className="asset-hero-wheel"
          width={987}
          height={964}
          left={519}
          top={104}
          zIndex={5}
        >
          <HeroWheelNoCta />
        </PositionedSvgAsset>

        {/* Layer 4: Wheel Side (behind hero wheel) */}
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

        {/* Layer 7: HUD Annotations */}
        <PositionedSvgAsset
          width={427}
          height={330}
          left={1431}
          top={218}
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

        {/* Layer 8: CTA Button */}
        <PositionedSvgAsset
          className="asset-hero-wheel-cta"
          width={300}
          height={97}
          left={861}
          top={526}
          zIndex={8}
        >
          <HeroWheelCta />
        </PositionedSvgAsset>

        {/* Layer 9: Nav Bar */}
        <PositionedSvgAsset
          className="asset-nav-bar"
          width={797}
          height={43}
          left={610}
          top={29}
          zIndex={9}
        >
          <NavBar />
        </PositionedSvgAsset>

        {/* Layer 10: Retro Computer Logo */}
        <PositionedSvgAsset
          className="asset-retro-computer"
          width={123}
          height={95}
          left={1796}
          top={19}
          zIndex={10}
        >
          <RetroComputerLogo />
        </PositionedSvgAsset>

        {/* Layer 11: Yellow Tape (dynamic width to span viewport) */}
        <PositionedSvgAsset
          className="asset-yellow-tape"
          width={tapeWidth}
          height={190}
          left={tapeLeft}
          top={860}
          rotation={356.8}
          zIndex={11}
        >
          <YellowTape />
        </PositionedSvgAsset>
      </div>
    </section>
  );
}
