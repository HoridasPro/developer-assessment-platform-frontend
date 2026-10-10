"use client";

import type { ReactNode } from "react";
 

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import CandidateSidebar from "../_components/candidateSidebar/candidateSidebar";

export default function CandidateLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <CandidateSidebar />

      <SidebarInset className="min-w-0">
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b bg-background px-3 sm:px-4">
          <SidebarTrigger
            aria-label="Toggle candidate sidebar"
            className="size-9 shrink-0"
          />

          <h1 className="truncate text-sm font-semibold sm:text-base">
            Candidate Dashboard
          </h1>
        </header>

        <main className="min-w-0 flex-1 p-3 sm:p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}