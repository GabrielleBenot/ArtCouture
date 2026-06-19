"use client";
import React from "react";
import { motion } from "framer-motion";

/**
 * SilkShimmerDivider
 * A 1px horizontal line with a gold shimmer gliding across it,
 * like light catching silk fabric.
 */
export function SilkShimmerDivider() {
  return (
    <div className="py-8 md:py-12 mx-auto w-full flex justify-center">
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full max-w-xl relative"
        style={{ originX: 0.5 }}
      >
        {/* Base line */}
        <div
          className="h-[1px] w-full"
          style={{ backgroundColor: "rgba(0,0,0,0.06)" }}
        />
        {/* Shimmer overlay */}
        <div
          className="absolute inset-0 h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, transparent 30%, #c8a55c 50%, transparent 70%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "silkShimmer 3s ease-in-out infinite",
          }}
        />
        {/* Soft glow */}
        <div
          className="absolute inset-0 h-[3px] -top-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, transparent 30%, rgba(200,165,92,0.3) 50%, transparent 70%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "silkShimmer 3s ease-in-out infinite",
            filter: "blur(2px)",
          }}
        />
        <style>{`
          @keyframes silkShimmer {
            0% { background-position: 200% center; }
            100% { background-position: -200% center; }
          }
        `}</style>
      </motion.div>
    </div>
  );
}

/**
 * LaceDivider
 * A decorative SVG divider with an interlocking lace/filigree pattern.
 * Subtle, centered, with a slow scale-in entrance animation.
 */
export function LaceDivider() {
  return (
    <div className="py-8 md:py-12 mx-auto w-full flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 0.15, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="max-w-[200px] w-full"
      >
        <svg
          viewBox="0 0 200 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          aria-hidden="true"
        >
          {/* Interlocking loops / filigree pattern */}
          <path
            d="M0 12 C8 4, 16 4, 20 12 S32 20, 40 12 S52 4, 60 12 S72 20, 80 12 S92 4, 100 12 S112 20, 120 12 S132 4, 140 12 S152 20, 160 12 S172 4, 180 12 S192 20, 200 12"
            stroke="currentColor"
            strokeWidth="0.8"
            className="text-[var(--text-main)]"
          />
          {/* Mirror pattern for lace depth */}
          <path
            d="M0 12 C8 20, 16 20, 20 12 S32 4, 40 12 S52 20, 60 12 S72 4, 80 12 S92 20, 100 12 S112 4, 120 12 S132 20, 140 12 S152 4, 160 12 S172 20, 180 12 S192 4, 200 12"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-[var(--text-main)]"
          />
          {/* Small decorative dots at intersections */}
          {[20, 60, 100, 140, 180].map((cx) => (
            <circle
              key={cx}
              cx={cx}
              cy={12}
              r="1.2"
              fill="currentColor"
              className="text-[var(--text-main)]"
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}

/**
 * EmbroideryDotsDivider
 * A row of tiny dots that fade in sequentially with staggered animation,
 * like hand-stitched embroidery marks.
 */
export function EmbroideryDotsDivider() {
  const dotCount = 7;
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const dotVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 0.3,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <div className="py-8 md:py-12 mx-auto w-full flex justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex items-center gap-3"
      >
        {Array.from({ length: dotCount }).map((_, i) => (
          <motion.span
            key={i}
            variants={dotVariants}
            className="block w-[2px] h-[2px] rounded-full"
            style={{ backgroundColor: "var(--dada-red)" }}
          />
        ))}
      </motion.div>
    </div>
  );
}
