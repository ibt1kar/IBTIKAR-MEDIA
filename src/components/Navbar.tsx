import React, { useState, useEffect, useRef } from 'react';
import { PageTab } from '../types';
import { Logo } from './Logo';
import { WhatsAppIcon } from './SocialIcons';
import { useAuth } from '../context/AuthContext';
import { useModalEffects } from '../hooks/useModalEffects';
import {
  Menu,
  X,
  Sparkles,
  Grid,
  CreditCard,
  Users,
  Briefcase,
  Handshake,
  Info,
  Send,
  LogIn,
  LogOut,
  User as UserIcon,
  ChevronDown,
  ShieldCheck
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
  const { user, userProfile, openAuthModal, openAccountModal, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useModalEffects(mobileMenuOpen, () => setMobileMenuOpen(false));

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Virtual keyboard detection on mobile devices
  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
        document.body.classList.add('keyboard-open');
      }
    };
    const handleFocusOut = () => {
      document.body.classList.remove('keyboard-open');
    };
    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);
    return () => {
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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

  const splitNavLabel = (label: string): { first: string; second?: string } => {
    const parts = label.trim().split(/\s+/);
    if (parts.length <= 1) {
      return { first: label };
    }
    if (parts.length === 2) {
      return { first: parts[0], second: parts[1] };
    }
    return { first: parts[0], second: parts.slice(1).join(' ') };
  };

  const handleNavClick = (tab: PageTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[var(--z-header)] pointer-events-none px-3 sm:px-6 lg:px-8 pt-3 lg:pt-[22px]">
        <div
          className={`max-w-[1200px] mx-auto ib-glass rounded-full pointer-events-auto transition-all duration-300 px-3 sm:px-5 py-2 flex items-center justify-between gap-2 min-h-[60px] lg:min-h-[68px] ${
            scrolled ? 'border-white/20 shadow-[0_20px_50px_rgba(2,2,20,0.65)]' : ''
          }`}
        >
          {/* Brand Logo (Right / Start in RTL) */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center group text-right shrink min-w-0 min-h-[44px] px-0.5 sm:px-1 cursor-pointer"
            title="منصة ابتكار - الصفحة الرئيسية"
          >
            <Logo
              size="md"
              className="!gap-1.5 sm:!gap-2.5"
              imgClassName="h-6 sm:h-7 lg:h-8 max-w-[44px] sm:max-w-[76px] lg:max-w-[92px]"
              secondPartClassName="h-6 sm:h-7 lg:h-8 max-w-[76px] sm:max-w-[120px] lg:max-w-[144px]"
            />
          </button>

          {/* Shortcuts Navigation Bar: Centered inside floating pill on Desktop, Fixed Bottom Bar on <= 1023px */}
          <nav
            id="shortcuts-nav"
            className="shortcuts-nav"
            aria-label="شريط التنقل السريع"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const { first, second } = splitNavLabel(item.label);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`shortcuts-item flex items-center cursor-pointer ${
                    isActive ? 'active' : ''
                  }`}
                  title={item.label}
                >
                  <span className="shortcuts-icon-wrap flex items-center justify-center">
                    <Icon className="shortcuts-icon" />
                  </span>
                  <span className="shortcuts-label">
                    <span className="shortcuts-label-first">{first}</span>
                    {second && <span className="shortcuts-label-second">{second}</span>}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Desktop Action Buttons (Left / End in RTL) */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {!user ? (
              <button
                onClick={openAuthModal}
                className="ib-chip min-h-[44px] px-4 py-2 rounded-full text-white font-bold text-xs hover:border-[#EF4A3C] transition-all flex items-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-[#EF4A3C]" />
                <span>تسجيل الدخول</span>
              </button>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="ib-chip min-h-[44px] flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-xs font-bold transition-all cursor-pointer hover:border-[#EF4A3C]/60"
                >
                  <span className="w-7 h-7 rounded-full bg-[#EF4A3C] text-[#070718] flex items-center justify-center text-xs font-black">
                    {(userProfile?.name || user.displayName || 'ع').trim().charAt(0)}
                  </span>
                  <span className="max-w-[96px] truncate text-white">
                    {userProfile?.name || user.displayName || 'حسابي'}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#C9CBEA] transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {userDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 rounded-2xl glass-dropdown glass-panel p-2 shadow-2xl z-50 text-right">
                    <div className="p-3 border-b border-white/10 mb-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-white truncate">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{userProfile?.name || user.displayName || 'عميل ابتكار'}</span>
                      </div>
                      <div className="text-[11px] text-[#9A9CC8] truncate mt-0.5" dir="ltr">
                        {userProfile?.email || user.email || 'حساب مفعل'}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        openAccountModal();
                      }}
                      className="w-full min-h-[44px] flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#C9CBEA] hover:text-white hover:bg-white/10 transition-colors text-right cursor-pointer"
                    >
                      <UserIcon className="w-4 h-4 text-[#EF4A3C]" />
                      <span>الملف الشخصي (حسابي)</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full min-h-[44px] flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-300 hover:text-red-200 hover:bg-red-500/15 transition-colors text-right cursor-pointer mt-1"
                    >
                      <LogOut className="w-4 h-4 text-red-400" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => onOpenOrderModal()}
              className="ib-btn ib-btn-coral !min-h-[44px] !py-2.5 !px-5 !text-sm whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>اطلب خدمتك</span>
            </button>
          </div>

          {/* Mobile Header Row (max-width: 1023px) */}
          <div className="flex lg:hidden items-center gap-1 sm:gap-1.5 shrink-0">
            {!user ? (
              <button
                onClick={openAuthModal}
                className="ib-chip min-h-[44px] px-2.5 sm:px-3 py-1.5 rounded-full text-white text-[11px] sm:text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
              >
                <LogIn className="w-3.5 h-3.5 text-[#EF4A3C] shrink-0" />
                <span>دخول</span>
              </button>
            ) : (
              <button
                onClick={openAccountModal}
                className="ib-chip min-h-[44px] min-w-[44px] p-1.5 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer shrink-0"
                title="حسابي"
                aria-label="حسابي"
              >
                <span className="w-7 h-7 rounded-full bg-[#EF4A3C] text-[#070718] flex items-center justify-center text-xs font-black">
                  {(userProfile?.name || user.displayName || 'ع').trim().charAt(0)}
                </span>
              </button>
            )}

            <button
              onClick={() => onOpenOrderModal()}
              className="ib-btn ib-btn-coral !min-h-[44px] !py-1.5 !px-2.5 sm:!px-3.5 !text-[11px] sm:!text-xs whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>طلب خدمة</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="ib-chip min-h-[44px] min-w-[44px] p-2 rounded-full text-white hover:border-[#EF4A3C] transition-colors flex items-center justify-center cursor-pointer shrink-0"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[var(--z-drawer)] lg:hidden flex flex-col justify-between bg-[#070718]/95 backdrop-blur-2xl pt-24 pb-24 px-6 overflow-y-auto">
          <div className="space-y-3">
            {user ? (
              <div className="ib-glass p-4 rounded-3xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EF4A3C] text-[#070718] flex items-center justify-center text-sm font-black">
                    {(userProfile?.name || user.displayName || 'ع').trim().charAt(0)}
                  </div>
                  <div className="flex-1 truncate">
                    <div className="text-sm font-bold text-white truncate">
                      {userProfile?.name || user.displayName || 'عميل ابتكار'}
                    </div>
                    <div className="text-xs text-[#9A9CC8] font-mono truncate" dir="ltr">
                      {userProfile?.email || user.email || 'حساب مفعل'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAccountModal();
                    }}
                    className="ib-chip min-h-[44px] py-2 px-3 rounded-full text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-[#EF4A3C]" />
                    <span>حسابي</span>
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="min-h-[44px] py-2 px-3 rounded-full bg-red-500/15 border border-red-400/30 text-red-300 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>خروج</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal();
                }}
                className="w-full min-h-[48px] py-3.5 rounded-full ib-glass-coral text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-[#ffb3aa]" />
                <span>تسجيل الدخول / إنشاء حساب</span>
              </button>
            )}

            <div className="text-xs font-bold text-[#ffb3aa] uppercase tracking-wider pt-2">
              التنقل المباشر
            </div>
            <div className="ib-glass rounded-3xl p-2 divide-y divide-white/10">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`ib-row ${isActive ? 'is-active' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-[#EF4A3C]' : 'text-[#9A9CC8]'}`} />
                      <span className="text-base font-semibold">{item.label}</span>
                    </div>
                    <span className="dot" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 mt-6 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="ib-btn ib-btn-coral w-full"
            >
              <Sparkles className="w-5 h-5" />
              <span>اطلب خدمتك الآن</span>
            </button>

            <a
              href="https://wa.me/966593363878"
              target="_blank"
              rel="noreferrer"
              className="ib-btn ib-glass w-full text-emerald-300 text-sm"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              <span>واتساب المبيعات (0593363878)</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
