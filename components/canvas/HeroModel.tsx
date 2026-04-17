"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, AdaptiveDpr, ContactShadows, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/* =========================================================================
 * ENERGETIC WAVING AI ROBOT — SAYING "HI!"
 * =======================================================================*/

const COLORS = {
  bodyLight: "#f8f8fa",
  bodyMid: "#e8e8ee",
  bodyDark: "#b8b8c4",
  accent: "#6C63FF",
  accent2: "#00D4AA",
  screen: "#0a0d1f",
  glow: "#4AE3FF",
  joint: "#2d3142",
};

/* ---------- HEAD ---------- */
function RobotHead() {
  const head = useRef<THREE.Group>(null);
  const blinkL = useRef<THREE.Mesh>(null);
  const blinkR = useRef<THREE.Mesh>(null);
  const antenna = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (head.current) {
      // Energetic head bob
      head.current.rotation.z = Math.sin(t * 2.2) * 0.04;
      head.current.position.y = 1.05 + Math.sin(t * 3) * 0.015;
      const p = state.pointer;
      head.current.rotation.y = p.x * 0.18 + Math.sin(t * 0.7) * 0.03;
      head.current.rotation.x = -p.y * 0.1;
    }

    // Quick happy blink
    const blink = Math.sin(t * 1.8) > 0.96 ? 0.08 : 1;
    if (blinkL.current) blinkL.current.scale.y = blink;
    if (blinkR.current) blinkR.current.scale.y = blink;

    // Antenna wiggles energetically
    if (antenna.current) {
      antenna.current.rotation.z = Math.sin(t * 4) * 0.15;
      antenna.current.rotation.x = Math.cos(t * 3) * 0.08;
    }
  });

  return (
    <group ref={head} position={[0, 1.05, 0]}>
      {/* Head main body */}
      <RoundedBox args={[1.45, 1.15, 1.1]} radius={0.3} smoothness={5} castShadow>
        <meshPhysicalMaterial
          color={COLORS.bodyLight}
          metalness={0.15}
          roughness={0.22}
          clearcoat={1}
          clearcoatRoughness={0.08}
        />
      </RoundedBox>

      {/* ===== SCREEN FACE ===== */}
      <group position={[0, 0, 0.56]}>
        {/* Screen base - dark */}
        <RoundedBox args={[1.15, 0.78, 0.08]} radius={0.14} smoothness={5}>
          <meshPhysicalMaterial
            color={COLORS.screen}
            metalness={0.7}
            roughness={0.18}
            clearcoat={1}
            clearcoatRoughness={0.02}
          />
        </RoundedBox>

        {/* Left eye — big glowing circle */}
        <group position={[-0.26, 0.08, 0.05]}>
          <mesh ref={blinkL}>
            <circleGeometry args={[0.13, 32]} />
            <meshBasicMaterial color={COLORS.glow} toneMapped={false} />
          </mesh>
          {/* Eye glow aura */}
          <mesh position={[0, 0, -0.002]}>
            <circleGeometry args={[0.2, 32]} />
            <meshBasicMaterial color={COLORS.glow} transparent opacity={0.35} toneMapped={false} />
          </mesh>
          {/* Eye highlight */}
          <mesh position={[0.04, 0.04, 0.003]}>
            <circleGeometry args={[0.04, 16]} />
            <meshBasicMaterial color="#ffffff" toneMapped={false} />
          </mesh>
        </group>

        {/* Right eye */}
        <group position={[0.26, 0.08, 0.05]}>
          <mesh ref={blinkR}>
            <circleGeometry args={[0.13, 32]} />
            <meshBasicMaterial color={COLORS.glow} toneMapped={false} />
          </mesh>
          <mesh position={[0, 0, -0.002]}>
            <circleGeometry args={[0.2, 32]} />
            <meshBasicMaterial color={COLORS.glow} transparent opacity={0.35} toneMapped={false} />
          </mesh>
          <mesh position={[0.04, 0.04, 0.003]}>
            <circleGeometry args={[0.04, 16]} />
            <meshBasicMaterial color="#ffffff" toneMapped={false} />
          </mesh>
        </group>

        {/* ===== HAPPY SMILE (U-shape, opening UP = happy) ===== */}
        <mesh position={[0, -0.2, 0.05]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.18, 0.022, 16, 32, Math.PI]} />
          <meshBasicMaterial color={COLORS.glow} toneMapped={false} />
        </mesh>
        {/* Smile glow halo */}
        <mesh position={[0, -0.2, 0.04]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.18, 0.045, 16, 32, Math.PI]} />
          <meshBasicMaterial color={COLORS.glow} transparent opacity={0.3} toneMapped={false} />
        </mesh>
      </group>

      {/* Screen bezel highlights */}
      <mesh position={[0, 0.4, 0.55]}>
        <boxGeometry args={[1.15, 0.02, 0.03]} />
        <meshPhysicalMaterial color={COLORS.bodyLight} metalness={0.3} roughness={0.25} />
      </mesh>

      {/* ===== EARS ===== */}
      <group position={[-0.79, -0.05, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.2, 32]} />
          <meshPhysicalMaterial color={COLORS.accent} metalness={0.25} roughness={0.35} clearcoat={0.8} />
        </mesh>
        {/* Ear inner ring */}
        <mesh position={[-0.11, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.09, 0.09, 0.015, 32]} />
          <meshBasicMaterial color={COLORS.bodyLight} />
        </mesh>
      </group>

      <group position={[0.79, -0.05, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.2, 32]} />
          <meshPhysicalMaterial color={COLORS.accent} metalness={0.25} roughness={0.35} clearcoat={0.8} />
        </mesh>
        <mesh position={[0.11, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.09, 0.09, 0.015, 32]} />
          <meshBasicMaterial color={COLORS.bodyLight} />
        </mesh>
      </group>

      {/* ===== ANTENNA ===== */}
      <group ref={antenna} position={[0.08, 0.62, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.025, 0.03, 0.4, 12]} />
          <meshPhysicalMaterial color={COLORS.bodyDark} metalness={0.7} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.26, 0]}>
          <sphereGeometry args={[0.085, 32, 32]} />
          <meshPhysicalMaterial
            color={COLORS.accent}
            metalness={0.25}
            roughness={0.2}
            emissive={COLORS.accent}
            emissiveIntensity={0.5}
            clearcoat={1}
          />
        </mesh>
      </group>

      {/* Neck */}
      <mesh position={[0, -0.62, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.22, 0.13, 24]} />
        <meshPhysicalMaterial color={COLORS.joint} metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

