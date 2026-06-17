"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface CTAProps {
  text: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export function PulsatingCTA({ text, href, onClick, type, className = "" }: CTAProps) {
  const Component = href ? motion.a : motion.button;
  const props = href 
    ? { href, target: "_blank", rel: "noopener noreferrer" } 
    : { onClick, type };

  return (
    <Component
      {...props}
      className={className}
      animate={{
        boxShadow: [
          '0 0 4px rgba(255, 89, 0, 0.2), inset 0 0 0px rgba(255, 89, 0, 0)',
          '0 0 16px rgba(255, 89, 0, 0.4), inset 0 0 4px rgba(255, 89, 0, 0.1)',
          '0 0 4px rgba(255, 89, 0, 0.2), inset 0 0 0px rgba(255, 89, 0, 0)'
        ],
        scale: [1, 1.02, 1]
      }}
      transition={{
        repeat: Infinity,
        duration: 2.2,
        ease: 'easeInOut'
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        fontSize: '0.75rem',
        letterSpacing: '0.2em',
        color: '#ffffff',
        textDecoration: 'none',
        border: '1px solid var(--dada-red)',
        padding: '0.6rem 1.4rem',
        backgroundColor: 'var(--dada-red)',
        transition: 'background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease',
        textTransform: 'uppercase',
        fontWeight: 'bold',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = 'var(--dada-red)';
        e.currentTarget.style.borderColor = 'var(--dada-red)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--dada-red)';
        e.currentTarget.style.color = '#ffffff';
        e.currentTarget.style.borderColor = 'var(--dada-red)';
      }}
    >
      {text}
    </Component>
  );
}
