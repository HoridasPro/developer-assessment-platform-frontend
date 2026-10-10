// "use client";

// import { useGetAdminDashboardStats } from "@/hooks";
// import {
//   Users,
//   Building2,
//   ClipboardList,
//   FileCheck,
//   RefreshCw,
//   AlertCircle,
//   ShieldCheck,
//   TrendingUp,
//   UserCheck,
//   Clock,
//   CheckCircle2,
//   XCircle,
// } from "lucide-react";
// import type { ElementType } from "react";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Cell,
//   Pie,
//   PieChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// type StatCardProps = {
//   title: string;
//   value: number;
//   description: string;
//   icon: ElementType;
//   color: string;
//   bgColor: string;
// };

// type DashboardStats = {
//   users: {
//     total: number;
//     candidates: number;
//     companies: number;
//     admins: number;
//   };
//   assessments: {
//     total: number;
//     published: number;
//     draft: number;
//   };
//   attempts: {
//     total: number;
//     completed: number;
//     inProgress: number;
//     expired: number;
//   };
//   results: {
//     evaluated: number;
//     passed: number;
//     failed: number;
//   };
// };

// const CHART_COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"];

// function StatCard({
//   title,
//   value,
//   description,
//   icon: Icon,
//   color,
//   bgColor,
// }: StatCardProps) {
//   return (
//     <div className="group relative min-w-0 overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5 sm:p-5 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700">
//       <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500/70 via-violet-500/60 to-emerald-500/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

//       <div className="flex items-start justify-between gap-3">
//         <div className="min-w-0 flex-1">
//           <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 sm:text-sm dark:text-gray-400">
//             {title}
//           </p>

//           <h2 className="mt-3 break-words text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
//             {value.toLocaleString()}
//           </h2>
//         </div>

//         <div
//           className={`shrink-0 rounded-2xl p-2.5 transition-transform duration-300 group-hover:scale-110 sm:p-3 ${bgColor}`}
//         >
//           <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${color}`} />
//         </div>
//       </div>

//       <div className="mt-5 flex min-h-10 items-start gap-2 border-t border-gray-100 pt-4 dark:border-gray-800">
//         <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />

//         <p className="break-words text-xs leading-5 text-gray-500 dark:text-gray-400">
//           {description}
//         </p>
//       </div>
//     </div>
//   );
// }

// function LoadingSkeleton() {
//   return (
//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//       {["users", "companies", "assessments", "attempts"].map((item) => (
//         <div
//           key={item}
//           className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
//         >
//           <div className="h-4 w-28 rounded bg-gray-200 dark:bg-gray-700" />
//           <div className="mt-5 h-9 w-24 rounded bg-gray-200 dark:bg-gray-700" />
//           <div className="mt-6 h-3 w-36 max-w-full rounded bg-gray-200 dark:bg-gray-700" />
//         </div>
//       ))}
//     </div>
//   );
// }

// function ChartSkeleton() {
//   return (
//     <div className="h-[300px] animate-pulse rounded-2xl bg-gray-100 sm:h-[340px] dark:bg-gray-800" />
//   );
// }

// export default function AdminDashboardPage() {
//   const { data, isLoading, isError, refetch, isFetching } =
//     useGetAdminDashboardStats();

//   // API response: { success, message, data: { users, assessments, attempts, results } }
//   const stats = data?.data as DashboardStats | undefined;

//   const totalUsers = stats?.users?.total ?? 0;
//   const totalCompanies = stats?.users?.companies ?? 0;
//   const totalAssessments = stats?.assessments?.total ?? 0;
//   const totalAttempts = stats?.attempts?.total ?? 0;

//   const statCards: StatCardProps[] = [
//     {
//       title: "Total Users",
//       value: totalUsers,
//       description: `${stats?.users?.candidates ?? 0} candidates · ${stats?.users?.admins ?? 0} admins`,
//       icon: Users,
//       color: "text-blue-600",
//       bgColor: "bg-blue-100 dark:bg-blue-950",
//     },
//     {
//       title: "Total Companies",
//       value: totalCompanies,
//       description: "Registered companies",
//       icon: Building2,
//       color: "text-violet-600",
//       bgColor: "bg-violet-100 dark:bg-violet-950",
//     },
//     {
//       title: "Total Assessments",
//       value: totalAssessments,
//       description: `${stats?.assessments?.published ?? 0} published · ${stats?.assessments?.draft ?? 0} drafts`,
//       icon: ClipboardList,
//       color: "text-emerald-600",
//       bgColor: "bg-emerald-100 dark:bg-emerald-950",
//     },
//     {
//       title: "Total Attempts",
//       value: totalAttempts,
//       description: `${stats?.attempts?.completed ?? 0} completed attempts`,
//       icon: FileCheck,
//       color: "text-amber-600",
//       bgColor: "bg-amber-100 dark:bg-amber-950",
//     },
//   ];

