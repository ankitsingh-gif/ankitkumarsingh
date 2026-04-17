"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, AdaptiveDpr, ContactShadows, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/* =========================================================================
 * CUTE AI ROBOT — WAVING "HI"
 * =======================================================================*/

const COLORS = {
  bodyLight: "#f5f5f7",       // glossy white
  bodyMid: "#e5e5ec",         // slightly darker panels
  bodyDark: "#c4c4ce",        // joints, metallic
  accent: "#6C63FF",          // portfolio purple
  accent2: "#00D4AA",         // portfolio mint
  screen: "#0a0f1f",          // deep navy screen
  glow: "#00E5FF",            // bright cyan eye glow
  glow2: "#33DFBB",           // mint glow for smile
  joint: "#4a5568",           // dark metallic joint
};

/* ----- Head with screen face ----- */
function RobotHead() {
  const head = useRef<THREE.Group>(null);
  const blinkL = useRef<THREE.Mesh>(null);
  const blinkR = useRef<THREE.Mesh>(null);
  const antenna = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Gentle head bobbing
    if (head.current) {
      head.current.rotation.z = Math.sin(t * 0.6) * 0.03;
      // Follow mouse slightly
      const p = state.pointer;
      head.current.rotation.y = p.x * 0.15;
      head.current.rotation.x = -p.y * 0.08 + Math.sin(t * 0.5) * 0.015;
    }

    // Blink occasionally
    const blink = Math.sin(t * 2.2) > 0.97 ? 0.05 : 1;
    if (blinkL.current) blinkL.current.scale.y = blink;
    if (blinkR.current) blinkR.current.scale.y = blink;

    // Antenna sway
    if (antenna.current) {
      antenna.current.rotation.z = Math.sin(t * 2.5) * 0.08;
    }
  });

  return (
    <group ref={head} position={[0, 0.9, 0]}>
      {/* Head main rounded cube */}
      <RoundedBox args={[1.3, 1.1, 1.05]} radius={0.28} smoothness={5} castShadow>
        <meshPhysicalMaterial
          color={COLORS.bodyLight}
          metalness={0.2}
          roughness={0.25}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>

      {/* Screen — dark inset front panel */}
      <group position={[0, 0.02, 0.54]}>
        <RoundedBox args={[1.0, 0.7, 0.08]} radius={0.12} smoothness={4}>
          <meshPhysicalMaterial
            color={COLORS.screen}
            metalness={0.6}
            roughness={0.25}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </RoundedBox>

        {/* Screen inner glow overlay */}
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[0.9, 0.6]} />
          <meshBasicMaterial color={COLORS.screen} />
        </mesh>

        {/* Left eye */}
        <group position={[-0.22, 0.08, 0.08]}>
          <mesh ref={blinkL}>
            <circleGeometry args={[0.1, 32]} />
            <meshBasicMaterial color={COLORS.glow} />
          </mesh>
          {/* Eye halo glow */}
          <mesh position={[0, 0, -0.005]}>
            <circleGeometry args={[0.14, 32]} />
            <meshBasicMaterial color={COLORS.glow} transparent opacity={0.4} />
          </mesh>
        </group>

        {/* Right eye */}
        <group position={[0.22, 0.08, 0.08]}>
          <mesh ref={blinkR}>
            <circleGeometry args={[0.1, 32]} />
            <meshBasicMaterial color={COLORS.glow} />
          </mesh>
          <mesh position={[0, 0, -0.005]}>
            <circleGeometry args={[0.14, 32]} />
            <meshBasicMaterial color={COLORS.glow} transparent opacity={0.4} />
          </mesh>
        </group>

        {/* Smile — curved line */}
        <mesh position={[0, -0.15, 0.08]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.16, 0.018, 16, 32, Math.PI]} />
          <meshBasicMaterial color={COLORS.glow} />
        </mesh>
        {/* Smile glow halo */}
        <mesh position={[0, -0.15, 0.075]}>
          <torusGeometry args={[0.16, 0.035, 16, 32, Math.PI]} />
          <meshBasicMaterial color={COLORS.glow} transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Screen bezel — subtle highlight on top edge */}
      <mesh position={[0, 0.36, 0.58]}>
        <boxGeometry args={[1.0, 0.02, 0.02]} />
        <meshPhysicalMaterial color={COLORS.bodyLight} metalness={0.4} roughness={0.2} />
      </mesh>

      {/* Left ear */}
      <group position={[-0.72, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.16, 0.16, 0.2, 32]} />
          <meshPhysicalMaterial color={COLORS.accent} metalness={0.3} roughness={0.4} clearcoat={0.6} />
        </mesh>
        {/* Ear inner detail */}
        <mesh position={[-0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.02, 32]} />
          <meshBasicMaterial color={COLORS.accent2} />
        </mesh>
      </group>

      {/* Right ear */}
      <group position={[0.72, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.16, 0.16, 0.2, 32]} />
          <meshPhysicalMaterial color={COLORS.accent} metalness={0.3} roughness={0.4} clearcoat={0.6} />
        </mesh>
        <mesh position={[0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.02, 32]} />
          <meshBasicMaterial color={COLORS.accent2} />
        </mesh>
      </group>

      {/* Antenna */}
      <group ref={antenna} position={[0.1, 0.58, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.02, 0.025, 0.35, 12]} />
          <meshPhysicalMaterial color={COLORS.bodyMid} metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Antenna ball */}
        <mesh position={[0, 0.22, 0]}>
          <sphereGeometry args={[0.075, 24, 24]} />
          <meshPhysicalMaterial
            color={COLORS.accent}
            metalness={0.3}
            roughness={0.2}
            emissive={COLORS.accent}
            emissiveIntensity={0.4}
            clearcoat={1}
          />
        </mesh>
      </group>

      {/* Small neck connector */}
      <mesh position={[0, -0.6, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.22, 0.12, 24]} />
        <meshPhysicalMaterial color={COLORS.bodyDark} metalness={0.5} roughness={0.35} />
      </mesh>
    </group>
  );
}

