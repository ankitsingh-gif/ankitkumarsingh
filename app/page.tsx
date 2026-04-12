"use client";

import dynamic from "next/dynamic";
import Preloader from "@/components/ui/Preloader";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Certifications from "@/components/sections/Certifications";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const Scene = dynamic(() => import("@/components/canvas/Scene"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <CustomCursor />

      {/* Film grain / noise overlay */}
      <div className="noise-overlay" />

      {/* Persistent 3D background */}
      <Scene />

      {/* Content */}
      <div className="content-layer">
        <Navbar />
        <Hero />
        <hr className="hr-glow mx-6 md:mx-12 lg:mx-20" />
        <About />
        <hr className="hr-glow mx-6 md:mx-12 lg:mx-20" />
        <Experience />
        <hr className="hr-glow mx-6 md:mx-12 lg:mx-20" />
        <Projects />
        <hr className="hr-glow mx-6 md:mx-12 lg:mx-20" />
        <Skills />
        <hr className="hr-glow mx-6 md:mx-12 lg:mx-20" />
        <Certifications />
        <Education />
        <hr className="hr-glow mx-6 md:mx-12 lg:mx-20" />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
