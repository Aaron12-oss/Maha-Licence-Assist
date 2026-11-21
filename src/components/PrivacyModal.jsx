import React from 'react';
import { X, ShieldCheck, Lock, Eye, Trash2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in-up"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Close Privacy Policy"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 id="privacy-modal-title" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Privacy Policy & Data Security
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {BUSINESS_CONFIG.BUSINESS_NAME} • Private Registration Assistance
            </p>
          </div>
        </div>

        {/* Policy Content */}
        <div className="space-y-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
            <Lock className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                Private Assistance Provider Disclosure
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                We are a private guidance provider in Maharashtra. We are NOT affiliated with the Government of Maharashtra, Transport Department, or RTO. We collect basic contact details solely to assist you with your driving licence application request.
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-500" />
              Information We Collect
            </h4>
            <p>
              We only collect basic, voluntary information required to contact you regarding your assistance request:
            </p>
            <ul className="list-disc pl-5 mt-1 space-y-1 text-xs text-slate-500 dark:text-slate-400">
              <li>Full Name</li>
              <li>10-digit Indian Mobile Number</li>
              <li>Requested Licence Type (LMV, MCWG, MWG, or General Query)</li>
              <li>Preferred contact method (WhatsApp or Phone Call)</li>
              <li>Optional user message describing your query</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">
              How Your Information Is Handled
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your contact details are processed strictly to respond to your guidance request. We do NOT store your personal data in public browser databases, cookies, or frontend state. We NEVER sell, rent, or trade your personal information to third parties.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-red-500" />
              Data Deletion Requests
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              You can request deletion of your contact information at any time by contacting us directly via email at <span className="font-semibold text-slate-900 dark:text-white">{BUSINESS_CONFIG.EMAIL}</span> or via WhatsApp.
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-all"
          >
            Understood
          </button>
        </div>

      </div>
    </div>
  );
};
