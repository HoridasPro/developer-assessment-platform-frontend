"use client";
import React, { ReactNode } from "react";

import { ThemeProvider } from "next-themes";
import QueryProvider from "./queryProvider";
import GoogleAuthProvider from "./googleAuthProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <GoogleAuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
      >
        <QueryProvider>{children}</QueryProvider>
      </ThemeProvider>
    </GoogleAuthProvider>
  );
};

export default Providers;
