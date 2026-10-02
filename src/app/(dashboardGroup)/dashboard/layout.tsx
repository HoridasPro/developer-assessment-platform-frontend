"use client";
import { cn } from "cn";
import { useGetMe } from "@/hooks";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TGetMeResponse } from "@/types/getMeResponse";
import CandidateSidebar from "./_components/candidateSidebar/candidateSidebar";
import CompanySidebar from "./_components/companySidebar/companySidebar";

const DashboardGroupLayout = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, error } = useGetMe();
  const user: TGetMeResponse = data;
  return (
    <SidebarProvider>
      {user?.data?.role === "CANDIDATE" && <CandidateSidebar />}
      {user?.data?.role === "COMPANY" && <CompanySidebar />}
      <div className={cn("min-h-screen antialiased")}>
        <main className="flex-1">
          <div className="sticky top-0 z-10 flex h-16 items-center border-b   px-6 shadow-sm">
            <h1 className="ml-4 text-xl font-bold">Dashboard</h1>
          </div>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardGroupLayout;
