import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import Newsletter from '../newsletter/newsletter';

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
    { name: "WHO WE ARE?", href: "/" },
    { name: "CUSTOMER REVIEW", href: "/" },
    { name: "CAREER", href: "/career" },
    { name: "PR-PACKAGE", href: "/" },
    { name: "EVENTS", href: "/" },
    { name: "TERMS & CONDITION", href: "/terms-and-condition" },
    { name: "PRIVACY & POLICY", href: "/privacy-policy" },
  ];

  const HELP_LINKS = [
    { name: "WHERE TO BUY", href: "/" },
    { name: "SHIPPING AND PAYMENT", href: "/" },
    { name: "RETURN AND REFUND", href: "/" },
    { name: "FAQ", href: "/" },
    { name: "CUSTOMER SUPPORT", href: "/" },
  ];

  // const SocialIcon: React.FC<{
  //   icon: React.ComponentType<any>;
  //   href: string;
  //   label: string
  // }> = ({ icon: Icon, href, label }) => (
  //   <a
  //     href={href}
  //     target="_blank"
  //     rel="noopener noreferrer"
  //     className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-600 transition-all duration-300 hover:scale-110"
  //     aria-label={label}
  //   >
  //     <Icon className="w-5 h-5 text-white" />
  //   </a>
  // );

  return (
    <footer className="relative bg-[#161616] text-white padding">

      {/* Footer Content */}
      <div className="flex flex-col gap-6 pt-10">
        {/* News Letter */}
        <div className=' bg-inherit mb-10 gap-4 lg:gap-0 flex flex-col lg:flex-row lg:justify-between'>
          <div>
            <h1 className='text-2xl md:text-xl lg:text-5xl font-semibold'>
              Where Elegance Meets Everyday Beauty
            </h1>
          </div>
          <div className='h-full w-full lg:w-[70%]'>
            <Newsletter />
          </div>
        </div>
        {/* Mobile Layout */}
        <div className="block lg:hidden space-y-8">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Useful Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">SHOP</h3>
                <ul className="space-y-3">
                  {SHOP_LINKS.map((link) => (
                    <li key={link.name} className="flex items-center space-x-2">
                      {/* <span className="w-2 h-2 bg-amber-600 rounded-full flex-shrink-0"></span> */}
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* More Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">About</h3>
                <ul className="space-y-3">
                  {ABOUT_LINKS.map((link) => (
                    <li key={link.name} className="flex items-center space-x-2">
                      {/* <span className="w-2 h-2 bg-amber-600 rounded-full flex-shrink-0"></span> */}
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">HELP</h3>
              <ul className="space-y-3">
                {HELP_LINKS.map((link) => (
                  <li key={link.name} className="flex items-center space-x-2">
                    {/* <span className="w-2 h-2 bg-amber-600 rounded-full flex-shrink-0"></span> */}
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Contact Us */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Kathmandu, Nepal</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">555555555</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">bsera@links.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-4">
          {/* SHOP Links - Desktop */}
          <div className="space-y-6">
            <h3 className="text-lg font-normal text-gray">SHOP</h3>
            <ul className="space-y-3">
              {SHOP_LINKS.map((link) => (
                <li key={link.name} className="flex items-center space-x-2">
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ABOUT Links - Desktop */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray">ABOUT</h3>
            <ul className="space-y-3">
              {ABOUT_LINKS.map((link) => (
                <li key={link.name} className="flex items-center space-x-2">
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* HELP Links - Desktop */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray">HELP</h3>
            <ul className="space-y-3">
              {HELP_LINKS.map((link) => (
                <li key={link.name} className="flex items-center space-x-2">
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us - Desktop */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-gray-300 text-sm uppercase">Hello@UltraBeauty.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-gray-300 text-sm">BIRTAMOD - 4, JHAPA, KOSHI NEPAL</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  +977-9824386694, 25254568
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8 pb-8 display-flex flex-col items-center space-y-4">
          <p className="text-white text-sm md:text-base">
            EMBRACE THE BEAUTY WITHIN. CAREFULLY CHOSEN PIECES MADE TO ENHANCE YOUR NATURAL GRACE AND DAILY ROUTINE.
          </p>
          <p className="text-gray-400 text-xs">
            ALL RIGHT RESERVED ULTRA BEAUTY & CARE
            DESIGNED AND DEVELOPED BY HUNCHHA DIGITAL
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;