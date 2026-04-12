"use client";

import dynamic from "next/dynamic";
import Preloader from "@/components/ui/Preloader";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Footer from "@/components/sections/Footer";

// Dynamic imports for heavier 3D sections (no SSR)
const Skills = dynamic(() => import("@/components/sections/Skills"), {
  ssr: false,
});
const Certifications = dynamic(
  () => import("@/components/sections/Certifications"),
  { ssr: false }
);
const Education = dynamic(() => import("@/components/sections/Education"), {
  ssr: false,
});
const Contact = dynamic(() => import("@/components/sections/Contact"), {
  ssr: false,
});

// Global persistent 3D background
const Scene = dynamic(() => import("@/components/canvas/Scene"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Preloader />

      {/* Persistent 3D background */}
      <Scene />

      {/* 2D content layer */}
      <div className="content-layer">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Education />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
