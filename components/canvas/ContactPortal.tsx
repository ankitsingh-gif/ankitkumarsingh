"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

export default function ContactPortal() {
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.3;
      ringRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.2;
      ring2Ref.current.rotation.y = Math.cos(t * 0.15) * 0.1;
    }
  });

  return (
    <group>
      {/* Outer ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.5, 0.04, 16, 100]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.6} />
      </mesh>

      {/* Inner ring */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.8, 0.03, 16, 80]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.4} />
      </mesh>

      {/* Core glow */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.05} />
      </mesh>

      {/* Sparkles flowing into portal */}
      <Sparkles
        count={80}
        scale={6}
        size={3}
        speed={0.8}
        color="#00E5FF"
      />
      <Sparkles
        count={30}
        scale={4}
        size={4}
        speed={0.5}
        color="#FFD700"
      />

      {/* Lights */}
      <pointLight position={[0, 0, 2]} color="#00E5FF" intensity={2} />
      <pointLight position={[0, 0, -2]} color="#FFD700" intensity={1} />
    </group>
  );
}
