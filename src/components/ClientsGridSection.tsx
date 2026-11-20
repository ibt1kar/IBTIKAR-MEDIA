import React, { useState } from 'react';
import { useModalEffects } from '../hooks/useModalEffects';
import { Award, CheckCircle2, Star, Building2, Search, X } from 'lucide-react';

interface ClientsGridSectionProps {
  onOpenOrderModal?: () => void;
}

export const ClientsGridSection: React.FC<ClientsGridSectionProps> = ({ onOpenOrderModal }) => {
  // 25 client logos (excluding original #16 and #20, reordered sequentially 1 to 25)
  const sourceImageNumbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    17, 18, 19, 21, 22, 23, 24, 25, 26, 27
  ];

  const allLogos = sourceImageNumbers.map((imgNum, index) => ({
    id: index + 1,
    src: `/${imgNum}.png`,
    alt: `شريك نجاح منصة ابتكار #${index + 1}`,
  }));

  const [selectedLogo, setSelectedLogo] = useState<typeof allLogos[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useModalEffects(!!selectedLogo, () => setSelectedLogo(null));

  const filteredLogos = searchTerm.trim()
    ? allLogos.filter((logo) => logo.id.toString().includes(searchTerm.trim()))
    : allLogos;

  return (
    <section id="clients" className="ib-sec">
      <div className="ib-container">
        {/* Single Large Glass Panel (radius 36px), 2 columns */}
        <div className="ib-glass rounded-[36px] p-[clamp(24px,4vw,52px)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Side 1: Text + Existing Stats + Search */}
            <div className="lg:col-span-5 space-y-6 text-right">
              <div className="ib-eyebrow ib-chip">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF4A3C]" />
                <span>شبكة شركاء النجاح الموثوقة</span>
              </div>

              <h2 className="ib-h2">
                نعـــتـز بثقـــة <span className="text-[#EF4A3C]">شركــاء النجــاح</span>
              </h2>

              <p className="ib-sub">
                فخورون بالتعاون والشراكة مع أكثر من 25 جهة وعلامة تجارية رائدة ومشاريع نوعية، حيث شاركناهم رحلة صناعة وتطوير الهوية وإدارة الحضور الرقمي وتحقيق أرقام قياسية.
              </p>

              {/* Existing Quick Metrics (spacing & hairline divider only, no inner boxes) */}
              <div className="pt-5 border-t border-white/10 space-y-3 text-sm font-semibold text-[#C9CBEA]">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#EF4A3C] shrink-0" />
                  <span>25 شريك نجاح وعلامة تجارية</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-[#EF4A3C] shrink-0" />
                  <span>نسبة رضا وتجديد عقود 98%</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-4 h-4 text-[#EF4A3C] shrink-0" />
                  <span>قطاعات حكومية، تجارية، وإبداعية</span>
                </div>
              </div>

              {/* Search & Count Header */}
              <div className="pt-5 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#EF4A3C]" />
                    <span>جميع شعارات الشركاء</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-[#ffb3aa]">
                    {filteredLogos.length} شعار
                  </span>
                </div>

                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="بحث برقم الشريك (1 - 25)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="بحث برقم الشريك"
                    className="w-full glass-input min-h-[44px] px-4 py-2.5 pl-10 text-xs sm:text-sm text-white placeholder-[#9A9CC8]"
                  />
                  <Search className="w-4 h-4 text-[#9A9CC8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {onOpenOrderModal && (
                  <button
                    onClick={() => onOpenOrderModal()}
                    className="ib-btn ib-btn-coral"
                  >
                    انضم لشركاء النجاح
                  </button>
                )}
                <a
                  href="https://wa.me/966593363878"
                  target="_blank"
                  rel="noreferrer"
                  className="ib-btn ib-glass text-white hover:border-[#EF4A3C]"
                >
                  استشارة مباشرة
                </a>
              </div>
            </div>

            {/* Side 2: 25 Partner Logos on Transparent Tiles (no white/milky background) */}
            <div className="lg:col-span-7">
              {filteredLogos.length > 0 ? (
                <div className="ib-logos">
                  {filteredLogos.map((client) => (
                    <button
                      key={client.id}
                      type="button"
                      onClick={() => setSelectedLogo(client)}
                      aria-label={`معاينة ${client.alt}`}
                      className="ib-lift aspect-square rounded-[20px] p-3 sm:p-4 flex items-center justify-center relative group cursor-pointer bg-transparent border border-transparent hover:border-[#EF4A3C]/50 hover:bg-white/[0.03] transition-colors"
                    >
                      <img
                        src={client.src}
                        alt={client.alt}
                        className="w-full h-full object-contain bg-transparent transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                      <span className="absolute bottom-2 left-2.5 text-[10px] font-mono font-bold text-[#9A9CC8] group-hover:text-[#ffb3aa] transition-colors">
                        #{client.id.toString().padStart(2, '0')}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="rounded-[24px] border border-white/10 p-8 text-center space-y-3">
                  <p className="text-sm font-semibold text-[#C9CBEA]">
                    لا يوجد شريك مطابق للرقم "{searchTerm}"
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="ib-btn ib-chip !min-h-[44px] !py-2 !px-5 !text-xs text-white"
                  >
                    عرض جميع الشركاء (25)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal for viewing logo enlarged */}
        {selectedLogo !== null && (
          <div
            className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
            onClick={() => setSelectedLogo(null)}
          >
            <div
              className="glass-panel glass-modal p-6 sm:p-8 rounded-3xl max-w-lg w-full text-center relative space-y-5 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedLogo(null)}
                aria-label="إغلاق"
                className="ib-chip absolute top-4 left-4 min-w-[44px] min-h-[44px] rounded-full text-white flex items-center justify-center hover:border-[#EF4A3C] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 pt-2">
                <div className="inline-flex items-center gap-1.5 text-[#ffb3aa] font-bold text-xs">
                  <Award className="w-4 h-4 text-[#EF4A3C]" />
                  <span>شريك نجاح #{selectedLogo.id.toString().padStart(2, '0')}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">شريك نجاح منصة ابتكار</h3>
              </div>

              <div className="w-full h-56 sm:h-64 rounded-[20px] p-6 flex items-center justify-center bg-transparent">
                <img
                  src={selectedLogo.src}
                  alt={selectedLogo.alt}
                  className="max-h-full max-w-full object-contain bg-transparent"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-3 border-t border-white/10">
                <button
                  onClick={() => {
                    setSelectedLogo(null);
                    if (onOpenOrderModal) onOpenOrderModal();
                  }}
                  className="ib-btn ib-btn-coral !min-h-[44px] !py-2.5 !px-6 !text-sm"
                >
                  انضم لقائمة الشركاء
                </button>
                <button
                  onClick={() => setSelectedLogo(null)}
                  className="ib-btn ib-chip !min-h-[44px] !py-2.5 !px-5 !text-sm text-white"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
