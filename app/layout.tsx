import type { Metadata } from "next";
import { Poppins,  } from "next/font/google";
import "./globals.css";
import { Providers } from "@/redux/provider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
preload: true,
  
});

export const metadata: Metadata = {
  title: "Basera E-commerce",
  description: "Baserai hunechha samasya ko samadhan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
