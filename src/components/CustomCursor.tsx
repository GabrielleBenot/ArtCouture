"use client";
import React, { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 28, stiffness: 400, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const moveCursor = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [cursorX, cursorY, isVisible]);

  useEffect(() => {
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);
    if (hasTouch) return;

    window.addEventListener("mousemove", moveCursor);

    const handleEnter = () => setIsVisible(true);
    const handleLeave = () => setIsVisible(false);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, select") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovering(true);
      }
    };
    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, select") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovering(false);
      }
    };

    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [moveCursor]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Hide default cursor on desktop */}
      <style>{`
        @media (pointer: fine) {
          *, *::before, *::after {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Inner dot */}
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        className="fixed top-0 left-0 z-[10010] pointer-events-none"
      >
        <motion.div
          animate={{
            scale: isHovering ? 0 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
          className="w-[7px] h-[7px] -ml-[3.5px] -mt-[3.5px] rounded-full bg-[#0a0a0a] shadow-[0_0_0_1px_rgba(255,255,255,0.5)]"
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="fixed top-0 left-0 z-[10009] pointer-events-none"
      >
        <motion.div
          animate={{
            width: isHovering ? 48 : 28,
            height: isHovering ? 48 : 28,
            marginLeft: isHovering ? -24 : -14,
            marginTop: isHovering ? -24 : -14,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="rounded-full border border-[#0a0a0a]/40 shadow-[0_0_0_1px_rgba(255,255,255,0.3)]"
        />
      </motion.div>
    </>
  );
}
