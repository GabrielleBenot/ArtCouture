"use client";
import React from 'react';
import { motion } from 'framer-motion';

export function TheaterLoader() {
  return (
    <motion.div
      initial={{ display: 'flex' }}
      animate={{ display: 'none', transition: { delay: 2 } }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        pointerEvents: 'none',
        flexDirection: 'column'
      }}
    >
      {/* Top Door */}
      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: '-50vh' }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.6 }}
        style={{ flex: 1, backgroundColor: '#fafaf8', borderBottom: '1px solid rgba(0,0,0,0.05)' }} 
      />
      {/* Expanding Horizon Line */}
      <motion.div 
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ scaleX: { duration: 0.8, ease: 'easeInOut' }, opacity: { duration: 0.1, delay: 0.8 } }}
        style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', backgroundColor: 'var(--dada-red)', transformOrigin: 'center' }}
      />
      {/* Bottom Door */}
      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: '50vh' }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.6 }}
        style={{ flex: 1, backgroundColor: '#fafaf8', borderTop: '1px solid rgba(0,0,0,0.05)' }} 
      />
    </motion.div>
  );
}
