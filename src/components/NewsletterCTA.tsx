"use client";
import React from "react";
import { motion } from "framer-motion";
import { PulsatingCTA } from "./PulsatingCTA";

export function NewsletterCTA() {
  return (
    <section className="py-32 bg-[var(--background)] border-t border-[var(--border-light)]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          className="border border-[var(--border-light)] p-12 md:p-24 rounded-sm relative overflow-hidden shadow-sm"
        >
          {/* Subtle background accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[var(--dada-red-glow)] opacity-10 pointer-events-none" />
          
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 relative z-10">
            Sign up for latest releases<span className="text-[var(--dada-red)]">.</span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-muted)] font-serif italic mb-12 relative z-10 max-w-2xl mx-auto">
            “Art is something that makes you breathe with a different kind of happiness.”<br/>
            <span className="text-sm not-italic font-mono uppercase tracking-widest mt-4 block">- Tom Ford</span>
          </p>
          
          <form 
            action="https://formspree.io/f/mnjyyqan" 
            method="POST" 
            className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto"
          >
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email" 
              required 
              className="w-full sm:w-auto flex-1 bg-transparent border border-[var(--border-light)] px-6 py-3 font-mono text-xs uppercase tracking-widest text-[var(--text-main)] focus:outline-none focus:border-[var(--dada-red)] transition-colors placeholder:text-[var(--text-muted)] rounded-none"
            />
            <PulsatingCTA text="Join Us" type="submit" className="w-full sm:w-auto whitespace-nowrap" />
          </form>
        </motion.div>
      </div>
    </section>
  );
}
