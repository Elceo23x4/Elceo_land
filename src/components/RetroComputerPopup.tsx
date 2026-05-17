import { useEffect, useCallback } from "react";
import s from "./Hero.module.css";

/* ── Terminal content ──────────────────────────────────────── */
type LineType = "normal" | "dim" | "prompt";

interface TermLine {
  text: string;
  type: LineType;
}

const LINES: TermLine[] = [
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

function lineClass(type: LineType, s: Record<string, string>): string {
  const base = s.termLine;
  if (type === "dim") return `${base} ${s.termLineDim}`;
  if (type === "prompt") return `${base} ${s.termLinePrompt}`;
  return base;
}

/* ── Props ─────────────────────────────────────────────────── */
interface Props {
  onClose: () => void;
}

export default function RetroComputerPopup({ onClose }: Props) {
  /* Escape key */
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  /* Click outside the screen panel */
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={s.popupOverlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="ELCEO Market Reasoning OS Terminal"
    >
      <div className={s.popupScreen}>
        {/* Title bar */}
        <div className={s.popupTitlebar}>
          <span className={s.popupTitleText}>
            ELCEO // MARKET REASONING OS — SESSION v1.0
          </span>
          <button
            className={s.popupCloseBtn}
            onClick={onClose}
            aria-label="Close terminal"
            type="button"
          >
            [ESC]
          </button>
        </div>

        {/* Terminal body */}
        <div className={s.popupBody}>
          {LINES.map((line, i) => (
            <span key={i} className={lineClass(line.type, s)}>
              {line.text}
            </span>
          ))}
          {/* Blinking cursor */}
          <span className={s.termLine}>
            <span className={s.termCursor} aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  );
}
