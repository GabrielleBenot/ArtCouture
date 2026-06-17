"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PulsatingCTA } from "./PulsatingCTA";

export function NewsletterCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            &ldquo;We don&apos;t follow trends. We paint them.&rdquo;<br/>
            <span className="text-sm not-italic font-mono uppercase tracking-widest mt-4 block">- Gabi et Char</span>
          </p>
          
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 py-4"
              >
                <p className="font-serif italic text-xl text-[var(--text-main)] mb-2">Thank you. You are now part of the Art Couture world.</p>
                <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">We will keep you close to the canvas.</p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  const formData = new FormData(e.currentTarget);
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
                }}
                className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto"
              >
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Enter your email" 
                  required 
                  className="w-full sm:w-auto flex-1 bg-transparent border border-[var(--border-light)] px-6 py-3 font-mono text-xs uppercase tracking-widest text-[var(--text-main)] focus:outline-none focus:border-[var(--dada-red)] transition-colors placeholder:text-[var(--text-muted)] rounded-none"
                />
                <PulsatingCTA text={isSubmitting ? "Joining..." : "Join Us"} type="submit" className="w-full sm:w-auto whitespace-nowrap" />
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
