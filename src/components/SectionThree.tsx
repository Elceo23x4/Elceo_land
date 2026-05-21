import { useLayoutEffect, useRef, useCallback, useState } from "react";
import BeltDivider from "../assets/source/section3/belt_divider.svg?react";
import BuckleContent from "../assets/source/section3/bb.svg?react";
import TrouserLeft from "../assets/source/section3/trouser_left.svg?react";
import TrouserCenter from "../assets/source/section3/trouser_center.svg?react";
import TrouserRight from "../assets/source/section3/trouser_right.svg?react";
import TreeGraphic from "../assets/source/section3/tree.svg?react";
import FooterGraphic from "../assets/source/section3/footer.svg?react";
import "../styles/section-three.css";

/* ── Static data (outside render to avoid re-creation) ────── */

const MEDIA_CARDS = [
  { label: "Chart Still", icon: "chart", desc: "Price behavior becomes easier to read when zones, pressure, and reaction history are placed in one visual layer." },
  { label: "Macro Dashboard", icon: "dashboard", desc: "Macro pressure, calendar risk, and cross-asset tension are gathered into one reasoning surface." },
  { label: "Video Play", icon: "play", desc: "Short-form visual explainers help traders understand why a setup matters before emotion takes over." },
  { label: "Evidence Board", icon: "evidence", desc: "Evidence is grouped and compared so contradiction becomes visible." },
  { label: "Risk Context", icon: "risk", desc: "Risk remains present before execution, not buried after the decision." },
] as const;

const REVIEWS = [
  { text: "The dashboard makes market context feel less scattered.", name: "Amara Okonkwo", location: "Lagos, Nigeria", role: "Macro trader", stars: 5 },
  { text: "I like how the evidence is grouped before any decision.", name: "Daniel Mensah", location: "Accra, Ghana", role: "Gold trader", stars: 5 },
  { text: "The interface feels more like a reasoning room than a signal feed.", name: "Priya Raman", location: "Dubai, UAE", role: "Index trader", stars: 5 },
  { text: "Macro pressure, risk, and price action finally sit in one place.", name: "Kwame Boateng", location: "Nairobi, Kenya", role: "FX learner", stars: 4 },
  { text: "It helps me slow down and compare what actually matters.", name: "Sofia Mendes", location: "Lisbon, Portugal", role: "Risk-focused trader", stars: 5 },
  { text: "The visual layers make contradictions easier to notice.", name: "Ethan Clarke", location: "London, UK", role: "Portfolio watcher", stars: 4 },
] as const;

const ELCEO_POINTS = [
  "Evidence before emotion",
  "Macro, price, and risk in one surface",
  "Contradiction visibility before action",
  "Discipline built into the reasoning flow",
] as const;

const OTHERS_POINTS = [
  "Scattered dashboards and fragmented context",
  "Blind signal chasing without evidence",
  "Weak risk visibility",
  "Emotional execution loops",
] as const;

/* ── Media card icon SVGs (inline lightweight) ────────────── */

function MediaIcon({ type }: { type: string }) {
  switch (type) {
    case "chart":
      return (
        <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
          <polyline points="2,24 10,16 16,20 24,8 34,12" stroke="#ff6a00" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="2" y1="26" x2="34" y2="26" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        </svg>
      );
    case "dashboard":
      return (
        <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
          <rect x="2" y="2" width="14" height="10" rx="2" stroke="#ff6a00" strokeWidth="1.5" fill="none" />
          <rect x="20" y="2" width="14" height="10" rx="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
          <rect x="2" y="16" width="32" height="10" rx="2" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" />
        </svg>
      );
    case "play":
      return (
        <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
          <rect x="2" y="2" width="32" height="24" rx="3" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" />
          <polygon points="14,8 26,14 14,20" fill="#ff6a00" opacity="0.85" />
        </svg>
      );
    case "evidence":
      return (
        <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
          <circle cx="18" cy="14" r="10" stroke="#ff6a00" strokeWidth="1.5" fill="none" />
          <line x1="18" y1="8" x2="18" y2="14" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="18" y1="14" x2="23" y2="17" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="18" cy="14" r="2" fill="#ff6a00" />
        </svg>
      );
    case "risk":
      return (
        <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
          <path d="M18 4 L32 24 H4 Z" stroke="#ff6a00" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
          <line x1="18" y1="11" x2="18" y2="18" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="18" cy="21" r="1.2" fill="rgba(255,255,255,0.6)" />
        </svg>
      );
    default:
      return null;
  }
}

