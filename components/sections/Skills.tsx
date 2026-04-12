"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillSphere from "@/components/canvas/SkillSphere";
import { skillCategories } from "@/data/portfolio-data";

function SkillLegend() {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8">
      {skillCategories.map((cat) => (
        <div key={cat.name} className="flex items-center gap-2">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: cat.color }}
          />
          <span className="text-text-secondary text-xs font-heading tracking-wider">
            {cat.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="section">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Skills & Tools"
          subtitle="An interactive universe of capabilities — drag to explore"
        />

        {/* 3D Skill Sphere */}
        <div className="relative w-full h-[500px] md:h-[600px]">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            dpr={[1, 1.5]}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <SkillSphere onSkillHover={setHoveredSkill} />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={false}
                maxPolarAngle={Math.PI}
                minPolarAngle={0}
              />
              <AdaptiveDpr pixelated />
            </Suspense>
          </Canvas>

          {/* Hover tooltip */}
          {hoveredSkill && (
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="text-accent font-heading text-sm">
                {hoveredSkill}
              </span>
            </motion.div>
          )}
        </div>

        {/* Legend */}
        <SkillLegend />

        {/* Mobile fallback: flat skill grid */}
        <div className="md:hidden mt-12 space-y-6">
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h4
                className="font-heading text-sm font-semibold mb-3 tracking-wider"
                style={{ color: cat.color }}
              >
                {cat.name}
              </h4>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs rounded-full glass"
                    style={{
                      color: cat.color,
                      borderColor: `${cat.color}30`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
