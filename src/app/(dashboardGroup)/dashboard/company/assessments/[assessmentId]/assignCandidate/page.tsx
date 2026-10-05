// "use client";

// import { useParams, useRouter } from "next/navigation";
// import {
//   Loader2,
//   UserPlus,
//   CheckCircle2,
//   UserCheck,
//   Mail,
//   Key,
//   User,
// } from "lucide-react";
// import { useState } from "react";
// import { useAssignCandidate, useGetCandidates } from "@/hooks";
// import Image from "next/image";

// export default function AssignCandidatePage() {
//   const params = useParams();
//   const router = useRouter();

//   const assessmentId = params.assessmentId as string;

//   // Multiple selection state (Array of IDs)
//   const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>(
//     [],
//   );
//   const [isAssigning, setIsAssigning] = useState(false);

//   const { data, isLoading, isError } = useGetCandidates();

//   const { mutateAsync: assignCandidateAsync } = useAssignCandidate();

//   // Safe candidate extraction
//   const candidates = Array.isArray(data)
//     ? data
//     : Array.isArray((data as any)?.data)
//       ? (data as any).data
//       : Array.isArray((data as any)?.candidates)
//         ? (data as any).candidates
//         : [];

//   // Toggle single candidate selection
//   const toggleSelectCandidate = (candidateId: string) => {
//     setSelectedCandidateIds((prev) =>
//       prev.includes(candidateId)
//         ? prev.filter((id) => id !== candidateId)
//         : [...prev, candidateId],
//     );
//   };

//   // Toggle Select All
//   const toggleSelectAll = () => {
//     if (selectedCandidateIds.length === candidates.length) {
//       setSelectedCandidateIds([]);
//     } else {
//       const allIds = candidates.map((c: any) => c.id || c.userId || c._id);
//       setSelectedCandidateIds(allIds);
//     }
//   };

//   const handleAssign = async () => {
//     if (selectedCandidateIds.length === 0) {
//       alert("Please select at least one candidate.");
//       return;
//     }

//     setIsAssigning(true);

//     try {
//       // Execute assignment requests for all selected candidates concurrently
//       await Promise.all(
//         selectedCandidateIds.map((candidateId) =>
//           assignCandidateAsync({
//             assessmentId,
//             candidateId,
//           }),
//         ),
//       );

//       alert("Candidates assigned successfully!");
//       router.push(`/dashboard/company/assessments/${assessmentId}`);
//     } catch (error: any) {
//       console.error("Assign Candidate Error:", error);
//       alert(
//         error?.response?.data?.message ||
//           error?.message ||
//           "Failed to assign candidates.",
//       );
//     } finally {
//       setIsAssigning(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex min-h-[400px] w-full items-center justify-center p-10">
//         <Loader2 className="h-6 w-6 animate-spin text-primary" />
//         <span className="ml-2 text-sm text-muted-foreground">
//           Loading candidates...
//         </span>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="w-full p-6">
//         <p className="text-sm text-destructive">Failed to load candidates.</p>
//       </div>
//     );
//   }

//   const isAllSelected =
//     candidates.length > 0 && selectedCandidateIds.length === candidates.length;

//   return (
//     <div className="w-full space-y-6 p-4 sm:p-6 lg:p-8">
//       {/* Header */}
//       <div className="flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold tracking-tight">
//             Assign Candidates
//           </h1>
//           <p className="mt-1 text-sm text-muted-foreground">
//             Select one or multiple candidates from the table below and assign
//             them to this assessment.
//           </p>
//         </div>

//         {/* Desktop Top Assign Button */}
//         {candidates.length > 0 && (
//           <button
//             type="button"
//             onClick={handleAssign}
//             disabled={selectedCandidateIds.length === 0 || isAssigning}
//             className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             {isAssigning ? (
//               <Loader2 className="h-4 w-4 animate-spin" />
//             ) : (
//               <UserPlus className="h-4 w-4" />
//             )}
//             {isAssigning
//               ? "Assigning..."
//               : `Assign Selected (${selectedCandidateIds.length})`}
//           </button>
//         )}
//       </div>

