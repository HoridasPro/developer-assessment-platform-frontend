"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Archive,
  BarChart3,
  ClipboardList,
  CreditCard,
  FileText,
  LayoutDashboard,
  ListChecks,
  Plus,
  Settings,
  UserRound,
  Users,
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

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function CompanySidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard/company") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isAssessmentActive =
    pathname.startsWith("/dashboard/company/assessments") ||
    pathname === "/dashboard/company/createAssessment" ||
    pathname === "/dashboard/company/drafts" ||
    pathname === "/dashboard/company/published" ||
    pathname === "/dashboard/company/attempts";

  const isQuestionActive =
    pathname === "/dashboard/company/createQuestion" ||
    pathname.startsWith("/dashboard/company/allQuestions");

  const linkClass = (href: string, color: string) =>
    `h-10 rounded-lg px-3 transition-colors ${
      isActive(href)
        ? `bg-${color}-50 text-${color}-700 dark:bg-${color}-500/10 dark:text-${color}-400`
        : `hover:bg-${color}-50 hover:text-${color}-700 dark:hover:bg-${color}-500/10`
    }`;

  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      {/* HEADER */}
      <SidebarHeader className="border-b bg-background px-4 py-5 sm:px-5">
        <Link
          href="/"
          className="block text-xl font-bold tracking-tight text-blue-600 transition-colors hover:text-blue-700 sm:text-2xl"
        >
          DevAssessment
        </Link>

        <div className="mt-1 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <p className="text-xs font-medium text-muted-foreground sm:text-sm">
            Company Dashboard
          </p>
        </div>
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
                  render={<Link href="/dashboard/company" />}
                  isActive={isActive("/dashboard/company")}
                  tooltip="Dashboard"
                  className="h-10 rounded-lg px-3 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-500/10"
                >
                  <LayoutDashboard className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* ASSESSMENTS */}
              <Collapsible
                defaultOpen={isAssessmentActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    render={
                      <SidebarMenuButton
                        tooltip="Assessments"
                        className={`h-10 rounded-lg px-3 ${
                          isAssessmentActive
                            ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400"
                            : "hover:bg-indigo-50 dark:hover:bg-indigo-500/10"
                        }`}
                      />
                    }
                  >
                    <ClipboardList className="h-5 w-5 text-indigo-500" />
                    <span className="font-medium">Assessments</span>
                    <span className="ml-auto text-xs transition-transform group-data-[state=open]/collapsible:rotate-180">
                      ▼
                    </span>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenu className="ml-4 mt-1 gap-1 border-l border-indigo-200 pl-3 dark:border-indigo-500/30">
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          render={
                            <Link href="/dashboard/company/assessments" />
                          }
                          isActive={
                            pathname === "/dashboard/company/assessments"
                          }
                          tooltip="All Assessments"
                          className="h-9 rounded-md px-3 hover:bg-indigo-50 dark:hover:bg-indigo-500/10"
                        >
                          <ClipboardList className="h-4 w-4 text-indigo-500" />
                          <span>All Assessments</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <SidebarMenuItem>
                        <SidebarMenuButton
                          render={
                            <Link href="/dashboard/company/createAssessment" />
                          }
                          isActive={isActive(
                            "/dashboard/company/createAssessment",
                          )}
                          tooltip="Create Assessment"
                          className="h-9 rounded-md px-3 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
                        >
                          <Plus className="h-4 w-4 text-emerald-500" />
                          <span>Create Assessment</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <SidebarMenuItem>
                        <SidebarMenuButton
                          render={<Link href="/dashboard/company/drafts" />}
                          isActive={isActive("/dashboard/company/drafts")}
                          tooltip="Drafts"
                          className="h-9 rounded-md px-3 hover:bg-amber-50 dark:hover:bg-amber-500/10"
                        >
                          <FileText className="h-4 w-4 text-amber-500" />
                          <span>Drafts</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <SidebarMenuItem>
                        <SidebarMenuButton
                          render={
                            <Link href="/dashboard/company/published" />
                          }
                          isActive={isActive("/dashboard/company/published")}
                          tooltip="Published"
                          className="h-9 rounded-md px-3 hover:bg-green-50 dark:hover:bg-green-500/10"
                        >
                          <BarChart3 className="h-4 w-4 text-green-500" />
                          <span>Published</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <SidebarMenuItem>
                        <SidebarMenuButton
                          render={
                            <Link href="/dashboard/company/assessments/archived" />
                          }
                          isActive={isActive(
                            "/dashboard/company/assessments/archived",
                          )}
                          tooltip="Archived"
                          className="h-9 rounded-md px-3 hover:bg-slate-100 dark:hover:bg-slate-500/10"
                        >
                          <Archive className="h-4 w-4 text-slate-500" />
                          <span>Archived</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <SidebarMenuItem>
                        <SidebarMenuButton
                          render={
                            <Link href="/dashboard/company/attempts" />
                          }
                          isActive={isActive("/dashboard/company/attempts")}
                          tooltip="Attempts"
                          className="h-9 rounded-md px-3 hover:bg-cyan-50 dark:hover:bg-cyan-500/10"
                        >
                          <ClipboardList className="h-4 w-4 text-cyan-500" />
                          <span>Attempts</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* QUESTIONS */}
              <Collapsible
                defaultOpen={isQuestionActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    render={
                      <SidebarMenuButton
                        tooltip="Questions"
                        className={`h-10 rounded-lg px-3 ${
                          isQuestionActive
                            ? "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400"
                            : "hover:bg-violet-50 dark:hover:bg-violet-500/10"
                        }`}
                      />
                    }
                  >
                    <ListChecks className="h-5 w-5 text-violet-500" />
                    <span className="font-medium">Questions</span>
                    <span className="ml-auto text-xs transition-transform group-data-[state=open]/collapsible:rotate-180">
                      ▼
                    </span>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenu className="ml-4 mt-1 gap-1 border-l border-violet-200 pl-3 dark:border-violet-500/30">
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          render={
                            <Link href="/dashboard/company/createQuestion" />
                          }
                          isActive={isActive(
                            "/dashboard/company/createQuestion",
                          )}
                          tooltip="Create Question"
                          className="h-9 rounded-md px-3 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
                        >
                          <Plus className="h-4 w-4 text-emerald-500" />
                          <span>Create Question</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <SidebarMenuItem>
                        <SidebarMenuButton
                          render={
                            <Link href="/dashboard/company/allQuestions" />
                          }
                          isActive={isActive(
                            "/dashboard/company/allQuestions",
                          )}
                          tooltip="All Questions"
                          className="h-9 rounded-md px-3 hover:bg-violet-50 dark:hover:bg-violet-500/10"
                        >
                          <ListChecks className="h-4 w-4 text-violet-500" />
                          <span>All Questions</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* PAYMENT HISTORY */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={
                    <Link href="/dashboard/company/payments/paymentHistory" />
                  }
                  isActive={isActive(
                    "/dashboard/company/payments/paymentHistory",
                  )}
                  tooltip="Payment History"
                  className="h-10 rounded-lg px-3 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                >
                  <CreditCard className="h-5 w-5 text-rose-500" />
                  <span className="font-medium">Payment History</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* REPORTS */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/dashboard/company/reports" />}
                  isActive={isActive("/dashboard/company/reports")}
                  tooltip="Reports"
                  className="h-10 rounded-lg px-3 hover:bg-orange-50 dark:hover:bg-orange-500/10"
                >
                  <BarChart3 className="h-5 w-5 text-orange-500" />
                  <span className="font-medium">Reports</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* CANDIDATES */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/dashboard/company/candidates" />}
                  isActive={isActive("/dashboard/company/candidates")}
                  tooltip="Candidates"
                  className="h-10 rounded-lg px-3 hover:bg-teal-50 dark:hover:bg-teal-500/10"
                >
                  <Users className="h-5 w-5 text-teal-500" />
                  <span className="font-medium">Candidates</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* PROFILE */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={
                    <Link href="/dashboard/company/updateProfile" />
                  }
                  isActive={isActive("/dashboard/company/updateProfile")}
                  tooltip="Profile"
                  className="h-10 rounded-lg px-3 hover:bg-teal-50 dark:hover:bg-teal-500/10"
                >
                  <UserRound className="h-5 w-5 text-teal-500" />
                  <span className="font-medium">Profile</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* SETTINGS */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/dashboard/company/setting" />}
                  isActive={isActive("/dashboard/company/setting")}
                  tooltip="Settings"
                  className="h-10 rounded-lg px-3 hover:bg-slate-100 dark:hover:bg-slate-500/10"
                >
                  <Settings className="h-5 w-5 text-slate-500" />
                  <span className="font-medium">Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}