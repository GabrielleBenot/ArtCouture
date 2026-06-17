"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Logo } from "./Logo";
export function Header() {
  const { scrollY } = useScroll();
  const isScrolled = useTransform(scrollY, [0, 50], [false, true]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return isScrolled.onChange((v) => setScrolled(v));
  }, [isScrolled]);
  return (
    <header 
      className={`fixed top-0 w-full z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
        scrolled 
          ? "py-4 bg-black/90 backdrop-blur-md text-white border-b border-white/10" 
          : "py-6 mix-blend-difference text-white"
      }`}
    >
      <div className="flex-1">
        <a href="#boutique" className={`font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] hover:text-[var(--dada-red)] transition-colors ${scrolled ? "text-white" : "text-white"}`}>
          Shop Boutique
        </a>
      </div>

      <div className="flex-1 flex justify-center text-white">
        <Logo className="h-12 w-auto" />
      </div>

      <div className="flex-1 flex justify-end items-center gap-4 md:gap-8">
        <a href="#collections" className={`font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] hover:text-[var(--dada-red)] transition-colors text-white hidden sm:block`}>
          Collections
        </a>
        <a href="#story" className={`font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] hover:text-[var(--dada-red)] transition-colors text-white hidden md:block`}>
          Our Story
        </a>
        <a href="#faq" className={`font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] hover:text-[var(--dada-red)] transition-colors text-white hidden lg:block`}>
          FAQ
        </a>
        <a href="#contact" className={`font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] hover:text-[var(--dada-red)] transition-colors text-white`}>
          Contact
        </a>
      </div>
    </header>
  );
}
