"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is the investment?",
    answer: "Each Art Couture piece is priced according to its complexity, the rarity of its materials, and the hours of handwork involved. Bespoke gowns typically range from $3,000 to $12,000. We welcome the opportunity to discuss your vision and provide a detailed quote during a private consultation."
  },
  {
    question: "Who wears Art Couture?",
    answer: "Women who see clothing as more than fashion. They see it as self-expression. Our clients are collectors, creatives, and women who desire something truly singular. If you have ever wanted to wear a work of art, this is your atelier."
  },
  {
    question: "What makes Art Couture different?",
    answer: "Every gown starts as a painting. Gabrielle Benot creates the original artwork, and Charmaigne Menn translates its colors, textures, and patterns directly into bespoke fabrics with the precision of a master couturière. No other couture house works this way. The art is not inspired by fashion. The fashion is the art."
  }
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 bg-[var(--background)] border-t border-[var(--border-light)] overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03] grayscale mix-blend-multiply pointer-events-none flex items-center justify-center">
        <img src="/images/sketches/model.png" alt="" loading="lazy" className="w-full h-full object-cover md:object-contain scale-150 md:scale-125" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] text-center mb-16">Questions?</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border-b border-[var(--border-light)] pb-4"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center py-4 text-left focus:outline-none group cursor-pointer"
              >
                <span className="text-xl font-serif text-[var(--text-main)] group-hover:text-[var(--dada-red)] transition-colors">
                  {faq.question}
                </span>
                <span className="text-[var(--dada-red)] text-2xl font-light">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pt-2 pb-6 text-lg text-[var(--text-muted)] font-serif leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
