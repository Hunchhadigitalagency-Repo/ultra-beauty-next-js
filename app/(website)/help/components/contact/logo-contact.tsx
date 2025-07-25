import React from 'react';
import { Mail, Navigation, Phone } from 'lucide-react';

const DirectContact: React.FunctionComponent = () => {

  return (
    <section className='padding space-y-5'>
      <div className='flex justify-between'>
        <span className="text-base md:text-4xl text-center font-playfair font-medium text-primary leading-none">
          Ultra Beauty<br />
          <span className="font-poppins text-xl md:text-base">&</span><br />
          Brand
        </span>

        <div className="w-4xl p-8 bg-white rounded-sm border border-gray-200 ">
          <h2 className="text-2xl font-bold font-playfair text-primary mb-6">Contact us Directly</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 font-poppins gap-6 text-sm">
            {/* Phone */}
            <div className="flex items-start gap-3">
              <div className="bg-[#FFEBED] p-2 rounded-md">
                <Phone className="text-[#FF2B5F] w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">
                  Phone Number
                </p>
                <p>
                  9800000000
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <div className="bg-[#FFEBED] p-2 rounded-md">
                <Mail className="text-[#FF2B5F] w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">
                  Email Address
                </p>
                <p>
                  support@actuallysave.com
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <div className="bg-[#FFEBED] p-2 rounded-md">
                <Navigation className="text-[#FF2B5F] w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">
                  Our Location
                </p>
                <p>
                  Itahari, Sunsari,
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DirectContact