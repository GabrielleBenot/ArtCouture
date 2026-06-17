"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function CatwalkVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax for the video container itself
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section ref={containerRef} className="relative h-[120vh] w-full overflow-hidden bg-[var(--background)] flex items-center justify-center py-20">
      <motion.div 
        style={{ scale }}
        className="relative w-[90%] md:w-[70%] h-[80vh] overflow-hidden rounded-sm"
      >
        <motion.div style={{ y }} className="absolute inset-0 w-full h-[140%] -top-[20%]">
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop
            playsInline
            aria-label="Art Couture runway catwalk presentation featuring bespoke haute couture gowns"
            title="Art Couture fashion show catwalk"
            poster="/campaign/create_the_edge.jpg"
            className="w-full h-full object-cover opacity-80"
            style={{ filter: 'grayscale(100%) sepia(20%) brightness(0.8) contrast(0.9)' }}
          >
            <source src="/videos/catwalk.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply pointer-events-none" />
        </motion.div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none p-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="text-[5rem] md:text-[8rem] lg:text-[11rem] font-serif font-extralight text-white tracking-widest uppercase mix-blend-overlay leading-[0.8]"
          >
            In Motion
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-12 text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-white/90 drop-shadow-xl max-w-2xl leading-[1.8]"
          >
            Couture is meant to be lived in. Every seam, every drape, every cut, designed to move as beautifully as it looks standing still.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
