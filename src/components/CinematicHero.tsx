"use client";
import React, { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { X, Lock } from "lucide-react";

export function CinematicHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const [showVault, setShowVault] = useState(false);

  // Vault images (all 6 dresses)
  const vaultImages = [
    { src: "https://storage.googleapis.com/mixo-sites/images/file-b1585176-4ab0-4441-9ca1-0979786596cd.jpg", title: "Fuchsia Majesty" },
    { src: "https://storage.googleapis.com/mixo-sites/images/file-3a32d6f7-9d96-47e6-9e16-1d3e8c356fa3.jpg", title: "Blush Enchantress" },
    { src: "https://storage.googleapis.com/mixo-sites/images/file-fbdb7417-d98d-4d96-99ed-20eb22b057ae.jpg", title: "Golden Whisper" },
    { src: "https://storage.googleapis.com/mixo-sites/images/file-efa8732c-2726-4513-9f7d-66e84a3ead12.jpg", title: "Crimson Allure" },
    { src: "https://storage.googleapis.com/mixo-sites/images/file-fd88942d-471c-4ef4-ac9b-1d4292999cb3.jpg", title: "Midnight Echo" },
    { src: "https://storage.googleapis.com/mixo-sites/images/file-e25b0f24-1bdb-4182-886e-58dd451f1664.jpg", title: "Blush Couture" }
  ];

  return (
    <>
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
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setShowVault(true);
                }}
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-[var(--dada-red)] transition-colors duration-300 border border-white/20 hover:border-transparent"
              >
                EXPLORE
              </button>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showVault && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#111] text-white overflow-y-auto overflow-x-hidden flex flex-col"
          >
            {/* Header */}
            <div className="w-full flex justify-between items-center p-6 md:p-12 sticky top-0 z-20 bg-gradient-to-b from-[#111] to-transparent">
              <span className="font-sans font-black text-sm uppercase tracking-[0.2em] flex items-center gap-3">
                <Lock size={16} /> The Vault
              </span>
              <button 
                onClick={() => setShowVault(false)}
                className="hover:text-[var(--dada-red)] transition-colors bg-black/50 p-2 rounded-full backdrop-blur-md"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Masonry Vault Grid */}
            <div className="px-6 md:px-12 pb-24 max-w-[100rem] mx-auto w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 pt-10">
                {vaultImages.map((img, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative group overflow-hidden ${i % 2 === 0 ? 'mt-0 md:mt-24' : ''}`}
                  >
                    <div className="aspect-[3/4] w-full bg-[#222]">
                      <img 
                        src={img.src} 
                        alt={img.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      />
                    </div>
                    {/* Vault Info Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--dada-red)] mb-2">Archive 00{i + 1}</p>
                      <h3 className="font-serif text-3xl text-white">{img.title}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Call to action */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="mt-32 flex justify-center"
              >
                <button 
                  onClick={() => {
                    setShowVault(false);
                    setTimeout(() => {
                      document.getElementById("cinematic-hero")?.nextElementSibling?.scrollIntoView({ behavior: "smooth" });
                    }, 800);
                  }}
                  className="font-mono text-sm border border-white/30 px-12 py-5 uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
                >
                  Continue to Collections
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
