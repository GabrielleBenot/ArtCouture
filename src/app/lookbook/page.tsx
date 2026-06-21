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
      <section className="relative h-[85vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Background dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/85 to-black z-10" />
        
        {/* Cinematic Background Image */}
        <img
          src="/images/intro_bg.jpg"
          alt="Art Couture Creative Studio Editorial Lookbook"
          className="absolute inset-0 w-full h-full object-cover opacity-20 transform scale-105"
        />

        <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[var(--dada-red)] mb-4 block">
            L'Art et la Mode
          </span>
          <h1 className="font-serif font-thin text-5xl md:text-7xl lg:text-9xl tracking-[0.1em] uppercase leading-none mb-6">
            EDITORIAL<br />
            <span className="font-normal italic tracking-normal text-3xl md:text-5xl lg:text-7xl block mt-2 text-white/80">
              Lookbook
            </span>
          </h1>
          <div className="w-16 h-[1px] bg-white/20 mb-8" />
          <p className="font-serif italic text-sm md:text-base text-white/50 max-w-lg leading-relaxed mb-8">
            An independent fashion layout exploring the translation of canvas brushstrokes, natural forms, and ancient textile techniques into wearable art.
          </p>
          <div
            className="flex flex-col items-center gap-2 cursor-pointer opacity-40 hover:opacity-100 transition-opacity"
            onClick={() => {
              const el = document.getElementById("magazine-start");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="font-mono text-[8px] uppercase tracking-widest">Explore the Lookbook</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </div>
        </div>
      </section>

      {/* Main Magazine Layout */}
      <main id="magazine-start" className="max-w-6xl mx-auto px-6 md:px-12 pt-16">
        
        {/* SECTION 1: Lead Article - Drop Cap Editorial style */}
        <section className="border-t border-b border-white/10 py-16 mb-24 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--dada-red)] block mb-3">
              The Manifesto
            </span>
            <h2 className="font-serif font-light text-4xl md:text-5xl leading-none uppercase text-white tracking-wide">
              From Canvas <br />
              <span className="italic">to Cloth</span>
            </h2>
            <div className="w-12 h-[1px] bg-[var(--dada-red)] my-6" />
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">
              Wearable Paintings and Ancient Tambour Craft.
            </p>
          </div>
          
          <div className="lg:col-span-2 font-serif text-white/70 text-sm md:text-base leading-relaxed space-y-6">
            <p className="first-letter:text-6xl first-letter:font-serif first-letter:font-light first-letter:mr-4 first-letter:float-left first-letter:text-[var(--dada-red)]">
              <strong>The boundary between fine art and luxury couture has always been porous,</strong> but at our private atelier, it is completely erased. We never begin with commercial trends or standard collections. Our process begins in the quiet sanctuary of the studio, where original oil and acrylic paintings are brought to life. 
            </p>
            <p>
              Every garment is designed as a direct physical translation of a brushstroke. We study the texture of the paint, the gradient of the pigments, and the speed of the palette knife. The canvas acts as the soul, while the fabrics and beads serve as the medium of expression. We look back to ancient techniques to find the discipline required for modern luxury.
            </p>
          </div>
        </section>

        {/* SECTION 2: Feature Article - The Transformation of Form (Flower to Blouse) */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 group">
            {/* Black and white hover transition */}
            <div className="aspect-[4/3] overflow-hidden bg-neutral-900 border border-white/5 rounded-lg relative">
              <img
                src="/images/process/applique.jpg"
                alt="Crafting 3D silk organza flowers on blouse"
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-[1200ms] ease-in-out"
              />
              <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            </div>
            <span className="font-mono text-[8px] uppercase tracking-widest text-white/30 mt-2 block">
              Fig. 01 / Atelier Hand-molding Process (Grayscale View / Hover for Color)
            </span>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--dada-red)] mb-3 block">
              The Evolution of Design
            </span>
            <h3 className="font-serif font-light text-3xl md:text-4xl uppercase tracking-wide mb-6 leading-tight">
              The Transformation <br />
              <span className="italic font-normal">of Form</span>
            </h3>
            <p className="font-serif italic text-sm text-white/70 leading-relaxed mb-6">
              How does a wild rosewater poppy blooming in the atelier garden find its way onto a delicate silk-chiffon bodice?
            </p>
            <p className="font-sans text-xs text-white/45 leading-relaxed mb-6">
              It begins with the organic anatomy of the flower. We dissect its layers, tracing how the petals overlap to capture shadow. Each petal is individually cut from pure silk organza, hand-dyed in customized blush tones, and heated over a flame to curl its edges naturally. 
            </p>
            <p className="font-sans text-xs text-white/45 leading-relaxed pl-4 border-l border-[var(--dada-red)]/35">
              <strong>Bespoke Fact:</strong> A single custom blouse features over one hundred separate hand-molded chiffon petals, strategically placed around the shoulders to simulate a floating botanical crown.
            </p>
          </div>
        </section>

        {/* SECTION 3: Ancient Technique Spotlight - The Alchemy of Luneville */}
        <section className="mb-32 bg-neutral-950 border border-white/5 rounded-2xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--dada-red)] mb-3 block">
              Artisan History
            </span>
            <h3 className="font-serif font-light text-3xl md:text-4xl uppercase tracking-wide mb-6 leading-tight">
              The Alchemy of <br />
              <span className="italic font-normal text-white/90">Luneville</span>
            </h3>
            <div className="space-y-4 font-sans text-xs text-white/50 leading-relaxed">
              <p>
                Born in 1810 in the town of Lunéville, France, the tambour embroidery technique remains the crown jewel of haute couture embellishment. Unlike traditional needle embroidery, Lunéville uses a specialized hook to apply beads and sequins from the reverse side of a translucent frame.
              </p>
              <p>
                The embroiderer works completely blind, feeling the placement of the beads beneath the frame and looping the thread through the silk organza with rhythmic, surgical precision.
              </p>
              <p className="font-serif italic text-white/70 text-xs pt-2">
                "It is a silent dialogue of touch. The hook moves with extreme speed, turning threads into dense, architectural gold relief that cannot be replicated by any modern machine."
              </p>
            </div>
          </div>
          <div className="group">
            <div className="aspect-square overflow-hidden bg-neutral-900 border border-white/5 rounded-xl relative">
              <img
                src="/images/process/luneville.jpg"
                alt="Tambour frame hand embroidery hook"
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-[1200ms] ease-in-out"
              />
            </div>
            <span className="font-mono text-[8px] uppercase tracking-widest text-white/30 mt-2 block">
              Fig. 02 / The Tambour Frame Stitch (Grayscale View / Hover for Color)
            </span>
          </div>
        </section>

        {/* SECTION 4: Feature Article - The Painted Steed (Horse to Jacket) */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 lg:order-2 group">
            <div className="aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/5 rounded-lg relative">
              <img
                src="/images/process/stallion_jacket.png"
                alt="Bespoke structured wool jacket with abstract silver stallion embroidery, lace inserts, and rhinestones"
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-[1200ms] ease-in-out"
              />
            </div>
            <span className="font-mono text-[8px] uppercase tracking-widest text-white/30 mt-2 block">
              Fig. 03 / The Stallion Motif Embroidery (Grayscale View / Hover for Color)
            </span>
          </div>

          <div className="lg:col-span-7 lg:order-1 flex flex-col justify-center pr-0 lg:pr-8">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--dada-red)] mb-3 block">
              Artwork Translation
            </span>
            <h3 className="font-serif font-light text-3xl md:text-5xl uppercase tracking-wide mb-6 leading-tight">
              The Painted <br />
              <span className="italic font-normal">Steed</span>
            </h3>
            <p className="font-serif italic text-sm text-white/70 leading-relaxed mb-6">
              From Gabi's expressionist oil canvas of a charging stallion to an abstract, blocked mixed-media motif spanning the back of a structured wool jacket.
            </p>
            <div className="space-y-4 font-sans text-xs text-white/45 leading-relaxed mb-8">
              <p>
                The challenge lay in capturing the movement and raw energy of the horse. We utilized a heavy Japanese wool crepe as the foundation, mapping the horse's silhouette into abstract, organic blocks using mixed-media hand embroidery in lilacs, silver, gray, black, and white threads.
              </p>
              <p>
                Each section is defined by a distinct stitch texture: dense lilac satin stitches, clusters of French knots, and scattered white seed stitches. Integrated linen patches and flowing silver thread lines for the mane and tail create a highly tactile, elegant relief, completed by peak lapels cut from duchesse silk satin.
              </p>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-[var(--dada-red)] pl-4 border-l border-white/10">
              <strong>Interesting Fact:</strong> The stallion motif is engineered to match the client's shoulders perfectly, so that when worn, the movement of the body makes the horse appear to run.
            </p>
          </div>
        </section>

        {/* SECTION 5: Ancient Technique Spotlight - Kyoto's Golden Thread */}
        <section className="mb-32 bg-neutral-950 border border-white/5 rounded-2xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="group lg:order-2">
            <div className="aspect-video overflow-hidden bg-neutral-900 border border-white/5 rounded-xl relative">
              <img
                src="/images/process/threading.jpg"
                alt="Gold leaf wrapped silk thread details"
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-[1200ms] ease-in-out"
              />
            </div>
            <span className="font-mono text-[8px] uppercase tracking-widest text-white/30 mt-2 block">
              Fig. 04 / Hikihaku Gold Leaf Threading (Grayscale View / Hover for Color)
            </span>
          </div>
          <div className="lg:order-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--dada-red)] mb-3 block">
              Ancient Materials
            </span>
            <h3 className="font-serif font-light text-3xl md:text-4xl uppercase tracking-wide mb-6 leading-tight">
              Kyoto's Golden <br />
              <span className="italic font-normal text-white/90">Thread</span>
            </h3>
            <div className="space-y-4 font-sans text-xs text-white/50 leading-relaxed">
              <p>
                Known as <em>Hikihaku</em> in Japanese heritage weaving, this ancient craft involves beating 24k gold leaf to microscopic thinness and adhering it to premium mulberry paper. The gilded paper is then sliced into fine ribbons and wrapped around a pure silk core.
              </p>
              <p>
                This technique yields a thread that maintains the absolute flexibility of silk while reflecting the rich, deep warmth of pure gold. It never tarnishes or loses its luster over centuries.
              </p>
              <p className="font-serif italic text-white/70 text-xs pt-2">
                "We interweave Hikihaku gold leaf threads with champagne bouclé loops, bringing historical grandeur to modern structured jackets."
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5b: Feature Article - Deconstructed Mondrian (Art to Blazer) */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Images side-by-side */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 group">
            {/* Front View */}
            <div className="flex flex-col gap-2">
              <div className="aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/5 rounded-lg relative">
                <img
                  src="/images/process/mondrian_blazer_front.png"
                  alt="Deconstructed Mondrian blazer front view"
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-[1200ms] ease-in-out"
                />
              </div>
              <span className="font-mono text-[8px] uppercase tracking-widest text-white/30 block">
                Fig. 05 / Front View (Grayscale / Hover for Color)
              </span>
            </div>

            {/* Back View */}
            <div className="flex flex-col gap-2">
              <div className="aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/5 rounded-lg relative">
                <img
                  src="/images/process/mondrian_blazer_back.png"
                  alt="Deconstructed Mondrian blazer back view"
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-[1200ms] ease-in-out"
                />
              </div>
              <span className="font-mono text-[8px] uppercase tracking-widest text-white/30 block">
                Fig. 06 / Back View (Grayscale / Hover for Color)
              </span>
            </div>
          </div>

          {/* Story Text */}
          <div className="lg:col-span-6 flex flex-col justify-center pl-0 lg:pl-8">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--dada-red)] mb-3 block">
              Artwork Deconstruction
            </span>
            <h3 className="font-serif font-light text-3xl md:text-5xl uppercase tracking-wide mb-6 leading-tight">
              Deconstructed <br />
              <span className="italic font-normal">Mondrian</span>
            </h3>
            <p className="font-serif italic text-sm text-white/70 leading-relaxed mb-6">
              Gabrielle Benot's architectural dialogue with Neo-Plasticism, translating Piet Mondrian's strict grid into a fluid, deconstructed white blazer.
            </p>
            <div className="space-y-4 font-sans text-xs text-white/45 leading-relaxed mb-8">
              <p>
                Inspired by Mondrian's compositional balance, Gabrielle reimagined the vertical and horizontal grid lines as dynamic, intersecting diagonals slicing across a clean white wool crepe blazer. 
              </p>
              <p>
                We hand-embroidered thick black structural cords to anchor the composition. The resulting geometric panels are filled with textured French knots and micro-seed beads in the iconic primary color palette, vibrant yellow, deep cobalt blue, and rich scarlet red.
              </p>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-[var(--dada-red)] pl-4 border-l border-white/10">
              <strong>Bespoke Detail:</strong> The embroidery flows continuously from the front lapel, wrapping around the side seams to converge in a major deconstructed focal point across the back.
            </p>
          </div>
        </section>

        {/* SECTION 6: The Alternating Editorial Collection Gallery */}
        <section className="border-t border-white/10 pt-24">
          <div className="text-center mb-20">
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-[var(--dada-red)] mb-4 block">
              Collection Showcase
            </span>
            <h2 className="font-serif font-thin text-4xl md:text-6xl tracking-wide uppercase">
              The Pieces
            </h2>
            <div className="w-12 h-[1px] bg-white/20 mx-auto mt-6" />
          </div>

          <div className="space-y-36">
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
                        <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors" />
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
                      Look {index + 1}
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
          </div>
        </section>
      </main>
    </div>
  );
}
