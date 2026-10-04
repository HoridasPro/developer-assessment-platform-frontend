// "use client";

// import { useGetAssessmentById } from "@/hooks";
// import Link from "next/link";
// import { useParams } from "next/navigation";

// export default function AssessmentDetailsPage() {
//   const params = useParams();

//   const assessmentId = params.assessmentId as string;

//   const {
//     data,
//     isLoading,
//     isError,
//     error,
//   } = useGetAssessmentById(assessmentId);

//   if (isLoading) {
//     return (
//       <div className="p-6">
//         <p className="text-sm text-muted-foreground">
//           Loading assessment...
//         </p>
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
//           <h1 className="text-3xl font-bold">
//             {assessment.title}
//           </h1>

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
//           <p className="text-sm text-muted-foreground">
//             Duration
//           </p>

//           <p className="mt-2 text-xl font-semibold">
//             {assessment.duration} min
//           </p>
//         </div>

//         <div className="rounded-xl border p-5">
//           <p className="text-sm text-muted-foreground">
//             Passing Score
//           </p>

//           <p className="mt-2 text-xl font-semibold">
//             {assessment.passingScore}%
//           </p>
//         </div>

//         <div className="rounded-xl border p-5">
//           <p className="text-sm text-muted-foreground">
//             Max Attempts
//           </p>

//           <p className="mt-2 text-xl font-semibold">
//             {assessment.maxAttempts}
//           </p>
//         </div>

//         <div className="rounded-xl border p-5">
//           <p className="text-sm text-muted-foreground">
//             Price
//           </p>

//           <p className="mt-2 text-xl font-semibold">
//             ${assessment.price}
//           </p>
//         </div>
//       </div>

//       {/* Dates */}
//       <div className="rounded-xl border p-6">
//         <h2 className="text-lg font-semibold">
//           Assessment Schedule
//         </h2>

//         <div className="mt-4 grid gap-4 md:grid-cols-2">
//           <div>
//             <p className="text-sm text-muted-foreground">
//               Start Date
//             </p>

//             <p className="mt-1 font-medium">
//               {new Date(
//                 assessment.startAt,
//               ).toLocaleString()}
//             </p>
//           </div>

//           <div>
//             <p className="text-sm text-muted-foreground">
//               End Date
//             </p>

//             <p className="mt-1 font-medium">
//               {new Date(
//                 assessment.endAt,
//               ).toLocaleString()}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Questions */}
//       <div className="rounded-xl border p-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-lg font-semibold">
//               Questions
//             </h2>

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
//                 <div
//                   key={question.id}
//                   className="rounded-lg border p-4"
//                 >
//                   <div className="flex gap-3">
//                     <span className="font-semibold">
//                       {index + 1}.
//                     </span>

//                     <div>
//                       <p className="font-medium">
//                         {question.question ??
//                           question.title ??
//                           "Question"}
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
//         <div className="flex flex-wrap justify-end gap-3">
//           <Link
//             href={`/dashboard/company/assessments/${assessmentId}/edit`}
//             className="rounded-lg border px-5 py-2.5 text-sm font-medium"
//           >
//             Edit Assessment
//           </Link>

//           <Link
//             href={`/dashboard/company/assessments/${assessmentId}/payment`}
//             className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
//           >
//             Pay & Publish
//           </Link>
//         </div>
//       )}

//       {assessment.status === "PUBLISHED" && (
//         <div className="flex justify-end">
//           <div className="rounded-lg bg-green-50 px-5 py-3 text-sm font-medium text-green-700">
//             This assessment is already published.
//           </div>
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
      <div className="p-6">
        <p className="text-sm text-muted-foreground">Loading assessment...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">
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
      <div className="p-6">
        <p>Assessment not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">{assessment.title}</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            {assessment.description}
          </p>
        </div>

        <span
          className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${
            assessment.status === "PUBLISHED"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {assessment.status}
        </span>
      </div>

      {/* Information */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-5">
          <p className="text-sm text-muted-foreground">Duration</p>

          <p className="mt-2 text-xl font-semibold">
            {assessment.duration} min
          </p>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-muted-foreground">Passing Score</p>

          <p className="mt-2 text-xl font-semibold">
            {assessment.passingScore}%
          </p>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-muted-foreground">Max Attempts</p>

          <p className="mt-2 text-xl font-semibold">{assessment.maxAttempts}</p>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-muted-foreground">Price</p>

          <p className="mt-2 text-xl font-semibold">${assessment.price}</p>
        </div>
      </div>

      {/* Dates */}
      <div className="rounded-xl border p-6">
        <h2 className="text-lg font-semibold">Assessment Schedule</h2>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Start Date</p>

            <p className="mt-1 font-medium">
              {new Date(assessment.startAt).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">End Date</p>

            <p className="mt-1 font-medium">
              {new Date(assessment.endAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="rounded-xl border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Questions</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {assessment.questions?.length ?? 0} questions
            </p>
          </div>

          <Link
            href={`/dashboard/company/assessments/${assessmentId}/questions`}
            className="rounded-lg border px-4 py-2 text-sm font-medium"
          >
            Manage Questions
          </Link>
        </div>

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
                <div key={question.id} className="rounded-lg border p-4">
                  <div className="flex gap-3">
                    <span className="font-semibold">{index + 1}.</span>

                    <div>
                      <p className="font-medium">
                        {question.question ?? question.title ?? "Question"}
                      </p>

                      {question.type && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {question.type}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ),
            )
          ) : (
            <p className="text-sm text-muted-foreground">
              No questions added yet.
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      {assessment.status === "DRAFT" && (
        <div className="flex justify-end">
          <Link
            href={`/dashboard/company/assessments/${assessmentId}/payment`}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Payment
          </Link>
        </div>
      )}
    </div>
  );
}
