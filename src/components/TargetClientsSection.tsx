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
    <section id="targets" className="py-20 relative overflow-hidden bg-transparent border-y border-[var(--card-border)]/20">
      {/* Glow Orbs */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[var(--accent-coral)]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center space-y-4 mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--card-border)] bg-[rgba(22,24,69,0.7)] backdrop-blur-md text-[var(--accent-coral)] font-bold text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-coral)]"></span>
            <Award className="w-3.5 h-3.5" />
            <span>شركاء النجاح والقطاعات المستهدفة</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight space-y-1">
            <span className="block">حلول تسويقية مخصصة</span>
            <span className="block">لــكــــل قطــــــاع تجــــــاري</span>
          </h2>
          <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed">
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
                    ? 'border-[var(--accent-coral)] bg-white/10 shadow-2xl shadow-[var(--accent-coral)]/20 scale-[1.02]'
                    : 'border-[var(--card-border)] hover:border-white/20 hover:bg-white/5'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3.5 rounded-2xl transition-colors ${
                      isSelected
                        ? 'bg-[var(--accent-coral)] text-white shadow-lg shadow-[var(--accent-coral)]/40'
                        : 'glass-panel-orange text-[var(--accent-coral)] group-hover:bg-[var(--accent-coral)] group-hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-[var(--accent-coral)] px-2.5 py-1 rounded-full glass-panel border border-[var(--card-border)]">
                    حلول مخصصة
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{client.title}</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                  {client.description}
                </p>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[var(--accent-coral)]">
                  <span>عرض استراتيجية القطاع</span>
                  <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Sector Strategy Showcase Box */}
        {activeClient && (
          <div className="mt-12 glass-panel p-8 rounded-3xl border border-[var(--card-border)] shadow-2xl animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-[var(--accent-coral)]"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[var(--accent-coral)] px-3 py-1 rounded-full glass-panel-orange border border-[var(--card-border)]">
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
                  <h4 className="text-xs font-bold text-[var(--text-muted)] mb-2">أبرز الخدمات الموصى بها لهذا القطاع:</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeClient.topServices.map((srv, idx) => (
                      <span key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-panel text-xs text-white border border-[var(--card-border)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-coral)]" />
                        <span>{srv}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 glass-panel rounded-2xl border border-[var(--card-border)] text-center gap-4">
                <p className="text-xs text-[var(--text-muted)]">
                  هل تمتلك براند أو مشروع في مجال <strong>{activeClient.title}</strong>؟
                </p>
                <button
                  onClick={onOpenOrderModal}
                  className="w-full py-3.5 px-6 rounded-full bg-[var(--accent-coral)] hover:bg-[#f15e52] text-white font-bold text-xs shadow-xl shadow-[var(--accent-coral)]/30 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
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
