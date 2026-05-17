// ── SVG raw imports (Vite ?raw) ───────────────────────────────────────────────
// These import the SVG file content as a string and inject as innerHTML.
// The result is inline DOM SVGs — identical to the SVGR approach for animation.
import heroWheelNoCta from "./assets/source/hero/hero_wheel_no_cta.svg?raw";
import heroWheelCta from "./assets/source/hero/hero_wheel_cta.svg?raw";
import hudAnnotation3 from "./assets/source/hero/hud_annotation_3.svg?raw";
import hudAnnotation4 from "./assets/source/hero/hud_annotation_4.svg?raw";
import hudAnnotation5 from "./assets/source/hero/hud_annotation_5.svg?raw";
import hudAnnotation6 from "./assets/source/hero/hud_annotation_6.svg?raw";
import retroComputerLogo from "./assets/source/hero/retro_computer_logo.svg?raw";
import verticalLogo1 from "./assets/source/hero/vertical_logo_1.svg?raw";
import verticalLogo2 from "./assets/source/hero/vertical_logo_2.svg?raw";
import wheelSide from "./assets/source/hero/wheel_side.svg?raw";
import yellowTapeSvg from "./assets/source/hero/yellow_tape.svg?raw";
import navBarSvg from "./assets/source/hero/nav_bar.svg?raw";

// ── Scale helper ──────────────────────────────────────────────────────────────
function getScale(): number {
  return Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
}

// ── Asset placement helper ────────────────────────────────────────────────────
interface AssetOptions {
  width: number;
  height: number;
  left: number;
  top: number;
  rotation?: number;
  extraClasses?: string[];
  zIndex?: number;
}

function makeAsset(svgRaw: string, opts: AssetOptions): HTMLDivElement {
  const div = document.createElement("div");
  div.className = ["hero-asset", ...(opts.extraClasses ?? [])].join(" ");
  div.style.width = `${opts.width}px`;
  div.style.height = `${opts.height}px`;
  div.style.left = `${opts.left}px`;
  div.style.top = `${opts.top}px`;
  if (opts.rotation !== undefined) {
    div.style.transform = `rotate(${opts.rotation}deg)`;
    div.style.transformOrigin = "center center";
  }
  if (opts.zIndex !== undefined) {
    div.style.zIndex = String(opts.zIndex);
  }
  div.innerHTML = svgRaw;
  // Ensure the injected SVG fills its wrapper
  const svg = div.querySelector("svg");
  if (svg) {
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.display = "block";
    (svg.style as CSSStyleDeclaration & { overflow: string }).overflow =
      "visible";
  }
  return div;
}

// ── HUD textbox helper ────────────────────────────────────────────────────────
interface HudTextOptions {
  width: number;
  height: number;
  left: number;
  top: number;
  title: string;
  body: string; // HTML string
}

function makeHudText(opts: HudTextOptions): HTMLDivElement {
  const div = document.createElement("div");
  div.className = "hud-textbox";
  div.style.width = `${opts.width}px`;
  div.style.height = `${opts.height}px`;
  div.style.left = `${opts.left}px`;
  div.style.top = `${opts.top}px`;
  div.innerHTML = `
    <div class="hud-textbox-inner">
      <div class="hud-title">${opts.title}</div>
      <div class="hud-body">${opts.body}</div>
    </div>`;
  return div;
}

// ── Retro Computer Popup ──────────────────────────────────────────────────────
const TERMINAL_LINES = [
  { text: "ELCEO MARKET REASONING OS", type: "prompt" },
  { text: "─────────────────────────────────────────", type: "dim" },
  { text: "BOOTING CONTEXT ENGINE...", type: "normal" },
  { text: "LOADING MACRO PRESSURE................. OK", type: "normal" },
  { text: "SCANNING LIQUIDITY MAP................. OK", type: "normal" },
  { text: "CALIBRATING RISK MODEL................. OK", type: "normal" },
  { text: "CROSS-ASSET SYNC....................... OK", type: "normal" },
  { text: "FX + GOLD + INDICES + CRYPTO........... OK", type: "normal" },
  { text: "─────────────────────────────────────────", type: "dim" },
  { text: "RISK MODEL ONLINE", type: "prompt" },
  { text: "SESSION READY", type: "prompt" },
  { text: "─────────────────────────────────────────", type: "dim" },
  { text: "$ elceo --start-session --mode=full", type: "normal" },
  { text: "", type: "normal" },
  { text: "Waiting for input...", type: "dim" },
];

