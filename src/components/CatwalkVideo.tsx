"use client";
import React, { useRef, useEffect } from "react";
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Skip the initial title card/black box (starts around 5 seconds)
    // and loop after 15 seconds of pure cheetah running (loop at 20s)
    const startTime = 5.0; 
    const endTime = 20.0;

    const handleLoadedMetadata = () => {
      video.currentTime = startTime;
      video.play().catch(e => console.log("Auto-play prevented", e));
    };

    const handleTimeUpdate = () => {
      if (video.currentTime >= endTime) {
        video.currentTime = startTime;
        video.play().catch(e => console.log("Auto-play prevented", e));
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

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
            playsInline
            className="w-full h-full object-cover opacity-80 grayscale"
          >
            {/* Conceptual slow-motion cheetah running to represent pure movement */}
            <source src="https://upload.wikimedia.org/wikipedia/commons/transcoded/6/62/Cheetahs_on_the_Edge_%28Director%27s_Cut%29.ogv/Cheetahs_on_the_Edge_%28Director%27s_Cut%29.ogv.1080p.vp9.webm" type="video/webm" />
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
            Pure Movement
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-12 text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-white/90 drop-shadow-xl max-w-2xl leading-[1.8]"
          >
            Effortless elegance, translating the wild rhythm of nature into pure couture.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
