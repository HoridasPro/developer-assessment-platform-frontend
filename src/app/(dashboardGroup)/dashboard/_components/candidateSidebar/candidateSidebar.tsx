import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  CreditCard,
  User,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function CandidateSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-5">
        <h2 className="text-2xl font-bold text-blue-600">DevAssessment</h2>
        <p className="text-sm text-gray-500">Candidate Dashboard</p>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton render={<Link href="/dashboard"></Link>}>
                <Link href="/dashboard">
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href="/dashboard/candidate/myAssignedAssessments"></Link>}
              >
                <Package className="h-5 w-5" />
                <span>My assigned assessments</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href="/dashboard/payments"></Link>}
              >
                <CreditCard className="h-5 w-5" />
                <span>Payments</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href="/dashboard/customer-profile"></Link>}
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOut className="h-5 w-5 text-red-500" />
              <span className="text-red-500">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
