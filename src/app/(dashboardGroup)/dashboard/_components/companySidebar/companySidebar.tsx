// "use client";

// import Link from "next/link";
// import {
//   Archive,
//   BarChart3,
//   ClipboardList,
//   FileText,
//   LayoutDashboard,
//   ListChecks,
//   Plus,
//   Settings,
// } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";

// export default function CompanySidebar() {
//   return (
//     <Sidebar>
//       {/* Header */}
//       <SidebarHeader className="border-b px-6 py-5">
//         <Link href="/" className="text-2xl font-bold text-blue-600">
//           DevAssessment
//         </Link>

//         <p className="text-sm text-gray-500">Company Dashboard</p>
//       </SidebarHeader>

//       {/* Content */}
//       <SidebarContent className="px-3 py-4">
//         <SidebarGroup>
//           <SidebarGroupLabel>Menu</SidebarGroupLabel>

//           <SidebarGroupContent>
//             <SidebarMenu>
//               {/* Dashboard */}
//               <SidebarMenuItem>
//                 <SidebarMenuButton
//                   render={<Link href="/dashboard/company" />}
//                   tooltip="Dashboard"
//                 >
//                   <LayoutDashboard className="h-5 w-5" />
//                   <span>Dashboard</span>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>

//               {/* Assessments */}
//               <Collapsible defaultOpen className="group/collapsible">
//                 <SidebarMenuItem>
//                   <CollapsibleTrigger
//                     render={<SidebarMenuButton tooltip="Assessments" />}
//                   >
//                     <ClipboardList className="h-5 w-5" />

//                     <span>Assessments</span>

//                     <span className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180">
//                       ˅
//                     </span>
//                   </CollapsibleTrigger>

//                   <CollapsibleContent>
//                     <SidebarMenu className="ml-4 mt-1 border-l pl-3">
//                       <SidebarMenuItem>
//                         <SidebarMenuButton
//                           render={
//                             <Link href="/dashboard/company/assessments" />
//                           }
//                           tooltip="Assessments"
//                         >
//                           <ClipboardList className="h-4 w-4" />
//                           <span>All Assessments</span>
//                         </SidebarMenuButton>
//                       </SidebarMenuItem>

//                       {/* Create Assessment */}
//                       <SidebarMenuItem>
//                         <SidebarMenuButton
//                           render={
//                             <Link href="/dashboard/company/createAssessment" />
//                           }
//                           tooltip="Create Assessment"
//                         >
//                           <Plus className="h-4 w-4" />
//                           <span>Create Assessment</span>
//                         </SidebarMenuButton>
//                       </SidebarMenuItem>

//                       {/* Drafts */}
//                       <SidebarMenuItem>
//                         <SidebarMenuButton
//                           render={<Link href="/dashboard/company/drafts" />}
//                           tooltip="Drafts"
//                         >
//                           <FileText className="h-4 w-4" />
//                           <span>Drafts</span>
//                         </SidebarMenuButton>
//                       </SidebarMenuItem>

//                       {/* Published */}
//                       <SidebarMenuItem>
//                         <SidebarMenuButton
//                           render={<Link href="/dashboard/company/published" />}
//                           tooltip="Published"
//                         >
//                           <BarChart3 className="h-4 w-4" />
//                           <span>Published</span>
//                         </SidebarMenuButton>
//                       </SidebarMenuItem>

//                       {/* Archived */}
//                       <SidebarMenuItem>
//                         <SidebarMenuButton
//                           render={
//                             <Link href="/dashboard/company/assessments/archived" />
//                           }
//                           tooltip="Archived"
//                         >
//                           <Archive className="h-4 w-4" />
//                           <span>Archived</span>
//                         </SidebarMenuButton>
//                       </SidebarMenuItem>

//                       <SidebarMenuItem>
//                         <SidebarMenuButton
//                           render={<Link href="/dashboard/company/attempts" />}
//                           tooltip="Attempts"
//                         >
//                           <Archive className="h-4 w-4" />
//                           <span>Attempts</span>
//                         </SidebarMenuButton>
//                       </SidebarMenuItem>
//                     </SidebarMenu>
//                   </CollapsibleContent>
//                 </SidebarMenuItem>
//               </Collapsible>