/* ---------- BODY ---------- */
function RobotBody() {
  const body = useRef<THREE.Group>(null);
  const chest = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Energetic body bounce
    if (body.current) {
      body.current.position.y = -0.1 + Math.sin(t * 3) * 0.02;
      body.current.rotation.z = Math.sin(t * 2) * 0.02;
    }
    // Pulsing chest indicator
    if (chest.current) {
      const mat = chest.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.6 + Math.sin(t * 3) * 0.4;
    }
  });

  return (
    <group ref={body} position={[0, -0.1, 0]}>
      {/* Main torso */}
      <RoundedBox args={[1.2, 1.3, 1.0]} radius={0.38} smoothness={5} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={COLORS.bodyLight}
          metalness={0.15}
          roughness={0.28}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>

      {/* Chest panel line */}
      <mesh position={[0, 0.2, 0.5]}>
        <boxGeometry args={[0.75, 0.015, 0.008]} />
        <meshPhysicalMaterial color={COLORS.bodyDark} metalness={0.4} roughness={0.35} />
      </mesh>

      {/* Glowing chest indicator */}
      <mesh ref={chest} position={[0, -0.1, 0.5]}>
        <circleGeometry args={[0.08, 32]} />
        <meshStandardMaterial
          color={COLORS.accent2}
          emissive={COLORS.accent2}
          emissiveIntensity={0.7}
          toneMapped={false}
        />
      </mesh>
      {/* Chest glow halo */}
      <mesh position={[0, -0.1, 0.495]}>
        <circleGeometry args={[0.14, 32]} />
        <meshBasicMaterial color={COLORS.accent2} transparent opacity={0.3} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ---------- WAVING RIGHT ARM (raised high) ---------- */
function WavingArm() {
  const shoulder = useRef<THREE.Group>(null);
  const forearm = useRef<THREE.Group>(null);
  const hand = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (shoulder.current) {
      // Arm raised up and waving from side to side
      shoulder.current.rotation.z = -1.35 + Math.sin(t * 3.5) * 0.2;
      shoulder.current.rotation.y = 0.1;
      shoulder.current.rotation.x = -0.2;
    }
    if (forearm.current) {
      // Forearm slight wave
      forearm.current.rotation.z = -0.35 + Math.sin(t * 3.5 + 0.5) * 0.15;
    }
    if (hand.current) {
      // Hand wiggling
      hand.current.rotation.z = Math.sin(t * 6) * 0.2;
    }
  });

  return (
    <group ref={shoulder} position={[0.6, 0.4, 0]}>
      {/* Shoulder joint */}
      <mesh castShadow>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshPhysicalMaterial color={COLORS.joint} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Upper arm */}
      <mesh position={[0.3, 0, 0]} rotation={[0, 0, 0]} castShadow>
        <capsuleGeometry args={[0.1, 0.4, 16, 24]} />
        <meshPhysicalMaterial color={COLORS.bodyLight} metalness={0.15} roughness={0.28} clearcoat={0.9} />
      </mesh>

      {/* Elbow + Forearm */}
      <group ref={forearm} position={[0.58, 0, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.11, 20, 20]} />
          <meshPhysicalMaterial color={COLORS.joint} metalness={0.8} roughness={0.3} />
        </mesh>

        <mesh position={[0.22, 0, 0]} castShadow>
          <capsuleGeometry args={[0.095, 0.32, 16, 24]} />
          <meshPhysicalMaterial color={COLORS.bodyLight} metalness={0.15} roughness={0.28} clearcoat={0.9} />
        </mesh>

        {/* Wrist + Hand */}
        <group ref={hand} position={[0.48, 0, 0]}>
          {/* Wrist joint */}
          <mesh castShadow>
            <sphereGeometry args={[0.09, 20, 20]} />
            <meshPhysicalMaterial color={COLORS.joint} metalness={0.7} roughness={0.3} />
          </mesh>

          {/* Palm base — purple sphere */}
          <mesh position={[0.14, 0, 0]} castShadow>
            <sphereGeometry args={[0.16, 28, 28]} />
            <meshPhysicalMaterial
              color={COLORS.accent}
              metalness={0.2}
              roughness={0.3}
              clearcoat={1}
            />
          </mesh>

          {/* Upper claw prong */}
          <mesh position={[0.3, 0.11, 0]} rotation={[0, 0, -0.25]}>
            <torusGeometry args={[0.08, 0.04, 16, 24, Math.PI * 0.9]} />
            <meshPhysicalMaterial color={COLORS.accent} metalness={0.2} roughness={0.3} clearcoat={1} />
          </mesh>
          {/* Lower claw prong */}
          <mesh position={[0.3, -0.11, 0]} rotation={[0, 0, 0.25 + Math.PI]}>
            <torusGeometry args={[0.08, 0.04, 16, 24, Math.PI * 0.9]} />
            <meshPhysicalMaterial color={COLORS.accent} metalness={0.2} roughness={0.3} clearcoat={1} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* ---------- OPPOSITE ARM (extended out cheerfully) ---------- */
