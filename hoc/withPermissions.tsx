"use client";

import type { ComponentType } from "react";
import LoadingSpinner from "@/components/common/loader/loading-spinner";
import { hasAllPermissions, isSuperAdmin } from "@/lib/roles-permissions-utils";

export function withPermissions<P extends object>(
  Component: ComponentType<P>,
  requiredPermissions: string[]
) {
  return function PermissionedComponent(props: P) {
    const loading = false;
    const permissions: any = [];

    const userType = "admin";

    const superAdmin = isSuperAdmin(userType);
    const allowed = superAdmin || hasAllPermissions(permissions, requiredPermissions);

    if (!loading && !allowed) {
      return <div>You are not authorized to access this page.</div>;
    }

    if (loading) {
      return <LoadingSpinner containerClassName="h-screen" />;
    }

    return <Component {...props} />;
  };
}
