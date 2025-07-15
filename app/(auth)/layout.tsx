"use client";

import Image from "next/image";
import authBackground from "@/assets/authBackground.png";
import authHero from "@/assets/authHero.png";
import authHeroBg from "@/assets/authHeroBg.png";
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
      <div className="relative hidden lg:flex lg:flex-col">
        <div className="relative h-screen w-full overflow-hidden">
          <Image
            src={authBackground}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-12">
            <div className="mb-6 z-40">
              <h1 className="text-xl font-semibold text-center text-white leading-tight">
                The Perfect Balance of
                <br />
                Comfort and Style.
              </h1>
            </div>

            <div className="flex justify-center z-40">
              <div className="relative">
                <Image
                  src={authHero}
                  alt="auth Hero"
                  width={370}
                  height={370}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <div className="absolute z-20 w-80 h-80 bg-[#5c7ae536] rounded-full border border-primary" />
            <div className="absolute inset-0 flex items-center justify-center gap-4 z-30">
              <div className="relative bg-gray-500 rounded-2xl -translate-y-6 before:content-[''] before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:w-5 before:h-10 before:rounded-r-full z-30">
                <Image
                  src={authHeroBg}
                  alt="authHeroBg1"
                  width={300}
                  height={100}
                  className="object-contain rounded-2xl"
                  priority
                />
              </div>
              <div className="relative bg-gray-500 rounded-2xl translate-y-6 before:content-[''] before:absolute before:top-1/2 before:right-0 before:-translate-y-1/2 before:w-5 before:h-10 before:rounded-l-full z-30">
                <Image
                  src={authHeroBg}
                  alt="authHeroBg2"
                  width={300}
                  height={100}
                  className="object-contain rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="absolute inset-0">
            <div className="absolute top-0 -right-16 w-64 h-64 bg-[#5c7ae536] border border-primary rounded-full -translate-x-1/12 -translate-y-1/2" />
            <div className="absolute bottom-0 -left-20 w-72 h-72 bg-[#5c7ae536] border rounded-full border-primary -translate-x-1/12 translate-y-1/2" />
          </div>
        </div>
      </div>
      <div className=" h-screen w-full p-4 lg:p-8 flex items-center justify-center bg-white">
        <div className="mx-auto flex lg:w-[400px] flex-col justify-center space-y-6 sm:w-[350px]">
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
          >
            <div className="flex flex-col gap-2 sm:pb-4 md:pb-8 lg:pb-10">
              <Link href={"/"}>
                <h1 className="text-5xl text-primary font-semibold">बSERA</h1>
              </Link>
              <p className="text-accent-foreground text-sm pr-6">
                The Perfect Balance of Comfort and Style, where tradition meets
                modern design.
              </p>
            </div>
            {children}
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
}

export default AuthenticationLayout;
