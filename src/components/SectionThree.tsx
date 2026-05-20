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
  { label: "Chart Still", icon: "chart" },
  { label: "Macro Dashboard", icon: "dashboard" },
  { label: "Video Play", icon: "play" },
  { label: "Evidence Board", icon: "evidence" },
  { label: "Risk Context", icon: "risk" },
] as const;

const REVIEWS = [
  { text: "The dashboard makes market context feel less scattered.", author: "Macro trader", stars: 5 },
  { text: "I like how the evidence is grouped before any decision.", author: "Gold trader", stars: 5 },
  { text: "The interface feels more like a reasoning room than a signal feed.", author: "Index trader", stars: 5 },
  { text: "Macro pressure, risk, and price action finally sit in one place.", author: "FX learner", stars: 4 },
  { text: "It helps me slow down and compare what actually matters.", author: "Risk-focused trader", stars: 5 },
  { text: "The visual layers make contradictions easier to notice.", author: "Portfolio watcher", stars: 4 },
] as const;

const ELCEO_POINTS = [
  "Evidence before emotion",
  "Context before conviction",
  "Macro + price + risk in one surface",
  "Contradiction visibility",
  "Decision discipline",
] as const;

const OTHERS_POINTS = [
  "Scattered noise",
  "Blind signal chasing",
  "No evidence stack",
  "Weak risk context",
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

/* ── Fighter silhouette SVG ───────────────────────────────── */

function FighterSilhouette({ variant }: { variant: "top" | "bottom" }) {
  const color = variant === "top" ? "#ff6a00" : "#666";
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="14" r="8" stroke={color} strokeWidth="2" fill="none" />
      <path d="M10 40 C10 30 16 24 22 24 C28 24 34 30 34 40" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
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
  const sliderRef = useRef<HTMLDivElement>(null);

  /* Responsive scale */
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const updateScale = () => {
      const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
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

  /* Track active slide via scroll */
  const handleSliderScroll = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const scrollLeft = slider.scrollLeft;
    const width = slider.clientWidth;
    const idx = Math.round(scrollLeft / width);
    setActiveSlide(idx);
  }, []);

  return (
    <section className="section-three">
      <div className="section-three-stage" ref={stageRef} style={{ transform: "translateX(-50%) scale(var(--s3-scale, 1))" }}>

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

        {/* Trouser panels (background SVGs) */}
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

            {/* Media stack */}
            <div className="s3-media-stack">
              {MEDIA_CARDS.map((card) => (
                <div className="s3-media-card" key={card.icon}>
                  <div className="s3-media-card-icon">
                    <MediaIcon type={card.icon} />
                    <span className="s3-media-card-label">{card.label}</span>
                  </div>
                </div>
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

            <p className="s3-left-body" style={{ marginTop: 16, opacity: 0.6, fontSize: 12 }}>
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
            <div
              className="s3-reviews-slider"
              ref={sliderRef}
              onScroll={handleSliderScroll}
            >
              {/* Column 1 */}
              <div className="s3-reviews-column">
                {REVIEWS.slice(0, 3).map((review, i) => (
                  <div className="s3-review-card" key={i}>
                    <div className="s3-review-stars">
                      {Array.from({ length: review.stars }).map((_, si) => (
                        <StarIcon key={si} />
                      ))}
                    </div>
                    <p className="s3-review-text">&ldquo;{review.text}&rdquo;</p>
                    <span className="s3-review-author">{review.author}</span>
                  </div>
                ))}
              </div>
              {/* Column 2 */}
              <div className="s3-reviews-column">
                {REVIEWS.slice(3, 6).map((review, i) => (
                  <div className="s3-review-card" key={i + 3}>
                    <div className="s3-review-stars">
                      {Array.from({ length: review.stars }).map((_, si) => (
                        <StarIcon key={si} />
                      ))}
                    </div>
                    <p className="s3-review-text">&ldquo;{review.text}&rdquo;</p>
                    <span className="s3-review-author">{review.author}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="s3-reviews-progress">
              <button
                className={`s3-reviews-dot${activeSlide === 0 ? " active" : ""}`}
                onClick={() => scrollToSlide(0)}
                aria-label="Slide 1"
                type="button"
              />
              <button
                className={`s3-reviews-dot${activeSlide === 1 ? " active" : ""}`}
                onClick={() => scrollToSlide(1)}
                aria-label="Slide 2"
                type="button"
              />
            </div>
          </div>
        </div>

        {/* ── Content: Trouser Right — VS Section ─────────── */}
        <div className="s3-content-right">
          <div className="s3-vs-container">
            {/* Top: ELCEO */}
            <div className="s3-vs-top">
              <div className="s3-vs-silhouette s3-vs-silhouette-top">
                <FighterSilhouette variant="top" />
              </div>
              <span className="s3-vs-fighter-label s3-vs-fighter-label-elceo">
                ELCEO Market Reasoning OS
              </span>
              <ul className="s3-vs-points">
                {ELCEO_POINTS.map((point) => (
                  <li className="s3-vs-point" key={point}>{point}</li>
                ))}
              </ul>
            </div>

            {/* Diagonal slice + VS */}
            <div className="s3-vs-diagonal">
              <span className="s3-vs-text">VS</span>
            </div>

            {/* Bottom: Others */}
            <div className="s3-vs-bottom">
              <span className="s3-vs-fighter-label s3-vs-fighter-label-others">
                Others
              </span>
              <ul className="s3-vs-points">
                {OTHERS_POINTS.map((point) => (
                  <li className="s3-vs-point" key={point}>{point}</li>
                ))}
              </ul>
              <div className="s3-vs-silhouette s3-vs-silhouette-bottom" style={{ marginTop: 10 }}>
                <FighterSilhouette variant="bottom" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
