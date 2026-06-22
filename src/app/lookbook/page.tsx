"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { DressModal } from "@/components/DressModal";
import { collection, DressItem } from "@/components/EditorialCollection";
import { Footer } from "@/components/Footer";

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


interface LookbookSectionConfig {
  id: string;
  title: string;
  visible: boolean;
  images: {
    main?: string;
    front?: string;
    back?: string;
  };
}

const defaultLookbookSections: LookbookSectionConfig[] = [
  { id: "manifesto", title: "From Canvas to Cloth", visible: true, images: {} },
  { id: "poppy", title: "The Transformation of Form (Poppy)", visible: true, images: { main: "/images/process/applique.jpg" } },
  { id: "luneville", title: "The Alchemy of Luneville", visible: true, images: { main: "/images/process/luneville.jpg" } },
  { id: "hikihaku", title: "QRS Golden Thread (Hikihaku)", visible: true, images: { main: "/images/process/threading.jpg" } },
  { id: "stallion", title: "The Painted Steed (Stallion)", visible: true, images: { front: "/images/process/equine_dahlia_main.jpg", back: "/images/process/perfect_jacket.png" } },
  { id: "mondrian", title: "Deconstructed Mondrian", visible: true, images: { front: "/images/process/mondrian_blazer_front.png", back: "/images/process/mondrian_blazer_back.png" } },
  { id: "miro", title: "Constellation Miró", visible: true, images: { front: "/images/process/miro_inspiration.png", back: "/images/process/miro_top_back.png" } },
  { id: "fuchsia-majesty", title: "Fuchsia Majesty (Gallery)", visible: true, images: { front: "/images/paintings/dress_from_colorful_face.jpg", back: "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Ff5720508-8148-4bd3-ab0f-2b8612f15cda?alt=media&token=7be40366-58e3-4eb1-91c8-f24d29299550" } },
  { id: "blush-enchantress", title: "Blush Enchantress (Gallery)", visible: true, images: { front: "/images/paintings/brunette_yellow_painting.jpg", back: "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F2f7c3f0f-2025-4098-86e5-76e1b21fe5e4?alt=media&token=b174088f-754a-49ef-8d45-ffe114715f60" } },
  { id: "golden-whisper", title: "Golden Whisper (Gallery)", visible: true, images: { front: "/images/paintings/dress_from_painting_2.jpg", back: "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Fa233bbdb-25ac-47fe-b686-71493e2cc226?alt=media&token=447745e0-6fd4-4fe0-b328-63b25f3199e0" } },
  { id: "crimson-allure", title: "Crimson Allure (Gallery)", visible: true, images: { front: "/images/paintings/palazzo_inspired_dress.jpg", back: "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F04669707-071a-432c-82e4-76b144da07e4?alt=media&token=87ed9797-099d-4c08-ad4e-bcac6cc65c4b" } },
  { id: "midnight-elegance", title: "Midnight Elegance (Gallery)", visible: true, images: { front: "/images/paintings/italian_palazzo.jpg", back: "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Ff4c8fe02-afaa-458f-b217-bc5a3a57ea00?alt=media&token=697ddc89-dcdd-432d-9e94-a4c759b5027e" } }
];

