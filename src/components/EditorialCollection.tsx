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
    title: "Ethereal Mist", 
    category: "Dresses",
    price: "$8,500", 
    description: "A vision of floating tulle and delicate beadwork.",
    fabric: "Layers of silk tulle over a structured silk faille base.",
    customization: "Beadwork pattern can be personalized.",
    img: "https://images.unsplash.com/photo-1566162200408-2f56dc9f69b6?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[3/4]"
  },
  { 
    title: "Sapphire Dream", 
    category: "Dresses",
    price: "$11,000", 
    description: "Deep jewel tones meet masterful draping.",
    fabric: "Rich sapphire silk velvet with a silk satin lining.",
    customization: "Neckline can be altered to off-the-shoulder.",
    img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[2/3]"
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
  { 
    title: "Pearl Symphony", 
    category: "Accessories",
    price: "$4,200", 
    description: "Hand-strung freshwater pearls and diamond accents.",
    fabric: "18k white gold interwoven with South Sea pearls.",
    customization: "Available in rose gold and yellow gold finishes.",
    img: "https://images.unsplash.com/photo-1599643478524-fb66f7ca065b?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[3/4]"
  },
  { 
    title: "Obsidian Clutch", 
    category: "Accessories",
    price: "$5,500", 
    description: "Structured evening bag crafted from rare materials.",
    fabric: "Matte crocodile leather with platinum hardware.",
    customization: "Monogramming available on interior silk lining.",
    img: "https://images.unsplash.com/photo-1584395442286-d62152862d29?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[4/5]"
  },
  { 
    title: "Crystal Steps", 
    category: "Accessories",
    price: "$2,800", 
    description: "The glass slipper reimagined for the modern muse.",
    fabric: "Lucite heel with Swarovski crystal-encrusted straps.",
    customization: "Heel height adjustable between 85mm and 110mm.",
    img: "https://images.unsplash.com/photo-1576182103429-0158dfa64010?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[3/4]"
  },
  { 
    title: "Golden Hour", 
    category: "Accessories",
    price: "$3,100", 
    description: "A breathtaking statement piece that catches every ray of light.",
    fabric: "24k gold-plated brass and smoked topaz crystals.",
    customization: "Available in silver and rose gold.",
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[2/3]"
  },
  { 
    title: "Velvet Veil", 
    category: "Accessories",
    price: "$1,500", 
    description: "A dramatic finishing touch to any couture ensemble.",
    fabric: "Silk velvet and hand-woven netting.",
    customization: "Embroidery options for the netting.",
    img: "https://images.unsplash.com/photo-1509631179647-0c1158b0f443?w=800&q=80",
    detailImages: [],
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
    title: "Noir Power", 
    category: "Jackets",
    price: "$7,200", 
    description: "A commanding tailored blazer with exaggerated lapels.",
    fabric: "Heavy Italian wool crepe with silk lapels.",
    customization: "Shoulder pad structure and button materials can be customized.",
    img: "/collections/jacket_two.png",
    detailImages: [],
    aspectClass: "aspect-[2/3]"
  },
  { 
    title: "Ivory Architecture", 
    category: "Jackets",
    price: "$9,100", 
    description: "Structured double-breasted coat that redefines shape.",
    fabric: "Cashmere-blend woven in Scotland.",
    customization: "Lining features hand-painted silk motifs.",
    img: "https://images.unsplash.com/photo-1550639525-c97d455acf70?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[3/4]"
  },
  { 
    title: "Crimson Drape", 
    category: "Jackets",
    price: "$6,500", 
    description: "A fluid trench coat that moves like liquid.",
    fabric: "Water-resistant silk gabardine.",
    customization: "Belt thickness and buckle material are bespoke.",
    img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[4/5]"
  },
  { 
    title: "Onyx Edge", 
    category: "Jackets",
    price: "$8,200", 
    description: "A sharp, minimalist coat with a dramatic collar.",
    fabric: "Heavy wool melton and silk satin.",
    customization: "Hidden interior pockets and monogramming.",
    img: "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[3/4]"
  },
  { 
    title: "Tweed Illusion", 
    category: "Jackets",
    price: "$7,800", 
    description: "A modern take on the classic tailored tweed.",
    fabric: "Hand-woven boucle with metallic threads.",
    customization: "Trim details and button choices are fully bespoke.",
    img: "https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[2/3]"
  },
  { 
    title: "Ivory Cascade", 
    category: "Blouses",
    price: "$3,400", 
    description: "A masterclass in modern draping. Pure silk crepe de chine blouse with dramatic sweeping ties.",
    fabric: "100% heavy silk crepe de chine from Como, Italy. Finished with mother-of-pearl button closures.",
    customization: "Tie length and sleeve volume can be adjusted. Available in Ivory, Obsidian, and Blush.",
    img: "https://storage.googleapis.com/mixo-sites/images/file-77426bbf-6aac-41f4-8c9f-16b8a9375343.PNG",
    detailImages: [
      "/details/new_blushcout_bodice_1781676712185.png",
      "/details/new_blushcout_texture_1781676722580.png",
      "/details/new_blushcout_drape_1781676734418.png"
    ],
    aspectClass: "aspect-[3/4]"
  },
  { 
    title: "Chiffon Whisper", 
    category: "Blouses",
    price: "$2,900", 
    description: "Sheer silk blouse with intricate pleating.",
    fabric: "French silk chiffon with Chantilly lace trims.",
    customization: "Cuff links available in pearl or diamond.",
    img: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[2/3]"
  },
  { 
    title: "Satin Armor", 
    category: "Blouses",
    price: "$3,800", 
    description: "High-neck silk blouse with strong shoulder structure.",
    fabric: "100-momme Italian silk satin.",
    customization: "Collar height and tie length are bespoke.",
    img: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[3/4]"
  },
  { 
    title: "Organza Cloud", 
    category: "Blouses",
    price: "$4,100", 
    description: "Voluminous sleeves that float around the arms.",
    fabric: "Hand-dyed silk organza from Lyon.",
    customization: "Sleeve volume and elasticity are tailored.",
    img: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[4/5]"
  },
  { 
    title: "Silk Essential", 
    category: "Blouses",
    price: "$2,200", 
    description: "The perfect minimalist silk shirt.",
    fabric: "Sandwashed silk charmeuse.",
    customization: "Available in 12 custom dye colors.",
    img: "https://images.unsplash.com/photo-1434389673669-e08b4cac3105?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[3/4]"
  },
  { 
    title: "Lace Romance", 
    category: "Blouses",
    price: "$4,500", 
    description: "Intricate lace overlay with a demure silhouette.",
    fabric: "French Chantilly lace over silk organza.",
    customization: "Lace pattern variations available upon request.",
    img: "https://images.unsplash.com/photo-1574291814206-363acdf2aa79?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[2/3]"
  }
];

