"use client";

import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "@/components/ui/sonner";

import LoadingSpinner from "@/components/common/loader/loading-spinner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        {children}
      </PersistGate>
      <Toaster richColors />
    </Provider>
  );
}
