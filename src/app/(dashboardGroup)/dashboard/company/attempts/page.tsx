 

"use client";

import { useGetCompanyAttempts } from "@/hooks";
import Link from "next/link";

export default function CompanyAttemptsPage() {
  const { data, isLoading, isError } = useGetCompanyAttempts();


  if (isLoading) {
    return <div className="p-6">Loading attempts...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load attempts.</div>;
  }

  const attempts = data?.data ?? [];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Company Attempts</h1>

        <p className="text-sm text-muted-foreground">
          Candidates who submitted their assessments
        </p>
      </div>

      {attempts.length === 0 ? (
        <div className="rounded-lg border p-6 text-center">
          No submitted attempts found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left">Candidate</th>

                <th className="px-4 py-3 text-left">Assessment</th>

                <th className="px-4 py-3 text-left">Status</th>

                <th className="px-4 py-3 text-left">Score</th>

                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {attempts.map((attempt) => (
                <tr key={attempt.id} className="border-b last:border-0">
                  <td className="px-4 py-4">
                    <p className="font-medium">{attempt.candidate.name}</p>

                    <p className="text-sm text-muted-foreground">
                      {attempt.candidate.email}
                    </p>
                  </td>

                  <td className="px-4 py-4">{attempt.assessment.title}</td>

                  <td className="px-4 py-4">
                    <span className="rounded-md bg-yellow-100 px-2 py-1 text-sm text-yellow-700">
                      {attempt.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">{attempt.score ?? "Pending"}</td>

                  <td className="px-4 py-4">
                    <Link
                      href={`/dashboard/company/attempts/${attempt.id}/evaluate`}
                      className="rounded-md bg-black px-4 py-2 text-sm text-white"
                    >
                      Evaluate
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
