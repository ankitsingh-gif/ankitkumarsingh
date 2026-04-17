"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, AdaptiveDpr, ContactShadows, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/* =========================================================================
 * CHARACTER ROBOT — exact match to reference
 * Big round blue-purple head, two glowing eyes, pointing finger, stubby legs
 * =======================================================================*/

const COLORS = {
  body: "#5a6ba0",        // medium blue-purple — main body
  bodyLight: "#7a8bc0",   // highlights / top light
  bodyDark: "#34406a",    // deep shadow / inner panels
  panel: "#1a2340",       // dark panel recesses
  joint: "#222b4a",       // joints
  cyan: "#5eeaff",        // bright cyan glow
  cyanDim: "#3ab8d8",     // dimmer cyan
  yellow: "#ffdb4a",      // yellow antenna tip
  pink: "#ff86ad",        // pink ear accent
  white: "#f0f3ff",       // highlights
};

/* ---------- SPEAKER-GRID EYE ----------
   Outer housing + inner dark grid + bright pupil + highlight
-------------------------------------------------------------*/
function SpeakerEye({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Outer housing ring */}
      <mesh castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.08, 40]} />
        <meshPhysicalMaterial color={COLORS.bodyLight} metalness={0.5} roughness={0.3} clearcoat={0.9} />
      </mesh>

      {/* Dark recessed inner */}
      <mesh position={[0, 0.045, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.03, 40]} />
        <meshPhysicalMaterial color={COLORS.panel} metalness={0.7} roughness={0.25} />
      </mesh>

      {/* Grid dots — small circles in a ring pattern */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const r = 0.17;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * r, 0.063, Math.sin(angle) * r]}
          >
            <cylinderGeometry args={[0.012, 0.012, 0.005, 8]} />
            <meshBasicMaterial color={COLORS.panel} />
          </mesh>
        );
      })}

      {/* Inner pupil — bright cyan core */}
      <mesh position={[0, 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.11, 32]} />
        <meshBasicMaterial color={COLORS.cyan} toneMapped={false} />
      </mesh>

      {/* Pupil glow aura */}
      <mesh position={[0, 0.062, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.16, 32]} />
        <meshBasicMaterial color={COLORS.cyan} transparent opacity={0.35} toneMapped={false} />
      </mesh>

      {/* Specular highlight */}
      <mesh position={[-0.04, 0.068, -0.035]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.035, 16]} />
        <meshBasicMaterial color={COLORS.white} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ---------- HEAD ---------- */
