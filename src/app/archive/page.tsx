"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";

interface SwatchItem {
  id: string;
  title: string;
  origin: string;
  type: string;
  story: string;
  image: string;
  gowns: string[];
}

const swatches: SwatchItem[] = [
  {
    id: "silk-satin",
    title: "Silk Satin",
    origin: "Como, Italy",
    type: "Lustrous double-faced satin",
    story: "Woven in heritage silk mills along the shores of Lake Como. This exceptionally heavy silk satin possesses a liquid-like drape and an intense, shimmering luster. It serves as the primary structural canvas for our high-slit silhouettes, offering unmatched drama and architectural posture.",
    image: "/images/archive/silk_satin.png",
    gowns: ["Fuchsia Majesty", "Crimson Allure"],
  },
  {
    id: "chantilly-lace",
    title: "French Chantilly Lace",
    origin: "Calais, France",
    type: "Fine cordonnet lace",
    story: "Sourced from the historic lacemakers of Calais, France. This Chantilly lace features delicate floral motifs defined by a fine cordonnet outline thread, woven on antique 19th-century Leavers looms. Hand-cut and appliqued motif-by-motif to mold seamlessly to the bodice.",
    image: "/images/archive/chantilly_lace.png",
    gowns: ["Blush Enchantress", "Blush Couture"],
  },
  {
    id: "esprit-tulle",
    title: "Point d'Esprit Tulle",
    origin: "Lyon, France",
    type: "Swiss-dot illusion tulle",
    story: "An airy, delicate hexagonal mesh with a classic woven dot motif, crafted on traditional tulle looms in Lyon, France. This misty material provides the delicate volume and translucent layering required for our most romantic skirts, catching the light like soft haze.",
    image: "/images/archive/esprit_tulle.png",
    gowns: ["Blush Enchantress", "Golden Whisper"],
  },
  {
    id: "crystal-beading",
    title: "Swarovski Crystal Beading",
    origin: "Wattens, Austria",
    type: "Hand-set crystals and micro-beading",
    story: "Individually selected crystal elements, hand-sewn onto delicate silk backing at our atelier. Embellished with Austrian glass beads and metallic threads to create an intricate, shimmering structure that mimics organic, cascading stardust.",
    image: "/images/archive/crystal_beading.png",
    gowns: ["Fuchsia Majesty", "Golden Whisper"],
  },
  {
    id: "midnight-velvet",
    title: "Midnight Velvet",
    origin: "Lyon, France",
    type: "Silk-viscose pane velvet",
    story: "Crafted in Lyon, France. This deep navy velvet features an extraordinarily dense, hand-brushed pile. It is designed to capture and absorb light, creating intense shadows and fluid midnight-blue gradients that emphasize form and sculpted shoulders.",
    image: "/images/archive/midnight_velvet.png",
    gowns: ["Midnight Elegance", "Velvet Veil"],
  },
  {
    id: "chiffon-petals",
    title: "3D Chiffon Petals",
    origin: "Atelier Handcrafted",
    type: "Hand-molded silk florals",
    story: "Created completely in-house. Each individual petal is hand-cut from silk organza and chiffon, hand-dyed in soft rosewater hues, and flame-edged to capture natural curls. The petals are then layered and stitched to form a blossom texture.",
    image: "/images/archive/chiffon_petals.png",
    gowns: ["Blush Couture"],
  },
  {
    id: "luneville-embroidery",
    title: "Luneville Hook Embroidery",
    origin: "Atelier Handcrafted",
    type: "Tambour frame hand-embroidery",
    story: "A masterclass in historic tambour work. Applied using a specialized hook on a stretched silk tulle frame, this technique stitches beads and silk threads from the reverse side. This process ensures high tension and flawless placement for complex details.",
    image: "/images/archive/luneville_embroidery.png",
    gowns: ["Pearl Symphony", "Lace Romance"],
  },
  {
    id: "gold-leaf-thread",
    title: "Gold Leaf Threading",
    origin: "Kyoto, Japan",
    type: "24k gold leaf-wrapped silk thread",
    story: "Precious gold leaf is beaten to sub-micron thinness, applied onto washi paper, and sliced into microscopic ribbons. These gold ribbons are then hand-wrapped around pure silk cores in Kyoto, creating a metallic thread that catches light with warmth.",
    image: "/images/archive/gold_threading.png",
    gowns: ["Golden Whisper", "Tweed Illusion"],
  },
  {
    id: "crocodile-leather",
    title: "Niloticus Crocodile Leather",
    origin: "Harare, Zimbabwe",
    type: "Premium hand-glazed matte leather",
    story: "Hand-selected exotic leather of exceptional symmetry. Glazed using natural agate stone to achieve a refined matte-satin texture, this material is tailored for structured accessories, lined with midnight silk charmeuse and bound by platinum hardware.",
    image: "/images/archive/crocodile_leather.png",
    gowns: ["Obsidian Clutch"],
  },
];

