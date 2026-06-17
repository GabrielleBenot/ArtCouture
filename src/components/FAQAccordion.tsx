"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How much does it cost?",
    answer: "The cost of our custom fashion and art designs varies depending on the complexity and size of the design, as well as the materials and techniques used. On average, our designs range from $$ to $$$$, but we can provide a more accurate quote after discussing the specific needs and preferences of each customer. Additionally, we offer flexible payment options and payment plans to make our services accessible to everyone."
  },
  {
    question: "Who is this for?",
    answer: "Our custom Fashion and Art designs are for individuals who value creativity, individuality and self-expression. We cater to people who want to stand out with unique and personalized clothing, Art and accessories. Whether you're a fashion lover, an artist or just looking to add a touch of originality to your wardrobe or home, Art Couture is the perfect place for you."
  },
  {
    question: "What makes this different?",
    answer: "Our custom fashion and Art Collab offers unique designs created by talented in-house artists and fashion designers. We personalize each piece to reflect the customer's individual style and use high-quality materials for lasting beauty. Our commitment to exceptional customer service sets us apart."
  }
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 bg-[var(--background)] border-t border-[var(--border-light)] overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03] grayscale mix-blend-multiply pointer-events-none flex items-center justify-center">
        <img src="/images/sketches/model.png" alt="" className="w-full h-full object-cover md:object-contain scale-150 md:scale-125" />
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