function OpenArm() {
  const shoulder = useRef<THREE.Group>(null);
  const hand = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (shoulder.current) {
      // Arm extended out with slight bounce
      shoulder.current.rotation.z = 0.5 + Math.sin(t * 2) * 0.08;
      shoulder.current.rotation.y = -0.1;
    }
    if (hand.current) {
      hand.current.rotation.z = Math.sin(t * 3) * 0.1;
    }
  });

  return (
    <group ref={shoulder} position={[-0.6, 0.4, 0]}>
      {/* Shoulder joint */}
      <mesh castShadow>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshPhysicalMaterial color={COLORS.joint} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Upper arm — extending out/down */}
      <mesh position={[-0.3, 0, 0]} castShadow>
        <capsuleGeometry args={[0.1, 0.4, 16, 24]} />
        <meshPhysicalMaterial color={COLORS.bodyLight} metalness={0.15} roughness={0.28} clearcoat={0.9} />
      </mesh>

      {/* Elbow */}
      <mesh position={[-0.58, 0, 0]} castShadow>
        <sphereGeometry args={[0.11, 20, 20]} />
        <meshPhysicalMaterial color={COLORS.joint} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Forearm */}
      <mesh position={[-0.8, 0, 0]} castShadow>
        <capsuleGeometry args={[0.095, 0.32, 16, 24]} />
        <meshPhysicalMaterial color={COLORS.bodyLight} metalness={0.15} roughness={0.28} clearcoat={0.9} />
      </mesh>

      {/* Hand */}
      <group ref={hand} position={[-1.06, 0, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.09, 20, 20]} />
          <meshPhysicalMaterial color={COLORS.joint} metalness={0.7} roughness={0.3} />
        </mesh>

        <mesh position={[-0.14, 0, 0]} castShadow>
          <sphereGeometry args={[0.16, 28, 28]} />
          <meshPhysicalMaterial color={COLORS.accent} metalness={0.2} roughness={0.3} clearcoat={1} />
        </mesh>

        {/* Claws — pointing outward */}
        <mesh position={[-0.3, 0.11, 0]} rotation={[0, 0, Math.PI + 0.25]}>
          <torusGeometry args={[0.08, 0.04, 16, 24, Math.PI * 0.9]} />
          <meshPhysicalMaterial color={COLORS.accent} metalness={0.2} roughness={0.3} clearcoat={1} />
        </mesh>
        <mesh position={[-0.3, -0.11, 0]} rotation={[0, 0, -0.25]}>
          <torusGeometry args={[0.08, 0.04, 16, 24, Math.PI * 0.9]} />
          <meshPhysicalMaterial color={COLORS.accent} metalness={0.2} roughness={0.3} clearcoat={1} />
        </mesh>
      </group>
    </group>
  );
}

