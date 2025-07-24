import React from 'react';
import HelpSectoion from './components/help-main-section';
import FAQSection from '@/components/common/faq/faq-section';
import DirectContact from './components/contact/logo-contact';
import HelpSupportSection from './components/help-and-support/help-support';

const Help = () => {
  return (
    <>
      <HelpSectoion />
      <HelpSupportSection />
      <DirectContact />
      <FAQSection />
    </>
  )
}

export default Help