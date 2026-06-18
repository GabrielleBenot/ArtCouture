"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NewsItem {
  tag: string;
  title: string;
  date: string;
  description: string;
  image: string;
  cta?: string;
  ctaHref?: string;
}

const newsItems: NewsItem[] = [
  {
    tag: "Workshop",
    title: "Silk Painting at Art Couture",
    date: "Coming Soon",
    description:
      "Step into the world of pure artistry with our upcoming, invitation-only silk painting workshops. Guided by master techniques and infused with Art Couture's signature elegance, you will explore the centuries-old process of transforming silk into luminous works of wearable art. Spaces are strictly limited.",
    image:
      "https://storage.googleapis.com/mixo-sites/images/file-77426bbf-6aac-41f4-8c9f-16b8a9375343.PNG",
    cta: "Join the Waitlist",
    ctaHref: "#contact",
  },
  {
    tag: "Event",
    title: "Private Atelier Evening",
    date: "By Invitation",
    description:
      "An intimate evening inside the Art Couture atelier. View new collections before they are released, meet Gabrielle and Charmaigne, and experience haute couture up close with champagne and live painting. Limited to 20 guests.",
    image:
      "/images/atelier_evening.png",
    cta: "Request an Invitation",
    ctaHref: "#contact",
  },
  {
    tag: "Class",
    title: "The Art of Color: Watercolor Masterclass",
    date: "Quarterly",
    description:
      "Learn the color theory and watercolor techniques behind our couture patterns. Gabrielle Benot leads a hands-on session where you will create your own original artwork using the same methods that inspire our collections.",
    image:
      "https://storage.googleapis.com/mixo-sites/images/file-4b000517-aa66-445e-8e2e-89c2d295dc73.png",
    cta: "Register Interest",
    ctaHref: "#contact",
  },
  {
    tag: "Class",
    title: "Lunéville Embroidery: The French Art of the Hook",
    date: "Coming Soon",
    description:
      "Discover the centuries-old French technique of Lunéville embroidery, where a fine crochet hook transforms tulle into shimmering works of art. Learn to set beads, sequins, and crystals with precision in this intimate, hands-on masterclass.",
    image:
      "/images/luneville_embroidery.png",
    cta: "Join the Waitlist",
    ctaHref: "#contact",
  },
];

