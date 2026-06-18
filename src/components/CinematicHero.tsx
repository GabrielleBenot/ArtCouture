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
          preload="auto"
          aria-label="Art Couture haute couture silk fabric flowing in motion at the atelier"
          title="Art Couture atelier silk fabric"
          className="w-full h-full object-cover object-center opacity-80"
          style={{ filter: 'grayscale(100%) sepia(20%) brightness(0.8) contrast(0.9)' }}
        >
          <source src="/videos/silk_fabric.mp4" type="video/mp4" />
        </video>
      </motion.div>
      
      {/* Subtle gradient overlay to ensure text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none z-[2]" />
      
      {/* Bottom vignette for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-[2]" />

        {/* Text Content overlaying the video */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center items-center md:items-start p-8 pt-20 md:p-16 lg:p-24 text-left">
          <h1 className="text-[2.8rem] md:text-6xl lg:text-[5.5rem] font-sans font-black tracking-tighter text-white leading-[0.9] mb-8 uppercase mix-blend-difference">
            A canvas <br/>
            <span className="font-serif italic font-light text-white/70 lowercase">in motion.</span><br/>
            A masterpiece <br/>
            <span className="text-[var(--dada-red)]">worn.</span>
          </h1>
          <p className="font-serif text-[1.15rem] md:text-xl text-white/80 leading-relaxed max-w-2xl mix-blend-difference mb-12">
            Every gown begins as a painting. The colors, textures, and brushstrokes of Gabrielle Benot&apos;s original artworks are translated into the finest bespoke fabrics and sculpted into haute couture by Charmaigne Menn&apos;s masterful hand.
          </p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col items-center w-fit gap-3 mix-blend-difference mt-14 md:mt-4"
          >
            <span className="font-serif italic text-[12px] md:text-[11px] tracking-[0.25em] text-white/70">Scroll to discover</span>
            <div className="w-[1px] h-12 bg-white/15 overflow-hidden relative">
              <motion.div 
                className="w-full bg-white/60 absolute top-0 left-0"
                style={{ height: '40%' }}
                animate={{ y: ["-40%", "280%"] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              />
            </div>
            <motion.svg 
              width="10" height="6" viewBox="0 0 10 6" fill="none"
              animate={{ y: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              <path d="M1 1L5 5L9 1" stroke="white" strokeOpacity="0.5" strokeWidth="0.75" />
            </motion.svg>
          </motion.div>
        </div>
    </section>
  );
}
