// // "use client";

// // import { useState } from "react";
// // import { useGetAdminUsers } from "@/hooks";
// // import Image from "next/image";
// // import {
// //   Users,
// //   UserRound,
// //   Building2,
// //   ShieldCheck,
// //   RefreshCw,
// //   Search,
// //   Mail,
// //   CalendarDays,
// //   UserCircle,
// //   AlertCircle,
// //   UsersRound,
// // } from "lucide-react";

// // type AdminUser = {
// //   id: string;
// //   name?: string | null;
// //   email?: string | null;
// //   role?: string | null;
// //   status?: string | null;
// //   profilePhoto?: string | null;
// //   emailVerified?: boolean;
// //   createdAt?: string;
// // };

// // function UserAvatar({ user }: { user: AdminUser }) {
// //   const [imageFailed, setImageFailed] = useState(false);

// //   const initials = (user.name || user.email || "U")
// //     .trim()
// //     .charAt(0)
// //     .toUpperCase();

// //   return (
// //     <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-primary/10 text-sm font-bold text-primary ring-2 ring-background">
// //       {user.profilePhoto && !imageFailed ? (
// //         <Image
// //           src={user.profilePhoto}
// //           alt={user.name || "User profile"}
// //           width={44}
// //           height={44}
// //           unoptimized
// //           onError={() => setImageFailed(true)}
// //           className="h-full w-full object-cover"
// //         />
// //       ) : (
// //         initials
// //       )}
// //     </div>
// //   );
// // }

// // function LoadingSkeleton() {
// //   return (
// //     <div className="space-y-7 p-4 sm:p-6 lg:p-8">
// //       <div className="flex items-center gap-4">
// //         <div className="h-14 w-14 animate-pulse rounded-2xl bg-muted" />
// //         <div className="flex-1 space-y-3">
// //           <div className="h-6 w-40 animate-pulse rounded-lg bg-muted" />
// //           <div className="h-4 w-60 max-w-full animate-pulse rounded-lg bg-muted" />
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
// //         {[1, 2, 3, 4].map((item) => (
// //           <div
// //             key={item}
// //             className="rounded-2xl border border-border bg-card p-5"
// //           >
// //             <div className="flex items-center justify-between">
// //               <div className="h-4 w-24 animate-pulse rounded bg-muted" />
// //               <div className="h-11 w-11 animate-pulse rounded-xl bg-muted" />
// //             </div>
// //             <div className="mt-5 h-9 w-20 animate-pulse rounded-lg bg-muted" />
// //             <div className="mt-3 h-3 w-32 animate-pulse rounded bg-muted" />
// //           </div>
// //         ))}
// //       </div>

// //       <div className="overflow-hidden rounded-2xl border border-border bg-card">
// //         <div className="border-b border-border p-5">
// //           <div className="h-5 w-40 animate-pulse rounded bg-muted" />
// //           <div className="mt-3 h-4 w-56 animate-pulse rounded bg-muted" />
// //         </div>

// //         <div className="space-y-5 p-5">
// //           {[1, 2, 3, 4, 5].map((item) => (
// //             <div key={item} className="flex items-center gap-4">
// //               <div className="h-11 w-11 animate-pulse rounded-full bg-muted" />
// //               <div className="flex-1 space-y-2">
// //                 <div className="h-4 w-36 max-w-full animate-pulse rounded bg-muted" />
// //                 <div className="h-3 w-48 max-w-full animate-pulse rounded bg-muted" />
// //               </div>
// //               <div className="hidden h-7 w-20 animate-pulse rounded-full bg-muted sm:block" />
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       <div className="flex flex-col items-center justify-center gap-3 py-3">
// //         <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
// //           <RefreshCw className="h-6 w-6 animate-spin text-primary" />
// //         </div>
// //         <p className="text-sm font-semibold">Loading users</p>
// //         <p className="text-xs text-muted-foreground">
// //           Please wait while we fetch your data...
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // function getRoleStyle(role?: string | null) {
// //   switch (role?.toUpperCase()) {
// //     case "ADMIN":
// //       return "bg-violet-500/10 text-violet-600 dark:text-violet-400";
// //     case "COMPANY":
// //       return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
// //     case "CANDIDATE":
// //       return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
// //     default:
// //       return "bg-muted text-muted-foreground";
// //   }
// // }

// // function getStatus(user: AdminUser) {
// //   if (user.status) return user.status.toUpperCase();

// //   if (user.emailVerified === undefined) return "UNKNOWN";

// //   return user.emailVerified ? "VERIFIED" : "UNVERIFIED";
// // }

// // function getStatusStyle(status: string) {
// //   if (status === "VERIFIED" || status === "ACTIVE") {
// //     return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
// //   }

// //   if (
// //     status === "UNVERIFIED" ||
// //     status === "INACTIVE" ||
// //     status === "SUSPENDED"
// //   ) {
// //     return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
// //   }

// //   return "bg-muted text-muted-foreground";
// // }

// // function formatDate(date?: string) {
// //   if (!date) return "N/A";

// //   const parsedDate = new Date(date);

// //   if (Number.isNaN(parsedDate.getTime())) return "N/A";

// //   return parsedDate.toLocaleDateString("en-GB", {
// //     day: "2-digit",
// //     month: "short",
// //     year: "numeric",
// //   });
// // }

// // export default function AdminUsersPage() {
// //   const { data, isLoading, isError, refetch, isFetching } =
// //     useGetAdminUsers();

// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [roleFilter, setRoleFilter] = useState("ALL");

// //   const users: AdminUser[] = Array.isArray(data?.data) ? data.data : [];

// //   const filteredUsers = users.filter((user) => {
// //     const search = searchTerm.trim().toLowerCase();

