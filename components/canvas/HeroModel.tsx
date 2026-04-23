"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  AdaptiveDpr,
  MeshDistortMaterial,
  Sparkles,
  Trail,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

/* =========================================================================
 * EYE-CATCHING AI VISUALIZATION
 * Morphing holographic sphere + orbit rings + sparkles + particles
 * =======================================================================*/

/* ---------- CENTRAL AI SPHERE — morphing, glowing ---------- */
function AISphere() {
  const mesh = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    const p = state.pointer;
    mouse.current.x += (p.x * 0.3 - mouse.current.x) * 0.03;
    mouse.current.y += (p.y * 0.3 - mouse.current.y) * 0.03;
    mesh.current.rotation.x = t * 0.08 + mouse.current.y * 0.4;
    mesh.current.rotation.y = t * 0.12 + mouse.current.x * 0.4;
  });

  return (
    <mesh ref={mesh} castShadow scale={1.35}>
      <icosahedronGeometry args={[1, 8]} />
      <MeshDistortMaterial
        color="#6C63FF"
        emissive="#00D4AA"
        emissiveIntensity={0.25}
        roughness={0.15}
        metalness={0.9}
        distort={0.35}
        speed={2.5}
        clearcoat={1}
        clearcoatRoughness={0.08}
      />
    </mesh>
  );
}

/* ---------- INNER GLOW CORE ---------- */
function InnerCore() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      ref.current.scale.setScalar(0.5 + Math.sin(t * 3) * 0.08);
      const mat = ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.6 + Math.sin(t * 2.5) * 0.3;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.55, 32, 32]} />
      <meshBasicMaterial
        color="#00ffcc"
        transparent
        opacity={0.7}
        toneMapped={false}
      />
    </mesh>
  );
}

/* ---------- ORBIT RING ---------- */
function OrbitRing({
  radius,
  speed,
  color,
  thickness = 0.015,
  tilt,
  opacity = 0.5,
}: {
  radius: number;
  speed: number;
  color: string;
  thickness?: number;
  tilt: [number, number, number];
  opacity?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      ref.current.rotation.z = t * speed;
    }
  });

  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, thickness, 16, 100]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        toneMapped={false}
      />
    </mesh>
  );
}

/* ---------- ORBITING ELECTRON ---------- */
function Electron({
  radius,
  speed,
  color,
  tilt,
  size = 0.06,
}: {
  radius: number;
  speed: number;
  color: string;
  tilt: [number, number, number];
  size?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const dot = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (group.current && dot.current) {
      const t = state.clock.elapsedTime * speed;
      dot.current.position.x = Math.cos(t) * radius;
      dot.current.position.z = Math.sin(t) * radius;
    }
  });

  return (
    <group ref={group} rotation={tilt}>
      <Trail
        width={0.8}
        length={6}
        color={color}
        attenuation={(w) => w * w}
      >
        <mesh ref={dot}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
      </Trail>
    </group>
  );
}

/* ---------- FLOATING PARTICLES around sphere ---------- */
function FloatingParticles() {
  const count = 120;
  const mesh = useRef<THREE.InstancedMesh>(null);

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.8 + Math.random() * 1.5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      spd[i] = 0.2 + Math.random() * 0.6;
    }
    return { positions: pos, speeds: spd };
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const x = positions[ix];
      const y = positions[ix + 1];
      const z = positions[ix + 2];
      const s = speeds[i];

      dummy.position.set(
        x * Math.cos(t * s * 0.3) - z * Math.sin(t * s * 0.3),
        y + Math.sin(t * s + i) * 0.15,
        x * Math.sin(t * s * 0.3) + z * Math.cos(t * s * 0.3)
      );
      const scale = 0.015 + Math.sin(t * 2 + i) * 0.008;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#a8b4ff" transparent opacity={0.8} toneMapped={false} />
    </instancedMesh>
  );
}

/* ---------- HEXAGONAL GRID HALO ---------- */
function HexGrid() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const rings = useMemo(() => {
    const items: { x: number; z: number; delay: number }[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      items.push({
        x: Math.cos(angle) * 2.6,
        z: Math.sin(angle) * 2.6,
        delay: i * 0.5,
      });
    }
    return items;
  }, []);

  return (
    <group ref={ref}>
      {rings.map((r, i) => (
        <HexRingDot key={i} x={r.x} z={r.z} delay={r.delay} />
      ))}
    </group>
  );
}

function HexRingDot({ x, z, delay }: { x: number; z: number; delay: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.5 + Math.sin(t * 2 + delay) * 0.5;
      ref.current.position.y = Math.sin(t * 1.5 + delay) * 0.15;
    }
  });

  return (
    <mesh ref={ref} position={[x, 0, z]}>
      <sphereGeometry args={[0.06, 12, 12]} />
      <meshStandardMaterial
        color="#6C63FF"
        emissive="#6C63FF"
        emissiveIntensity={0.8}
        toneMapped={false}
      />
    </mesh>
  );
}

/* ---------- SCENE ---------- */
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 5, 5]} intensity={0.9} color="#ffffff" />
      <directionalLight position={[-3, 3, 3]} intensity={0.5} color="#a0a8ff" />
      <pointLight position={[-2, 1, 4]} intensity={0.8} color="#6C63FF" distance={8} />
      <pointLight position={[3, -1, 3]} intensity={0.6} color="#00D4AA" distance={8} />
      <pointLight position={[0, 3, 0]} intensity={0.4} color="#ff80aa" distance={6} />

      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.5}>
        <group>
          {/* Central AI sphere */}
          <AISphere />

          {/* Inner glowing core */}
          <InnerCore />

          {/* Orbit rings */}
          <OrbitRing radius={2.0} speed={0.4} color="#6C63FF" thickness={0.012} tilt={[0.5, 0.2, 0]} opacity={0.5} />
          <OrbitRing radius={2.3} speed={-0.3} color="#00D4AA" thickness={0.01} tilt={[1.2, 0.5, 0.3]} opacity={0.4} />
          <OrbitRing radius={2.7} speed={0.2} color="#a78bfa" thickness={0.008} tilt={[0.8, -0.3, 0.5]} opacity={0.3} />

          {/* Orbiting electrons with trails */}
          <Electron radius={2.0} speed={1.2} color="#6C63FF" tilt={[0.5, 0.2, 0]} size={0.07} />
          <Electron radius={2.3} speed={-0.9} color="#00D4AA" tilt={[1.2, 0.5, 0.3]} size={0.06} />
          <Electron radius={2.7} speed={0.7} color="#ff80aa" tilt={[0.8, -0.3, 0.5]} size={0.05} />

          {/* Floating particles cloud */}
          <FloatingParticles />

          {/* Hex grid halo */}
          <HexGrid />
        </group>
      </Float>

      {/* Sparkles ambient */}
      <Sparkles
        count={60}
        scale={7}
        size={2}
        speed={0.4}
        color="#6C63FF"
        opacity={0.6}
      />
      <Sparkles
        count={30}
        scale={6}
        size={1.5}
        speed={0.3}
        color="#00D4AA"
        opacity={0.5}
      />

      {/* Shadow */}
      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.3}
        scale={8}
        blur={3}
        far={4}
        color="#1a1e3a"
      />
    </>
  );
}

/* ---------- EXPORT ---------- */
export default function HeroModel() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0.5, 6], fov: 42 }}
        dpr={[1, 2]}
        shadows
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
