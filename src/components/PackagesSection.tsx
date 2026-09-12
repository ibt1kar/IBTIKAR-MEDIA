import React, { useState } from 'react';
import { SERVICE_PACKAGES_DATA } from '../data/mockData';
import { 
  Sparkles, Check, ArrowLeft, Star, ShieldCheck, Flame, 
  Share2, Layout, Palette, FileText, CheckCircle2, Layers,
  ChevronRight, Laptop, Send, Award
} from 'lucide-react';

interface PackagesSectionProps {
  onOpenOrderModal: (serviceId?: string, packageId?: string, packageGroupId?: string) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onOpenOrderModal }) => {
  const [activeGroupIndex, setActiveGroupIndex] = useState<number>(0);
  const activeGroup = SERVICE_PACKAGES_DATA[activeGroupIndex] || SERVICE_PACKAGES_DATA[0];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Share2':
        return Share2;
      case 'Layout':
        return Layout;
      case 'Palette':
        return Palette;
      case 'FileText':
        return FileText;
      case 'Sparkles':
        return Sparkles;
      default:
        return Layers;
    }
  };

  return (
    <section id="packages" className="py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#e85432]/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-[#2b1055]/30 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center space-y-4 mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-orange text-[#ff7a59] font-bold text-xs">
            <Flame className="w-3.5 h-3.5 text-[#e85432]" />
            <span>باقات وخطط تنفيذ متكاملة</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight space-y-1">
            <span className="block">بـاقــــات الخدمــــات الإبداعــــية</span>
            <span className="block text-gradient-orange">مصممة خصيصاً لنمو براندك</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            اختر الخدمة المطلوبة واستعرض باقاتها المصنفة بدقة لتناسب حجم مشروعك، ميزانيتك، وتطلعاتك التسويقية.
          </p>
        </div>

        {/* Service Category Selection Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {SERVICE_PACKAGES_DATA.map((group, idx) => {
            const IconComponent = getServiceIcon(group.iconName);
            const isActive = idx === activeGroupIndex;
            return (
              <button
                key={group.id}
                onClick={() => setActiveGroupIndex(idx)}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#e85432] to-[#ff7a59] text-white shadow-lg shadow-[#e85432]/30 scale-105'
                    : 'glass-panel text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#e85432]'}`} />
                <span>{group.serviceTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Service Header Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 mb-10 relative overflow-hidden bg-gradient-to-br from-[#140844]/90 via-[#1a0c4f]/90 to-[#140844]/90">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="p-3 rounded-2xl bg-[#e85432]/20 text-[#e85432] inline-block">
                  {React.createElement(getServiceIcon(activeGroup.iconName), { className: 'w-6 h-6' })}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-black text-white">{activeGroup.serviceTitle}</h3>
                    {activeGroup.badge && (
                      <span className="px-3 py-0.5 rounded-full glass-panel-orange text-[#ff7a59] text-[11px] font-bold">
                        {activeGroup.badge}
                      </span>
                    )}
                  </div>
                  {activeGroup.description && (
                    <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl leading-relaxed">
                      {activeGroup.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenOrderModal(activeGroup.serviceId, undefined, activeGroup.id)}
              className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer self-stretch sm:self-auto justify-center"
            >
              <span>طلب مخصص لهذه الخدمة</span>
              <Send className="w-4 h-4 text-[#e85432]" />
            </button>
          </div>

          {/* Core Services Pillars (e.g. for Social Management) */}
          {activeGroup.coreServices && (
            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-sm font-black text-[#ff7a59] mb-4 flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>الخدمات والركائز الأساسية المشمولة في المنظومة:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {activeGroup.coreServices.map((core, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#e85432]/40 transition-colors"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-[#e85432] mt-1.5 shrink-0" />
                      <div>
                        <h5 className="text-xs font-bold text-white mb-1">{core.title}</h5>
                        <p className="text-[11px] text-gray-300 leading-relaxed">{core.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fixed Features Banner (e.g. for Creators & Influencers) */}
          {activeGroup.fixedFeatures && (
            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-sm font-black text-[#ff7a59] mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>مميزات ومواصفات ثابتة مشمولة في جميع الباقات:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {activeGroup.fixedFeatures.map((feat, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-2.5 text-xs text-gray-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#e85432] shrink-0 mt-0.5" />
                    <span className="leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Packages Grid for Current Group */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {activeGroup.packages.map((pkg) => {
            const isPopular = pkg.isPopular;
            return (
              <div
                key={pkg.id}
                className={`glass-panel p-6 sm:p-7 rounded-3xl border flex flex-col justify-between relative transition-all duration-300 ${
                  isPopular
                    ? 'border-[#e85432] bg-gradient-to-b from-[#e85432]/15 via-[#1a0c4f] to-[#140844] shadow-2xl shadow-[#e85432]/25 md:-translate-y-2'
                    : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#e85432] to-[#ff7a59] text-white font-black text-[11px] shadow-lg shadow-[#e85432]/40 whitespace-nowrap flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />
                    <span>الباقة الأكثر طلباً</span>
                  </div>
                )}

                <div className="space-y-5">
                  {/* Package Title & Suitable Target */}
                  <div>
                    <h3 className="text-xl font-black text-white mb-2">{pkg.title}</h3>
                    {pkg.suitableFor && (
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-[#ff7a59] font-medium leading-relaxed">
                        🎯 {pkg.suitableFor}
                      </div>
                    )}
                  </div>

                  {/* Main Deliverable / Capacity Highlight */}
                  <div className="p-3.5 rounded-2xl glass-panel-orange border border-[#e85432]/30">
                    <div className="text-[11px] font-bold text-gray-300 mb-1">المخرجات وحجم العمل:</div>
                    <div className="text-sm font-black text-white leading-snug">{pkg.deliverables}</div>
                    {(pkg.dailyPublishing || pkg.monthlyTotal) && (
                      <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-xs text-orange-200">
                        {pkg.dailyPublishing && <span>اليومي: <strong>{pkg.dailyPublishing}</strong></span>}
                        {pkg.monthlyTotal && <span>الشهري: <strong>{pkg.monthlyTotal}</strong></span>}
                      </div>
                    )}
                  </div>

                  {/* Platforms Managed (if applicable) */}
                  {pkg.platforms && (
                    <div className="flex items-center gap-2 text-xs text-gray-200 bg-white/5 p-2.5 rounded-xl border border-white/10">
                      <Laptop className="w-4 h-4 text-[#e85432] shrink-0" />
                      <span><strong>المنصات المدارة:</strong> {pkg.platforms}</span>
                    </div>
                  )}

                  {/* Technical Deliverables / Logo details */}
                  {pkg.technicalDeliverables && (
                    <div className="space-y-1.5 text-xs text-gray-300 bg-white/5 p-3 rounded-xl border border-white/10">
                      <span className="font-bold text-[#ff7a59] block">المخرجات الفنية:</span>
                      <p className="leading-relaxed text-[11px]">{pkg.technicalDeliverables}</p>
                    </div>
                  )}

                  {/* Stationery / Prints */}
                  {pkg.stationeryDeliverables && (
                    <div className="space-y-1.5 text-xs text-gray-300 bg-white/5 p-3 rounded-xl border border-white/10">
                      <span className="font-bold text-[#ff7a59] block">المطبوعات والقرطاسية:</span>
                      <p className="leading-relaxed text-[11px]">{pkg.stationeryDeliverables}</p>
                    </div>
                  )}

                  {/* Digital Presence */}
                  {pkg.digitalPresence && (
                    <div className="space-y-1.5 text-xs text-gray-300 bg-white/5 p-3 rounded-xl border border-white/10">
                      <span className="font-bold text-[#ff7a59] block">التواجد الرقمي:</span>
                      <p className="leading-relaxed text-[11px]">{pkg.digitalPresence}</p>
                    </div>
                  )}

                  {/* Brand Guidelines */}
                  {pkg.brandGuidelines && (
                    <div className="space-y-1.5 text-xs text-gray-300 bg-white/5 p-3 rounded-xl border border-white/10">
                      <span className="font-bold text-[#ff7a59] block">دليل الاستخدام (Brand Guidelines):</span>
                      <p className="leading-relaxed text-[11px]">{pkg.brandGuidelines}</p>
                    </div>
                  )}

                  {/* File Delivery details */}
                  {pkg.fileDelivery && (
                    <div className="text-xs text-gray-300 bg-white/5 p-3 rounded-xl border border-white/10">
                      <span className="font-bold text-[#ff7a59] block mb-1">تسليم الملفات:</span>
                      <p className="leading-relaxed text-[11px]">{pkg.fileDelivery}</p>
                    </div>
                  )}

                  {/* Services Included Checklist */}
                  {pkg.servicesIncluded && (
                    <div className="space-y-2 pt-1">
                      <span className="text-[11px] font-bold text-gray-400 block">الخدمات المشمولة بالباقة:</span>
                      {pkg.servicesIncluded.map((srv, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-200">
                          <Check className="w-3.5 h-3.5 text-[#e85432] shrink-0 mt-0.5" />
                          <span className="leading-tight">{srv}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Features List */}
                  {pkg.features && (
                    <div className="space-y-2 pt-1">
                      <span className="text-[11px] font-bold text-gray-400 block">المميزات وخيارات التسليم:</span>
                      {pkg.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-200">
                          <Check className="w-3.5 h-3.5 text-[#e85432] shrink-0 mt-0.5" />
                          <span className="leading-tight">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom CTA */}
                <div className="pt-6 mt-6 border-t border-white/10">
                  <button
                    onClick={() => onOpenOrderModal(activeGroup.serviceId, pkg.id, activeGroup.id)}
                    className={`w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      isPopular
                        ? 'bg-gradient-to-r from-[#e85432] to-[#ff7a59] text-white shadow-lg shadow-[#e85432]/30 hover:scale-105'
                        : 'glass-panel text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <span>اختر هذه الباقة وابدأ الآن</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notice Banner Ribbon for Custom / Single Design Request */}
        <div className="mt-14 glass-panel p-5 sm:p-6 rounded-3xl border border-[#e85432]/40 bg-gradient-to-r from-[#140844] via-[#241060] to-[#140844] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3 text-right">
            <span className="p-3 rounded-2xl bg-[#e85432]/20 text-[#e85432] shrink-0">
              <Star className="w-6 h-6 fill-[#e85432]" />
            </span>
            <div>
              <h4 className="text-base font-black text-white">هل تبحث عن تصميم منفرد أو طلب خاص بحسب الاحتياج؟</h4>
              <p className="text-xs text-gray-300 mt-0.5">
                يمكنك طلب تصميم منفرد (صورة، بنر، فيديو ريلز، أو هوية مخصصة) دون الالتزام بباقة كاملة.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenOrderModal(undefined, undefined, undefined)}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#e85432] to-[#ff7a59] text-xs sm:text-sm font-bold text-white shadow-lg shadow-[#e85432]/30 hover:scale-105 transition-transform shrink-0 cursor-pointer"
          >
            اطلب تصميماً مخصصاً
          </button>
        </div>

        {/* Bottom Security Note */}
        <div className="mt-10 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>مرونة تامة في التعديلات، التزام بالمواعيد، ومتابعة مباشرة عبر مدير حساب مخصص</span>
        </div>
      </div>
    </section>
  );
};
