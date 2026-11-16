import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/mockData';
import { ServiceItem } from '../types';
import { useModalEffects } from '../hooks/useModalEffects';
import {
  Share2,
  Layout,
  Palette,
  PenTool,
  Camera,
  Video,
  Sparkles,
  Target,
  FileText,
  ArrowLeft,
  X,
  Check,
  Send,
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenOrderModal: (serviceId?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenOrderModal }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  useModalEffects(!!selectedService, () => setSelectedService(null));

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Share2':
        return Share2;
      case 'Layout':
        return Layout;
      case 'Palette':
        return Palette;
      case 'PenTool':
        return PenTool;
      case 'Camera':
        return Camera;
      case 'Video':
        return Video;
      case 'Sparkles':
        return Sparkles;
      case 'Target':
        return Target;
      case 'FileText':
        return FileText;
      default:
        return Sparkles;
    }
  };

  // Bento alternating spans: 7+5, 5+7, 6+6
  const bentoSpans = ['ib-c7', 'ib-c5', 'ib-c5', 'ib-c7', 'ib-c6', 'ib-c6'];

  return (
    <section id="services" className="ib-sec">
      <div className="ib-container">
        {/* Start-Aligned Section Header */}
        <div className="space-y-4 mb-12 text-right">
          <div className="ib-eyebrow ib-chip">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4A3C]" />
            <span>خدماتنا الإبداعية المتكاملة</span>
          </div>
          <h2 className="ib-h2">
            حلول تسويقية وبصرية تحـوّل الرؤيـــــة إلى واقع
          </h2>
          <p className="ib-sub">
            نقدم مجموعة متكاملة من الخدمات الإعلامية والتصميمية بأعلى معايير الجودة لتنمية براندك وتثبيت حضورك الرقمي.
          </p>
        </div>

        {/* 12-Column Bento Grid */}
        <div className="ib-bento">
          {SERVICES_DATA.map((service, idx) => {
            const IconComponent = getIcon(service.iconName);
            const spanClass = bentoSpans[idx % bentoSpans.length];
            const indexNumber = (idx + 1).toString().padStart(2, '0');

            return (
              <div
                key={service.id}
                className={`${spanClass} ib-glass ib-lift rounded-[30px] p-[clamp(26px,3vw,40px)] min-h-[300px] flex flex-col justify-between group`}
              >
                <div className="flex flex-col flex-1 space-y-4">
                  {/* Small stroke icon + index number */}
                  <div className="flex items-center justify-between gap-3">
                    <IconComponent className="w-6 h-6 text-[#EF4A3C] stroke-[1.75]" />
                    <span className="text-sm font-mono font-bold text-[#9A9CC8]" dir="ltr">
                      {indexNumber}
                    </span>
                  </div>

                  {/* Coral tag */}
                  {service.badge && (
                    <div className="text-xs font-bold text-[#ffb3aa]">
                      {service.badge}
                    </div>
                  )}

                  {/* Title (24-30px) */}
                  <h3 className="text-[24px] sm:text-[28px] font-bold text-white leading-[1.3]">
                    {service.title}
                  </h3>

                  {/* Description (grows) */}
                  <p className="text-[15px] sm:text-base text-[#C9CBEA] leading-[1.9] flex-1">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="min-h-[44px] text-sm font-semibold text-[#9A9CC8] hover:text-white transition-colors cursor-pointer"
                  >
                    التفاصيل والمخرجات
                  </button>

                  <button
                    onClick={() => onOpenOrderModal(service.id)}
                    className="min-h-[44px] inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#EF4A3C] hover:text-[#ff6252] transition-colors cursor-pointer"
                  >
                    <span>اطلب الخدمة</span>
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full-Width Coral Banner */}
        <div className="mt-6 ib-glass-coral rounded-[30px] p-[clamp(24px,3.5vw,40px)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 text-right">
            <h4 className="text-xl sm:text-2xl font-bold text-white">
              ترغب في تصميم منفرد أو حزمة خاصة؟
            </h4>
            <p className="text-sm sm:text-base text-[#C9CBEA] leading-relaxed">
              إمكانية طلب تصاميم منفردة وخاصة ومخصصة بالكامل بحسب الاحتياج الفريد لمشروعك.
            </p>
          </div>
          <button
            onClick={() => onOpenOrderModal()}
            className="ib-btn ib-btn-coral shrink-0"
          >
            <span>تخصيص طلبك الآن</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Detail Modal for Selected Service */}
      {selectedService && (
        <div
          className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="relative w-full max-w-2xl glass-panel glass-modal rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-right"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedService(null)}
              aria-label="إغلاق"
              className="absolute top-5 left-5 min-w-[44px] min-h-[44px] p-2 rounded-full ib-chip hover:border-[#EF4A3C] text-gray-300 hover:text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-3 pl-12">
                <div className="p-3 rounded-2xl text-[#EF4A3C]">
                  {React.createElement(getIcon(selectedService.iconName), { className: 'w-7 h-7' })}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">{selectedService.title}</h3>
                  <p className="text-xs text-[#ffb3aa] font-bold">منصة ابتكار - حلول إعلامية وإبداعية</p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#C9CBEA] leading-[1.9]">
                {selectedService.fullDescription}
              </p>

              <div className="pt-4 border-t border-white/10">
                <h4 className="text-sm font-black text-white mb-3">مخرجات الخدمة والتسليمات:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedService.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#C9CBEA]">
                      <Check className="w-4 h-4 text-[#EF4A3C] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs font-bold text-[#ffb3aa] mb-1">النتيجة والأثر المتوقع:</h4>
                <p className="text-sm text-white font-semibold">{selectedService.sampleOutcome}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  onClick={() => setSelectedService(null)}
                  className="ib-btn ib-chip !min-h-[44px] !py-2 !px-5 !text-xs text-gray-200"
                >
                  إغلاق
                </button>
                <button
                  onClick={() => {
                    const id = selectedService.id;
                    setSelectedService(null);
                    onOpenOrderModal(id);
                  }}
                  className="ib-btn ib-btn-coral !min-h-[44px] !py-2.5 !px-6 !text-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>طلب هذه الخدمة الآن</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
