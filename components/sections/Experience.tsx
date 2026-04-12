"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { experience } from "@/data/portfolio-data";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Experience"
          subtitle="My professional journey in marketing, AI, and technology"
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/50 to-transparent" />

          {experience.map((entry, i) => (
            <motion.div
              key={i}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {/* Timeline node */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-accent bg-void z-10">
                {entry.active && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-accent/50"
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>

              {/* Content card */}
              <div
                className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                  i % 2 === 0 ? "md:pr-8" : "md:pl-8"
                }`}
              >
                <GlassCard
                  glowColor={
                    entry.active
                      ? "rgba(0, 229, 255, 0.2)"
                      : "rgba(255, 215, 0, 0.1)"
                  }
                >
                  {/* Period badge */}
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="text-accent font-heading text-sm font-semibold">
                      {entry.period}
                    </span>
                    {entry.active && (
                      <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full border border-accent/30">
                        ACTIVE
                      </span>
                    )}
                    {entry.location && (
                      <span className="text-text-secondary text-xs flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {entry.location}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-bold text-text-primary mb-1">
                    {entry.title}
                  </h3>
                  <p className="text-accent text-sm mb-4">
                    {entry.company}
                    {entry.companyNote && (
                      <span className="text-text-secondary">
                        {" "}
                        — {entry.companyNote}
                      </span>
                    )}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2">
                    {entry.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="text-text-secondary text-sm leading-relaxed flex gap-2"
                      >
                        <span className="text-accent mt-1.5 shrink-0">
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
