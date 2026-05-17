import { useEffect, useRef, useState, useCallback } from "react";
import s from "./Hero.module.css";
import RetroComputerPopup from "./RetroComputerPopup";

/* ── SVGR inline imports ───────────────────────────────────────────────────────
   Each ?react import returns a React component that renders an inline <svg>.
   NO <img> tags. The SVG is injected directly into the DOM as an SVG element.
   This is required for Batch 2 GSAP animation targeting of internal paths/rings.
   ──────────────────────────────────────────────────────────────────────────── */
import HeroWheelNoCta  from "../assets/source/hero/hero_wheel_no_cta.svg?react";
import HeroWheelCta    from "../assets/source/hero/hero_wheel_cta.svg?react";
import HudAnnotation3  from "../assets/source/hero/hud_annotation_3.svg?react";
import HudAnnotation4  from "../assets/source/hero/hud_annotation_4.svg?react";
import HudAnnotation5  from "../assets/source/hero/hud_annotation_5.svg?react";
import HudAnnotation6  from "../assets/source/hero/hud_annotation_6.svg?react";
import RetroComputerLogo from "../assets/source/hero/retro_computer_logo.svg?react";
import VerticalLogo1   from "../assets/source/hero/vertical_logo_1.svg?react";
import VerticalLogo2   from "../assets/source/hero/vertical_logo_2.svg?react";
import WheelSide       from "../assets/source/hero/wheel_side.svg?react";
import YellowTape      from "../assets/source/hero/yellow_tape.svg?react";
import NavBar          from "../assets/source/hero/nav_bar.svg?react";

