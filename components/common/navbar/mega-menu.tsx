import Link from 'next/link'
import React from 'react'


const menuItems: { name: string; href: string }[] = [
  { name: "Foundation & Compact", href: "/shop" },
  { name: "MakeUp Serum", href: "/shop" },
  { name: "Eyeliner", href: "/shop" },
  { name: "Birdal Cosmetics", href: "/shop" },
  { name: "Nailpolish", href: "/shop" },
  { name: "Lipstick", href: "/shop" },
  { name: "EyeMakeUp & Mascara", href: "/shop" },
  { name: "Foundation & Compact", href: "/shop" },
  { name: "MakeUp Serum", href: "/shop" },
  { name: "Eyeliner", href: "/shop" },
  { name: "Birdal Cosmetics", href: "/shop" },
  { name: "Nailpolish", href: "/shop" },
  { name: "Lipstick", href: "/shop" },
  { name: "EyeMakeUp & Mascara", href: "/shop" },
  { name: "Foundation & Compact", href: "/shop" },
  { name: "MakeUp Serum", href: "/shop" },
  { name: "Eyeliner", href: "/shop" },
  { name: "Birdal Cosmetics", href: "/shop" },
  { name: "Nailpolish", href: "/shop" },
  { name: "Lipstick", href: "/shop" },
  { name: "EyeMakeUp & Mascara", href: "/shop" },
  { name: "Foundation & Compact", href: "/shop" },
  { name: "MakeUp Serum", href: "/shop" },
  { name: "Eyeliner", href: "/shop" },
  { name: "Birdal Cosmetics", href: "/shop" },
  { name: "Nailpolish", href: "/shop" },
  { name: "Lipstick", href: "/shop" },
  { name: "EyeMakeUp & Mascara", href: "/shop" },
  { name: "Foundation & Compact", href: "/shop" },
  { name: "MakeUp Serum", href: "/shop" },
  { name: "Eyeliner", href: "/shop" },
  { name: "Birdal Cosmetics", href: "/shop" },
  { name: "Nailpolish", href: "/shop" },
  { name: "Lipstick", href: "/shop" },
  { name: "EyeMakeUp & Mascara", href: "/shop" }

];

const MegaMenu: React.FunctionComponent = () => {

  return (
    <div className="absolute w-full z-50 top-full right-0 bg-white padding-y shadow-md mt-0 lg:mt-4">
      <div className="padding space-y-8">
        <div className="">
          {/* Categories Grid */}
          <div className="grid grid-col bg-white s-1 border-t py-5 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {menuItems.map((child, index) => (
              <Link
                key={index}
                href={child.href}
                className="group rounded-lg hover:border-primary/20 transition-all duration-200"
              >
                <div className="flex flex-col items-start text-center ">
                  <div>
                    <h3 className="font-poppins text-foreground hover:text-primary text-sm">
                      {child.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MegaMenu