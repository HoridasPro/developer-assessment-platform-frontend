// "use client";

// import { useGetAttemptResult } from "@/hooks";
// import { useParams, useRouter } from "next/navigation";

// export default function CandidateAttemptResultPage() {
//   const params = useParams();
//   const router = useRouter();

//   const attemptId = params.attemptId as string;

//   const {
//     data: resultResponse,
//     isLoading,
//     isError,
//   } = useGetAttemptResult(attemptId);

//   if (isLoading) {
//     return (
//       <div className="flex min-h-[400px] items-center justify-center">
//         <p className="text-muted-foreground">Loading result...</p>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="p-6">
//         <div className="rounded-lg border border-red-200 bg-red-50 p-6">
//           <h2 className="text-lg font-semibold text-red-600">
//             Failed to load result
//           </h2>

//           <p className="mt-2 text-sm text-red-500">
//             Unable to fetch your assessment result.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   /*
//    * API response normally:
//    *
//    * {
//    *   success: true,
//    *   message: "...",
//    *   data: {...}
//    * }
//    */

//   const result = resultResponse?.data?.data || resultResponse?.data;

//   if (!result) {
//     return (
//       <div className="p-6">
//         <div className="rounded-lg border p-6">
//           <h2 className="text-lg font-semibold">Result not found</h2>

//           <p className="mt-2 text-sm text-muted-foreground">
//             No result was found for this attempt.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const assessment = result.assessment;
//   const candidate = result.candidate;

//   const score = Number(result.score ?? 0);

//   const passingScore = Number(assessment?.passingScore ?? 0);

//   const passed = result.passed ?? score >= passingScore;

//   return (
//     <div className="mx-auto max-w-5xl space-y-6 p-6">
//       {/* =====================================
//           Header
//       ====================================== */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold">Assessment Result</h1>

//           <p className="mt-1 text-sm text-muted-foreground">
//             Your assessment result is ready.
//           </p>
//         </div>

//         <button
//           type="button"
//           onClick={() => router.push("/dashboard/candidate/attempts")}
//           className="rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-muted"
//         >
//           Back to Attempts
//         </button>
//       </div>

//       {/* =====================================
//           Result Summary
//       ====================================== */}
//       <div className="rounded-xl border p-6">
//         <div className="grid gap-6 md:grid-cols-3">
//           {/* Score */}
//           <div className="rounded-lg bg-muted p-5">
//             <p className="text-sm text-muted-foreground">Your Score</p>

//             <p className="mt-2 text-4xl font-bold">{score}</p>

//             <p className="mt-1 text-sm text-muted-foreground">points</p>
//           </div>

//           {/* Passing Score */}
//           <div className="rounded-lg bg-muted p-5">
//             <p className="text-sm text-muted-foreground">Passing Score</p>

//             <p className="mt-2 text-4xl font-bold">{passingScore}</p>

//             <p className="mt-1 text-sm text-muted-foreground">
//               minimum required
//             </p>
//           </div>

//           {/* Result */}
//           <div className="rounded-lg bg-muted p-5">
//             <p className="text-sm text-muted-foreground">Result</p>

//             <p
//               className={`mt-2 text-3xl font-bold ${
//                 passed ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {passed ? "PASSED" : "FAILED"}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* =====================================
//           Assessment Information
//       ====================================== */}
//       <div className="rounded-xl border p-6">
//         <h2 className="text-xl font-semibold">Assessment Information</h2>

//         <div className="mt-5 grid gap-4 md:grid-cols-2">
//           <div>
//             <p className="text-sm text-muted-foreground">Assessment</p>

//             <p className="mt-1 font-medium">{assessment?.title ?? "N/A"}</p>
//           </div>

//           <div>
//             <p className="text-sm text-muted-foreground">Attempt Number</p>

//             <p className="mt-1 font-medium">{result.attemptNumber ?? "N/A"}</p>
//           </div>

//           <div>
//             <p className="text-sm text-muted-foreground">Status</p>

