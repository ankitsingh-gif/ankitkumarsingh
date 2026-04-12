"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function DistortionSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    const pointer = state.pointer;
    mouse.current.x += (pointer.x * 0.3 - mouse.current.x) * 0.03;
    mouse.current.y += (pointer.y * 0.3 - mouse.current.y) * 0.03;

    meshRef.current.rotation.x = t * 0.05 + mouse.current.y * 0.3;
    meshRef.current.rotation.y = t * 0.08 + mouse.current.x * 0.3;
  });

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.4}>
      {/* Move sphere to the RIGHT side so text on left is clear */}
      <group position={[3, 0.5, -2]}>
        <mesh ref={meshRef} scale={2.2}>
          <icosahedronGeometry args={[1, 64]} />
          <MeshDistortMaterial
            color="#0a0a18"
            emissive="#6e3bea"
            emissiveIntensity={0.06}
            roughness={0.2}
            metalness={0.95}
            distort={0.3}
            speed={1.5}
          />
        </mesh>
        {/* Wireframe ghost */}
        <mesh scale={2.4}>
          <icosahedronGeometry args={[1, 8]} />
          <meshBasicMaterial
            color="#6e3bea"
            wireframe
            transparent
            opacity={0.06}
          />
        </mesh>
      </group>
    </Float>
  );
}

function FloatingGrid() {
  const gridRef = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let i = -10; i <= 10; i += 2) {
      arr.push([i, -4, 0]);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = -Math.PI / 3;
      gridRef.current.position.y = -2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={gridRef} position={[0, -3, -5]}>
      {lines.map((pos, i) => (
        <mesh key={`h-${i}`} position={[pos[0], 0, 0]}>
          <boxGeometry args={[0.005, 20, 0.005]} />
          <meshBasicMaterial color="#6e3bea" transparent opacity={0.04} />
        </mesh>
      ))}
      {lines.map((pos, i) => (
        <mesh key={`v-${i}`} position={[0, pos[0], 0]}>
          <boxGeometry args={[20, 0.005, 0.005]} />
          <meshBasicMaterial color="#6e3bea" transparent opacity={0.04} />
        </mesh>
      ))}
    </group>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 600;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={600} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#8b5cf6"
        transparent
        opacity={0.25}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <group>
      <ambientLight intensity={0.03} />
      <spotLight
        position={[8, 6, 5]}
        intensity={1.2}
        color="#6e3bea"
        angle={0.4}
        penumbra={1}
      />
      <spotLight
        position={[-5, -5, 3]}
        intensity={0.5}
        color="#e8c547"
        angle={0.6}
        penumbra={1}
      />
      <pointLight position={[3, 2, 5]} intensity={0.2} color="#ffffff" />

      <DistortionSphere />
      <FloatingGrid />
      <Particles />

      <fog attach="fog" args={["#050505", 6, 25]} />
    </group>
  );
}
