"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "./MagneticButton";

export function IntroLoader() {
  const [beamVisible, setBeamVisible] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    // Force scroll to top and prevent browser from restoring previous scroll position
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Use timeout to override any immediate scroll restorations from frameworks/lenis
    setTimeout(() => window.scrollTo(0, 0), 50);

    if (!entered) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      setTimeout(() => window.scrollTo(0, 0), 50);
    }
    // Cleanup on unmount just in case
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [entered]);

  const handleEnter = () => {
    setBeamVisible(true);
    setTimeout(() => {
      setBeamVisible(false);
      setEntered(true);
      
      // After it slides up, we can optionally hide it completely
      setTimeout(() => {
        // Overlay is gone
      }, 1000);
    }, 600);
  };

  return (
    <section className={`fixed inset-0 z-[9999] w-full h-screen overflow-hidden bg-[#fafaf8] transition-transform duration-1000 ${entered ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="absolute inset-0 flex flex-col lg:flex-row">
        {/* Left Side: Text */}
        <div className="w-full lg:w-[45%] h-1/2 lg:h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 z-10 bg-[#fafaf8]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--dada-red)] mb-6 block">Art Couture Studio</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-sans font-black tracking-tighter text-[#050505] leading-[1.05] mb-8"
          >
            Where vision becomes style<br/>and style becomes <span className="font-serif italic font-normal">art.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-xl font-serif text-[#050505]/70 leading-relaxed mb-12 max-w-md"
          >
            Discover the intersection of art studio and couture atelier, where unique artworks and bespoke fashion blend seamlessly.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <MagneticButton>
              <button 
                onClick={handleEnter}
                className="bg-black text-white px-10 py-5 font-mono text-xs uppercase tracking-[0.2em] hover:bg-[var(--dada-red)] transition-colors duration-300"
              >
                Click to enter
              </button>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full lg:w-[55%] h-1/2 lg:h-full relative flex items-center justify-center p-8">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="https://storage.googleapis.com/mixo-sites/images/file-b2b2d022-3c50-445d-92df-17b797dfa179.png" 
            alt="Art Couture Intro" 
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>
      </div>

      {/* Orange Beam Effect */}
      <AnimatePresence>
        {beamVisible && (
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="absolute top-1/2 left-0 w-full h-[4px] -mt-[2px] bg-[var(--dada-red)] z-[60] shadow-[0_0_60px_15px_rgba(255,89,0,0.9)] origin-center"
          />
        )}
      </AnimatePresence>
    </section>
  );
}
