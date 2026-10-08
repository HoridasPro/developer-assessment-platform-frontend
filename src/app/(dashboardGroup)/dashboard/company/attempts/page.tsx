// "use client";

// import { useGetCompanyAttempts } from "@/hooks";
// import Link from "next/link";

// export default function CompanyAttemptsPage() {
//   const { data, isLoading, isError } = useGetCompanyAttempts();

//   if (isLoading) {
//     return <div className="p-6">Loading attempts...</div>;
//   }

//   if (isError) {
//     return <div className="p-6 text-red-500">Failed to load attempts.</div>;
//   }

//   const attempts = data?.data ?? [];

//   return (
//     <div className="space-y-6 p-6">
//       <div>
//         <h1 className="text-2xl font-bold">Company Attempts</h1>

//         <p className="text-sm text-muted-foreground">
//           Candidates who submitted their assessments
//         </p>
//       </div>

//       {attempts.length === 0 ? (
//         <div className="rounded-lg border p-6 text-center">
//           No submitted attempts found.
//         </div>
//       ) : (
//         <div className="overflow-x-auto rounded-lg border">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b bg-muted/50">
//                 <th className="px-4 py-3 text-left">Candidate</th>

//                 <th className="px-4 py-3 text-left">Assessment</th>

//                 <th className="px-4 py-3 text-left">Status</th>

//                 <th className="px-4 py-3 text-left">Score</th>

//                 <th className="px-4 py-3 text-left">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {attempts.map((attempt) => (
//                 <tr key={attempt.id} className="border-b last:border-0">
//                   <td className="px-4 py-4">
//                     <p className="font-medium">{attempt.candidate.name}</p>

//                     <p className="text-sm text-muted-foreground">
//                       {attempt.candidate.email}
//                     </p>
//                   </td>

//                   <td className="px-4 py-4">{attempt.assessment.title}</td>

//                   <td className="px-4 py-4">
//                     <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
//                       <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
//                       {attempt.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-4">{attempt.score ?? "Pending"}</td>

//                   <td className="px-4 py-4">
//                     <Link
//                       href={`/dashboard/company/attempts/${attempt.id}/evaluate`}
//                       className="rounded-md bg-black px-4 py-2 text-sm text-white"
//                     >
//                       Evaluate
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useGetCompanyAttempts } from "@/hooks";
import Link from "next/link";
import { ClipboardCheck, Loader2 } from "lucide-react";

export default function CompanyAttemptsPage() {
  const { data, isLoading, isError } = useGetCompanyAttempts();

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center p-4 sm:p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading attempts...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
          Failed to load attempts.
        </div>
      </div>
    );
  }

  const attempts = data?.data ?? [];

  return (
    <div className="w-full space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
          Company Attempts
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Candidates who submitted their assessments
        </p>
      </div>

      {/* Empty State */}
      {attempts.length === 0 ? (
        <div className="rounded-xl border bg-card p-6 text-center shadow-sm sm:p-8">
          <ClipboardCheck className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />

          <h2 className="font-semibold">No submitted attempts found</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Submitted candidate attempts will appear here.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop / Tablet Table */}
          <div className="hidden overflow-hidden rounded-xl border bg-card shadow-sm md:block">
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Candidate
                    </th>

                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Assessment
                    </th>

                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Status
                    </th>

                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Score
                    </th>

                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {attempts.map((attempt) => (
                    <tr
                      key={attempt.id}
                      className="border-b transition-colors last:border-0 hover:bg-muted/30"
                    >
                      {/* Candidate */}
                      <td className="px-4 py-4">
                        <p className="font-medium">{attempt.candidate.name}</p>

                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {attempt.candidate.email}
                        </p>
                      </td>

                      {/* Assessment */}
                      <td className="px-4 py-4">
                        <span className="font-medium">
                          {attempt.assessment.title}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                          {attempt.status}
                        </span>
                      </td>

                      {/* Score */}
                      <td className="px-4 py-4">
                        {attempt.score !== null &&
                        attempt.score !== undefined ? (
                          <span className="font-semibold">{attempt.score}</span>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Pending
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="px-4 py-4">
                        <Link
                          href={`/dashboard/company/attempts/${attempt.id}/evaluate`}
                          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          <ClipboardCheck className="h-4 w-4" />
                          Evaluate
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="grid gap-4 md:hidden">
            {attempts.map((attempt) => (
              <div
                key={attempt.id}
                className="rounded-xl border bg-card p-4 shadow-sm"
              >
                {/* Candidate */}
                <div className="mb-4">
                  <p className="text-base font-semibold">
                    {attempt.candidate.name}
                  </p>

                  <p className="mt-1 break-all text-sm text-muted-foreground">
                    {attempt.candidate.email}
                  </p>
                </div>

                {/* Assessment */}
                <div className="mb-4">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Assessment
                  </p>

                  <p className="font-medium">{attempt.assessment.title}</p>
                </div>

                {/* Status + Score */}
                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Status
                    </p>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      {attempt.status}
                    </span>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Score
                    </p>

                    {attempt.score !== null && attempt.score !== undefined ? (
                      <p className="font-semibold">{attempt.score}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">Pending</p>
                    )}
                  </div>
                </div>

                {/* Action */}
                <Link
                  href={`/dashboard/company/attempts/${attempt.id}/evaluate`}
                  className="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-xs font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <ClipboardCheck className="h-4 w-4" />
                  Evaluatedfdsf
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
