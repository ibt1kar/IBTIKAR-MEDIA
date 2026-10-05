import React from 'react';
import { Logo } from './Logo';
import { AGENCY_STATS } from '../data/mockData';
import { Sparkles, ArrowLeft, ShieldCheck, CheckCircle, Flame, Layers } from 'lucide-react';

interface HeroSectionProps {
  onOpenOrderModal: () => void;
  onExploreServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenOrderModal,
  onExploreServices,
}) => {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden min-h-[90vh] flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Content (Right column in RTL) */}
          <div className="lg:col-span-7 space-y-8 text-right">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--card-border)] bg-[rgba(22,24,69,0.7)] backdrop-blur-md text-[var(--accent-coral)] font-bold text-xs sm:text-sm animate-float shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-coral)] shrink-0 inline-block"></span>
              <Flame className="w-4 h-4 text-[var(--accent-coral)]" />
              <span>وكالة إعلامية وإبداعية متكاملة - عقود شهرية مستدامة</span>
            </div>

            {/* Title */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white leading-tight tracking-tight">
                منصة ابتكـــار - <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-coral)] via-[var(--accent-coral)] to-[var(--accent-indigo)]">ibtikar</span>
              </h1>
              <p className="text-lg sm:text-xl font-extrabold text-[var(--text-muted)]">
                صنّاع الهويّات الرقمية والحلول الإبداعية الممتازة للبراندات والمشاريع
              </p>
            </div>

            {/* Hero Description - Exact text requested by prompt */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-[var(--card-border)] shadow-2xl relative overflow-hidden backdrop-blur-xl space-y-4">
              <p className="text-base sm:text-lg text-white leading-relaxed font-medium">
                نحن في منصة إبتكار شريكك الإبداعي الأول نحو بناء حضور رقمي استثنائي ومميز. نؤمن بأن كل مشروع ناجح يبدأ بفكرة فريدة، ومن هنا جاءت رسالتنا لنحول أفكارك إلى تجارب بصرية وحملات تسويقية تخطف الأنظار وتترك أثراً لا يُنسى لدى جمهورك.
              </p>
              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed font-normal">
                نقدم حلولاً متكاملة تجمع بين الدقة الفنية، والذوق الإبداعي الرفيع، والاحترافية العالية في إدارة وتطوير الهوية الرقمية للشركات، والمشاريع الناشئة، وصناع المحتوى.
              </p>
            </div>

            {/* Key Value Bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm font-bold text-gray-200">
              <div className="flex items-center gap-2 glass-panel p-2.5 rounded-2xl border border-[var(--card-border)]">
                <CheckCircle className="w-4 h-4 text-[var(--accent-coral)] shrink-0" />
                <span>عقود شهرية مستدامة</span>
              </div>
              <div className="flex items-center gap-2 glass-panel p-2.5 rounded-2xl border border-[var(--card-border)]">
                <CheckCircle className="w-4 h-4 text-[var(--accent-coral)] shrink-0" />
                <span>صناعة هوية كاملة</span>
              </div>
              <div className="flex items-center gap-2 glass-panel p-2.5 rounded-2xl border border-[var(--card-border)]">
                <CheckCircle className="w-4 h-4 text-[var(--accent-coral)] shrink-0" />
                <span>إمكانية تصاميم خاصة</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenOrderModal}
                className="py-4 px-8 rounded-full bg-[var(--accent-coral)] text-white font-black text-base shadow-2xl shadow-[var(--accent-coral)]/35 hover:scale-105 hover:shadow-[var(--accent-coral)]/50 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
              >
                <Sparkles className="w-5 h-5" />
                <span>اطلب خدمتك الآن</span>
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                onClick={onExploreServices}
                className="py-4 px-8 rounded-full glass-panel hover:bg-white/10 text-white font-bold text-base border border-[var(--card-border)] hover:border-[var(--accent-coral)]/50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Layers className="w-5 h-5 text-[var(--accent-coral)]" />
                <span>استكشف خدماتنا</span>
              </button>
            </div>

          </div>

          {/* Left Decorative Glass Platform Visual (Logo Emblem + Interactive Card) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Visual Frame */}
            <div className="w-full max-w-md relative">
              {/* Main Interactive Glass Card Container */}
              <div className="glass-panel p-8 rounded-3xl border border-[var(--card-border)] shadow-2xl space-y-8 relative backdrop-blur-2xl">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <div className="text-right">
                    <span className="text-xs font-bold text-[var(--accent-coral)] block">شعار وأصالة العلامة</span>
                    <h3 className="text-xl font-black text-white">منصة ابتكار - Ibtikar</h3>
                  </div>
                  <div className="p-3 rounded-2xl glass-panel-orange">
                    <ShieldCheck className="w-6 h-6 text-[var(--accent-coral)]" />
                  </div>
                </div>

                {/* Logo Showcase */}
                <div className="py-6 px-4 flex flex-col items-center justify-center bg-white/5 rounded-2xl border border-[var(--card-border)] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-coral)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Logo size="xl" className="transform group-hover:scale-105 transition-transform duration-500 justify-center flex-wrap sm:flex-nowrap" />
                  <span className="text-xs text-[var(--text-muted)] font-bold mt-4 tracking-wider">
                    وكالة إعلامية وإبداعية متكاملة
                  </span>
                </div>

                {/* Stats Grid inside Glass Card */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {AGENCY_STATS.slice(0, 2).map((stat, idx) => (
                    <div key={idx} className="glass-panel p-3.5 rounded-2xl border border-[var(--card-border)] text-center">
                      <div className="text-2xl font-black text-[var(--accent-coral)]">{stat.value}</div>
                      <div className="text-xs font-semibold text-[var(--text-muted)]">{stat.label}</div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