/* ── Scale hook ────────────────────────────────────────────────────────────── */
function useHeroScale() {
  const calc = () =>
    Math.min(window.innerWidth / 1920, window.innerHeight / 1080);

  const [scale, setScale] = useState<number>(calc);

  useEffect(() => {
    const onResize = () => setScale(calc());
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return scale;
}

/* ── Tape marquee content (doubled for seamless loop) ──────────────────────── */
const TAPE_SEGMENT =
  "DATA DRIVES THE MARKET  •  TRADE SMART  •  STAY INFORMED  •  DON'T GAMBLE  •  ";
const TAPE_CONTENT = TAPE_SEGMENT + TAPE_SEGMENT;

/* ── Component ─────────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const scale = useHeroScale();
  const stageRef = useRef<HTMLDivElement>(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const openPopup  = useCallback(() => setPopupOpen(true),  []);
  const closePopup = useCallback(() => setPopupOpen(false), []);

  return (
    <>
      {/* ── Viewport shell ──────────────────────────────────── */}
      <section className={s.hero} aria-label="ELCEO Hero">

        {/* Cinematic background — no image, pure CSS */}
        <div className={s.heroBg} aria-hidden="true" />

        {/* ── 1920 × 1080 stage ─────────────────────────────── */}
        <div
          ref={stageRef}
          className={s.heroStage}
          style={{ "--heroScale": scale } as React.CSSProperties}
        >

          {/* ════════════════════════════════════════════════════
              LAYER 3 — Vertical Logo 1   z-index: 3
              LAYER 4 — Vertical Logo 2   z-index: 4
              Both share the exact same left/top coordinates.
              The double-render creates visual thickness.
              ════════════════════════════════════════════════════ */}
          <div className={`${s.asset} ${s.verticalLogo1}`}>
            <VerticalLogo1 aria-hidden="true" />
          </div>
          <div className={`${s.asset} ${s.verticalLogo2}`}>
            <VerticalLogo2 aria-hidden="true" />
          </div>

          {/* ════════════════════════════════════════════════════
              LAYER 5 — Main wheel   z-index: 5
              Coord: 987×964  left:171  top:3
              ════════════════════════════════════════════════════ */}
          <div className={`${s.asset} ${s.wheel}`}>
            <HeroWheelNoCta
              className="hero-wheel-ring"
              aria-hidden="true"
            />
          </div>

          {/* ════════════════════════════════════════════════════
              LAYER 6 — Wheel-side city panel   z-index: 6
              Coord: 332×294  left:855  top:17
              overflow:hidden + mix-blend-mode:lighten (CSS)
              removes the solid #F8F8F8 background path.
              ════════════════════════════════════════════════════ */}
          <div className={`${s.asset} ${s.wheelSide}`}>
            <WheelSide aria-hidden="true" />
          </div>

          {/* ════════════════════════════════════════════════════
              LAYER 7 — HUD annotation line SVGs   z-index: 7
              ════════════════════════════════════════════════════ */}
          <div className={`${s.asset} ${s.hud3}`}>
            <HudAnnotation3 className="hud-line" aria-hidden="true" />
          </div>
          <div className={`${s.asset} ${s.hud4}`}>
            <HudAnnotation4 className="hud-line" aria-hidden="true" />
          </div>
          <div className={`${s.asset} ${s.hud5}`}>
            <HudAnnotation5 className="hud-line" aria-hidden="true" />
          </div>
          <div className={`${s.asset} ${s.hud6}`}>
            <HudAnnotation6 className="hud-line" aria-hidden="true" />
          </div>

          {/* ════════════════════════════════════════════════════
              LAYER 8 — HUD text boxes   z-index: 8
              Contained within their exact measured boxes.
              "Market", "Risk", and "Logic" get .mark highlight.
              ════════════════════════════════════════════════════ */}

          {/* HUD 3 — top-right: MARKET PRESSURE */}
          <div className={`${s.hudText} ${s.hudText3}`}>
            <span className={s.hudTitle}>MARKET PRESSURE</span>
            <span className={s.hudBody}>
              Price action, macro flow, liquidity, and{" "}
              <span className={s.mark}>risk</span> context in one reasoning layer.
            </span>
          </div>

          {/* HUD 4 — bottom-left: RISK MAPPING */}
          <div className={`${s.hudText} ${s.hudText4}`}>
            <span className={s.hudTitle}>RISK MAPPING</span>
            <span className={s.hudBody}>
              See volatility, invalidation, exposure pressure, and{" "}
              <span className={s.mark}>market</span> uncertainty before acting.
            </span>
          </div>

          {/* HUD 5 — left vertical: MARKET COGNITION */}
          <div className={`${s.hudText} ${s.hudText5}`}>
            <span className={s.hudTitle}>MARKET COGNITION</span>
            <span className={s.hudBody}>
              ELCEO turns scattered{" "}
              <span className={s.mark}>market</span> evidence into readable trader
              context.
            </span>
          </div>

          {/* HUD 6 — right vertical: CROSS-ASSET LOGIC */}
          <div className={`${s.hudText} ${s.hudText6}`}>
            <span className={s.hudTitle}>CROSS-ASSET LOGIC</span>
            <span className={s.hudBody}>
              Connect FX, gold, indices, crypto, macro events and sentiment
              without gaps in{" "}
              <span className={s.mark}>logic</span>.
            </span>
          </div>

          {/* ════════════════════════════════════════════════════
              LAYER 9 — CTA   z-index: 9
              Coord: 300×97  left:513  top:425
              Sits above the wheel. Wraps inline SVG in an anchor.
              ════════════════════════════════════════════════════ */}
          <a
            href="/login"
            className={`${s.asset} ${s.cta}`}
            aria-label="Login to ELCEO"
          >
            <HeroWheelCta />
          </a>

          {/* ════════════════════════════════════════════════════
              LAYER 10 — Nav bar SVG   z-index: 10
              Coord: 797×43  left:262  top:-72
              ════════════════════════════════════════════════════ */}
          <div className={`${s.asset} ${s.navBarSvg}`} aria-hidden="true">
            <NavBar />
          </div>

          {/* HTML nav overlay — same bounding box, interactive */}
          <nav className={s.navOverlay} aria-label="Primary navigation">
            <a href="/"        className={`${s.navItem} ${s.navItemActive}`}>HOME</a>
            <a href="/pricing" className={s.navItem}>PRICING</a>
            <a href="/about"   className={s.navItem}>ABOUT</a>
            <a href="/faq"     className={s.navItem}>FAQ</a>
            <a href="/login"   className={s.navItem}>LOGIN</a>
          </nav>

          {/* ════════════════════════════════════════════════════
              LAYER 11 — Retro computer button   z-index: 11
              Coord: 123×95  left:1448  top:-82
              background:transparent — SVG has gradient-based
              dark bg, no solid rect to remove.
              ════════════════════════════════════════════════════ */}
          <button
            className={s.retroBtn}
            onClick={openPopup}
            aria-label="Open Market Reasoning OS terminal"
            type="button"
          >
            <RetroComputerLogo />
          </button>

          {/* ════════════════════════════════════════════════════
              LAYER 12 — Click-here arrow   z-index: 12
              ════════════════════════════════════════════════════ */}
          <div className={s.clickHere} aria-hidden="true">
            <span className={s.clickHereText}>click here</span>
            {/* Hand-drawn orange arrow pointing toward the retro computer */}
            <svg
              viewBox="0 0 46 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: 46, height: 34, display: "block", overflow: "visible" }}
            >
              <path
                d="M 4 28 C 10 25 22 16 38 4"
                stroke="#ff6a00"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M 38 4 L 27 8 M 38 4 L 37 15"
                stroke="#ff6a00"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* ════════════════════════════════════════════════════
              LAYER 13 — Yellow tape SVG   z-index: 50  (topmost)
              Coord: 1948×300  left:-353.4  top:727  rot:356.8°
              ════════════════════════════════════════════════════ */}
          <div className={`${s.asset} ${s.tapeSvg}`} aria-hidden="true">
            <YellowTape />
          </div>

          {/* ════════════════════════════════════════════════════
              LAYER 14 — Tape marquee text   z-index: 51
              display:flex + align-items:center → dead-center vertical.
              font: Bebas Neue.  color: dark brown on yellow tape.
              ════════════════════════════════════════════════════ */}
          <div className={s.tapeMarqueeWrap} aria-hidden="true">
            <div className={s.tapeMarquee}>{TAPE_CONTENT}</div>
          </div>

        </div>{/* end .heroStage */}
      </section>

      {/* Terminal popup renders outside the stage (full-viewport fixed) */}
      {popupOpen && <RetroComputerPopup onClose={closePopup} />}
    </>
  );
}
