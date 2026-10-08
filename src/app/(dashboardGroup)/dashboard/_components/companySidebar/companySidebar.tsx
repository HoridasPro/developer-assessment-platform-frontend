"use client";

import Link from "next/link";
import {
  Archive,
  BarChart3,
  ClipboardList,
  FileText,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Plus,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function CompanySidebar() {
  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className="border-b px-6 py-5">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          DevAssessment
        </Link>

        <p className="text-sm text-gray-500">Company Dashboard</p>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {/* Dashboard */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/dashboard/company" />}
                  tooltip="Dashboard"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Assessments */}
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    render={<SidebarMenuButton tooltip="Assessments" />}
                  >
                    <ClipboardList className="h-5 w-5" />

                    <span>Assessments</span>

                    <span className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180">
                      ˅
                    </span>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenu className="ml-4 mt-1 border-l pl-3">
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          render={
                            <Link href="/dashboard/company/assessments" />
                          }
                          tooltip="Assessments"
                        >
                          <ClipboardList className="h-4 w-4" />
                          <span>All Assessments</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      {/* Create Assessment */}
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          render={
                            <Link href="/dashboard/company/createAssessment" />
                          }
                          tooltip="Create Assessment"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Create Assessment</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      {/* Drafts */}
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          render={<Link href="/dashboard/company/drafts" />}
                          tooltip="Drafts"
                        >
                          <FileText className="h-4 w-4" />
                          <span>Drafts</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      {/* Published */}
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          render={<Link href="/dashboard/company/published" />}
                          tooltip="Published"
                        >
                          <BarChart3 className="h-4 w-4" />
                          <span>Published</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      {/* Archived */}
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          render={
                            <Link href="/dashboard/company/assessments/archived" />
                          }
                          tooltip="Archived"
                        >
                          <Archive className="h-4 w-4" />
                          <span>Archived</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <SidebarMenuItem>
                        <SidebarMenuButton
                          render={<Link href="/dashboard/company/attempts" />}
                          tooltip="Attempts"
                        >
                          <Archive className="h-4 w-4" />
                          <span>Attempts</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    render={<SidebarMenuButton tooltip="Assessments" />}
                  >
                    <ListChecks className="h-4 w-4" />

                    <span>Questions</span>

                    <span className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180">
                      ˅
                    </span>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenu className="ml-4 mt-1 border-l pl-3">
                      {/* Create Assessment */}
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          render={
                            <Link href="/dashboard/company/createQuestion" />
                          }
                          tooltip="Create Question"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Create Question</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <SidebarMenuItem>
                        <SidebarMenuButton
                          render={
                            <Link href="/dashboard/company/allQuestions" />
                          }
                          tooltip="All Questions"
                        >
                          <ListChecks className="h-4 w-4" />
                          <span>All Questions</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Problem Bank */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={
                    <Link href="/dashboard/company/payments/paymentHistory" />
                  }
                  tooltip="Payment History"
                >
                  <FileText className="h-5 w-5" />
                  <span>Payment History</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Reports */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/dashboard/company/reports" />}
                  tooltip="Reports"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Reports</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/dashboard/company/candidates" />}
                  tooltip="Candidates"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Candidates</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Settings */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/dashboard/settings" />}
                  tooltip="Settings"
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<button type="button" />}
              tooltip="Logout"
            >
              <LogOut className="h-5 w-5 text-red-500" />
              <span className="text-red-500">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
