// /** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
// "use client";

// import { useGetAttemptDetails, useSubmitEvaluate } from "@/hooks";
// import { useParams, useRouter } from "next/navigation";
// import { useState } from "react";

// export default function EvaluateAttemptPage() {
//   const params = useParams();
//   const router = useRouter();

//   const attemptId = params.attemptId as string;

//   // =========================================
//   // Get Attempt Details
//   // =========================================
//   const {
//     data: attemptResponse,
//     isLoading,
//     isError,
//     refetch,
//   } = useGetAttemptDetails(attemptId);

//   // =========================================
//   // Submit Evaluation
//   // =========================================
//   const submitEvaluateMutation = useSubmitEvaluate();

//   // =========================================
//   // Marks State
//   // =========================================
//   const [marks, setMarks] = useState<Record<string, string>>({});

//   // =========================================
//   // Loading
//   // =========================================
//   if (isLoading) {
//     return <div className="p-6">Loading attempt...</div>;
//   }

//   // =========================================
//   // Error
//   // =========================================
//   if (isError) {
//     return <div className="p-6 text-red-500">Failed to load attempt.</div>;
//   }

//   // =========================================
//   // Resolve Attempt Data
//   // Handles:
//   // { data: {...} }
//   // OR
//   // { data: { data: {...} } }
//   // =========================================
//   const attempt = attemptResponse?.data || attemptResponse?.data;

//   if (!attempt) {
//     return <div className="p-6">Attempt not found.</div>;
//   }

//   // =========================================
//   // Marks Change
//   // =========================================
//   const handleMarksChange = (questionId: string, value: string) => {
//     setMarks((prev) => ({
//       ...prev,
//       [questionId]: value,
//     }));
//   };

//   // =========================================
//   // Submit Evaluation
//   // =========================================
//   const handleSubmitEvaluation = () => {
//     // -----------------------------------------
//     // Only WRITTEN + CODING
//     // -----------------------------------------
//     const answersPayload = attempt.answers
//       .filter(
//         (answer: any) =>
//           answer.question?.type === "WRITTEN" ||
//           answer.question?.type === "CODING",
//       )
//       .map((answer: any) => ({
//         questionId: answer.questionId,

//         marks: Number(marks[answer.questionId] ?? 0),

//         type: answer.question.type as "WRITTEN" | "CODING",
//       }));

//     // -----------------------------------------
//     // Debug Payload
//     // -----------------------------------------
//     console.log("========== EVALUATION PAYLOAD ==========");

//     console.log("Attempt ID:", attemptId);

//     console.log("Answers:", answersPayload);

//     console.log("=========================================");

//     // -----------------------------------------
//     // Validate Marks
//     // -----------------------------------------
//     const invalidMarks = answersPayload.find((answer: any) => {
//       const question = attempt.answers.find(
//         (item: any) => item.questionId === answer.questionId,
//       )?.question;

//       if (!question) {
//         return true;
//       }

//       return answer.marks < 0 || answer.marks > question.marks;
//     });

//     if (invalidMarks) {
//       alert("Marks cannot be negative or greater than the maximum marks.");

//       return;
//     }

//     // -----------------------------------------
//     // Submit POST Request
//     // -----------------------------------------
//     submitEvaluateMutation.mutate(
//       {
//         attemptId,

//         payload: {
//           answers: answersPayload,
//         },
//       },

//       {
//         // =====================================
//         // SUCCESS
//         // =====================================
//         onSuccess: async (response) => {
//           console.log("========== EVALUATION SUCCESS ==========");

//           console.log("Full Response:", response);

//           console.log("Response Data:", response?.data);

//           console.log("Status:", response?.data?.status);

//           console.log("=========================================");

//           // -----------------------------------
//           // Refetch Current Attempt
//           // -----------------------------------
//           const refreshed = await refetch();

//           console.log("========== AFTER REFETCH ==========");

//           console.log("Refetched Data:", refreshed.data);

//           console.log("===================================");

//           alert("Evaluation submitted successfully!");

//           // -----------------------------------
//           // Go back to attempts
//           // -----------------------------------
//           router.push("/dashboard/company/attempts");

//           router.refresh();
//         },

