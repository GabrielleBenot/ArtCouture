"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import type { DressItem } from "./EditorialCollection";

export function DressModal({ 
  dress, 
  onClose 
}: { 
  dress: DressItem, 
  onClose: () => void 
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-auto"
    >
      {/* Background Frost */}
      <div 
        className="absolute inset-0 bg-[#fafaf8]/95 backdrop-blur-2xl"
        onClick={onClose}
      />

      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
        className="relative w-full h-full md:w-[95vw] md:h-[95vh] bg-[#fafaf8] md:shadow-2xl md:rounded-2xl overflow-hidden flex flex-col md:flex-row pointer-events-auto"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-[100] w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full text-black hover:text-[var(--dada-red)] transition-colors group border border-black/10 hover:border-[var(--dada-red)]"
        >
          <span className="font-mono text-xs tracking-widest">X</span>
        </button>

        {/* Left: Image */}
        <div className="w-full md:w-[45%] h-[50vh] md:h-screen relative p-6 md:p-12">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
            className="w-full h-full relative overflow-hidden shadow-2xl rounded-sm"
          >
            <img src={dress.img} alt={dress.title} className="w-full h-full object-cover" />
            
            {/* Elegant dark gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90" />
            
            {/* Floating Fabric and Customization Text */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="absolute bottom-8 left-8 right-8 text-white pr-4"
            >
              <div className="mb-6">
                <span className="block font-mono font-thin text-[10px] uppercase tracking-[0.4em] text-white/60 mb-2 border-l border-[var(--dada-red)] pl-3">The Fabric</span>
                <p className="font-serif font-light text-sm leading-relaxed tracking-wide opacity-95 pl-3 border-l border-transparent">
                  {dress.fabric}
                </p>
              </div>
              
              <div>
                <span className="block font-mono font-thin text-[10px] uppercase tracking-[0.4em] text-white/60 mb-2 border-l border-[var(--dada-red)] pl-3">Bespoke Customization</span>
                <p className="font-serif font-light text-sm leading-relaxed tracking-wide opacity-95 pl-3 border-l border-transparent">
                  {dress.customization}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: Content & Form */}
        <div className="w-full md:w-[55%] h-full flex flex-col justify-center px-8 py-12 md:px-24 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--dada-red)] mb-4 block">Haute Couture Collection</span>
            <h2 className="text-4xl md:text-6xl font-serif text-[var(--text-main)] mb-6 leading-none">
              {dress.title}
            </h2>
            <span className="font-mono text-sm tracking-widest text-[var(--text-muted)] block mb-8">
              {dress.price}
            </span>
            <p className="font-serif italic text-lg md:text-xl text-[var(--text-muted)] leading-relaxed mb-16 max-w-lg">
              {dress.description}
            </p>

            <div className="w-full max-w-lg">
              <h3 className="text-sm font-mono tracking-[0.2em] uppercase border-b border-black/10 pb-4 mb-8">Inquire About This Piece</h3>
              
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input type="text" required className="w-full bg-transparent border-b border-black/20 pb-3 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer" placeholder=" " />
                    <label className="absolute left-0 top-0 text-sm font-sans text-black/50 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">First Name</label>
                  </div>
                  <div className="relative group">
                    <input type="text" required className="w-full bg-transparent border-b border-black/20 pb-3 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer" placeholder=" " />
                    <label className="absolute left-0 top-0 text-sm font-sans text-black/50 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Last Name</label>
                  </div>
                </div>

                <div className="relative group">
                  <input type="email" required className="w-full bg-transparent border-b border-black/20 pb-3 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer" placeholder=" " />
                  <label className="absolute left-0 top-0 text-sm font-sans text-black/50 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Email Address</label>
                </div>

                <div className="relative group">
                  <input type="date" required className="w-full bg-transparent border-b border-black/20 pb-3 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer text-black/80" />
                  <label className="absolute left-0 -top-4 text-xs font-sans text-black/50 pointer-events-none">Event Date (Optional)</label>
                </div>

                <div className="relative group">
                  <textarea rows={3} required className="w-full bg-transparent border-b border-black/20 pb-3 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer resize-none" placeholder=" "></textarea>
                  <label className="absolute left-0 top-0 text-sm font-sans text-black/50 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Your Message</label>
                </div>

                <MagneticButton className="mt-8">
                  <button type="submit" className="bg-black text-white px-10 py-4 font-mono text-xs tracking-widest uppercase hover:bg-[var(--dada-red)] transition-colors duration-300">
                    Send Inquiry
                  </button>
                </MagneticButton>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
