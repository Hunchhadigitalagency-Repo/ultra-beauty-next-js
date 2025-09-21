// "use client";

// import { useEffect, useState } from "react";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "../ui/navigation-menu";

// import Link from "next/link";
// interface NavigationItem {
//   name: string;
//   href: string;
//   hasDropdown?: boolean;
//   children?: {
//     name: string;
//     href: string;
//   }[];
// }

// export default function MobileFilterMenu() {
//   const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);

//   useEffect(() => {
//     const fetchItems = async () => {
//       const items = await getNavigationItems();
//       setNavigationItems(items);
//     };
//     fetchItems();
//   }, []);

//   return (
//     <div className="flex justify-around px-4 py-2 bg-white border-b shadow-sm md:hidden">
//       <NavigationMenu>
//         <NavigationMenuList className="flex justify-around p-0 m-0 list-none gap-x-4">
//           {navigationItems
//             .filter(
//               (item) =>
//                 item.name === "Shop by Category" ||
//                 item.name === "Best Seller" ||
//                 item.name === "Sale"
//             )
//             .map((item) => (
//               <NavigationMenuItem key={item.name}>
//                 {item.hasDropdown && item.children ? (
//                   <>
//                     <NavigationMenuTrigger className="text-sm px-3 py-2 rounded-md bg-blue-500 text-white h-[30px]">
//                       {item.name}
//                     </NavigationMenuTrigger>

//                     <NavigationMenuContent className="min-w-[100px] max-h-100 overflow-y-auto p-2 bg-white shadow-md rounded-md">
//                       {item.children.map((child) => (
//                         <NavigationMenuLink asChild key={child.name}>
//                           <Link
//                             href={child.href}
//                             className="block px-3 py-1 text-sm rounded text-foreground hover:bg-gray-100"
//                           >
//                             {child.name}
//                           </Link>
//                         </NavigationMenuLink>
//                       ))}
//                     </NavigationMenuContent>
//                   </>
//                 ) : (
//                   <Link
//                     href={item.href}
//                     className={`text-sm px-2 py-1 rounded-md block h-[30px] ${item.name === "Shop by Category"
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-300 text-black"
//                       }`}
//                   >
//                     {item.name}
//                   </Link>
//                 )}
//               </NavigationMenuItem>
//             ))}
//         </NavigationMenuList>
//       </NavigationMenu>
//     </div>
//   );
// }
