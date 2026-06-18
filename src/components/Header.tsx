"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Logo } from "./Logo";

const navLinks = [
  { label: "Shop Boutique", href: "#boutique" },
  { label: "Collections", href: "#collections" },
  { label: "News & Events", href: "#news" },
  { label: "Our Story", href: "#story" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 } },
};

const linkContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const linkItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay: 0.55 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-6 h-5 flex flex-col justify-between">
      <motion.span
        className="block h-[1.5px] w-full bg-current origin-center"
        animate={open ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="block h-[1.5px] w-full bg-current origin-center"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-[1.5px] w-full bg-current origin-center"
        animate={open ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function InstagramIcon() {
  return (
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
  );
}

function PinterestIcon() {
  return (
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
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.08 2.46 7.58 5.97 9.12-.08-.72-.16-1.83.03-2.62.17-.71 1.12-4.74 1.12-4.74s-.29-.57-.29-1.41c0-1.32.77-2.31 1.73-2.31.81 0 1.21.61 1.21 1.34 0 .82-.52 2.04-.79 3.17-.22.95.47 1.72 1.41 1.72 1.69 0 2.99-1.78 2.99-4.36 0-2.28-1.64-3.87-3.97-3.87-2.71 0-4.3 2.03-4.3 4.13 0 .82.31 1.69.71 2.17.08.09.09.17.07.27-.07.3-.24.95-.27 1.08-.04.18-.15.22-.34.13-1.25-.58-2.03-2.42-2.03-3.89 0-3.16 2.3-6.07 6.63-6.07 3.48 0 6.19 2.48 6.19 5.79 0 3.46-2.18 6.24-5.2 6.24-1.02 0-1.97-.53-2.3-1.15l-.62 2.38c-.23.87-.84 1.96-1.25 2.62.94.29 1.94.45 2.97.45 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
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
  );
}

export function Header() {
  const { scrollY } = useScroll();
  const isScrolled = useTransform(scrollY, [0, 50], [false, true]);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    return isScrolled.on("change", (v: boolean) => setScrolled(v));
  }, [isScrolled]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setShowContactForm(false);
      setFormSent(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLinkClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const handleContactClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setShowContactForm(true);
  }, []);

  const handleFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const subject = encodeURIComponent(`Art Couture Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:info@artcouture.studio?subject=${subject}&body=${body}`;
    setFormSent(true);
    setTimeout(() => { setMenuOpen(false); }, 2000);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
          scrolled
            ? "py-4 bg-black/90 backdrop-blur-md text-white border-b border-white/10"
            : "py-6 mix-blend-difference text-white"
        }`}
      >
        <div className="flex-1 hidden md:block">
          <a
            href="#boutique"
            className="font-mono text-xs uppercase tracking-[0.2em] hover:text-[var(--dada-red)] transition-colors text-white"
          >
            Shop Boutique
          </a>
        </div>

        <div className="flex-1 flex justify-start md:justify-center text-white">
          <Logo className="h-[2.3rem] md:h-8 w-auto" />
        </div>

        <div className="flex-1 hidden md:flex justify-end items-center gap-8">
          <a
            href="#collections"
            className="font-mono text-xs uppercase tracking-[0.2em] hover:text-[var(--dada-red)] transition-colors text-white"
          >
            Collections
          </a>
          <a
            href="#story"
            className="font-mono text-xs uppercase tracking-[0.2em] hover:text-[var(--dada-red)] transition-colors text-white hidden md:block"
          >
            Our Story
          </a>
          <a
            href="#faq"
            className="font-mono text-xs uppercase tracking-[0.2em] hover:text-[var(--dada-red)] transition-colors text-white hidden lg:block"
          >
            FAQ
          </a>
          <a
            href="#contact"
            className="font-mono text-xs uppercase tracking-[0.2em] hover:text-[var(--dada-red)] transition-colors text-white"
          >
            Contact
          </a>
        </div>

        <div className="flex-1 flex justify-end md:hidden">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="relative z-[60] text-white p-1"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-[55] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center text-white"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-white p-2 z-[60]"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <AnimatePresence mode="wait">
              {!showContactForm ? (
                <motion.nav
                  key="nav-links"
                  className="flex flex-col items-center gap-6"
                  variants={linkContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {navLinks.map((link) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={link.href === "#contact" ? handleContactClick : handleLinkClick}
                      className="font-serif font-thin text-2xl sm:text-3xl tracking-[0.15em] uppercase hover:text-[var(--dada-red)] transition-colors duration-300"
                      variants={linkItemVariants}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </motion.nav>
              ) : (
                <motion.div
                  key="contact-form"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full max-w-sm px-8"
                >
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12" />
                      <polyline points="12 19 5 12 12 5" />
                    </svg>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Back</span>
                  </button>

                  {!formSent ? (
                    <>
                      <h3 className="font-serif font-thin text-2xl tracking-[0.1em] uppercase mb-2">Get in Touch</h3>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-8">We would love to hear from you</p>
                      <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                        <input name="name" type="text" required placeholder="Your Name" className="bg-transparent border-b border-white/20 focus:border-[var(--dada-red)] pb-3 font-mono text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-300" />
                        <input name="email" type="email" required placeholder="Email Address" className="bg-transparent border-b border-white/20 focus:border-[var(--dada-red)] pb-3 font-mono text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-300" />
                        <textarea name="message" required rows={4} placeholder="Your Message" className="bg-transparent border-b border-white/20 focus:border-[var(--dada-red)] pb-3 font-mono text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-300 resize-none" />
                        <button type="submit" className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-white/80 hover:text-white border border-white/20 hover:border-[var(--dada-red)] py-3 px-8 transition-all duration-300">Send Message</button>
                      </form>
                    </>
                  ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                      <span className="text-4xl mb-4 block">&#10003;</span>
                      <h3 className="font-serif font-thin text-2xl tracking-[0.1em] uppercase mb-2">Thank You</h3>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Your email client will open shortly</p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="absolute bottom-12 flex flex-col items-center gap-6"
              variants={footerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex items-center gap-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[var(--dada-red)] transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[var(--dada-red)] transition-colors duration-300"
                  aria-label="Pinterest"
                >
                  <PinterestIcon />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[var(--dada-red)] transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
