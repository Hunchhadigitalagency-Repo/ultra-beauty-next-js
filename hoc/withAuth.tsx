"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { ComponentType } from "react";
import useCheckToken from "@/hooks/use-check-token";
import { useAppSelector } from "@/redux/hooks";
import LoadingSpinner from "@/components/common/loader/loading-spinner";
import { EUserTypes } from "@/types";

export default function withAuth<P extends object>(
  Component: ComponentType<P>,
  allowedRoles?: EUserTypes[]
) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter();
    const { loading, isAuthenticated } = useCheckToken();
    const { userType } = useAppSelector((state) => state.authentication);

    const [canRender, setCanRender] = useState(false);

    useEffect(() => {
      if (!loading) {
        if (!isAuthenticated) {
          router.replace("/login");
        } else if (
          allowedRoles &&
          !allowedRoles.includes(userType as EUserTypes)
        ) {
          router.replace("/");
        } else {
          setCanRender(true);
        }
      }
    }, [loading, isAuthenticated, userType, router, allowedRoles]);

    if (loading || !canRender)
      return <LoadingSpinner containerClassName="h-screen" />;

    return <Component {...props} />;
  };
}
