import React from 'react';

interface IconProps {
  className?: string;
}

// Authentic Official Snapchat Logo using public icon asset
export const SnapchatIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <img
    src="/snapchat.png"
    alt="Snapchat"
    className={`${className} object-contain inline-block select-none`}
    onError={(e) => {
      (e.currentTarget as HTMLImageElement).src = '/سناب.png';
    }}
    referrerPolicy="no-referrer"
  />
);

// Authentic TikTok Logo using public icon asset
export const TikTokIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <img
    src="/tiktok.png"
    alt="TikTok"
    className={`${className} object-contain inline-block select-none`}
    onError={(e) => {
      (e.currentTarget as HTMLImageElement).src = '/تيك توك.png';
    }}
    referrerPolicy="no-referrer"
  />
);

// Authentic Instagram Logo using public icon asset
export const InstagramIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <img
    src="/instagram.png"
    alt="Instagram"
    className={`${className} object-contain inline-block select-none`}
    onError={(e) => {
      (e.currentTarget as HTMLImageElement).src = '/انستقرام.png';
    }}
    referrerPolicy="no-referrer"
  />
);

// Authentic WhatsApp Logo using public icon asset
export const WhatsAppIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <img
    src="/whatsapp.png"
    alt="WhatsApp"
    className={`${className} object-contain inline-block select-none`}
    onError={(e) => {
      (e.currentTarget as HTMLImageElement).src = '/واتس.png';
    }}
    referrerPolicy="no-referrer"
  />
);

// Authentic X (Twitter) SVG Logo
export const TwitterXIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Authentic Behance SVG Logo
export const BehanceIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22 7h-7V5h7v2zm-1.708 6.131c0-3.08-2.029-4.331-4.708-4.331-2.859 0-4.917 2.022-4.917 4.972 0 3.109 2.036 4.928 5.083 4.928 2.508 0 4.283-1.242 4.675-2.903h-2.183c-.225.592-.992 1.058-2.225 1.058-1.533 0-2.617-.85-2.617-2.317h7.008c.033-.217.084-.817.084-1.407zm-7.008-.666c.142-1.125 1.017-1.783 2.225-1.783 1.15 0 2.008.658 2.117 1.783h-4.342zM8.384 12.008c.858-.45 1.458-1.283 1.458-2.317 0-1.842-1.392-2.891-3.617-2.891H0v10.4h6.508c2.425 0 3.933-1.158 3.933-3.133 0-1.075-.767-1.633-2.057-2.059zM2.85 8.7h3.017c1.033 0 1.633.475 1.633 1.258 0 .858-.6 1.342-1.633 1.342H2.85V8.7zm3.325 6.642H2.85v-2.808h3.325c1.175 0 1.883.5 1.883 1.4 0 .917-.708 1.408-1.883 1.408z" />
  </svg>
);

// Authentic YouTube SVG Logo
export const YouTubeIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);
