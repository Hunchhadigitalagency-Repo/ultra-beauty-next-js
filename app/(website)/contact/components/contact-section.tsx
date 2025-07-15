import React from "react";
import ContactItem from "./contact-item";
import { MailIcon, Navigation, PhoneIcon } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import SocialLink from "@/components/common/social-links/social-link-item";

const ContactSection = () => {
  return (
    <section className="space-y-6">
      <h6 className="text-foreground text-base font-medium">
        Have questions or need support? Reach out to our team anytime via email,
        phone, or through the app. We&apos;re here to help you!
      </h6>

      <div className="grid grid-cols-3 gap-8 border-b border-[#AAAAAA] py-4">
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

      <div className="flex items-center gap-4">
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

      <iframe
        className="w-full h-[350px] rounded-md shadow"

      
        loading="lazy"

        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.5272789675164!2d85.32096141461306!3d27.71724573297982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19071fb7f895%3A0x9511b0190b7c7490!2sKathmandu%2C%20Kathmandu%20District%2C%20Province%20No.%201%2C%20Nepal!5e0!3m2!1sen!2sus!4v1688131500950!5m2!1sen!2sus"
      ></iframe>
    </section>
  );
};

export default ContactSection;
