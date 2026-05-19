import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

// ── Gold Ingot Shape (trapezoid bar) ─────────────────────────────────────────
function GoldIngot() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.62, 0.14);
    shape.lineTo(0.62, 0.14);
    shape.lineTo(0.52, -0.14);
    shape.lineTo(-0.52, -0.14);
    shape.closePath();

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.32,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelSegments: 3,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0.18, -0.16]} rotation={[0.1, 0, 0]}>
      <meshStandardMaterial
        color="#FFD700"
        metalness={1}
        roughness={0.05}
        emissive="#FFB000"
        emissiveIntensity={0.35}
      />
    </mesh>
  );
}

// ── Wood Stick ───────────────────────────────────────────────────────────────
function WoodStick({ position, rotation, color }: { position: [number, number, number]; rotation: [number, number, number]; color: string }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <cylinderGeometry args={[0.028, 0.036, 1.04, 8]} />
        <meshStandardMaterial color={color} roughness={0.78} metalness={0.03} />
      </mesh>
      <mesh position={[0, 0.14, 0]}>
        <torusGeometry args={[0.038, 0.007, 6, 12]} />
        <meshStandardMaterial color="#6B3A1A" roughness={0.85} metalness={0} />
      </mesh>
      <mesh position={[0, -0.22, 0]}>
        <torusGeometry args={[0.035, 0.006, 6, 12]} />
        <meshStandardMaterial color="#7A431C" roughness={0.85} metalness={0} />
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
      <GoldIngot />
      <WoodStick position={[-0.28, -0.32, 0]} rotation={[0, 0, 0.1]} color="#8B5A2B" />
      <WoodStick position={[0.28, -0.32, 0]} rotation={[0, 0, -0.1]} color="#A86B32" />
    </group>
  );
}

// ── Main Cursor Component ────────────────────────────────────────────────────
export default function GoldCursor3D() {
  const [visible, setVisible] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
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
      setVisible(true);
      if (containerRef.current) {
        containerRef.current.style.transform = `translate(${e.clientX - 28}px, ${e.clientY - 26}px)`;
      }
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
          width: 150,
          height: 110,
          zIndex: 99999,
          pointerEvents: "none",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
      >
        <Canvas
          camera={{ position: [0, 0.1, 2.4], fov: 36 }}
          gl={{ alpha: true, antialias: true }}
          style={{ width: "100%", height: "100%", background: "transparent" }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 4, 2]} intensity={2.0} color="#FFF8DC" />
          <directionalLight position={[-2, 1, 3]} intensity={0.7} color="#FFD700" />
          <pointLight position={[0, -0.5, 1.5]} intensity={0.5} color="#FFA500" />
          <GoldBarModel />
        </Canvas>
      </div>
    </>
  );
}