//         // =====================================
//         // ERROR
//         // =====================================
//         onError: (error) => {
//           console.error("========== EVALUATION ERROR ==========");

//           console.error("Error:", error);

//           console.error("=======================================");

//           alert(
//             error instanceof Error
//               ? error.message
//               : "Failed to submit evaluation. Please try again.",
//           );
//         },
//       },
//     );
//   };

//   // =========================================
//   // UI
//   // =========================================
//   return (
//     <div className="mx-auto max-w-5xl space-y-6 p-6">
//       {/* =====================================
//           Candidate Information
//       ====================================== */}
//       <div className="rounded-lg border p-6">
//         <h1 className="text-2xl font-bold">Evaluate Assessment</h1>

//         <div className="mt-4 space-y-2">
//           <p>
//             Candidate: <strong>{attempt.candidate?.name ?? "N/A"}</strong>
//           </p>

//           <p>Email: {attempt.candidate?.email ?? "N/A"}</p>

//           <p>
//             Assessment: <strong>{attempt.assessment?.title ?? "N/A"}</strong>
//           </p>

//           <p>
//             Attempt: <strong>{attempt.attemptNumber}</strong>
//           </p>

//           <p>
//             Status:{" "}
//             <span
//               className={`font-bold ${
//                 attempt.status === "COMPLETED"
//                   ? "text-green-600"
//                   : "text-yellow-600"
//               }`}
//             >
//               {attempt.status}
//             </span>
//           </p>
//         </div>
//       </div>

//       {/* =====================================
//           Questions
//       ====================================== */}
//       <div className="space-y-5">
//         {attempt.answers?.map((answer: any, index: number) => {
//           const question = answer.question;

//           if (!question) {
//             return null;
//           }

//           return (
//             <div key={answer.id ?? index} className="rounded-lg border p-6">
//               {/* Question Header */}
//               <div className="space-y-2">
//                 <p className="text-sm text-muted-foreground">
//                   Question {index + 1}
//                 </p>

//                 <h2 className="text-lg font-semibold">{question.title}</h2>

//                 {question.description && (
//                   <p className="text-sm text-muted-foreground">
//                     {question.description}
//                   </p>
//                 )}

//                 <div className="flex flex-wrap gap-4 text-sm">
//                   <span>
//                     Type: <strong>{question.type}</strong>
//                   </span>

//                   <span>
//                     Maximum Marks: <strong>{question.marks}</strong>
//                   </span>

//                   <span>
//                     Category: <strong>{question.category}</strong>
//                   </span>

//                   <span>
//                     Difficulty: <strong>{question.difficulty}</strong>
//                   </span>
//                 </div>
//               </div>

//               {/* =================================
//                     MCQ
//                 ================================== */}
//               {question.type === "MCQ" && (
//                 <div className="mt-5 rounded-md bg-muted p-4">
//                   <p className="font-medium">Candidate Answer</p>

//                   <p className="mt-2">
//                     {answer.selectedOption?.text ?? "No answer submitted"}
//                   </p>

//                   <p className="mt-3 text-sm">
//                     Correct Answer:{" "}
//                     <strong>
//                       {question.options?.find((option: any) => option.isCorrect)
//                         ?.text ?? "Not available"}
//                     </strong>
//                   </p>

//                   <p className="mt-3 font-medium text-green-600">
//                     ✓ MCQ is automatically evaluated.
//                   </p>
//                 </div>
//               )}

//               {/* =================================
//                     WRITTEN
//                 ================================== */}
//               {question.type === "WRITTEN" && (
//                 <div className="mt-5 space-y-4">
//                   {/* Candidate Answer */}
//                   <div>
//                     <p className="font-medium">Candidate Answer</p>

//                     <div className="mt-2 whitespace-pre-wrap rounded-md bg-muted p-4">
//                       {answer.writtenAnswer ?? "No answer submitted"}
//                     </div>
//                   </div>

//                   {/* Give Marks */}
//                   <div>
//                     <label
//                       htmlFor={`marks-${answer.questionId}`}
//                       className="text-sm font-medium"
//                     >
//                       Give Marks
//                     </label>

