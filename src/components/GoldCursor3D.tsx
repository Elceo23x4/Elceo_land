import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

// ── 3D Gold Bar on Tree Sticks ───────────────────────────────────────────────
function GoldBarModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      // Subtle idle rotation
      groupRef.current.rotation.y += 0.003;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={0.6}>
      {/* Gold bar */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.7, 0.18, 0.25]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={0.95}
          roughness={0.12}
          emissive="#8B6914"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Left support stick */}
      <mesh position={[-0.2, -0.12, 0]} rotation={[0, 0, 0.08]}>
        <cylinderGeometry args={[0.025, 0.032, 0.42, 8]} />
        <meshStandardMaterial
          color="#5C3317"
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* Right support stick */}
      <mesh position={[0.2, -0.12, 0]} rotation={[0, 0, -0.08]}>
        <cylinderGeometry args={[0.025, 0.032, 0.42, 8]} />
        <meshStandardMaterial
          color="#4A2910"
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
}

// ── Main Cursor Component ────────────────────────────────────────────────────
export default function GoldCursor3D() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const smoothPos = useRef({ x: -100, y: -100 });
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  // Detect touch/coarse pointer devices
  useEffect(() => {
    const mql = window.matchMedia("(pointer: coarse)");
    setIsCoarse(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsCoarse(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Test WebGL availability via existing canvas element
  useEffect(() => {
    try {
      // Use OffscreenCanvas or assume supported — Canvas element created by R3F will handle fallback
      if (typeof WebGLRenderingContext === "undefined") {
        setWebGLSupported(false);
      }
    } catch {
      setWebGLSupported(false);
    }
  }, []);

  // Mouse tracking
  useEffect(() => {
    if (isCoarse || !webGLSupported) return;

    function handleMouseMove(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    }

    function handleMouseLeave() {
      setVisible(false);
    }

    const heroEl = document.querySelector(".hero");
    if (!heroEl) return;

    heroEl.addEventListener("mousemove", handleMouseMove as EventListener);
    heroEl.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      heroEl.removeEventListener("mousemove", handleMouseMove as EventListener);
      heroEl.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isCoarse, webGLSupported]);

  // Smooth interpolation
  useEffect(() => {
    if (isCoarse || !webGLSupported) return;
    let raf: number;

    function animate() {
      const lerp = prefersReduced ? 1 : 0.15;
      smoothPos.current.x += (pos.x - smoothPos.current.x) * lerp;
      smoothPos.current.y += (pos.y - smoothPos.current.y) * lerp;

      if (containerRef.current) {
        containerRef.current.style.transform = `translate(${smoothPos.current.x - 24}px, ${smoothPos.current.y - 24}px)`;
      }

      raf = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(raf);
  }, [pos, isCoarse, webGLSupported, prefersReduced]);

  // Don't render on touch/coarse or if WebGL unavailable
  if (isCoarse || !webGLSupported) return null;

  return (
    <>
      {/* Hide native cursor inside hero */}
      <style>{`.hero { cursor: none; } .hero a, .hero button { cursor: none; }`}</style>

      <div
        ref={containerRef}
        className="gold-cursor-container"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 48,
          height: 48,
          zIndex: 99999,
          pointerEvents: "none",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 2.2], fov: 35 }}
          gl={{ alpha: true, antialias: true }}
          style={{ width: "100%", height: "100%", background: "transparent" }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 3, 2]} intensity={1.4} color="#FFF8DC" />
          <directionalLight position={[-1, -1, 1]} intensity={0.4} color="#FFD700" />
          <GoldBarModel />
        </Canvas>
      </div>
    </>
  );
}
