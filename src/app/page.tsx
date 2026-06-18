"use client";
import React from "react";
import { Header } from "@/components/Header";
import { IntroLoader } from "@/components/IntroLoader";
import { CinematicHero } from "@/components/CinematicHero";
import { ScrollQuote } from "@/components/ScrollQuote";
import { CatwalkVideo } from "@/components/CatwalkVideo";
import { EditorialCollection } from "@/components/EditorialCollection";
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
  const grayscale = useTransform(scrollYProgress, [0.1, 0.45], [1, 0]);
  const filter = useTransform(grayscale, (v: number) => `grayscale(${v})`);

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

      <FeatureSection 
        id="boutique"
        subtitle="The Philosophy"
        title={
          <span className="flex flex-col">
            <span className="font-sans text-sm md:text-sm font-black tracking-[0.3em] uppercase relative z-10">Color is</span>
            <span className="font-serif italic font-light text-[7.9rem] md:text-[10rem] lg:text-[12rem] text-[var(--dada-red)] mt-0 md:-mt-4 leading-[0.8] relative z-0">Power.</span>
            <span className="font-mono text-xs uppercase tracking-[0.4em] mt-2 md:mt-8 text-white/70">Wear it without apology.</span>
          </span>
        }
        text={<p>At Art Couture, color is not an accent. It is a declaration. Every palette begins on the canvas before it ever touches fabric. We draw from bold contemporary painting and classical form to create bespoke pieces that do not simply enter a room. They command it.</p>}
        imgSrc="https://storage.googleapis.com/mixo-sites/images/file-0ae10f15-2ee8-43af-885e-16f4bbe10af4.png"
        imgAlt="Art Couture original watercolor painting by Gabrielle Benot"
        imageClassName="flex-[1.44] w-full -ml-4 md:ml-0"
        textClassName="flex-1 space-y-4 md:space-y-6"
      />

      {/* Visual Breaker */}
      <div className="max-w-xs mx-auto py-8">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--border-light)] to-transparent" />
      </div>

      <FeatureSection 
        subtitle="The Technique"
        title={
          <span className="flex flex-col">
            <span className="font-serif font-light text-5xl md:text-7xl lg:text-8xl">Patterns designed from the</span>
            <span className="font-sans font-black text-[3rem] md:text-9xl lg:text-[11rem] uppercase tracking-tighter mt-2 text-[var(--dada-red)] leading-[0.8]">Art we create.</span>
          </span>
        }
        text={<p>Behind every couture dress lies a canvas. We design our own exclusive patterns, born from the paintings we create in our studio. Each yard of luxury fabric is meticulously engineered so the brushstrokes of the original artwork follow the curves of the body. This is wearable fine art.</p>}
        imgSrc="/images/patterns_fabric.jpg"
        imgAlt="Hand-painted silk fabric pattern by Art Couture atelier"
        imageClassName="flex-1 w-full scale-110 md:scale-100 flex justify-center"
        reverse
      />

      <FeatureSection 
        subtitle="The Aesthetic"
        title={
          <span className="flex flex-col">
            <span className="font-sans font-black text-[6.2rem] md:text-[10rem] lg:text-[12rem] uppercase tracking-tighter leading-[0.8]">Bold</span>
            <span className="font-serif italic font-light text-[6.2rem] md:text-[8rem] lg:text-[10rem] text-[var(--dada-red)] -mt-4 md:-mt-8 ml-8 md:ml-16 leading-[0.8]">Patterns,</span>
            <span className="font-serif font-extralight text-4xl md:text-6xl mt-4">Striking Silhouettes.</span>
          </span>
        }
        text={<p>Our patterns do not simply sit on fabric. They move with it. Geometric precision meets organic flow, creating handcrafted garments that shift and reveal new details from every angle. Nothing is accidental. Every line has a reason.</p>}
        imgSrc="https://storage.googleapis.com/mixo-sites/images/file-afe1558e-67b6-483d-a49a-82317121d155.jpg"
        imgAlt="Bespoke geometric couture fabric pattern by Art Couture"
        imageClassName="w-[calc(100%+3rem)] -ml-[calc(1.5rem+5%)] md:ml-0 md:w-full -mt-6 md:mt-0 md:flex-[1.44] overflow-hidden"
      />

      {/* Visual Breaker */}
      <div className="max-w-xs mx-auto py-8">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--dada-red)]/30 to-transparent" />
      </div>

      <FeatureSection 
        subtitle="The Studio"
        title={
          <span className="flex flex-col">
            <span className="font-serif font-light text-4xl md:text-6xl">This is where design and</span>
            <span className="font-serif font-light text-[2.8rem] md:text-6xl -mt-1 md:mt-0">art</span>
            <span className="font-serif font-light text-4xl md:text-6xl -mt-1 md:mt-0">breathes the</span>
            <span className="font-serif italic font-light text-[4.2rem] md:text-[9rem] lg:text-[11rem] text-[var(--dada-red)] -mt-3 md:-mt-4 leading-[0.75]">same air.</span>
          </span>
        }
        text={<p>The atelier is a sanctuary of imagination. Surrounded by canvases, watercolors, drafting tables, and bolts of silk, Gabrielle and Charmaigne blend two distinct disciplines into a singular vision. Here, an idea can start as a charcoal sketch and finish as a breathtaking gala gown.</p>}
        imgSrc="https://storage.googleapis.com/mixo-sites/images/file-4b000517-aa66-445e-8e2e-89c2d295dc73.png"
        imgAlt="Art Couture atelier studio watercolor painting"
        reverse
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
        text={<p>Gabrielle Benot&apos;s original paintings are not inspiration boards. They are the source material. The textures in her brushwork determine the weight and drape of the fine fabrics that Charmaigne Menn selects and sculpts. What you see on the gallery wall becomes what you wear on the floor.</p>}
        imgSrc="https://storage.googleapis.com/mixo-sites/images/file-7c7c79ac-f9d7-4fe7-bcd1-7d29e0eae366.png"
        imgAlt="Gabrielle Benot original abstract painting for couture collection"
        imageClassName="flex-[1.44] w-full"
      />

      <FeatureSection 
        subtitle="The Process"
        title={
          <span className="flex flex-col">
            <span className="font-serif font-light text-5xl md:text-7xl lg:text-8xl">A meticulous</span>
            <span className="font-serif font-light text-5xl md:text-7xl lg:text-8xl -mt-1 md:mt-0">approach</span>
            <span className="font-serif italic font-light text-[3.5rem] md:text-[9rem] lg:text-[12rem] -mt-2 md:-mt-4 leading-[0.8] text-[var(--dada-red)]">to craft.</span>
          </span>
        }
        text={<p>Every couture creation passes through the traditions of French broderie d&apos;art. Lun&eacute;ville hook embroidery, hand-beading, precise pattern cutting, and sculptural draping are woven into each piece. True luxury cannot be rushed. It is felt in the weight of the silk, the architecture of the corset, and the flawless finish of every hidden seam.</p>}
        imgSrc="/images/process_craft.jpg"
        imageClassName="w-full overflow-hidden [&_img]:mb-[-8px]"
        imgAlt="Charmaigne Menn haute couture craftsmanship hand draping"
        reverse
      />

      {/* Visual Breaker */}
      <div className="max-w-xs mx-auto py-8">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--border-light)] to-transparent" />
      </div>

      <FeatureSection 
        subtitle="The Promise"
        title={
          <span className="flex flex-col">
            <span className="font-sans font-black text-[3.75rem] md:text-7xl uppercase tracking-tighter leading-[0.85]">Gowns</span>
            <span className="font-serif font-light text-4xl md:text-6xl -mt-1 md:mt-0">as rare as the</span>
            <span className="font-serif italic font-light text-[4rem] md:text-[7rem] lg:text-[9rem] text-[var(--dada-red)] -mt-2 md:mt-2 leading-[0.75]">Women who wear them.</span>
          </span>
        }
        text={<p>Born from the artistic vision of European-trained painter Gabrielle Benot and the masterful couture craftsmanship of South African-born Charmaigne Menn, &ldquo;Gabi et Char&rdquo; redefines eveningwear for the modern icon. Their shared global perspective and well-travelled eye for beauty converge in every gown. Each silhouette is an exclusive design, created entirely in-house: rare silk satin, hand-embroidered tulle finished with Lun&eacute;ville beadwork, and velvet that drinks in the light, all crafted to embrace the body with precision and grace.</p>}
        imgSrc="https://storage.googleapis.com/mixo-sites/images/file-1f3f0688-6519-43dd-b5ad-a14a0457a21b.jpg"
        imgAlt="Art Couture bespoke evening gown by Gabrielle Benot and Charmaigne Menn"
        imageClassName="w-full md:flex-[1.44] overflow-hidden flex justify-center items-center scale-[1.38] -translate-x-[5%] md:translate-x-0 md:scale-100 mx-auto"
        blendImage
      />

      <div id="collections">
        <EditorialCollection />
      </div>

      {/* Limited Edition Callout */}
      <section className="py-20 md:py-28 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="block font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--dada-red)] mb-6">Made by Hand, Made to Last</span>
          <blockquote className="font-serif italic text-2xl md:text-4xl lg:text-[2.8rem] text-[var(--text-main)] leading-[1.3] mb-8">
            &ldquo;Every piece is designed in our atelier with an artist&apos;s eye for detail. Because of the care and precision involved, our collections are produced in very limited quantities, often made to order. A small selection of ready-made pieces is available for those who prefer to take home a treasure immediately.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-[var(--dada-red)]/40" />
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--text-muted)]">Gabrielle &amp; Charmaigne</span>
            <div className="h-[1px] w-12 bg-[var(--dada-red)]/40" />
          </div>
        </motion.div>
      </section>

      {/* Fabric Showcase */}
      <section className="pb-20 md:pb-28 px-6">
        <div className="max-w-6xl mx-auto">
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
      </section>

      <CatwalkVideo />

      <div className="py-12" />

      <FeatureSection 
        subtitle="The Detail"
        title={
          <span className="flex flex-col">
            <span className="font-sans font-black text-[4.7rem] md:text-8xl uppercase tracking-tighter leading-[0.85]">Luxury</span>
            <span className="font-serif font-light text-4xl md:text-6xl -mt-1 md:mt-0">is in the details</span>
            <span className="font-serif italic font-light text-[3.5rem] md:text-[9rem] lg:text-[11rem] text-[var(--dada-red)] -mt-2 md:mt-2 leading-[0.75]">You can feel.</span>
          </span>
        }
        text={<p>From hand-cut French Chantilly lace appliqu&eacute; and delicate Guipure lacework to sheer silk tulle adorned with Lun&eacute;ville embroidery, each collection explores fabric as both canvas and form. Every textile is sourced from the most prestigious European mills. Every embellishment is applied by hand. Every design is exclusively ours.</p>}
        imgSrc="/images/luxury_detail.jpg"
        imgAlt="Art Couture hand-embroidered lace detail close-up"
        revealColor
      />

      <FeatureSection 
        subtitle="The Experience"
        title={
          <span className="flex flex-col">
            <span className="font-serif font-light text-5xl md:text-7xl lg:text-8xl">Turning</span>
            <span className="font-serif italic font-light text-[4rem] md:text-[7rem] lg:text-[9rem] text-[var(--dada-red)] mt-2 leading-[0.75]">into Masterpieces.</span>
          </span>
        }
        text={
          <>
            <p className="mb-4">We offer bespoke photography sessions that capture you in couture elegance, styled with the precision of a fashion editorial. Our creative team directs every pose and curates the lighting to flatter perfectly.</p>
            <p className="text-[var(--dada-red)] font-bold">Each image can be transformed into a one-of-a-kind fine art piece, ensuring your moment lives on as both a photograph and a masterpiece.</p>
          </>
        }
        imgSrc="/images/masterpieces.jpg"
        imgAlt="Art Couture editorial photography session"
        reverse
      />

      <FeatureSection 
        subtitle="The Services"
        title={
          <span className="flex flex-col">
            <span className="font-sans font-light text-5xl md:text-6xl lg:text-7xl tracking-tighter">Photography</span>
            <span className="font-serif italic font-light text-[4rem] md:text-[6rem] lg:text-[7rem] text-[var(--text-main)] -mt-2 leading-[0.8]">and Rentals.</span>
          </span>
        }
        text={<p>Select Gabi et Char couture creations are available for exclusive rental. We also arrange bespoke photography sessions, giving photographers, stylists, and creative teams access to haute couture for editorial shoots, red carpet events, and private occasions.</p>}
        imgSrc="/images/rentals.jpg"
        imgAlt="Art Couture couture rental and photography services"
        imageClassName="flex-[3] w-full"
        textClassName="flex-1 space-y-6"
      />

      <FeatureSection 
        subtitle="The Legacy"
        title={<span className="text-[var(--dada-red)] block text-4xl md:text-5xl lg:text-[5rem] leading-[1.1]">Because extraordinary moments deserve extraordinary attire.</span>}
        text={<p>At Art Couture, we create gowns for the event and custom Art to preserve its memory. Let us be part of your most treasured celebrations, immortalizing your style through our dedicated artistic lens.</p>}
        imgSrc="/images/legacy.jpg"
        imgAlt="Art Couture bespoke gown for special occasions"
        reverse
      />

      <FeatureSection 
        subtitle="The Vision"
        title={<span className="block text-4xl md:text-5xl lg:text-[5rem] leading-[1.1]">At Art Couture, we create more than couture.</span>}
        text={<p>We create experiences that linger beyond the moment - gowns and art woven with memory, photography styled like cinema, each detail crafted to make you the heroine of your own story. What begins in beauty lives on as art, treasured forever.</p>}
        imgSrc="https://storage.googleapis.com/mixo-sites/images/file-7970ca9b-c546-4231-9c1b-836113ca438a.jpg"
        imgAlt="Art Couture private atelier evening experience"
      />

      <div id="news">
        <NewsEvents />
      </div>

      <div id="testimonials">
        <TestimonialSlider />
      </div>
      <div id="story">
        <StorySection />
      </div>
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
