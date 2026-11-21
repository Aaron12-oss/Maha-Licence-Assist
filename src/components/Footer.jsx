import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_CONFIG } from '../config/business';
import { Car, Phone, MessageSquare, Mail, MapPin, ShieldAlert, ShieldCheck } from 'lucide-react';
import { PrivacyModal } from './PrivacyModal';

export const Footer = () => {
  const { t } = useLanguage();
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const handleNavClick = (id) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Car className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                {BUSINESS_CONFIG.BUSINESS_NAME}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Private Registration Guidance Provider</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNavClick('home')} className="hover:text-white transition-colors">
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="hover:text-white transition-colors">
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('how-it-works')} className="hover:text-white transition-colors">
                  {t.nav.howItWorks}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('why-choose-us')} className="hover:text-white transition-colors">
                  {t.nav.whyChooseUs}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('faq')} className="hover:text-white transition-colors">
                  {t.nav.faq}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contact')} className="hover:text-white transition-colors">
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {t.footer.contactInfo}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`tel:${BUSINESS_CONFIG.RAW_PHONE_NUMBER}`} className="hover:text-white transition-colors">
                  Call Us Directly
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href={`https://wa.me/${BUSINESS_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(t.waMessages.general)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Assistance
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${BUSINESS_CONFIG.EMAIL}`} className="hover:text-white transition-colors">
                  {BUSINESS_CONFIG.EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-xs pt-1">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_CONFIG.SERVICE_AREA}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours & Assistance */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {t.footer.hours}
            </h4>
            <p className="text-sm text-slate-400">
              {BUSINESS_CONFIG.BUSINESS_HOURS}
            </p>
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-xs space-y-1">
              <div className="font-semibold text-emerald-400">⚡ Online Support Available</div>
              <div className="text-slate-400">Submit requests 24/7 online via contact form.</div>
            </div>
          </div>

        </div>

        {/* Important Statutory Disclaimer Box */}
        <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 text-xs text-slate-300 space-y-2">
          <div className="font-bold text-amber-400 flex items-center gap-2 text-sm">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{t.footer.legalTitle}</span>
          </div>
          <p className="leading-relaxed">
            {t.footer.legalDisclaimer}
          </p>
        </div>

        {/* Copyright Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center sm:text-left">
          <div>
            © 2026 {BUSINESS_CONFIG.BUSINESS_NAME}. {t.footer.copyright}
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setPrivacyOpen(true)} 
              className="hover:text-slate-300 underline transition-colors"
            >
              Privacy Policy & Security
            </button>
            <span>•</span>
            <button onClick={() => handleNavClick('home')} className="hover:text-slate-400">
              Back to Top ↑
            </button>
          </div>
        </div>

      </div>

      <PrivacyModal 
        isOpen={privacyOpen} 
        onClose={() => setPrivacyOpen(false)} 
      />
    </footer>
  );
};
