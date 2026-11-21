import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const savedLang = localStorage.getItem('mahalicence_lang');
      if (savedLang && translations[savedLang]) {
        return savedLang;
      }
    } catch (e) {
      console.warn('localStorage read error:', e);
    }
    return 'en';
  });

  const setLanguage = (lang) => {
    if (translations[lang]) {
      setLanguageState(lang);
      try {
        localStorage.setItem('mahalicence_lang', lang);
      } catch (e) {
        console.warn('localStorage write error:', e);
      }
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const currentTranslation = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: currentTranslation }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