//       {/* Candidate Table Container */}
//       <div className="w-full overflow-hidden rounded-xl border bg-card shadow-sm">
//         <div className="flex items-center justify-between border-b bg-muted/30 p-4">
//           <div>
//             <h2 className="text-base font-semibold">Candidate List</h2>
//             <p className="text-xs text-muted-foreground">
//               Total Candidates: {candidates.length}
//             </p>
//           </div>
//           {selectedCandidateIds.length > 0 && (
//             <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
//               <CheckCircle2 className="h-3.5 w-3.5" />{" "}
//               {selectedCandidateIds.length} Selected
//             </span>
//           )}
//         </div>

//         {candidates.length === 0 ? (
//           <div className="p-12 text-center">
//             <p className="font-medium text-muted-foreground">
//               No candidates found.
//             </p>
//             <p className="mt-1 text-sm text-muted-foreground/80">
//               There are no candidates available right now.
//             </p>
//           </div>
//         ) : (
//           <div className="w-full overflow-x-auto">
//             <table className="w-full border-collapse text-left text-sm">
//               <thead>
//                 <tr className="border-b bg-muted/50 font-medium text-muted-foreground">
//                   <th className="w-10 px-3 py-3.5 text-center">
//                     <input
//                       type="checkbox"
//                       checked={isAllSelected}
//                       onChange={toggleSelectAll}
//                       className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
//                     />
//                   </th>
//                   <th className="w-12 px-3 py-3.5 text-center">SI.</th>
//                   <th className="px-4 py-3.5">Candidate</th>
//                   <th className="hidden px-4 py-3.5 sm:table-cell">Email</th>
//                   <th className="hidden px-4 py-3.5 md:table-cell">Role</th>
//                   <th className="hidden px-4 py-3.5 lg:table-cell">
//                     Candidate ID
//                   </th>
//                   <th className="px-4 py-3.5 text-center">Status</th>
//                   <th className="px-4 py-3.5 text-right">Selection</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y">
//                 {candidates.map((candidate: any, index: number) => {
//                   const candidateId =
//                     candidate.id || candidate.userId || candidate._id;

//                   const name =
//                     candidate.name ||
//                     candidate.user?.name ||
//                     candidate.fullName ||
//                     "Unknown Candidate";

//                   const email =
//                     candidate.email || candidate.user?.email || "No email";

//                   const image =
//                     candidate.avatar ||
//                     candidate.image ||
//                     candidate.photo ||
//                     candidate.user?.image ||
//                     candidate.user?.avatar;

//                   const role =
//                     candidate.role || candidate.user?.role || "Candidate";

//                   const status =
//                     candidate.status || candidate.user?.status || "Active";

//                   const isSelected = selectedCandidateIds.includes(candidateId);

//                   return (
//                     <tr
//                       key={candidateId}
//                       onClick={() => toggleSelectCandidate(candidateId)}
//                       className={`cursor-pointer transition-colors hover:bg-muted/40 ${
//                         isSelected ? "bg-primary/5 font-medium" : ""
//                       }`}
//                     >
//                       {/* Selection Checkbox */}
//                       <td className="px-3 py-4 text-center">
//                         <input
//                           type="checkbox"
//                           checked={isSelected}
//                           onChange={() => toggleSelectCandidate(candidateId)}
//                           onClick={(e) => e.stopPropagation()}
//                           className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
//                         />
//                       </td>

//                       {/* SI No. */}
//                       <td className="px-3 py-4 text-center font-mono text-xs text-muted-foreground">
//                         {index + 1}
//                       </td>