/* ── Social icons (minimalist inline SVG) ─────────────────── */

function IconTwitterX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconDiscord() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.36.698.772 1.362 1.226 1.993a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.12.098.246.198.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function IconTelegram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

/* ── Footer paint link component ───────────────────────────── */

function FooterPaintLink({ children }: { children: string }) {
  return (
    <a className="s3-footer-link" href="#" aria-label={children}>
      <span className="s3-footer-link-text">{children}</span>
      <span className="s3-paint-splash" aria-hidden="true">
        <span className="s3-paint-blob b1" />
        <span className="s3-paint-blob b2" />
        <span className="s3-paint-blob b3" />
        <span className="s3-paint-blob b4" />
        <span className="s3-paint-blob b5" />
      </span>
    </a>
  );
}

/* ── Star icon ────────────────────────────────────────────── */

function StarIcon() {
  return (
    <svg className="s3-review-star" viewBox="0 0 12 12" fill="currentColor">
      <path d="M6 0.5L7.4 4.1H11.2L8.1 6.4L9.3 10.1L6 7.9L2.7 10.1L3.9 6.4L0.8 4.1H4.6L6 0.5Z" />
    </svg>
  );
}

/* ── Main Component ───────────────────────────────────────── */

export default function SectionThree() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const mediaSliderRef = useRef<HTMLDivElement>(null);

  /* Responsive scale — width-fill */
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const updateScale = () => {
      const s = window.innerWidth / 1920;
      stage.style.setProperty("--s3-scale", String(s));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  /* Review slide navigation */
  const scrollToSlide = useCallback((index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const columns = slider.querySelectorAll(".s3-reviews-column");
    if (columns[index]) {
      columns[index].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      setActiveSlide(index);
    }
  }, []);

  const handleSliderScroll = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const idx = Math.round(slider.scrollLeft / slider.clientWidth);
    setActiveSlide(idx);
  }, []);

  /* Media detail slider navigation */
  const scrollToMedia = useCallback((index: number) => {
    const slider = mediaSliderRef.current;
    if (!slider) return;
    const slides = slider.querySelectorAll(".s3-media-slide");
    if (slides[index]) {
      slides[index].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      setActiveMediaIndex(index);
    }
  }, []);

  const handleMediaSliderScroll = useCallback(() => {
    const slider = mediaSliderRef.current;
    if (!slider) return;
    const idx = Math.round(slider.scrollLeft / slider.clientWidth);
    setActiveMediaIndex(idx);
  }, []);

  return (
    <section className="section-three">
      <div className="section-three-stage" ref={stageRef} style={{ transform: "scale(var(--s3-scale, 1))" }}>

        {/* Belt Divider */}
        <div className="s3-belt-divider">
          <BeltDivider preserveAspectRatio="none" />
        </div>

        {/* Buckle block overlay */}
        <div className="s3-buckle-block" />

        {/* Buckle content (bb.svg) */}
        <div className="s3-buckle-content">
          <BuckleContent preserveAspectRatio="xMidYMid meet" />
        </div>

        {/* Trouser panels */}
        <div className="s3-trouser-left">
          <TrouserLeft preserveAspectRatio="none" />
        </div>
        <div className="s3-trouser-center">
          <TrouserCenter preserveAspectRatio="none" />
        </div>
        <div className="s3-trouser-right">
          <TrouserRight preserveAspectRatio="none" />
        </div>

        {/* Tree overlay */}
        <div className="s3-tree">
          <TreeGraphic preserveAspectRatio="xMidYMid meet" />
        </div>

        {/* Footer */}
        <div className="s3-footer">
          <FooterGraphic preserveAspectRatio="none" />
        </div>

        {/* Footer premium overlay — system font, paint hover */}
        <div className="s3-footer-overlay">
          <nav className="s3-footer-links">
            <FooterPaintLink>Contact</FooterPaintLink>
            <FooterPaintLink>Privacy</FooterPaintLink>
            <FooterPaintLink>Disclaimer</FooterPaintLink>
            <FooterPaintLink>Legal</FooterPaintLink>
            <FooterPaintLink>Terms</FooterPaintLink>
            <FooterPaintLink>Affiliates</FooterPaintLink>
          </nav>
          <div className="s3-footer-meta">
            <span className="s3-footer-copy">&copy; 2026 ELCEO</span>
            <span className="s3-footer-made">Made with <span style={{ color: "#ff5a00" }}>&hearts;</span> by 8DAT</span>
          </div>
        </div>

        {/* SVG paint goo filter (hidden, used by footer links) */}
        <svg className="s3-paint-filter" aria-hidden="true" focusable="false" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
          <defs>
            <filter id="s3-orange-paint-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>

        {/* ── Content: Trouser Left — Why Choose ELCEO ─────── */}
        <div className="s3-content-left">
          <div className="s3-left-scroll">
            <h2 className="s3-left-heading">Why choose ELCEO</h2>
            <p className="s3-left-body">
              Markets punish scattered attention. ELCEO gathers price behavior, macro pressure,
              risk context, and evidence into a single reasoning surface.
            </p>

            <div className="s3-left-subsection">See context before conviction.</div>
            <p className="s3-left-sub-body">
              Every decision begins with the full picture — not a fragment. Price action,
              institutional flows, and macro conditions are layered together so you can reason
              about what you see, not react to what you feel.
            </p>

            {/* Media stack — hover/focus only enlarges */}
            <div className="s3-media-stack">
              {MEDIA_CARDS.map((card, idx) => (
                <div
                  className={`s3-media-card${activeMediaIndex === idx ? " s3-media-card-current" : ""}`}
                  key={card.icon}
                  tabIndex={0}
                  onMouseEnter={() => scrollToMedia(idx)}
                  onFocus={() => scrollToMedia(idx)}
                >
                  <div className="s3-media-card-icon">
                    <MediaIcon type={card.icon} />
                    <span className="s3-media-card-label">{card.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Sideways media detail slider */}
            <div className="s3-media-detail-slider" ref={mediaSliderRef} onScroll={handleMediaSliderScroll}>
              {MEDIA_CARDS.map((card) => (
                <article className="s3-media-slide" key={card.icon}>
                  <span className="s3-media-slide-label">{card.label}</span>
                  <p className="s3-media-slide-desc">{card.desc}</p>
                </article>
              ))}
            </div>

            {/* Media progress dots */}
            <div className="s3-media-progress">
              {MEDIA_CARDS.map((card, idx) => (
                <button
                  key={card.icon}
                  className={`s3-media-dot${activeMediaIndex === idx ? " active" : ""}`}
                  onClick={() => scrollToMedia(idx)}
                  type="button"
                  aria-label={`Media ${idx + 1}`}
                />
              ))}
            </div>

            <div className="s3-left-subsection">Compare evidence instead of chasing noise.</div>
            <p className="s3-left-sub-body">
              A premium reasoning surface should present multiple streams of evidence side by
              side — macro calendars, price behavior patterns, volume profiles, and institutional
              positioning. This is how contradiction becomes visible.
            </p>

            <div className="s3-left-subsection">Understand pressure, timing, and contradiction.</div>
            <p className="s3-left-sub-body">
              When pressure builds from multiple directions at once, timing becomes more
              nuanced. The surface makes these overlapping forces legible rather than hidden
              beneath scattered tabs and fragmented dashboards.
            </p>

            <div className="s3-left-subsection">Keep risk visible before execution.</div>
            <p className="s3-left-sub-body">
              Risk is not an afterthought. It sits at the surface level, visible before every
              decision. Position sizing, drawdown context, and exposure metrics are always
              present — not buried in a separate menu.
            </p>

            <p className="s3-left-body" style={{ marginTop: 16, opacity: 0.55, fontSize: 12 }}>
              ELCEO is a reasoning surface for serious market participants who value clarity
              over noise, discipline over impulse, and evidence over emotion. It is not a
              signal provider and does not guarantee outcomes.
            </p>
          </div>
        </div>

        {/* ── Content: Trouser Center — Reviews ───────────── */}
        <div className="s3-content-center">
          <div className="s3-reviews-container">
            <h2 className="s3-reviews-title">Reviews</h2>
            <div className="s3-reviews-slider" ref={sliderRef} onScroll={handleSliderScroll}>
              <div className="s3-reviews-column">
                {REVIEWS.slice(0, 3).map((review, i) => (
                  <div className="s3-review-card" key={i}>
                    <div className="s3-review-stars">
                      {Array.from({ length: review.stars }).map((_, si) => <StarIcon key={si} />)}
                    </div>
                    <p className="s3-review-text">&ldquo;{review.text}&rdquo;</p>
                    <span className="s3-review-name">{review.name}</span>
                    <span className="s3-review-location">{review.location}</span>
                    <span className="s3-review-role">{review.role}</span>
                  </div>
                ))}
              </div>
              <div className="s3-reviews-column">
                {REVIEWS.slice(3, 6).map((review, i) => (
                  <div className="s3-review-card" key={i + 3}>
                    <div className="s3-review-stars">
                      {Array.from({ length: review.stars }).map((_, si) => <StarIcon key={si} />)}
                    </div>
                    <p className="s3-review-text">&ldquo;{review.text}&rdquo;</p>
                    <span className="s3-review-name">{review.name}</span>
                    <span className="s3-review-location">{review.location}</span>
                    <span className="s3-review-role">{review.role}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="s3-reviews-progress">
              <button className={`s3-reviews-dot${activeSlide === 0 ? " active" : ""}`} onClick={() => scrollToSlide(0)} aria-label="Slide 1" type="button" />
              <button className={`s3-reviews-dot${activeSlide === 1 ? " active" : ""}`} onClick={() => scrollToSlide(1)} aria-label="Slide 2" type="button" />
            </div>

            {/* Connect area */}
            <div className="s3-connect-section">
              <h3 className="s3-connect-title">Connect</h3>
              <div className="s3-connect-grid">
                <div className="s3-connect-item"><IconTwitterX /><span>X / Twitter</span></div>
                <div className="s3-connect-item"><IconDiscord /><span>Discord</span></div>
                <div className="s3-connect-item"><IconInstagram /><span>Instagram</span></div>
                <div className="s3-connect-item"><IconTelegram /><span>Telegram</span></div>
              </div>
            </div>

            {/* Retro red stamp */}
            <div className="s3-retro-stamp" aria-label="Best Decision Support system">
              <span className="s3-stamp-ring" />
              <span className="s3-stamp-ring s3-stamp-ring-inner" />
              <span className="s3-stamp-text-top">Best Decision</span>
              <strong className="s3-stamp-text-main">Support</strong>
              <span className="s3-stamp-text-bottom">system</span>
            </div>
          </div>
        </div>

        {/* ── Content: Trouser Right — VS Section (pure bulletin) ── */}
        <div className="s3-content-right">
          <div className="s3-vs-container">
            {/* Top: ELCEO */}
            <div className="s3-vs-top">
              <span className="s3-vs-fighter-label s3-vs-fighter-label-elceo">ELCEO Market Reasoning OS</span>
              <span className="s3-vs-subline s3-vs-subline-elceo">Evidence-led context before conviction.</span>
              <ul className="s3-vs-points">
                {ELCEO_POINTS.map((point) => (
                  <li className="s3-vs-point" key={point}>{point}</li>
                ))}
              </ul>
            </div>

            {/* VS */}
            <div className="s3-vs-diagonal">
              <span className="s3-vs-text">VS</span>
            </div>

            {/* Bottom: Others */}
            <div className="s3-vs-bottom">
              <span className="s3-vs-fighter-label s3-vs-fighter-label-others">Others</span>
              <span className="s3-vs-subline s3-vs-subline-others">Noise-led tools that push traders into reaction loops.</span>
              <ul className="s3-vs-points">
                {OTHERS_POINTS.map((point) => (
                  <li className="s3-vs-point" key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
