import React, { useState, useEffect } from 'react';
import { PageTab } from '../types';
import { Logo } from './Logo';
import { WhatsAppIcon } from './SocialIcons';
import {
  Menu,
  X,
  Sparkles,
  PhoneCall,
  Grid,
  CreditCard,
  Users,
  Briefcase,
  Handshake,
  Info,
  Send,
} from 'lucide-react';

interface NavbarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  onOpenOrderModal: (serviceId?: string, packageId?: string, packageGroupId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenOrderModal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageTab; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'الرئيسية', icon: Sparkles },
    { id: 'services', label: 'خدماتنا', icon: Grid },
    { id: 'packages', label: 'الباقات والخطط', icon: CreditCard },
    { id: 'targets', label: 'العملاء المستهدفون', icon: Users },
    { id: 'portfolio', label: 'معرض الأعمال', icon: Briefcase },
    { id: 'clients', label: 'شركاء النجاح', icon: Handshake },
    { id: 'about', label: 'عن ابتكار', icon: Info },
    { id: 'contact', label: 'تواصل معنا', icon: Send },
  ];

  const handleNavClick = (tab: PageTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 group text-right focus:outline-none"
          >
            <Logo size="md" />
          </button>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 glass-panel rounded-full px-4 py-1.5 border border-white/10">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#e85432] text-white shadow-lg shadow-[#e85432]/30 scale-105'
                      : 'text-gray-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Call-to-action button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenOrderModal()}
              className="relative group overflow-hidden px-6 py-2.5 rounded-full bg-gradient-to-r from-[#e85432] to-[#ff7a59] text-white font-bold text-sm shadow-xl shadow-[#e85432]/25 hover:shadow-[#e85432]/40 hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin-slow" />
                <span>اطلب خدمتك</span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onOpenOrderModal()}
              className="px-3.5 py-1.5 rounded-full bg-[#e85432] text-white text-xs font-bold sm:hidden flex items-center gap-1 shadow-md shadow-[#e85432]/30"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>طلب خدمة</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-2xl glass-panel text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex flex-col justify-between glass-nav bg-[#140844]/95 pt-24 pb-20 px-6 backdrop-blur-2xl animate-fade-in overflow-y-auto">
          <div className="space-y-3">
            <div className="text-xs font-bold text-[#e85432] uppercase tracking-wider mb-2">
              التنقل المباشر
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 text-right ${
                    isActive
                      ? 'bg-gradient-to-r from-[#e85432] to-[#ff7a59] text-white font-bold shadow-lg shadow-[#e85432]/30'
                      : 'glass-panel text-gray-200 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#e85432]'}`} />
                    <span className="text-base font-semibold">{item.label}</span>
                  </div>
                  <span className="text-xs opacity-60">←</span>
                </button>
              );
            })}
          </div>

          <div className="pt-6 border-t border-white/10 mt-6 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#e85432] to-[#ff7a59] text-white font-bold text-center flex items-center justify-center gap-2 shadow-xl shadow-[#e85432]/30"
            >
              <Sparkles className="w-5 h-5" />
              <span>اطلب خدمتك الآن</span>
            </button>

            <a
              href="https://wa.me/966558875818"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-2xl glass-panel text-emerald-400 font-bold text-center flex items-center justify-center gap-2 border border-emerald-500/30 text-sm"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>واتساب المبيعات (0558875818)</span>
            </a>
          </div>
        </div>
      )}

      {/* Mobile Bottom Glass Quick Bar for fast navigation */}
      <div className="lg:hidden fixed bottom-3 left-3 right-3 z-40 glass-panel rounded-full p-1 border border-white/15 shadow-2xl flex items-center justify-around">
        <button
          onClick={() => handleNavClick('home')}
          className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-full text-[11px] font-semibold ${
            activeTab === 'home' ? 'text-[#e85432] bg-white/10' : 'text-gray-300'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>الرئيسية</span>
        </button>
        <button
          onClick={() => handleNavClick('services')}
          className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-full text-[11px] font-semibold ${
            activeTab === 'services' ? 'text-[#e85432] bg-white/10' : 'text-gray-300'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          <span>الخدمات</span>
        </button>
        <button
          onClick={() => handleNavClick('packages')}
          className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-full text-[11px] font-semibold ${
            activeTab === 'packages' ? 'text-[#e85432] bg-white/10' : 'text-gray-300'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>الباقات</span>
        </button>
        <button
          onClick={() => handleNavClick('portfolio')}
          className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-full text-[11px] font-semibold ${
            activeTab === 'portfolio' ? 'text-[#e85432] bg-white/10' : 'text-gray-300'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>الأعمال</span>
        </button>
        <button
          onClick={() => onOpenOrderModal()}
          className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-[#e85432] text-white shadow-md shadow-[#e85432]/30"
        >
          <Send className="w-3.5 h-3.5" />
          <span>اطلب</span>
        </button>
      </div>
    </>
  );
};
