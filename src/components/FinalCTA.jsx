import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_CONFIG } from '../config/business';
import { MessageSquare, PhoneCall } from 'lucide-react';

export const FinalCTA = () => {
  const { t } = useLanguage();

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${BUSINESS_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(t.waMessages.general)}`, '_blank', 'noopener,noreferrer');
  };

  const handleCall = () => {
    window.location.href = `tel:${BUSINESS_CONFIG.RAW_PHONE_NUMBER}`;
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-900/30 rounded-full blur-2xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          {t.finalCta.title}
        </h2>

        <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto font-normal">
          {t.finalCta.subtitle}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          <button
            onClick={handleWhatsApp}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-base sm:text-lg rounded-2xl shadow-xl shadow-emerald-900/30 hover:shadow-emerald-900/50 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <MessageSquare className="w-6 h-6 fill-current" />
            <span>{t.finalCta.whatsappBtn}</span>
          </button>

          <button
            onClick={handleCall}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-base sm:text-lg rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3"
          >
            <PhoneCall className="w-5 h-5 text-blue-600" />
            <span>{t.finalCta.callBtn}</span>
          </button>

        </div>

      </div>
    </section>
  );
};
