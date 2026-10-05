// /** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import {
//   Plus,
//   CheckCircle2,
//   Eye,
//   UserPlus,
//   HelpCircle,
//   AlertTriangle,
// } from "lucide-react";
// import { useGetAssessmentQuestions } from "@/hooks";

// export default function AssessmentQuestionsPage() {
//   const params = useParams();
//   const assessmentId = params.assessmentId as string;

//   const { data, isLoading } = useGetAssessmentQuestions(assessmentId);

//   console.log("get data", data);

//   // Safe Array Extraction
//   const questionsList = Array.isArray(data)
//     ? data
//     : Array.isArray((data as any)?.data)
//       ? (data as any).data
//       : Array.isArray((data as any)?.questions)
//         ? (data as any).questions
//         : [];

//   if (isLoading) {
//     return (
//       <div className="flex h-64 items-center justify-center p-6">
//         <div className="flex items-center gap-2 text-sm text-muted-foreground">
//           <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
//           <span>Loading questions...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 p-4 sm:p-6">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold tracking-tight">
//             Assessment Questions
//           </h1>
//           <p className="text-sm text-muted-foreground">
//             Manage questions added to this assessment.
//           </p>
//         </div>

//         <div className="flex flex-wrap items-center gap-3">
//           {/* Add Questions */}
//           <Link
//             href={`/dashboard/company/assessments/${assessmentId}/questions/add`}
//             className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
//           >
//             <Plus className="h-4 w-4" />
//             Add Questions
//           </Link>

//           {/* Assign Candidate */}
//           <Link
//             href={`/dashboard/company/assessments/${assessmentId}/assignCandidate`}
//             className="inline-flex items-center justify-center gap-2 rounded-lg border bg-background px-4 py-2.5 text-sm font-medium shadow-xs transition-colors hover:bg-muted hover:text-accent-foreground"
//           >
//             <UserPlus className="h-4 w-4" />
//             Assign Candidate
//           </Link>
//         </div>
//       </div>

//       {/* Questions List Container */}
//       {questionsList.length === 0 ? (
//         <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center animate-in fade-in-50">
//           <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
//             <HelpCircle className="h-6 w-6 text-muted-foreground" />
//           </div>
//           <h2 className="mt-4 text-lg font-semibold">No questions added yet</h2>
//           <p className="mt-1 max-w-sm text-sm text-muted-foreground">
//             Add questions from your Problem Bank to evaluate your candidates.
//           </p>

//           <Link
//             href={`/dashboard/company/assessments/${assessmentId}/questions/add`}
//             className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs hover:bg-primary/90"
//           >
//             <Plus className="h-4 w-4" />
//             Add Question
//           </Link>
//         </div>
//       ) : (
//         /* Responsive Table Outer Wrapper */
//         <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-xs">
//           <div className="relative w-full overflow-x-auto">
//             <table className="w-full caption-bottom text-sm">
//               <thead className="border-b bg-muted/50 text-xs uppercase text-muted-foreground">
//                 <tr>
//                   <th className="h-11 px-4 text-center align-middle font-medium w-12">
//                     #
//                   </th>
//                   <th className="h-11 px-4 text-left align-middle font-medium min-w-[280px]">
//                     Question & Details
//                   </th>
//                   <th className="h-11 px-4 text-left align-middle font-medium whitespace-nowrap">
//                     Type
//                   </th>
//                   <th className="h-11 px-4 text-left align-middle font-medium whitespace-nowrap">
//                     Difficulty
//                   </th>
//                   <th className="h-11 px-4 text-left align-middle font-medium whitespace-nowrap">
//                     Marks
//                   </th>
//                   <th className="h-11 px-4 text-right align-middle font-medium whitespace-nowrap">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y">
//                 {questionsList.map((item: any, index: number) => {
//                   const question = item.question || item;
//                   const qId = item.id || question.id || question._id;

//                   const options =
//                     item.questionOptions ||
//                     item.options ||
//                     question.questionOptions ||
//                     question.options ||
//                     [];

//                   const isMCQ =
//                     String(question.type || "").toUpperCase() === "MCQ";

//                   return (
//                     <tr
//                       key={qId}
//                       className="transition-colors hover:bg-muted/40 data-[state=selected]:bg-muted"
//                     >
//                       {/* Order / Index */}
//                       <td className="p-4 align-top text-center font-semibold text-muted-foreground whitespace-nowrap">
//                         #{item.order ?? index + 1}
//                       </td>

