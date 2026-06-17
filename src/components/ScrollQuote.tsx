"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Fade in, stay solid, fade out smoothly right before the end
  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.7, 0.9], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.9], [1.25, 0.75]);

  return (
    <section ref={ref} className="w-full h-[120vh] bg-black border-b border-white/10 relative">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center p-8 overflow-hidden">
        <motion.div style={{ opacity, scale }} className="max-w-4xl text-center">
          <h2 className="font-serif italic text-4xl md:text-6xl lg:text-8xl text-white font-light leading-tight">
            "Where fabric<br/>becomes the gallery."
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
