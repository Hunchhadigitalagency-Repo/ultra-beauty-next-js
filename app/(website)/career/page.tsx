import React from 'react';
import JobsSection from './components/jobs-section';
import ValuesSection from './components/values-section';
import FAQSection from '@/components/common/faq/faq-section';
import CareerHeroSection from './components/career-hero-section';
import InformationSection from './components/information-section/information-section';
import CareerImageCarouselSection from './components/career-image-carousel-section';

const Career: React.FunctionComponent = () => {
    return (
        <main className='padding-y space-y-8'>
            <CareerHeroSection />
            <section className='space-y-8 padding-x'>
                <ValuesSection />
                <CareerImageCarouselSection />
                <JobsSection />
                <InformationSection />
                <FAQSection />
            </section>
        </main>
    )
}

export default Career