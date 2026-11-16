import React from 'react';
import { Logo } from './Logo';
import { AGENCY_SOCIALS } from '../data/mockData';
import { PageTab } from '../types';
import { Sparkles, ArrowUp } from 'lucide-react';

interface FooterSectionProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenOrderModal: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ setActiveTab, onOpenOrderModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks: { id: PageTab; label: string }[] = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'services', label: 'خدماتنا' },
    { id: 'packages', label: 'الباقات والخطط' },
    { id: 'targets', label: 'العملاء المستهدفون' },
    { id: 'portfolio', label: 'معرض الأعمال' },
    { id: 'clients', label: 'شركاء النجاح' },
    { id: 'about', label: 'عن ابتكار' },
    { id: 'contact', label: 'تواصل معنا' },
  ];

  return (
    <footer className="ib-sec pb-10 text-right">
      <div className="ib-container space-y-6">
        {/* Main Footer Glass Panel with 3 Groups */}
        <div className="ib-glass rounded-[34px] p-[clamp(28px,4vw,48px)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Group 1: Logo + Tagline + Unified Handle */}
            <div className="md:col-span-5 space-y-5">
              <Logo size="lg" />
              <p className="text-sm sm:text-base text-[#C9CBEA] leading-[1.9] max-w-md">
                وكالة إعلامية وإبداعية متكاملة، تقدم حلولاً تسويقية واستراتيجية مبنية على عقود شهرية مستدامة لتطوير ونمو البراندات والمشاريع.
              </p>
              <div className="pt-2 text-xs sm:text-sm text-[#ffb3aa]">
                <strong>معرف الحسابات الموحد:</strong>{' '}
                <span className="font-mono text-white text-sm dir-ltr inline-block">@ibt1kar</span>
              </div>
            </div>

            {/* Group 2: Quick Links & Unified Social Channels */}
            <div className="md:col-span-3 space-y-5">
              <h4 className="text-sm font-bold text-[#ffb3aa]">
                روابط سريعة ومنصاتنا
              </h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs sm:text-sm text-[#C9CBEA]">
                {quickLinks.map((lnk) => (
                  <li key={lnk.id}>
                    <button
                      type="button"
                      onClick={() => handleLinkClick(lnk.id)}
                      className="hover:text-[#EF4A3C] transition-colors cursor-pointer text-right"
                    >
                      {lnk.label}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="pt-3 border-t border-white/10 space-y-2.5 text-xs text-[#C9CBEA] font-semibold">
                <a
                  href={AGENCY_SOCIALS.snapchat}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between py-1.5 hover:text-white transition-colors group"
                >
                  <span className="flex items-center gap-2.5">
                    <img
                      src="/snapchat.png"
                      alt="سناب شات ابتكار"
                      className="w-5 h-5 object-contain shrink-0"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/سناب.png';
                      }}
                      referrerPolicy="no-referrer"
                    />
                    <span>سناب شات (Snapchat)</span>
                  </span>
                  <span className="font-mono text-[#9A9CC8] group-hover:text-[#EF4A3C]" dir="ltr">@ibt1kar</span>
                </a>

                <a
                  href={AGENCY_SOCIALS.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between py-1.5 hover:text-white transition-colors group"
                >
                  <span className="flex items-center gap-2.5">
                    <img
                      src="/tiktok.png"
                      alt="تيك توك ابتكار"
                      className="w-5 h-5 object-contain shrink-0"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/تيك توك.png';
                      }}
                      referrerPolicy="no-referrer"
                    />
                    <span>تيك توك (TikTok)</span>
                  </span>
                  <span className="font-mono text-[#9A9CC8] group-hover:text-[#EF4A3C]" dir="ltr">@ibt1kar</span>
                </a>

                <a
                  href={AGENCY_SOCIALS.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between py-1.5 hover:text-white transition-colors group"
                >
                  <span className="flex items-center gap-2.5">
                    <img
                      src="/instagram.png"
                      alt="انستقرام ابتكار"
                      className="w-5 h-5 object-contain shrink-0"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/انستقرام.png';
                      }}
                      referrerPolicy="no-referrer"
                    />
                    <span>انستقرام (Instagram)</span>
                  </span>
                  <span className="font-mono text-[#9A9CC8] group-hover:text-[#EF4A3C]" dir="ltr">@ibt1kar</span>
                </a>
              </div>
            </div>

            {/* Group 3: Contact (Site, @ibt1kar, Phone, CTA) */}
            <div className="md:col-span-4 space-y-5">
              <h4 className="text-sm font-bold text-[#ffb3aa]">
                التواصل المباشر والطلب
              </h4>

              <div className="space-y-3 text-sm text-[#C9CBEA]">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span className="text-xs text-[#9A9CC8]">الموقع الإلكتروني:</span>
                  <a
                    href="https://ibt1kar.com"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono font-bold text-white hover:text-[#EF4A3C] transition-colors"
                    dir="ltr"
                  >
                    ibt1kar.com
                  </a>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span className="text-xs text-[#9A9CC8]">الحسابات الموحدة:</span>
                  <span className="font-mono font-bold text-white" dir="ltr">@ibt1kar</span>
                </div>

                <a
                  href="https://wa.me/966593363878"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between py-1.5 hover:text-white transition-colors group"
                >
                  <span className="flex items-center gap-2.5">
                    <img
                      src="/whatsapp.png"
                      alt="واتساب منصة ابتكار"
                      className="w-6 h-6 object-contain shrink-0"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/واتس.png';
                      }}
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-xs text-[#9A9CC8] group-hover:text-white">واتساب المبيعات والاستشارات:</span>
                  </span>
                  <span className="text-sm font-bold text-emerald-400 font-mono" dir="ltr">0593363878</span>
                </a>
              </div>

              <button
                onClick={onOpenOrderModal}
                className="ib-btn ib-btn-coral w-full"
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>اطلب خدمتك أو استشارتك الآن</span>
              </button>
            </div>
          </div>
        </div>

        {/* Muted Copyright Line & Scroll to Top below glass panel */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 text-xs text-[#9A9CC8]">
          <p className="text-center sm:text-right">
            © {new Date().getFullYear()} <strong className="text-white">منصة ابتكار - Ibtikar</strong>. جميع الحقوق محفوظة. وكالة إعلامية وإبداعية متكاملة.
          </p>

          <button
            onClick={scrollToTop}
            className="ib-chip min-h-[44px] flex items-center gap-2 px-4 py-2 rounded-full text-[#C9CBEA] hover:text-white hover:border-[#EF4A3C] transition-colors cursor-pointer"
          >
            <span>العودة للأعلى</span>
            <ArrowUp className="w-4 h-4 text-[#EF4A3C]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