//   const chartData = [
//     { name: "Users", total: totalUsers },
//     { name: "Companies", total: totalCompanies },
//     { name: "Assessments", total: totalAssessments },
//     { name: "Attempts", total: totalAttempts },
//   ];

//   const hasChartData = chartData.some((item) => item.total > 0);

//   const activityData = [
//     {
//       name: "Published",
//       total: stats?.assessments?.published ?? 0,
//       color: "#10B981",
//     },
//     {
//       name: "Draft",
//       total: stats?.assessments?.draft ?? 0,
//       color: "#F59E0B",
//     },
//     {
//       name: "Completed",
//       total: stats?.attempts?.completed ?? 0,
//       color: "#3B82F6",
//     },
//     {
//       name: "In Progress",
//       total: stats?.attempts?.inProgress ?? 0,
//       color: "#8B5CF6",
//     },
//   ];

//   if (isLoading) {
//     return (
//       <div className="min-h-screen space-y-7 bg-gray-50 p-3 sm:space-y-8 sm:p-6 lg:p-8 dark:bg-gray-950">
//         <div className="space-y-3">
//           <div className="h-8 w-56 max-w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
//           <div className="h-4 w-72 max-w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
//         </div>

//         <LoadingSkeleton />

//         <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
//           <ChartSkeleton />
//           <ChartSkeleton />
//         </div>
//       </div>
//     );
//   }

//   if (isError || !stats) {
//     return (
//       <div className="flex min-h-[400px] flex-col items-center justify-center px-4 py-12 text-center">
//         <div className="rounded-2xl bg-red-100 p-4 dark:bg-red-950">
//           <AlertCircle className="h-8 w-8 text-red-600" />
//         </div>

//         <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
//           Failed to load dashboard
//         </h2>

//         <p className="mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
//           Dashboard statistics could not be loaded. Please try again.
//         </p>

//         <button
//           type="button"
//           onClick={() => refetch()}
//           disabled={isFetching}
//           className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
//         >
//           <RefreshCw
//             className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
//           />
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen space-y-7 overflow-x-hidden bg-gray-50 p-3 sm:space-y-8 sm:p-5 md:p-6 lg:p-8  dark:bg-gray-950">
//       {/* Header */}
//       <header className="flex flex-col justify-between gap-5 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm sm:p-6 lg:flex-row lg:items-center dark:border-gray-800 dark:bg-gray-900">
//         <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
//           <div className="shrink-0 rounded-2xl bg-blue-100 p-3 dark:bg-blue-950">
//             <ShieldCheck className="h-6 w-6 text-blue-600 sm:h-8 sm:w-8" />
//           </div>

//           <div className="min-w-0">
//             <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
//               Admin Overview
//             </h1>

//             <p className="mt-1 text-sm leading-6 text-gray-500 sm:text-base dark:text-gray-400">
//               Monitor your Developer Assessment platform.
//             </p>
//           </div>
//         </div>

//         <button
//           type="button"
//           onClick={() => refetch()}
//           disabled={isFetching}
//           className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
//         >
//           <RefreshCw
//             className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
//           />
//           {isFetching ? "Refreshing..." : "Refresh"}
//         </button>
//       </header>

//       {/* Summary Cards */}
//       <section className="space-y-4">
//         <div>
//           <h2 className="text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
//             Platform Statistics
//           </h2>
//           <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
//             A quick overview of your platform activity.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//           {statCards.map((card) => (
//             <StatCard key={card.title} {...card} />
//           ))}
//         </div>
//       </section>

