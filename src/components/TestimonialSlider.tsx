"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote:
      "I didn\u2019t just find a dress. I found a piece of art that was made for me. Nothing I\u2019ve ever worn has made me feel like this.",
    author: "Morgan Ermington",
  },
  {
    quote:
      "Gabrielle and Charmaigne understood my vision before I could even articulate it. The gown they created was beyond anything I imagined.",
    author: "Sophie Harrington",
  },
  {
    quote:
      "Walking into Art Couture feels like stepping into a gallery where you are the masterpiece. Every detail is considered, every stitch intentional.",
    author: "Elena Vasquez",
  },
];

const AUTOPLAY_INTERVAL = 6000;
const PAUSE_DURATION = 10000;

const slideVariants = {
  enter: { opacity: 0, y: 24 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

export function TestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setActiveIndex(index);
      setIsPaused(true);

      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }

      pauseTimerRef.current = setTimeout(() => {
        setIsPaused(false);
      }, PAUSE_DURATION);
    },
    [activeIndex]
  );

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }
    };
  }, []);

  return (
    <section className="py-40 bg-[var(--background)] border-y border-[var(--border-light)] overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="text-6xl text-[var(--dada-red)] font-serif leading-none block mb-6">
          &ldquo;
        </span>

        <div className="relative min-h-[200px] md:min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <p className="text-2xl md:text-4xl font-serif text-[var(--text-main)] italic leading-relaxed mb-8">
                {testimonials[activeIndex].quote}
              </p>
              <div className="flex flex-col items-center">
                <span className="font-mono text-xs tracking-widest uppercase text-[var(--text-muted)]">
                  &mdash; {testimonials[activeIndex].author}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-3 mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className="group relative p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dada-red)] rounded-full"
            >
              <motion.span
                className="block w-2.5 h-2.5 rounded-full border border-[var(--dada-red)]"
                animate={{
                  backgroundColor:
                    index === activeIndex ? "var(--dada-red)" : "transparent",
                  scale: index === activeIndex ? 1 : 0.85,
                }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
