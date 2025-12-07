import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useFetchData from '@/hooks/use-fetch';
import Newsletter from '../newsletter/newsletter';
import { MapPin, Phone, Mail } from 'lucide-react';
import { SocialLinkResponse } from '@/types/social-contact';
import { ICategoryDropdown } from '@/types/dropdown';
import { useRouter } from 'next/navigation';
import { toggleCategory } from '@/redux/features/category-slice';
import { useAppDispatch } from '@/redux/hooks';

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


  const { data: socialLinks } = useFetchData<SocialLinkResponse[]>('social-links/dropdown/');
  const { data: categories } = useFetchData<ICategoryDropdown[]>(`dropdown/category?is_not_empty=True`);

  const categoriesData = categories?.slice(0, 5);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleCategoryClick = (categoryId: number) => {
    dispatch(toggleCategory({ id: categoryId, checked: true }));
    router.push(`/shop`)
  }

  return (
    <footer className="relative h-fit bg-[#161616] text-white padding">

      {/* Footer Content */}
      <div className="flex flex-col pt-10 pb-10 sm:pb-8 md:pb-0">
        {/* News Letter */}
        <div className='flex flex-col justify-between gap-4 mb-14 bg-inherit lg:gap-0 lg:flex-row lg:justify-between'>
          <div>
            <h1 className="text-4xl font-semibold md:text-3xl lg:text-5xl leading-snug">
              <span className="block">
                Where Elegance Meets
              </span>
              <span className="block relative mt-2">
                Everyday Beauty
                <span className="inline-block h-6 ml-8 w-6 bg-pink-600"></span>    </span>
            </h1>
          </div>

          <div className='h-full w-full lg:w-[50%]'>
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
                          className="text-sm text-gray-300 transition-colors duration-200 hover:text-amber-400 uppercase"
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
                  <span className="text-sm text-gray-300">One Stop Mall Ground Floor, Jhapa District, Nepal
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="flex-shrink-0 w-4 h-4 text-amber-600" />
                  <span className="text-sm text-gray-300">+977 9826940855
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="flex-shrink-0 w-4 h-4 text-amber-600" />
                  <span className="text-sm text-white white-pre-space">            ultrabeautybrands<br/>@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  {socialLinks?.map((social, index) => (
                    <Link href={social.url} key={index} target="_blank" rel="noopener noreferrer">
                      <div className="relative w-6 h-6">
                        <Image
                          src={social.icon}
                          alt={social.name}
                          fill
                          className="object-center rounded-sm transition-transform duration-300 hover:scale-110 hover:border"
                        />
                      </div>
                    </Link>
                  ))}

                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-4">
          {/* SHOP Links - Desktop */}
          <div className="space-y-6">
            <h3 className="text-lg  text-gray-400">SHOP</h3>
            <ul className="space-y-3">
              <button className="flex items-center space-x-2 text-sm text-gray-300 transition-colors duration-200 hover:text-primary uppercase" onClick={() => router.push('/shop')}>
                All Products
              </button>
              {
                categoriesData?.map((category) => (
                  <button key={category.name} className="flex items-center space-x-2 text-sm text-gray-300 transition-colors duration-200 hover:text-primary uppercase" onClick={() => handleCategoryClick(category.id)}>
                    {category.name}
                  </button>
                ))
              }
            </ul>
          </div>
          {/* ABOUT Links - Desktop */}
          <div className="space-y-6">
            <h3 className="text-lg  text-gray-400">ABOUT</h3>
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
            <h3 className="text-lg  text-gray-400">HELP</h3>
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
          <div className="space-y-4">
            <h3 className="text-lg  text-gray-400">CONTACT US</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="flex-shrink-0 w-4 h-4 text-pink-600" />
                <span className="text-sm text-white beark-words">            ultrabeautybrands@gmail.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="flex-shrink-0 w-4 h-4 text-pink-600" />
                <span className="text-sm text-white uppercase">One Stop Mall Ground Floor, Jhapa District, Nepal
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="flex-shrink-0 w-4 h-4 text-pink-600" />
                <span className="text-sm text-white">+977 9826940855
                </span>
              </div>
              <div className="flex items-center gap-4">
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
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t-2 border-gray-700 mt-14 py-8 text-white text-center md:text-left">
          <p className="text-sm md:text-base md:w-1/2 leading-relaxed">
            EMBRACE THE BEAUTY WITHIN. CAREFULLY CHOSEN PIECES MADE TO ENHANCE YOUR NATURAL GRACE AND DAILY ROUTINE.
          </p>

          <div className="text-sm md:text-base md:w-1/2 leading-relaxed text-center md:text-right">
            <p>
              ALL RIGHTS RESERVED
              <span className="text-pink-400 font-medium"> ULTRA BEAUTY & BRAND</span>
            </p>
            <p className="text-[12px] mt-1">
              DESIGNED AND DEVELOPED BY
              <a
                href="https://hunchhadigital.com/"
                className="hover:underline ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                HUNCHHA DIGITAL
              </a>
            </p>
          </div>
        </div>


      </div>
    </footer>
  );
};

export default Footer;