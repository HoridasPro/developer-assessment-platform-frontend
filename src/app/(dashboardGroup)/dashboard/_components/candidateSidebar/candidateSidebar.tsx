"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  UserRound,
  LogOut,
  ClipboardList,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard/candidate",
    icon: LayoutDashboard,
    color: "text-blue-500",
    exact: true,
  },
  {
    title: "My Assessments",
    href: "/dashboard/candidate/assessments",
    icon: CreditCard,
    color: "text-emerald-500",
    exact: false,
  },
  {
    title: "All My History",
    href: "/dashboard/candidate/allMyResults",
    icon: ClipboardList,
    color: "text-violet-500",
    exact: false,
  },
  {
    title: "Profile",
    href: "/dashboard/candidate/updateProfile",
    icon: UserRound,
    color: "text-amber-500",
    exact: false,
  },
];

export default function CandidateSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href || pathname === `${href}/`;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      {/* Header */}
      <SidebarHeader className="border-b border-border bg-background px-4 py-5">
        <Link
          href="/"
          className="flex items-center text-xl font-bold tracking-tight"
        >
          <span className="text-primary">Dev</span>
          <span className="text-foreground">Assessment</span>
        </Link>

        <div className="mt-1 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <p className="text-sm text-muted-foreground">Candidate Dashboard</p>
        </div>
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent className="px-2 py-4 sm:px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Workspace
          </SidebarGroupLabel>

          <SidebarMenu className="gap-1">
            {menuItems.map((item) => {
              const active = isActive(item.href, item.exact);
              const Icon = item.icon;

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                      />
                    }
                    tooltip={item.title}
                    isActive={active}
                    className={`h-11 rounded-lg px-3 transition-colors ${
                      active
                        ? "bg-primary/10 font-semibold text-primary hover:bg-primary/15"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className={`size-5 shrink-0 ${item.color}`} />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-border p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              className="h-11 rounded-lg text-red-500 transition-colors hover:bg-red-500/10 hover:text-red-600"
            >
              <LogOut className="size-5 shrink-0 text-red-500" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
