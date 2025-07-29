import React from 'react';
import HelpSection from './components/help-main-section';
import FAQSection from '@/components/common/faq/faq-section';
import DirectContact from './components/contact/logo-contact';
import HelpSupportSection from './components/help-and-support/help-support';

const Help = () => {
  
  return (
    <>
      <HelpSection />
      <HelpSupportSection />
      <DirectContact />
      <FAQSection />
    </>
  )
}

export default Help