export default function LookbookPage() {
  const [sections, setSections] = useState<LookbookSectionConfig[]>(defaultLookbookSections);
  const visibleLookbookItems = lookbookItems.filter(
    (item) => sections.find((s) => s.id === item.id)?.visible !== false
  );
  const [pageVisible, setPageVisible] = useState<boolean>(true);
  const [activeImage, setActiveImage] = useState<{
    src: string;
    alt: string;
    caption?: string;
    secondarySrc?: string;
    secondaryAlt?: string;
    secondaryCaption?: string;
    tertiarySrc?: string;
    tertiaryAlt?: string;
    tertiaryCaption?: string;
    initialSlide?: number;
  } | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [selectedDress, setSelectedDress] = useState<DressItem | null>(null);
  const [selectedLookId, setSelectedLookId] = useState<string | null>(null);


  useEffect(() => {
    setCurrentSlide(activeImage?.initialSlide ?? 0);
  }, [activeImage]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Set origin flag
    sessionStorage.setItem("came_from_lookbook", "true");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sessionStorage.setItem("last_lookbook_item", entry.target.id);
            sessionStorage.setItem("lookbook_back_target", `/lookbook#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.1, rootMargin: "-10% 0px -10% 0px" }
    );

    // Observe each visible lookbook item element
    visibleLookbookItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.location.hash) return;
    const hash = window.location.hash;
    const id = hash.replace("#", "");
    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.title = "Editorial Lookbook: Bespoke Haute Couture | Art Couture";

    const unsub = onSnapshot(doc(db, "config", "lookbook"), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data.visible !== undefined) {
          setPageVisible(data.visible);
        }
        const rawSections = data.sections || [];
        if (Array.isArray(rawSections) && rawSections.length > 0) {
          const merged = defaultLookbookSections.map(def => {
            const match = rawSections.find((s: any) => s.id === def.id);
            if (!match) return def;
            const images = { ...def.images, ...match.images };
            if (def.id === "miro" && images.back === "/images/process/miro_top.png") {
              images.back = "/images/process/miro_top_back.png";
            }
            return {
              ...def,
              visible: match.visible !== undefined ? match.visible : def.visible,
              images
            };
          });
          setSections(merged);
        }
      }
    }, (err) => {
      console.error("Failed to subscribe to lookbook config:", err);
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      unsub();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImage]);

  if (!pageVisible) {
    return (
      <div className="min-h-screen bg-black text-white selection:bg-[var(--dada-red)] selection:text-white flex flex-col justify-between">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center px-6 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[var(--dada-red)] mb-4 block">
            Atelier Lookbook
          </span>
          <h1 className="font-serif font-thin text-4xl md:text-6xl tracking-[0.1em] uppercase leading-none mb-6">
            CURRENTLY<br />
            <span className="font-normal italic tracking-normal text-2xl md:text-4xl block mt-2 text-white/80">
              Updating
            </span>
          </h1>
          <div className="w-16 h-[1px] bg-white/20 mb-8" />
          <p className="font-serif italic text-sm md:text-base text-white/50 max-w-md leading-relaxed">
            We are currently curating new photographic spreads and bespoke translations. Please check back shortly.
          </p>
        </div>
      </div>
    );
  }

  const dynamicJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Art Couture Editorial Lookbook",
    "description": "A dialogue between fine art and haute couture. Our bespoke gowns, styled and captured in cinematic fashion spreads.",
    "publisher": {
      "@type": "Organization",
      "name": "Art Couture",
      "logo": "https://artcouture.studio/favicon.svg"
    },
    "association": visibleLookbookItems.map((item) => {
      const sectionConfig = sections.find(s => s.id === item.id);
      const gownImg = sectionConfig?.images?.back || item.gownImg;
      return {
        "@type": "Product",
        "name": item.title,
        "image": gownImg,
        "description": item.story,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "USD",
          "price": item.price.replace(/[^0-9.]/g, ""),
          "availability": "https://schema.org/PreOrder"
        }
      };
    })
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[var(--dada-red)] selection:text-white pb-32">
      <Header />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dynamicJsonLd) }}
      />

      {/* Cinematic Hero */}
      <section className="relative h-[85vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Background dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/85 to-black z-10" />
        
        <picture className="absolute inset-0 w-full h-full opacity-20 transform scale-105">
          <source srcSet="/images/intro_bg.webp" type="image/webp" />
          <img
            src="/images/intro_bg.jpg"
            alt="Art Couture Creative Studio Editorial Lookbook"
            className="w-full h-full object-cover"
          />
        </picture>

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
        
        {/* PART I HEADER */}
        <div className="border-b border-white/10 pb-8 mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[var(--dada-red)] block mb-3">
            Part I
          </span>
          <h2 className="font-serif font-thin text-5xl md:text-6xl lg:text-7xl uppercase tracking-wider text-white">
            The Heritage <span className="italic font-light text-white/70">&amp; The Craft</span>
          </h2>
          <p className="font-sans text-xs text-white/50 max-w-xl mt-4 leading-relaxed uppercase tracking-wider">
            An exploration of the brand's philosophy, the ancient French technique of Lunéville embroidery, and the legendary history of Kyoto's golden threads.
          </p>
        </div>

        {/* SECTION 1: Lead Article - Drop Cap Editorial style */}
        {sections.find(s => s.id === "manifesto")?.visible !== false && (
          <>
            <section className="py-16 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              <div className="lg:col-span-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--dada-red)] block mb-3">
                  01 / The Manifesto
                </span>
                <h2 className="font-serif font-light text-4xl md:text-5xl leading-none uppercase text-white tracking-wide">
                  From Canvas <br />
                  <span className="italic">to Cloth</span>
                </h2>
                <div className="w-12 h-[1px] bg-[var(--dada-red)] my-6" />
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">
                  Setting the philosophy, theme, and collaborative spirit.
                </p>
              </div>
              
              <div className="lg:col-span-2 font-serif text-white/70 text-sm md:text-base leading-relaxed space-y-6">
                <p className="first-letter:text-6xl first-letter:font-serif first-letter:font-light first-letter:mr-4 first-letter:float-left first-letter:text-[var(--dada-red)]">
                  <strong>The boundary between fine art and luxury couture has always been porous,</strong> but at our private atelier, it is completely erased. We never begin with commercial trends or standard collections. Our creative process is sparked by anything that inspires us, whether traveling to new places, reading magazines, watching a movie, or simply bouncing ideas off each other. Rather than a one-way street, our work is an ongoing dialogue where a dress can inspire a painting, and a painting can inspire a dress.
                </p>
                <p>
                  Instead of a direct physical translation of a brushstroke, each piece represents a fluid conversation between canvas and fabric. We explore the rich textures, the gradients of color, and the kinetic energy of the medium, allowing the artwork and the garment to shape one another. By combining these shared visions with ancient techniques, we find the discipline required for modern luxury.
                </p>
              </div>
            </section>
            <div className="w-full border-t border-white/10 my-16 md:my-24" />
          </>
        )}

        {/* SECTION 2: Feature Article - The Transformation of Form (Flower to Blouse) */}
        {sections.find(s => s.id === "poppy")?.visible !== false && (
          <>
            <section className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 group flex flex-col">
                <div className="mb-4">
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--dada-red)] block">
                    02 / The Transformation of Form
                  </span>
                </div>
                {/* Black and white hover transition */}
                <div 
                  className="aspect-[4/3] overflow-hidden bg-neutral-900 border border-white/5 rounded-lg relative cursor-zoom-in max-w-[85%] md:max-w-[70%] lg:max-w-none mx-auto w-full"
                  onClick={() => setActiveImage({
                    src: sections.find(s => s.id === "poppy")?.images.main || "/images/process/applique.jpg",
                    alt: "Crafting 3D silk organza flowers on blouse",
                    caption: "Fig. 01 / Atelier Hand-molding Process"
                  })}
                >
                  <img
                    src={sections.find(s => s.id === "poppy")?.images.main || "/images/process/applique.jpg"}
                    alt="Crafting 3D silk organza flowers on blouse"
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-[1200ms] ease-in-out"
                  />
                  <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                </div>
                <span className="font-mono text-[8px] uppercase tracking-widest text-white/30 mt-2 block text-center lg:text-left w-[85%] md:w-[70%] lg:w-full mx-auto">
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
            <div className="w-full border-t border-white/10 my-16 md:my-24" />
          </>
        )}

        {/* SECTION 3: Ancient Technique Spotlight - The Alchemy of Luneville */}
        {sections.find(s => s.id === "luneville")?.visible !== false && (
          <>
            <section className="mb-24 bg-neutral-950 border border-white/5 rounded-2xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--dada-red)] mb-3 block">
                  03 / The Alchemy of Luneville
                </span>
                <h3 className="font-serif font-light text-3xl md:text-4xl uppercase tracking-wide mb-6 leading-tight">
                  The Alchemy of <br />
                  <span className="italic font-normal text-white/90">Luneville</span>
                </h3>
                <p className="font-serif italic text-sm text-white/70 leading-relaxed mb-6">
                  Introducing the tactile, physical craftsmanship (tulle, hook embroidery, and raw materials).
                </p>
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
              <div className="group flex flex-col">
                <div 
                  className="aspect-square overflow-hidden bg-neutral-900 border border-white/5 rounded-xl relative cursor-zoom-in max-w-[85%] md:max-w-[70%] lg:max-w-none mx-auto w-full"
                  onClick={() => setActiveImage({
                    src: sections.find(s => s.id === "luneville")?.images.main || "/images/process/luneville.jpg",
                    alt: "Tambour frame hand embroidery hook",
                    caption: "Fig. 02 / The Tambour Frame Stitch"
                  })}
                >
                  <img
                    src={sections.find(s => s.id === "luneville")?.images.main || "/images/process/luneville.jpg"}
                    alt="Tambour frame hand embroidery hook"
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-[1200ms] ease-in-out"
                  />
                </div>
                <span className="font-mono text-[8px] uppercase tracking-widest text-white/30 mt-2 block text-center lg:text-left w-[85%] md:w-[70%] lg:w-full mx-auto">
                  Fig. 02 / The Tambour Frame Stitch (Grayscale View / Hover for Color)
                </span>
              </div>
            </section>
            <div className="w-full border-t border-white/10 my-16 md:my-24" />
          </>
        )}

        {/* SECTION 4: Ancient Technique Spotlight - Kyoto's Golden Thread */}
        {sections.find(s => s.id === "hikihaku")?.visible !== false && (
          <>
            <section className="mb-24 bg-neutral-950 border border-white/5 rounded-2xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="group lg:order-2 flex flex-col">
                <div 
                  className="aspect-video overflow-hidden bg-neutral-900 border border-white/5 rounded-xl relative cursor-zoom-in max-w-[85%] md:max-w-[70%] lg:max-w-none mx-auto w-full"
                  onClick={() => setActiveImage({
                    src: sections.find(s => s.id === "hikihaku")?.images.main || "/images/process/threading.jpg",
                    alt: "Gold leaf wrapped silk thread details",
                    caption: "Fig. 03 / Hikihaku Gold Leaf Threading"
                  })}
                >
                  <img
                    src={sections.find(s => s.id === "hikihaku")?.images.main || "/images/process/threading.jpg"}
                    alt="Gold leaf wrapped silk thread details"
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-[1200ms] ease-in-out"
                  />
                </div>
                <span className="font-mono text-[8px] uppercase tracking-widest text-white/30 mt-2 block text-center lg:text-left w-[85%] md:w-[70%] lg:w-full mx-auto">
                  Fig. 03 / Hikihaku Gold Leaf Threading (Grayscale View / Hover for Color)
                </span>
              </div>
              <div className="lg:order-1">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--dada-red)] mb-3 block">
                  04 / QRS Golden Thread
                </span>
                <h3 className="font-serif font-light text-3xl md:text-4xl uppercase tracking-wide mb-6 leading-tight">
                  QRS Golden <br />
                  <span className="italic font-normal text-white/90">Thread</span>
                </h3>
                <p className="font-serif italic text-sm text-white/70 leading-relaxed mb-6">
                  Elevating the craft into history, legacy, and the deeper concept behind the collection.
                </p>
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
            <div className="w-full border-t border-white/10 my-16 md:my-24" />
          </>
        )}

        {/* PART II HEADER */}
        <div className="border-b border-white/10 pb-8 mb-16 mt-24">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[var(--dada-red)] block mb-3">
            Part II
          </span>
          <h2 className="font-serif font-thin text-5xl md:text-6xl lg:text-7xl uppercase tracking-wider text-white">
            The Haute Couture <span className="italic font-light text-white/70">Gallery</span>
          </h2>
          <p className="font-sans text-xs text-white/50 max-w-xl mt-4 leading-relaxed uppercase tracking-wider">
            A visual and product-heavy showcase of our completed signature masterpieces, featuring hand-embroidered, structured, and surrealist designs.
          </p>
        </div>

        {/* SECTION 5: Feature Article - The Painted Steed (Horse to Jacket) */}
        {sections.find(s => s.id === "stallion")?.visible !== false && (
          <>
            <section className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Images side-by-side */}
              <div className="lg:col-span-6 flex flex-row gap-3 w-[90%] mx-auto lg:w-full lg:max-w-none group">
                {/* Inspiration View */}
                <div className="flex flex-col gap-2 w-1/2">
                  <div 
                    className="aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/5 rounded-lg relative cursor-zoom-in"
                    onClick={() => setActiveImage({
                      src: sections.find(s => s.id === "stallion")?.images.front || "/images/process/equine_dahlia_main.jpg",
                      alt: "Equine Dahlia original painting inspiration",
                      caption: "Inspiration: Equine Dahlia",
                      secondarySrc: sections.find(s => s.id === "stallion")?.images.back || "/images/process/perfect_jacket.png",
                      secondaryAlt: "Bespoke structured wool jacket with stallion embroidery",
                      secondaryCaption: "Bespoke Piece: Stallion Jacket"
                    })}
                  >
                    <img
                      src={sections.find(s => s.id === "stallion")?.images.front || "/images/process/equine_dahlia_main.jpg"}
                      alt="Equine Dahlia original painting inspiration"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-white/30 block">
                    Fig. 04 / Inspiration Painting
                  </span>
                </div>

                {/* Bespoke Piece View */}
                <div className="flex flex-col gap-2 w-1/2">
                  <div 
                    className="aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/5 rounded-lg relative cursor-zoom-in"
                    onClick={() => setActiveImage({
                      src: sections.find(s => s.id === "stallion")?.images.front || "/images/process/equine_dahlia_main.jpg",
                      alt: "Equine Dahlia original painting inspiration",
                      caption: "Inspiration: Equine Dahlia",
                      secondarySrc: sections.find(s => s.id === "stallion")?.images.back || "/images/process/perfect_jacket.png",
                      secondaryAlt: "Bespoke structured wool jacket with stallion embroidery",
                      secondaryCaption: "Bespoke Piece: Stallion Jacket"
                    })}
                  >
                    <img
                      src={sections.find(s => s.id === "stallion")?.images.back || "/images/process/perfect_jacket.png"}
                      alt="Bespoke structured wool jacket with stallion embroidery"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-white/30 block">
                    Fig. 05 / Stallion Jacket
                  </span>
                </div>
              </div>

              {/* Story Text */}
              <div className="lg:col-span-6 flex flex-col justify-center pl-0 lg:pl-8">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--dada-red)] mb-3 block">
                  05 / The Painted Steed
                </span>
                <h3 className="font-serif font-light text-3xl md:text-5xl uppercase tracking-wide mb-6 leading-tight">
                  The Painted <br />
                  <span className="italic font-normal">Steed</span>
                </h3>
                <p className="font-serif italic text-sm text-white/75 leading-relaxed mb-4">
                  Launching the visual runway with the raw, powerful equine designs.
                </p>
                <p className="font-sans text-xs text-white/50 leading-relaxed mb-6">
                  From Gabi's expressionist canvas of a charging stallion to a highly textured, paint-inspired embroidery spanning the back of a cropped, structured wool jacket.
                </p>
                <div className="space-y-4 font-sans text-xs text-white/45 leading-relaxed mb-8">
                  <p>
                    Directly inspired by Gabi's textured impasto oil painting, we sought to replicate the rich, layered palette-knife strokes of the canvas. We mapped the horse's silhouette onto a shorter, cropped haute couture wool jacket using hand-embroidery threads of varying thicknesses, ranging from thick wool yarns and corded lines to fine metallic and silk threads.
                  </p>
                  <p>
                    The deconstructed horse silhouette features unevenly cut fringe threads of varying lengths, with long, loose threads in deep blues, purples, and crimsons dripping dynamically down from the horse's body and tail. A scattering of small, hand-applied crystals adds a delicate catch-light shimmer, bringing the charging horse to life.
                  </p>
                </div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-[var(--dada-red)] pl-4 border-l border-white/10">
                  <strong>Interesting Fact:</strong> The stallion motif is engineered to match the client's shoulders perfectly, so that when worn, the movement of the body makes the horse appear to run.
                </p>
              </div>
            </section>
            <div className="w-full border-t border-white/10 my-16 md:my-24" />
          </>
        )}

        {/* SECTION 5b: Feature Article - Deconstructed Mondrian (Art to Blazer) */}
        {sections.find(s => s.id === "mondrian")?.visible !== false && (
          <>
            <section className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Images side-by-side */}
              <div className="lg:col-span-6 flex flex-row gap-3 w-[90%] mx-auto lg:w-full lg:max-w-none group">
                {/* Front View */}
                <div className="flex flex-col gap-2 w-1/2">
                  <div 
                    className="aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/5 rounded-lg relative cursor-zoom-in"
                    onClick={() => setActiveImage({
                      src: sections.find(s => s.id === "mondrian")?.images.front || "/images/process/mondrian_blazer_front.png",
                      alt: "Deconstructed Mondrian blazer front view",
                      caption: "Front View: Mondrian Embroidery",
                      secondarySrc: sections.find(s => s.id === "mondrian")?.images.back || "/images/process/mondrian_blazer_back.png",
                      secondaryAlt: "Deconstructed Mondrian blazer back view with embroidery",
                      secondaryCaption: "Back View: Mondrian Embroidery"
                    })}
                  >
                    <img
                      src={sections.find(s => s.id === "mondrian")?.images.front || "/images/process/mondrian_blazer_front.png"}
                      alt="Deconstructed Mondrian blazer front view"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-white/30 block">
                    Fig. 06 / Front View (Mondrian Embroidery)
                  </span>
                </div>

                {/* Back View */}
                <div className="flex flex-col gap-2 w-1/2">
                  <div 
                    className="aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/5 rounded-lg relative cursor-zoom-in"
                    onClick={() => setActiveImage({
                      src: sections.find(s => s.id === "mondrian")?.images.back || "/images/process/mondrian_blazer_back.png",
                      alt: "Deconstructed Mondrian blazer back view with embroidery",
                      caption: "Back View: Mondrian Embroidery",
                      secondarySrc: sections.find(s => s.id === "mondrian")?.images.front || "/images/process/mondrian_blazer_front.png",
                      secondaryAlt: "Deconstructed Mondrian blazer front view",
                      secondaryCaption: "Front View: Mondrian Embroidery"
                    })}
                  >
                    <img
                      src={sections.find(s => s.id === "mondrian")?.images.back || "/images/process/mondrian_blazer_back.png"}
                      alt="Deconstructed Mondrian blazer back view with embroidery"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-white/30 block">
                    Fig. 07 / Back View (Mondrian Embroidery)
                  </span>
                </div>
              </div>

              {/* Story Text */}
              <div className="lg:col-span-6 flex flex-col justify-center pl-0 lg:pl-8">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--dada-red)] mb-3 block">
                  06 / Deconstructed Mondrian
                </span>
                <h3 className="font-serif font-light text-3xl md:text-5xl uppercase tracking-wide mb-6 leading-tight">
                  Deconstructed <br />
                  <span className="italic font-normal">Mondrian</span>
                </h3>
                <p className="font-serif italic text-sm text-white/75 leading-relaxed mb-4">
                  Transitioning into structured, geometric modernism.
                </p>
                <p className="font-sans text-xs text-white/50 leading-relaxed mb-6">
                  Our collaborative architectural dialogue with Neo-Plasticism, translating Piet Mondrian's strict grid into a structured, deconstructed white blazer.
                </p>
                <div className="space-y-4 font-sans text-xs text-white/45 leading-relaxed mb-8">
                  <p>
                    Inspired by Mondrian's compositional balance, we both came up with the idea to use a thick, smooth, and highly structured white scuba diving fabric (neoprene) to hold a modern, cropped architectural silhouette. The vertical and horizontal grid lines are reimagined as dynamic, intersecting diagonals.
                  </p>
                  <p>
                    We hand-embroidered thick black structural cords directly onto the structured neoprene base. The resulting geometric panels are filled with textured French knots and micro-seed beads in the iconic primary color palette, vibrant yellow, deep cobalt blue, and rich scarlet red.
                  </p>
                </div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-[var(--dada-red)] pl-4 border-l border-white/10">
                  <strong>Bespoke Detail:</strong> The deconstructed Piet Mondrian-inspired embroidery wraps around both the front and back of the scuba blazer, making it a major artistic focal point from every angle.
                </p>
              </div>
            </section>
            <div className="w-full border-t border-white/10 my-16 md:my-24" />
          </>
        )}

        {/* SECTION 5c: Feature Article - Surrealist Miró Top (Art to Double-Layer Embroidery) */}
        {sections.find(s => s.id === "miro")?.visible !== false && (
          <>
            <section className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Images side-by-side */}
              <div className="lg:col-span-6 flex flex-row gap-3 w-[90%] mx-auto lg:w-full lg:max-w-none group">
                {/* Inspiration View */}
                <div className="flex flex-col gap-2 w-1/2">
                  <div 
                    className="aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/5 rounded-lg relative cursor-zoom-in"
                    onClick={() => setActiveImage({
                      src: sections.find(s => s.id === "miro")?.images.front || "/images/process/miro_inspiration.png",
                      alt: "Joan Miró inspired original painting",
                      caption: "Inspiration Painting (Original Art)",
                      secondarySrc: "/images/process/miro_top_front.png",
                      secondaryAlt: "Miró inspired double-layer embroidered top front view",
                      secondaryCaption: "Bespoke Top Front View",
                      tertiarySrc: sections.find(s => s.id === "miro")?.images.back || "/images/process/miro_top_back.png",
                      tertiaryAlt: "Miró inspired double-layer embroidered top back view",
                      tertiaryCaption: "Bespoke Top Back View",
                      initialSlide: 0
                    })}
                  >
                    <img
                      src={sections.find(s => s.id === "miro")?.images.front || "/images/process/miro_inspiration.png"}
                      alt="Joan Miró inspired original painting"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-white/30 block">
                    Fig. 08 / Inspiration Painting
                  </span>
                </div>

                {/* Front View */}
                <div className="flex flex-col gap-2 w-1/2">
                  <div 
                    className="aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/5 rounded-lg relative cursor-zoom-in"
                    onClick={() => setActiveImage({
                      src: sections.find(s => s.id === "miro")?.images.front || "/images/process/miro_inspiration.png",
                      alt: "Joan Miró inspired original painting",
                      caption: "Inspiration Painting (Original Art)",
                      secondarySrc: "/images/process/miro_top_front.png",
                      secondaryAlt: "Miró inspired double-layer embroidered top front view",
                      secondaryCaption: "Bespoke Top Front View",
                      tertiarySrc: sections.find(s => s.id === "miro")?.images.back || "/images/process/miro_top_back.png",
                      tertiaryAlt: "Miró inspired double-layer embroidered top back view",
                      tertiaryCaption: "Bespoke Top Back View",
                      initialSlide: 0
                    })}
                  >
                    <img
                      src="/images/process/miro_top_front.png"
                      alt="Miró inspired double-layer embroidered top front view"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-white/30 block">
                    Fig. 09 / Front View
                  </span>
                </div>
              </div>

              {/* Story Text */}
              <div className="lg:col-span-6 flex flex-col justify-center pl-0 lg:pl-8">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--dada-red)] mb-3 block">
                  07 / Constellation Miró
                </span>
                <h3 className="font-serif font-light text-3xl md:text-5xl uppercase tracking-wide mb-6 leading-tight">
                  Constellation <br />
                  <span className="italic font-normal">Miró</span>
                </h3>
                <p className="font-serif italic text-sm text-white/75 leading-relaxed mb-4">
                  Concluding with the ethereal, fluid, surrealist masterpiece.
                </p>
                <p className="font-sans text-xs text-white/50 leading-relaxed mb-6">
                  Our collaborative, whimsical surrealist composition, translating biomorphic lines into a double-layer embroidered haute couture top.
                </p>
                <div className="space-y-4 font-sans text-xs text-white/45 leading-relaxed mb-8">
                  <p>
                    Inspired by the organic forms and poetic symbolism of Joan Miró's paintings, we both came up with the idea to design a high-fashion, cropped double-layer embroidered top. The design explores how playful, celestial symbols can transition from flat canvas space into layered, tactile fashion statements.
                  </p>
                  <p>
                    The top is handcrafted from a double-layer construction featuring a base of fine structured lining layered beneath a transparent mesh overlay. The front is densely embroidered with biomorphic shapes, playful lines, and bold primary color highlights. The embroidery is executed using premium thick cotton and silk threads, creating a rich 3D composition that stands out in high relief against the body.
                  </p>
                </div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-[var(--dada-red)] pl-4 border-l border-white/10">
                  <strong>Bespoke Detail:</strong> The double-layer construction allows the whimsical embroidery motifs to float suspended over the skin, combining clean structural lines with delicate, semi-sheer transparency.
                </p>
              </div>
            </section>
            <div className="w-full border-t border-white/10 my-16 md:my-24" />
          </>
        )}

        {/* SECTION 6: The Alternating Editorial Collection Gallery */}
        {visibleLookbookItems.length > 0 && (
          <section className="pt-8">
            <div className="text-center mb-20">
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-[var(--dada-red)] mb-4 block">
                08 / Collection Showcase
              </span>
              <h2 className="font-serif font-thin text-4xl md:text-6xl tracking-wide uppercase">
                The Pieces
              </h2>
              <div className="w-12 h-[1px] bg-white/20 mx-auto mt-6" />
            </div>

            <div className="space-y-24">
              {visibleLookbookItems.map((item, index) => {
                const isEven = index % 2 === 0;
                const sectionConfig = sections.find(s => s.id === item.id);
                const paintingImg = sectionConfig?.images?.front || item.paintingImg;
                const gownImg = sectionConfig?.images?.back || item.gownImg;

                return (
                  <div key={item.id} id={item.id}>
                    <article
                      className={`flex flex-col ${
                        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                      } gap-12 lg:gap-20 items-center`}
                    >
                      {/* Media Segment: Painting and Gown Side-By-Side */}
                      <div className="w-full lg:w-1/2 flex flex-row gap-4 relative">
                        {/* 1. The Painting / Inspiration */}
                        <div className="w-1/2 flex flex-col gap-2 group">
                          <div 
                            className="aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/5 rounded-lg relative cursor-zoom-in"
                            onClick={() => setActiveImage({
                              src: paintingImg,
                              alt: `Inspiration Painting for ${item.title}`,
                              caption: `Inspiration: ${item.inspiration}`,
                              secondarySrc: gownImg,
                              secondaryAlt: `The completed ${item.title} haute couture gown`,
                              secondaryCaption: `Bespoke Piece: ${item.title}`
                            })}
                          >
                            <img
                              src={paintingImg}
                              alt={`Inspiration Painting for ${item.title}`}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                            />
                            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors" />
                          </div>
                          <span className="font-mono text-[8px] uppercase tracking-widest text-white/30 mt-1 block text-center lg:text-left">
                            Inspiration: {item.inspiration}
                          </span>
                        </div>

                        {/* 2. The Final Gown */}
                        <div className="w-1/2 flex flex-col gap-2 group">
                          <div 
                            className="aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/5 rounded-lg relative sm:translate-y-8 transition-transform duration-500 cursor-zoom-in"
                            onClick={() => setActiveImage({
                              src: gownImg,
                              alt: `The completed ${item.title} haute couture gown`,
                              caption: `Bespoke Piece: ${item.title}`,
                              secondarySrc: paintingImg,
                              secondaryAlt: `Inspiration Painting for ${item.title}`,
                              secondaryCaption: `Inspiration: ${item.inspiration}`
                            })}
                          >
                            <img
                              src={gownImg}
                              alt={`The completed ${item.title} haute couture gown`}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                          </div>
                          <span className="font-mono text-[8px] uppercase tracking-widest text-white/35 mt-1 sm:translate-y-8 block text-center lg:text-left">
                            Bespoke Piece: {item.title}
                          </span>
                        </div>
                      </div>

                      {/* Text Editorial Column */}
                      <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[var(--dada-red)] mb-2 block">
                          Look {index + 1}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-light text-white leading-none tracking-tight mb-3 uppercase">
                          {item.title}
                        </h2>
                        <span className="font-mono text-xs tracking-widest text-white/40 block mb-4">
                          {item.price} Commission
                        </span>
                        <div className="w-12 h-[1px] bg-white/20 mb-6" />
                        
                        <p className="font-serif italic text-sm md:text-base text-white/70 leading-relaxed mb-8">
                          {item.story}
                        </p>
                        
                        <div className="mb-10">
                          <span className="block font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 mb-2 border-l-2 border-[var(--dada-red)] pl-3">
                            The Craftsmanship
                          </span>
                          <p className="font-serif text-xs md:text-sm text-white/50 leading-relaxed pl-3">
                            {item.craft}
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-4">
                          <button
                            onClick={() => {
                              const matched = collection.find(c => c.title.toLowerCase() === item.title.toLowerCase());
                              if (matched) {
                                setSelectedDress(matched);
                                setSelectedLookId(item.id);
                                if (typeof window !== "undefined") {
                                  sessionStorage.setItem("lookbook_back_target", `/lookbook#${item.id}`);
                                }
                              }
                            }}
                            className="font-mono text-[10px] uppercase tracking-[0.3em] bg-white text-black hover:bg-[var(--dada-red)] hover:text-white py-3 px-8 rounded-full transition-all duration-300 inline-block text-center cursor-pointer"
                          >
                            Commission Look
                          </button>
                          <a
                            href={`/archive?from=lookbook&item=${item.id}`}
                            onClick={() => {
                              if (typeof window !== "undefined") {
                                sessionStorage.setItem("lookbook_back_target", `/lookbook#${item.id}`);
                              }
                            }}
                            className="font-mono text-[10px] uppercase tracking-[0.3em] border border-white/20 hover:border-white text-white py-3 px-8 rounded-full transition-all duration-300 inline-block text-center"
                          >
                            Explore Materials
                          </a>
                        </div>
                      </div>
                    </article>
                    {index < visibleLookbookItems.length - 1 && (
                      <div className="w-full border-t border-white/5 my-24" />
                    )}
                  </div>
                );
              })}

              {/* Back to Menu button at the bottom of Lookbook */}
              <div className="flex justify-center mt-24 mb-12">
                <a
                  href="/?menu=open"
                  className="font-mono text-xs uppercase tracking-[0.3em] border border-white/20 hover:border-[var(--dada-red)] text-white/80 hover:text-white py-4 px-8 rounded-full transition-all duration-300 bg-black/50 backdrop-blur-md shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  Back to Menu
                </a>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/95 flex flex-col justify-center items-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setActiveImage(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 z-[10001] cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImage(null);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Content Wrapper */}
            <div 
              className="w-full max-w-5xl flex flex-col items-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {activeImage.secondarySrc ? (
                /* Comparative Dual View (with optional carousel for second slot) */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-h-[80vh] overflow-y-auto md:overflow-visible">
                  {/* Left / Primary Image */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-full h-[40vh] md:h-[60vh] overflow-hidden rounded-lg bg-neutral-900 border border-white/5 relative">
                      <img 
                        src={activeImage.src} 
                        alt={activeImage.alt}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    {activeImage.caption && (
                      <p className="font-mono text-[9px] uppercase tracking-widest text-white/40 text-center">
                        {activeImage.caption}
                      </p>
                    )}
                  </div>

                  {/* Right / Secondary Image or Carousel */}
                  {activeImage.tertiarySrc ? (
                    (() => {
                      const slides = [
                        { src: activeImage.secondarySrc, alt: activeImage.secondaryAlt || activeImage.alt, caption: activeImage.secondaryCaption },
                        { src: activeImage.tertiarySrc, alt: activeImage.tertiaryAlt || activeImage.alt, caption: activeImage.tertiaryCaption }
                      ];
                      return (
                        <div className="flex flex-col items-center gap-2 w-full relative">
                          <div className="w-full h-[40vh] md:h-[60vh] overflow-hidden rounded-lg bg-neutral-900 border border-white/5 relative group/slider">
                            {/* Slide Display Area */}
                            <div className="w-full h-full relative overflow-hidden">
                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={currentSlide}
                                  drag="x"
                                  dragConstraints={{ left: 0, right: 0 }}
                                  dragElastic={0.2}
                                  onDragEnd={(e, info) => {
                                    if (info.offset.x < -50) {
                                      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
                                    } else if (info.offset.x > 50) {
                                      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
                                    }
                                  }}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -20 }}
                                  transition={{ duration: 0.3 }}
                                  className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                                >
                                  <img 
                                    src={slides[currentSlide].src} 
                                    alt={slides[currentSlide].alt}
                                    className="w-full h-full object-contain pointer-events-none"
                                  />
                                </motion.div>
                              </AnimatePresence>
                            </div>

                            {/* Left Navigation Arrow */}
                            <button
                              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 border border-white/10 opacity-100 md:opacity-0 md:group-hover/slider:opacity-100 transition-opacity z-[10002] cursor-pointer shadow-lg"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
                              }}
                              aria-label="Previous image"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <polyline points="15 18 9 12 15 6" />
                              </svg>
                            </button>
                            
                            {/* Right Navigation Arrow */}
                            <button
                              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 border border-white/10 opacity-100 md:opacity-0 md:group-hover/slider:opacity-100 transition-opacity z-[10002] cursor-pointer shadow-lg"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
                              }}
                              aria-label="Next image"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <polyline points="9 18 15 12 9 6" />
                              </svg>
                            </button>

                            {/* Swipe Dots Indicator */}
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-[10002] bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/5 animate-fade-in">
                              {slides.map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentSlide(idx);
                                  }}
                                  className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${currentSlide === idx ? 'bg-white w-3' : 'bg-white/40'}`}
                                  aria-label={`Go to slide ${idx + 1}`}
                                />
                              ))}
                            </div>
                          </div>
                          {slides[currentSlide].caption && (
                            <p className="font-mono text-[9px] uppercase tracking-widest text-white/40 text-center">
                              {slides[currentSlide].caption}
                            </p>
                          )}
                        </div>
                      );
                    })()
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-full h-[40vh] md:h-[60vh] overflow-hidden rounded-lg bg-neutral-900 border border-white/5 relative">
                        <img 
                          src={activeImage.secondarySrc} 
                          alt={activeImage.secondaryAlt || activeImage.alt}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      {activeImage.secondaryCaption && (
                        <p className="font-mono text-[9px] uppercase tracking-widest text-white/40 text-center">
                          {activeImage.secondaryCaption}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                /* Single Image View */
                <div className="flex flex-col items-center gap-4 w-full">
                  <div className="w-full h-[60vh] md:h-[75vh] overflow-hidden rounded-lg bg-neutral-900 border border-white/5 relative">
                    <img 
                      src={activeImage.src} 
                      alt={activeImage.alt}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {activeImage.caption && (
                    <p className="font-mono text-[9px] uppercase tracking-widest text-white/40 text-center">
                      {activeImage.caption}
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Commission / Checkout Modal */}
      {selectedDress && (
        <DressModal
          dress={selectedDress}
          onClose={() => {
            setSelectedDress(null);
            setSelectedLookId(null);
          }}
          fromPage="lookbook"
          lookbookItemId={selectedLookId}
        />
      )}
      <Footer />
    </div>
  );
}