//                       {/* Title, Description & MCQ Options */}
//                       <td className="p-4 align-top">
//                         <div className="space-y-1.5">
//                           <h3 className="text-sm font-semibold text-foreground leading-snug">
//                             {question.title}
//                           </h3>

//                           {question.description && (
//                             <p className="line-clamp-2 text-xs text-muted-foreground">
//                               {question.description}
//                             </p>
//                           )}

//                           {/* MCQ Options Display Inside Table */}
//                           {isMCQ && (
//                             <div className="mt-3 pt-2 border-t border-border/50">
//                               {options.length > 0 ? (
//                                 <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
//                                   {options.map((opt: any, optIdx: number) => (
//                                     <div
//                                       key={opt.id || optIdx}
//                                       className={`flex items-center justify-between rounded-md border px-2.5 py-1.5 text-xs ${
//                                         opt.isCorrect
//                                           ? "border-emerald-500/50 bg-emerald-500/10 font-medium text-emerald-700 dark:text-emerald-400"
//                                           : "bg-muted/30 text-foreground"
//                                       }`}
//                                     >
//                                       <div className="flex items-center gap-1.5 min-w-0 pr-1">
//                                         <span className="font-semibold opacity-70 shrink-0">
//                                           {String.fromCharCode(65 + optIdx)}.
//                                         </span>
//                                         <span className="truncate">
//                                           {opt.text || opt.optionText}
//                                         </span>
//                                       </div>

//                                       {opt.isCorrect && (
//                                         <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
//                                       )}
//                                     </div>
//                                   ))}
//                                 </div>
//                               ) : (
//                                 <p className="flex items-center gap-1 text-xs italic text-amber-600 dark:text-amber-500">
//                                   <AlertTriangle className="h-3 w-3 shrink-0" />
//                                   No options available for this MCQ.
//                                 </p>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       </td>

//                       {/* Question Type */}
//                       <td className="p-4 align-top whitespace-nowrap">
//                         {question.type ? (
//                           <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
//                             {question.type}
//                           </span>
//                         ) : (
//                           <span className="text-xs text-muted-foreground">
//                             —
//                           </span>
//                         )}
//                       </td>

//                       {/* Difficulty */}
//                       <td className="p-4 align-top whitespace-nowrap">
//                         {question.difficulty ? (
//                           <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium capitalize text-muted-foreground">
//                             {question.difficulty}
//                           </span>
//                         ) : (
//                           <span className="text-xs text-muted-foreground">
//                             —
//                           </span>
//                         )}
//                       </td>

//                       {/* Marks */}
//                       <td className="p-4 align-top whitespace-nowrap">
//                         <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
//                           {item.marks ?? question.marks ?? 0} marks
//                         </span>
//                       </td>

//                       {/* Action */}
//                       <td className="p-4 align-top text-right whitespace-nowrap">
//                         <Link
//                           href={`/dashboard/company/assessments/${assessmentId}/questions/${qId}`}
//                           className="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-xs font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
//                         >
//                           <Eye className="h-3.5 w-3.5" />
//                           <span>View Details</span>
//                         </Link>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Plus,
  CheckCircle2,
  Eye,
  UserPlus,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";
import { useGetAssessmentQuestions } from "@/hooks";

