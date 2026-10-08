// "use client";

// import { useGetAssessmentById } from "@/hooks";
// import Link from "next/link";
// import { useParams } from "next/navigation";

// export default function AssessmentDetailsPage() {
//   const params = useParams();

//   const assessmentId = params.assessmentId as string;

//   const { data, isLoading, isError, error } =
//     useGetAssessmentById(assessmentId);

//   if (isLoading) {
//     return (
//       <div className="p-6">
//         <p className="text-sm text-muted-foreground">Loading assessment...</p>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="p-6">
//         <div className="rounded-lg border border-red-200 bg-red-50 p-4">
//           <p className="text-sm text-red-600">
//             {error instanceof Error
//               ? error.message
//               : "Failed to load assessment"}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const assessment = data?.data;

//   if (!assessment) {
//     return (
//       <div className="p-6">
//         <p>Assessment not found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-6xl space-y-6 p-6">
//       {/* Header */}
//       <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
//         <div>
//           <h1 className="text-3xl font-bold">{assessment.title}</h1>

//           <p className="mt-2 text-sm text-muted-foreground">
//             {assessment.description}
//           </p>
//         </div>

//         <span
//           className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${
//             assessment.status === "PUBLISHED"
//               ? "bg-green-100 text-green-700"
//               : "bg-yellow-100 text-yellow-700"
//           }`}
//         >
//           {assessment.status}
//         </span>
//       </div>

//       {/* Information */}
//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         <div className="rounded-xl border p-5">
//           <p className="text-sm text-muted-foreground">Duration</p>

//           <p className="mt-2 text-xl font-semibold">
//             {assessment.duration} min
//           </p>
//         </div>

//         <div className="rounded-xl border p-5">
//           <p className="text-sm text-muted-foreground">Passing Score</p>

//           <p className="mt-2 text-xl font-semibold">
//             {assessment.passingScore}%
//           </p>
//         </div>

//         <div className="rounded-xl border p-5">
//           <p className="text-sm text-muted-foreground">Max Attempts</p>

//           <p className="mt-2 text-xl font-semibold">{assessment.maxAttempts}</p>
//         </div>

//         <div className="rounded-xl border p-5">
//           <p className="text-sm text-muted-foreground">Price</p>

//           <p className="mt-2 text-xl font-semibold">${assessment.price}</p>
//         </div>
//       </div>

//       {/* Dates */}
//       <div className="rounded-xl border p-6">
//         <h2 className="text-lg font-semibold">Assessment Schedule</h2>

//         <div className="mt-4 grid gap-4 md:grid-cols-2">
//           <div>
//             <p className="text-sm text-muted-foreground">Start Date</p>

//             <p className="mt-1 font-medium">
//               {new Date(assessment.startAt).toLocaleString()}
//             </p>
//           </div>

//           <div>
//             <p className="text-sm text-muted-foreground">End Date</p>

//             <p className="mt-1 font-medium">
//               {new Date(assessment.endAt).toLocaleString()}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Questions */}
//       <div className="rounded-xl border p-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-lg font-semibold">Questions</h2>

//             <p className="mt-1 text-sm text-muted-foreground">
//               {assessment.questions?.length ?? 0} questions
//             </p>
//           </div>

//           <Link
//             href={`/dashboard/company/assessments/${assessmentId}/questions`}
//             className="rounded-lg border px-4 py-2 text-sm font-medium"
//           >
//             Manage Questions
//           </Link>
//         </div>

//         <div className="mt-5 space-y-3">
//           {assessment.questions?.length > 0 ? (
//             assessment.questions.map(
//               (
//                 question: {
//                   id: string;
//                   question?: string;
//                   title?: string;
//                   type?: string;
//                 },
//                 index: number,
//               ) => (
//                 <div key={question.id} className="rounded-lg border p-4">
//                   <div className="flex gap-3">
//                     <span className="font-semibold">{index + 1}.</span>

//                     <div>
//                       <p className="font-medium">
//                         {question.question ?? question.title ?? "Question"}
//                       </p>

