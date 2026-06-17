"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function CatwalkVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
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
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover opacity-80"
          >
            {/* Elegant slow-motion fabric/runway video loop */}
            <source src="https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply pointer-events-none" />
        </motion.div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none p-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-8xl font-serif text-white tracking-widest uppercase mix-blend-overlay"
          >
            Pure Movement
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-6 text-xl md:text-3xl font-serif text-white/90 italic drop-shadow-xl max-w-2xl"
          >
            Where fabric breathes and art comes alive.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