//       {/* Detailed Statistics */}
//       <section className="space-y-4">
//         <div>
//           <h2 className="text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
//             Assessment & Attempt Details
//           </h2>
//           <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
//             Detailed breakdown of platform activity.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//           {[
//             {
//               title: "Candidates",
//               value: stats.users.candidates,
//               icon: UserCheck,
//               color: "text-blue-600",
//             },
//             {
//               title: "Evaluated Results",
//               value: stats.results.evaluated,
//               icon: FileCheck,
//               color: "text-violet-600",
//             },
//             {
//               title: "Passed",
//               value: stats.results.passed,
//               icon: CheckCircle2,
//               color: "text-emerald-600",
//             },
//             {
//               title: "Failed",
//               value: stats.results.failed,
//               icon: XCircle,
//               color: "text-red-600",
//             },
//           ].map((item) => (
//             <div
//               key={item.title}
//               className="group flex min-w-0 items-center gap-3 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:gap-4 sm:p-5 dark:border-gray-800 dark:bg-gray-900"
//             >
//               <div className="shrink-0 rounded-xl bg-gray-100 p-3 transition-transform group-hover:scale-105 dark:bg-gray-800">
//                 <item.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${item.color}`} />
//               </div>

//               <div className="min-w-0">
//                 <p className="break-words text-sm leading-5 text-gray-500 dark:text-gray-400">
//                   {item.title}
//                 </p>
//                 <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
//                   {item.value.toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Charts */}
//       <section className="space-y-4">
//         <div>
//           <h2 className="text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
//             Analytics Overview
//           </h2>
//           <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
//             Visual summary of the statistics returned by your backend.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
//           {/* Bar Chart */}
//           <div className="min-w-0 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900">
//             <div className="mb-5">
//               <h3 className="text-base font-bold text-gray-900 sm:text-lg dark:text-white">
//                 Platform Counts
//               </h3>
//               <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
//                 Total users, companies, assessments and attempts.
//               </p>
//             </div>

//             {hasChartData ? (
//               <div className="h-[260px] w-full min-w-0 sm:h-[320px]">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart
//                     data={chartData}
//                     margin={{ top: 10, right: 8, left: -16, bottom: 5 }}
//                   >
//                     <CartesianGrid
//                       strokeDasharray="3 3"
//                       vertical={false}
//                       stroke="#9CA3AF"
//                       opacity={0.25}
//                     />
//                     <XAxis
//                       dataKey="name"
//                       tickLine={false}
//                       axisLine={false}
//                       tick={{ fontSize: 11 }}
//                       interval={0}
//                     />
//                     <YAxis
//                       allowDecimals={false}
//                       tickLine={false}
//                       axisLine={false}
//                       tick={{ fontSize: 12 }}
//                       width={40}
//                     />
//                     <Tooltip
//                       formatter={(value) => [
//                         Number(value).toLocaleString(),
//                         "Total",
//                       ]}
//                       contentStyle={{
//                         borderRadius: 12,
//                         border: "1px solid #E5E7EB",
//                       }}
//                     />
//                     <Bar
//                       dataKey="total"
//                       name="Total"
//                       radius={[7, 7, 0, 0]}
//                       maxBarSize={58}
//                     >
//                       {chartData.map((item, index) => (
//                         <Cell key={item.name} fill={CHART_COLORS[index]} />
//                       ))}
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             ) : (
//               <div className="flex h-[260px] flex-col items-center justify-center text-center sm:h-[320px]">
//                 <ClipboardList className="h-10 w-10 text-gray-400" />
//                 <p className="mt-3 font-semibold text-gray-700 dark:text-gray-300">
//                   No statistics available
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Pie Chart */}
//           <div className="min-w-0 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900">
//             <div className="mb-2">
//               <h3 className="text-base font-bold text-gray-900 sm:text-lg dark:text-white">
//                 Statistics Distribution
//               </h3>
//               <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
//                 Breakdown of the available platform counts.
//               </p>
//             </div>

//             {hasChartData ? (
//               <>
//                 <div className="h-[240px] w-full min-w-0 sm:h-[270px]">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie
//                         data={chartData.filter((item) => item.total > 0)}
//                         dataKey="total"
//                         nameKey="name"
//                         cx="50%"
//                         cy="50%"
//                         innerRadius="45%"
//                         outerRadius="72%"
//                         paddingAngle={3}
//                         stroke="none"
//                       >
//                         {chartData
//                           .filter((item) => item.total > 0)
//                           .map((item) => {
//                             const index = chartData.findIndex(
//                               (chartItem) => chartItem.name === item.name,
//                             );