function RobotHead() {
  const head = useRef<THREE.Group>(null);
  const antennaL = useRef<THREE.Group>(null);
  const antennaR = useRef<THREE.Group>(null);
  const tipL = useRef<THREE.Mesh>(null);
  const tipR = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (head.current) {
      const p = state.pointer;
      head.current.rotation.y = p.x * 0.18 + Math.sin(t * 0.6) * 0.04;
      head.current.rotation.x = -p.y * 0.08;
      head.current.rotation.z = Math.sin(t * 0.8) * 0.03;
    }
    if (antennaL.current) antennaL.current.rotation.z = 0.22 + Math.sin(t * 3) * 0.1;
    if (antennaR.current) antennaR.current.rotation.z = -0.22 + Math.sin(t * 3 + 0.5) * 0.1;
    if (tipL.current) {
      const m = tipL.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 1 + Math.sin(t * 3) * 0.5;
    }
    if (tipR.current) {
      const m = tipR.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 1 + Math.sin(t * 3.5 + 1) * 0.5;
    }
  });

  return (
    <group ref={head} position={[0, 1.35, 0]}>
      {/* Main round head — sphere slightly wider than tall */}
      <mesh castShadow scale={[1.1, 1.02, 1.05]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          color={COLORS.body}
          metalness={0.3}
          roughness={0.35}
          clearcoat={1}
          clearcoatRoughness={0.12}
        />
      </mesh>

      {/* Top panel seam line */}
      <mesh position={[0, 0.7, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.012, 10, 40]} />
        <meshPhysicalMaterial color={COLORS.bodyDark} metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Front panel horizontal seam */}
      <mesh position={[0, -0.35, 0.95]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1.3, 0.012, 0.01]} />
        <meshPhysicalMaterial color={COLORS.bodyDark} />
      </mesh>

      {/* Eyes placed on front face */}
      <group position={[0, 0.05, 0.93]} rotation={[0.05, 0, 0]}>
        <SpeakerEye position={[-0.36, 0, 0]} />
        <SpeakerEye position={[0.36, 0, 0]} />
      </group>

      {/* Brow panels above eyes — subtle shadow shape */}
      <mesh position={[-0.36, 0.28, 0.92]} rotation={[0.1, 0, -0.1]}>
        <boxGeometry args={[0.42, 0.06, 0.02]} />
        <meshPhysicalMaterial color={COLORS.bodyDark} metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh position={[0.36, 0.28, 0.92]} rotation={[0.1, 0, 0.1]}>
        <boxGeometry args={[0.42, 0.06, 0.02]} />
        <meshPhysicalMaterial color={COLORS.bodyDark} metalness={0.4} roughness={0.4} />
      </mesh>

      {/* LEFT PINK EAR */}
      <group position={[-1.02, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.16, 32]} />
          <meshPhysicalMaterial color={COLORS.bodyDark} metalness={0.5} roughness={0.35} />
        </mesh>
        <mesh position={[-0.085, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.11, 0.11, 0.01, 32]} />
          <meshStandardMaterial
            color={COLORS.pink}
            emissive={COLORS.pink}
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* RIGHT EAR (darker / neutral) */}
      <group position={[1.02, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.16, 32]} />
          <meshPhysicalMaterial color={COLORS.bodyDark} metalness={0.5} roughness={0.35} />
        </mesh>
        <mesh position={[0.085, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.11, 0.11, 0.01, 32]} />
          <meshPhysicalMaterial color={COLORS.panel} metalness={0.7} roughness={0.25} />
        </mesh>
      </group>

      {/* LEFT ANTENNA — yellow tip */}
      <group ref={antennaL} position={[-0.3, 0.92, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.022, 0.028, 0.45, 12]} />
          <meshPhysicalMaterial color={COLORS.bodyDark} metalness={0.7} roughness={0.25} />
        </mesh>
        <mesh ref={tipL} position={[0, 0.28, 0]} castShadow>
          <sphereGeometry args={[0.085, 24, 24]} />
          <meshStandardMaterial
            color={COLORS.yellow}
            emissive={COLORS.yellow}
            emissiveIntensity={1}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0, 0.28, 0]}>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshBasicMaterial color={COLORS.yellow} transparent opacity={0.28} toneMapped={false} />
        </mesh>
      </group>

      {/* RIGHT ANTENNA — cyan tip */}
      <group ref={antennaR} position={[0.3, 0.92, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.022, 0.028, 0.45, 12]} />
          <meshPhysicalMaterial color={COLORS.bodyDark} metalness={0.7} roughness={0.25} />
        </mesh>
        <mesh ref={tipR} position={[0, 0.28, 0]} castShadow>
          <sphereGeometry args={[0.085, 24, 24]} />
          <meshStandardMaterial
            color={COLORS.cyan}
            emissive={COLORS.cyan}
            emissiveIntensity={1}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0, 0.28, 0]}>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshBasicMaterial color={COLORS.cyan} transparent opacity={0.28} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

/* ---------- BODY ---------- */
function RobotBody() {
  const chest = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (chest.current) {
      const m = chest.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 0.8 + Math.sin(state.clock.elapsedTime * 2.5) * 0.4;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Neck joint */}
      <mesh position={[0, 0.48, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.12, 20]} />
        <meshPhysicalMaterial color={COLORS.joint} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Torso — slightly wider at top, tapered */}
      <RoundedBox
        args={[1.15, 1.05, 0.95]}
        radius={0.16}
        smoothness={4}
        position={[0, -0.08, 0]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={COLORS.body}
          metalness={0.3}
          roughness={0.35}
          clearcoat={1}
          clearcoatRoughness={0.15}
        />
      </RoundedBox>

      {/* Top shoulder cap panel */}
      <RoundedBox args={[1.2, 0.12, 0.98]} radius={0.05} smoothness={3} position={[0, 0.42, 0]}>
        <meshPhysicalMaterial color={COLORS.bodyDark} metalness={0.5} roughness={0.3} />
      </RoundedBox>

      {/* Chest screen inset — dark rectangle on the front */}
      <mesh position={[0, 0, 0.48]}>
        <boxGeometry args={[0.55, 0.42, 0.025]} />
        <meshPhysicalMaterial color={COLORS.panel} metalness={0.7} roughness={0.2} clearcoat={1} />
      </mesh>

      {/* Cyan data lines inside screen */}
      <mesh position={[-0.08, 0.1, 0.495]}>
        <planeGeometry args={[0.3, 0.028]} />
        <meshBasicMaterial color={COLORS.cyan} toneMapped={false} />
      </mesh>
      <mesh position={[-0.04, 0.01, 0.495]}>
        <planeGeometry args={[0.36, 0.028]} />
        <meshBasicMaterial color={COLORS.cyan} transparent opacity={0.7} toneMapped={false} />
      </mesh>
      <mesh position={[-0.06, -0.08, 0.495]}>
        <planeGeometry args={[0.32, 0.028]} />
        <meshBasicMaterial color={COLORS.cyan} transparent opacity={0.45} toneMapped={false} />
      </mesh>

      {/* Cyan dot beside lines */}
      <mesh ref={chest} position={[0.18, -0.08, 0.495]}>
        <circleGeometry args={[0.04, 24]} />
        <meshStandardMaterial
          color={COLORS.cyan}
          emissive={COLORS.cyan}
          emissiveIntensity={0.9}
          toneMapped={false}
        />
      </mesh>

      {/* Bottom waist panel */}
      <RoundedBox args={[1.0, 0.15, 0.92]} radius={0.05} smoothness={3} position={[0, -0.55, 0]}>
        <meshPhysicalMaterial color={COLORS.bodyDark} metalness={0.5} roughness={0.3} />
      </RoundedBox>
    </group>
  );
}

