"use client";

import { SWRConfig } from "swr";

import { AuthProvider } from "@/contexts/AuthContext";
import { ErrorProvider } from "@/contexts/ErrorContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { fetcher } from "@/utils/request";

const Providers = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig value={{ fetcher }}>
    <ErrorProvider>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </ErrorProvider>
  </SWRConfig>
);

export default Providers;