/* ----- Body ----- */
function RobotBody() {
  const chest = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (chest.current) {
      const mat = chest.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.4 + Math.sin(state.clock.elapsedTime * 2.5) * 0.3;
    }
  });

  return (
    <group position={[0, -0.1, 0]}>
      {/* Main body — rounded box */}
      <RoundedBox args={[1.1, 1.15, 0.9]} radius={0.35} smoothness={5} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={COLORS.bodyLight}
          metalness={0.2}
          roughness={0.3}
          clearcoat={0.8}
          clearcoatRoughness={0.12}
        />
      </RoundedBox>

      {/* Chest accent stripe */}
      <mesh position={[0, 0.1, 0.46]}>
        <boxGeometry args={[0.7, 0.02, 0.005]} />
        <meshPhysicalMaterial color={COLORS.bodyDark} metalness={0.4} roughness={0.4} />
      </mesh>

      {/* Chest indicator — glowing dot */}
      <mesh ref={chest} position={[0, -0.15, 0.46]}>
        <circleGeometry args={[0.06, 32]} />
        <meshStandardMaterial
          color={COLORS.accent2}
          emissive={COLORS.accent2}
          emissiveIntensity={0.6}
        />
      </mesh>
      {/* Chest glow halo */}
      <mesh position={[0, -0.15, 0.455]}>
        <circleGeometry args={[0.11, 32]} />
        <meshBasicMaterial color={COLORS.accent2} transparent opacity={0.25} />
      </mesh>

      {/* Body underside — slight panel */}
      <mesh position={[0, -0.5, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.6, 0.3]} />
        <meshBasicMaterial color={COLORS.bodyMid} transparent opacity={0} />
      </mesh>
    </group>
  );
}

