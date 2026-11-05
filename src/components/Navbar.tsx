import React, { useState, useEffect, useRef } from 'react';
import { PageTab } from '../types';
import { Logo } from './Logo';
import { WhatsAppIcon } from './SocialIcons';
import { useAuth } from '../context/AuthContext';
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

  // Helper to place second word underneath if the label consists of multiple words
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
      <header
        className={`fixed top-0 left-0 right-0 z-[var(--z-header)] transition-all duration-300 pointer-events-none lg:pointer-events-auto ${
          scrolled ? 'lg:glass-nav lg:py-3 py-2' : 'bg-transparent lg:py-5 py-3'
        }`}
      >
        {/* Mobile top-bar glass background (independent from header to avoid trapping fixed descendants) */}
        <div
          className={`lg:hidden absolute inset-x-0 top-0 h-full pointer-events-none transition-all duration-300 ${
            scrolled ? 'glass-nav' : 'bg-transparent'
          }`}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 flex items-center justify-between min-h-[var(--header-h)] pointer-events-auto">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center group text-right focus:outline-none shrink-0"
            title="منصة ابتكار - الصفحة الرئيسية"
          >
            <Logo
              size="md"
              imgClassName="h-7 sm:h-8 max-w-[80px] sm:max-w-[100px]"
              secondPartClassName="h-7 sm:h-8 max-w-[125px] sm:max-w-[160px]"
            />
          </button>

          {/* Shortcuts Navigation Bar: Desktop Header Center & Mobile Fixed Bottom Bar */}
          <nav
            id="shortcuts-nav"
            className="shortcuts-nav glass-panel"
            style={{ height: '87px', width: '369px' }}
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
                  className={`shortcuts-item flex items-center transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'active text-white'
                      : 'text-[var(--text-muted)] hover:text-white'
                  }`}
                  title={item.label}
                >
                  <div className="shortcuts-icon-wrap flex items-center justify-center">
                    <Icon className="shortcuts-icon" />
                  </div>
                  <span className="shortcuts-label">
                    <span className="shortcuts-label-first">{first}</span>
                    {second && <span className="shortcuts-label-second">{second}</span>}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Desktop Top Corner Action Buttons (1024px and above) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Visitor Authentication Button or User Menu */}
            {!user ? (
              <button
                onClick={openAuthModal}
                className="px-4 py-2.5 rounded-full glass-panel hover:bg-white/10 text-white font-bold text-xs border border-[var(--card-border)] hover:border-[var(--accent-coral)]/60 transition-all flex items-center gap-2 cursor-pointer shadow-md hover:scale-105"
              >
                <LogIn className="w-4 h-4 text-[var(--accent-coral)]" />
                <span>تسجيل الدخول</span>
              </button>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-full glass-panel hover:bg-white/10 border border-[var(--card-border)] text-white text-xs font-bold transition-all cursor-pointer shadow-md hover:border-[var(--accent-coral)]/50"
                >
                  <div className="w-7 h-7 rounded-full bg-[var(--accent-coral)] text-white flex items-center justify-center text-xs font-black shadow">
                    {(userProfile?.name || user.displayName || 'ع').trim().charAt(0)}
                  </div>
                  <span className="max-w-[110px] truncate text-white">
                    {userProfile?.name || user.displayName || 'حسابي'}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 rounded-2xl glass-dropdown glass-panel p-2 shadow-2xl z-50 text-right">
                    <div className="p-3 border-b border-white/10 mb-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-white truncate">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{userProfile?.name || user.displayName || 'عميل ابتكار'}</span>
                      </div>
                      <div className="text-[11px] text-[var(--text-muted)] truncate mt-0.5" dir="ltr">
                        {userProfile?.email || user.email || 'حساب مفعل'}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        openAccountModal();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-gray-200 hover:text-white hover:bg-white/10 transition-colors text-right cursor-pointer"
                    >
                      <UserIcon className="w-4 h-4 text-[var(--accent-coral)]" />
                      <span>الملف الشخصي (حسابي)</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-300 hover:text-red-200 hover:bg-red-500/15 transition-colors text-right cursor-pointer mt-1"
                    >
                      <LogOut className="w-4 h-4 text-red-400" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Order CTA Button */}
            <button
              onClick={() => onOpenOrderModal()}
              className="relative group overflow-hidden px-6 py-2.5 rounded-full bg-[var(--accent-coral)] text-white font-bold text-sm shadow-xl shadow-[var(--accent-coral)]/30 hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin-slow" />
                <span>اطلب خدمتك</span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>

          {/* Mobile Header Row (max-width: 1023px): logo, "دخول", "طلب خدمة", hamburger */}
          <div className="flex lg:hidden items-center gap-1 sm:gap-2 shrink-0">
            {!user ? (
              <button
                onClick={openAuthModal}
                className="min-h-[44px] px-2.5 sm:px-3 py-1.5 rounded-full glass-panel text-white text-xs font-bold flex items-center gap-1 border border-[var(--card-border)] hover:border-[var(--accent-coral)]/60 cursor-pointer transition-all shrink-0"
              >
                <LogIn className="w-3.5 h-3.5 text-[var(--accent-coral)] shrink-0" />
                <span>دخول</span>
              </button>
            ) : (
              <button
                onClick={openAccountModal}
                className="min-h-[44px] min-w-[44px] p-1.5 rounded-full glass-panel flex items-center justify-center gap-1 border border-[var(--card-border)] text-white text-xs font-bold cursor-pointer shrink-0"
                title="حسابي"
              >
                <div className="w-7 h-7 rounded-full bg-[var(--accent-coral)] text-white flex items-center justify-center text-xs font-black shadow">
                  {(userProfile?.name || user.displayName || 'ع').trim().charAt(0)}
                </div>
              </button>
            )}

            <button
              onClick={() => onOpenOrderModal()}
              className="min-h-[44px] px-2.5 sm:px-3.5 py-1.5 rounded-full bg-[var(--accent-coral)] text-white text-xs font-bold flex items-center gap-1 shadow-md shadow-[var(--accent-coral)]/30 hover:scale-105 transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>طلب خدمة</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] p-2 sm:p-2.5 rounded-2xl glass-panel text-white hover:bg-white/10 transition-colors focus:outline-none flex items-center justify-center cursor-pointer shrink-0"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[var(--z-drawer)] lg:hidden flex flex-col justify-between glass-nav bg-[var(--card-bg)] pt-24 pb-20 px-6 backdrop-blur-2xl animate-fade-in overflow-y-auto">
          <div className="space-y-4">
            {/* User Account Mobile Card */}
            {user ? (
              <div className="p-4 rounded-2xl bg-white/5 border border-[var(--card-border)] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent-coral)] text-white flex items-center justify-center text-sm font-black shadow">
                    {(userProfile?.name || user.displayName || 'ع').trim().charAt(0)}
                  </div>
                  <div className="flex-1 truncate">
                    <div className="text-sm font-bold text-white truncate">
                      {userProfile?.name || user.displayName || 'عميل ابتكار'}
                    </div>
                    <div className="text-xs text-[var(--text-muted)] font-mono truncate" dir="ltr">
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
                    className="py-2 px-3 rounded-xl bg-white/10 text-white text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-[var(--accent-coral)]" />
                    <span>حسابي</span>
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="py-2 px-3 rounded-xl bg-red-500/15 text-red-300 text-xs font-bold flex items-center justify-center gap-1.5"
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
                className="w-full py-3.5 rounded-2xl glass-panel text-white font-bold text-sm flex items-center justify-center gap-2 border border-[var(--accent-coral)]/40 bg-[var(--accent-coral)]/10"
              >
                <LogIn className="w-4 h-4 text-[var(--accent-coral)]" />
                <span>تسجيل الدخول / إنشاء حساب</span>
              </button>
            )}

            <div className="text-xs font-bold text-[var(--accent-coral)] uppercase tracking-wider mb-2">
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
                      ? 'bg-[var(--accent-coral)] text-white font-bold shadow-lg shadow-[var(--accent-coral)]/30'
                      : 'glass-panel text-gray-200 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[var(--accent-coral)]'}`} />
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
              className="w-full py-3.5 rounded-2xl bg-[var(--accent-coral)] text-white font-bold text-center flex items-center justify-center gap-2 shadow-xl shadow-[var(--accent-coral)]/30"
            >
              <Sparkles className="w-5 h-5" />
              <span>اطلب خدمتك الآن</span>
            </button>

            <a
              href="https://wa.me/966593363878"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-2xl glass-panel text-emerald-400 font-bold text-center flex items-center justify-center gap-2 border border-emerald-500/30 text-sm"
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
