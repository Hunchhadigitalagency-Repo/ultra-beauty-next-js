import React from "react";
import heroImage from '@/assets/bg-hero.png'
import ContactForm from "./components/contact-form";
import ContactSection from "./components/contact-section";
import SectionHeader from "@/components/common/header/section-header";

const ContactPage: React.FunctionComponent = () => {
  return (
    <main className="pt-4 sm:pt-6 lg:pt-8">
      <div className="relative h-60 md:h-80 lg:h-[450px] rounded-lg shadow-lg overflow-visible">
        {/* Background Image */}
        <div
          style={{
            backgroundImage: `url(${heroImage.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="absolute inset-0 z-0"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-10" />

        {/* Content */}
        <div className="relative z-20 flex justify-center items-center h-full">
          <SectionHeader
            title="Contact Us"
            description="Know Where We Are"
            titleClassName="text-white"
            descriptionClassName="text-white"
            className="text-center"
          />
        </div>
      </div>

      <div className="w-full flex pb-1 justify-center">

        {/* Form Wrapper */}
        <div className="w-[95%] lg:w-[90%] xl:w-[80%] rounded-2xl overflow-hidden z-20 p-5 sm:p-10 -mt-10 md:-mt-20 bg-[#F6F6F6]">
          <section className="grid grid-cols-1 gap-10 lg:grid-cols-2">

            {/* Contact Details */}
            <div className="w-full h-full">
              <ContactSection />
            </div>

            {/* Contact Form */}
            <div className="w-full h-full">
              <SectionHeader
                title="Send us a message"
                description=""
                titleClassName="lg:text-4xl"
                className="mb-10"
              />
              <ContactForm />
            </div>
          </section>
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-[450px] mt-12 bg-transparent">
        <iframe
          className="w-[95%] lg:w-[90%] xl:w-full h-full rounded-md xl:rounded-none"
          loading="lazy"
          src=
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3566.169840575962!2d87.9907602!3d26.643044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e5bb0b95d73921%3A0x714dd4f503bfbc52!2sUltra%20Beauty%20%26%20Brands!5e0!3m2!1sen!2snp!4v1759907794345!5m2!1sen!2snp"
        ></iframe>
      </div>
    </main>
  );
};

export default ContactPage;
