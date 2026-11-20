import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/mockData';
import { PortfolioItem } from '../types';
import { useModalEffects } from '../hooks/useModalEffects';
import {
  ExternalLink,
  Sparkles,
  X,
  CheckCircle,
  FolderOpen,
  Layers,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { PresentationViewerModal } from './PresentationViewerModal';

interface PortfolioSectionProps {
  onOpenOrderModal: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenOrderModal }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('الكل');
  const [activeProject, setActiveProject] = useState<PortfolioItem | null>(null);
  const [presentationDeckProject, setPresentationDeckProject] = useState<PortfolioItem | null>(null);

  useModalEffects(!!activeProject, () => setActiveProject(null));

  const categories = [
    'الكل',
    'العروض التقديمية',
    'تصاميم سوشال ميديا',
    'إنفوجرافيك',
    'دعوات إلكترونية',
    'شعارات ومخطوطات',
    'هوية بصرية',
    'بروفايل وموشن جرافيك',
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
          if (selectedFilter === 'هوية بصرية') {
            return (
              item.category === 'هوية بصرية' ||
              item.category === 'هوية بصرية وتصوير'
            );
          }
          if (selectedFilter === 'تصاميم سوشال ميديا') {
            return (
              item.category === 'تصاميم سوشال ميديا' ||
              item.category === 'نشر محتوى وتصاميم إعلانات' ||
              item.category === 'محتوى رياضي وتغطيات' ||
              item.category === 'إنفوجرافيك' ||
              item.tags?.includes('تصاميم سوشال ميديا')
            );
          }
          if (selectedFilter === 'إنفوجرافيك') {
            return (
              item.id === 'p-infographics-deck' ||
              item.category === 'إنفوجرافيك' ||
              item.tags?.includes('إنفوجرافيك') ||
              item.title.includes('إنفوجرافيك') ||
              item.title.includes('انفوجرافيك')
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

  const getDeckCountText = (item: PortfolioItem) => {
    const count = item.slideCount || item.images?.length || 6;
    if (item.title.includes('كاروسيل') || item.category === 'تصاميم كاروسيل') {
      return `${count} شرائح كاروسيل`;
    }
    if (
      item.title.includes('إنفوجرافيك') ||
      item.title.includes('انفوجرافيك') ||
      item.category === 'إنفوجرافيك' ||
      item.category === 'تصاميم إنفوجرافيك'
    ) {
      return `${count} تصاميم إنفوجرافيك`;
    }
    if (item.category === 'تصاميم سوشال ميديا') {
      return `${count} تصاميم`;
    }
    if (item.category === 'هوية بصرية وتصوير' || item.category === 'هوية بصرية') {
      return `${count} صفحة ونموذج`;
    }
    return `${count} شريحة`;
  };

  const getDeckBrowseLabel = (item: PortfolioItem) => {
    const count = item.slideCount || item.images?.length || 6;
    const noun =
      item.title.includes('إنفوجرافيك') ||
      item.title.includes('انفوجرافيك') ||
      item.category === 'إنفوجرافيك' ||
      item.category === 'تصاميم إنفوجرافيك'
        ? 'ألبوم الإنفوجرافيك'
        : item.category === 'تصاميم سوشال ميديا'
        ? 'ألبوم التصاميم'
        : item.category === 'هوية بصرية وتصوير' || item.category === 'هوية بصرية'
        ? 'ملف الهوية البصرية'
        : 'العرض التقديمي';
    const unit =
      item.title.includes('إنفوجرافيك') ||
      item.title.includes('انفوجرافيك') ||
      item.category === 'إنفوجرافيك' ||
      item.category === 'تصاميم إنفوجرافيك'
        ? 'تصاميم إنفوجرافيك'
        : item.category === 'تصاميم سوشال ميديا'
        ? 'تصاميم'
        : item.category === 'هوية بصرية وتصوير' || item.category === 'هوية بصرية'
        ? 'صفحة ونموذج'
        : 'شريحة';
    return `تصفح ${noun} بالتمرير (${count} ${unit})`;
  };

  return (
    <section id="portfolio" className="ib-sec">
      <div className="ib-container">
        {/* Start-Aligned Section Header */}
        <div className="space-y-4 mb-10 text-right">
          <div className="ib-eyebrow ib-chip">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4A3C]" />
            <span>قصص نجاح ومشاريع منتقاة</span>
          </div>
          <h2 className="ib-h2">معــــرض أعمـــال ابتكـــــار</h2>
          <p className="ib-sub">
            نماذج من الهويات البصرية، الحملات التسويقية، والمحتوى المرئي الذي صممناه لشركائنا.
          </p>
        </div>

        {/* Filter Category Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10">
          {categories.map((cat) => {
            const isSelected = selectedFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`ib-pill ib-chip ${isSelected ? 'is-active' : ''}`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 3-Column Equal-Height Works Grid */}
        <div className="ib-works-grid">
          {filteredItems.map((item) => {
            const categoryBadge =
              item.title.includes('إنفوجرافيك') || item.title.includes('انفوجرافيك')
                ? 'إنفوجرافيك وبيانات مرئية'
                : item.category;

            return (
              <article
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => handleCardClick(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(item);
                  }
                }}
                className="ib-glass ib-lift p-3 rounded-[28px] flex flex-col h-full cursor-pointer group text-right"
              >
                {/* Media Block: 16/10 aspect ratio, radius 20px */}
                <div className="relative rounded-[20px] aspect-[16/10] overflow-hidden bg-[#0F1030] shrink-0">
                  {item.images && item.images.length > 1 && !item.isPresentationDeck ? (
                    <div className="grid grid-cols-2 h-full w-full gap-0.5">
                      {item.images.map((imgUrl, i) => (
                        <div key={i} className="relative h-full overflow-hidden">
                          <img
                            src={imgUrl}
                            alt={`${item.title} - ${i + 1}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              if (item.id === 'p5') {
                                (e.currentTarget as HTMLImageElement).src =
                                  i === 0 ? '/مخطوطات1.png' : '/مخطوطات2.png';
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
                      className={`w-full h-full object-cover ${
                        item.isPresentationDeck ? 'object-top' : ''
                      } group-hover:scale-105 transition-transform duration-500`}
                      onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement;
                        if (img.dataset.retried) return;
                        img.dataset.retried = '1';
                        if (item.isPresentationDeck) {
                          img.src = encodeURI(item.image);
                        } else if (item.id === 'p1') {
                          img.src = '/متجر الشاطئ-1.png';
                        } else if (item.id === 'p2') {
                          img.src = '/روز باتشولي.jfif';
                        } else if (item.id === 'p3') {
                          img.src = '/رسن الخيل.png';
                        } else if (item.id === 'p4') {
                          img.src = '/ستوريات.png';
                        } else if (item.id === 'p6') {
                          img.src = '/دعوات.png';
                        } else if (item.id === 'p8') {
                          img.src = '/بروفايل.png';
                        } else if (item.id === 'p10') {
                          img.src = '/سوشال.png';
                        }
                      }}
                    />
                  )}

                  {/* Top-start category chip */}
                  <span className="ib-chip absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white z-10">
                    {categoryBadge}
                  </span>

                  {/* Folder / Slide Count chip for presentation decks */}
                  {item.isPresentationDeck && (
                    <span className="ib-chip absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold text-[#ffb3aa] inline-flex items-center gap-1 z-10">
                      <Layers className="w-3 h-3 text-[#EF4A3C]" />
                      <span>{getDeckCountText(item)}</span>
                    </span>
                  )}

                  {!item.isPresentationDeck && item.images && item.images.length > 1 && (
                    <span className="ib-chip absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold text-white z-10">
                      2 نماذج
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-3 pt-4 flex flex-col flex-1 gap-2.5">
                  <span className="text-xs font-bold text-[#ffb3aa]">{item.clientName}</span>

                  <h3 className="text-[20px] font-bold text-white group-hover:text-[#EF4A3C] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-[15px] text-[#C9CBEA] leading-[1.8] flex-1 line-clamp-3">
                    {item.description}
                  </p>

                  {/* Result line with small coral dot (no inner box) */}
                  {item.results && (
                    <div className="flex items-start gap-2 pt-2 text-xs text-[#C9CBEA] leading-relaxed">
                      <span className="w-2 h-2 rounded-full bg-[#EF4A3C] shrink-0 mt-1.5" />
                      <span>
                        <strong className="text-white">
                          {item.isPresentationDeck ? 'الميزة:' : 'النتيجة:'}
                        </strong>{' '}
                        {item.results}
                      </span>
                    </div>
                  )}

                  {/* Hashtags as tiny muted chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="ib-chip text-[11px] px-2.5 py-0.5 rounded-full text-[#9A9CC8]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Card Action Hint */}
                  <div className="pt-3 mt-1 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#EF4A3C]">
                    {item.isPresentationDeck ? (
                      <>
                        <span className="inline-flex items-center gap-1.5">
                          <FolderOpen className="w-4 h-4 shrink-0" />
                          <span>{getDeckBrowseLabel(item)}</span>
                        </span>
                        <ArrowLeft className="w-4 h-4 shrink-0" />
                      </>
                    ) : (
                      <>
                        <span>استعرض التفاصيل</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </>
                    )}
                  </div>
                </div>
              </article>
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
        <div
          className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative w-full max-w-2xl glass-panel glass-modal rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setActiveProject(null)}
                className="ib-chip min-h-[44px] px-4 py-2 rounded-full text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:border-[#EF4A3C]"
                title="رجوع لمعرض الأعمال"
              >
                <ArrowRight className="w-4 h-4" />
                <span>رجوع</span>
              </button>
              <button
                onClick={() => setActiveProject(null)}
                aria-label="إغلاق"
                className="ib-chip min-h-[44px] min-w-[44px] p-2 rounded-full text-gray-300 hover:text-white hover:border-[#EF4A3C] flex items-center justify-center cursor-pointer"
                title="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {activeProject.images && activeProject.images.length > 1 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeProject.images.map((imgUrl, idx) => (
                    <div key={idx} className="rounded-[20px] overflow-hidden h-56 sm:h-64 relative bg-black/40">
                      <img
                        src={imgUrl}
                        alt={`${activeProject.title} ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          if (activeProject.id === 'p5') {
                            (e.currentTarget as HTMLImageElement).src =
                              idx === 0 ? '/مخطوطات1.png' : '/مخطوطات2.png';
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-[20px] overflow-hidden h-64 relative bg-black/40">
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
                <span className="text-xs font-bold text-[#ffb3aa] block mb-1">{activeProject.clientName}</span>
                <h3 className="text-2xl font-black text-white">{activeProject.title}</h3>
              </div>

              <p className="text-sm sm:text-base text-[#C9CBEA] leading-[1.9]">
                {activeProject.description}
              </p>

              {activeProject.results && (
                <div className="pt-4 border-t border-white/10 text-emerald-300 flex items-start gap-3 text-sm">
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>
                    <strong>الأثر والنمو المتحقق:</strong> {activeProject.results}
                  </span>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => setActiveProject(null)}
                  className="ib-btn ib-chip !min-h-[44px] !py-2 !px-5 !text-xs text-white"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>رجوع</span>
                </button>
                <button
                  onClick={() => {
                    setActiveProject(null);
                    onOpenOrderModal();
                  }}
                  className="ib-btn ib-btn-coral !min-h-[44px] !py-2.5 !px-6 !text-xs"
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
