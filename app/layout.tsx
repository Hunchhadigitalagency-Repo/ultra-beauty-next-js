import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/redux/provider";
import { getCompanyProfile } from "@/lib/company-profile";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: true,
});
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
  preload: true,
});


export async function generateMetadata(): Promise<Metadata> {
  const { company, seo } = await getCompanyProfile();

  const title = seo?.meta_title || company?.company_name || "Ultra Beauty & Brand";
  const description = seo?.meta_description || "Ultra Beauty & Brand is your one-stop destination for all beauty and personal care products.";
  const favicon = company?.company_favicon_url;
  const keywords = seo?.meta_keyword?.join(", ") || "ecommerce, basera";

  return {
    title,
    description,
    keywords,
    icons: favicon ? {
      icon: [
        {
          url: favicon,
          type: 'image/png',
        }
      ],
      shortcut: [
        {
          url: favicon,
          type: 'image/png',
        }
      ],
      apple: [
        {
          url: favicon,
          type: 'image/png',
        }
      ],
    } : undefined,
    openGraph: {
      title,
      description,
      images: company?.company_logo_url ? [company.company_logo_url] : [],
      siteName: company?.company_name,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: company?.company_logo_url ? [company.company_logo_url] : [],
    },
    manifest: '/manifest.json', // For PWA icons
    other: {
      // Add custom meta tags for larger icons in specific contexts
      'msapplication-TileImage': company?.company_logo_url || favicon,
      'msapplication-TileColor': '#ffffff',
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${playfair.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
