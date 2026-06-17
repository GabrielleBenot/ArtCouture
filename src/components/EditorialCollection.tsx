"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DressModal } from "@/components/DressModal";

const collection = [
  { 
    title: "Fuchsia Majesty", 
    price: "$7,955", 
    description: "Bold silk satin with a thigh high slit and crystal detailing, crafted for commanding entrances.",
    fabric: "Draped from 100-momme Italian silk duchess satin, enriched with iridescent micro-crystals hand-embroidered over forty hours.",
    customization: "Custom-tailored to your exact silhouette. Available in an exclusive palette of jewel tones with bespoke slit lengths.",
    img: "https://storage.googleapis.com/mixo-sites/images/file-b1585176-4ab0-4441-9ca1-0979786596cd.jpg",
    aspectClass: "aspect-[3/4]"
  },
  { 
    title: "Blush Enchantress", 
    price: "$8,700", 
    description: "Layers of silk organza and petal appliqués, the embodiment of modern femininity.",
    fabric: "Hand-dyed rosewater silk organza floating weightlessly over cascading French Chantilly lace, adorned with 3D silk-chiffon floral appliqués.",
    customization: "Bodice structure and petal density are sculpted to your preference. Color matching available upon private consultation.",
    img: "https://storage.googleapis.com/mixo-sites/images/file-3a32d6f7-9d96-47e6-9e16-1d3e8c356fa3.jpg",
    aspectClass: "aspect-[2/3]"
  },
  { 
    title: "Golden Whisper", 
    price: "$9,200", 
    description: "Champagne tulle drenched in hand-set crystals, alive with light.",
    fabric: "Weightless illusion tulle meticulously encrusted with gold-leaf threading and thousands of Swarovski champagne crystals.",
    customization: "Train length and crystal density are entirely bespoke. Internal corsetry can be engineered for unparalleled structural support.",
    img: "https://storage.googleapis.com/mixo-sites/images/file-fbdb7417-d98d-4d96-99ed-20eb22b057ae.jpg",
    aspectClass: "aspect-[3/4]"
  },
  { 
    title: "Crimson Allure", 
    price: "$7,980", 
    description: "Confidence, cut in silk. Sleek silk crepe with shimmering side panels, unapologetically bold.",
    fabric: "Heavy-weight double-faced silk crepe de chine that cascades like liquid fire, featuring ruby micro-sequin side panelling.",
    customization: "Neckline plunge and sequin gradient can be flawlessly tailored to the client's preference. Hardware finishes available in 24k gold or platinum.",
    img: "https://storage.googleapis.com/mixo-sites/images/file-efa8732c-2726-4513-9f7d-66e84a3ead12.jpg",
    aspectClass: "aspect-[4/5]"
  },
  { 
    title: "Midnight Elegance", 
    price: "$8,850", 
    description: "Where darkness whispers luxury. Deep navy velvet sculpted to perfection, draping with quiet power.",
    fabric: "Midnight blue silk-viscose pané velvet, extraordinarily soft and plush, catching the light like a starlit winter sky.",
    customization: "Backless plunge depth and sleeve length are bespoke. Choice of heavy silk charmeuse interior lining in contrasting jewel tones.",
    img: "https://storage.googleapis.com/mixo-sites/images/file-fd88942d-471c-4ef4-ac9b-1d4292999cb3.jpg",
    aspectClass: "aspect-[3/4]"
  },
  { 
    title: "Blush Couture", 
    price: "$11,700", 
    description: "The ultimate expression of our atelier. Layers of silk organza and petal appliqués.",
    fabric: "Ethereal ivory silk tulle intricately paired with hand-cut Guipure lace, falling into a voluminous, breathtaking architectural skirt.",
    customization: "Skirt volume completely adjustable via a masterful detachable crinoline. Veil customization offered to perfectly match the lace motif.",
    img: "https://storage.googleapis.com/mixo-sites/images/file-e25b0f24-1bdb-4182-886e-58dd451f1664.jpg",
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
        <motion.img 
          src={item.img} 
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
        />
        
        {/* Subtle persistent overlay for title readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 z-10">
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
    <section className="bg-[var(--background)] py-32 md:py-48 relative">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <div className="text-center mb-24 md:mb-32">
          <h2 className="text-5xl md:text-7xl font-serif text-[var(--text-main)] mb-6">The Collection</h2>
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--text-muted)]">Select an exquisite piece to reveal its story</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Column 1 */}
          <div className="flex flex-col gap-8 lg:gap-12 md:w-1/3">
            <DressCard item={collection[0]} onClick={() => setSelectedDress(collection[0])} />
            <DressCard item={collection[3]} onClick={() => setSelectedDress(collection[3])} />
          </div>
          
          {/* Column 2 - Offset */}
          <div className="flex flex-col gap-8 lg:gap-12 md:w-1/3 md:pt-32">
            <DressCard item={collection[1]} onClick={() => setSelectedDress(collection[1])} />
            <DressCard item={collection[4]} onClick={() => setSelectedDress(collection[4])} />
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-8 lg:gap-12 md:w-1/3">
            <DressCard item={collection[2]} onClick={() => setSelectedDress(collection[2])} />
            <DressCard item={collection[5]} onClick={() => setSelectedDress(collection[5])} />
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
