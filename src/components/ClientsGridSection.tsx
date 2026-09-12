import React, { useState } from 'react';
import { Award, Handshake, CheckCircle2, Sparkles, Star, Building2, Eye, Search } from 'lucide-react';

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

  const filteredLogos = searchTerm.trim()
    ? allLogos.filter((logo) => logo.id.toString().includes(searchTerm.trim()))
    : allLogos;

  return (
    <section id="clients" className="py-20 md:py-28 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-[#e85432]/10 blur-[180px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#270f6d]/45 blur-[150px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#e85432]/15 blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-orange text-[#ff7a59] font-bold text-xs sm:text-sm shadow-md">
            <Handshake className="w-4 h-4 text-[#e85432]" />
            <span>شبكة شركاء النجاح الموثوقة</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            نعـــتـز بثقـــة <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e85432] via-[#ff7a59] to-orange-300">شركــاء النجــاح</span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
            فخورون بالتعاون والشراكة مع أكثر من 25 جهة وعلامة تجارية رائدة ومشاريع نوعية، حيث شاركناهم رحلة صناعة وتطوير الهوية وإدارة الحضور الرقمي وتحقيق أرقام قياسية.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs sm:text-sm font-bold text-gray-200">
            <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-full border border-white/10 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#e85432]" />
              <span>25 شريك نجاح وعلامة تجارية</span>
            </div>
            <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-full border border-white/10 shadow-sm">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>نسبة رضا وتجديد عقود 98%</span>
            </div>
            <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-full border border-white/10 shadow-sm">
              <Award className="w-4 h-4 text-[#e85432]" />
              <span>قطاعات حكومية، تجارية، وإبداعية</span>
            </div>
          </div>
        </div>

        {/* Search & Grid Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#e85432]" />
              <span>جميع شعارات الشركاء</span>
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#e85432]/20 text-[#ff7a59] border border-[#e85432]/30">
              {filteredLogos.length} شعار
            </span>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="بحث برقم الشريك (1 - 25)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-2.5 pl-10 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#e85432] transition-colors"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* The Grid of 25 Logos (1 to 25) - Enlarged Display */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-7">
          {filteredLogos.map((client) => (
            <div
              key={client.id}
              onClick={() => setSelectedLogo(client)}
              className="group relative glass-panel rounded-3xl p-5 sm:p-7 flex flex-col items-center justify-between border border-white/12 hover:border-[#e85432] hover:bg-white/[0.14] transition-all duration-300 hover:shadow-[0_16px_36px_rgba(232,84,50,0.28)] hover:-translate-y-2 min-h-[200px] sm:min-h-[240px] md:min-h-[260px] cursor-pointer"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#e85432]/0 via-[#e85432]/5 to-[#e85432]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              {/* Logo Image Container - Enlarged */}
              <div className="w-full flex-1 min-h-[130px] sm:min-h-[160px] md:min-h-[180px] flex items-center justify-center relative z-10 p-2 sm:p-4">
                <img
                  src={client.src}
                  alt={client.alt}
                  className="w-full h-full max-h-[140px] sm:max-h-[170px] md:max-h-[190px] object-contain filter contrast-105 brightness-105 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Partner Number Tag */}
              <div className="w-full flex items-center justify-between mt-3 pt-3 border-t border-white/10 relative z-10">
                <span className="text-xs sm:text-sm font-mono font-bold text-white/50 group-hover:text-[#ff7a59] transition-colors">
                  #{client.id.toString().padStart(2, '0')}
                </span>
                <span className="text-xs text-gray-300 group-hover:text-white flex items-center gap-1.5 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                  <Eye className="w-3.5 h-3.5 text-[#e85432]" />
                  <span>معاينة وتكبير</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for viewing logo enlarged */}
        {selectedLogo !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
            onClick={() => setSelectedLogo(null)}
          >
            <div
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/20 max-w-lg w-full text-center relative space-y-5 bg-[#140844]/95 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedLogo(null)}
                className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors font-bold text-lg"
              >
                ✕
              </button>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel-orange text-[#ff7a59] font-bold text-xs">
                  <Award className="w-3.5 h-3.5" />
                  <span>شريك نجاح #{selectedLogo.id.toString().padStart(2, '0')}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">شريك نجاح منصة ابتكار</h3>
              </div>

              <div className="w-full h-56 sm:h-64 rounded-2xl bg-white/[0.08] border border-white/10 p-6 flex items-center justify-center shadow-inner">
                <img
                  src={selectedLogo.src}
                  alt={selectedLogo.alt}
                  className="max-h-full max-w-full object-contain filter contrast-105 brightness-105 drop-shadow-xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedLogo(null);
                    if (onOpenOrderModal) onOpenOrderModal();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#e85432] to-[#ff7a59] text-white font-bold text-xs sm:text-sm hover:scale-105 transition-transform"
                >
                  انضم لقائمة الشركاء
                </button>
                <button
                  onClick={() => setSelectedLogo(null)}
                  className="px-5 py-2.5 rounded-xl glass-panel border border-white/10 text-white font-bold text-xs sm:text-sm hover:bg-white/10 transition-colors"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA Card */}
        <div className="mt-14 glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 text-center flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto bg-gradient-to-r from-[#140844]/90 via-[#270f6d]/60 to-[#140844]/90">
          <div className="text-right space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#e85432]" />
              <span>هل ترغب بأن تكون علامتك التجارية شريك نجاحنا القادم؟</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              انضم إلى قائمة شركائنا المتميزين واحصل على باقة متكاملة لإدارة ونمو هويتك الرقمية.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onOpenOrderModal && (
              <button
                onClick={() => onOpenOrderModal()}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#e85432] to-[#ff7a59] text-white font-bold text-sm shadow-lg hover:shadow-orange-500/30 hover:scale-105 transition-all"
              >
                انضم لشركاء النجاح
              </button>
            )}
            <a
              href="https://wa.me/966558875818"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-2xl glass-panel border border-white/15 text-white font-bold text-sm hover:bg-white/10 transition-all"
            >
              استشارة مباشرة
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

