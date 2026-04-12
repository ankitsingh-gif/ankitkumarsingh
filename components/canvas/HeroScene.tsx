"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import * as THREE from "three";

/* ==========================================
   MARKETING & TECH NETWORK VISUALIZATION
   - Connected nodes = data/marketing network
   - Floating labels = tech keywords
   - Pulsing connections = data flow
   - Mouse reactive = interactive feel
   ========================================== */

/* A single glowing node in the network */
function NetworkNode({ position, size, color, pulseSpeed }: {
  position: [number, number, number];
  size: number;
  color: string;
  pulseSpeed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.scale.setScalar(size * (1 + Math.sin(t * pulseSpeed) * 0.15));
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
}

/* Lines connecting nodes — represents data flow */
function ConnectionLines({ nodes }: { nodes: [number, number, number][] }) {
  const linesRef = useRef<THREE.Group>(null);

  const connections = useMemo(() => {
    const conns: { from: [number, number, number]; to: [number, number, number] }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.sqrt(
          (nodes[i][0] - nodes[j][0]) ** 2 +
          (nodes[i][1] - nodes[j][1]) ** 2 +
          (nodes[i][2] - nodes[j][2]) ** 2
        );
        if (dist < 3.5) {
          conns.push({ from: nodes[i], to: nodes[j] });
        }
      }
    }
    return conns;
  }, [nodes]);

  useFrame((state) => {
    if (!linesRef.current) return;
    linesRef.current.children.forEach((child, i) => {
      const mat = (child as THREE.Line).material as THREE.LineBasicMaterial;
      const t = state.clock.elapsedTime;
      mat.opacity = 0.08 + Math.sin(t * 0.8 + i * 0.5) * 0.06;
    });
  });

  return (
    <group ref={linesRef}>
      {connections.map((conn, i) => {
        const points = [
          new THREE.Vector3(...conn.from),
          new THREE.Vector3(...conn.to),
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: "#a855f7", transparent: true, opacity: 0.1 });
        const lineObj = new THREE.Line(geometry, material);
        return <primitive key={i} object={lineObj} />;
      })}
    </group>
  );
}

/* Floating keyword labels around the network */
function FloatingLabel({ text, position, color }: {
  text: string;
  position: [number, number, number];
  color: string;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.15;
  });

  return (
    <group ref={ref} position={position}>
      <Text
        fontSize={0.12}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.003}
        outlineColor="#000000"
      >
        {text}
      </Text>
    </group>
  );
}

/* Data flow particles moving along connections */
function DataParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12 + 3;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
      vel[i * 3] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < 300; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];

      // Wrap around
      if (arr[i * 3] > 10) arr[i * 3] = -4;
      if (arr[i * 3] < -4) arr[i * 3] = 10;
      if (arr[i * 3 + 1] > 6) arr[i * 3 + 1] = -6;
      if (arr[i * 3 + 1] < -6) arr[i * 3 + 1] = 6;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={300} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#e8c547"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* Central rotating marketing/tech hub */
function CentralHub() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    const pointer = state.pointer;
    mouse.current.x += (pointer.x * 0.3 - mouse.current.x) * 0.02;
    mouse.current.y += (pointer.y * 0.3 - mouse.current.y) * 0.02;

    groupRef.current.rotation.y = t * 0.06 + mouse.current.x * 0.4;
    groupRef.current.rotation.x = mouse.current.y * 0.2;
  });

  return (
    <Float speed={0.6} rotationIntensity={0.05} floatIntensity={0.3}>
      <group ref={groupRef} position={[3, 0.3, -1]}>
        {/* Central ring — represents marketing cycle */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.02, 16, 80]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.25} />
        </mesh>

        {/* Second ring — tech orbit */}
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.0, 0.015, 16, 80]} />
          <meshBasicMaterial color="#e8c547" transparent opacity={0.15} />
        </mesh>

        {/* Third ring — data orbit */}
        <mesh rotation={[Math.PI / 5, -Math.PI / 3, Math.PI / 6]}>
          <torusGeometry args={[2.5, 0.01, 16, 60]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.08} />
        </mesh>

        {/* Core glow */}
        <mesh>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.05} />
        </mesh>
      </group>
    </Float>
  );
}

export default function HeroScene() {
  /* Node positions for the marketing/tech network */
  const networkNodes: [number, number, number][] = useMemo(() => [
    [1.5, 1.5, -1],
    [3.5, 2.0, -0.5],
    [5.0, 1.0, -1.5],
    [4.5, -0.5, -0.8],
    [2.0, -1.5, -1],
    [1.0, 0.0, -0.5],
    [3.0, 0.5, 0],
    [5.5, -1.5, -2],
    [0.5, 2.5, -2],
    [4.0, 2.8, -1.8],
    [2.5, -2.5, -1.5],
    [6.0, 0.5, -2.5],
  ], []);

  /* Tech/Marketing keywords floating around */
  const labels = useMemo(() => [
    { text: "AI", position: [1.0, 2.8, -0.5] as [number, number, number], color: "#e8c547" },
    { text: "SEO", position: [5.5, 2.5, -1.5] as [number, number, number], color: "#a855f7" },
    { text: "React", position: [6.2, -0.8, -2] as [number, number, number], color: "#60a5fa" },
    { text: "Next.js", position: [0.2, -1.8, -1] as [number, number, number], color: "#ffffff" },
    { text: "Marketing", position: [-0.3, 1.0, -1.5] as [number, number, number], color: "#e8c547" },
    { text: "Data", position: [4.8, -2.5, -2] as [number, number, number], color: "#a855f7" },
    { text: "Growth", position: [6.5, 1.8, -2.5] as [number, number, number], color: "#34d399" },
  ], []);

  return (
    <group>
      {/* Lighting */}
      <ambientLight intensity={0.04} />
      <pointLight position={[5, 4, 3]} intensity={0.6} color="#a855f7" />
      <pointLight position={[0, -3, 2]} intensity={0.3} color="#e8c547" />
      <pointLight position={[3, 0, 5]} intensity={0.15} color="#ffffff" />

      {/* Central marketing/tech hub with orbital rings */}
      <CentralHub />

      {/* Network nodes */}
      {networkNodes.map((pos, i) => (
        <NetworkNode
          key={i}
          position={pos}
          size={0.04 + Math.random() * 0.04}
          color={i % 3 === 0 ? "#e8c547" : i % 3 === 1 ? "#a855f7" : "#60a5fa"}
          pulseSpeed={0.8 + Math.random() * 1.2}
        />
      ))}

      {/* Connection lines between nodes */}
      <ConnectionLines nodes={networkNodes} />

      {/* Floating keyword labels */}
      {labels.map((label, i) => (
        <FloatingLabel key={i} {...label} />
      ))}

      {/* Data flow particles */}
      <DataParticles />

      <fog attach="fog" args={["#050505", 6, 20]} />
    </group>
  );
}
