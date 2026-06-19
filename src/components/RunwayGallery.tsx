"use client";
import React from "react";
import { motion } from "framer-motion";

const runwayItems = [
  {
    title: "Fuchsia Majesty",
    category: "Evening Gown",
    img: "https://storage.googleapis.com/mixo-sites/images/file-b1585176-4ab0-4441-9ca1-0979786596cd.jpg",
  },
  {
    title: "Noir Power",
    category: "Couture Jacket",
    img: "/collections/jacket_two.png",
  },
  {
    title: "Golden Whisper",
    category: "Gala Gown",
    img: "https://storage.googleapis.com/mixo-sites/images/file-fbdb7417-d98d-4d96-99ed-20eb22b057ae.jpg",
  },
  {
    title: "Ivory Architecture",
    category: "Structured Jacket",
    img: "https://images.unsplash.com/photo-1550639525-c97d455acf70?w=800&q=80",
  },
  {
    title: "Crimson Allure",
    category: "Evening Gown",
    img: "https://storage.googleapis.com/mixo-sites/images/file-efa8732c-2726-4513-9f7d-66e84a3ead12.jpg",
  },
  {
    title: "Blush Enchantress",
    category: "Bridal Couture",
    img: "/images/blush_enchantress.jpg",
  },
  {
    title: "Blush Couture",
    category: "Haute Couture",
    img: "https://storage.googleapis.com/mixo-sites/images/file-e25b0f24-1bdb-4182-886e-58dd451f1664.jpg",
  },
  {
    title: "Crimson Drape",
    category: "Couture Trench",
    img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
  },
  {
    title: "Midnight Elegance",
    category: "Evening Gown",
    img: "https://storage.googleapis.com/mixo-sites/images/file-fd88942d-471c-4ef4-ac9b-1d4292999cb3.jpg",
  },
  {
    title: "Pearl Symphony",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80",
  },
];

// Duplicate for seamless loop
const loopItems = [...runwayItems, ...runwayItems];

export function RunwayGallery() {
  return (
    <section className="relative py-20 md:py-28 bg-[#0a0a0a] overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="block font-mono text-[10px] tracking-[0.4em] uppercase text-[var(--dada-red)] mb-4"
        >
          Runway Preview
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl md:text-6xl font-extralight text-white/90 leading-tight"
        >
          From the Studio
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25 mt-4"
        >
          Scroll or watch the runway unfold
        </motion.p>
      </div>

      {/* Auto-scrolling runway strip */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        {/* Marquee track */}
        <div className="flex runway-marquee">
          {loopItems.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              className="flex-shrink-0 w-[140px] md:w-[180px] mx-2 md:mx-3 group cursor-pointer"
            >
              {/* Tall, narrow card */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-sm">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 pointer-events-none" />
                {/* Category tag */}
                <span className="absolute top-3 left-3 font-mono text-[7px] tracking-[0.2em] uppercase text-white/50 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-sm">
                  {item.category}
                </span>
              </div>
              {/* Title below */}
              <p className="font-serif text-[11px] text-white/60 mt-2 tracking-wide group-hover:text-white/90 transition-colors duration-500">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* View Collection link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="max-w-7xl mx-auto px-6 mt-10 md:mt-14"
      >
        <a
          href="#collections"
          className="inline-flex items-center gap-3 font-mono text-[9px] tracking-[0.3em] uppercase text-white/40 hover:text-[var(--dada-red)] transition-colors duration-500 group"
        >
          <span>View Full Collection</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </motion.div>

      {/* Marquee animation */}
      <style>{`
        .runway-marquee {
          animation: runway-scroll 40s linear infinite;
        }
        .runway-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes runway-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
