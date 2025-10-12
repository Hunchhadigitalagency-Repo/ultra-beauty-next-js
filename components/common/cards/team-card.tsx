"use client";
import Image from "next/image";
import React, { JSX } from "react";
import { ITeam } from "@/types/cms";
import { FaFacebook, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";

type TeamCardProps = ITeam;

const TeamCard = ({
  name,
  designation,
  photo,
  description,
  linkedin_link,
  facebook_link,
  twitter_link,
  instagram_link,
}: TeamCardProps) => {
  // Map URLs to icons
  const socialLinks: { url: string; icon: JSX.Element }[] = [];

  if (linkedin_link) socialLinks.push({ url: linkedin_link!, icon: <FaLinkedin /> });
  if (facebook_link) socialLinks.push({ url: facebook_link!, icon: <FaFacebook /> });
  if (twitter_link) socialLinks.push({ url: twitter_link!, icon: <FaTwitter /> });
  if (instagram_link) socialLinks.push({ url: instagram_link!, icon: <FaInstagram /> });

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-4 bg-white shadow rounded-lg">
      <div className="relative w-[220px] h-[220px] flex-shrink-0">
        <Image
          src={photo || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div className="flex flex-col gap-4 md:max-w-sm">
        <h4 className="text-lg font-semibold text-primary">{name}</h4>
            <h5 className="font-medium text-[12px] text-primary">{designation}</h5>
        <p className="text-sm text-custom-black line-clamp-5">{description}</p>
        <div className="flex items-center justify-between mt-2">
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-[#9F9F9F] hover:text-primary transition-colors duration-200"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Designation */}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;