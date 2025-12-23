"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Options = {
  shouldBlock: boolean; 
};

export function useConfirmLeavePayment({ shouldBlock }: Options) {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const pendingUrlRef = useRef<string | null>(null);
  const currentPathRef = useRef(pathname);

  useEffect(() => {
    currentPathRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (!shouldBlock) return;

    const onPopState = () => {
      // user tried to go back/forward
      pendingUrlRef.current = document.referrer || "/"; // fallback
      setOpen(true);

      // push current state back to prevent leaving immediately
      history.pushState(null, "", currentPathRef.current);
    };

    history.pushState(null, "", pathname);
    window.addEventListener("popstate", onPopState);

    return () => window.removeEventListener("popstate", onPopState);
  }, [shouldBlock, pathname]);

  // Call this when user clicks a link/button to navigate
  const requestNavigation = (url: string) => {
    if (!shouldBlock) {
      router.push(url);
      return;
    }
    pendingUrlRef.current = url;
    setOpen(true);
  };

  const confirmLeave = () => {
    const url = pendingUrlRef.current;
    setOpen(false);
    pendingUrlRef.current = null;
    if (url) router.push(url);
  };

  const cancelLeave = () => {
    setOpen(false);
    pendingUrlRef.current = null;
  };

  return {
    open,
    setOpen,
    requestNavigation,
    confirmLeave,
    cancelLeave,
  };
}


export function useBlockBrowserLeave(shouldBlock: boolean) {
  useEffect(() => {
    if (!shouldBlock) return;

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ""; // triggers native confirm
      return "";
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [shouldBlock]);
}
