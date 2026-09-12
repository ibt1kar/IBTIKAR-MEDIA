import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/mockData';
import { ServiceItem } from '../types';
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

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center space-y-4 mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-orange text-[#ff7a59] font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>خدماتنا الإبداعية المتكاملة</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight space-y-1 text-center">
            <span className="block">حلول تسويقية وبصرية</span>
            <span className="block">تحـوّل الرؤيـــــة إلى واقع</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            نقدم مجموعة متكاملة من الخدمات الإعلامية والتصميمية بأعلى معايير الجودة لتنمية براندك وتثبيت حضورك الرقمي.
          </p>
        </div>

        {/* Services Grid (6 services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service) => {
            const IconComponent = getIcon(service.iconName);
            return (
              <div
                key={service.id}
                className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between relative group"
              >
                <div className="space-y-4">
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-14 h-14 rounded-2xl glass-panel-orange flex items-center justify-center text-[#e85432] group-hover:scale-110 group-hover:bg-[#e85432] group-hover:text-white transition-all duration-300 shadow-lg shadow-[#e85432]/20 shrink-0">
                      <IconComponent className="w-7 h-7" />
                    </div>

                    {service.badge && (
                      <span className="px-3 py-1.5 rounded-full bg-[#e85432]/20 border border-[#e85432]/40 text-[#ff7a59] font-bold text-[11px] text-center leading-normal">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-[#ff7a59] transition-colors pt-1">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-bold text-gray-300 hover:text-white flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>التفاصيل والمخرجات</span>
                  </button>

                  <button
                    onClick={() => onOpenOrderModal(service.id)}
                    className="px-4 py-2 rounded-full bg-[#e85432] hover:bg-[#ff6b4a] text-white text-xs font-bold shadow-md shadow-[#e85432]/30 hover:scale-105 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>اطلب الخدمة</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notice Banner - "إمكانية طلب تصاميم منفردة وخاصة بحسب الاحتياج" */}
        <div className="mt-12 glass-panel p-6 rounded-3xl border border-[#e85432]/30 text-center flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#140844]/90 shadow-xl">
          <div className="flex items-center gap-3 text-right">
            <div className="p-3 rounded-2xl bg-[#e85432]/20 text-[#e85432]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-black text-white">ترغب في تصميم منفرد أو حزمة خاصة؟</h4>
              <p className="text-xs text-gray-300">
                إمكانية طلب تصاميم منفردة وخاصة ومخصصة بالكامل بحسب الاحتياج الفريد لمشروعك.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenOrderModal()}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#e85432] to-[#ff7a59] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#e85432]/30 shrink-0 hover:scale-105 transition-transform cursor-pointer"
          >
            تخصيص طلبك الآن
          </button>
        </div>
      </div>

      {/* Detail Modal for Selected Service */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl my-8 text-right bg-[#140844]/95">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 left-5 p-2 rounded-full glass-panel hover:bg-white/10 text-gray-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl glass-panel-orange text-[#e85432]">
                  {React.createElement(getIcon(selectedService.iconName), { className: 'w-7 h-7' })}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">{selectedService.title}</h3>
                  <p className="text-xs text-[#ff7a59] font-bold">منصة ابتكار - حلول إعلامية وإبداعية</p>
                </div>
              </div>

              <p className="text-sm text-gray-200 leading-relaxed glass-panel p-4 rounded-2xl">
                {selectedService.fullDescription}
              </p>

              <div>
                <h4 className="text-sm font-black text-white mb-3">مخرجات الخدمة والتسليمات:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedService.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-200 p-2.5 rounded-xl glass-panel">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#e85432]/10 border border-[#e85432]/30">
                <h4 className="text-xs font-bold text-[#ff7a59] mb-1">النتيجة والأثر المتوقع:</h4>
                <p className="text-xs text-white font-semibold">{selectedService.sampleOutcome}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2.5 rounded-full glass-panel text-xs text-gray-300 font-semibold hover:bg-white/10"
                >
                  إغلاق
                </button>
                <button
                  onClick={() => {
                    const id = selectedService.id;
                    setSelectedService(null);
                    onOpenOrderModal(id);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#e85432] text-white font-bold text-xs shadow-lg shadow-[#e85432]/30 flex items-center gap-2 hover:scale-105 transition-transform"
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
