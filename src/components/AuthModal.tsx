import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Phone, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  ShieldCheck, 
  User as UserIcon,
  RefreshCw,
  Bug
} from 'lucide-react';
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  sendSignInLinkToEmail,
  ConfirmationResult,
  updateProfile
} from 'firebase/auth';
import { auth, getUserProfile, saveUserProfile } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

// Country codes with Saudi Arabia default
const COUNTRY_CODES = [
  { code: '+966', name: 'المملكة العربية السعودية', flag: '🇸🇦', digits: 9, placeholder: '5xxxxxxxx' },
  { code: '+971', name: 'الإمارات العربية المتحدة', flag: '🇦🇪', digits: 9, placeholder: '5xxxxxxxx' },
  { code: '+965', name: 'الكويت', flag: '🇰🇼', digits: 8, placeholder: 'xxxxxxxx' },
  { code: '+974', name: 'قطر', flag: '🇶🇦', digits: 8, placeholder: 'xxxxxxxx' },
  { code: '+973', name: 'البحرين', flag: '🇧🇭', digits: 8, placeholder: 'xxxxxxxx' },
  { code: '+968', name: 'عُمان', flag: '🇴🇲', digits: 8, placeholder: 'xxxxxxxx' },
  { code: '+20', name: 'مصر', flag: '🇪🇬', digits: 10, placeholder: '10xxxxxxxx' },
  { code: '+962', name: 'الأردن', flag: '🇯🇴', digits: 9, placeholder: '7xxxxxxxx' },
];

