import React, { useState, useEffect } from 'react';
import { SERVICES_DATA, SERVICE_PACKAGES_DATA, AGENCY_SOCIALS } from '../data/mockData';
import { X, Sparkles, Send, CheckCircle2, MessageSquare, ShieldCheck, CreditCard, Layers, PenTool } from 'lucide-react';

interface ServiceOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialPackageId?: string;
  initialPackageGroupId?: string;
}

export const ServiceOrderModal: React.FC<ServiceOrderModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  initialPackageId,
  initialPackageGroupId,
}) => {
  const [orderType, setOrderType] = useState<'package' | 'service' | 'custom'>(
    initialPackageId || initialPackageGroupId ? 'package' : initialServiceId ? 'service' : 'package'
  );

  const [selectedPackageGroup, setSelectedPackageGroup] = useState<string>(
    initialPackageGroupId || SERVICE_PACKAGES_DATA[0].id
  );

  const currentGroup =
    SERVICE_PACKAGES_DATA.find((g) => g.id === selectedPackageGroup) || SERVICE_PACKAGES_DATA[0];

  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    initialPackageId || currentGroup.packages[0].id
  );

  const [selectedService, setSelectedService] = useState<string>(
    initialServiceId || SERVICES_DATA[0].id
  );

  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialPackageGroupId || initialPackageId) {
      setOrderType('package');
      if (initialPackageGroupId) {
        setSelectedPackageGroup(initialPackageGroupId);
        const group = SERVICE_PACKAGES_DATA.find((g) => g.id === initialPackageGroupId);
        if (group && initialPackageId) {
          setSelectedPackageId(initialPackageId);
        } else if (group) {
          setSelectedPackageId(group.packages[0].id);
        }
      } else if (initialPackageId) {
        // find group
        for (const g of SERVICE_PACKAGES_DATA) {
          const found = g.packages.find((p) => p.id === initialPackageId);
          if (found) {
            setSelectedPackageGroup(g.id);
            setSelectedPackageId(initialPackageId);
            break;
          }
        }
      }
    } else if (initialServiceId) {
      setOrderType('service');
      setSelectedService(initialServiceId);
    }
  }, [initialServiceId, initialPackageId, initialPackageGroupId]);

  // When group changes, ensure package id is from that group
  const handleGroupChange = (groupId: string) => {
    setSelectedPackageGroup(groupId);
    const grp = SERVICE_PACKAGES_DATA.find((g) => g.id === groupId);
    if (grp && grp.packages.length > 0) {
      setSelectedPackageId(grp.packages[0].id);
    }
  };

  if (!isOpen) return null;

  const currentPkg = currentGroup.packages.find((p) => p.id === selectedPackageId) || currentGroup.packages[0];
  const currentServiceObj = SERVICES_DATA.find((s) => s.id === selectedService);

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    let detailsText = '';
    if (orderType === 'package') {
      detailsText = `الباقة المختارة: ${currentPkg?.title}
الخدمة: ${currentGroup.serviceTitle}
المخرجات: ${currentPkg?.deliverables}${currentPkg?.platforms ? `\nالمنصات: ${currentPkg.platforms}` : ''}`;
    } else if (orderType === 'service') {
      detailsText = `الخدمة المختارة: ${currentServiceObj?.title}${currentServiceObj?.badge ? ` (${currentServiceObj.badge})` : ''}`;
    } else {
      detailsText = `طلب خاص / تصميم منفرد بحسب الاحتياج`;
    }

    const message = `مرحباً منصة ابتكار Ibtikar 👋
أود طلب تنفيذ:
👤 الاسم: ${clientName || 'غير محدد'}
🏢 نوع النشاط / البراند: ${businessType || 'غير محدد'}
📱 رقم الجوال: ${phone || 'غير محدد'}
📌 ${detailsText}
📝 ملاحظات وتفاصيل إضافية:
${notes || 'لا يوجد ملاحظات إضافية'}`;

    const encodedMsg = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/966558875818?text=${encodedMsg}`;

    setSubmitted(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl my-auto text-right bg-[#140844]/95 custom-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2.5 rounded-full glass-panel hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white">تم تجهيز طلبك بنجاح!</h3>
            <p className="text-gray-300 max-w-md mx-auto text-sm leading-relaxed">
              جاري توجيهك إلى الواتساب المباشر لفريق منصة ابتكار لمتابعة طلبك وتنسيق بدء التنفيذ.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full glass-panel text-white text-sm font-semibold hover:bg-white/10"
              >
                تعديل الطلب
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#e85432] text-white text-sm font-bold shadow-lg shadow-[#e85432]/30"
              >
                إغلاق النافذة
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-[#e85432]/20 border border-[#e85432]/40 text-[#e85432]">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">اطلب باقتك أو خدمتك من ابتكار</h2>
                <p className="text-xs text-gray-300">
                  حلول تسويقية وتصميمية ممتازة تناسب أهداف براندك
                </p>
              </div>
            </div>

            {/* Selector Tabs */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-1.5 rounded-2xl glass-panel mb-6 border border-white/10">
              <button
                type="button"
                onClick={() => setOrderType('package')}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  orderType === 'package'
                    ? 'bg-[#e85432] text-white shadow-md shadow-[#e85432]/30'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>باقات الخدمات</span>
              </button>
              <button
                type="button"
                onClick={() => setOrderType('service')}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  orderType === 'service'
                    ? 'bg-[#e85432] text-white shadow-md shadow-[#e85432]/30'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>الخدمات الأساسية</span>
              </button>
              <button
                type="button"
                onClick={() => setOrderType('custom')}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  orderType === 'custom'
                    ? 'bg-[#e85432] text-white shadow-md shadow-[#e85432]/30'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>تصميم منفرد</span>
              </button>
            </div>

            <form onSubmit={handleSubmitWhatsApp} className="space-y-4">
              {/* Package Selection Mode */}
              {orderType === 'package' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-200 mb-1.5">
                      1. اختر مجال الخدمة:
                    </label>
                    <select
                      value={selectedPackageGroup}
                      onChange={(e) => handleGroupChange(e.target.value)}
                      className="w-full glass-input rounded-2xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#e85432] bg-[#140844]"
                    >
                      {SERVICE_PACKAGES_DATA.map((group) => (
                        <option key={group.id} value={group.id} className="bg-[#140844] text-white">
                          {group.serviceTitle}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-200 mb-1.5">
                      2. اختر الباقة المحددة:
                    </label>
                    <select
                      value={selectedPackageId}
                      onChange={(e) => setSelectedPackageId(e.target.value)}
                      className="w-full glass-input rounded-2xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#e85432] bg-[#140844]"
                    >
                      {currentGroup.packages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id} className="bg-[#140844] text-white">
                          {pkg.title} {pkg.isPopular ? '⭐ (الأكثر طلباً)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  {currentPkg && (
                    <div className="p-3.5 rounded-2xl glass-panel-orange border border-[#e85432]/30 text-xs text-gray-200 space-y-1.5">
                      <div className="flex items-center justify-between text-[#ff7a59] font-bold">
                        <span>المخرجات: {currentPkg.deliverables}</span>
                        {currentPkg.platforms && (
                          <span className="text-[11px] text-gray-300">المنصات: {currentPkg.platforms}</span>
                        )}
                      </div>
                      {currentPkg.suitableFor && (
                        <p className="text-[11px] text-gray-300">🎯 {currentPkg.suitableFor}</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Standalone Service Mode */}
              {orderType === 'service' && (
                <div>
                  <label className="block text-xs font-bold text-gray-200 mb-2">
                    اختر الخدمة المطلوبة:
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full glass-input rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#e85432] bg-[#140844]"
                  >
                    {SERVICES_DATA.map((srv) => (
                      <option key={srv.id} value={srv.id} className="bg-[#140844] text-white">
                        {srv.title} {srv.badge ? `(${srv.badge})` : ''}
                      </option>
                    ))}
                  </select>
                  {currentServiceObj && (
                    <div className="mt-2 p-3 rounded-xl glass-panel-orange text-xs text-gray-200">
                      <strong>تفاصيل الخدمة:</strong> {currentServiceObj.shortDescription}
                    </div>
                  )}
                </div>
              )}

              {orderType === 'custom' && (
                <div className="p-3.5 rounded-2xl glass-panel border border-[#e85432]/30 text-xs text-orange-200 leading-relaxed">
                  💡 <strong>ملاحظة:</strong> نتيح لك إمكانية طلب تصاميم منفردة وخاصة (بوست، بنر، فيديو ريلز، أو هوية مخصصة) وتحديد ميزانيتك ومخرجاتك بالضبط بحسب احتياج مشروعك.
                </div>
              )}

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    اسمك الكريـم *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: عبدالله العتيبي"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full glass-input rounded-xl px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    رقم الجوال / الواتساب *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="مثال: 0501234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full glass-input rounded-xl px-4 py-2.5 text-sm dir-ltr text-right"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  نوع النشاط أو اسم البراند / الشركة
                </label>
                <input
                  type="text"
                  placeholder="مثال: مطعم سحابي / متجر عطور / شركة مقاولات"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full glass-input rounded-xl px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  تفاصيل الإضافة أو الملاحظات
                </label>
                <textarea
                  rows={3}
                  placeholder="اكتب أهدافك، المنصات المفضلة، أو أي تفاصيل ترغب بإطلاع فريق ابتكار عليها..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full glass-input rounded-xl px-4 py-2.5 text-sm resize-none"
                ></textarea>
              </div>

              {/* Actions */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#e85432] to-[#ff7a59] text-white font-bold text-sm shadow-xl shadow-[#e85432]/30 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>إرسال الطلب عبر الواتساب المباشر</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>حلول مرنة وعقود متميزة تنمي أعمالك بثقة</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