//                     <input
//                       id={`marks-${answer.questionId}`}
//                       type="number"
//                       min={0}
//                       max={question.marks}
//                       value={marks[answer.questionId] ?? ""}
//                       onChange={(event) =>
//                         handleMarksChange(answer.questionId, event.target.value)
//                       }
//                       placeholder={`0 - ${question.marks}`}
//                       className="mt-2 w-full rounded-md border px-3 py-2"
//                     />

//                     <p className="mt-1 text-xs text-muted-foreground">
//                       Maximum: {question.marks} marks
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* =================================
//                     CODING
//                 ================================== */}
//               {question.type === "CODING" && (
//                 <div className="mt-5 space-y-4">
//                   {/* Candidate Code */}
//                   <div>
//                     <p className="font-medium">Candidate Code</p>

//                     <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-4 text-sm font-mono">
//                       <code>{answer.codeAnswer ?? "No code submitted"}</code>
//                     </pre>
//                   </div>

//                   {/* Give Marks */}
//                   <div>
//                     <label
//                       htmlFor={`marks-${answer.questionId}`}
//                       className="text-sm font-medium"
//                     >
//                       Give Marks
//                     </label>

//                     <input
//                       id={`marks-${answer.questionId}`}
//                       type="number"
//                       min={0}
//                       max={question.marks}
//                       value={marks[answer.questionId] ?? ""}
//                       onChange={(event) =>
//                         handleMarksChange(answer.questionId, event.target.value)
//                       }
//                       placeholder={`0 - ${question.marks}`}
//                       className="mt-2 w-full rounded-md border px-3 py-2"
//                     />

//                     <p className="mt-1 text-xs text-muted-foreground">
//                       Maximum: {question.marks} marks
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* =====================================
//           Submit Evaluation
//       ====================================== */}
//       <div className="flex justify-end">
//         <button
//           type="button"
//           onClick={handleSubmitEvaluation}
//           disabled={
//             submitEvaluateMutation.isPending ||
//             attempt.status?.toUpperCase() === "COMPLETED"
//           }
//           className="rounded-md bg-black px-6 py-3 text-white transition-all hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
//         >
//           {submitEvaluateMutation.isPending
//             ? "Submitting..."
//             : attempt.status?.toUpperCase() === "COMPLETED"
//               ? "Already Evaluated"
//               : "Submit Evaluation"}
//         </button>
//       </div>
//     </div>
//   );
// }
/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
"use client";