//             <p className="mt-1 font-medium">{result.status ?? "N/A"}</p>
//           </div>

//           <div>
//             <p className="text-sm text-muted-foreground">Duration</p>

//             <p className="mt-1 font-medium">
//               {assessment?.duration ? `${assessment.duration} minutes` : "N/A"}
//             </p>
//           </div>

//           <div>
//             <p className="text-sm text-muted-foreground">Started At</p>

//             <p className="mt-1 font-medium">
//               {result.startedAt
//                 ? new Date(result.startedAt).toLocaleString()
//                 : "N/A"}
//             </p>
//           </div>

//           <div>
//             <p className="text-sm text-muted-foreground">Submitted At</p>

//             <p className="mt-1 font-medium">
//               {result.submittedAt
//                 ? new Date(result.submittedAt).toLocaleString()
//                 : "N/A"}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* =====================================
//           Candidate Information
//       ====================================== */}
//       {candidate && (
//         <div className="rounded-xl border p-6">
//           <h2 className="text-xl font-semibold">Candidate Information</h2>

//           <div className="mt-5 grid gap-4 md:grid-cols-2">
//             <div>
//               <p className="text-sm text-muted-foreground">Name</p>

//               <p className="mt-1 font-medium">{candidate.name ?? "N/A"}</p>
//             </div>

//             <div>
//               <p className="text-sm text-muted-foreground">Email</p>

//               <p className="mt-1 font-medium">{candidate.email ?? "N/A"}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* =====================================
//           Question-wise Result
//       ====================================== */}
//       {result.answers?.length > 0 && (
//         <div className="rounded-xl border p-6">
//           <h2 className="text-xl font-semibold">Question-wise Result</h2>

//           <div className="mt-5 space-y-4">
//             {result.answers.map((answer: any, index: number) => {
//               const question = answer.question;

//               const maxMarks = Number(question?.marks ?? 0);

//               const obtainedMarks = Number(
//                 answer.obtainedMarks ?? answer.marks ?? 0,
//               );

//               return (
//                 <div
//                   key={answer.id ?? answer.questionId ?? index}
//                   className="rounded-lg border p-5"
//                 >
//                   <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
//                     <div>
//                       <p className="text-sm text-muted-foreground">
//                         Question {index + 1}
//                       </p>

//                       <h3 className="mt-1 font-semibold">
//                         {question?.title ?? "Question"}
//                       </h3>
//                     </div>

//                     <div className="rounded-md bg-muted px-4 py-2">
//                       <span className="font-semibold">{obtainedMarks}</span>

//                       <span className="text-muted-foreground">
//                         {" "}
//                         / {maxMarks}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
//                     <div>
//                       <span className="text-muted-foreground">Type: </span>

//                       <strong>{question?.type ?? "N/A"}</strong>
//                     </div>

//                     <div>
//                       <span className="text-muted-foreground">
//                         Maximum Marks:{" "}
//                       </span>

//                       <strong>{maxMarks}</strong>
//                     </div>

//                     <div>
//                       <span className="text-muted-foreground">
//                         Obtained Marks:{" "}
//                       </span>

//                       <strong>{obtainedMarks}</strong>
//                     </div>
//                   </div>

//                   {/* MCQ */}
//                   {question?.type === "MCQ" && (
//                     <div className="mt-4 rounded-md bg-muted p-4">
//                       <p className="text-sm font-medium">Your Answer</p>

//                       <p className="mt-1">
//                         {answer.selectedOption?.text ?? "No answer"}
//                       </p>
//                     </div>
//                   )}

//                   {/* Written */}
//                   {question?.type === "WRITTEN" && (
//                     <div className="mt-4 rounded-md bg-muted p-4">
//                       <p className="text-sm font-medium">Your Answer</p>

//                       <p className="mt-2 whitespace-pre-wrap text-sm">
//                         {answer.writtenAnswer ?? "No answer"}
//                       </p>
//                     </div>
//                   )}

