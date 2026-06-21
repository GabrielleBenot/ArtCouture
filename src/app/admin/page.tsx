'use client';

import React, { useState, useEffect, useCallback, useRef, DragEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { OfferingConfig, ItemOfferings } from '@/lib/useOfferings';
import default_config from '@/lib/default_config.json';
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc, query, where } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL, deleteObject } from 'firebase/storage';

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
  thumbnailUrl?: string;
  uploadedAt: string;
  title?: string;
  altText?: string;
  hash?: string;
}

function cleanFileNameToTitle(fileName: string): string {
  // 1. Remove extension
  let name = fileName.replace(/\.[^.]+$/, '');
  
  // 2. Strip standard UUIDs (8-4-4-4-12 hex chars)
  name = name.replace(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g, '');
  
  // 3. Strip leading/trailing dash/underscore/space
  name = name.replace(/^[-_\s]+|[-_\s]+$/g, '');
  
  // 4. Replace underscores, dashes, and duplicate spaces with a single space
  name = name.replace(/[_-]/g, ' ').replace(/\s+/g, ' ');
  
  // 5. Title Case
  name = name.replace(/\b\w/g, c => c.toUpperCase());
  
  // 6. Fallback if empty or generic
  if (!name || /^Unnamed|^Img|^Dsc|^File/i.test(name)) {
    name = `Design Asset ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  }
  
  return name;
}

function cleanFileNameToUrlFriendly(fileName: string): string {
  // 1. Remove extension
  let name = fileName.replace(/\.[^.]+$/, '');
  
  // 2. Strip standard UUIDs (8-4-4-4-12 hex chars)
  name = name.replace(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g, '');
  
  // 3. Convert to lowercase
  name = name.toLowerCase();
  
  // 4. Replace underscores, spaces, or duplicate hyphens with a single hyphen
  name = name.replace(/[_\s]+/g, '-');
  
  // 5. Remove any non-alphanumeric/non-hyphen characters
  name = name.replace(/[^a-z0-9-]/g, '');
  
  // 6. Strip leading/trailing hyphens
  name = name.replace(/^-+|-+$/g, '');
  
  // 7. Fallback if empty or generic
  if (!name || /^unnamed|^img|^dsc|^file/i.test(name)) {
    name = 'design-asset';
  }
  
  return name;
}


const GARMENTS: GarmentData[] = [
  {
    "title": "Fuchsia Majesty",
    "category": "Dresses",
    "price": "$7,955",
    "depositAmount": "$2,000",
    "depositLink": "https://buy.stripe.com/3cI14nd5q0301L3fH6b3q00",
    "img": "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Ff5720508-8148-4bd3-ab0f-2b8612f15cda?alt=media&token=7be40366-58e3-4eb1-91c8-f24d29299550"
  },
  {
    "title": "Blush Enchantress",
    "category": "Dresses",
    "price": "$8,700",
    "depositAmount": "$2,200",
    "depositLink": "https://buy.stripe.com/5kQdR9e9uaHE1L37aAb3q04",
    "img": "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F2f7c3f0f-2025-4098-86e5-76e1b21fe5e4?alt=media&token=b174088f-754a-49ef-8d45-ffe114715f60"
  },
  {
    "title": "Golden Whisper",
    "category": "Dresses",
    "price": "$9,200",
    "depositAmount": "$2,300",
    "depositLink": "https://buy.stripe.com/cNi00jaXi3fc0GZ9iIb3q01",
    "img": "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Fa233bbdb-25ac-47fe-b686-71493e2cc226?alt=media&token=447745e0-6fd4-4fe0-b328-63b25f3199e0"
  },
  {
    "title": "Crimson Allure",
    "category": "Dresses",
    "price": "$7,980",
    "depositAmount": "$2,000",
    "depositLink": "https://buy.stripe.com/eVq3cv0iE7vs89rdyYb3q02",
    "img": "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F04669707-071a-432c-82e4-76b144da07e4?alt=media&token=87ed9797-099d-4c08-ad4e-bcac6cc65c4b"
  },
  {
    "title": "Blush Couture",
    "category": "Dresses",
    "price": "$11,700",
    "depositAmount": "$3,000",
    "depositLink": "https://buy.stripe.com/14AaEXaXig1YgFX8eEb3q03",
    "img": "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F4f8b61de-f7ce-4eab-8056-b80769b17b73?alt=media&token=79857bc2-e2ed-4e7f-9a3a-47cd52717ef9"
  },
  {
    "title": "Pearl Symphony",
    "category": "Accessories",
    "price": "$4,200",
    "depositAmount": "$1,000",
    "depositLink": "",
    "img": "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80"
  },
  {
    "title": "Obsidian Clutch",
    "category": "Accessories",
    "price": "$5,500",
    "depositAmount": "$1,500",
    "depositLink": "",
    "img": "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80"
  },
  {
    "title": "Crystal Steps",
    "category": "Accessories",
    "price": "$2,800",
    "depositAmount": "$700",
    "depositLink": "",
    "img": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80"
  },
  {
    "title": "Golden Hour",
    "category": "Accessories",
    "price": "$3,100",
    "depositAmount": "$800",
    "depositLink": "",
    "img": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80"
  },
  {
    "title": "Velvet Veil",
    "category": "Accessories",
    "price": "$1,500",
    "depositAmount": "$400",
    "depositLink": "",
    "img": "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
  },
  {
    "title": "Midnight Elegance",
    "category": "Dresses",
    "price": "$8,850",
    "depositAmount": "$2,200",
    "depositLink": "https://buy.stripe.com/3cI14n9Te4jg75namMb3q05",
    "img": "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Ff4c8fe02-afaa-458f-b217-bc5a3a57ea00?alt=media&token=697ddc89-dcdd-432d-9e94-a4c759b5027e"
  },
  {
    "title": "Noir Power",
    "category": "Jackets",
    "price": "$7,200",
    "depositAmount": "$1,800",
    "depositLink": "",
    "img": "/collections/jacket_two.png"
  },
  {
    "title": "Ivory Architecture",
    "category": "Jackets",
    "price": "$9,100",
    "depositAmount": "$2,300",
    "depositLink": "",
    "img": "https://images.unsplash.com/photo-1550639525-c97d455acf70?w=800&q=80"
  },
  {
    "title": "Crimson Drape",
    "category": "Jackets",
    "price": "$6,500",
    "depositAmount": "$1,600",
    "depositLink": "",
    "img": "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80"
  },
  {
    "title": "Onyx Edge",
    "category": "Jackets",
    "price": "$8,200",
    "depositAmount": "$2,000",
    "depositLink": "",
    "img": "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80"
  },
  {
    "title": "Tweed Illusion",
    "category": "Jackets",
    "price": "$7,800",
    "depositAmount": "$2,000",
    "depositLink": "",
    "img": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80"
  },
  {
    "title": "Ivory Cascade",
    "category": "Blouses",
    "price": "$3,400",
    "depositAmount": "$850",
    "depositLink": "",
    "img": "https://storage.googleapis.com/mixo-sites/images/file-77426bbf-6aac-41f4-8c9f-16b8a9375343.PNG"
  },
  {
    "title": "Chiffon Whisper",
    "category": "Blouses",
    "price": "$2,900",
    "depositAmount": "$700",
    "depositLink": "",
    "img": "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=800&q=80"
  },
  {
    "title": "Satin Armor",
    "category": "Blouses",
    "price": "$3,800",
    "depositAmount": "$950",
    "depositLink": "",
    "img": "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80"
  },
  {
    "title": "Organza Cloud",
    "category": "Blouses",
    "price": "$4,100",
    "depositAmount": "$1,000",
    "depositLink": "",
    "img": "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80"
  },
  {
    "title": "Silk Essential",
    "category": "Blouses",
    "price": "$2,200",
    "depositAmount": "$550",
    "depositLink": "",
    "img": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80"
  },
  {
    "title": "Lace Romance",
    "category": "Blouses",
    "price": "$4,500",
    "depositAmount": "$1,100",
    "depositLink": "",
    "img": "https://images.unsplash.com/photo-1574291814206-363acdf2aa79?w=800&q=80"
  }
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
const LOOKBOOK_CONFIG_KEY = 'artcouture_lookbook_config';

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

function compressImage(file: File, maxDim = 800, quality = 0.7): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image'));
      img.onload = () => {
        let w = img.naturalWidth;
        let h = img.naturalHeight;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round(h * (maxDim / w));
            w = maxDim;
          } else {
            w = Math.round(w * (maxDim / h));
            h = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

function safeLocalStorageSet(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function addImageToVault(name: string, dataUrl: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem(VAULT_KEY);
    const current: VaultImage[] = raw ? JSON.parse(raw) : [];
    // Check if this image data is already in the vault
    if (current.some((img) => img.dataUrl === dataUrl)) return true;

    const entry: VaultImage = {
      id: crypto.randomUUID(),
      name: name,
      dataUrl: dataUrl,
      uploadedAt: new Date().toISOString(),
    };
    const next = [entry, ...current];
    return safeLocalStorageSet(VAULT_KEY, JSON.stringify(next));
  } catch {
    return false;
  }
}

function calculateDefaultSecurityDeposit(priceStr: string): string {
  const num = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
  if (isNaN(num)) return '$1,250';
  const pct15 = num * 0.15;
  const rounded = Math.round(pct15 / 50) * 50;
  return `${rounded.toLocaleString('en-US')}`;
}

function calculateDefaultRentalPrice(priceStr: string): string {
  const num = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
  if (isNaN(num)) return '$500';
  const pct6 = num * 0.06;
  const rounded = Math.round(pct6 / 50) * 50;
  const finalVal = Math.max(150, rounded);
  return `${finalVal.toLocaleString('en-US')}`;
}

async function computeHash(dataUrl: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(dataUrl);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function uploadImageToCloud(file: File): Promise<VaultImage> {
  const dataUrl = await compressImage(file, 2000, 0.82);
  const hash = await computeHash(dataUrl);

  // Check if duplicate exists in Firestore by hash
  try {
    const q = query(collection(db, 'vault'), where('hash', '==', hash));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const docSnap = snap.docs[0];
      const data = docSnap.data();
      const cleanTitle = data.title || cleanFileNameToTitle(data.name || '');
      
      alert(`Duplicate detected: "${file.name}" is identical to "${data.name || 'an existing image'}" already in the Vault. Using the existing image.`);
      
      return {
        id: docSnap.id,
        name: data.name || file.name,
        title: cleanTitle,
        altText: data.altText || `${cleanTitle} bespoke haute couture by Gabrielle Benot`,
        dataUrl: data.url,
        thumbnailUrl: data.thumbnailUrl || data.url,
        uploadedAt: data.uploadedAt,
        hash: hash
      };
    }
  } catch (e) {
    console.error("Duplicate check failed:", e);
  }

  // Generate mobile thumbnail (800px max dimension at 75% quality)
  let thumbnailDataUrl = dataUrl;
  try {
    thumbnailDataUrl = await compressImage(file, 800, 0.75);
  } catch (thumbErr) {
    console.error("Failed to compress thumbnail, falling back to original", thumbErr);
  }

  const imageId = crypto.randomUUID();
  const urlFriendlyName = cleanFileNameToUrlFriendly(file.name);
  
  // Upload original
  const storageRef = ref(storage, `vault/${urlFriendlyName}-${imageId.substring(0, 8)}.jpg`);
  await uploadString(storageRef, dataUrl, 'data_url');
  const downloadUrl = await getDownloadURL(storageRef);

  // Upload thumbnail
  let thumbnailUrl = downloadUrl;
  try {
    const thumbStorageRef = ref(storage, `vault/thumbnails/${urlFriendlyName}-thumb-${imageId.substring(0, 8)}.jpg`);
    await uploadString(thumbStorageRef, thumbnailDataUrl, 'data_url');
    thumbnailUrl = await getDownloadURL(thumbStorageRef);
  } catch (uploadThumbErr) {
    console.error("Failed to upload thumbnail to Storage, using original", uploadThumbErr);
  }

  const cleanTitle = cleanFileNameToTitle(file.name);
  const entry = {
    name: file.name,
    title: cleanTitle,
    altText: `${cleanTitle} bespoke haute couture by Gabrielle Benot`,
    url: downloadUrl,
    thumbnailUrl: thumbnailUrl,
    uploadedAt: new Date().toISOString(),
    hash: hash
  };
  await setDoc(doc(db, 'vault', imageId), entry);

  const vaultImage: VaultImage = {
    id: imageId,
    name: file.name,
    title: cleanTitle,
    altText: entry.altText,
    dataUrl: downloadUrl,
    thumbnailUrl: thumbnailUrl,
    uploadedAt: entry.uploadedAt,
    hash: hash
  };

  // Sync to local storage vault cache for offline fallback
  try {
    const raw = localStorage.getItem(VAULT_KEY);
    const vault = raw ? JSON.parse(raw) as VaultImage[] : [];
    const updated = [vaultImage, ...vault];
    localStorage.setItem(VAULT_KEY, JSON.stringify(updated));
  } catch {}

  return vaultImage;
}

async function deleteImageFromCloud(id: string, dataUrl: string) {
  // Try to fetch the document first to get thumbnailUrl
  let thumbnailUrl: string | undefined;
  try {
    const docSnap = await getDoc(doc(db, 'vault', id));
    if (docSnap.exists()) {
      thumbnailUrl = docSnap.data().thumbnailUrl;
    }
  } catch (e) {
    console.error("Failed to fetch image info for thumbnail delete:", e);
  }

  // 1. Delete from Firebase Storage (original)
  try {
    const storageRef = ref(storage, dataUrl);
    await deleteObject(storageRef);
  } catch (e) {
    console.error("Storage delete failed (original, might not exist):", e);
  }

  // Delete from Firebase Storage (thumbnail)
  if (thumbnailUrl && thumbnailUrl !== dataUrl) {
    try {
      const thumbStorageRef = ref(storage, thumbnailUrl);
      await deleteObject(thumbStorageRef);
    } catch (e) {
      console.error("Storage delete failed (thumbnail, might not exist):", e);
    }
  }

  // 2. Delete from Firestore vault collection
  try {
    await deleteDoc(doc(db, 'vault', id));
  } catch (e) {
    console.error("Firestore vault delete failed:", e);
  }

  // 3. Remove from config/photo_slots in Firestore
  try {
    const slotsRef = doc(db, 'config', 'photo_slots');
    const slotsSnap = await getDoc(slotsRef);
    if (slotsSnap.exists()) {
      const slots = slotsSnap.data() as Record<string, string>;
      const nextSlots = { ...slots };
      let changed = false;
      Object.entries(nextSlots).forEach(([k, v]) => {
        if (v === dataUrl || k === id) {
          delete nextSlots[k];
          changed = true;
        }
      });
      if (changed) {
        await setDoc(slotsRef, nextSlots);
        localStorage.setItem(PHOTO_SLOTS_KEY, JSON.stringify(nextSlots));
      }
    }
  } catch (e) {
    console.error("Failed to clean photo_slots:", e);
  }

  // 4. Remove from config/image_overrides in Firestore
  try {
    const overridesRef = doc(db, 'config', 'image_overrides');
    const overridesSnap = await getDoc(overridesRef);
    if (overridesSnap.exists()) {
      const overrides = overridesSnap.data() as Record<string, string>;
      const nextOverrides = { ...overrides };
      let changed = false;
      Object.entries(nextOverrides).forEach(([k, v]) => {
        if (v === dataUrl || k === id) {
          delete nextOverrides[k];
          changed = true;
        }
      });
      if (changed) {
        await setDoc(overridesRef, nextOverrides);
        localStorage.setItem(IMAGE_OVERRIDES_KEY, JSON.stringify(nextOverrides));
      }
    }
  } catch (e) {
    console.error("Failed to clean image_overrides:", e);
  }

  // 5. Update local storage vault cache
  try {
    const raw = localStorage.getItem(VAULT_KEY);
    if (raw) {
      const vault = JSON.parse(raw) as VaultImage[];
      const nextVault = vault.filter(img => img.id !== id && img.dataUrl !== dataUrl);
      localStorage.setItem(VAULT_KEY, JSON.stringify(nextVault));
    }
  } catch {}
}

function buildDefaults(): OfferingConfig {
  const config: OfferingConfig = {};
  for (const g of GARMENTS) {
    config[g.title] = {
      purchaseSample: { enabled: false, price: g.price, stripeLink: '' },
      commissionBespoke: { enabled: true, depositAmount: g.depositAmount, stripeLink: g.depositLink },
      rentPhotoshoot: { enabled: false, pricePer3Days: calculateDefaultRentalPrice(g.price), securityDeposit: calculateDefaultSecurityDeposit(g.price), stripeLink: '', sizes: '' },
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
   Lightbox Component
   ───────────────────────────────────────────── */

interface LightboxProps {
  imageUrl: string;
  onClose: () => void;
}

function Lightbox({ imageUrl, onClose }: LightboxProps) {
  const [zoom, setZoom] = useState(false);
  const [loading, setLoading] = useState(true);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8 cursor-zoom-out"
      onClick={onClose}
    >
      {/* Top Controls Bar */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setZoom(!zoom)}
          className="
            px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider
            bg-white/5 border border-white/10 text-white/80
            hover:bg-white/10 hover:text-white transition-all cursor-pointer
          "
          title={zoom ? "Zoom to Fit" : "Zoom 100%"}
        >
          {zoom ? "Fit Screen" : "100% Zoom"}
        </button>
        <button
          onClick={onClose}
          className="
            w-8 h-8 rounded-lg bg-white/5 border border-white/10
            flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer
          "
          title="Close (Esc)"
        >
          <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Main Image Container */}
      <div 
        className={`
          relative max-w-full max-h-full transition-all duration-300 ease-out select-none
          ${zoom ? 'overflow-auto w-full h-full flex items-start justify-center cursor-zoom-out' : 'flex items-center justify-center'}
        `}
        data-lenis-prevent
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        )}
        <motion.img
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: loading ? 0 : 1 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          src={imageUrl}
          alt="Preview"
          onLoad={() => setLoading(false)}
          onClick={(e) => {
            e.stopPropagation();
            setZoom(!zoom);
          }}
          className={`
            transition-all duration-300 rounded-lg shadow-2xl
            ${zoom ? 'max-w-none w-auto h-auto max-h-none object-contain my-auto cursor-zoom-out' : 'max-h-[90vh] max-w-[90vw] object-contain cursor-zoom-in'}
          `}
        />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Edit Metadata Modal
   ───────────────────────────────────────────── */

interface EditMetadataModalProps {
  image: VaultImage;
  onSave: (id: string, title: string, altText: string) => Promise<void>;
  onClose: () => void;
}

function EditMetadataModal({ image, onSave, onClose }: EditMetadataModalProps) {
  const [title, setTitle] = useState(image.title || cleanFileNameToTitle(image.name));
  const [altText, setAltText] = useState(image.altText || `${cleanFileNameToTitle(image.name)} bespoke haute couture by Gabrielle Benot`);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(image.id, title, altText);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100001] flex items-center justify-center p-4 cursor-default"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-[#0a0a0a] border border-white/10 rounded-xl w-full max-w-md p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-sm font-mono uppercase tracking-wider text-white/80 mb-4">
          Edit Image SEO Metadata
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-white/35 mb-2">
              SEO Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white/80 focus:outline-none focus:border-white/25"
              placeholder="Title for search engines"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-white/35 mb-2">
              Alt Text (SEO + Screen Readers)
            </label>
            <textarea
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white/80 focus:outline-none focus:border-white/25 h-20 resize-none"
              placeholder="Describe the image details for accessibility and SEO"
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-2 font-mono">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-[10px] uppercase bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-3 py-1.5 rounded-lg text-[10px] uppercase bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/35 cursor-pointer flex items-center gap-1.5"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Image Picker Modal
   ───────────────────────────────────────────── */

function ImagePickerModal({
  garmentTitle,
  slotLabel,
  currentImg,
  originalImg,
  onSelect,
  onClose,
  onDeleteSuccess,
}: {
  garmentTitle: string;
  slotLabel?: string;
  currentImg: string;
  originalImg: string;
  onSelect: (imageUrl: string | null) => void;
  onClose: () => void;
  onDeleteSuccess?: (dataUrl: string) => void;
}) {
  const [vaultImages, setVaultImages] = useState<VaultImage[]>([]);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [editingImage, setEditingImage] = useState<VaultImage | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 1. Initial load from local cache
    const loadLocal = () => {
      try {
        const rawVault = localStorage.getItem(VAULT_KEY);
        const vault: VaultImage[] = rawVault ? JSON.parse(rawVault) : [];
        const vaultMapped = vault.map(img => {
          const cleanTitle = img.title || cleanFileNameToTitle(img.name);
          return {
            ...img,
            title: cleanTitle,
            altText: img.altText || `${cleanTitle} bespoke haute couture by Gabrielle Benot`
          };
        });

        const rawSlots = localStorage.getItem(PHOTO_SLOTS_KEY);
        const slots: Record<string, string> = rawSlots ? JSON.parse(rawSlots) : {};

        const slotImages: VaultImage[] = Object.entries(slots).map(([key, dataUrl]) => {
          const cleanName = key.replace('__slot_', '_slot_').toLowerCase().replace(/[^a-z0-9_]+/g, '_') + '.jpg';
          const cleanTitle = cleanFileNameToTitle(cleanName);
          return {
            id: key,
            name: cleanName,
            title: cleanTitle,
            altText: `${cleanTitle} bespoke haute couture by Gabrielle Benot`,
            dataUrl: dataUrl,
            uploadedAt: new Date().toISOString(),
          };
        });

        const combined: VaultImage[] = [...vaultMapped];
        slotImages.forEach((img) => {
          if (!combined.some((c) => c.dataUrl === img.dataUrl)) {
            combined.push(img);
          }
        });

        setVaultImages(combined);
      } catch {}
    };
    loadLocal();

    // 2. Fetch latest vault from Firestore in background
    const syncFromFirestore = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'vault'));
        const list: VaultImage[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const cleanTitle = data.title || cleanFileNameToTitle(data.name || '');
          list.push({
            id: doc.id,
            name: data.name || '',
            title: cleanTitle,
            altText: data.altText || `${cleanTitle} bespoke haute couture by Gabrielle Benot`,
            dataUrl: data.url,
            thumbnailUrl: data.thumbnailUrl || data.url,
            uploadedAt: data.uploadedAt,
          });
        });
        // Sort by uploadedAt descending
        list.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
        localStorage.setItem(VAULT_KEY, JSON.stringify(list));

        // Re-read slots from local storage to combine
        const rawSlots = localStorage.getItem(PHOTO_SLOTS_KEY);
        const slots: Record<string, string> = rawSlots ? JSON.parse(rawSlots) : {};
        const slotImages: VaultImage[] = Object.entries(slots).map(([key, dataUrl]) => {
          const cleanName = key.replace('__slot_', '_slot_').toLowerCase().replace(/[^a-z0-9_]+/g, '_') + '.jpg';
          const cleanTitle = cleanFileNameToTitle(cleanName);
          return {
            id: key,
            name: cleanName,
            title: cleanTitle,
            altText: `${cleanTitle} bespoke haute couture by Gabrielle Benot`,
            dataUrl: dataUrl,
            uploadedAt: new Date().toISOString(),
          };
        });

        const combined = [...list];
        slotImages.forEach((img) => {
          if (!combined.some((c) => c.dataUrl === img.dataUrl)) {
            combined.push(img);
          }
        });

        setVaultImages(combined);
      } catch (e) {
        console.error("Firestore vault sync in modal failed:", e);
      }
    };
    syncFromFirestore();
  }, []);

  const handleSaveMetadata = useCallback(async (id: string, title: string, altText: string) => {
    try {
      await setDoc(doc(db, 'vault', id), { title, altText }, { merge: true });
      setVaultImages(prev => prev.map(img => img.id === id ? { ...img, title, altText } : img));
      
      const raw = localStorage.getItem(VAULT_KEY);
      if (raw) {
        const vault = JSON.parse(raw) as VaultImage[];
        const updated = vault.map(img => img.id === id ? { ...img, title, altText } : img);
        localStorage.setItem(VAULT_KEY, JSON.stringify(updated));
      }
    } catch (e) {
      console.error("Failed to save metadata:", e);
    }
  }, []);

  const handleUpload = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const files = target.files;
    if (!files) return;
    const filesArray = Array.from(files);
    target.value = '';
    const accepted = ['image/jpeg', 'image/png', 'image/webp'];
    for (const file of filesArray) {
      if (!accepted.includes(file.type)) continue;
      try {
        let uploadFile = file;
        if (slotLabel) {
          const cleanTitle = garmentTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          const cleanSlot = slotLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          const newName = `${cleanTitle}-${cleanSlot}.jpg`;
          uploadFile = new File([file], newName, { type: file.type });
        }
        const newImg = await uploadImageToCloud(uploadFile);
        setVaultImages((prev) => {
          if (prev.some(img => img.id === newImg.id)) {
            return prev;
          }
          return [newImg, ...prev];
        });
        onSelect(newImg.dataUrl); // Auto-select on upload
      } catch (err) {
        console.error("Cloud upload in modal failed:", err);
      }
    }
  }, [garmentTitle, slotLabel, onSelect]);

  const handleDeleteImage = useCallback(async (id: string, dataUrl: string) => {
    if (!window.confirm('Delete this photo permanently from the vault and slots?')) return;
    try {
      await deleteImageFromCloud(id, dataUrl);
      setVaultImages(prev => prev.filter(img => img.id !== id && img.dataUrl !== dataUrl));
      if (onDeleteSuccess) {
        onDeleteSuccess(dataUrl);
      }
    } catch (e) {
      console.error(e);
    }
  }, [onDeleteSuccess]);

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
                  <div
                    key={img.id}
                    className="relative aspect-square rounded-lg overflow-hidden border border-white/8 hover:border-white/25 group"
                  >
                    <button
                      onClick={() => onSelect(img.dataUrl)}
                      className={`
                        w-full h-full relative border-2 transition-all cursor-pointer
                        ${isSelected
                          ? 'border-emerald-400 ring-2 ring-emerald-400/30'
                          : 'border-transparent'
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
                        <p className="text-[9px] font-mono text-white/70 truncate">{img.title || img.name}</p>
                      </div>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxImg(img.dataUrl);
                      }}
                      className="
                        absolute top-1.5 left-1.5 w-6 h-6 rounded-full
                        bg-black/60 border border-white/10
                        flex items-center justify-center
                        opacity-0 group-hover:opacity-100 transition-opacity
                        hover:bg-white/20 hover:border-white/30 cursor-pointer z-10
                      "
                      title="Preview full size"
                    >
                      <svg className="w-3 h-3 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingImage(img);
                      }}
                      className="
                        absolute top-1.5 left-[38px] w-6 h-6 rounded-full
                        bg-black/60 border border-white/10
                        flex items-center justify-center
                        opacity-0 group-hover:opacity-100 transition-opacity
                        hover:bg-violet-500/30 hover:border-violet-500/30 cursor-pointer z-10
                      "
                      title="Edit SEO Metadata"
                    >
                      <svg className="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteImage(img.id, img.dataUrl);
                      }}
                      className="
                        absolute top-1.5 right-1.5 w-6 h-6 rounded-full
                        bg-black/60 border border-white/10
                        flex items-center justify-center
                        opacity-0 group-hover:opacity-100 transition-opacity
                        hover:bg-red-500/30 hover:border-red-500/30 cursor-pointer z-10
                      "
                      title="Delete permanently"
                    >
                      <svg className="w-3 h-3 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>

      {lightboxImg && (
        <Lightbox imageUrl={lightboxImg} onClose={() => setLightboxImg(null)} />
      )}

      <AnimatePresence>
        {editingImage && (
          <EditMetadataModal
            image={editingImage}
            onSave={handleSaveMetadata}
            onClose={() => setEditingImage(null)}
          />
        )}
      </AnimatePresence>
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
  onPhotoSlotsSave,
  onPhotoSlotClick,
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
  onPhotoSlotsSave: (garmentTitle: string, newSlots: Record<string, string>) => void;
  onPhotoSlotClick: (slotIndex: number, callback: (url: string | null) => void) => void;
}) {
  const [saved, setSaved] = useState(false);
  const [localSlots, setLocalSlots] = useState<Record<string, string>>({});

  useEffect(() => {
    const slots: Record<string, string> = {};
    for (let i = 0; i < 6; i++) {
      const key = `${garment.title}__slot_${i}`;
      if (photoSlots[key]) {
        slots[key] = photoSlots[key];
      }
    }
    setLocalSlots(slots);
  }, [garment.title, photoSlots]);

  const handleSave = () => {
    onSave();
    
    // Persist all slot changes to local storage at once
    onPhotoSlotsSave(garment.title, localSlots);

    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const handleLocalSlotChange = (slotKey: string, imageUrl: string | null) => {
    setLocalSlots((prev) => {
      const next = { ...prev };
      if (imageUrl === null) {
        delete next[slotKey];
      } else {
        next[slotKey] = imageUrl;
      }
      return next;
    });
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
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span
                className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full ${
                  categoryColors[garment.category] || 'bg-white/10 text-white/60'
                }`}
              >
                {garment.category}
              </span>
              <span className="text-xs font-mono text-white/30">{garment.price}</span>
              {offerings.rentPhotoshoot.enabled && (
                <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
                  For Rent {offerings.rentPhotoshoot.sizes ? `(${offerings.rentPhotoshoot.sizes})` : ''}
                </span>
              )}
              {offerings.purchaseSample.enabled && (
                <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/20">
                  Sample Sale
                </span>
              )}
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
        <Field
          label="Available Sizes for Rent"
          value={offerings.rentPhotoshoot.sizes || ''}
          onChange={(v) =>
            onUpdate({
              ...offerings,
              rentPhotoshoot: { ...offerings.rentPhotoshoot, sizes: v },
            })
          }
          placeholder="US 2, US 4, US 6"
        />
      </OfferingSection>

      {/* Photo Slots */}
      <div className="border-t border-white/6 pt-4 mt-1">
        <p className="text-[10px] font-mono uppercase tracking-wider text-white/30 mb-3">Product Photos (6 Views)</p>
        <div className="grid grid-cols-3 gap-2">
          {(SLOT_LABELS[garment.category] || SLOT_LABELS.Dresses).map((label, idx) => {
            const slotKey = `${garment.title}__slot_${idx}`;
            const slotUrl = localSlots[slotKey];
            return (
              <div key={idx} className="relative group">
                <button
                  type="button"
                  onClick={() => onPhotoSlotClick(idx, (url) => handleLocalSlotChange(slotKey, url))}
                  className={`
                    block w-full aspect-square rounded-lg border cursor-pointer
                    overflow-hidden transition-all text-left
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
                </button>
                {slotUrl && (
                  <button
                    type="button"
                    onClick={() => handleLocalSlotChange(slotKey, null)}
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

function detectDuplicates(images: VaultImage[]): VaultImage[][] {
  const groupsByHash: Record<string, VaultImage[]> = {};
  const groupsByName: Record<string, VaultImage[]> = {};

  images.forEach(img => {
    if (img.hash) {
      if (!groupsByHash[img.hash]) {
        groupsByHash[img.hash] = [];
      }
      groupsByHash[img.hash].push(img);
    } else {
      const cleanName = img.name.toLowerCase().trim();
      if (!groupsByName[cleanName]) {
        groupsByName[cleanName] = [];
      }
      groupsByName[cleanName].push(img);
    }
  });

  const duplicateGroups: VaultImage[][] = [];

  Object.values(groupsByHash).forEach(group => {
    if (group.length > 1) {
      duplicateGroups.push(group);
    }
  });

  Object.values(groupsByName).forEach(group => {
    if (group.length > 1) {
      const alreadyGrouped = group.some(img => 
        duplicateGroups.some(g => g.some(existing => existing.id === img.id))
      );
      if (!alreadyGrouped) {
        duplicateGroups.push(group);
      }
    }
  });

  return duplicateGroups;
}

async function mergeDuplicateGroups(
  groups: VaultImage[][],
  allImages: VaultImage[],
  setImages: React.Dispatch<React.SetStateAction<VaultImage[]>>,
  onDeleteSuccess?: (dataUrl: string) => void
): Promise<number> {
  let deletedCount = 0;
  
  let nextSlots: Record<string, string> = {};
  let nextOverrides: Record<string, string> = {};
  const slotsRef = doc(db, 'config', 'photo_slots');
  const overridesRef = doc(db, 'config', 'image_overrides');
  
  try {
    const slotsSnap = await getDoc(slotsRef);
    if (slotsSnap.exists()) {
      nextSlots = slotsSnap.data() as Record<string, string>;
    }
  } catch (e) {
    console.error("Failed to load slots during merge:", e);
  }
  
  try {
    const overridesSnap = await getDoc(overridesRef);
    if (overridesSnap.exists()) {
      nextOverrides = overridesSnap.data() as Record<string, string>;
    }
  } catch (e) {
    console.error("Failed to load overrides during merge:", e);
  }

  let slotsChanged = false;
  let overridesChanged = false;
  const deletedUrls: string[] = [];
  const keptImages: VaultImage[] = [...allImages];

  for (const group of groups) {
    if (group.length <= 1) continue;
    
    const sorted = [...group].sort((a, b) => new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime());
    const keeper = sorted[0];
    const duplicates = sorted.slice(1);

    for (const dup of duplicates) {
      try {
        const storageRef = ref(storage, dup.dataUrl);
        await deleteObject(storageRef);
      } catch (e) {
        console.error("Storage delete failed for duplicate:", dup.dataUrl, e);
      }
      
      try {
        await deleteDoc(doc(db, 'vault', dup.id));
      } catch (e) {
        console.error("Firestore vault delete failed for duplicate:", dup.id, e);
      }
      
      Object.entries(nextSlots).forEach(([key, val]) => {
        if (val === dup.dataUrl || key === dup.id) {
          nextSlots[key] = keeper.dataUrl;
          slotsChanged = true;
        }
      });
      
      Object.entries(nextOverrides).forEach(([key, val]) => {
        if (val === dup.dataUrl || key === dup.id) {
          nextOverrides[key] = keeper.dataUrl;
          overridesChanged = true;
        }
      });
      
      deletedUrls.push(dup.dataUrl);
      deletedCount++;
      
      const idx = keptImages.findIndex(img => img.id === dup.id);
      if (idx !== -1) {
        keptImages.splice(idx, 1);
      }
    }
  }

  if (slotsChanged) {
    try {
      await setDoc(slotsRef, nextSlots);
      localStorage.setItem(PHOTO_SLOTS_KEY, JSON.stringify(nextSlots));
    } catch (e) {
      console.error("Failed to save slots:", e);
    }
  }
  
  if (overridesChanged) {
    try {
      await setDoc(overridesRef, nextOverrides);
      localStorage.setItem(IMAGE_OVERRIDES_KEY, JSON.stringify(nextOverrides));
    } catch (e) {
      console.error("Failed to save overrides:", e);
    }
  }

  try {
    localStorage.setItem(VAULT_KEY, JSON.stringify(keptImages));
  } catch {}

  setImages(keptImages);

  if (onDeleteSuccess) {
    deletedUrls.forEach(url => {
      try {
        onDeleteSuccess(url);
      } catch {}
    });
  }

  return deletedCount;
}

function DesignVault({ onDeleteSuccess }: { onDeleteSuccess?: (dataUrl: string) => void }) {
  const [images, setImages] = useState<VaultImage[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [editingImage, setEditingImage] = useState<VaultImage | null>(null);
  const [duplicateGroups, setDuplicateGroups] = useState<VaultImage[][]>([]);
  const [hasScanned, setHasScanned] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [hasScannedThumbs, setHasScannedThumbs] = useState(false);
  const [missingThumbs, setMissingThumbs] = useState<VaultImage[]>([]);
  const [isGeneratingThumbs, setIsGeneratingThumbs] = useState(false);
  const [generatingProgress, setGeneratingProgress] = useState(0);

  const handleScanOptimizations = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'vault'));
      const missing: VaultImage[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (!data.thumbnailUrl && data.url) {
          const cleanTitle = data.title || cleanFileNameToTitle(data.name || '');
          missing.push({
            id: docSnap.id,
            name: data.name || '',
            title: cleanTitle,
            altText: data.altText || `${cleanTitle} bespoke haute couture by Gabrielle Benot`,
            dataUrl: data.url,
            uploadedAt: data.uploadedAt,
            hash: data.hash
          });
        }
      });
      setMissingThumbs(missing);
      setHasScannedThumbs(true);
    } catch (e) {
      console.error("Failed to scan for missing thumbnails:", e);
      alert("Failed to scan vault images. Check console for details.");
    }
  }, []);

  const handleBatchGenerateThumbnails = useCallback(async () => {
    if (missingThumbs.length === 0) return;
    setIsGeneratingThumbs(true);
    setGeneratingProgress(0);

    let count = 0;
    for (const img of missingThumbs) {
      try {
        // 1. Download/load image from URL
        const loadedImg = await new Promise<HTMLImageElement>((resolve, reject) => {
          const tempImg = new Image();
          tempImg.crossOrigin = "anonymous";
          tempImg.onload = () => resolve(tempImg);
          tempImg.onerror = (err) => reject(err);
          tempImg.src = img.dataUrl;
        });

        // 2. Compress to 800px width/height canvas at 75% quality
        let w = loadedImg.naturalWidth;
        let h = loadedImg.naturalHeight;
        const maxDim = 800;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round(h * (maxDim / w));
            w = maxDim;
          } else {
            w = Math.round(w * (maxDim / h));
            h = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(loadedImg, 0, 0, w, h);
        const thumbDataUrl = canvas.toDataURL('image/jpeg', 0.75);

        // 3. Upload to storage
        const urlFriendlyName = cleanFileNameToUrlFriendly(img.name);
        const thumbStorageRef = ref(storage, `vault/thumbnails/${urlFriendlyName}-thumb-${img.id.substring(0, 8)}.jpg`);
        await uploadString(thumbStorageRef, thumbDataUrl, 'data_url');
        const thumbnailUrl = await getDownloadURL(thumbStorageRef);

        // 4. Update Firestore
        await setDoc(doc(db, 'vault', img.id), { thumbnailUrl }, { merge: true });

        // Update local images state on-the-fly
        setImages(prev => prev.map(item => item.id === img.id ? { ...item, thumbnailUrl } : item));

        count++;
        setGeneratingProgress(count);
      } catch (err) {
        console.error(`Failed to generate thumbnail for image ID ${img.id}:`, err);
      }
    }

    // Sync to local storage vault cache
    try {
      const querySnapshot = await getDocs(collection(db, 'vault'));
      const list: VaultImage[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const cleanTitle = data.title || cleanFileNameToTitle(data.name || '');
        list.push({
          id: doc.id,
          name: data.name || '',
          title: cleanTitle,
          altText: data.altText || `${cleanTitle} bespoke haute couture by Gabrielle Benot`,
          dataUrl: data.url,
          thumbnailUrl: data.thumbnailUrl || data.url,
          uploadedAt: data.uploadedAt,
          hash: data.hash
        });
      });
      list.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
      localStorage.setItem(VAULT_KEY, JSON.stringify(list));
    } catch {}

    alert(`Successfully generated thumbnails for ${count} of ${missingThumbs.length} images.`);
    setIsGeneratingThumbs(false);
    setHasScannedThumbs(false);
    setMissingThumbs([]);
  }, [missingThumbs]);

  useEffect(() => {
    // 1. Initial load from local cache
    try {
      const raw = localStorage.getItem(VAULT_KEY);
      if (raw) {
        const vault = JSON.parse(raw) as VaultImage[];
        const mapped = vault.map(img => {
          const cleanTitle = img.title || cleanFileNameToTitle(img.name);
          return {
            ...img,
            title: cleanTitle,
            altText: img.altText || `${cleanTitle} bespoke haute couture by Gabrielle Benot`,
            hash: img.hash
          };
        });
        setImages(mapped);
      }
    } catch {}

    // 2. Fetch from Firestore
    const loadFromCloud = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'vault'));
        const list: VaultImage[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const cleanTitle = data.title || cleanFileNameToTitle(data.name || '');
          list.push({
            id: doc.id,
            name: data.name || '',
            title: cleanTitle,
            altText: data.altText || `${cleanTitle} bespoke haute couture by Gabrielle Benot`,
            dataUrl: data.url,
            thumbnailUrl: data.thumbnailUrl || data.url,
            uploadedAt: data.uploadedAt,
            hash: data.hash
          });
        });
        // Sort by uploadedAt descending
        list.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
        setImages(list);
        localStorage.setItem(VAULT_KEY, JSON.stringify(list));
      } catch (e) {
        console.error("Failed to load vault from Firestore:", e);
      }
    };
    loadFromCloud();
  }, []);

  const handleSaveMetadata = useCallback(async (id: string, title: string, altText: string) => {
    try {
      await setDoc(doc(db, 'vault', id), { title, altText }, { merge: true });
      setImages(prev => prev.map(img => img.id === id ? { ...img, title, altText } : img));
      
      const raw = localStorage.getItem(VAULT_KEY);
      if (raw) {
        const vault = JSON.parse(raw) as VaultImage[];
        const updated = vault.map(img => img.id === id ? { ...img, title, altText } : img);
        localStorage.setItem(VAULT_KEY, JSON.stringify(updated));
      }
    } catch (e) {
      console.error("Failed to save metadata:", e);
    }
  }, []);

  const processFiles = useCallback(async (files: FileList | null) => {
    if (!files) return;
    const accepted = ['image/jpeg', 'image/png', 'image/webp'];
    for (const file of Array.from(files)) {
      if (!accepted.includes(file.type)) continue;
      try {
        const newImg = await uploadImageToCloud(file);
        setImages(prev => {
          if (prev.some(img => img.id === newImg.id)) {
            return prev;
          }
          return [newImg, ...prev];
        });
      } catch (err) {
        console.error("Failed to upload image via dropzone:", err);
      }
    }
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
    async (id: string) => {
      if (!window.confirm('Delete this photo permanently from the vault and all slots?')) return;
      
      try {
        const imgToDelete = images.find(img => img.id === id);
        if (!imgToDelete) return;
        await deleteImageFromCloud(id, imgToDelete.dataUrl);
        setImages(prev => prev.filter(img => img.id !== id));
        if (onDeleteSuccess) {
          onDeleteSuccess(imgToDelete.dataUrl);
        }
      } catch (e) {
        console.error("Failed to delete image:", e);
      }
    },
    [images, onDeleteSuccess]
  );

  const handleScan = useCallback(() => {
    const groups = detectDuplicates(images);
    setDuplicateGroups(groups);
    setHasScanned(true);
  }, [images]);

  const handleMerge = useCallback(async () => {
    if (duplicateGroups.length === 0) return;
    const totalDups = duplicateGroups.reduce((acc, g) => acc + (g.length - 1), 0);
    if (!window.confirm(`Are you sure you want to merge and permanently delete ${totalDups} duplicate image(s)? This will update all active photo slots to point to the kept copies.`)) {
      return;
    }
    setIsMerging(true);
    try {
      const deletedCount = await mergeDuplicateGroups(duplicateGroups, images, setImages, onDeleteSuccess);
      alert(`Successfully merged duplicates! Deleted ${deletedCount} duplicate image(s) from cloud storage and database, and updated all active slots.`);
      setDuplicateGroups([]);
      setHasScanned(false);
    } catch (e) {
      console.error("Failed to merge duplicates:", e);
      alert("Failed to merge duplicates. Please check console for errors.");
    } finally {
      setIsMerging(false);
    }
  }, [duplicateGroups, images, onDeleteSuccess]);

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

      {/* Duplicate Detection Tool */}
      <div className="mb-8 p-6 rounded-xl border border-white/8 bg-white/[0.02] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-mono font-medium text-white/90">Vault Duplicate Detector</h3>
          <p className="text-xs font-mono text-white/40 mt-1">Scan the Vault for identical images or files with the same name to save cloud storage space.</p>
        </div>
        <div className="flex items-center gap-3">
          {hasScanned && (
            <button
              onClick={() => {
                setHasScanned(false);
                setDuplicateGroups([]);
              }}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-mono text-white/60 cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={handleScan}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-mono text-white/90 cursor-pointer"
          >
            Scan Vault
          </button>
        </div>
      </div>

      {hasScanned && (
        <div className="mb-8 p-6 rounded-xl border border-violet-500/20 bg-violet-500/[0.02]">
          {duplicateGroups.length === 0 ? (
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs font-mono text-white/80">Scan complete: No duplicate images found in the Vault.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="text-xs font-mono font-medium text-white/90">
                      Found {duplicateGroups.length} group{duplicateGroups.length > 1 ? 's' : ''} of duplicates (
                      {duplicateGroups.reduce((acc, g) => acc + (g.length - 1), 0)} redundant image{duplicateGroups.reduce((acc, g) => acc + (g.length - 1), 0) > 1 ? 's' : ''} total).
                    </p>
                    <p className="text-[10px] font-mono text-white/40 mt-0.5">Merging will keep the oldest version and delete extra files, redirecting active slots to the kept copy.</p>
                  </div>
                </div>
                <button
                  onClick={handleMerge}
                  disabled={isMerging}
                  className="px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 disabled:opacity-50 text-xs font-mono text-amber-300 cursor-pointer self-start md:self-auto"
                >
                  {isMerging ? 'Merging...' : 'Merge & Clean Duplicates'}
                </button>
              </div>

              {/* Duplicate Previews */}
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-60 overflow-y-auto pr-2">
                {duplicateGroups.map((group, groupIdx) => {
                  const keeper = [...group].sort((a, b) => new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime())[0];
                  const duplicates = group.filter(img => img.id !== keeper.id);
                  return (
                    <div key={groupIdx} className="p-3 rounded-lg border border-white/5 bg-white/[0.01] flex gap-3">
                      <img src={keeper.dataUrl} className="w-12 h-12 rounded object-cover border border-white/10" alt="Keeper preview" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-mono font-medium text-white/80 truncate">{keeper.title || keeper.name}</p>
                        <p className="text-[9px] font-mono text-emerald-400 mt-0.5">Keep: {new Date(keeper.uploadedAt).toLocaleDateString()}</p>
                        <p className="text-[9px] font-mono text-red-400 mt-0.5">Delete {duplicates.length} duplicate(s)</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Performance Optimization Tool */}
      <div className="mb-8 p-6 rounded-xl border border-white/8 bg-white/[0.02] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-mono font-medium text-white/90">Vault Performance Optimizer</h3>
          <p className="text-xs font-mono text-white/40 mt-1">Scan for large images missing optimized mobile thumbnails to accelerate mobile load times.</p>
        </div>
        <div className="flex items-center gap-3">
          {hasScannedThumbs && (
            <button
              onClick={() => {
                setHasScannedThumbs(false);
                setMissingThumbs([]);
              }}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-mono text-white/60 cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={handleScanOptimizations}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-mono text-white/90 cursor-pointer"
          >
            Scan Mobile Thumbnails
          </button>
        </div>
      </div>

      {hasScannedThumbs && (
        <div className="mb-8 p-6 rounded-xl border border-violet-500/20 bg-violet-500/[0.02]">
          {missingThumbs.length === 0 ? (
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs font-mono text-white/80">Scan complete: All images are fully optimized with mobile thumbnails!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div>
                    <p className="text-xs font-mono font-medium text-white/90">
                      Found {missingThumbs.length} image{missingThumbs.length > 1 ? 's' : ''} lacking mobile thumbnails.
                    </p>
                    <p className="text-[10px] font-mono text-white/40 mt-0.5">Optimizing will generate lightweight 800px thumbnails in Storage for grid views.</p>
                  </div>
                </div>
                <button
                  onClick={handleBatchGenerateThumbnails}
                  disabled={isGeneratingThumbs}
                  className="px-4 py-2 rounded-lg bg-violet-500/20 border border-violet-500/30 hover:bg-violet-500/30 disabled:opacity-50 text-xs font-mono text-violet-300 cursor-pointer self-start md:self-auto"
                >
                  {isGeneratingThumbs ? `Optimizing (${generatingProgress}/${missingThumbs.length})...` : 'Generate Mobile Thumbnails'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

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
                    alt={img.altText || img.title || img.name}
                    onClick={() => setLightboxImg(img.dataUrl)}
                    className="w-full h-full object-cover cursor-zoom-in hover:brightness-90 transition-all"
                  />
                  <button
                    onClick={() => setLightboxImg(img.dataUrl)}
                    className="
                      absolute bottom-2 left-2 w-7 h-7 rounded-full
                      bg-black/60 border border-white/10
                      flex items-center justify-center
                      opacity-0 group-hover:opacity-100 transition-opacity
                      hover:bg-white/20 hover:border-white/30 cursor-pointer
                    "
                    title="Preview full size"
                  >
                    <svg className="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingImage(img);
                    }}
                    className="
                      absolute bottom-2 left-10 w-7 h-7 rounded-full
                      bg-black/60 border border-white/10
                      flex items-center justify-center
                      opacity-0 group-hover:opacity-100 transition-opacity
                      hover:bg-violet-500/30 hover:border-violet-500/30 cursor-pointer
                    "
                    title="Edit SEO Metadata"
                  >
                    <svg className="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                  </button>
                  <button
                    onClick={() => deleteImage(img.id)}
                    className="
                      absolute top-2 right-2 w-7 h-7 rounded-full
                      bg-black/60 border border-white/10
                      flex items-center justify-center
                      opacity-0 group-hover:opacity-100 transition-opacity
                      hover:bg-red-500/30 hover:border-red-500/30 cursor-pointer
                    "
                    title="Delete permanently"
                  >
                    <svg className="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-xs font-mono text-white/60 truncate" title={img.title || img.name}>{img.title || img.name}</p>
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

      <AnimatePresence>
        {lightboxImg && (
          <Lightbox imageUrl={lightboxImg} onClose={() => setLightboxImg(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editingImage && (
          <EditMetadataModal
            image={editingImage}
            onSave={handleSaveMetadata}
            onClose={() => setEditingImage(null)}
          />
        )}
      </AnimatePresence>
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

export interface LookbookSectionConfig {
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
  { id: "hikihaku", title: "Kyoto's Golden Thread (Hikihaku)", visible: true, images: { main: "/images/process/threading.jpg" } },
  { id: "stallion", title: "The Painted Steed (Stallion)", visible: true, images: { front: "/images/process/equine_dahlia_main.jpg", back: "/images/process/perfect_jacket.png" } },
  { id: "mondrian", title: "Deconstructed Mondrian", visible: true, images: { front: "/images/process/mondrian_blazer_front.png", back: "/images/process/mondrian_blazer_back.png" } },
  { id: "miro", title: "Constellation Miró", visible: true, images: { front: "/images/process/miro_inspiration.png", back: "/images/process/miro_top_back.png" } },
  { id: "fuchsia-majesty", title: "Fuchsia Majesty (Gallery)", visible: true, images: { front: "/images/paintings/dress_from_colorful_face.jpg", back: "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Ff5720508-8148-4bd3-ab0f-2b8612f15cda?alt=media&token=7be40366-58e3-4eb1-91c8-f24d29299550" } },
  { id: "blush-enchantress", title: "Blush Enchantress (Gallery)", visible: true, images: { front: "/images/paintings/brunette_yellow_painting.jpg", back: "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F2f7c3f0f-2025-4098-86e5-76e1b21fe5e4?alt=media&token=b174088f-754a-49ef-8d45-ffe114715f60" } },
  { id: "golden-whisper", title: "Golden Whisper (Gallery)", visible: true, images: { front: "/images/paintings/dress_from_painting_2.jpg", back: "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Fa233bbdb-25ac-47fe-b686-71493e2cc226?alt=media&token=447745e0-6fd4-4fe0-b328-63b25f3199e0" } },
  { id: "crimson-allure", title: "Crimson Allure (Gallery)", visible: true, images: { front: "/images/paintings/palazzo_inspired_dress.jpg", back: "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2F04669707-071a-432c-82e4-76b144da07e4?alt=media&token=87ed9797-099d-4c08-ad4e-bcac6cc65c4b" } },
  { id: "midnight-elegance", title: "Midnight Elegance (Gallery)", visible: true, images: { front: "/images/paintings/italian_palazzo.jpg", back: "https://firebasestorage.googleapis.com/v0/b/art-couture-new-website.firebasestorage.app/o/vault%2Ff4c8fe02-afaa-458f-b217-bc5a3a57ea00?alt=media&token=697ddc89-dcdd-432d-9e94-a4c759b5027e" } }
];

interface PickerTarget {
  garmentTitle: string;
  slotIndex?: number;
  isLookbook?: boolean;
  lookbookSectionId?: string;
  lookbookImageKey?: 'main' | 'front' | 'back';
}

function AdminPanel() {
  const [config, setConfig] = useState<OfferingConfig>({});
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [showOnlyForRent, setShowOnlyForRent] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'inventory' | 'vault' | 'lookbook'>('inventory');
  const [imageOverrides, setImageOverrides] = useState<Record<string, string>>({});
  const [hiddenItems, setHiddenItems] = useState<string[]>([]);
  const [photoSlots, setPhotoSlots] = useState<Record<string, string>>({});
  const [lookbookConfig, setLookbookConfig] = useState<LookbookSectionConfig[]>(defaultLookbookSections);
  const [lookbookPageVisible, setLookbookPageVisible] = useState<boolean>(true);
  const [pickerTarget, setPickerTarget] = useState<PickerTarget | null>(null);
  const pickerCallbackRef = useRef<((url: string | null) => void) | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'warning' | 'info' } | null>(null);
  const [storageUsage, setStorageUsage] = useState<number>(0);

  const showToast = useCallback((message: string, type: 'success' | 'warning' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  }, []);

  const updateStorageUsage = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      let totalSize = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          totalSize += (localStorage.getItem(key) || '').length;
        }
      }
      const percent = Math.min(100, Math.round((totalSize / 5000000) * 100));
      setStorageUsage(percent);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('clear') === 'true') {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(IMAGE_OVERRIDES_KEY);
        localStorage.removeItem(VAULT_KEY);
        localStorage.removeItem(HIDDEN_KEY);
        localStorage.removeItem(PHOTO_SLOTS_KEY);
        localStorage.removeItem(LOOKBOOK_CONFIG_KEY);
        window.location.href = window.location.pathname;
        return;
      }
    }

    // 1. Initial load from local storage
    setConfig(loadConfig());
    try {
      const raw = localStorage.getItem(IMAGE_OVERRIDES_KEY);
      if (raw) setImageOverrides(JSON.parse(raw));
    } catch {}
    try {
      const raw = localStorage.getItem(HIDDEN_KEY);
      if (raw) setHiddenItems(JSON.parse(raw));
    } catch {}
    try {
      const raw = localStorage.getItem(PHOTO_SLOTS_KEY);
      if (raw) setPhotoSlots(JSON.parse(raw));
    } catch {}
    try {
      const raw = localStorage.getItem(LOOKBOOK_CONFIG_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const merged = defaultLookbookSections.map(def => {
            const match = parsed.find((s: any) => s.id === def.id);
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
          setLookbookConfig(merged);
        }
      }
    } catch {}

    // 2. Fetch from Firestore
    const syncAllFromCloud = async () => {
      try {
        // Fetch offerings
        const offeringsSnap = await getDoc(doc(db, 'config', 'offerings'));
        if (offeringsSnap.exists()) {
          const data = offeringsSnap.data() as OfferingConfig;
          setConfig(data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }

        // Fetch overrides
        const overridesSnap = await getDoc(doc(db, 'config', 'image_overrides'));
        if (overridesSnap.exists()) {
          const data = overridesSnap.data() as Record<string, string>;
          setImageOverrides(data);
          localStorage.setItem(IMAGE_OVERRIDES_KEY, JSON.stringify(data));
        }

        // Fetch hidden items
        const hiddenSnap = await getDoc(doc(db, 'config', 'hidden_items'));
        if (hiddenSnap.exists()) {
          const data = hiddenSnap.data();
          const list = data.hiddenList || [];
          setHiddenItems(list);
          localStorage.setItem(HIDDEN_KEY, JSON.stringify(list));
        }

        // Fetch photo slots
        const slotsSnap = await getDoc(doc(db, 'config', 'photo_slots'));
        if (slotsSnap.exists()) {
          const data = slotsSnap.data() as Record<string, string>;
          setPhotoSlots(data);
          localStorage.setItem(PHOTO_SLOTS_KEY, JSON.stringify(data));
        }

        // Fetch lookbook config
        const lookbookSnap = await getDoc(doc(db, 'config', 'lookbook'));
        if (lookbookSnap.exists()) {
          const data = lookbookSnap.data();
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
            setLookbookConfig(merged);
            localStorage.setItem(LOOKBOOK_CONFIG_KEY, JSON.stringify(merged));
          }
          if (data.visible !== undefined) {
            setLookbookPageVisible(data.visible);
          }
        }
      } catch (e) {
        console.error("Firestore AdminPanel sync failed:", e);
      }
    };
    syncAllFromCloud();
  }, []);

  useEffect(() => {
    updateStorageUsage();
  }, [photoSlots, imageOverrides, activeTab, updateStorageUsage, lookbookConfig]);

  const handleImageOverride = useCallback(async (garmentTitle: string, imageUrl: string | null) => {
    setImageOverrides((prev) => {
      const next = { ...prev };
      if (imageUrl === null) {
        delete next[garmentTitle];
      } else {
        next[garmentTitle] = imageUrl;
      }
      safeLocalStorageSet(IMAGE_OVERRIDES_KEY, JSON.stringify(next));

      // Sync to Firestore immediately using the fresh object
      setDoc(doc(db, 'config', 'image_overrides'), next)
        .catch(e => console.error("Failed to sync image_overrides to Firestore:", e));

      return next;
    });
    setPickerTarget(null);
  }, []);

  const handleUpdateLookbook = useCallback((updatedSections: LookbookSectionConfig[]) => {
    setLookbookConfig(updatedSections);
    safeLocalStorageSet(LOOKBOOK_CONFIG_KEY, JSON.stringify(updatedSections));
    setDoc(doc(db, 'config', 'lookbook'), { sections: updatedSections, visible: lookbookPageVisible }, { merge: true })
      .catch(e => console.error("Failed to sync lookbook to Firestore:", e));
  }, [lookbookPageVisible]);

  const handleDeleteSuccess = useCallback((deletedUrl: string) => {
    // 1. Remove from local imageOverrides
    setImageOverrides((prev) => {
      const next = { ...prev };
      let changed = false;
      Object.entries(next).forEach(([k, v]) => {
        if (v === deletedUrl) {
          delete next[k];
          changed = true;
        }
      });
      if (changed) {
        safeLocalStorageSet(IMAGE_OVERRIDES_KEY, JSON.stringify(next));
      }
      return next;
    });

    // 2. Remove from local photoSlots
    setPhotoSlots((prev) => {
      const next = { ...prev };
      let changed = false;
      Object.entries(next).forEach(([k, v]) => {
        if (v === deletedUrl) {
          delete next[k];
          changed = true;
        }
      });
      if (changed) {
        safeLocalStorageSet(PHOTO_SLOTS_KEY, JSON.stringify(next));
      }
      return next;
    });

    showToast('Image and affected slots updated in-place', 'success');
  }, [showToast]);

  const categories = ['All', ...Array.from(new Set(GARMENTS.map((g) => g.category)))];

  const filteredGarments = React.useMemo(() => {
    let list = filterCategory === 'All'
      ? GARMENTS
      : GARMENTS.filter((g) => g.category === filterCategory);

    if (showOnlyForRent) {
      list = list.filter((g) => {
        const itemConfig = config[g.title];
        return itemConfig?.rentPhotoshoot?.enabled;
      });
    }
    return list;
  }, [filterCategory, showOnlyForRent, config]);

  const updateItem = useCallback((title: string, updated: ItemOfferings) => {
    setConfig((prev) => ({ ...prev, [title]: updated }));
  }, []);

  const saveItem = useCallback(
    async (title: string) => {
      const updated = { ...config };
      if (!safeLocalStorageSet(STORAGE_KEY, JSON.stringify(updated))) {
        alert('Storage is full. Try removing some photos from the vault or slots first.');
        return;
      }
      setLastSaved(new Date().toLocaleTimeString());

      // Sync to Firestore
      try {
        await setDoc(doc(db, 'config', 'offerings'), updated);
      } catch (e) {
        console.error("Failed to sync offerings to Firestore:", e);
      }
    },
    [config]
  );

  const saveAll = useCallback(async () => {
    if (!safeLocalStorageSet(STORAGE_KEY, JSON.stringify(config))) {
      alert('Storage is full. Try removing some photos from the vault or slots first.');
      return;
    }
    setLastSaved(new Date().toLocaleTimeString());
    showToast('All changes saved successfully', 'success');

    // Sync to Firestore
    try {
      await setDoc(doc(db, 'config', 'offerings'), config);
    } catch (e) {
      console.error("Failed to sync offerings to Firestore:", e);
    }
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
    localStorage.removeItem(LOOKBOOK_CONFIG_KEY);
    setConfig(loadConfig());
    setImageOverrides({});
    setHiddenItems([]);
    setPhotoSlots({});
    setLookbookConfig(defaultLookbookSections);
    setDoc(doc(db, 'config', 'lookbook'), { sections: defaultLookbookSections })
      .catch(e => console.error("Failed to reset lookbook doc:", e));
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
            {(['inventory', 'vault', 'lookbook'] as const).map((tab) => (
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
                {tab === 'inventory' ? 'Inventory' : tab === 'vault' ? 'Design Vault' : 'Lookbook Editorial'}
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
              
              <button
                onClick={() => setShowOnlyForRent(prev => !prev)}
                className={`
                  px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider
                  transition-all cursor-pointer border flex items-center gap-1.5
                  ${
                    showOnlyForRent
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/35'
                      : 'bg-transparent text-white/35 border-white/6 hover:text-white/60 hover:border-white/12'
                  }
                `}
              >
                <span>For Rent Only</span>
                {showOnlyForRent && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
              </button>
            </div>
          </div>

          {/* Garment Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredGarments.map((garment) => {
                const itemConfig = config[garment.title] || {
                  purchaseSample: { enabled: false, price: garment.price, stripeLink: '' },
                  commissionBespoke: { enabled: true, depositAmount: garment.depositAmount, stripeLink: garment.depositLink },
                  rentPhotoshoot: { enabled: false, pricePer3Days: calculateDefaultRentalPrice(garment.price), securityDeposit: calculateDefaultSecurityDeposit(garment.price), stripeLink: '', sizes: '' },
                };

                return (
                  <GarmentCard
                    key={garment.title}
                    garment={garment}
                    offerings={itemConfig}
                    onUpdate={(updated) => updateItem(garment.title, updated)}
                    onSave={() => saveItem(garment.title)}
                    imageOverrides={imageOverrides}
                    onImageSwap={(title) => setPickerTarget({ garmentTitle: title })}
                    isHidden={hiddenItems.includes(garment.title)}
                    onToggleVisibility={() => {
                      setHiddenItems(prev => {
                        const next = prev.includes(garment.title)
                          ? prev.filter(t => t !== garment.title)
                          : [...prev, garment.title];
                        safeLocalStorageSet(HIDDEN_KEY, JSON.stringify(next));

                        // Sync to Firestore immediately using the fresh object
                        setDoc(doc(db, 'config', 'hidden_items'), { hiddenList: next })
                          .catch(e => console.error("Failed to sync hidden items:", e));

                        return next;
                      });
                    }}
                    photoSlots={photoSlots}
                    onPhotoSlotsSave={(garmentTitle, newGarmentSlots) => {
                      setPhotoSlots(prev => {
                        const next = { ...prev };
                        // Clear existing slots for this garment
                        for (let i = 0; i < 6; i++) {
                          delete next[`${garmentTitle}__slot_${i}`];
                        }
                        // Add new ones
                        Object.entries(newGarmentSlots).forEach(([k, v]) => {
                          if (v) next[k] = v;
                        });
                        safeLocalStorageSet(PHOTO_SLOTS_KEY, JSON.stringify(next));

                        // Sync to Firestore in a single write operation
                        setDoc(doc(db, 'config', 'photo_slots'), next)
                          .catch(e => console.error("Failed to sync photo slots:", e));

                        return next;
                      });
                    }}
                    onPhotoSlotClick={(slotIndex, callback) => {
                      setPickerTarget({ garmentTitle: garment.title, slotIndex });
                      pickerCallbackRef.current = callback;
                    }}
                  />
                );
              })}
            </div>
          </div>
        </>
      ) : activeTab === 'lookbook' ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24">
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
            <div>
              <h2 className="text-xl font-serif font-light text-white tracking-wide uppercase">Lookbook Editorial Sections</h2>
              <p className="text-xs text-white/40 mt-1 font-sans">Manage visibility and custom photography for each lookbook page section.</p>
            </div>
            
            {/* Master Page Toggle */}
            <div className="flex items-center gap-4 bg-white/[0.02] border border-white/6 rounded-xl px-5 py-3 shrink-0">
              <div className="flex flex-col">
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/35">Master Page Visibility</span>
                <span className="text-xs text-white mt-0.5 font-medium">
                  {lookbookPageVisible ? "Lookbook is Online" : "Lookbook is Offline"}
                </span>
              </div>
              <button
                onClick={() => {
                  const nextVisible = !lookbookPageVisible;
                  setLookbookPageVisible(nextVisible);
                  setDoc(doc(db, 'config', 'lookbook'), { sections: lookbookConfig, visible: nextVisible }, { merge: true })
                    .then(() => showToast(`Lookbook page is now ${nextVisible ? 'online' : 'offline/hidden'}`))
                    .catch(e => console.error("Failed to sync lookbook master visibility:", e));
                }}
                className={`font-mono text-[9.5px] uppercase tracking-widest px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${
                  lookbookPageVisible 
                    ? "bg-[var(--dada-red)] text-white hover:bg-white hover:text-black" 
                    : "bg-white/10 text-white/70 hover:bg-white hover:text-black"
                }`}
              >
                {lookbookPageVisible ? "Turn Off" : "Turn On"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {lookbookConfig.map((section) => {
              const imageKeys = Object.keys(section.images) as Array<'main' | 'front' | 'back'>;
              return (
                <div 
                  key={section.id} 
                  className="bg-white/[0.02] border border-white/6 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:border-white/12"
                >
                  <div className="flex-1">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/35">Section ID: {section.id}</span>
                    <h3 className="text-base font-serif font-light text-white mt-1">{section.title}</h3>
                    
                    {/* Image Previews */}
                    {imageKeys.length > 0 ? (
                      <div className="flex gap-4 mt-4 flex-wrap">
                        {imageKeys.map((key) => {
                          const currentUrl = section.images[key] || '';
                          const isGalleryItem = ['fuchsia-majesty', 'blush-enchantress', 'golden-whisper', 'crimson-allure', 'midnight-elegance'].includes(section.id);
                          const label = key === 'main' ? 'Main Image' : key === 'front' ? (isGalleryItem || section.id === 'stallion' || section.id === 'miro' ? 'Inspiration Painting' : 'Front View') : (isGalleryItem ? 'Gown Image' : 'Back View');
                          return (
                            <div key={key} className="flex flex-col gap-2">
                              <span className="text-[10px] font-mono text-white/40">{label}</span>
                              <div className="relative w-24 h-24 rounded bg-neutral-900 border border-white/6 overflow-hidden group">
                                {currentUrl ? (
                                  <>
                                    <img 
                                      src={currentUrl} 
                                      alt={label} 
                                      className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                      <button 
                                        onClick={() => {
                                          setPickerTarget({
                                            garmentTitle: `Lookbook: ${section.title}`,
                                            isLookbook: true,
                                            lookbookSectionId: section.id,
                                            lookbookImageKey: key
                                          });
                                        }}
                                        className="text-[9px] font-mono uppercase bg-white text-black py-1 px-2 rounded hover:bg-[var(--dada-red)] hover:text-white transition-colors cursor-pointer"
                                      >
                                        Change
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                                    <span className="text-[8px] font-mono text-white/20">Empty</span>
                                    <button 
                                      onClick={() => {
                                        setPickerTarget({
                                          garmentTitle: `Lookbook: ${section.title}`,
                                          isLookbook: true,
                                          lookbookSectionId: section.id,
                                          lookbookImageKey: key
                                        });
                                      }}
                                      className="text-[9px] font-mono uppercase bg-white/10 text-white hover:bg-white/20 py-1 px-2 rounded transition-colors cursor-pointer"
                                    >
                                      Upload
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-[10px] font-sans text-white/30 italic mt-3">This section is text-only. No custom images required.</p>
                    )}
                  </div>

                  <div className="flex items-center gap-6 border-t border-white/5 pt-4 md:pt-0 md:border-0">
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-white/35">Visibility</span>
                      <button
                        onClick={() => {
                          const nextSections = lookbookConfig.map(s => {
                            if (s.id === section.id) {
                              return { ...s, visible: !s.visible };
                            }
                            return s;
                          });
                          handleUpdateLookbook(nextSections);
                        }}
                        className={`
                          px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer border
                          ${
                            section.visible
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                              : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                          }
                        `}
                      >
                        {section.visible ? 'Visible' : 'Hidden'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="pt-6">
          <DesignVault onDeleteSuccess={handleDeleteSuccess} />
        </div>
      )}

      {/* Image Picker Modal */}
      <AnimatePresence>
        {pickerTarget && (
          <ImagePickerModal
            garmentTitle={pickerTarget.garmentTitle}
            slotLabel={
              pickerTarget.isLookbook
                ? (pickerTarget.lookbookImageKey === 'main' ? 'Main Image' : pickerTarget.lookbookImageKey === 'front' ? 'Front View' : 'Back View')
                : (pickerTarget.slotIndex !== undefined
                  ? (SLOT_LABELS[GARMENTS.find(g => g.title === pickerTarget.garmentTitle)?.category || 'Dresses']?.[pickerTarget.slotIndex] || 'Detail')
                  : undefined)
            }
            currentImg={
              pickerTarget.isLookbook
                ? (lookbookConfig.find(s => s.id === pickerTarget.lookbookSectionId)?.images[pickerTarget.lookbookImageKey!] || '')
                : (pickerTarget.slotIndex !== undefined
                  ? (photoSlots[`${pickerTarget.garmentTitle}__slot_${pickerTarget.slotIndex}`] || '')
                  : (imageOverrides[pickerTarget.garmentTitle] || GARMENTS.find((g) => g.title === pickerTarget.garmentTitle)?.img || ''))
            }
            originalImg={
              pickerTarget.isLookbook
                ? (defaultLookbookSections.find(s => s.id === pickerTarget.lookbookSectionId)?.images[pickerTarget.lookbookImageKey!] || '')
                : (pickerTarget.slotIndex !== undefined
                  ? ''
                  : (GARMENTS.find((g) => g.title === pickerTarget.garmentTitle)?.img || ''))
            }
            onSelect={(url) => {
              if (pickerTarget.isLookbook) {
                const sectionId = pickerTarget.lookbookSectionId!;
                const imgKey = pickerTarget.lookbookImageKey!;
                const nextSections = lookbookConfig.map(s => {
                  if (s.id === sectionId) {
                    return {
                      ...s,
                      images: {
                        ...s.images,
                        [imgKey]: url || ''
                      }
                    };
                  }
                  return s;
                });
                handleUpdateLookbook(nextSections);
              } else if (pickerCallbackRef.current) {
                pickerCallbackRef.current(url);
                pickerCallbackRef.current = null;
              } else {
                handleImageOverride(pickerTarget.garmentTitle, url);
              }
              setPickerTarget(null);
            }}
            onClose={() => {
              setPickerTarget(null);
              pickerCallbackRef.current = null;
            }}
            onDeleteSuccess={handleDeleteSuccess}
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
    // Auto self-healing: clear giant images if localStorage exceeds safety threshold (>3.5MB)
    if (typeof window !== 'undefined') {
      try {
        let totalSize = 0;
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key) {
            totalSize += (localStorage.getItem(key) || '').length;
          }
        }
        if (totalSize > 3500000) {
          localStorage.removeItem(PHOTO_SLOTS_KEY);
          localStorage.removeItem(VAULT_KEY);
        }
      } catch {
        // ignore
      }

      const params = new URLSearchParams(window.location.search);
      if (params.get('clear') === 'true') {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(IMAGE_OVERRIDES_KEY);
        localStorage.removeItem(VAULT_KEY);
        localStorage.removeItem(HIDDEN_KEY);
        localStorage.removeItem(PHOTO_SLOTS_KEY);
        window.location.href = window.location.pathname;
        return;
      }
    }

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
