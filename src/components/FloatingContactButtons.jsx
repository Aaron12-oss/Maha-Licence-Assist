import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_CONFIG } from '../config/business';
import { MessageSquare, PhoneCall } from 'lucide-react';

export const FloatingContactButtons = () => {
  const { t } = useLanguage();

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(t.waMessages.general);
    window.open(`https://wa.me/${BUSINESS_CONFIG.WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  const handleCall = () => {
    window.location.href = `tel:${BUSINESS_CONFIG.RAW_PHONE_NUMBER}`;
  };

  return (
    <>
      {/* Mobile Fixed Sticky Bottom Bar (Visible only on screens under md) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-3 md:hidden shadow-2xl">
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          
          {/* Mobile WhatsApp Button */}
          <button
            onClick={handleWhatsApp}
            className="py-3 px-4 bg-emerald-600 active:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
            aria-label="Contact us on WhatsApp"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            <span>{t.floating.whatsapp}</span>
          </button>

          {/* Mobile Call Button */}
          <button
            onClick={handleCall}
            className="py-3 px-4 bg-blue-600 active:bg-blue-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
            aria-label="Call us now"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{t.floating.call}</span>
          </button>

        </div>
      </div>

      {/* Desktop Floating Action Buttons (Visible only on md and larger screens) */}
      <div className="hidden md:flex flex-col gap-3 fixed bottom-6 right-6 z-50">
        
        {/* Floating Call Button */}
        <button
          onClick={handleCall}
          className="w-14 h-14 rounded-full bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 flex items-center justify-center shadow-xl hover:scale-110 transition-transform group relative"
          title={t.floating.call}
          aria-label="Call Us"
        >
          <PhoneCall className="w-6 h-6" />
          <span className="absolute right-16 bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            {t.floating.call} Support
          </span>
        </button>

        {/* Floating WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-600/40 hover:scale-110 transition-transform group relative"
          title={t.floating.whatsapp}
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-7 h-7 fill-current" />
          <span className="absolute right-16 bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            {t.floating.whatsapp} Guidance
          </span>
        </button>

      </div>
    </>
  );
};
