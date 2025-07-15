import { ITeamCard, SocialPlatform } from "@/types/website";
import Image from "next/image";
import React, { JSX } from "react";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

const iconMap: Record<SocialPlatform, JSX.Element> = {
  facebook: <FaFacebook />,
  instagram: <FaInstagram/>,
  twitter: <FaXTwitter/>,
  linkedin: <FaLinkedin />,
};

const TeamCard = ({
  name,
  position,
  image,
  description,
  socialLinks = [],
}: ITeamCard) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
      <div className="relative w-[220px] h-[220px]">
        <Image src={image} alt={name} fill className="object-cover rounded-lg" />
      </div>

      <div className="flex flex-col gap-4 md:max-w-sm">
        <h4 className="text-lg font-semibold text-primary">{name}</h4>
        <p className="text-sm text-custom-black line-clamp-5 text-ellipsis">{description}</p>
        <div className="flex items-center justify-between gap-4">
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-[#9F9F9F] hover:text-primary transition-colors duration-200"
                >
                  {iconMap[social.platform]}
                </a>
              ))}
            </div>
          )}
          <h5 className="font-medium text-base text-primary">{position}</h5>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
