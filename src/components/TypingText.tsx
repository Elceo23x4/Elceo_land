import { useEffect, useState, useRef } from "react";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

interface TypingTextProps {
  text: string;
  className?: string;
  speedMs?: number;
  pauseMs?: number;
  loop?: boolean;
}

export default function TypingText({
  text,
  className = "",
  speedMs = 110,
  pauseMs = 900,
  loop = true,
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const prefersReduced = usePrefersReducedMotion();
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Under reduced motion, just show the full text
    if (prefersReduced) {
      setDisplayed(text);
      return;
    }

    let charIndex = 0;
    let isDeleting = false;
    let cancelled = false;

    function tick() {
      if (cancelled) return;

      if (!isDeleting) {
        charIndex++;
        setDisplayed(text.slice(0, charIndex));

        if (charIndex >= text.length) {
          // Pause at full text
          timeoutRef.current = setTimeout(() => {
            if (cancelled) return;
            if (loop) {
              isDeleting = true;
              tick();
            }
          }, pauseMs);
          return;
        }
      } else {
        // Quick clear then restart
        charIndex = 0;
        setDisplayed("");
        isDeleting = false;
        timeoutRef.current = setTimeout(() => {
          if (!cancelled) tick();
        }, 300);
        return;
      }

      timeoutRef.current = setTimeout(tick, speedMs);
    }

    tick();

    return () => {
      cancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [text, speedMs, pauseMs, loop, prefersReduced]);

  return (
    <span className={className} aria-label={text}>
      {displayed}
      {!prefersReduced && <span className="typing-cursor" aria-hidden="true">|</span>}
    </span>
  );
}
