import React, { useState } from 'react';
import { TARGET_CLIENTS_DATA, AGENCY_SOCIALS } from '../data/mockData';
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
  CheckCircle2,
  MoonStar,
  Utensils,
  Bus,
  HardHat,
  Truck,
  Hotel,
  Wrench,
  UserCheck,
  ConciergeBell,
  Video,
} from 'lucide-react';

interface TargetClientsSectionProps {
  onOpenOrderModal: () => void;
}

export const TargetClientsSection: React.FC<TargetClientsSectionProps> = ({ onOpenOrderModal }) => {
  const [activeClient, setActiveClient] = useState<TargetClient>(TARGET_CLIENTS_DATA[0]);

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
      case 'MoonStar':
        return MoonStar;
      case 'Utensils':
        return Utensils;
      case 'Bus':
        return Bus;
      case 'HardHat':
        return HardHat;
      case 'Truck':
        return Truck;
      case 'Hotel':
        return Hotel;
      case 'Wrench':
        return Wrench;
      case 'UserCheck':
        return UserCheck;
      case 'ConciergeBell':
        return ConciergeBell;
      case 'Video':
        return Video;
      default:
        return Sparkles;
    }
  };

  const ActiveIcon = getIcon(activeClient.iconName);

  return (
    <section id="targets" className="ib-sec">
      <div className="ib-container">
        {/* Start-Aligned Section Header */}
        <div className="space-y-4 mb-12 text-right">
          <div className="ib-eyebrow ib-chip">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4A3C]" />
            <span>شركاء النجاح والقطاعات المستهدفة</span>
          </div>
          <h2 className="ib-h2">
            حلول تسويقية مخصصة لــكــــل قطــــــاع تجــــــاري
          </h2>
          <p className="ib-sub">
            نصمم الاستراتيجية التي تناسب طبيعة جمهورك ونشاطك التجاري لتحقيق أقصى درجات النمو والانتشار.
          </p>
        </div>

        {/* Master-Detail Split Layout (4fr / 8fr) */}
        <div className="ib-split">
          {/* Right Panel (Start in RTL): Scrollable list of ALL sectors */}
          <div className="ib-glass rounded-[30px] p-3">
            <div className="ib-scroll-y max-h-[560px] divide-y divide-white/5 pl-1">
              {TARGET_CLIENTS_DATA.map((client) => {
                const IconComponent = getIcon(client.iconName);
                const isSelected = activeClient.id === client.id;
                return (
                  <button
                    key={client.id}
                    type="button"
                    onClick={() => setActiveClient(client)}
                    className={`ib-row ${isSelected ? 'is-active' : ''}`}
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <IconComponent
                        className={`w-4 h-4 shrink-0 ${
                          isSelected ? 'text-[#EF4A3C]' : 'text-[#9A9CC8]'
                        }`}
                      />
                      <span className="truncate">{client.title}</span>
                    </span>
                    <span className="dot" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Left Panel (End in RTL): Sector Strategy Detail Glass Card */}
          <div className="ib-glass rounded-[32px] p-[clamp(28px,4vw,48px)] flex flex-col justify-between gap-8 text-right">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#ffb3aa]">
                  <ActiveIcon className="w-5 h-5 text-[#EF4A3C]" />
                  <span>خطة العمل المقترحة لقطاع:</span>
                  <strong className="text-white">{activeClient.title}</strong>
                </div>
                <span className="text-xs font-semibold text-[#9A9CC8]">حلول مخصصة</span>
              </div>

              <h3
                className="font-bold text-white leading-[1.2]"
                style={{ fontSize: 'clamp(28px, 3.2vw, 46px)' }}
              >
                {activeClient.title}
              </h3>

              <p className="text-base sm:text-lg text-[#C9CBEA] leading-[1.9]">
                {activeClient.description}
              </p>

              <div className="pt-6 border-t border-white/10 space-y-3">
                <h4 className="text-lg sm:text-xl font-bold text-white">
                  كيف ننمي نشاطك في {activeClient.title}؟
                </h4>
                <p className="text-sm sm:text-base text-[#C9CBEA] leading-[1.9]">
                  <strong className="text-[#ffb3aa]">المنهجية:</strong> {activeClient.growthStrategy}
                </p>
              </div>

              <div className="pt-2 space-y-3">
                <h4 className="text-xs sm:text-sm font-bold text-[#9A9CC8]">
                  أبرز الخدمات الموصى بها لهذا القطاع:
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {activeClient.topServices.map((srv, idx) => (
                    <span
                      key={idx}
                      className="ib-chip inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#ffb3aa]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#EF4A3C] shrink-0" />
                      <span>{srv}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Prompt & 2 Action Buttons */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <p className="text-xs sm:text-sm text-[#9A9CC8]">
                هل تمتلك براند أو مشروع في مجال <strong className="text-white">{activeClient.title}</strong>؟
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenOrderModal}
                  className="ib-btn ib-btn-coral"
                >
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>احصل على استشارة وباقة مخصصة</span>
                </button>

                <a
                  href={`https://wa.me/966593363878?text=${encodeURIComponent(
                    `مرحباً ابتكار، أرغب باستشارة مخصصة لقطاع: ${activeClient.title}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="ib-btn ib-glass text-white hover:border-[#EF4A3C]"
                >
                  <span>استشارة مباشرة ({AGENCY_SOCIALS.phone})</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
