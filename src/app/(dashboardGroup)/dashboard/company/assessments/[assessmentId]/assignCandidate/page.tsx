// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { useState } from "react";
// import { Loader2, UserPlus } from "lucide-react";

// export default function AssignCandidatePage() {
//   const params = useParams();
//   const router = useRouter();

//   const assessmentId = params.assessmentId as string;

//   const [candidateId, setCandidateId] = useState("");

//   const {
//     mutate: assignCandidate,
//     isPending,
//   } = useAssignCandidat();

//   const handleAssign = () => {
//     if (!candidateId.trim()) {
//       alert("Candidate ID is required.");
//       return;
//     }

//     assignCandidate(
//       {
//         assessmentId,
//         candidateId,
//       },
//       {
//         onSuccess: () => {
//           alert("Candidate assigned successfully!");

//           router.push(
//             `/dashboard/company/assessments/${assessmentId}`,
//           );
//         },

//         onError: (error: any) => {
//           console.error(
//             "Assign Candidate Error:",
//             error,
//           );

//           alert(
//             error?.response?.data?.message ||
//               error?.message ||
//               "Failed to assign candidate.",
//           );
//         },
//       },
//     );
//   };

//   return (
//     <div className="mx-auto max-w-2xl space-y-6 p-6">
//       <div>
//         <h1 className="text-2xl font-bold">
//           Assign Candidate
//         </h1>

//         <p className="mt-1 text-sm text-muted-foreground">
//           Assign a candidate to this assessment.
//         </p>
//       </div>

//       <div className="rounded-lg border bg-card p-6">
//         <div className="space-y-2">
//           <label
//             htmlFor="candidateId"
//             className="text-sm font-medium"
//           >
//             Candidate ID
//           </label>

//           <input
//             id="candidateId"
//             type="text"
//             value={candidateId}
//             onChange={(e) =>
//               setCandidateId(e.target.value)
//             }
//             placeholder="Enter candidate ID"
//             className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
//           />
//         </div>

//         <button
//           type="button"
//           onClick={handleAssign}
//           disabled={isPending}
//           className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
//         >
//           {isPending ? (
//             <Loader2 className="h-4 w-4 animate-spin" />
//           ) : (
//             <UserPlus className="h-4 w-4" />
//           )}

//           {isPending
//             ? "Assigning..."
//             : "Assign Candidate"}
//         </button>
//       </div>
//     </div>
//   );
// }