'use client'
import Link from 'next/link';
import { Laptop } from 'lucide-react';
import SectionHeader from '@/components/common/header/section-header';


const items = [
  {
    title: "Reset Password",
    desc: "Submit an access request to get started our team will review and approve it promptly.",
    link: "/help/reset-password"
  },
  {
    title: "Email,Fax",
    desc: "Submit an access request to get started our team will review and approve it promptly.",
    link: "/contact"
  },
  {
    title: "Software",
    desc: "Submit an access request to get started our team will review and approve it promptly.",
    link: "/software"
  },
  { title: "Reset password", desc: "Submit an access request to get started our team will review and approve it promptly.", link: "/reset-password" },
  {
    title: "Email,Fax",
    desc: "Submit an access request to get started our team will review and approve it promptly.",
    link: "/contact"
  },
  {
    title: "Software",
    desc: "Submit an access request to get started our team will review and approve it promptly.",
    link: "/software"
  }
]


const HelpSupportSection = () => {
  return (
    <section className='padding space-y-2'>
      <SectionHeader
        title="Help And Support"
        description="Explore the help and support"
        className=""
      />
      {/* Items section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-36 gap-y-6 py-6">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className={"border rounded-md p-4 cursor-pointer border-[#E1E1E1] hover:shadow-md transition"}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-pink-100 p-2 rounded">
                <Laptop className="text-[#FF2B5F] w-5 h-5" />
              </div>
              <h2 className="text-lg font-playfair font-bold text-[#FF2B5F]">{item.title}</h2>
            </div>
            <p className="text-sm font-poppins text-gray-600">{item.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default HelpSupportSection