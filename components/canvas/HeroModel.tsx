"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, AdaptiveDpr, ContactShadows, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/* =========================================================================
 * PROFESSIONAL 3D CHARACTER ROBOT — matching reference
 * Dark navy/teal body, dome head, dual antennas, chest screen, legs
 * =======================================================================*/

const COLORS = {
  body: "#3d4c6e",        // main navy teal
  bodyDark: "#2a3550",    // shadows
  bodyLight: "#5467a0",   // highlights/panels
  metallic: "#7a88b0",    // bright metallic edges
  joint: "#1a2238",       // dark joints
  cyan: "#4ae8ff",        // cyan glow (eyes, chest)
  yellow: "#ffdc4a",      // antenna tips
  pink: "#ff6b9d",        // ear accents
  white: "#e8ecf5",       // panel inserts
};

/* ---------- DOME HEAD ---------- */
function RobotHead() {
  const head = useRef<THREE.Group>(null);
  const pupilL = useRef<THREE.Mesh>(null);
  const pupilR = useRef<THREE.Mesh>(null);
  const antennaL = useRef<THREE.Group>(null);
  const antennaR = useRef<THREE.Group>(null);
  const tipL = useRef<THREE.Mesh>(null);
  const tipR = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Head tilt follows pointer + subtle idle
    if (head.current) {
      const p = state.pointer;
      head.current.rotation.y = p.x * 0.2 + Math.sin(t * 0.5) * 0.04;
      head.current.rotation.x = -p.y * 0.1 + Math.sin(t * 0.7) * 0.02;
      head.current.rotation.z = Math.sin(t * 0.9) * 0.02;
    }

    // Eye pupils look around
    const look = Math.sin(t * 0.8) * 0.025;
    if (pupilL.current) pupilL.current.position.x = -0.26 + look;
    if (pupilR.current) pupilR.current.position.x = 0.26 + look;

    // Antenna wiggle
    if (antennaL.current) antennaL.current.rotation.z = 0.25 + Math.sin(t * 3) * 0.08;
    if (antennaR.current) antennaR.current.rotation.z = -0.25 + Math.sin(t * 3 + 0.4) * 0.08;

    // Antenna tips pulse between yellow and cyan
    if (tipL.current) {
      const mat = tipL.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.8 + Math.sin(t * 3.5) * 0.5;
    }
    if (tipR.current) {
      const mat = tipR.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.8 + Math.sin(t * 3.5 + 1) * 0.5;
    }
  });

  return (
    <group ref={head} position={[0, 1.1, 0]}>
      {/* ===== DOME — flattened oval sphere ===== */}
      <mesh castShadow scale={[1.15, 1, 1.1]}>
        <sphereGeometry args={[0.95, 48, 48]} />
        <meshPhysicalMaterial
          color={COLORS.body}
          metalness={0.45}
          roughness={0.35}
          clearcoat={0.9}
          clearcoatRoughness={0.15}
        />
      </mesh>

      {/* Subtle dark bottom cap (chin area) */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.8, 0.75, 0.15, 32]} />
        <meshPhysicalMaterial color={COLORS.bodyDark} metalness={0.5} roughness={0.4} />
      </mesh>

      {/* ===== LEFT EYE (speaker-grill housing) ===== */}
      <group position={[-0.33, 0.02, 0.78]}>
        {/* Outer ring */}
        <mesh castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.12, 32]} />
          <meshPhysicalMaterial color={COLORS.bodyDark} metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Inner recessed black ring */}
        <mesh position={[0, 0.063, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.01, 32]} />
          <meshPhysicalMaterial color="#0a0e1a" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Eye glow base */}
        <mesh position={[0, 0.07, 0]}>
          <circleGeometry args={[0.22, 32]} />
          <meshBasicMaterial color={COLORS.cyan} transparent opacity={0.4} toneMapped={false} />
        </mesh>
        {/* Bright pupil */}
        <mesh ref={pupilL} position={[-0.26, 0.072, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.14, 32]} />
          <meshBasicMaterial color={COLORS.cyan} toneMapped={false} />
        </mesh>
        {/* White highlight */}
        <mesh position={[-0.21, 0.074, 0.03]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.04, 16]} />
          <meshBasicMaterial color="#ffffff" toneMapped={false} />
        </mesh>
      </group>

      {/* ===== RIGHT EYE ===== */}
      <group position={[0.33, 0.02, 0.78]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.12, 32]} />
          <meshPhysicalMaterial color={COLORS.bodyDark} metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.063, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.01, 32]} />
          <meshPhysicalMaterial color="#0a0e1a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.07, 0]}>
          <circleGeometry args={[0.22, 32]} />
          <meshBasicMaterial color={COLORS.cyan} transparent opacity={0.4} toneMapped={false} />
        </mesh>
        <mesh ref={pupilR} position={[0.26, 0.072, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.14, 32]} />
          <meshBasicMaterial color={COLORS.cyan} toneMapped={false} />
        </mesh>
        <mesh position={[0.31, 0.074, 0.03]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.04, 16]} />
          <meshBasicMaterial color="#ffffff" toneMapped={false} />
        </mesh>
      </group>

      {/* ===== SIDE "EAR" — pink accent disc ===== */}
      <group position={[-0.93, 0, 0]} rotation={[0, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.16, 0.16, 0.14, 32]} />
          <meshPhysicalMaterial color={COLORS.bodyDark} metalness={0.5} roughness={0.4} />
        </mesh>
        {/* Pink inner */}
        <mesh position={[-0.072, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.015, 32]} />
          <meshStandardMaterial
            color={COLORS.pink}
            emissive={COLORS.pink}
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      <group position={[0.93, 0, 0]} rotation={[0, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.16, 0.16, 0.14, 32]} />
          <meshPhysicalMaterial color={COLORS.bodyDark} metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0.072, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.015, 32]} />
          <meshStandardMaterial
            color={COLORS.pink}
            emissive={COLORS.pink}
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* ===== ANTENNAS (two) ===== */}
      {/* Left antenna */}
      <group ref={antennaL} position={[-0.32, 0.72, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.025, 0.03, 0.5, 12]} />
          <meshPhysicalMaterial color={COLORS.metallic} metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh ref={tipL} position={[0, 0.3, 0]} castShadow>
          <sphereGeometry args={[0.08, 24, 24]} />
          <meshStandardMaterial
            color={COLORS.yellow}
            emissive={COLORS.yellow}
            emissiveIntensity={1}
            toneMapped={false}
          />
        </mesh>
        {/* Glow halo */}
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshBasicMaterial color={COLORS.yellow} transparent opacity={0.25} toneMapped={false} />
        </mesh>
      </group>

      {/* Right antenna */}
      <group ref={antennaR} position={[0.32, 0.72, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.025, 0.03, 0.5, 12]} />
          <meshPhysicalMaterial color={COLORS.metallic} metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh ref={tipR} position={[0, 0.3, 0]} castShadow>
          <sphereGeometry args={[0.08, 24, 24]} />
          <meshStandardMaterial
            color={COLORS.cyan}
            emissive={COLORS.cyan}
            emissiveIntensity={1}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshBasicMaterial color={COLORS.cyan} transparent opacity={0.25} toneMapped={false} />
        </mesh>
      </group>

      {/* Subtle panel seam on top */}
      <mesh position={[0, 0.75, 0]}>
        <torusGeometry args={[0.4, 0.01, 8, 32]} />
        <meshPhysicalMaterial color={COLORS.bodyDark} metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}

