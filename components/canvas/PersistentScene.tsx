"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";

function FloatingMesh() {
  const ref = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const p = state.pointer;
    mouse.current.x += (p.x * 0.15 - mouse.current.x) * 0.02;
    mouse.current.y += (p.y * 0.15 - mouse.current.y) * 0.02;
    ref.current.rotation.x = t * 0.08 + mouse.current.y * 0.3;
    ref.current.rotation.y = t * 0.1 + mouse.current.x * 0.3;
  });
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.4}>
      <mesh ref={ref} position={[2.5, 0, -3]} scale={2}>
        <torusKnotGeometry args={[1, 0.3, 128, 32, 2, 3]} />
        <MeshDistortMaterial color="#6C63FF" emissive="#6C63FF" emissiveIntensity={0.1} roughness={0.2} metalness={0.8} distort={0.2} speed={2} transparent opacity={0.3} />
      </mesh>
    </Float>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 500; const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) { pos[i*3]=(Math.random()-0.5)*30; pos[i*3+1]=(Math.random()-0.5)*30; pos[i*3+2]=(Math.random()-0.5)*20-5; }
    return pos;
  }, []);
  useFrame((state) => { if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.01; });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} count={500} /></bufferGeometry>
      <pointsMaterial size={0.015} color="#6C63FF" transparent opacity={0.2} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

function Scene() {
  return (<>
    <ambientLight intensity={0.1} />
    <pointLight position={[5,5,5]} intensity={0.5} color="#6C63FF" />
    <pointLight position={[-5,-3,3]} intensity={0.3} color="#00D4AA" />
    <FloatingMesh /><Particles />
    <fog attach="fog" args={["#0A0A0F", 8, 25]} />
  </>);
}

export default function PersistentScene() {
  return (
    <div className="canvas-bg">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}>
        <Suspense fallback={null}><Scene /><AdaptiveDpr pixelated /></Suspense>
      </Canvas>
    </div>
  );
}