function getArabicFirebaseMessage(code: string, rawMessage: string): string {
  switch (code) {
    case 'auth/unauthorized-domain':
      return 'هذا النطاق غير مصرح به في Firebase Console. يرجى إضافة رابط الموقع الحالي في: Authentication -> Settings -> Authorized domains.';
    case 'auth/invalid-app-credential':
      return 'بيانات اعتماد التطبيق غير صالحة، أو فشل التحقق من reCAPTCHA.';
    case 'auth/operation-not-allowed':
      return 'موفر تسجيل الدخول عبر الهاتف (Phone Provider) غير مفعل في مشروع Firebase الحالي. يرجى تفعيله من: Authentication -> Sign-in method.';
    case 'auth/invalid-phone-number':
      return 'صيغة رقم الجوال غير صالحة. يرجى التأكد من الرقم وكود الدولة.';
    case 'auth/missing-phone-number':
      return 'رقم الجوال مطلوب لإرسال رمز التحقق.';
    case 'auth/quota-exceeded':
      return 'تم تجاوز الحصة اليومية المتاحة لرسائل SMS في مشروع Firebase.';
    case 'auth/too-many-requests':
      return 'تم حظر الطلبات مؤقتاً بسبب تكرار المحاولات السريعة. يرجى الانتظار دقيقة.';
    case 'auth/invalid-verification-code':
      return 'رمز التحقق الذي أدخلته غير صحيح. يرجى التحقق من الرسالة النصية.';
    case 'auth/code-expired':
      return 'انتهت صلاحية رمز التحقق. يرجى طلب إرسال رمز جديد.';
    case 'auth/captcha-check-failed':
      return 'فشل التحقق الأمني من reCAPTCHA. يرجى إعادة المحاولة.';
    default:
      return rawMessage || 'حدث خطأ في المصادقة مع Firebase.';
  }
}

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, refreshUserProfile, updateLocalProfile } = useAuth();

  // Mode: 'phone' or 'email'
  const [activeTab, setActiveTab] = useState<'phone' | 'email'>('phone');
  
  // Step: 1 = Enter input, 2 = Enter OTP, 3 = Complete Name (for new users)
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form inputs
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [fullName, setFullName] = useState('');

  // 6-digit OTP boxes state
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // State & Loading
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Real Firebase Error state (Small red debugging box)
  const [firebaseError, setFirebaseError] = useState<{
    code: string;
    message: string;
    details?: string;
  } | null>(null);

  // Verification & Countdown
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [codeSentTimestamp, setCodeSentTimestamp] = useState<number>(0);

  // Firebase Phone Auth confirmation reference
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

  // Terms and Privacy modal popup
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | null>(null);

  // Reset modal state when opened/closed
  useEffect(() => {
    if (isAuthModalOpen) {
      setStep(1);
      setPhoneNumber('');
      setEmailAddress('');
      setFullName('');
      setOtpDigits(['', '', '', '', '', '']);
      setFirebaseError(null);
      setSuccessMessage(null);
      setAttemptCount(0);
      setConfirmationResult(null);
    } else {
      // Clear recaptcha on close if needed
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear();
        } catch {
          // ignore
        }
        recaptchaVerifierRef.current = null;
      }
    }
  }, [isAuthModalOpen]);

  // Resend Countdown Timer
  useEffect(() => {
    let timer: any;
    if (step === 2 && countdown > 0) {
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

  // Initialize invisible reCAPTCHA for Phone Auth (robustly created and rendered before sending)
  const initRecaptchaVerifier = async (): Promise<RecaptchaVerifier> => {
    // Clear any previous instance
    if (recaptchaVerifierRef.current) {
      try {
        recaptchaVerifierRef.current.clear();
      } catch (e) {
        console.warn('Clearing existing recaptcha verifier:', e);
      }
      recaptchaVerifierRef.current = null;
    }

    // Ensure DOM container element exists and is clean
    let container = document.getElementById('recaptcha-verifier-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'recaptcha-verifier-container';
      document.body.appendChild(container);
    } else {
      container.innerHTML = '';
    }

    const verifier = new RecaptchaVerifier(auth, container, {
      size: 'invisible',
      callback: () => {
        console.log('[reCAPTCHA] Verified successfully');
      },
      'expired-callback': () => {
        console.warn('[reCAPTCHA] Token expired');
        setFirebaseError({
          code: 'auth/recaptcha-expired',
          message: 'انتهت صلاحية التحقق الأمني reCAPTCHA، يرجى إعادة المحاولة.'
        });
      }
    });

    // Render verifier widget explicitly before triggering phone auth
    await verifier.render();
    recaptchaVerifierRef.current = verifier;
    return verifier;
  };

  // Step 1: Send OTP Code strictly via Firebase
  const handleSendCode = async () => {
    setFirebaseError(null);
    setSuccessMessage(null);

    if (activeTab === 'phone') {
      const cleanPhone = phoneNumber.trim().replace(/\D/g, '');
      if (!cleanPhone || cleanPhone.length < 7) {
        setFirebaseError({
          code: 'auth/invalid-phone-format',
          message: 'يرجى إدخال رقم جوال صحيح يتطابق مع الدولة المختارة.'
        });
        return;
      }

      setLoading(true);
      const fullPhone = `${selectedCountry.code}${cleanPhone.startsWith('0') ? cleanPhone.slice(1) : cleanPhone}`;

      try {
        console.log(`[Firebase Phone Auth] Creating reCAPTCHA & sending code to: ${fullPhone}`);
        const verifier = await initRecaptchaVerifier();
        const result = await signInWithPhoneNumber(auth, fullPhone, verifier);
        console.log('[Firebase Phone Auth] ConfirmationResult received successfully');
        
        setConfirmationResult(result);
        setStep(2);
        setCountdown(60);
        setCanResend(false);
        setCodeSentTimestamp(Date.now());
        setSuccessMessage(`تم إرسال رمز التحقق في رسالة نصية (SMS) إلى: ${fullPhone}`);
      } catch (err: any) {
        console.error('[Firebase Phone Auth Error]', err);
        // Clear verifier on failure so subsequent attempts can create a fresh one
        if (recaptchaVerifierRef.current) {
          try {
            recaptchaVerifierRef.current.clear();
          } catch {}
          recaptchaVerifierRef.current = null;
        }
        const errCode = err?.code || 'auth/unknown-error';
        const errMsg = err?.message || String(err);
        setFirebaseError({
          code: errCode,
          message: getArabicFirebaseMessage(errCode, errMsg),
          details: errMsg
        });
      } finally {
        setLoading(false);
      }
    } else {
      // Email Tab: strictly via Firebase sendSignInLinkToEmail
      const cleanEmail = emailAddress.trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanEmail)) {
        setFirebaseError({
          code: 'auth/invalid-email',
          message: 'يرجى إدخال عنوان بريد إلكتروني صالح (مثال: user@example.com).'
        });
        return;
      }

      setLoading(true);
      try {
        const actionCodeSettings = {
          url: window.location.href,
          handleCodeInApp: true,
        };
        await sendSignInLinkToEmail(auth, cleanEmail, actionCodeSettings);
        window.localStorage.setItem('emailForSignIn', cleanEmail);
        setSuccessMessage(`تم إرسال رابط تسجيل الدخول الآمن إلى بريدك الإلكتروني: ${cleanEmail}`);
      } catch (err: any) {
        console.error('[Firebase Email Link Error]', err);
        const errCode = err?.code || 'auth/email-send-error';
        const errMsg = err?.message || String(err);
        setFirebaseError({
          code: errCode,
          message: getArabicFirebaseMessage(errCode, errMsg),
          details: errMsg
        });
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle OTP digit changes
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste of whole code into a single box
      const pasted = value.replace(/\D/g, '').slice(0, 6);
      if (pasted) {
        const newDigits = [...otpDigits];
        for (let i = 0; i < 6; i++) {
          newDigits[i] = pasted[i] || '';
        }
        setOtpDigits(newDigits);
        if (pasted.length === 6) {
          handleVerifyCode(pasted);
        }
        return;
      }
    }

    const char = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = char;
    setOtpDigits(newDigits);
    setFirebaseError(null);

    // Auto-advance to next box if digit entered
    if (char && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // Auto-verify if all 6 digits entered
    const fullCode = newDigits.join('');
    if (fullCode.length === 6 && !newDigits.includes('')) {
      handleVerifyCode(fullCode);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pastedData) return;

    const newDigits = [...otpDigits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pastedData[i] || '';
    }
    setOtpDigits(newDigits);

    if (pastedData.length === 6) {
      handleVerifyCode(pastedData);
    } else {
      otpInputRefs.current[pastedData.length]?.focus();
    }
  };

  // Step 2: Verify 6-digit OTP Code ONLY via confirmationResult.confirm(code)
  const handleVerifyCode = async (codeToVerify?: string) => {
    const code = codeToVerify || otpDigits.join('');
    setFirebaseError(null);

    if (code.length !== 6) {
      setFirebaseError({
        code: 'auth/incomplete-code',
        message: 'يرجى إدخال رمز التحقق كاملاً المكون من 6 أرقام.'
      });
      return;
    }

    if (!confirmationResult) {
      setFirebaseError({
        code: 'auth/no-confirmation-result',
        message: 'لم يتم العثور على جلسة إرسال نشطة من Firebase. يرجى الرجوع وإعادة إرسال الرمز.'
      });
      return;
    }

    // Check expiration (5 minutes = 300,000 ms)
    if (codeSentTimestamp > 0 && Date.now() - codeSentTimestamp > 5 * 60 * 1000) {
      setFirebaseError({
        code: 'auth/code-expired',
        message: 'انتهت صلاحية رمز التحقق (5 دقائق)، يرجى طلب رمز جديد.'
      });
      return;
    }

    // Rate-limit check (max 5 attempts)
    if (attemptCount >= 5) {
      setFirebaseError({
        code: 'auth/too-many-attempts',
        message: 'تم تجاوز الحد الأقصى للمحاولات الخاطئة. يرجى طلب رمز جديد.'
      });
      return;
    }

    setLoading(true);

    try {
      console.log(`[Firebase Phone Auth] Confirming code with Firebase...`);
      // MUST go ONLY through Firebase confirmationResult.confirm(code)
      const userCredential = await confirmationResult.confirm(code);
      const loggedInUser = userCredential.user;
      console.log('[Firebase Phone Auth] Verification succeeded! UID:', loggedInUser.uid);

      // Check if user profile exists in Firestore users/{uid}
      const existingProfile = await getUserProfile(loggedInUser.uid);

      if (existingProfile && existingProfile.name && existingProfile.name !== 'عميل ابتكار') {
        // Existing user with completed name -> Log in directly
        setSuccessMessage(`أهلاً بك مجدداً، ${existingProfile.name}!`);
        await refreshUserProfile();
        setTimeout(() => {
          closeAuthModal();
        }, 1200);
      } else {
        // New user or missing name -> Advance to Step 3 to ask for their name
        setStep(3);
      }
    } catch (err: any) {
      console.error('[Firebase Code Verification Error]', err);
      setAttemptCount((prev) => prev + 1);
      const errCode = err?.code || 'auth/invalid-verification-code';
      const errMsg = err?.message || String(err);
      setFirebaseError({
        code: errCode,
        message: getArabicFirebaseMessage(errCode, errMsg),
        details: errMsg
      });
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Complete Name Registration (for new users)
  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = fullName.trim();
    if (cleanName.length < 2) {
      setFirebaseError({
        code: 'validation/short-name',
        message: 'يرجى كتابة اسمك الكامل (حرفين على الأقل).'
      });
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser) {
      setFirebaseError({
        code: 'auth/no-current-user',
        message: 'الجلسة غير صالحة، يرجى إعادة تسجيل الدخول.'
      });
      return;
    }

    setLoading(true);
    setFirebaseError(null);

    try {
      // 1. Update Firebase Auth displayName
      await updateProfile(currentUser, { displayName: cleanName });

      // 2. Save complete profile in Firestore under users/{userId}
      const fullPhone = activeTab === 'phone' 
        ? `${selectedCountry.code}${phoneNumber.trim().replace(/\D/g, '')}` 
        : undefined;
      const email = activeTab === 'email' ? emailAddress.trim().toLowerCase() : undefined;

      const newProfile = {
        id: currentUser.uid,
        name: cleanName,
        phone: fullPhone,
        email: email,
        authProvider: activeTab,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await saveUserProfile(currentUser.uid, newProfile);
      updateLocalProfile(newProfile);
      await refreshUserProfile();

      setSuccessMessage(`تم إنشاء حسابك بنجاح! مرحباً بك يا ${cleanName} في ابتكار.`);
      setTimeout(() => {
        closeAuthModal();
      }, 1400);
    } catch (err: any) {
      console.error('Registration Error:', err);
      const errCode = err?.code || 'firestore/save-error';
      const errMsg = err?.message || String(err);
      setFirebaseError({
        code: errCode,
        message: 'تعذر حفظ بيانات الحساب في قاعدة البيانات، يرجى المحاولة مجدداً.',
        details: errMsg
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthModalOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in text-right"
      dir="rtl"
    >
      {/* Invisible reCAPTCHA container for Phone Auth */}
      <div id="recaptcha-verifier-container"></div>

      {/* Main Modal Card */}
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

        {/* Header Branding & Title */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e85432]/15 text-[#ff7a59] text-xs font-bold border border-[#e85432]/25">
            <Sparkles className="w-3.5 h-3.5" />
            <span>منصة ابتكار الرقمية</span>
          </div>
          <h2 className="text-2xl font-black text-white">
            {step === 1 
              ? 'تسجيل الدخول / إنشاء حساب' 
              : step === 2 
              ? 'تأكيد رمز التحقق (OTP)' 
              : 'إكمال بيانات الحساب'}
          </h2>
          <p className="text-xs text-gray-300">
            {step === 1 
              ? 'المصادقة الرسمية المباشرة عبر Firebase' 
              : step === 2 
              ? `أدخل رمز SMS المكون من 6 أرقام المرسل إلى جوالك` 
              : 'خطوة واحدة متبقية لبدء تجربة استثنائية مع ابتكار'}
          </p>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Real Firebase Error Box (Item 3 in debug requirements) */}
        {firebaseError && (
          <div className="mb-4 p-3.5 rounded-2xl bg-red-950/90 border-2 border-red-500/80 text-red-200 text-xs animate-fade-in shadow-lg">
            <div className="flex items-center gap-2 font-bold text-red-400 mb-1" dir="ltr">
              <Bug className="w-4 h-4 shrink-0 text-red-400" />
              <span className="font-mono text-xs">Firebase Error: [{firebaseError.code}]</span>
            </div>
            <div className="text-[11px] text-red-100 leading-relaxed font-sans mb-1 text-right" dir="rtl">
              {firebaseError.message}
            </div>
            {firebaseError.details && firebaseError.details !== firebaseError.message && (
              <div className="text-[10px] text-red-300/70 font-mono break-all pt-1 border-t border-red-500/30 text-left" dir="ltr">
                {firebaseError.details}
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 1: CHOOSE TAB & INPUT ================= */}
        {step === 1 && (
          <div className="space-y-5">
            {/* Tabs for Phone and Email */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-white/5 rounded-2xl border border-white/10">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('phone');
                  setFirebaseError(null);
                }}
                className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'phone'
                    ? 'bg-gradient-to-r from-[#e85432] to-[#ff7a59] text-white shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>الجوال (SMS OTP)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('email');
                  setFirebaseError(null);
                }}
                className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'email'
                    ? 'bg-gradient-to-r from-[#e85432] to-[#ff7a59] text-white shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>البريد الإلكتروني</span>
              </button>
            </div>

            {/* Phone Form */}
            {activeTab === 'phone' && (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendCode();
                }}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-200">
                    رقم الجوال لتلقي رمز التحقق عبر SMS
                  </label>
                  <div className="flex items-center gap-2" dir="ltr">
                    {/* Country Code Selector */}
                    <div className="relative">
                      <select
                        value={selectedCountry.code}
                        onChange={(e) => {
                          const found = COUNTRY_CODES.find((c) => c.code === e.target.value);
                          if (found) setSelectedCountry(found);
                        }}
                        className="h-12 px-3 rounded-2xl bg-white/5 border border-white/15 text-white text-xs font-semibold focus:outline-none focus:border-[#e85432] transition-colors cursor-pointer appearance-none pr-7"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code} className="bg-[#140844] text-white">
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
                        ▼
                      </span>
                    </div>

                    {/* Phone Input */}
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder={selectedCountry.placeholder}
                      className="flex-1 h-12 px-4 rounded-2xl bg-white/5 border border-white/15 text-white text-sm font-semibold tracking-wider placeholder:text-gray-500 focus:outline-none focus:border-[#e85432] transition-colors"
                      required
                      autoFocus
                    />
                  </div>
                  <p className="text-[11px] text-gray-400 text-right">
                    مثال: {selectedCountry.placeholder}
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
                      <span>جاري إرسال الرمز عبر Firebase SMS...</span>
                    </>
                  ) : (
                    <>
                      <span>إرسال رمز التحقق (SMS)</span>
                      <ArrowRight className="w-4 h-4 rotate-180" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Email Form */}
            {activeTab === 'email' && (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendCode();
                }}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-200">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full h-12 px-4 rounded-2xl bg-white/5 border border-white/15 text-white text-sm font-semibold placeholder:text-gray-500 focus:outline-none focus:border-[#e85432] transition-colors text-left"
                    dir="ltr"
                    required
                    autoFocus
                  />
                  <p className="text-[11px] text-gray-400">
                    سيتم إرسال رابط تسجيل دخول آمن ومباشر من Firebase إلى بريدك.
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
                      <span>جاري الإرسال عبر Firebase...</span>
                    </>
                  ) : (
                    <>
                      <span>إرسال رابط الدخول الآمن</span>
                      <ArrowRight className="w-4 h-4 rotate-180" />
                    </>
                  )}
                </button>
              </form>
            )}

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
          </div>
        )}

        {/* ================= STEP 2: 6-DIGIT OTP VERIFICATION ================= */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            {/* Target Display and Change link */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-gray-200">
                <Phone className="w-4 h-4 text-[#ff7a59]" />
                <span dir="ltr" className="font-bold">
                  {selectedCountry.code} {phoneNumber}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setOtpDigits(['', '', '', '', '', '']);
                  setFirebaseError(null);
                }}
                className="text-[#ff7a59] hover:text-white font-bold transition-colors cursor-pointer text-[11px]"
              >
                تعديل الرقم
              </button>
            </div>

            {/* 6 OTP Input Boxes */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-300 text-center">
                أدخل رمز SMS المستلم من Firebase (6 أرقام)
              </label>
              <div className="flex items-center justify-center gap-2 sm:gap-3" dir="ltr" onPaste={handleOtpPaste}>
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      otpInputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-11 h-13 sm:w-12 sm:h-14 rounded-2xl bg-white/5 border-2 border-white/15 text-white text-center text-xl font-bold focus:outline-none focus:border-[#e85432] focus:bg-white/10 transition-all shadow-inner"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
            </div>

            {/* Verify Button */}
            <button
              type="button"
              onClick={() => handleVerifyCode()}
              disabled={loading || otpDigits.includes('')}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#e85432] to-[#ff7a59] text-white font-bold text-sm shadow-xl shadow-[#e85432]/30 hover:shadow-[#e85432]/50 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>جاري التحقق عبر Firebase...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>تأكيد الرمز والدخول</span>
                </>
              )}
            </button>

            {/* Countdown & Resend Section */}
            <div className="text-center text-xs text-gray-400">
              {canResend ? (
                <button
                  type="button"
                  onClick={() => handleSendCode()}
                  disabled={loading}
                  className="text-[#ff7a59] hover:underline font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>إعادة إرسال رمز جديد الآن</span>
                </button>
              ) : (
                <span>
                  يمكنك طلب رمز جديد بعد:{' '}
                  <strong className="text-white font-mono">
                    00:{countdown < 10 ? `0${countdown}` : countdown}
                  </strong>
                </span>
              )}
            </div>
          </div>
        )}

        {/* ================= STEP 3: NAME REGISTRATION (NEW USERS) ================= */}
        {step === 3 && (
          <form onSubmit={handleCompleteRegistration} className="space-y-5 animate-fade-in">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#e85432]/10 to-transparent border border-[#e85432]/25 text-center space-y-1">
              <span className="text-xs font-bold text-[#ff7a59]">تسجيل مستخدم جديد</span>
              <p className="text-xs text-gray-300">
                تم التحقق من رقمك بنجاح! يرجى إدخال اسمك الكريم لإكمال حفظ ملفك الشخصي.
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
                  <span>جاري حفظ الحساب في Firestore...</span>
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
                  <p>1. جمع البيانات: نقوم بجمع رقم الجوال أو البريد الإلكتروني والاسم فقط لأغراض تسجيل الدخول، التواصل، ومتابعة الطلبات.</p>
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
