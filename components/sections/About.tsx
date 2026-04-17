"use client";

import { motion } from "framer-motion";
import { stats } from "@/data/portfolio-data";

const whatIDo = [
  {
    icon: "📈",
    title: "Marketing Strategy",
    desc: "I design end-to-end branding, webinar funnels & email campaigns that actually convert C-suite audiences.",
    color: "#6C63FF",
  },
  {
    icon: "⚡",
    title: "Full-Stack Dev",
    desc: "I ship Next.js web apps, admin panels, fintech tools & 3D websites — not just prototypes, real products.",
    color: "#00D4AA",
  },
  {
    icon: "🤖",
    title: "AI Integration",
    desc: "Prompt engineering, AI chatbots, Gen-AI in content workflows — Google-certified and deployed in production.",
    color: "#FFD700",
  },
  {
    icon: "💡",
    title: "Product Thinking",
    desc: "From idea to deploy. I speak both business & tech — so nothing gets lost in translation.",
    color: "#FF6B9D",
  },
];

export default function About() {
  return (
    <section id="about" className="section relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--gradient)" }} />
          <span className="gradient-text text-sm font-semibold tracking-wider uppercase">About Me</span>
        </motion.div>

        {/* Punchy statement */}
        <motion.h2
          className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-fg leading-[1.1] mb-8 max-w-5xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          A <span className="gradient-text">marketer</span> who ships code.
          <br />
          A <span className="gradient-text">developer</span> who understands growth.
        </motion.h2>

        {/* Punchy subtext */}
        <div className="grid md:grid-cols-2 gap-10 mb-16 max-w-5xl">
          <motion.p
            className="text-fg-secondary text-base md:text-lg leading-[1.8]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Most marketers ask developers to &ldquo;just build it.&rdquo; I <strong className="text-fg">build it myself</strong> — because understanding the code behind the campaign is what separates okay results from real impact.
          </motion.p>
          <motion.p
            className="text-fg-secondary text-base md:text-lg leading-[1.8]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Currently at <strong className="text-accent">Resurgent India Limited</strong> — a SEBI-registered Category I Merchant Bank — leading marketing, AI integration & digital product work. Google-certified in Gen AI & Prompt Engineering.
          </motion.p>
        </div>

        {/* What I do cards */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-sm text-fg-muted tracking-[0.2em] uppercase mb-6">✦ What I do</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whatIDo.map((item, i) => (
              <motion.div
                key={i}
                className="card p-5 group relative overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                {/* Hover gradient backdrop */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top right, ${item.color}, transparent 70%)` }}
                />

                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                >
                  {item.icon}
                </div>
                <h4 className="font-display text-base font-bold text-fg mb-2 transition-colors" style={{ color: "var(--fg)" }}>
                  <span className="group-hover:gradient-text transition-all duration-300">{item.title}</span>
                </h4>
                <p className="text-fg-secondary text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-sm text-fg-muted tracking-[0.2em] uppercase mb-6">✦ Numbers that matter</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="card p-6 text-center group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-500">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-fg-muted text-xs tracking-wider uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
