import '../styles/hero.css';
import { SOURCE } from '../utils/assetPaths';

// ─── Types ────────────────────────────────────────────────────────────────────

interface HudAnnotation {
  id: number;
  title: string;
  body: string;
  posClass: string;
}

interface TapeWord {
  label: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: 'HOME',    active: true  },
  { label: 'PRICING', active: false },
  { label: 'ABOUT',   active: false },
  { label: 'FAQ',     active: false },
  { label: 'LOGIN',   active: false },
] as const;

const ELCEO_LETTERS = ['E', 'L', 'C', 'E', 'O'] as const;

const HUD_ANNOTATIONS: HudAnnotation[] = [
  {
    id: 1,
    title: 'MARKET REASONING',
    body:  'Real-time synthesis of price action, news, macro, and sentiment for clear market narratives.',
    posClass: 'hud-box--1',
  },
  {
    id: 2,
    title: 'MACRO CONTEXT',
    body:  'Track macro events, central bank signals, and policy shifts that drive global markets.',
    posClass: 'hud-box--2',
  },
  {
    id: 3,
    title: 'EXECUTION INTELLIGENCE',
    body:  'Identify high-probability setups with precision entries, invalidation levels, and targets.',
    posClass: 'hud-box--3',
  },
  {
    id: 4,
    title: 'ADAPTIVE RISK',
    body:  'Dynamic risk modeling that adapts to volatility, liquidity, and regime changes in real time.',
    posClass: 'hud-box--4',
  },
  {
    id: 5,
    title: 'INSTITUTIONAL-GRADE REASONING',
    body:  'Built for professionals. Powered by advanced models and institutional data infrastructure.',
    posClass: 'hud-box--5',
  },
  {
    id: 6,
    title: 'CROSS-ASSET AWARENESS',
    body:  'Synthesize signals across forex, equities, crypto, commodities, and fixed income.',
    posClass: 'hud-box--6',
  },
];

const TAPE_WORDS: TapeWord[] = [
  { label: 'REASON'    },
  { label: 'CONTEXT'   },
  { label: 'EXECUTION' },
  { label: 'MACRO'     },
  { label: 'SIGNALS'   },
];

// We duplicate the tape words so the CSS marquee loops seamlessly.
const TAPE_TRACK = [...TAPE_WORDS, ...TAPE_WORDS, ...TAPE_WORDS, ...TAPE_WORDS];

// ─── Sub-components ───────────────────────────────────────────────────────────

function HeroNav() {
  return (
    <nav className="hero__nav" aria-label="Primary navigation">
      <ul className="hero__nav-list">
        {NAV_ITEMS.map(({ label, active }) => (
          <li key={label}>
            <button
              className={`hero__nav-item${active ? ' hero__nav-item--active' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function VerticalLogo() {
  return (
    <div className="hero__logo" aria-label="ELCEO">
      <div className="hero__logo-letters">
        {ELCEO_LETTERS.map((letter, i) => (
          <span key={`${letter}-${i}`} className="hero__logo-letter">
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}

function CentreWheel() {
  return (
    <div className="hero__centre">
      <div className="hero__wheel-wrap">
        {/* Outer wheel — no CTA */}
        <img
          className="hero__wheel-no-cta"
          src={SOURCE.heroWheelNoCta}
          alt="ELCEO hero wheel graphic"
          draggable={false}
        />
        {/* CTA button overlay — centred on the wheel */}
        <img
          className="hero__wheel-cta"
          src={SOURCE.heroWheelCta}
          alt="Explore ELCEO"
          draggable={false}
          role="button"
          tabIndex={0}
          aria-label="Explore ELCEO"
        />
      </div>
    </div>
  );
}

/** Hand-drawn style "CLICK HERE" arrow pointing upward-left toward the retro computer */
function ClickHereArrow() {
  return (
    <div className="hero__click-label" aria-hidden="true">
      <span className="hero__click-text">CLICK HERE</span>
      {/*
        Inline SVG arrow — deliberately wobbly / hand-drawn feel.
        No framer-motion / GSAP. Pure static SVG path.
      */}
      <svg
        className="hero__click-arrow"
        viewBox="0 0 52 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Curved shaft */}
        <path
          d="M 44 32 C 36 28, 20 22, 8 6"
          stroke="#ff6a00"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          /* slight irregularity */
          pathLength="1"
        />
        {/* Arrowhead */}
        <path
          d="M 8 6 L 14 10 M 8 6 L 12 13"
          stroke="#ff6a00"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

function RetroComputer() {
  return (
    <div className="hero__retro-wrap">
      <img
        className="hero__retro-img"
        src={SOURCE.retroComputerLogo}
        alt="Market Reasoning OS — retro computer"
        draggable={false}
      />
      <ClickHereArrow />
    </div>
  );
}

function HudAnnotations() {
  return (
    <div className="hero__hud-grid" aria-label="Feature annotations" role="list">
      {HUD_ANNOTATIONS.map(({ id, title, body, posClass }) => (
        <article
          key={id}
          className={`hud-box ${posClass}`}
          role="listitem"
        >
          {/* Small numeric index — HUD aesthetic */}
          <p className="hud-box__title">
            <span style={{ color: 'rgba(255,106,0,0.45)', marginRight: '5px', fontFamily: 'var(--font-dot)' }}>
              {String(id).padStart(2, '0')}
            </span>
            {title}
          </p>
          <p className="hud-box__body">{body}</p>
        </article>
      ))}
    </div>
  );
}

function WarningTape() {
  return (
    <div className="hero__tape" aria-hidden="true">
      <div className="hero__tape-track">
        {TAPE_TRACK.map(({ label }, i) => (
          <span key={`${label}-${i}`} className="hero__tape-segment">
            <span className="hero__tape-word">{label}</span>
            <span className="hero__tape-bullet">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <section className="hero" aria-label="Hero">
      {/* Dot-matrix background texture */}
      <div className="hero__texture" aria-hidden="true" />

      {/* Top-centre navigation */}
      <HeroNav />

      {/* Three-column stage: Logo | Wheel | Retro Computer */}
      <div className="hero__stage">
        <VerticalLogo />
        <CentreWheel />
        <RetroComputer />

        {/* HUD annotation boxes — absolutely positioned over the stage */}
        <HudAnnotations />
      </div>

      {/* Warning tape strip — sits at the bottom of the stage area */}
      <WarningTape />
    </section>
  );
}
