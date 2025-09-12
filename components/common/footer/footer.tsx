import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useFetchData from '@/hooks/use-fetch';
import Newsletter from '../newsletter/newsletter';
import { MapPin, Phone, Mail } from 'lucide-react';
import { SocialLinkResponse } from '@/types/social-contact';

const Footer: React.FC = () => {
  const SHOP_LINKS = [
    { name: "SHOP ALL", href: "/shop" },
    { name: "MOISTURIZER", href: "/" },
    { name: "FACIAL CARE", href: "/" },
    { name: "K-CARE", href: "/" },
    { name: "ESSENTIAL", href: "/" },
    { name: "SUNSCREEN", href: "/" },
  ];

  const ABOUT_LINKS = [
    { name: "WHO WE ARE?", href: "/about" },
    { name: "CAREER", href: "/career" },
    { name: "BLOGS", href: "/blogs" },
    { name: "TERMS & CONDITION", href: "/terms-and-condition" },
    { name: "PRIVACY & POLICY", href: "/privacy-policy" },
  ];

  const HELP_LINKS = [
    { name: "FAQ", href: "/help" },
    { name: "HELP AND SUPPORT", href: "/help" },
  ];


  const { data: socialLinks } = useFetchData<SocialLinkResponse[]>('social-links/dropdown');

  return (
    <footer className="relative h-fit bg-[#161616] text-white padding">

      {/* Footer Content */}
      <div className="flex flex-col pt-10 pb-10 sm:pb-8 md:pb-0">
        {/* News Letter */}
        <div className='flex flex-col gap-4 mb-14 bg-inherit lg:gap-0 lg:flex-row lg:justify-between'>
          <div>
            <h1 className='text-2xl font-semibold md:text-xl lg:text-5xl'>
              Where Elegance Meets Everyday Beauty
            </h1>
          </div>
          <div className='h-full w-full lg:w-[70%]'>
            <Newsletter />
          </div>
        </div>
        {/* Mobile Layout */}
        <div className="block space-y-8 lg:hidden">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Useful Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Shop</h3>
                <ul className="space-y-3">
                  {
                    SHOP_LINKS.map((link) => (
                      <li key={link.name} className="flex items-center space-x-2">
                        {/* <span className="flex-shrink-0 w-2 h-2 rounded-full bg-amber-600"></span> */}
                        <a
                          href={link.href}
                          className="text-sm text-gray-300 transition-colors duration-200 hover:text-amber-400"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* More Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">About</h3>
                <ul className="space-y-3">
                  {
                    ABOUT_LINKS.map((link) => (
                      <li key={link.name} className="flex items-center space-x-2">
                        {/* <span className="flex-shrink-0 w-2 h-2 rounded-full bg-amber-600"></span> */}
                        <a
                          href={link.href}
                          className="text-sm text-gray-300 transition-colors duration-200 hover:text-amber-400"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">HELP</h3>
              <ul className="space-y-3">
                {
                  HELP_LINKS.map((link) => (
                    <li key={link.name} className="flex items-center space-x-2">
                      {/* <span className="flex-shrink-0 w-2 h-2 rounded-full bg-amber-600"></span> */}
                      <a
                        href={link.href}
                        className="text-sm text-gray-300 transition-colors duration-200 hover:text-amber-400"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))
                }
              </ul>
            </div>
            {/* Contact Us */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="flex-shrink-0 w-4 h-4 text-amber-600" />
                  <span className="text-sm text-gray-300">Kathmandu, Nepal</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="flex-shrink-0 w-4 h-4 text-amber-600" />
                  <span className="text-sm text-gray-300">555555555</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="flex-shrink-0 w-4 h-4 text-amber-600" />
                  <span className="text-sm text-gray-300">bsera@links.com</span>
                </div>
                <div className="flex items-center gap-4">
                  {
                    socialLinks?.map((social, index) => {
                      return (
                        <Link href={social.url} key={index}>
                          <div className='relative w-6 h-6'>
                            <Image className='object-center transition-transform rounded-sm duration-400 hover:border-red-500 hover:border' src={social.icon} alt={social.name} fill />
                          </div>
                        </Link>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-4">
          {/* SHOP Links - Desktop */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray">SHOP</h3>
            <ul className="space-y-3">
              {
                SHOP_LINKS.map((link) => (
                  <li key={link.name} className="flex items-center space-x-2">
                    <a
                      href={link.href}
                      className="text-sm text-gray-300 transition-colors duration-200 hover:text-primary"
                    >
                      {link.name}
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>
          {/* ABOUT Links - Desktop */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray">ABOUT</h3>
            <ul className="space-y-3">
              {
                ABOUT_LINKS.map((link) => (
                  <li key={link.name} className="flex items-center space-x-2">
                    <a
                      href={link.href}
                      className="text-sm text-gray-300 transition-colors duration-200 hover:text-primary"
                    >
                      {link.name}
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>
          {/* HELP Links - Desktop */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray">HELP</h3>
            <ul className="space-y-3">
              {
                HELP_LINKS.map((link) => (
                  <li key={link.name} className="flex items-center space-x-2">
                    <a
                      href={link.href}
                      className="text-sm text-gray-300 transition-colors duration-200 hover:text-primary"
                    >
                      {link.name}
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>
          {/* Contact Us - Desktop */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="flex-shrink-0 w-4 h-4 text-primary" />
                <span className="text-sm text-gray-300 uppercase">Hello@UltraBeauty.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="flex-shrink-0 w-4 h-4 text-primary" />
                <span className="text-sm text-gray-300">BIRTAMOD - 4, JHAPA, KOSHI NEPAL</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="flex-shrink-0 w-4 h-4 text-primary" />
                <span className="text-sm text-gray-300">
                  +977-9824386694, 25254568
                </span>
              </div>
              <div className="flex items-center gap-4">
                {
                  socialLinks?.map((social, index) => {
                    return (
                      <Link href={social.url} key={index}>
                        <div className='relative w-6 h-6'>
                          <Image className='object-center transition-transform rounded-sm duration-400 hover:border-red-500 hover:border' src={social.icon} alt={social.name} fill />
                        </div>
                      </Link>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="flex-col items-center pt-8 pb-8 space-y-4 border-t-2 border-gray-700 mt-14 display-flex">
          <p className="text-sm text-white md:text-base">
            EMBRACE THE BEAUTY WITHIN. CAREFULLY CHOSEN PIECES MADE TO ENHANCE YOUR NATURAL GRACE AND DAILY ROUTINE.
          </p>
          <p className="text-xs text-gray-400">
            ALL RIGHT RESERVED ULTRA BEAUTY & BRAND
            DESIGNED AND DEVELOPED BY
            <Link href="https://hunchhadigital.com/" className='hover:underline'> HUNCHHA DIGITAL</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;