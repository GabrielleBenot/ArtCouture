"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";

interface LookbookItem {
  id: string;
  title: string;
  price: string;
  inspiration: string;
  paintingImg: string;
  gownImg: string;
  story: string;
  craft: string;
}

const lookbookItems: LookbookItem[] = [
  {
    id: "fuchsia-majesty",
    title: "Fuchsia Majesty",
    price: "$7,955",
    inspiration: "Vivid Majesty",
    paintingImg: "/images/paintings/dress_from_colorful_face.jpg",
    gownImg: "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Ff5720508-8148-4bd3-ab0f-2b8612f15cda?alt=media&token=7be40366-58e3-4eb1-91c8-f24d29299550",
    story: "Born from a high-expressionist portrait of textured face paint. Fuchsia Majesty translates energetic palette knife strokes into heavy silk satin panels. Hand-applied Swarovski crystal lines cascade along the daring thigh-high slit, reflecting the raw confidence and artistic spirit of the original painting.",
    craft: "Features hand-applied Swarovski crystal and Austrian glass micro-bead embroidery along the leg line, individually sewn over forty-five hours in our atelier.",
  },
  {
    id: "blush-enchantress",
    title: "Blush Enchantress",
    price: "$8,700",
    inspiration: "Ethereal Whisper",
    paintingImg: "/images/paintings/brunette_yellow_painting.jpg",
    gownImg: "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F2f7c3f0f-2025-4098-86e5-76e1b21fe5e4?alt=media&token=b174088f-754a-49ef-8d45-ffe114715f60",
    story: "A study in romantic classicism, inspired by a soft portrait featuring warm, layered oil glazes. The gown merges high-neck French Chantilly lace sleeves with cascading layers of ivory silk tulle, capturing the same glowing, dreamlike mood that radiates from Gabi's canvas.",
    craft: "Hand-pieced French lace bodice layered over Swiss-dot point d'esprit mesh, finished with a silk charmeuse lining and a custom sweep train.",
  },
  {
    id: "golden-whisper",
    title: "Golden Whisper",
    price: "$9,200",
    inspiration: "Golden Aura",
    paintingImg: "/images/paintings/dress_from_painting_2.jpg",
    gownImg: "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Fa233bbdb-25ac-47fe-b686-71493e2cc226?alt=media&token=447745e0-6fd4-4fe0-b328-63b25f3199e0",
    story: "An opulent gala gown inspired by abstract gold-leaf canvases. The piece captures shimmering light by using a sheer champagne mesh drenched in hand-applied Swarovski crystals and gold leaf threading. It is designed to move like liquid gold, catching the spotlight with dramatic warmth.",
    craft: "Involves over 5,000 individually set Swarovski crystals and Japanese gold-leaf threads woven on a structured, lightweight inner corset foundation.",
  },
  {
    id: "crimson-allure",
    title: "Crimson Allure",
    price: "$7,980",
    inspiration: "Liquid Fire",
    paintingImg: "/images/paintings/palazzo_inspired_dress.jpg",
    gownImg: "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F04669707-071a-432c-82e4-76b144da07e4?alt=media&token=87ed9797-099d-4c08-ad4e-bcac6cc65c4b",
    story: "A dramatic expression of pure color theory, inspired by vibrant, fiery canvases. Crimson Allure pairs structured, double-faced red silk crepe with shimmering side panels. The dress is designed to command attention at premier galas and prestigious red carpet moments.",
    craft: "Heavy double-faced silk crepe de chine bodice featuring hand-embroidered ruby micro-sequins with a gradient intensity for a flattering, elongated silhouette.",
  },
  {
    id: "midnight-elegance",
    title: "Midnight Elegance",
    price: "$8,850",
    inspiration: "Venetian Palace Shadows",
    paintingImg: "/images/paintings/italian_palazzo.jpg",
    gownImg: "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Ff4c8fe02-afaa-458f-b217-bc5a3a57ea00?alt=media&token=697ddc89-dcdd-432d-9e94-a4c759b5027e",
    story: "Inspired by late-night shadows across Venice palazzos. Midnight Elegance is a classic backless evening gown cut from deep navy silk-viscose pane velvet. The plush pile absorbs light dynamically, reflecting quiet, commanding luxury that stands out through sheer simplicity.",
    craft: "Plush brushed pile velvet draped to a body-contouring silhouette, fully lined with high-weight silk charmeuse and structured shoulder lines.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": "Art Couture Editorial Lookbook",
  "description": "A dialogue between fine art and haute couture. Our bespoke gowns, styled and captured in cinematic fashion spreads.",
  "publisher": {
    "@type": "Organization",
    "name": "Art Couture",
    "logo": "https://artcouture.studio/favicon.svg"
  },
  "association": lookbookItems.map((item) => ({
    "@type": "Product",
    "name": item.title,
    "image": item.gownImg,
    "description": item.story,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": item.price.replace(/[^0-9.]/g, ""),
      "availability": "https://schema.org/PreOrder"
    }
  }))
};

