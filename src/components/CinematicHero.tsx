"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function CinematicHero() {
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 1000], ["0%", "15%"]);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section id="cinematic-hero" className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      
      {/* Background Video */}
      <motion.div style={{ y: yImage }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover object-center grayscale opacity-80"
        >
          <source src="/ballerina_trimmed.mp4" type="video/mp4" />
        </video>
      </motion.div>
      
      {/* Subtle gradient overlay to ensure text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Text Content overlaying the video */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center p-8 md:p-16 lg:p-24 text-left">
          <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-sans font-black tracking-tighter text-white leading-[0.9] mb-8 uppercase mix-blend-difference">
            A canvas <br/>
            <span className="font-serif italic font-light text-white/70 lowercase">in motion.</span><br/>
            A masterpiece <br/>
            <span className="text-[var(--dada-red)]">worn.</span>
          </h1>
          <p className="font-serif text-base md:text-xl text-white/80 leading-relaxed max-w-2xl mix-blend-difference mb-12">
            Enter a world where the rigid boundaries of gallery walls dissolve into the fluidity of silk and structured silhouettes. Every collection is an original exhibition, translating the raw emotion of fine art into breathtaking, wearable architecture.
          </p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col items-center w-fit gap-4 mix-blend-difference mt-4"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white">Scroll to discover</span>
            <div className="w-[1px] h-16 bg-white/30 overflow-hidden relative">
              <motion.div 
                className="w-full h-full bg-white absolute top-0 left-0 origin-top"
                animate={{ scaleY: [0, 1, 0], y: ["0%", "0%", "100%"] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
    </section>
  );
}
