'use client';

import React, { useState, useEffect, useCallback, useRef, DragEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { OfferingConfig, ItemOfferings } from '@/lib/useOfferings';
import default_config from '@/lib/default_config.json';

/* ─────────────────────────────────────────────
   Garment Data
   ───────────────────────────────────────────── */

interface GarmentData {
  title: string;
  category: string;
  price: string;
  depositAmount: string;
  depositLink: string;
  img: string;
}

interface VaultImage {
  id: string;
  name: string;
  dataUrl: string;
  uploadedAt: string;
}

const GARMENTS: GarmentData[] = [
  { title: 'Fuchsia Majesty', category: 'Dresses', price: '$7,955', depositAmount: '$2,000', depositLink: 'https://buy.stripe.com/3cI14nd5q0301L3fH6b3q00', img: 'https://storage.googleapis.com/mixo-sites/images/file-b1585176-4ab0-4441-9ca1-0979786596cd.jpg' },
  { title: 'Blush Enchantress', category: 'Dresses', price: '$8,700', depositAmount: '$2,200', depositLink: 'https://buy.stripe.com/5kQdR9e9uaHE1L37aAb3q04', img: '/images/blush_enchantress.jpg' },
  { title: 'Golden Whisper', category: 'Dresses', price: '$9,200', depositAmount: '$2,300', depositLink: 'https://buy.stripe.com/cNi00jaXi3fc0GZ9iIb3q01', img: 'https://storage.googleapis.com/mixo-sites/images/file-fbdb7417-d98d-4d96-99ed-20eb22b057ae.jpg' },
  { title: 'Crimson Allure', category: 'Dresses', price: '$7,980', depositAmount: '$2,000', depositLink: 'https://buy.stripe.com/eVq3cv0iE7vs89rdyYb3q02', img: 'https://storage.googleapis.com/mixo-sites/images/file-efa8732c-2726-4513-9f7d-66e84a3ead12.jpg' },
  { title: 'Blush Couture', category: 'Dresses', price: '$11,700', depositAmount: '$3,000', depositLink: 'https://buy.stripe.com/14AaEXaXig1YgFX8eEb3q03', img: 'https://storage.googleapis.com/mixo-sites/images/file-e25b0f24-1bdb-4182-886e-58dd451f1664.jpg' },
  { title: 'Pearl Symphony', category: 'Accessories', price: '$4,200', depositAmount: '$1,000', depositLink: '', img: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80' },
  { title: 'Obsidian Clutch', category: 'Accessories', price: '$5,500', depositAmount: '$1,500', depositLink: '', img: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80' },
  { title: 'Crystal Steps', category: 'Accessories', price: '$2,800', depositAmount: '$700', depositLink: '', img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80' },
  { title: 'Golden Hour', category: 'Accessories', price: '$3,100', depositAmount: '$800', depositLink: '', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80' },
  { title: 'Velvet Veil', category: 'Accessories', price: '$1,500', depositAmount: '$400', depositLink: '', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80' },
  { title: 'Midnight Elegance', category: 'Dresses', price: '$8,850', depositAmount: '$2,200', depositLink: 'https://buy.stripe.com/3cI14n9Te4jg75namMb3q05', img: 'https://storage.googleapis.com/mixo-sites/images/file-fd88942d-471c-4ef4-ac9b-1d4292999cb3.jpg' },
  { title: 'Noir Power', category: 'Jackets', price: '$7,200', depositAmount: '$1,800', depositLink: '', img: '/collections/jacket_two.png' },
  { title: 'Ivory Architecture', category: 'Jackets', price: '$9,100', depositAmount: '$2,300', depositLink: '', img: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=800&q=80' },
  { title: 'Crimson Drape', category: 'Jackets', price: '$6,500', depositAmount: '$1,600', depositLink: '', img: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80' },
  { title: 'Onyx Edge', category: 'Jackets', price: '$8,200', depositAmount: '$2,000', depositLink: '', img: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80' },
  { title: 'Tweed Illusion', category: 'Jackets', price: '$7,800', depositAmount: '$2,000', depositLink: '', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80' },
  { title: 'Ivory Cascade', category: 'Blouses', price: '$3,400', depositAmount: '$850', depositLink: '', img: 'https://storage.googleapis.com/mixo-sites/images/file-77426bbf-6aac-41f4-8c9f-16b8a9375343.PNG' },
  { title: 'Chiffon Whisper', category: 'Blouses', price: '$2,900', depositAmount: '$700', depositLink: '', img: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=800&q=80' },
  { title: 'Satin Armor', category: 'Blouses', price: '$3,800', depositAmount: '$950', depositLink: '', img: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80' },
  { title: 'Organza Cloud', category: 'Blouses', price: '$4,100', depositAmount: '$1,000', depositLink: '', img: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80' },
  { title: 'Silk Essential', category: 'Blouses', price: '$2,200', depositAmount: '$550', depositLink: '', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80' },
  { title: 'Lace Romance', category: 'Blouses', price: '$4,500', depositAmount: '$1,100', depositLink: '', img: 'https://images.unsplash.com/photo-1574291814206-363acdf2aa79?w=800&q=80' },
];

/* ─────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────── */

const STORAGE_KEY = 'artcouture_offerings';
const SESSION_KEY = 'artcouture_admin_auth';
const ADMIN_PASSWORD = 'artcouture2025';
const VAULT_KEY = 'artcouture_vault';
const IMAGE_OVERRIDES_KEY = 'artcouture_image_overrides';
const HIDDEN_KEY = 'artcouture_hidden_items';
const PHOTO_SLOTS_KEY = 'artcouture_photo_slots';

const SLOT_LABELS: Record<string, string[]> = {
  Dresses: ['The Silhouette', 'The Bodice', 'Fabric Detail', 'The Hem', 'Back View', 'Details'],
  Accessories: ['The Piece', 'The Detail', 'Material', 'Clasp', 'Worn View', 'Details'],
  Jackets: ['The Front', 'The Back', 'Lapel Detail', 'Lining', 'Sleeve', 'Details'],
  Jewelry: ['The Piece', 'The Setting', 'Gemstone', 'Profile', 'Worn View', 'Details'],
  Blouses: ['The Silhouette', 'The Collar', 'Fabric Detail', 'The Cuff', 'Back View', 'Details'],
};

/* ─────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────── */

function calculateDefaultSecurityDeposit(priceStr: string): string {
  const num = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
  if (isNaN(num)) return '$1,250';
  const pct15 = num * 0.15;
  const rounded = Math.round(pct15 / 50) * 50;
  return `$${rounded.toLocaleString('en-US')}`;
}

function calculateDefaultRentalPrice(priceStr: string): string {
  const num = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
  if (isNaN(num)) return '$500';
  const pct6 = num * 0.06;
  const rounded = Math.round(pct6 / 50) * 50;
  const finalVal = Math.max(150, rounded);
  return `$${finalVal.toLocaleString('en-US')}`;
}

function buildDefaults(): OfferingConfig {
  const config: OfferingConfig = {};
  for (const g of GARMENTS) {
    config[g.title] = {
      purchaseSample: { enabled: false, price: g.price, stripeLink: '' },
      commissionBespoke: { enabled: true, depositAmount: g.depositAmount, stripeLink: g.depositLink },
      rentPhotoshoot: { enabled: false, pricePer3Days: calculateDefaultRentalPrice(g.price), securityDeposit: calculateDefaultSecurityDeposit(g.price), stripeLink: '' },
    };
  }
  return config;
}

function loadConfig(): OfferingConfig {
  if (typeof window === 'undefined') return default_config as OfferingConfig;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(default_config));
      return default_config as OfferingConfig;
    }
    return JSON.parse(raw) as OfferingConfig;
  } catch {
    return default_config as OfferingConfig;
  }
}

/* ─────────────────────────────────────────────
   Toggle Switch Component
   ───────────────────────────────────────────── */

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`
        relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full
        border-2 border-transparent transition-colors duration-200 ease-in-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
        ${enabled ? 'bg-emerald-500' : 'bg-white/15'}
      `}
      role="switch"
      aria-checked={enabled}
    >
      <span
        className={`
          pointer-events-none inline-block h-5 w-5 rounded-full bg-white
          shadow-lg ring-0 transition-transform duration-200 ease-in-out
          ${enabled ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
  );
}

/* ─────────────────────────────────────────────
   Status Dot
   ───────────────────────────────────────────── */

function StatusDot({ active }: { active: boolean }) {
  return (
    <span
      className={`
        inline-block h-2 w-2 rounded-full shrink-0
        ${active ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]' : 'bg-white/20'}
      `}
    />
  );
}

/* ─────────────────────────────────────────────
   Input Field
   ───────────────────────────────────────────── */

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-mono uppercase tracking-wider text-white/40">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full rounded-md bg-white/5 border border-white/10 px-3 py-2
          text-sm text-white placeholder:text-white/25 font-mono
          focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/10
          transition-colors
        "
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Offering Section (per type)
   ───────────────────────────────────────────── */

function OfferingSection({
  label,
  enabled,
  onToggle,
  children,
}: {
  label: string;
  enabled: boolean;
  onToggle: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-white/8 bg-white/[0.02] p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <StatusDot active={enabled} />
          <span className="text-xs font-mono uppercase tracking-wider text-white/60">
            {label}
          </span>
        </div>
        <Toggle enabled={enabled} onChange={onToggle} />
      </div>
      <AnimatePresence>
        {enabled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-3 pt-2 border-t border-white/6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Image Picker Modal
   ───────────────────────────────────────────── */

function ImagePickerModal({
  garmentTitle,
  currentImg,
  originalImg,
  onSelect,
  onClose,
}: {
  garmentTitle: string;
  currentImg: string;
  originalImg: string;
  onSelect: (imageUrl: string | null) => void;
  onClose: () => void;
}) {
  const [vaultImages, setVaultImages] = useState<VaultImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(VAULT_KEY);
      if (raw) setVaultImages(JSON.parse(raw) as VaultImage[]);
    } catch {
      // ignore
    }
  }, []);

  const handleUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const accepted = ['image/jpeg', 'image/png', 'image/webp'];
    Array.from(files).forEach((file) => {
      if (!accepted.includes(file.type)) return;
      const reader = new FileReader();
      reader.onload = () => {
        const entry: VaultImage = {
          id: crypto.randomUUID(),
          name: file.name,
          dataUrl: reader.result as string,
          uploadedAt: new Date().toISOString(),
        };
        setVaultImages((prev) => {
          const next = [entry, ...prev];
          localStorage.setItem(VAULT_KEY, JSON.stringify(next));
          return next;
        });
      };
      reader.readAsDataURL(file);
    });
    if (e.target) e.target.value = '';
  }, []);

  const isOverridden = currentImg !== originalImg;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className="relative bg-[#0a0a0a] border border-white/10 rounded-xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/8 shrink-0">
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-white/80">
              Swap Image
            </h3>
            <p className="text-[10px] font-mono text-white/30 mt-0.5">
              {garmentTitle}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isOverridden && (
              <button
                onClick={() => onSelect(null)}
                className="
                  px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider
                  bg-amber-500/10 text-amber-300 border border-amber-500/20
                  hover:bg-amber-500/20 transition-all cursor-pointer
                "
              >
                Use Original
              </button>
            )}
            <button
              onClick={onClose}
              className="
                w-8 h-8 rounded-lg bg-white/5 border border-white/10
                flex items-center justify-center
                hover:bg-white/10 transition-colors cursor-pointer
              "
            >
              <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Upload button */}
        <div className="p-4 border-b border-white/6 shrink-0">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="
              w-full rounded-lg border border-dashed border-white/15 bg-white/[0.02]
              py-3 flex items-center justify-center gap-2
              text-xs font-mono text-white/40 uppercase tracking-wider
              hover:border-white/30 hover:text-white/60 hover:bg-white/[0.04]
              transition-all cursor-pointer
            "
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Upload New Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleUpload}
            className="hidden"
          />
        </div>

        {/* Image grid */}
        <div 
          data-lenis-prevent
          className="flex-1 overflow-y-auto p-4"
        >
          {vaultImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm font-mono text-white/25">
                No images in the vault yet. Upload one above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {vaultImages.map((img) => {
                const isSelected = currentImg === img.dataUrl;
                return (
                  <button
                    key={img.id}
                    onClick={() => onSelect(img.dataUrl)}
                    className={`
                      relative aspect-square rounded-lg overflow-hidden
                      border-2 transition-all cursor-pointer group
                      ${isSelected
                        ? 'border-emerald-400 ring-2 ring-emerald-400/30'
                        : 'border-white/8 hover:border-white/25'
                      }
                    `}
                  >
                    <img
                      src={img.dataUrl}
                      alt={img.name}
                      className="w-full h-full object-cover"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-emerald-400/10 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 inset-x-0 bg-black/60 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-[9px] font-mono text-white/70 truncate">{img.name}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Garment Card
   ───────────────────────────────────────────── */

function GarmentCard({
  garment,
  offerings,
  onUpdate,
  onSave,
  imageOverrides,
  onImageSwap,
  isHidden,
  onToggleVisibility,
  photoSlots,
  onPhotoSlotChange,
}: {
  garment: GarmentData;
  offerings: ItemOfferings;
  onUpdate: (updated: ItemOfferings) => void;
  onSave: () => void;
  imageOverrides: Record<string, string>;
  onImageSwap: (garmentTitle: string) => void;
  isHidden: boolean;
  onToggleVisibility: () => void;
  photoSlots: Record<string, string>;
  onPhotoSlotChange: (slotKey: string, imageUrl: string | null) => void;
}) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const categoryColors: Record<string, string> = {
    Dresses: 'bg-rose-500/15 text-rose-300',
    Accessories: 'bg-amber-500/15 text-amber-300',
    Jackets: 'bg-sky-500/15 text-sky-300',
    Blouses: 'bg-violet-500/15 text-violet-300',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: isHidden ? 0.45 : 1, y: 0 }}
      className={`rounded-xl border p-5 flex flex-col gap-4 transition-all ${isHidden ? 'border-white/4 bg-white/[0.01]' : 'border-white/8 bg-white/[0.03]'}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onImageSwap(garment.title)}
            className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0 cursor-pointer hover:ring-2 ring-white/30 transition-all group/thumb"
          >
            <img
              src={imageOverrides[garment.title] || garment.img}
              alt={garment.title}
              className="w-full h-full object-cover"
            />
            {/* Pencil edit overlay */}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
            </div>
          </button>
          <div>
            <h3 className="text-base font-medium text-white tracking-tight">
              {garment.title}
            </h3>
            <div className="flex items-center gap-2 mt-1.5">
              <span
                className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full ${
                  categoryColors[garment.category] || 'bg-white/10 text-white/60'
                }`}
              >
                {garment.category}
              </span>
              <span className="text-xs font-mono text-white/30">{garment.price}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleVisibility}
            title={isHidden ? 'Show in collection' : 'Hide from collection'}
            className={`
              w-8 h-8 rounded-lg flex items-center justify-center
              transition-all cursor-pointer border
              ${isHidden
                ? 'bg-red-500/10 border-red-500/20 hover:bg-red-500/20'
                : 'bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20'
              }
            `}
          >
            {isHidden ? (
              <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
          <button
            onClick={handleSave}
            className={`
              px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider
              transition-all duration-200 cursor-pointer shrink-0
              ${
                saved
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white'
              }
            `}
          >
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      {/* Purchase Sample */}
      <OfferingSection
        label="Purchase Sample"
        enabled={offerings.purchaseSample.enabled}
        onToggle={(v) =>
          onUpdate({
            ...offerings,
            purchaseSample: { ...offerings.purchaseSample, enabled: v },
          })
        }
      >
        <Field
          label="Price"
          value={offerings.purchaseSample.price}
          onChange={(v) =>
            onUpdate({
              ...offerings,
              purchaseSample: { ...offerings.purchaseSample, price: v },
            })
          }
          placeholder="$0,000"
        />
        <Field
          label="Stripe Link"
          value={offerings.purchaseSample.stripeLink}
          onChange={(v) =>
            onUpdate({
              ...offerings,
              purchaseSample: { ...offerings.purchaseSample, stripeLink: v },
            })
          }
          placeholder="https://buy.stripe.com/..."
        />
      </OfferingSection>

      {/* Commission Bespoke */}
      <OfferingSection
        label="Commission Bespoke"
        enabled={offerings.commissionBespoke.enabled}
        onToggle={(v) =>
          onUpdate({
            ...offerings,
            commissionBespoke: { ...offerings.commissionBespoke, enabled: v },
          })
        }
      >
        <Field
          label="Deposit Amount"
          value={offerings.commissionBespoke.depositAmount}
          onChange={(v) =>
            onUpdate({
              ...offerings,
              commissionBespoke: { ...offerings.commissionBespoke, depositAmount: v },
            })
          }
          placeholder="$0,000"
        />
        <Field
          label="Stripe Link"
          value={offerings.commissionBespoke.stripeLink}
          onChange={(v) =>
            onUpdate({
              ...offerings,
              commissionBespoke: { ...offerings.commissionBespoke, stripeLink: v },
            })
          }
          placeholder="https://buy.stripe.com/..."
        />
      </OfferingSection>

      {/* Rent for Photoshoot */}
      <OfferingSection
        label="Rent for Photoshoot"
        enabled={offerings.rentPhotoshoot.enabled}
        onToggle={(v) =>
          onUpdate({
            ...offerings,
            rentPhotoshoot: { ...offerings.rentPhotoshoot, enabled: v },
          })
        }
      >
        <Field
          label="Price per 3-Day Rental"
          value={offerings.rentPhotoshoot.pricePer3Days}
          onChange={(v) =>
            onUpdate({
              ...offerings,
              rentPhotoshoot: { ...offerings.rentPhotoshoot, pricePer3Days: v },
            })
          }
          placeholder="$500"
        />
        <Field
          label="Security Deposit"
          value={offerings.rentPhotoshoot.securityDeposit || ''}
          onChange={(v) =>
            onUpdate({
              ...offerings,
              rentPhotoshoot: { ...offerings.rentPhotoshoot, securityDeposit: v },
            })
          }
          placeholder="$1,250"
        />
        <Field
          label="Stripe Link"
          value={offerings.rentPhotoshoot.stripeLink}
          onChange={(v) =>
            onUpdate({
              ...offerings,
              rentPhotoshoot: { ...offerings.rentPhotoshoot, stripeLink: v },
            })
          }
          placeholder="https://buy.stripe.com/..."
        />
      </OfferingSection>

      {/* Photo Slots */}
      <div className="border-t border-white/6 pt-4 mt-1">
        <p className="text-[10px] font-mono uppercase tracking-wider text-white/30 mb-3">Product Photos (6 Views)</p>
        <div className="grid grid-cols-3 gap-2">
          {(SLOT_LABELS[garment.category] || SLOT_LABELS.Dresses).map((label, idx) => {
            const slotKey = `${garment.title}__slot_${idx}`;
            const slotUrl = photoSlots[slotKey];
            return (
              <div key={idx} className="relative group">
                <label
                  className={`
                    block aspect-square rounded-lg border cursor-pointer
                    overflow-hidden transition-all
                    ${slotUrl
                      ? 'border-emerald-500/25 bg-black/30'
                      : 'border-dashed border-white/10 bg-white/[0.02] hover:border-white/20'
                    }
                  `}
                >
                  {slotUrl ? (
                    <img src={slotUrl} alt={label} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = () => {
                        onPhotoSlotChange(slotKey, reader.result as string);
                      };
                      reader.readAsDataURL(file);
                      e.target.value = '';
                    }}
                  />
                </label>
                {slotUrl && (
                  <button
                    onClick={() => onPhotoSlotChange(slotKey, null)}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/30 cursor-pointer"
                  >
                    <svg className="w-2.5 h-2.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                <p className="text-[8px] font-mono text-white/30 text-center mt-1 truncate">{idx === 0 ? 'Main' : label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Image Optimizer Tab
   ───────────────────────────────────────────── */

interface OptimizedFile {
  id: string;
  originalName: string;
  originalSize: number;
  optimizedSize: number;
  width: number;
  height: number;
  previewUrl: string;
  downloadUrl: string;
  title: string;
  altText: string;
  copyright: string;
}

function ImageOptimizer() {
  const [files, setFiles] = useState<OptimizedFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [quality, setQuality] = useState(82);
  const [maxWidth, setMaxWidth] = useState(1600);
  const [defaultCopyright, setDefaultCopyright] = useState('Art Couture by Gabrielle Benot');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stripAndOptimize = useCallback(async (file: File) => {
    return new Promise<OptimizedFile>((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        // Calculate new dimensions
        let w = img.naturalWidth;
        let h = img.naturalHeight;
        if (w > maxWidth) {
          const ratio = maxWidth / w;
          w = maxWidth;
          h = Math.round(h * ratio);
        }

        // Draw to canvas (strips ALL metadata: EXIF, XMP, IPTC, AI markers)
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, w, h);

        // Export as optimized JPEG
        canvas.toBlob(
          (blob) => {
            if (!blob) return;
            const downloadUrl = URL.createObjectURL(blob);
            const baseName = file.name.replace(/\.[^.]+$/, '');
            resolve({
              id: crypto.randomUUID(),
              originalName: file.name,
              originalSize: file.size,
              optimizedSize: blob.size,
              width: w,
              height: h,
              previewUrl: downloadUrl,
              downloadUrl,
              title: baseName.replace(/[_-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
              altText: '',
              copyright: defaultCopyright,
            });
            URL.revokeObjectURL(url);
          },
          'image/jpeg',
          quality / 100
        );
      };
      img.src = url;
    });
  }, [quality, maxWidth, defaultCopyright]);

  const processFiles = useCallback(async (fileList: FileList | null) => {
    if (!fileList) return;
    const accepted = ['image/jpeg', 'image/png', 'image/webp'];
    const validFiles = Array.from(fileList).filter(f => accepted.includes(f.type));
    if (validFiles.length === 0) return;

    setProcessing(true);
    const results: OptimizedFile[] = [];
    for (const file of validFiles) {
      const result = await stripAndOptimize(file);
      results.push(result);
    }
    setFiles(prev => [...results, ...prev]);
    setProcessing(false);
  }, [stripAndOptimize]);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    if (e.target) e.target.value = '';
  }, [processFiles]);

  const downloadFile = useCallback((file: OptimizedFile) => {
    const a = document.createElement('a');
    a.href = file.downloadUrl;
    const cleanName = file.title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
    a.download = `${cleanName}_optimized.jpg`;
    a.click();
  }, []);

  const downloadAll = useCallback(() => {
    files.forEach((file, i) => {
      setTimeout(() => downloadFile(file), i * 300);
    });
  }, [files, downloadFile]);

  const updateFile = useCallback((id: string, updates: Partial<OptimizedFile>) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  }, []);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const compressionPercent = (orig: number, opt: number) => {
    return Math.round((1 - opt / orig) * 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      {/* Settings Bar */}
      <div className="rounded-xl border border-white/8 bg-white/[0.02] p-5 mb-6">
        <div className="flex flex-wrap items-end gap-6">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-white/35 mb-2">Default Copyright</label>
            <input
              type="text"
              value={defaultCopyright}
              onChange={(e) => setDefaultCopyright(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white/80 focus:outline-none focus:border-white/25"
            />
          </div>
          <div className="w-32">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-white/35 mb-2">Quality: {quality}%</label>
            <input
              type="range"
              min="40"
              max="100"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>
          <div className="w-36">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-white/35 mb-2">Max Width</label>
            <select
              value={maxWidth}
              onChange={(e) => setMaxWidth(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white/80 focus:outline-none focus:border-white/25 cursor-pointer"
            >
              <option value={800}>800px</option>
              <option value={1200}>1200px</option>
              <option value={1600}>1600px</option>
              <option value={1920}>1920px</option>
              <option value={2400}>2400px</option>
              <option value={99999}>Original</option>
            </select>
          </div>
        </div>
      </div>

      {/* Upload Dropzone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative rounded-xl border-2 border-dashed p-10 mb-6
          flex flex-col items-center justify-center gap-3 cursor-pointer
          transition-all duration-200
          ${
            dragOver
              ? 'border-emerald-400/60 bg-emerald-500/10'
              : 'border-white/12 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]'
          }
        `}
      >
        {processing ? (
          <>
            <div className="w-8 h-8 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
            <p className="text-sm font-mono text-emerald-400/70">Processing images...</p>
          </>
        ) : (
          <>
            <svg className={`w-10 h-10 transition-colors ${dragOver ? 'text-emerald-400' : 'text-white/25'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
            </svg>
            <p className="text-sm font-mono text-white/40">{dragOver ? 'Drop to optimize' : 'Drop images to strip AI data and optimize'}</p>
            <p className="text-[10px] font-mono text-white/20 uppercase tracking-wider">JPG, PNG, WEBP accepted</p>
          </>
        )}
        <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleFileChange} className="hidden" />
      </div>

      {/* What it does */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {[
          { icon: '🧹', label: 'Strips AI Metadata', desc: 'Removes EXIF, XMP, IPTC, and AI generation markers' },
          { icon: '🏷️', label: 'Adds SEO Data', desc: 'Custom title, alt text, and copyright for each image' },
          { icon: '⚡', label: 'Web Optimized', desc: 'Compressed JPEG output at your chosen quality' },
        ].map(item => (
          <div key={item.label} className="rounded-lg border border-white/6 bg-white/[0.02] p-4 text-center">
            <span className="text-lg">{item.icon}</span>
            <p className="text-[11px] font-mono text-white/60 mt-1 font-medium">{item.label}</p>
            <p className="text-[9px] font-mono text-white/25 mt-0.5">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Results */}
      {files.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-mono text-white/40">{files.length} image{files.length !== 1 ? 's' : ''} optimized</p>
            <button
              onClick={downloadAll}
              className="px-4 py-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono uppercase tracking-wider hover:bg-emerald-500/25 transition-all cursor-pointer"
            >
              Download All
            </button>
          </div>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {files.map((file) => (
                <motion.div
                  key={file.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-xl border border-white/8 bg-white/[0.02] overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Preview */}
                    <div className="w-full sm:w-40 h-40 sm:h-auto bg-black/30 flex-shrink-0">
                      <img src={file.previewUrl} alt={file.altText || file.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Metadata Form */}
                    <div className="flex-1 p-4 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <label className="block text-[9px] font-mono uppercase tracking-wider text-white/30 mb-1">SEO Title</label>
                          <input
                            type="text"
                            value={file.title}
                            onChange={(e) => updateFile(file.id, { title: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-white/80 focus:outline-none focus:border-white/25"
                            placeholder="Image title for SEO"
                          />
                        </div>
                        <div className="flex gap-1.5 mt-4">
                          <button
                            onClick={() => downloadFile(file)}
                            className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center hover:bg-emerald-500/25 transition-all cursor-pointer"
                            title="Download"
                          >
                            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                          </button>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center hover:bg-red-500/20 transition-all cursor-pointer"
                            title="Remove"
                          >
                            <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono uppercase tracking-wider text-white/30 mb-1">Alt Text (SEO + Accessibility)</label>
                        <input
                          type="text"
                          value={file.altText}
                          onChange={(e) => updateFile(file.id, { altText: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-white/80 focus:outline-none focus:border-white/25"
                          placeholder="Describe the image for search engines and screen readers"
                        />
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-1">
                          <label className="block text-[9px] font-mono uppercase tracking-wider text-white/30 mb-1">Copyright</label>
                          <input
                            type="text"
                            value={file.copyright}
                            onChange={(e) => updateFile(file.id, { copyright: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-white/80 focus:outline-none focus:border-white/25"
                          />
                        </div>
                      </div>

                      {/* Stats Bar */}
                      <div className="flex items-center gap-4 pt-1">
                        <span className="text-[10px] font-mono text-white/25">{file.width} x {file.height}px</span>
                        <span className="text-[10px] font-mono text-white/25">{formatSize(file.originalSize)} → {formatSize(file.optimizedSize)}</span>
                        <span className={`text-[10px] font-mono font-medium ${
                          compressionPercent(file.originalSize, file.optimizedSize) > 50 ? 'text-emerald-400/70' : 'text-amber-400/70'
                        }`}>
                          {compressionPercent(file.originalSize, file.optimizedSize)}% smaller
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400/50 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Metadata stripped
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}

      {files.length === 0 && !processing && (
        <div className="text-center py-10">
          <p className="text-sm font-mono text-white/25">Upload images to strip AI data, add SEO metadata, and optimize for web</p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Design Vault Tab
   ───────────────────────────────────────────── */

function DesignVault() {
  const [images, setImages] = useState<VaultImage[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(VAULT_KEY);
      if (raw) setImages(JSON.parse(raw) as VaultImage[]);
    } catch {
      // ignore corrupt data
    }
  }, []);

  const persist = useCallback((updated: VaultImage[]) => {
    setImages(updated);
    localStorage.setItem(VAULT_KEY, JSON.stringify(updated));
  }, []);

  const processFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const accepted = ['image/jpeg', 'image/png', 'image/webp'];
    Array.from(files).forEach((file) => {
      if (!accepted.includes(file.type)) return;
      const reader = new FileReader();
      reader.onload = () => {
        const entry: VaultImage = {
          id: crypto.randomUUID(),
          name: file.name,
          dataUrl: reader.result as string,
          uploadedAt: new Date().toISOString(),
        };
        setImages((prev) => {
          const next = [entry, ...prev];
          localStorage.setItem(VAULT_KEY, JSON.stringify(next));
          return next;
        });
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(false);
      processFiles(e.dataTransfer.files);
    },
    [processFiles]
  );

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      processFiles(e.target.files);
      if (e.target) e.target.value = '';
    },
    [processFiles]
  );

  const deleteImage = useCallback(
    (id: string) => {
      persist(images.filter((img) => img.id !== id));
    },
    [images, persist]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      {/* Upload Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative rounded-xl border-2 border-dashed p-12 mb-8
          flex flex-col items-center justify-center gap-3 cursor-pointer
          transition-all duration-200
          ${
            dragOver
              ? 'border-violet-400/60 bg-violet-500/10'
              : 'border-white/12 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]'
          }
        `}
      >
        {/* Cloud upload icon */}
        <svg
          className={`w-10 h-10 transition-colors ${
            dragOver ? 'text-violet-400' : 'text-white/25'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
          />
        </svg>
        <p className="text-sm font-mono text-white/40">
          {dragOver ? 'Drop files here' : 'Drag and drop or click to upload'}
        </p>
        <p className="text-[10px] font-mono text-white/20 uppercase tracking-wider">
          JPG, PNG, WEBP accepted
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Image Grid */}
      {images.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm font-mono text-white/25">No images in the vault yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {images.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="rounded-xl border border-white/8 bg-white/[0.03] overflow-hidden group"
              >
                <div className="aspect-square relative bg-black/30">
                  <img
                    src={img.dataUrl}
                    alt={img.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => deleteImage(img.id)}
                    className="
                      absolute top-2 right-2 w-7 h-7 rounded-full
                      bg-black/60 border border-white/10
                      flex items-center justify-center
                      opacity-0 group-hover:opacity-100 transition-opacity
                      hover:bg-red-500/30 hover:border-red-500/30 cursor-pointer
                    "
                  >
                    <svg className="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-xs font-mono text-white/60 truncate">{img.name}</p>
                  <p className="text-[10px] font-mono text-white/25 mt-1">
                    {new Date(img.uploadedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Password Gate
   ───────────────────────────────────────────── */

function PasswordGate({ onAuthenticate }: { onAuthenticate: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      onAuthenticate();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <h1 className="text-lg font-mono uppercase tracking-[0.3em] text-white/80 mb-2">
            Admin
          </h1>
          <p className="text-xs text-white/30 font-mono">Art Couture Offerings Manager</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            autoFocus
            className={`
              w-full rounded-lg bg-white/5 border px-4 py-3 text-sm text-white
              placeholder:text-white/25 font-mono text-center
              focus:outline-none focus:ring-1 transition-colors
              ${
                error
                  ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                  : 'border-white/10 focus:border-white/30 focus:ring-white/10'
              }
            `}
          />
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-red-400 font-mono text-center"
              >
                Invalid password
              </motion.p>
            )}
          </AnimatePresence>
          <button
            type="submit"
            className="
              w-full rounded-lg bg-white/8 border border-white/10 px-4 py-3
              text-xs font-mono uppercase tracking-wider text-white/70
              hover:bg-white/12 hover:text-white transition-all cursor-pointer
            "
          >
            Authenticate
          </button>
        </form>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Admin Panel (main)
   ───────────────────────────────────────────── */

function AdminPanel() {
  const [config, setConfig] = useState<OfferingConfig>({});
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'inventory' | 'vault' | 'optimizer'>('inventory');
  const [imageOverrides, setImageOverrides] = useState<Record<string, string>>({});
  const [hiddenItems, setHiddenItems] = useState<string[]>([]);
  const [photoSlots, setPhotoSlots] = useState<Record<string, string>>({});
  const [pickerTarget, setPickerTarget] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'warning' | 'info' } | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'warning' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  }, []);

  useEffect(() => {
    setConfig(loadConfig());
    try {
      const raw = localStorage.getItem(IMAGE_OVERRIDES_KEY);
      if (raw) setImageOverrides(JSON.parse(raw));
    } catch {
      // ignore
    }
    try {
      const raw = localStorage.getItem(HIDDEN_KEY);
      if (raw) setHiddenItems(JSON.parse(raw));
    } catch {
      // ignore
    }
    try {
      const raw = localStorage.getItem(PHOTO_SLOTS_KEY);
      if (raw) setPhotoSlots(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const handleImageOverride = useCallback((garmentTitle: string, imageUrl: string | null) => {
    setImageOverrides((prev) => {
      const next = { ...prev };
      if (imageUrl === null) {
        delete next[garmentTitle];
      } else {
        next[garmentTitle] = imageUrl;
      }
      localStorage.setItem(IMAGE_OVERRIDES_KEY, JSON.stringify(next));
      return next;
    });
    setPickerTarget(null);
  }, []);

  const categories = ['All', ...Array.from(new Set(GARMENTS.map((g) => g.category)))];

  const filteredGarments =
    filterCategory === 'All'
      ? GARMENTS
      : GARMENTS.filter((g) => g.category === filterCategory);

  const updateItem = useCallback((title: string, updated: ItemOfferings) => {
    setConfig((prev) => ({ ...prev, [title]: updated }));
  }, []);

  const saveItem = useCallback(
    (title: string) => {
      const updated = { ...config };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setLastSaved(new Date().toLocaleTimeString());
    },
    [config]
  );

  const saveAll = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    setLastSaved(new Date().toLocaleTimeString());
    showToast('All changes saved successfully', 'success');
  }, [config, showToast]);

  const exportBackup = useCallback(() => {
    try {
      const data = {
        offerings: localStorage.getItem(STORAGE_KEY),
        imageOverrides: localStorage.getItem(IMAGE_OVERRIDES_KEY),
        vault: localStorage.getItem(VAULT_KEY),
        hiddenItems: localStorage.getItem(HIDDEN_KEY),
        photoSlots: localStorage.getItem(PHOTO_SLOTS_KEY),
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `artcouture_backup_${new Date().toISOString().slice(0,10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Backup exported successfully', 'success');
    } catch (err: any) {
      showToast('Failed to export: ' + err.message, 'warning');
    }
  }, [showToast]);

  const importBackup = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const raw = evt.target?.result as string;
          const parsed = JSON.parse(raw);
          if (parsed.offerings) {
            localStorage.setItem(STORAGE_KEY, parsed.offerings);
            setConfig(JSON.parse(parsed.offerings));
          }
          if (parsed.imageOverrides) {
            localStorage.setItem(IMAGE_OVERRIDES_KEY, parsed.imageOverrides);
            setImageOverrides(JSON.parse(parsed.imageOverrides));
          }
          if (parsed.vault) {
            localStorage.setItem(VAULT_KEY, parsed.vault);
          }
          if (parsed.hiddenItems) {
            localStorage.setItem(HIDDEN_KEY, parsed.hiddenItems);
            setHiddenItems(JSON.parse(parsed.hiddenItems));
          }
          if (parsed.photoSlots) {
            localStorage.setItem(PHOTO_SLOTS_KEY, parsed.photoSlots);
            setPhotoSlots(JSON.parse(parsed.photoSlots));
          }
          showToast('Backup imported successfully. Reloading...', 'success');
          setTimeout(() => window.location.reload(), 1500);
        } catch (err: any) {
          showToast('Failed to import: ' + err.message, 'warning');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }, [showToast]);

  const resetAll = useCallback(() => {
    if (!window.confirm('Are you sure you want to reset all settings to defaults? This cannot be undone.')) return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(IMAGE_OVERRIDES_KEY);
    localStorage.removeItem(HIDDEN_KEY);
    localStorage.removeItem(PHOTO_SLOTS_KEY);
    setConfig(loadConfig());
    setImageOverrides({});
    setHiddenItems([]);
    setPhotoSlots({});
    setLastSaved(null);
    showToast('All settings reset to defaults', 'warning');
  }, [showToast]);

  const goBack = useCallback(() => {
    window.location.href = '/';
  }, []);

  const enableCommissionAll = useCallback(() => {
    setConfig((prev) => {
      const next = { ...prev };
      for (const g of GARMENTS) {
        if (next[g.title]) {
          next[g.title] = {
            ...next[g.title],
            commissionBespoke: {
              ...next[g.title].commissionBespoke,
              enabled: true,
            },
          };
        }
      }
      return next;
    });
    showToast('Commission enabled for all garments', 'info');
  }, [showToast]);

  const enabledCount = Object.values(config).reduce((acc, item) => {
    let count = 0;
    if (item.purchaseSample?.enabled) count++;
    if (item.commissionBespoke?.enabled) count++;
    if (item.rentPhotoshoot?.enabled) count++;
    return acc + count;
  }, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className={`
              fixed top-6 left-1/2 -translate-x-1/2 z-[9999]
              px-5 py-3 rounded-xl border backdrop-blur-md
              flex items-center gap-2.5 shadow-2xl
              font-mono text-xs uppercase tracking-wider
              ${
                toast.type === 'success'
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                  : toast.type === 'warning'
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                  : 'bg-violet-500/15 border-violet-500/30 text-violet-300'
              }
            `}
          >
            {toast.type === 'success' && (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
            {toast.type === 'warning' && (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            )}
            {toast.type === 'info' && (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            )}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={goBack}
                className="
                  w-8 h-8 rounded-lg bg-white/5 border border-white/10
                  flex items-center justify-center
                  hover:bg-white/10 transition-all cursor-pointer
                "
                title="Go back to site"
              >
                <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-sm font-mono uppercase tracking-[0.25em] text-white/80">
                  Art Couture Admin
                </h1>
                <p className="text-xs text-white/30 font-mono mt-1">
                  {GARMENTS.length} garments, {enabledCount} active offerings
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {lastSaved && (
                <span className="text-[10px] font-mono text-emerald-400/70 flex items-center gap-1.5">
                  <StatusDot active />
                  Last saved {lastSaved}
                </span>
              )}
              <button
                onClick={enableCommissionAll}
                className="
                  px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider
                  bg-violet-500/10 text-violet-300 border border-violet-500/20
                  hover:bg-violet-500/20 transition-all cursor-pointer
                  active:scale-95
                "
              >
                Enable Commission All
              </button>
              <button
                onClick={saveAll}
                className="
                  px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider
                  bg-emerald-500/10 text-emerald-300 border border-emerald-500/20
                  hover:bg-emerald-500/20 transition-all cursor-pointer
                  active:scale-95
                "
              >
                Save All
              </button>
              <button
                onClick={exportBackup}
                className="
                  px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider
                  bg-blue-500/10 text-blue-300 border border-blue-500/20
                  hover:bg-blue-500/20 transition-all cursor-pointer
                  active:scale-95
                "
              >
                Export Backup
              </button>
              <button
                onClick={importBackup}
                className="
                  px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider
                  bg-amber-500/10 text-amber-300 border border-amber-500/20
                  hover:bg-amber-500/20 transition-all cursor-pointer
                  active:scale-95
                "
              >
                Import Backup
              </button>
              <button
                onClick={resetAll}
                className="
                  px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider
                  bg-red-500/10 text-red-300 border border-red-500/20
                  hover:bg-red-500/20 transition-all cursor-pointer
                  active:scale-95
                "
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="border-b border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-0">
            {(['inventory', 'optimizer', 'vault'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-5 py-3 text-xs font-mono uppercase tracking-wider
                  transition-all cursor-pointer relative
                  ${
                    activeTab === tab
                      ? 'text-white'
                      : 'text-white/35 hover:text-white/60'
                  }
                `}
              >
                {tab === 'inventory' ? 'Inventory' : tab === 'optimizer' ? 'Image Optimizer' : 'Design Vault'}
                {activeTab === tab && (
                  <motion.div
                    layoutId="admin-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-white/60"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === 'inventory' ? (
        <>
          {/* Category Filter */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`
                    px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider
                    transition-all cursor-pointer border
                    ${
                      filterCategory === cat
                        ? 'bg-white/10 text-white border-white/20'
                        : 'bg-transparent text-white/35 border-white/6 hover:text-white/60 hover:border-white/12'
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Garment Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredGarments.map((garment) => {
                const itemConfig = config[garment.title] || {
                  purchaseSample: { enabled: false, price: garment.price, stripeLink: '' },
                  commissionBespoke: { enabled: true, depositAmount: garment.depositAmount, stripeLink: garment.depositLink },
                  rentPhotoshoot: { enabled: false, pricePer3Days: calculateDefaultRentalPrice(garment.price), securityDeposit: calculateDefaultSecurityDeposit(garment.price), stripeLink: '' },
                };

                return (
                  <GarmentCard
                    key={garment.title}
                    garment={garment}
                    offerings={itemConfig}
                    onUpdate={(updated) => updateItem(garment.title, updated)}
                    onSave={() => saveItem(garment.title)}
                    imageOverrides={imageOverrides}
                    onImageSwap={(title) => setPickerTarget(title)}
                    isHidden={hiddenItems.includes(garment.title)}
                    onToggleVisibility={() => {
                      setHiddenItems(prev => {
                        const next = prev.includes(garment.title)
                          ? prev.filter(t => t !== garment.title)
                          : [...prev, garment.title];
                        localStorage.setItem(HIDDEN_KEY, JSON.stringify(next));
                        return next;
                      });
                    }}
                    photoSlots={photoSlots}
                    onPhotoSlotChange={(slotKey, imageUrl) => {
                      setPhotoSlots(prev => {
                        const next = { ...prev };
                        if (imageUrl === null) {
                          delete next[slotKey];
                        } else {
                          next[slotKey] = imageUrl;
                        }
                        localStorage.setItem(PHOTO_SLOTS_KEY, JSON.stringify(next));
                        return next;
                      });
                    }}
                  />
                );
              })}
            </div>
          </div>
        </>
      ) : activeTab === 'optimizer' ? (
        <div className="pt-6">
          <ImageOptimizer />
        </div>
      ) : (
        <div className="pt-6">
          <DesignVault />
        </div>
      )}

      {/* Image Picker Modal */}
      <AnimatePresence>
        {pickerTarget && (
          <ImagePickerModal
            garmentTitle={pickerTarget}
            currentImg={
              imageOverrides[pickerTarget] ||
              GARMENTS.find((g) => g.title === pickerTarget)?.img ||
              ''
            }
            originalImg={
              GARMENTS.find((g) => g.title === pickerTarget)?.img || ''
            }
            onSelect={(url) => handleImageOverride(pickerTarget, url)}
            onClose={() => setPickerTarget(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page Export
   ───────────────────────────────────────────── */

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored === 'true') {
      setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="h-4 w-4 rounded-full bg-white/20 animate-pulse" />
      </div>
    );
  }

  if (!authenticated) {
    return <PasswordGate onAuthenticate={() => setAuthenticated(true)} />;
  }

  return <AdminPanel />;
}
