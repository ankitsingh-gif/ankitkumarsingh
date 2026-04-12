"use client";

import { motion } from "framer-motion";
import { aboutText, stats } from "@/data/portfolio-data";
import { useInView } from "@/hooks/useInView";

function Counter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="border-t border-text-muted pt-6"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="font-display text-5xl md:text-6xl font-bold text-text-primary mb-2">
        {inView ? value : 0}{suffix}
      </div>
      <div className="text-text-secondary text-xs tracking-[0.2em] uppercase">
        {label}
      </div>
    </motion.div>
  );
}

export default function About() {
  const { ref: titleRef, inView: titleInView } = useInView();
  const { ref: textRef, inView: textInView } = useInView();
  const paragraphs = aboutText.split("\n\n");

  return (
    <section id="about" className="section-full">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="section-number">01 / ABOUT</span>
        </motion.div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: title */}
          <div ref={titleRef}>
            <motion.h2
              className="font-display text-section-title font-bold text-text-primary mb-8"
              initial={{ opacity: 0, y: 60 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Building at the
              <br />
              <span className="text-accent">intersection</span>
            </motion.h2>
          </div>

          {/* Right: description */}
          <div ref={textRef} className="space-y-6">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                className="text-text-secondary text-base leading-[1.8]"
                initial={{ opacity: 0, y: 30 }}
                animate={textInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
          {stats.map((stat, i) => (
            <Counter
              key={i}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
