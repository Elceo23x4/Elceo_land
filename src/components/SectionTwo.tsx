import { useEffect, useState } from "react";
import PocketLeft from "../assets/source/section2/pocket_l.svg?react";
import PocketRight from "../assets/source/section2/pocket_r.svg?react";
import TieGraphic from "../assets/source/section2/tie.svg?react";
import "../styles/section-two.css";

// ── Hooks ────────────────────────────────────────────────────────────────────
function useStageScale() {
  const [scale, setScale] = useState(() =>
    Math.min(window.innerWidth / 1920, window.innerHeight / 1080)
  );
  useEffect(() => {
    const h = () => setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return scale;
}

function useViewportWidth() {
  const [vw, setVw] = useState(() => window.innerWidth);
  useEffect(() => {
    const h = () => setVw(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return vw;
}

// ── Flipbook Panel ───────────────────────────────────────────────────────────
function FlipPanel({ pages }: { pages: React.ReactNode[] }) {
  const [idx, setIdx] = useState(0);
  const [anim, setAnim] = useState("");
  const flip = (dir: number) => {
    setAnim("s2-page-exit");
    setTimeout(() => {
      setIdx((i) => (i + dir + pages.length) % pages.length);
      setAnim("s2-page-enter");
    }, 280);
  };
  return (
    <>
      <div className={`s2-page ${anim}`}>{pages[idx]}</div>
      <div className="s2-flip-controls">
        <button className="s2-flip-btn s2-flip-btn-prev" onClick={() => flip(-1)} aria-label="Previous" type="button"><span>&lsaquo;</span></button>
        <button className="s2-flip-btn" onClick={() => flip(1)} aria-label="Next" type="button"><span>&rsaquo;</span></button>
      </div>
    </>
  );
}

// ── Gallery Chart Visuals ────────────────────────────────────────────────────
function ChartVisual({ type }: { type: number }) {
  if (type === 0) return (
    <svg viewBox="0 0 200 100" style={{ width: "85%", height: "70%" }}>
      <polyline points="10,80 30,60 50,65 70,40 90,45 110,25 130,35 150,20 170,30 190,15" fill="none" stroke="#ff6a00" strokeWidth="2.5" strokeLinecap="round" />
      <polyline points="10,85 30,75 50,78 70,60 90,62 110,50 130,55 150,48 170,52 190,42" fill="none" stroke="rgba(255,106,0,0.3)" strokeWidth="1.5" />
      {[30,70,110,150].map((x,i) => <rect key={i} x={x-3} y={40+i*5} width="6" height={30-i*5} fill={i%2===0?"#00c853":"#e02020"} opacity="0.6" rx="1" />)}
    </svg>
  );
  if (type === 1) return (
    <svg viewBox="0 0 200 100" style={{ width: "85%", height: "70%" }}>
      {Array.from({length:40},(_,i)=><circle key={i} cx={20+(i*4)%160} cy={15+(i*7)%70} r={1.5+(i%3)*0.5} fill="#ff6a00" opacity={0.2+(i%5)*0.12} />)}
      <circle cx="100" cy="50" r="30" fill="none" stroke="rgba(255,106,0,0.3)" strokeWidth="1" />
      <circle cx="100" cy="50" r="18" fill="none" stroke="rgba(255,106,0,0.2)" strokeWidth="0.8" />
    </svg>
  );
  if (type === 2) return (
    <svg viewBox="0 0 200 100" style={{ width: "85%", height: "70%" }}>
      {[20,50,80,110,140,170].map((x,i)=><rect key={i} x={x} y={60-i*6} width="14" height={20+i*8} fill="#ff6a00" opacity={0.3+i*0.1} rx="2" />)}
      <line x1="15" y1="85" x2="190" y2="85" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    </svg>
  );
  return (
    <svg viewBox="0 0 200 100" style={{ width: "85%", height: "70%" }}>
      <circle cx="100" cy="50" r="35" fill="none" stroke="#ff6a00" strokeWidth="2" opacity="0.4" />
      <path d="M100 15 A35 35 0 0 1 135 50" fill="none" stroke="#ff6a00" strokeWidth="3" strokeLinecap="round" />
      <path d="M100 15 A35 35 0 0 0 72 30" fill="none" stroke="#e02020" strokeWidth="3" strokeLinecap="round" />
      <text x="100" y="55" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700">73%</text>
    </svg>
  );
}

function GalleryViewer() {
  const [active, setActive] = useState(0);
  const labels = ["Candlestick Chart", "World Map", "Macro Dashboard", "Risk Gauge"];
  return (
    <div className="s2-gallery">
      <p className="s2-gallery-title">MARKET VISUALIZER</p>
      <p className="s2-gallery-sub">Real-time charts. Multi-asset intelligence.</p>
      <div className="s2-gallery-main">
        <div className="s2-gallery-slide"><ChartVisual type={active} /></div>
        <div className="s2-gallery-arrows">
          <button className="s2-gallery-arrow s2-gallery-arrow-prev" onClick={() => setActive((a) => (a - 1 + 4) % 4)} type="button"><span>&lsaquo;</span></button>
          <button className="s2-gallery-arrow" onClick={() => setActive((a) => (a + 1) % 4)} type="button"><span>&rsaquo;</span></button>
        </div>
      </div>
      <div className="s2-gallery-thumbs">
        {labels.map((l, i) => (
          <div key={i} className={`s2-gallery-thumb ${i === active ? "active" : ""}`} onClick={() => setActive(i)} title={l}>
            <svg viewBox="0 0 52 36" style={{width:"100%",height:"100%"}}><rect width="52" height="36" fill="#0a0a0a" /><ChartVisual type={i} /></svg>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Marquee ──────────────────────────────────────────────────────────────────
const INST = ["HSBC","Barclays","JPMorgan","Goldman Sachs","Morgan Stanley","Citigroup","Deutsche Bank","UBS","BNP Paribas","Société Générale","Bank of America","Wells Fargo","BlackRock","Vanguard","State Street"];

function InstitutionMarquee() {
  const items = [...INST, ...INST, ...INST, ...INST];
  return (
    <div className="s2-marquee-track">
      {items.map((name, i) => (
        <span className="s2-marquee-item" key={i}>
          {name}<span className="s2-marquee-dot" />
        </span>
      ))}
    </div>
  );
}

// ── Pocket Content Pages ─────────────────────────────────────────────────────
function PocketLeftTopPage1() {
  return (<>
    <p className="s2-panel-title">PREMIUM MACRO EVENTS</p>
    <div className="s2-panel-body">
      <div className="s2-event-row"><span className="s2-event-date">MAY 15</span><span className="s2-event-label">FOMC Interest Rate Decision</span><span className="s2-event-badge s2-badge-high">HIGH</span></div>
      <div className="s2-event-row"><span className="s2-event-date">MAY 16</span><span className="s2-event-label">US CPI (YoY)</span><span className="s2-event-badge s2-badge-high">HIGH</span></div>
      <div className="s2-event-row"><span className="s2-event-date">MAY 21</span><span className="s2-event-label">ECB Interest Rate Decision</span><span className="s2-event-badge s2-badge-medium">MEDIUM</span></div>
      <div className="s2-event-row"><span className="s2-event-date">MAY 23</span><span className="s2-event-label">US PMI Manufacturing</span><span className="s2-event-badge s2-badge-medium">MEDIUM</span></div>
      <div className="s2-event-row"><span className="s2-event-date">MAY 28</span><span className="s2-event-label">GDP Growth Rate (QoQ)</span><span className="s2-event-badge s2-badge-medium">MEDIUM</span></div>
    </div>
    <p className="s2-panel-footer">Markets price the future. We decode the why behind the move.</p>
  </>);
}

function PocketLeftTopPage2() {
  return (<>
    <p className="s2-panel-title">CENTRAL BANK WATCH</p>
    <div className="s2-panel-body">
      <div className="s2-event-row"><span className="s2-event-date">FED</span><span className="s2-event-label">Holding — hawkish bias</span><span className="s2-event-badge s2-badge-high">WATCH</span></div>
      <div className="s2-event-row"><span className="s2-event-date">ECB</span><span className="s2-event-label">Easing cycle underway</span><span className="s2-event-badge s2-badge-medium">SHIFT</span></div>
      <div className="s2-event-row"><span className="s2-event-date">BOJ</span><span className="s2-event-label">Rate normalization</span><span className="s2-event-badge s2-badge-medium">PIVOT</span></div>
      <div className="s2-event-row"><span className="s2-event-date">BOE</span><span className="s2-event-label">Data-dependent pause</span><span className="s2-event-badge s2-badge-medium">HOLD</span></div>
    </div>
    <p className="s2-panel-footer">Track policy shifts before they hit price.</p>
  </>);
}

function PocketLeftBottomPage1() {
  return (<>
    <p className="s2-panel-title">MARKET HEADLINES</p>
    <div className="s2-panel-body">
      <div className="s2-headline-row"><span className="s2-headline-time">09.42</span><span className="s2-headline-text">Fed Minutes Signal Caution on Rate Cuts Amid Sticky Inflation</span></div>
      <div className="s2-headline-row"><span className="s2-headline-time">08.31</span><span className="s2-headline-text">Oil Prices Climb on Supply Concerns and Geopolitical Tension</span></div>
      <div className="s2-headline-row"><span className="s2-headline-time">07.05</span><span className="s2-headline-text">Tech Stocks Lead Rally as Earnings Exceed Expectations</span></div>
    </div>
    <p className="s2-panel-footer">More insights. More context. Better decisions.</p>
  </>);
}

function PocketLeftBottomPage2() {
  return (<>
    <p className="s2-panel-title">VOLATILITY NOTES</p>
    <div className="s2-panel-body">
      <div className="s2-headline-row"><span className="s2-headline-time">VIX</span><span className="s2-headline-text">Elevated — 18.4 (+2.1) risk appetite cooling</span></div>
      <div className="s2-headline-row"><span className="s2-headline-time">MOVE</span><span className="s2-headline-text">Bond vol rising — watch Treasury auctions</span></div>
      <div className="s2-headline-row"><span className="s2-headline-time">SKEW</span><span className="s2-headline-text">Put demand increasing on S&P — hedging flows</span></div>
    </div>
    <p className="s2-panel-footer">Volatility is the market thinking out loud.</p>
  </>);
}

// ── Main Section Component ───────────────────────────────────────────────────
export default function SectionTwo() {
  const scale = useStageScale();
  const vw = useViewportWidth();

  // Dynamic marquee width to span viewport edges
  const marqueeWidth = vw / scale + 240;
  const marqueeLeft = (1920 - marqueeWidth) / 2;

  return (
    <section className="section-two" aria-label="Market Reasoning">
      <div className="section-two-stage" style={{ "--s2-scale": scale } as React.CSSProperties}>
        {/* Pocket Left */}
        <div className="s2-pocket-l" style={{ position: "absolute", left: 24, top: -34, width: 830, height: 997 }}>
          <PocketLeft preserveAspectRatio="none" />
        </div>

        {/* Pocket Right */}
        <div className="s2-pocket-r" style={{ position: "absolute", left: 1081, top: -33, width: 830, height: 996 }}>
          <PocketRight preserveAspectRatio="none" />
        </div>

        {/* Tie */}
        <div className="s2-tie" style={{ position: "absolute", left: 886, top: 447, width: 151, height: 508 }}>
          <TieGraphic preserveAspectRatio="xMidYMid meet" />
        </div>

        {/* Center Text Boxes */}
        <div className="s2-center-box" style={{ left: 886, top: 88, width: 163, height: 71 }}>
          <span className="s2-center-elceo">ELCEO</span>
        </div>
        <div className="s2-center-box" style={{ left: 830, top: 190, width: 257, height: 115 }}>
          <span className="s2-center-engine">MARKET<br/>REASONING<br/>ENGINE</span>
        </div>
        <div className="s2-center-box" style={{ left: 904, top: 334, width: 122, height: 81 }}>
          <span className="s2-center-tagline">Context.<br/>Clarity.<br/>Confidence.</span>
        </div>

        {/* Pocket Left Top Content */}
        <div className="s2-content-panel" style={{ left: 149, top: 139, width: 582, height: 335, padding: "12px 16px" }}>
          <FlipPanel pages={[<PocketLeftTopPage1 />, <PocketLeftTopPage2 />]} />
        </div>

        {/* Pocket Left Bottom Content */}
        <div className="s2-content-panel" style={{ left: 147, top: 481, width: 584, height: 328, padding: "12px 16px" }}>
          <FlipPanel pages={[<PocketLeftBottomPage1 />, <PocketLeftBottomPage2 />]} />
        </div>

        {/* Pocket Right Content — Gallery */}
        <div className="s2-content-panel" style={{ left: 1204, top: 141, width: 582, height: 670, padding: "12px 16px" }}>
          <GalleryViewer />
        </div>

        {/* Institution Marquee — dynamic full-bleed */}
        <div className="s2-marquee-wrap" style={{ left: marqueeLeft, top: 965.83, width: marqueeWidth, height: 102, transform: "rotate(-1.42deg)" }}>
          <InstitutionMarquee />
        </div>
      </div>
    </section>
  );
}