export default function LookbookPage() {
  useEffect(() => {
    document.title = "Editorial Lookbook: Bespoke Haute Couture | Art Couture";
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[var(--dada-red)] selection:text-white pb-32">
      <Header />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Cinematic Hero */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Background dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black z-10" />
        
        {/* Cinematic Background Image */}
        <img
          src="/images/intro_bg.jpg"
          alt="Art Couture Creative Studio Editorial Lookbook"
          className="absolute inset-0 w-full h-full object-cover opacity-30 transform scale-105"
        />

        <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-xs uppercase tracking-[0.4em] text-[var(--dada-red)] mb-4"
          >
            Creative Campaign
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-thin text-5xl md:text-7xl lg:text-8xl tracking-[0.12em] uppercase leading-tight mb-6"
          >
            Editorial <span className="italic block mt-2 md:inline md:mt-0 font-normal">Lookbook</span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-24 h-[1px] bg-white/20 mb-8"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="font-serif italic text-base md:text-lg text-white/50 max-w-xl leading-relaxed mb-12"
          >
            A visual dialogue between fine art and haute couture. Our bespoke gowns, styled and captured in cinematic fashion spreads.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1, repeat: Infinity, repeatType: "reverse" }}
            className="flex flex-col items-center gap-2 cursor-pointer opacity-40 hover:opacity-100 transition-opacity"
            onClick={() => {
              const el = document.getElementById("lookbook-start");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="font-mono text-[9px] uppercase tracking-widest">Scroll Down</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Lookbook Layout */}
      <section id="lookbook-start" className="pt-24 px-6 md:px-12 max-w-7xl mx-auto space-y-36">
        {lookbookItems.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <article
              key={item.id}
              className={`flex flex-col ${
                isEven ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-12 lg:gap-20 items-center`}
            >
              {/* Media Segment: Painting and Gown Side-By-Side */}
              <div className="w-full lg:w-1/2 flex flex-col sm:flex-row gap-6 relative">
                {/* 1. The Painting / Inspiration */}
                <div className="w-full sm:w-1/2 flex flex-col gap-2 group">
                  <div className="aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/5 rounded-lg relative">
                    <img
                      src={item.paintingImg}
                      alt={`Inspiration Painting for ${item.title}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/30 mt-1 block">
                    Inspiration: {item.inspiration}
                  </span>
                </div>

                {/* 2. The Final Gown */}
                <div className="w-full sm:w-1/2 flex flex-col gap-2 group">
                  <div className="aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/5 rounded-lg relative sm:translate-y-8 transition-transform duration-500">
                    <img
                      src={item.gownImg}
                      alt={`The completed ${item.title} haute couture gown`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/35 mt-1 sm:translate-y-8 block">
                    Bespoke Piece: {item.title}
                  </span>
                </div>
              </div>

              {/* Text Editorial Column */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <span className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--dada-red)] mb-3">
                  Edition {index + 1}
                </span>
                <h2 className="font-serif font-light text-4xl md:text-5xl tracking-wide uppercase mb-2">
                  {item.title}
                </h2>
                <div className="font-serif italic text-sm text-white/40 mb-6 flex items-center gap-4">
                  <span>Fine Art Edition</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <span>{item.price} Commission</span>
                </div>
                <div className="w-10 h-[1px] bg-white/20 mb-6" />
                <p className="font-serif italic text-base text-white/70 leading-relaxed mb-6">
                  {item.story}
                </p>
                <p className="font-sans text-xs text-white/50 leading-relaxed mb-10 pl-4 border-l border-white/10">
                  {item.craft}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <a
                    href={`/?dress=${encodeURIComponent(item.title)}#collections`}
                    className="font-mono text-[10px] uppercase tracking-[0.3em] bg-white text-black hover:bg-[var(--dada-red)] hover:text-white py-3 px-8 rounded-full transition-all duration-300 inline-block text-center"
                  >
                    Commission Look
                  </a>
                  <a
                    href="/archive"
                    className="font-mono text-[10px] uppercase tracking-[0.3em] border border-white/20 hover:border-white text-white py-3 px-8 rounded-full transition-all duration-300 inline-block text-center"
                  >
                    Explore Materials
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