/* ---------- NECK ---------- */
function Neck() {
  return (
    <group position={[0, 0.32, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.22, 0.25, 0.2, 24]} />
        <meshPhysicalMaterial color={COLORS.joint} metalness={0.75} roughness={0.3} />
      </mesh>
      {/* Ring detail */}
      <mesh>
        <torusGeometry args={[0.23, 0.015, 8, 32]} />
        <meshPhysicalMaterial color={COLORS.metallic} metalness={0.8} roughness={0.25} />
      </mesh>
    </group>
  );
}

/* ---------- BODY ---------- */
function RobotBody() {
  const chest = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (chest.current) {
      const mat = chest.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.7 + Math.sin(state.clock.elapsedTime * 2.2) * 0.3;
    }
  });

  return (
    <group position={[0, -0.35, 0]}>
      {/* Main torso */}
      <RoundedBox args={[1.1, 1.15, 0.95]} radius={0.18} smoothness={4} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={COLORS.body}
          metalness={0.45}
          roughness={0.35}
          clearcoat={0.9}
          clearcoatRoughness={0.15}
        />
      </RoundedBox>

      {/* Dark belt/waist */}
      <RoundedBox args={[1.13, 0.15, 0.98]} radius={0.06} smoothness={3} position={[0, -0.55, 0]}>
        <meshPhysicalMaterial color={COLORS.bodyDark} metalness={0.5} roughness={0.35} />
      </RoundedBox>

      {/* Chest screen housing */}
      <RoundedBox args={[0.55, 0.55, 0.06]} radius={0.08} smoothness={3} position={[0, 0.05, 0.48]}>
        <meshPhysicalMaterial color={COLORS.bodyDark} metalness={0.6} roughness={0.3} />
      </RoundedBox>

      {/* Chest screen — dark glass */}
      <RoundedBox args={[0.45, 0.45, 0.04]} radius={0.06} smoothness={3} position={[0, 0.05, 0.515]}>
        <meshPhysicalMaterial color="#0a0e1a" metalness={0.7} roughness={0.2} clearcoat={1} />
      </RoundedBox>

      {/* Cyan glow data lines on chest screen */}
      {[0.12, 0.04, -0.04, -0.12].map((y, i) => (
        <mesh key={i} position={[-0.05, 0.05 + y, 0.54]}>
          <planeGeometry args={[0.25, 0.02]} />
          <meshBasicMaterial color={COLORS.cyan} transparent opacity={0.7 - i * 0.12} toneMapped={false} />
        </mesh>
      ))}

      {/* Central glowing chest core */}
      <mesh ref={chest} position={[0, 0.05, 0.545]}>
        <circleGeometry args={[0.05, 32]} />
        <meshStandardMaterial
          color={COLORS.cyan}
          emissive={COLORS.cyan}
          emissiveIntensity={1}
          toneMapped={false}
        />
      </mesh>

      {/* Side panel lines */}
      <mesh position={[-0.56, 0, 0.2]}>
        <boxGeometry args={[0.01, 0.8, 0.02]} />
        <meshPhysicalMaterial color={COLORS.bodyDark} />
      </mesh>
      <mesh position={[0.56, 0, 0.2]}>
        <boxGeometry args={[0.01, 0.8, 0.02]} />
        <meshPhysicalMaterial color={COLORS.bodyDark} />
      </mesh>
    </group>
  );
}

