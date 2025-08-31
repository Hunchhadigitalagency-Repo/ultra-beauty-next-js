'use client';
import Link from 'next/link';
import Image from 'next/image';
import { AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import useFetchData from '@/hooks/use-fetch';
import { HelpAndSupport } from '@/types/help-and-support';
import SectionHeader from '@/components/common/header/section-header';

const HelpSupportSection: React.FunctionComponent = () => {

  const [isClamped, setIsClamped] = useState(false);
  const { data, error, loading } = useFetchData<HelpAndSupport[]>('help-and-support');

  useEffect(() => {
    setIsClamped(true)
  }, []);

  return (
    <section className='padding space-y-2'>
      <SectionHeader
        title="Help And Support"
        description="Explore the help and support"
        className=""
      />

      {loading ? (
        <p>
          Loading data...
        </p>
      ) : error ? (
        <div className='flex flex-col py-10 justify-center items-center'>
          <AlertCircle className="w-8 h-8 mb-2 text-red-500" />
          <p className="font-medium text-gray-700">Oops! Something went wrong.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-36 gap-y-6 py-6">
          {data?.map((item, index) => (
            <Link
              key={index}
              href={`/help/${item.id}`}
              className={"border rounded-md p-4 cursor-pointer border-[#E1E1E1] hover:shadow-md transition"}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-[#EEEEEE] relative  w-14 h-14 rounded-lg">
                  <Image
                    src={item.icon}
                    alt="Help Icon"
                    fill
                    className='object-fill'
                  />
                </div>
                <h2 className="text-lg font-playfair font-bold text-primary">
                  {item.name}
                </h2>
              </div>
              <p className={`text-sm font-poppins text-gray-600 ${isClamped ? "line-clamp-3" : ""
                }`}>{
                  item.description}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

export default HelpSupportSection