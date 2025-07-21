import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import ContactItem from "./contact-item";
import { MailIcon, Navigation, PhoneIcon } from "lucide-react";
import SectionHeader from "@/components/common/header/section-header";
import SocialLink from "@/components/common/social-links/social-link-item";

const ContactSection: React.FunctionComponent = () => {
  return (
    <section className="flex flex-col gap-5 md:gap-8 lg:justify-between h-full">
      <SectionHeader
        title="Get In Touch"
        description="Have questions or need support? Reach out to our team anytime via email, phone, or through the app. We’re here to help you!"
      />

      {/* Contact Details */}
      <div className="grid grid-cols-1 justify-start items-start gap-8 py-4">
        <ContactItem
          title="Phone Number"
          details="+977-9800000000"
          icon={PhoneIcon}
        />
        <ContactItem
          title="Email"
          details="support@basera.io"
          icon={MailIcon}
        />
        <ContactItem
          title="Our Location"
          details="Ithari, Sunsari"
          icon={Navigation}
        />
      </div>

      {/* Social Icons */}
      <div className="px-5">
        <div className="flex items-center justify-between border-t-[1px] border-[#AAAAAA] pt-5 gap-4">
          <SocialLink
            icon={FaFacebook}
            link="https://facebook.com"
            iconClassName="size-7 text-[#9F9F9F]"
            ariaLabel="Facebook"
          />
          <SocialLink
            icon={FaXTwitter}
            link="https://twitter.com"
            iconClassName="size-7 text-[#9F9F9F]"
            ariaLabel="Twitter"
          />
          <SocialLink
            icon={FaLinkedin}
            link="https://linkedin.com"
            iconClassName="size-7 text-[#9F9F9F]"
            ariaLabel="LinkedIn"
          />
          <SocialLink
            icon={FaInstagram}
            link="https://instagram.com"
            iconClassName="size-7 text-[#9F9F9F]"
            ariaLabel="Instagram"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
