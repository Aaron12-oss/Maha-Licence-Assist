import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_CONFIG } from '../config/business';
import { ShieldAlert, Globe, Menu, X, ChevronDown, PhoneCall, Car } from 'lucide-react';

export const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr', label: 'मराठी', flag: '🇮🇳' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentLangObj = languages.find(l => l.code === language) || languages[0];

  return (
    <>
      {/* Top Legal Disclaimer Banner */}
      <div className="bg-amber-500 text-slate-950 px-4 py-1.5 text-xs sm:text-sm font-medium text-center flex items-center justify-center gap-2 border-b border-amber-600/30">
        <ShieldAlert className="w-4 h-4 shrink-0 text-slate-950" />
        <span>{t.disclaimer.bannerText}</span>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Brand Name */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                {BUSINESS_CONFIG.BUSINESS_NAME}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-medium tracking-wide uppercase">
                Private Assistance Service
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button 
              onClick={() => handleNavClick('home')} 
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            >
              {t.nav.home}
            </button>
            <button 
              onClick={() => handleNavClick('services')} 
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            >
              {t.nav.services}
            </button>
            <button 
              onClick={() => handleNavClick('how-it-works')} 
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            >
              {t.nav.howItWorks}
            </button>
            <button 
              onClick={() => handleNavClick('why-choose-us')} 
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            >
              {t.nav.whyChooseUs}
            </button>
            <button 
              onClick={() => handleNavClick('faq')} 
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            >
              {t.nav.faq}
            </button>
            <button 
              onClick={() => handleNavClick('contact')} 
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
            >
              {t.nav.contact}
            </button>
          </nav>

          {/* Desktop Right Side Controls (Language Selector + Contact Button) */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Language Selector Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-3.5 py-2 rounded-xl text-sm font-medium border border-slate-700 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-expanded={langDropdownOpen}
                aria-haspopup="true"
              >
                <Globe className="w-4 h-4 text-blue-400" />
                <span>{currentLangObj.flag} {currentLangObj.label}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-slate-800 border border-slate-700 rounded-xl shadow-xl py-1.5 z-50 animate-fade-in-up">
                  <div className="px-3 py-1 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                    Select Language
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-blue-600/20 hover:text-blue-300 transition-colors ${
                        language === lang.code ? 'bg-blue-600/30 text-blue-400 font-semibold' : 'text-slate-200'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </span>
                      {language === lang.code && <span className="w-2 h-2 rounded-full bg-blue-400"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Navbar Contact Us CTA Button */}
            <button
              onClick={() => handleNavClick('contact')}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-600/25 flex items-center gap-2 hover:shadow-blue-600/40 active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t.nav.contactBtn}</span>
            </button>
          </div>

          {/* Mobile Right Controls (Language pill + Mobile Menu Toggle) */}
          <div className="flex md:hidden items-center gap-2">
            
            {/* Quick Language Toggle Pill for Mobile */}
            <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
                    language === lang.code 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang.code.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-4 animate-fade-in-up">
            
            {/* Mobile Nav Links */}
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => handleNavClick('home')}
                className="text-left px-4 py-2.5 text-base font-medium text-slate-200 hover:bg-slate-800 rounded-xl"
              >
                {t.nav.home}
              </button>
              <button
                onClick={() => handleNavClick('services')}
                className="text-left px-4 py-2.5 text-base font-medium text-slate-200 hover:bg-slate-800 rounded-xl"
              >
                {t.nav.services}
              </button>
              <button
                onClick={() => handleNavClick('how-it-works')}
                className="text-left px-4 py-2.5 text-base font-medium text-slate-200 hover:bg-slate-800 rounded-xl"
              >
                {t.nav.howItWorks}
              </button>
              <button
                onClick={() => handleNavClick('why-choose-us')}
                className="text-left px-4 py-2.5 text-base font-medium text-slate-200 hover:bg-slate-800 rounded-xl"
              >
                {t.nav.whyChooseUs}
              </button>
              <button
                onClick={() => handleNavClick('faq')}
                className="text-left px-4 py-2.5 text-base font-medium text-slate-200 hover:bg-slate-800 rounded-xl"
              >
                {t.nav.faq}
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="text-left px-4 py-2.5 text-base font-medium text-slate-200 hover:bg-slate-800 rounded-xl"
              >
                {t.nav.contact}
              </button>
            </div>

            {/* Mobile Menu Language Selector Box */}
            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80 space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>Select Language / भाषा चुनें</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                    }}
                    className={`py-2 px-2 rounded-xl text-xs font-medium flex flex-col items-center justify-center gap-1 border transition-all ${
                      language === lang.code
                        ? 'bg-blue-600 border-blue-500 text-white font-bold shadow'
                        : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Contact Button */}
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl text-center shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-5 h-5" />
              <span>{t.nav.contactBtn}</span>
            </button>
          </div>
        )}
      </header>
    </>
  );
};
