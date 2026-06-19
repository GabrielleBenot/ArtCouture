"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import type { DressItem } from "./EditorialCollection";
import defaultOfferingsConfig from '@/lib/default_config.json';

interface CheckoutAgreementFormProps {
  type: "rent" | "purchase" | "commission";
  dress: DressItem;
  stripeLink?: string;
  onBack: () => void;
}

function CheckoutAgreementForm({ type, dress, stripeLink, onBack }: CheckoutAgreementFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSizingChart, setShowSizingChart] = useState(false);
  const [showFullTerms, setShowFullTerms] = useState(false);

  if (submitted) {
    const successTitle = 
      type === "rent" 
        ? "Rental Agreement Signed" 
        : type === "purchase"
        ? "Purchase Agreement Signed"
        : "Commission Agreement Signed";

    const successMessage = 
      type === "rent"
        ? "Your signed rental agreement has been recorded."
        : type === "purchase"
        ? "Your purchase agreement and return policy acknowledgment have been recorded."
        : "Your bespoke commission agreement and deposit authorization have been recorded.";

    return (
      <div className="w-full text-center py-12">
        <span className="text-4xl block mb-6">✓</span>
        <h3 className="font-serif italic text-2xl text-[var(--text-main)] mb-4">{successTitle}</h3>
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4 animate-pulse">
          {successMessage}
        </p>
        {stripeLink ? (
          <p className="font-sans text-xs text-black/50">
            Redirecting to Stripe checkout...
          </p>
        ) : (
          <p className="font-sans text-xs text-black/50">
            (Demo Mode: No payment URL configured for this sample.)
          </p>
        )}
        <button
          onClick={onBack}
          className="mt-8 bg-black text-white px-8 py-3 font-mono text-[10px] tracking-widest uppercase hover:bg-[var(--dada-red)] transition-colors duration-300 cursor-pointer"
        >
          Return to Options
        </button>
      </div>
    );
  }

  const formSubText = 
    type === "rent" 
      ? "Rental Agreement" 
      : type === "purchase"
      ? "Purchase Agreement"
      : "Bespoke Commission Agreement";

  const formTitle = 
    type === "rent"
      ? `${dress.title} Rental`
      : type === "purchase"
      ? `${dress.title} Purchase`
      : `${dress.title} Commission`;

  const formIntro =
    type === "rent"
      ? "Please complete the rental booking agreement below to proceed to the payment checkout."
      : type === "purchase"
      ? "Please review the sample purchase terms and complete the agreement below to proceed to checkout."
      : "Please complete the commission agreement and measurements below to secure your bespoke creation.";

  return (
    <div className="w-full">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-black/50 hover:text-black transition-colors focus:outline-none cursor-pointer"
      >
        <span>← Back to Options</span>
      </button>

      <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[var(--dada-red)] mb-2 block">
        {formSubText}
      </span>
      <h2 className="text-2xl md:text-3xl font-serif text-[var(--text-main)] mb-3 leading-none">
        {formTitle}
      </h2>
      <p className="font-serif italic text-sm text-[var(--text-muted)] leading-relaxed mb-6">
        {formIntro}
      </p>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setIsSubmitting(true);
          const form = e.currentTarget;
          const formData = new FormData(form);
          try {
            await fetch("https://formspree.io/f/mnjyyqan", {
              method: "POST",
              body: formData,
              headers: { Accept: "application/json" },
            });
            setSubmitted(true);
            if (stripeLink) {
              window.location.href = stripeLink;
            }
          } catch {
            setIsSubmitting(false);
          }
        }}
        className="space-y-6"
      >
        <input type="hidden" name="_subject" value={`Checkout Agreement (${type.toUpperCase()}): ${dress.title}`} />
        
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group">
            <input type="text" name="fullName" required className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer" placeholder=" " />
            <label className="absolute left-0 top-0 text-sm font-sans text-black/50 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Full Name</label>
          </div>
          <div className="relative group">
            <input type="email" name="email" required className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer" placeholder=" " />
            <label className="absolute left-0 top-0 text-sm font-sans text-black/50 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Email Address</label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group">
            <input type="tel" name="phone" required className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer" placeholder=" " />
            <label className="absolute left-0 top-0 text-sm font-sans text-black/50 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Phone Number</label>
          </div>

          {/* Conditional Dates */}
          {type === "commission" && (
            <div className="relative group">
              <input type="date" name="targetDeliveryDate" required className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer text-black/80" />
              <label className="absolute left-0 -top-4 text-xs font-sans text-black/50 pointer-events-none">Target Delivery Date</label>
            </div>
          )}
        </div>

        {type === "rent" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group">
              <input type="date" name="rentalStartDate" required className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer text-black/80" />
              <label className="absolute left-0 -top-4 text-xs font-sans text-black/50 pointer-events-none">Rental Start Date</label>
            </div>
            <div className="relative group">
              <input type="date" name="rentalEndDate" required className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer text-black/80" />
              <label className="absolute left-0 -top-4 text-xs font-sans text-black/50 pointer-events-none">Rental End Date (3-Day Limit)</label>
            </div>
          </div>
        )}

        {/* Shipping details for purchases */}
        {type === "purchase" && (
          <div className="space-y-6 pt-2">
            <div className="relative group">
              <input type="text" name="shippingAddress" required className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer" placeholder=" " />
              <label className="absolute left-0 top-0 text-sm font-sans text-black/50 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Shipping Address (Street, City, State, ZIP)</label>
            </div>
            <div className="relative group">
              <input type="text" name="billingAddress" required className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer" placeholder=" " />
              <label className="absolute left-0 top-0 text-sm font-sans text-black/50 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Billing Address (or "Same as shipping")</label>
            </div>
          </div>
        )}

        {/* Sizing Section */}
        <div className="border-t border-black/5 pt-4">
          <div className="flex justify-between items-center mb-3">
            <span className="block font-mono text-[9px] uppercase tracking-wider text-black/40">
              {type === "purchase" ? "Runway Sample Sizing" : "Sizing & Measurements (Inches)"}
            </span>
            <button 
              type="button"
              onClick={() => setShowSizingChart(!showSizingChart)}
              className="text-[9px] font-mono uppercase tracking-wider text-[var(--dada-red)] hover:text-black transition-colors focus:outline-none cursor-pointer underline decoration-dotted"
            >
              {showSizingChart ? "Hide Chart" : "View Sizing Chart"}
            </button>
          </div>

          <AnimatePresence>
            {showSizingChart && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden bg-black/5 rounded-sm p-4 text-[10px] font-mono mb-4 border border-black/5"
              >
                <div className="flex justify-between border-b border-black/10 pb-1 mb-2 font-bold uppercase tracking-wider text-black/60">
                  <span>Size</span>
                  <span>Bust (in)</span>
                  <span>Waist (in)</span>
                  <span>Hips (in)</span>
                </div>
                <div className="space-y-1 text-black/75">
                  <div className="flex justify-between border-b border-black/5 pb-1">
                    <span>XS (US 0-2)</span>
                    <span>32" - 33"</span>
                    <span>24" - 25"</span>
                    <span>34" - 35"</span>
                  </div>
                  <div className="flex justify-between border-b border-black/5 pb-1">
                    <span>S (US 4-6)</span>
                    <span>34" - 35"</span>
                    <span>26" - 27"</span>
                    <span>36" - 37"</span>
                  </div>
                  <div className="flex justify-between border-b border-black/5 pb-1">
                    <span>M (US 8)</span>
                    <span>36" - 37"</span>
                    <span>28" - 29"</span>
                    <span>38" - 39"</span>
                  </div>
                  <div className="flex justify-between">
                    <span>L (US 10-12)</span>
                    <span>38" - 40"</span>
                    <span>30" - 32"</span>
                    <span>40" - 42"</span>
                  </div>
                </div>
                <p className="font-sans italic text-[9px] text-black/50 mt-3 leading-relaxed">
                  {type === "purchase" 
                    ? "Verify your measurements against our sizing dimensions before purchase. Since runway pieces cannot be customized after shipment, checking measurements ensures a proper fit."
                    : "Note: These dimensions are for our runway sample garments. Because couture fabrics have limited stretch, please select the size where all your measurements fit comfortably within the ranges."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {type !== "purchase" && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="relative group">
                <input type="text" name="bust" required className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-mono focus:outline-none focus:border-[var(--dada-red)] transition-colors peer" placeholder=" " />
                <label className="absolute left-0 top-0 text-xs font-mono text-black/40 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[9px]">Bust</label>
              </div>
              <div className="relative group">
                <input type="text" name="waist" required className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-mono focus:outline-none focus:border-[var(--dada-red)] transition-colors peer" placeholder=" " />
                <label className="absolute left-0 top-0 text-xs font-mono text-black/40 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[9px]">Waist</label>
              </div>
              <div className="relative group">
                <input type="text" name="hips" required className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-mono focus:outline-none focus:border-[var(--dada-red)] transition-colors peer" placeholder=" " />
                <label className="absolute left-0 top-0 text-xs font-mono text-black/40 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[9px]">Hips</label>
              </div>
              <div className="relative group">
                <input type="text" name="height" required className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-mono focus:outline-none focus:border-[var(--dada-red)] transition-colors peer" placeholder=" " />
                <label className="absolute left-0 top-0 text-xs font-mono text-black/40 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[9px]">Height</label>
              </div>
            </div>
          )}
        </div>

        {/* Checkboxes */}
        <div className="space-y-4 pt-2 text-xs text-black/70">
          <div className="flex items-start gap-2.5">
            <input type="checkbox" required id="agreeSizing" name="agreeSizing" className="mt-0.5 accent-[var(--dada-red)] shrink-0 cursor-pointer" />
            <label htmlFor="agreeSizing" className="cursor-pointer select-none">
              {type === "rent"
                ? "I confirm that my measurements are accurate and that I have verified the sizing for this piece."
                : type === "purchase"
                ? "I confirm that I understand this runway sample is a fixed size and I have verified the dimensions."
                : "I confirm that my measurements are accurate and that I understand bespoke pieces are tailored custom to these dimensions."}
            </label>
          </div>
          <div className="flex items-start gap-2.5">
            <input type="checkbox" required id="agreeTerms" name="agreeTerms" className="mt-0.5 accent-[var(--dada-red)] shrink-0 cursor-pointer" />
            <div className="select-none">
              I agree to the{" "}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowFullTerms(!showFullTerms);
                }}
                className="underline hover:text-[var(--dada-red)] cursor-pointer focus:outline-none font-medium text-[var(--dada-red)]"
              >
                {type === "rent"
                  ? "Art Couture Rental Terms & Conditions"
                  : type === "purchase"
                  ? "Art Couture Purchase & Return Policies"
                  : "Art Couture Bespoke Commission Agreement"}
              </button>
              , including deposits, care policies, and liability conditions.
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showFullTerms && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden bg-black/5 rounded-sm p-4 text-[11px] font-sans text-black/75 mb-4 border border-black/5 space-y-3 leading-relaxed max-h-[220px] overflow-y-auto"
            >
              {type === "rent" && (
                <>
                  <p>
                    <strong>1. Rental Period:</strong> The rental period is strictly for three (3) consecutive days. The garment must be postmarked or returned to our Atelier by the third day.
                  </p>
                  <p>
                    <strong>2. Late Returns:</strong> Late returns will incur a late fee of $150 per day, up to the full retail value of the dress.
                  </p>
                  <p>
                    <strong>3. Specialty Cleaning:</strong> Professional dry cleaning is handled exclusively by the Atelier and is included. The renter must not attempt to wash, steam, dry clean, or iron the garment.
                  </p>
                  <p>
                    <strong>4. Sizing & Alterations:</strong> No alterations (temporary or permanent) may be made. Hem pinning, sewing, or taping is strictly prohibited.
                  </p>
                  <p>
                    <strong>5. Refundable Security Deposit:</strong> A refundable deposit hold will be processed at checkout and released within 3 to 5 business days of safe return and inspection.
                  </p>
                  <p>
                    <strong>6. Damage Policy:</strong> Light wear (minor loose threads/beads) is covered. The renter is liable for permanent stains, tears, burns, or loss of components up to the full retail value.
                  </p>
                </>
              )}
              {type === "purchase" && (
                <>
                  <p>
                    <strong>1. Runway Sample Condition:</strong> The client understands that purchased runway samples are unique, hand-crafted designer pieces that may have been worn in catwalk events or photoshoots. Minor textile variations are inherent to couture craftsmanship.
                  </p>
                  <p>
                    <strong>2. 7-Day Inspection Window:</strong> The client has seven (7) calendar days from delivery to inspect the garment. Returns are accepted for structure flaws or manufacturing defects.
                  </p>
                  <p>
                    <strong>3. Security Tag Policy:</strong> Garments ship with a prominent security tag. Returns are void if the tag has been cut, altered, or removed.
                  </p>
                  <p>
                    <strong>4. Final Sale:</strong> After the 7-day window passes or the tag is removed, the sale is final.
                  </p>
                </>
              )}
              {type === "commission" && (
                <>
                  <p>
                    <strong>1. Atelier Queue Slot:</strong> Payment of the 25% commission deposit reserves your slot in our Atelier production queue and initiates pattern design and fabric sourcing.
                  </p>
                  <p>
                    <strong>2. Deposit Curation Policy:</strong> Deposits are non-refundable once custom fabric production, textile sourcing, or manual pattern layouts have commenced.
                  </p>
                  <p>
                    <strong>3. Private Fittings:</strong> The commission includes up to three private fitting consultations. Delayed fittings will adjust the target delivery date.
                  </p>
                  <p>
                    <strong>4. Final Payment:</strong> The remaining 75% balance must be paid in full before the completed custom garment is released or shipped.
                  </p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Electronic Signature */}
        <div className="relative group pt-2">
          <input type="text" name="signature" required className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-serif italic focus:outline-none focus:border-[var(--dada-red)] transition-colors peer" placeholder=" " />
          <label className="absolute left-0 top-2 text-sm font-sans text-black/50 pointer-events-none transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-xs">Electronic Signature (Type Full Name)</label>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full bg-black text-white px-8 py-4 font-mono text-[10px] tracking-widest uppercase hover:bg-[var(--dada-red)] transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isSubmitting ? "Signing Agreement..." : "Agree & Proceed to Checkout"}
        </button>
      </form>
    </div>
  );
}

