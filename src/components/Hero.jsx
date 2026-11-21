import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_CONFIG } from '../config/business';
import { MessageSquare, PhoneCall, ShieldCheck, CheckCircle2, Car, Sparkles, MapPin } from 'lucide-react';

export const Hero = () => {
  const { t } = useLanguage();

  const handleWhatsAppClick = () => {
    const encodedMsg = encodeURIComponent(t.waMessages.general);
    window.open(`https://wa.me/${BUSINESS_CONFIG.WHATSAPP_NUMBER}?text=${encodedMsg}`, '_blank', 'noopener,noreferrer');
  };

  const handleCallClick = () => {
    window.location.href = `tel:${BUSINESS_CONFIG.RAW_PHONE_NUMBER}`;
  };

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-12 pb-20 md:pt-16 md:pb-28">
      
      {/* Background Decorative Lighting Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Small Trust Disclaimer Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-amber-400 text-xs sm:text-sm font-medium shadow-sm">
              <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {t.hero.title}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {t.hero.subtitle}
            </p>

            {/* Location Tag */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-blue-300 font-medium">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{BUSINESS_CONFIG.SERVICE_AREA}</span>
            </div>

            {/* Primary & Secondary Call To Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              
              {/* WhatsApp Primary CTA */}
              <button
                onClick={handleWhatsAppClick}
                className="w-full sm:w-auto px-7 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base sm:text-lg rounded-2xl shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageSquare className="w-6 h-6 fill-current text-white" />
                <span>{t.hero.whatsappBtn}</span>
              </button>

              {/* Phone Call Secondary CTA */}
              <button
                onClick={handleCallClick}
                className="w-full sm:w-auto px-7 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-base sm:text-lg rounded-2xl border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-3 shadow-md"
              >
                <PhoneCall className="w-5 h-5 text-blue-400" />
                <span>{t.hero.callBtn}</span>
              </button>
            </div>

            {/* Feature Highlights List */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0 text-left">
              {t.hero.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-slate-800/40 border border-slate-800/80 px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Modern Abstract Driving / Vehicle Vector Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Card Container with Modern Glassmorphism styling */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-900/20 relative overflow-hidden">
                
                {/* Visual SVG Graphic for Driving Licence Guidance */}
                <div className="w-full h-64 sm:h-72 bg-slate-950/60 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-between relative overflow-hidden group">
                  
                  {/* Decorative road lanes background pattern */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  
                  {/* Badge */}
                  <div className="relative z-10 bg-blue-600/30 border border-blue-500/40 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>Application Guidance</span>
                  </div>

                  {/* Vehicle & Licence Visual Art */}
                  <div className="relative z-10 my-auto flex flex-col items-center space-y-3">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <Car className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold text-lg">Maharashtra Services</div>
                      <div className="text-slate-400 text-xs mt-0.5">LMV • MCWG • MWG</div>
                    </div>
                  </div>

                  {/* Bottom Trust Note */}
                  <div className="relative z-10 w-full pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>100% Private Help</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      Available Now
                    </span>
                  </div>

                </div>

                {/* Micro floating info chip */}
                <div className="mt-4 bg-slate-800/90 border border-slate-700 rounded-xl p-3 flex items-center justify-between text-xs text-slate-300">
                  <span className="font-medium text-slate-200">Need fast assistance?</span>
                  <button 
                    onClick={handleWhatsAppClick}
                    className="text-emerald-400 hover:text-emerald-300 font-bold underline flex items-center gap-1"
                  >
                    WhatsApp Us →
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
