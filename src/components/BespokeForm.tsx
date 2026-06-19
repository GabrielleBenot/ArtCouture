"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BespokeFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BespokeForm({ isOpen, onClose }: BespokeFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    vision: "",
    inspirationType: "",
  });
  const [fileName, setFileName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent("Bespoke Inspiration Enquiry");
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Inspiration Type: ${formData.inspirationType || "Not specified"}\n\n` +
      `Vision:\n${formData.vision}\n\n` +
      (fileName ? `[Please attach your inspiration image: ${fileName}]\n\n` : "") +
      `---\nSent from Art Couture Website`
    );
    
    window.location.href = `mailto:artcouturestudio@gmail.com?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", vision: "", inspirationType: "" });
      setFileName("");
      onClose();
    }, 3000);
  };

  const inputClasses = "w-full bg-transparent border-b border-white/10 focus:border-[var(--dada-red)]/60 text-white text-sm font-mono tracking-wide py-3 px-0 outline-none transition-colors duration-500 placeholder:text-white/20 placeholder:font-mono placeholder:text-xs placeholder:tracking-[0.15em] placeholder:uppercase";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9990] flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Form container */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg bg-[#0e0e0e] border border-white/5 z-10"
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[var(--dada-red)]/40" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[var(--dada-red)]/40" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-white/30 hover:text-[var(--dada-red)] transition-colors duration-300 z-20"
              aria-label="Close form"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="p-10 md:p-12">
              {/* Header */}
              <span className="block font-mono text-[8px] uppercase tracking-[0.5em] text-[var(--dada-red)] mb-4">Bespoke Enquiry</span>
              <h3 className="font-serif font-light text-2xl md:text-3xl text-white/90 mb-2">Share Your Vision</h3>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 mb-10">
                Tell us about the image that inspires you
              </p>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name */}
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className={inputClasses}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email address"
                      required
                      className={inputClasses}
                    />
                  </div>

                  {/* Inspiration type */}
                  <div>
                    <select
                      name="inspirationType"
                      value={formData.inspirationType}
                      onChange={handleChange}
                      className={`${inputClasses} cursor-pointer appearance-none`}
                      style={{ backgroundImage: 'none' }}
                    >
                      <option value="" className="bg-[#0e0e0e] text-white/40">What inspires you?</option>
                      <option value="A Painting" className="bg-[#0e0e0e]">A Painting</option>
                      <option value="A Photograph" className="bg-[#0e0e0e]">A Photograph</option>
                      <option value="A Place" className="bg-[#0e0e0e]">A Place</option>
                      <option value="A Memory" className="bg-[#0e0e0e]">A Memory</option>
                      <option value="Something Else" className="bg-[#0e0e0e]">Something Else</option>
                    </select>
                  </div>

                  {/* Vision description */}
                  <div>
                    <textarea
                      name="vision"
                      value={formData.vision}
                      onChange={handleChange}
                      placeholder="Describe your vision, the colors, the feeling, the story you want to wear..."
                      required
                      rows={4}
                      className={`${inputClasses} resize-none`}
                    />
                  </div>

                  {/* File upload area */}
                  <div>
                    <label className="group flex items-center gap-4 py-4 border border-dashed border-white/10 hover:border-[var(--dada-red)]/30 px-5 cursor-pointer transition-all duration-500">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/20 group-hover:text-[var(--dada-red)]/60 transition-colors duration-300 flex-shrink-0">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                      </svg>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 group-hover:text-white/50 transition-colors duration-300">
                        {fileName || "Attach your inspiration image"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    <span className="block font-mono text-[7px] uppercase tracking-[0.2em] text-white/15 mt-2">
                      The image will be attached to the email that opens
                    </span>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="group relative w-full overflow-hidden border border-white/10 hover:border-[var(--dada-red)] py-4 transition-all duration-700"
                  >
                    <span className="absolute inset-0 bg-[var(--dada-red)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] origin-left" />
                    <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.4em] text-white/70 group-hover:text-white transition-colors duration-500">
                      Send Enquiry
                    </span>
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-12 h-12 rounded-full border border-[var(--dada-red)]/40 flex items-center justify-center mx-auto mb-6">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--dada-red)]">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-serif text-xl text-white/80 mb-2">Thank you</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
                    Your email client will open shortly
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
