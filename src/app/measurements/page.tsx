"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

interface MeasurementData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  dressTitle: string;
  customNotes: string;
  bust: string;
  underbust: string;
  waist: string;
  hips: string;
  backShoulderWidth: string;
  hollowToHem: string;
}

export default function MeasurementVaultPage() {
  const [step, setStep] = useState(1);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState<MeasurementData>({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    dressTitle: "",
    customNotes: "",
    bust: "",
    underbust: "",
    waist: "",
    hips: "",
    backShoulderWidth: "",
    hollowToHem: "",
  });

  useEffect(() => {
    document.title = "Bespoke Measurement Vault | Art Couture";
    
    // Autofill dress ordered if passed via query params
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const dress = params.get("dress");
      if (dress) {
        setFormData(prev => ({ ...prev, dressTitle: dress }));
      }
    }
  }, []);

  const handleInputChange = (field: keyof MeasurementData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    setErrorMsg(null);
    if (step === 1) {
      if (!formData.clientName || !formData.clientEmail) {
        setErrorMsg("Please enter your name and email address.");
        return false;
      }
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.clientEmail)) {
        setErrorMsg("Please enter a valid email address.");
        return false;
      }
    } else if (step === 2) {
      if (!formData.bust || !formData.underbust || !formData.waist) {
        setErrorMsg("Please provide all chest and waist measurements.");
        return false;
      }
    } else if (step === 3) {
      if (!formData.hips || !formData.backShoulderWidth || !formData.hollowToHem) {
        setErrorMsg("Please provide hips, shoulder, and height measurements.");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setErrorMsg(null);
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      // Save sizing details securely to Firestore
      const docRef = doc(db, "measurements", formData.clientEmail.toLowerCase().trim());
      await setDoc(docRef, {
        ...formData,
        submittedAt: new Date().toISOString(),
      });
      setSubmitSuccess(true);
    } catch (err: any) {
      console.error("Firestore submit error:", err);
      setErrorMsg("Failed to submit measurements. Please verify your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine active highlights on the SVG mannequin
  const isHighlighted = (line: string) => {
    if (focusedField === line) return true;
    if (step === 2 && ["bust", "underbust", "waist"].includes(line)) return true;
    if (step === 3 && ["hips", "backShoulderWidth", "hollowToHem"].includes(line)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[var(--dada-red)] selection:text-white pb-24">
      <Header />

      <div className="pt-32 px-6 md:px-12 max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--dada-red)] mb-3 block">
            Bespoke Commissions
          </span>
          <h1 className="font-serif font-thin text-3xl md:text-5xl tracking-[0.1em] uppercase mb-4">
            Measurement Vault
          </h1>
          <div className="w-12 h-[1px] bg-white/20 mx-auto" />
        </div>

        {submitSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center py-16 px-8 bg-neutral-950 border border-white/10 rounded-2xl"
          >
            <span className="text-5xl text-[var(--dada-red)] mb-6 block">✓</span>
            <h3 className="font-serif font-light text-2xl tracking-wide uppercase mb-3">
              Sizing Secured
            </h3>
            <p className="font-serif italic text-sm text-white/60 leading-relaxed mb-8">
              Thank you, {formData.clientName}. Your custom measurements have been encrypted and saved to your design file. Our atelier team will review them within 24 hours.
            </p>
            <a
              href="/"
              className="inline-block font-mono text-[10px] uppercase tracking-[0.3em] border border-white/20 hover:border-[var(--dada-red)] text-white hover:text-white px-8 py-3 rounded-full transition-all duration-300"
            >
              Return Home
            </a>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 items-stretch justify-center">
            {/* Left: Mannequin Visual Aid */}
            <div className="w-full lg:w-5/12 bg-neutral-950 border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center relative min-h-[400px]">
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/40 absolute top-6">
                Dynamic Anatomical Guide
              </span>

              {/* Interactive Mannequin SVG */}
              <svg
                viewBox="0 0 200 400"
                className="w-full max-w-[280px] h-auto text-white/10"
              >
                {/* Hanger neck and floor stand */}
                <line x1="100" y1="50" x2="100" y2="380" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 80 380 L 120 380" stroke="currentColor" strokeWidth="2" />
                <circle cx="100" cy="50" r="4" fill="currentColor" />

                {/* Shoulder Line */}
                <line
                  x1="65"
                  y1="90"
                  x2="135"
                  y2="90"
                  stroke={isHighlighted("backShoulderWidth") ? "var(--dada-red)" : "currentColor"}
                  strokeWidth={isHighlighted("backShoulderWidth") ? "2.5" : "1.5"}
                  className="transition-colors duration-500"
                />
                <circle cx="65" cy="90" r="3" fill={isHighlighted("backShoulderWidth") ? "var(--dada-red)" : "currentColor"} />
                <circle cx="135" cy="90" r="3" fill={isHighlighted("backShoulderWidth") ? "var(--dada-red)" : "currentColor"} />

                {/* Bust Line */}
                <path
                  d="M 60 130 C 80 135, 120 135, 140 130"
                  fill="none"
                  stroke={isHighlighted("bust") ? "var(--dada-red)" : "currentColor"}
                  strokeWidth={isHighlighted("bust") ? "2.5" : "1.5"}
                  className="transition-colors duration-500"
                />

                {/* Underbust Line */}
                <path
                  d="M 64 155 C 80 160, 120 160, 136 155"
                  fill="none"
                  stroke={isHighlighted("underbust") ? "var(--dada-red)" : "currentColor"}
                  strokeWidth={isHighlighted("underbust") ? "2.5" : "1.5"}
                  className="transition-colors duration-500"
                />

                {/* Waist Line */}
                <path
                  d="M 70 195 C 85 198, 115 198, 130 195"
                  fill="none"
                  stroke={isHighlighted("waist") ? "var(--dada-red)" : "currentColor"}
                  strokeWidth={isHighlighted("waist") ? "2.5" : "1.5"}
                  className="transition-colors duration-500"
                />

                {/* Hips Line */}
                <path
                  d="M 58 245 C 80 252, 120 252, 142 245"
                  fill="none"
                  stroke={isHighlighted("hips") ? "var(--dada-red)" : "currentColor"}
                  strokeWidth={isHighlighted("hips") ? "2.5" : "1.5"}
                  className="transition-colors duration-500"
                />

                {/* Hollow to Hem Line */}
                <line
                  x1="100"
                  y1="75"
                  x2="100"
                  y2="360"
                  stroke={isHighlighted("hollowToHem") ? "var(--dada-red)" : "currentColor"}
                  strokeWidth={isHighlighted("hollowToHem") ? "2.5" : "1.5"}
                  className="transition-colors duration-500"
                />
                <circle cx="100" cy="75" r="3" fill={isHighlighted("hollowToHem") ? "var(--dada-red)" : "currentColor"} />
                <line
                  x1="85"
                  y1="360"
                  x2="115"
                  y2="360"
                  stroke={isHighlighted("hollowToHem") ? "var(--dada-red)" : "currentColor"}
                  strokeWidth="2"
                />

                {/* Mannequin Silhouette Body outline */}
                <path
                  d="M 85 75 C 80 75, 70 85, 65 90 C 60 110, 58 130, 60 140 C 64 165, 72 185, 70 195 C 65 210, 58 230, 58 245 C 58 275, 65 315, 65 340"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.75"
                  strokeOpacity="0.15"
                />
                <path
                  d="M 115 75 C 120 75, 130 85, 135 90 C 140 110, 142 130, 140 140 C 136 165, 128 185, 130 195 C 135 210, 142 230, 142 245 C 142 275, 135 315, 135 340"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.75"
                  strokeOpacity="0.15"
                />
              </svg>

              {/* Dynamic Labels overlay next to mannequin */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none text-right font-mono text-[9px] uppercase tracking-widest text-white/50">
                {formData.backShoulderWidth && (
                  <div className="absolute top-[21%] left-[4%] text-left">
                    <span className="text-white font-medium block">Shoulders</span>
                    <span className="text-[var(--dada-red)]">{formData.backShoulderWidth} in</span>
                  </div>
                )}
                {formData.bust && (
                  <div className="absolute top-[31%] right-[4%]">
                    <span className="text-white font-medium block">Bust</span>
                    <span className="text-[var(--dada-red)]">{formData.bust} in</span>
                  </div>
                )}
                {formData.underbust && (
                  <div className="absolute top-[38%] left-[4%] text-left">
                    <span className="text-white font-medium block">Underbust</span>
                    <span className="text-[var(--dada-red)]">{formData.underbust} in</span>
                  </div>
                )}
                {formData.waist && (
                  <div className="absolute top-[47%] right-[4%]">
                    <span className="text-white font-medium block">Waist</span>
                    <span className="text-[var(--dada-red)]">{formData.waist} in</span>
                  </div>
                )}
                {formData.hips && (
                  <div className="absolute top-[59%] left-[4%] text-left">
                    <span className="text-white font-medium block">Hips</span>
                    <span className="text-[var(--dada-red)]">{formData.hips} in</span>
                  </div>
                )}
                {formData.hollowToHem && (
                  <div className="absolute bottom-[10%] right-[4%]">
                    <span className="text-white font-medium block">Hollow to Hem</span>
                    <span className="text-[var(--dada-red)]">{formData.hollowToHem} in</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Step Forms */}
            <div className="w-full lg:w-7/12 bg-neutral-950 border border-white/5 rounded-2xl p-8 flex flex-col justify-between min-h-[480px]">
              {/* Progress Steps Indicators */}
              <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">
                  Step {step} of 4: {step === 1 ? "Client Details" : step === 2 ? "Bust & Waist" : step === 3 ? "Hips & Height" : "Review & Submit"}
                </span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-[3px] rounded-full transition-all duration-300 ${
                        i <= step ? "w-6 bg-[var(--dada-red)]" : "w-2 bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="flex-grow flex flex-col justify-between">
                <div>
                  {errorMsg && (
                    <div className="bg-red-950/40 border border-red-500/20 text-red-300 text-xs py-3 px-4 rounded-lg mb-6">
                      {errorMsg}
                    </div>
                  )}

                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col gap-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex flex-col gap-2">
                            <label className="font-mono text-[9px] uppercase tracking-widest text-white/40">Client Name *</label>
                            <input
                              type="text"
                              required
                              placeholder="Gabrielle Benot"
                              value={formData.clientName}
                              onChange={(e) => handleInputChange("clientName", e.target.value)}
                              className="bg-transparent border-b border-white/10 focus:border-[var(--dada-red)] pb-2 font-mono text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="font-mono text-[9px] uppercase tracking-widest text-white/40">Client Email *</label>
                            <input
                              type="email"
                              required
                              placeholder="gabi@artcouture.studio"
                              value={formData.clientEmail}
                              onChange={(e) => handleInputChange("clientEmail", e.target.value)}
                              className="bg-transparent border-b border-white/10 focus:border-[var(--dada-red)] pb-2 font-mono text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex flex-col gap-2">
                            <label className="font-mono text-[9px] uppercase tracking-widest text-white/40">Client Phone</label>
                            <input
                              type="tel"
                              placeholder="+1 (555) 019-2834"
                              value={formData.clientPhone}
                              onChange={(e) => handleInputChange("clientPhone", e.target.value)}
                              className="bg-transparent border-b border-white/10 focus:border-[var(--dada-red)] pb-2 font-mono text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="font-mono text-[9px] uppercase tracking-widest text-white/40">Dress Commissioned</label>
                            <input
                              type="text"
                              placeholder="Fuchsia Majesty"
                              value={formData.dressTitle}
                              onChange={(e) => handleInputChange("dressTitle", e.target.value)}
                              className="bg-transparent border-b border-white/10 focus:border-[var(--dada-red)] pb-2 font-mono text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="font-mono text-[9px] uppercase tracking-widest text-white/40">Atelier Notes</label>
                          <textarea
                            rows={3}
                            placeholder="Any specific fitting concerns, height of planned heels, or unique sizing constraints..."
                            value={formData.customNotes}
                            onChange={(e) => handleInputChange("customNotes", e.target.value)}
                            className="bg-transparent border-b border-white/10 focus:border-[var(--dada-red)] pb-2 font-mono text-sm text-white placeholder:text-white/20 outline-none transition-colors resize-none"
                          />
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col gap-8"
                      >
                        <p className="font-serif italic text-xs text-white/50 leading-relaxed mb-2">
                          Use a soft measuring tape, keeping it horizontal and snug but not tight. Enter values in inches.
                        </p>

                        <div className="flex flex-col gap-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            <div className="flex flex-col gap-2">
                              <label className="font-mono text-[9px] uppercase tracking-widest text-white/40">1. Full Bust * (inches)</label>
                              <input
                                type="number"
                                step="0.1"
                                placeholder="34.5"
                                required
                                value={formData.bust}
                                onFocus={() => setFocusedField("bust")}
                                onBlur={() => setFocusedField(null)}
                                onChange={(e) => handleInputChange("bust", e.target.value)}
                                className="bg-transparent border-b border-white/10 focus:border-[var(--dada-red)] pb-2 font-mono text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                              />
                            </div>
                            <span className="font-serif italic text-[11px] text-white/40">
                              Measure across the fullest part of the bust.
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            <div className="flex flex-col gap-2">
                              <label className="font-mono text-[9px] uppercase tracking-widest text-white/40">2. Underbust * (inches)</label>
                              <input
                                type="number"
                                step="0.1"
                                placeholder="29.0"
                                required
                                value={formData.underbust}
                                onFocus={() => setFocusedField("underbust")}
                                onBlur={() => setFocusedField(null)}
                                onChange={(e) => handleInputChange("underbust", e.target.value)}
                                className="bg-transparent border-b border-white/10 focus:border-[var(--dada-red)] pb-2 font-mono text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                              />
                            </div>
                            <span className="font-serif italic text-[11px] text-white/40">
                              Measure directly below the bust rib cage.
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            <div className="flex flex-col gap-2">
                              <label className="font-mono text-[9px] uppercase tracking-widest text-white/40">3. Natural Waist * (inches)</label>
                              <input
                                type="number"
                                step="0.1"
                                placeholder="26.5"
                                required
                                value={formData.waist}
                                onFocus={() => setFocusedField("waist")}
                                onBlur={() => setFocusedField(null)}
                                onChange={(e) => handleInputChange("waist", e.target.value)}
                                className="bg-transparent border-b border-white/10 focus:border-[var(--dada-red)] pb-2 font-mono text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                              />
                            </div>
                            <span className="font-serif italic text-[11px] text-white/40">
                              Measure at the narrowest point of the torso.
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col gap-8"
                      >
                        <p className="font-serif italic text-xs text-white/50 leading-relaxed mb-2">
                          Ensure shoulders are relaxed and shoes of intended height are worn for hollow-to-hem measurements.
                        </p>

                        <div className="flex flex-col gap-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            <div className="flex flex-col gap-2">
                              <label className="font-mono text-[9px] uppercase tracking-widest text-white/40">4. Full Hips * (inches)</label>
                              <input
                                type="number"
                                step="0.1"
                                placeholder="37.5"
                                required
                                value={formData.hips}
                                onFocus={() => setFocusedField("hips")}
                                onBlur={() => setFocusedField(null)}
                                onChange={(e) => handleInputChange("hips", e.target.value)}
                                className="bg-transparent border-b border-white/10 focus:border-[var(--dada-red)] pb-2 font-mono text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                              />
                            </div>
                            <span className="font-serif italic text-[11px] text-white/40">
                              Measure around the widest part of the seat.
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            <div className="flex flex-col gap-2">
                              <label className="font-mono text-[9px] uppercase tracking-widest text-white/40">5. Back Shoulder Width * (inches)</label>
                              <input
                                type="number"
                                step="0.1"
                                placeholder="15.0"
                                required
                                value={formData.backShoulderWidth}
                                onFocus={() => setFocusedField("backShoulderWidth")}
                                onBlur={() => setFocusedField(null)}
                                onChange={(e) => handleInputChange("backShoulderWidth", e.target.value)}
                                className="bg-transparent border-b border-white/10 focus:border-[var(--dada-red)] pb-2 font-mono text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                              />
                            </div>
                            <span className="font-serif italic text-[11px] text-white/40">
                              Measure across the back, shoulder point to point.
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            <div className="flex flex-col gap-2">
                              <label className="font-mono text-[9px] uppercase tracking-widest text-white/40">6. Hollow to Hem * (inches)</label>
                              <input
                                type="number"
                                step="0.1"
                                placeholder="58.0"
                                required
                                value={formData.hollowToHem}
                                onFocus={() => setFocusedField("hollowToHem")}
                                onBlur={() => setFocusedField(null)}
                                onChange={(e) => handleInputChange("hollowToHem", e.target.value)}
                                className="bg-transparent border-b border-white/10 focus:border-[var(--dada-red)] pb-2 font-mono text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                              />
                            </div>
                            <span className="font-serif italic text-[11px] text-white/40">
                              Measure from hollow of throat straight to floor (wear intended heels).
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 4 && (
                      <motion.div
                        key="step-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col gap-6"
                      >
                        <p className="font-serif italic text-xs text-white/50 leading-relaxed mb-2">
                          Please verify your custom fitting inputs before locking them into the vault.
                        </p>

                        <div className="bg-neutral-900/40 border border-white/5 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 font-mono text-xs">
                          <div>
                            <span className="text-white/40 block text-[9px] uppercase tracking-widest mb-1">Name</span>
                            <span className="text-white font-medium text-sm">{formData.clientName}</span>
                          </div>
                          <div>
                            <span className="text-white/40 block text-[9px] uppercase tracking-widest mb-1">Email</span>
                            <span className="text-white font-medium text-sm">{formData.clientEmail}</span>
                          </div>
                          <div className="md:col-span-2 border-t border-white/5 my-2" />
                          <div>
                            <span className="text-white/40 block text-[9px] uppercase tracking-widest mb-1">Bust</span>
                            <span className="text-[var(--dada-red)] text-sm">{formData.bust} inches</span>
                          </div>
                          <div>
                            <span className="text-white/40 block text-[9px] uppercase tracking-widest mb-1">Underbust</span>
                            <span className="text-[var(--dada-red)] text-sm">{formData.underbust} inches</span>
                          </div>
                          <div>
                            <span className="text-white/40 block text-[9px] uppercase tracking-widest mb-1">Waist</span>
                            <span className="text-[var(--dada-red)] text-sm">{formData.waist} inches</span>
                          </div>
                          <div>
                            <span className="text-white/40 block text-[9px] uppercase tracking-widest mb-1">Hips</span>
                            <span className="text-[var(--dada-red)] text-sm">{formData.hips} inches</span>
                          </div>
                          <div>
                            <span className="text-white/40 block text-[9px] uppercase tracking-widest mb-1">Shoulder Width</span>
                            <span className="text-[var(--dada-red)] text-sm">{formData.backShoulderWidth} inches</span>
                          </div>
                          <div>
                            <span className="text-white/40 block text-[9px] uppercase tracking-widest mb-1">Hollow to Hem</span>
                            <span className="text-[var(--dada-red)] text-sm">{formData.hollowToHem} inches</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Form Navigation Controls */}
                <div className="flex gap-4 mt-12 pt-6 border-t border-white/5">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={isSubmitting}
                      className="font-mono text-[10px] uppercase tracking-[0.25em] border border-white/10 hover:border-white/30 text-white/70 hover:text-white py-3 px-6 rounded-full transition-all cursor-pointer bg-transparent"
                    >
                      Back
                    </button>
                  )}
                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex-grow font-mono text-[10px] uppercase tracking-[0.25em] bg-white text-black hover:bg-[var(--dada-red)] hover:text-white py-3 px-6 rounded-full transition-all duration-300 cursor-pointer text-center"
                    >
                      Continue Fitting
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-grow font-mono text-[10px] uppercase tracking-[0.25em] bg-[var(--dada-red)] text-white hover:bg-white hover:text-black py-3 px-6 rounded-full transition-all duration-300 cursor-pointer disabled:opacity-50 text-center"
                    >
                      {isSubmitting ? "Locking in Vault..." : "Submit to Vault"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
