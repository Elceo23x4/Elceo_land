import { useEffect, useState } from "react";

export default function ScrollCue() {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const check = () => {
      const scrollY = window.scrollY;
      const viewH = window.innerHeight;
      setAtBottom(scrollY >= viewH * 0.55);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  const handleClick = () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = prefersReduced ? "auto" as const : "smooth" as const;

    if (atBottom) {
      window.scrollTo({ top: 0, behavior });
    } else {
      const s2 = document.querySelector(".section-two");
      if (s2) {
        s2.scrollIntoView({ behavior, block: "start" });
      } else {
        window.scrollTo({ top: window.innerHeight, behavior });
      }
    }
  };

  return (
    <button
      className="scroll-cue"
      onClick={handleClick}
      aria-label={atBottom ? "Scroll to top" : "Scroll down"}
      type="button"
    >
      <svg
        viewBox="0 0 38 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="scroll-cue-arrow"
        style={{ transform: atBottom ? "rotate(180deg)" : undefined }}
      >
        <path
          d="M19 4 C18 8, 17 14, 18 22 C19 30, 20 36, 19 44"
          stroke="#e02020"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M9 34 C12 38, 16 42, 19 46 C22 42, 26 38, 29 34"
          stroke="#e02020"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M18 6 C17 12, 18 20, 19 28 C20 34, 19 40, 18 45"
          stroke="#ff1f1f"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
      </svg>
      <span className="scroll-cue-text">Scroll</span>
    </button>
  );
}
