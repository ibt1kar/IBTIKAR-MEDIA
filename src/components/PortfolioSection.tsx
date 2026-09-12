import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/mockData';
import { PortfolioItem } from '../types';
import { Briefcase, ExternalLink, Sparkles, X, CheckCircle } from 'lucide-react';

interface PortfolioSectionProps {
  onOpenOrderModal: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenOrderModal }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('الكل');
  const [activeProject, setActiveProject] = useState<PortfolioItem | null>(null);

  const categories = ['الكل', 'تصاميم سوشال ميديا', 'بروفايل وعروض تقديمية', 'دعوات إلكترونية', 'شعارات ومخطوطات', 'هوية بصرية وتصوير', 'بروفايل وموشن جرافيك'];

  const filteredItems =
    selectedFilter === 'الكل'
      ? PORTFOLIO_DATA
      : PORTFOLIO_DATA.filter((item) => item.category === selectedFilter);

  return (
    <section id="portfolio" className="py-20 relative overflow-hidden">
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
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveProject(item)}
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
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl my-8 text-right bg-[#140844]/95">
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-5 left-5 p-2 rounded-full glass-panel hover:bg-white/10 text-gray-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

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
                  className="px-5 py-2.5 rounded-full glass-panel text-xs text-gray-300 font-semibold"
                >
                  إغلاق
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
