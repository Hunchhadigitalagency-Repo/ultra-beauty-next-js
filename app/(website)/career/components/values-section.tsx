import React from 'react';
import SectionHeader from '@/components/common/header/section-header';
import { BookCheck, Fingerprint, Lightbulb, Earth } from 'lucide-react';

const VALUES = [
    {
        id: 1,
        title: 'Trust',
        description: 'Trust is at the heart of everything we do at.',
        icon: BookCheck,
    },
    {
        id: 2,
        title: 'Accessibility',
        description: 'We build inclusive experiences for everyone.',
        icon: Fingerprint,
    },
    {
        id: 3,
        title: 'Innovations',
        description: 'We thrive on creativity and forward thinking.',
        icon: Lightbulb,
    },
    {
        id: 4,
        title: 'Global Reach',
        description: 'Our work reaches people across the globe.',
        icon: Earth,
    },
];

const ValuesSection: React.FunctionComponent = () => {
    return (
        <section className="p-2 sm:p-5 md:p-10 bg-secondary flex flex-col gap-5">
            <SectionHeader
                title="Values That Shape Us"
                description="What Drives Us"
                titleClassName="text-primary"
            />

            <div className="w-full grid grid-cols-2 gap-2 md:gap-5 lg:gap-6 xl:gap-8 md:grid-cols-2 lg:grid-cols-4">
                {VALUES.map(({ id, title, description, icon: Icon }) => (
                    <div
                        key={id}
                        className="w-full bg-white rounded-sm p-5 xl:p-8 flex flex-col items-start gap-3 overflow-hidden "
                    >
                        <div className="bg-secondary p-4 rounded-md self-start">
                            <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <SectionHeader
                            title={title}
                            description={description}
                            titleClassName="text-base text-primary sm:xl:text-3xl"
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ValuesSection