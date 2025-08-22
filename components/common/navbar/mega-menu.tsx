import Link from 'next/link'
import React from 'react'

interface DropdownProduct {
  id: number
  name: string
}

interface MegaMenuProps {
  dropdownProducts: DropdownProduct[]
  onMouseLeave: () => void
  // onMouseEnter: () => void
  // onSubCategoryLeave: () => void
  // ref: React.RefObject<HTMLDivElement | null>
}

const MegaMenu: React.FunctionComponent<MegaMenuProps> = ({
  dropdownProducts,
  onMouseLeave,
  // ref
}) => {

  return (
    <div
      className="absolute top-full w-full z-50 right-0 bg-white shadow-md"
      onMouseLeave={onMouseLeave}
    >
      <div className="padding space-y-8">
        {/* Categories Grid */}
        <div className="grid grid-rows-7 grid-flow-col auto-cols-[200px] gap-3 py-5 overflow-x-auto scrollbar-hid">
          {dropdownProducts.map((dropdownProduct) => (
            <Link
              key={dropdownProduct.id}
              href={`/${dropdownProduct.name.toLowerCase()}`}
              className="group rounded-lg hover:border-primary/20 transition-all duration-200"
            >
              <div className="flex flex-col items-start text-center">
                <h3 className="font-poppins text-foreground hover:text-primary text-sm">
                  {dropdownProduct.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}

export default MegaMenu