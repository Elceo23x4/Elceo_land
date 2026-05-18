import { useEffect, useState } from "react";
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

  return (
    <div className={`positioned-asset ${className}`} style={style}>
      {children}
    </div>
  );
}

// ── Scale hook ───────────────────────────────────────────────────────────────
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

// ── Hero Section Component ───────────────────────────────────────────────────
export default function HeroSection() {
  const scale = useHeroScale();

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
          left={-299}
          top={8}
          zIndex={3}
        >
          <VerticalLogo1 />
        </PositionedSvgAsset>

        {/* Layer 4: Vertical Logo 2 */}
        <PositionedSvgAsset
          className="asset-vertical-logo asset-vertical-logo-2"
          width={104}
          height={823}
          left={-290}
          top={17}
          zIndex={4}
        >
          <VerticalLogo2 />
        </PositionedSvgAsset>

        {/* Layer 5: Main Wheel (no CTA) */}
        <PositionedSvgAsset
          className="asset-hero-wheel"
          width={987}
          height={964}
          left={171}
          top={3}
          zIndex={5}
        >
          <HeroWheelNoCta />
        </PositionedSvgAsset>

        {/* Layer 6: Wheel Side */}
        <PositionedSvgAsset
          className="asset-wheel-side"
          width={332}
          height={294}
          left={855}
          top={-17}
          zIndex={6}
        >
          <WheelSide />
        </PositionedSvgAsset>

        {/* Layer 7: HUD Annotations */}
        <PositionedSvgAsset
          width={427}
          height={330}
          left={1083}
          top={117}
          zIndex={7}
        >
          <HudAnnotation3 />
        </PositionedSvgAsset>

        <PositionedSvgAsset
          width={642}
          height={243}
          left={-192.23}
          top={529}
          rotation={180.36}
          zIndex={7}
        >
          <HudAnnotation4 />
        </PositionedSvgAsset>

        <PositionedSvgAsset
          width={440}
          height={517}
          left={-101.22}
          top={9.17}
          rotation={90.07}
          zIndex={7}
        >
          <HudAnnotation5 />
        </PositionedSvgAsset>

        <PositionedSvgAsset
          width={438}
          height={496}
          left={1036.15}
          top={231.17}
          rotation={270.04}
          zIndex={7}
        >
          <HudAnnotation6 />
        </PositionedSvgAsset>

        {/* Layer 8: CTA Button */}
        <PositionedSvgAsset
          className="asset-hero-wheel-cta"
          width={300}
          height={97}
          left={513}
          top={425}
          zIndex={8}
        >
          <HeroWheelCta />
        </PositionedSvgAsset>

        {/* Layer 9: Nav Bar */}
        <PositionedSvgAsset
          className="asset-nav-bar"
          width={797}
          height={43}
          left={262}
          top={-72}
          zIndex={9}
        >
          <NavBar />
        </PositionedSvgAsset>

        {/* Layer 10: Retro Computer Logo */}
        <PositionedSvgAsset
          className="asset-retro-computer"
          width={123}
          height={95}
          left={1448}
          top={-82}
          zIndex={10}
        >
          <RetroComputerLogo />
        </PositionedSvgAsset>

        {/* Layer 11: Yellow Tape */}
        <PositionedSvgAsset
          className="asset-yellow-tape"
          width={1948}
          height={300}
          left={-353.4}
          top={727}
          rotation={356.8}
          zIndex={11}
        >
          <YellowTape />
        </PositionedSvgAsset>
      </div>
    </section>
  );
}
