"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Header() {
  const { scrollY } = useScroll();
  const isScrolled = useTransform(scrollY, [0, 50], [false, true]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return isScrolled.onChange((v) => setScrolled(v));
  }, [isScrolled]);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 flex items-center justify-between px-6 md:px-12 ${
        scrolled ? "h-24 bg-[#fafaf8]/95 backdrop-blur-lg shadow-sm border-b border-black/5" : "h-32 bg-transparent"
      }`}
    >
      <div className="flex-1">
        <button className={`font-mono text-xs uppercase tracking-widest hover:text-[var(--dada-red)] transition-colors text-black`}>
          Boutique
        </button>
      </div>

      <div className="flex-1 flex justify-center">
        <h1 className="text-2xl md:text-3xl font-serif text-black font-medium tracking-tight">
          Art Couture
        </h1>
      </div>

      <div className="flex-1 flex justify-end">
        <button className={`font-mono text-xs uppercase tracking-widest hover:text-[var(--dada-red)] transition-colors text-black`}>
          Menu
        </button>
      </div>
    </motion.header>
  );
}
