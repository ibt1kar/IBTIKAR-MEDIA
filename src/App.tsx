import React, { useState } from 'react';
import { PageTab } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { PackagesSection } from './components/PackagesSection';
import { TargetClientsSection } from './components/TargetClientsSection';
import { PortfolioSection } from './components/PortfolioSection';
import { AboutSection } from './components/AboutSection';
import { ClientsGridSection } from './components/ClientsGridSection';
import { FooterSection } from './components/FooterSection';
import { ServiceOrderModal } from './components/ServiceOrderModal';
import { Sparkles, Send, Mail, CreditCard } from 'lucide-react';
import { AGENCY_SOCIALS } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [orderModal, setOrderModal] = useState<{
    isOpen: boolean;
    serviceId?: string;
    packageId?: string;
    packageGroupId?: string;
  }>({
    isOpen: false,
  });

  const handleOpenOrderModal = (serviceId?: string, packageId?: string, packageGroupId?: string) => {
    setOrderModal({
      isOpen: true,
      serviceId,
      packageId,
      packageGroupId,
    });
  };

  const handleCloseOrderModal = () => {
    setOrderModal({ isOpen: false });
  };

  return (
    <div className="min-h-screen text-white font-['Thmanyah_Sans',sans-serif] selection:bg-[#F15230] selection:text-white relative overflow-x-hidden">
      {/* Unified Watercolor Dual-Color Gradient Background (Navy & Orange) */}
      <div className="bg-watercolor" aria-hidden="true" />

      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenOrderModal={handleOpenOrderModal}
      />

      {/* Main Content Areas */}
      <main className="relative z-10">
        {activeTab === 'home' && (
          <>
            <HeroSection
              onOpenOrderModal={() => handleOpenOrderModal()}
              onExploreServices={() => {
                const el = document.getElementById('services');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setActiveTab('services');
              }}
            />
            <ServicesSection onOpenOrderModal={handleOpenOrderModal} />
            <PackagesSection onOpenOrderModal={handleOpenOrderModal} />
            <TargetClientsSection onOpenOrderModal={handleOpenOrderModal} />
            <PortfolioSection onOpenOrderModal={handleOpenOrderModal} />
            <ClientsGridSection onOpenOrderModal={handleOpenOrderModal} />
            <AboutSection onOpenOrderModal={handleOpenOrderModal} />
          </>
        )}

        {activeTab === 'services' && (
          <div className="pt-24 min-h-screen">
            <ServicesSection onOpenOrderModal={handleOpenOrderModal} />
          </div>
        )}

        {activeTab === 'packages' && (
          <div className="pt-24 min-h-screen">
            <PackagesSection onOpenOrderModal={handleOpenOrderModal} />
          </div>
        )}

        {activeTab === 'targets' && (
          <div className="pt-24 min-h-screen">
            <TargetClientsSection onOpenOrderModal={handleOpenOrderModal} />
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="pt-24 min-h-screen">
            <PortfolioSection onOpenOrderModal={handleOpenOrderModal} />
          </div>
        )}

        {activeTab === 'clients' && (
          <div className="pt-24 min-h-screen">
            <ClientsGridSection onOpenOrderModal={handleOpenOrderModal} />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="pt-24 min-h-screen">
            <AboutSection onOpenOrderModal={handleOpenOrderModal} />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-orange text-[#ff7a59] font-bold text-xs">
                <Send className="w-3.5 h-3.5" />
                <span>تواصل مباشر وطلب استشارة</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white">تواصل مع منصة ابتكار</h1>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                نحن هنا لمساعدتك في اختيار الخدمة أو الباقة المناسبة أو صياغة طلب مخصص يناسب أهداف براندك.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* WhatsApp Quick Card */}
              <div className="space-y-4">
                <a
                  href="https://wa.me/966558875818"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-panel p-6 rounded-3xl border border-emerald-500/30 flex items-center justify-between hover:scale-[1.02] transition-transform block group bg-emerald-950/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#25D366]/20 border border-emerald-500/30 p-2 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform overflow-hidden">
                      <img
                        src="/واتس.png"
                        alt="واتساب منصة ابتكار"
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">محادثة واتساب مباشرة (0558875818)</h3>
                      <p className="text-xs text-gray-300">رد سريع وتنسيق فوري للمتطلبات والعقود</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 group-hover:underline">تحدث معنا ←</span>
                </a>

                <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3">
                  <h4 className="text-sm font-bold text-white">معرف الحسابات الرسمية:</h4>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                    <span className="text-gray-300 font-bold">المعرف الموحد بجميع المنصات (Snapchat / TikTok / Instagram):</span>
                    <span className="font-mono text-[#ff7a59] font-bold dir-ltr">@ibt1kar</span>
                  </div>
                </div>
              </div>

              {/* Direct Instant Order Trigger Box */}
              <div className="glass-panel p-8 rounded-3xl border border-[#e85432]/40 bg-[#141144]/60 backdrop-blur-xl space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#e85432]/20 text-[#e85432]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">اطلب باقتك أو خدمتك الآن</h3>
                    <p className="text-xs text-gray-300">اختر من بين باقاتنا وخدماتنا الإبداعية</p>
                  </div>
                </div>

                <p className="text-xs text-gray-200 leading-relaxed">
                  يمكنك ملء نموذج الطلب وتحديد الباقة أو الخدمة المرغوبة أو اختيار "تصميم منفرد / طلب خاص بحسب الاحتياج".
                </p>

                <button
                  onClick={() => handleOpenOrderModal()}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#e85432] to-[#ff7a59] text-white font-bold text-sm shadow-xl shadow-[#e85432]/30 hover:scale-[1.02] transition-transform cursor-pointer flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>افتح نموذج الطلب المباشر</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating WhatsApp Speed Button */}
      <a
        href="https://wa.me/966558875818"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-20 sm:bottom-6 left-6 z-40 p-2 sm:p-2.5 rounded-full bg-[#25D366] text-white shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-transform duration-300 flex items-center gap-2 group cursor-pointer border-2 border-white/20"
        title="تواصل معنا عبر الواتساب"
      >
        <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center overflow-hidden">
          <img
            src="/whatsapp.png"
            alt="واتساب ابتكار"
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/واتس.png';
            }}
            referrerPolicy="no-referrer"
          />
        </div>
        <span className="hidden group-hover:inline-block text-xs font-bold pl-2 pr-1">
          واتساب المبيعات
        </span>
      </a>

      {/* Footer Section */}
      <FooterSection
        setActiveTab={setActiveTab}
        onOpenOrderModal={() => handleOpenOrderModal()}
      />

      {/* Service Order Modal */}
      <ServiceOrderModal
        isOpen={orderModal.isOpen}
        onClose={handleCloseOrderModal}
        initialServiceId={orderModal.serviceId}
        initialPackageId={orderModal.packageId}
        initialPackageGroupId={orderModal.packageGroupId}
      />
    </div>
  );
}
