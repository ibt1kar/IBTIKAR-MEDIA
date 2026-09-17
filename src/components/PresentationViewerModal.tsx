import React, { useEffect, useRef, useState } from 'react';
import { PortfolioItem } from '../types';
import { 
  X, 
  Sparkles, 
  ArrowUp, 
  ArrowRight,
  Layers, 
  FolderOpen, 
  CheckCircle, 
  MessageCircle,
  Maximize2,
  Minimize2,
  ChevronDown
} from 'lucide-react';
import { AGENCY_SOCIALS } from '../data/mockData';

interface PresentationViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrderModal: () => void;
  project: PortfolioItem;
}

export const PresentationViewerModal: React.FC<PresentationViewerModalProps> = ({
  isOpen,
  onClose,
  onOpenOrderModal,
  project,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const slides = project.images && project.images.length > 0 ? project.images : [project.image];
  const isSocialMedia = project.category === 'تصاميم سوشال ميديا';
  const isCarousel = project.category === 'تصاميم كاروسيل' || project.title.includes('كاروسيل') || project.tags?.includes('تصاميم كاروسيل');
  const itemTypeSingular = isCarousel ? 'شريحة كاروسيل' : isSocialMedia ? 'تصميم' : 'شريحة';
  const itemTypePlural = isCarousel ? 'شرائح كاروسيل' : isSocialMedia ? 'تصاميم' : 'شرائح';

  // Reset state when project changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setLoadedImages({});
      setCurrentSlideIndex(1);
    }
  }, [isOpen, project.id]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Track scroll position to update current slide counter
  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const slideElements = container.querySelectorAll('[data-slide-index]');
    
    let activeIndex = 1;
    const containerTop = container.scrollTop;
    const containerCenter = containerTop + container.clientHeight / 3;

    slideElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      if (htmlEl.offsetTop <= containerCenter) {
        const idx = parseInt(htmlEl.getAttribute('data-slide-index') || '1', 10);
        activeIndex = idx;
      }
    });

    setCurrentSlideIndex(activeIndex);
  };

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleImageLoad = (idx: number) => {
    setLoadedImages((prev) => ({ ...prev, [idx]: true }));
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl animate-fade-in text-right"
      dir="rtl"
    >
      {/* Container wrapper */}
      <div 
        className={`relative flex flex-col bg-[#0c0926] border border-white/15 overflow-hidden transition-all duration-300 ${
          isFullscreen 
            ? 'w-full h-full rounded-none border-none' 
            : 'w-[96vw] max-w-5xl h-[92vh] rounded-3xl shadow-2xl shadow-black/80'
        }`}
      >
        {/* Top Control Bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-3 sm:px-6 py-3.5 bg-[#141144]/95 backdrop-blur-2xl border-b border-white/10 shrink-0">
          
          {/* Back Button & Project Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Main Back Button */}
            <button
              onClick={onClose}
              className="px-3 sm:px-4 py-2 rounded-xl bg-white/10 hover:bg-[#e85432] text-white text-xs font-bold border border-white/15 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm hover:scale-105"
              title="الرجوع لمعرض الأعمال"
            >
              <ArrowRight className="w-4 h-4" />
              <span>رجوع</span>
            </button>

            <div className="p-2 rounded-xl bg-[#e85432]/15 border border-[#e85432]/30 text-[#ff7a59] shrink-0 hidden sm:flex">
              <FolderOpen className="w-4 h-4" />
            </div>
            
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-[#e85432]/20 text-[#ff7a59] border border-[#e85432]/30">
                  {isSocialMedia ? 'ألبوم تصاميم سوشال ميديا' : 'مجلد عرض تقديمي'}
                </span>
                <span className="text-xs text-gray-300 font-medium hidden md:inline-block">
                  {slides.length} {itemTypeSingular} عالي الدقة
                </span>
              </div>
              <h2 className="text-xs sm:text-base font-black text-white truncate mt-0.5">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Slide tracker badge */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300">
              <Layers className="w-3.5 h-3.5 text-[#ff7a59]" />
              <span>{isSocialMedia ? 'التصميم' : 'الشريحة'} {currentSlideIndex} من {slides.length}</span>
            </div>

            {/* Order CTA Button */}
            <button
              onClick={() => {
                onClose();
                onOpenOrderModal();
              }}
              className="px-2.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#e85432] to-[#ff7a59] text-white text-[11px] sm:text-xs font-bold shadow-md hover:shadow-[#e85432]/40 hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isSocialMedia ? 'اطلب تصاميمك المخصصة' : 'اطلب عرضك التقديمي'}</span>
              <span className="sm:hidden">{isSocialMedia ? 'طلب تصاميم' : 'طلب عرض'}</span>
            </button>

            {/* Fullscreen Toggle Button */}
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? "تصغير النافذة" : "ملء الشاشة"}
              className="p-2 rounded-xl glass-panel hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer hidden sm:block"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close / Return Button */}
            <button
              onClick={onClose}
              title="إغلاق والرجوع"
              className="p-2 rounded-xl bg-white/10 hover:bg-red-500/20 text-gray-300 hover:text-red-400 border border-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

        </header>

        {/* Scroll Instruction Ribbon */}
        <div className="bg-[#140844]/60 border-b border-white/5 px-4 py-2 flex items-center justify-between text-[11px] sm:text-xs text-gray-300 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>تصفح {isSocialMedia ? 'معرض التصاميم' : 'العرض التقديمي'} بالتمرير الرأسي المستمر من الأعلى إلى الأسفل</span>
          </div>
          <div className="flex items-center gap-1 text-[#ff7a59] font-bold">
            <span>مرر لأسفل</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </div>

        {/* Main Presentation Scroll Stage */}
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-6 space-y-4 sm:space-y-6 scroll-smooth bg-gradient-to-b from-[#0e0a30] via-[#090620] to-[#0c0926]"
        >
          {slides.map((slideUrl, idx) => {
            const slideNumber = idx + 1;
            const isLoaded = loadedImages[idx];

            return (
              <div
                key={idx}
                data-slide-index={slideNumber}
                className="relative mx-auto max-w-4xl rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl shadow-black/50 group"
              >
                {/* Slide Number Tag */}
                <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white font-mono text-xs font-bold flex items-center gap-1.5 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e85432]"></span>
                  <span>{isCarousel ? 'شريحة كاروسيل' : isSocialMedia ? 'تصميم' : 'الشريحة'} {slideNumber} / {slides.length}</span>
                </div>

                {/* Loading skeleton placeholder */}
                {!isLoaded && (
                  <div className="w-full aspect-[16/10] bg-white/5 animate-pulse flex items-center justify-center">
                    <div className="text-center space-y-2 text-gray-400 text-xs">
                      <div className="w-8 h-8 rounded-full border-2 border-[#e85432] border-t-transparent animate-spin mx-auto"></div>
                      <span>جاري تحميل {isCarousel ? 'شريحة الكاروسيل' : isSocialMedia ? 'التصميم' : 'الشريحة'} {slideNumber}...</span>
                    </div>
                  </div>
                )}

                {/* Presentation Image */}
                <img
                  src={slideUrl}
                  alt={`${project.title} ${slideNumber} - منصة ابتكار`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onLoad={() => handleImageLoad(idx)}
                  className={`w-full h-auto object-contain block transition-opacity duration-300 ${
                    isLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  }`}
                  onError={(e) => {
                    handleImageLoad(idx);
                    const encoded = encodeURI(slideUrl);
                    if ((e.currentTarget as HTMLImageElement).src !== encoded) {
                      (e.currentTarget as HTMLImageElement).src = encoded;
                    }
                  }}
                />
              </div>
            );
          })}

          {/* End of Presentation Deck Showcase Card */}
          <div className="mx-auto max-w-4xl glass-panel p-6 sm:p-10 rounded-3xl border border-white/15 bg-gradient-to-br from-[#141144]/90 via-[#270f6d]/60 to-[#141144]/90 text-center space-y-6 my-10 shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-[#e85432] to-[#ff7a59] flex items-center justify-center text-white shadow-xl shadow-[#e85432]/40">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-bold text-[#ff7a59] uppercase tracking-wider">
                نهاية {isCarousel ? 'سلسلة تصاميم الكاروسيل التفاعلية' : isSocialMedia ? 'معرض تصاميم السوشال ميديا' : 'شرائح العرض التقديمي'}
              </span>
              <h3 className="text-xl sm:text-3xl font-black text-white leading-tight">
                {isCarousel
                  ? 'هل ترغب بتصاميم كاروسيل تفاعلية تضاعف تفاعل وحفظ منشوراتك؟'
                  : isSocialMedia 
                  ? 'هل ترغب بتصاميم سوشال ميديا مبتكرة تضاعف تفاعلك ومبيعاتك؟'
                  : 'هل ترغب بتصميم عرض تقديمي يبهر عملاءك ومستثمريك؟'
                }
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {isCarousel
                  ? 'في منصة ابتكار، نصمم منشورات كاروسيل متسلسلة وجذابة بصرياً لمنصات (LinkedIn و Instagram) تعزز السرد القصصي التعليمي والتسويقي وتزيد معدل الحفظ والمشاركة.'
                  : isSocialMedia
                  ? 'في منصة ابتكار، نبتكر ونصمم بوستات، بنرات إعلانية، ستوريات، وهوية رقمية متناسقة للمنصات (إنستغرام، سناب شات، إكس، تيك توك) لتحقيق أعلى تفاعل وجذب لعلامتك التجارية.'
                  : 'في منصة ابتكار، نقوم بإعداد وصياغة وتصميم بروفايلات الشركات والعروض التقديمية (Pitch Decks & Presentations) بأعلى مواصفات السرد البصري والإقناع.'
                }
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenOrderModal();
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#e85432] to-[#ff7a59] text-white font-bold text-sm shadow-xl shadow-[#e85432]/35 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isSocialMedia ? 'اطلب باقة تصاميم السوشال ميديا' : 'اطلب عرضك التقديمي الخاص'}</span>
              </button>

              <a
                href={`${AGENCY_SOCIALS.whatsapp}${
                  isSocialMedia
                    ? 'مرحباً منصة ابتكار، اطلعت على نماذج تصاميم السوشال ميديا في معرض الأعمال وأرغب في طلب تصاميم مخصصة لعلامتي التجارية.'
                    : 'مرحباً منصة ابتكار، اطلعت على نموذج العرض التقديمي في معرض الأعمال وأرغب في طلب تصميم عرض تقديمي مخصص.'
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>تواصل واتساب للاستفسار</span>
              </a>

              {/* Back to Portfolio CTA */}
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/15 transition-all cursor-pointer hover:scale-105"
              >
                <ArrowRight className="w-4 h-4" />
                <span>الرجوع لمعرض الأعمال</span>
              </button>

              <button
                onClick={scrollToTop}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl glass-panel text-gray-300 hover:text-white hover:bg-white/10 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowUp className="w-4 h-4" />
                <span>العودة للأعلى</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Bottom Quick Navigator Bar */}
        <footer className="px-4 py-2.5 bg-[#141144]/95 backdrop-blur-2xl border-t border-white/10 flex items-center justify-between text-xs text-gray-300 shrink-0">
          <div className="flex items-center gap-2">
            {/* Back Button in Footer */}
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#e85432] text-white flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer border border-white/15 hover:scale-105"
              title="الرجوع لمعرض الأعمال"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>رجوع</span>
            </button>

            <span className="text-gray-400 hidden sm:inline">|</span>
            <span className="font-bold text-white hidden sm:inline">{isSocialMedia ? 'معرض التصاميم:' : 'العرض التقديمي:'}</span>
            <span className="text-[#ff7a59] font-bold">{slides.length} {itemTypePlural}</span>
            <span className="text-gray-400 hidden md:inline">|</span>
            <span className="text-gray-400 hidden md:inline">مرر بحرية بين كافة الصفحات</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={scrollToTop}
              className="p-1.5 sm:px-3 sm:py-1 rounded-lg glass-panel hover:bg-white/10 text-gray-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              title="العودة لأول شريحة"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px] font-semibold">للأعلى</span>
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
};