/* ---------- RIGHT ARM — POINTING FINGER UP ---------- */
function PointingArm() {
  const shoulder = useRef<THREE.Group>(null);
  const forearm = useRef<THREE.Group>(null);
  const tipGlow = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (shoulder.current) {
      shoulder.current.rotation.z = -0.9 + Math.sin(t * 2.3) * 0.08;
    }
    if (forearm.current) {
      forearm.current.rotation.z = -1.4 + Math.sin(t * 2.3 + 0.3) * 0.05;
    }
    if (tipGlow.current) {
      const m = tipGlow.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 1.1 + Math.sin(t * 4) * 0.5;
    }
  });

  return (
    <group ref={shoulder} position={[0.55, 0.18, 0.2]}>
      {/* Shoulder ball joint */}
      <mesh castShadow>
        <sphereGeometry args={[0.13, 20, 20]} />
        <meshPhysicalMaterial color={COLORS.joint} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Upper arm */}
      <mesh position={[0.22, 0, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.28, 12, 20]} />
        <meshPhysicalMaterial color={COLORS.body} metalness={0.3} roughness={0.35} clearcoat={0.9} />
      </mesh>

      {/* Elbow + forearm */}
      <group ref={forearm} position={[0.4, 0, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.1, 20, 20]} />
          <meshPhysicalMaterial color={COLORS.joint} metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.17, 0, 0]} castShadow>
          <capsuleGeometry args={[0.085, 0.24, 12, 20]} />
          <meshPhysicalMaterial color={COLORS.body} metalness={0.3} roughness={0.35} clearcoat={0.9} />
        </mesh>

        {/* Wrist */}
        <mesh position={[0.32, 0, 0]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshPhysicalMaterial color={COLORS.joint} metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Hand (fist) */}
        <group position={[0.42, 0, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.12, 24, 24]} />
            <meshPhysicalMaterial color={COLORS.body} metalness={0.3} roughness={0.35} clearcoat={0.9} />
          </mesh>

          {/* Pointing index finger */}
          <mesh position={[0.09, 0.02, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
            <capsuleGeometry args={[0.032, 0.12, 8, 16]} />
            <meshPhysicalMaterial color={COLORS.body} metalness={0.3} roughness={0.35} clearcoat={0.9} />
          </mesh>

          {/* Fingertip joint */}
          <mesh position={[0.09, 0.11, 0]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshPhysicalMaterial color={COLORS.bodyDark} metalness={0.5} roughness={0.3} />
          </mesh>

          {/* Glowing fingertip cap */}
          <mesh ref={tipGlow} position={[0.09, 0.145, 0]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshStandardMaterial
              color={COLORS.cyan}
              emissive={COLORS.cyan}
              emissiveIntensity={1.2}
              toneMapped={false}
            />
          </mesh>
          {/* Glow aura */}
          <mesh position={[0.09, 0.145, 0]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshBasicMaterial color={COLORS.cyan} transparent opacity={0.35} toneMapped={false} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* ---------- LEFT ARM — RELAXED ---------- */
function RelaxedArm() {
  const shoulder = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (shoulder.current) {
      shoulder.current.rotation.z = 0.15 + Math.sin(t * 1.5) * 0.04;
    }
  });

  return (
    <group ref={shoulder} position={[-0.55, 0.18, 0.2]}>
      {/* Shoulder */}
      <mesh castShadow>
        <sphereGeometry args={[0.13, 20, 20]} />
        <meshPhysicalMaterial color={COLORS.joint} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Upper arm down */}
      <mesh position={[-0.02, -0.25, 0]} rotation={[0, 0, -0.1]} castShadow>
        <capsuleGeometry args={[0.09, 0.28, 12, 20]} />
        <meshPhysicalMaterial color={COLORS.body} metalness={0.3} roughness={0.35} clearcoat={0.9} />
      </mesh>

      {/* Elbow */}
      <mesh position={[-0.05, -0.44, 0]} castShadow>
        <sphereGeometry args={[0.1, 20, 20]} />
        <meshPhysicalMaterial color={COLORS.joint} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Forearm */}
      <mesh position={[-0.07, -0.62, 0]} rotation={[0, 0, -0.05]} castShadow>
        <capsuleGeometry args={[0.085, 0.24, 12, 20]} />
        <meshPhysicalMaterial color={COLORS.body} metalness={0.3} roughness={0.35} clearcoat={0.9} />
      </mesh>

      {/* Wrist + hand */}
      <mesh position={[-0.08, -0.78, 0]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshPhysicalMaterial color={COLORS.joint} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[-0.09, -0.9, 0]} castShadow>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshPhysicalMaterial color={COLORS.body} metalness={0.3} roughness={0.35} clearcoat={0.9} />
      </mesh>
      {/* Cyan glow accent on palm */}
      <mesh position={[-0.09, -0.9, 0.1]}>
        <circleGeometry args={[0.05, 24]} />
        <meshStandardMaterial
          color={COLORS.cyan}
          emissive={COLORS.cyan}
          emissiveIntensity={0.9}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ---------- LEG ---------- */
function RobotLeg({ x = 0 }: { x?: number }) {
  return (
    <group position={[x, -0.72, 0]}>
      {/* Hip */}
      <mesh castShadow>
        <sphereGeometry args={[0.13, 20, 20]} />
        <meshPhysicalMaterial color={COLORS.joint} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Thigh */}
      <mesh position={[0, -0.18, 0]} castShadow>
        <capsuleGeometry args={[0.12, 0.22, 12, 20]} />
        <meshPhysicalMaterial color={COLORS.body} metalness={0.3} roughness={0.35} clearcoat={0.9} />
      </mesh>

      {/* Knee */}
      <mesh position={[0, -0.38, 0]} castShadow>
        <sphereGeometry args={[0.12, 20, 20]} />
        <meshPhysicalMaterial color={COLORS.joint} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Shin */}
      <mesh position={[0, -0.55, 0]} castShadow>
        <capsuleGeometry args={[0.1, 0.18, 12, 20]} />
        <meshPhysicalMaterial color={COLORS.body} metalness={0.3} roughness={0.35} clearcoat={0.9} />
      </mesh>

      {/* Boot — chunky foot */}
      <RoundedBox
        args={[0.36, 0.2, 0.44]}
        radius={0.1}
        smoothness={4}
        position={[0, -0.78, 0.06]}
        castShadow
      >
        <meshPhysicalMaterial color={COLORS.body} metalness={0.35} roughness={0.3} clearcoat={1} />
      </RoundedBox>

      {/* Boot top panel */}
      <RoundedBox args={[0.38, 0.07, 0.46]} radius={0.04} smoothness={3} position={[0, -0.68, 0.07]}>
        <meshPhysicalMaterial color={COLORS.bodyDark} metalness={0.5} roughness={0.3} />
      </RoundedBox>

      {/* Glowing cyan strip on foot front */}
      <mesh position={[0, -0.78, 0.29]}>
        <boxGeometry args={[0.24, 0.018, 0.003]} />
        <meshStandardMaterial
          color={COLORS.cyan}
          emissive={COLORS.cyan}
          emissiveIntensity={0.9}
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
      group.current.rotation.y = Math.sin(t * 0.5) * 0.06;
    }
  });

  return (
    <group ref={group} position={[0, 0.15, 0]} scale={0.85}>
      <RobotHead />
      <RobotBody />
      <PointingArm />
      <RelaxedArm />
      <RobotLeg x={-0.3} />
      <RobotLeg x={0.3} />
    </group>
  );
}

/* ---------- SCENE ---------- */
function Scene() {
  return (
    <>
      {/* Bright, friendly lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[3, 6, 4]}
        intensity={1.2}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 3, 2]} intensity={0.6} color="#b4b8ff" />
      <pointLight position={[-2, 1, 4]} intensity={0.55} color={COLORS.cyan} />
      <pointLight position={[3, 1, 3]} intensity={0.4} color={COLORS.pink} />
      <directionalLight position={[0, 2, -4]} intensity={0.4} color="#a8b4ff" />

      <Float speed={1.8} rotationIntensity={0.08} floatIntensity={0.3}>
        <Robot />
      </Float>

      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.55}
        scale={5}
        blur={2.4}
        far={3}
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
        camera={{ position: [0, 0.4, 5.3], fov: 38 }}
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