// //     const matchesSearch =
// //       !search ||
// //       (user.name || "").toLowerCase().includes(search) ||
// //       (user.email || "").toLowerCase().includes(search) ||
// //       (user.role || "").toLowerCase().includes(search);

// //     const matchesRole =
// //       roleFilter === "ALL" || user.role?.toUpperCase() === roleFilter;

// //     return matchesSearch && matchesRole;
// //   });

// //   const candidateCount = users.filter(
// //     (user) => user.role?.toUpperCase() === "CANDIDATE",
// //   ).length;

// //   const companyCount = users.filter(
// //     (user) => user.role?.toUpperCase() === "COMPANY",
// //   ).length;

// //   const verifiedCount = users.filter(
// //     (user) => user.emailVerified === true,
// //   ).length;

// //   if (isLoading) {
// //     return <LoadingSkeleton />;
// //   }

// //   if (isError) {
// //     return (
// //       <div className="flex min-h-[60vh] items-center justify-center p-5">
// //         <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
// //           <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10">
// //             <AlertCircle className="h-7 w-7 text-destructive" />
// //           </div>

// //           <h1 className="mt-5 text-xl font-bold">Unable to load users</h1>

// //           <p className="mt-2 text-sm leading-6 text-muted-foreground">
// //             Something went wrong while fetching user information. Please check
// //             your connection and try again.
// //           </p>

