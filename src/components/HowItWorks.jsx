import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MessageSquare, FileText, UserCheck, CheckCircle2 } from 'lucide-react';

export const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    {
      num: "01",
      icon: MessageSquare,
      title: t.howItWorks.step1Title,
      desc: t.howItWorks.step1Desc,
      bgColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
    },
    {
      num: "02",
      icon: FileText,
      title: t.howItWorks.step2Title,
      desc: t.howItWorks.step2Desc,
      bgColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
    },
    {
      num: "03",
      icon: UserCheck,
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
      bgColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
    },
    {
      num: "04",
      icon: CheckCircle2,
      title: t.howItWorks.step4Title,
      desc: t.howItWorks.step4Desc,
      bgColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <span>Simple Guidance Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.howItWorks.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={index} 
                className="relative bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-3xl p-6 hover:shadow-xl transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Icon Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors">
                      {step.num}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl ${step.bgColor} flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center text-xs font-medium text-slate-400">
                  <span>Step {index + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
