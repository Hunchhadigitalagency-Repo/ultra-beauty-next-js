import React from 'react';
import TalkInPerson from './components/talk-in-person';
import InformationForm from './components/information-form';
import SectionHeader from '@/components/common/header/section-header';

const InformationSection: React.FunctionComponent = () => {
    return (
        <section className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Contact Person */}
            <div className="w-full h-full">
                <TalkInPerson />
            </div>

            {/* Information Form */}
            <div className="w-full h-full">
                <SectionHeader
                    title="My information"
                    description=""
                    titleClassName="text-primary"
                    className="mb-10"
                />
                <InformationForm />
            </div>
        </section>
    )
}

export default InformationSection