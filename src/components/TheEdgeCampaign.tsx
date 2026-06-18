"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

export function TheEdgeCampaign() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Smooth editorial parallax
  const y1 = useTransform(scrollYProgress, [0, 1], ["10%", "0%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);
  
  // Slide in from far sides
  const x1 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["50%", "0%"]);
  
  // Color reveal strictly from fully B&W to full color as they meet
  const grayscaleValue = useTransform(scrollYProgress, [0, 0.8], ["100%", "0%"]);
  const filter = useMotionTemplate`grayscale(${grayscaleValue})`;

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#050505] text-white overflow-hidden py-32 md:py-48 border-t border-white/10"
    >
      <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 flex flex-col gap-24">
        
        {/* Massive Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/20 pb-12">
          <h2 className="text-[3.5rem] md:text-[10rem] lg:text-[14rem] font-sans font-black tracking-tighter leading-[0.8] uppercase">
            Create<br/>
            <span className="font-serif italic text-[var(--dada-red)] font-extralight text-[6.2rem] md:text-[9rem] lg:text-[11rem] ml-6 md:ml-24 leading-[0.8] block -mt-4 md:-mt-8">The Edge.</span>
          </h2>
          <div className="max-w-md">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50 mb-4">
              The Genesis / The Result
            </p>
            <p className="font-mono text-xs md:text-sm uppercase tracking-[0.15em] leading-[1.8] text-white/80 mt-8">
              From a single brushstroke to a breathtaking reality. We do not simply design dresses. We forge armor for the modern muse. Unapologetic. Wearable. Art.
            </p>
          </div>
        </div>

        {/* The overlapping layout */}
        <div className="relative w-full h-[80vh] md:h-[100vh] mt-12 md:mt-24">
          
          {/* Left - The Sketch */}
          <motion.div 
            style={{ y: y1, x: x1 }}
            className="absolute left-0 top-0 w-[80%] md:w-[45%] h-[70%] md:h-[80%] z-10"
          >
            <div className="absolute inset-0 bg-[#f4f3ef]" />
            <motion.img 
              style={{ filter }}
              src="/campaign/atelier_sketch.png" 
              alt="Art Couture atelier fashion sketch by Charmaigne Menn"
              loading="lazy"
              className="relative z-10 w-full h-full object-cover object-center mix-blend-multiply shadow-2xl"
            />
            <div className="absolute bottom-6 left-6 z-20 mix-blend-difference">
              <p className="font-mono text-xs uppercase tracking-widest text-white">01. The Atelier</p>
            </div>
          </motion.div>

          {/* Right - The Edge Image (Sliding In) */}
          <motion.div 
            style={{ y: y2, x: x2 }}
            className="absolute right-0 bottom-0 w-full md:w-[65%] aspect-[4/3] md:aspect-video z-20 shadow-2xl"
          >
            <motion.img 
              style={{ filter }}
              src="/campaign/create_the_edge.jpg" 
              alt="Art Couture Create The Edge campaign haute couture"
              loading="lazy"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-6 left-6 z-20">
              <p className="font-mono text-xs uppercase tracking-widest text-white shadow-black drop-shadow-md">02. The Edge</p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
