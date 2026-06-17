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
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { TheEdgeCampaign } from "@/components/TheEdgeCampaign";
import { Logo } from "@/components/Logo";
import { motion } from "framer-motion";

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

// Parallax Image Component for sections
function ParallaxImage({ src, alt }: { src: string, alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Subtly move the image vertically while noticeably shrinking it to create depth
  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 0.85]);

  return (
    <div ref={ref} className="w-full relative flex justify-center items-center perspective-1000">
      <motion.img 
        style={{ y, scale }} 
        src={src} 
        alt={alt} 
        className="max-w-[90%] md:max-w-[85%] max-h-[85vh] w-auto h-auto object-contain drop-shadow-2xl rounded-sm"
      />
    </div>
  );
}

// Layout helper for sections
function FeatureSection({ 
  id,
  title, 
  text, 
  imgSrc, 
  reverse = false,
  subtitle
}: { 
  id?: string,
  title?: React.ReactNode, 
  text?: React.ReactNode, 
  imgSrc: string, 
  reverse?: boolean,
  subtitle?: string
}) {
  return (
    <section id={id} className="py-16 md:py-24 px-6 max-w-[90rem] mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
      {!reverse ? (
        <>
          <div className="flex-1 space-y-6 lg:pr-12">
            {subtitle && (
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="block font-mono text-xs uppercase tracking-[0.3em] text-[var(--dada-red)]"
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
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--text-main)] leading-[1.1]"
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
                className="text-lg md:text-xl text-[var(--text-muted)] font-serif leading-relaxed"
              >
                {text}
              </motion.div>
            )}
          </div>
          <div className="flex-[1.2] w-full">
            <ParallaxImage src={imgSrc} alt="Art Couture Gallery" />
          </div>
        </>
      ) : (
        <>
          <div className="flex-[1.2] w-full order-2 md:order-1">
            <ParallaxImage src={imgSrc} alt="Art Couture Gallery" />
          </div>
          <div className="flex-1 space-y-6 lg:pl-12 order-1 md:order-2">
            {subtitle && (
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="block font-mono text-xs uppercase tracking-[0.3em] text-[var(--dada-red)]"
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
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--text-main)] leading-[1.1]"
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
                className="text-lg md:text-xl text-[var(--text-muted)] font-serif leading-relaxed"
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
            <span className="font-sans text-2xl md:text-3xl font-black uppercase tracking-tighter">Color is</span>
            <span className="font-serif italic text-6xl md:text-8xl text-[var(--dada-red)] -mt-2 md:-mt-4">Power.</span>
            <span className="font-serif text-3xl md:text-4xl mt-4 tracking-tight">Wear it without apology.</span>
          </span>
        }
        text={<p>In Art Couture, color is not an accent, it's a declaration. Fearless, unapologetic, and unforgettable. The palette we choose defines the space we occupy, drawing inspiration from high-voltage modern art and timeless classical silhouettes. When you step into the room, the world should pause.</p>}
        imgSrc="https://storage.googleapis.com/mixo-sites/images/file-0ae10f15-2ee8-43af-885e-16f4bbe10af4.png"
      />

      <FeatureSection 
        subtitle="The Technique"
        title={
          <span className="flex flex-col">
            <span className="font-serif text-4xl md:text-5xl">Patterns designed from the</span>
            <span className="font-sans font-black text-5xl md:text-7xl uppercase tracking-tighter mt-2 text-[var(--dada-red)]">Art we create.</span>
          </span>
        }
        text={<p>Behind every dress lies a canvas. At Art Couture, we design our own patterns, born from the colors we love and the artworks we create. Each yard of fabric is meticulously crafted, ensuring the brushstrokes of our paintings seamlessly map to the curves of the couture. This is wearable fine art.</p>}
        imgSrc="https://storage.googleapis.com/mixo-sites/images/file-5f0d0213-9b29-4c2c-b415-54c0f9fb6235.jpg"
        reverse
      />

      <FeatureSection 
        subtitle="The Aesthetic"
        title={
          <span className="flex flex-col">
            <span className="font-sans font-black text-6xl md:text-8xl uppercase tracking-tighter">Bold</span>
            <span className="font-serif italic text-4xl md:text-6xl text-[var(--dada-red)] -mt-4 ml-8">Patterns,</span>
            <span className="font-serif text-4xl md:text-5xl mt-2">Striking Silhouettes.</span>
          </span>
        }
        text={<p>Visual rhythm is essential to our design language. We take pride in geometric complexity, organic flow, and daring contrast. Our patterns do not merely sit on the fabric - they actively converse with the silhouette, creating garments that are visually arresting from every angle.</p>}
        imgSrc="https://storage.googleapis.com/mixo-sites/images/file-afe1558e-67b6-483d-a49a-82317121d155.jpg"
      />

      <FeatureSection 
        subtitle="The Studio"
        title={
          <span className="flex flex-col">
            <span className="font-serif text-3xl md:text-4xl">This is where design and art</span>
            <span className="font-sans font-black text-5xl md:text-7xl uppercase tracking-tighter mt-2">Breathe the</span>
            <span className="font-serif italic text-5xl md:text-7xl text-[var(--dada-red)] -mt-2">same air.</span>
          </span>
        }
        text={<p>The atelier is a sanctuary of imagination. Surrounded by canvases, oil paints, drafting tables, and bolts of silk, our creative directors blend two distinct disciplines into a singular vision. Here, an idea can start as a charcoal sketch and finish as a breathtaking gala gown.</p>}
        imgSrc="https://storage.googleapis.com/mixo-sites/images/file-4b000517-aa66-445e-8e2e-89c2d295dc73.png"
        reverse
      />

      <FeatureSection 
        subtitle="The Inspiration"
        title={
          <span className="flex flex-col">
            <span className="font-sans font-black text-4xl md:text-5xl uppercase tracking-tight">Explore the Art</span>
            <span className="font-serif text-3xl md:text-4xl mt-2">That Inspires</span>
            <span className="font-serif italic text-6xl md:text-8xl text-[var(--dada-red)] -mt-2">Couture</span>
          </span>
        }
        text={<p>From canvas to closet, every piece by Gabrielle Benot is born from the same obsession with beauty, color, and style. The textures found in her original paintings dictate the hand of the fabrics chosen for our collections, creating a dialogue between the gallery wall and the runway.</p>}
        imgSrc="https://storage.googleapis.com/mixo-sites/images/file-7c7c79ac-f9d7-4fe7-bcd1-7d29e0eae366.png"
      />

      <FeatureSection 
        subtitle="The Process"
        title={
          <span className="flex flex-col">
            <span className="font-serif text-4xl md:text-5xl">A meticulous</span>
            <span className="font-sans font-black text-5xl md:text-7xl uppercase tracking-tighter mt-1 text-[var(--dada-red)]">Dedication</span>
            <span className="font-serif italic text-4xl md:text-6xl -mt-2">to craft.</span>
          </span>
        }
        text={<p>Hours of hand-beading, precise pattern cutting, and visionary draping go into every Art Couture creation. We believe that true luxury cannot be rushed. It is felt in the weight of the silk, the structure of the corset, and the flawless finish of every hidden seam.</p>}
        imgSrc="https://storage.googleapis.com/mixo-sites/images/file-fa8b3115-7c86-48e7-882f-3ba57f6aeb6f.jpg"
        reverse
      />

      <FeatureSection 
        subtitle="The Promise"
        title={
          <span className="flex flex-col">
            <span className="font-sans font-black text-5xl md:text-7xl uppercase tracking-tighter">Gowns</span>
            <span className="font-serif text-3xl md:text-4xl mt-2">as rare as the</span>
            <span className="font-serif italic text-5xl md:text-7xl text-[var(--dada-red)] mt-1">Women who wear them.</span>
          </span>
        }
        text={<p>Born from the artistic vision of Gabrielle Benot and the couture craftsmanship of Charmaigne Menn, "Gabi et Char" redefines eveningwear for the modern icon. Each gown in this collection is a symphony of rare fabrics: silk satin, hand-embroidered tulle, velvet that drinks in the light, crafted to embrace the body with precision and grace.</p>}
        imgSrc="https://storage.googleapis.com/mixo-sites/images/file-1f3f0688-6519-43dd-b5ad-a14a0457a21b.jpg"
      />

      <div id="collections">
        <EditorialCollection />
      </div>
      <CatwalkVideo />

      <div className="py-12" />

      <FeatureSection 
        subtitle="The Detail"
        title={
          <span className="flex flex-col">
            <span className="font-sans font-black text-6xl md:text-8xl uppercase tracking-tighter">Luxury</span>
            <span className="font-serif text-3xl md:text-4xl mt-2">is in the details</span>
            <span className="font-serif italic text-5xl md:text-7xl text-[var(--dada-red)] mt-1">You can feel.</span>
          </span>
        }
        text={<p>From sculptural neoprene to hand-cut French lace appliqué, sheer silk tulle, and richly embroidered jacquard, each collection explores fabric as both canvas and form. We source our textiles from the most prestigious mills, ensuring that every touch is an experience in pure extravagance.</p>}
        imgSrc="https://storage.googleapis.com/mixo-sites/images/file-cc047f31-f82c-4c0d-84c9-4ce6f1ef5713.jpg"
      />

      <FeatureSection 
        subtitle="The Experience"
        title={
          <span className="flex flex-col">
            <span className="font-serif text-4xl md:text-5xl">Turning</span>
            <span className="font-sans font-black text-5xl md:text-7xl uppercase tracking-tighter mt-2 text-[var(--dada-red)]">Moments</span>
            <span className="font-serif italic text-4xl md:text-6xl -mt-1">into Masterpieces.</span>
          </span>
        }
        text={
          <>
            <p className="mb-4">We offer bespoke photography sessions that capture you in couture elegance, styled with the precision of a fashion editorial. Our creative team directs every pose and curates the lighting to flatter perfectly.</p>
            <p className="text-[var(--dada-red)] font-bold">Each image can be transformed into a one-of-a-kind fine art piece, ensuring your moment lives on as both a photograph and a masterpiece.</p>
          </>
        }
        imgSrc="https://storage.googleapis.com/mixo-sites/images/file-0e7d90e6-d13a-428b-ac7d-24701f9e4c31.jpg"
        reverse
      />

      <FeatureSection 
        subtitle="The Services"
        title="Photography and Rentals."
        text={<p>Select Gabi et Char creations are available for rental, and we can also arrange full photography sessions. We give photographers, stylists, and creative teams exclusive access to couture elegance for unforgettable editorial shoots, red carpets, and high-profile events.</p>}
        imgSrc="https://storage.googleapis.com/mixo-sites/images/file-9bbde46c-8be5-4e87-95fa-5b155120828f.jpg"
      />

      <FeatureSection 
        subtitle="The Legacy"
        title={<span className="text-[var(--dada-red)]">Because extraordinary moments deserve extraordinary attire.</span>}
        text={<p>At Art Couture, we create gowns for the event and custom Art to preserve its memory. Let us be part of your most treasured celebrations, immortalizing your style through our dedicated artistic lens.</p>}
        imgSrc="https://storage.googleapis.com/mixo-sites/images/file-9472415d-e1c1-4321-b3d7-ab4da4fe3317.PNG"
        reverse
      />

      <FeatureSection 
        subtitle="The Vision"
        title="At Art Couture, we create more than couture."
        text={<p>We create experiences that linger beyond the moment - gowns and art woven with memory, photography styled like cinema, each detail crafted to make you the heroine of your own story. What begins in beauty lives on as art, treasured forever.</p>}
        imgSrc="https://storage.googleapis.com/mixo-sites/images/file-7970ca9b-c546-4231-9c1b-836113ca438a.jpg"
      />

      <FeatureSection 
        subtitle="The Future"
        title="Coming Soon - Silk Painting at Art Couture"
        text={
          <>
            <p className="mb-4">Step into the world of pure artistry with our upcoming, invitation-only silk painting workshops. Guided by master techniques and infused with Art Couture’s signature elegance, you’ll explore the centuries-old process of transforming silk into luminous works of wearable art.</p>
            <p className="mb-4">Spaces will be strictly limited, ensuring an intimate, hands-on experience where every brushstroke is yours to keep. You will leave not just with a garment, but with a piece of art you painted yourself.</p>
            <p className="font-bold text-[var(--dada-red)] uppercase tracking-widest text-sm">Stay tuned - this is where creativity meets couture.</p>
          </>
        }
        imgSrc="https://storage.googleapis.com/mixo-sites/images/file-77426bbf-6aac-41f4-8c9f-16b8a9375343.PNG"
        reverse
      />

      <TestimonialSlider />
      <div id="story">
        <StorySection />
      </div>
      <div id="faq">
        <FAQAccordion />
      </div>
      <TheEdgeCampaign />
      <NewsletterCTA />

      <footer id="contact" className="py-20 bg-[var(--background)] border-t border-[var(--border-light)] text-center relative overflow-hidden">
        <p className="font-mono text-xs tracking-widest text-[var(--foreground)] opacity-60 mb-2 uppercase relative z-10">1010 Pearl St, Ste A, La Jolla, CA 92037</p>
        <button 
          onClick={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText('info@artcouture.studio');
            const target = e.currentTarget;
            const originalText = target.innerText;
            target.innerText = 'COPIED!';
            setTimeout(() => {
              target.innerText = 'INFO@ARTCOUTURE.STUDIO';
            }, 2000);
          }}
          className="font-mono text-xs tracking-widest text-[var(--foreground)] opacity-60 mb-12 uppercase relative z-10 hover:opacity-100 hover:text-[var(--dada-red)] transition-all duration-300 inline-block cursor-pointer"
        >
          info@artcouture.studio
        </button>
        <p className="text-[10px] text-[var(--foreground)] opacity-40 uppercase tracking-[0.2em] relative z-10">© {new Date().getFullYear()} Art Couture. All rights reserved.</p>
      </footer>
    </main>
  );
}
