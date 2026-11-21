import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle, Zap, MapPin, Compass, MessageSquare, Smartphone } from 'lucide-react';

export const WhyChooseUs = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: CheckCircle,
      title: t.whyChooseUs.item1Title,
      desc: t.whyChooseUs.item1Desc,
      iconColor: 'text-blue-500 bg-blue-50 dark:bg-blue-900/30'
    },
    {
      icon: Zap,
      title: t.whyChooseUs.item2Title,
      desc: t.whyChooseUs.item2Desc,
      iconColor: 'text-amber-500 bg-amber-50 dark:bg-amber-900/30'
    },
    {
      icon: MapPin,
      title: t.whyChooseUs.item3Title,
      desc: t.whyChooseUs.item3Desc,
      iconColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30'
    },
    {
      icon: Compass,
      title: t.whyChooseUs.item4Title,
      desc: t.whyChooseUs.item4Desc,
      iconColor: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
    },
    {
      icon: MessageSquare,
      title: t.whyChooseUs.item5Title,
      desc: t.whyChooseUs.item5Desc,
      iconColor: 'text-green-500 bg-green-50 dark:bg-green-900/30'
    },
    {
      icon: Smartphone,
      title: t.whyChooseUs.item6Title,
      desc: t.whyChooseUs.item6Desc,
      iconColor: 'text-purple-500 bg-purple-50 dark:bg-purple-900/30'
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <span>Customer Centric Service</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.whyChooseUs.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal">
            {t.whyChooseUs.subtitle}
          </p>
        </div>

        {/* 6 Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComp = benefit.icon;
            return (
              <div 
                key={index} 
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-3xl p-7 shadow-md hover:shadow-xl transition-all group"
              >
                <div className={`w-12 h-12 rounded-2xl ${benefit.iconColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