export function NewsEvents() {
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [colorCards, setColorCards] = useState<Set<number>>(new Set());
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const colorTimers = React.useRef<Map<number, NodeJS.Timeout>>(new Map());

  const handleCardTap = (index: number) => {
    // Toggle expanded state
    setExpandedCard(prev => prev === index ? null : index);
    // Start color timer
    if (!colorCards.has(index)) {
      const timer = setTimeout(() => {
        setColorCards(prev => new Set(prev).add(index));
      }, 2000);
      colorTimers.current.set(index, timer);
    }
  };

  const activeItem = newsItems.find((item) => item.title === activeEvent);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    formData.append('_subject', `Event Registration: ${activeItem?.title}`);
    formData.append('event', activeItem?.title || '');
    formData.append('type', activeItem?.tag || '');
    try {
      await fetch("https://formspree.io/f/mnjyyqan", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      setSubmitted(true);
      setTimeout(() => {
        setActiveEvent(null);
        setSubmitted(false);
      }, 3000);
    } catch {
      setActiveEvent(null);
      setSubmitted(false);
    }
  };

  return (
    <section className="py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20 md:mb-28"
        >
          <span className="block font-serif italic text-sm uppercase tracking-[0.2em] text-[var(--dada-red)] mb-6">
            What&apos;s Next
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-[9rem] font-serif font-extralight text-white leading-[0.85] tracking-tight">
            News<span className="text-[var(--dada-red)]">,</span><br />
            <span className="font-serif italic font-light">Events &amp; Classes</span>
          </h2>
        </motion.div>

        <div className="flex md:hidden gap-6 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 scrollbar-hide">
          {newsItems.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.33, 1, 0.68, 1] }}
              className="group flex-shrink-0 w-[75vw] snap-center"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={item.image}
                  alt={`Art Couture ${item.title} – ${item.tag}`}
                  loading="lazy"
                  className={`w-full h-full object-cover transition-all duration-1000 transform ${
                    colorCards.has(i) ? 'grayscale-0 scale-105' : 'grayscale'
                  }`}
                  onTouchStart={() => handleCardTap(i)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Tag */}
                <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white bg-[var(--dada-red)] px-3 py-1.5">
                  {item.tag}
                </span>
                {/* Card number */}
                <span className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                  {String(i + 1).padStart(2, '0')} / {String(newsItems.length).padStart(2, '0')}
                </span>
                {/* Title overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.3em] text-white/50 mb-1">
                    {item.date}
                  </span>
                  <h3 className="font-serif text-xl text-white font-light leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
              {/* Description always visible */}
              <div className="pt-4 pb-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.06em] leading-[1.8] text-white/50 line-clamp-4">
                  {item.description}
                </p>
              </div>
              {/* CTA button */}
              {item.cta && (
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveEvent(item.title); }}
                  className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--dada-red)] border border-[var(--dada-red)]/30 px-4 py-2.5 mt-2 cursor-pointer bg-transparent hover:bg-[var(--dada-red)] hover:text-white transition-all duration-300"
                >
                  {item.cta}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 6H11M7 2L11 6L7 10" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </button>
              )}
            </motion.article>
          ))}
        </div>
        {/* Swipe indicator */}
        <div className="flex md:hidden items-center justify-center gap-3 mt-4">
          <div className="flex gap-1.5">
            {newsItems.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--dada-red)]/30" />
            ))}
          </div>
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-1.5"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">Swipe</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[var(--dada-red)]/60">
              <path d="M3 8H13M10 5L13 8L10 11" stroke="currentColor" strokeWidth="1" />
            </svg>
          </motion.div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {newsItems.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="group flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden mb-6">
                <img
                  src={item.image}
                  alt={`Art Couture ${item.title} – ${item.tag}`}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                {/* Tag */}
                <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white bg-[var(--dada-red)] px-3 py-1.5">
                  {item.tag}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3">
                  {item.date}
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-white font-light leading-snug mb-4 group-hover:text-[var(--dada-red)] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="font-mono text-xs uppercase tracking-[0.1em] leading-[1.8] text-white/50 mb-6 flex-1">
                  {item.description}
                </p>
                {item.cta && (
                  <button
                    onClick={() => setActiveEvent(item.title)}
                    className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--dada-red)] hover:text-white transition-colors duration-300 border-b border-[var(--dada-red)]/30 hover:border-white/30 pb-1 self-start cursor-pointer bg-transparent"
                  >
                    {item.cta}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transform group-hover:translate-x-1 transition-transform duration-300">
                      <path d="M1 6H11M7 2L11 6L7 10" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </button>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Event Registration Modal */}
      <AnimatePresence>
        {activeEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6"
            onClick={() => { setActiveEvent(null); setSubmitted(false); }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative bg-[#fafaf8] w-full max-w-lg p-10 md:p-14 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => { setActiveEvent(null); setSubmitted(false); }}
                className="absolute top-5 right-5 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1" />
                </svg>
              </button>

              {!submitted ? (
                <>
                  {/* Header */}
                  <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--dada-red)] mb-2">
                    {activeItem?.tag}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-[var(--text-main)] font-light mb-2">
                    {activeItem?.title}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-8">
                    {activeItem?.cta}
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-transparent border-b border-[var(--text-muted)]/30 py-3 font-serif text-sm text-[var(--text-main)] focus:border-[var(--dada-red)] outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full bg-transparent border-b border-[var(--text-muted)]/30 py-3 font-serif text-sm text-[var(--text-main)] focus:border-[var(--dada-red)] outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full bg-transparent border-b border-[var(--text-muted)]/30 py-3 font-serif text-sm text-[var(--text-main)] focus:border-[var(--dada-red)] outline-none transition-colors"
                        placeholder="+27 ..."
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">
                        Message
                      </label>
                      <textarea
                        rows={3}
                        className="w-full bg-transparent border-b border-[var(--text-muted)]/30 py-3 font-serif text-sm text-[var(--text-main)] focus:border-[var(--dada-red)] outline-none transition-colors resize-none"
                        placeholder="Tell us about your interest..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-[var(--dada-red)] text-white font-mono text-xs uppercase tracking-[0.3em] hover:bg-[#c0350a] transition-colors duration-300 mt-4 cursor-pointer"
                    >
                      {activeItem?.cta || "Submit"}
                    </button>
                  </form>
                </>
              ) : (
                /* Confirmation */
                <div className="text-center py-8">
                  <div className="text-4xl mb-6">✓</div>
                  <h4 className="font-serif italic text-2xl text-[var(--text-main)] mb-3">
                    Thank you for your interest.
                  </h4>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] leading-relaxed">
                    We will be in touch within 24 hours<br />regarding {activeItem?.title}.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
