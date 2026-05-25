/**
 * Chart helpers — Batch 5
 * Utility functions for chart engine lifecycle.
 */

/**
 * Validates fixture OHLC bars have required fields.
 * Does not mutate input.
 */
export function isValidOhlcBar(bar: unknown): boolean {
  if (!bar || typeof bar !== "object") return false;
  const b = bar as Record<string, unknown>;
  return (
    typeof b.time === "string" &&
    typeof b.open === "number" &&
    typeof b.high === "number" &&
    typeof b.low === "number" &&
    typeof b.close === "number" &&
    b.high >= b.low
  );
}
