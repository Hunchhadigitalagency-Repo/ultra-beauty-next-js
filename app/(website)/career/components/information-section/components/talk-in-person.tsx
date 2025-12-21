import React from "react";
import ContactPerson from "./contact-person";
import SectionHeader from "@/components/common/header/section-header";

const CONTACT_PERSON = [
    {
        id: 1,
        name: 'Rishikesh Karki',
        image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D',
        position: 'Co-founder & CEO of the company',
        linkedin: ''
    },
    {
        id: 2,
        name: 'John Doe',
        image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D',
        position: 'Co-founder & CTO of the company',
        linkedin: ''
    },
    {
        id: 3,
        name: 'Saujal Karki',
        image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D',
        position: 'Developer of the company',
        linkedin: ''
    },
]

const TalkInPerson: React.FunctionComponent = () => {
    return (
        <section className="flex flex-col gap-5 md:gap-8 lg:justify-between h-full">
            <SectionHeader
                title="Want to talk in person ?"
                titleClassName="text-primary"
                description="Have questions or need  support?  Reach out to our team anytime via email, phone, or through the app. We’re here to help you!"
            />

            {/* Contact Details */}
            <div className="grid grid-cols-1 justify-start items-start gap-8 py-4">
                {
                    CONTACT_PERSON.map((person) => (
                        <ContactPerson
                            key={person.id}
                            name={person.name}
                            position={person.position}
                            image={person.image}
                        />
                    ))
                }
            </div>

            {/* Social Icons */}
            <div className="px-5">
                <div className="flex items-center text-sm justify-between border-t-[1px] border-[#AAAAAA] pt-5 gap-4">
                    <p>
                        &quot;Want to talk in person? We&apos;d love to meet you! Visit our office, schedule a face-to-face meeting, or drop by during our working hours — our team is always happy to connect and discuss how Ultra Beauty and Brands can help your business&quot;
                    </p>
                </div>
            </div>
        </section>
    );
};

export default TalkInPerson;
