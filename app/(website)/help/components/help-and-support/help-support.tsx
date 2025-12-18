'use client';
import Link from 'next/link';
import Image from 'next/image';
import { AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import useFetchData from '@/hooks/use-fetch';
import { HelpAndSupport } from '@/types/help-and-support';
import SectionHeader from '@/components/common/header/section-header';
import { useAppSelector } from '@/redux/hooks';

const HelpSupportSection: React.FunctionComponent = () => {
  const { searchQuery } = useAppSelector(state => state.filter)
  const [isClamped, setIsClamped] = useState(false);
  const { data, error, loading } = useFetchData<HelpAndSupport[]>('/help-and-support-dropdown/');
  const [help, setHelp] = useState(data);

  useEffect(() => {
    setIsClamped(true)
    if(data){
      if(searchQuery){
        setHelp(data.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())))
      }else {
        setHelp(data)
      }
    }
  }, [data, searchQuery]);

  return (
    <section className='space-y-2 padding'>
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
        <div className='flex flex-col items-center justify-center py-10'>
          <AlertCircle className="w-8 h-8 mb-2 text-red-500" />
          <p className="font-medium text-gray-700">Oops! Something went wrong.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 py-6 sm:grid-cols-2 md:grid-cols-3 gap-x-36 gap-y-6">
          {help?.map((item, index) => (
            <Link
              key={index}
              href={`/help/${item.id}`}
              className="block border border-[#E1E1E1] rounded-lg p-4 cursor-pointer transition-shadow duration-300 hover:shadow-lg hover:border-primary"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-[#F0F0F0] relative w-16 h-16 rounded-lg flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-lg font-playfair font-bold text-primary line-clamp-2">
                  {item.name}
                </h2>
              </div>
              <p
                className={`text-sm font-poppins text-gray-600 ${isClamped ? "line-clamp-3" : ""}`}
              >
                {item.description}
              </p>
            </Link>
          ))}

        </div>
      )}
    </section>
  )
}

export default HelpSupportSection