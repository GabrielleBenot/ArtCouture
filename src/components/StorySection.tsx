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
              Art Couture was born when European mixed-media painter Gabrielle Benot and South African-born haute couture designer Charmaigne Menn discovered they shared the same obsession: what happens when a painting becomes a dress? Gabrielle, who holds a degree in fashion design from the Copenhagen School of Design, had spent years exhibiting her textured, color-rich canvases in galleries across Europe and the United States.
            </p>
            <p className="text-xs md:text-sm text-white/50 font-mono uppercase tracking-[0.15em] leading-[1.8]">
              Charmaigne brought over 25 years of bespoke couture experience, having dressed prominent clients across the United States and South Africa with a reputation for impeccable construction and fit. Together as &ldquo;Gabi et Char,&rdquo; they built a luxury atelier where original artworks and one-of-a-kind garments are created side by side. The result is fashion that carries the soul of fine art, and art that moves like couture.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] group">
              <div className="absolute inset-0 bg-[var(--dada-red-glow)] mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
              <img 
                src="/images/gabi_et_char_cropped.jpg" 
                alt="Gabrielle Benot and Charmaigne Menn founders of Art Couture atelier" 
                loading="lazy"
                className="w-full h-full object-cover object-[center_30%] grayscale group-hover:grayscale-0 transition-all duration-[1.5s]"
              />
            </div>
            <span className="block text-center font-serif italic text-sm tracking-[0.25em] text-white/70 mt-4">Gabi et Char</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
