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
import { useScroll, useTransform } from "framer-motion";

// Parallax Image Component for sections
function ParallaxImage({ src, alt, blend, className, revealColor }: { src: string, alt: string, blend?: boolean, className?: string, revealColor?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Subtly move the image vertically while noticeably shrinking it to create depth
  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 0.98]);
  const filterValue = useTransform(scrollYProgress, [0.35, 0.6], [1, 0]);
  const filter = useTransform(filterValue, (v: number) => `grayscale(${v})`);

  return (
    <div ref={ref} className="w-full relative flex justify-center items-center perspective-1000">
      {blend ? (
        <div className="w-full flex justify-center">
          {/* Deliberate semicircle crop on desktop with drop shadow */}
          <div className="md:h-[45vh] md:overflow-hidden w-full flex justify-center">
            <div className="max-w-full md:max-w-[75%] max-h-[85vh] aspect-square rounded-full overflow-hidden bg-[var(--background)] mx-auto" style={{ filter: 'drop-shadow(0 25px 40px rgba(0,0,0,0.12)) drop-shadow(0 8px 16px rgba(0,0,0,0.08))' }}>
              <img 
                src={src} 
                alt={alt} 
                loading="lazy"
                className="w-full h-full object-contain scale-[0.94] mix-blend-multiply"
              />
            </div>
          </div>
        </div>
      ) : (
        <motion.img 
          style={revealColor ? { y, scale, filter } : { y, scale }} 
          src={src} 
          alt={alt} 
          loading="lazy"
          className={`max-w-full md:max-w-[85%] w-auto h-auto object-contain rounded-sm mix-blend-multiply mx-auto ${className || ''}`}
        />
      )}
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
  const grayscaleValue = useTransform(scrollYProgress, [0, 0.65, 0.75], [1, 1, 0]);
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
  imageClassName = "flex-[1.2] w-full",
  textClassName = "flex-1 space-y-6",
  revealColor = false,
  imgClassName
}: { 
  id?: string,
  title?: React.ReactNode, 
  text?: React.ReactNode, 
  imgSrc: string, 
  imgAlt?: string,
  reverse?: boolean,
  subtitle?: string,
  blendImage?: boolean,
  imageClassName?: string,
  textClassName?: string,
  revealColor?: boolean,
  imgClassName?: string
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
            <ParallaxImage src={imgSrc} alt={imgAlt} blend={blendImage} revealColor={revealColor} className={imgClassName} />
          </div>
        </>
      ) : (
        <>
          <div className={`${imageClassName} order-2 md:order-1`}>
            <ParallaxImage src={imgSrc} alt={imgAlt} blend={blendImage} revealColor={revealColor} className={imgClassName} />
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

export default function Home() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
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
              src="https://storage.googleapis.com/mixo-sites/images/file-79d83dc3-308d-4dd6-9173-8dc2170520f7.jpeg" 
              alt="Gabrielle Benot and Charmaigne Menn, founders of Art Couture" 
              loading="lazy"
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
        imgSrc="https://storage.googleapis.com/mixo-sites/images/file-0ae10f15-2ee8-43af-885e-16f4bbe10af4.png"
        imgAlt="Art Couture original watercolor painting by Gabrielle Benot"
        imageClassName="flex-[1.44] w-full -ml-4 md:ml-0"
        textClassName="flex-1 space-y-4 md:space-y-6"
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
              <div className="relative group overflow-hidden aspect-square flex-1 cursor-pointer" onClick={() => setLightboxSrc('/images/paintings/brunette_yellow_painting.png')}>
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
              <div className="relative group overflow-hidden aspect-[3/4] flex-1 cursor-pointer" onClick={() => setLightboxSrc('/images/paintings/dress_from_painting_hero.jpg')}>
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
              <div className="relative group overflow-hidden aspect-square flex-1 cursor-pointer" onClick={() => setLightboxSrc('/images/paintings/faces_color_blind.jpg')}>
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
              <div className="relative group overflow-hidden aspect-[3/4] flex-1 cursor-pointer" onClick={() => setLightboxSrc('/images/paintings/dress_from_colorful_face.png')}>
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
              className="flex flex-col items-center w-full md:w-[38%] md:-mt-4"
            >
              <div className="relative overflow-hidden aspect-[9/16] w-[75%] md:w-full rounded-sm shadow-2xl shadow-black/50">
                <video autoPlay muted loop playsInline preload="metadata" className="w-full h-full object-cover">
                  <source src="/videos/painting_process.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 border border-white/10 rounded-sm pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
                  <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-white/50">The Art</span>
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
              className="flex flex-col items-center w-full md:w-[38%] md:mt-16"
            >
              <div className="relative overflow-hidden aspect-[9/16] w-[75%] md:w-full rounded-sm shadow-2xl shadow-black/50">
                <video autoPlay muted loop playsInline preload="metadata" className="w-full h-full object-cover">
                  <source src="/videos/couture_process.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 border border-white/10 rounded-sm pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
                  <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-white/50">The Couture</span>
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
        imgSrc="https://storage.googleapis.com/mixo-sites/images/file-afe1558e-67b6-483d-a49a-82317121d155.jpg"
        imgAlt="Bespoke geometric couture fabric pattern by Art Couture"
        imageClassName="w-[calc(100%+3rem)] -ml-[calc(1.5rem+5%)] md:ml-0 md:w-full -mt-6 md:mt-0 md:flex-[1.44] overflow-hidden max-h-[50vh]"
      />

      {/* 4. CATWALK VIDEO */}
      <CatwalkVideo />

      {/* THE CRAFT & THE PROMISE - Editorial Spread */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:ml-[3%] md:mr-auto">
          {/* Desktop: Side-by-side editorial layout */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-24">
            
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
                {(() => {
                  const [bespokeOpen, setBespokeOpen] = React.useState(false);
                  return (
                    <>
                      <button
                        onClick={() => setBespokeOpen(true)}
                        className="group inline-flex items-center gap-5"
                      >
                        <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/70 group-hover:text-[var(--dada-red)] transition-colors duration-300">Share Your Vision</span>
                        <span className="relative w-12 h-[1px] bg-white/20 group-hover:bg-[var(--dada-red)] transition-all duration-500 overflow-hidden">
                          <span className="absolute inset-0 bg-[var(--dada-red)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                        </span>
                      </button>
                      <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/20 mt-6">
                        Tell us your vision. We respond within 24 hours.
                      </p>
                      <BespokeForm isOpen={bespokeOpen} onClose={() => setBespokeOpen(false)} />
                    </>
                  );
                })()}
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
                  alt="Elegant gown inspired by a Venetian palazzo, warm honey-gold silk with architectural draping"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Side vignettes to focus on the dress */}
                <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 60px 0 80px -20px rgba(0,0,0,0.5), inset -60px 0 80px -20px rgba(0,0,0,0.5)' }} />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-5">
                  <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/60">The Gown</span>
                </div>
              </div>
            </div>
            <p className="font-serif italic text-sm text-white/30 mt-6">Inspired by the light of a Venetian palazzo</p>
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
        {(() => {
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
            <div className="max-w-5xl mx-auto" ref={(el) => { parallaxRef.current = el; containerRef.current = el; }}>
              <motion.div
                key={activePhoto}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full aspect-[4/5] md:aspect-[16/9] overflow-hidden rounded-sm mb-6 select-none max-h-[55vh] cursor-pointer group"
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
                {/* Click left half to go back */}
                {activePhoto > 0 && (
                  <button onClick={() => setActivePhoto(activePhoto - 1)} className="absolute left-0 top-0 w-[40%] h-full z-10 cursor-w-resize" aria-label="Previous photo" />
                )}
                {/* Click right half to go forward */}
                {activePhoto < photos.length - 1 && (
                  <button onClick={() => setActivePhoto(activePhoto + 1)} className="absolute right-0 top-0 w-[40%] h-full z-10 cursor-e-resize" aria-label="Next photo" />
                )}
                {/* Expand button - opens lightbox */}
                <button 
                  onClick={() => setLightboxSrc(photos[activePhoto].src)}
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
        })()}
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
      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center cursor-pointer p-8"
            onClick={() => setLightboxSrc(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
              onClick={() => setLightboxSrc(null)}
              aria-label="Close lightbox"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={lightboxSrc}
              alt="Full view"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
