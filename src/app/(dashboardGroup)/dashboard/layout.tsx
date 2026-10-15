// "use client";

// import { cn } from "cn";
// import { useGetMe } from "@/hooks";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import { TGetMeResponse } from "@/types/getMeResponse";
// import CandidateSidebar from "./_components/candidateSidebar/candidateSidebar";
// import CompanySidebar from "./_components/companySidebar/companySidebar";
// import AdminSidebar from "./_components/adminSidebar/adminSidebar";

// const DashboardGroupLayout = ({ children }: { children: React.ReactNode }) => {
//   const { data, isLoading, error } = useGetMe();
//   const user: TGetMeResponse = data;

//   return (
//     <SidebarProvider>
//       {user?.data?.role === "CANDIDATE" && <CandidateSidebar />}
//       {user?.data?.role === "COMPANY" && <CompanySidebar />}
//       {user?.data?.role === "ADMIN" && <AdminSidebar />}

//       {/* min-w-0 এবং flex-1 দিয়ে পুরো বাকি জায়গা ছড়িয়ে দেওয়া হয়েছে */}
//       <div className={cn("min-h-screen flex-1 w-full min-w-0 antialiased")}>
//         <main className="flex-1 w-full">
//           <div className="sticky top-0 z-10 flex h-16 w-full items-center border-b bg-white dark:bg-muted px-6 shadow-sm">
//             <h1 className="text-xl font-bold">Dashboard</h1>
//           </div>

//           {/* p-6 সরিয়ে দেওয়া হয়েছে যাতে চাইল্ড পেজ ফুল উইডথ পায় */}
//           <div className="w-full">{children}</div>
//         </main>
//       </div>
//     </SidebarProvider>
//   );
// };

// export default DashboardGroupLayout;
"use client";

import { cn } from "cn";
import { useGetMe } from "@/hooks";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TGetMeResponse } from "@/types/getMeResponse";
import CandidateSidebar from "./_components/candidateSidebar/candidateSidebar";
import CompanySidebar from "./_components/companySidebar/companySidebar";
import AdminSidebar from "./_components/adminSidebar/adminSidebar";

const DashboardGroupLayout = ({ children }: { children: React.ReactNode }) => {
  const { data } = useGetMe();
  const user: TGetMeResponse = data;

  return (
    <SidebarProvider>
      {user?.data?.role === "CANDIDATE" && <CandidateSidebar />}
      {user?.data?.role === "COMPANY" && <CompanySidebar />}
      {user?.data?.role === "ADMIN" && <AdminSidebar />}

      <div className={cn("min-h-screen flex-1 w-full min-w-0 antialiased")}>
        <main className="flex-1 w-full">
          <div className="sticky top-0 z-10 flex h-16 w-full items-center gap-3 border-b bg-white px-3 shadow-sm dark:bg-muted sm:px-6">
            {/* Mobile Sidebar Toggle */}
            <SidebarTrigger
              aria-label="Open or close sidebar"
              className="size-9 shrink-0 lg:hidden"
            />

            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>

          <div className="w-full">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardGroupLayout;