import {
  useEvaluateAnswers,
  useGetAttemptDetails,
  useSubmitEvaluate,
} from "@/hooks";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function EvaluateAttemptPage() {
  const params = useParams();
  const router = useRouter();

  const attemptId = params.attemptId as string;

  // =========================================
  // Get Attempt Details
  // =========================================
  const {
    data: attemptResponse,
    isLoading,
    isError,
    refetch,
  } = useGetAttemptDetails(attemptId);

  // =========================================
  // Evaluation Mutation
  // PATCH /attempts/evaluate-answers/:attemptId
  // =========================================
  const evaluateMutation = useEvaluateAnswers();

  // =========================================
  // Submit Evaluation Mutation
  // POST /attempts/evaluate/:attemptId
  // =========================================
  const submitEvaluateMutation = useSubmitEvaluate();

  // =========================================
  // Marks State
  // =========================================
  const [marks, setMarks] = useState<Record<string, string>>({});

  // =========================================
  // Loading
  // =========================================
  if (isLoading) {
    return <div className="p-6">Loading attempt...</div>;
  }

  // =========================================
  // Error
  // =========================================
  if (isError) {
    return <div className="p-6 text-red-500">Failed to load attempt.</div>;
  }

  // =========================================
  // Resolve Attempt Data
  // =========================================
  const attempt = attemptResponse?.data || attemptResponse?.data;

  if (!attempt) {
    return <div className="p-6">Attempt not found.</div>;
  }

  // =========================================
  // Marks Change
  // =========================================
  const handleMarksChange = (questionId: string, value: string) => {
    setMarks((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // =========================================
  // Submit Evaluation
  // =========================================
  const handleSubmitEvaluation = () => {
    // -----------------------------------------
    // Only WRITTEN + CODING
    // -----------------------------------------
    const answersPayload = attempt.answers
      .filter(
        (answer: any) =>
          answer.question?.type === "WRITTEN" ||
          answer.question?.type === "CODING",
      )
      .map((answer: any) => ({
        questionId: answer.questionId,

        marks: Number(marks[answer.questionId] ?? 0),

        type: answer.question.type as "WRITTEN" | "CODING",
      }));

    // -----------------------------------------
    // Debug Payload
    // -----------------------------------------
    console.log("========== EVALUATION PAYLOAD ==========");

    console.log("Attempt ID:", attemptId);

    console.log("Answers:", answersPayload);

    console.log("=========================================");

    // -----------------------------------------
    // Validate Marks
    // -----------------------------------------
    const invalidMarks = answersPayload.find((answer: any) => {
      const question = attempt.answers.find(
        (item: any) => item.questionId === answer.questionId,
      )?.question;

      if (!question) {
        return true;
      }

      return answer.marks < 0 || answer.marks > question.marks;
    });

    if (invalidMarks) {
      alert("Marks cannot be negative or greater than the maximum marks.");

      return;
    }

    // =====================================================
    // STEP 1
    // PATCH
    // /attempts/evaluate-answers/:attemptId
    // =====================================================

    evaluateMutation.mutate(
      {
        attemptId,

        payload: {
          answers: answersPayload,
        },
      },

      {
        onSuccess: (evaluationResponse) => {
          console.log("========== PATCH EVALUATION SUCCESS ==========");

          console.log("Evaluation Response:", evaluationResponse);

          console.log("Evaluation Data:", evaluationResponse?.data);

          console.log("==============================================");

          // =================================================
          // STEP 2
          // POST
          // /attempts/evaluate/:attemptId
          // =================================================

          submitEvaluateMutation.mutate(
            {
              attemptId,

              payload: {
                answers: answersPayload,
              },
            },

            {
              onSuccess: async (submitResponse) => {
                console.log("========== FINAL EVALUATION SUCCESS ==========");

                console.log("Submit Response:", submitResponse);

                console.log("Submit Data:", submitResponse?.data);

                console.log("Final Status:", submitResponse?.data?.status);

                console.log("===============================================");

                // -----------------------------------------
                // Refetch Attempt
                // -----------------------------------------
                const refreshed = await refetch();

                console.log("========== AFTER REFETCH ==========");

                console.log("Refetched Data:", refreshed.data);

                console.log("Refetched Status:", refreshed.data?.data?.status);

                console.log("===================================");

                alert("Evaluation submitted successfully!");

                // -----------------------------------------
                // Go Back
                // -----------------------------------------
                router.push("/dashboard/company/attempts");

                router.refresh();
              },

              onError: (error) => {
                console.error("========== FINAL EVALUATION ERROR ==========");

                console.error(error);

                console.error("=============================================");

                alert(
                  error instanceof Error
                    ? error.message
                    : "Final evaluation failed.",
                );
              },
            },
          );
        },

        onError: (error) => {
          console.error("========== PATCH EVALUATION ERROR ==========");

          console.error(error);

          console.error("=============================================");

          alert(error instanceof Error ? error.message : "Evaluation failed.");
        },
      },
    );
  };

  // =========================================
  // UI
  // =========================================
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      {/* =====================================
          Candidate Information
      ====================================== */}
      <div className="rounded-lg border p-6">
        <h1 className="text-2xl font-bold">Evaluate Assessment</h1>

        <div className="mt-4 space-y-2">
          <p>
            Candidate: <strong>{attempt.candidate?.name ?? "N/A"}</strong>
          </p>

          <p>Email: {attempt.candidate?.email ?? "N/A"}</p>

          <p>
            Assessment: <strong>{attempt.assessment?.title ?? "N/A"}</strong>
          </p>

          <p>
            Attempt: <strong>{attempt.attemptNumber}</strong>
          </p>

          <p>
            Status:{" "}
            <span
              className={`font-bold ${
                attempt.status === "COMPLETED"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {attempt.status}
            </span>
          </p>
        </div>
      </div>

      {/* =====================================
          Questions
      ====================================== */}
      <div className="space-y-5">
        {attempt.answers?.map((answer: any, index: number) => {
          const question = answer.question;

          if (!question) {
            return null;
          }

          return (
            <div key={answer.id ?? index} className="rounded-lg border p-6">
              {/* Question Header */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Question {index + 1}
                </p>

                <h2 className="text-lg font-semibold">{question.title}</h2>

                {question.description && (
                  <p className="text-sm text-muted-foreground">
                    {question.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-4 text-sm">
                  <span>
                    Type: <strong>{question.type}</strong>
                  </span>

                  <span>
                    Maximum Marks: <strong>{question.marks}</strong>
                  </span>

                  <span>
                    Category: <strong>{question.category}</strong>
                  </span>

                  <span>
                    Difficulty: <strong>{question.difficulty}</strong>
                  </span>
                </div>
              </div>

              {/* =================================
                    MCQ
                ================================== */}
              {question.type === "MCQ" && (
                <div className="mt-5 rounded-md bg-muted p-4">
                  <p className="font-medium">Candidate Answer</p>

                  <p className="mt-2">
                    {answer.selectedOption?.text ?? "No answer submitted"}
                  </p>

                  <p className="mt-3 text-sm">
                    Correct Answer:{" "}
                    <strong>
                      {question.options?.find((option: any) => option.isCorrect)
                        ?.text ?? "Not available"}
                    </strong>
                  </p>

                  <p className="mt-3 font-medium text-green-600">
                    ✓ MCQ is automatically evaluated.
                  </p>
                </div>
              )}

              {/* =================================
                    WRITTEN
                ================================== */}
              {question.type === "WRITTEN" && (
                <div className="mt-5 space-y-4">
                  <div>
                    <p className="font-medium">Candidate Answer</p>

                    <div className="mt-2 whitespace-pre-wrap rounded-md bg-muted p-4">
                      {answer.writtenAnswer ?? "No answer submitted"}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={`marks-${answer.questionId}`}
                      className="text-sm font-medium"
                    >
                      Give Marks
                    </label>

                    <input
                      id={`marks-${answer.questionId}`}
                      type="number"
                      min={0}
                      max={question.marks}
                      value={marks[answer.questionId] ?? ""}
                      onChange={(event) =>
                        handleMarksChange(answer.questionId, event.target.value)
                      }
                      placeholder={`0 - ${question.marks}`}
                      className="mt-2 w-full rounded-md border px-3 py-2"
                    />

                    <p className="mt-1 text-xs text-muted-foreground">
                      Maximum: {question.marks} marks
                    </p>
                  </div>
                </div>
              )}

              {/* =================================
                    CODING
                ================================== */}
              {question.type === "CODING" && (
                <div className="mt-5 space-y-4">
                  <div>
                    <p className="font-medium">Candidate Code</p>

                    <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-4 text-sm font-mono">
                      <code>{answer.codeAnswer ?? "No code submitted"}</code>
                    </pre>
                  </div>

                  <div>
                    <label
                      htmlFor={`marks-${answer.questionId}`}
                      className="text-sm font-medium"
                    >
                      Give Marks
                    </label>

                    <input
                      id={`marks-${answer.questionId}`}
                      type="number"
                      min={0}
                      max={question.marks}
                      value={marks[answer.questionId] ?? ""}
                      onChange={(event) =>
                        handleMarksChange(answer.questionId, event.target.value)
                      }
                      placeholder={`0 - ${question.marks}`}
                      className="mt-2 w-full rounded-md border px-3 py-2"
                    />

                    <p className="mt-1 text-xs text-muted-foreground">
                      Maximum: {question.marks} marks
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* =====================================
          Submit Evaluation
      ====================================== */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmitEvaluation}
          disabled={
            evaluateMutation.isPending ||
            submitEvaluateMutation.isPending ||
            attempt.status?.toUpperCase() === "COMPLETED" ||
            attempt.status?.toUpperCase() === "CANCELLED"
          }
          className="rounded-md bg-black px-6 py-3 text-white transition-all hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {evaluateMutation.isPending || submitEvaluateMutation.isPending
            ? "Submitting..."
            : attempt.status?.toUpperCase() === "COMPLETED"
              ? "Already Evaluated"
              : attempt.status?.toUpperCase() === "CANCELLED"
                ? "Attempt Cancelled"
                : "Submit Evaluation"}
        </button>
      </div>
    </div>
  );
}