//                             return (
//                               <Cell
//                                 key={item.name}
//                                 fill={CHART_COLORS[index]}
//                               />
//                             );
//                           })}
//                       </Pie>
//                       <Tooltip
//                         formatter={(value) => [
//                           Number(value).toLocaleString(),
//                           "Total",
//                         ]}
//                         contentStyle={{
//                           borderRadius: 12,
//                           border: "1px solid #E5E7EB",
//                         }}
//                       />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>

//                 <div className="grid grid-cols-2 gap-x-3 gap-y-4 border-t border-gray-100 pt-5 sm:gap-x-5 dark:border-gray-800">
//                   {chartData.map((item, index) => (
//                     <div
//                       key={item.name}
//                       className="flex min-w-0 items-center gap-2"
//                     >
//                       <span
//                         className="h-3 w-3 shrink-0 rounded-full"
//                         style={{ backgroundColor: CHART_COLORS[index] }}
//                       />
//                       <div className="min-w-0">
//                         <p className="truncate text-xs text-gray-500 dark:text-gray-400">
//                           {item.name}
//                         </p>
//                         <p className="mt-0.5 font-bold text-gray-900 dark:text-white">
//                           {item.total.toLocaleString()}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             ) : (
//               <div className="flex h-[260px] flex-col items-center justify-center text-center">
//                 <FileCheck className="h-10 w-10 text-gray-400" />
//                 <p className="mt-3 font-semibold text-gray-700 dark:text-gray-300">
//                   No statistics available
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Assessment Activity */}
//       <section className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900">
//         <div className="mb-5 flex items-start gap-3 sm:items-center">
//           <div className="shrink-0 rounded-xl bg-violet-100 p-3 dark:bg-violet-950">
//             <Clock className="h-5 w-5 text-violet-600" />
//           </div>

//           <div className="min-w-0">
//             <h2 className="text-base font-bold text-gray-900 sm:text-lg dark:text-white">
//               Activity Summary
//             </h2>
//             <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
//               Current assessment and attempt statuses.
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
//           {activityData.map((item) => (
//             <div
//               key={item.name}
//               className="rounded-xl border border-gray-100 bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-750"
//             >
//               <div className="flex items-center gap-2">
//                 <span
//                   className="h-2.5 w-2.5 shrink-0 rounded-full"
//                   style={{ backgroundColor: item.color }}
//                 />
//                 <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
//                   {item.name}
//                 </p>
//               </div>

//               <p className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
//                 {item.total.toLocaleString()}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }




"use client";

