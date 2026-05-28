/**
 * DashboardTwinkleStarLayer.tsx
 *
 * Deterministic CSS-animated twinkle star overlay.
 * Mounted above the night sky and behind panels.
 * Uses a fixed array of stars with varied sizes, delays, durations, and tones.
 * No randomness at runtime. No timers. No intervals.
 */

const TWINKLE_STARS: Array<{ x: number; y: number; size: number; delay: number; duration: number; tone: "silver" | "orange" }> = [
  { x: 3, y: 5, size: 1.1, delay: 0, duration: 9, tone: "silver" },
  { x: 8, y: 14, size: 1.4, delay: 1.2, duration: 11, tone: "silver" },
  { x: 12, y: 8, size: 1.0, delay: 2.8, duration: 10, tone: "silver" },
  { x: 18, y: 22, size: 1.6, delay: 0.5, duration: 12, tone: "orange" },
  { x: 22, y: 6, size: 1.2, delay: 3.1, duration: 9.5, tone: "silver" },
  { x: 27, y: 18, size: 1.3, delay: 1.8, duration: 10.5, tone: "silver" },
  { x: 32, y: 4, size: 1.0, delay: 0.3, duration: 8.5, tone: "silver" },
  { x: 35, y: 12, size: 1.5, delay: 2.4, duration: 11.5, tone: "silver" },
  { x: 38, y: 28, size: 1.1, delay: 4.0, duration: 13, tone: "silver" },
  { x: 42, y: 7, size: 1.7, delay: 0.8, duration: 9, tone: "orange" },
  { x: 45, y: 20, size: 1.0, delay: 3.5, duration: 10, tone: "silver" },
  { x: 48, y: 3, size: 1.3, delay: 1.5, duration: 12, tone: "silver" },
  { x: 52, y: 15, size: 1.2, delay: 2.0, duration: 9.8, tone: "silver" },
  { x: 55, y: 9, size: 1.4, delay: 0.2, duration: 11, tone: "silver" },
  { x: 58, y: 25, size: 1.6, delay: 4.5, duration: 14, tone: "orange" },
  { x: 62, y: 4, size: 1.1, delay: 1.0, duration: 10, tone: "silver" },
  { x: 65, y: 18, size: 1.3, delay: 3.2, duration: 9.2, tone: "silver" },
  { x: 68, y: 11, size: 1.0, delay: 0.7, duration: 12.5, tone: "silver" },
  { x: 72, y: 6, size: 1.5, delay: 2.6, duration: 10.8, tone: "silver" },
  { x: 75, y: 22, size: 1.2, delay: 1.4, duration: 11.2, tone: "silver" },
  { x: 78, y: 2, size: 1.8, delay: 0.1, duration: 9.5, tone: "orange" },
  { x: 82, y: 16, size: 1.1, delay: 3.8, duration: 13.5, tone: "silver" },
  { x: 85, y: 8, size: 1.3, delay: 2.2, duration: 10.2, tone: "silver" },
  { x: 88, y: 24, size: 1.0, delay: 0.9, duration: 11.8, tone: "silver" },
  { x: 92, y: 5, size: 1.4, delay: 4.2, duration: 9.8, tone: "silver" },
  { x: 95, y: 19, size: 1.6, delay: 1.6, duration: 12.2, tone: "orange" },
  { x: 5, y: 32, size: 1.2, delay: 0.4, duration: 10.5, tone: "silver" },
  { x: 10, y: 38, size: 1.0, delay: 2.9, duration: 9.2, tone: "silver" },
  { x: 15, y: 42, size: 1.5, delay: 1.1, duration: 11, tone: "silver" },
  { x: 20, y: 35, size: 1.3, delay: 3.6, duration: 13, tone: "silver" },
  { x: 25, y: 45, size: 1.1, delay: 0.6, duration: 10, tone: "silver" },
  { x: 30, y: 40, size: 1.7, delay: 2.1, duration: 12.5, tone: "orange" },
  { x: 36, y: 48, size: 1.0, delay: 4.8, duration: 9.5, tone: "silver" },
  { x: 40, y: 34, size: 1.4, delay: 1.3, duration: 11.5, tone: "silver" },
  { x: 44, y: 52, size: 1.2, delay: 0.8, duration: 10.8, tone: "silver" },
  { x: 50, y: 38, size: 1.5, delay: 3.0, duration: 12, tone: "silver" },
  { x: 54, y: 44, size: 1.1, delay: 2.5, duration: 9, tone: "silver" },
  { x: 60, y: 50, size: 1.3, delay: 0.3, duration: 10.5, tone: "silver" },
  { x: 64, y: 36, size: 1.6, delay: 4.1, duration: 14, tone: "orange" },
  { x: 70, y: 42, size: 1.0, delay: 1.7, duration: 9.8, tone: "silver" },
  { x: 74, y: 48, size: 1.4, delay: 2.3, duration: 11.2, tone: "silver" },
  { x: 80, y: 33, size: 1.2, delay: 0.5, duration: 10, tone: "silver" },
  { x: 84, y: 45, size: 1.5, delay: 3.4, duration: 12.8, tone: "silver" },
  { x: 90, y: 39, size: 1.1, delay: 1.9, duration: 9.5, tone: "silver" },
  { x: 94, y: 50, size: 1.3, delay: 4.6, duration: 13, tone: "silver" },
  { x: 97, y: 35, size: 1.7, delay: 0.2, duration: 10.2, tone: "orange" },
  { x: 4, y: 55, size: 1.0, delay: 2.7, duration: 11, tone: "silver" },
  { x: 9, y: 62, size: 1.4, delay: 1.0, duration: 9.8, tone: "silver" },
  { x: 14, y: 58, size: 1.2, delay: 3.3, duration: 12, tone: "silver" },
  { x: 19, y: 65, size: 1.5, delay: 0.7, duration: 10.5, tone: "silver" },
  { x: 24, y: 55, size: 1.1, delay: 4.4, duration: 13.5, tone: "silver" },
  { x: 29, y: 68, size: 1.6, delay: 1.5, duration: 9, tone: "orange" },
  { x: 34, y: 60, size: 1.3, delay: 2.8, duration: 11.5, tone: "silver" },
  { x: 39, y: 72, size: 1.0, delay: 0.1, duration: 10, tone: "silver" },
  { x: 46, y: 58, size: 1.4, delay: 3.9, duration: 12.2, tone: "silver" },
  { x: 53, y: 66, size: 1.2, delay: 1.2, duration: 9.5, tone: "silver" },
  { x: 57, y: 70, size: 1.5, delay: 2.4, duration: 11, tone: "silver" },
  { x: 63, y: 62, size: 1.1, delay: 0.6, duration: 13, tone: "silver" },
  { x: 67, y: 55, size: 1.7, delay: 4.0, duration: 10.8, tone: "orange" },
  { x: 73, y: 68, size: 1.3, delay: 1.8, duration: 9.2, tone: "silver" },
  { x: 77, y: 60, size: 1.0, delay: 3.5, duration: 12.5, tone: "silver" },
  { x: 83, y: 72, size: 1.4, delay: 0.9, duration: 10.2, tone: "silver" },
  { x: 87, y: 56, size: 1.2, delay: 2.2, duration: 11.8, tone: "silver" },
  { x: 91, y: 65, size: 1.5, delay: 4.3, duration: 9.8, tone: "silver" },
  { x: 96, y: 58, size: 1.1, delay: 1.4, duration: 14, tone: "silver" },
  { x: 6, y: 76, size: 1.3, delay: 0.3, duration: 10.5, tone: "silver" },
  { x: 16, y: 80, size: 1.6, delay: 2.6, duration: 9, tone: "orange" },
  { x: 26, y: 75, size: 1.0, delay: 1.1, duration: 12, tone: "silver" },
  { x: 37, y: 82, size: 1.4, delay: 3.7, duration: 11, tone: "silver" },
  { x: 47, y: 78, size: 1.2, delay: 0.8, duration: 10, tone: "silver" },
  { x: 56, y: 84, size: 1.5, delay: 2.0, duration: 13.5, tone: "silver" },
  { x: 66, y: 76, size: 1.1, delay: 4.5, duration: 9.5, tone: "silver" },
  { x: 76, y: 82, size: 1.7, delay: 1.6, duration: 11.5, tone: "orange" },
  { x: 86, y: 78, size: 1.3, delay: 3.1, duration: 10.8, tone: "silver" },
  { x: 93, y: 75, size: 1.0, delay: 0.4, duration: 12.2, tone: "silver" },
];

export default function DashboardTwinkleStarLayer() {
  return (
    <div className="dashboard-twinkle-star-layer" aria-hidden="true">
      {TWINKLE_STARS.map((star, i) => (
        <span
          key={i}
          className={`dashboard-twinkle-star dashboard-twinkle-star--${star.tone}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            "--twinkle-delay": `${star.delay}s`,
            "--twinkle-duration": `${star.duration}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
