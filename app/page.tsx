"use client";

import dynamic from "next/dynamic";
import Preloader from "@/components/ui/Preloader";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const PersistentScene = dynamic(() => import("@/components/canvas/PersistentScene"), { ssr: false });

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <CustomCursor />
      <ScrollProgress />
      <PersistentScene />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <div className="gradient-line mx-6 md:mx-10" />
        <About />
        <div className="gradient-line mx-6 md:mx-10" />
        <Experience />
        <div className="gradient-line mx-6 md:mx-10" />
        <Projects />
        <div className="gradient-line mx-6 md:mx-10" />
        <Skills />
        <div className="gradient-line mx-6 md:mx-10" />
        <Certifications />
        <div className="gradient-line mx-6 md:mx-10" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
