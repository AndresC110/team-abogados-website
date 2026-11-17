'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PromiseStrip from '@/components/PromiseStrip';
import WhyUs from '@/components/WhyUs';
import HowWeWork from '@/components/HowWeWork';
import Coverage from '@/components/Coverage';
import Reviews from '@/components/Reviews';
import VideoSection from '@/components/VideoSection';
import FAQ from '@/components/FAQ';
import Location from '@/components/Location';
import Footer from '@/components/Footer';
import ContactSheet from '@/components/ContactSheet';
import CookieConsent from '@/components/CookieConsent';
import { track } from '@/lib/consent';
import { LanguageProvider } from '@/context/LanguageContext';
import '@/styles/colors_and_type.css';
import '@/styles/marketing.css';

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);

  // Always scroll to top on page load / reload
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, []);

  useEffect(() => {
    // Initialize Lucide icons
    if (typeof window !== 'undefined' && window.lucide) {
      window.lucide.createIcons();
    }
    if (contactOpen) track('abrir_formulario');
  }, [contactOpen]);

  return (
    <LanguageProvider>
      <Header onContactClick={() => setContactOpen(true)} />
      <main>
        <Hero onContactClick={() => setContactOpen(true)} />
        <PromiseStrip />
        <WhyUs />
        <HowWeWork />
        <Coverage />
        <Reviews />
        <VideoSection onContactClick={() => setContactOpen(true)} />
        <FAQ />
        <Location />
      </main>
      <Footer />
      <ContactSheet open={contactOpen} onClose={() => setContactOpen(false)} />
      <CookieConsent />
    </LanguageProvider>
  );
}