//               <Collapsible defaultOpen className="group/collapsible">
//                 <SidebarMenuItem>
//                   <CollapsibleTrigger
//                     render={<SidebarMenuButton tooltip="Assessments" />}
//                   >
//                     <ListChecks className="h-4 w-4" />

//                     <span>Questions</span>

//                     <span className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180">
//                       ˅
//                     </span>
//                   </CollapsibleTrigger>

//                   <CollapsibleContent>
//                     <SidebarMenu className="ml-4 mt-1 border-l pl-3">
//                       {/* Create Assessment */}
//                       <SidebarMenuItem>
//                         <SidebarMenuButton
//                           render={
//                             <Link href="/dashboard/company/createQuestion" />
//                           }
//                           tooltip="Create Question"
//                         >
//                           <Plus className="h-4 w-4" />
//                           <span>Create Question</span>
//                         </SidebarMenuButton>
//                       </SidebarMenuItem>

//                       <SidebarMenuItem>
//                         <SidebarMenuButton
//                           render={
//                             <Link href="/dashboard/company/allQuestions" />
//                           }
//                           tooltip="All Questions"
//                         >
//                           <ListChecks className="h-4 w-4" />
//                           <span>All Questions</span>
//                         </SidebarMenuButton>
//                       </SidebarMenuItem>
//                     </SidebarMenu>
//                   </CollapsibleContent>
//                 </SidebarMenuItem>
//               </Collapsible>

//               {/* Problem Bank */}
//               <SidebarMenuItem>
//                 <SidebarMenuButton
//                   render={
//                     <Link href="/dashboard/company/payments/paymentHistory" />
//                   }
//                   tooltip="Payment History"
//                 >
//                   <FileText className="h-5 w-5" />
//                   <span>Payment History</span>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>

//               {/* Reports */}
//               <SidebarMenuItem>
//                 <SidebarMenuButton
//                   render={<Link href="/dashboard/company/reports" />}
//                   tooltip="Reports"
//                 >
//                   <BarChart3 className="h-5 w-5" />
//                   <span>Reports</span>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//               <SidebarMenuItem>
//                 <SidebarMenuButton
//                   render={<Link href="/dashboard/company/candidates" />}
//                   tooltip="Candidates"
//                 >
//                   <BarChart3 className="h-5 w-5" />
//                   <span>Candidates</span>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>

