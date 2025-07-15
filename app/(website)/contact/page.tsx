import SectionHeader from "@/components/common/header/section-header";
import React from "react";
import ContactForm from "./components/contact-form";
import ContactSection from "./components/contact-section";

const ContactPage = () => {
  return (
    <main className="space-y-4 padding">
      <SectionHeader title="Contact Us" description="Know Where We Are" />
      <div className="py-2 px-4 bg-[#EBEBEB] rounded-sm font-medium text-custom-black text-base">
        <h2 className="">Enter your details below to contact us.</h2>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-stretch">
        <ContactForm />
        <ContactSection />

      </section>
    </main>
  );
};

export default ContactPage;
