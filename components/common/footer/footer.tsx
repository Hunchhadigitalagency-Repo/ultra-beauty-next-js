import React from 'react';
import { Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import Image from 'next/image';
const Footer: React.FC = () => {
  const usefulLinks = [
    { name: "My list", href: "/my-list" },
    { name: "About", href: "/about" },
    { name: "Shop", href: "/shop" },
    { name: "Package", href: "/package" },
  ];

  const moreLinks = [
    { name: "Coupon", href: "/coupon" },
    { name: "Next link to something", href: "/next-link" },
    { name: "Next link", href: "/next" },
    { name: "Fashion brand link", href: "/fashion-brands" },
  ];

  const additionalLinks = [
    { name: "Career", href: "/career" },
    { name: "Blog", href: "/blog" },
    { name: "Youtube", href: "/youtube" },
    { name: "Testimonial", href: "/testimonial" },
  ];

  const SocialIcon: React.FC<{
    icon: React.ComponentType<any>;
    href: string;
    label: string
  }> = ({ icon: Icon, href, label }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-600 transition-all duration-300 hover:scale-110"
      aria-label={label}
    >
      <Icon className="w-5 h-5 text-white" />
    </a>
  );

  return (
    <footer className="relative bg-gray-900 text-white py-12 sm:py-16 lg:py-20 mt-16">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://img.freepik.com/free-photo/room-house-decorated-with-brazilian-folklore-design_23-2150794235.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740"
          alt="Modern interior background"
          width={800} // adjust as needed
          height={500} // adjust as needed
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/75" />
      </div>

      {/* Footer Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Layout */}
        <div className="block lg:hidden space-y-8">
          {/* About Us Section - Mobile */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">About Us</h3>
            <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
              <p>
                BSERA is a comfort-first brand focused on relieving the strain of
                long sitting hours through smart, ergonomic products. Blending
                traditional Nepali craftsmanship with modern innovation, we
                create wellness tools that promote better posture and
                everyday design. Its mission: to redefine comfort, one seat at a time.
              </p>
              <p>
                BSERA is a comfort-first brand focused on relieving the strain of
                long sitting hours through smart, ergonomic products. Blending
                traditional Nepali roots with modern design, it offers cushions, back supports,
                and wellness tools that promote better posture and everyday
                ease. Its mission: to redefine comfort, one seat at a time.
              </p>
            </div>
          </div>

          {/* Links Section - Mobile (Two Columns) */}
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Useful Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Useful Link</h3>
                <ul className="space-y-3">
                  {usefulLinks.map((link) => (
                    <li key={link.name} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-amber-600 rounded-full flex-shrink-0"></span>
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

              {/* More Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">More links</h3>
                <ul className="space-y-3">
                  {additionalLinks.map((link) => (
                    <li key={link.name} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-amber-600 rounded-full flex-shrink-0"></span>
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
                <h3 className="text-lg font-semibold text-white">More links</h3>
                <ul className="space-y-3">
                  {moreLinks.map((link) => (
                    <li key={link.name} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-amber-600 rounded-full flex-shrink-0"></span>
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
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-12">
          {/* Useful Links - Desktop */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Useful Link</h3>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.name} className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-amber-600 rounded-full flex-shrink-0"></span>
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

          {/* More Links - Desktop */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">More links</h3>
            <ul className="space-y-3">
              {moreLinks.map((link) => (
                <li key={link.name} className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-amber-600 rounded-full flex-shrink-0"></span>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <h4 className="text-lg font-semibold text-white mb-4">More links</h4>
              <ul className="space-y-3">
                {additionalLinks.map((link) => (
                  <li key={link.name} className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-amber-600 rounded-full flex-shrink-0"></span>
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

          {/* Contact Us - Desktop */}
          <div className="space-y-6">
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

          {/* About Us Section - Desktop */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">About Us</h3>
            <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
              <p>
                BSERA is a comfort-first brand focused on relieving the strain of
                long sitting hours through smart, ergonomic products. Blending
                traditional Nepali craftsmanship with modern innovation, we
                create wellness tools that promote better posture and
                everyday design. Its mission: to redefine comfort, one seat at a time.
              </p>
              <p>
                BSERA is a comfort-first brand focused on relieving the strain of
                long sitting hours through smart, ergonomic products. Blending
                traditional Nepali roots with modern design, it offers cushions, back supports,
                and wellness tools that promote better posture and everyday
                ease. Its mission: to redefine comfort, one seat at a time.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4 pt-2">
              <SocialIcon
                icon={Facebook}
                href="https://facebook.com"
                label="Follow us on Facebook"
              />
              <SocialIcon
                icon={Twitter}
                href="https://twitter.com"
                label="Follow us on Twitter"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-xs">
            Copyright Basera© 2025. Developed by Hunchha Digital Pvt. Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;