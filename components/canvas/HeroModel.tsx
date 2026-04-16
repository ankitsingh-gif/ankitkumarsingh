"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";

function MainShape() {
  const ref = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const p = state.pointer;
    mouse.current.x += (p.x * 0.2 - mouse.current.x) * 0.03;
    mouse.current.y += (p.y * 0.2 - mouse.current.y) * 0.03;
    ref.current.rotation.x = t * 0.15 + mouse.current.y * 0.5;
    ref.current.rotation.y = t * 0.2 + mouse.current.x * 0.5;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={ref} scale={1.6}>
        <torusKnotGeometry args={[1, 0.35, 128, 32, 2, 3]} />
        <MeshDistortMaterial
          color="#6C63FF"
          emissive="#00D4AA"
          emissiveIntensity={0.12}
          roughness={0.2}
          metalness={0.8}
          distort={0.2}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function OrbitRing({ radius, speed, color, opacity }: {
  radius: number; speed: number; color: string; opacity: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed;
      ref.current.rotation.z = state.clock.elapsedTime * speed * 0.5;
    }
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.015, 16, 80]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function FloatingOrbs() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  const orbs = [
    { pos: [2.2, 0.8, 0] as [number, number, number], color: "#6C63FF", size: 0.12 },
    { pos: [-1.8, -1.2, 0.5] as [number, number, number], color: "#00D4AA", size: 0.09 },
    { pos: [0.5, 2, -0.8] as [number, number, number], color: "#8B83FF", size: 0.08 },
    { pos: [-2, 0.5, -0.3] as [number, number, number], color: "#33DFBB", size: 0.1 },
    { pos: [1.5, -1.5, 0.8] as [number, number, number], color: "#6C63FF", size: 0.07 },
  ];

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.pos}>
          <sphereGeometry args={[orb.size, 16, 16]} />
          <meshBasicMaterial color={orb.color} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-3, 2, 4]} intensity={0.6} color="#6C63FF" />
      <pointLight position={[3, -2, 2]} intensity={0.4} color="#00D4AA" />

      <MainShape />
      <OrbitRing radius={2.5} speed={0.15} color="#6C63FF" opacity={0.15} />
      <OrbitRing radius={3.0} speed={-0.1} color="#00D4AA" opacity={0.1} />
      <FloatingOrbs />
    </>
  );
}

export default function HeroModel() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
          <AdaptiveDpr pixelated />
        </Suspense>
      </Canvas>
    </div>
  );
}
