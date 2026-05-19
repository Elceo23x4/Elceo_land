import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

// ── Gold Ingot Shape (trapezoid bar) ─────────────────────────────────────────
function GoldIngot() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create trapezoid gold bar shape via BufferGeometry
  const geometry = useRef(() => {
    const shape = new THREE.Shape();
    // Top face (wider)
    shape.moveTo(-0.38, 0.09);
    shape.lineTo(0.38, 0.09);
    shape.lineTo(0.32, -0.09);
    shape.lineTo(-0.32, -0.09);
    shape.closePath();

    const extrudeSettings = {
      depth: 0.22,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.015,
      bevelSegments: 3,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  })();

  return (
    <mesh ref={meshRef} geometry={geometry.current} position={[0, 0.14, -0.11]} rotation={[0.1, 0, 0]}>
      <meshStandardMaterial
        color="#FFD700"
        metalness={0.92}
        roughness={0.08}
        emissive="#B8860B"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

// ── Wood Stick ───────────────────────────────────────────────────────────────
function WoodStick({ position, rotation, color }: { position: [number, number, number]; rotation: [number, number, number]; color: string }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Main stick */}
      <mesh>
        <cylinderGeometry args={[0.022, 0.028, 0.52, 8]} />
        <meshStandardMaterial color={color} roughness={0.82} metalness={0.02} />
      </mesh>
      {/* Knot ring 1 */}
      <mesh position={[0, 0.08, 0]}>
        <torusGeometry args={[0.03, 0.006, 6, 12]} />
        <meshStandardMaterial color="#3B2005" roughness={0.9} metalness={0} />
      </mesh>
      {/* Knot ring 2 */}
      <mesh position={[0, -0.14, 0]}>
        <torusGeometry args={[0.028, 0.005, 6, 12]} />
        <meshStandardMaterial color="#4A2910" roughness={0.9} metalness={0} />
      </mesh>
    </group>
  );
}

// ── 3D Gold Bar Model ────────────────────────────────────────────────────────
function GoldBarModel() {
  const groupRef = useRef<THREE.Group>(null);
  const prefersReduced = usePrefersReducedMotion();

  useFrame(() => {
    if (groupRef.current && !prefersReduced) {
      groupRef.current.rotation.y += 0.004;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.0008) * 0.06;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={0.7}>
      {/* Gold ingot bar */}
      <GoldIngot />

      {/* Left support stick */}
      <WoodStick position={[-0.18, -0.16, 0]} rotation={[0, 0, 0.1]} color="#5C3317" />

      {/* Right support stick */}
      <WoodStick position={[0.18, -0.16, 0]} rotation={[0, 0, -0.1]} color="#4A2910" />
    </group>
  );
}

// ── Main Cursor Component ────────────────────────────────────────────────────
export default function GoldCursor3D() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const smoothPos = useRef({ x: -200, y: -200 });
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const mql = window.matchMedia("(pointer: coarse)");
    setIsCoarse(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsCoarse(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    try {
      if (typeof WebGLRenderingContext === "undefined") {
        setWebGLSupported(false);
      }
    } catch {
      setWebGLSupported(false);
    }
  }, []);

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

  useEffect(() => {
    if (isCoarse || !webGLSupported) return;
    let raf: number;

    function animate() {
      const lerp = prefersReduced ? 1 : 0.14;
      smoothPos.current.x += (pos.x - smoothPos.current.x) * lerp;
      smoothPos.current.y += (pos.y - smoothPos.current.y) * lerp;

      if (containerRef.current) {
        containerRef.current.style.transform = `translate(${smoothPos.current.x - 48}px, ${smoothPos.current.y - 36}px)`;
      }

      raf = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(raf);
  }, [pos, isCoarse, webGLSupported, prefersReduced]);

  if (isCoarse || !webGLSupported) return null;

  return (
    <>
      <style>{`.hero { cursor: none; } .hero a, .hero button { cursor: none; }`}</style>

      <div
        ref={containerRef}
        className="gold-cursor-container"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 96,
          height: 72,
          zIndex: 99999,
          pointerEvents: "none",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        <Canvas
          camera={{ position: [0, 0.1, 1.8], fov: 38 }}
          gl={{ alpha: true, antialias: true }}
          style={{ width: "100%", height: "100%", background: "transparent" }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 4, 2]} intensity={1.8} color="#FFF8DC" />
          <directionalLight position={[-2, 1, 3]} intensity={0.6} color="#FFD700" />
          <pointLight position={[0, -0.5, 1]} intensity={0.4} color="#FFA500" />
          <GoldBarModel />
        </Canvas>
      </div>
    </>
  );
}
