import React, { useState } from 'react';
import { SERVICE_PACKAGES_DATA } from '../data/mockData';
import {
  Sparkles,
  Check,
  ArrowLeft,
  Star,
  ShieldCheck,
  Share2,
  Layout,
  Palette,
  FileText,
  CheckCircle2,
  Layers,
  Laptop,
  Send,
  Award,
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
    <section id="packages" className="ib-sec">
      <div className="ib-container">
        {/* Start-Aligned Section Header */}
        <div className="space-y-4 mb-10 text-right">
          <div className="ib-eyebrow ib-chip">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4A3C]" />
            <span>باقات وخطط تنفيذ متكاملة</span>
          </div>
          <h2 className="ib-h2">
            بـاقــــات الخدمــــات الإبداعــــية مصممة خصيصاً لنمو براندك
          </h2>
          <p className="ib-sub">
            اختر الخدمة المطلوبة واستعرض باقاتها المصنفة بدقة لتناسب حجم مشروعك، ميزانيتك، وتطلعاتك التسويقية.
          </p>
        </div>

        {/* Glass Segmented Control Tabs */}
        <div className="mb-10">
          <div className="ib-glass rounded-[28px] p-2 inline-flex flex-wrap items-center gap-2 max-w-full">
            {SERVICE_PACKAGES_DATA.map((group, idx) => {
              const IconComponent = getServiceIcon(group.iconName);
              const isActive = idx === activeGroupIndex;
              return (
                <button
                  key={group.id}
                  onClick={() => setActiveGroupIndex(idx)}
                  className={`ib-pill inline-flex items-center gap-2 whitespace-nowrap border ${
                    isActive
                      ? 'is-active'
                      : 'border-transparent hover:text-white'
                  }`}
                >
                  <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#070718]' : 'text-[#EF4A3C]'}`} />
                  <span>{group.serviceTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Service Header Card */}
        <div className="ib-glass rounded-[30px] p-[clamp(24px,3.5vw,40px)] mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 text-right">
              <div className="flex items-start gap-3">
                <span className="text-[#EF4A3C] mt-1 shrink-0">
                  {React.createElement(getServiceIcon(activeGroup.iconName), { className: 'w-6 h-6' })}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{activeGroup.serviceTitle}</h3>
                    {activeGroup.badge && (
                      <span className="text-xs font-bold text-[#ffb3aa]">
                        {activeGroup.badge}
                      </span>
                    )}
                  </div>
                  {activeGroup.description && (
                    <p className="text-sm sm:text-base text-[#C9CBEA] mt-1.5 max-w-2xl leading-relaxed">
                      {activeGroup.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenOrderModal(activeGroup.serviceId, undefined, activeGroup.id)}
              className="ib-btn ib-chip text-white hover:border-[#EF4A3C] shrink-0 self-stretch md:self-auto"
            >
              <span>طلب مخصص لهذه الخدمة</span>
              <Send className="w-4 h-4 text-[#EF4A3C]" />
            </button>
          </div>

          {/* Core Services Pillars (spacing & font-weight only, no inner cards) */}
          {activeGroup.coreServices && (
            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-sm font-bold text-[#ffb3aa] mb-5 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#EF4A3C]" />
                <span>الخدمات والركائز الأساسية المشمولة في المنظومة:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {activeGroup.coreServices.map((core, cIdx) => (
                  <div key={cIdx} className="flex items-start gap-2.5 text-right">
                    <span className="w-2 h-2 rounded-full bg-[#EF4A3C] mt-2 shrink-0" />
                    <div>
                      <h5 className="text-sm font-bold text-white mb-1">{core.title}</h5>
                      <p className="text-xs text-[#9A9CC8] leading-relaxed">{core.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fixed Features Banner (spacing & font-weight only, no inner cards) */}
          {activeGroup.fixedFeatures && (
            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-sm font-bold text-[#ffb3aa] mb-5 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#EF4A3C]" />
                <span>مميزات ومواصفات ثابتة مشمولة في جميع الباقات:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {activeGroup.fixedFeatures.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#C9CBEA]">
                    <CheckCircle2 className="w-4 h-4 text-[#EF4A3C] shrink-0 mt-1" />
                    <span className="leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Packages Grid */}
        <div className="ib-pk-grid pt-4">
          {activeGroup.packages.map((pkg) => {
            const isPopular = pkg.isPopular;
            return (
              <div
                key={pkg.id}
                className={`${
                  isPopular ? 'ib-glass-coral ib-pk-feat' : 'ib-glass'
                } ib-lift rounded-[30px] p-[clamp(26px,3vw,36px)] flex flex-col relative`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#EF4A3C] text-[#070718] font-extrabold text-xs shadow-lg whitespace-nowrap inline-flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-[#070718]" />
                    <span>الباقة الأكثر طلباً</span>
                  </div>
                )}

                <div className="flex flex-col flex-1 space-y-5 text-right">
                  {/* Title & Fit Text */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{pkg.title}</h3>
                    {pkg.suitableFor && (
                      <p className="text-xs sm:text-sm text-[#C9CBEA] leading-relaxed">
                        {pkg.suitableFor}
                      </p>
                    )}
                  </div>

                  {/* Bold Scope / Deliverable Highlight */}
                  <div className="pt-4 border-t border-white/10 space-y-2">
                    <div className="text-xs font-bold text-[#ffb3aa]">المخرجات وحجم العمل:</div>
                    <div className="text-base font-extrabold text-white leading-snug">{pkg.deliverables}</div>
                    {(pkg.dailyPublishing || pkg.monthlyTotal) && (
                      <div className="pt-1 flex flex-wrap items-center gap-4 text-xs text-[#C9CBEA]">
                        {pkg.dailyPublishing && (
                          <span>اليومي: <strong className="text-white">{pkg.dailyPublishing}</strong></span>
                        )}
                        {pkg.monthlyTotal && (
                          <span>الشهري: <strong className="text-white">{pkg.monthlyTotal}</strong></span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Platforms Managed */}
                  {pkg.platforms && (
                    <div className="flex items-start gap-2 text-xs sm:text-sm text-[#C9CBEA]">
                      <Laptop className="w-4 h-4 text-[#EF4A3C] shrink-0 mt-0.5" />
                      <span><strong className="text-white">المنصات المدارة:</strong> {pkg.platforms}</span>
                    </div>
                  )}

                  {/* Optional Scope Details (separated by typography & spacing only) */}
                  {pkg.technicalDeliverables && (
                    <div className="space-y-1 text-xs sm:text-sm text-[#C9CBEA]">
                      <span className="font-bold text-[#ffb3aa] block">المخرجات الفنية:</span>
                      <p className="leading-relaxed text-[#9A9CC8]">{pkg.technicalDeliverables}</p>
                    </div>
                  )}

                  {pkg.stationeryDeliverables && (
                    <div className="space-y-1 text-xs sm:text-sm text-[#C9CBEA]">
                      <span className="font-bold text-[#ffb3aa] block">المطبوعات والقرطاسية:</span>
                      <p className="leading-relaxed text-[#9A9CC8]">{pkg.stationeryDeliverables}</p>
                    </div>
                  )}

                  {pkg.digitalPresence && (
                    <div className="space-y-1 text-xs sm:text-sm text-[#C9CBEA]">
                      <span className="font-bold text-[#ffb3aa] block">التواجد الرقمي:</span>
                      <p className="leading-relaxed text-[#9A9CC8]">{pkg.digitalPresence}</p>
                    </div>
                  )}

                  {pkg.brandGuidelines && (
                    <div className="space-y-1 text-xs sm:text-sm text-[#C9CBEA]">
                      <span className="font-bold text-[#ffb3aa] block">دليل الاستخدام (Brand Guidelines):</span>
                      <p className="leading-relaxed text-[#9A9CC8]">{pkg.brandGuidelines}</p>
                    </div>
                  )}

                  {pkg.fileDelivery && (
                    <div className="space-y-1 text-xs sm:text-sm text-[#C9CBEA]">
                      <span className="font-bold text-[#ffb3aa] block">تسليم الملفات:</span>
                      <p className="leading-relaxed text-[#9A9CC8]">{pkg.fileDelivery}</p>
                    </div>
                  )}

                  {/* Check-list (grows to align buttons across cards) */}
                  {pkg.servicesIncluded && (
                    <div className="space-y-2.5 pt-4 border-t border-white/10 flex-1">
                      <span className="text-xs font-bold text-[#9A9CC8] block">الخدمات المشمولة بالباقة:</span>
                      {pkg.servicesIncluded.map((srv, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#C9CBEA]">
                          <Check className="w-4 h-4 text-[#EF4A3C] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{srv}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {pkg.features && (
                    <div className="space-y-2.5 pt-4 border-t border-white/10 flex-1">
                      <span className="text-xs font-bold text-[#9A9CC8] block">المميزات وخيارات التسليم:</span>
                      {pkg.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#C9CBEA]">
                          <Check className="w-4 h-4 text-[#EF4A3C] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Full-Width CTA pinned at bottom */}
                <div className="pt-6 mt-6 border-t border-white/10">
                  <button
                    onClick={() => onOpenOrderModal(activeGroup.serviceId, pkg.id, activeGroup.id)}
                    className={`ib-btn w-full ${
                      isPopular
                        ? 'ib-btn-coral'
                        : 'ib-glass text-white hover:border-[#EF4A3C]'
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

        {/* Custom / Single Design Banner */}
        <div className="mt-10 ib-glass-coral rounded-[30px] p-[clamp(24px,3.5vw,38px)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5 text-right">
            <h4 className="text-lg sm:text-xl font-bold text-white">
              هل تبحث عن تصميم منفرد أو طلب خاص بحسب الاحتياج؟
            </h4>
            <p className="text-xs sm:text-sm text-[#C9CBEA]">
              يمكنك طلب تصميم منفرد (صورة، بنر، فيديو ريلز، أو هوية مخصصة) دون الالتزام بباقة كاملة.
            </p>
          </div>
          <button
            onClick={() => onOpenOrderModal(undefined, undefined, undefined)}
            className="ib-btn ib-btn-coral shrink-0"
          >
            <span>اطلب تصميماً مخصصاً</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Security Note */}
        <div className="mt-8 text-center text-xs sm:text-sm text-[#9A9CC8] flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#EF4A3C]" />
          <span>مرونة تامة في التعديلات، التزام بالمواعيد، ومتابعة مباشرة عبر مدير حساب مخصص</span>
        </div>
      </div>
    </section>
  );
};
