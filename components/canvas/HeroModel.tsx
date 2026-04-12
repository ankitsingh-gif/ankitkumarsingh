"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";

/* ===== CUTE AI ROBOT built from Three.js primitives ===== */

function RobotHead() {
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);
  const antennaRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const blink = Math.sin(t * 3) > 0.97 ? 0.1 : 1;
    if (eyeLeftRef.current) eyeLeftRef.current.scale.y = blink;
    if (eyeRightRef.current) eyeRightRef.current.scale.y = blink;
    if (antennaRef.current) {
      antennaRef.current.rotation.z = Math.sin(t * 2) * 0.1;
    }
  });

  return (
    <group position={[0, 0.8, 0]}>
      <mesh>
        <capsuleGeometry args={[0.55, 0.2, 16, 16]} />
        <meshStandardMaterial color="#e8e8ee" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.45]}>
        <boxGeometry args={[0.85, 0.45, 0.15]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.1} />
      </mesh>
      <mesh ref={eyeLeftRef} position={[-0.2, 0.02, 0.55]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#00e5ff" />
      </mesh>
      <mesh ref={eyeRightRef} position={[0.2, 0.02, 0.55]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#00e5ff" />
      </mesh>
      <mesh position={[-0.58, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.15, 16]} />
        <meshStandardMaterial color="#c0c0cc" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[-0.58, 0, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>
      <mesh position={[0.58, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.15, 16]} />
        <meshStandardMaterial color="#c0c0cc" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0.58, 0, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>
      <group ref={antennaRef} position={[0.15, 0.55, 0]}>
        <mesh>
          <cylinderGeometry args={[0.015, 0.015, 0.35, 8]} />
          <meshStandardMaterial color="#c0c0cc" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#00e5ff" />
        </mesh>
      </group>
    </group>
  );
}

function RobotBody() {
  return (
    <group position={[0, -0.1, 0]}>
      <mesh>
        <capsuleGeometry args={[0.35, 0.3, 16, 16]} />
        <meshStandardMaterial color="#e0e0e8" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.1, 0.35]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 0.15, 16]} />
        <meshStandardMaterial color="#888" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}

function RobotArms() {
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (rightArmRef.current) {
      rightArmRef.current.rotation.x = -0.8 + Math.sin(t * 4) * 0.05;
    }
    if (leftArmRef.current) {
      leftArmRef.current.rotation.x = -0.7 + Math.sin(t * 4 + 1) * 0.05;
    }
  });

  return (
    <>
      <group ref={leftArmRef} position={[-0.45, -0.05, 0]}>
        <mesh position={[0, -0.2, 0.15]}>
          <capsuleGeometry args={[0.06, 0.25, 8, 8]} />
          <meshStandardMaterial color="#d0d0d8" metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.4, 0.25]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#333" metalness={0.4} roughness={0.3} />
        </mesh>
      </group>
      <group ref={rightArmRef} position={[0.45, -0.05, 0]}>
        <mesh position={[0, -0.2, 0.15]}>
          <capsuleGeometry args={[0.06, 0.25, 8, 8]} />
          <meshStandardMaterial color="#d0d0d8" metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.4, 0.25]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#333" metalness={0.4} roughness={0.3} />
        </mesh>
      </group>
    </>
  );
}

function Laptop() {
  return (
    <group position={[0, -0.65, 0.4]} rotation={[-0.2, 0, 0]}>
      <mesh>
        <boxGeometry args={[0.7, 0.03, 0.45]} />
        <meshStandardMaterial color="#c8c8d0" metalness={0.5} roughness={0.3} />
      </mesh>
      <group position={[0, 0.25, -0.2]} rotation={[0.5, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.65, 0.45, 0.02]} />
          <meshStandardMaterial color="#c8c8d0" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.015]}>
          <boxGeometry args={[0.55, 0.35, 0.005]} />
          <meshBasicMaterial color="#a855f7" opacity={0.4} transparent />
        </mesh>
      </group>
    </group>
  );
}

function Robot() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!groupRef.current) return;
    const p = state.pointer;
    mouse.current.x += (p.x * 0.15 - mouse.current.x) * 0.03;
    mouse.current.y += (p.y * 0.1 - mouse.current.y) * 0.03;
    groupRef.current.rotation.y = mouse.current.x;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.4}>
      <group ref={groupRef} scale={1.3} position={[0, -0.3, 0]}>
        <RobotHead />
        <RobotBody />
        <RobotArms />
        <Laptop />
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-3, 2, 3]} intensity={0.8} color="#a855f7" />
      <pointLight position={[3, -1, 2]} intensity={0.4} color="#ec4899" />
      <pointLight position={[0, 3, -2]} intensity={0.3} color="#3b82f6" />
      <Robot />
    </>
  );
}

export default function HeroModel() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0.5, 3.5], fov: 40 }}
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
