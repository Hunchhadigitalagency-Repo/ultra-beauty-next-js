"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import type { ComponentType } from "react";
import useCheckToken from "@/hooks/use-check-token";
import LoadingSpinner from "@/components/common/loader/loading-spinner";

export default function withAuth<P extends object>(
  Component: ComponentType<P>
) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter();
    const { loading, isAuthenticated } = useCheckToken();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push("/login");
      }
    }, [loading, isAuthenticated, router]);

    if (loading) return <LoadingSpinner containerClassName="h-screen" />;
    if (isAuthenticated) return <Component {...props} />;
    return null;
  };
}