/* ----- Waving right arm ----- */
function WavingArm() {
  const shoulder = useRef<THREE.Group>(null);
  const forearm = useRef<THREE.Group>(null);
  const hand = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Big waving motion
    if (shoulder.current) {
      shoulder.current.rotation.z = -Math.PI / 2.1 + Math.sin(t * 2.5) * 0.25;
      shoulder.current.rotation.x = -0.3;
    }
    if (forearm.current) {
      forearm.current.rotation.z = 0.4 + Math.sin(t * 2.5 + 0.3) * 0.18;
    }
    if (hand.current) {
      hand.current.rotation.z = Math.sin(t * 5) * 0.15;
    }
  });

  return (
    <group ref={shoulder} position={[0.55, 0.42, 0]}>
      {/* Shoulder joint */}
      <mesh castShadow>
        <sphereGeometry args={[0.15, 24, 24]} />
        <meshPhysicalMaterial color={COLORS.joint} metalness={0.7} roughness={0.35} />
      </mesh>

      {/* Upper arm */}
      <mesh position={[0.28, 0, 0]} castShadow>
        <capsuleGeometry args={[0.1, 0.35, 12, 24]} />
        <meshPhysicalMaterial
          color={COLORS.bodyLight}
          metalness={0.2}
          roughness={0.3}
          clearcoat={0.8}
        />
      </mesh>

      {/* Elbow joint + forearm */}
      <group ref={forearm} position={[0.5, 0, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.1, 20, 20]} />
          <meshPhysicalMaterial color={COLORS.joint} metalness={0.7} roughness={0.35} />
        </mesh>
        <mesh position={[0.2, 0, 0]} castShadow>
          <capsuleGeometry args={[0.09, 0.3, 12, 24]} />
          <meshPhysicalMaterial
            color={COLORS.bodyLight}
            metalness={0.2}
            roughness={0.3}
            clearcoat={0.8}
          />
        </mesh>

        {/* Hand — blue claw/pincer */}
        <group ref={hand} position={[0.42, 0, 0]}>
          {/* Palm base */}
          <mesh castShadow>
            <sphereGeometry args={[0.14, 24, 24]} />
            <meshPhysicalMaterial
              color={COLORS.accent}
              metalness={0.3}
              roughness={0.3}
              clearcoat={0.9}
            />
          </mesh>
          {/* Upper claw */}
          <mesh position={[0.13, 0.08, 0]} rotation={[0, 0, -0.4]}>
            <torusGeometry args={[0.08, 0.035, 12, 24, Math.PI * 0.7]} />
            <meshPhysicalMaterial
              color={COLORS.accent}
              metalness={0.3}
              roughness={0.3}
              clearcoat={0.9}
            />
          </mesh>
          {/* Lower claw */}
          <mesh position={[0.13, -0.08, 0]} rotation={[0, 0, 0.4 + Math.PI]}>
            <torusGeometry args={[0.08, 0.035, 12, 24, Math.PI * 0.7]} />
            <meshPhysicalMaterial
              color={COLORS.accent}
              metalness={0.3}
              roughness={0.3}
              clearcoat={0.9}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* ----- Relaxed left arm ----- */
function RelaxedArm() {
  const shoulder = useRef<THREE.Group>(null);
  const hand = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (shoulder.current) {
      shoulder.current.rotation.z = 0.05 + Math.sin(t * 1.2) * 0.03;
    }
    if (hand.current) {
      hand.current.rotation.z = Math.sin(t * 1.5) * 0.08;
    }
  });

  return (
    <group ref={shoulder} position={[-0.55, 0.42, 0]}>
      {/* Shoulder joint */}
      <mesh castShadow>
        <sphereGeometry args={[0.15, 24, 24]} />
        <meshPhysicalMaterial color={COLORS.joint} metalness={0.7} roughness={0.35} />
      </mesh>

      {/* Upper arm — pointing down */}
      <mesh position={[-0.05, -0.28, 0]} rotation={[0, 0, -0.15]} castShadow>
        <capsuleGeometry args={[0.1, 0.35, 12, 24]} />
        <meshPhysicalMaterial
          color={COLORS.bodyLight}
          metalness={0.2}
          roughness={0.3}
          clearcoat={0.8}
        />
      </mesh>

      {/* Elbow */}
      <mesh position={[-0.1, -0.5, 0]} castShadow>
        <sphereGeometry args={[0.1, 20, 20]} />
        <meshPhysicalMaterial color={COLORS.joint} metalness={0.7} roughness={0.35} />
      </mesh>

      {/* Forearm */}
      <mesh position={[-0.15, -0.72, 0]} rotation={[0, 0, -0.1]} castShadow>
        <capsuleGeometry args={[0.09, 0.3, 12, 24]} />
        <meshPhysicalMaterial
          color={COLORS.bodyLight}
          metalness={0.2}
          roughness={0.3}
          clearcoat={0.8}
        />
      </mesh>

      {/* Hand */}
      <group ref={hand} position={[-0.17, -0.94, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.14, 24, 24]} />
          <meshPhysicalMaterial
            color={COLORS.accent}
            metalness={0.3}
            roughness={0.3}
            clearcoat={0.9}
          />
        </mesh>
        <mesh position={[0.08, -0.1, 0]} rotation={[0, 0, -0.4 - Math.PI / 2]}>
          <torusGeometry args={[0.08, 0.035, 12, 24, Math.PI * 0.7]} />
          <meshPhysicalMaterial color={COLORS.accent} metalness={0.3} roughness={0.3} clearcoat={0.9} />
        </mesh>
        <mesh position={[-0.08, -0.1, 0]} rotation={[0, 0, 0.4 - Math.PI / 2]}>
          <torusGeometry args={[0.08, 0.035, 12, 24, Math.PI * 0.7]} />
          <meshPhysicalMaterial color={COLORS.accent} metalness={0.3} roughness={0.3} clearcoat={0.9} />
        </mesh>
      </group>
    </group>
  );
}

/* ----- Whole robot ----- */
function Robot() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    // Gentle floating body tilt
    if (group.current) {
      const t = state.clock.elapsedTime;
      group.current.rotation.y = Math.sin(t * 0.4) * 0.06;
    }
  });

  return (
    <group ref={group} position={[0, -0.3, 0]} scale={1.1}>
      <RobotHead />
      <RobotBody />
      <WavingArm />
      <RelaxedArm />
    </group>
  );
}

/* ----- Scene with lights + shadow ----- */
function Scene() {
  return (
    <>
      {/* Lighting setup for glossy plastic look */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.2}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 3, 3]} intensity={0.5} color="#a8b2ff" />
      <pointLight position={[-2, 2, 4]} intensity={0.5} color={COLORS.accent} />
      <pointLight position={[3, -1, 3]} intensity={0.4} color={COLORS.accent2} />
      {/* Rim light from behind */}
      <directionalLight position={[0, 2, -5]} intensity={0.4} color="#ffffff" />

      {/* Floating animated robot */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        <Robot />
      </Float>

      {/* Soft contact shadow */}
      <ContactShadows
        position={[0, -1.7, 0]}
        opacity={0.4}
        scale={6}
        blur={2.5}
        far={3}
        color="#1a1a2e"
      />
    </>
  );
}

/* ----- Exported Canvas ----- */
export default function HeroModel() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
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
