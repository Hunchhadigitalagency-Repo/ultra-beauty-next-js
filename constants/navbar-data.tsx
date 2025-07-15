import apiBase from "@/services/api-base-instance";
import { NavigationItem } from "@/types/website";


export const getNavigationItems = async (): Promise<NavigationItem[]> => {
    try {
        const res = await apiBase.get("/categoriesdropdown");
        const categories = res.data;
        const categoryDropdown: NavigationItem = {
            name: "Shop by Category",
            href: "/shop",
            hasDropdown: true,
            children: [
                { name: "All products", href: "/shop" },
                ...categories.map((cat: any) => ({
                    name: cat.name,
                    href: `/shop/${cat.id}`,
                })),
            ],
        };

        const navigationItems: NavigationItem[] = [
            { name: "Home", href: "/" },
            categoryDropdown,
            { name: "Best Seller", href: "/best-seller", hasDropdown: true },
            { name: "Sale", href: "/sale" },
            { name: "Blogs", href: "/blogs" },
            { name: "About Us", href: "/about" },
            { name: "Contact Us", href: "/contact" },
        ];

        return navigationItems;
    } catch (error) {
        console.error("Error loading navigation items:", error);
        return [
            { name: "Home", href: "/" },
            { name: "Shop", href: "/shop" },
        ];
    }
};
