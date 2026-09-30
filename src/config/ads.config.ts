// Ad Network & Monetization Configuration
// Easily paste your Publisher IDs and Slot IDs here to go live!

export interface AdConfig {
  network: 'adsense' | 'adsterra' | 'custom' | 'novixa_promo';
  adsense: {
    client: string; // e.g. "ca-pub-XXXXXXXXXXXXXXXX"
    bottomSlot: string; // e.g. "1234567890"
    resultSlot: string; // e.g. "0987654321"
  };
  adsterra: {
    enabled: boolean;
    bannerKey: string;
  };
  promo: {
    title: string;
    description: string;
    ctaText: string;
    targetUrl: string;
  };
}

export const ADS_CONFIG: AdConfig = {
  // Switch to 'adsense' or 'adsterra' once you receive your approval
  network: 'novixa_promo',
  adsense: {
    client: 'ca-pub-XXXXXXXXXXXXXXXX',
    bottomSlot: '1234567890',
    resultSlot: '0987654321',
  },
  adsterra: {
    enabled: false,
    bannerKey: '',
  },
  promo: {
    title: '⚡ حلول برمجية ومواقع مخصصة فائقة السرعة',
    description: 'طوّر وجودك الرقمي ونمِّ تجارتك الإلكترونية مع حلول برمجية متقدمة من Novixa.',
    ctaText: 'اكتشف خدمات Novixa ➔',
    targetUrl: 'https://novixa-cyan.vercel.app/ar',
  },
};
