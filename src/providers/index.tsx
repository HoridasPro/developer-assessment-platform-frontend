"use client";
import React, { ReactNode } from "react";
import QuesryProvider from "./query.provider";
import { ThemeProvider } from "next-themes";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QuesryProvider>{children}</QuesryProvider>
    </ThemeProvider>
    // <QuesryProvider>{children}</QuesryProvider>
  );
};

export default Providers;
