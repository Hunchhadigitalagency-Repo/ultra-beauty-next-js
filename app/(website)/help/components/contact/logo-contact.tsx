import React from 'react';
import { Mail, Navigation, Phone } from 'lucide-react';

const DirectContact: React.FunctionComponent = () => {

  return (
    <section className='padding space-y-5'>
      <div className='flex justify-between'>
        <div className=" p-8 bg-white rounded-sm border border-[#E1E1E1] ">
          <h2 className="text-2xl font-bold font-playfair text-primary mb-6">Contact us Directly</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 font-poppins gap-6 text-sm">
            {/* Phone */}
            <div className="flex items-start gap-3">
              <div className="bg-secondary p-2 rounded-md">
                <Phone className="text-primary w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">
                  Phone Number
                </p>
                <p>
                  +977 9826940855
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <div className="bg-secondary p-2 rounded-md">
                <Mail className="text-primary w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">
                  Email Address
                </p>
                <p>
                  ultrabeautybrands@gmail.com
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <div className="bg-[#FFEBED] p-2 rounded-md">
                <Navigation className="text-primary w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">
                  Our Location
                </p>
                <p>
                  One Stop Mall Ground Floor, Jhapa District, Nepal
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