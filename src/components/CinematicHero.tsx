"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "./MagneticButton";

export function CinematicHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section id="cinematic-hero" className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center pt-20 border-b-4 border-[var(--dada-red)]">
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
        <img 
          src="https://storage.googleapis.com/mixo-sites/images/file-b6c86729-ffc9-4a0b-8d69-63a2a0de2d7c.jpg"
          alt="Art Couture Woman"
          className="w-full h-full object-cover object-top opacity-80"
        />
        {/* Elegant fade to black at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
      </motion.div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-center text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mix-blend-difference text-white"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-black tracking-tight leading-tight mb-6">
            A canvas in motion.<br />A masterpiece worn.
          </h1>
          <p className="text-lg md:text-xl font-serif text-white/80 leading-relaxed mb-10 max-w-2xl">
            Enter a world where the rigid boundaries of gallery walls dissolve into the fluidity of silk and structured silhouettes. Every collection is an original exhibition, translating the raw emotion of fine art into breathtaking, wearable architecture.
          </p>
          <MagneticButton>
            <a 
              href="https://www.instagram.com/art_couture_boutique" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-[var(--dada-red)] transition-colors duration-300 border border-white/20 hover:border-transparent"
            >
              EXPLORE
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
