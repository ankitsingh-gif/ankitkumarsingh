"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import FloatingParticles from "./FloatingParticles";

export default function Background3D() {
  const starsRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.01;
      starsRef.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <group>
      {/* Star field */}
      <group ref={starsRef}>
        <Stars
          radius={100}
          depth={80}
          count={3000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />
      </group>

      {/* Teal particles */}
      <FloatingParticles count={300} color="#00E5FF" size={0.012} spread={25} />

      {/* Gold particles (fewer, larger) */}
      <FloatingParticles count={80} color="#FFD700" size={0.02} spread={20} />

      {/* Ambient lighting */}
      <ambientLight intensity={0.1} />

      {/* Fog */}
      <fog attach="fog" args={["#0A0F1A", 15, 40]} />
    </group>
  );
}