export function DressModal({ 
  dress, 
  onClose,
  fromShop = false
}: { 
  dress: DressItem, 
  onClose: () => void,
  fromShop?: boolean
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showRentalTerms, setShowRentalTerms] = useState(false);
  const [showAgreementForm, setShowAgreementForm] = useState(false);
  const [agreementType, setAgreementType] = useState<'rent' | 'purchase' | 'commission'>('rent');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [showPurchaseTerms, setShowPurchaseTerms] = useState(false);
  const [showCommissionTerms, setShowCommissionTerms] = useState(false);

  // Offerings config from localStorage
  interface OfferingConfig {
    purchaseSample?: {
      enabled: boolean;
      price?: string;
      stripeLink?: string;
    };
    commissionBespoke?: {
      enabled: boolean;
      depositAmount?: string;
      stripeLink?: string;
    };
    rentEditorial?: {
      enabled: boolean;
      dayRate?: string;
      securityDeposit?: string;
      stripeLink?: string;
    };
  }
  const [offerings, setOfferings] = useState<OfferingConfig | null>(null);
  const [offeringsLoaded, setOfferingsLoaded] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let localConfig: any = null;
    try {
      const raw = localStorage.getItem('artcouture_offerings');
      if (raw) {
        const config = JSON.parse(raw);
        if (config[dress.title]) {
          localConfig = config[dress.title];
        }
      }
    } catch {
      // localStorage unavailable or invalid JSON
    }

    // Start with default config as the base
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const defaults = (defaultOfferingsConfig as Record<string, any>)[dress.title] || null;
    
    // Merge: localStorage overrides defaults
    const itemConfig = defaults ? { ...defaults, ...(localConfig || {}) } : localConfig;

    if (itemConfig) {
      setOfferings({
        purchaseSample: itemConfig.purchaseSample,
        commissionBespoke: itemConfig.commissionBespoke,
        rentEditorial: itemConfig.rentPhotoshoot ? {
          enabled: itemConfig.rentPhotoshoot.enabled,
          dayRate: itemConfig.rentPhotoshoot.pricePer3Days || itemConfig.rentPhotoshoot.pricePerDay,
          securityDeposit: itemConfig.rentPhotoshoot.securityDeposit,
          stripeLink: itemConfig.rentPhotoshoot.stripeLink,
        } : undefined
      });
    }
    setOfferingsLoaded(true);
  }, [dress.title]);

  const images = [dress.img, ...(dress.detailImages || [])];
  const activeImage = images[activeImageIndex];

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-auto"
    >
      {/* Background Frost */}
      <div 
        className="absolute inset-0 bg-[#fafaf8]/95 backdrop-blur-2xl"
        onClick={onClose}
      />

      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
        className="relative w-full h-full md:w-[95vw] md:h-[95vh] bg-[#fafaf8] md:shadow-2xl md:rounded-2xl overflow-hidden flex flex-col md:flex-row pointer-events-auto"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-[100] w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full text-black hover:text-[var(--dada-red)] transition-colors group border border-black/10 hover:border-[var(--dada-red)]"
        >
          <span className="font-mono text-xs tracking-widest">X</span>
        </button>

        {/* Left: Image */}
        <div className="w-full md:w-[50%] h-[85vh] md:h-full shrink-0 relative p-4 md:p-6 lg:p-8">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
            className="w-full h-full relative overflow-hidden shadow-2xl rounded-sm bg-black"
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImageIndex}
                src={activeImage} 
                alt={dress.title} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full h-full object-cover absolute inset-0" 
              />
            </AnimatePresence>

            {/* Glassmorphism Editorial Index */}
            {images.length > 1 && (
              <div className="absolute top-1/3 -translate-y-1/2 left-3 md:left-4 z-50 py-3 md:py-4 px-3 md:px-4 rounded-lg bg-black/25 backdrop-blur-xl border border-white/10 shadow-2xl hidden md:flex flex-col gap-3 md:gap-4 items-start">
                {images.map((img, idx) => {
                  const labelSets: Record<string, string[]> = {
                    Dresses: ["The Silhouette", "The Bodice", "Fabric Detail", "The Hem", "Back View", "Details"],
                    Accessories: ["The Piece", "The Detail", "Material", "Clasp", "Worn View", "Details"],
                    Jackets: ["The Front", "The Back", "Lapel Detail", "Lining", "Sleeve", "Details"],
                    Jewelry: ["The Piece", "The Setting", "Gemstone", "Profile", "Worn View", "Details"],
                    Blouses: ["The Silhouette", "The Collar", "Fabric Detail", "The Cuff", "Back View", "Details"],
                  };
                  const labels = labelSets[dress.category] || labelSets.Dresses;
                  const label = labels[idx] || `Detail ${idx}`;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative text-left flex flex-col items-start transition-all duration-700 group pl-3 ${
                        activeImageIndex === idx 
                          ? 'opacity-100' 
                          : 'opacity-50 hover:opacity-100'
                      }`}
                    >
                      {/* Elegant Active Line Indicator */}
                      <div className={`absolute left-0 top-0.5 bottom-0.5 transition-all duration-500 rounded-full ${
                        activeImageIndex === idx 
                          ? 'w-[2px] bg-[var(--dada-red)] shadow-[0_0_10px_rgba(255,89,0,0.6)]' 
                          : 'w-[1px] bg-white/20 group-hover:bg-white/60'
                      }`} />
                      
                      <span className="font-mono text-[7px] md:text-[8px] tracking-[0.4em] uppercase text-white/70 mb-0.5 leading-none">
                        0{idx + 1}
                      </span>
                      <span className={`font-serif italic text-xs md:text-sm tracking-wider text-white transition-all duration-500 drop-shadow-md leading-none`}>
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
            
            {/* Elegant dark gradient overlay for text legibility - subtle on mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent md:from-black/80 md:via-black/10 pointer-events-none" />
            
            {/* Floating Fabric and Customization Text */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 text-white pr-4 hidden md:block"
            >
              <div className="mb-4 md:mb-6">
                <span className="block font-mono font-thin text-[10px] uppercase tracking-[0.4em] text-white/60 mb-2 border-l border-[var(--dada-red)] pl-3">The Fabric</span>
                <p className="font-serif font-light text-xs md:text-sm leading-relaxed tracking-wide opacity-95 pl-3 border-l border-transparent">
                  {dress.fabric}
                </p>
              </div>
              
              <div>
                <span className="block font-mono font-thin text-[10px] uppercase tracking-[0.4em] text-white/60 mb-2 border-l border-[var(--dada-red)] pl-3">Bespoke Customization</span>
                <p className="font-serif font-light text-xs md:text-sm leading-relaxed tracking-wide opacity-95 pl-3 border-l border-transparent">
                  {dress.customization}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile horizontal image tabs */}
          {images.length > 1 && (
            <div className="flex md:hidden gap-2 justify-center py-2 absolute bottom-4 left-0 right-0 z-50">
              {images.map((img, idx) => {
                const labels = ["Silhouette", "Bodice", "Fabric", "Hem", "Back", "Details"];
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`font-mono text-[8px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full transition-all duration-300 ${
                      activeImageIndex === idx
                        ? 'bg-white text-black'
                        : 'bg-black/40 text-white/70 backdrop-blur-sm'
                    }`}
                  >
                    {labels[idx] || `0${idx + 1}`}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Mobile: "Click for Details" Tab Button */}
        <button
          onClick={() => setMobileDrawerOpen(true)}
          className="md:hidden fixed left-0 bottom-16 z-30 flex items-center gap-2 bg-[#fafaf8]/90 backdrop-blur-md border border-l-0 border-black/15 pl-4 pr-5 py-3 rounded-r-full text-black/70 hover:text-black transition-all duration-300 shadow-[4px_0_15px_rgba(0,0,0,0.1)] cursor-pointer"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.25em]">Click for Details</span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--dada-red)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--dada-red)]"></span>
          </span>
        </button>

        {/* Mobile Details Drawer (Left-Side sliding panel) */}
        <AnimatePresence>
          {mobileDrawerOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileDrawerOpen(false)}
                className="md:hidden fixed inset-0 bg-black/50 z-[100001]"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 220 }}
                className="md:hidden fixed top-0 bottom-0 left-0 w-[92%] max-w-[420px] bg-[#fafaf8] border-r border-black/10 z-[100002] flex flex-col shadow-[10px_0_30px_rgba(0,0,0,0.15)] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <div className="flex justify-end p-4 shrink-0">
                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="text-black/40 hover:text-black/80 transition-colors p-1"
                    aria-label="Close details"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                {/* Drawer Content */}
                <div className="px-6 pb-10 flex-1">
                  <AnimatePresence mode="wait">
                    {!showAgreementForm ? (
                      <motion.div
                        key="drawer-options"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                      >
                        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[var(--dada-red)] mb-2 block">Haute Couture Collection</span>
                        <h2 className="text-2xl font-serif text-[var(--text-main)] mb-2 leading-none">{dress.title}</h2>
                        <span className="font-mono text-xs tracking-widest text-[var(--text-muted)] block mb-3">{dress.price}</span>
                        <p className="font-serif italic text-sm text-[var(--text-muted)] leading-relaxed mb-5">{dress.description}</p>

                        {/* Fabric & Customization */}
                        <div className="space-y-3 mb-6">
                          <div>
                            <span className="block font-mono text-[9px] uppercase tracking-[0.3em] text-black/40 mb-1 border-l-2 border-[var(--dada-red)] pl-2">The Fabric</span>
                            <p className="font-serif text-xs text-[var(--text-muted)] leading-relaxed pl-3">{dress.fabric}</p>
                          </div>
                          <div>
                            <span className="block font-mono text-[9px] uppercase tracking-[0.3em] text-black/40 mb-1 border-l-2 border-[var(--dada-red)] pl-2">Bespoke Customization</span>
                            <p className="font-serif text-xs text-[var(--text-muted)] leading-relaxed pl-3">{dress.customization}</p>
                          </div>
                        </div>

                        {/* Offerings */}
                        {offeringsLoaded && (
                          <div className="mb-6 pb-6 border-b border-black/10">
                            <h3 className="text-xs font-mono tracking-[0.2em] uppercase pb-3 mb-3">Available Options</h3>
                            {offerings ? (
                              <div className="space-y-3">
                                {offerings.purchaseSample?.enabled && (
                                  <div className={`border rounded-sm p-4 ${fromShop ? 'border-[var(--dada-red)]/40 bg-[var(--dada-red)]/[0.03]' : 'border-black/5'}`}>
                                    <span className="font-mono text-[10px] tracking-widest uppercase block">Purchase This Sample</span>
                                    <span className="font-serif italic text-xs text-[var(--text-muted)] block mt-1">This is the original piece as photographed</span>
                                    {offerings.purchaseSample.price && <span className="font-serif text-base text-[var(--text-main)] block mt-2">{offerings.purchaseSample.price}</span>}
                                    <button type="button" onClick={() => { setAgreementType('purchase'); setShowAgreementForm(true); }} className="mt-3 inline-flex items-center gap-2 bg-[var(--dada-red)] text-white px-6 py-2.5 font-mono text-[9px] tracking-widest uppercase hover:bg-black transition-colors duration-300 cursor-pointer">Purchase Now</button>
                                  </div>
                                )}
                                {offerings.commissionBespoke?.enabled && (
                                  <div className="border border-black/5 rounded-sm p-4">
                                    <span className="font-mono text-[10px] tracking-widest uppercase block">Commission This Design</span>
                                    <span className="font-serif italic text-xs text-[var(--text-muted)] block mt-1">Custom-crafted to your measurements</span>
                                    {offerings.commissionBespoke.depositAmount && <span className="font-serif text-base text-[var(--text-main)] block mt-2">{offerings.commissionBespoke.depositAmount}</span>}
                                    <button type="button" onClick={() => { setAgreementType('commission'); setShowAgreementForm(true); }} className="mt-3 inline-flex items-center gap-2 bg-[var(--dada-red)] text-white px-6 py-2.5 font-mono text-[9px] tracking-widest uppercase hover:bg-black transition-colors duration-300 cursor-pointer">Begin Commission</button>
                                  </div>
                                )}
                                {offerings.rentEditorial?.enabled && (
                                  <div className="border border-black/5 rounded-sm p-4">
                                    <span className="font-mono text-[10px] tracking-widest uppercase block">Rent for Editorial</span>
                                    <span className="font-serif italic text-xs text-[var(--text-muted)] block mt-1">3-day event or editorial shoot</span>
                                    {offerings.rentEditorial.dayRate && <span className="font-serif text-base text-[var(--text-main)] block mt-2">{offerings.rentEditorial.dayRate} / 3-day rental</span>}
                                    <button type="button" onClick={() => { setAgreementType('rent'); setShowAgreementForm(true); }} className="mt-3 inline-flex items-center gap-2 bg-[var(--dada-red)] text-white px-6 py-2.5 font-mono text-[9px] tracking-widest uppercase hover:bg-black transition-colors duration-300 cursor-pointer">Book Rental</button>
                                  </div>
                                )}
                              </div>
                            ) : dress.depositAmount ? (
                              <div className="border border-black/5 rounded-sm p-4">
                                <span className="font-mono text-[10px] tracking-widest uppercase block">Commission This Design</span>
                                <span className="font-serif italic text-xs text-[var(--text-muted)] block mt-1">Custom-crafted to your measurements and vision</span>
                                <button type="button" onClick={() => { setAgreementType('commission'); setShowAgreementForm(true); }} className="mt-3 inline-flex items-center gap-2 bg-[var(--dada-red)] text-white px-6 py-2.5 font-mono text-[9px] tracking-widest uppercase hover:bg-black transition-colors duration-300 cursor-pointer">Begin Commission with {dress.depositAmount} Deposit</button>
                              </div>
                            ) : null}
                          </div>
                        )}

                        {/* Inquiry Form */}
                        <div>
                          <h3 className="text-xs font-mono tracking-[0.2em] uppercase border-b border-black/10 pb-3 mb-5">Inquire About This Piece</h3>
                          {submitted ? (
                            <div className="text-center py-8">
                              <span className="text-3xl block mb-4">&#10003;</span>
                              <h3 className="font-serif italic text-xl text-[var(--text-main)] mb-3">Thank you for your inquiry.</h3>
                              <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">We will be in touch within 24 hours.</p>
                            </div>
                          ) : (
                            <form className="space-y-5" onSubmit={async (e) => {
                              e.preventDefault();
                              setIsSubmitting(true);
                              const form = e.currentTarget;
                              const formData = new FormData(form);
                              try {
                                await fetch("https://formspree.io/f/mnjyyqan", {
                                  method: "POST",
                                  body: formData,
                                  headers: { Accept: "application/json" },
                                });
                                setSubmitted(true);
                              } catch {
                                setIsSubmitting(false);
                              }
                            }}>
                              <input type="hidden" name="_subject" value={`Inquiry: ${dress.title}`} />
                              <div className="relative group">
                                <input type="text" name="firstName" required className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer" placeholder=" " />
                                <label className="absolute left-0 top-0 text-sm font-sans text-black/50 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">First Name</label>
                              </div>
                              <div className="relative group">
                                <input type="text" name="lastName" required className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer" placeholder=" " />
                                <label className="absolute left-0 top-0 text-sm font-sans text-black/50 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Last Name</label>
                              </div>
                              <div className="relative group">
                                <input type="email" name="email" required className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer" placeholder=" " />
                                <label className="absolute left-0 top-0 text-sm font-sans text-black/50 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Email Address</label>
                              </div>
                              <div className="relative group">
                                <textarea rows={2} name="message" required className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer resize-none" placeholder=" "></textarea>
                                <label className="absolute left-0 top-0 text-sm font-sans text-black/50 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Your Message</label>
                              </div>
                              <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white px-6 py-3 font-mono text-[10px] tracking-widest uppercase hover:bg-[var(--dada-red)] transition-colors duration-300 disabled:opacity-50">
                                {isSubmitting ? "Sending..." : "Send Inquiry"}
                              </button>
                            </form>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="drawer-checkout"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                      >
                        <CheckoutAgreementForm
                          type={agreementType}
                          dress={dress}
                          stripeLink={
                            agreementType === 'rent'
                              ? offerings?.rentEditorial?.stripeLink
                              : agreementType === 'purchase'
                              ? offerings?.purchaseSample?.stripeLink
                              : offerings?.commissionBespoke?.stripeLink || dress.depositLink
                          }
                          onBack={() => setShowAgreementForm(false)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Right: Content & Form (hidden on mobile, visible on desktop) */}
        <div 
          data-lenis-prevent
          className="hidden md:flex w-full md:w-[50%] flex-1 overflow-y-auto flex-col px-6 py-6 md:px-12 lg:px-16 md:py-8"
        >
          <AnimatePresence mode="wait">
            {!showAgreementForm ? (
              <motion.div
                key="options"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-lg w-full py-8 md:py-12"
              >
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[var(--dada-red)] mb-2 block">Haute Couture Collection</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[var(--text-main)] mb-3 leading-none">
              {dress.title}
            </h2>
            <span className="font-mono text-xs tracking-widest text-[var(--text-muted)] block mb-4">
              {dress.price}
            </span>
            <p className="font-serif italic text-base md:text-lg text-[var(--text-muted)] leading-relaxed mb-8">
              {dress.description}
            </p>

            {/* Offerings Section */}
            {offeringsLoaded && (
              <div className="mb-8 pb-8 border-b border-black/10">
                <h3 className="text-xs font-mono tracking-[0.2em] uppercase pb-3 mb-4">
                  Available Options
                </h3>

                {offerings ? (
                  <div className="space-y-3">
                    {/* Purchase Sample */}
                    {offerings.purchaseSample?.enabled && (
                      <div className={`border rounded-sm p-5 transition-colors duration-300 ${fromShop ? 'border-[var(--dada-red)]/40 bg-[var(--dada-red)]/[0.03] ring-1 ring-[var(--dada-red)]/10' : 'border-black/5 hover:border-[var(--dada-red)]/20'}`}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--dada-red)] shrink-0 mt-0.5">
                              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                              <line x1="3" y1="6" x2="21" y2="6" />
                              <path d="M16 10a4 4 0 01-8 0" />
                            </svg>
                            <div>
                              <span className="font-mono text-[10px] tracking-widest uppercase block">Purchase This Sample</span>
                              <span className="font-serif italic text-sm text-[var(--text-muted)] mt-1 block">This is the original piece as photographed</span>
                            </div>
                          </div>
                          {offerings.purchaseSample.price && (
                            <span className="font-serif text-lg text-[var(--text-main)] whitespace-nowrap">{offerings.purchaseSample.price}</span>
                          )}
                        </div>
                        <div className="mt-4 pl-[30px]">
                          <div className="mb-4">
                            <button
                              type="button"
                              onClick={() => setShowPurchaseTerms(!showPurchaseTerms)}
                              className="text-[10px] font-mono tracking-widest uppercase text-black/50 hover:text-[var(--dada-red)] transition-colors flex items-center gap-1 cursor-pointer focus:outline-none"
                            >
                              <span>{showPurchaseTerms ? '↓ Hide' : '→ View'} Purchase & Return Policy</span>
                            </button>
                            <AnimatePresence>
                              {showPurchaseTerms && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden mt-3 text-[11px] font-sans text-black/60 space-y-2 border-t border-black/5 pt-3 leading-relaxed"
                                >
                                  <p>
                                    <strong>Final Sale:</strong> Because our sample garments are delicate, one-of-a-kind runway pieces, all sample sales are final.
                                  </p>
                                  <p>
                                    <strong>Defect Policy:</strong> If a structural flaw or manufacturing defect is identified, we accept returns for a full refund or complimentary correction within 7 days of delivery.
                                  </p>
                                  <p>
                                    <strong>Return Condition:</strong> The garment must be returned in its original, unworn state with all security tags intact.
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setAgreementType('purchase');
                              setShowAgreementForm(true);
                            }}
                            className="inline-flex items-center gap-2 bg-[var(--dada-red)] text-white px-8 py-3 font-mono text-[10px] tracking-widest uppercase hover:bg-black transition-colors duration-300 cursor-pointer"
                          >
                            Purchase Now
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Commission Bespoke */}
                    {offerings.commissionBespoke?.enabled && (
                      <div className="border border-black/5 rounded-sm p-5 hover:border-[var(--dada-red)]/20 transition-colors duration-300">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--dada-red)] shrink-0 mt-0.5">
                              <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
                              <polyline points="14 2 14 8 20 8" />
                              <line x1="8" y1="13" x2="16" y2="13" />
                              <line x1="8" y1="17" x2="16" y2="17" />
                            </svg>
                            <div>
                              <span className="font-mono text-[10px] tracking-widest uppercase block">Commission This Design</span>
                              <span className="font-serif italic text-sm text-[var(--text-muted)] mt-1 block">Your piece will be custom-crafted to your measurements and vision</span>
                            </div>
                          </div>
                          {offerings.commissionBespoke.depositAmount && (
                            <span className="font-serif text-lg text-[var(--text-main)] whitespace-nowrap">{offerings.commissionBespoke.depositAmount}</span>
                          )}
                        </div>
                        <div className="mt-3 pl-[30px]">
                          <p className="font-serif italic text-xs text-[var(--text-muted)] mb-4">Remaining balance due at final fitting</p>
                          <div className="mb-4">
                            <button
                              type="button"
                              onClick={() => setShowCommissionTerms(!showCommissionTerms)}
                              className="text-[10px] font-mono tracking-widest uppercase text-black/50 hover:text-[var(--dada-red)] transition-colors flex items-center gap-1 cursor-pointer focus:outline-none"
                            >
                              <span>{showCommissionTerms ? '↓ Hide' : '→ View'} Commission & Deposit Policy</span>
                            </button>
                            <AnimatePresence>
                              {showCommissionTerms && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden mt-3 text-[11px] font-sans text-black/60 space-y-2 border-t border-black/5 pt-3 leading-relaxed"
                                >
                                  <p>
                                    <strong>Atelier Reservation:</strong> Your 25% deposit secures a place in our production queue and initiates custom pattern grading and fabric sourcing.
                                  </p>
                                  <p>
                                    <strong>Cancellation:</strong> Deposits are non-refundable once custom fabric production or manual pattern layout begins.
                                  </p>
                                  <p>
                                    <strong>Fittings:</strong> Commission includes up to three private fitting consultations. The remaining balance is payable upon final approval and collection.
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setAgreementType('commission');
                              setShowAgreementForm(true);
                            }}
                            className="inline-flex items-center gap-2 bg-[var(--dada-red)] text-white px-8 py-3 font-mono text-[10px] tracking-widest uppercase hover:bg-black transition-colors duration-300 cursor-pointer"
                          >
                            Begin Commission with {offerings.commissionBespoke.depositAmount || ''} Deposit
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Rent for Editorial */}
                    {offerings.rentEditorial?.enabled && (
                      <div className="border border-black/5 rounded-sm p-5 hover:border-[var(--dada-red)]/20 transition-colors duration-300">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--dada-red)] shrink-0 mt-0.5">
                              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                              <circle cx="12" cy="13" r="4" />
                            </svg>
                            <div>
                              <span className="font-mono text-[10px] tracking-widest uppercase block">Rent for Editorial</span>
                              <span className="font-serif italic text-sm text-[var(--text-muted)] mt-1 block">Rent this sample for a 3-day event or editorial shoot</span>
                            </div>
                          </div>
                          {offerings.rentEditorial.dayRate && (
                            <span className="font-serif text-lg text-[var(--text-main)] whitespace-nowrap">{offerings.rentEditorial.dayRate} / 3-day rental</span>
                          )}
                        </div>
                        <div className="mt-4 pl-[30px]">
                          <p className="font-serif italic text-xs text-[var(--text-muted)] mb-4">
                            A refundable security deposit of {offerings.rentEditorial.securityDeposit || '$1,250'} is required and will be returned upon safe return of the piece.
                          </p>
                          <div className="mb-4">
                            <button
                              type="button"
                              onClick={() => setShowRentalTerms(!showRentalTerms)}
                              className="text-[10px] font-mono tracking-widest uppercase text-black/50 hover:text-[var(--dada-red)] transition-colors flex items-center gap-1 cursor-pointer focus:outline-none"
                            >
                              <span>{showRentalTerms ? '↓ Hide' : '→ View'} Rental Terms & Conditions</span>
                            </button>
                            <AnimatePresence>
                              {showRentalTerms && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden mt-3 text-[11px] font-sans text-black/60 space-y-2 border-t border-black/5 pt-3 leading-relaxed"
                                >
                                  <p>
                                    <strong>Security Deposit:</strong> Held to protect these high-value runway pieces. Fully refunded within 3 to 5 business days of safe return and inspection.
                                  </p>
                                  <p>
                                    <strong>Rental Period:</strong> 3 full days. Return shipments must be postmarked or dropped off by the final day of the rental period.
                                  </p>
                                  <p>
                                    <strong>Care & Dry Cleaning:</strong> Professional specialty dry cleaning is included in your rental. Please do not attempt to clean or alter the garment yourself.
                                  </p>
                                  <p>
                                    <strong>Damages:</strong> Normal wear (minor loose threads or beads) is covered. Major damages, permanent stains, or unreturned items will incur fees deducted from the deposit.
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setAgreementType('rent');
                              setShowAgreementForm(true);
                            }}
                            className="inline-flex items-center gap-2 bg-[var(--dada-red)] text-white px-8 py-3 font-mono text-[10px] tracking-widest uppercase hover:bg-black transition-colors duration-300 cursor-pointer"
                          >
                            Book Rental
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : dress.depositAmount ? (
                  /* Fallback: original commission bespoke behavior */
                  <div className="border border-black/5 rounded-sm p-5 hover:border-[var(--dada-red)]/20 transition-colors duration-300">
                    <div className="flex items-start gap-3">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--dada-red)] shrink-0 mt-0.5">
                        <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="8" y1="13" x2="16" y2="13" />
                        <line x1="8" y1="17" x2="16" y2="17" />
                      </svg>
                      <div>
                        <span className="font-mono text-[10px] tracking-widest uppercase block">Commission This Design</span>
                        <span className="font-serif italic text-sm text-[var(--text-muted)] mt-1 block">Your piece will be custom-crafted to your measurements and vision</span>
                      </div>
                    </div>
                    <div className="mt-3 pl-[30px]">
                      <p className="font-serif italic text-xs text-[var(--text-muted)] mb-4">Remaining balance due at final fitting</p>
                      <button
                        type="button"
                        onClick={() => {
                          setAgreementType('commission');
                          setShowAgreementForm(true);
                        }}
                        className="inline-flex items-center gap-2 bg-[var(--dada-red)] text-white px-8 py-3 font-mono text-[10px] tracking-widest uppercase hover:bg-black transition-colors duration-300 cursor-pointer"
                      >
                        Begin Commission with {dress.depositAmount} Deposit
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            )}

            <div className="w-full">
              <h3 className="text-xs font-mono tracking-[0.2em] uppercase border-b border-black/10 pb-3 mb-6">
                Inquire About This Piece
              </h3>
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center py-12"
                >
                  <span className="text-4xl block mb-6">&#10003;</span>
                  <h3 className="font-serif italic text-2xl text-[var(--text-main)] mb-4">Thank you for your inquiry.</h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">We will be in touch within 24 hours to arrange your private consultation.</p>
                </motion.div>
              ) : (
              <form className="space-y-6" onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                const form = e.currentTarget;
                const formData = new FormData(form);
                try {
                  await fetch("https://formspree.io/f/mnjyyqan", {
                    method: "POST",
                    body: formData,
                    headers: { Accept: "application/json" },
                  });
                  setSubmitted(true);
                } catch {
                  setIsSubmitting(false);
                }
              }}>
                <input type="hidden" name="_subject" value={`Inquiry: ${dress.title}`} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input type="text" name="firstName" required className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer" placeholder=" " />
                    <label className="absolute left-0 top-0 text-sm font-sans text-black/50 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">First Name</label>
                  </div>
                  <div className="relative group">
                    <input type="text" name="lastName" required className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer" placeholder=" " />
                    <label className="absolute left-0 top-0 text-sm font-sans text-black/50 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Last Name</label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input type="email" name="email" required className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer" placeholder=" " />
                    <label className="absolute left-0 top-0 text-sm font-sans text-black/50 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Email Address</label>
                  </div>
                  <div className="relative group">
                    <input type="date" name="eventDate" className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer text-black/80" />
                    <label className="absolute left-0 -top-4 text-xs font-sans text-black/50 pointer-events-none">Event Date (Optional)</label>
                  </div>
                </div>

                <div className="relative group">
                  <textarea rows={2} name="message" required className="w-full bg-transparent border-b border-black/20 pb-2 text-sm font-sans focus:outline-none focus:border-[var(--dada-red)] transition-colors peer resize-none" placeholder=" "></textarea>
                  <label className="absolute left-0 top-0 text-sm font-sans text-black/50 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[var(--dada-red)] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">Your Message</label>
                </div>

                <MagneticButton className="mt-8">
                  <button type="submit" disabled={isSubmitting} className="bg-black text-white px-8 py-3 font-mono text-[10px] tracking-widest uppercase hover:bg-[var(--dada-red)] transition-colors duration-300 disabled:opacity-50">
                    {isSubmitting ? "Sending..." : "Send Inquiry"}
                  </button>
                </MagneticButton>
              </form>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="checkout-form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg w-full py-8 md:py-12"
          >
            <CheckoutAgreementForm
              type={agreementType}
              dress={dress}
              stripeLink={
                agreementType === 'rent'
                  ? offerings?.rentEditorial?.stripeLink
                  : agreementType === 'purchase'
                  ? offerings?.purchaseSample?.stripeLink
                  : offerings?.commissionBespoke?.stripeLink || dress.depositLink
              }
              onBack={() => setShowAgreementForm(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
      </motion.div>
    </motion.div>
  );
}
