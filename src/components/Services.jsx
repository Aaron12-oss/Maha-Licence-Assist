import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Car, ArrowRight, ShieldCheck } from 'lucide-react';

// Dedicated Motorcycle With Gear (MCWG) Icon Component
const MotorcycleIcon = ({ className = "w-7 h-7" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Rear Wheel */}
    <circle cx="5" cy="17" r="3" />
    {/* Front Wheel */}
    <circle cx="19" cy="17" r="3" />
    {/* Frame & Engine connecting wheels */}
    <path d="M5 17l3.5-7h4.5l3 7" />
    {/* Fuel Tank & Seat line */}
    <path d="M7.5 10c1-2.5 3.5-3.5 5.5-3.5h2.5l2 3.5" />
    {/* Handlebars */}
    <path d="M14.5 7.5l2-3.5h2.5" />
    {/* Exhaust Pipe */}
    <path d="M8 17h6.5" />
  </svg>
);

// Dedicated Gearless Scooty / Scooter (MWG) Icon Component
const ScootyIcon = ({ className = "w-7 h-7" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Rear Wheel */}
    <circle cx="5.5" cy="17.5" r="2.5" />
    {/* Front Wheel */}
    <circle cx="18.5" cy="17.5" r="2.5" />
    {/* Low Step-Through Floorboard */}
    <path d="M8 17.5h8" />
    {/* Front Shield & Steering Column */}
    <path d="M15.5 17.5l2-9h-2.5" />
    {/* Handlebars & Headlight visor */}
    <path d="M14 8.5h4.5" />
    {/* Scooter Body & Seat curve */}
    <path d="M5.5 15c0-3.5 2.5-6.5 6-6.5h4.5l-0.8 4" />
    {/* Rear grab rail */}
    <path d="M4 11.5c1.5-1 3-1.5 4.5-1.5" />
  </svg>
);

export const Services = ({ onSelectService }) => {
  const { t } = useLanguage();

  const servicesList = [
    {
      id: 'LMV',
      title: t.services.lmvTitle,
      badge: t.services.lmvBadge,
      desc: t.services.lmvDesc,
      icon: Car,
      iconBg: 'bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
      badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
      borderColor: 'hover:border-blue-500'
    },
    {
      id: 'MCWG',
      title: t.services.mcwgTitle,
      badge: t.services.mcwgBadge,
      desc: t.services.mcwgDesc,
      icon: MotorcycleIcon,
      iconBg: 'bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400',
      badgeBg: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300',
      borderColor: 'hover:border-indigo-500'
    },
    {
      id: 'MWG',
      title: t.services.mwgTitle,
      badge: t.services.mwgBadge,
      desc: t.services.mwgDesc,
      icon: ScootyIcon,
      iconBg: 'bg-emerald-600/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
      badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
      borderColor: 'hover:border-emerald-500'
    }
  ];

  const handleServiceClick = (serviceId) => {
    if (onSelectService) {
      onSelectService(serviceId);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Licence Assistance Categories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.services.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal">
            {t.services.subtitle}
          </p>
        </div>

        {/* 3 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesList.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className={`bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700/80 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group ${service.borderColor}`}
              >
                <div>
                  {/* Icon & Badge Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${service.badgeBg}`}>
                      {service.badge}
                    </span>
                  </div>

                  {/* Service Code Badge */}
                  <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                    Category: {service.id}
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    {service.title}
                  </h3>

                  {/* Simple Explanation */}
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>

                {/* Get Assistance CTA Button */}
                <button
                  onClick={() => handleServiceClick(service.id)}
                  className="w-full py-3.5 px-4 bg-slate-900 hover:bg-blue-600 dark:bg-slate-700 dark:hover:bg-blue-600 text-white font-semibold rounded-2xl transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-blue-600/30"
                >
                  <span>{t.services.getAssistanceBtn}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Disclaimer Note */}
        <div className="mt-12 text-center text-xs text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          * Note: Service assistance covers document preparation guidance and registration application help. Government fees and timelines are subject to official RTO guidelines.
        </div>

      </div>
    </section>
  );
};
