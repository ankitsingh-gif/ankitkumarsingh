"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function CentralObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Smooth mouse follow
    const mouse = state.pointer;
    mouseRef.current.x += (mouse.x * 0.3 - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (mouse.y * 0.3 - mouseRef.current.y) * 0.05;

    meshRef.current.rotation.x = t * 0.1 + mouseRef.current.y * 0.5;
    meshRef.current.rotation.y = t * 0.15 + mouseRef.current.x * 0.5;
    meshRef.current.rotation.z = t * 0.05;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={0.15}
          roughness={0.2}
          metalness={0.8}
          distort={0.25}
          speed={1.5}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Wireframe overlay */}
      <mesh scale={2.3}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial
          color="#FFD700"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </Float>
  );
}

function OrbitalRing({
  radius,
  speed,
  color,
  count,
}: {
  radius: number;
  speed: number;
  color: string;
  count: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      pts.push([Math.cos(angle) * radius, Math.sin(angle) * radius * 0.3, Math.sin(angle) * radius]);
    }
    return pts;
  }, [radius, count]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * speed;
    }
  });

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene() {
  const { viewport } = useThree();
  const scale = Math.min(viewport.width, viewport.height) / 8;

  return (
    <group scale={scale}>
      {/* Lights */}
      <pointLight position={[5, 5, 5]} color="#00E5FF" intensity={2} />
      <pointLight position={[-5, -3, 3]} color="#FFD700" intensity={1.5} />
      <pointLight position={[0, 0, 5]} color="#ffffff" intensity={0.5} />

      {/* Central morphing icosahedron */}
      <CentralObject />

      {/* Orbital particle rings */}
      <OrbitalRing radius={3.5} speed={0.2} color="#00E5FF" count={60} />
      <OrbitalRing radius={4.5} speed={-0.15} color="#FFD700" count={40} />

      {/* Sparkles */}
      <Sparkles
        count={100}
        scale={10}
        size={2}
        speed={0.3}
        color="#00E5FF"
      />
      <Sparkles
        count={40}
        scale={8}
        size={3}
        speed={0.2}
        color="#FFD700"
      />
    </group>
  );
}
