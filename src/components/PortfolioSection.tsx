import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/mockData';
import { PortfolioItem } from '../types';
import { 
  Briefcase, 
  ExternalLink, 
  Sparkles, 
  X, 
  CheckCircle, 
  FolderOpen, 
  ChevronDown, 
  Layers,
  ArrowDown,
  ArrowRight
} from 'lucide-react';
import { PresentationViewerModal } from './PresentationViewerModal';

interface PortfolioSectionProps {
  onOpenOrderModal: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenOrderModal }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('الكل');
  const [activeProject, setActiveProject] = useState<PortfolioItem | null>(null);
  const [presentationDeckProject, setPresentationDeckProject] = useState<PortfolioItem | null>(null);

  const categories = [
    'الكل', 
    'العروض التقديمية', 
    'تصاميم سوشال ميديا', 
    'دعوات إلكترونية', 
    'شعارات ومخطوطات', 
    'هوية بصرية وتصوير', 
    'بروفايل وموشن جرافيك'
  ];

  const filteredItems =
    selectedFilter === 'الكل'
      ? PORTFOLIO_DATA
      : PORTFOLIO_DATA.filter((item) => {
          if (selectedFilter === 'العروض التقديمية') {
            return (
              item.category === 'العروض التقديمية' ||
              item.category === 'بروفايل وعروض تقديمية'
            );
          }
          return item.category === selectedFilter;
        });

  const handleCardClick = (item: PortfolioItem) => {
    if (item.isPresentationDeck) {
      setPresentationDeckProject(item);
    } else {
      setActiveProject(item);
    }
  };

  return (
    <section id="portfolio" className="py-20 relative overflow-hidden bg-[#100538]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-orange text-[#ff7a59] font-bold text-xs">
            <Briefcase className="w-3.5 h-3.5" />
            <span>قصص نجاح ومشاريع منتقاة</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white">معــــرض أعمـــال ابتكـــــار</h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            نماذج من الهويات البصرية، الحملات التسويقية، والمحتوى المرئي الذي صممناه لشركائنا.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-[#e85432] text-white shadow-lg shadow-[#e85432]/30 scale-105'
                  : 'glass-panel text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item) => {
            // Distinct Folder Design for Presentation Decks
            if (item.isPresentationDeck) {
              return (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className="relative group cursor-pointer flex flex-col justify-between rounded-3xl transition-all duration-300 hover:-translate-y-1.5"
                >
                  {/* Decorative Stacked Folder Sheets Underneath */}
                  <div className="absolute -bottom-2 inset-x-4 h-5 bg-[#e85432]/25 rounded-2xl blur-[1px] pointer-events-none group-hover:bg-[#e85432]/40 transition-colors"></div>
                  <div className="absolute -bottom-1 inset-x-2 h-4 bg-white/10 rounded-2xl border border-white/10 pointer-events-none"></div>

                  {/* Main Folder Card Container */}
                  <div className="relative glass-panel rounded-3xl overflow-hidden border-2 border-[#e85432]/40 group-hover:border-[#e85432] transition-all duration-300 shadow-2xl bg-gradient-to-b from-[#18114c]/90 to-[#0e092d]/95 flex flex-col justify-between h-full">
                    
                    {/* Folder Tab Header */}
                    <div className="flex items-center justify-between px-6 py-3.5 bg-gradient-to-r from-[#e85432]/20 via-[#ff7a59]/10 to-transparent border-b border-white/10">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-[#e85432] text-white shadow-sm">
                          <FolderOpen className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-white tracking-wide">
                          {item.title.includes('كاروسيل') || item.category === 'تصاميم كاروسيل'
                            ? 'سلسلة تصاميم كاروسيل تفاعلية'
                            : item.category === 'تصاميم سوشال ميديا' 
                            ? 'ألبوم تصاميم سوشال ميديا' 
                            : 'مجلد عرض تقديمي متكامل'}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#e85432]/20 text-[#ff7a59] text-[11px] font-bold border border-[#e85432]/30 flex items-center gap-1">
                        <Layers className="w-3 h-3" />
                        <span>
                          {item.slideCount || item.images?.length || 6}{' '}
                          {item.title.includes('كاروسيل') || item.category === 'تصاميم كاروسيل'
                            ? 'شرائح كاروسيل' 
                            : item.category === 'تصاميم سوشال ميديا' 
                            ? 'تصاميم' 
                            : 'شريحة'}
                        </span>
                      </span>
                    </div>

                    {/* Image Preview / Folder Cover */}
                    <div className="relative h-64 overflow-hidden bg-black/60">
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = encodeURI(item.image);
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e092d] via-black/30 to-transparent pointer-events-none"></div>

                      {/* Floating Category Tag */}
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#140844]/85 backdrop-blur-md text-[#ff7a59] text-xs font-bold border border-white/15 shadow-md z-10">
                        {item.category}
                      </span>

                      {/* Interactive Hover Prompt Overlay */}
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                        <div className="px-5 py-2.5 rounded-2xl bg-[#e85432] text-white text-xs font-bold shadow-xl shadow-[#e85432]/50 flex items-center gap-2 transform group-hover:scale-105 transition-transform">
                          <FolderOpen className="w-4 h-4" />
                          <span>
                            اضغط لفتح المجلد وتصفح{' '}
                            {item.title.includes('كاروسيل') || item.category === 'تصاميم كاروسيل'
                              ? 'الكاروسيل' 
                              : item.category === 'تصاميم سوشال ميديا' 
                              ? 'التصاميم' 
                              : 'العرض'}{' '}
                            كاملاً
                          </span>
                          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                        </div>
                      </div>
                    </div>

                    {/* Folder Content & Details */}
                    <div className="p-6 space-y-4">
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-[#e85432]">{item.clientName}</span>
                        <h3 className="text-xl font-black text-white group-hover:text-[#ff7a59] transition-colors leading-snug">
                          {item.title}
                        </h3>
                      </div>

                      <p className="text-xs text-gray-300 leading-relaxed">
                        {item.description}
                      </p>

                      {item.results && (
                        <div className="p-3 rounded-2xl glass-panel-orange text-xs text-orange-200 flex items-center gap-2 border border-[#e85432]/25">
                          <Sparkles className="w-4 h-4 text-[#e85432] shrink-0" />
                          <span><strong>الميزة:</strong> {item.results}</span>
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.map((tag, idx) => (
                          <span key={idx} className="text-[10px] px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-300">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Folder Action Button */}
                      <div className="pt-2">
                        <div className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#e85432] via-[#f15030] to-[#ff7a59] text-white font-bold text-xs shadow-lg shadow-[#e85432]/35 flex items-center justify-center gap-2 group-hover:shadow-orange-500/50 transition-all">
                          <FolderOpen className="w-4 h-4" />
                          <span>تصفح {item.category === 'تصاميم سوشال ميديا' ? 'ألبوم التصاميم' : 'العرض التقديمي'} بالتمرير ({item.slideCount || item.images?.length || 6} {item.category === 'تصاميم سوشال ميديا' ? 'تصاميم' : 'شريحة'})</span>
                          <ChevronDown className="w-4 h-4 animate-bounce" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            }

            // Standard Portfolio Card for other projects
            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(item)}
                className="glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-[#e85432]/50 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div className="relative h-64 overflow-hidden bg-black/40">
                  {item.images && item.images.length > 1 ? (
                    <div className="grid grid-cols-2 h-full w-full gap-1">
                      {item.images.map((imgUrl, i) => (
                        <div key={i} className="relative h-full overflow-hidden">
                          <img
                            src={imgUrl}
                            alt={`${item.title} - ${i + 1}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              if (item.id === 'p5') {
                                (e.currentTarget as HTMLImageElement).src = i === 0 ? '/مخطوطات1.png' : '/مخطوطات2.png';
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        if (item.id === 'p1') {
                          (e.currentTarget as HTMLImageElement).src = '/متجر الشاطئ-1.png';
                        } else if (item.id === 'p2') {
                          (e.currentTarget as HTMLImageElement).src = '/روز باتشولي.jfif';
                        } else if (item.id === 'p3') {
                          (e.currentTarget as HTMLImageElement).src = '/رسن الخيل.png';
                        } else if (item.id === 'p4') {
                          (e.currentTarget as HTMLImageElement).src = '/ستوريات.png';
                        } else if (item.id === 'p6') {
                          (e.currentTarget as HTMLImageElement).src = '/دعوات.png';
                        } else if (item.id === 'p8') {
                          (e.currentTarget as HTMLImageElement).src = '/بروفايل.png';
                        } else if (item.id === 'p10') {
                          (e.currentTarget as HTMLImageElement).src = '/سوشال.png';
                        }
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140844] via-transparent to-transparent opacity-80 pointer-events-none"></div>
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#140844]/80 backdrop-blur-md text-[#ff7a59] text-xs font-bold border border-white/10 z-10">
                    {item.category}
                  </span>
                  {item.images && item.images.length > 1 && (
                    <span className="absolute bottom-3 left-4 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-gray-200 text-[10px] font-bold border border-white/10 z-10">
                      2 نماذج
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-xs font-bold text-[#e85432]">{item.clientName}</span>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#ff7a59] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  {item.results && (
                    <div className="p-3 rounded-2xl glass-panel-orange text-xs text-orange-200 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#e85432] shrink-0" />
                      <span><strong>النتيجة:</strong> {item.results}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md glass-panel text-gray-300">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#ff7a59] flex items-center gap-1 group-hover:underline">
                      <span>استعرض التفاصيل</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Presentation Deck Viewer Modal (Vertical Scroll Behance Style) */}
      {presentationDeckProject && (
        <PresentationViewerModal
          isOpen={!!presentationDeckProject}
          onClose={() => setPresentationDeckProject(null)}
          onOpenOrderModal={onOpenOrderModal}
          project={presentationDeckProject}
        />
      )}

      {/* Standard Project Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl my-8 text-right bg-[#140844]/95">
            <div className="absolute top-5 left-5 flex items-center gap-2">
              <button
                onClick={() => setActiveProject(null)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#e85432] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-white/15"
                title="رجوع لمعرض الأعمال"
              >
                <ArrowRight className="w-4 h-4" />
                <span>رجوع</span>
              </button>
              <button
                onClick={() => setActiveProject(null)}
                className="p-1.5 rounded-xl glass-panel hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                title="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {activeProject.images && activeProject.images.length > 1 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeProject.images.map((imgUrl, idx) => (
                    <div key={idx} className="rounded-2xl overflow-hidden h-56 sm:h-64 relative bg-black/40 border border-white/10">
                      <img
                        src={imgUrl}
                        alt={`${activeProject.title} ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          if (activeProject.id === 'p5') {
                            (e.currentTarget as HTMLImageElement).src = idx === 0 ? '/مخطوطات1.png' : '/مخطوطات2.png';
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl overflow-hidden h-60 relative">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      if (activeProject.id === 'p1') {
                        (e.currentTarget as HTMLImageElement).src = '/متجر الشاطئ-1.png';
                      } else if (activeProject.id === 'p2') {
                        (e.currentTarget as HTMLImageElement).src = '/روز باتشولي.jfif';
                      } else if (activeProject.id === 'p3') {
                        (e.currentTarget as HTMLImageElement).src = '/رسن الخيل.png';
                      } else if (activeProject.id === 'p4') {
                        (e.currentTarget as HTMLImageElement).src = '/ستوريات.png';
                      } else if (activeProject.id === 'p6') {
                        (e.currentTarget as HTMLImageElement).src = '/دعوات.png';
                      } else if (activeProject.id === 'p8') {
                        (e.currentTarget as HTMLImageElement).src = '/بروفايل.png';
                      } else if (activeProject.id === 'p10') {
                        (e.currentTarget as HTMLImageElement).src = '/سوشال.png';
                      }
                    }}
                  />
                </div>
              )}

              <div>
                <span className="text-xs font-bold text-[#e85432] block mb-1">{activeProject.clientName}</span>
                <h3 className="text-2xl font-black text-white">{activeProject.title}</h3>
              </div>

              <p className="text-sm text-gray-200 leading-relaxed glass-panel p-4 rounded-2xl">
                {activeProject.description}
              </p>

              {activeProject.results && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-3 text-sm">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span><strong>الأثر والنمو المتحقق:</strong> {activeProject.results}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-5 py-2.5 rounded-full glass-panel hover:bg-white/10 text-xs text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>رجوع</span>
                </button>
                <button
                  onClick={() => {
                    setActiveProject(null);
                    onOpenOrderModal();
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#e85432] text-white font-bold text-xs shadow-lg shadow-[#e85432]/30 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>احصل على مشروع مشابه لبراندك</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