//                   {/* Coding */}
//                   {question?.type === "CODING" && (
//                     <div className="mt-4 rounded-md bg-muted p-4">
//                       <p className="text-sm font-medium">Your Code</p>

//                       <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-sm">
//                         <code>{answer.codeAnswer ?? "No code submitted"}</code>
//                       </pre>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* =====================================
//           Final Result
//       ====================================== */}
//       <div
//         className={`rounded-xl border p-6 ${
//           passed ? "border-green-200" : "border-red-200"
//         }`}
//       >
//         <div className="text-center">
//           <p className="text-sm text-muted-foreground">Final Result</p>

//           <h2
//             className={`mt-2 text-4xl font-bold ${
//               passed ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {passed ? "Congratulations!" : "Better Luck Next Time"}
//           </h2>

//           <p className="mt-3 text-muted-foreground">
//             {passed
//               ? "You have successfully passed this assessment."
//               : "You did not reach the required passing score."}
//           </p>

//           <p className="mt-4 text-lg">
//             Score: <strong>{score}</strong> / <strong>{passingScore}</strong>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useGetAttemptResult } from "@/hooks";
import { useParams, useRouter } from "next/navigation";

export default function CandidateAttemptResultPage() {
  const params = useParams();
  const router = useRouter();

  const attemptId = params.attemptId as string;

  const {
    data: resultResponse,
    isLoading,
    isError,
  } = useGetAttemptResult(attemptId);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground">Loading result...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-600">
            Failed to load result
          </h2>

          <p className="mt-2 text-sm text-red-500">
            Unable to fetch your assessment result.
          </p>
        </div>
      </div>
    );
  }

  /*
   * API response normally:
   *
   * {
   *   success: true,
   *   message: "...",
   *   data: {...}
   * }
   */

  const result = resultResponse?.data?.data || resultResponse?.data;

  if (!result) {
    return (
      <div className="p-6">
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold">Result not found</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            No result was found for this attempt.
          </p>
        </div>
      </div>
    );
  }

  const assessment = result.assessment;
  const candidate = result.candidate;

  const score = Number(result.score ?? 0);

  const passingScore = Number(assessment?.passingScore ?? 0);

  const totalMarks =
    result.answers?.reduce(
      (total: number, answer: any) =>
        total + Number(answer.question?.marks ?? 0),
      0,
    ) ?? 0;

  const passed = result.passed ?? score >= passingScore;

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      {/* =====================================
          Header
      ====================================== */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Assessment Result</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Your assessment result is ready.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/dashboard/candidate/attempts")}
          className="rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-muted"
        >
          Back to Attempts
        </button>
      </div>

      {/* =====================================
          Result Summary
      ====================================== */}
      <div className="rounded-xl border p-6">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Score */}
          <div className="rounded-lg bg-muted p-5">
            <p className="text-sm text-muted-foreground">Your Score</p>

            <p className="mt-2 text-4xl font-bold">{score}</p>

            <p className="mt-1 text-sm text-muted-foreground">points</p>
          </div>

          {/* Passing Score */}
          <div className="rounded-lg bg-muted p-5">
            <p className="text-sm text-muted-foreground">Passing Score</p>

            <p className="mt-2 text-4xl font-bold">{passingScore}</p>

            <p className="mt-1 text-sm text-muted-foreground">
              minimum required
            </p>
          </div>

          {/* Result */}
          <div className="rounded-lg bg-muted p-5">
            <p className="text-sm text-muted-foreground">Result</p>

            <p
              className={`mt-2 text-3xl font-bold ${
                passed ? "text-green-600" : "text-red-600"
              }`}
            >
              {passed ? "PASSED" : "FAILED"}
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          Assessment Information
      ====================================== */}
      <div className="rounded-xl border p-6">
        <h2 className="text-xl font-semibold">Assessment Information</h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Assessment</p>

            <p className="mt-1 font-medium">{assessment?.title ?? "N/A"}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Attempt Number</p>

            <p className="mt-1 font-medium">{result.attemptNumber ?? "N/A"}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Status</p>

            <p className="mt-1 font-medium">{result.status ?? "N/A"}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Duration</p>

            <p className="mt-1 font-medium">
              {assessment?.duration ? `${assessment.duration} minutes` : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Started At</p>

            <p className="mt-1 font-medium">
              {result.startedAt
                ? new Date(result.startedAt).toLocaleString()
                : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Submitted At</p>

            <p className="mt-1 font-medium">
              {result.submittedAt
                ? new Date(result.submittedAt).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          Candidate Information
      ====================================== */}
      {candidate && (
        <div className="rounded-xl border p-6">
          <h2 className="text-xl font-semibold">Candidate Information</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>

              <p className="mt-1 font-medium">{candidate.name ?? "N/A"}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Email</p>

              <p className="mt-1 font-medium">{candidate.email ?? "N/A"}</p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================
          Question-wise Result
      ====================================== */}
      {result.answers?.length > 0 && (
        <div className="rounded-xl border p-6">
          <h2 className="text-xl font-semibold">Question-wise Result</h2>

          <div className="mt-5 space-y-4">
            {result.answers.map((answer: any, index: number) => {
              const question = answer.question;

              const maxMarks = Number(question?.marks ?? 0);

              const obtainedMarks = Number(
                answer.obtainedMarks ?? answer.marks ?? 0,
              );

              return (
                <div
                  key={answer.id ?? answer.questionId ?? index}
                  className="rounded-lg border p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Question {index + 1}
                      </p>

                      <h3 className="mt-1 font-semibold">
                        {question?.title ?? "Question"}
                      </h3>
                    </div>

                    <div className="rounded-md bg-muted px-4 py-2">
                      <span className="font-semibold">{obtainedMarks}</span>

                      <span className="text-muted-foreground">
                        {" "}
                        / {maxMarks}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
                    <div>
                      <span className="text-muted-foreground">Type: </span>

                      <strong>{question?.type ?? "N/A"}</strong>
                    </div>

                    <div>
                      <span className="text-muted-foreground">
                        Maximum Marks:{" "}
                      </span>

                      <strong>{maxMarks}</strong>
                    </div>

                    <div>
                      <span className="text-muted-foreground">
                        Obtained Marks:{" "}
                      </span>

                      <strong>{obtainedMarks}</strong>
                    </div>
                  </div>

                  {/* MCQ */}
                  {question?.type === "MCQ" && (
                    <div className="mt-4 rounded-md bg-muted p-4">
                      <p className="text-sm font-medium">Your Answer</p>

                      <p className="mt-1">
                        {answer.selectedOption?.text ?? "No answer"}
                      </p>
                    </div>
                  )}

                  {/* Written */}
                  {question?.type === "WRITTEN" && (
                    <div className="mt-4 rounded-md bg-muted p-4">
                      <p className="text-sm font-medium">Your Answer</p>

                      <p className="mt-2 whitespace-pre-wrap text-sm">
                        {answer.writtenAnswer ?? "No answer"}
                      </p>
                    </div>
                  )}

                  {/* Coding */}
                  {question?.type === "CODING" && (
                    <div className="mt-4 rounded-md bg-muted p-4">
                      <p className="text-sm font-medium">Your Code</p>

                      <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-sm">
                        <code>{answer.codeAnswer ?? "No code submitted"}</code>
                      </pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================
          Final Result
      ====================================== */}
      <div
        className={`rounded-xl border p-6 ${
          passed ? "border-green-200" : "border-red-200"
        }`}
      >
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Final Result</p>

          <h2
            className={`mt-2 text-4xl font-bold ${
              passed ? "text-green-600" : "text-red-600"
            }`}
          >
            {passed ? "Congratulations!" : "Better Luck Next Time"}
          </h2>

          <p className="mt-3 text-muted-foreground">
            {passed
              ? "You have successfully passed this assessment."
              : "You did not reach the required passing score."}
          </p>

          <p className="mt-4 text-lg">
            Score: <strong>{score}</strong> / <strong>{totalMarks}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
