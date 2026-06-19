"use client";
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { IntroLoader } from "@/components/IntroLoader";
import { CinematicHero } from "@/components/CinematicHero";
import { ScrollQuote } from "@/components/ScrollQuote";
import { CatwalkVideo } from "@/components/CatwalkVideo";
import { EditorialCollection, ServicesGrid } from "@/components/EditorialCollection";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { StorySection } from "@/components/StorySection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { MagneticButton } from "@/components/MagneticButton";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { TheEdgeCampaign } from "@/components/TheEdgeCampaign";
import { NewsEvents } from "@/components/NewsEvents";
import { Footer } from "@/components/Footer";
import { BespokeForm } from "@/components/BespokeForm";
import { BackToTop } from "@/components/BackToTop";


import { motion, AnimatePresence } from "framer-motion";

import { useRef } from "react";
import { useScroll, useTransform, useInView } from "framer-motion";

// Parallax Image Component for sections
function ParallaxImage({ src, alt, blend, className, revealColor, staticImage, priority }: { src: string, alt: string, blend?: boolean, className?: string, revealColor?: boolean, staticImage?: boolean, priority?: boolean }) {
  // All hooks must be called unconditionally at top level
  const ref = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(curtainRef, { once: true, margin: "-15% 0px -15% 0px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 0.98]);
  const filterValue = useTransform(scrollYProgress, [0.2, 0.45], [1, 0]);
  const filter = useTransform(filterValue, (v: number) => `grayscale(${v})`);

  if (blend) {
    return (
      <div className="w-full flex justify-center">
        {/* Fully static cropped half-circle, no parallax, no perspective */}
        <div className="w-full flex justify-center" style={{ clipPath: 'inset(0 0 50.5% 0)' }}>
          <div className="max-w-full md:max-w-[75%] max-h-[85vh] aspect-square rounded-full overflow-hidden bg-[var(--background)] mx-auto" style={{ filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.18)) drop-shadow(0 12px 24px rgba(0,0,0,0.12))' }}>
            <img 
              src={src} 
              alt={alt} 
              loading="lazy"
              className="w-full h-full object-contain scale-[0.94] mix-blend-multiply"
            />
          </div>
        </div>
      </div>
    );
  }

  if (staticImage) {
    return (
      <>
        {/* Desktop: simple static image */}
        <div className="hidden md:flex w-full relative justify-center items-center">
          <img 
            src={src} 
            alt={alt} 
            loading="eager"
            fetchPriority="high"
            className={`max-w-full md:max-w-[85%] w-auto h-auto object-contain mx-auto mix-blend-multiply ${className || ''}`}
          />
        </div>

        {/* Mobile: Split-panel curtain reveal */}
        <div 
          ref={curtainRef}
          className="md:hidden w-full relative overflow-hidden bg-[var(--background)]"
        >
          {/* The image behind the curtains */}
          <motion.div
            initial={{ scale: 1.04 }}
            animate={isInView ? { scale: 1 } : { scale: 1.04 }}
            transition={{ duration: 1.4, ease: [0.33, 1, 0.68, 1] }}
          >
            <img 
              src={src} 
              alt={alt} 
              loading="eager"
              fetchPriority="high"
              className={`w-full h-auto object-contain mix-blend-multiply ${className || ''}`}
            />
          </motion.div>

          {/* Left curtain panel */}
          <motion.div
            initial={{ x: "0%" }}
            animate={isInView ? { x: "-101%" } : { x: "0%" }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
            className="absolute inset-y-0 left-0 w-1/2 bg-[var(--background)] backdrop-blur-2xl z-10 flex flex-col items-end justify-center pr-3 border-r border-white/20"
          >
            {/* Editorial accent line */}
            <div className="absolute top-6 right-4 w-[1px] h-12 bg-[var(--dada-red)]/50" />
            <span className="font-mono text-[7px] uppercase tracking-[0.5em] text-black/20 writing-mode-vertical rotate-180" style={{ writingMode: 'vertical-rl' }}>
              Art Couture
            </span>
            {/* Corner bracket */}
            <div className="absolute bottom-6 right-4 w-8 h-8 border-b-[0.5px] border-r-[0.5px] border-black/10" />
          </motion.div>

          {/* Right curtain panel */}
          <motion.div
            initial={{ x: "0%" }}
            animate={isInView ? { x: "101%" } : { x: "0%" }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
            className="absolute inset-y-0 right-0 w-1/2 bg-[var(--background)] backdrop-blur-2xl z-10 flex flex-col items-start justify-center pl-3 border-l border-white/20"
          >
            {/* Editorial accent line */}
            <div className="absolute top-6 left-4 w-[1px] h-12 bg-[var(--dada-red)]/50" />
            <span className="font-mono text-[7px] uppercase tracking-[0.5em] text-black/20" style={{ writingMode: 'vertical-rl' }}>
              Atelier
            </span>
            {/* Corner bracket */}
            <div className="absolute bottom-6 left-4 w-8 h-8 border-b-[0.5px] border-l-[0.5px] border-black/10" />
          </motion.div>

          {/* Thin red reveal line at center seam */}
          <motion.div
            initial={{ scaleY: 1, opacity: 1 }}
            animate={isInView ? { scaleY: 0, opacity: 0 } : { scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-[var(--dada-red)]/50 z-20 origin-center"
          />
        </div>
      </>
    );
  }

  return (
    <div ref={ref} className="w-full relative flex justify-center items-center perspective-1000">
      <motion.img 
        style={revealColor ? { y, scale, filter } : { y, scale }} 
        src={src} 
        alt={alt} 
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        className={`max-w-full md:max-w-[85%] w-auto h-auto object-contain rounded-sm mix-blend-multiply mx-auto ${className || ''}`}
      />
    </div>
  );
}

// Scroll-driven grayscale to color reveal for the craft image
function ScrollRevealImage() {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"]
  });
  const grayscaleValue = useTransform(scrollYProgress, [0, 0.55, 0.75], [1, 1, 0]);
  const grayscale = useTransform(grayscaleValue, (v: number) => `grayscale(${v})`);

  return (
    <motion.div
      ref={imgRef}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="md:w-[45%] md:sticky md:top-24 md:self-start"
    >
      <div className="relative overflow-hidden aspect-square">
        <motion.img 
          style={{ filter: grayscale }}
          src="/images/luxury_detail.jpg"
          alt="Art Couture hand-embroidered lace detail close-up"
          loading="lazy"
          className="w-full h-full object-cover transition-colors duration-500"
        />
        <div className="absolute top-4 left-4 w-12 h-12 border-t-[0.5px] border-l-[0.5px] border-[var(--dada-red)]/50 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-[0.5px] border-r-[0.5px] border-[var(--dada-red)]/50 pointer-events-none" />
      </div>
      <span className="block font-mono text-[8px] uppercase tracking-[0.4em] text-[var(--text-muted)] mt-4">Lun&eacute;ville embroidery by hand</span>
    </motion.div>
  );
}

// Layout helper for sections
function FeatureSection({ 
  id,
  title, 
  text, 
  imgSrc, 
  imgAlt = "Art Couture Gallery",
  reverse = false,
  subtitle,
  blendImage = false,
  staticImage = false,
  imageClassName = "flex-[1.2] w-full",
  textClassName = "flex-1 space-y-6",
  revealColor = false,
  imgClassName,
  priority = false
}: { 
  id?: string,
  title?: React.ReactNode, 
  text?: React.ReactNode, 
  imgSrc: string, 
  imgAlt?: string,
  reverse?: boolean,
  subtitle?: string,
  blendImage?: boolean,
  staticImage?: boolean,
  imageClassName?: string,
  textClassName?: string,
  revealColor?: boolean,
  imgClassName?: string,
  priority?: boolean
}) {
  return (
    <section id={id} className="py-16 md:py-24 px-6 max-w-[90rem] mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
      {!reverse ? (
        <>
          <div className={`${textClassName} lg:pr-12`}>
            {subtitle && (
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="block font-serif italic text-sm uppercase tracking-[0.2em] text-[var(--dada-red)]"
              >
                {subtitle}
              </motion.span>
            )}
            {title && (
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1 }}
                className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-extralight text-[var(--text-main)] leading-[0.75] tracking-tight"
              >
                {title}
              </motion.h2>
            )}
            {text && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-xs md:text-sm text-[var(--text-muted)] font-mono uppercase tracking-[0.15em] leading-[1.8]"
              >
                {text}
              </motion.div>
            )}
          </div>
          <div className={imageClassName}>
            <ParallaxImage src={imgSrc} alt={imgAlt} blend={blendImage} staticImage={staticImage} revealColor={revealColor} className={imgClassName} priority={priority} />
          </div>
        </>
      ) : (
        <>
          <div className={`${imageClassName} order-2 md:order-1`}>
            <ParallaxImage src={imgSrc} alt={imgAlt} blend={blendImage} staticImage={staticImage} revealColor={revealColor} className={imgClassName} priority={priority} />
          </div>
          <div className={`${textClassName} lg:pl-12 order-1 md:order-2`}>
            {subtitle && (
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="block font-serif italic text-sm uppercase tracking-[0.2em] text-[var(--dada-red)]"
              >
                {subtitle}
              </motion.span>
            )}
            {title && (
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1 }}
                className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-extralight text-[var(--text-main)] leading-[0.75] tracking-tight"
              >
                {title}
              </motion.h2>
            )}
            {text && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-xs md:text-sm text-[var(--text-muted)] font-mono uppercase tracking-[0.15em] leading-[1.8]"
              >
                {text}
              </motion.div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

function BespokeCTA() {
  const [bespokeOpen, setBespokeOpen] = React.useState(false);
  return (
    <>
      <button
        onClick={() => setBespokeOpen(true)}
        className="group inline-flex items-center gap-5 animate-[subtlePulse_3s_ease-in-out_infinite]"
      >
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/30 group-hover:text-[var(--dada-red)] transition-colors duration-300">Share Your Vision</span>
        <span className="relative w-12 h-[1px] bg-white/15 group-hover:bg-[var(--dada-red)] transition-all duration-500 overflow-hidden">
          <span className="absolute inset-0 bg-[var(--dada-red)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
        </span>
      </button>
      <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/20 mt-6">
        Tell us your vision. We respond within 24 hours.
      </p>
      <BespokeForm isOpen={bespokeOpen} onClose={() => setBespokeOpen(false)} />
    </>
  );
}

function PhotoCarousel({ openLightbox }: { openLightbox: (src: string, gallery?: string[]) => void }) {
  const photos = [
    { src: "/images/masterpieces.jpg", label: "Editorial Session" },
    { src: "/images/rentals.jpg", label: "Couture Rental" },
    { src: "/images/process/painting.jpg", label: "Coming Soon" },
    { src: "/images/process/draping.jpg", label: "Coming Soon" },
  ];
  const [activePhoto, setActivePhoto] = React.useState(0);
  const touchStart = React.useRef<number | null>(null);
  const mouseStart = React.useRef<number | null>(null);
  const isDragging = React.useRef(false);
  const parallaxRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1]);

  React.useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // Touch events (mobile)
  const handleTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activePhoto < photos.length - 1) setActivePhoto(activePhoto + 1);
      if (diff < 0 && activePhoto > 0) setActivePhoto(activePhoto - 1);
    }
    touchStart.current = null;
  };

  // Mouse events (desktop drag)
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStart.current = e.clientX;
    isDragging.current = false;
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (mouseStart.current !== null && Math.abs(e.clientX - mouseStart.current) > 10) {
      isDragging.current = true;
    }
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (mouseStart.current === null) return;
    const diff = mouseStart.current - e.clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activePhoto < photos.length - 1) setActivePhoto(activePhoto + 1);
      if (diff < 0 && activePhoto > 0) setActivePhoto(activePhoto - 1);
    }
    mouseStart.current = null;
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isVisible) return;
      if (e.key === 'ArrowRight' && activePhoto < photos.length - 1) {
        setActivePhoto(activePhoto + 1);
      } else if (e.key === 'ArrowLeft' && activePhoto > 0) {
        setActivePhoto(activePhoto - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto, photos.length]);

  return (
    <div className="max-w-4xl mx-auto" ref={(el) => { parallaxRef.current = el; containerRef.current = el; }}>
      <motion.div
        key={activePhoto}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full aspect-[4/5] md:aspect-[4/3] overflow-hidden rounded-sm mb-6 select-none md:max-h-[85vh] cursor-pointer group"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <motion.img
          src={photos[activePhoto].src}
          alt={`Art Couture ${photos[activePhoto].label}`}
          className="w-full h-full object-cover pointer-events-none"
          style={{ y: imgY, scale: imgScale }}
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {/* Swipe hint on first photo (mobile only) */}
        {activePhoto === 0 && isTouchDevice && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: 3 }}
            className="absolute top-1/2 right-6 -translate-y-1/2 flex items-center gap-2 z-20 pointer-events-none"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">Swipe</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/70">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.div>
        )}
        {/* Full-coverage click zones */}
        {activePhoto === 0 ? (
          <button onClick={() => setActivePhoto(1)} className="absolute inset-0 z-10 cursor-e-resize" aria-label="Next photo" />
        ) : activePhoto === photos.length - 1 ? (
          <button onClick={() => setActivePhoto(activePhoto - 1)} className="absolute inset-0 z-10 cursor-w-resize" aria-label="Previous photo" />
        ) : (
          <>
            <button onClick={() => setActivePhoto(activePhoto - 1)} className="absolute left-0 top-0 w-1/2 h-full z-10 cursor-w-resize" aria-label="Previous photo" />
            <button onClick={() => setActivePhoto(activePhoto + 1)} className="absolute right-0 top-0 w-1/2 h-full z-10 cursor-e-resize" aria-label="Next photo" />
          </>
        )}
        {/* Expand button - opens lightbox */}
        <button 
          onClick={() => openLightbox(photos[activePhoto].src, photos.map(p => p.src))}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/60"
          aria-label="View full image"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </button>
        <span className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/80 z-20 pointer-events-none">
          {photos[activePhoto].label}
        </span>
        <span className="absolute bottom-6 right-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 z-20 pointer-events-none">
          {activePhoto + 1} / {photos.length}
        </span>
      </motion.div>

      {/* Navigation Dots + Label */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setActivePhoto(i)}
              className={`rounded-full transition-all duration-500 ${i === activePhoto ? 'w-3 h-3 bg-[var(--dada-red)]' : 'w-1.5 h-1.5 bg-[var(--text-muted)]/30 hover:bg-[var(--text-muted)]'}`}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>
        <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-[var(--text-muted)]">{isTouchDevice ? 'Swipe to explore' : 'Click to explore'}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxGallery, setLightboxGallery] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loupeOpen, setLoupeOpen] = useState(false);
  const lightboxTouchStart = React.useRef<number | null>(null);

  // Open lightbox with gallery context
  const openLightbox = (src: string, gallery?: string[]) => {
    setLightboxSrc(src);
    setLightboxGallery(gallery || []);
  };

  // Navigate within lightbox
  const lightboxNext = () => {
    if (lightboxGallery.length === 0 || !lightboxSrc) return;
    const idx = lightboxGallery.indexOf(lightboxSrc);
    if (idx < lightboxGallery.length - 1) setLightboxSrc(lightboxGallery[idx + 1]);
  };
  const lightboxPrev = () => {
    if (lightboxGallery.length === 0 || !lightboxSrc) return;
    const idx = lightboxGallery.indexOf(lightboxSrc);
    if (idx > 0) setLightboxSrc(lightboxGallery[idx - 1]);
  };
  const lightboxIdx = lightboxGallery.indexOf(lightboxSrc || '');

  // Pair metadata for painting-dress lightbox
  const isPairView = lightboxGallery.length === 2;
  const isYellowReverie = isPairView && lightboxGallery[0].includes('brunette_yellow');
  const pairTitle = isYellowReverie ? '\u201cYellow Reverie\u201d' : '\u201cColor Blind\u201d';
  const pairCategory = isYellowReverie ? 'Gala Evening Gown' : 'Cocktail Dress';
  const pairDescription = isYellowReverie
    ? 'Structured silk faille in golden saffron with a hand-embroidered obi sash in burgundy dupioni, jet beadwork, and brocade patchwork detailing.'
    : 'Hand-dyed lurex fringe on sheer nude chiffon with polished gold chain hardware, crystal waist detailing, and Swarovski-threaded strands.';
  const pairMedium = isYellowReverie ? 'Mixed media on canvas' : 'Oil and mixed media on canvas';

  return (
    <main className="min-h-screen bg-[var(--background)] selection:bg-[var(--dada-red)] selection:text-white overflow-x-hidden">
      <IntroLoader />
      <Header />
      <CinematicHero />
      <ScrollQuote />


      {/* 1. MEET GABI & CHAR - Photo + intro */}
      <section id="boutique" className="pt-40 md:pt-48 pb-36 md:pb-48 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto flex flex-col items-center text-center"
        >
          {/* Circular Photo */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.3)] mb-8 group">
            <div className="absolute inset-0 bg-[var(--dada-red-glow)] mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
            <img 
              src="/images/gabi_char.jpg" 
              alt="Gabrielle Benot and Charmaigne Menn, founders of Art Couture" 
              loading="eager"
              fetchPriority="high"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s]"
            />
          </div>

          {/* Names */}
          <span className="font-serif text-xs md:text-sm tracking-[0.2em] text-[var(--text-muted)] mb-1">Charmaigne Menn &amp; Gabrielle Benot</span>
          <span className="font-serif italic text-sm md:text-base tracking-[0.25em] text-[var(--text-main)] mb-8">Gabi et Char</span>
          <div className="w-12 h-[1px] bg-white/20 mb-14" />

          {/* Headline */}
          <h2 className="flex flex-col items-center mb-8">
            <span className="font-sans font-black text-[3rem] md:text-6xl uppercase tracking-tighter leading-[0.85]">She paints. She sews.</span>
            <span className="font-serif italic font-light text-[3.5rem] md:text-[6rem] lg:text-[8rem] text-[var(--text-main)] -mt-1 md:mt-0 leading-[0.8]">Together, magic.</span>
          </h2>

          {/* Intro text */}
          <p className="text-xs md:text-sm text-[var(--text-muted)] font-mono uppercase tracking-[0.15em] leading-[1.8] max-w-xl">
            An artist trained in the ateliers of Copenhagen. A couturi&egrave;re who has dressed prominent clients across three continents for over 25 years. Together, they create what neither could alone.
          </p>
        </motion.div>
      </section>

      {/* Elegant Separator */}
      <div className="max-w-xs mx-auto pt-4 pb-20">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--border-light)] to-transparent" />
      </div>

      {/* THE ART - Gabrielle's world (consolidated) */}
      <FeatureSection 
        subtitle="The Art"
        title={
          <span className="flex flex-col">
            <span className="font-sans text-sm md:text-sm font-black tracking-[0.3em] uppercase relative z-10">Color is</span>
            <span className="font-serif italic font-light text-[7.9rem] md:text-[10rem] lg:text-[12rem] text-[var(--dada-red)] mt-0 md:-mt-4 leading-[0.8] relative z-0">Power.</span>
            <span className="font-mono text-xs uppercase tracking-[0.4em] mt-2 md:mt-8 text-white/70">Wear it without apology.</span>
          </span>
        }
        text={<p>Gabrielle sees color everywhere, in the light on a wall at golden hour, in the way a scarf falls across someone&apos;s shoulder, in the rust on an old gate. She trained in fashion design at the Scandinavian Academy of Fashion Design in Copenhagen (formerly Margrethe-Skolen) before following her heart to the canvas. But that trained eye for silhouette and texture never left her. It lives in every painting she makes, layers of pigment, mixed media, raw canvas showing through. Her paintings are never just art. They are the blueprints that find their way back into cloth.</p>}
        imgSrc="/images/color_is_power.jpg"
        imgAlt="Art Couture original watercolor painting by Gabrielle Benot"
        imageClassName="flex-[1.44] w-full -ml-4 md:ml-0"
        textClassName="flex-1 space-y-4 md:space-y-6"
        priority
      />

      {/* FROM ART TO COUTURE - Consolidated Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="block font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--text-muted)] mb-4">From Canvas to Couture</span>
          <h3 className="flex flex-col items-center">
            <span className="font-sans font-black text-3xl md:text-5xl uppercase tracking-tight">Explore the Art</span>
            <span className="font-serif font-light text-3xl md:text-5xl">That Inspires</span>
            <span className="font-serif italic font-light text-[3.5rem] md:text-[8rem] text-[var(--dada-red)] leading-[0.85]">Couture</span>
          </h3>
        </motion.div>

        {/* Compact Art-to-Dress Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 mb-16 md:mb-24">
          
          {/* Pair 1: Yellow Reverie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-stretch gap-3">
              <div className="relative group overflow-hidden aspect-square flex-1 cursor-pointer" onClick={() => openLightbox('/images/paintings/brunette_yellow_painting.png', ['/images/paintings/brunette_yellow_painting.png', '/images/paintings/dress_from_painting_hero.jpg'])}>
                <img src="/images/paintings/brunette_yellow_painting.png" alt="Original mixed-media painting by Gabrielle Benot" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                  <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/70">The Painting</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center px-1">
                <div className="flex-1 w-[1px] bg-[var(--dada-red)]/20" />
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--dada-red)] shrink-0 my-1"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                <div className="flex-1 w-[1px] bg-[var(--dada-red)]/20" />
              </div>
              <div className="relative group overflow-hidden aspect-[3/4] flex-1 cursor-pointer" onClick={() => openLightbox('/images/paintings/dress_from_painting_hero.jpg', ['/images/paintings/brunette_yellow_painting.png', '/images/paintings/dress_from_painting_hero.jpg'])}>
                <img src="/images/paintings/dress_from_painting_hero.jpg" alt="Couture gown inspired by the painting" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                  <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/70">The Gown</span>
                </div>
              </div>
            </div>
            <p className="font-serif italic text-sm text-[var(--text-muted)] mt-3">&ldquo;Yellow Reverie&rdquo;</p>
          </motion.div>

          {/* Pair 2: Color Blind */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="flex items-stretch gap-3">
              <div className="relative group overflow-hidden aspect-square flex-1 cursor-pointer" onClick={() => openLightbox('/images/paintings/faces_color_blind.jpg', ['/images/paintings/faces_color_blind.jpg', '/images/paintings/dress_from_colorful_face.png'])}>
                <img src="/images/paintings/faces_color_blind.jpg" alt="Gabrielle Benot abstract portrait with vibrant colors" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                  <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/70">The Painting</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center px-1">
                <div className="flex-1 w-[1px] bg-[var(--dada-red)]/20" />
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--dada-red)] shrink-0 my-1"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                <div className="flex-1 w-[1px] bg-[var(--dada-red)]/20" />
              </div>
              <div className="relative group overflow-hidden aspect-[3/4] flex-1 cursor-pointer" onClick={() => openLightbox('/images/paintings/dress_from_colorful_face.png', ['/images/paintings/faces_color_blind.jpg', '/images/paintings/dress_from_colorful_face.png'])}>
                <img src="/images/paintings/dress_from_colorful_face.png" alt="Flowing evening gown inspired by the abstract portrait" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                  <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/70">The Gown</span>
                </div>
              </div>
            </div>
            <p className="font-serif italic text-sm text-[var(--text-muted)] mt-3">&ldquo;Color Blind&rdquo;</p>
          </motion.div>

        </div>

        {/* CHARMAIGNE MENN - The Couturière */}
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 md:mr-[5%] md:ml-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col md:flex-row items-center gap-12 md:gap-16"
          >
            <div className="flex-1 order-1 md:order-1 space-y-4 md:space-y-6">
              <span className="block font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--text-muted)]">The Couturi&egrave;re</span>
              <h3 className="flex flex-col">
                <span className="font-sans font-black text-3xl md:text-4xl uppercase tracking-tight">Before She Paints,</span>
                <span className="font-serif italic font-light text-[3rem] md:text-[5rem] text-[var(--dada-red)] leading-[0.8]">She Sews.</span>
              </h3>
              <p className="text-xs md:text-sm text-[var(--text-muted)] font-mono uppercase tracking-[0.15em] leading-[1.8] max-w-md">
                Charmaigne Menn learned to cut fabric before she could read a pattern. Growing up in Durban, South Africa, with a mother and grandmother who were artists, she was sketching dresses by the age of eight. Four decades later, that instinct has only sharpened, from building factories in South Africa to fitting gowns on clients across the United States.
              </p>
              <p className="text-xs md:text-sm text-[var(--text-muted)] font-mono uppercase tracking-[0.15em] leading-[1.8] max-w-md">
                She thinks like an architect and works like a sculptor. Every seam has a reason. Every dart shapes the body the way light shapes a room. The women who wear her couture say the same thing: it feels like it was always yours.
              </p>
            </div>
            <div className="flex-1 order-2 md:order-2">
              <ParallaxImage
                src="/images/couture_mannequin.png"
                alt="Haute couture gown by Charmaigne Menn on atelier mannequin"
              />
            </div>
          </motion.div>
        </div>

        {/* Personal Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="max-w-3xl mx-auto text-center px-8 py-16 md:py-24 mb-10"
        >
          <div className="w-8 h-[1px] bg-[var(--dada-red)]/40 mx-auto mb-10" />
          <blockquote className="font-serif italic text-lg md:text-[1.7rem] lg:text-[2rem] text-[var(--text-main)] leading-[1.4] mb-8">
            &ldquo;We create because we can&apos;t not create. The fabric, the color, the form, it all starts with this quiet need to make something beautiful.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-8 bg-[var(--dada-red)]/40" />
            <span className="font-serif italic text-sm tracking-[0.2em] text-[var(--text-muted)]">Gabi &amp; Char</span>
            <div className="h-[1px] w-8 bg-[var(--dada-red)]/40" />
          </div>
        </motion.div>

        {/* Studio Videos - Dark Editorial Spread */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative bg-[#0a0a0a] -mx-6 px-6 py-16 md:py-24 overflow-hidden rounded-sm"
        >
          {/* Oversized background watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <span className="font-sans font-black text-[20vw] md:text-[12vw] uppercase tracking-tighter text-white/[0.02] leading-none select-none whitespace-nowrap">STUDIO</span>
          </div>

          {/* Header */}
          <div className="text-center mb-12 md:mb-16 relative z-10">
            <span className="block font-mono text-[9px] uppercase tracking-[0.4em] text-white/40 mb-4">Behind the Scenes</span>
            <div className="w-8 h-[1px] bg-[var(--dada-red)]/60 mx-auto" />
          </div>

          {/* Staggered video layout */}
          <div className="relative z-10 flex flex-col md:flex-row items-start justify-center gap-8 md:gap-16 max-w-5xl mx-auto">
            
            {/* Gabrielle - offset up */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center w-full md:w-[32%] md:-mt-4"
            >
              <div className="relative w-[64%] md:w-full">
                {/* Viewfinder Elements */}
                {/* Left/Right lines */}
                <div className="absolute top-0 bottom-0 -left-4 w-[1px] bg-gradient-to-b from-transparent via-white/35 to-transparent pointer-events-none" />
                <div className="absolute top-0 bottom-0 -right-4 w-[1px] bg-gradient-to-b from-transparent via-white/35 to-transparent pointer-events-none" />
                
                {/* Left/Right vertical text labels */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-6 [writing-mode:vertical-lr] font-mono text-[6px] tracking-[0.25em] text-white/50 select-none uppercase pointer-events-none">
                  PROCESS // 01
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 -right-6 [writing-mode:vertical-lr] font-mono text-[6px] tracking-[0.25em] text-[var(--dada-red)]/75 select-none uppercase pointer-events-none">
                  CANVAS // SILK
                </div>

                {/* Viewfinder Corner Brackets */}
                <div className="absolute -top-1.5 -left-1.5 w-2 h-2 border-t border-l border-[var(--dada-red)]/75 pointer-events-none" />
                <div className="absolute -top-1.5 -right-1.5 w-2 h-2 border-t border-r border-white/45 pointer-events-none" />
                <div className="absolute -bottom-1.5 -left-1.5 w-2 h-2 border-b border-l border-white/45 pointer-events-none" />
                <div className="absolute -bottom-1.5 -right-1.5 w-2 h-2 border-b border-r border-[var(--dada-red)]/75 pointer-events-none" />

                {/* Video Frame */}
                <div className="relative overflow-hidden aspect-[9/16] w-full rounded-sm shadow-2xl shadow-black/50">
                  <video autoPlay muted loop playsInline preload="metadata" className="w-full h-full object-cover">
                    <source src="/videos/painting_process.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 border border-white/10 rounded-sm pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
                    <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-white/50">The Art</span>
                  </div>
                </div>
              </div>
              <span className="font-serif italic text-sm text-white/60 mt-4">Gabrielle</span>
            </motion.div>

            {/* Center quote - vertical on desktop */}
            <div className="hidden md:flex flex-col items-center justify-center py-12 gap-4">
              <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[var(--dada-red)]/40 to-transparent" />
              <span className="font-mono text-[7px] uppercase tracking-[0.5em] text-white/25 [writing-mode:vertical-lr]">One paints. One sews.</span>
              <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[var(--dada-red)]/40 to-transparent" />
            </div>

            {/* Charmaigne - offset down */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center w-full md:w-[32%] md:mt-16"
            >
              <div className="relative w-[64%] md:w-full">
                {/* Viewfinder Elements */}
                {/* Left/Right lines */}
                <div className="absolute top-0 bottom-0 -left-4 w-[1px] bg-gradient-to-b from-transparent via-white/35 to-transparent pointer-events-none" />
                <div className="absolute top-0 bottom-0 -right-4 w-[1px] bg-gradient-to-b from-transparent via-white/35 to-transparent pointer-events-none" />
                
                {/* Left/Right vertical text labels */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-6 [writing-mode:vertical-lr] font-mono text-[6px] tracking-[0.25em] text-[var(--dada-red)]/75 select-none uppercase pointer-events-none">
                  COUTURE // 02
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 -right-6 [writing-mode:vertical-lr] font-mono text-[6px] tracking-[0.25em] text-white/50 select-none uppercase pointer-events-none">
                  DESIGN // DRAPE
                </div>

                {/* Viewfinder Corner Brackets */}
                <div className="absolute -top-1.5 -left-1.5 w-2 h-2 border-t border-l border-white/45 pointer-events-none" />
                <div className="absolute -top-1.5 -right-1.5 w-2 h-2 border-t border-r border-[var(--dada-red)]/75 pointer-events-none" />
                <div className="absolute -bottom-1.5 -left-1.5 w-2 h-2 border-b border-l border-[var(--dada-red)]/75 pointer-events-none" />
                <div className="absolute -bottom-1.5 -right-1.5 w-2 h-2 border-b border-r border-white/45 pointer-events-none" />

                {/* Video Frame */}
                <div className="relative overflow-hidden aspect-[9/16] w-full rounded-sm shadow-2xl shadow-black/50">
                  <video autoPlay muted loop playsInline preload="metadata" className="w-full h-full object-cover">
                    <source src="/videos/couture_process.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 border border-white/10 rounded-sm pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
                    <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-white/50">The Couture</span>
                  </div>
                </div>
              </div>
              <span className="font-serif italic text-sm text-white/60 mt-4">Charmaigne</span>
            </motion.div>

          </div>

          {/* Bottom quote */}
          <p className="font-serif italic text-lg md:text-xl text-white/50 text-center mt-12 md:mt-16 max-w-lg mx-auto relative z-10">
            &ldquo;One paints the vision. The other brings it to life.&rdquo;
          </p>
        </motion.div>

      </section>

      {/* Visual Breaker */}
      <div className="max-w-xs mx-auto py-8">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--border-light)] to-transparent" />
      </div>



      {/* 2. COLLECTIONS - Show the work early */}
      <div id="collections">
        <EditorialCollection />
      </div>

      {/* Visual Breaker */}
      <div className="max-w-xs mx-auto py-8">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--dada-red)]/30 to-transparent" />
      </div>

      {/* 3. ART TO FABRIC - Consolidated Technique + Aesthetic */}
      <FeatureSection 
        subtitle="From Canvas to Cloth"
        title={
          <span className="flex flex-col">
            <span className="font-serif font-light text-5xl md:text-7xl lg:text-8xl">Our patterns come</span>
            <span className="font-sans font-black text-[3rem] md:text-9xl lg:text-[11rem] uppercase tracking-tighter mt-2 text-[var(--dada-red)] leading-[0.8]">from our art.</span>
          </span>
        }
        text={<p>We never source prints from a catalog. Every pattern begins as an original sketch or painting by Gabrielle, then Charmaigne engineers every yard so the design follows the curves of the body. Bold geometry meets organic flow. The fabric becomes an extension of the canvas.</p>}
        imgSrc="/images/patterns_fabric.jpg"
        imgAlt="Hand-painted silk fabric pattern by Art Couture atelier"
        imageClassName="flex-1 w-full scale-110 md:scale-100 flex justify-center"
        reverse
      />

      <FeatureSection 
        title={
          <span className="flex flex-col">
            <span className="font-sans font-black text-[6.2rem] md:text-[10rem] lg:text-[12rem] uppercase tracking-tighter leading-[0.8]">Bold</span>
            <span className="font-serif italic font-light text-[6.2rem] md:text-[8rem] lg:text-[10rem] text-[var(--dada-red)] -mt-4 md:-mt-8 ml-8 md:ml-16 leading-[0.8]">Designs,</span>
            <span className="font-serif font-extralight text-4xl md:text-6xl mt-4">Striking Silhouettes.</span>
          </span>
        }
        text={<p>Nothing is accidental. Every line is deliberate, every color drawn from Gabrielle&apos;s original artwork. The art inspires the fashion, and the fashion inspires new art. The garments shift and reveal new details as you move, because that is what wearable art should do.</p>}
        imgSrc="/images/bold_design.jpg"
        imgAlt="Bespoke geometric couture fabric pattern by Art Couture"
        imageClassName="w-[calc(100%+3rem)] -ml-[calc(1.5rem+5%)] md:ml-0 md:w-full -mt-6 md:mt-0 md:flex-[1.44] overflow-hidden md:max-h-[56vh]"
        staticImage
      />


      {/* 4. CATWALK VIDEO */}
      <CatwalkVideo />


      {/* THE CRAFT & THE PROMISE - Editorial Spread */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:ml-[3%] md:mr-auto">
          {/* Desktop: Side-by-side editorial layout */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-24 relative">
            
            {/* Faint AC monogram watermark in the left white space */}
            <div className="hidden md:flex absolute left-0 top-[calc(60%+6cm)] -translate-y-1/2 w-[40%] items-center justify-center pointer-events-none select-none" aria-hidden="true">
              <img
                src="/images/ac_monogram.png"
                alt=""
                className="w-56 lg:w-72 opacity-[0.04]"
                draggable={false}
              />
            </div>
            
            {/* Left: Sticky image with scroll-driven color reveal */}
            <ScrollRevealImage />

            {/* Right: Combined editorial text */}
            <div className="md:w-[55%] flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-16 md:mb-24"
              >
                <span className="block font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--text-muted)] mb-6">The Craft</span>
                <h2 className="flex flex-col mb-10">
                  <span className="font-sans font-black text-[4.7rem] md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.85]">Luxury</span>
                  <span className="font-serif font-light text-4xl md:text-5xl lg:text-6xl -mt-1 md:mt-0">you can actually</span>
                  <span className="font-serif italic font-light text-[3.5rem] md:text-[7rem] lg:text-[9rem] text-[var(--dada-red)] -mt-2 md:mt-1 leading-[0.75]">feel.</span>
                </h2>
                <p className="text-xs md:text-sm text-[var(--text-muted)] font-mono uppercase tracking-[0.15em] leading-[1.8] max-w-lg mb-4">
                  Gabrielle is obsessed with texture, and that obsession runs through everything we create. Lun&eacute;ville hook embroidery, hand-beading, sculptural draping: old-world techniques that take real time. We never rush.
                </p>
                <p className="text-xs md:text-sm text-[var(--text-muted)] font-mono uppercase tracking-[0.15em] leading-[1.8] max-w-lg">
                  Hand-cut French Chantilly lace. Delicate Guipure lacework. Silk tulle layered with precision. Charmaigne sources our textiles from Europe&apos;s finest mills, selecting each fabric for how it feels against the skin.
                </p>
              </motion.div>


              {/* Divider */}
              <div className="max-w-xs mb-16 md:mb-24">
                <div className="h-[1px] bg-gradient-to-r from-[var(--dada-red)]/30 via-[var(--dada-red)]/30 to-transparent" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <h3 className="flex flex-col mb-10">
                  <span className="font-sans font-black text-[3.75rem] md:text-6xl lg:text-7xl uppercase tracking-tighter leading-[0.85]">Gowns</span>
                  <span className="font-serif font-light text-3xl md:text-4xl lg:text-5xl -mt-1 md:mt-0">as rare as the</span>
                  <span className="font-serif italic font-light text-[3.5rem] md:text-[5.5rem] lg:text-[7rem] text-[var(--dada-red)] -mt-2 md:mt-1 leading-[0.8]">Women who wear them.</span>
                </h3>
                <p className="text-xs md:text-sm text-[var(--text-muted)] font-mono uppercase tracking-[0.15em] leading-[1.8] max-w-lg">
                  Each gown is an exclusive design, created entirely in-house: rare satin, beaded tulle, and velvet that drinks in the light. Crafted to embrace the body with precision and grace. One client. One vision. One piece.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Fabric Grid */}
        <div className="max-w-6xl mx-auto px-6">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="block text-center font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--text-muted)] mb-8"
          >
            A Selection of Our Finest Materials
          </motion.span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { src: "/images/fabric_silk.jpg", label: "Silk Satin" },
              { src: "/images/fabric_velvet.jpg", label: "Velvet" },
              { src: "/images/fabric_lace.jpg", label: "French Lace" },
              { src: "/images/fabric_embroidery.jpg", label: "Embroidery" },
            ].map((fabric, i) => (
              <motion.div
                key={fabric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="group relative aspect-square overflow-hidden"
              >
                <img
                  src={fabric.src}
                  alt={`Art Couture ${fabric.label} fabric detail`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-[0.3em] text-white/80">
                  {fabric.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="max-w-3xl mx-auto text-center px-6 mt-20"
        >
          <span className="block font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--dada-red)] mb-6">Made by Hand, Made to Last</span>
          <blockquote className="font-serif italic text-lg md:text-[1.7rem] lg:text-[2rem] text-[var(--text-main)] leading-[1.4] mb-8">
            &ldquo;We make most pieces to order, because that&apos;s how couture should work. A few ready-made treasures are available for those who want to take something home right away.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-[var(--dada-red)]/40" />
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--text-muted)]">Gabi &amp; Char</span>
            <div className="h-[1px] w-12 bg-[var(--dada-red)]/40" />
          </div>
        </motion.div>

      </section>

      {/* YOUR VISION, OUR CRAFT - Bespoke Inspiration */}
      <section className="relative py-32 md:py-44 bg-[#0a0a0a] overflow-hidden">
        {/* Oversized background watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="font-sans font-black text-[18vw] md:text-[14vw] uppercase tracking-tighter text-white/[0.02] leading-none select-none whitespace-nowrap">BESPOKE</span>
        </div>


        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-16 md:mb-24"
          >
            <span className="block font-mono text-[9px] uppercase tracking-[0.5em] text-[var(--dada-red)] mb-8">Bespoke Inspiration</span>
            <h2 className="flex flex-col">
              <span className="font-serif font-light text-5xl md:text-7xl lg:text-8xl text-white/90">Your Vision,</span>
              <span className="font-sans font-black text-[3.5rem] md:text-8xl lg:text-[10rem] uppercase tracking-tighter mt-1 text-[var(--dada-red)] leading-[0.8]">Our Craft.</span>
            </h2>
          </motion.div>

          {/* Desktop: Asymmetric two-column layout */}
          <div className="flex flex-col md:flex-row gap-16 md:gap-24">
            
            {/* Left: Copy + inspiration list */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="md:w-[55%]"
            >
              <p className="text-sm md:text-base text-white/50 font-serif leading-[1.8] mb-12 max-w-lg">
                You have an image that moves you. A painting that takes your breath away. A photograph that captured a moment you want to wear forever. Bring it to us. We will translate it into a one-of-a-kind couture creation made exclusively for you.
              </p>

              {/* Inspiration categories as dramatic list */}
              <div className="space-y-0">
                {[
                  { label: "A Painting", num: "01" },
                  { label: "A Photograph", num: "02" },
                  { label: "A Place", num: "03" },
                  { label: "A Memory", num: "04" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * i }}
                    className="group flex items-center gap-6 py-5 border-b border-white/5 hover:border-[var(--dada-red)]/30 transition-all duration-500 cursor-default"
                  >
                    <span className="font-mono text-[10px] text-[var(--dada-red)]/60 tracking-wider">{item.num}</span>
                    <span className="font-sans font-black text-2xl md:text-4xl uppercase tracking-tight text-white/20 group-hover:text-white/80 transition-colors duration-500">{item.label}</span>
                    <span className="flex-1 h-[1px] bg-transparent group-hover:bg-[var(--dada-red)]/30 transition-all duration-700 origin-left scale-x-0 group-hover:scale-x-100" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: CTA block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="md:w-[45%] flex flex-col justify-end"
            >
              <div className="border-l border-[var(--dada-red)]/30 pl-8 md:pl-12">
                <p className="font-serif italic text-lg md:text-xl text-white/40 leading-relaxed mb-10">
                  &ldquo;Your inspiration becomes your gown. Every brushstroke, every shade of light, every detail, reimagined in silk and thread.&rdquo;
                </p>
                <BespokeCTA />
              </div>
            </motion.div>
          </div>

          {/* Art-to-Dress Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mt-24 md:mt-36"
          >
            <span className="block font-mono text-[9px] uppercase tracking-[0.5em] text-[var(--dada-red)] mb-10">From Inspiration to Couture</span>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch">
              {/* The inspiration */}
              <div className="md:w-[42%] relative group overflow-hidden">
                <img
                  src="/images/paintings/italian_palazzo.png"
                  alt="A grand Italian palazzo in Venice at golden hour"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-5">
                  <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/60">The Inspiration</span>
                </div>
              </div>

              {/* Arrow connector */}
              <div className="flex items-center justify-center py-2 md:py-0">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[var(--dada-red)]/50 rotate-90 md:rotate-0">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              {/* The dress */}
              <div className="md:w-[55%] relative group overflow-hidden">
                <img
                  src="/images/paintings/palazzo_inspired_dress.png"
                  alt="Haute couture beaded gown in Venetian gold with intricate Gothic-inspired crystal beadwork, worn by an elegant woman in a Parisian atelier"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Embroidery Detail Loupe */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  onClick={() => setLoupeOpen(true)}
                  className="absolute bottom-14 right-4 md:bottom-16 md:right-6 w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.4)] z-20 cursor-pointer active:scale-95 transition-transform"
                >
                  {/* Zoomed crop of the embroidery/beadwork area on the dress */}
                  <img
                    src="/images/paintings/palazzo_inspired_dress.png"
                    alt="Close-up of intricate crystal beadwork detail"
                    className="w-[400%] h-[400%] object-cover"
                    style={{ objectPosition: '50% 92%' }}
                  />
                  {/* Loupe label */}
                  <div className="absolute inset-0 rounded-full border border-white/10" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent pt-4 pb-1.5 flex justify-center">
                    <span className="font-mono text-[6px] md:text-[7px] uppercase tracking-[0.35em] text-white/70">Detail</span>
                  </div>
                  {/* Subtle pulsing ring */}
                  <div className="absolute inset-0 rounded-full border border-[var(--dada-red)]/30 animate-[subtlePulse_3s_ease-in-out_infinite]" />
                </motion.div>

                {/* Loupe Expanded Overlay */}
                <AnimatePresence>
                  {loupeOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-6"
                      onClick={() => setLoupeOpen(false)}
                    >
                      {/* Close button */}
                      <button
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50"
                        onClick={() => setLoupeOpen(false)}
                        aria-label="Close detail view"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>

                      {/* Label */}
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-center mb-6"
                      >
                        <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-[var(--dada-red)]">Embroidery Detail</span>
                      </motion.div>

                      {/* Zoomed image - showing dress embroidery area */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                        className="w-[85vw] h-[60vh] md:w-[50vw] md:h-[70vh] rounded-lg overflow-hidden border border-white/10 shadow-2xl"
                      >
                        <img
                          src="/images/paintings/palazzo_inspired_dress.png"
                          alt="Detailed view of intricate crystal beadwork on haute couture gown"
                          className="w-[250%] h-[250%] object-cover"
                          style={{ objectPosition: '50% 55%' }}
                        />
                      </motion.div>

                      {/* Caption + close hint */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-center mt-6"
                      >
                        <p className="font-serif italic text-sm text-white/40 max-w-md">
                          Hand-set crystal beadwork inspired by Gothic palazzo architecture
                        </p>
                        <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/25 mt-4">
                          Tap anywhere to close
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-5">
                  <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/60">The Gown</span>
                </div>
              </div>
            </div>
            <p className="font-serif italic text-sm text-white/30 mt-6">Architecture becomes beadwork, palazzo becomes gown</p>
          </motion.div>

        </div>

        {/* Bottom edge gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg-primary)] to-transparent pointer-events-none" />
      </section>


      {/* OUR SERVICES */}
      <ServicesGrid />

      {/* PHOTOGRAPHY & RENTALS - Gallery */}
      <section className="py-20 md:py-28 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto mb-16"
        >
          <span className="block font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--text-muted)] mb-6">Beyond the Gown</span>
          <h2 className="flex flex-col mb-8">
            <span className="font-serif font-light text-5xl md:text-7xl lg:text-8xl">Wear it.</span>
            <span className="font-serif italic font-light text-[3rem] md:text-[7rem] lg:text-[9rem] text-[var(--dada-red)] mt-2 leading-[0.75]">Be photographed in it.</span>
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-muted)] font-mono uppercase tracking-[0.15em] leading-[1.8] max-w-2xl mb-4">
            We offer editorial-style photography sessions where our creative team styles and directs every detail. The result? Images that feel like a fashion editorial, starring you.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-muted)] font-mono uppercase tracking-[0.15em] leading-[1.8] max-w-2xl mb-4">
            Select couture creations are also available for exclusive rental for red carpet events, galas, and private occasions.
          </p>
          <p className="text-xs md:text-sm text-[var(--dada-red)] font-mono uppercase tracking-[0.15em] leading-[1.8] max-w-2xl font-bold">
            Every photograph can become a one-of-a-kind fine art piece for your wall.
          </p>
        </motion.div>

        {/* Full-Size Photo Carousel */}
        <PhotoCarousel openLightbox={openLightbox} />
      </section>

      {/* 9. NEWS & EVENTS */}
      <div id="news">
        <NewsEvents />
      </div>

      {/* 10. TESTIMONIALS */}
      <div id="testimonials">
        <TestimonialSlider />
      </div>

      {/* 11. OUR STORY - Deeper dive for those who want it */}
      <div id="story">
        <StorySection />
      </div>

      {/* 12. FAQ */}
      <div id="faq">
        <FAQAccordion />
      </div>

      <TheEdgeCampaign />
      <NewsletterCTA />

      <BackToTop />
      <Footer />
      {/* Lightbox Modal with Navigation */}      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black flex items-start md:items-center justify-center overflow-y-auto p-6 md:p-8"
            onClick={() => { setLightboxSrc(null); setIsDrawerOpen(false); }}
            onTouchStart={(e) => { lightboxTouchStart.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (lightboxTouchStart.current === null) return;
              const diff = e.changedTouches[0].clientX - lightboxTouchStart.current;
              if (Math.abs(diff) > 50) { diff > 0 ? lightboxPrev() : lightboxNext(); }
              lightboxTouchStart.current = null;
            }}
          >
            {/* Close button */}
            <button
              className="fixed top-6 right-6 text-white/70 hover:text-white transition-colors z-50"
              onClick={() => { setLightboxSrc(null); setIsDrawerOpen(false); }}
              aria-label="Close lightbox"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Side-by-side pair view for 2-image galleries */}
            {isPairView ? (
              <div className="flex flex-col items-center gap-2 md:gap-6 max-w-6xl w-full my-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 w-full">
                  {/* The Painting */}
                  <div className="flex flex-col items-center gap-1 md:gap-3 flex-1 min-w-0">
                    <motion.img
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      src={lightboxGallery[0]}
                      alt="The Painting"
                      className="max-h-[38vh] md:max-h-[65vh] w-auto object-contain rounded-sm"
                    />
                    <div className="text-center">
                      <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/40">The Painting</span>
                      <p className="font-mono text-[7px] uppercase tracking-[0.2em] text-white/25 mt-1">{pairMedium}</p>
                    </div>
                  </div>

                  {/* Arrow connector */}
                  <div className="flex flex-row md:flex-col items-center gap-1 md:gap-2 shrink-0 py-0 md:py-0">
                    <div className="w-8 md:w-[1px] h-[1px] md:h-8 bg-gradient-to-r md:bg-gradient-to-b from-transparent via-[var(--dada-red)]/40 to-transparent" />
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--dada-red)]/60 rotate-90 md:rotate-0 shrink-0">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    <div className="w-8 md:w-[1px] h-[1px] md:h-8 bg-gradient-to-r md:bg-gradient-to-b from-transparent via-[var(--dada-red)]/40 to-transparent" />
                  </div>

                  {/* The Gown */}
                  <div className="flex flex-col items-center gap-1 md:gap-3 flex-1 min-w-0">
                    <motion.img
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                      src={lightboxGallery[1]}
                      alt="The Gown"
                      className="max-h-[38vh] md:max-h-[65vh] w-auto object-contain rounded-sm"
                    />
                    <div className="text-center">
                      <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/40">The Gown</span>
                      <p className="font-mono text-[7px] uppercase tracking-[0.2em] text-white/25 mt-1">{pairCategory}</p>
                    </div>
                  </div>
                </div>

                {/* Desktop Description placard - compact bottom bar */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="hidden md:block absolute bottom-5 left-1/2 -translate-x-1/2 text-center z-20 max-w-3xl w-full px-6"
                >
                  <p className="font-serif italic text-xl text-white/50 leading-tight">{pairTitle}</p>
                  <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-white/30 mt-1 leading-tight">by Gabrielle Benot / Art Couture</p>
                  <p className="font-mono text-[11px] tracking-[0.12em] text-white/25 mt-1.5 leading-snug">{pairDescription}</p>
                </motion.div>

                {/* Mobile Drawer Tab Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDrawerOpen(true);
                  }}
                  className="md:hidden fixed left-0 bottom-12 z-30 flex items-center gap-2 bg-[#0c0c0a]/90 backdrop-blur-md border border-l-0 border-white/20 pl-4 pr-5 py-3 rounded-r-full text-white/80 hover:text-white transition-all duration-300 shadow-[4px_0_15px_rgba(0,0,0,0.5)] cursor-pointer"
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em]">Click for Details</span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--dada-red)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--dada-red)]"></span>
                  </span>
                </button>

                {/* Mobile Details Drawer (Left-Side sliding panel) */}
                <AnimatePresence>
                  {isDrawerOpen && (
                    <>
                      {/* Backdrop for mobile drawer */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsDrawerOpen(false)}
                        className="md:hidden fixed inset-0 bg-black/60 z-30"
                      />
                      <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 220 }}
                        className="md:hidden fixed top-0 bottom-0 left-0 w-[85%] max-w-[360px] bg-[#0c0c0a]/95 border-r border-white/10 p-6 z-40 flex flex-col shadow-[10px_0_30px_rgba(0,0,0,0.8)] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Close button for drawer */}
                        <div className="flex justify-end mb-4">
                          <button
                            onClick={() => setIsDrawerOpen(false)}
                            className="text-white/40 hover:text-white/80 transition-colors p-1"
                            aria-label="Close details"
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </div>

                        {/* Content */}
                        <div className="space-y-4">
                          <span className="block font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--dada-red)]">{pairCategory}</span>
                          <h4 className="font-serif italic text-2xl text-white font-light leading-tight">{pairTitle}</h4>
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 leading-tight">by Gabrielle Benot / Art Couture</p>
                          <div className="h-[1px] bg-white/10 my-2" />
                          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/25 leading-[1.8]">{pairMedium}</p>
                          <p className="font-mono text-[11px] tracking-[0.08em] text-white/60 leading-[1.7]">{pairDescription}</p>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                {/* Previous arrow */}
                {lightboxGallery.length > 0 && lightboxIdx > 0 && (
                  <button
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center text-white/40 hover:text-white/70 transition-colors"
                    onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
                    aria-label="Previous image"
                  >
                    <svg width="12" height="24" viewBox="0 0 12 24" fill="none">
                      <path d="M10 2L2 12L10 22" stroke="white" strokeOpacity="0.5" strokeWidth="0.75" />
                    </svg>
                  </button>
                )}

                {/* Next arrow */}
                {lightboxGallery.length > 0 && lightboxIdx < lightboxGallery.length - 1 && (
                  <button
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center text-white/40 hover:text-white/70 transition-colors"
                    onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
                    aria-label="Next image"
                  >
                    <svg width="12" height="24" viewBox="0 0 12 24" fill="none">
                      <path d="M2 2L10 12L2 22" stroke="white" strokeOpacity="0.5" strokeWidth="0.75" />
                    </svg>
                  </button>
                )}

                {/* Counter */}
                {lightboxGallery.length > 1 && (
                  <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 z-20">
                    {lightboxIdx + 1} / {lightboxGallery.length}
                  </span>
                )}

                <motion.img
                  key={lightboxSrc}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={lightboxSrc}
                  alt="Full view"
                  className="max-w-full max-h-full object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
