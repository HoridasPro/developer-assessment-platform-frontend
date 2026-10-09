import Link from "next/link";
import { LayoutDashboard, CreditCard, User, LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-5">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          DevAssessment
        </Link>
        <p className="text-sm text-gray-500">Admin Dashboard</p>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton render={<Link href="/dashboard/admin"></Link>}>
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href="/dashboard/admin/allUsers"></Link>}
              >
                <CreditCard className="h-5 w-5" />
                <span>All Users</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

             
             
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
