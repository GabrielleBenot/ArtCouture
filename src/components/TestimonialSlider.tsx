"use client";
import React from "react";
import { motion } from "framer-motion";

export function TestimonialSlider() {
  return (
    <section className="py-24 bg-[var(--background)] border-t border-[var(--border-light)]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          <span className="text-6xl text-[var(--dada-red)] font-serif leading-none block mb-6">“</span>
          <p className="text-2xl md:text-4xl font-serif text-[var(--text-main)] italic leading-relaxed mb-8">
            Art Couture has given me the opportunity to find stylish and creative designs that I never thought existed.
          </p>
          <div className="flex flex-col items-center">
            <span className="font-mono text-xs tracking-widest uppercase text-[var(--text-muted)]">— Morgan Ermington</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
