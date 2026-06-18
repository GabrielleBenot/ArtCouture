"use client";
import React from "react";
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
import { BackToTop } from "@/components/BackToTop";
import { motion } from "framer-motion";

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
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 0.85]);
  const filterValue = useTransform(scrollYProgress, [0.35, 0.6], [1, 0]);
  const filter = useTransform(filterValue, (v: number) => `grayscale(${v})`);

  return (
    <div ref={ref} className="w-full relative flex justify-center items-center perspective-1000">
      {blend ? (
        <motion.div style={{ y, scale }} className="max-w-full md:max-w-[75%] max-h-[85vh] aspect-square rounded-full overflow-hidden bg-[var(--background)] mx-auto">
          <img 
            src={src} 
            alt={alt} 
            loading="lazy"
            className="w-full h-full object-contain scale-[0.94] mix-blend-multiply"
          />
        </motion.div>
      ) : (
        <motion.img 
          style={revealColor ? { y, scale, filter } : { y, scale }} 
          src={src} 
          alt={alt} 
          loading="lazy"
          className={`max-w-full md:max-w-[85%] max-h-[85vh] w-auto h-auto object-contain rounded-sm mix-blend-multiply mx-auto ${className || ''}`}
        />
      )}
    </div>
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
  revealColor = false
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
  revealColor?: boolean
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
            <ParallaxImage src={imgSrc} alt={imgAlt} blend={blendImage} revealColor={revealColor} />
          </div>
        </>
      ) : (
        <>
          <div className={`${imageClassName} order-2 md:order-1`}>
            <ParallaxImage src={imgSrc} alt={imgAlt} blend={blendImage} revealColor={revealColor} />
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
  return (
    <main className="min-h-screen bg-[var(--background)] selection:bg-[var(--dada-red)] selection:text-white overflow-x-hidden">
      <IntroLoader />
      <Header />
      <CinematicHero />
      <ScrollQuote />

      {/* 1. MEET GABI & CHAR - Photo + intro */}
      <section id="boutique" className="py-20 md:py-28 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto flex flex-col items-center text-center"
        >
          {/* Circular Photo */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border border-white/10 shadow-2xl mb-8 group">
            <div className="absolute inset-0 bg-[var(--dada-red-glow)] mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
            <img 
              src="https://storage.googleapis.com/mixo-sites/images/file-79d83dc3-308d-4dd6-9173-8dc2170520f7.jpeg" 
              alt="Gabrielle Benot and Charmaigne Menn, founders of Art Couture" 
              loading="lazy"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s]"
            />
          </div>

          {/* Names */}
          <span className="font-serif text-sm md:text-base tracking-[0.15em] text-white/50 mb-1">Charmaigne Menn &amp; Gabrielle Benot</span>
          <span className="font-serif italic text-lg md:text-xl tracking-[0.2em] text-white/70 mb-4">Gabi et Char</span>
          <div className="w-12 h-[1px] bg-[var(--dada-red)] mb-8" />

          {/* Headline */}
          <h2 className="flex flex-col items-center mb-8">
            <span className="font-sans font-black text-[3rem] md:text-6xl uppercase tracking-tighter leading-[0.85]">She paints. She sews.</span>
            <span className="font-serif italic font-light text-[3.5rem] md:text-[6rem] lg:text-[8rem] text-[var(--dada-red)] -mt-1 md:mt-0 leading-[0.8]">Together, magic.</span>
          </h2>

          {/* Intro text */}
          <p className="text-xs md:text-sm text-[var(--text-muted)] font-mono uppercase tracking-[0.15em] leading-[1.8] max-w-xl">
            Every gown starts as a painting. Gabi paints it, Char builds it. The colors on our canvases are the same ones you&apos;ll wear.
          </p>
        </motion.div>
      </section>

      {/* COLOR IS POWER - Visual section */}
      <FeatureSection 
        subtitle="The Philosophy"
        title={
          <span className="flex flex-col">
            <span className="font-sans text-sm md:text-sm font-black tracking-[0.3em] uppercase relative z-10">Color is</span>
            <span className="font-serif italic font-light text-[7.9rem] md:text-[10rem] lg:text-[12rem] text-[var(--dada-red)] mt-0 md:-mt-4 leading-[0.8] relative z-0">Power.</span>
            <span className="font-mono text-xs uppercase tracking-[0.4em] mt-2 md:mt-8 text-white/70">Wear it without apology.</span>
          </span>
        }
        text={<p>Our palettes begin on canvas before they ever touch fabric. Bold contemporary painting meets classical form. These pieces don&apos;t just enter a room. They own it.</p>}
        imgSrc="https://storage.googleapis.com/mixo-sites/images/file-0ae10f15-2ee8-43af-885e-16f4bbe10af4.png"
        imgAlt="Art Couture original watercolor painting by Gabrielle Benot"
        imageClassName="flex-[1.44] w-full -ml-4 md:ml-0"
        textClassName="flex-1 space-y-4 md:space-y-6"
      />

      <FeatureSection 
        subtitle="The Inspiration"
        title={
          <span className="flex flex-col">
            <span className="font-sans font-black text-4xl md:text-5xl uppercase tracking-tight">Explore the Art</span>
            <span className="font-serif font-light text-4xl md:text-6xl -mt-1 md:mt-0">That Inspires</span>
            <span className="font-serif italic font-light text-[4rem] md:text-[11rem] lg:text-[14rem] text-[var(--dada-red)] -mt-2 md:-mt-4 leading-[0.8]">Couture</span>
          </span>
        }
        text={<p>Gabi&apos;s paintings aren&apos;t mood boards. They&apos;re the source material. The textures in her brushwork determine the weight and drape of every fabric Char selects. What hangs on the gallery wall becomes what you wear on the floor.</p>}
        imgSrc="https://storage.googleapis.com/mixo-sites/images/file-7c7c79ac-f9d7-4fe7-bcd1-7d29e0eae366.png"
        imgAlt="Gabrielle Benot original abstract painting for couture collection"
        imageClassName="flex-[1.44] w-full"
        reverse
      />

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
        text={<p>We don&apos;t source prints from a catalog. Gabi paints them, and Char engineers every yard of fabric so the brushstrokes follow the curves of your body. Bold geometry meets organic flow. What you see on the gallery wall becomes what you wear.</p>}
        imgSrc="/images/patterns_fabric.jpg"
        imgAlt="Hand-painted silk fabric pattern by Art Couture atelier"
        imageClassName="flex-1 w-full scale-110 md:scale-100 flex justify-center"
        reverse
      />

      <FeatureSection 
        title={
          <span className="flex flex-col">
            <span className="font-sans font-black text-[6.2rem] md:text-[10rem] lg:text-[12rem] uppercase tracking-tighter leading-[0.8]">Bold</span>
            <span className="font-serif italic font-light text-[6.2rem] md:text-[8rem] lg:text-[10rem] text-[var(--dada-red)] -mt-4 md:-mt-8 ml-8 md:ml-16 leading-[0.8]">Patterns,</span>
            <span className="font-serif font-extralight text-4xl md:text-6xl mt-4">Striking Silhouettes.</span>
          </span>
        }
        text={<p>These aren&apos;t decorations placed on fabric. They&apos;re built into it. Every line is deliberate, every color hand-mixed. The garments shift and reveal new details as you move. That&apos;s the whole point.</p>}
        imgSrc="https://storage.googleapis.com/mixo-sites/images/file-afe1558e-67b6-483d-a49a-82317121d155.jpg"
        imgAlt="Bespoke geometric couture fabric pattern by Art Couture"
        imageClassName="w-[calc(100%+3rem)] -ml-[calc(1.5rem+5%)] md:ml-0 md:w-full -mt-6 md:mt-0 md:flex-[1.44] overflow-hidden"
      />

      {/* 4. CATWALK VIDEO */}
      <CatwalkVideo />

      {/* THE CRAFT & THE PROMISE - One Grand Section */}
      <section className="py-20 md:py-28">
        {/* Luxury Detail Image with color reveal */}
        <div className="relative w-full max-w-5xl mx-auto mb-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative overflow-hidden"
          >
            <img 
              src="/images/luxury_detail.jpg"
              alt="Art Couture hand-embroidered lace detail close-up"
              loading="lazy"
              className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s]"
            />
          </motion.div>
        </div>

        {/* Craft Headline + Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center px-6 mb-20"
        >
          <span className="block font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--text-muted)] mb-6">The Craft</span>
          <h2 className="flex flex-col items-center mb-8">
            <span className="font-sans font-black text-[4.7rem] md:text-8xl uppercase tracking-tighter leading-[0.85]">Luxury</span>
            <span className="font-serif font-light text-4xl md:text-6xl -mt-1 md:mt-0">you can actually</span>
            <span className="font-serif italic font-light text-[3.5rem] md:text-[9rem] lg:text-[11rem] text-[var(--dada-red)] -mt-2 md:mt-2 leading-[0.75]">feel.</span>
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-muted)] font-mono uppercase tracking-[0.15em] leading-[1.8] max-w-2xl mx-auto mb-4">
            Lun&eacute;ville hook embroidery, hand-beading, sculptural draping. These are old-world techniques that take real time. We don&apos;t rush. You can feel the difference in the weight of the silk, the architecture of the corset, the finish of every hidden seam.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-muted)] font-mono uppercase tracking-[0.15em] leading-[1.8] max-w-2xl mx-auto">
            Hand-cut French Chantilly lace. Delicate Guipure lacework. Silk tulle adorned with embroidery. We source our textiles from Europe&apos;s finest mills. Every embellishment is applied by hand. Every design is exclusively ours.
          </p>
        </motion.div>

        {/* Visual Breaker */}
        <div className="max-w-xs mx-auto mb-20">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--dada-red)]/30 to-transparent" />
        </div>

        {/* Gown Image */}
        <div className="relative w-full max-w-5xl mx-auto mb-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative overflow-hidden"
          >
            <img 
              src="https://storage.googleapis.com/mixo-sites/images/file-1f3f0688-6519-43dd-b5ad-a14a0457a21b.jpg"
              alt="Art Couture bespoke evening gown by Gabrielle Benot and Charmaigne Menn"
              loading="lazy"
              className="w-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-[1.5s]"
            />
          </motion.div>
        </div>

        {/* Promise Headline + Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center px-6 mb-20"
        >
          <h2 className="flex flex-col items-center mb-8">
            <span className="font-sans font-black text-[3.75rem] md:text-7xl uppercase tracking-tighter leading-[0.85]">Gowns</span>
            <span className="font-serif font-light text-4xl md:text-6xl -mt-1 md:mt-0">as rare as the</span>
            <span className="font-serif italic font-light text-[4rem] md:text-[7rem] lg:text-[9rem] text-[var(--dada-red)] -mt-2 md:mt-2 leading-[0.75]">Women who wear them.</span>
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-muted)] font-mono uppercase tracking-[0.15em] leading-[1.8] max-w-2xl mx-auto">
            Each gown is an exclusive design, created entirely in-house: rare silk satin, hand-embroidered tulle with Lun&eacute;ville beadwork, and velvet that drinks in the light. Crafted to embrace the body with precision and grace.
          </p>
        </motion.div>

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
              { src: "/images/fabric_silk.png", label: "Silk Satin" },
              { src: "/images/fabric_velvet.png", label: "Velvet" },
              { src: "/images/fabric_lace.png", label: "French Lace" },
              { src: "/images/fabric_embroidery.png", label: "Embroidery" },
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
          <blockquote className="font-serif italic text-2xl md:text-4xl lg:text-[2.8rem] text-[var(--text-main)] leading-[1.3] mb-8">
            &ldquo;We make most pieces to order, because that&apos;s how couture should work. A few ready-made treasures are available for those who want to take something home right away.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-[var(--dada-red)]/40" />
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--text-muted)]">Gabi &amp; Char</span>
            <div className="h-[1px] w-12 bg-[var(--dada-red)]/40" />
          </div>
        </motion.div>
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
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <span className="block font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--text-muted)] mb-6">Beyond the Gown</span>
          <h2 className="flex flex-col items-center mb-8">
            <span className="font-serif font-light text-5xl md:text-7xl lg:text-8xl">Wear it.</span>
            <span className="font-serif italic font-light text-[4rem] md:text-[7rem] lg:text-[9rem] text-[var(--dada-red)] mt-2 leading-[0.75]">Be photographed in it.</span>
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-muted)] font-mono uppercase tracking-[0.15em] leading-[1.8] max-w-2xl mx-auto mb-4">
            We offer editorial-style photography sessions where our creative team styles and directs every detail. The result? Images that feel like a fashion editorial, starring you.
          </p>
          <p className="text-xs md:text-sm text-[var(--text-muted)] font-mono uppercase tracking-[0.15em] leading-[1.8] max-w-2xl mx-auto mb-4">
            Select couture creations are also available for exclusive rental for red carpet events, galas, and private occasions.
          </p>
          <p className="text-xs md:text-sm text-[var(--dada-red)] font-mono uppercase tracking-[0.15em] leading-[1.8] max-w-2xl mx-auto font-bold">
            Every photograph can become a one-of-a-kind fine art piece for your wall.
          </p>
        </motion.div>

        {/* Photo Gallery Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { src: "/images/masterpieces.jpg", label: "Editorial Session" },
              { src: "/images/rentals.jpg", label: "Couture Rental" },
              { src: "/images/process/painting.jpg", label: "Coming Soon" },
              { src: "/images/process/draping.jpg", label: "Coming Soon" },
            ].map((photo, i) => (
              <motion.div
                key={photo.label + i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
              >
                <img
                  src={photo.src}
                  alt={`Art Couture ${photo.label}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-[0.3em] text-white/80">
                  {photo.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
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
    </main>
  );
}
