"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { DressModal } from "@/components/DressModal";
import { MagneticButton } from "./MagneticButton";

const collection = [
  { 
    title: "Fuchsia Majesty", 
    category: "Dresses",
    price: "$7,955", 
    description: "A bespoke silk evening gown of unapologetic glamour, featuring a dramatic high slit and exquisite Swarovski crystal embroidery along the thigh. This handcrafted couture dress commands every entrance with the confidence of luxury fashion at its most fearless.",
    fabric: "Lustrous silk in vivid fuchsia, sculpted to the body with a daring slit and adorned with hand-applied Swarovski crystal embroidery cascading along the thigh, each stone individually set by our atelier's master beaders.",
    customization: "Custom-tailored to your exact silhouette with bespoke slit lengths and corsetry adjustments. Available in an exclusive palette of jewel tones, from deep amethyst to midnight ruby.",
    img: "https://storage.googleapis.com/mixo-sites/images/file-b1585176-4ab0-4441-9ca1-0979786596cd.jpg",
    detailImages: [
      "/details/new_fuchsia_bodice_1781676487560.png",
      "/details/new_fuchsia_texture_1781676497805.png",
      "/details/new_fuchsia_drape_1781676508356.png"
    ],
    aspectClass: "aspect-[3/4]",
    processImg: "/images/process/beading.jpg"
  },
  { 
    title: "Blush Enchantress", 
    category: "Dresses",
    price: "$8,700", 
    description: "An enchanting handcrafted couture dress that layers silk organza and delicate petal appliqués into a vision of modern femininity. Perfect as a custom wedding dress or red carpet gown, this designer dress embodies the romance of haute couture.",
    fabric: "Hand-dyed rosewater silk organza floating weightlessly over cascading French Chantilly lace, adorned with 3D silk-chiffon floral appliqués, each petal individually shaped and stitched by hand.",
    customization: "Bodice structure, petal density, and train length are sculpted to your preference. Available in ivory, blush, champagne, or custom-dyed shades to complement your bridal or evening vision.",
    img: "/images/blush_enchantress.jpg",
    detailImages: [
      "/details/new_blushench_bodice_1781676653156.png",
      "/details/new_blushench_texture_1781676675527.png",
      "/details/new_blushench_drape_1781676696150.png"
    ],
    aspectClass: "aspect-[2/3]",
    processImg: "/images/process/draping.jpg"
  },
  { 
    title: "Golden Whisper", 
    category: "Dresses",
    price: "$9,200", 
    description: "A luminous gala gown of champagne mesh drenched in hand-set Swarovski crystals, alive with every shift of light. This bespoke evening gown is richly embroidered and luxuriously heavy, with a captivating transparency that is radiant and utterly unforgettable on the red carpet.",
    fabric: "Transparent mesh meticulously encrusted with gold-leaf threading and thousands of Swarovski champagne crystals, the dense embroidery lending a substantial, luxurious weight that drapes beautifully against the body.",
    customization: "Train length, crystal density, and silhouette are entirely bespoke. Internal corsetry is precision-engineered for unparalleled structural support tailored to your body.",
    img: "https://storage.googleapis.com/mixo-sites/images/file-fbdb7417-d98d-4d96-99ed-20eb22b057ae.jpg",
    detailImages: [
      "/details/new_golden_bodice_1781676585562.png",
      "/details/new_golden_texture_1781676602641.png",
      "/details/new_golden_drape_1781676619023.png"
    ],
    aspectClass: "aspect-[3/4]",
    processImg: "/images/process/crystals.jpg"
  },
  { 
    title: "Crimson Allure", 
    category: "Dresses",
    price: "$7,980", 
    description: "Confidence, cut in silk couture. This sleek red carpet gown pairs sumptuous silk crepe with shimmering side panels for unapologetic drama. A designer dress born for galas, premieres, and every moment that demands luxury fashion with edge.",
    fabric: "Heavy-weight double-faced silk crepe de chine that cascades like liquid fire, featuring hand-embroidered ruby micro-sequin side panelling with gradient intensity.",
    customization: "Neckline plunge depth and sequin gradient density are flawlessly tailored to your preference. Hardware finishes available in 24k gold or platinum, with optional monogrammed interior.",
    img: "https://storage.googleapis.com/mixo-sites/images/file-efa8732c-2726-4513-9f7d-66e84a3ead12.jpg",
    detailImages: [
      "/details/new_crimson_bodice_1781676541872.png",
      "/details/new_crimson_texture_1781676555017.png",
      "/details/new_crimson_drape_1781676568248.png"
    ],
    aspectClass: "aspect-[4/5]",
    processImg: "/images/process/sewing.jpg"
  },
  
  { 
    title: "Blush Couture", 
    category: "Dresses",
    price: "$11,700", 
    description: "The ultimate expression of our atelier's bespoke accessories craft: layers of silk organza and hand-sculpted petal appliqués converge in a breathtaking statement piece. This haute couture creation elevates luxury fashion beyond adornment into wearable architecture.",
    fabric: "Ethereal ivory silk tulle intricately paired with hand-cut French Guipure lace, each petal individually sculpted and secured with invisible micro-stitching, falling into a voluminous architectural skirt.",
    customization: "Skirt volume is completely adjustable via a masterful detachable crinoline system. Available in ivory, blush, champagne, or custom-dyed hues, perfect for brides, galas, or editorial moments.",
    img: "https://storage.googleapis.com/mixo-sites/images/file-e25b0f24-1bdb-4182-886e-58dd451f1664.jpg",
    detailImages: [
      "/details/new_blushcout_bodice_1781676712185.png",
      "/details/new_blushcout_texture_1781676722580.png",
      "/details/new_blushcout_drape_1781676734418.png"
    ],
    aspectClass: "aspect-[2/3]",
    processImg: "/images/process/applique.jpg"
  },
  { 
    title: "Pearl Symphony", 
    category: "Accessories",
    price: "$4,200", 
    description: "A symphony of hand-strung freshwater pearls and brilliant diamond accents, this bespoke accessories masterpiece embodies the quiet grandeur of haute couture jewelry. Exquisite as a bridal accent, mother of the bride treasure, or red carpet finishing touch.",
    fabric: "18k white gold filigree meticulously interwoven with lustrous South Sea pearls of exceptional nacre quality, accented by VS-clarity diamond pavé set by our master jeweler over sixty painstaking hours.",
    customization: "Available in rose gold, yellow gold, and platinum finishes. Pearl size graduation, strand length, and diamond accent placement are tailored to your personal aesthetic through private fitting.",
    img: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[3/4]",
    processImg: "/images/process/luneville.jpg"
  },
  { 
    title: "Obsidian Clutch", 
    category: "Accessories",
    price: "$5,500", 
    description: "A structured evening clutch crafted from the world's rarest materials, the essential bespoke accessories companion for any red carpet gown or gala gown moment. This luxury fashion statement piece transforms the art of arrival into a ritual of quiet power.",
    fabric: "Hand-selected matte Niloticus crocodile leather in deep obsidian, paired with mirror-polished platinum hardware and an interior of hand-dyed midnight silk charmeuse.",
    customization: "Monogramming available on the interior silk lining in gold or platinum thread. Exotic leather colorways, hardware finishes, and clasp gemstone inlays are available through our bespoke program.",
    img: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[4/5]",
    processImg: "/images/process/buttons.jpg"
  },
  { 
    title: "Crystal Steps", 
    category: "Accessories",
    price: "$2,800", 
    description: "The glass slipper reimagined for the modern muse: a dazzling fusion of transparency and sparkle that elevates any bespoke evening gown or custom wedding dress. These bespoke accessories are luxury fashion's answer to Cinderella, designed for real-world red carpets.",
    fabric: "Optically pure Italian Lucite heel sculpted to architectural precision, paired with straps encrusted in over three hundred individually hand-set Swarovski crystals with aurora borealis finish.",
    customization: "Heel height adjustable between 85mm and 110mm. Strap crystal colorway, sole personalization, and custom sizing ensure a perfect bespoke fit for your most important evening.",
    img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[3/4]",
    processImg: "/images/process/handstitch.jpg"
  },
  { 
    title: "Golden Hour", 
    category: "Accessories",
    price: "$3,100", 
    description: "A breathtaking bespoke accessories statement piece that catches and refracts every ray of light into prismatic splendor. Worn alone or layered with haute couture, this handcrafted treasure defines luxury fashion's golden hour: luminous, warm, and impossibly radiant.",
    fabric: "Solid brass foundation with 24k gold plating applied in three meticulous layers for enduring luster, adorned with hand-set smoked topaz crystals sourced from master gem cutters in Idar-Oberstein.",
    customization: "Available in sterling silver, 24k gold, and rose gold vermeil finishes. Crystal colorway, chain length, and clasp style are fully customizable through our bespoke accessories atelier.",
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[2/3]",
    processImg: "/images/process/ribbon.jpg"
  },
  { 
    title: "Velvet Veil", 
    category: "Accessories",
    price: "$1,500", 
    description: "A dramatic finishing touch that transforms any haute couture ensemble into a moment of cinematic mystery. This handcrafted veil is among our most coveted bespoke accessories, equally stunning for a custom wedding dress as for a red carpet gown editorial.",
    fabric: "Sumptuous silk velvet band in deep noir, paired with hand-woven French illusion netting featuring delicate picot edging and scattered micro-crystal accents that catch the light like captured stars.",
    customization: "Hand-embroidered motifs, from celestial constellations to monogram initials, can adorn the netting. Veil length, velvet band width, and crystal density are tailored to your vision.",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[4/5]",
    processImg: "/images/process/dyeing.jpg"
  },
  { 
    title: "Midnight Elegance", 
    category: "Dresses",
    price: "$8,850", 
    description: "Where darkness whispers luxury fashion. This couture jacket in deep navy velvet is sculpted to perfection, draping with quiet power that rivals any red carpet gown. A designer dress alternative for those who command a room through understated haute couture mastery.",
    fabric: "Midnight blue silk-viscose pané velvet, extraordinarily soft and plush with a hand-brushed pile that catches the light like a starlit winter sky, fully lined in heavy silk charmeuse.",
    customization: "Backless plunge depth, sleeve length, and shoulder silhouette are bespoke. Interior lining available in contrasting jewel tones: emerald, ruby, or sapphire silk charmeuse.",
    img: "https://storage.googleapis.com/mixo-sites/images/file-fd88942d-471c-4ef4-ac9b-1d4292999cb3.jpg",
    detailImages: [
      "/details/new_midnight_bodice_1781676446002.png",
      "/details/new_midnight_texture_1781676459211.png",
      "/details/new_midnight_drape_1781676475270.png"
    ],
    aspectClass: "aspect-[3/4]",
    processImg: "/images/process/cutting.jpg"
  },
  { 
    title: "Noir Power", 
    category: "Jackets",
    price: "$7,200", 
    description: "A commanding couture jacket with exaggerated lapels that redefine power dressing for the modern era. This designer dress alternative bridges the worlds of haute couture tailoring and luxury fashion's boldest silhouettes: fierce, sculpted, and undeniably authoritative.",
    fabric: "Heavy Italian virgin wool crepe in deep noir, contrasted with lustrous silk duchesse satin peaked lapels and a hand-finished interior of silk twill with branded jacquard weave.",
    customization: "Shoulder pad architecture, button materials (mother-of-pearl, horn, or gold), lapel width, and overall silhouette are fully bespoke. Sleeve lining monogramming included.",
    img: "/collections/jacket_two.png",
    detailImages: [],
    aspectClass: "aspect-[2/3]",
    processImg: "/images/process/corset.jpg"
  },
  { 
    title: "Ivory Architecture", 
    category: "Jackets",
    price: "$9,100", 
    description: "A structured double-breasted couture jacket that redefines shape with architectural precision and haute couture craftsmanship. This ivory masterpiece is luxury fashion's answer to modern sculpture, equally at home over a bespoke evening gown or commanding the street as a standalone designer dress.",
    fabric: "Exquisite cashmere-wool blend woven by heritage mills in the Scottish Borders, brushed to a cloud-soft hand with natural ivory depth that deepens with each wear.",
    customization: "Interior lining features bespoke hand-painted silk motifs commissioned from our in-house artist. Button finish, belt closure, and shoulder line are tailored through private fitting.",
    img: "https://images.unsplash.com/photo-1550639525-c97d455acf70?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[3/4]",
    processImg: "/images/process/measuring.jpg"
  },
  { 
    title: "Crimson Drape", 
    category: "Jackets",
    price: "$6,500", 
    description: "A fluid couture jacket reimagined as a crimson trench that moves like liquid silk; drama distilled into luxury fashion's most wearable silhouette. Layer over a cocktail dress or bespoke evening gown for an entrance that lingers in memory long after you've arrived.",
    fabric: "Italian water-resistant silk gabardine in deep crimson, with a matte finish that captures movement like poured wine. Fully lined in contrasting silk twill with storm flap detailing.",
    customization: "Belt thickness, buckle material (brushed gold, silver, or horn), collar height, and hem length are all bespoke. Available in twelve exclusive colorways through private consultation.",
    img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[4/5]",
    processImg: "/images/process/steaming.jpg"
  },
  { 
    title: "Onyx Edge", 
    category: "Jackets",
    price: "$8,200", 
    description: "A sharp, minimalist couture jacket with a dramatic stand collar that cuts through convention with razor precision. This designer dress-level outerwear piece is luxury fashion distilled to its purest form, where every seam speaks of haute couture discipline and artistry.",
    fabric: "Heavy Italian wool melton in deep onyx with a dense, sculptural hand, contrasted by silk duchesse satin collar facings and interior panel detailing for hidden opulence.",
    customization: "Hidden interior pockets, silk lining monogramming in metallic thread, collar height, and button concealment are fully bespoke. Dramatic back vent and sleeve length tailored to your frame.",
    img: "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[3/4]",
    processImg: "/images/process/painting.jpg"
  },
  { 
    title: "Tweed Illusion", 
    category: "Jackets",
    price: "$7,800", 
    description: "A modern couture jacket that reimagines the classic tailored tweed with hand-woven textures and unexpected metallic luminosity. This designer dress companion bridges heritage craft and avant-garde luxury fashion, the kind of haute couture piece that starts conversations and ends debates.",
    fabric: "Hand-woven French bouclé with interlaced metallic gold and silver threads, creating a subtly shimmering surface that shifts between matte and lustrous depending on the light.",
    customization: "Trim details, from silk ribbon edging to hand-braided cord, and button choices (vintage crystal, enameled gold, or hand-carved mother-of-pearl) are fully bespoke through our atelier.",
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[2/3]",
    processImg: "/images/process/swatches.jpg"
  },
  { 
    title: "Ivory Cascade", 
    category: "Blouses",
    price: "$3,400", 
    description: "A masterclass in modern draping and silk couture: this luxury blouse pairs pure silk crepe de chine with dramatic sweeping ties for effortless editorial elegance. A versatile designer dress companion that transitions from boardroom power to evening allure with a single adjustment.",
    fabric: "100% heavy silk crepe de chine sourced from heritage weavers in Como, Italy. Finished with luminous mother-of-pearl button closures and French-seamed construction throughout.",
    customization: "Tie length, sleeve volume, and collar structure can be adjusted to your preference. Available in Ivory, Obsidian, Blush, and seasonal exclusive colorways.",
    img: "https://storage.googleapis.com/mixo-sites/images/file-77426bbf-6aac-41f4-8c9f-16b8a9375343.PNG",
    detailImages: [
      "/details/new_blushcout_bodice_1781676712185.png",
      "/details/new_blushcout_texture_1781676722580.png",
      "/details/new_blushcout_drape_1781676734418.png"
    ],
    aspectClass: "aspect-[3/4]",
    processImg: "/images/process/sketching.jpg"
  },
  { 
    title: "Chiffon Whisper", 
    category: "Blouses",
    price: "$2,900", 
    description: "A sheer luxury blouse of French silk chiffon with intricate hand-pleating that whispers against the skin like a secret. This hand-embroidered piece of silk couture is the perfect layering companion for any bespoke evening gown, cocktail dress, or couture jacket moment.",
    fabric: "Gossamer French silk chiffon from Lyon with hand-rolled edges, trimmed in heirloom Chantilly lace with scalloped detailing. Each pleat is individually pressed and set by hand.",
    customization: "Cuff closures available in freshwater pearl or pavé diamond. Pleat density, sleeve length, and chiffon opacity can be adjusted through bespoke fitting consultation.",
    img: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[2/3]",
    processImg: "/images/process/pleating.jpg"
  },
  { 
    title: "Satin Armor", 
    category: "Blouses",
    price: "$3,800", 
    description: "A high-neck luxury blouse that marries silk couture softness with the architectural authority of strong, sculpted shoulders. This designer dress-level silk piece is as commanding beneath a couture jacket as it is striking worn alone. Haute couture power, reimagined for modern women.",
    fabric: "100-momme Italian silk satin with an extraordinary weight and luminous drape, featuring precision-cut bias panels and concealed internal shoulder architecture for sculptural definition.",
    customization: "Collar height, tie length, shoulder structure, and cuff detailing are fully bespoke. Available in twelve curated silk colorways, each dyed exclusively for our atelier.",
    img: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[3/4]",
    processImg: "/images/process/pinning.jpg"
  },
  { 
    title: "Organza Cloud", 
    category: "Blouses",
    price: "$4,100", 
    description: "Voluminous sleeves that float around the arms like sculpted clouds; this luxury blouse transforms silk organza into wearable poetry. A hand-embroidered silk couture statement that pairs effortlessly with a cocktail dress skirt or adds ethereal drama beneath a couture jacket.",
    fabric: "Hand-dyed silk organza from heritage ateliers in Lyon, treated with a specialized finish that holds its voluminous shape while remaining featherlight. Each sleeve uses over two meters of fabric.",
    customization: "Sleeve volume, gathered cuff elasticity, and body fit are individually tailored. Available in custom-dyed colorways from whisper pastels to saturated jewel tones.",
    img: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[4/5]",
    processImg: "/images/process/pressing.jpg"
  },
  { 
    title: "Silk Essential", 
    category: "Blouses",
    price: "$2,200", 
    description: "The perfect minimalist luxury blouse: pure silk couture reduced to its most essential, elegant form. This sandwashed silk charmeuse shirt is the foundation of any haute couture wardrobe, effortlessly pairing with everything from a bespoke evening gown skirt to tailored trousers.",
    fabric: "Sandwashed silk charmeuse with a buttery, lived-in softness achieved through a specialized enzyme wash process. The natural luster creates depth that synthetic fabrics cannot replicate.",
    customization: "Available in twelve exclusive custom-dye colorways developed by our in-house colorist. Collar shape, cuff style, and body length are tailored through bespoke fitting.",
    img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[3/4]",
    processImg: "/images/process/ironing.jpg"
  },
  { 
    title: "Lace Romance", 
    category: "Blouses",
    price: "$4,500", 
    description: "An intricate hand-embroidered luxury blouse where French Chantilly lace cascades over silk organza in a demure yet captivating silhouette. This silk couture piece is a mother of the bride favorite and a timeless addition to any haute couture collection. Romance rendered in thread and light.",
    fabric: "Heirloom-quality French Chantilly lace with floral and foliate motifs, delicately layered over whisper-weight silk organza. Each lace panel is hand-matched for seamless pattern continuity.",
    customization: "Lace pattern variations, from botanical to geometric, are available upon request. Organza underlayer color, sleeve length, and neckline shape are fully bespoke through atelier consultation.",
    img: "https://images.unsplash.com/photo-1574291814206-363acdf2aa79?w=800&q=80",
    detailImages: [],
    aspectClass: "aspect-[2/3]",
    processImg: "/images/process/embroidery.jpg"
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
  const cardRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-25% 0px -65% 0px" });
  
  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`relative overflow-hidden cursor-pointer group w-full ${item.aspectClass} ${isActiveCategory ? 'ring-1 ring-[var(--dada-red)] opacity-90' : ''}`}
      onClick={onClick}
    >
      <div className="w-full h-full relative">
        {/* Process Photo - shown by default, fades on hover/scroll */}
        {item.processImg && (
          <img 
            src={item.processImg} 
            alt={`Art Couture ${item.title} bespoke couture craftsmanship`} 
            loading="lazy"
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ease-out group-hover:opacity-0 z-[1] ${isInView ? 'opacity-0' : 'opacity-100'}`}
            style={{ filter: 'grayscale(100%) sepia(40%) hue-rotate(330deg) brightness(0.75) contrast(0.85)' }}
          />
        )}

        {/* The Product Image - revealed on hover/scroll */}
        <motion.img 
          src={item.img} 
          alt={`${item.title} – Art Couture bespoke haute couture`}
          loading="lazy"
          className={`w-full h-full object-cover absolute inset-0 transition-all duration-[2s] ${isActiveCategory ? '' : 'group-hover:scale-110'} ${isInView ? 'scale-105' : ''}`}
        />
        
        {/* Grainy Film Overlay that fades out on hover/scroll */}
        {!isActiveCategory && (
          <div 
            className={`absolute inset-0 group-hover:opacity-0 transition-opacity duration-1000 mix-blend-overlay pointer-events-none z-[2] ${isInView ? 'opacity-0' : 'opacity-[0.55]'}`}
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
          />
        )}

        {/* Subtle persistent overlay for title readability */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 ${isActiveCategory ? 'opacity-100' : 'group-hover:opacity-100'} transition-opacity duration-500`} />
        
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

        {/* Zoom/Click indicator icon */}
        {!isPlaceholder && (
          <div className="absolute top-5 right-5 md:top-7 md:right-7 z-20 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
          </div>
        )}

        <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 z-20">
          <h3 className={`${isPlaceholder ? 'text-lg md:text-xl lg:text-2xl font-light tracking-[0.15em]' : 'text-3xl md:text-4xl tracking-wide font-light'} font-serif ${isActiveCategory ? 'text-[var(--dada-red)]' : 'text-white'} drop-shadow-lg transform ${isActiveCategory ? '' : 'group-hover:-translate-y-2'} transition-transform duration-500`}>
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

function ServiceCard({ service, onEnquire }: { service: { title: string, description: string, img: string }, onEnquire: () => void }) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.5 });
  const [tapped, setTapped] = React.useState(false);

  const handleClick = React.useCallback(() => {
    if (window.matchMedia("(pointer: coarse)").matches && !tapped) {
      setTapped(true);
      return;
    }
    onEnquire();
  }, [tapped, onEnquire]);

  React.useEffect(() => {
    if (!tapped) return;
    const handleOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setTapped(false);
      }
    };
    document.addEventListener("click", handleOutside);
    return () => document.removeEventListener("click", handleOutside);
  }, [tapped]);

  const showDesc = tapped || isInView;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className="group relative overflow-hidden cursor-pointer aspect-[3/4]"
      onClick={handleClick}
    >
      <img 
        src={service.img} 
        alt={`Art Couture ${service.title} – bespoke atelier service`}
        loading="lazy"
        className="w-full h-full object-cover absolute inset-0 transition-all duration-1000 group-hover:scale-110"
        style={{ filter: 'grayscale(100%) sepia(40%) hue-rotate(330deg) brightness(0.55) contrast(0.85)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
      
      {/* Corner brackets */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 w-10 h-10 md:w-12 md:h-12 border-t-[0.5px] border-l-[0.5px] border-[var(--dada-red)]/50 pointer-events-none transition-all duration-700 group-hover:w-14 group-hover:h-14 group-hover:border-[var(--dada-red)]" />
      <div className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 border-t-[0.5px] border-r-[0.5px] border-[var(--dada-red)]/50 pointer-events-none transition-all duration-700 group-hover:w-14 group-hover:h-14 group-hover:border-[var(--dada-red)]" />
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 w-10 h-10 md:w-12 md:h-12 border-b-[0.5px] border-l-[0.5px] border-[var(--dada-red)]/50 pointer-events-none transition-all duration-700 group-hover:w-14 group-hover:h-14 group-hover:border-[var(--dada-red)]" />
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-10 h-10 md:w-12 md:h-12 border-b-[0.5px] border-r-[0.5px] border-[var(--dada-red)]/50 pointer-events-none transition-all duration-700 group-hover:w-14 group-hover:h-14 group-hover:border-[var(--dada-red)]" />
      
      <div className={`absolute inset-x-0 bottom-0 z-20 px-5 pt-12 md:px-8 md:pb-14 md:pt-20 flex flex-col justify-end ${service.title === 'Photography Sessions' ? 'pb-[52px]' : 'pb-10'}`}>
        <h4 className="text-base md:text-xl lg:text-2xl font-serif text-white tracking-[0.15em] font-light drop-shadow-lg">
          {service.title}
        </h4>
        <p className={`font-mono text-[9px] md:text-[10px] text-white/60 uppercase tracking-widest mt-2 md:mt-3 max-w-[200px] leading-relaxed transition-all duration-500 delay-100 overflow-hidden ${showDesc ? 'opacity-100 translate-y-0 max-h-40' : 'opacity-0 max-h-0 md:opacity-100 md:max-h-40'} group-hover:opacity-100 group-hover:translate-y-0 group-hover:max-h-40`}>
          {service.description}
        </p>
        <p className={`font-mono text-[10px] md:text-xs text-white/70 uppercase tracking-widest mt-2 md:mt-4 flex items-center gap-3 transition-all duration-500 delay-200 ${showDesc ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 md:opacity-100 md:translate-y-0'} group-hover:opacity-100 group-hover:translate-y-0`}>
          <span>{tapped ? 'Tap to Enquire' : 'Enquire'}</span>
          <span className="w-6 h-[1px] bg-white/70 inline-block"></span>
        </p>
      </div>
    </motion.div>
  );
}

export function EditorialCollection() {
  const [selectedDress, setSelectedDress] = useState<DressItem | null>(null);
  const [enquiryService, setEnquiryService] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Dresses");
  const [showAllItems, setShowAllItems] = useState(false);

  useEffect(() => {
    setShowAllItems(false);
  }, [activeCategory]);

  const categories = Array.from(new Set(collection.map(item => item.category)));
  const floatingCategories = categories.filter(c => c !== activeCategory);

  const filteredCollection = collection.filter(item => item.category === activeCategory);

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
          <h2 className="text-[5rem] md:text-[8rem] lg:text-[10rem] font-serif font-extralight text-[var(--text-main)] leading-[0.9] tracking-tight mb-8">The Collection</h2>
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] text-[var(--text-muted)]">Select an exquisite piece to reveal its story</p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center mb-24 relative z-40">
          <div className="grid grid-cols-2 md:flex md:items-center gap-y-6 gap-x-10 md:gap-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="relative font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] pb-3 transition-colors duration-300 whitespace-nowrap text-center"
                style={{ color: activeCategory === cat ? 'var(--text-main)' : 'var(--text-muted)' }}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="categoryIndicator"
                    className="absolute bottom-0 left-1/4 right-1/4 md:left-0 md:right-0 h-[1.5px] bg-[var(--dada-red)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="relative min-h-[600px]">
          <motion.div 
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 max-w-[85%] md:max-w-none mx-auto"
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
              className="group flex items-center gap-4 border border-[var(--text-muted)]/30 px-8 py-4 hover:border-[var(--dada-red)] transition-colors duration-300 cursor-pointer"
            >
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--text-main)]">More</span>
              <span className="w-8 h-[1px] bg-[var(--text-muted)] group-hover:bg-[var(--dada-red)] transition-colors duration-300"></span>
            </button>
          </div>
        )}

        {/* Shop the Collection CTA */}
        {(() => {
          const [shopClicked, setShopClicked] = React.useState(false);
          return (
            <div className="flex flex-col items-center mt-20 mb-12 relative z-40 gap-6">
              <div
                onClick={() => {
                  if (shopClicked) return;
                  setShopClicked(true);
                  setTimeout(() => {
                    window.open('https://shop.gabriellebenot.com/collections/art-couture', '_blank');
                    setShopClicked(false);
                  }, 2000);
                }}
                className={`group relative w-32 h-32 md:w-36 md:h-36 rounded-full border transition-all duration-700 cursor-pointer flex items-center justify-center overflow-hidden ${shopClicked ? 'border-orange-500 scale-95' : 'border-[var(--text-muted)]/30 hover:border-[var(--dada-red)]'}`}
              >
                {/* Fill circle on hover / orange on click */}
                <div className={`absolute inset-0 rounded-full transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${shopClicked ? 'bg-orange-500 scale-100' : 'bg-[var(--dada-red)] scale-0 group-hover:scale-100'}`} />
                
                {/* Rotating ring text */}
                <svg className={`absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite] ${shopClicked ? 'animate-[spin_3s_linear_infinite]' : ''}`} viewBox="0 0 140 140">
                  <defs>
                    <path id="circlePath" d="M 70,70 m -52,0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0" />
                  </defs>
                  <text className={`transition-colors duration-700 ${shopClicked ? 'fill-white/80' : 'fill-[var(--text-muted)]/60 group-hover:fill-white/60'}`} style={{ fontSize: '10px', letterSpacing: '6px', fontFamily: 'monospace', textTransform: 'uppercase' }}>
                    <textPath href="#circlePath">SHOP THE COLLECTION · SHOP THE COLLECTION ·</textPath>
                  </text>
                </svg>
                
                {/* Center text */}
                <span className={`relative z-10 font-serif italic text-xl md:text-2xl tracking-wider transition-colors duration-500 ${shopClicked ? 'text-white' : 'text-[var(--text-main)] group-hover:text-white'}`}>{shopClicked ? '...' : 'Shop'}</span>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Enquiry Modal */}
      <AnimatePresence>
        {enquiryService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6"
            onClick={() => setEnquiryService(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-lg p-10 md:p-14"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button 
                onClick={() => setEnquiryService(null)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <span className="block font-serif italic text-sm uppercase tracking-[0.2em] text-[var(--dada-red)] mb-4">Enquire</span>
              <h3 className="text-3xl md:text-4xl font-serif font-extralight text-white mb-2">{enquiryService}</h3>
              <p className="font-mono text-xs text-white/40 uppercase tracking-widest mb-10">We&apos;ll respond within 24 hours</p>

              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  formData.append('_subject', `Service Enquiry: ${enquiryService}`);
                  try {
                    await fetch("https://formspree.io/f/mnjyyqan", {
                      method: "POST",
                      body: formData,
                      headers: { Accept: "application/json" },
                    });
                    setEnquiryService(null);
                  } catch {
                    // Silently handle - form still closes
                    setEnquiryService(null);
                  }
                }}
                className="space-y-6"
              >
                <input type="hidden" name="service" value={enquiryService || ''} />
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Your Name</label>
                  <input 
                    name="name"
                    type="text" 
                    required
                    className="w-full bg-transparent border-b border-white/20 focus:border-[var(--dada-red)] outline-none text-white font-serif text-lg py-3 transition-colors duration-300 placeholder:text-white/20"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Email Address</label>
                  <input 
                    name="email"
                    type="email" 
                    required
                    className="w-full bg-transparent border-b border-white/20 focus:border-[var(--dada-red)] outline-none text-white font-serif text-lg py-3 transition-colors duration-300 placeholder:text-white/20"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Your Message</label>
                  <textarea 
                    name="message"
                    rows={4}
                    required
                    className="w-full bg-transparent border-b border-white/20 focus:border-[var(--dada-red)] outline-none text-white font-serif text-lg py-3 transition-colors duration-300 resize-none placeholder:text-white/20"
                    placeholder="Tell us about your vision..."
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full mt-4 py-4 bg-[var(--dada-red)] text-white font-mono text-xs uppercase tracking-[0.3em] hover:bg-[var(--dada-red)]/80 transition-colors duration-300 cursor-pointer"
                >
                  Send Enquiry
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

export function ServicesGrid() {
  const [enquiryService, setEnquiryService] = React.useState<string | null>(null);

  return (
    <section className="py-24 md:py-32 px-6 max-w-[90rem] mx-auto">
      <div className="text-center mb-16 md:mb-24">
        <h3 className="text-[4rem] md:text-[6rem] lg:text-[8rem] font-serif font-extralight text-[var(--text-main)] mb-8 tracking-tight leading-none">Our Services</h3>
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-[var(--text-muted)]">Bespoke experiences from our atelier</p>
        <div className="w-16 h-[2px] bg-[var(--dada-red)] mx-auto mt-6" />
      </div>

      {/* Logo / Brand Seal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-md mx-auto mb-20 overflow-hidden"
      >
        <img 
          src="https://storage.googleapis.com/mixo-sites/images/file-1f3f0688-6519-43dd-b5ad-a14a0457a21b.jpg"
          alt="Art Couture logo by Gabrielle Benot and Charmaigne Menn"
          loading="lazy"
          className="w-full object-cover mix-blend-multiply hover:mix-blend-multiply transition-all duration-[1.5s]"
        />
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {[
          { 
            title: "Bespoke Gowns", 
            description: "Custom couture created exclusively for you, from initial sketch to final fitting.",
            img: "/images/process/draping.jpg"
          },
          { 
            title: "Bridal Couture", 
            description: "Your dream wedding gown, handcrafted with the finest silks, lace, and beadwork.",
            img: "/images/process/beading.jpg"
          },
          { 
            title: "Couture Rental", 
            description: "Access our exclusive collection for red carpet events and special occasions.",
            img: "/images/process/pressing.jpg"
          },
          { 
            title: "Photography Sessions", 
            description: "Editorial-quality sessions that capture you in couture elegance.",
            img: "/images/process/painting.jpg"
          }
        ].map((service) => (
          <ServiceCard key={service.title} service={service} onEnquire={() => setEnquiryService(service.title)} />
        ))}
      </div>
      <div className="w-16 h-[2px] bg-[var(--dada-red)] mx-auto mt-12" />

      {/* Enquiry Modal */}
      <AnimatePresence>
        {enquiryService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6"
            onClick={() => setEnquiryService(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-lg p-10 md:p-14"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setEnquiryService(null)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <span className="block font-serif italic text-sm uppercase tracking-[0.2em] text-[var(--dada-red)] mb-4">Enquire</span>
              <h3 className="text-3xl md:text-4xl font-serif font-extralight text-white mb-2">{enquiryService}</h3>
              <p className="font-mono text-xs text-white/40 uppercase tracking-widest mb-10">We&apos;ll respond within 24 hours</p>

              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  formData.append('_subject', `Service Enquiry: ${enquiryService}`);
                  try {
                    await fetch("https://formspree.io/f/mnjyyqan", {
                      method: "POST",
                      body: formData,
                      headers: { Accept: "application/json" },
                    });
                    setEnquiryService(null);
                  } catch {
                    setEnquiryService(null);
                  }
                }}
                className="space-y-6"
              >
                <input type="hidden" name="service" value={enquiryService || ''} />
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Your Name</label>
                  <input 
                    name="name"
                    type="text" 
                    required
                    className="w-full bg-transparent border-b border-white/20 focus:border-[var(--dada-red)] outline-none text-white font-serif text-lg py-3 transition-colors duration-300 placeholder:text-white/20"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Email Address</label>
                  <input 
                    name="email"
                    type="email" 
                    required
                    className="w-full bg-transparent border-b border-white/20 focus:border-[var(--dada-red)] outline-none text-white font-serif text-lg py-3 transition-colors duration-300 placeholder:text-white/20"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2">Your Message</label>
                  <textarea 
                    name="message"
                    rows={4}
                    required
                    className="w-full bg-transparent border-b border-white/20 focus:border-[var(--dada-red)] outline-none text-white font-serif text-lg py-3 transition-colors duration-300 resize-none placeholder:text-white/20"
                    placeholder="Tell us about your vision..."
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full mt-4 py-4 bg-[var(--dada-red)] text-white font-mono text-xs uppercase tracking-[0.3em] hover:bg-[var(--dada-red)]/80 transition-colors duration-300 cursor-pointer"
                >
                  Send Enquiry
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
