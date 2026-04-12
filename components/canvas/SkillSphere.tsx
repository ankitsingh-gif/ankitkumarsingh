"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { skillCategories } from "@/data/portfolio-data";

interface SkillNodeProps {
  position: [number, number, number];
  text: string;
  color: string;
  onHover: (text: string | null) => void;
}

function SkillNode({ position, text, color, onHover }: SkillNodeProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <mesh
        onPointerOver={() => {
          setHovered(true);
          onHover(text);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 1 : 0.6}
        />
      </mesh>
      <Text
        position={[0, 0.18, 0]}
        fontSize={hovered ? 0.14 : 0.1}
        color={hovered ? "#ffffff" : color}
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.005}
        outlineColor="#000000"
      >
        {text}
      </Text>
    </group>
  );
}

export default function SkillSphere({
  onSkillHover,
}: {
  onSkillHover?: (skill: string | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const isDragging = useRef(false);
  const autoRotate = useRef(true);

  const skillNodes = useMemo(() => {
    const nodes: { text: string; color: string; position: [number, number, number] }[] = [];
    const allSkills = skillCategories.flatMap((cat) =>
      cat.skills.map((s) => ({ text: s, color: cat.color }))
    );

    const total = allSkills.length;
    // Fibonacci sphere distribution
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const radius = 2.8;

    allSkills.forEach((skill, i) => {
      const theta = Math.acos(1 - (2 * (i + 0.5)) / total);
      const phi = (2 * Math.PI * i) / goldenRatio;
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);
      nodes.push({ ...skill, position: [x, y, z] });
    });

    return nodes;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current && autoRotate.current && !isDragging.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0} floatIntensity={0.3}>
      <group
        ref={groupRef}
        onPointerDown={() => {
          isDragging.current = true;
          autoRotate.current = false;
        }}
        onPointerUp={() => {
          isDragging.current = false;
          setTimeout(() => {
            autoRotate.current = true;
          }, 3000);
        }}
      >
        {skillNodes.map((node, i) => (
          <SkillNode
            key={i}
            position={node.position}
            text={node.text}
            color={node.color}
            onHover={onSkillHover || (() => {})}
          />
        ))}

        {/* Central glow */}
        <mesh>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.1} />
        </mesh>
      </group>
    </Float>
  );
}