//                       {/* Candidate Avatar & Name */}
//                       <td className="px-4 py-4">
//                         <div className="flex items-center gap-3">
//                           {image ? (
//                             <Image
//                               src={image}
//                               alt={name}
//                               className="h-9 w-9 rounded-full object-cover border"
//                             />
//                           ) : (
//                             <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs border">
//                               {name !== "Unknown Candidate" ? (
//                                 name.charAt(0).toUpperCase()
//                               ) : (
//                                 <User className="h-4 w-4" />
//                               )}
//                             </div>
//                           )}
//                           <div>
//                             <div className="font-medium text-foreground">
//                               {name}
//                             </div>
//                             <div className="flex items-center gap-2 md:hidden">
//                               <span className="text-[10px] text-muted-foreground capitalize">
//                                 {role}
//                               </span>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Mobile Details */}
//                         <div className="mt-1 space-y-0.5 text-xs text-muted-foreground sm:hidden">
//                           <p className="flex items-center gap-1">
//                             <Mail className="h-3 w-3" /> {email}
//                           </p>
//                           <p className="flex items-center gap-1 text-[10px]">
//                             <Key className="h-3 w-3" /> {candidateId}
//                           </p>
//                         </div>
//                       </td>

//                       {/* Email (Tablet/Desktop) */}
//                       <td className="hidden px-4 py-4 text-muted-foreground sm:table-cell">
//                         {email}
//                       </td>

//                       {/* Role (Desktop) */}
//                       <td className="hidden px-4 py-4 md:table-cell">
//                         <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground capitalize">
//                           {role}
//                         </span>
//                       </td>

//                       {/* ID (Desktop) */}
//                       <td className="hidden px-4 py-4 font-mono text-xs text-muted-foreground lg:table-cell">
//                         {candidateId}
//                       </td>

//                       {/* User/Candidate Status */}
//                       <td className="px-4 py-4 text-center">
//                         <span
//                           className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border capitalize ${
//                             status.toLowerCase() === "active"
//                               ? "bg-emerald-50 text-emerald-700 border-emerald-200"
//                               : status.toLowerCase() === "pending"
//                                 ? "bg-amber-50 text-amber-700 border-amber-200"
//                                 : "bg-gray-100 text-gray-600 border-gray-200"
//                           }`}
//                         >
//                           {status}
//                         </span>
//                       </td>

//                       {/* Selected Badge/Action */}
//                       <td className="px-4 py-4 text-right">
//                         {isSelected ? (
//                           <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
//                             <UserCheck className="h-3.5 w-3.5" /> Selected
//                           </span>
//                         ) : (
//                           <span className="text-xs text-muted-foreground hover:text-foreground">
//                             Click to Select
//                           </span>
//                         )}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Bottom Assign Button */}
//       {candidates.length > 0 && (
//         <div className="flex justify-end pt-2">
//           <button
//             type="button"
//             onClick={handleAssign}
//             disabled={selectedCandidateIds.length === 0 || isAssigning}
//             className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
//           >
//             {isAssigning ? (
//               <Loader2 className="h-4 w-4 animate-spin" />
//             ) : (
//               <UserPlus className="h-4 w-4" />
//             )}
//             {isAssigning
//               ? "Assigning Candidates..."
//               : `Assign Candidates (${selectedCandidateIds.length})`}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Loader2,
  UserPlus,
  CheckCircle2,
  UserCheck,
  Mail,
  Key,
  User,
} from "lucide-react";
import { useState } from "react";
import { useAssignCandidate, useGetCandidates } from "@/hooks";
import Image from "next/image";

