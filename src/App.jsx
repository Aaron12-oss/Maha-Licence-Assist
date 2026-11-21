import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { HowItWorks } from './components/HowItWorks';
import { WhyChooseUs } from './components/WhyChooseUs';
import { FAQ } from './components/FAQ';
import { ContactForm } from './components/ContactForm';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { FloatingContactButtons } from './components/FloatingContactButtons';

export default function App() {
  const [selectedService, setSelectedService] = useState('LMV');

  const handleSelectService = (serviceId) => {
    setSelectedService(serviceId);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased pb-16 md:pb-0">
        
        {/* Navigation Header */}
        <Navbar />

        {/* Hero Section */}
        <main id="main-content">
          <Hero />

          {/* Service Cards (LMV, MCWG, MWG) */}
          <Services onSelectService={handleSelectService} />

          {/* How It Works (4 Steps) */}
          <HowItWorks />

          {/* Why Choose Us Benefits */}
          <WhyChooseUs />

          {/* FAQ Accordion */}
          <FAQ />

          {/* Contact / Lead Form */}
          <ContactForm selectedService={selectedService} />

          {/* Pre-footer Final CTA */}
          <FinalCTA />
        </main>

        {/* Footer */}
        <Footer />

        {/* Responsive Sticky & Floating Action Buttons */}
        <FloatingContactButtons />

      </div>
    </LanguageProvider>
  );
}
