import React from 'react';
import { Logo } from './Logo';
import { Sparkles, Target, Zap } from 'lucide-react';

interface AboutSectionProps {
  onOpenOrderModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenOrderModal }) => {
  return (
    <section id="about" className="ib-sec">
      <div className="ib-container">
        <div className="ib-two">
          {/* First Column (Start in RTL): Coral Glass Vision Card */}
          <div className="ib-glass-coral rounded-[32px] p-[clamp(28px,4vw,44px)] flex flex-col justify-between gap-8 text-right">
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <Logo size="lg" />
              </div>

              <div className="space-y-3 pt-2">
                <span className="text-sm font-bold text-[#ffb3aa] block">رؤية منصة ابتكار</span>
                <p
                  className="font-bold text-white leading-[1.5]"
                  style={{ fontSize: 'clamp(22px, 2.7vw, 34px)' }}
                >
                  أن نكون الوكالة الإعلامية والإبداعية الأولى والشريك الاستراتيجي الأكثر موثوقية لتنمية العلامات التجارية والمؤسسات في المملكة والخليج.
                </p>
              </div>
            </div>

            {/* Existing 100% / 24/7 Stats (spacing & divider only, no inner boxes) */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/15">
              <div>
                <div className="text-3xl sm:text-4xl font-black text-white" dir="ltr">100%</div>
                <div className="text-xs sm:text-sm text-[#C9CBEA] mt-1">التزام وبناء مستدام</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-[#ffb3aa]" dir="ltr">24/7</div>
                <div className="text-xs sm:text-sm text-[#C9CBEA] mt-1">متابعة وحلول مرنة</div>
              </div>
            </div>
          </div>

          {/* Second Column (End in RTL): Glass "من نحن" Card */}
          <div className="ib-glass rounded-[32px] p-[clamp(28px,4vw,44px)] flex flex-col justify-between gap-6 text-right">
            <div className="space-y-5">
              <div className="ib-eyebrow ib-chip">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF4A3C]" />
                <span>من نحن وماذا نقدّم؟</span>
              </div>

              <h2 className="ib-h2">
                هويات تقود السوق.. وحلول إبداعية متكاملة
              </h2>

              <p className="text-sm sm:text-base text-[#C9CBEA] leading-[1.95]">
                نحن في "ابتكار" شريكك الإبداعي الأول لتحويل الأفكار والبيانات إلى واجهة احترافية لا تُنافس. من تصميم الهويات البصرية المذهلة وصناعة المحتوى المؤثر، مروراً بإدارة منصات التواصل الاجتماعي باحترافية، وحتى العروض التقديمية والبروفايلات التي تخطف الأنظار؛ نمنحك كل ما تحتاجه ليبرز مشروعك بقوة وثبات بين المنافسين.
              </p>
            </div>

            {/* Two Features Side by Side as Plain Text Blocks Without Backgrounds */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5 border-t border-white/10">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#ffb3aa] font-bold text-sm sm:text-base">
                  <Zap className="w-4 h-4 text-[#EF4A3C] shrink-0" />
                  <span>عقود شهرية مستدامة</span>
                </div>
                <p className="text-xs sm:text-sm text-[#9A9CC8] leading-relaxed">
                  نعمل كفريق تسويق وتصميم داخلي مخصص لمشروعك يضمن لك الاستمرارية دون انقطاع.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#ffb3aa] font-bold text-sm sm:text-base">
                  <Target className="w-4 h-4 text-[#EF4A3C] shrink-0" />
                  <span>حلول بصرية شامِلة</span>
                </div>
                <p className="text-xs sm:text-sm text-[#9A9CC8] leading-relaxed">
                  من الشعار، المحتوى، تصوير المنتجات، وحتى الحملات الممولة ونصوص المبيعات.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenOrderModal}
                className="ib-btn ib-btn-coral"
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>ابدأ رحلة النمو مع منصة ابتكار</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
