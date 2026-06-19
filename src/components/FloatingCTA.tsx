"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let delayTimer: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      const scrolled = window.scrollY > 500;

      if (scrolled && !delayTimer) {
        delayTimer = setTimeout(() => {
          setVisible(true);
        }, 3000);
      }

      if (!scrolled) {
        if (delayTimer) {
          clearTimeout(delayTimer);
          delayTimer = null;
        }
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (delayTimer) clearTimeout(delayTimer);
    };
  }, []);

  const handleClick = () => {
    const target = document.getElementById("bespoke");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          className="fixed bottom-8 left-8 z-40 flex items-center gap-2"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          {/* Pulsing ring */}
          <div className="absolute inset-0 -m-1 rounded-full animate-[ctaPulse_2s_ease-in-out_infinite] pointer-events-none" />

          <button
            onClick={handleClick}
            className="
              relative flex items-center gap-2.5
              px-6 py-3 rounded-full
              bg-gradient-to-r from-[#c8a55c] to-[#a8893a]
              text-white font-mono uppercase text-[10px] tracking-[0.3em]
              shadow-lg shadow-[#c8a55c]/20
              hover:shadow-xl hover:shadow-[#c8a55c]/30
              hover:scale-105
              transition-all duration-300 ease-out
              cursor-pointer
            "
            aria-label="Book Your Appointment"
          >
            {/* Diamond / gem icon */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M12 2L2 9L12 22L22 9L12 2Z"
                fill="currentColor"
                opacity="0.9"
              />
              <path
                d="M2 9H22M12 2L8 9L12 22L16 9L12 2Z"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.5"
              />
            </svg>

            <span>Book Your Appointment</span>
          </button>

          {/* Dismiss button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDismissed(true);
            }}
            className="
              relative flex items-center justify-center
              w-6 h-6 rounded-full
              bg-neutral-900/70 backdrop-blur-sm
              text-white/60 hover:text-white
              hover:bg-neutral-800
              transition-colors duration-200
              cursor-pointer
              -ml-1
            "
            aria-label="Dismiss"
          >
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L7 7M7 1L1 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Inline keyframes for pulsing glow */}
          <style>{`
            @keyframes ctaPulse {
              0%, 100% {
                box-shadow: 0 0 0 0 rgba(200, 165, 92, 0.4);
              }
              50% {
                box-shadow: 0 0 0 8px rgba(200, 165, 92, 0);
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
