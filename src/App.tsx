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
import { AuthModal } from './components/AuthModal';
import { AccountModal } from './components/AccountModal';
import { AnimatedBackground } from './components/AnimatedBackground';
import { AuthProvider } from './context/AuthContext';
import { Sparkles, Send, CreditCard } from 'lucide-react';

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
    <AuthProvider>
      <div className="ib-page min-h-screen font-['Thmanyah_Sans',sans-serif] selection:bg-[#EF4A3C] selection:text-[#070718]">
        {/* Ambient Radial Glows & Fading 72px Grid */}
        <AnimatedBackground />

        {/* Floating Glass Pill Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenOrderModal={handleOpenOrderModal}
        />

        {/* Foreground Content Wrapper */}
        <div className="ib-content">
          <main>
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

                {/* Final CTA Section */}
                <section className="ib-sec">
                  <div className="ib-container">
                    <div className="ib-glass-coral rounded-[40px] p-[clamp(36px,6vw,76px)] text-center space-y-6">
                      <h2
                        className="font-bold text-white leading-[1.15] max-w-4xl mx-auto"
                        style={{ fontSize: 'clamp(32px, 5vw, 68px)' }}
                      >
                        هل ترغب بأن تكون علامتك التجارية شريك نجاحنا القادم؟
                      </h2>
                      <p className="text-base sm:text-lg text-[#C9CBEA] max-w-2xl mx-auto leading-[1.95]">
                        انضم إلى قائمة شركائنا المتميزين واحصل على باقة متكاملة لإدارة ونمو هويتك الرقمية.
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                        <button
                          onClick={() => handleOpenOrderModal()}
                          className="ib-btn ib-btn-coral"
                        >
                          <Sparkles className="w-5 h-5 shrink-0" />
                          <span>انضم لشركاء النجاح</span>
                        </button>
                        <a
                          href="https://wa.me/966593363878"
                          target="_blank"
                          rel="noreferrer"
                          className="ib-btn ib-glass text-white hover:border-[#EF4A3C]"
                        >
                          <span>استشارة مباشرة</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}

            {activeTab === 'services' && (
              <div className="pt-16 min-h-screen">
                <ServicesSection onOpenOrderModal={handleOpenOrderModal} />
              </div>
            )}

            {activeTab === 'packages' && (
              <div className="pt-16 min-h-screen">
                <PackagesSection onOpenOrderModal={handleOpenOrderModal} />
              </div>
            )}

            {activeTab === 'targets' && (
              <div className="pt-16 min-h-screen">
                <TargetClientsSection onOpenOrderModal={handleOpenOrderModal} />
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div className="pt-16 min-h-screen">
                <PortfolioSection onOpenOrderModal={handleOpenOrderModal} />
              </div>
            )}

            {activeTab === 'clients' && (
              <div className="pt-16 min-h-screen">
                <ClientsGridSection onOpenOrderModal={handleOpenOrderModal} />
              </div>
            )}

            {activeTab === 'about' && (
              <div className="pt-16 min-h-screen">
                <AboutSection onOpenOrderModal={handleOpenOrderModal} />
              </div>
            )}

            {activeTab === 'contact' && (
              <section className="ib-sec pt-32 pb-12">
                <div className="ib-container space-y-12">
                  <div className="space-y-4 text-right">
                    <div className="ib-eyebrow ib-chip">
                      <Send className="w-3.5 h-3.5 text-[#EF4A3C]" />
                      <span>تواصل مباشر وطلب استشارة</span>
                    </div>
                    <h1 className="ib-h2">تواصل مع منصة ابتكار</h1>
                    <p className="ib-sub">
                      نحن هنا لمساعدتك في اختيار الخدمة أو الباقة المناسبة أو صياغة طلب مخصص يناسب أهداف براندك.
                    </p>
                  </div>

                  <div className="ib-two items-start">
                    {/* WhatsApp Quick Card */}
                    <div className="space-y-5">
                      <a
                        href="https://wa.me/966593363878"
                        target="_blank"
                        rel="noreferrer"
                        className="ib-glass ib-lift p-6 sm:p-8 rounded-[30px] flex items-center justify-between gap-4 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 flex items-center justify-center shrink-0">
                            <img
                              src="/واتس.png"
                              alt="واتساب منصة ابتكار"
                              className="w-full h-full object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white">محادثة واتساب مباشرة (0593363878)</h3>
                            <p className="text-xs sm:text-sm text-[#C9CBEA] mt-1">
                              رد سريع وتنسيق فوري للمتطلبات والعقود
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-400 group-hover:underline shrink-0">
                          تحدث معنا ←
                        </span>
                      </a>

                      <div className="ib-glass p-6 sm:p-8 rounded-[30px] space-y-3 text-right">
                        <h4 className="text-sm font-bold text-white">معرف الحسابات الرسمية:</h4>
                        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                          <span className="text-[#C9CBEA] font-semibold">
                            المعرف الموحد بجميع المنصات (Snapchat / TikTok / Instagram):
                          </span>
                          <span className="font-mono text-[#ffb3aa] font-bold" dir="ltr">@ibt1kar</span>
                        </div>
                      </div>
                    </div>

                    {/* Direct Instant Order Trigger Box */}
                    <div className="ib-glass-coral p-7 sm:p-9 rounded-[30px] space-y-6 text-right">
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-6 h-6 text-[#EF4A3C] shrink-0" />
                        <div>
                          <h3 className="text-xl font-bold text-white">اطلب باقتك أو خدمتك الآن</h3>
                          <p className="text-xs sm:text-sm text-[#C9CBEA]">
                            اختر من بين باقاتنا وخدماتنا الإبداعية
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-[#C9CBEA] leading-[1.9]">
                        يمكنك ملء نموذج الطلب وتحديد الباقة أو الخدمة المرغوبة أو اختيار "تصميم منفرد / طلب خاص بحسب الاحتياج".
                      </p>

                      <button
                        onClick={() => handleOpenOrderModal()}
                        className="ib-btn ib-btn-coral w-full"
                      >
                        <CreditCard className="w-4 h-4 shrink-0" />
                        <span>افتح نموذج الطلب المباشر</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </main>

          {/* Footer Section */}
          <FooterSection
            setActiveTab={setActiveTab}
            onOpenOrderModal={() => handleOpenOrderModal()}
          />
        </div>

        {/* Floating WhatsApp Speed Button */}
        <a
          href="https://wa.me/966593363878"
          target="_blank"
          rel="noreferrer"
          className="floating-whatsapp fixed left-6 z-40 p-2 sm:p-2.5 rounded-full bg-[#25D366] text-white shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-transform duration-300 flex items-center gap-2 group cursor-pointer border-2 border-white/20"
          title="تواصل معنا عبر الواتساب"
          aria-label="تواصل معنا عبر الواتساب"
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

        {/* Service Order Modal */}
        <ServiceOrderModal
          isOpen={orderModal.isOpen}
          onClose={handleCloseOrderModal}
          initialServiceId={orderModal.serviceId}
          initialPackageId={orderModal.packageId}
          initialPackageGroupId={orderModal.packageGroupId}
        />

        {/* Visitor Authentication Modal (Phone / Email OTP) */}
        <AuthModal />

        {/* User Account / Profile Modal (Protected) */}
        <AccountModal />
      </div>
    </AuthProvider>
  );
}
