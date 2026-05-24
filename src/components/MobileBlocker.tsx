import "../styles/mobile-blocker.css";

export default function MobileBlocker() {
  return (
    <div className="mobile-blocker">
      <div className="mobile-blocker-content">
        <h1 className="mobile-blocker-heading">You care about quality delivery.</h1>
        <p className="mobile-blocker-body">
          Kindly switch to a tablet or Desktop for a magical experience.
        </p>

        {/* Animated device switch graphic */}
        <div className="mobile-blocker-graphic" aria-hidden="true">
          {/* Phone morphing to tablet */}
          <svg className="mobile-blocker-phone" viewBox="0 0 48 80" fill="none">
            <rect x="4" y="2" width="40" height="76" rx="6" stroke="#ff6a00" strokeWidth="2" fill="none" />
            <rect x="18" y="68" width="12" height="3" rx="1.5" fill="rgba(255,106,0,0.4)" />
            <rect x="20" y="6" width="8" height="2" rx="1" fill="rgba(255,255,255,0.2)" />
          </svg>

          {/* Arrow */}
          <svg className="mobile-blocker-arrow" viewBox="0 0 60 24" fill="none">
            <path d="M4 12 H48" stroke="#e02020" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M42 6 L52 12 L42 18" stroke="#e02020" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>

          {/* Desktop/tablet */}
          <svg className="mobile-blocker-desktop" viewBox="0 0 100 72" fill="none">
            <rect x="4" y="2" width="92" height="58" rx="4" stroke="#ff6a00" strokeWidth="2" fill="none" />
            <rect x="36" y="62" width="28" height="4" rx="2" fill="rgba(255,106,0,0.3)" />
            <rect x="10" y="8" width="80" height="46" rx="2" fill="rgba(255,106,0,0.06)" />
          </svg>
        </div>
      </div>
    </div>
  );
}