export default function ArchivePage() {
  const [selectedSwatch, setSelectedSwatch] = useState<SwatchItem | null>(null);
  const [backUrl, setBackUrl] = useState("/lookbook");

  useEffect(() => {
    document.title = "Atelier Archive | Art Couture";
    if (typeof window !== "undefined") {
      sessionStorage.setItem("ATELIER_ENTERED", "true");
      
      const params = new URLSearchParams(window.location.search);
      const from = params.get("from");
      const item = params.get("item");
      if (from === "lookbook" && item) {
        setBackUrl(`/lookbook#${item}`);
      } else {
        // Fallback: check sessionStorage
        const storedTarget = sessionStorage.getItem("lookbook_back_target");
        if (storedTarget) {
          setBackUrl(storedTarget);
        }
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[var(--dada-red)] selection:text-white pb-24 relative">
      <Header />

      {/* Back button to Lookbook */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 -mb-24">
        <a
          href={backUrl}
          className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors group cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="transform group-hover:-translate-x-1 transition-transform"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Lookbook
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative pt-36 pb-12 px-6 md:px-12 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--dada-red)] mb-4 block">
            The Atelier Library
          </span>
          <h1 className="font-serif font-thin text-4xl md:text-5xl lg:text-6xl tracking-[0.1em] uppercase mb-6 leading-tight">
            Atelier Archive
          </h1>
          <div className="w-12 h-[1px] bg-white/20 mx-auto mb-6" />
          <p className="font-serif italic text-sm md:text-base text-white/60 leading-relaxed">
            A tactile library of our signature luxury materials, heritage laces, and hand-embroidered textiles. Click on any swatch to discover its origin, craft, and story.
          </p>
        </motion.div>
      </section>

      {/* Grid Section */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto py-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {swatches.map((swatch) => (
            <motion.div
              key={swatch.id}
              className="group cursor-pointer bg-neutral-950 border border-white/5 hover:border-white/15 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col h-full"
              onClick={() => setSelectedSwatch(swatch)}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-900 relative">
                <img
                  src={swatch.image}
                  alt={swatch.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Custom Vignette overlay */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.85)] z-10" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--dada-red)] mb-2 block">
                    {swatch.origin}
                  </span>
                  <h3 className="font-serif font-light text-xl tracking-wide text-white/90 group-hover:text-white transition-colors duration-300 mb-1">
                    {swatch.title}
                  </h3>
                  <p className="font-serif italic text-xs text-white/40 mb-4">
                    {swatch.type}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40 group-hover:text-[var(--dada-red)] transition-colors duration-300">
                    Read Heritage Story
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-white/30 transform translate-x-0 group-hover:translate-x-1 group-hover:text-[var(--dada-red)] transition-all duration-300"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Swatch Detail Modal Lightbox */}
      <AnimatePresence>
        {selectedSwatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedSwatch(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-neutral-950 border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto md:overflow-visible flex flex-col md:flex-row relative shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-10 text-white/60 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-2 transition-all cursor-pointer"
                onClick={() => setSelectedSwatch(null)}
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Modal Left Image */}
              <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:min-h-[450px] relative bg-neutral-900">
                <img
                  src={selectedSwatch.image}
                  alt={selectedSwatch.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/65 via-black/10 to-transparent" />
              </div>

              {/* Modal Right Content */}
              <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--dada-red)] mb-2 block">
                    Origin: {selectedSwatch.origin}
                  </span>
                  <h2 className="font-serif font-light text-3xl tracking-wide text-white mb-2">
                    {selectedSwatch.title}
                  </h2>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/45 mb-6 block border-b border-white/5 pb-4">
                    {selectedSwatch.type}
                  </span>
                  <p className="font-serif italic text-sm text-white/70 leading-relaxed mb-8">
                    {selectedSwatch.story}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end">
                  <button
                    onClick={() => setSelectedSwatch(null)}
                    className="w-full md:w-auto font-mono text-[10px] uppercase tracking-[0.2em] bg-white/5 hover:bg-white/10 text-white/80 hover:text-white px-6 py-3 rounded-lg border border-white/10 transition-all duration-300 text-center cursor-pointer"
                  >
                    Back to Menu
                  </button>
                </div>

                {/* Gowns Shortcuts - Hidden for now until more dresses are added */}
                {/* 
                <div>
                  <h4 className="font-mono text-[9px] uppercase tracking-widest text-white/40 mb-3">
                    Featured in Gowns
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSwatch.gowns.map((gown) => (
                      <a
                        key={gown}
                        href={`/?dress=${encodeURIComponent(gown)}#collections`}
                        className="font-mono text-[10px] uppercase tracking-widest bg-white/5 hover:bg-[var(--dada-red)] border border-white/10 hover:border-transparent text-white/80 hover:text-white px-3 py-1.5 rounded-full transition-all duration-300"
                      >
                        {gown} &rarr;
                      </a>
                    ))}
                  </div>
                </div>
                */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
