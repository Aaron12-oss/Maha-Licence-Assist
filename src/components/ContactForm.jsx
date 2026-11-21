import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_CONFIG } from '../config/business';
import { Phone, MessageSquare, Send, CheckCircle2, AlertCircle, User, Smartphone, Lock, ShieldCheck } from 'lucide-react';
import { PrivacyModal } from './PrivacyModal';

// Helper function to sanitize untrusted user input against XSS / HTML Injection
const sanitizeInput = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .replace(/[<>'"]/g, '')   // Strip dangerous delimiters
    .trim();
};

export const ContactForm = ({ selectedService = 'LMV' }) => {
  const { t } = useLanguage();
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    licenceType: selectedService || 'LMV',
    contactMethod: 'WhatsApp',
    message: '',
    website_address: '' // Anti-spam Honeypot field (hidden from real users)
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastSubmitTimeRef = useRef(0);

  // Sync selectedService prop with local state when changed externally
  useEffect(() => {
    const validTypes = ['LMV', 'MCWG', 'MWG', 'NOT_SURE'];
    if (selectedService && validTypes.includes(selectedService)) {
      setFormData(prev => ({ ...prev, licenceType: selectedService }));
    }
  }, [selectedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Apply length bounds on keypress
    if (name === 'fullName' && value.length > 50) return;
    if (name === 'mobileNumber' && value.length > 10) return;
    if (name === 'message' && value.length > 500) return;

    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const sanitizedName = sanitizeInput(formData.fullName);
    const cleanPhone = formData.mobileNumber.replace(/\D/g, '');

    // Name Validation (Max 50 chars, min 2 chars, letters/spaces/dots only)
    if (!sanitizedName) {
      newErrors.fullName = t.contactForm.validation.nameRequired;
    } else if (sanitizedName.length < 2 || !/^[a-zA-Z\s'.]{2,50}$/.test(sanitizedName)) {
      newErrors.fullName = "Please enter a valid full name (2-50 characters, letters only).";
    }

    // Phone Validation (Strict 10-digit Indian Mobile Regex)
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = t.contactForm.validation.phoneRequired;
    } else if (cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      newErrors.mobileNumber = t.contactForm.validation.phoneInvalid;
    }

    // Licence Type Validation (Whitelisted options)
    const validLicenceTypes = ['LMV', 'MCWG', 'MWG', 'NOT_SURE'];
    if (!validLicenceTypes.includes(formData.licenceType)) {
      newErrors.licenceType = t.contactForm.validation.serviceRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateWhatsAppUrl = () => {
    const sanitizedName = sanitizeInput(formData.fullName);
    const sanitizedMsg = sanitizeInput(formData.message).substring(0, 150); // Truncate message for URL safety

    const msgTemplate = t.waMessages.formMessage;
    const filledMsg = msgTemplate
      .replace('{name}', sanitizedName)
      .replace('{licenceType}', formData.licenceType)
      .replace('{contactMethod}', formData.contactMethod)
      .replace('{message}', sanitizedMsg || 'None');
    
    return `https://wa.me/${BUSINESS_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(filledMsg)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Anti-Spam Honeypot check: If bot filled hidden field, reject silently
    if (formData.website_address.trim() !== '') {
      setSubmitted(true);
      return;
    }

    // 2. Client-side Rate Throttling (30s cooldown between submissions)
    const now = Date.now();
    if (now - lastSubmitTimeRef.current < 30000) {
      setErrors({ form: "Please wait 30 seconds before submitting another request." });
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    lastSubmitTimeRef.current = now;

    const sanitizedName = sanitizeInput(formData.fullName);
    const cleanPhone = formData.mobileNumber.replace(/\D/g, '');
    const sanitizedMessage = sanitizeInput(formData.message).substring(0, 500);
    
    // Automatically open WhatsApp with pre-filled details for instant delivery
    const waUrl = generateWhatsAppUrl();
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // Asynchronously send email notification via FormSubmit
    try {
      await fetch(`https://formsubmit.co/ajax/${BUSINESS_CONFIG.EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: sanitizedName,
          mobile: cleanPhone,
          licence_type: formData.licenceType,
          preferred_contact_method: formData.contactMethod,
          message: sanitizedMessage || 'No additional message',
          _subject: `🚗 New Driving Licence Assistance Request`,
          _captcha: 'false'
        })
      });
    } catch (err) {
      // Generic silent error handling - no internal stack trace exposure
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleOpenWhatsAppSubmit = () => {
    window.open(generateWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      mobileNumber: '',
      licenceType: 'LMV',
      contactMethod: 'WhatsApp',
      message: '',
      website_address: ''
    });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <section id="contact" className="py-20 bg-slate-100 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info & Business Card */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Fast Direct Contact</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {t.contactForm.title}
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                {t.contactForm.subtitle}
              </p>
            </div>

            {/* Business Contact Cards */}
            <div className="space-y-4">
              
              {/* WhatsApp Card */}
              <div 
                onClick={() => window.open(`https://wa.me/${BUSINESS_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(t.waMessages.general)}`, '_blank', 'noopener,noreferrer')}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase">WhatsApp Chat</div>
                    <div className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                      Click to Chat on WhatsApp
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                  Chat Now →
                </span>
              </div>

              {/* Phone Call Card */}
              <div 
                onClick={() => window.location.href = `tel:${BUSINESS_CONFIG.RAW_PHONE_NUMBER}`}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase">Phone Call</div>
                    <div className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      Click to Call Us Directly
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                  Call Now →
                </span>
              </div>

            </div>

            {/* Service Area & Hours Box */}
            <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl border border-slate-800 space-y-3 text-sm">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Service Coverage:</span>
                <span className="font-semibold text-white">Maharashtra State</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Business Hours:</span>
                <span className="font-semibold text-white">{BUSINESS_CONFIG.BUSINESS_HOURS}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Lead Form or Success View */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              
              {submitted ? (
                /* Success View */
                <div className="text-center py-8 space-y-6 animate-fade-in-up">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {t.contactForm.success.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto text-base">
                    {t.contactForm.success.message}
                  </p>

                  {/* Immediate WhatsApp Connect Button */}
                  <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl p-5 text-left space-y-3 max-w-md mx-auto">
                    <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                      {t.contactForm.success.whatsappPrompt}
                    </p>
                    <button
                      type="button"
                      onClick={handleOpenWhatsAppSubmit}
                      className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
                    >
                      <MessageSquare className="w-5 h-5 fill-current" />
                      <span>{t.contactForm.success.openWhatsappBtn}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white underline pt-2"
                  >
                    {t.contactForm.success.newRequestBtn}
                  </button>
                </div>
              ) : (
                /* Main Interactive Form */
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  
                  {/* Anti-Spam Honeypot Field (Visually hidden from human users) */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website_address"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website_address}
                      onChange={handleChange}
                    />
                  </div>

                  {errors.form && (
                    <div className="p-3 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-xs font-semibold rounded-xl flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errors.form}</span>
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      {t.contactForm.fullNameLabel} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        maxLength={50}
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder={t.contactForm.fullNamePlaceholder}
                        className={`w-full pl-11 pr-4 py-3 rounded-xl border text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 transition-all ${
                          errors.fullName 
                            ? 'border-red-500 focus:ring-red-400' 
                            : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label htmlFor="mobileNumber" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      {t.contactForm.mobileLabel} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <input
                        type="tel"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        placeholder={t.contactForm.mobilePlaceholder}
                        maxLength={10}
                        className={`w-full pl-11 pr-4 py-3 rounded-xl border text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 transition-all ${
                          errors.mobileNumber 
                            ? 'border-red-500 focus:ring-red-400' 
                            : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                        }`}
                      />
                    </div>
                    {errors.mobileNumber && (
                      <p className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.mobileNumber}</span>
                      </p>
                    )}
                  </div>

                  {/* Licence Type Selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      {t.contactForm.licenceTypeLabel} <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { id: 'LMV', label: 'LMV (Car)' },
                        { id: 'MCWG', label: 'MCWG (Bike)' },
                        { id: 'MWG', label: 'MWG (Scooter)' },
                        { id: 'NOT_SURE', label: t.contactForm.notSure }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, licenceType: opt.id }))}
                          className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                            formData.licenceType === opt.id
                              ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                              : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      {t.contactForm.contactMethodLabel}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, contactMethod: 'WhatsApp' }))}
                        className={`py-2.5 px-4 rounded-xl text-sm font-semibold border flex items-center justify-center gap-2 transition-all ${
                          formData.contactMethod === 'WhatsApp'
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-md'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>{t.contactForm.methodWhatsapp}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, contactMethod: 'Phone Call' }))}
                        className={`py-2.5 px-4 rounded-xl text-sm font-semibold border flex items-center justify-center gap-2 transition-all ${
                          formData.contactMethod === 'Phone Call'
                            ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <Phone className="w-4 h-4" />
                        <span>{t.contactForm.methodPhone}</span>
                      </button>
                    </div>
                  </div>

                  {/* Message / Requirement */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      {t.contactForm.messageLabel}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      maxLength={500}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t.contactForm.messagePlaceholder}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    ></textarea>
                    <div className="text-[11px] text-right text-slate-400 mt-1">
                      {formData.message.length}/500 chars
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <span>{t.contactForm.submittingBtn}</span>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{t.contactForm.submitBtn}</span>
                      </>
                    )}
                  </button>

                  <div className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1.5 pt-1">
                    <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Private & confidential.</span>
                    <button
                      type="button"
                      onClick={() => setPrivacyModalOpen(true)}
                      className="text-blue-500 hover:underline font-medium ml-1"
                    >
                      Read Privacy Policy
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Accessible Privacy Policy Modal */}
      <PrivacyModal 
        isOpen={privacyModalOpen} 
        onClose={() => setPrivacyModalOpen(false)} 
      />

    </section>
  );
};