/* ---------- POINTING ARM (RIGHT) ---------- */
function PointingArm() {
  const shoulder = useRef<THREE.Group>(null);
  const forearm = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (shoulder.current) {
      // Shoulder raised upward, slight bounce
      shoulder.current.rotation.z = -1.1 + Math.sin(t * 2.5) * 0.08;
      shoulder.current.rotation.x = -0.2;
    }
    if (forearm.current) {
      // Forearm pointing up energetically
      forearm.current.rotation.z = -1.2 + Math.sin(t * 2.5 + 0.3) * 0.05;
    }
  });

  return (
    <group ref={shoulder} position={[0.58, -0.1, 0.1]}>
      {/* Shoulder joint */}
      <mesh castShadow>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshPhysicalMaterial color={COLORS.joint} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Upper arm */}
      <mesh position={[0.24, 0, 0]} castShadow>
        <capsuleGeometry args={[0.085, 0.32, 12, 24]} />
        <meshPhysicalMaterial color={COLORS.body} metalness={0.45} roughness={0.35} clearcoat={0.8} />
      </mesh>

      {/* Elbow + forearm */}
      <group ref={forearm} position={[0.46, 0, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.1, 20, 20]} />
          <meshPhysicalMaterial color={COLORS.joint} metalness={0.8} roughness={0.3} />
        </mesh>

        <mesh position={[0.18, 0, 0]} castShadow>
          <capsuleGeometry args={[0.08, 0.26, 12, 24]} />
          <meshPhysicalMaterial color={COLORS.body} metalness={0.45} roughness={0.35} clearcoat={0.8} />
        </mesh>

        {/* Wrist */}
        <mesh position={[0.36, 0, 0]} castShadow>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshPhysicalMaterial color={COLORS.joint} metalness={0.7} roughness={0.3} />
        </mesh>

        {/* HAND (fist-like) */}
        <group position={[0.46, 0, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.11, 24, 24]} />
            <meshPhysicalMaterial color={COLORS.body} metalness={0.45} roughness={0.35} clearcoat={0.8} />
          </mesh>
          {/* Pointing INDEX FINGER */}
          <mesh position={[0.14, 0.02, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
            <capsuleGeometry args={[0.04, 0.14, 8, 16]} />
            <meshPhysicalMaterial color={COLORS.body} metalness={0.45} roughness={0.35} clearcoat={0.8} />
          </mesh>
          {/* Fingertip glow */}
          <mesh position={[0.14, 0.11, 0]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial
              color={COLORS.cyan}
              emissive={COLORS.cyan}
              emissiveIntensity={0.8}
              toneMapped={false}
            />
          </mesh>
          <mesh position={[0.14, 0.11, 0]}>
            <sphereGeometry args={[0.065, 16, 16]} />
            <meshBasicMaterial color={COLORS.cyan} transparent opacity={0.3} toneMapped={false} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* ---------- RELAXED ARM (LEFT) ---------- */
function RelaxedArm() {
  const shoulder = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (shoulder.current) {
      shoulder.current.rotation.z = 0.15 + Math.sin(t * 1.5) * 0.05;
    }
  });

  return (
    <group ref={shoulder} position={[-0.58, -0.1, 0.1]}>
      <mesh castShadow>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshPhysicalMaterial color={COLORS.joint} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Upper arm — down */}
      <mesh position={[-0.02, -0.3, 0]} rotation={[0, 0, -0.1]} castShadow>
        <capsuleGeometry args={[0.085, 0.32, 12, 24]} />
        <meshPhysicalMaterial color={COLORS.body} metalness={0.45} roughness={0.35} clearcoat={0.8} />
      </mesh>

      {/* Elbow */}
      <mesh position={[-0.06, -0.52, 0]} castShadow>
        <sphereGeometry args={[0.1, 20, 20]} />
        <meshPhysicalMaterial color={COLORS.joint} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Forearm */}
      <mesh position={[-0.08, -0.72, 0]} rotation={[0, 0, -0.05]} castShadow>
        <capsuleGeometry args={[0.08, 0.26, 12, 24]} />
        <meshPhysicalMaterial color={COLORS.body} metalness={0.45} roughness={0.35} clearcoat={0.8} />
      </mesh>

      {/* Wrist + hand */}
      <mesh position={[-0.1, -0.9, 0]} castShadow>
        <sphereGeometry args={[0.075, 16, 16]} />
        <meshPhysicalMaterial color={COLORS.joint} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[-0.11, -1.02, 0]} castShadow>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshPhysicalMaterial color={COLORS.body} metalness={0.45} roughness={0.35} clearcoat={0.8} />
      </mesh>
      {/* Hand cyan accent ring */}
      <mesh position={[-0.11, -1.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.11, 0.012, 8, 24]} />
        <meshStandardMaterial
          color={COLORS.cyan}
          emissive={COLORS.cyan}
          emissiveIntensity={0.6}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ---------- LEG ---------- */