function openPopup(): void {
  const overlay = document.createElement("div");
  overlay.className = "retro-popup-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "ELCEO Market Reasoning OS Terminal");

  const linesHtml = TERMINAL_LINES.map(
    (l) =>
      `<div class="terminal-line ${l.type === "dim" ? "dim" : l.type === "prompt" ? "prompt" : ""}">${l.text}</div>`
  ).join("");

  overlay.innerHTML = `
    <div class="retro-popup-screen">
      <div class="retro-popup-titlebar">
        <span class="retro-popup-title">ELCEO // MARKET REASONING OS — SESSION v1.0</span>
        <button class="retro-popup-close" aria-label="Close terminal">[ESC]</button>
      </div>
      <div class="retro-popup-body">
        ${linesHtml}
        <div class="terminal-line prompt"><span class="terminal-cursor"></span></div>
      </div>
    </div>`;

  const close = () => overlay.remove();

  // Click outside screen
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  // Close button
  overlay.querySelector(".retro-popup-close")?.addEventListener("click", close);

  // Escape key
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      close();
      document.removeEventListener("keydown", onKeyDown);
    }
  };
  document.addEventListener("keydown", onKeyDown);

  document.body.appendChild(overlay);
}

// ── Click-here arrow (inline SVG string) ─────────────────────────────────────
const CLICK_ARROW_SVG = `
<svg viewBox="0 0 46 34" fill="none" xmlns="http://www.w3.org/2000/svg"
     style="width:46px;height:34px;display:block">
  <path d="M 4 28 C 10 26 22 18 38 6"
        stroke="#ff6a00" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M 38 6 L 28 8 M 38 6 L 36 16"
        stroke="#ff6a00" stroke-width="2.2" stroke-linecap="round"/>
</svg>`;

// ── Marquee text ──────────────────────────────────────────────────────────────
const TAPE_TEXT =
  "DATA DRIVES THE MARKET  •  TRADE SMART  •  STAY INFORMED  •  DON'T GAMBLE  •  ";
const MARQUEE_CONTENT = TAPE_TEXT + TAPE_TEXT;

