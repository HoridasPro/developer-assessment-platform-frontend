"use client";

import type { ReactNode } from "react";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import CompanySidebar from "../_components/companySidebar/companySidebar";

export default function CompanyLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <CompanySidebar />

      <SidebarInset className="min-w-0">
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b bg-background px-3 sm:px-4">
          {/* Three horizontal lines */}
          <SidebarTrigger
            aria-label="Open or close sidebar"
            className="size-9 shrink-0"
          />

          <h1 className="truncate text-sm font-semibold sm:text-base">
            Company Dashboard
          </h1>
        </header>

        <main className="min-w-0 flex-1 p-3 sm:p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
