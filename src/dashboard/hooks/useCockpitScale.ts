import { useRef } from "react";

export const BOARD_W = 1920;
export const BOARD_H = 1080;

/**
 * Lightweight board ref hook — Batch 7D
 *
 * The responsive board model no longer relies on JS-driven transform scaling.
 * CSS aspect-ratio + max-width/max-height handles viewport fit.
 * This hook provides only the board ref for any future measurement needs.
 */
export default function useCockpitScale() {
  const boardRef = useRef<HTMLDivElement | null>(null);
  return { boardRef };
}