// //           <button
// //             type="button"
// //             onClick={() => refetch()}
// //             className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
// //           >
// //             <RefreshCw className="h-4 w-4" />
// //             Try Again
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const summaryCards = [
// //     {
// //       title: "Total Users",
// //       count: users.length,
// //       subtitle: "All registered accounts",
// //       icon: UsersRound,
// //       iconStyle: "bg-primary/10 text-primary",
// //     },
// //     {
// //       title: "Candidates",
// //       count: candidateCount,
// //       subtitle: "Candidate accounts",
// //       icon: UserRound,
// //       iconStyle: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
// //     },
// //     {
// //       title: "Companies",
// //       count: companyCount,
// //       subtitle: "Company accounts",
// //       icon: Building2,
// //       iconStyle: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
// //     },
// //     {
// //       title: "Verified Emails",
// //       count: verifiedCount,
// //       subtitle: "Email verified accounts",
// //       icon: ShieldCheck,
// //       iconStyle: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
// //     },
// //   ];

// //   return (
// //     <main className="min-h-full space-y-6 p-4 sm:p-6 lg:space-y-8 lg:p-8">
// //       {/* Page header */}
// //       <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
// //         <div className="flex items-center gap-4">
// //           <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
// //             <Users className="h-7 w-7" />
// //           </div>

// //           <div>
// //             <div className="flex flex-wrap items-center gap-2">
// //               <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
// //                 All Users
// //               </h1>
// //               <span className="rounded-full border border-border bg-card px-2.5 py-1 text-xs font-semibold text-muted-foreground">
// //                 {users.length} total
// //               </span>
// //             </div>

// //             <p className="mt-1 text-sm text-muted-foreground sm:text-base">
// //               Manage and monitor registered platform users.
// //             </p>
// //           </div>
// //         </div>

// //         <button
// //           type="button"
// //           onClick={() => refetch()}
// //           disabled={isFetching}
// //           className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold shadow-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
// //         >
// //           <RefreshCw
// //             className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
// //           />
// //           {isFetching ? "Refreshing..." : "Refresh Users"}
// //         </button>
// //       </section>

// //       {/* Summary cards */}
// //       <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
// //         {summaryCards.map((card) => {
// //           const Icon = card.icon;

// //           return (
// //             <div
// //               key={card.title}
// //               className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md sm:p-6"
// //             >
// //               <div className="flex items-start justify-between gap-3">
// //                 <div>
// //                   <p className="text-sm font-medium text-muted-foreground">
// //                     {card.title}
// //                   </p>
// //                   <p className="mt-3 text-3xl font-bold tracking-tight tabular-nums">
// //                     {card.count.toLocaleString()}
// //                   </p>
// //                 </div>

// //                 <div
// //                   className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-105 ${card.iconStyle}`}
// //                 >
// //                   <Icon className="h-6 w-6" />
// //                 </div>
// //               </div>

// //               <p className="mt-4 text-xs text-muted-foreground">
// //                 {card.subtitle}
// //               </p>
// //             </div>
// //           );
// //         })}
// //       </section>

// //       {/* Users panel */}
// //       <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
// //         <div className="flex flex-col gap-4 border-b border-border p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
// //           <div>
// //             <h2 className="text-lg font-bold tracking-tight">
// //               Registered Users
// //             </h2>
// //             <p className="mt-1 text-sm text-muted-foreground">
// //               Search and view user account information.
// //             </p>
// //           </div>

// //           <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
// //             <div className="relative w-full sm:min-w-64 lg:w-72">
// //               <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
// //               <input
// //                 type="search"
// //                 value={searchTerm}
// //                 onChange={(event) => setSearchTerm(event.target.value)}
// //                 placeholder="Search name, email, role..."
// //                 aria-label="Search users"
// //                 className="h-11 w-full rounded-xl border border-border bg-background pr-3 pl-10 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
// //               />
// //             </div>

// //             <select
// //               value={roleFilter}
// //               onChange={(event) => setRoleFilter(event.target.value)}
// //               aria-label="Filter users by role"
// //               className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 sm:w-40"
// //             >
// //               <option value="ALL">All Roles</option>
// //               <option value="CANDIDATE">Candidates</option>
// //               <option value="COMPANY">Companies</option>
// //               <option value="ADMIN">Admins</option>
// //             </select>
// //           </div>
// //         </div>

// //         <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/20 px-5 py-3 sm:px-6">
// //           <p className="text-sm text-muted-foreground">
// //             Showing{" "}
// //             <span className="font-semibold text-foreground">
// //               {filteredUsers.length}
// //             </span>{" "}
// //             of{" "}
// //             <span className="font-semibold text-foreground">
// //               {users.length}
// //             </span>{" "}
// //             users
// //           </p>

// //           {(searchTerm || roleFilter !== "ALL") && (
// //             <button
// //               type="button"
// //               onClick={() => {
// //                 setSearchTerm("");
// //                 setRoleFilter("ALL");
// //               }}
// //               className="text-xs font-semibold text-primary hover:underline"
// //             >
// //               Clear filters
// //             </button>
// //           )}
// //         </div>

// //         {filteredUsers.length === 0 ? (
// //           <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
// //             <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
// //               <UserCircle className="h-8 w-8 text-muted-foreground" />
// //             </div>

// //             <h3 className="mt-4 font-semibold">
// //               {users.length === 0 ? "No users yet" : "No matching users"}
// //             </h3>

// //             <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
// //               {users.length === 0
// //                 ? "Registered users will appear here when accounts are available."
// //                 : "Try a different search term or change the role filter."}
// //             </p>
// //           </div>
// //         ) : (
// //           <>
// //             {/* Desktop and tablet table */}
// //             <div className="hidden overflow-x-auto md:block">
// //               <table className="w-full min-w-[760px] text-left text-sm">
// //                 <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
// //                   <tr>
// //                     <th className="px-5 py-4 font-semibold">#</th>
// //                     <th className="px-5 py-4 font-semibold">User</th>
// //                     <th className="px-5 py-4 font-semibold">Role</th>
// //                     <th className="px-5 py-4 font-semibold">Email Status</th>
// //                     <th className="px-5 py-4 font-semibold">Joined Date</th>
// //                   </tr>
// //                 </thead>

// //                 <tbody className="divide-y divide-border">
// //                   {filteredUsers.map((user, index) => {
// //                     const role = user.role?.toUpperCase() || "UNKNOWN";
// //                     const status = getStatus(user);

// //                     return (
// //                       <tr
// //                         key={user.id}
// //                         className="transition-colors hover:bg-muted/30"
// //                       >
// //                         <td className="px-5 py-4 text-muted-foreground">
// //                           {index + 1}
// //                         </td>

// //                         <td className="px-5 py-4">
// //                           <div className="flex min-w-0 items-center gap-3">
// //                             <UserAvatar user={user} />
// //                             <div className="min-w-0">
// //                               <p className="truncate font-semibold">
// //                                 {user.name || "Unnamed User"}
// //                               </p>
// //                               <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-muted-foreground">
// //                                 <Mail className="h-3.5 w-3.5 shrink-0" />
// //                                 {user.email || "No email"}
// //                               </p>
// //                             </div>
// //                           </div>
// //                         </td>

// //                         <td className="px-5 py-4">
// //                           <span
// //                             className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getRoleStyle(role)}`}
// //                           >
// //                             {role}
// //                           </span>
// //                         </td>

// //                         <td className="px-5 py-4">
// //                           <span
// //                             className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(status)}`}
// //                           >
// //                             <span className="h-1.5 w-1.5 rounded-full bg-current" />
// //                             {status}
// //                           </span>
// //                         </td>

// //                         <td className="px-5 py-4 text-muted-foreground">
// //                           <span className="inline-flex items-center gap-2 whitespace-nowrap">
// //                             <CalendarDays className="h-4 w-4" />
// //                             {formatDate(user.createdAt)}
// //                           </span>
// //                         </td>
// //                       </tr>
// //                     );
// //                   })}
// //                 </tbody>
// //               </table>
// //             </div>

// //             {/* Mobile cards */}
// //             <div className="space-y-3 p-4 md:hidden">
// //               {filteredUsers.map((user, index) => {
// //                 const role = user.role?.toUpperCase() || "UNKNOWN";
// //                 const status = getStatus(user);

// //                 return (
// //                   <article
// //                     key={user.id}
// //                     className="rounded-xl border border-border bg-background p-4 transition-colors hover:bg-muted/20"
// //                   >
// //                     <div className="flex items-start gap-3">
// //                       <UserAvatar user={user} />

// //                       <div className="min-w-0 flex-1">
// //                         <div className="flex flex-wrap items-center gap-2">
// //                           <h3 className="break-words text-sm font-semibold">
// //                             {user.name || "Unnamed User"}
// //                           </h3>
// //                           <span className="text-xs text-muted-foreground">
// //                             #{index + 1}
// //                           </span>
// //                         </div>

// //                         <p className="mt-1 flex min-w-0 items-center gap-1.5 break-all text-xs leading-5 text-muted-foreground">
// //                           <Mail className="h-3.5 w-3.5 shrink-0" />
// //                           {user.email || "No email"}
// //                         </p>
// //                       </div>
// //                     </div>

// //                     <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-3">
// //                       <span
// //                         className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getRoleStyle(role)}`}
// //                       >
// //                         {role}
// //                       </span>

// //                       <span
// //                         className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(status)}`}
// //                       >
// //                         <span className="h-1.5 w-1.5 rounded-full bg-current" />
// //                         {status}
// //                       </span>

// //                       <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground">
// //                         <CalendarDays className="h-3.5 w-3.5" />
// //                         {formatDate(user.createdAt)}
// //                       </span>
// //                     </div>
// //                   </article>
// //                 );
// //               })}
// //             </div>
// //           </>
// //         )}

// //         <div className="border-t border-border bg-muted/20 px-5 py-4 sm:px-6">
// //           <p className="text-center text-xs text-muted-foreground sm:text-left">
// //             Displaying {filteredUsers.length} user
// //             {filteredUsers.length === 1 ? "" : "s"} · Admin User Management
// //           </p>
// //         </div>
// //       </section>
// //     </main>
// //   );
// // }

// "use client";

// import { useState } from "react";
// import { useGetAdminUsers } from "@/hooks";
// import Image from "next/image";
// import {
//   Users,
//   UserRound,
//   Building2,
//   ShieldCheck,
//   RefreshCw,
//   Search,
//   Mail,
//   CalendarDays,
//   UserCircle,
//   AlertCircle,
//   UsersRound,
// } from "lucide-react";

// type AdminUser = {
//   id: string;
//   name?: string | null;
//   email?: string | null;
//   role?: string | null;
//   status?: string | null;
//   profilePhoto?: string | null;
//   emailVerified?: boolean;
//   createdAt?: string;
// };

// function UserAvatar({ user }: { user: AdminUser }) {
//   const [imageFailed, setImageFailed] = useState(false);

//   const initials = (user.name || user.email || "U")
//     .trim()
//     .charAt(0)
//     .toUpperCase();

//   return (
//     <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-primary/10 text-sm font-bold text-primary ring-2 ring-background">
//       {user.profilePhoto && !imageFailed ? (
//         <Image
//           src={user.profilePhoto}
//           alt={user.name || "User profile"}
//           width={44}
//           height={44}
//           unoptimized
//           onError={() => setImageFailed(true)}
//           className="h-full w-full object-cover"
//         />
//       ) : (
//         initials
//       )}
//     </div>
//   );
// }

// function LoadingSkeleton() {
//   return (
//     <div className="space-y-7 p-4 sm:p-6 lg:p-8">
//       <div className="flex items-center gap-4">
//         <div className="h-14 w-14 animate-pulse rounded-2xl bg-muted" />
//         <div className="flex-1 space-y-3">
//           <div className="h-6 w-40 animate-pulse rounded-lg bg-muted" />
//           <div className="h-4 w-60 max-w-full animate-pulse rounded-lg bg-muted" />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         {[1, 2, 3, 4].map((item) => (
//           <div
//             key={item}
//             className="rounded-2xl border border-border bg-card p-5"
//           >
//             <div className="flex items-center justify-between">
//               <div className="h-4 w-24 animate-pulse rounded bg-muted" />
//               <div className="h-11 w-11 animate-pulse rounded-xl bg-muted" />
//             </div>
//             <div className="mt-5 h-9 w-20 animate-pulse rounded-lg bg-muted" />
//             <div className="mt-3 h-3 w-32 animate-pulse rounded bg-muted" />
//           </div>
//         ))}
//       </div>

//       <div className="overflow-hidden rounded-2xl border border-border bg-card">
//         <div className="border-b border-border p-5">
//           <div className="h-5 w-40 animate-pulse rounded bg-muted" />
//           <div className="mt-3 h-4 w-56 animate-pulse rounded bg-muted" />
//         </div>

//         <div className="space-y-5 p-5">
//           {[1, 2, 3, 4, 5].map((item) => (
//             <div key={item} className="flex items-center gap-4">
//               <div className="h-11 w-11 animate-pulse rounded-full bg-muted" />
//               <div className="flex-1 space-y-2">
//                 <div className="h-4 w-36 max-w-full animate-pulse rounded bg-muted" />
//                 <div className="h-3 w-48 max-w-full animate-pulse rounded bg-muted" />
//               </div>
//               <div className="hidden h-7 w-20 animate-pulse rounded-full bg-muted sm:block" />
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex flex-col items-center justify-center gap-3 py-3">
//         <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
//           <RefreshCw className="h-6 w-6 animate-spin text-primary" />
//         </div>
//         <p className="text-sm font-semibold">Loading users</p>
//         <p className="text-xs text-muted-foreground">
//           Please wait while we fetch your data...
//         </p>
//       </div>
//     </div>
//   );
// }

// function getRoleStyle(role?: string | null) {
//   switch (role?.toUpperCase()) {
//     case "ADMIN":
//       return "bg-violet-500/10 text-violet-600 dark:text-violet-400";
//     case "COMPANY":
//       return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
//     case "CANDIDATE":
//       return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
//     default:
//       return "bg-muted text-muted-foreground";
//   }
// }

// function getStatus(user: AdminUser) {
//   if (user.status) return user.status.toUpperCase();

//   if (user.emailVerified === undefined) return "UNKNOWN";

//   return user.emailVerified ? "VERIFIED" : "UNVERIFIED";
// }

// function getStatusStyle(status: string) {
//   if (status === "VERIFIED" || status === "ACTIVE") {
//     return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
//   }

//   if (
//     status === "UNVERIFIED" ||
//     status === "INACTIVE" ||
//     status === "SUSPENDED"
//   ) {
//     return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
//   }

//   return "bg-muted text-muted-foreground";
// }

// function formatDate(date?: string) {
//   if (!date) return "N/A";

//   const parsedDate = new Date(date);

//   if (Number.isNaN(parsedDate.getTime())) return "N/A";

//   return parsedDate.toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// }

// export default function AdminUsersPage() {
//   const { data, isLoading, isError, refetch, isFetching } = useGetAdminUsers();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [roleFilter, setRoleFilter] = useState("ALL");

//   const users: AdminUser[] = Array.isArray(data?.data) ? data.data : [];

//   const filteredUsers = users.filter((user) => {
//     const search = searchTerm.trim().toLowerCase();

//     const matchesSearch =
//       !search ||
//       (user.name || "").toLowerCase().includes(search) ||
//       (user.email || "").toLowerCase().includes(search) ||
//       (user.role || "").toLowerCase().includes(search);

//     const matchesRole =
//       roleFilter === "ALL" || user.role?.toUpperCase() === roleFilter;

//     return matchesSearch && matchesRole;
//   });

//   const candidateCount = users.filter(
//     (user) => user.role?.toUpperCase() === "CANDIDATE",
//   ).length;

//   const companyCount = users.filter(
//     (user) => user.role?.toUpperCase() === "COMPANY",
//   ).length;

//   const verifiedCount = users.filter(
//     (user) => user.emailVerified === true,
//   ).length;

//   if (isLoading) {
//     return <LoadingSkeleton />;
//   }

//   if (isError) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center p-5">
//         <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
//           <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10">
//             <AlertCircle className="h-7 w-7 text-destructive" />
//           </div>

//           <h1 className="mt-5 text-xl font-bold">Unable to load users</h1>

//           <p className="mt-2 text-sm leading-6 text-muted-foreground">
//             Something went wrong while fetching user information. Please check
//             your connection and try again.
//           </p>

//           <button
//             type="button"
//             onClick={() => refetch()}
//             className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
//           >
//             <RefreshCw className="h-4 w-4" />
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const summaryCards = [
//     {
//       title: "Total Users",
//       count: users.length,
//       subtitle: "All registered accounts",
//       icon: UsersRound,
//       iconStyle: "bg-primary/10 text-primary",
//     },
//     {
//       title: "Candidates",
//       count: candidateCount,
//       subtitle: "Candidate accounts",
//       icon: UserRound,
//       iconStyle: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
//     },
//     {
//       title: "Companies",
//       count: companyCount,
//       subtitle: "Company accounts",
//       icon: Building2,
//       iconStyle: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
//     },
//     {
//       title: "Verified Emails",
//       count: verifiedCount,
//       subtitle: "Email verified accounts",
//       icon: ShieldCheck,
//       iconStyle: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
//     },
//   ];

//   return (
//     <main className="min-h-full space-y-6 p-4 sm:p-6 lg:space-y-8 lg:p-8">
//       {/* Page header */}
//       <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//         <div className="flex items-center gap-4">
//           <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
//             <Users className="h-7 w-7" />
//           </div>

//           <div>
//             <div className="flex flex-wrap items-center gap-2">
//               <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
//                 All Users
//               </h1>
//               <span className="rounded-full border border-border bg-card px-2.5 py-1 text-xs font-semibold text-muted-foreground">
//                 {users.length} total
//               </span>
//             </div>

//             <p className="mt-1 text-sm text-muted-foreground sm:text-base">
//               Manage and monitor registered platform users.
//             </p>
//           </div>
//         </div>

//         <button
//           type="button"
//           onClick={() => refetch()}
//           disabled={isFetching}
//           className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold shadow-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
//         >
//           <RefreshCw
//             className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
//           />
//           {isFetching ? "Refreshing..." : "Refresh Users"}
//         </button>
//       </section>

//       {/* Summary cards */}
//       <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         {summaryCards.map((card) => {
//           const Icon = card.icon;

//           return (
//             <div
//               key={card.title}
//               className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md sm:p-6"
//             >
//               <div className="flex items-start justify-between gap-3">
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">
//                     {card.title}
//                   </p>
//                   <p className="mt-3 text-3xl font-bold tracking-tight tabular-nums">
//                     {card.count.toLocaleString()}
//                   </p>
//                 </div>

//                 <div
//                   className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-105 ${card.iconStyle}`}
//                 >
//                   <Icon className="h-6 w-6" />
//                 </div>
//               </div>

//               <p className="mt-4 text-xs text-muted-foreground">
//                 {card.subtitle}
//               </p>
//             </div>
//           );
//         })}
//       </section>

//       {/* Users panel */}
//       <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
//         <div className="flex flex-col gap-4 border-b border-border p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
//           <div>
//             <h2 className="text-lg font-bold tracking-tight">
//               Registered Users
//             </h2>
//             <p className="mt-1 text-sm text-muted-foreground">
//               Search and view user account information.
//             </p>
//           </div>

//           <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
//             <div className="relative w-full sm:min-w-64 lg:w-72">
//               <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//               <input
//                 type="search"
//                 value={searchTerm}
//                 onChange={(event) => setSearchTerm(event.target.value)}
//                 placeholder="Search name, email, role..."
//                 aria-label="Search users"
//                 className="h-11 w-full rounded-xl border border-border bg-background pr-3 pl-10 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
//               />
//             </div>

//             <select
//               value={roleFilter}
//               onChange={(event) => setRoleFilter(event.target.value)}
//               aria-label="Filter users by role"
//               className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 sm:w-40"
//             >
//               <option value="ALL">All Roles</option>
//               <option value="CANDIDATE">Candidates</option>
//               <option value="COMPANY">Companies</option>
//               <option value="ADMIN">Admins</option>
//             </select>
//           </div>
//         </div>

//         <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/20 px-5 py-3 sm:px-6">
//           <p className="text-sm text-muted-foreground">
//             Showing{" "}
//             <span className="font-semibold text-foreground">
//               {filteredUsers.length}
//             </span>{" "}
//             of{" "}
//             <span className="font-semibold text-foreground">
//               {users.length}
//             </span>{" "}
//             users
//           </p>

//           {(searchTerm || roleFilter !== "ALL") && (
//             <button
//               type="button"
//               onClick={() => {
//                 setSearchTerm("");
//                 setRoleFilter("ALL");
//               }}
//               className="text-xs font-semibold text-primary hover:underline"
//             >
//               Clear filters
//             </button>
//           )}
//         </div>

//         {filteredUsers.length === 0 ? (
//           <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
//             <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
//               <UserCircle className="h-8 w-8 text-muted-foreground" />
//             </div>

//             <h3 className="mt-4 font-semibold">
//               {users.length === 0 ? "No users yet" : "No matching users"}
//             </h3>

//             <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
//               {users.length === 0
//                 ? "Registered users will appear here when accounts are available."
//                 : "Try a different search term or change the role filter."}
//             </p>
//           </div>
//         ) : (
//           <>
//             {/* Desktop and tablet table */}
//             <div className="hidden overflow-x-auto md:block">
//               <table className="w-full min-w-[1000px] text-left text-sm">
//                 <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
//                   <tr>
//                     <th className="px-5 py-4 font-semibold">#</th>
//                     <th className="px-5 py-4 font-semibold">Profile</th>
//                     <th className="px-5 py-4 font-semibold">Name</th>
//                     <th className="px-5 py-4 font-semibold">Email</th>
//                     <th className="px-5 py-4 font-semibold">Role</th>
//                     <th className="px-5 py-4 font-semibold">Email Status</th>
//                     <th className="px-5 py-4 font-semibold">Joined Date</th>
//                   </tr>
//                 </thead>

//                 <tbody className="divide-y divide-border">
//                   {filteredUsers.map((user, index) => {
//                     const role = user.role?.toUpperCase() || "UNKNOWN";
//                     const status = getStatus(user);

//                     return (
//                       <tr
//                         key={user.id}
//                         className="transition-colors hover:bg-muted/30"
//                       >
//                         <td className="px-5 py-4 text-muted-foreground">
//                           {index + 1}
//                         </td>

//                         {/* Profile Image */}
//                         <td className="px-5 py-4">
//                           <UserAvatar user={user} />
//                         </td>

//                         {/* Name */}
//                         <td className="px-5 py-4">
//                           <p className="max-w-48 truncate font-semibold">
//                             {user.name || "Unnamed User"}
//                           </p>
//                         </td>

//                         {/* Email */}
//                         <td className="px-5 py-4">
//                           <div className="flex min-w-48 items-center gap-2">
//                             <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
//                             <span className="max-w-64 truncate text-muted-foreground">
//                               {user.email || "No email"}
//                             </span>
//                           </div>
//                         </td>

//                         {/* Role */}
//                         <td className="px-5 py-4">
//                           <span
//                             className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getRoleStyle(role)}`}
//                           >
//                             {role}
//                           </span>
//                         </td>

//                         {/* Email Status */}
//                         <td className="px-5 py-4">
//                           <span
//                             className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(status)}`}
//                           >
//                             <span className="h-1.5 w-1.5 rounded-full bg-current" />
//                             {status}
//                           </span>
//                         </td>

//                         {/* Joined Date */}
//                         <td className="px-5 py-4 text-muted-foreground">
//                           <span className="inline-flex items-center gap-2 whitespace-nowrap">
//                             <CalendarDays className="h-4 w-4" />
//                             {formatDate(user.createdAt)}
//                           </span>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>

//             {/* Mobile cards */}
//             <div className="space-y-3 p-4 md:hidden">
//               {filteredUsers.map((user, index) => {
//                 const role = user.role?.toUpperCase() || "UNKNOWN";
//                 const status = getStatus(user);

//                 return (
//                   <article
//                     key={user.id}
//                     className="rounded-xl border border-border bg-background p-4 transition-colors hover:bg-muted/20"
//                   >
//                     <div className="flex items-start gap-3">
//                       <UserAvatar user={user} />

//                       <div className="min-w-0 flex-1">
//                         <div className="flex flex-wrap items-center gap-2">
//                           <h3 className="break-words text-sm font-semibold">
//                             {user.name || "Unnamed User"}
//                           </h3>
//                           <span className="text-xs text-muted-foreground">
//                             #{index + 1}
//                           </span>
//                         </div>

//                         <p className="mt-1 flex min-w-0 items-center gap-1.5 break-all text-xs leading-5 text-muted-foreground">
//                           <Mail className="h-3.5 w-3.5 shrink-0" />
//                           {user.email || "No email"}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-3">
//                       <span
//                         className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getRoleStyle(role)}`}
//                       >
//                         {role}
//                       </span>

//                       <span
//                         className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(status)}`}
//                       >
//                         <span className="h-1.5 w-1.5 rounded-full bg-current" />
//                         {status}
//                       </span>

//                       <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground">
//                         <CalendarDays className="h-3.5 w-3.5" />
//                         {formatDate(user.createdAt)}
//                       </span>
//                     </div>
//                   </article>
//                 );
//               })}
//             </div>
//           </>
//         )}

//         <div className="border-t border-border bg-muted/20 px-5 py-4 sm:px-6">
//           <p className="text-center text-xs text-muted-foreground sm:text-left">
//             Displaying {filteredUsers.length} user
//             {filteredUsers.length === 1 ? "" : "s"} · Admin User Management
//           </p>
//         </div>
//       </section>
//     </main>
//   );
// }
"use client";

import { useState } from "react";
import { useGetAdminUsers, useUpdateUserRole } from "@/hooks";
import Image from "next/image";
import {
  Users,
  UserRound,
  Building2,
  ShieldCheck,
  RefreshCw,
  Search,
  Mail,
  CalendarDays,
  UserCircle,
  AlertCircle,
  UsersRound,
  CheckCircle2,
  XCircle,
} from "lucide-react";

type UserRole = "ADMIN" | "COMPANY" | "CANDIDATE";

type AdminUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: string | null;
  status?: string | null;
  profilePhoto?: string | null;
  emailVerified?: boolean;
  createdAt?: string;
};

function UserAvatar({ user }: { user: AdminUser }) {
  const [imageFailed, setImageFailed] = useState(false);

  const initials = (user.name || user.email || "U")
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-primary/10 text-sm font-bold text-primary ring-2 ring-background">
      {user.profilePhoto && !imageFailed ? (
        <Image
          src={user.profilePhoto}
          alt={user.name || "User profile"}
          width={44}
          height={44}
          unoptimized
          onError={() => setImageFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        initials
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-7 p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 animate-pulse rounded-2xl bg-muted" />
        <div className="flex-1 space-y-3">
          <div className="h-6 w-40 animate-pulse rounded-lg bg-muted" />
          <div className="h-4 w-60 max-w-full animate-pulse rounded-lg bg-muted" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
              <div className="h-11 w-11 animate-pulse rounded-xl bg-muted" />
            </div>
            <div className="mt-5 h-9 w-20 animate-pulse rounded-lg bg-muted" />
            <div className="mt-3 h-3 w-32 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="border-b border-border p-5">
          <div className="h-5 w-40 animate-pulse rounded bg-muted" />
          <div className="mt-3 h-4 w-56 animate-pulse rounded bg-muted" />
        </div>

        <div className="space-y-5 p-5">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center gap-4">
              <div className="h-11 w-11 animate-pulse rounded-full bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-36 max-w-full animate-pulse rounded bg-muted" />
                <div className="h-3 w-48 max-w-full animate-pulse rounded bg-muted" />
              </div>
              <div className="hidden h-7 w-20 animate-pulse rounded-full bg-muted sm:block" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 py-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
          <RefreshCw className="h-6 w-6 animate-spin text-primary" />
        </div>
        <p className="text-sm font-semibold">Loading users</p>
        <p className="text-xs text-muted-foreground">
          Please wait while we fetch your data...
        </p>
      </div>
    </div>
  );
}

function getRoleStyle(role?: string | null) {
  switch (role?.toUpperCase()) {
    case "ADMIN":
      return "bg-violet-500/10 text-violet-600 dark:text-violet-400";
    case "COMPANY":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
    case "CANDIDATE":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function getStatus(user: AdminUser) {
  if (user.status) return user.status.toUpperCase();

  if (user.emailVerified === undefined) return "UNKNOWN";

  return user.emailVerified ? "VERIFIED" : "UNVERIFIED";
}

function getStatusStyle(status: string) {
  if (status === "VERIFIED" || status === "ACTIVE") {
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  }

  if (
    status === "UNVERIFIED" ||
    status === "INACTIVE" ||
    status === "SUSPENDED"
  ) {
    return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
  }

  return "bg-muted text-muted-foreground";
}

function formatDate(date?: string) {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "N/A";

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function RoleSelect({
  user,
  isUpdating,
  onRoleChange,
}: {
  user: AdminUser;
  isUpdating: boolean;
  onRoleChange: (userId: string, role: UserRole) => void;
}) {
  const currentRole = user.role?.toUpperCase();

  const validRole: UserRole =
    currentRole === "ADMIN" ||
    currentRole === "COMPANY" ||
    currentRole === "CANDIDATE"
      ? currentRole
      : "CANDIDATE";

  return (
    <div className="flex flex-col items-start gap-1.5">
      <select
        value={validRole}
        disabled={isUpdating}
        onChange={(event) =>
          onRoleChange(user.id, event.target.value as UserRole)
        }
        aria-label={`Update role for ${user.name || user.email || "user"}`}
        className={`rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-50 ${getRoleStyle(validRole)}`}
      >
        <option value="CANDIDATE">CANDIDATE</option>
        <option value="COMPANY">COMPANY</option>
        <option value="ADMIN">ADMIN</option>
      </select>

      {isUpdating && (
        <span className="text-xs text-muted-foreground">Updating role...</span>
      )}
    </div>
  );
}

export default function AdminUsersPage() {
  const { data, isLoading, isError, refetch, isFetching } = useGetAdminUsers();

  const {
    mutate: updateUserRole,
    isPending: isUpdatingRole,
    variables: updatingVariables,
    isSuccess: roleUpdateSuccess,
    isError: roleUpdateError,
    reset: resetRoleUpdate,
  } = useUpdateUserRole();

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const users: AdminUser[] = Array.isArray(data?.data) ? data.data : [];

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    resetRoleUpdate();

    updateUserRole({
      userId,
      role: newRole,
    });
  };

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.trim().toLowerCase();

    const matchesSearch =
      !search ||
      (user.name || "").toLowerCase().includes(search) ||
      (user.email || "").toLowerCase().includes(search) ||
      (user.role || "").toLowerCase().includes(search);

    const matchesRole =
      roleFilter === "ALL" || user.role?.toUpperCase() === roleFilter;

    return matchesSearch && matchesRole;
  });

  const candidateCount = users.filter(
    (user) => user.role?.toUpperCase() === "CANDIDATE",
  ).length;

  const companyCount = users.filter(
    (user) => user.role?.toUpperCase() === "COMPANY",
  ).length;

  const verifiedCount = users.filter(
    (user) => user.emailVerified === true,
  ).length;

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-5">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10">
            <AlertCircle className="h-7 w-7 text-destructive" />
          </div>

          <h1 className="mt-5 text-xl font-bold">Unable to load users</h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Something went wrong while fetching user information. Please check
            your connection and try again.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const summaryCards = [
    {
      title: "Total Users",
      count: users.length,
      subtitle: "All registered accounts",
      icon: UsersRound,
      iconStyle: "bg-primary/10 text-primary",
    },
    {
      title: "Candidates",
      count: candidateCount,
      subtitle: "Candidate accounts",
      icon: UserRound,
      iconStyle: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Companies",
      count: companyCount,
      subtitle: "Company accounts",
      icon: Building2,
      iconStyle: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      title: "Verified Emails",
      count: verifiedCount,
      subtitle: "Email verified accounts",
      icon: ShieldCheck,
      iconStyle: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    },
  ];

  return (
    <main className="min-h-full space-y-6 p-4 sm:p-6 lg:space-y-8 lg:p-8">
      {/* Page header */}
      <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Users className="h-7 w-7" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                All Users
              </h1>
              <span className="rounded-full border border-border bg-card px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                {users.length} total
              </span>
            </div>

            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
              Manage and monitor registered platform users.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold shadow-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
          {isFetching ? "Refreshing..." : "Refresh Users"}
        </button>
      </section>

      {/* Role update feedback */}
      {roleUpdateSuccess && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          User role updated successfully.
          <button
            type="button"
            onClick={resetRoleUpdate}
            className="ml-auto text-xs font-semibold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {roleUpdateError && (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <XCircle className="h-5 w-5 shrink-0" />
          Failed to update user role. Please try again.
          <button
            type="button"
            onClick={resetRoleUpdate}
            className="ml-auto text-xs font-semibold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </p>
                  <p className="mt-3 text-3xl font-bold tracking-tight tabular-nums">
                    {card.count.toLocaleString()}
                  </p>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-105 ${card.iconStyle}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                {card.subtitle}
              </p>
            </div>
          );
        })}
      </section>

      {/* Users panel */}
      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex flex-col gap-4 border-b border-border p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-bold tracking-tight">
              Registered Users
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Search, view user information, and update user roles.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <div className="relative w-full sm:min-w-64 lg:w-72">
              <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search name, email, role..."
                aria-label="Search users"
                className="h-11 w-full rounded-xl border border-border bg-background pr-3 pl-10 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
              aria-label="Filter users by role"
              className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 sm:w-40"
            >
              <option value="ALL">All Roles</option>
              <option value="CANDIDATE">Candidates</option>
              <option value="COMPANY">Companies</option>
              <option value="ADMIN">Admins</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/20 px-5 py-3 sm:px-6">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredUsers.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">
              {users.length}
            </span>{" "}
            users
          </p>

          {(searchTerm || roleFilter !== "ALL") && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setRoleFilter("ALL");
              }}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
              <UserCircle className="h-8 w-8 text-muted-foreground" />
            </div>

            <h3 className="mt-4 font-semibold">
              {users.length === 0 ? "No users yet" : "No matching users"}
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              {users.length === 0
                ? "Registered users will appear here when accounts are available."
                : "Try a different search term or change the role filter."}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop and tablet table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[1000px] text-left text-sm">
                <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-5 py-4 font-semibold">#</th>
                    <th className="px-5 py-4 font-semibold">Profile</th>
                    <th className="px-5 py-4 font-semibold">Name</th>
                    <th className="px-5 py-4 font-semibold">Email</th>
                    <th className="px-5 py-4 font-semibold">Role</th>
                    <th className="px-5 py-4 font-semibold">Email Status</th>
                    <th className="px-5 py-4 font-semibold">Joined Date</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {filteredUsers.map((user, index) => {
                    const role = user.role?.toUpperCase() || "UNKNOWN";
                    const status = getStatus(user);
                    const isThisUserUpdating =
                      isUpdatingRole && updatingVariables?.userId === user.id;

                    return (
                      <tr
                        key={user.id}
                        className="transition-colors hover:bg-muted/30"
                      >
                        <td className="px-5 py-4 text-muted-foreground">
                          {index + 1}
                        </td>

                        <td className="px-5 py-4">
                          <UserAvatar user={user} />
                        </td>

                        <td className="px-5 py-4">
                          <p className="max-w-48 truncate font-semibold">
                            {user.name || "Unnamed User"}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex min-w-48 items-center gap-2">
                            <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <span className="max-w-64 truncate text-muted-foreground">
                              {user.email || "No email"}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <RoleSelect
                            user={user}
                            isUpdating={isThisUserUpdating}
                            onRoleChange={handleRoleChange}
                          />
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(status)}`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {status}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-muted-foreground">
                          <span className="inline-flex items-center gap-2 whitespace-nowrap">
                            <CalendarDays className="h-4 w-4" />
                            {formatDate(user.createdAt)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="space-y-3 p-4 md:hidden">
              {filteredUsers.map((user, index) => {
                const role = user.role?.toUpperCase() || "UNKNOWN";
                const status = getStatus(user);
                const isThisUserUpdating =
                  isUpdatingRole && updatingVariables?.userId === user.id;

                return (
                  <article
                    key={user.id}
                    className="rounded-xl border border-border bg-background p-4 transition-colors hover:bg-muted/20"
                  >
                    <div className="flex items-start gap-3">
                      <UserAvatar user={user} />

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="break-words text-sm font-semibold">
                            {user.name || "Unnamed User"}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            #{index + 1}
                          </span>
                        </div>

                        <p className="mt-1 flex min-w-0 items-center gap-1.5 break-all text-xs leading-5 text-muted-foreground">
                          <Mail className="h-3.5 w-3.5 shrink-0" />
                          {user.email || "No email"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-3">
                      <RoleSelect
                        user={user}
                        isUpdating={isThisUserUpdating}
                        onRoleChange={handleRoleChange}
                      />

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(status)}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {status}
                      </span>

                      <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {formatDate(user.createdAt)}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}

        <div className="border-t border-border bg-muted/20 px-5 py-4 sm:px-6">
          <p className="text-center text-xs text-muted-foreground sm:text-left">
            Displaying {filteredUsers.length} user
            {filteredUsers.length === 1 ? "" : "s"} · Admin User Management
          </p>
        </div>
      </section>
    </main>
  );
}
