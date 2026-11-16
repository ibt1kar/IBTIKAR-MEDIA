import React from 'react';
import { Logo } from './Logo';
import { AGENCY_STATS, SERVICES_DATA } from '../data/mockData';
import { Sparkles, ArrowLeft, CheckCircle, Layers } from 'lucide-react';

interface HeroSectionProps {
  onOpenOrderModal: () => void;
  onExploreServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenOrderModal,
  onExploreServices,
}) => {
  const heroBullets = [
    'عقود شهرية مستدامة',
    'صناعة هوية كاملة',
    'إمكانية تصاميم خاصة',
  ];

  return (
    <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-4">
      <div className="ib-container">
        <div className="ib-hero">
          {/* Right column (Start in RTL): Editorial copy, CTAs, benefit chips */}
          <div className="space-y-7 text-right">
            <div className="ib-eyebrow ib-chip">
              <span className="w-2 h-2 rounded-full bg-[#EF4A3C] shrink-0" />
              <span>وكالة إعلامية وإبداعية متكاملة - عقود شهرية مستدامة</span>
            </div>

            <div className="space-y-4">
              <h1
                className="font-black text-white tracking-tight"
                style={{ fontSize: 'clamp(46px, 6.8vw, 96px)', lineHeight: 1.08 }}
              >
                منصة ابتكـــار - <span className="text-[#EF4A3C]">ibtikar</span>
              </h1>
              <p className="text-lg sm:text-2xl font-bold text-[#ffb3aa] leading-relaxed">
                صنّاع الهويّات الرقمية والحلول الإبداعية الممتازة للبراندات والمشاريع
              </p>
            </div>

            <div className="space-y-3 max-w-2xl">
              <p className="text-base sm:text-lg text-[#C9CBEA] leading-[1.95]">
                نحن في منصة إبتكار شريكك الإبداعي الأول نحو بناء حضور رقمي استثنائي ومميز. نؤمن بأن كل مشروع ناجح يبدأ بفكرة فريدة، ومن هنا جاءت رسالتنا لنحول أفكارك إلى تجارب بصرية وحملات تسويقية تخطف الأنظار وتترك أثراً لا يُنسى لدى جمهورك.
              </p>
              <p className="text-sm sm:text-base text-[#9A9CC8] leading-[1.95]">
                نقدم حلولاً متكاملة تجمع بين الدقة الفنية، والذوق الإبداعي الرفيع، والاحترافية العالية في إدارة وتطوير الهوية الرقمية للشركات، والمشاريع الناشئة، وصناع المحتوى.
              </p>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={onOpenOrderModal}
                className="ib-btn ib-btn-coral"
              >
                <Sparkles className="w-5 h-5 shrink-0" />
                <span>اطلب خدمتك الآن</span>
                <ArrowLeft className="w-5 h-5 shrink-0" />
              </button>

              <button
                onClick={onExploreServices}
                className="ib-btn ib-glass text-white hover:border-white/25"
              >
                <Layers className="w-5 h-5 text-[#EF4A3C] shrink-0" />
                <span>استكشف خدماتنا</span>
              </button>
            </div>

            {/* 3 Benefit Chips */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {heroBullets.map((item) => (
                <div
                  key={item}
                  className="ib-chip inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white min-h-[44px]"
                >
                  <CheckCircle className="w-4 h-4 text-[#EF4A3C] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Left column (End in RTL): Existing logo/brand card + 2 non-overlapping stat chips below */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 ib-glass rounded-[34px] p-8 sm:p-11 relative">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="text-right">
                  <span className="text-xs font-bold text-[#ffb3aa] block mb-1">شعار وأصالة العلامة</span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">منصة ابتكار - Ibtikar</h3>
                </div>
                <span className="text-xs font-mono text-[#9A9CC8]" dir="ltr">@ibt1kar</span>
              </div>

              <div className="py-10 sm:py-12 flex flex-col items-center justify-center text-center group">
                <Logo
                  size="xl"
                  className="justify-center flex-wrap sm:flex-nowrap"
                />
                <span className="text-sm text-[#C9CBEA] font-semibold mt-6">
                  وكالة إعلامية وإبداعية متكاملة
                </span>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm text-[#9A9CC8]">
                <span>حلول بصرية وتسويقية متكاملة</span>
                <span className="text-[#ffb3aa] font-semibold" dir="ltr">ibt1kar.com</span>
              </div>
            </div>

            {/* Stat Chip 1 (Below card, non-overlapping) */}
            {AGENCY_STATS[0] && (
              <div className="ib-chip rounded-[22px] px-5 py-4 text-center sm:text-right">
                <div className="text-2xl sm:text-3xl font-black text-[#EF4A3C] leading-none" dir="ltr">
                  {AGENCY_STATS[0].value}
                </div>
                <div className="text-xs font-semibold text-[#C9CBEA] mt-1.5">
                  {AGENCY_STATS[0].label}
                </div>
              </div>
            )}

            {/* Stat Chip 2 (Below card, non-overlapping) */}
            {AGENCY_STATS[1] && (
              <div className="ib-chip rounded-[22px] px-5 py-4 text-center sm:text-right">
                <div className="text-2xl sm:text-3xl font-black text-white leading-none" dir="ltr">
                  {AGENCY_STATS[1].value}
                </div>
                <div className="text-xs font-semibold text-[#ffb3aa] mt-1.5">
                  {AGENCY_STATS[1].label}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Below Hero: 4-Column Glass Stats Bar */}
        <div className="mt-14 sm:mt-16 ib-glass rounded-[30px] px-6 py-8 sm:px-10 sm:py-10">
          <div className="ib-stats gap-6 text-center">
            {AGENCY_STATS.map((stat, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center px-2 ${
                  idx > 0 ? 'md:border-r md:border-white/10' : ''
                }`}
              >
                <div
                  className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight"
                  dir="ltr"
                >
                  <span className={idx === 0 || idx === 2 ? 'text-[#EF4A3C]' : 'text-white'}>
                    {stat.value}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#C9CBEA] mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slow Marquee of Service Titles */}
        <div className="mt-10 ib-marquee py-3" aria-hidden="true">
          <div className="track">
            {[...SERVICES_DATA, ...SERVICES_DATA].map((srv, idx) => (
              <span key={`${srv.id}-${idx}`} className="inline-flex items-center">
                <span className="px-6">{srv.title}</span>
                <span className="w-2 h-2 rounded-full bg-[#EF4A3C] inline-block" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
