import Link from "next/link";
import { LayoutDashboard, CreditCard, User, LogOut } from "lucide-react";

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
        <Link href="/" className="text-2xl font-bold text-blue-600">
          DevAssessment
        </Link>
        <p className="text-sm text-gray-500">Candidate Dashboard</p>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href="/dashboard/candidate/"></Link>}
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href="/dashboard/candidate/assessments"></Link>}
              >
                <CreditCard className="h-5 w-5" />
                <span>My Assessments</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href="/dashboard/candidate/allMyResults"></Link>}
              >
                <User className="h-5 w-5" />
                <span>All my history</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                render={
                  <Link href="/dashboard/candidate/candidateProfile"></Link>
                }
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