export default function AssignCandidatePage() {
  const params = useParams();
  const router = useRouter();

  const assessmentId = params.assessmentId as string;

  // Multiple selection state (Array of Candidate User IDs)
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>(
    [],
  );
  const [isAssigning, setIsAssigning] = useState(false);

  const { data, isLoading, isError } = useGetCandidates();

  const { mutateAsync: assignCandidateAsync } = useAssignCandidate();

  // Safe candidate extraction
  const candidates = Array.isArray(data)
    ? data
    : Array.isArray((data as any)?.data)
      ? (data as any).data
      : Array.isArray((data as any)?.candidates)
        ? (data as any).candidates
        : [];

  // Toggle single candidate selection
  const toggleSelectCandidate = (candidateUserId: string) => {
    setSelectedCandidateIds((prev) =>
      prev.includes(candidateUserId)
        ? prev.filter((id) => id !== candidateUserId)
        : [...prev, candidateUserId],
    );
  };

  // Toggle Select All
  const toggleSelectAll = () => {
    if (selectedCandidateIds.length === candidates.length) {
      setSelectedCandidateIds([]);
    } else {
      const allIds = candidates.map((c: any) => c.userId || c.id || c._id);
      setSelectedCandidateIds(allIds);
    }
  };

  const handleAssign = async () => {
    if (selectedCandidateIds.length === 0) {
      alert("Please select at least one candidate.");
      return;
    }

    setIsAssigning(true);

    try {
      await Promise.all(
        selectedCandidateIds.map((candidateUserId) =>
          assignCandidateAsync({
            assessmentId,
            candidateUserId,
          }),
        ),
      );

      alert("Candidates assigned successfully!");
      router.push(`/dashboard/company/assessments/${assessmentId}`);
    } catch (error: any) {
      // 🔍 ব্যাকএন্ড থেকে আসা আসল এরর মেসেজ কনসোলে দেখতে
      console.error(
        "Assign Candidate Detailed Error:",
        error?.data || error?.response?.data || error,
      );

      const errorMessage =
        error?.data?.message ||
        error?.response?.data?.message ||
        error?.message ||
        "Failed to assign candidates.";

      alert(`Error: ${errorMessage}`);
    } finally {
      setIsAssigning(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center p-10">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2 text-sm text-muted-foreground">
          Loading candidates...
        </span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full p-6">
        <p className="text-sm text-destructive">Failed to load candidates.</p>
      </div>
    );
  }

  const isAllSelected =
    candidates.length > 0 && selectedCandidateIds.length === candidates.length;

  return (
    <div className="w-full space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Assign Candidates
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Select one or multiple candidates from the table below and assign
            them to this assessment.
          </p>
        </div>

        {/* Desktop Top Assign Button */}
        {/* {candidates.length > 0 && (
          <button
            type="button"
            onClick={handleAssign}
            disabled={selectedCandidateIds.length === 0 || isAssigning}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isAssigning ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <UserPlus className="h-4 w-4" />
            )}
            {isAssigning
              ? "Assigning..."
              : `Assign Selected (${selectedCandidateIds.length})`}
          </button>
        )} */}
      </div>

      {/* Candidate Table Container */}
      <div className="w-full overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b bg-muted/30 p-4">
          <div>
            <h2 className="text-base font-semibold">Candidate List</h2>
            <p className="text-xs text-muted-foreground">
              Total Candidates: {candidates.length}
            </p>
          </div>
          {selectedCandidateIds.length > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
              <CheckCircle2 className="h-3.5 w-3.5" />{" "}
              {selectedCandidateIds.length} Selected
            </span>
          )}
        </div>

        {candidates.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-medium text-muted-foreground">
              No candidates found.
            </p>
            <p className="mt-1 text-sm text-muted-foreground/80">
              There are no candidates available right now.
            </p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b bg-muted/50 font-medium text-muted-foreground">
                  <th className="w-10 px-3 py-3.5 text-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={toggleSelectAll}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                    />
                  </th>
                  <th className="w-12 px-3 py-3.5 text-center">SI</th>
                  <th className="px-4 py-3.5">Candidate</th>
                  <th className="hidden px-4 py-3.5 sm:table-cell">Email</th>
                  <th className="hidden px-4 py-3.5 md:table-cell">Role</th>
                  <th className="hidden px-4 py-3.5 lg:table-cell">
                    Candidate User ID
                  </th>
                  <th className="px-4 py-3.5 text-center">Status</th>
                  <th className="px-4 py-3.5 text-right">Selection</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {candidates.map((candidate: any, index: number) => {
                  // User ID required by backend's prisma.user.findUnique
                  const candidateUserId =
                    candidate.userId || candidate.id || candidate._id;

                  const name =
                    candidate.name ||
                    candidate.user?.name ||
                    candidate.fullName ||
                    "Unknown Candidate";

                  const email =
                    candidate.email || candidate.user?.email || "No email";

                  const image =
                    candidate.avatar ||
                    candidate.image ||
                    candidate.photo ||
                    candidate.user?.image ||
                    candidate.user?.avatar;

                  const role =
                    candidate.role || candidate.user?.role || "CANDIDATE";

                  const status =
                    candidate.status || candidate.user?.status || "Active";

                  const isSelected =
                    selectedCandidateIds.includes(candidateUserId);

                  return (
                    <tr
                      key={candidateUserId}
                      onClick={() => toggleSelectCandidate(candidateUserId)}
                      className={`cursor-pointer transition-colors hover:bg-muted/40 ${
                        isSelected ? "bg-primary/5 font-medium" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="px-3 py-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() =>
                            toggleSelectCandidate(candidateUserId)
                          }
                          onClick={(e) => e.stopPropagation()}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                        />
                      </td>

                      {/* SI No */}
                      <td className="px-3 py-4 text-center font-mono text-xs text-muted-foreground">
                        {index + 1}
                      </td>

                      {/* Profile Image & Name */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          {image ? (
                            <Image
                              src={image}
                              alt={name}
                              className="h-9 w-9 rounded-full border object-cover"
                            />
                          ) : (
                            <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-primary/10 text-xs font-semibold text-primary">
                              {name !== "Unknown Candidate" ? (
                                name.charAt(0).toUpperCase()
                              ) : (
                                <User className="h-4 w-4" />
                              )}
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-foreground">
                              {name}
                            </div>
                            <div className="flex items-center gap-2 md:hidden">
                              <span className="text-[10px] uppercase text-muted-foreground">
                                {role}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Mobile view */}
                        <div className="mt-1 space-y-0.5 text-xs text-muted-foreground sm:hidden">
                          <p className="flex items-center gap-1">
                            <Mail className="h-3 w-3" /> {email}
                          </p>
                          <p className="flex items-center gap-1 text-[10px]">
                            <Key className="h-3 w-3" /> {candidateUserId}
                          </p>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="hidden px-4 py-4 text-muted-foreground sm:table-cell">
                        {email}
                      </td>

                      {/* Role */}
                      <td className="hidden px-4 py-4 md:table-cell">
                        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium uppercase text-muted-foreground">
                          {role}
                        </span>
                      </td>

                      {/* Candidate User ID */}
                      <td className="hidden px-4 py-4 font-mono text-xs text-muted-foreground lg:table-cell">
                        {candidateUserId}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4 text-center">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${
                            status.toLowerCase() === "active"
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                              : status.toLowerCase() === "pending"
                                ? "border-amber-200 bg-amber-50 text-amber-700"
                                : "border-gray-200 bg-gray-100 text-gray-600"
                          }`}
                        >
                          {status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-4 py-4 text-right">
                        {isSelected ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                            <UserCheck className="h-3.5 w-3.5" /> Selected
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground hover:text-foreground">
                            Click to Select
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Bottom Assign Button */}
      {candidates.length > 0 && (
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={handleAssign}
            disabled={selectedCandidateIds.length === 0 || isAssigning}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {isAssigning ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <UserPlus className="h-4 w-4" />
            )}
            {isAssigning
              ? "Assigning Candidates..."
              : `Assign Candidates (${selectedCandidateIds.length})`}
          </button>
        </div>
      )}
    </div>
  );
}
