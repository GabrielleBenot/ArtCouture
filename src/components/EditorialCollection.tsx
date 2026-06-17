"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DressModal } from "@/components/DressModal";

const collection = [
  { 
    title: "Fuchsia Majesty", 
    category: "Dresses",
    price: "$7,955", 
    description: "Bold silk satin with a thigh high slit and crystal detailing, crafted for commanding entrances.",
    fabric: "Draped from 100-momme Italian silk duchess satin, enriched with iridescent micro-crystals hand-embroidered over forty hours.",
    customization: "Custom-tailored to your exact silhouette. Available in an exclusive palette of jewel tones with bespoke slit lengths.",
    img: "https://storage.googleapis.com/mixo-sites/images/file-b1585176-4ab0-4441-9ca1-0979786596cd.jpg",
    detailImages: [
      "/details/new_fuchsia_bodice_1781676487560.png",
      "/details/new_fuchsia_texture_1781676497805.png",
      "/details/new_fuchsia_drape_1781676508356.png"
    ],
    aspectClass: "aspect-[3/4]"
  },
  { 
    title: "Blush Enchantress", 
    category: "Dresses",
    price: "$8,700", 
    description: "Layers of silk organza and petal appliqués, the embodiment of modern femininity.",
    fabric: "Hand-dyed rosewater silk organza floating weightlessly over cascading French Chantilly lace, adorned with 3D silk-chiffon floral appliqués.",
    customization: "Bodice structure and petal density are sculpted to your preference. Different colors of the fabric can be chosen (e.g., ivory, white, or light pink).",
    img: "https://storage.googleapis.com/mixo-sites/images/file-3a32d6f7-9d96-47e6-9e16-1d3e8c356fa3.jpg",
    detailImages: [
      "/details/new_blushench_bodice_1781676653156.png",
      "/details/new_blushench_texture_1781676675527.png",
      "/details/new_blushench_drape_1781676696150.png"
    ],
    aspectClass: "aspect-[2/3]"
  },
  { 
    title: "Golden Whisper", 
    category: "Dresses",
    price: "$9,200", 
    description: "Champagne tulle drenched in hand-set crystals, alive with light.",
    fabric: "Weightless illusion tulle meticulously encrusted with gold-leaf threading and thousands of Swarovski champagne crystals.",
    customization: "Train length and crystal density are entirely bespoke. Internal corsetry can be engineered for unparalleled structural support.",
    img: "https://storage.googleapis.com/mixo-sites/images/file-fbdb7417-d98d-4d96-99ed-20eb22b057ae.jpg",
    detailImages: [
      "/details/new_golden_bodice_1781676585562.png",
      "/details/new_golden_texture_1781676602641.png",
      "/details/new_golden_drape_1781676619023.png"
    ],
    aspectClass: "aspect-[3/4]"
  },
  { 
    title: "Crimson Allure", 
    category: "Dresses",
    price: "$7,980", 
    description: "Confidence, cut in silk. Sleek silk crepe with shimmering side panels, unapologetically bold.",
    fabric: "Heavy-weight double-faced silk crepe de chine that cascades like liquid fire, featuring ruby micro-sequin side panelling.",
    customization: "Neckline plunge and sequin gradient can be flawlessly tailored to the client's preference. Hardware finishes available in 24k gold or platinum.",
    img: "https://storage.googleapis.com/mixo-sites/images/file-efa8732c-2726-4513-9f7d-66e84a3ead12.jpg",
    detailImages: [
      "/details/new_crimson_bodice_1781676541872.png",
      "/details/new_crimson_texture_1781676555017.png",
      "/details/new_crimson_drape_1781676568248.png"
    ],
    aspectClass: "aspect-[4/5]"
  },
  { 
    title: "Midnight Elegance", 
    category: "Jackets",
    price: "$8,850", 
    description: "Where darkness whispers luxury. Deep navy velvet sculpted to perfection, draping with quiet power.",
    fabric: "Midnight blue silk-viscose pané velvet, extraordinarily soft and plush, catching the light like a starlit winter sky.",
    customization: "Backless plunge depth and sleeve length are bespoke. Choice of heavy silk charmeuse interior lining in contrasting jewel tones.",
    img: "https://storage.googleapis.com/mixo-sites/images/file-fd88942d-471c-4ef4-ac9b-1d4292999cb3.jpg",
    detailImages: [
      "/details/new_midnight_bodice_1781676446002.png",
      "/details/new_midnight_texture_1781676459211.png",
      "/details/new_midnight_drape_1781676475270.png"
    ],
    aspectClass: "aspect-[3/4]"
  },
  { 
    title: "Blush Couture", 
    category: "Accessories",
    price: "$11,700", 
    description: "The ultimate expression of our atelier. Layers of silk organza and petal appliqués.",
    fabric: "Ethereal ivory silk tulle intricately paired with hand-cut Guipure lace, falling into a voluminous, breathtaking architectural skirt.",
    customization: "Skirt volume completely adjustable via a masterful detachable crinoline. Different colors of the fabric can be chosen (e.g., ivory, white, or light pink).",
    img: "https://storage.googleapis.com/mixo-sites/images/file-e25b0f24-1bdb-4182-886e-58dd451f1664.jpg",
    detailImages: [
      "/details/new_blushcout_bodice_1781676712185.png",
      "/details/new_blushcout_texture_1781676722580.png",
      "/details/new_blushcout_drape_1781676734418.png"
    ],
    aspectClass: "aspect-[2/3]"
  },
];

