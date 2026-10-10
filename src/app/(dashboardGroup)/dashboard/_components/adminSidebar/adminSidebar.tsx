"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function AdminSidebar() {
  const pathname = usePathname();

  // ACTIVE CHECK
  const isActive = (href: string) => {
    if (href === "/dashboard/admin") {
      return pathname === href || pathname === `${href}/`;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      {/* HEADER */}
      <SidebarHeader className="border-b bg-background px-4 py-5 sm:px-5">
        <Link href="/dashboard/admin" className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 shadow-sm shadow-blue-200">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>

          <div className="min-w-0">
            <span className="block text-lg font-bold tracking-tight text-blue-600 sm:text-xl">
              DevAssessment
            </span>

            <div className="mt-1 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                Admin Dashboard
              </p>
            </div>
          </div>
        </Link>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="px-2 py-4 sm:px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Main Menu
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {/* DASHBOARD */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/dashboard/admin" />}
                  tooltip="Dashboard"
                  isActive={isActive("/dashboard/admin")}
                  className={`h-10 rounded-lg px-3 transition-all ${
                    isActive("/dashboard/admin")
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                      : "hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                  }`}
                >
                  <LayoutDashboard
                    className={`h-5 w-5 ${
                      isActive("/dashboard/admin")
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-blue-500"
                    }`}
                  />

                  <span className="font-medium">Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* MANAGE USERS */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/dashboard/admin/allUsers" />}
                  tooltip="Manage Users"
                  isActive={isActive("/dashboard/admin/allUsers")}
                  className={`h-10 rounded-lg px-3 transition-all ${
                    isActive("/dashboard/admin/allUsers")
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                      : "hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400"
                  }`}
                >
                  <Users
                    className={`h-5 w-5 ${
                      isActive("/dashboard/admin/allUsers")
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-emerald-500"
                    }`}
                  />

                  <span className="font-medium">Manage Users</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* AUDIT LOGS */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/dashboard/admin/auditLogs" />}
                  tooltip="Audit Logs"
                  isActive={isActive("/dashboard/admin/auditLogs")}
                  className={`h-10 rounded-lg px-3 transition-all ${
                    isActive("/dashboard/admin/auditLogs")
                      ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                      : "hover:bg-amber-50 hover:text-amber-700 dark:hover:bg-amber-500/10 dark:hover:text-amber-400"
                  }`}
                >
                  <ClipboardList
                    className={`h-5 w-5 ${
                      isActive("/dashboard/admin/auditLogs")
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-amber-500"
                    }`}
                  />

                  <span className="font-medium">Audit Logs</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ADMIN INFO CARD */}
        <div className="mx-1 mt-6 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 dark:border-blue-500/20 dark:from-blue-500/10 dark:to-indigo-500/10">
          <div className="mb-2 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />

            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Admin Control
            </span>
          </div>

          <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Manage platform users and monitor administrative activities from
            one place.
          </p>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}