export default function AssessmentQuestionsPage() {
  const params = useParams();
  const assessmentId = params.assessmentId as string;

  const { data, isLoading } = useGetAssessmentQuestions(assessmentId);

  console.log("get data", data);

  // Safe Array Extraction
  const questionsList = Array.isArray(data)
    ? data
    : Array.isArray((data as any)?.data)
      ? (data as any).data
      : Array.isArray((data as any)?.questions)
        ? (data as any).questions
        : [];

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span>Loading questions...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Assessment Questions
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage questions added to this assessment.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Add Questions */}
          <Link
            href={`/dashboard/company/assessments/${assessmentId}/questions/add`}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Plus className="h-4 w-4" />
            Add Questions
          </Link>

          {/* Assign Candidate - Rendered conditionally only when questions exist */}
          {questionsList.length > 0 && (
            <Link
              href={`/dashboard/company/assessments/${assessmentId}/assignCandidate`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border bg-background px-4 py-2.5 text-sm font-medium shadow-xs transition-colors hover:bg-muted hover:text-accent-foreground"
            >
              <UserPlus className="h-4 w-4" />
              Assign Candidate
            </Link>
          )}
        </div>
      </div>

      {/* Questions List Container */}
      {questionsList.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <HelpCircle className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="mt-4 text-lg font-semibold">No questions added yet</h2>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Add questions from your Problem Bank to evaluate your candidates.
          </p>

          <Link
            href={`/dashboard/company/assessments/${assessmentId}/questions/add`}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Add Question
          </Link>
        </div>
      ) : (
        /* Responsive Table Outer Wrapper */
        <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-xs">
          <div className="relative w-full overflow-x-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="border-b bg-muted/50 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="h-11 px-4 text-center align-middle font-medium w-12">
                    #
                  </th>
                  <th className="h-11 px-4 text-left align-middle font-medium min-w-[280px]">
                    Question & Details
                  </th>
                  <th className="h-11 px-4 text-left align-middle font-medium whitespace-nowrap">
                    Type
                  </th>
                  <th className="h-11 px-4 text-left align-middle font-medium whitespace-nowrap">
                    Difficulty
                  </th>
                  <th className="h-11 px-4 text-left align-middle font-medium whitespace-nowrap">
                    Marks
                  </th>
                  <th className="h-11 px-4 text-right align-middle font-medium whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {questionsList.map((item: any, index: number) => {
                  const question = item.question || item;
                  const qId = item.id || question.id || question._id;

                  const options =
                    item.questionOptions ||
                    item.options ||
                    question.questionOptions ||
                    question.options ||
                    [];

                  const isMCQ =
                    String(question.type || "").toUpperCase() === "MCQ";

                  return (
                    <tr
                      key={qId}
                      className="transition-colors hover:bg-muted/40 data-[state=selected]:bg-muted"
                    >
                      {/* Order / Index */}
                      <td className="p-4 align-top text-center font-semibold text-muted-foreground whitespace-nowrap">
                        #{item.order ?? index + 1}
                      </td>

                      {/* Title, Description & MCQ Options */}
                      <td className="p-4 align-top">
                        <div className="space-y-1.5">
                          <h3 className="text-sm font-semibold text-foreground leading-snug">
                            {question.title}
                          </h3>

                          {question.description && (
                            <p className="line-clamp-2 text-xs text-muted-foreground">
                              {question.description}
                            </p>
                          )}

                          {/* MCQ Options Display Inside Table */}
                          {isMCQ && (
                            <div className="mt-3 pt-2 border-t border-border/50">
                              {options.length > 0 ? (
                                <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                                  {options.map((opt: any, optIdx: number) => (
                                    <div
                                      key={opt.id || optIdx}
                                      className={`flex items-center justify-between rounded-md border px-2.5 py-1.5 text-xs ${
                                        opt.isCorrect
                                          ? "border-emerald-500/50 bg-emerald-500/10 font-medium text-emerald-700 dark:text-emerald-400"
                                          : "bg-muted/30 text-foreground"
                                      }`}
                                    >
                                      <div className="flex items-center gap-1.5 min-w-0 pr-1">
                                        <span className="font-semibold opacity-70 shrink-0">
                                          {String.fromCharCode(65 + optIdx)}.
                                        </span>
                                        <span className="truncate">
                                          {opt.text || opt.optionText}
                                        </span>
                                      </div>

                                      {opt.isCorrect && (
                                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="flex items-center gap-1 text-xs italic text-amber-600 dark:text-amber-500">
                                  <AlertTriangle className="h-3 w-3 shrink-0" />
                                  No options available for this MCQ.
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Question Type */}
                      <td className="p-4 align-top whitespace-nowrap">
                        {question.type ? (
                          <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            {question.type}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            —
                          </span>
                        )}
                      </td>

                      {/* Difficulty */}
                      <td className="p-4 align-top whitespace-nowrap">
                        {question.difficulty ? (
                          <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium capitalize text-muted-foreground">
                            {question.difficulty}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            —
                          </span>
                        )}
                      </td>

                      {/* Marks */}
                      <td className="p-4 align-top whitespace-nowrap">
                        <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                          {item.marks ?? question.marks ?? 0} marks
                        </span>
                      </td>

                      {/* Action */}
                      <td className="p-4 align-top text-right whitespace-nowrap">
                        <Link
                          href={`/dashboard/company/assessments/${assessmentId}/questions/${qId}`}
                          className="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-xs font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>View Details</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
