import React from 'react';
import { Logo } from './Logo';
import { AGENCY_SOCIALS } from '../data/mockData';
import { PageTab } from '../types';
import {
  Sparkles,
  ArrowUp,
} from 'lucide-react';

interface FooterSectionProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenOrderModal: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ setActiveTab, onOpenOrderModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black/30 backdrop-blur-md border-t border-white/10 pt-16 pb-12 overflow-hidden text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Bio Column */}
          <div className="lg:col-span-5 space-y-5">
            <Logo size="lg" />
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-md">
              وكالة إعلامية وإبداعية متكاملة، تقدم حلولاً تسويقية واستراتيجية مبنية على عقود شهرية مستدامة لتطوير ونمو البراندات والمشاريع.
            </p>
            <div className="p-4 rounded-2xl glass-panel-orange border border-[#e85432]/30 inline-block text-xs text-orange-200">
              ⚡ <strong>معرف الحسابات الموحد:</strong> <span className="font-mono text-white text-sm dir-ltr inline-block">@ibt1kar</span>
            </div>
          </div>

          {/* Social Channels Column - Official Real Logos */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-black text-white uppercase tracking-wider text-[#ff7a59]">
              حسابات التواصل الموحدة (@ibt1kar)
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-bold">
              <li>
                <a
                  href={AGENCY_SOCIALS.snapchat}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-panel p-3 rounded-2xl flex items-center justify-between hover:border-yellow-400 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center p-1.5 shadow-md group-hover:scale-110 transition-transform overflow-hidden">
                      <img
                        src="/snapchat.png"
                        alt="سناب شات ابتكار"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/سناب.png';
                        }}
                        referrerPolicy="no-referrer"
                      />
                    </span>
                    <span>سناب شات (Snapchat)</span>
                  </div>
                  <span className="text-[11px] font-mono text-gray-400 group-hover:text-yellow-300">@ibt1kar</span>
                </a>
              </li>

              <li>
                <a
                  href={AGENCY_SOCIALS.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-panel p-3 rounded-2xl flex items-center justify-between hover:border-cyan-400 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-black/40 border border-white/20 flex items-center justify-center p-1.5 shadow-md group-hover:scale-110 transition-transform overflow-hidden">
                      <img
                        src="/tiktok.png"
                        alt="تيك توك ابتكار"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/تيك توك.png';
                        }}
                        referrerPolicy="no-referrer"
                      />
                    </span>
                    <span>تيك توك (TikTok)</span>
                  </div>
                  <span className="text-[11px] font-mono text-gray-400 group-hover:text-cyan-300">@ibt1kar</span>
                </a>
              </li>

              <li>
                <a
                  href={AGENCY_SOCIALS.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-panel p-3 rounded-2xl flex items-center justify-between hover:border-pink-500 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center p-1.5 shadow-md group-hover:scale-110 transition-transform overflow-hidden">
                      <img
                        src="/instagram.png"
                        alt="انستقرام ابتكار"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/انستقرام.png';
                        }}
                        referrerPolicy="no-referrer"
                      />
                    </span>
                    <span>انستقرام (Instagram)</span>
                  </div>
                  <span className="text-[11px] font-mono text-gray-400 group-hover:text-pink-300">@ibt1kar</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-black text-white uppercase tracking-wider text-[#ff7a59]">
              التواصل المباشر والطلب
            </h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/966558875818"
                target="_blank"
                rel="noreferrer"
                className="glass-panel p-4 rounded-2xl flex items-center gap-3 border border-emerald-500/30 hover:border-emerald-400 transition-colors group bg-emerald-950/20"
              >
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 border border-emerald-500/30 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform flex items-center justify-center p-1.5 overflow-hidden">
                  <img
                    src="/whatsapp.png"
                    alt="واتساب منصة ابتكار"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/واتس.png';
                    }}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-gray-300 block">واتساب المبيعات والاستشارات:</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono dir-ltr inline-block">0558875818</span>
                </div>
              </a>

              <button
                onClick={onOpenOrderModal}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#e85432] to-[#ff7a59] text-white font-bold text-xs shadow-xl shadow-[#e85432]/30 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>اطلب خدمتك أو استشارتك الآن</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Rights & Scroll to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p className="text-center sm:text-right">
            © {new Date().getFullYear()} <strong>منصة ابتكار - Ibtikar</strong>. جميع الحقوق محفوظة. وكالة إعلامية وإبداعية متكاملة.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:bg-white/10 text-gray-200 hover:text-white transition-colors cursor-pointer"
          >
            <span>العودة للأعلى</span>
            <ArrowUp className="w-4 h-4 text-[#e85432]" />
          </button>
        </div>

      </div>
    </footer>
  );
};
