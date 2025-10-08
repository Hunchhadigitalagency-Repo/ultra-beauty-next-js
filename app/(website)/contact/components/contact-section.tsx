'use client'
import React from "react";
// import {
//   FaFacebook,
//   FaInstagram,
//   FaLinkedin,
//   FaXTwitter,
// } from "react-icons/fa6";
import ContactItem from "./contact-item";
import { MailIcon, Navigation, PhoneIcon } from "lucide-react";
import SectionHeader from "@/components/common/header/section-header";
// import SocialLink from "@/components/common/social-links/social-link-item";
import { SocialLinkResponse } from "@/types/social-contact";
import useFetchData from "@/hooks/use-fetch";
import Link from "next/link";
import Image from "next/image";

const ContactSection: React.FunctionComponent = () => {
  const { data: socialLinks } = useFetchData<SocialLinkResponse[]>('social-links/dropdown/');

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
          details="+977 9826940855"
          icon={PhoneIcon}
        />
        <ContactItem
          title="Email"
          details="ultrabeautybrands@gmail.com"
          icon={MailIcon}
        />
        <ContactItem
          title="Our Location"
          details="One Stop Mall Ground Floor, Jhapa District, Nepal"
          icon={Navigation}
        />
      </div>

      {/* Social Icons */}
      <div className="px-5">
        <div className="flex items-center justify-between border-t-[1px] border-[#AAAAAA] pt-5 gap-4">
          {socialLinks?.map((social, index) => (
            <Link href={social.url} key={index} target="_blank" rel="noopener noreferrer">
              <div className="relative w-6 h-6">
                <Image
                  src={social.icon}
                  alt={social.name}
                  fill
                  className="object-center rounded-sm transition-transform duration-300 hover:scale-120 "
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
