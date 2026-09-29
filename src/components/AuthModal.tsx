import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  User as UserIcon,
  RefreshCw,
  Send,
  Edit2
} from 'lucide-react';
import { 
  sendSignInLinkToEmail, 
  isSignInWithEmailLink, 
  signInWithEmailLink, 
  updateProfile 
} from 'firebase/auth';
import { auth, getUserProfile, saveUserProfile } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, openAuthModal, closeAuthModal, refreshUserProfile, updateLocalProfile } = useAuth();

  // Step: 'input' (enter email) | 'sent' (link sent screen) | 'confirm-email' (re-enter email on link return) | 'name' (new user name)
  const [step, setStep] = useState<'input' | 'sent' | 'confirm-email' | 'name'>('input');

  // Form inputs
  const [emailAddress, setEmailAddress] = useState('');
  const [fullName, setFullName] = useState('');

  // UI status
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // 60-second countdown for resending email link
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Legal modal (Terms & Privacy)
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | null>(null);

  // Detect email sign-in link on page load
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const savedEmail = window.localStorage.getItem('emailForSignIn');
      if (savedEmail) {
        handleCompleteSignInWithLink(savedEmail);
      } else {
        // Opened on a different browser or device without saved email
        setStep('confirm-email');
        openAuthModal();
      }
    }
  }, []);

  // Reset transient error when modal is opened
  useEffect(() => {
    if (isAuthModalOpen) {
      setErrorMessage(null);
      setSuccessMessage(null);
      // Pre-fill from localStorage if available
      const savedEmail = window.localStorage.getItem('emailForSignIn');
      if (savedEmail && !emailAddress) {
        setEmailAddress(savedEmail);
      }
    }
  }, [isAuthModalOpen]);

  // Resend countdown timer
  useEffect(() => {
    let timer: any;
    if (step === 'sent' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  // Complete sign-in when link is opened
  const handleCompleteSignInWithLink = async (emailToVerify: string) => {
    const cleanEmail = emailToVerify.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMessage('صيغة البريد الإلكتروني غير صحيحة.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const result = await signInWithEmailLink(auth, cleanEmail, window.location.href);
      window.localStorage.removeItem('emailForSignIn');

      // Clean up URL query parameters
      window.history.replaceState({}, document.title, window.location.pathname);

      const loggedInUser = result.user;
      const profile = await getUserProfile(loggedInUser.uid);

      if (profile && profile.name && profile.name !== 'عميل ابتكار') {
        // Existing user logs in directly
        setSuccessMessage(`أهلاً بك مجدداً، ${profile.name}! تم تسجيل الدخول بنجاح.`);
        await refreshUserProfile();
        setTimeout(() => {
          closeAuthModal();
          setStep('input');
        }, 1500);
      } else {
        // New user: ask for name to complete profile
        setEmailAddress(cleanEmail);
        setStep('name');
        openAuthModal();
      }
    } catch (err: any) {
      console.error('Sign in with email link failed:', err);
      const code = err?.code;
      if (code === 'auth/invalid-action-code' || code === 'auth/expired-action-code') {
        setErrorMessage('رابط تسجيل الدخول غير صالح أو انتهت صلاحيته، يرجى طلب رابط جديد.');
      } else if (code === 'auth/too-many-requests') {
        setErrorMessage('تم تجاوز عدد المحاولات المسموح بها، يرجى الانتظار قليلاً.');
      } else if (code === 'auth/invalid-email') {
        setErrorMessage('صيغة البريد الإلكتروني غير صحيحة.');
      } else {
        setErrorMessage('حدث خطأ أثناء تأكيد رابط الدخول، يرجى طلب رابط جديد.');
      }
      openAuthModal();
      setStep('input');
    } finally {
      setLoading(false);
    }
  };

  // Send Email Link
  const handleSendEmailLink = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const cleanEmail = emailAddress.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMessage('صيغة البريد الإلكتروني غير صحيحة.');
      return;
    }

    setLoading(true);

    try {
      // Determine the current site origin (falls back to https://ibt1kar.com)
      const currentOrigin = window.location.origin.includes('localhost') || window.location.origin.includes('run.app')
        ? window.location.href.split('#')[0]
        : 'https://ibt1kar.com';

      const actionCodeSettings = {
        url: currentOrigin,
        handleCodeInApp: true,
      };

      // 1. Save email in localStorage before sending
      window.localStorage.setItem('emailForSignIn', cleanEmail);

      // 2. Send sign-in link via Firebase
      await sendSignInLinkToEmail(auth, cleanEmail, actionCodeSettings);

      // 3. Show success screen
      setStep('sent');
      setCountdown(60);
      setCanResend(false);
    } catch (err: any) {
      console.error('sendSignInLinkToEmail error:', err);
      const code = err?.code;
      if (code === 'auth/invalid-email') {
        setErrorMessage('صيغة البريد الإلكتروني غير صحيحة.');
      } else if (code === 'auth/too-many-requests') {
        setErrorMessage('تم تجاوز عدد المحاولات المسموح بها، يرجى الانتظار قليلاً.');
      } else if (code === 'auth/unauthorized-domain') {
        setErrorMessage('هذا النطاق غير مصرح به في Firebase. يرجى إضافة النطاق في Authorized Domains.');
      } else {
        setErrorMessage('تعذر إرسال رابط الدخول حالياً، يرجى التحقق من اتصالك والمحاولة مجدداً.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Complete new user registration (save name)
  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = fullName.trim();
    if (cleanName.length < 2) {
      setErrorMessage('يرجى إدخال اسمك الكامل (حرفين على الأقل).');
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser) {
      setErrorMessage('انتهت الجلسة، يرجى تسجيل الدخول مجدداً.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      await updateProfile(currentUser, { displayName: cleanName });

      const newProfile = {
        id: currentUser.uid,
        name: cleanName,
        email: currentUser.email || emailAddress.trim().toLowerCase(),
        authProvider: 'email' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await saveUserProfile(currentUser.uid, newProfile);
      updateLocalProfile(newProfile);
      await refreshUserProfile();

      setSuccessMessage(`تم إنشاء حسابك بنجاح! مرحباً بك يا ${cleanName} في ابتكار.`);
      setTimeout(() => {
        closeAuthModal();
        setStep('input');
      }, 1400);
    } catch (err: any) {
      console.error('Error saving profile:', err);
      setErrorMessage('تعذر حفظ بيانات الحساب في قاعدة البيانات، يرجى المحاولة مجدداً.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthModalOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in text-right font-['Thmanyah_Sans',sans-serif]"
      dir="rtl"
    >
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-md bg-[#12083b] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#e85432] via-[#ff7a59] to-[#e85432]"></div>
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#e85432]/25 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 left-5 p-2 rounded-full glass-panel text-gray-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e85432]/15 text-[#ff7a59] text-xs font-bold border border-[#e85432]/25">
            <Sparkles className="w-3.5 h-3.5" />
            <span>منصة ابتكار الرقمية</span>
          </div>
          <h2 className="text-2xl font-black text-white">
            {step === 'input' 
              ? 'تسجيل الدخول / إنشاء حساب'
              : step === 'sent'
              ? 'تحقق من بريدك الإلكتروني'
              : step === 'confirm-email'
              ? 'تأكيد البريد الإلكتروني'
              : 'إكمال بيانات الحساب'}
          </h2>
          <p className="text-xs text-gray-300">
            {step === 'input'
              ? 'سجل دخولك بدون كلمة مرور عبر رابط دخول آمن وسريع يُرسل إلى بريدك.'
              : step === 'sent'
              ? 'تم إرسال رابط تسجيل الدخول المشفر بنجاح.'
              : step === 'confirm-email'
              ? 'يرجى تأكيد بريدك الإلكتروني لإتمام الدخول عبر الرابط.'
              : 'خطوة واحدة متبقية لبدء رحلتك الاستثنائية مع ابتكار'}
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-3.5 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-200 text-xs flex items-center gap-2.5 animate-fade-in leading-relaxed">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-4 p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs flex items-center gap-2.5 animate-fade-in leading-relaxed">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* ================= STEP 1: EMAIL INPUT FORM ================= */}
        {step === 'input' && (
          <form onSubmit={handleSendEmailLink} className="space-y-4 animate-fade-in">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-200">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full h-12 px-4 pr-11 rounded-2xl bg-white/5 border border-white/15 text-white text-sm font-semibold placeholder:text-gray-500 focus:outline-none focus:border-[#e85432] transition-colors text-left font-mono"
                  dir="ltr"
                  required
                  autoFocus
                />
                <Mail className="w-5 h-5 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <p className="text-[11px] text-gray-400">
                سنرسل لك رابطاً مباشراً يمكنك الضغط عليه لتسجيل الدخول فوراً بدون كلمة مرور.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#e85432] to-[#ff7a59] text-white font-bold text-sm shadow-xl shadow-[#e85432]/30 hover:shadow-[#e85432]/50 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>جاري إرسال الرابط...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>إرسال رابط الدخول</span>
                </>
              )}
            </button>

            {/* Terms and Privacy Notice */}
            <div className="pt-2 text-center text-[11px] text-gray-400 leading-relaxed border-t border-white/5">
              <span>بالمتابعة، فإنك توافق على </span>
              <button
                type="button"
                onClick={() => setLegalModal('terms')}
                className="text-[#ff7a59] hover:underline font-bold cursor-pointer"
              >
                شروط الخدمة
              </button>
              <span> و</span>
              <button
                type="button"
                onClick={() => setLegalModal('privacy')}
                className="text-[#ff7a59] hover:underline font-bold cursor-pointer"
              >
                سياسة الخصوصية
              </button>
              <span> الخاصة بمنصة ابتكار.</span>
            </div>
          </form>
        )}

        {/* ================= STEP 2: LINK SENT SUCCESS SCREEN ================= */}
        {step === 'sent' && (
          <div className="space-y-5 animate-fade-in text-center">
            {/* Sent Icon Badge */}
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#e85432]/20 to-[#ff7a59]/20 border border-[#e85432]/30 flex items-center justify-center text-[#ff7a59] shadow-lg">
              <Mail className="w-8 h-8 animate-pulse" />
            </div>

            {/* Requested Arabic Notice */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white">
                أرسلنا رابط الدخول إلى بريدك، افتح الرسالة واضغط الرابط
              </h3>
              <div className="inline-block px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-gray-300" dir="ltr">
                {emailAddress}
              </div>
            </div>

            {/* 60-Second Countdown & Resend Section */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="text-xs text-gray-300">
                {canResend ? (
                  <button
                    type="button"
                    onClick={() => handleSendEmailLink()}
                    disabled={loading}
                    className="px-4 py-2 rounded-xl bg-[#e85432] text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-md shadow-[#e85432]/30 hover:bg-[#ff7a59] transition-colors cursor-pointer"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4" />
                    )}
                    <span>إعادة إرسال رابط الدخول الآن</span>
                  </button>
                ) : (
                  <span>
                    يمكنك طلب رابط جديد بعد:{' '}
                    <strong className="text-[#ff7a59] font-mono font-bold">
                      00:{countdown < 10 ? `0${countdown}` : countdown}
                    </strong>
                  </span>
                )}
              </div>

              {/* Edit Email Link */}
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setStep('input');
                    setErrorMessage(null);
                  }}
                  className="text-xs text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 cursor-pointer underline"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>تعديل البريد</span>
                </button>
              </div>
            </div>

            <div className="text-[11px] text-gray-400 leading-relaxed">
              إذا لم تجد الرسالة في صندوق الوارد، يرجى فحص مجلد الرسائل غير المرغوب فيها (Spam / Junk).
            </div>
          </div>
        )}

        {/* ================= STEP 3: CONFIRM EMAIL (WHEN OPENED ON DIFFERENT DEVICE) ================= */}
        {step === 'confirm-email' && (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleCompleteSignInWithLink(emailAddress);
            }} 
            className="space-y-4 animate-fade-in"
          >
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-200 text-xs text-right leading-relaxed">
              لقد فتحت رابط الدخول على متصفح أو جهاز مختلف. يرجى كتابة بريدك الإلكتروني لتأكيد هويتك وإتمام تسجيل الدخول.
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-200">
                البريد الإلكتروني الذي استلمت عليه الرابط
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full h-12 px-4 pr-11 rounded-2xl bg-white/5 border border-white/15 text-white text-sm font-semibold placeholder:text-gray-500 focus:outline-none focus:border-[#e85432] transition-colors text-left font-mono"
                  dir="ltr"
                  required
                  autoFocus
                />
                <Mail className="w-5 h-5 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#e85432] to-[#ff7a59] text-white font-bold text-sm shadow-xl shadow-[#e85432]/30 hover:shadow-[#e85432]/50 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>جاري تأكيد الرابط والدخول...</span>
                </>
              ) : (
                <>
                  <span>تأكيد البريد والدخول</span>
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </>
              )}
            </button>
          </form>
        )}

        {/* ================= STEP 4: NAME REGISTRATION (NEW USERS) ================= */}
        {step === 'name' && (
          <form onSubmit={handleCompleteRegistration} className="space-y-4 animate-fade-in">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#e85432]/10 to-transparent border border-[#e85432]/25 text-center space-y-1">
              <span className="text-xs font-bold text-[#ff7a59]">أهلاً بك في منصة ابتكار!</span>
              <p className="text-xs text-gray-300">
                يرجى إدخال اسمك الكريم لإكمال تسجيل الحساب ومتابعة مشاريعك وطلباتك.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-200">
                الاسم الكامل
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="مثال: عبد العزيز الشمري"
                  className="w-full h-12 px-4 pr-11 rounded-2xl bg-white/5 border border-white/15 text-white text-sm font-semibold placeholder:text-gray-500 focus:outline-none focus:border-[#e85432] transition-colors"
                  required
                  autoFocus
                />
                <UserIcon className="w-5 h-5 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || fullName.trim().length < 2}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#e85432] to-[#ff7a59] text-white font-bold text-sm shadow-xl shadow-[#e85432]/30 hover:shadow-[#e85432]/50 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>جاري حفظ الحساب...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>إتمام التسجيل والبدء</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Terms & Privacy Quick Modal */}
      {legalModal && (
        <div 
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setLegalModal(null)}
        >
          <div 
            className="w-full max-w-lg bg-[#140844] border border-white/15 rounded-3xl p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-black text-white">
                {legalModal === 'terms' ? 'شروط الخدمة والاستخدام' : 'سياسة الخصوصية وحماية البيانات'}
              </h3>
              <button 
                onClick={() => setLegalModal(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-gray-300 space-y-3 max-h-60 overflow-y-auto leading-relaxed pl-2">
              {legalModal === 'terms' ? (
                <>
                  <p>أهلاً بك في منصة ابتكار. باستخدامك لخدماتنا وتصفحك للموقع، فإنك توافق على الالتزام بكافة الشروط والأحكام التالية:</p>
                  <p>1. الحساب الشخصي: يلتزم المستخدم بتقديم معلومات اتصال صحيحة ودقيقة لضمان جودة التواصل وتنفيذ المشاريع.</p>
                  <p>2. حماية الملكية الفكرية: جميع التصاميم والهويات المعروضة محمية بحقوق الطبع والنشر الخاصة بمنصة ابتكار وشركائها.</p>
                  <p>3. سرية البيانات: نتعهد بالحفاظ على سرية ملفاتك وتفاصيل مشاريعك وعدم مشاركتها مع أي طرف ثالث.</p>
                </>
              ) : (
                <>
                  <p>تلتزم منصة ابتكار بحماية خصوصية زوارها وعملائها بأعلى معايير الأمان:</p>
                  <p>1. جمع البيانات: نقوم بجمع البريد الإلكتروني والاسم فقط لأغراض تسجيل الدخول، التواصل، ومتابعة الطلبات.</p>
                  <p>2. التخزين والأمان: يتم تخزين بيانات المستخدمين بأمان تام داخل قاعدة بيانات Firebase المشفرة وفق قواعد أمان صارمة تمنع وصول أي طرف غير مصرح له.</p>
                  <p>3. حقوقك: يحق لك في أي وقت تعديل اسمك أو طلب تحديث بياناتك من خلال صفحة "حسابي".</p>
                </>
              )}
            </div>
            <div className="pt-2 text-left">
              <button
                onClick={() => setLegalModal(null)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
