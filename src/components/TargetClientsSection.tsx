import React, { useState } from 'react';
import { TARGET_CLIENTS_DATA } from '../data/mockData';
import { TargetClient } from '../types';
import {
  Building2,
  Sparkles,
  UtensilsCrossed,
  Coffee,
  Stethoscope,
  ShoppingBag,
  Home,
  Briefcase,
  Award,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

interface TargetClientsSectionProps {
  onOpenOrderModal: () => void;
}

export const TargetClientsSection: React.FC<TargetClientsSectionProps> = ({ onOpenOrderModal }) => {
  const [activeClient, setActiveClient] = useState<TargetClient | null>(TARGET_CLIENTS_DATA[0]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return Building2;
      case 'Sparkles':
        return Sparkles;
      case 'UtensilsCrossed':
        return UtensilsCrossed;
      case 'Coffee':
        return Coffee;
      case 'Stethoscope':
        return Stethoscope;
      case 'ShoppingBag':
        return ShoppingBag;
      case 'Home':
        return Home;
      case 'Briefcase':
        return Briefcase;
      case 'Award':
        return Award;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="targets" className="py-20 relative overflow-hidden border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center space-y-4 mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-orange text-[#ff7a59] font-bold text-xs">
            <Award className="w-3.5 h-3.5" />
            <span>شركاء النجاح والقطاعات المستهدفة</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight space-y-1">
            <span className="block">حلول تسويقية مخصصة</span>
            <span className="block">لــكــــل قطــــــاع تجــــــاري</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            نصمم الاستراتيجية التي تناسب طبيعة جمهورك ونشاطك التجاري لتحقيق أقصى درجات النمو والانتشار.
          </p>
        </div>

        {/* Grid Cards for All 9 Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TARGET_CLIENTS_DATA.map((client) => {
            const IconComponent = getIcon(client.iconName);
            const isSelected = activeClient?.id === client.id;
            return (
              <div
                key={client.id}
                onClick={() => setActiveClient(client)}
                className={`glass-panel p-6 rounded-3xl cursor-pointer transition-all duration-300 border relative group ${
                  isSelected
                    ? 'border-[#e85432] bg-white/10 shadow-2xl shadow-[#e85432]/20 scale-[1.02]'
                    : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3.5 rounded-2xl transition-colors ${
                      isSelected
                        ? 'bg-[#e85432] text-white shadow-lg shadow-[#e85432]/40'
                        : 'glass-panel-orange text-[#e85432] group-hover:bg-[#e85432] group-hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-[#ff7a59] px-2.5 py-1 rounded-full glass-panel">
                    حلول مخصصة
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{client.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  {client.description}
                </p>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#ff7a59]">
                  <span>عرض استراتيجية القطاع</span>
                  <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Sector Strategy Showcase Box */}
        {activeClient && (
          <div className="mt-12 glass-panel p-8 rounded-3xl border border-[#e85432]/40 bg-[#140844]/95 shadow-2xl animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-[#e85432]"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ff7a59] px-3 py-1 rounded-full glass-panel-orange">
                  <span>خطة العمل المقترحة لقطاع:</span>
                  <strong>{activeClient.title}</strong>
                </div>

                <h3 className="text-2xl font-black text-white">
                  كيف ننمي نشاطك في {activeClient.title}؟
                </h3>

                <p className="text-sm text-gray-200 leading-relaxed">
                  <strong>المنهجية:</strong> {activeClient.growthStrategy}
                </p>

                <div>
                  <h4 className="text-xs font-bold text-gray-300 mb-2">أبرز الخدمات الموصى بها لهذا القطاع:</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeClient.topServices.map((srv, idx) => (
                      <span key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-panel text-xs text-white border border-white/10">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#e85432]" />
                        <span>{srv}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 glass-panel rounded-2xl border border-white/10 text-center gap-4">
                <p className="text-xs text-gray-300">
                  هل تمتلك براند أو مشروع في مجال <strong>{activeClient.title}</strong>؟
                </p>
                <button
                  onClick={onOpenOrderModal}
                  className="w-full py-3.5 px-6 rounded-full bg-[#e85432] hover:bg-[#ff6b4a] text-white font-bold text-xs shadow-xl shadow-[#e85432]/30 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>احصل على استشارة وباقة مخصصة</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
