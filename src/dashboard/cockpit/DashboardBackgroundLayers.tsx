import {
  NightSky,
  DottedWorldMap,
  BackgroundBaseTexture,
  HorizontalLightStreaks,
  ScanArcs,
  ParticleGlowField,
} from "./dashboardCockpitAssets";

/**
 * Background layers for the dashboard cockpit.
 * Renders subtle, non-competing atmosphere behind the shell.
 * svg-10 assets are partial/revisit — used at very low opacity.
 */
export default function DashboardBackgroundLayers() {
  return (
    <div className="cockpit-layer cockpit-layer--bg" aria-hidden="true">
      {/* Pure black base is provided by parent CSS */}

      {/* svg-10 partial: base texture — very subtle */}
      <div className="cockpit-bg-asset cockpit-bg-asset--base-texture">
        <BackgroundBaseTexture />
      </div>

      {/* Night sky — subtle starfield */}
      <div className="cockpit-bg-asset cockpit-bg-asset--night-sky">
        <NightSky />
      </div>

      {/* Dotted world map — behind shell */}
      <div className="cockpit-bg-asset cockpit-bg-asset--world-map">
        <DottedWorldMap />
      </div>

      {/* svg-10 partial: horizontal light streaks */}
      <div className="cockpit-bg-asset cockpit-bg-asset--streaks">
        <HorizontalLightStreaks />
      </div>

      {/* svg-10 partial: scan arcs */}
      <div className="cockpit-bg-asset cockpit-bg-asset--scan-arcs">
        <ScanArcs />
      </div>

      {/* svg-10 partial: particle glow field */}
      <div className="cockpit-bg-asset cockpit-bg-asset--particles">
        <ParticleGlowField />
      </div>
    </div>
  );
}