function RobotLeg({ x = 0 }: { x?: number }) {
  return (
    <group position={[x, -1.15, 0]}>
      {/* Hip joint */}
      <mesh castShadow>
        <sphereGeometry args={[0.13, 20, 20]} />
        <meshPhysicalMaterial color={COLORS.joint} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Thigh */}
      <mesh position={[0, -0.2, 0]} castShadow>
        <capsuleGeometry args={[0.11, 0.26, 12, 24]} />
        <meshPhysicalMaterial color={COLORS.body} metalness={0.45} roughness={0.35} clearcoat={0.8} />
      </mesh>

      {/* Knee */}
      <mesh position={[0, -0.42, 0]} castShadow>
        <sphereGeometry args={[0.11, 20, 20]} />
        <meshPhysicalMaterial color={COLORS.joint} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Shin */}
      <mesh position={[0, -0.6, 0]} castShadow>
        <capsuleGeometry args={[0.1, 0.2, 12, 24]} />
        <meshPhysicalMaterial color={COLORS.body} metalness={0.45} roughness={0.35} clearcoat={0.8} />
      </mesh>

      {/* Foot (boot) */}
      <RoundedBox args={[0.32, 0.18, 0.38]} radius={0.08} smoothness={4} position={[0, -0.8, 0.06]} castShadow>
        <meshPhysicalMaterial color={COLORS.body} metalness={0.5} roughness={0.3} clearcoat={0.9} />
      </RoundedBox>

      {/* Cyan strip on foot */}
      <mesh position={[0, -0.73, 0.18]}>
        <boxGeometry args={[0.32, 0.012, 0.02]} />
        <meshStandardMaterial
          color={COLORS.cyan}
          emissive={COLORS.cyan}
          emissiveIntensity={0.7}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ---------- WHOLE ROBOT ---------- */
function Robot() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      const t = state.clock.elapsedTime;
      // Subtle idle breathing
      group.current.rotation.y = Math.sin(t * 0.5) * 0.06;
      group.current.position.y = Math.sin(t * 1.8) * 0.03;
    }
  });

  return (
    <group ref={group} position={[0, 0.1, 0]} scale={0.85}>
      <RobotHead />
      <Neck />
      <RobotBody />
      <PointingArm />
      <RelaxedArm />
      <RobotLeg x={-0.28} />
      <RobotLeg x={0.28} />
    </group>
  );
}

/* ---------- SCENE ---------- */
function Scene() {
  return (
    <>
      {/* Lighting setup */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.1}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 3, 3]} intensity={0.55} color="#9bb3ff" />
      <pointLight position={[-2, 1, 4]} intensity={0.55} color={COLORS.cyan} />
      <pointLight position={[3, 0, 3]} intensity={0.4} color={COLORS.pink} />
      {/* Rim light */}
      <directionalLight position={[0, 3, -5]} intensity={0.45} color="#6a7fc1" />

      {/* Subtle float */}
      <Float speed={2} rotationIntensity={0.08} floatIntensity={0.3}>
        <Robot />
      </Float>

      {/* Ground shadow */}
      <ContactShadows
        position={[0, -2.05, 0]}
        opacity={0.55}
        scale={5}
        blur={2.2}
        far={3}
        color="#0a0d1f"
      />
    </>
  );
}

/* ---------- EXPORT ---------- */
export default function HeroModel() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0.2, 5.4], fov: 38 }}
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