// ── Build the Hero ────────────────────────────────────────────────────────────
function buildHero(): void {
  const root = document.getElementById("root");
  if (!root) return;

  // ── Hero section wrapper
  const section = document.createElement("section");
  section.className = "hero";
  section.setAttribute("aria-label", "ELCEO Hero");

  // ── Background
  const bg = document.createElement("div");
  bg.className = "hero-bg";
  bg.setAttribute("aria-hidden", "true");
  section.appendChild(bg);

  // ── Stage
  const stage = document.createElement("div");
  stage.className = "hero-stage";
  stage.setAttribute("id", "hero-stage");

  // Apply initial scale
  const updateScale = () => {
    stage.style.setProperty("--hero-scale", String(getScale()));
  };
  updateScale();
  window.addEventListener("resize", updateScale);

  // ── LAYER 3 & 4: Vertical logos ──────────────────────────────────────────
  stage.appendChild(
    makeAsset(verticalLogo1, {
      width: 104, height: 823, left: -299, top: 8,
      extraClasses: ["vertical-logo-layer"],
      zIndex: 3,
    })
  );
  stage.appendChild(
    makeAsset(verticalLogo2, {
      width: 104, height: 823, left: -290, top: 17,
      extraClasses: ["vertical-logo-layer", "vertical-logo-2"],
      zIndex: 3,
    })
  );

  // ── LAYER 5: Main wheel ───────────────────────────────────────────────────
  stage.appendChild(
    makeAsset(heroWheelNoCta, {
      width: 987, height: 964, left: 171, top: 3,
      extraClasses: ["hero-wheel"],
      zIndex: 5,
    })
  );

  // ── LAYER 6: Wheel side ───────────────────────────────────────────────────
  stage.appendChild(
    makeAsset(wheelSide, {
      width: 332, height: 294, left: 855, top: 17,
      extraClasses: ["wheel-side"],
      zIndex: 6,
    })
  );

  // ── LAYER 7: HUD annotations ─────────────────────────────────────────────
  stage.appendChild(
    makeAsset(hudAnnotation3, {
      width: 427, height: 330, left: 1083, top: 117,
      extraClasses: ["hud-annotation", "hud-line"],
      zIndex: 7,
    })
  );
  stage.appendChild(
    makeAsset(hudAnnotation4, {
      width: 642, height: 243, left: -192.23, top: 529,
      rotation: 180.36,
      extraClasses: ["hud-annotation", "hud-line"],
      zIndex: 7,
    })
  );
  stage.appendChild(
    makeAsset(hudAnnotation5, {
      width: 440, height: 517, left: -101.22, top: 9.17,
      rotation: 90.07,
      extraClasses: ["hud-annotation", "hud-line"],
      zIndex: 7,
    })
  );
  stage.appendChild(
    makeAsset(hudAnnotation6, {
      width: 438, height: 496, left: 1036.15, top: 231.17,
      rotation: 270.04,
      extraClasses: ["hud-annotation", "hud-line"],
      zIndex: 7,
    })
  );

  // ── LAYER 8: HUD text overlays ────────────────────────────────────────────
  stage.appendChild(
    makeHudText({
      width: 250, height: 105, left: 1244, top: 137,
      title: "MARKET PRESSURE",
      body: `Price action, macro flow, liquidity, and <span class="marker-highlight">risk</span> <span class="marker-highlight">context</span> in one reasoning layer.`,
    })
  );
  stage.appendChild(
    makeHudText({
      width: 256, height: 126, left: -119, top: 595,
      title: "RISK MAPPING",
      body: `See volatility, invalidation, exposure <span class="marker-highlight">pressure</span>, and <span class="marker-highlight">market</span> uncertainty before acting.`,
    })
  );
  stage.appendChild(
    makeHudText({
      width: 140, height: 289, left: -87, top: 88,
      title: "MARKET COGNITION",
      body: `ELCEO turns scattered <span class="marker-highlight">market</span> evidence into readable trader context.`,
    })
  );
  stage.appendChild(
    makeHudText({
      width: 134, height: 297, left: 1304, top: 337,
      title: "CROSS-ASSET LOGIC",
      body: `Connect FX, gold, indices, crypto, macro events, and sentiment without <span class="marker-highlight">logic</span> gaps.`,
    })
  );

  // ── LAYER 9: CTA button ───────────────────────────────────────────────────
  const ctaWrapper = document.createElement("div");
  ctaWrapper.className = "hero-asset hero-wheel-cta";
  ctaWrapper.style.width = "300px";
  ctaWrapper.style.height = "97px";
  ctaWrapper.style.left = "513px";
  ctaWrapper.style.top = "425px";
  ctaWrapper.style.zIndex = "9";

  const ctaAnchor = document.createElement("a");
  ctaAnchor.href = "/login";
  ctaAnchor.setAttribute("aria-label", "Login to ELCEO");
  ctaAnchor.style.display = "block";
  ctaAnchor.style.width = "100%";
  ctaAnchor.style.height = "100%";
  ctaAnchor.innerHTML = heroWheelCta;
  const ctaSvg = ctaAnchor.querySelector("svg");
  if (ctaSvg) {
    ctaSvg.style.width = "100%";
    ctaSvg.style.height = "100%";
    ctaSvg.style.display = "block";
    ctaSvg.style.overflow = "visible";
  }
  ctaWrapper.appendChild(ctaAnchor);
  stage.appendChild(ctaWrapper);

  // ── LAYER 10: Nav bar SVG ─────────────────────────────────────────────────
  stage.appendChild(
    makeAsset(navBarSvg, {
      width: 797, height: 43, left: 262, top: -72,
      extraClasses: ["nav-bar-svg"],
      zIndex: 10,
    })
  );

  // HTML nav overlay (for active state, hover, pointer events)
  const nav = document.createElement("nav");
  nav.className = "nav-overlay";
  nav.setAttribute("aria-label", "Primary navigation");
  nav.style.left = "262px";
  nav.style.top = "-72px";
  nav.style.width = "797px";
  nav.style.height = "43px";
  nav.style.alignItems = "center";
  nav.style.zIndex = "10";
  nav.innerHTML = `
    <a href="/" class="nav-item active">HOME</a>
    <a href="/pricing" class="nav-item">PRICING</a>
    <a href="/about" class="nav-item">ABOUT</a>
    <a href="/faq" class="nav-item">FAQ</a>
    <a href="/login" class="nav-item">LOGIN</a>`;
  stage.appendChild(nav);

  // ── LAYER 11: Retro computer button ──────────────────────────────────────
  const retroBtn = document.createElement("button");
  retroBtn.className = "hero-asset retro-computer-button";
  retroBtn.style.width = "123px";
  retroBtn.style.height = "95px";
  retroBtn.style.left = "1448px";
  retroBtn.style.top = "-82px";
  retroBtn.style.zIndex = "11";
  retroBtn.setAttribute("aria-label", "Open Market Reasoning OS");
  retroBtn.setAttribute("type", "button");
  retroBtn.innerHTML = retroComputerLogo;
  const retroSvg = retroBtn.querySelector("svg");
  if (retroSvg) {
    retroSvg.style.width = "100%";
    retroSvg.style.height = "100%";
    retroSvg.style.display = "block";
    retroSvg.style.overflow = "visible";
  }
  retroBtn.addEventListener("click", openPopup);
  stage.appendChild(retroBtn);

  // ── LAYER 12: Click-here arrow ────────────────────────────────────────────
  const clickHere = document.createElement("div");
  clickHere.className = "click-here-group";
  clickHere.style.position = "absolute";
  clickHere.style.left = "1390px";
  clickHere.style.top = "-40px";
  clickHere.style.zIndex = "12";
  clickHere.style.pointerEvents = "none";
  clickHere.style.transform = "rotate(-8deg)";
  clickHere.setAttribute("aria-hidden", "true");
  clickHere.innerHTML = `<span class="click-here-text">click here</span>${CLICK_ARROW_SVG}`;
  stage.appendChild(clickHere);

  // ── LAYER 13: Yellow tape SVG ─────────────────────────────────────────────
  stage.appendChild(
    makeAsset(yellowTapeSvg, {
      width: 1948, height: 300, left: -353.4, top: 727,
      rotation: 356.8,
      extraClasses: ["yellow-tape-svg"],
      zIndex: 13,
    })
  );

  // ── LAYER 14: Marquee text on tape ────────────────────────────────────────
  const tapeWrapper = document.createElement("div");
  tapeWrapper.className = "yellow-tape-wrapper";
  tapeWrapper.style.position = "absolute";
  tapeWrapper.style.width = "1948px";
  tapeWrapper.style.height = "130px";
  tapeWrapper.style.left = "-353.4px";
  tapeWrapper.style.top = "820px";
  tapeWrapper.style.transform = "rotate(356.8deg)";
  tapeWrapper.style.transformOrigin = "left center";
  tapeWrapper.style.zIndex = "14";
  tapeWrapper.style.overflow = "hidden";
  tapeWrapper.style.pointerEvents = "none";
  tapeWrapper.setAttribute("aria-hidden", "true");

  const marquee = document.createElement("div");
  marquee.className = "yellow-tape-marquee";
  marquee.textContent = MARQUEE_CONTENT;
  tapeWrapper.appendChild(marquee);
  stage.appendChild(tapeWrapper);

  // ── Append stage → section → root ────────────────────────────────────────
  section.appendChild(stage);
  root.appendChild(section);
}

// ── Boot ─────────────────────────────────────────────────────────────────────
buildHero();