//                       {question.type && (
//                         <p className="mt-1 text-xs text-muted-foreground">
//                           {question.type}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ),
//             )
//           ) : (
//             <p className="text-sm text-muted-foreground">
//               No questions added yet.
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Actions */}
//       {assessment.status === "DRAFT" && (
//         <div className="flex justify-end">
//           <Link
//             href={`/dashboard/company/assessments/${assessmentId}/payment`}
//             className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
//           >
//             Payment & Publish
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useGetAssessmentById } from "@/hooks";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AssessmentDetailsPage() {
  const params = useParams();

  const assessmentId = params.assessmentId as string;

  const { data, isLoading, isError, error } =
    useGetAssessmentById(assessmentId);

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center p-4 sm:p-6">
        <div className="flex items-center gap-3 rounded-xl border bg-card px-5 py-4 shadow-sm">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />

          <p className="text-sm font-medium text-muted-foreground">
            Loading assessment...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 sm:p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm dark:border-red-900 dark:bg-red-950/30">
          <p className="text-sm font-medium text-red-600 dark:text-red-400">
            {error instanceof Error
              ? error.message
              : "Failed to load assessment"}
          </p>
        </div>
      </div>
    );
  }

  const assessment = data?.data;

  if (!assessment) {
    return (
      <div className="p-4 sm:p-6">
        <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-dashed bg-card">
          <p className="text-sm text-muted-foreground">Assessment not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-w-0 max-w-6xl space-y-6 p-4 sm:p-6">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}
      <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          {/* Title */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <div className="min-w-0">
                <h1 className="break-words text-2xl font-bold tracking-tight sm:text-3xl">
                  {assessment.title}
                </h1>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                  {assessment.description}
                </p>
              </div>
            </div>
          </div>

          {/* Status */}
          <span
            className={`w-fit shrink-0 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${
              assessment.status === "PUBLISHED"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                : "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
            }`}
          >
            {assessment.status}
          </span>
        </div>
      </div>

      {/* ================================================= */}
      {/* INFORMATION */}
      {/* ================================================= */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Duration */}
        <div className="rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Duration
              </p>

              <p className="mt-2 text-2xl font-bold">
                {assessment.duration}
                <span className="ml-1 text-sm font-medium text-muted-foreground">
                  min
                </span>
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/40">
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                T
              </span>
            </div>
          </div>
        </div>

        {/* Passing Score */}
        <div className="rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Passing Score
              </p>

              <p className="mt-2 text-2xl font-bold">
                {assessment.passingScore}
                <span className="ml-1 text-sm font-medium text-muted-foreground">
                  %
                </span>
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/40">
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                %
              </span>
            </div>
          </div>
        </div>

        {/* Max Attempts */}
        <div className="rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Max Attempts
              </p>

              <p className="mt-2 text-2xl font-bold">
                {assessment.maxAttempts}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-950/40">
              <span className="text-sm font-bold text-violet-600 dark:text-violet-400">
                A
              </span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Price</p>

              <p className="mt-2 text-2xl font-bold">${assessment.price}</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-950/40">
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                $
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* DATES */}
      {/* ================================================= */}
      <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Assessment Schedule</h2>

          <p className="text-sm text-muted-foreground">
            Assessment availability period.
          </p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {/* Start */}
          <div className="rounded-xl border bg-muted/20 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Start Date
            </p>

            <p className="mt-2 break-words text-sm font-semibold sm:text-base">
              {new Date(assessment.startAt).toLocaleString()}
            </p>
          </div>

          {/* End */}
          <div className="rounded-xl border bg-muted/20 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              End Date
            </p>

            <p className="mt-2 break-words text-sm font-semibold sm:text-base">
              {new Date(assessment.endAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* QUESTIONS */}
      {/* ================================================= */}
      <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
        {/* Questions Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Questions</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {assessment.questions?.length ?? 0} questions
            </p>
          </div>

          <Link
            href={`/dashboard/company/assessments/${assessmentId}/questions`}
            className="inline-flex min-h-10 w-full items-center justify-center rounded-lg border bg-background px-4 py-2.5 text-sm font-medium shadow-sm transition-all hover:bg-muted sm:w-auto"
          >
            Manage Questions
          </Link>
        </div>

        {/* Questions List */}
        <div className="mt-5 space-y-3">
          {assessment.questions?.length > 0 ? (
            assessment.questions.map(
              (
                question: {
                  id: string;
                  question?: string;
                  title?: string;
                  type?: string;
                },
                index: number,
              ) => (
                <div
                  key={question.id}
                  className="rounded-xl border bg-background p-4 transition-all hover:bg-muted/30 sm:p-5"
                >
                  <div className="flex items-start gap-3">
                    {/* Number */}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-xs font-bold text-violet-700 dark:bg-violet-950/40 dark:text-violet-400">
                      {index + 1}
                    </span>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <p className="break-words text-sm font-semibold leading-6">
                          {question.question ?? question.title ?? "Question"}
                        </p>

                        {question.type && (
                          <span className="w-fit shrink-0 rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                            {question.type}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )
          ) : (
            <div className="rounded-xl border border-dashed bg-muted/10 p-8 text-center">
              <p className="text-sm text-muted-foreground">
                No questions added yet.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ================================================= */}
      {/* ACTIONS */}
      {/* ================================================= */}
      {assessment.status === "DRAFT" && (
        <div className="flex flex-col gap-3 border-t pt-2 sm:flex-row sm:justify-end">
          <Link
            href={`/dashboard/company/assessments/${assessmentId}/payment`}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-auto"
          >
            Payment & Publish
          </Link>
        </div>
      )}
    </div>
  );
}
