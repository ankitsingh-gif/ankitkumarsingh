"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/portfolio-data";

export default function Skills() {
  return (
    <section id="skills" className="py-32 md:py-48 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.p
          className="text-fg-muted text-xs tracking-[0.3em] uppercase mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Expertise
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
            >
              <h3 className="text-fg text-sm font-display font-bold tracking-wider uppercase mb-4">
                {cat.name}
              </h3>
              <div className="space-y-1.5">
                {cat.skills.map((skill) => (
                  <p key={skill} className="text-fg-secondary text-sm">{skill}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
