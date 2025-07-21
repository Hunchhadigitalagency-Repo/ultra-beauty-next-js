
import React from 'react'
import HelpSectoion from './components/help-main-section'
import HelpSupportSection from './components/help-and-support/help-support'
import DirectContact from './components/contact/logo-contact'
import FAQSection from '@/components/common/faq/faq-section'

const Help = () => {
  return (
   <>
   <HelpSectoion/>
 <HelpSupportSection />
 <DirectContact/>
 <FAQSection/>
   </>
  )
}

export default Help