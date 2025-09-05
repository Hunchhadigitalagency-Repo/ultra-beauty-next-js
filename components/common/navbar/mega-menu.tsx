import React from 'react'
import Link from 'next/link'
import { ICategoryDropdown } from '@/types/dropdown'

interface MegaMenuProps {
  dropdownCategoriesData: ICategoryDropdown[] | null
  setDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const MegaMenu: React.FunctionComponent<MegaMenuProps> = ({
  setDropdownVisible,
  dropdownCategoriesData,
}) => {

  const handleDropdownEnter = () => {
    setDropdownVisible(true);
  }

  const handleDropdownLeave = () => {
    setDropdownVisible(false);
  }

  return (
    <React.Fragment>
      <div
        className="absolute left-0 right-0 z-50 top-full transition-all duration-800 ease-in-out"
        onMouseEnter={handleDropdownEnter}
        onMouseLeave={handleDropdownLeave}
      >
        {/* Categories Grid */}
        <div className="mt-2 bg-white border-t shadow-2xl padding shadow-bottom">
          <div className="grid grid-cols-5 grid-flow-row auto-rows-[50px] gap-3 py-1">
            <Link href="/shop"
              className='flex items-center justify-center transition-all duration-200 border rounded-lg hover:bg-secondary hover:text-primary hover:border-primary'
              onClick={() => setDropdownVisible(false)}>
              <p className='text-sm whitespace-nowrap font-poppins'>All Products</p>
            </Link>
            {
              dropdownCategoriesData?.map((dropdownCategory) => (
                <Link
                  key={dropdownCategory.id}
                  href={`/ ${dropdownCategory.name.toLowerCase()} `}
                  onClick={() => setDropdownVisible(false)}
                  className='flex items-center justify-center transition-all duration-200 border rounded-lg hover:bg-secondary hover:text-primary hover:border-primary'
                >
                  <p className="text-sm whitespace-nowrap font-poppins">
                    {dropdownCategory.name}
                  </p>
                </Link>
              ))
            }
          </div>
        </div >
      </div >
    </React.Fragment>
  )
}

export default MegaMenu