import { useGetAdminDashboardStats } from "@/hooks";
import {
  Users,
  Building2,
  ClipboardList,
  FileCheck,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import type { ElementType } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type StatCardProps = {
  title: string;
  value: number;
  description: string;
  icon: ElementType;
  color: string;
  bgColor: string;
};

type DashboardStats = {
  users: {
    total: number;
    candidates: number;
    companies: number;
    admins: number;
  };
  assessments: {
    total: number;
    published: number;
    draft: number;
  };
  attempts: {
    total: number;
    completed: number;
    inProgress: number;
    expired: number;
  };
  results: {
    evaluated: number;
    passed: number;
    failed: number;
  };
};

const CHART_COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"];

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  color,
  bgColor,
}: StatCardProps) {
  return (
    <div className="group relative min-w-0 overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 sm:p-5">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500/70 via-violet-500/60 to-emerald-500/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:text-sm">
            {title}
          </p>

          <h2 className="mt-3 break-words text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {value.toLocaleString()}
          </h2>
        </div>

        <div
          className={`shrink-0 rounded-2xl p-2.5 transition-transform duration-300 group-hover:scale-110 sm:p-3 ${bgColor}`}
        >
          <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${color}`} />
        </div>
      </div>

      <div className="mt-5 flex min-h-10 items-start gap-2 border-t border-border pt-4">
        <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />

        <p className="break-words text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {["users", "companies", "assessments", "attempts"].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-2xl border border-border bg-card p-5"
        >
          <div className="h-4 w-28 rounded bg-muted" />
          <div className="mt-5 h-9 w-24 rounded bg-muted" />
          <div className="mt-6 h-3 w-36 max-w-full rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="h-[300px] animate-pulse rounded-2xl border border-border bg-muted sm:h-[340px]" />
  );
}

export default function AdminDashboardPage() {
  const { data, isLoading, isError, refetch, isFetching } =
    useGetAdminDashboardStats();

  // API response: { success, message, data: { users, assessments, attempts, results } }
  const stats = data?.data as DashboardStats | undefined;

  const totalUsers = stats?.users?.total ?? 0;
  const totalCompanies = stats?.users?.companies ?? 0;
  const totalAssessments = stats?.assessments?.total ?? 0;
  const totalAttempts = stats?.attempts?.total ?? 0;

  const statCards: StatCardProps[] = [
    {
      title: "Total Users",
      value: totalUsers,
      description: `${stats?.users?.candidates ?? 0} candidates · ${stats?.users?.admins ?? 0} admins`,
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-950",
    },
    {
      title: "Total Companies",
      value: totalCompanies,
      description: "Registered companies",
      icon: Building2,
      color: "text-violet-600 dark:text-violet-400",
      bgColor: "bg-violet-100 dark:bg-violet-950",
    },
    {
      title: "Total Assessments",
      value: totalAssessments,
      description: `${stats?.assessments?.published ?? 0} published · ${stats?.assessments?.draft ?? 0} drafts`,
      icon: ClipboardList,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-100 dark:bg-emerald-950",
    },
    {
      title: "Total Attempts",
      value: totalAttempts,
      description: `${stats?.attempts?.completed ?? 0} completed attempts`,
      icon: FileCheck,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-950",
    },
  ];

  const chartData = [
    { name: "Users", total: totalUsers },
    { name: "Companies", total: totalCompanies },
    { name: "Assessments", total: totalAssessments },
    { name: "Attempts", total: totalAttempts },
  ];

  const hasChartData = chartData.some((item) => item.total > 0);

  const activityData = [
    {
      name: "Published",
      total: stats?.assessments?.published ?? 0,
      color: "#10B981",
    },
    {
      name: "Draft",
      total: stats?.assessments?.draft ?? 0,
      color: "#F59E0B",
    },
    {
      name: "Completed",
      total: stats?.attempts?.completed ?? 0,
      color: "#3B82F6",
    },
    {
      name: "In Progress",
      total: stats?.attempts?.inProgress ?? 0,
      color: "#8B5CF6",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen space-y-7 bg-background p-3 sm:space-y-8 sm:p-6 lg:p-8">
        <div className="space-y-3">
          <div className="h-8 w-56 max-w-full animate-pulse rounded-lg bg-muted" />
          <div className="h-4 w-72 max-w-full animate-pulse rounded-lg bg-muted" />
        </div>

        <LoadingSkeleton />

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center px-4 py-12 text-center">
        <div className="rounded-2xl bg-red-100 p-4 dark:bg-red-950">
          <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>

        <h2 className="mt-4 text-xl font-bold text-foreground">
          Failed to load dashboard
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          Dashboard statistics could not be loaded. Please try again.
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-7 overflow-x-hidden   p-3 sm:space-y-8 sm:p-5 md:p-6 lg:p-8">
      {/* Header */}
      <header className="flex flex-col justify-between gap-5 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6 lg:flex-row lg:items-center">
        <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
          <div className="shrink-0 rounded-2xl bg-blue-100 p-3 dark:bg-blue-950">
            <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400 sm:h-8 sm:w-8" />
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Admin Overview
            </h1>

            <p className="mt-1 text-sm leading-6 text-muted-foreground sm:text-base">
              Monitor your Developer Assessment platform.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          <RefreshCw
            className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
          {isFetching ? "Refreshing..." : "Refresh"}
        </button>
      </header>

      {/* Summary Cards */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-foreground sm:text-xl">
            Platform Statistics
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            A quick overview of your platform activity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      {/* Detailed Statistics */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-foreground sm:text-xl">
            Assessment & Attempt Details
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Detailed breakdown of platform activity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Candidates",
              value: stats.users.candidates,
              icon: UserCheck,
              color: "text-blue-600 dark:text-blue-400",
            },
            {
              title: "Evaluated Results",
              value: stats.results.evaluated,
              icon: FileCheck,
              color: "text-violet-600 dark:text-violet-400",
            },
            {
              title: "Passed",
              value: stats.results.passed,
              icon: CheckCircle2,
              color: "text-emerald-600 dark:text-emerald-400",
            },
            {
              title: "Failed",
              value: stats.results.failed,
              icon: XCircle,
              color: "text-red-600 dark:text-red-400",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group flex min-w-0 items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:gap-4 sm:p-5"
            >
              <div className="shrink-0 rounded-xl bg-muted p-3 transition-transform group-hover:scale-105">
                <item.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${item.color}`} />
              </div>

              <div className="min-w-0">
                <p className="break-words text-sm leading-5 text-muted-foreground">
                  {item.title}
                </p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {item.value.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Charts */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-foreground sm:text-xl">
            Analytics Overview
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Visual summary of the statistics returned by your backend.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {/* Bar Chart */}
          <div className="min-w-0 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
            <div className="mb-5">
              <h3 className="text-base font-bold text-foreground sm:text-lg">
                Platform Counts
              </h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Total users, companies, assessments and attempts.
              </p>
            </div>

            {hasChartData ? (
              <div className="h-[260px] w-full min-w-0 sm:h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 8, left: -16, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="var(--border)"
                      opacity={0.6}
                    />
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      interval={0}
                    />
                    <YAxis
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                      width={40}
                    />
                    <Tooltip
                      formatter={(value) => [
                        Number(value).toLocaleString(),
                        "Total",
                      ]}
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid var(--border)",
                        backgroundColor: "var(--card)",
                        color: "var(--card-foreground)",
                      }}
                      labelStyle={{ color: "var(--card-foreground)" }}
                    />
                    <Bar
                      dataKey="total"
                      name="Total"
                      radius={[7, 7, 0, 0]}
                      maxBarSize={58}
                    >
                      {chartData.map((item, index) => (
                        <Cell key={item.name} fill={CHART_COLORS[index]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex h-[260px] flex-col items-center justify-center text-center sm:h-[320px]">
                <ClipboardList className="h-10 w-10 text-muted-foreground" />
                <p className="mt-3 font-semibold text-foreground">
                  No statistics available
                </p>
              </div>
            )}
          </div>

          {/* Pie Chart */}
          <div className="min-w-0 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
            <div className="mb-2">
              <h3 className="text-base font-bold text-foreground sm:text-lg">
                Statistics Distribution
              </h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Breakdown of the available platform counts.
              </p>
            </div>

            {hasChartData ? (
              <>
                <div className="h-[240px] w-full min-w-0 sm:h-[270px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData.filter((item) => item.total > 0)}
                        dataKey="total"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius="45%"
                        outerRadius="72%"
                        paddingAngle={3}
                        stroke="none"
                      >
                        {chartData
                          .filter((item) => item.total > 0)
                          .map((item) => {
                            const index = chartData.findIndex(
                              (chartItem) => chartItem.name === item.name,
                            );

                            return (
                              <Cell
                                key={item.name}
                                fill={CHART_COLORS[index]}
                              />
                            );
                          })}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [
                          Number(value).toLocaleString(),
                          "Total",
                        ]}
                        contentStyle={{
                          borderRadius: 12,
                          border: "1px solid var(--border)",
                          backgroundColor: "var(--card)",
                          color: "var(--card-foreground)",
                        }}
                        labelStyle={{ color: "var(--card-foreground)" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-x-3 gap-y-4 border-t border-border pt-5 sm:gap-x-5">
                  {chartData.map((item, index) => (
                    <div
                      key={item.name}
                      className="flex min-w-0 items-center gap-2"
                    >
                      <span
                        className="h-3 w-3 shrink-0 rounded-full"
                        style={{ backgroundColor: CHART_COLORS[index] }}
                      />
                      <div className="min-w-0">
                        <p className="truncate text-xs text-muted-foreground">
                          {item.name}
                        </p>
                        <p className="mt-0.5 font-bold text-foreground">
                          {item.total.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex h-[260px] flex-col items-center justify-center text-center">
                <FileCheck className="h-10 w-10 text-muted-foreground" />
                <p className="mt-3 font-semibold text-foreground">
                  No statistics available
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Assessment Activity */}
      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex items-start gap-3 sm:items-center">
          <div className="shrink-0 rounded-xl bg-violet-100 p-3 dark:bg-violet-950">
            <Clock className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>

          <div className="min-w-0">
            <h2 className="text-base font-bold text-foreground sm:text-lg">
              Activity Summary
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Current assessment and attempt statuses.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {activityData.map((item) => (
            <div
              key={item.name}
              className="rounded-xl border border-border bg-muted/50 p-4 transition-colors hover:bg-muted"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <p className="text-sm font-medium text-muted-foreground">
                  {item.name}
                </p>
              </div>

              <p className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {item.total.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}