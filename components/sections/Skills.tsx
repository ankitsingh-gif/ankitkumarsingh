"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/portfolio-data";

export default function Skills() {
  // Flatten all skills for marquee
  const allSkills = skillCategories.flatMap((c) => c.skills);
  const marqueeText = allSkills.join(" \u00B7 ");

  return (
    <section id="skills" className="py-32 overflow-hidden">
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="section-number">04 / SKILLS</span>
        </motion.div>

        <motion.h2
          className="font-display text-section-title font-bold text-text-primary mb-24"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Tools &
          <br />
          <span className="text-accent">expertise</span>
        </motion.h2>
      </div>

      {/* Infinite marquee */}
      <div className="mb-24 py-8 border-y border-text-muted overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="font-display text-4xl md:text-6xl font-bold text-text-muted mx-4">
            {marqueeText} &middot; {marqueeText}
          </span>
        </div>
      </div>

      {/* Skill categories grid */}
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={i}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <h3 className="font-display text-sm font-bold tracking-[0.15em] uppercase text-text-primary">
                  {cat.name}
                </h3>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                {cat.skills.map((skill, j) => (
                  <motion.div
                    key={j}
                    className="text-text-secondary text-sm hover:text-text-primary hover:pl-2 transition-all duration-300"
                    data-cursor="pointer"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
