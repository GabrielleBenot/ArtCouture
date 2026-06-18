"use client";

import React from "react";
import { motion } from "framer-motion";
import { Logo } from "./Logo";

const quickLinks = [
  { label: "Collections", href: "#collections" },
  { label: "Our Story", href: "#story" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-[#0a0a0a] relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto py-20 px-6 md:px-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 text-center md:text-left">
          {/* Left Column - Brand */}
          <div className="flex flex-col items-center md:items-start gap-5">
            <Logo className="w-10 h-10 text-white/80" />
            <p className="font-serif italic text-white/60 text-sm leading-relaxed max-w-[260px]">
              Where every thread begins as a brushstroke.
            </p>
            <address className="font-mono text-xs text-white/40 not-italic tracking-wide">
              By Appointment Only
            </address>
          </div>

          {/* Middle Column - Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-4">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={link.href === "#contact" ? (e: React.MouseEvent) => {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent('openContactForm'));
                  } : undefined}
                  className="font-serif text-sm text-white/70 hover:text-[var(--dada-red)] transition-colors duration-300 cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right Column - Social & Email */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6">
              Follow Us
            </h4>
            <div className="flex gap-5 mb-8">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/art_couture_boutique"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/70 hover:text-[var(--dada-red)] transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href="https://www.pinterest.com/artcouturestudio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="text-white/70 hover:text-[var(--dada-red)] transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 12a4 4 0 1 1 8 0c0 2.5-1.5 5-3 6.5" />
                  <path d="M9.5 15.5 8 21" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=100089819151144"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white/70 hover:text-[var(--dada-red)] transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>

            <a
              href="mailto:info@artcouture.studio"
              className="font-mono text-xs tracking-widest text-white/60 uppercase hover:text-[var(--dada-red)] transition-colors duration-300"
            >
              info@artcouture.studio
            </a>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-[10px] text-white/40 text-center uppercase tracking-[0.2em]">
            © 2026 Art Couture. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
