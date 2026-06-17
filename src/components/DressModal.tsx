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
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = [dress.img, ...(dress.detailImages || [])];
  const activeImage = images[activeImageIndex];

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
        <div className="w-full md:w-[50%] h-[40vh] md:h-full shrink-0 relative p-4 md:p-6 lg:p-8">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
            className="w-full h-full relative overflow-hidden shadow-2xl rounded-sm bg-black"
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImageIndex}
                src={activeImage} 
                alt={dress.title} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full h-full object-cover absolute inset-0" 
              />
            </AnimatePresence>

            {/* Glassmorphism Editorial Index */}
            {images.length > 1 && (
              <div className="absolute top-1/3 -translate-y-1/2 left-4 md:left-6 z-50 py-5 md:py-8 px-4 md:px-6 rounded-xl bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col gap-5 md:gap-8 items-start">
                {images.map((img, idx) => {
                  const labels = ["The Silhouette", "The Bodice", "Fabric Detail", "The Hem"];
                  const label = labels[idx] || `Detail ${idx}`;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative text-left flex flex-col items-start transition-all duration-700 group pl-4 ${
                        activeImageIndex === idx 
                          ? 'opacity-100' 
                          : 'opacity-50 hover:opacity-100'
                      }`}
                    >
                      {/* Elegant Active Line Indicator */}
                      <div className={`absolute left-0 top-0.5 bottom-0.5 transition-all duration-500 rounded-full ${
                        activeImageIndex === idx 
                          ? 'w-[2px] bg-[var(--dada-red)] shadow-[0_0_10px_rgba(255,89,0,0.6)]' 
                          : 'w-[1px] bg-white/20 group-hover:bg-white/60'
                      }`} />
                      
                      <span className="font-mono text-[8px] md:text-[9px] tracking-[0.4em] uppercase text-white/70 mb-1 leading-none">
                        0{idx + 1}
                      </span>
                      <span className={`font-serif italic text-sm md:text-base tracking-widest text-white transition-all duration-500 drop-shadow-md leading-none`}>
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
            
            {/* Elegant dark gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 pointer-events-none" />
            
            {/* Floating Fabric and Customization Text */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 text-white pr-4"
            >
              <div className="mb-4 md:mb-6">
                <span className="block font-mono font-thin text-[10px] uppercase tracking-[0.4em] text-white/60 mb-2 border-l border-[var(--dada-red)] pl-3">The Fabric</span>
                <p className="font-serif font-light text-xs md:text-sm leading-relaxed tracking-wide opacity-95 pl-3 border-l border-transparent">
                  {dress.fabric}
                </p>
              </div>
              
              <div>
                <span className="block font-mono font-thin text-[10px] uppercase tracking-[0.4em] text-white/60 mb-2 border-l border-[var(--dada-red)] pl-3">Bespoke Customization</span>
                <p className="font-serif font-light text-xs md:text-sm leading-relaxed tracking-wide opacity-95 pl-3 border-l border-transparent">
                  {dress.customization}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: Content & Form */}
        <div className="w-full md:w-[50%] flex-1 overflow-y-auto flex flex-col px-6 py-6 md:px-12 lg:px-16 md:py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="my-auto max-w-lg"
          >
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[var(--dada-red)] mb-2 block">Haute Couture Collection</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[var(--text-main)] mb-3 leading-none">
              {dress.title}
            </h2>
            <span className="font-mono text-xs tracking-widest text-[var(--text-muted)] block mb-4">
              {dress.price}
            </span>
            <p className="font-serif italic text-base md:text-lg text-[var(--text-muted)] leading-relaxed mb-8">
              {dress.description}
            </p>

            <div className="w-full">
              <h3 className="text-xs font-mono tracking-[0.2em] uppercase border-b border-black/10 pb-3 mb-6">
                Inquire About This Piece
              </h3>
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center py-12"
                >
                  <span className="text-4xl block mb-6">&#10003;</span>
                  <h3 className="font-serif italic text-2xl text-[var(--text-main)] mb-4">Thank you for your inquiry.</h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">We will be in touch within 24 hours to arrange your private consultation.</p>
                </motion.div>
              ) : (
              <form className="space-y-6" onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                const form = e.currentTarget;
                const formData = new FormData(form);
                try {
                  await fetch("https://formspree.io/f/mnjyyqan", {
                    method: "POST",
                    body: formData,
                    headers: { Accept: "application/json" },
                  });
                  setSubmitted(true);
                } catch {
                  setIsSubmitting(false);
                }
              }}>
                <input type="hidden" name="_subject" value={`Inquiry: ${dress.title}`} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input type="text" name="firstName" required className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer" placeholder=" " />
                    <label className="absolute left-0 top-0 text-sm font-sans text-black/50 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">First Name</label>
                  </div>
                  <div className="relative group">
                    <input type="text" name="lastName" required className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer" placeholder=" " />
                    <label className="absolute left-0 top-0 text-sm font-sans text-black/50 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Last Name</label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input type="email" name="email" required className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer" placeholder=" " />
                    <label className="absolute left-0 top-0 text-sm font-sans text-black/50 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Email Address</label>
                  </div>
                  <div className="relative group">
                    <input type="date" name="eventDate" className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer text-black/80" />
                    <label className="absolute left-0 -top-4 text-xs font-sans text-black/50 pointer-events-none">Event Date (Optional)</label>
                  </div>
                </div>

                <div className="relative group">
                  <textarea rows={2} name="message" required className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer resize-none" placeholder=" "></textarea>
                  <label className="absolute left-0 top-0 text-sm font-sans text-black/50 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Your Message</label>
                </div>

                <MagneticButton className="mt-8">
                  <button type="submit" disabled={isSubmitting} className="bg-black text-white px-8 py-3 font-mono text-[10px] tracking-widest uppercase hover:bg-[var(--dada-red)] transition-colors duration-300 disabled:opacity-50">
                    {isSubmitting ? "Sending..." : "Send Inquiry"}
                  </button>
                </MagneticButton>
              </form>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
