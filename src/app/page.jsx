'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PromiseStrip from '@/components/PromiseStrip';
import WhyUs from '@/components/WhyUs';
import HowWeWork from '@/components/HowWeWork';
import Coverage from '@/components/Coverage';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Location from '@/components/Location';
import Footer from '@/components/Footer';
import ContactSheet from '@/components/ContactSheet';
import '@/styles/colors_and_type.css';
import '@/styles/marketing.css';

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);

  // Always start at the top on page load / reload
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    // Initialize Lucide icons
    if (typeof window !== 'undefined' && window.lucide) {
      window.lucide.createIcons();
    }
  }, [contactOpen]);

  return (
    <>
      <Header onContactClick={() => setContactOpen(true)} />
      <main>
        <Hero onContactClick={() => setContactOpen(true)} />
        <PromiseStrip />
        <WhyUs />
        <HowWeWork />
        <Coverage />
        <Testimonials />
        <FAQ />
        <Location />
      </main>
      <Footer />
      <ContactSheet open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
