"use client";

import { usePublishAssessment } from "@/hooks";
import { useRouter, useParams } from "next/navigation";

export default function PublishAssessmentPage() {
  const router = useRouter();
  const params = useParams();

  const assessmentId = params.assessmentId as string;

  const { mutate, isPending, isSuccess, isError, error } =
    usePublishAssessment();

  const handlePublish = () => {
    mutate(assessmentId);
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Publish Assessment</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Are you sure you want to publish this assessment?
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isPending}
            className="rounded-md border px-4 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handlePublish}
            disabled={isPending}
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50"
          >
            {isPending ? "Publishing..." : "Publish Assessment"}
          </button>
        </div>

        {isSuccess && (
          <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-700">
            Assessment published successfully.
          </div>
        )}

        {isError && (
          <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
            {error instanceof Error
              ? error.message
              : "Failed to publish assessment."}
          </div>
        )}
      </div>
    </div>
  );
}