//               {/* Settings */}
//               <SidebarMenuItem>
//                 <SidebarMenuButton
//                   render={<Link href="/dashboard/company/setting" />}
//                   tooltip="Settings"
//                 >
//                   <Settings className="h-5 w-5" />
//                   <span>Settings</span>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }
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

  // =========================================
  // ACTIVE CHECK
  // =========================================
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

  return (
    <Sidebar>
      {/* =========================================
          HEADER
      ========================================= */}
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

      {/* =========================================
          CONTENT
      ========================================= */}
      <SidebarContent className="px-2 py-4 sm:px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Main Menu
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {/* =====================================
                  DASHBOARD
              ===================================== */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/dashboard/company" />}
                  tooltip="Dashboard"
                  className={`h-10 rounded-lg px-3 transition-all ${
                    isActive("/dashboard/company")
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                      : "hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                  }`}
                >
                  <LayoutDashboard
                    className={`h-5 w-5 ${
                      isActive("/dashboard/company")
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-blue-500"
                    }`}
                  />

                  <span className="font-medium">Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* =====================================
                  ASSESSMENTS
              ===================================== */}
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    render={
                      <SidebarMenuButton
                        tooltip="Assessments"
                        className={`h-10 rounded-lg px-3 transition-all ${
                          isAssessmentActive
                            ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400"
                            : "hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
                        }`}
                      />
                    }
                  >
                    <ClipboardList
                      className={`h-5 w-5 ${
                        isAssessmentActive
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-indigo-500"
                      }`}
                    />

                    <span className="font-medium">Assessments</span>

                    <span className="ml-auto text-xs text-muted-foreground transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180">
                      ▼
                    </span>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenu className="ml-4 mt-1 gap-1 border-l border-indigo-200 pl-3 dark:border-indigo-500/30">
                      {/* All Assessments */}
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          render={
                            <Link href="/dashboard/company/assessments" />
                          }
                          tooltip="All Assessments"
                          className={`h-9 rounded-md px-3 transition-all ${
                            isActive("/dashboard/company/assessments")
                              ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400"
                              : "hover:bg-indigo-50 dark:hover:bg-indigo-500/10"
                          }`}
                        >
                          <ClipboardList
                            className={`h-4 w-4 ${
                              isActive("/dashboard/company/assessments")
                                ? "text-indigo-600 dark:text-indigo-400"
                                : "text-indigo-500"
                            }`}
                          />

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
                          className={`h-9 rounded-md px-3 transition-all ${
                            isActive("/dashboard/company/createAssessment")
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                              : "hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
                          }`}
                        >
                          <Plus
                            className={`h-4 w-4 ${
                              isActive("/dashboard/company/createAssessment")
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-emerald-500"
                            }`}
                          />

                          <span>Create Assessment</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      {/* Drafts */}
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          render={<Link href="/dashboard/company/drafts" />}
                          tooltip="Drafts"
                          className={`h-9 rounded-md px-3 transition-all ${
                            isActive("/dashboard/company/drafts")
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
                              : "hover:bg-amber-50 dark:hover:bg-amber-500/10"
                          }`}
                        >
                          <FileText
                            className={`h-4 w-4 ${
                              isActive("/dashboard/company/drafts")
                                ? "text-amber-600 dark:text-amber-400"
                                : "text-amber-500"
                            }`}
                          />

                          <span>Drafts</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      {/* Published */}
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          render={<Link href="/dashboard/company/published" />}
                          tooltip="Published"
                          className={`h-9 rounded-md px-3 transition-all ${
                            isActive("/dashboard/company/published")
                              ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400"
                              : "hover:bg-green-50 dark:hover:bg-green-500/10"
                          }`}
                        >
                          <BarChart3
                            className={`h-4 w-4 ${
                              isActive("/dashboard/company/published")
                                ? "text-green-600 dark:text-green-400"
                                : "text-green-500"
                            }`}
                          />

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
                          className={`h-9 rounded-md px-3 transition-all ${
                            isActive("/dashboard/company/assessments/archived")
                              ? "bg-slate-200 text-slate-800 dark:bg-slate-500/15 dark:text-slate-300"
                              : "hover:bg-slate-100 dark:hover:bg-slate-500/10"
                          }`}
                        >
                          <Archive
                            className={`h-4 w-4 ${
                              isActive(
                                "/dashboard/company/assessments/archived",
                              )
                                ? "text-slate-700 dark:text-slate-300"
                                : "text-slate-500"
                            }`}
                          />

                          <span>Archived</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      {/* Attempts */}
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          render={<Link href="/dashboard/company/attempts" />}
                          tooltip="Attempts"
                          className={`h-9 rounded-md px-3 transition-all ${
                            isActive("/dashboard/company/attempts")
                              ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-400"
                              : "hover:bg-cyan-50 dark:hover:bg-cyan-500/10"
                          }`}
                        >
                          <ClipboardList
                            className={`h-4 w-4 ${
                              isActive("/dashboard/company/attempts")
                                ? "text-cyan-600 dark:text-cyan-400"
                                : "text-cyan-500"
                            }`}
                          />

                          <span>Attempts</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* =====================================
                  QUESTIONS
              ===================================== */}
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    render={
                      <SidebarMenuButton
                        tooltip="Questions"
                        className={`h-10 rounded-lg px-3 transition-all ${
                          isQuestionActive
                            ? "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400"
                            : "hover:bg-violet-50 hover:text-violet-700 dark:hover:bg-violet-500/10 dark:hover:text-violet-400"
                        }`}
                      />
                    }
                  >
                    <ListChecks
                      className={`h-5 w-5 ${
                        isQuestionActive
                          ? "text-violet-600 dark:text-violet-400"
                          : "text-violet-500"
                      }`}
                    />

                    <span className="font-medium">Questions</span>

                    <span className="ml-auto text-xs text-muted-foreground transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180">
                      ▼
                    </span>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenu className="ml-4 mt-1 gap-1 border-l border-violet-200 pl-3 dark:border-violet-500/30">
                      {/* Create Question */}
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          render={
                            <Link href="/dashboard/company/createQuestion" />
                          }
                          tooltip="Create Question"
                          className={`h-9 rounded-md px-3 transition-all ${
                            isActive("/dashboard/company/createQuestion")
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                              : "hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
                          }`}
                        >
                          <Plus
                            className={`h-4 w-4 ${
                              isActive("/dashboard/company/createQuestion")
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-emerald-500"
                            }`}
                          />

                          <span>Create Question</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      {/* All Questions */}
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          render={
                            <Link href="/dashboard/company/allQuestions" />
                          }
                          tooltip="All Questions"
                          className={`h-9 rounded-md px-3 transition-all ${
                            isActive("/dashboard/company/allQuestions")
                              ? "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400"
                              : "hover:bg-violet-50 dark:hover:bg-violet-500/10"
                          }`}
                        >
                          <ListChecks
                            className={`h-4 w-4 ${
                              isActive("/dashboard/company/allQuestions")
                                ? "text-violet-600 dark:text-violet-400"
                                : "text-violet-500"
                            }`}
                          />

                          <span>All Questions</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* =====================================
                  PAYMENT HISTORY
              ===================================== */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={
                    <Link href="/dashboard/company/payments/paymentHistory" />
                  }
                  tooltip="Payment History"
                  className={`h-10 rounded-lg px-3 transition-all ${
                    isActive("/dashboard/company/payments/paymentHistory")
                      ? "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                      : "hover:bg-rose-50 hover:text-rose-700 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
                  }`}
                >
                  <CreditCard
                    className={`h-5 w-5 ${
                      isActive("/dashboard/company/payments/paymentHistory")
                        ? "text-rose-600 dark:text-rose-400"
                        : "text-rose-500"
                    }`}
                  />

                  <span className="font-medium">Payment History</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* =====================================
                  REPORTS
              ===================================== */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/dashboard/company/reports" />}
                  tooltip="Reports"
                  className={`h-10 rounded-lg px-3 transition-all ${
                    isActive("/dashboard/company/reports")
                      ? "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400"
                      : "hover:bg-orange-50 hover:text-orange-700 dark:hover:bg-orange-500/10 dark:hover:text-orange-400"
                  }`}
                >
                  <BarChart3
                    className={`h-5 w-5 ${
                      isActive("/dashboard/company/reports")
                        ? "text-orange-600 dark:text-orange-400"
                        : "text-orange-500"
                    }`}
                  />

                  <span className="font-medium">Reports</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* =====================================
                  CANDIDATES
              ===================================== */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/dashboard/company/candidates" />}
                  tooltip="Candidates"
                  className={`h-10 rounded-lg px-3 transition-all ${
                    isActive("/dashboard/company/candidates")
                      ? "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400"
                      : "hover:bg-teal-50 hover:text-teal-700 dark:hover:bg-teal-500/10 dark:hover:text-teal-400"
                  }`}
                >
                  <Users
                    className={`h-5 w-5 ${
                      isActive("/dashboard/company/candidates")
                        ? "text-teal-600 dark:text-teal-400"
                        : "text-teal-500"
                    }`}
                  />

                  <span className="font-medium">Candidates</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* =====================================
                  SETTINGS
              ===================================== */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/dashboard/company/setting" />}
                  tooltip="Settings"
                  className={`h-10 rounded-lg px-3 transition-all ${
                    isActive("/dashboard/company/setting")
                      ? "bg-slate-100 text-slate-800 dark:bg-slate-500/10 dark:text-slate-300"
                      : "hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-500/10 dark:hover:text-slate-300"
                  }`}
                >
                  <Settings
                    className={`h-5 w-5 ${
                      isActive("/dashboard/company/setting")
                        ? "text-slate-700 dark:text-slate-300"
                        : "text-slate-500"
                    }`}
                  />

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