/* ---------- WHOLE ROBOT ---------- */
function Robot() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      const t = state.clock.elapsedTime;
      // Excited body sway
      group.current.rotation.y = Math.sin(t * 0.6) * 0.08;
      group.current.rotation.z = Math.sin(t * 1.2) * 0.02;
    }
  });

  return (
    <group ref={group} position={[0, -0.2, 0]} scale={0.95}>
      <RobotHead />
      <RobotBody />
      <WavingArm />
      <OpenArm />
    </group>
  );
}

/* ---------- SCENE ---------- */
function Scene() {
  return (
    <>
      {/* Lights — bright, friendly setup */}
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.3}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 3, 3]} intensity={0.6} color="#b8c4ff" />
      <pointLight position={[-2, 2, 4]} intensity={0.5} color={COLORS.accent} />
      <pointLight position={[3, -1, 3]} intensity={0.5} color={COLORS.accent2} />
      {/* Back rim light */}
      <directionalLight position={[0, 3, -5]} intensity={0.4} color="#ffffff" />

      {/* Bouncy float wrapper */}
      <Float speed={3} rotationIntensity={0.15} floatIntensity={0.8}>
        <Robot />
      </Float>

      {/* Floating shadow */}
      <ContactShadows
        position={[0, -1.95, 0]}
        opacity={0.45}
        scale={5}
        blur={2.6}
        far={3}
        color="#1a1a2e"
      />
    </>
  );
}

/* ---------- EXPORTED CANVAS ---------- */
export default function HeroModel() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0.3, 5.2], fov: 38 }}
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
