"use client";
import React from "react";
import { motion } from "framer-motion";

export function StorySection() {
  return (
    <section className="py-32 bg-[var(--background)] border-t border-[var(--border-light)]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row items-center gap-16"
        >
          <div className="flex-1 text-center md:text-left space-y-6">
            <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-extralight text-[var(--text-main)] leading-[0.9] tracking-tight mb-12">Our Story</h2>
            <p className="text-xs md:text-sm text-[var(--text-muted)] font-mono uppercase tracking-[0.2em] leading-loose">
              Art Couture is a Fashion Boutique and Art Gallery that combines the talents of mixed media artist Gabrielle Benot and Haute Couture fashion designer Charmaigne Menn. The artists' vision is to blur the lines between Art and fashion and create a space where customers can find one-of-a-kind designs and collectible pieces of art.
            </p>
            <p className="text-xs md:text-sm text-[var(--text-muted)] font-mono uppercase tracking-[0.2em] leading-loose">
              Each garment is crafted with the same care as a piece of fine art and the gallery features Gabrielle's stunning mixed media creations. Art Couture invites you to embrace your individuality and experience the beauty of the fusion of Art and fashion.
            </p>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-[var(--border-light)] shadow-2xl group">
              <div className="absolute inset-0 bg-[var(--dada-red-glow)] mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
              <img 
                src="https://storage.googleapis.com/mixo-sites/images/file-79d83dc3-308d-4dd6-9173-8dc2170520f7.jpeg" 
                alt="Gabrielle and Char" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s]"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
