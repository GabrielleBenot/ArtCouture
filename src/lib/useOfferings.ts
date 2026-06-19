'use client';

import { useState, useEffect } from 'react';

export interface OfferingOption {
  enabled: boolean;
  price?: string;
  pricePer3Days?: string;
  depositAmount?: string;
  stripeLink: string;
}

export interface ItemOfferings {
  purchaseSample: { enabled: boolean; price: string; stripeLink: string };
  commissionBespoke: { enabled: boolean; depositAmount: string; stripeLink: string };
  rentPhotoshoot: { enabled: boolean; pricePer3Days: string; securityDeposit: string; stripeLink: string };
}

export interface OfferingConfig {
  [itemTitle: string]: ItemOfferings;
}

const STORAGE_KEY = 'artcouture_offerings';

const DEFAULT_OFFERINGS: ItemOfferings = {
  purchaseSample: { enabled: false, price: '', stripeLink: '' },
  commissionBespoke: { enabled: false, depositAmount: '', stripeLink: '' },
  rentPhotoshoot: { enabled: false, pricePer3Days: '$500', securityDeposit: '$1,250', stripeLink: '' },
};

function getStoredConfig(): OfferingConfig | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as OfferingConfig;
  } catch {
    return null;
  }
}

import default_config from './default_config.json';

export function useOfferings(itemTitle: string): ItemOfferings {
  const [offerings, setOfferings] = useState<ItemOfferings>(DEFAULT_OFFERINGS);

  useEffect(() => {
    let config = getStoredConfig();
    if (!config) {
      config = default_config as OfferingConfig;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      } catch {
        // ignore
      }
    }

    if (config && config[itemTitle]) {
      const stored = config[itemTitle];
      setOfferings({
        purchaseSample: {
          enabled: stored.purchaseSample?.enabled ?? false,
          price: stored.purchaseSample?.price ?? '',
          stripeLink: stored.purchaseSample?.stripeLink ?? '',
        },
        commissionBespoke: {
          enabled: stored.commissionBespoke?.enabled ?? false,
          depositAmount: stored.commissionBespoke?.depositAmount ?? '',
          stripeLink: stored.commissionBespoke?.stripeLink ?? '',
        },
        rentPhotoshoot: {
          enabled: stored.rentPhotoshoot?.enabled ?? false,
          pricePer3Days: stored.rentPhotoshoot?.pricePer3Days ?? (stored.rentPhotoshoot as any)?.pricePerDay ?? '$500',
          securityDeposit: stored.rentPhotoshoot?.securityDeposit ?? '$1,250',
          stripeLink: stored.rentPhotoshoot?.stripeLink ?? '',
        },
      });
    }
  }, [itemTitle]);

  return offerings;
}
