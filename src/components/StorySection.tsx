"use client";
import React from "react";
import { motion } from "framer-motion";

export function StorySection() {
  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      {/* Subtle Background Watermark */}
      <div className="absolute inset-0 z-0 opacity-[0.05] grayscale mix-blend-screen pointer-events-none flex items-center justify-center">
        <img src="/images/sketches/mannequin.png" alt="" role="presentation" loading="lazy" className="w-full h-full object-cover md:object-contain scale-150 md:scale-125 invert" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row items-center gap-16"
        >
          <div className="flex-1 text-center md:text-left space-y-6">
            <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-extralight text-white leading-[0.9] tracking-tight mb-12">Our Story</h2>
            <p className="text-xs md:text-sm text-white/50 font-mono uppercase tracking-[0.15em] leading-[1.8]">
              Art Couture was born when European mixed-media painter Gabrielle Benot and South African-born haute couture designer Charmaigne Menn realized they shared the same obsession: what happens when a painting becomes a dress?
            </p>
            <p className="text-xs md:text-sm text-white/50 font-mono uppercase tracking-[0.15em] leading-[1.8]">
              Together as &ldquo;Gabi et Char,&rdquo; they built a luxury atelier in La Jolla where original artworks and one-of-a-kind garments are created side by side, each one informing the other. Gabrielle brings a refined European eye for color and composition. Charmaigne brings decades of couture precision shaped by a life spanning continents. The result is fashion that carries the soul of fine art, and art that moves like couture.
            </p>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border border-white/10 shadow-2xl group">
              <div className="absolute inset-0 bg-[var(--dada-red-glow)] mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
              <img 
                src="https://storage.googleapis.com/mixo-sites/images/file-79d83dc3-308d-4dd6-9173-8dc2170520f7.jpeg" 
                alt="Gabrielle Benot and Charmaigne Menn founders of Art Couture atelier La Jolla" 
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s]"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