export type DressItem = typeof collection[0];

function DressCard({ 
  item, 
  onClick,
  isPlaceholder = false,
  isActiveCategory = false
}: { 
  item: DressItem, 
  onClick: () => void,
  isPlaceholder?: boolean,
  isActiveCategory?: boolean
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`relative overflow-hidden cursor-pointer group w-full ${item.aspectClass} ${isActiveCategory ? 'ring-1 ring-[var(--dada-red)] opacity-90' : ''}`}
      onClick={onClick}
    >
      <div className="w-full h-full relative">
        {/* The Image with Vintage B&W Filter by default */}
        <motion.img 
          src={item.img} 
          alt={item.title}
          className={`w-full h-full object-cover transition-all duration-[2s] ${isActiveCategory ? '' : 'group-hover:scale-110 grayscale contrast-125 sepia-[.2] group-hover:grayscale-0 group-hover:contrast-100 group-hover:sepia-0'}`}
        />
        
        {/* Grainy Film Overlay that fades out on hover */}
        {!isActiveCategory && (
          <div 
            className="absolute inset-0 opacity-40 group-hover:opacity-0 transition-opacity duration-1000 mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
          />
        )}

        {/* Subtle persistent overlay for title readability */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 ${isActiveCategory ? 'opacity-100' : 'group-hover:opacity-100'} transition-opacity duration-500`} />
        
        {/* Elegant Partial Frame (Corner Brackets) - or Full Frame if Active */}
        {isActiveCategory ? (
          <div className="absolute inset-4 md:inset-6 border-[0.5px] border-[var(--dada-red)] z-10 pointer-events-none" />
        ) : (
          <>
            <div className="absolute top-4 left-4 md:top-6 md:left-6 w-12 h-12 md:w-16 md:h-16 border-t-[0.5px] border-l-[0.5px] border-[var(--dada-red)]/70 z-10 pointer-events-none transition-all duration-700 group-hover:w-16 group-hover:h-16 md:group-hover:w-20 md:group-hover:h-20 group-hover:border-[var(--dada-red)] group-hover:-translate-x-1 group-hover:-translate-y-1" />
            <div className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 md:w-16 md:h-16 border-t-[0.5px] border-r-[0.5px] border-[var(--dada-red)]/70 z-10 pointer-events-none transition-all duration-700 group-hover:w-16 group-hover:h-16 md:group-hover:w-20 md:group-hover:h-20 group-hover:border-[var(--dada-red)] group-hover:translate-x-1 group-hover:-translate-y-1" />
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 w-12 h-12 md:w-16 md:h-16 border-b-[0.5px] border-l-[0.5px] border-[var(--dada-red)]/70 z-10 pointer-events-none transition-all duration-700 group-hover:w-16 group-hover:h-16 md:group-hover:w-20 md:group-hover:h-20 group-hover:border-[var(--dada-red)] group-hover:-translate-x-1 group-hover:translate-y-1" />
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-16 md:h-16 border-b-[0.5px] border-r-[0.5px] border-[var(--dada-red)]/70 z-10 pointer-events-none transition-all duration-700 group-hover:w-16 group-hover:h-16 md:group-hover:w-20 md:group-hover:h-20 group-hover:border-[var(--dada-red)] group-hover:translate-x-1 group-hover:translate-y-1" />
          </>
        )}

        <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 z-20">
          <h3 className={`${isPlaceholder ? 'text-lg md:text-xl lg:text-2xl font-light tracking-[0.15em]' : 'text-3xl md:text-4xl tracking-wide'} font-serif ${isActiveCategory ? 'text-[var(--dada-red)]' : 'text-white'} drop-shadow-lg transform ${isActiveCategory ? '' : 'group-hover:-translate-y-2'} transition-transform duration-500`}>
            {item.title}
          </h3>
          {!isPlaceholder && (
            <p className="font-mono text-xs text-white/70 uppercase tracking-widest mt-3 flex items-center gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
              <span>Discover</span>
              <span className="w-6 h-[1px] bg-white/70 inline-block"></span>
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function EditorialCollection() {
  const [selectedDress, setSelectedDress] = useState<DressItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [showAllItems, setShowAllItems] = useState(false);

  useEffect(() => {
    setShowAllItems(false);
  }, [activeCategory]);

  const categories = ["All", ...Array.from(new Set(collection.map(item => item.category)))];
  const floatingCategories = categories.filter(c => c !== activeCategory && c !== "All");

  const filteredCollection = activeCategory === "All" 
    ? collection 
    : collection.filter(item => item.category === activeCategory);

  const displayedCollection = showAllItems 
    ? filteredCollection 
    : filteredCollection.slice(0, 6);

  // Split into 3 columns for Masonry layout
  const col1 = displayedCollection.filter((_, i) => i % 3 === 0);
  const col2 = displayedCollection.filter((_, i) => i % 3 === 1);
  const col3 = displayedCollection.filter((_, i) => i % 3 === 2);

  const getCategoryPreview = (categoryName: string) => {
    return collection.find(item => item.category === categoryName);
  };

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
    <section id="collection-start" className="bg-[var(--background)] py-32 md:py-48 relative min-h-[100vh]">
      <div className="max-w-[65rem] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-serif text-[var(--text-main)] mb-6">The Collection</h2>
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--text-muted)]">Select an exquisite piece to reveal its story</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-24 relative z-40">
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

        {/* Masonry Grid */}
        <div className="relative min-h-[600px]">
          <motion.div 
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row gap-8 lg:gap-12"
          >
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
          </motion.div>
        </div>

        {filteredCollection.length > 6 && !showAllItems && (
          <div className="flex justify-center mt-16 mb-8 relative z-40">
            <button
              onClick={() => setShowAllItems(true)}
              className="group flex items-center gap-4 border border-[var(--text-muted)]/30 px-8 py-4 hover:border-[var(--dada-red)] transition-colors duration-300"
            >
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--text-main)]">More</span>
              <span className="w-8 h-[1px] bg-[var(--text-muted)] group-hover:bg-[var(--dada-red)] transition-colors duration-300"></span>
            </button>
          </div>
        )}

        {/* Explore Other Collections Grid */}
        {categories.length > 0 && (
          <div className="mt-32 border-t border-[var(--text-muted)]/20 pt-24">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-serif text-[var(--text-main)] mb-6">Explore Other Collections</h3>
              <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--text-muted)]">Discover more from our atelier</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.filter(c => c !== "All").map((cat) => {
                const preview = getCategoryPreview(cat);
                if (!preview) return null;
                
                const placeholderImage = {
                  "Dresses": "/collections/sil_dress.png?v=3",
                  "Jackets": "/collections/sil_jacket.png?v=3",
                  "Accessories": "/collections/sil_accessories.png?v=3",
                  "Blouses": "/collections/sil_blouse.png?v=3"
                }[cat] || "/collections/sil_dress.png?v=3";
                
                return (
                  <DressCard 
                    key={cat} 
                    item={{...preview, title: cat, img: placeholderImage, aspectClass: "aspect-[3/4]"}} 
                    onClick={() => {
                      if (activeCategory === cat) return;
                      setActiveCategory(cat);
                      window.scrollTo({ top: document.getElementById('collection-start')?.offsetTop || 0, behavior: 'smooth' });
                    }} 
                    isPlaceholder={true}
                    isActiveCategory={activeCategory === cat}
                  />
                );
              })}
            </div>
          </div>
        )}
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
