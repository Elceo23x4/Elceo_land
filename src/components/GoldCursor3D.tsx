import cursorUrl from "../../cursor.svg?url";

/**
 * GoldCursor3D — now a lightweight CSS cursor injector.
 *
 * Uses the native CSS `cursor` property with cursor.svg so the
 * hotspot aligns perfectly with the real pointer position.
 *
 * Hotspot calculation:
 *   cursor.svg viewBox is 0 0 1536 1536, rendered at 96×96.
 *   The gold bar top center is at approx (748, 132) in viewBox coords.
 *   Scaled to 96px: x = 748/1536*96 ≈ 47, y = 132/1536*96 ≈ 8
 *   Hotspot: (47, 8) — top-center of the gold bar.
 */
export default function GoldCursor3D() {
  return (
    <style>
      {`
        .hero,
        .hero *,
        .hero a,
        .hero button {
          cursor: url("${cursorUrl}") 47 8, auto !important;
        }
      `}
    </style>
  );
}
