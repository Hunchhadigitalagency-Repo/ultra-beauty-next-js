"use client";

import Image from "next/image";
import authBackground from "@/assets/authBackground.png";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Link from "next/link";
import useCheckToken from "@/hooks/use-check-token";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/common/loader/loading-spinner";
import { useAppSelector } from "@/redux/hooks";
import { EUserTypes } from "@/types";

function AuthenticationLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { userType } = useAppSelector((state) => state.authentication);
  const { loading, isAuthenticated } = useCheckToken();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      if (
        userType === EUserTypes.ADMIN ||
        userType === EUserTypes.SUPER_ADMIN
      ) {
        router.replace("/dashboard/home");
      } else {
        router.replace("/");
      }
    }
  }, [loading, isAuthenticated, userType, router]);

  if (loading) return <LoadingSpinner containerClassName="h-screen" />;

  if (isAuthenticated) {
    return <LoadingSpinner containerClassName="h-screen" />;
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Auth Section */}
      <div className=" h-screen w-full p-4 lg:p-8 flex items-center justify-center bg-white">
        <div className="mx-auto flex lg:w-[400px] flex-col justify-center space-y-6 sm:w-[350px]">
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
          >
            <div className="flex flex-col items-center justify-center gap-2 sm:pb-4 md:pb-8 lg:pb-10">
              <Link href={"/"}>
                <h1 className="text-4xl font-playfair text-primary font-semibold">
                  Ultra Beauty & Brand
                </h1>
              </Link>
              <p className="text-accent-foreground text-center text-sm pr-6">
                Elevate your everyday routine with handpicked collections.
              </p>
            </div>
            {children}
          </GoogleOAuthProvider>
        </div>
      </div>
      {/* Image Section */}
      <div className="relative hidden lg:flex lg:flex-col">
        <div className="relative h-screen w-full overflow-hidden">
          <Image
            src={authBackground}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="relative z-10 flex h-full flex-col justify-end-safe p-12">
            <div className=" z-40">
              <h1 className="text-4xl font-semibold text-primary font-playfair leading-tight">
                Your Demand Our <span className="text-white">Prodcuts</span>
              </h1>
              <p className="text-foreground">Elevate your everyday routine with handpicked <br />collections</p>
            </div>
          </div>

          <div className="absolute inset-0">
            <div className="absolute top-0 -right-16 w-64 h-64 bg-[#FF2B5F85] rounded-full -translate-x-1/12 -translate-y-1/2" />
            <div className="absolute bottom-[50%] -left-20 w-52 h-52 bg-[#FF2B5F85] rounded-full -translate-x-1/12 translate-y-1/2" />
            <div className="absolute bottom-0 -right-20 w-52 h-52 bg-[#FF2B5F85] rounded-full -translate-x-1/12 translate-y-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthenticationLayout;
