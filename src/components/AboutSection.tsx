import React from 'react';
import { Logo } from './Logo';
import { ShieldCheck, Flame, Users, Sparkles, Target, Zap } from 'lucide-react';

interface AboutSectionProps {
  onOpenOrderModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenOrderModal }) => {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Glass Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="glass-panel p-8 rounded-3xl border border-white/15 bg-[#140844]/90 shadow-2xl relative space-y-6">
              <div className="flex items-center justify-center py-4 bg-white/5 rounded-2xl border border-white/10">
                <Logo size="lg" />
              </div>

              <div className="space-y-3 text-right">
                <h3 className="text-xl font-black text-white">رؤية منصة ابتكار</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  أن نكون الوكالة الإعلامية والإبداعية الأولى والشريك الاستراتيجي الأكثر موثوقية لتنمية العلامات التجارية والمؤسسات في المملكة والخليج.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="glass-panel p-3 rounded-2xl text-center border border-white/10">
                  <div className="text-xl font-black text-[#e85432]">100%</div>
                  <div className="text-[11px] text-gray-300">التزام وبناء مستدام</div>
                </div>
                <div className="glass-panel p-3 rounded-2xl text-center border border-white/10">
                  <div className="text-xl font-black text-[#e85432]">24/7</div>
                  <div className="text-[11px] text-gray-300">متابعة وحلول مرنة</div>
                </div>
              </div>
            </div>
          </div>

          {/* Text & Philosophy */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-orange text-[#ff7a59] font-bold text-xs">
              <Flame className="w-3.5 h-3.5 text-[#e85432]" />
              <span>من نحن وماذا نقدّم؟</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              هويات تقود السوق.. وحلول إبداعية متكاملة
            </h2>

            <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
              نحن في "ابتكار" شريكك الإبداعي الأول لتحويل الأفكار والبيانات إلى واجهة احترافية لا تُنافس. من تصميم الهويات البصرية المذهلة وصناعة المحتوى المؤثر، مروراً بإدارة منصات التواصل الاجتماعي باحترافية، وحتى العروض التقديمية والبروفايلات التي تخطف الأنظار؛ نمنحك كل ما تحتاجه ليبرز مشروعك بقوة وثبات بين المنافسين.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[#e85432] font-bold text-sm">
                  <Zap className="w-4 h-4" />
                  <span>عقود شهرية مستدامة</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  نعمل كفريق تسويق وتصميم داخلي مخصص لمشروعك يضمن لك الاستمرارية دون انقطاع.
                </p>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[#e85432] font-bold text-sm">
                  <Target className="w-4 h-4" />
                  <span>حلول بصرية شامِلة</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  من الشعار، المحتوى، تصوير المنتجات، وحتى الحملات الممولة ونصوص المبيعات.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenOrderModal}
                className="py-3.5 px-8 rounded-full bg-[#e85432] hover:bg-[#ff6b4a] text-white font-bold text-sm shadow-xl shadow-[#e85432]/30 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>ابدأ رحلة النمو مع منصة ابتكار</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
