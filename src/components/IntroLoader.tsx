"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "./MagneticButton";

export function IntroLoader() {
  const [phase, setPhase] = useState<"idle" | "flash" | "split" | "done">("idle");
  const [entered, setEntered] = useState(false);
  const [hasAnimatedOut, setHasAnimatedOut] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (entered) {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
      const timer = setTimeout(() => {
        setHasAnimatedOut(true);
      }, 1500);
      return () => clearTimeout(timer);
    }

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [entered]);

  const handleEnter = () => {
    window.scrollTo(0, 0);
    // Phase 1: Brief white flash
    setPhase("flash");
    setTimeout(() => {
      // Phase 2: Split curtains apart
      setPhase("split");
      setTimeout(() => {
        // Phase 3: Done - unmount
        setPhase("done");
        setEntered(true);
      }, 900);
    }, 300);
  };

  if (hasAnimatedOut) return null;

  return (
    <>
      {/* Main intro content */}
      <section className={`fixed inset-0 z-[9999] w-full h-screen overflow-hidden bg-[#fafaf8] transition-all duration-300 ${phase === "idle" ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        
        {/* Mobile: Cinematic centered layout */}
        <div className="absolute inset-0 flex flex-col lg:hidden">
          {/* Full-screen background image (faded) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <img 
              src="https://storage.googleapis.com/mixo-sites/images/file-b2b2d022-3c50-445d-92df-17b797dfa179.png" 
              alt="" 
              role="presentation"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Dark vignette overlay for text contrast */}
          <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0.05) 55%, rgba(0,0,0,0.35) 100%)' }} />

          {/* Art Couture Studio - pinned to top */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="absolute top-14 left-0 right-0 flex justify-center z-10"
          >
            <span
              className="font-mono text-[11px] tracking-[0.45em] uppercase text-white font-bold"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
            >
              Art Couture Studio
            </span>
          </motion.div>

          {/* Centered title */}
          <div className="relative z-10 flex flex-col items-center h-screen px-6 pt-[22vh]">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="text-[3.8rem] font-sans font-black tracking-tighter text-[#050505] leading-[0.95] text-center"
              style={{ textShadow: '0 0 30px rgba(255,255,255,1), 0 0 60px rgba(255,255,255,0.8), 0 0 90px rgba(255,255,255,0.5)' }}
            >
              Where vision<br/>becomes style<br/>and style becomes<br/><span className="font-serif italic font-normal text-[4.5rem]">art.</span>
            </motion.h1>

            {/* Enter button - editorial underline style in orange */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-6 flex justify-center z-20"
            >
              <MagneticButton>
                <button 
                  onClick={handleEnter}
                  className="group relative font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--dada-red)] py-2 bg-transparent border-none cursor-pointer"
                  style={{ textShadow: '0 0 12px rgba(255,89,0,0.3), 0 0 25px rgba(255,255,255,0.9)' }}
                >
                  Enter the Atelier
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1.4, ease: [0.76, 0, 0.24, 1] }}
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--dada-red)] origin-left"
                    style={{ boxShadow: '0 0 8px rgba(255,89,0,0.4)' }}
                  />
                </button>
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        {/* Desktop: Original side-by-side layout (untouched) */}
        <div className="absolute inset-0 hidden lg:flex flex-row">
          <div className="w-[45%] h-full flex flex-col justify-center px-24 z-10 bg-[#fafaf8]">
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
              className="text-7xl font-sans font-black tracking-tighter text-[#050505] leading-[1.05] mb-8"
            >
              Where vision becomes style<br/>and style becomes <span className="font-serif italic font-normal">art.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-xl font-serif text-[#050505]/70 leading-relaxed mb-12 max-w-md"
            >
              Step inside the atelier where original paintings become haute couture. Every color, every brushstroke, every bespoke gown, crafted entirely by hand.
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

          <div className="w-[55%] h-full relative flex items-center justify-center p-8">
            <motion.img 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              src="https://storage.googleapis.com/mixo-sites/images/file-b2b2d022-3c50-445d-92df-17b797dfa179.png" 
              alt="Art Couture by Gabrielle Benot and Charmaigne Menn, bespoke haute couture atelier" 
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>
        </div>
      </section>

      {/* Dramatic Curtain Split Overlay */}
      <AnimatePresence>
        {(phase === "flash" || phase === "split") && (
          <>
            {/* Brief white flash */}
            <motion.div
              key="flash"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "flash" ? 0.8 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[10000] bg-white pointer-events-none"
            />

            {/* Left curtain */}
            <motion.div
              key="curtain-left"
              initial={{ x: "0%" }}
              animate={{ x: phase === "split" ? "-100%" : "0%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="fixed top-0 left-0 w-1/2 h-full z-[10001] bg-black"
            >
              <div className="absolute inset-0 flex items-center justify-end pr-2">
                <span className="font-serif italic text-white/10 text-[20vw] leading-none select-none">A</span>
              </div>
            </motion.div>

            {/* Right curtain */}
            <motion.div
              key="curtain-right"
              initial={{ x: "0%" }}
              animate={{ x: phase === "split" ? "100%" : "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="fixed top-0 right-0 w-1/2 h-full z-[10001] bg-black"
            >
              <div className="absolute inset-0 flex items-center justify-start pl-2">
                <span className="font-serif italic text-white/10 text-[20vw] leading-none select-none">C</span>
              </div>
            </motion.div>

            {/* Center line accent */}
            <motion.div
              key="center-line"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: phase === "flash" ? 1 : 0 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed top-0 left-1/2 -translate-x-1/2 w-[2px] h-full z-[10002] bg-[var(--dada-red)] origin-center"
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