export type DressItem = typeof collection[0];

function DressCard({ item, onClick }: { item: DressItem, onClick: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`relative overflow-hidden cursor-pointer group w-full ${item.aspectClass}`}
      onClick={onClick}
    >
      <div className="w-full h-full relative">
        {/* The Image with Vintage B&W Filter by default */}
        <motion.img 
          src={item.img} 
          alt={item.title}
          className="w-full h-full object-cover transition-all duration-[2s] group-hover:scale-110 grayscale contrast-125 sepia-[.2] group-hover:grayscale-0 group-hover:contrast-100 group-hover:sepia-0"
        />
        
        {/* Grainy Film Overlay that fades out on hover */}
        <div 
          className="absolute inset-0 opacity-40 group-hover:opacity-0 transition-opacity duration-1000 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

        {/* Subtle persistent overlay for title readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Elegant Partial Frame (Corner Brackets) */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 w-12 h-12 md:w-16 md:h-16 border-t-[0.5px] border-l-[0.5px] border-[var(--dada-red)]/70 z-10 pointer-events-none transition-all duration-700 group-hover:w-16 group-hover:h-16 md:group-hover:w-20 md:group-hover:h-20 group-hover:border-[var(--dada-red)] group-hover:-translate-x-1 group-hover:-translate-y-1" />
        <div className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 md:w-16 md:h-16 border-t-[0.5px] border-r-[0.5px] border-[var(--dada-red)]/70 z-10 pointer-events-none transition-all duration-700 group-hover:w-16 group-hover:h-16 md:group-hover:w-20 md:group-hover:h-20 group-hover:border-[var(--dada-red)] group-hover:translate-x-1 group-hover:-translate-y-1" />
        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 w-12 h-12 md:w-16 md:h-16 border-b-[0.5px] border-l-[0.5px] border-[var(--dada-red)]/70 z-10 pointer-events-none transition-all duration-700 group-hover:w-16 group-hover:h-16 md:group-hover:w-20 md:group-hover:h-20 group-hover:border-[var(--dada-red)] group-hover:-translate-x-1 group-hover:translate-y-1" />
        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-16 md:h-16 border-b-[0.5px] border-r-[0.5px] border-[var(--dada-red)]/70 z-10 pointer-events-none transition-all duration-700 group-hover:w-16 group-hover:h-16 md:group-hover:w-20 md:group-hover:h-20 group-hover:border-[var(--dada-red)] group-hover:translate-x-1 group-hover:translate-y-1" />

        <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 z-20">
          <h3 className="text-3xl md:text-4xl font-serif text-white tracking-wide drop-shadow-lg transform group-hover:-translate-y-2 transition-transform duration-500">
            {item.title}
          </h3>
          <p className="font-mono text-xs text-white/70 uppercase tracking-widest mt-3 flex items-center gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
            <span>Discover</span>
            <span className="w-6 h-[1px] bg-white/70 inline-block"></span>
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function EditorialCollection() {
  const [selectedDress, setSelectedDress] = useState<DressItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(collection.map(item => item.category)))];

  const filteredCollection = activeCategory === "All" 
    ? collection 
    : collection.filter(item => item.category === activeCategory);

  // Split into 3 columns for Masonry layout
  const col1 = filteredCollection.filter((_, i) => i % 3 === 0);
  const col2 = filteredCollection.filter((_, i) => i % 3 === 1);
  const col3 = filteredCollection.filter((_, i) => i % 3 === 2);

  useEffect(() => {
    if (selectedDress) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedDress]);

  return (
    <section className="bg-[var(--background)] py-32 md:py-48 relative min-h-[100vh]">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-serif text-[var(--text-main)] mb-6">The Collection</h2>
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--text-muted)]">Select an exquisite piece to reveal its story</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-24">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono text-xs uppercase tracking-[0.2em] pb-2 border-b-2 transition-all duration-300 ${
                activeCategory === cat 
                  ? "border-[var(--dada-red)] text-[var(--text-main)] font-bold" 
                  : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 transition-all duration-500">
          {/* Column 1 */}
          <div className="flex flex-col gap-8 lg:gap-12 md:w-1/3">
            {col1.map((item, idx) => (
              <DressCard key={item.title + idx} item={item} onClick={() => setSelectedDress(item)} />
            ))}
          </div>
          
          {/* Column 2 - Offset visually */}
          <div className="flex flex-col gap-8 lg:gap-12 md:w-1/3 md:pt-32">
            {col2.map((item, idx) => (
              <DressCard key={item.title + idx} item={item} onClick={() => setSelectedDress(item)} />
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-8 lg:gap-12 md:w-1/3">
            {col3.map((item, idx) => (
              <DressCard key={item.title + idx} item={item} onClick={() => setSelectedDress(item)} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedDress && (
          <DressModal 
            dress={selectedDress} 
            onClose={() => setSelectedDress(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
