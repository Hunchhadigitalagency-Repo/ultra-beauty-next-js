import Link from 'next/link'
import React from 'react'

interface DropdownProduct {
  id: number
  name: string
}

interface MegaMenuProps {
  dropdownProducts: DropdownProduct[]
  isDropDownVisible: boolean
  hasSubcategories: boolean | undefined
  setDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const MegaMenu: React.FunctionComponent<MegaMenuProps> = ({
  dropdownProducts,
  setDropdownVisible,
  hasSubcategories
}) => {

  return (
    <>
      {hasSubcategories ? <div
        onMouseLeave={() => setDropdownVisible(false)}
        className="absolute left-0 right-0 z-50 bg-white shadow-md top-full"
      >
        <div className="mt-10 border-t-2 padding">
          {/* Categories Grid */}
          <div className="grid grid-rows-4 grid-flow-col auto-cols-[300px] gap-3 py-1 overflow-x-auto scrollbar-hide">
            {dropdownProducts.map((dropdownProduct) => (
              <Link
                key={dropdownProduct.id}
                href={`/ ${dropdownProduct.name.toLowerCase()} `}
                className="transition-all duration-200 rounded-lg group hover:border-primary/20"
              >
                <div className="flex flex-col items-start">
                  <h3 className="text-sm whitespace-nowrap font-poppins text-foreground hover:text-primary">
                    {dropdownProduct.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div> : null}
    </>
  )
}

export default MegaMenu