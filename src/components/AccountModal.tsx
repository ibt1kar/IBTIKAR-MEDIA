import React, { useState } from 'react';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  LogOut, 
  Check, 
  Edit3, 
  Loader2,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { updateUserProfileName } from '../services/firebase';

export const AccountModal: React.FC = () => {
  const { 
    user, 
    userProfile, 
    isAccountModalOpen, 
    closeAccountModal, 
    logout, 
    refreshUserProfile,
    updateLocalProfile 
  } = useAuth();

  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(userProfile?.name || user?.displayName || '');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If modal is closed or user is not logged in, do not render (protected)
  if (!isAccountModalOpen || !user) return null;

  const currentDisplayName = userProfile?.name || user.displayName || 'عميل ابتكار';
  const initial = currentDisplayName.trim().charAt(0) || 'ع';

  const handleSaveName = async () => {
    const trimmed = nameInput.trim();
    if (trimmed.length < 2) {
      setErrorMessage('يجب أن يحتوي الاسم على حرفين على الأقل.');
      return;
    }

    setSaving(true);
    setErrorMessage(null);
    try {
      await updateUserProfileName(user.uid, trimmed);
      if (userProfile) {
        updateLocalProfile({ ...userProfile, name: trimmed });
      }
      await refreshUserProfile();
      setIsEditingName(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err: any) {
      console.error('Error updating name:', err);
      setErrorMessage('تعذر تحديث الاسم في قاعدة البيانات.');
    } finally {
      setSaving(false);
    }
  };

  const formattedDate = userProfile?.createdAt 
    ? new Date(userProfile.createdAt).toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'عضو جديد';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in text-right"
      dir="rtl"
    >
      <div 
        className="relative w-full max-w-md bg-[#12083b] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Strip */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#e85432] via-[#ff7a59] to-[#e85432]"></div>

        {/* Close Button */}
        <button
          onClick={closeAccountModal}
          className="absolute top-5 left-5 p-2 rounded-full glass-panel text-gray-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Avatar and User Name */}
        <div className="text-center space-y-3 mb-6">
          <div className="relative inline-block">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#e85432] to-[#ff7a59] flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-[#e85432]/40 border-2 border-white/20">
              {initial}
            </div>
            <div className="absolute bottom-0 left-0 p-1.5 rounded-full bg-emerald-500 text-white border-2 border-[#12083b] shadow">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#e85432]/15 text-[#ff7a59] text-[11px] font-bold border border-[#e85432]/25 mb-1.5">
              <Sparkles className="w-3 h-3" />
              <span>عميل معتمد لدى ابتكار</span>
            </div>
            <h2 className="text-xl font-black text-white">{currentDisplayName}</h2>
            <p className="text-xs text-gray-400 font-mono mt-0.5">
              {userProfile?.phone || user.phoneNumber || userProfile?.email || user.email || 'حساب مفعل'}
            </p>
          </div>
        </div>

        {/* Success Alert */}
        {saveSuccess && (
          <div className="mb-4 p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>تم تحديث اسمك بنجاح!</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Account Details Box */}
        <div className="space-y-3 p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
          {/* Editable Name Field */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <User className="w-4 h-4 text-[#ff7a59]" />
              <span>الاسم في الحساب:</span>
            </div>

            {isEditingName ? (
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="px-2.5 py-1 rounded-xl bg-white/10 border border-white/20 text-white text-xs focus:outline-none focus:border-[#e85432] w-36"
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  disabled={saving}
                  className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                  title="حفظ"
                >
                  {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => {
                    setIsEditingName(false);
                    setNameInput(currentDisplayName);
                  }}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 cursor-pointer"
                  title="إلغاء"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{currentDisplayName}</span>
                <button
                  onClick={() => {
                    setNameInput(currentDisplayName);
                    setIsEditingName(true);
                  }}
                  className="text-gray-400 hover:text-[#ff7a59] transition-colors p-1 cursor-pointer"
                  title="تعديل الاسم"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Contact Identifier */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2 text-gray-400">
              <Mail className="w-4 h-4 text-[#ff7a59]" />
              <span>البريد الإلكتروني:</span>
            </div>
            <span className="font-bold text-white font-mono" dir="ltr">
              {userProfile?.email || user.email || 'غير محدد'}
            </span>
          </div>

          {/* Auth Method */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2 text-gray-400">
              <ShieldCheck className="w-4 h-4 text-[#ff7a59]" />
              <span>نوع المصادقة:</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[11px] border border-emerald-500/30">
              رابط بريد إلكتروني آمن (Email Link)
            </span>
          </div>

          {/* Join Date */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4 text-[#ff7a59]" />
              <span>تاريخ الانضمام:</span>
            </div>
            <span className="text-gray-300 font-medium">{formattedDate}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => {
              closeAccountModal();
              logout();
            }}
            className="w-full h-11 rounded-2xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 hover:text-red-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>تسجيل الخروج من الحساب</span>
          </button>
        </div>
      </div>
    </div>
  );
};
