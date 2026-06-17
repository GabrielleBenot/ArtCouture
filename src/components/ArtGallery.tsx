"use client";
import React from "react";
import { motion } from "framer-motion";

const artworks = [
  { title: "VIBRANT COUTURE", img: "/art/VIBRANT COUTURE.webp" },
  { title: "DUALITY IN DARKNESS", img: "/art/DUALITY IN DARKNESS.webp" },
  { title: "THE STORM WITHIN", img: "/art/THE STORM WITHIN.webp" },
  { title: "KINETIC GRACE", img: "/art/KINETIC GRACE.webp" },
  { title: "SHATTERED WINGS", img: "/art/SHATTERED WINGS.webp" },
  { title: "EXPLOSIVE ARABESQUE", img: "/art/EXPLOSIVE ARABESQUE.webp" },
];

export function ArtGallery() {
  return (
    <section className="py-40 bg-[var(--background)] border-b border-[var(--border-light)]">
      <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-[var(--border-light)] pb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-xs font-mono tracking-[0.4em] uppercase text-[var(--dada-red)] mb-6 block">
              The Origin
            </h2>
            <h3 className="text-[5rem] md:text-[8rem] lg:text-[12rem] font-serif font-extralight text-[var(--text-main)] leading-[0.8] tracking-tight">
              The Art Behind<br/>The Patterns.
            </h3>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xs md:text-sm text-[var(--text-muted)] font-mono uppercase tracking-[0.15em] leading-[1.8] max-w-lg mt-12 md:mt-0"
          >
            Original mixed media artworks by Gabrielle Benot that serve as the foundation for our haute couture collections.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-16 md:gap-y-24">
          {artworks.map((art, i) => (
            <motion.div 
              key={art.title + i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.15 }}
              className="group"
            >
              <div className="w-full aspect-square overflow-hidden mb-8 bg-gray-100 border border-[var(--border-light)] p-2 md:p-4">
                <img 
                  src={art.img} 
                  alt={art.title} 
                  className="w-full h-full object-cover shadow-md transform group-hover:scale-[1.05] transition-transform duration-700 ease-out"
                />
              </div>
              <div className="flex justify-between items-center border-t border-[var(--border-light)] pt-4">
                <h3 className="text-sm md:text-base font-mono uppercase tracking-widest text-[var(--text-main)]">
                  {art.title}
                </h3>
                <span className="text-xs font-mono text-[var(--text-muted)] tracking-widest">MIXED MEDIA</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
